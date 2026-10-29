from unittest import TestCase
from unittest.mock import Mock, patch

from fastapi import HTTPException

from app.core.config import settings
from app.services import otp_store
from app.services.sms import SMSService, normalize_iranian_phone


class SmsServiceTests(TestCase):
    def test_normalizes_supported_iranian_formats_and_digits(self):
        self.assertEqual(normalize_iranian_phone("۰۹۱۲ ۳۴۵ ۶۷۸۹"), "09123456789")
        self.assertEqual(normalize_iranian_phone("+989123456789"), "09123456789")
        self.assertEqual(normalize_iranian_phone("00989123456789"), "09123456789")
        self.assertEqual(normalize_iranian_phone("9123456789"), "09123456789")

    def test_rejects_letters_in_phone_number(self):
        with self.assertRaises(HTTPException) as raised:
            normalize_iranian_phone("09123456789abc")
        self.assertEqual(raised.exception.status_code, 400)

    @patch.object(settings, "sms_ir_parameter_name", "Code")
    @patch.object(settings, "sms_ir_template_id", 0)
    @patch.object(settings, "sms_ir_api_key", "test-key")
    @patch.object(settings, "secret_key", "test-secret")
    def test_rejects_disabled_sms_template_configuration(self):
        with self.assertRaises(HTTPException) as raised:
            SMSService._validate_configuration()

        self.assertEqual(raised.exception.status_code, 503)

    @patch.object(settings, "sms_ir_parameter_name", "Code")
    @patch.object(settings, "sms_ir_template_id", 123456)
    @patch.object(settings, "sms_ir_api_key", "test-key")
    @patch.object(settings, "secret_key", "test-secret")
    @patch("app.services.sms.otp_store.activate", return_value=True)
    @patch("app.services.sms.otp_store.reserve", return_value=True)
    @patch.object(SMSService, "_send_provider_request")
    def test_send_otp_activates_only_after_provider_success(
        self, provider, reserve, activate
    ):
        result = SMSService.send_otp_sync("09123456789")

        self.assertEqual(result["phone_number"], "09123456789")
        self.assertEqual(result["expires_in"], 120)
        self.assertEqual(result["resend_after"], 60)
        self.assertNotIn("debug_code", result)
        reserve.assert_called_once()
        provider.assert_called_once()
        activate.assert_called_once()

    @patch.object(settings, "sms_ir_parameter_name", "Code")
    @patch.object(settings, "sms_ir_template_id", 123456)
    @patch.object(settings, "sms_ir_api_key", "test-key")
    @patch.object(settings, "secret_key", "test-secret")
    @patch("app.services.sms.otp_store.activate")
    @patch("app.services.sms.otp_store.reserve", return_value=True)
    @patch.object(
        SMSService,
        "_send_provider_request",
        side_effect=HTTPException(status_code=503, detail="provider unavailable"),
    )
    def test_provider_failure_does_not_activate_challenge(
        self, provider, reserve, activate
    ):
        with self.assertRaises(HTTPException) as raised:
            SMSService.send_otp_sync("09123456789")

        self.assertEqual(raised.exception.status_code, 503)
        reserve.assert_called_once()
        activate.assert_not_called()

    @patch.object(settings, "sms_ir_parameter_name", "Code")
    @patch.object(settings, "sms_ir_template_id", 123456)
    @patch.object(settings, "sms_ir_api_key", "test-key")
    @patch.object(settings, "secret_key", "test-secret")
    @patch("app.services.sms.otp_store.activate")
    @patch("app.services.sms.otp_store.reserve", return_value=True)
    @patch.object(
        SMSService,
        "_send_provider_request",
        side_effect=HTTPException(
            status_code=503,
            detail="ارسال پیامک موقتاً در دسترس نیست.",
        ),
    )
    def test_provider_template_failure_does_not_activate_challenge(
        self, provider, reserve, activate
    ):
        with self.assertRaises(HTTPException) as raised:
            SMSService.send_otp_sync("09123456789")

        self.assertEqual(raised.exception.status_code, 503)
        reserve.assert_called_once()
        provider.assert_called_once()
        activate.assert_not_called()

    @patch.object(settings, "sms_ir_parameter_name", "Code")
    @patch.object(settings, "sms_ir_template_id", 100000)
    @patch.object(settings, "sms_ir_api_key", "test-key")
    @patch("app.services.sms.httpx.Client")
    def test_provider_template_failure_is_reported_for_non_200_response(self, client):
        response = Mock(
            status_code=400,
            content=b'{"status":113,"message":"template not found"}',
        )
        response.json.return_value = {"status": 113, "message": "template not found"}
        client.return_value.__enter__.return_value.post.return_value = response

        with self.assertRaises(HTTPException) as raised:
            SMSService._send_provider_request("09123456789", "12345")

        self.assertEqual(raised.exception.status_code, 503)
        self.assertNotIn("SMS.ir", raised.exception.detail)

    @patch.object(settings, "secret_key", "test-secret")
    @patch("app.services.sms.otp_store.consume_if_matches", return_value=True)
    @patch("app.services.sms.otp_store.latest_active")
    def test_verification_consumes_matching_code_once(self, latest, consume):
        code_hmac = SMSService._code_hmac("challenge", "12345")
        latest.return_value = otp_store.ActiveChallenge("challenge", code_hmac)

        self.assertTrue(SMSService.verify_otp("09123456789", "۱۲۳۴۵"))
        consume.assert_called_once()


if __name__ == "__main__":
    import unittest

    unittest.main()
