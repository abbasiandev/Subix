"""Turso/libSQL over HTTP — sync (PythonAnywhere WSGI compatible)."""

from dataclasses import dataclass
from typing import Any

import httpx

from app.core.config import settings

_http: httpx.Client | None = None
_migrated = False


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


def _client() -> httpx.Client:
    global _http
    if _http is None:
        _http = httpx.Client(
            timeout=30.0,
            headers={
                "Authorization": f"Bearer {settings.turso_auth_token}",
                "Content-Type": "application/json",
            },
        )
    return _http


def _cell(value: Any) -> Any:
    if isinstance(value, dict):
        kind = value.get("type")
        if kind == "null":
            return None
        if kind == "integer":
            return int(value["value"])
        if kind == "float":
            return float(value["value"])
        return value.get("value")
    return value


def _parse_rows(result: dict) -> list[Row]:
    rows_out: list[Row] = []
    raw_rows = result.get("rows") or []
    for row in raw_rows:
        if row and isinstance(row[0], dict):
            rows_out.append(Row(values=tuple(_cell(c) for c in row)))
        else:
            rows_out.append(Row(values=tuple(row)))
    return rows_out


def _first_result(body: Any) -> dict:
    if isinstance(body, list):
        item = body[0]
        if isinstance(item, dict) and "results" in item:
            return item["results"]
        return item
    if isinstance(body, dict):
        results = body.get("results")
        if isinstance(results, list) and results:
            first = results[0]
            if isinstance(first, dict) and "response" in first:
                return first["response"].get("result") or {}
            return first
    raise RuntimeError(f"Unexpected Turso response: {body!r}")


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


def _query(sql: str, args: list | None = None) -> ResultSet:
    client = _client()
    args = args or []

    v2_stmt: dict = {"sql": sql}
    if args:
        v2_stmt["args"] = [_to_arg(a) for a in args]

    try:
        resp = client.post(
            f"{_db_base()}/v2/pipeline",
            json={"requests": [{"type": "execute", "stmt": v2_stmt}, {"type": "close"}]},
        )
        resp.raise_for_status()
        result = _first_result(resp.json())
        if isinstance(result, dict) and result.get("error"):
            raise RuntimeError(result["error"])
        return ResultSet(rows=_parse_rows(result))
    except Exception as v2_err:
        try:
            resp = client.post(
                _db_base(),
                json={"statements": [{"q": sql, "params": args}]},
            )
            resp.raise_for_status()
            result = _first_result(resp.json())
            if isinstance(result, dict) and result.get("error"):
                raise RuntimeError(result["error"])
            return ResultSet(rows=_parse_rows(result))
        except Exception as v1_err:
            raise RuntimeError(f"Turso v2: {v2_err}; Turso v1: {v1_err}") from v1_err


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


def ensure_migrated() -> None:
    global _migrated
    if _migrated:
        return
    for stmt in MIGRATIONS:
        _query(stmt)
    _migrated = True


def execute(sql: str, args: list | None = None) -> ResultSet:
    ensure_migrated()
    return _query(sql, args)


def run_migrations() -> None:
    ensure_migrated()
