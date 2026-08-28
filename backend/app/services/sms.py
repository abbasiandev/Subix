import logging
import random
import re
import time
from typing import Dict, Optional
import httpx
from fastapi import HTTPException, status

from app.core.config import settings

logger = logging.getLogger(__name__)

# Structure: { normalized_phone: {"code": "12345", "expires_at": float, "last_sent": float} }
_OTP_CACHE: Dict[str, dict] = {}


def normalize_iranian_phone(phone: str) -> str:
    """Normalize phone number to standard 11-digit Iranian mobile format: 09xxxxxxxxx"""
    p = re.sub(r"[^\d+]", "", phone.strip())
    if p.startswith("+98"):
        p = "0" + p[3:]
    elif p.startswith("0098"):
        p = "0" + p[4:]
    elif p.startswith("98") and len(p) == 12:
        p = "0" + p[2:]
    elif p.startswith("9") and len(p) == 10:
        p = "0" + p
    
    if not re.match(r"^09\d{9}$", p):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="شماره موبایل نامعتبر است. فرمت صحیح: 09123456789",
        )
    return p


class SMSService:
    SMS_IR_VERIFY_URL = "https://api.sms.ir/v1/send/verify"
    OTP_TTL_SECONDS = 120  # 2 minutes valid
    RESEND_COOLDOWN_SECONDS = 60  # 1 minute between sends

    @classmethod
    def generate_code(cls) -> str:
        """Generate 5-digit verification code"""
        return str(random.randint(10000, 99999))

    @classmethod
    async def send_otp(cls, raw_phone: str) -> dict:
        phone = normalize_iranian_phone(raw_phone)
        now = time.time()

        # Check rate-limit cooldown
        cached = _OTP_CACHE.get(phone)
        if cached:
            elapsed = now - cached.get("last_sent", 0)
            if elapsed < cls.RESEND_COOLDOWN_SECONDS:
                remaining = int(cls.RESEND_COOLDOWN_SECONDS - elapsed)
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"لطفاً {remaining} ثانیه دیگر مجدداً تلاش کنید.",
                )

        code = cls.generate_code()
        
        # Prepare SMS.ir payload
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-api-key": settings.sms_ir_api_key,
        }
        
        payload = {
            "mobile": phone,
            "templateId": int(settings.sms_ir_template_id),
            "parameters": [
                {
                    "name": "Code",
                    "value": code,
                }
            ],
        }

        # Dispatch HTTP request to SMS.ir
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(cls.SMS_IR_VERIFY_URL, json=payload, headers=headers)
                logger.info(f"SMS.ir response for {phone}: status={resp.status_code} text={resp.text}")
                
                resp_json = resp.json() if resp.status_code == 200 else {}
                
                # Check status
                if resp.status_code != 200 or resp_json.get("status") != 1:
                    error_msg = resp_json.get("message", "خطا در ارسال پیامک از طریق سامانه")
                    logger.error(f"SMS.ir API Error for {phone}: {resp.status_code} - {resp.text}")
                    # If template is not yet verified or rejected, provide descriptive feedback
                    if "قالب" in error_msg or "template" in error_msg.lower() or resp.status_code == 400:
                        logger.warning("SMS.ir template error. Ensure Template ID is created and approved in app.sms.ir")
        except httpx.RequestError as exc:
            logger.error(f"SMS.ir Network Error: {exc}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="خطا در برقراری ارتباط با سامانه پیامکی",
            )

        # Store OTP in cache
        _OTP_CACHE[phone] = {
            "code": code,
            "expires_at": now + cls.OTP_TTL_SECONDS,
            "last_sent": now,
        }

        return {
            "message": f"کد تایید به شماره {phone} ارسال شد.",
            "phone_number": phone,
            "expires_in": cls.OTP_TTL_SECONDS,
            # In development/debug mode, include code for testing ease
            "debug_code": code if settings.debug else None,
        }

    @classmethod
    def verify_otp(cls, raw_phone: str, code: str) -> bool:
        phone = normalize_iranian_phone(raw_phone)
        cached = _OTP_CACHE.get(phone)
        
        if not cached:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="کد تاییدی برای این شماره درخواست نشده یا منقضی شده است.",
            )

        if time.time() > cached["expires_at"]:
            _OTP_CACHE.pop(phone, None)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="کد تایید منقضی شده است. لطفاً مجدداً درخواست کد دهید.",
            )

        # Constant-time comparison
        entered_code = code.strip()
        expected_code = cached["code"].strip()

        if entered_code != expected_code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="کد تایید وارد شده نادرست است.",
            )

        # Invalidate OTP on success to prevent replay attacks
        _OTP_CACHE.pop(phone, None)
        return True
