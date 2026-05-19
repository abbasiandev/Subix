import hashlib
import hmac
import json
from datetime import datetime, timedelta, timezone
from urllib.parse import unquote

from jose import JWTError, jwt

from app.core.config import settings


# ── Telegram initData verification ──────────────────────────────────────────

def verify_telegram_init_data(init_data: str) -> dict | None:
    """
    Verify Telegram WebApp initData HMAC signature.
    Returns parsed user dict if valid, None if tampered.
    https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
    """
    parsed: dict[str, str] = {}
    for part in init_data.split("&"):
        if "=" in part:
            k, v = part.split("=", 1)
            parsed[k] = unquote(v)

    received_hash = parsed.pop("hash", None)
    if not received_hash:
        return None

    data_check_string = "\n".join(
        f"{k}={v}" for k, v in sorted(parsed.items())
    )

    secret_key = hmac.new(
        key=b"WebAppData",
        msg=settings.bot_token.encode(),
        digestmod=hashlib.sha256,
    ).digest()

    expected_hash = hmac.new(
        key=secret_key,
        msg=data_check_string.encode(),
        digestmod=hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(expected_hash, received_hash):
        return None

    user_json = parsed.get("user")
    if not user_json:
        return None

    return json.loads(user_json)


# ── JWT ──────────────────────────────────────────────────────────────────────

def create_access_token(telegram_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.jwt_expire_minutes
    )
    return jwt.encode(
        {"sub": str(telegram_id), "exp": expire},
        settings.secret_key,
        algorithm=settings.jwt_algorithm,
    )


def decode_access_token(token: str) -> int | None:
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.jwt_algorithm]
        )
        return int(payload["sub"])
    except JWTError:
        return None
