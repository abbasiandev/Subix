from app.db.client import execute
from app.schemas.schemas import ProductOut


def _row_to_product(row) -> ProductOut:
    cols = ["id", "name", "description", "category", "price", "duration_days",
            "activation_minutes", "activation_type", "is_active", "sort_order", "created_at"]
    data = dict(zip(cols, row.values))
    data["is_active"] = bool(data["is_active"])
    return ProductOut(**{k: v for k, v in data.items() if k in ProductOut.model_fields})


class ProductService:

    async def list_active(self, category: str | None = None) -> list[ProductOut]:
        if category:
            rs = await execute(
                "SELECT * FROM products WHERE is_active=1 AND category=? ORDER BY sort_order",
                [category],
            )
        else:
            rs = await execute(
                "SELECT * FROM products WHERE is_active=1 ORDER BY sort_order"
            )
        return [_row_to_product(r) for r in rs.rows]

    async def get(self, product_id: int) -> ProductOut | None:
        rs = await execute(
            "SELECT * FROM products WHERE id=? AND is_active=1", [product_id]
        )
        if not rs.rows:
            return None
        return _row_to_product(rs.rows[0])

    async def categories(self) -> list[str]:
        rs = await execute(
            "SELECT DISTINCT category FROM products WHERE is_active=1"
        )
        return [r.values[0] for r in rs.rows]
