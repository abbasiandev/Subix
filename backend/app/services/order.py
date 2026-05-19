from app.db.client import execute
from app.schemas.schemas import OrderOut
from app.services.user import UserService
from app.services.product import ProductService


def _row_to_order(row) -> OrderOut:
    cols = ["id", "user_id", "product_id", "status", "price_paid",
            "account_email", "account_pass", "note", "created_at", "activated_at"]
    data = dict(zip(cols, row.values))
    return OrderOut(**{k: v for k, v in data.items() if k in OrderOut.model_fields})


class OrderService:

    def __init__(self):
        self.user_svc = UserService()
        self.product_svc = ProductService()

    async def create(self, telegram_id: int, product_id: int) -> OrderOut | None:
        """Deduct wallet, create order. Returns None if insufficient balance."""
        product = await self.product_svc.get(product_id)
        if not product:
            return None

        deducted = await self.user_svc.deduct_wallet(telegram_id, product.price)
        if not deducted:
            return None

        user_rs = await execute(
            "SELECT id FROM users WHERE telegram_id=?", [telegram_id]
        )
        user_id = user_rs.rows[0].values[0]

        rs = await execute(
            """
            INSERT INTO orders (user_id, product_id, price_paid, status)
            VALUES (?, ?, ?, 'pending')
            RETURNING *
            """,
            [user_id, product_id, product.price],
        )
        return _row_to_order(rs.rows[0])

    async def list_for_user(self, telegram_id: int) -> list[OrderOut]:
        rs = await execute(
            """
            SELECT o.* FROM orders o
            JOIN users u ON u.id = o.user_id
            WHERE u.telegram_id = ?
            ORDER BY o.created_at DESC
            """,
            [telegram_id],
        )
        return [_row_to_order(r) for r in rs.rows]

    async def get(self, order_id: int, telegram_id: int) -> OrderOut | None:
        rs = await execute(
            """
            SELECT o.* FROM orders o
            JOIN users u ON u.id = o.user_id
            WHERE o.id=? AND u.telegram_id=?
            """,
            [order_id, telegram_id],
        )
        if not rs.rows:
            return None
        return _row_to_order(rs.rows[0])
