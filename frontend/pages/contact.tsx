// pages/contact.tsx
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";

export default function ContactPage() {
  const { user } = useAuth();

  function openSupport() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    window.open("https://t.me/your_support_username", "_blank");
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div /> {/* spacer */}
        {user ? (
          <span className="text-sm text-muted">
            {user.first_name ?? user.username ?? "کاربر"}
          </span>
        ) : (
          <button
            className="bg-primary text-white text-sm font-semibold rounded-xl px-4 py-2"
            onClick={() => {}}
          >
            ورود
          </button>
        )}
      </div>

      <div className="flex-1 px-4 pt-2 pb-28">

        {/* ── Section title ── */}
        <p className="text-right text-sm text-muted mb-4">چت آنلاین با پشتیبانی</p>

        {/* ── Telegram support button ── matching green CTA in screenshot ── */}
        <button
          onClick={openSupport}
          className="w-full bg-primary text-white rounded-2xl py-4 flex items-center justify-center gap-3 mb-4 active:scale-95 transition-transform"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 7.5a2.25 2.25 0 00.023 4.114l3.8 1.498 1.497 4.743a1.125 1.125 0 001.873.398l2.396-2.4 4.052 3.044a2.25 2.25 0 003.497-1.378l2.7-13.5a2.25 2.25 0 00-2.316-2.234z"
              fill="white"
            />
          </svg>
          <span className="font-semibold text-base">چت با پشتیبانی در تلگرام</span>
        </button>

        {/* ── Support info card ── matching screenshot card ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 7.5a2.25 2.25 0 00.023 4.114l3.8 1.498 1.497 4.743a1.125 1.125 0 001.873.398l2.396-2.4 4.052 3.044a2.25 2.25 0 003.497-1.378l2.7-13.5a2.25 2.25 0 00-2.316-2.234z"
                fill="#2DC572"
              />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="font-semibold text-gray-900 text-sm mb-1.5">پشتیبانی تلگرام</p>
            <p className="text-xs text-muted leading-6">
              برای دریافت پاسخ سریع‌تر، می‌توانید از طریق تلگرام با تیم
              پشتیبانی ما در ارتباط باشید. تیم پشتیبانی ما در ساعات
              کاری آماده پاسخگویی است.
            </p>
          </div>
        </div>

        {/* ── Working hours ── */}
        <div className="mt-4 bg-gray-50 rounded-2xl p-4 text-right space-y-2">
          <p className="font-semibold text-gray-800 text-sm">ساعات پشتیبانی</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-800">۹ صبح تا ۱۱ شب</span>
            <span className="text-muted">شنبه تا چهارشنبه</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-800">۹ صبح تا ۶ عصر</span>
            <span className="text-muted">پنجشنبه</span>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
