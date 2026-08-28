from typing import Optional

from app.db.client import execute
from app.schemas.schemas import UserOut


def _row_to_user(row) -> UserOut:
    cols = ["id", "telegram_id", "username", "first_name", "last_name",
            "phone_number", "wallet", "is_active", "created_at"]
    data = dict(zip(cols, row.values))
    data["is_active"] = bool(data["is_active"])
    return UserOut(**data)


class UserService:

    def get_by_id(self, user_id: int) -> Optional[UserOut]:
        rs = execute("SELECT * FROM users WHERE id = ?", [user_id])
        if not rs.rows:
            return None
        return _row_to_user(rs.rows[0])

    def get_by_phone(self, phone_number: str) -> Optional[UserOut]:
        rs = execute("SELECT * FROM users WHERE phone_number = ?", [phone_number])
        if not rs.rows:
            return None
        return _row_to_user(rs.rows[0])

    def get_by_identifier(self, identifier: int) -> Optional[UserOut]:
        """Lookup user by telegram_id OR id OR phone synthetic id"""
        rs = execute("SELECT * FROM users WHERE telegram_id = ? OR id = ?", [identifier, identifier])
        if not rs.rows:
            return None
        return _row_to_user(rs.rows[0])

    def get_by_telegram_id(self, telegram_id: int) -> Optional[UserOut]:
        rs = execute("SELECT * FROM users WHERE telegram_id = ?", [telegram_id])
        if not rs.rows:
            return None
        return _row_to_user(rs.rows[0])

    def upsert_from_phone(self, phone_number: str) -> UserOut:
        existing = self.get_by_phone(phone_number)
        if existing:
            return existing

        # Generate a distinct synthetic telegram_id for phone-registered accounts (e.g. 980000000000 + 912...)
        # to satisfy the UNIQUE constraint on telegram_id while avoiding collision with real telegram user IDs
        digits = ''.join(filter(str.isdigit, phone_number))
        synthetic_tg_id = int(f"98{digits[-9:]}")

        execute(
            """
            INSERT INTO users (telegram_id, phone_number, first_name, is_active)
            VALUES (?, ?, ?, 1)
            ON CONFLICT(telegram_id) DO UPDATE SET
                phone_number = excluded.phone_number
            """,
            [synthetic_tg_id, phone_number, f"کاربر {phone_number[-4:]}"],
        )
        return self.get_by_phone(phone_number) or self.get_by_telegram_id(synthetic_tg_id)

    def upsert_from_telegram(
        self,
        telegram_id: int,
        username: Optional[str],
        first_name: Optional[str],
        last_name: Optional[str],
        phone_number: Optional[str] = None,
    ) -> UserOut:
        execute(
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
        return self.get_by_telegram_id(telegram_id)

    def get_wallet(self, telegram_id: int) -> float:
        rs = execute("SELECT wallet FROM users WHERE telegram_id = ?", [telegram_id])
        return rs.rows[0].values[0] if rs.rows else 0.0

    def deduct_wallet(self, telegram_id: int, amount: float) -> bool:
        rs = execute("SELECT wallet FROM users WHERE telegram_id = ?", [telegram_id])
        if not rs.rows or rs.rows[0].values[0] < amount:
            return False
        execute(
            "UPDATE users SET wallet = wallet - ? WHERE telegram_id = ?",
            [amount, telegram_id],
        )
        return True

    def credit_wallet(self, telegram_id: int, amount: float) -> None:
        execute(
            "UPDATE users SET wallet = wallet + ? WHERE telegram_id = ?",
            [amount, telegram_id],
        )
