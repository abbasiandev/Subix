// pages/profile.tsx
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { requestTopup } from "@/lib/api";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [topupAmount, setTopupAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

  // Not logged in yet (no Telegram WebApp)
  if (!loading && !user) {
    return (
      <div className="min-h-dvh bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-16">
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Logo + Welcome */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <p className="text-xl font-bold text-gray-900">به وان‌ساب، خوش آمدید</p>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </div>
            </div>

            <p className="text-right text-sm text-muted mb-3">
              برای ورود، اپ تلگرام را باز کنید و از طریق ربات وارد شوید
            </p>

            <p className="text-right text-xs text-gray-400">
              با ادامه، شما با{" "}
              <span className="text-primary">قوانین و مقررات</span>{" "}
              موافقت می‌کنید
            </p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-surface flex flex-col">

      {/* ── Header ── */}
      <div className="bg-white px-4 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="font-bold text-gray-900">
              {loading ? "..." : `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || user?.username || "کاربر"}
            </p>
            {user?.username && (
              <p className="text-xs text-muted">@{user.username}</p>
            )}
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-lg">
            {user?.first_name?.[0] ?? "U"}
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 pb-28 space-y-4">

        {/* ── Wallet card ── */}
        <div className="bg-primary rounded-2xl p-5 text-white">
          <p className="text-sm opacity-80 text-right mb-1">موجودی کیف پول</p>
          <p className="text-2xl font-bold text-right">
            {loading ? "..." : formatPrice(user?.wallet ?? 0)}
          </p>
        </div>

        {/* ── Topup ── */}
        <div className="card">
          <p className="text-right font-semibold text-gray-800 mb-4">شارژ کیف پول</p>
          <input
            className="input-field mb-3"
            placeholder="مبلغ به تومان"
            type="number"
            value={topupAmount}
            onChange={(e) => setTopupAmount(e.target.value)}
            dir="rtl"
          />
          <button
            className="btn-primary w-full"
            onClick={handleTopup}
            disabled={submitting}
          >
            {submitting ? "در حال ارسال..." : "درخواست شارژ"}
          </button>
        </div>

        {/* ── Info rows ── */}
        <div className="card space-y-3">
          <InfoRow label="شناسه تلگرام" value={String(user?.telegram_id ?? "-")} />
          {user?.username && (
            <InfoRow label="نام کاربری" value={`@${user.username}`} />
          )}
          {user?.phone_number && (
            <InfoRow label="شماره موبایل" value={user.phone_number} />
          )}
          <InfoRow
            label="تاریخ عضویت"
            value={user?.created_at
              ? new Date(user.created_at).toLocaleDateString("fa-IR")
              : "-"}
          />
        </div>

      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-4 inset-x-4 z-50 bg-gray-800 rounded-xl px-4 py-3 text-white text-sm text-center shadow-lg">
          {toast}
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
      <span className="text-gray-800 text-sm">{value}</span>
      <span className="text-muted text-sm">{label}</span>
    </div>
  );
}
