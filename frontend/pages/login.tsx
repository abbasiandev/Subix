import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { SubixLogoIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { loginWithTelegramWidget, setToken } from "@/lib/api";

declare global {
  interface Window {
    onTelegramAuth?: (user: any) => void;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [authenticating, setAuthenticating] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Define global callback for Telegram widget
    window.onTelegramAuth = async (telegramUser: any) => {
      setAuthenticating(true);
      try {
        const response = await loginWithTelegramWidget(telegramUser);
        setToken(response.access_token);
        
        showToast("ورود موفقیت‌آمیز بود", "success");
        
        // Small delay to show success message
        setTimeout(() => {
          router.push("/");
        }, 500);
      } catch (error: any) {
        showToast(
          error.message || "خطا در ورود. لطفاً دوباره تلاش کنید",
          "error"
        );
        setAuthenticating(false);
      }
    };

    return () => {
      delete window.onTelegramAuth;
    };
  }, [router]);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Show loading state if already authenticated
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "your_bot_username";

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-widget.js?22"
        strategy="lazyOnload"
      />

      <div className="min-h-screen flex items-center justify-center bg-surface px-4" dir="rtl">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 text-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center">
              <SubixLogoIcon size={80} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">سابیکس</h1>
            <p className="text-sm text-muted">
              خرید اشتراک‌های دیجیتال با کیفیت بالا
            </p>
          </div>

          {/* Telegram Login Widget */}
          <div className="my-8 flex justify-center">
            {authenticating ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted">در حال ورود...</p>
              </div>
            ) : (
              <script
                async
                src="https://telegram.org/js/telegram-widget.js?22"
                data-telegram-login={botUsername}
                data-size="large"
                data-radius="20"
                data-onauth="onTelegramAuth(user)"
                data-request-access="write"
              />
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-muted mt-6">
            با ورود، شما{" "}
            <a href="/terms" className="text-primary hover:underline">
              شرایط و قوانین
            </a>{" "}
            استفاده را می‌پذیرید
          </p>

          {/* Info note */}
          <div className="mt-8 p-4 bg-primary-light rounded-xl text-right">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>نکته:</strong> برای ورود به سابیکس از حساب تلگرام خود استفاده کنید.
              اطلاعات شما کاملاً محفوظ است.
            </p>
          </div>
        </div>

        {/* Toast notification */}
        {toast && (
          <div
            className={`fixed top-4 inset-x-4 z-50 rounded-xl px-4 py-3 text-white text-sm text-center font-medium shadow-lg mx-auto max-w-md
            ${toast.type === "success" ? "bg-primary" : "bg-red-500"}`}
          >
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
