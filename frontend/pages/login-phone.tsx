import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { sendOtp } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPhone() {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const cleanPhone = phoneNumber.trim();
    if (!cleanPhone.match(/^09\d{9}$/)) {
      setError('شماره موبایل وارد شده صحیح نیست (مثال: 09123456789)');
      return;
    }

    setLoading(true);
    
    try {
      const res = await sendOtp(cleanPhone);
      setStep('otp');
      setCountdown(res.expires_in || 120);
      setTimeout(() => document.getElementById('otp-0')?.focus(), 150);
    } catch (err: any) {
      setError(err.message || 'خطا در ارسال کد تایید');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !value.match(/^\d$/)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all 5 digits are filled
    if (newOtp.every(d => d !== '') && value) {
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
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
    if (!pastedData) return;

    const newOtp = pastedData.split('').concat(Array(5 - pastedData.length).fill(''));
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 4);
    document.getElementById(`otp-${focusIndex}`)?.focus();

    if (pastedData.length === 5) {
      executeOtpVerification(pastedData);
    }
  };

  const executeOtpVerification = async (otpCode: string) => {
    setLoading(true);
    setError('');

    try {
      await loginWithPhone(phoneNumber.trim(), otpCode);
      // Redirect to user account dashboard
      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'کد وارد شده صحیح نیست');
      setOtp(['', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      setLoading(false);
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
    if (countdown > 0 || loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await sendOtp(phoneNumber.trim());
      setCountdown(res.expires_in || 120);
      setOtp(['', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } catch (err: any) {
      setError(err.message || 'خطا در ارسال مجدد کد');
    } finally {
      setLoading(false);
    }
  };

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Head>
        <title>ورود با شماره موبایل | سابیکس</title>
        <meta name="description" content="ورود یا ثبت‌نام در سابیکس با شماره موبایل و کد یکبار مصرف پیامکی" />
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
              <Link href="/">
                <Logo variant="full" size="lg" color="primary" animated />
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
                    <label className="block text-sm font-medium mb-2 text-gray-300">شماره موبایل</label>
                    <input
                      type="tel"
                      placeholder="09123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                      dir="ltr"
                      maxLength={11}
                      disabled={loading}
                      autoFocus
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading || phoneNumber.trim().length !== 11}
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
                  با ورود به سابیکس،{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">قوانین و مقررات</Link>
                  {' '}را می‌پذیرید
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep('phone')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm"
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  ویرایش شماره ({phoneNumber})
                </button>

                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">کد تایید پیامکی</h1>
                <p className="text-gray-400 text-center mb-8 text-sm">
                  کد ۵ رقمی ارسال شده به شماره <strong className="text-white dir-ltr">{phoneNumber}</strong> را وارد کنید
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
                        disabled={loading}
                      />
                    ))}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
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
                    {loading ? (
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
