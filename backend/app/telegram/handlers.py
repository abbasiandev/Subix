import logging
import time

from app.services.user import UserService
from app.telegram.api import send_message
from app.telegram.keyboards import main_menu_keyboard

logger = logging.getLogger(__name__)

_last_seen: dict[int, float] = {}
RATE_LIMIT_SECONDS = 1.5

WELCOME_TEXT = (
    "به <b>سابیکس</b> خوش آمدید، سابیکس پلتفرمی برای ارائه و فروش "
    "اکانت پرمیوم هوش مصنوعی است.\n\n"
    "✅ در این ربات می‌توانید از طریق مینی‌اپ <b>سابیکس</b> اکانت خود را "
    "به‌صورت شفاف تهیه و مدیریت کنید.\n\n"
    "➕ برای ادامه، از دکمه‌های زیر وارد فروشگاه شوید.\n\n"
    "⁉️ ممکن است اولین ورود به مینی‌اپ کمی طول بکشد؛ با جابه‌جایی بین "
    "تب‌ها یا رفرش کردن برنامه، تا وقتی که حساب تلگرام خودتان را در "
    "بالای صفحه دیدید صبر کنید."
)


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
        try:
            UserService().upsert_from_telegram(
                telegram_id=user_id,
                username=from_user.get("username"),
                first_name=from_user.get("first_name"),
                last_name=from_user.get("last_name"),
            )
        except Exception:
            logger.exception("Failed to upsert Telegram user %s", user_id)
        try:
            send_message(chat_id, WELCOME_TEXT, reply_markup=kb)
        except Exception:
            logger.exception("Failed to send welcome message to chat %s", chat_id)
            raise
        return
    try:
        send_message(chat_id, "از دکمه‌های زیر وارد فروشگاه شوید 👇", reply_markup=kb)
    except Exception:
        logger.exception("Failed to send menu message to chat %s", chat_id)
        raise
