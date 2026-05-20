from fastapi import APIRouter, HTTPException, status

from app.core.security import create_access_token, verify_telegram_init_data
from app.schemas.schemas import TelegramAuthIn, TokenOut
from app.services.user import UserService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/telegram", response_model=TokenOut)
def telegram_login(body: TelegramAuthIn):
    tg_user = verify_telegram_init_data(body.init_data)
    if not tg_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Telegram initData",
        )
    user = UserService().upsert_from_telegram(
        telegram_id=tg_user["id"],
        username=tg_user.get("username"),
        first_name=tg_user.get("first_name"),
        last_name=tg_user.get("last_name"),
    )
    token = create_access_token(user.telegram_id)
    return TokenOut(access_token=token, user=user)
