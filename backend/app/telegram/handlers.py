import time

from app.services.user import UserService
from app.telegram.api import send_message
from app.telegram.keyboards import main_menu_keyboard

_last_seen: dict[int, float] = {}
RATE_LIMIT_SECONDS = 1.5


def _throttled(user_id: int | None) -> bool:
    if not user_id:
        return False
    now = time.monotonic()
    last = _last_seen.get(user_id, 0)
    if now - last < RATE_LIMIT_SECONDS:
        return True
    _last_seen[user_id] = now
    return False


def handle_update(update: dict) -> None:
    message = update.get("message")
    if not message or "text" not in message:
        return
    from_user = message.get("from") or {}
    user_id = from_user.get("id")
    if _throttled(user_id):
        return
    chat_id = message["chat"]["id"]
    text = message["text"].strip()
    kb = main_menu_keyboard()
    if text.startswith("/start"):
        user = UserService().upsert_from_telegram(
            telegram_id=user_id,
            username=from_user.get("username"),
            first_name=from_user.get("first_name"),
            last_name=from_user.get("last_name"),
        )
        name = user.first_name or user.username or "کاربر"
        send_message(
            chat_id,
            f"سلام {name} 👋\n\nبه <b>سابیکس</b> خوش آمدید!\n"
            "اشتراک‌های هوش مصنوعی را با بهترین قیمت تهیه کنید.",
            reply_markup=kb,
        )
        return
    send_message(chat_id, "از دکمه زیر وارد فروشگاه شوید 👇", reply_markup=kb)
