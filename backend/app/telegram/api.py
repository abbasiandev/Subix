"""Minimal Telegram Bot API client (replaces aiogram)."""

import httpx

from app.core.config import settings

_client: httpx.AsyncClient | None = None


async def _http() -> httpx.AsyncClient:
    global _client
    if _client is None:
        _client = httpx.AsyncClient(timeout=30.0)
    return _client


async def close_telegram() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


async def _call(method: str, **params) -> dict:
    client = await _http()
    url = f"https://api.telegram.org/bot{settings.bot_token}/{method}"
    resp = await client.post(url, json=params)
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(data.get("description", "Telegram API error"))
    return data


async def set_webhook(url: str) -> None:
    await _call("setWebhook", url=url, drop_pending_updates=True)


async def delete_webhook() -> None:
    await _call("deleteWebhook")


async def send_message(
    chat_id: int,
    text: str,
    *,
    reply_markup: dict | None = None,
    parse_mode: str = "HTML",
) -> None:
    payload: dict = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": parse_mode,
    }
    if reply_markup:
        payload["reply_markup"] = reply_markup
    await _call("sendMessage", **payload)
