"""Auth helpers for Flask (PythonAnywhere)."""

from typing import Optional
from flask import jsonify, request

from app.core.security import decode_access_token


def get_token_from_header() -> Optional[str]:
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return request.cookies.get("subix_session")


def get_current_user_id_from_token(token: Optional[str]):
    if not token:
        return None, (jsonify({"detail": "Invalid or expired token"}), 401)
    tid = decode_access_token(token)
    if tid is None:
        return None, (jsonify({"detail": "Invalid or expired token"}), 401)
    return tid, None
