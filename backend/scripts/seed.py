"""
Seed the Turso database with sample AI subscription products.
Run once: python -m scripts.seed
"""
import asyncio
import os
from pathlib import Path

from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / ".env")

# Must load env before importing app modules
from app.db.client import execute, run_migrations  # noqa: E402

PRODUCTS = [
    # ChatGPT
    ("اشتراک ChatGPT Plus", "اشتراک رسمی ChatGPT Plus", "ChatGPT", 190_000, 30, 30, "personal_email", 1),
    ("اشتراک ChatGPT Plus", "اشتراک ChatGPT Plus — ۱ ماه و ۷ روز", "ChatGPT", 450_000, 37, 30, "ready_email", 2),
    ("ChatGPT Plus اکانت پیش‌ساخته", "اکانت آماده تحویل فوری", "ChatGPT", 450_000, 30, 5, "ready_email", 3),
    # Gemini
    ("اشتراک Gemini Pro", "اشتراک سالانه Gemini Pro", "Gemini", 870_000, 365, 30, "personal_email", 4),
    # Cursor
    ("اشتراک Cursor Pro", "ادیتور هوش مصنوعی برای کدنویسان", "Cursor", 320_000, 30, 30, "personal_email", 5),
    # Spotify
    ("اشتراک Spotify Premium", "موسیقی بی‌محدود بدون تبلیغ", "Spotify", 85_000, 30, 30, "ready_email", 6),
    # YouTube
    ("اشتراک YouTube Premium", "ویدیو بدون تبلیغ + دانلود", "YouTube", 95_000, 30, 30, "ready_email", 7),
    # Discord
    ("اشتراک Discord Nitro", "دیسکورد نیترو کامل", "Discord", 120_000, 30, 30, "ready_email", 8),
    # Telegram
    ("اشتراک Telegram Premium", "تلگرام پریمیوم", "Telegram", 110_000, 30, 15, "personal_email", 9),
]


async def seed():
    print("→ Running migrations...")
    await run_migrations()

    print("→ Inserting products...")
    for name, desc, cat, price, days, activation_min, act_type, order in PRODUCTS:
        await execute(
            """
            INSERT OR IGNORE INTO products
              (name, description, category, price, duration_days,
               activation_minutes, activation_type, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
            """,
            [name, desc, cat, price, days, activation_min, act_type, order],
        )

    print(f"✅ Seeded {len(PRODUCTS)} products.")


if __name__ == "__main__":
    asyncio.run(seed())
