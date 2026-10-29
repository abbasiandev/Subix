import asyncio
import hashlib
import hmac
import logging
import re
import secrets
import time
from typing import Optional

import httpx
from fastapi import HTTPException, status

from app.core.config import settings
from app.services import otp_store


logger = logging.getLogger(__name__)


_PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
_ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"
_DIGIT_TRANSLATION = str.maketrans(
    _PERSIAN_DIGITS + _ARABIC_DIGITS,
    "0123456789" * 2,
)
_PHONE_SEPARATORS = re.compile(r"[\s().-]")


def _invalid_phone() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="شماره موبایل نامعتبر است. فرمت صحیح: 09123456789",
    )


def normalize_iranian_phone(phone: str) -> str:
    """Return an Iranian mobile number as ``09xxxxxxxxx``.

    Separators commonly used in displayed phone numbers are accepted, while
    every other non-digit character (including letters) is rejected.
    """
    if not isinstance(phone, str) or not phone.strip():
        raise _invalid_phone()

    value = phone.strip().translate(_DIGIT_TRANSLATION)
    if any(char not in "+0123456789 -()." for char in value):
        raise _invalid_phone()
    compact = _PHONE_SEPARATORS.sub("", value)
    if compact.count("+") > 1 or ("+" in compact and not compact.startswith("+")):
        raise _invalid_phone()

    if compact.startswith("+98"):
        national = "0" + compact[3:]
    elif compact.startswith("0098"):
        national = "0" + compact[4:]
    elif compact.startswith("98") and len(compact) == 12:
        national = "0" + compact[2:]
    elif compact.startswith("9") and len(compact) == 10:
        national = "0" + compact
    else:
        national = compact

    if not re.fullmatch(r"09\d{9}", national):
        raise _invalid_phone()
    return national


def _invalid_code() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="کد تایید وارد شده نامعتبر است.",
    )


def _storage_unavailable() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail="سرویس تایید موقتاً در دسترس نیست.",
    )


def _provider_unavailable(detail: str = "ارسال پیامک موقتاً در دسترس نیست.") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=detail,
    )


