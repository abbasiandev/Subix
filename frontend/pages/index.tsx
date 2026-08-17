import { useRouter } from "next/router";
import { SubixLogoIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isTelegram, isBrowser, isLoading: layoutLoading } = useLayout();

  // Telegram Mini App users should NEVER see the landing page
  // Redirect them immediately to dashboard
  useEffect(() => {
    if (isTelegram && !layoutLoading) {
      router.replace("/dashboard");
    }
  }, [isTelegram, layoutLoading, router]);

  // Browser users who are already logged in should go to dashboard
  useEffect(() => {
    if (isBrowser && !loading && user) {
      router.push("/dashboard");
    }
  }, [isBrowser, loading, user, router]);

  const handleEnterStore = () => {
    // This button is only for browser users (never shown to Telegram)
    router.push("/login");
  };

  // Show loading while detecting context
  if (layoutLoading || isTelegram) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-teal-600">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // This landing page is ONLY for desktop/browser users
  if (!isBrowser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-teal-500 to-teal-600" dir="rtl">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 pt-8">
          <div className="inline-flex items-center justify-center mb-6">
            <SubixLogoIcon size={100} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            سابیکس
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            خرید اشتراک‌های دیجیتال با کیفیت بالا
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">فعال‌سازی سریع</h3>
              <p className="text-white/80 text-sm">
                اشتراک شما در کمتر از 5 دقیقه فعال می‌شود
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">پرداخت امن</h3>
              <p className="text-white/80 text-sm">
                تراکنش‌های شما با بالاترین استانداردهای امنیتی
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">پشتیبانی 24/7</h3>
              <p className="text-white/80 text-sm">
                تیم پشتیبانی ما همیشه در کنار شما هستند
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              آماده شروع هستید؟
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              با ورود به فروشگاه سابیکس، از بهترین اشتراک‌های دیجیتال با قیمت مناسب بهره‌مند شوید
            </p>

            {/* CTA Button */}
            <button
              onClick={handleEnterStore}
              disabled={loading}
              className="inline-flex items-center gap-3 bg-gradient-to-l from-primary to-teal-500 hover:from-teal-600 hover:to-primary text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>در حال بارگذاری...</span>
                </>
              ) : (
                <>
                  <span>ورود به فروشگاه</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </>
              )}
            </button>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>تأیید شده توسط بیش از 10,000+ کاربر</span>
            </div>
          </div>

          {/* Services Preview */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">سرویس‌های موجود</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Netflix", "Spotify", "YouTube Premium", "Amazon Prime", "Disney+", "Apple Music", "HBO Max", "Crunchyroll"].map((service) => (
                <div
                  key={service}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 pb-8">
          <p className="text-white/70 text-sm">
            © 2025 سابیکس. تمامی حقوق محفوظ است.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <a href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
              شرایط و قوانین
            </a>
            <span className="text-white/40">•</span>
            <a href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">
              تماس با ما
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
