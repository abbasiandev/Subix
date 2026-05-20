from app.core.config import settings

SUPPORT_USERNAME = "abbasiandev"


def _url(path: str) -> str:
    return f"{settings.frontend_url.rstrip('/')}{path}"


def main_menu_keyboard() -> dict:
    return {
        "inline_keyboard": [
            [
                {
                    "text": "ورود به فروشگاه و خرید 🛒",
                    "web_app": {"url": _url("/")},
                }
            ],
            [
                {
                    "text": "پروفایل 🙋🏻‍♂️",
                    "web_app": {"url": _url("/profile/")},
                },
                {
                    "text": "داشبورد 📟",
                    "web_app": {"url": _url("/dashboard/")},
                },
                {
                    "text": "پشتیبانی 📮",
                    "url": f"https://t.me/{SUPPORT_USERNAME}",
                },
            ],
        ]
    }
