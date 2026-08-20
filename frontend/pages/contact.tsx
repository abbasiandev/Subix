import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { TelegramIcon } from "@/components/Icons";
import { SUPPORT_URL } from "@/lib/constants";
import GlassContainer from "@/components/GlassContainer";

export default function ContactPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { loading } = useRequireAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return null;

  function openSupport() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    window.open(SUPPORT_URL, "_blank");
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="relative container mx-auto px-4 py-8 pb-32 max-w-3xl">
        
        {/* Header */}
        <header className="mb-8 text-center animate-fade-up">
          <h1 className="text-5xl font-black text-white mb-3">تماس با ما</h1>
          <p className="text-white/80 text-xl">پشتیبانی 24/7 در خدمت شماست</p>
        </header>

        {/* Main Contact Card */}
        <GlassContainer elevation="strong" className="rounded-3xl p-8 mb-6 animate-fade-up stagger-1">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl mb-4 animate-float-gentle">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">چت آنلاین</h2>
            <p className="text-white/70">
              برای دریافت پاسخ سریع با پشتیبانی تلگرام در ارتباط باشید
            </p>
          </div>

          <button
            onClick={openSupport}
            className="w-full glass-magnetic bg-white text-primary font-black text-lg py-5 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <TelegramIcon />
            <span>چت با پشتیبانی در تلگرام</span>
          </button>
        </GlassContainer>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <GlassContainer elevation="light" className="rounded-2xl p-6 animate-fade-up stagger-2">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-right">
                <h3 className="text-white font-bold mb-1">ساعات کاری</h3>
                <p className="text-white/80 text-sm">همه روزه، 24 ساعته</p>
              </div>
            </div>
          </GlassContainer>

          <GlassContainer elevation="light" className="rounded-2xl p-6 animate-fade-up stagger-3">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-right">
                <h3 className="text-white font-bold mb-1">پاسخگویی سریع</h3>
                <p className="text-white/80 text-sm">متوسط زمان پاسخ: کمتر از 5 دقیقه</p>
              </div>
            </div>
          </GlassContainer>
        </div>

        {/* FAQ Section */}
        <GlassContainer elevation="light" className="rounded-3xl p-8 animate-fade-up stagger-4">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            سوالات متداول
          </h3>
          
          <div className="space-y-4">
            <div className="glass-subtle rounded-2xl p-5">
              <h4 className="text-white font-bold mb-2">چگونه اشتراک خریداری کنم؟</h4>
              <p className="text-white/80 text-sm">
                از صفحه فروشگاه محصول مورد نظر را انتخاب کنید و روی دکمه خرید کلیک کنید.
              </p>
            </div>

            <div className="glass-subtle rounded-2xl p-5">
              <h4 className="text-white font-bold mb-2">چقدر طول می‌کشد تا اشتراک فعال شود؟</h4>
              <p className="text-white/80 text-sm">
                اشتراک‌ها معمولا در کمتر از 5 دقیقه فعال می‌شوند.
              </p>
            </div>

            <div className="glass-subtle rounded-2xl p-5">
              <h4 className="text-white font-bold mb-2">آیا می‌توانم کیف پول خود را شارژ کنم؟</h4>
              <p className="text-white/80 text-sm">
                بله، از صفحه پروفایل می‌توانید کیف پول خود را شارژ کنید.
              </p>
            </div>
          </div>
        </GlassContainer>

        {/* Social Links (Optional) */}
        <GlassContainer elevation="subtle" className="rounded-2xl p-6 text-center mt-6 animate-fade-up stagger-5">
          <p className="text-white/70 text-sm mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href={SUPPORT_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all"
            >
              <TelegramIcon color="#ffffff" size={24} />
            </a>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
