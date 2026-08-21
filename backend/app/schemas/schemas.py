from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    telegram_id: int
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    phone_number: Optional[str]
    wallet: float
    is_active: bool
    created_at: str

class TelegramAuthIn(BaseModel):
    init_data: str  # raw Telegram.WebApp.initData string


class TelegramWidgetAuthIn(BaseModel):
    """Telegram Login Widget authentication data"""
    id: int
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None
    photo_url: Optional[str] = None
    auth_date: int
    hash: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str]
    category: str
    price: float
    duration_days: int
    activation_minutes: int
    activation_type: str
    is_active: bool


class ProductPriceUpdate(BaseModel):
    price: float = Field(gt=0)


class OrderCreate(BaseModel):
    product_id: int


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    status: Literal["pending", "processing", "completed", "failed"]
    price_paid: float
    account_email: Optional[str]
    note: Optional[str]
    created_at: str
    activated_at: Optional[str]


class TopupCreate(BaseModel):
    amount: float
    method: str = "card"


class TopupOut(BaseModel):
    id: int
    amount: float
    method: str
    status: str
    created_at: str
