import libsql_client

from app.core.config import settings

# Single shared async client
_client: libsql_client.Client | None = None


def get_client() -> libsql_client.Client:
    global _client
    if _client is None:
        _client = libsql_client.create_client(
            url=settings.turso_url,
            auth_token=settings.turso_auth_token,
        )
    return _client


async def execute(sql: str, args: list | None = None):
    return await get_client().execute(sql, args or [])


async def executemany(stmts: list[libsql_client.Statement]):
    return await get_client().batch(stmts)


# ── Migrations ───────────────────────────────────────────────────────────────

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


async def run_migrations():
    for stmt in MIGRATIONS:
        await execute(stmt)
