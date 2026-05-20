"""Register Telegram webhook so /start and menu buttons work.

Usage (from backend/):
  python -m scripts.setup_webhook

If PythonAnywhere proxy fails, run from your Mac (or any machine with internet):
  curl -sS "https://api.telegram.org/bot<TOKEN>/setWebhook" \\
    -d "url=https://subix.pythonanywhere.com/webhook" \\
    -d "drop_pending_updates=true"
"""
import httpx

from app.core.config import settings
from app.telegram.api import set_webhook


def main() -> None:
    if not settings.bot_token:
        raise SystemExit("BOT_TOKEN is missing in .env")
    if not settings.webhook_url:
        raise SystemExit(
            "WEBHOOK_URL is missing in .env (e.g. https://subix.pythonanywhere.com/webhook)"
        )
    url = settings.webhook_url.rstrip("/")
    try:
        set_webhook(url)
    except httpx.ProxyError as exc:
        print("Proxy error calling Telegram API from PythonAnywhere.")
        print("Set the webhook from your computer instead:\n")
        print(
            f'  curl -sS "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \\\n'
            f'    -d "url={url}" \\\n'
            f'    -d "drop_pending_updates=true"\n'
        )
        raise SystemExit(1) from exc
    print(f"Webhook set to {url}")


if __name__ == "__main__":
    main()