class SMSService:
    SMS_IR_VERIFY_URL = "https://api.sms.ir/v1/send/verify"
    OTP_TTL_SECONDS = 120
    RESEND_COOLDOWN_SECONDS = 60

    @classmethod
    def generate_code(cls) -> str:
        return str(secrets.randbelow(90000) + 10000)

    @staticmethod
    def _code_hmac(challenge_id: str, code: str) -> str:
        message = f"{challenge_id}:{code}".encode("utf-8")
        return hmac.new(
            settings.secret_key.encode("utf-8"), message, hashlib.sha256
        ).hexdigest()

    @classmethod
    def _validate_configuration(cls) -> None:
        try:
            template_id = int(settings.sms_ir_template_id)
        except (TypeError, ValueError):
            template_id = 0
        if (
            not isinstance(settings.sms_ir_api_key, str)
            or not settings.sms_ir_api_key.strip()
            or template_id <= 0
            or not isinstance(settings.sms_ir_parameter_name, str)
            or not settings.sms_ir_parameter_name.strip()
            or not isinstance(settings.secret_key, str)
            or not settings.secret_key
        ):
            raise _provider_unavailable()

    @classmethod
    def _reserve(
        cls,
        phone: str,
        client_ip: Optional[str],
        challenge_id: str,
        code_hmac: str,
        now: int,
    ) -> None:
        try:
            reserved = otp_store.reserve(
                challenge_id=challenge_id,
                phone=phone,
                client_ip=client_ip,
                code_hmac=code_hmac,
                created_at=now,
                expires_at=now + cls.OTP_TTL_SECONDS,
                cooldown_seconds=cls.RESEND_COOLDOWN_SECONDS,
            )
        except Exception as exc:
            del exc
            raise _storage_unavailable()
        if not reserved:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="لطفاً کمی بعد مجدداً تلاش کنید.",
                headers={"Retry-After": str(cls.RESEND_COOLDOWN_SECONDS)},
            )

    @classmethod
    def _send_provider_request(cls, phone: str, code: str) -> None:
        headers = {
            "Content-Type": "application/json",
            "Accept": "text/plain",
            "x-api-key": settings.sms_ir_api_key,
        }
        payload = {
            "mobile": phone,
            "templateId": int(settings.sms_ir_template_id),
            "parameters": [
                {
                    "name": settings.sms_ir_parameter_name,
                    "value": code,
                }
            ],
        }
        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.post(
                    cls.SMS_IR_VERIFY_URL, json=payload, headers=headers
                )
                try:
                    body = response.json() if response.content else {}
                except ValueError:
                    body = {}
                provider_status = body.get("status") if isinstance(body, dict) else None
                provider_message = body.get("message") if isinstance(body, dict) else None
                if type(provider_status) is int and provider_status != 1:
                    logger.error(
                        "SMS.ir rejected OTP: http_status=%s provider_status=%s message=%r",
                        response.status_code,
                        provider_status,
                        provider_message,
                    )
                    # All provider-specific details are logged above.
                    # User-facing messages must NOT mention the SMS provider name.
                    raise _provider_unavailable()
                if response.status_code != 200:
                    logger.error(
                        "SMS.ir request failed: http_status=%s provider_status=%s message=%r",
                        response.status_code,
                        provider_status,
                        provider_message,
                    )
                    raise _provider_unavailable()
                if not isinstance(body, dict) or type(provider_status) is not int:
                    logger.error("SMS.ir returned an unexpected response shape")
                    raise _provider_unavailable()
        except HTTPException:
            raise
        except (httpx.HTTPError, ValueError, TypeError):
            raise _provider_unavailable()
        except Exception:
            raise _provider_unavailable()

    @classmethod
    def send_otp_sync(
        cls, raw_phone: str, client_ip: Optional[str] = None
    ) -> dict:
        phone = normalize_iranian_phone(raw_phone)
        cls._validate_configuration()
        now = int(time.time())
        code = cls.generate_code()
        challenge_id = secrets.token_urlsafe(24)
        code_hmac = cls._code_hmac(challenge_id, code)
        normalized_ip = client_ip.strip() if isinstance(client_ip, str) else None
        if normalized_ip == "" or len(normalized_ip or "") > 255:
            normalized_ip = None

        # The reservation is durable before any external call.  Provider
        # failure therefore cannot be used to evade cooldowns or quotas.
        cls._reserve(phone, normalized_ip, challenge_id, code_hmac, now)
        cls._send_provider_request(phone, code)

        try:
            activated = otp_store.activate(challenge_id)
        except Exception as exc:
            del exc
            raise _storage_unavailable()
        if not activated:
            raise _storage_unavailable()

        return {
            "message": f"کد تایید به شماره {phone} ارسال شد.",
            "phone_number": phone,
            "expires_in": cls.OTP_TTL_SECONDS,
            "resend_after": cls.RESEND_COOLDOWN_SECONDS,
        }

    @classmethod
    async def send_otp(
        cls, raw_phone: str, client_ip: Optional[str] = None
    ) -> dict:
        return await asyncio.to_thread(cls.send_otp_sync, raw_phone, client_ip)

    @classmethod
    def verify_otp(cls, raw_phone: str, code: str) -> bool:
        phone = normalize_iranian_phone(raw_phone)
        if not isinstance(code, str):
            raise _invalid_code()
        entered_code = code.strip().translate(_DIGIT_TRANSLATION)
        if not re.fullmatch(r"\d{5}", entered_code):
            raise _invalid_code()

        now = int(time.time())
        try:
            challenge = otp_store.latest_active(phone, now)
        except Exception as exc:
            del exc
            raise _storage_unavailable()
        if challenge is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="کد تاییدی برای این شماره درخواست نشده یا منقضی شده است.",
            )

        expected_hmac = cls._code_hmac(challenge.challenge_id, entered_code)
        if hmac.compare_digest(expected_hmac, challenge.code_hmac):
            try:
                consumed = otp_store.consume_if_matches(
                    challenge.challenge_id, expected_hmac, now
                )
            except Exception as exc:
                del exc
                raise _storage_unavailable()
            if consumed:
                return True
        else:
            try:
                otp_store.record_failed_attempt(challenge.challenge_id, now)
            except Exception as exc:
                del exc
                raise _storage_unavailable()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="کد تایید وارد شده نادرست است.",
        )
