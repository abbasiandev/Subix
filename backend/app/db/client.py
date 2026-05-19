"""Turso/libSQL over HTTP — no native libsql-client (saves ~50MB+ RAM)."""

from dataclasses import dataclass

import httpx

from app.core.config import settings

_http: httpx.AsyncClient | None = None


@dataclass
class Row:
    values: tuple


@dataclass
class ResultSet:
    rows: list[Row]


def _db_url() -> str:
    url = settings.turso_url.strip()
    if url.startswith("libsql://"):
        return f"https://{url.removeprefix('libsql://').rstrip('/')}"
    return url.rstrip("/")


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


async def execute(sql: str, args: list | None = None) -> ResultSet:
    client = await _client()
    resp = await client.post(
        _db_url(),
        json={"statements": [{"q": sql, "params": args or []}]},
    )
    resp.raise_for_status()
    body = resp.json()
    result = body["results"][0]
    if result.get("error"):
        raise RuntimeError(result["error"])
    return ResultSet(rows=[Row(values=tuple(r)) for r in result.get("rows", [])])


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
    for stmt in MIGRATIONS:
        await execute(stmt)
