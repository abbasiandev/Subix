from app.db.client import execute
from app.schemas.schemas import ProductOut


def _row_to_product(row) -> ProductOut:
    cols = [
        "id", "name", "description", "category", "price", "duration_days",
        "activation_minutes", "activation_type", "is_active",
    ]
    data = dict(zip(cols, row.values))
    data["is_active"] = bool(data["is_active"])
    data["price"] = float(data["price"])
    return ProductOut(**data)


class ProductService:

    def list_active(self, category: str | None = None) -> list[ProductOut]:
        if category:
            rs = execute(
                """
                SELECT id, name, description, category, price, duration_days,
                       activation_minutes, activation_type, is_active
                FROM products WHERE is_active=1 AND category=? ORDER BY sort_order
                """,
                [category],
            )
        else:
            rs = execute(
                """
                SELECT id, name, description, category, price, duration_days,
                       activation_minutes, activation_type, is_active
                FROM products WHERE is_active=1 ORDER BY sort_order
                """
            )
        return [_row_to_product(r) for r in rs.rows]

    def get(self, product_id: int) -> ProductOut | None:
        rs = execute(
            """
            SELECT id, name, description, category, price, duration_days,
                   activation_minutes, activation_type, is_active
            FROM products WHERE id=? AND is_active=1
            """,
            [product_id],
        )
        if not rs.rows:
            return None
        return _row_to_product(rs.rows[0])

    def categories(self) -> list[str]:
        rs = execute("SELECT DISTINCT category FROM products WHERE is_active=1")
        return [r.values[0] for r in rs.rows]
