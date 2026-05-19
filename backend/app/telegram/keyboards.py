from app.core.config import settings


def _url(path: str) -> str:
    return f"{settings.frontend_url.rstrip('/')}{path}"


def main_menu_keyboard() -> dict:
    return {
        "inline_keyboard": [
            [{"text": "🛍 فروشگاه", "web_app": {"url": _url("/")}}],
            [
                {"text": "📊 داشبورد", "web_app": {"url": _url("/dashboard/")}},
                {"text": "👤 پروفایل", "web_app": {"url": _url("/profile/")}},
            ],
            [{"text": "📞 تماس با ما", "web_app": {"url": _url("/contact/")}}],
        ]
    }
