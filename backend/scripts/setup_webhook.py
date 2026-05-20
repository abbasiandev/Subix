"""Register Telegram webhook so /start and menu buttons work.

Usage (from backend/):
  python -m scripts.setup_webhook
"""
from app.core.config import settings
from app.telegram.api import set_webhook


def main() -> None:
    if not settings.bot_token:
        raise SystemExit("BOT_TOKEN is missing in .env")
    if not settings.webhook_url:
        raise SystemExit("WEBHOOK_URL is missing in .env (e.g. https://subix.pythonanywhere.com/webhook)")
    set_webhook(settings.webhook_url.rstrip("/"))
    print(f"Webhook set to {settings.webhook_url}")


if __name__ == "__main__":
    main()
