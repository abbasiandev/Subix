"""Turso/libSQL over HTTP v2 pipeline — no native libsql-client."""

from dataclasses import dataclass
from typing import Any

import httpx

from app.core.config import settings

_http: httpx.AsyncClient | None = None


@dataclass
class Row:
    values: tuple


@dataclass
class ResultSet:
    rows: list[Row]


def _db_base() -> str:
    url = settings.turso_url.strip()
    if url.startswith("libsql://"):
        return f"https://{url.removeprefix('libsql://').rstrip('/')}"
    return url.rstrip("/")


def _pipeline_url() -> str:
    return f"{_db_base()}/v2/pipeline"


async def _client() -> httpx.AsyncClient:
    global _http
    if _http is None:
        _http = httpx.AsyncClient(
            timeout=30.0,
            headers={
                "Authorization": f"Bearer {settings.turso_auth_token}",
                "Content-Type": "application/json",
            },
        )
    return _http


async def close_db() -> None:
    global _http
    if _http is not None:
        await _http.aclose()
        _http = None


def _to_arg(value: Any) -> dict:
    if value is None:
        return {"type": "null"}
    if isinstance(value, bool):
        return {"type": "integer", "value": "1" if value else "0"}
    if isinstance(value, int):
        return {"type": "integer", "value": str(value)}
    if isinstance(value, float):
        return {"type": "float", "value": str(value)}
    return {"type": "text", "value": str(value)}


def _from_cell(cell: Any) -> Any:
    if cell is None:
        return None
    if isinstance(cell, dict):
        kind = cell.get("type")
        if kind == "null":
            return None
        if kind == "integer":
            return int(cell["value"])
        if kind == "float":
            return float(cell["value"])
        return cell.get("value")
    return cell


def _parse_row(row: list) -> tuple:
    return tuple(_from_cell(c) for c in row)


def _parse_response(body: dict) -> ResultSet:
    rows_out: list[Row] = []
    for item in body.get("results", []):
        if item.get("type") == "error":
            raise RuntimeError(item.get("error") or item)
        if item.get("type") != "ok":
            continue
        response = item.get("response") or {}
        if response.get("type") != "execute":
            continue
        result = response.get("result") or {}
        for row in result.get("rows", []):
            rows_out.append(Row(values=_parse_row(row)))
    return ResultSet(rows=rows_out)


_migrated = False


async def _pipeline(sql: str, args: list | None = None) -> ResultSet:
    client = await _client()
    stmt: dict = {"sql": sql}
    if args:
        stmt["args"] = [_to_arg(a) for a in args]

    resp = await client.post(
        _pipeline_url(),
        json={
            "requests": [
                {"type": "execute", "stmt": stmt},
                {"type": "close"},
            ]
        },
    )
    resp.raise_for_status()
    return _parse_response(resp.json())


async def ensure_migrated() -> None:
    global _migrated
    if _migrated:
        return
    for stmt in MIGRATIONS:
        await _pipeline(stmt)
    _migrated = True


async def execute(sql: str, args: list | None = None) -> ResultSet:
    await ensure_migrated()
    return await _pipeline(sql, args)


MIGRATIONS = [
    """
    CREATE TABLE IF NOT EXISTS users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id   INTEGER UNIQUE NOT NULL,
        username      TEXT,
        first_name    TEXT,
        last_name     TEXT,
        phone_number  TEXT,
        wallet        REAL    NOT NULL DEFAULT 0.0,
        is_active     INTEGER NOT NULL DEFAULT 1,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS products (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        name          TEXT    NOT NULL,
        description   TEXT,
        category      TEXT    NOT NULL,
        price         REAL    NOT NULL,
        duration_days INTEGER NOT NULL,
        activation_minutes INTEGER NOT NULL DEFAULT 30,
        activation_type TEXT NOT NULL DEFAULT 'personal_email',
        is_active     INTEGER NOT NULL DEFAULT 1,
        sort_order    INTEGER NOT NULL DEFAULT 0,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS orders (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER NOT NULL REFERENCES users(id),
        product_id    INTEGER NOT NULL REFERENCES products(id),
        status        TEXT    NOT NULL DEFAULT 'pending',
        price_paid    REAL    NOT NULL,
        account_email TEXT,
        account_pass  TEXT,
        note          TEXT,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
        activated_at  TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS topups (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER NOT NULL REFERENCES users(id),
        amount        REAL    NOT NULL,
        method        TEXT    NOT NULL DEFAULT 'card',
        status        TEXT    NOT NULL DEFAULT 'pending',
        reference     TEXT,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    )
    """,
]


async def run_migrations() -> None:
    await ensure_migrated()
