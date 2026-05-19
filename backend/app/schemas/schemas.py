from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


# ── User ─────────────────────────────────────────────────────────────────────

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    telegram_id: int
    username: str | None
    first_name: str | None
    last_name: str | None
    phone_number: str | None
    wallet: float
    is_active: bool
    created_at: str


# ── Auth ─────────────────────────────────────────────────────────────────────

class TelegramAuthIn(BaseModel):
    init_data: str  # raw Telegram.WebApp.initData string


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ── Product ──────────────────────────────────────────────────────────────────

class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    category: str
    price: float
    duration_days: int
    activation_minutes: int
    activation_type: str
    is_active: bool


# ── Order ────────────────────────────────────────────────────────────────────

class OrderCreate(BaseModel):
    product_id: int


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    status: Literal["pending", "processing", "completed", "failed"]
    price_paid: float
    account_email: str | None
    note: str | None
    created_at: str
    activated_at: str | None


# ── Wallet ───────────────────────────────────────────────────────────────────

class TopupCreate(BaseModel):
    amount: float
    method: str = "card"


class TopupOut(BaseModel):
    id: int
    amount: float
    method: str
    status: str
    created_at: str
