from typing import Optional, List

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

    def list_catalog_price_overrides(self) -> tuple[dict[str, float], str | None]:
        rs = execute(
            "SELECT slug, price, MAX(updated_at) OVER () FROM catalog_price_overrides"
        )
        if not rs.rows:
            return {}, None
        prices = {str(row.values[0]): float(row.values[1]) for row in rs.rows}
        updated_at = str(rs.rows[0].values[2]) if rs.rows[0].values[2] else None
        return prices, updated_at

    def list_active(self, category: Optional[str] = None) -> List[ProductOut]:
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

    def get(self, product_id: int) -> Optional[ProductOut]:
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

    def categories(self) -> List[str]:
        rs = execute("SELECT DISTINCT category FROM products WHERE is_active=1")
        return [r.values[0] for r in rs.rows]

    def list_all(self) -> List[ProductOut]:
        rs = execute(
            """
            SELECT id, name, description, category, price, duration_days,
                   activation_minutes, activation_type, is_active
            FROM products ORDER BY sort_order
            """
        )
        return [_row_to_product(r) for r in rs.rows]

    def update_price(self, product_id: int, price: float) -> Optional[ProductOut]:
        rs = execute(
            """
            UPDATE products SET price=?
            WHERE id=?
            RETURNING id, name, description, category, price, duration_days,
                      activation_minutes, activation_type, is_active
            """,
            [price, product_id],
        )
        if not rs.rows:
            return None
        return _row_to_product(rs.rows[0])
