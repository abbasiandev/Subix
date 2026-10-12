from fastapi import APIRouter, Depends, HTTPException, status

from app.core.deps import verify_admin_key
from app.schemas.schemas import ProductOut, ProductPriceUpdate
from app.services.product import ProductService
from app.core.config import settings

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(verify_admin_key)],
)


@router.get("/products", response_model=list[ProductOut])
def list_all_products():
    return ProductService().list_all()


@router.patch("/products/{product_id}", response_model=ProductOut)
def update_product_price(product_id: int, body: ProductPriceUpdate):
    product = ProductService().update_price(product_id, body.price)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.post("/prices/sync")
def sync_prices_from_private_source():
    from scripts.sync_prices import sync_catalog_prices

    return sync_catalog_prices(
        source_url=settings.price_source_url,
        paths=[part.strip() for part in settings.price_source_paths.split(",") if part.strip()],
        minimum_score=settings.price_sync_min_score,
        minimum_matches=settings.price_sync_min_matches,
    )
