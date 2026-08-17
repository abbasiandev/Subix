from fastapi import APIRouter, Depends, HTTPException, status

from app.core.deps import verify_admin_key
from app.schemas.schemas import ProductOut, ProductPriceUpdate
from app.services.product import ProductService

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
