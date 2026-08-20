import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubixLogoIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { loginWithTelegramWidget, setToken } from "@/lib/api";
import GlassContainer from "@/components/GlassContainer";

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
  
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "your_bot_username";

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

  // Dynamically inject Telegram widget after script loads
  useEffect(() => {
    if (authenticating || !botUsername || botUsername === "your_bot_username") return;

    const container = document.getElementById("telegram-login-container");
    if (!container) return;

    // Clear previous widget if any
    container.innerHTML = "";

    // Create script element for widget
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "20");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    container.appendChild(script);
  }, [authenticating, botUsername]);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Show loading state if already authenticated
  if (loading || user) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <GlassContainer elevation="medium" className="rounded-3xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-sm">در حال بارگذاری...</p>
        </GlassContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4" dir="rtl">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-slow gpu-accelerated" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float-gentle gpu-accelerated" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-md">
        <GlassContainer elevation="strong" className="rounded-[2.5rem] p-10 text-center animate-scale-in">
          {/* Logo */}
          <div className="mb-8 animate-float-gentle">
            <GlassContainer elevation="medium" className="rounded-3xl p-6 inline-block mb-4">
              <SubixLogoIcon size={80} />
            </GlassContainer>
            <h1 className="text-4xl font-black text-white mb-2">سابیکس</h1>
            <p className="text-white/80 text-lg">
              خرید اشتراک‌های هوش مصنوعی
            </p>
          </div>

          {/* Telegram Login Widget */}
          <div className="my-8 flex justify-center">
            {authenticating ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <p className="text-white font-semibold">در حال ورود...</p>
              </div>
            ) : (
              <div id="telegram-login-container" className="[&_iframe]:rounded-2xl" />
            )}
          </div>

          {/* Terms */}
          <p className="text-sm text-white/70 mt-8">
            با ورود، شما{" "}
            <a href="/terms" className="text-white font-bold hover:underline">
              شرایط و قوانین
            </a>{" "}
            استفاده را می‌پذیرید
          </p>

          {/* Info note */}
          <GlassContainer elevation="subtle" className="mt-8 p-5 rounded-2xl text-right">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-white/80 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-white/90 leading-relaxed">
                برای ورود به سابیکس از حساب تلگرام خود استفاده کنید.
                اطلاعات شما کاملاً محفوظ است.
              </p>
            </div>
          </GlassContainer>
        </GlassContainer>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-8 inset-x-4 z-50 max-w-md mx-auto animate-fade-up">
          <GlassContainer 
            elevation="strong" 
            className={`rounded-2xl px-6 py-4 text-white text-center font-semibold shadow-2xl
              ${toast.type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"}`}
          >
            {toast.msg}
          </GlassContainer>
        </div>
      )}
    </div>
  );
}
