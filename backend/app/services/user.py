from app.db.client import execute
from app.schemas.schemas import UserOut


def _row_to_user(row) -> UserOut:
    cols = ["id", "telegram_id", "username", "first_name", "last_name",
            "phone_number", "wallet", "is_active", "created_at"]
    data = dict(zip(cols, row.values))
    data["is_active"] = bool(data["is_active"])
    return UserOut(**data)


class UserService:

    async def get_by_telegram_id(self, telegram_id: int) -> UserOut | None:
        rs = await execute(
            "SELECT * FROM users WHERE telegram_id = ?", [telegram_id]
        )
        if not rs.rows:
            return None
        return _row_to_user(rs.rows[0])

    async def upsert_from_telegram(
        self,
        telegram_id: int,
        username: str | None,
        first_name: str | None,
        last_name: str | None,
        phone_number: str | None = None,
    ) -> UserOut:
        """Create user on first login, update name on subsequent logins."""
        await execute(
            """
            INSERT INTO users (telegram_id, username, first_name, last_name, phone_number)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(telegram_id) DO UPDATE SET
                username   = excluded.username,
                first_name = excluded.first_name,
                last_name  = excluded.last_name
            """,
            [telegram_id, username, first_name, last_name, phone_number],
        )
        return await self.get_by_telegram_id(telegram_id)

    async def get_wallet(self, telegram_id: int) -> float:
        rs = await execute(
            "SELECT wallet FROM users WHERE telegram_id = ?", [telegram_id]
        )
        return rs.rows[0].values[0] if rs.rows else 0.0

    async def deduct_wallet(self, telegram_id: int, amount: float) -> bool:
        rs = await execute(
            "SELECT wallet FROM users WHERE telegram_id = ?", [telegram_id]
        )
        if not rs.rows or rs.rows[0].values[0] < amount:
            return False
        await execute(
            "UPDATE users SET wallet = wallet - ? WHERE telegram_id = ?",
            [amount, telegram_id],
        )
        return True

    async def credit_wallet(self, telegram_id: int, amount: float):
        await execute(
            "UPDATE users SET wallet = wallet + ? WHERE telegram_id = ?",
            [amount, telegram_id],
        )
