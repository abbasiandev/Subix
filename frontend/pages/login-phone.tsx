import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { ApiError, sendOtp } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { normalizeDigits, normalizeIranianPhone, normalizeOtp } from '@/lib/phone';

export default function LoginPhone() {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [canonicalPhone, setCanonicalPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [busyAction, setBusyAction] = useState<'send' | 'verify' | 'resend' | null>(null);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const sendInFlight = useRef(false);
  const verifyInFlight = useRef(false);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendInFlight.current) return;
    setError('');
    
    const cleanPhone = normalizeIranianPhone(phoneNumber);
    if (!cleanPhone) {
      setError('شماره موبایل وارد شده صحیح نیست (مثال: 09123456789 یا +989123456789)');
      return;
    }

    sendInFlight.current = true;
    setLoading(true);
    setBusyAction('send');
    
    try {
      const res = await sendOtp(cleanPhone);
      const serverPhone = normalizeIranianPhone(res.phone_number) ?? cleanPhone;
      setCanonicalPhone(serverPhone);
      setStep('otp');
      setOtp(['', '', '', '', '']);
      setCountdown(Math.max(0, res.resend_after ?? 60));
      setTimeout(() => document.getElementById('otp-0')?.focus(), 150);
    } catch (err: unknown) {
      const apiError = err instanceof ApiError ? err : null;
      if (apiError?.status === 429 && apiError.retryAfter !== null) {
        setCountdown(apiError.retryAfter);
        setError(`لطفاً ${formatCountdown(apiError.retryAfter)} دیگر برای ارسال کد صبر کنید.`);
      } else {
        setError(err instanceof Error ? err.message : 'خطا در ارسال کد تایید');
      }
    } finally {
      sendInFlight.current = false;
      setLoading(false);
      setBusyAction(null);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (loading || verifyInFlight.current) return;
    const digits = normalizeOtp(value);
    const newOtp = [...otp];
    if (digits.length > 1) {
      const startIndex = digits.length === 5 ? 0 : index;
      digits.split('').forEach((digit, offset) => {
        if (startIndex + offset < 5) newOtp[startIndex + offset] = digit;
      });
    } else {
      newOtp[index] = digits;
    }
    setError('');
    setOtp(newOtp);

    // Auto-focus next input
    if (digits && index < 4) {
      const nextInput = document.getElementById(`otp-${Math.min(index + digits.length, 4)}`);
      nextInput?.focus();
    }

    // Auto-submit when all 5 digits are filled
    if (newOtp.every(d => d !== '') && digits) {
      executeOtpVerification(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (loading || verifyInFlight.current) return;
    const pastedData = normalizeOtp(e.clipboardData.getData('text'));
    if (!pastedData) return;

    setError('');
    const newOtp = pastedData.split('').concat(Array(5 - pastedData.length).fill(''));
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 4);
    document.getElementById(`otp-${focusIndex}`)?.focus();

    if (pastedData.length === 5) {
      executeOtpVerification(pastedData);
    }
  };

  const executeOtpVerification = async (otpCode: string) => {
    if (verifyInFlight.current || !canonicalPhone) return;
    verifyInFlight.current = true;
    setLoading(true);
    setBusyAction('verify');
    setError('');

    try {
      await loginWithPhone(canonicalPhone, normalizeDigits(otpCode));
      // Redirect to user account dashboard
      router.push('/account');
    } catch (err: unknown) {
      const apiError = err instanceof ApiError ? err : null;
      if (apiError?.status === 429 && apiError.retryAfter !== null) {
        setCountdown(apiError.retryAfter);
        setError(`لطفاً ${formatCountdown(apiError.retryAfter)} دیگر صبر کنید.`);
      } else {
        setError(err instanceof Error ? err.message : 'کد وارد شده صحیح نیست');
      }
      setOtp(['', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      verifyInFlight.current = false;
      setLoading(false);
      setBusyAction(null);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 5) {
      setError('لطفاً کد ۵ رقمی را کامل وارد کنید');
      return;
    }
    await executeOtpVerification(otpCode);
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || loading || sendInFlight.current || !canonicalPhone) return;
    sendInFlight.current = true;
    setLoading(true);
    setBusyAction('resend');
    setError('');

    try {
      const res = await sendOtp(canonicalPhone);
      setCanonicalPhone(normalizeIranianPhone(res.phone_number) ?? canonicalPhone);
      setCountdown(Math.max(0, res.resend_after ?? 60));
      setOtp(['', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } catch (err: unknown) {
      const apiError = err instanceof ApiError ? err : null;
      if (apiError?.status === 429 && apiError.retryAfter !== null) {
        setCountdown(apiError.retryAfter);
        setError(`لطفاً ${formatCountdown(apiError.retryAfter)} دیگر برای ارسال مجدد صبر کنید.`);
      } else {
        setError(err instanceof Error ? err.message : 'خطا در ارسال مجدد کد');
      }
    } finally {
      sendInFlight.current = false;
      setLoading(false);
      setBusyAction(null);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setCanonicalPhone('');
    setError('');
  };

  const handleEditPhone = () => {
    if (loading) return;
    setStep('phone');
    setCanonicalPhone('');
    setOtp(['', '', '', '', '']);
    setCountdown(0);
    setError('');
  };

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Head>
         <title>ورود با شماره موبایل | فلوکسو</title>
         <meta name="description" content="ورود یا ثبت‌نام در فلوکسو با شماره موبایل و کد یکبار مصرف پیامکی" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4" dir="rtl">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md z-10"
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Link href="/" aria-label="فلوکسو، بازگشت به صفحه اصلی">
                <Logo variant="full" size="lg" color="white" />
              </Link>
            </div>

            {step === 'phone' ? (
              <>
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">ورود با شماره موبایل</h1>
                <p className="text-gray-400 text-center mb-8 text-sm md:text-base">
                  برای دسترسی به حساب کاربری، شماره موبایل خود را وارد کنید
                </p>

                <form onSubmit={handlePhoneSubmit}>
                   <div className="mb-6">
                     <label htmlFor="phone-number" className="block text-sm font-medium mb-2 text-gray-300">شماره موبایل</label>
                     <p className="text-xs text-gray-500 mb-2">با ۰۹ یا کد کشور ایران (+۹۸) وارد کنید</p>
                     <input
                       id="phone-number"
                       type="tel"
                       placeholder="09123456789"
                       value={phoneNumber}
                       onChange={(e) => handlePhoneChange(e.target.value)}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                       dir="ltr"
                       maxLength={16}
                       inputMode="tel"
                       autoComplete="tel"
                       aria-describedby={error ? 'phone-error' : undefined}
                       disabled={loading}
                       autoFocus
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                       id="phone-error"
                       role="alert"
                       className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                     disabled={loading || !normalizeIranianPhone(phoneNumber)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ارسال پیامک...
                      </span>
                    ) : (
                      'دریافت کد تأیید پیامکی'
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                   با ورود به فلوکسو،{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">قوانین و مقررات</Link>
                  {' '}را می‌پذیرید
                </p>
              </>
            ) : (
              <>
                 <button
                   type="button"
                   onClick={handleEditPhone}
                   disabled={loading}
                   className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  ویرایش شماره ({phoneNumber})
                </button>

                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">کد تایید پیامکی</h1>
                <p className="text-gray-400 text-center mb-8 text-sm">
                   کد ۵ رقمی ارسال شده به شماره <strong className="text-white dir-ltr">{canonicalPhone || phoneNumber}</strong> را وارد کنید
                </p>

                <form onSubmit={handleOtpSubmit}>
                  <div className="flex gap-2 justify-center mb-6" dir="ltr" onPaste={handleOtpPaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                         value={digit}
                         onChange={(e) => handleOtpChange(index, e.target.value)}
                         onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-white text-2xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                         maxLength={1}
                         autoComplete={index === 0 ? 'one-time-code' : 'off'}
                         aria-label={`رقم ${index + 1} کد تایید`}
                         aria-describedby={error ? 'otp-error' : undefined}
                         disabled={loading}
                      />
                    ))}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                       id="otp-error"
                       role="alert"
                       className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading || otp.some(d => !d)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                  >
                         {busyAction === 'verify' ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال اعتبارسنجی...
                      </span>
                    ) : (
                      'تأیید و ورود به حساب کاربری'
                    )}
                  </motion.button>

                  <div className="text-center">
                    {countdown > 0 ? (
                      <span className="text-xs text-gray-400">
                        امکان ارسال مجدد کد تا <strong className="text-blue-400 font-mono">{formatCountdown(countdown)}</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                       disabled={loading}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors disabled:opacity-50 underline underline-offset-4"
                      >
                        ارسال مجدد کد تأیید
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
