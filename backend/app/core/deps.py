import secrets

from fastapi import Cookie, Depends, Header, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings
from app.core.security import decode_access_token
from app.services.user import UserService

bearer = HTTPBearer(auto_error=False)


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
    session_token: str | None = Cookie(default=None, alias="subix_session"),
) -> int:
    token = credentials.credentials if credentials else session_token
    telegram_id = decode_access_token(token) if token else None
    if telegram_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return telegram_id


def get_current_user(
    telegram_id: int = Depends(get_current_user_id),
):
    user = UserService().get_by_identifier(telegram_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user


def verify_admin_key(x_admin_key: str = Header(..., alias="X-Admin-Key")) -> None:
    if not settings.admin_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin API is disabled",
        )
    if not secrets.compare_digest(x_admin_key, settings.admin_secret):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin key",
        )
