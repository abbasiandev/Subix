"""Minimal Telegram Bot API client — sync."""

import httpx

from app.core.config import settings

_client: httpx.Client | None = None


def _http() -> httpx.Client:
    global _client
    if _client is None:
        _client = httpx.Client(timeout=30.0)
    return _client


def _call(method: str, **params) -> dict:
    url = f"https://api.telegram.org/bot{settings.bot_token}/{method}"
    resp = _http().post(url, json=params)
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(data.get("description", "Telegram API error"))
    return data


def set_webhook(url: str) -> None:
    _call("setWebhook", url=url, drop_pending_updates=True)


def delete_webhook() -> None:
    _call("deleteWebhook")


def send_message(
    chat_id: int,
    text: str,
    *,
    reply_markup: dict | None = None,
    parse_mode: str = "HTML",
) -> None:
    payload: dict = {"chat_id": chat_id, "text": text, "parse_mode": parse_mode}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    _call("sendMessage", **payload)
