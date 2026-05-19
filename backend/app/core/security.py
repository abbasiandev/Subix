import base64
import hashlib
import hmac
import json
import time
from urllib.parse import unquote

from app.core.config import settings


# ── Telegram initData verification (stdlib only) ─────────────────────────────

def verify_telegram_init_data(init_data: str) -> dict | None:
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


# ── JWT HS256 (stdlib only — no python-jose / cryptography) ─────────────────

def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def _b64url_decode(s: str) -> bytes:
    pad = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + pad)


def create_access_token(telegram_id: int) -> str:
    header = _b64url(json.dumps({"alg": "HS256", "typ": "JWT"}, separators=(",", ":")).encode())
    exp = int(time.time() + settings.jwt_expire_minutes * 60)
    payload = _b64url(
        json.dumps({"sub": str(telegram_id), "exp": exp}, separators=(",", ":")).encode()
    )
    signing_input = f"{header}.{payload}".encode()
    sig = _b64url(
        hmac.new(settings.secret_key.encode(), signing_input, hashlib.sha256).digest()
    )
    return f"{header}.{payload}.{sig}"


def decode_access_token(token: str) -> int | None:
    try:
        header_b64, payload_b64, sig_b64 = token.split(".")
        signing_input = f"{header_b64}.{payload_b64}".encode()
        expected = _b64url(
            hmac.new(settings.secret_key.encode(), signing_input, hashlib.sha256).digest()
        )
        if not hmac.compare_digest(expected, sig_b64):
            return None

        payload = json.loads(_b64url_decode(payload_b64))
        if payload.get("exp", 0) < time.time():
            return None
        return int(payload["sub"])
    except (ValueError, KeyError, json.JSONDecodeError):
        return None
