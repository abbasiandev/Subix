from fastapi import APIRouter, Depends, HTTPException, status

from app.core.deps import get_current_user_id
from app.schemas.schemas import OrderCreate, OrderOut
from app.services.order import OrderService

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(body: OrderCreate, telegram_id: int = Depends(get_current_user_id)):
    order = OrderService().create(telegram_id, body.product_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient wallet balance or product not found",
        )
    return order


@router.get("", response_model=list[OrderOut])
def list_orders(telegram_id: int = Depends(get_current_user_id)):
    return OrderService().list_for_user(telegram_id)


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, telegram_id: int = Depends(get_current_user_id)):
    order = OrderService().get(order_id, telegram_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order
