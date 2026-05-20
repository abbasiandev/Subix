"""Seed Turso database. Run: python -m scripts.seed"""
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

from app.db.client import execute, run_migrations  # noqa: E402

# (name, description, category, price, duration_days, activation_minutes, activation_type, sort_order)
PRODUCTS = [
    (
        "اشتراک ChatGPT Plus | ۱ ماه",
        "اختصاصی • فعال‌سازی ۳۰ دقیقه • ایمیل شخصی",
        "ChatGPT",
        190_000,
        30,
        30,
        "personal_email",
        1,
    ),
    (
        "اشتراک Gemini Pro | ۱ سال",
        "اختصاصی • فعال‌سازی ۳۰ دقیقه • ایمیل شخصی",
        "Gemini",
        870_000,
        365,
        30,
        "personal_email",
        2,
    ),
    (
        "اشتراک ChatGPT Plus | ۱ ماه و ۷ روز",
        "اختصاصی • فعال‌سازی ۳۰ دقیقه • ایمیل آماده",
        "ChatGPT",
        450_000,
        37,
        30,
        "ready_email",
        3,
    ),
    (
        "اکانت پیش‌ساخته ChatGPT Plus | ۱ ماه",
        "اختصاصی • فعال‌سازی ۳۰ دقیقه • ایمیل آماده",
        "ChatGPT",
        450_000,
        30,
        30,
        "ready_email",
        4,
    ),
    (
        "اشتراک Cursor Pro | ۱ ماه",
        "اختصاصی • ادیتور هوش مصنوعی برای کدنویسان",
        "Cursor",
        320_000,
        30,
        30,
        "personal_email",
        5,
    ),
    (
        "اشتراک Spotify Premium | ۱ ماه",
        "اختصاصی • موسیقی بی‌محدود بدون تبلیغ",
        "Spotify",
        85_000,
        30,
        30,
        "ready_email",
        6,
    ),
]


def seed():
    print("→ Running migrations...")
    run_migrations()
    print("→ Clearing old products...")
    execute("DELETE FROM products")
    print("→ Inserting products...")
    for name, desc, cat, price, days, activation_min, act_type, order in PRODUCTS:
        execute(
            """
            INSERT INTO products
              (name, description, category, price, duration_days,
               activation_minutes, activation_type, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
            """,
            [name, desc, cat, price, days, activation_min, act_type, order],
        )
    print(f"✅ Seeded {len(PRODUCTS)} products.")


if __name__ == "__main__":
    seed()
