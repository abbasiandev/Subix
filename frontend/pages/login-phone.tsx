import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

export default function LoginPhone() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!phoneNumber.match(/^09\d{9}$/)) {
      setError('شماره موبایل وارد شده صحیح نیست');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Call backend API to send OTP
      // await sendOTP(phoneNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'خطا در ارسال کد');
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
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('لطفاً کد ۶ رقمی را وارد کنید');
      return;
    }

    setLoading(true);

    try {
      // TODO: Call backend API to verify OTP
      // const response = await verifyOTP(phoneNumber, otpCode);
      // setToken(response.access_token);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'کد وارد شده صحیح نیست');
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Call backend API to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('کد مجدداً ارسال شد');
    } catch (err: any) {
      setError(err.message || 'خطا در ارسال مجدد کد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ورود به سابیکس</title>
        <meta name="description" content="ورود یا ثبت‌نام در سابیکس با شماره موبایل" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4" dir="rtl">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Logo variant="full" size="lg" color="primary" animated />
            </div>

            {step === 'phone' ? (
              <>
                <h1 className="text-3xl font-bold text-center mb-2">خوش آمدید</h1>
                <p className="text-gray-400 text-center mb-8">
                  شماره موبایل خود را وارد کنید
                </p>

                <form onSubmit={handlePhoneSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">شماره موبایل</label>
                    <input
                      type="tel"
                      placeholder="09123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      dir="ltr"
                      maxLength={11}
                      disabled={loading}
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
                    disabled={loading || phoneNumber.length !== 11}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ارسال کد...
                      </span>
                    ) : (
                      'دریافت کد تایید'
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                  با ورود به سابیکس،{' '}
                  <a href="/terms" className="text-blue-400 hover:text-blue-300">قوانین و مقررات</a>
                  {' '}را می‌پذیرید
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep('phone')}
                  className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  بازگشت
                </button>

                <h1 className="text-3xl font-bold text-center mb-2">کد تایید</h1>
                <p className="text-gray-400 text-center mb-8">
                  کد ارسال شده به شماره {phoneNumber} را وارد کنید
                </p>

                <form onSubmit={handleOtpSubmit}>
                  <div className="flex gap-2 justify-center mb-6" dir="ltr">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-white text-2xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
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
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال تایید...
                      </span>
                    ) : (
                      'تایید و ورود'
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors disabled:opacity-50"
                  >
                    ارسال مجدد کد
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              بازگشت به صفحه اصلی
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
