from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.schemas import ProductOut
from app.services.product import ProductService

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(category: str | None = Query(None)):
    return ProductService().list_active(category=category)


@router.get("/categories", response_model=list[str])
def list_categories():
    return ProductService().categories()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int):
    product = ProductService().get(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product
