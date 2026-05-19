from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

from app.core.config import settings


def main_menu_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="🛍 فروشگاه",
                web_app=WebAppInfo(url=f"{settings.frontend_url}/index.html"),
            )
        ],
        [
            InlineKeyboardButton(
                text="📊 داشبورد",
                web_app=WebAppInfo(url=f"{settings.frontend_url}/dashboard.html"),
            ),
            InlineKeyboardButton(
                text="👤 پروفایل",
                web_app=WebAppInfo(url=f"{settings.frontend_url}/profile.html"),
            ),
        ],
        [
            InlineKeyboardButton(
                text="📞 تماس با ما",
                web_app=WebAppInfo(url=f"{settings.frontend_url}/contact.html"),
            )
        ],
    ])


def support_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="💬 چت با پشتیبانی در تلگرام",
                url="https://t.me/your_support_username",
            )
        ]
    ])
