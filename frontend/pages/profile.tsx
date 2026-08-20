import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { requestTopup } from "@/lib/api";
import GlassContainer from "@/components/GlassContainer";
import { SubixLogoIcon } from "@/components/Icons";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, photoUrl, loading } = useAuth();
  const { loading: authCheckLoading } = useRequireAuth();
  const [topupAmount, setTopupAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const topupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (router.query.topup === "1" && topupRef.current) {
      topupRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [router.query.topup, user]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleTopup() {
    const amount = parseFloat(topupAmount);
    if (!amount || amount < 10000) {
      showToast("حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است");
      return;
    }
    setSubmitting(true);
    try {
      await requestTopup(amount);
      setTopupAmount("");
      showToast("درخواست شارژ ثبت شد. پس از تأیید پرداخت، کیف پول شما شارژ می‌شود ✅");
    } catch (e: any) {
      showToast(e.message ?? "خطا");
    } finally {
      setSubmitting(false);
    }
  }

  if (authCheckLoading) return <LoadingScreen />;
  if (!user) return null;

  const displayName =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
    user.username ||
    "کاربر";

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="relative container mx-auto px-4 py-8 pb-32 max-w-4xl">
        
        {/* Header */}
        <header className="mb-8 text-center animate-fade-up">
          <h1 className="text-5xl font-black text-white mb-3">پروفایل</h1>
          <p className="text-white/80 text-xl">اطلاعات حساب کاربری</p>
        </header>

        {/* User Card */}
        <GlassContainer elevation="medium" className="rounded-3xl p-8 mb-6 text-center animate-fade-up stagger-1">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={displayName}
                  className="w-28 h-28 rounded-3xl object-cover border-4 border-white/30"
                />
              ) : (
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center border-4 border-white/30">
                  <span className="text-5xl font-black text-white">
                    {displayName[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <SubixLogoIcon size={24} />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">{displayName}</h2>
          {user.username && (
            <p className="text-white/70 text-lg mb-4">@{user.username}</p>
          )}

          {/* Wallet Display */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
            <p className="text-white/70 text-sm mb-2">موجودی کیف پول</p>
            <p className="text-4xl font-black text-white">
              {formatPrice(user.wallet ?? 0)}
            </p>
          </div>
        </GlassContainer>

        {/* Topup Card */}
        <GlassContainer elevation="light" className="rounded-3xl p-8 mb-6 animate-fade-up stagger-2" id="topup" ref={topupRef}>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            شارژ کیف پول
          </h3>
          
          <input
            className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-white/50 text-right text-lg outline-none focus:border-white/50 focus:bg-white/15 transition-all mb-4"
            placeholder="مبلغ به تومان (حداقل ۱۰,۰۰۰)"
            type="number"
            value={topupAmount}
            onChange={(e) => setTopupAmount(e.target.value)}
            dir="rtl"
          />
          
          <button
            className="w-full glass-magnetic bg-white text-primary font-black text-lg py-4 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            onClick={handleTopup}
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                در حال ارسال...
              </span>
            ) : (
              "درخواست شارژ"
            )}
          </button>
        </GlassContainer>

        {/* Info Card */}
        <GlassContainer elevation="light" className="rounded-3xl p-8 animate-fade-up stagger-3">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            اطلاعات حساب
          </h3>

          <div className="space-y-4">
            <InfoRow 
              label="شناسه تلگرام" 
              value={String(user.telegram_id ?? "-")}
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              }
            />
            {user.username && (
              <InfoRow 
                label="نام کاربری" 
                value={`@${user.username}`}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
            )}
            {user.phone_number && (
              <InfoRow 
                label="شماره موبایل" 
                value={user.phone_number}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            )}
            <InfoRow
              label="تاریخ عضویت"
              value={user.created_at ? new Date(user.created_at).toLocaleDateString("fa-IR") : "-"}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
        </GlassContainer>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 inset-x-4 z-50 max-w-md mx-auto animate-fade-up">
          <GlassContainer elevation="strong" className="rounded-2xl px-6 py-4 text-white text-center shadow-2xl">
            {toast}
          </GlassContainer>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 px-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
      <div className="flex items-center gap-3">
        <div className="text-white/70">{icon}</div>
        <span className="text-white font-mono text-sm">{value}</span>
      </div>
      <span className="text-white/70 font-bold">{label}</span>
    </div>
  );
}
