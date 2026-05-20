// pages/contact.tsx
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";
import { TelegramIcon } from "@/components/Icons";
import { SUPPORT_URL } from "@/lib/constants";

export default function ContactPage() {
  const router = useRouter();
  const { user } = useAuth();

  function openSupport() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    window.open(SUPPORT_URL, "_blank");
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <div className="flex items-center justify-end px-4 pt-4 pb-2">
        {user ? (
          <span className="text-sm text-muted">
            {user.first_name ?? user.username ?? "کاربر"}
          </span>
        ) : (
          <button
            className="bg-primary text-white text-sm font-semibold rounded-xl px-4 py-2"
            onClick={() => router.push("/profile")}
          >
            ورود
          </button>
        )}
      </div>

      <div className="flex-1 px-4 pt-2 pb-28">
        <p className="text-right text-sm text-muted mb-4">چت آنلاین با پشتیبانی</p>

        <button
          onClick={openSupport}
          className="w-full bg-primary text-white rounded-2xl py-4 flex items-center justify-center gap-3 mb-4 active:scale-95 transition-transform"
        >
          <TelegramIcon />
          <span className="font-semibold text-base">چت با پشتیبانی در تلگرام</span>
        </button>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <TelegramIcon color="#00B894" size={20} />
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
      </div>

      <BottomNav />
    </div>
  );
}
