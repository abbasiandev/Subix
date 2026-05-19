from fastapi import APIRouter, Depends, status

from app.core.deps import get_current_user_id
from app.schemas.schemas import TopupCreate, TopupOut, UserOut
from app.services.user import UserService
from app.db.client import execute

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserOut)
async def get_profile(telegram_id: int = Depends(get_current_user_id)):
    svc = UserService()
    return await svc.get_by_telegram_id(telegram_id)


@router.get("/me/wallet")
async def get_wallet(telegram_id: int = Depends(get_current_user_id)):
    svc = UserService()
    balance = await svc.get_wallet(telegram_id)
    return {"balance": balance}


@router.post("/me/topup", response_model=TopupOut, status_code=status.HTTP_201_CREATED)
async def request_topup(
    body: TopupCreate,
    telegram_id: int = Depends(get_current_user_id),
):
    """
    Create a pending top-up request.
    Admin confirms payment manually → credits wallet.
    """
    user_rs = await execute(
        "SELECT id FROM users WHERE telegram_id=?", [telegram_id]
    )
    user_id = user_rs.rows[0].values[0]

    rs = await execute(
        """
        INSERT INTO topups (user_id, amount, method, status)
        VALUES (?, ?, ?, 'pending')
        RETURNING id, amount, method, status, created_at
        """,
        [user_id, body.amount, body.method],
    )
    row = rs.rows[0]
    cols = ["id", "amount", "method", "status", "created_at"]
    return TopupOut(**dict(zip(cols, row.values)))
