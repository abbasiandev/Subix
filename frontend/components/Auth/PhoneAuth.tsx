import React, { useState, useRef, useEffect } from 'react';
import { designSystem } from '@/styles/apple-design-system';

interface PhoneAuthProps {
  onSuccess: (phoneNumber: string) => void;
}

type AuthStep = 'phone' | 'otp';

/**
 * Phone Authentication Component
 * Two-step authentication: phone number + OTP verification
 */
export const PhoneAuth: React.FC<PhoneAuthProps> = ({ onSuccess }) => {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validatePhone = (phone: string): boolean => {
    // Iranian mobile number format: 09xxxxxxxxx
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhone(phoneNumber)) {
      setError('شماره موبایل معتبر نیست');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setCountdown(120); // 2 minutes
      // Focus first OTP input
      otpInputs.current[0]?.focus();
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (newOtp.every(digit => digit !== '')) {
      handleOtpSubmit(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);

    // Focus last filled input or first empty
    const focusIndex = Math.min(pastedData.length, 5);
    otpInputs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleOtpSubmit(pastedData);
    }
  };

  const handleOtpSubmit = async (otpCode: string) => {
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In production, verify OTP with backend
      if (otpCode === '123456') {
        onSuccess(phoneNumber);
      } else {
        // For demo, accept any 6-digit code
        onSuccess(phoneNumber);
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;

    setOtp(['', '', '', '', '', '']);
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(120);
      otpInputs.current[0]?.focus();
    }, 1000);
  };

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="phone-auth">
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="auth-form">
            <h3 className="auth-title">ورود با شماره موبایل</h3>
            <p className="auth-description">
              برای خرید و دریافت اشتراک، لطفاً شماره موبایل خود را وارد کنید
            </p>

            <div className="input-group">
              <label htmlFor="phone" className="input-label">
                شماره موبایل
              </label>
              <div className="phone-input-wrapper">
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09123456789"
                  className={`phone-input ${error ? 'error' : ''}`}
                  maxLength={11}
                  disabled={isLoading}
                  autoFocus
                />
                <div className="phone-prefix">+۹۸</div>
              </div>
              {error && <span className="error-message">{error}</span>}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading || phoneNumber.length !== 11}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <span>ارسال کد تأیید</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>

            <p className="privacy-note">
              با ورود به سایت، شما{' '}
              <a href="/terms">شرایط و قوانین</a> استفاده از سرویس‌های سابیکس و{' '}
              <a href="/privacy">قوانین حریم خصوصی</a> آن را می‌پذیرید
            </p>
          </form>
        )}

        {step === 'otp' && (
          <div className="otp-form">
            <button className="back-link" onClick={() => setStep('phone')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12 4L6 10L12 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ویرایش شماره موبایل
            </button>

            <h3 className="auth-title">کد تأیید را وارد کنید</h3>
            <p className="auth-description">
              کد ۶ رقمی به شماره{' '}
              <strong>{phoneNumber}</strong> ارسال شد
            </p>

            <div className="otp-inputs" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    otpInputs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="otp-input"
                  maxLength={1}
                  disabled={isLoading}
                />
              ))}
            </div>

            {error && <span className="error-message centered">{error}</span>}

            {countdown > 0 ? (
              <p className="resend-timer">
                ارسال مجدد کد تا {formatCountdown(countdown)}
              </p>
            ) : (
              <button className="resend-button" onClick={handleResendOtp} disabled={isLoading}>
                ارسال مجدد کد تأیید
              </button>
            )}

            {isLoading && (
              <div className="verifying-message">
                <span className="loading-spinner small"></span>
                در حال تأیید کد...
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .phone-auth {
          width: 100%;
        }

        .auth-form,
        .otp-form {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing['6']};
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: ${designSystem.spacing['2']};
          padding: 8px 16px;
          background: transparent;
          border: none;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          cursor: pointer;
          border-radius: ${designSystem.borderRadius.lg};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          width: fit-content;
        }

        .back-link:hover {
          background: ${designSystem.colors.neutral[100]};
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .auth-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
          text-align: center;
        }

        .auth-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          text-align: center;
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        .auth-description strong {
          color: ${designSystem.colors.primary.DEFAULT};
          font-weight: ${designSystem.typography.fontWeight.semibold};
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing['2']};
        }

        .input-label {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.medium};
          color: ${designSystem.colors.text.primary};
        }

        .phone-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .phone-input {
          flex: 1;
          padding: 14px 16px;
          padding-left: 60px;
          font-family: ${designSystem.typography.fontFamily.english};
          font-size: ${designSystem.typography.fontSize.lg};
          color: ${designSystem.colors.text.primary};
          background: ${designSystem.colors.neutral[50]};
          border: 2px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.xl};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          direction: ltr;
          text-align: left;
        }

        .phone-input:focus {
          outline: none;
          border-color: ${designSystem.colors.primary.DEFAULT};
          background: white;
        }

        .phone-input.error {
          border-color: #ef4444;
        }

        .phone-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .phone-prefix {
          position: absolute;
          left: 16px;
          font-family: ${designSystem.typography.fontFamily.english};
          font-size: ${designSystem.typography.fontSize.base};
          color: ${designSystem.colors.text.tertiary};
          pointer-events: none;
        }

        .error-message {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xs};
          color: #ef4444;
        }

        .error-message.centered {
          text-align: center;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${designSystem.spacing['2']};
          padding: 16px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border: none;
          border-radius: ${designSystem.borderRadius.xl};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          min-height: ${designSystem.accessibility.touchTargetSize};
        }

        .submit-button:hover:not(:disabled) {
          background: ${designSystem.colors.primary.dark};
          transform: translateY(-2px);
          box-shadow: ${designSystem.shadows.lg};
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .privacy-note {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xs};
          color: ${designSystem.colors.text.tertiary};
          text-align: center;
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        .privacy-note a {
          color: ${designSystem.colors.primary.DEFAULT};
          text-decoration: none;
        }

        .privacy-note a:hover {
          text-decoration: underline;
        }

        /* OTP Inputs */
        .otp-inputs {
          display: flex;
          gap: ${designSystem.spacing['3']};
          justify-content: center;
          direction: ltr;
        }

        .otp-input {
          width: 48px;
          height: 56px;
          font-family: ${designSystem.typography.fontFamily.english};
          font-size: ${designSystem.typography.fontSize['2xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          text-align: center;
          background: ${designSystem.colors.neutral[50]};
          border: 2px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.xl};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .otp-input:focus {
          outline: none;
          border-color: ${designSystem.colors.primary.DEFAULT};
          background: white;
          transform: scale(1.05);
        }

        .otp-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .resend-timer {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          text-align: center;
          margin: 0;
        }

        .resend-button {
          padding: 12px 24px;
          background: transparent;
          border: 1px solid ${designSystem.colors.neutral[300]};
          border-radius: ${designSystem.borderRadius.lg};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.primary.DEFAULT};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          align-self: center;
        }

        .resend-button:hover:not(:disabled) {
          background: ${designSystem.colors.primary.DEFAULT}10;
          border-color: ${designSystem.colors.primary.DEFAULT};
        }

        .resend-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .verifying-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${designSystem.spacing['2']};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        .loading-spinner.small {
          width: 16px;
          height: 16px;
          border-color: ${designSystem.colors.neutral[300]};
          border-top-color: ${designSystem.colors.primary.DEFAULT};
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .otp-input {
            width: 40px;
            height: 48px;
            font-size: ${designSystem.typography.fontSize.xl};
          }

          .otp-inputs {
            gap: ${designSystem.spacing['2']};
          }
        }
      `}</style>
    </>
  );
};

export default PhoneAuth;
