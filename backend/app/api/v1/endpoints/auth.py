from fastapi import APIRouter, HTTPException, Response, status

from app.core.security import create_access_token, verify_telegram_init_data, verify_telegram_widget_auth
from app.schemas.schemas import TelegramAuthIn, TelegramWidgetAuthIn, TokenOut
from app.services.user import UserService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/telegram", response_model=TokenOut)
def telegram_login(body: TelegramAuthIn):
    """Authenticate via Telegram Mini App initData"""
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


@router.post("/telegram-widget", response_model=TokenOut)
def telegram_widget_login(body: TelegramWidgetAuthIn, response: Response):
    """Authenticate via Telegram Login Widget (desktop browser)"""
    # Convert Pydantic model to dict for verification
    data = body.model_dump()
    
    tg_user = verify_telegram_widget_auth(data)
    if not tg_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Telegram widget authentication",
        )
    
    # Upsert user in database
    user = UserService().upsert_from_telegram(
        telegram_id=tg_user["id"],
        username=tg_user.get("username"),
        first_name=tg_user.get("first_name"),
        last_name=tg_user.get("last_name"),
    )
    
    # Create JWT token
    token = create_access_token(user.telegram_id)
    
    # Set session cookie (HttpOnly, Secure for HTTPS, SameSite=None for cross-site)
    response.set_cookie(
        key="subix_session",
        value=token,
        max_age=7 * 24 * 60 * 60,  # 7 days
        httponly=True,
        secure=True,  # Required for SameSite=None (HTTPS only)
        samesite="none",  # Allow cross-site cookies (GitHub Pages → PythonAnywhere)
    )
    
    return TokenOut(access_token=token, user=user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response):
    """Logout and clear session cookie"""
    response.delete_cookie(key="subix_session")
    return None
