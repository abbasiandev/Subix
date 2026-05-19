from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from app.bot.keyboards.main import main_menu_keyboard, support_keyboard
from app.services.user import UserService

router = Router()


@router.message(CommandStart())
async def start(message: Message):
    svc = UserService()

    # Auto-register user from Telegram data — no OTP needed
    user = await svc.upsert_from_telegram(
        telegram_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name,
        last_name=message.from_user.last_name,
    )

    name = user.first_name or user.username or "کاربر"
    await message.answer(
        f"سلام {name} 👋\n\nبه <b>وان‌ساب</b> خوش آمدید!\n"
        "اشتراک‌های هوش مصنوعی را با بهترین قیمت تهیه کنید.",
        parse_mode="HTML",
        reply_markup=main_menu_keyboard(),
    )


@router.message()
async def fallback(message: Message):
    await message.answer(
        "از دکمه زیر وارد فروشگاه شوید 👇",
        reply_markup=main_menu_keyboard(),
    )
