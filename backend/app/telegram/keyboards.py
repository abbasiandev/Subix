from app.core.config import settings

SUPPORT_USERNAME = "abbasiandev"


def _url(path: str) -> str:
    return f"{settings.frontend_url.rstrip('/')}{path}"


def main_menu_keyboard() -> dict:
    """
    Updated keyboard layout matching the new Apple-inspired glass design.
    Now includes: Products (Shop), Dashboard, Contact, Profile
    """
    return {
        "inline_keyboard": [
            [
                {
                    "text": "🛍️ فروشگاه",
                    "web_app": {"url": _url("/products")},
                }
            ],
            [
                {
                    "text": "📊 داشبورد",
                    "web_app": {"url": _url("/dashboard")},
                },
                {
                    "text": "👤 پروفایل",
                    "web_app": {"url": _url("/profile")},
                },
            ],
            [
                {
                    "text": "💬 تماس با ما",
                    "web_app": {"url": _url("/contact")},
                },
                {
                    "text": "🆘 پشتیبانی",
                    "url": f"https://t.me/{SUPPORT_USERNAME}",
                },
            ],
        ]
    }
