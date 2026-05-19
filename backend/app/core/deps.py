from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_access_token
from app.services.user import UserService

bearer = HTTPBearer()


async def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(bearer),
) -> int:
    telegram_id = decode_access_token(credentials.credentials)
    if telegram_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return telegram_id


async def get_current_user(
    telegram_id: int = Depends(get_current_user_id),
    user_service: UserService = Depends(),
):
    user = await user_service.get_by_telegram_id(telegram_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user
