"""Auth helpers for Flask (PythonAnywhere)."""

from app.core.security import decode_access_token


def get_token_from_header() -> str | None:
    from flask import request

    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return None


def get_current_user_id_from_token(token: str | None):
    if not token:
        return None, (jsonify({"detail": "Invalid or expired token"}), 401)
    tid = decode_access_token(token)
    if tid is None:
        return None, (jsonify({"detail": "Invalid or expired token"}), 401)
    return tid, None
