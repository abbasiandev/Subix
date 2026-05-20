// pages/profile.tsx
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import BottomNav from "@/components/BottomNav";
import UserAvatar from "@/components/UserAvatar";
import { SubixLogoIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { requestTopup } from "@/lib/api";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, photoUrl, loading, error, isTelegram } = useAuth();
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

  const displayName =
    `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
    user?.username ||
    "کاربر";

  if (!user) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col">
        <div className="flex-1 px-4 pt-12">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-end gap-3 mb-6">
              <p className="text-lg font-bold text-gray-900">به سابیکس، خوش آمدید</p>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <SubixLogoIcon />
              </div>
            </div>

            {loading ? (
              <p className="text-right text-sm text-muted">
                در حال ورود با حساب تلگرام...
              </p>
            ) : error ? (
              <p className="text-right text-sm text-red-500">{error}</p>
            ) : isTelegram ? (
              <p className="text-right text-sm text-muted">
                ورود خودکار از طریق تلگرام فعال است. لطفاً چند لحظه صبر کنید یا
                اپ را ببندید و دوباره از ربات باز کنید.
              </p>
            ) : (
              <p className="text-right text-sm text-muted">
                برای ورود، اپلیکیشن را از طریق ربات تلگرام باز کنید.
              </p>
            )}

            <p className="text-right text-xs text-gray-400 mt-5">
              با ادامه، شما با{" "}
              <span className="text-primary cursor-pointer">قوانین و مقررات</span>{" "}
              موافقت می‌کنید
            </p>
          </div>
        </div>

        {toast && (
          <div className="fixed top-4 inset-x-4 z-50 bg-gray-800 rounded-xl px-4 py-3 text-white text-sm text-center shadow-lg">
            {toast}
          </div>
        )}

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-surface flex flex-col">
      <div className="bg-white px-4 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="font-bold text-gray-900">
              {loading ? "..." : displayName}
            </p>
            {user?.username && (
              <p className="text-xs text-muted">@{user.username}</p>
            )}
          </div>
          <UserAvatar
            photoUrl={photoUrl}
            name={displayName}
            size="md"
            shape="square"
          />
        </div>
      </div>

      <div className="flex-1 px-4 py-4 pb-28 space-y-4">
        <div className="bg-primary rounded-2xl p-5 text-white">
          <p className="text-sm opacity-80 text-right mb-1">موجودی کیف پول</p>
          <p className="text-2xl font-bold text-right">
            {loading ? "..." : formatPrice(user?.wallet ?? 0)}
          </p>
        </div>

        <div className="card" id="topup" ref={topupRef}>
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
            value={
              user?.created_at
                ? new Date(user.created_at).toLocaleDateString("fa-IR")
                : "-"
            }
          />
        </div>
      </div>

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
