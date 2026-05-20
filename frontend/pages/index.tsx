// pages/index.tsx
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import BottomNav from "@/components/BottomNav";
import CategoryIcon from "@/components/CategoryIcon";
import ProductCard from "@/components/ProductCard";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { createOrder, getProducts, Product } from "@/lib/api";

const STORE_CATEGORIES = [
  { key: "ChatGPT", label: "چت جی‌پی‌تی", comingSoon: false },
  { key: "Gemini", label: "جمینی", comingSoon: false },
  { key: "Cursor", label: "کرسر", comingSoon: false },
  { key: "Spotify", label: "اسپاتیفای", comingSoon: false },
  { key: "SoundCloud", label: "ساندکلاد", comingSoon: true },
  { key: "YouTube", label: "یوتیوب", comingSoon: true },
  { key: "Discord", label: "دیسکورد", comingSoon: true },
  { key: "Telegram", label: "تلگرام", comingSoon: true },
];

function normalizeSearch(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u064A\u06CC]/g, "ی")
    .replace(/[\u0643\u06A9]/g, "ک")
    .replace(/\u200c/g, "");
}

function productSearchText(product: Product) {
  const categoryLabel =
    STORE_CATEGORIES.find((c) => c.key === product.category)?.label ?? "";
  return normalizeSearch(
    [product.name, product.category, product.description ?? "", categoryLabel].join(" ")
  );
}

export default function StorePage() {
  const router = useRouter();
  const { user, photoUrl, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(true);
  const [buyModal, setBuyModal] = useState<Product | null>(null);
  const [buying, setBuying] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setFetching(false));
  }, []);

  const normalizedSearch = normalizeSearch(search);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory ? p.category === activeCategory : true;
    const matchSearch = normalizedSearch
      ? productSearchText(p).includes(normalizedSearch)
      : true;
    return matchCat && matchSearch;
  });

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleBuy(product: Product) {
    setBuyModal(product);
  }

  async function confirmBuy() {
    if (!buyModal) return;
    setBuying(true);
    try {
      await createOrder(buyModal.id);
      setBuyModal(null);
      showToast("سفارش شما با موفقیت ثبت شد ✅", "success");
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
    } catch (e: any) {
      showToast(e.message ?? "خطا در ثبت سفارش", "error");
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("error");
    } finally {
      setBuying(false);
    }
  }

  function clearFilters() {
    setActiveCategory(null);
    setSearch("");
    searchRef.current?.focus();
  }

  function goToTopup() {
    router.push("/profile?topup=1");
  }

  const displayName = user?.first_name ?? user?.username ?? "کاربر";

  return (
    <div className="min-h-dvh bg-white flex flex-col">

      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="text-right">
          <p className="text-xs text-muted">سلام، خوش اومدی</p>
          <p className="font-bold text-gray-900">
            {loading ? "..." : displayName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-primary text-white text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1"
            onClick={goToTopup}
          >
            <span>💰</span>
            <span>شارژ کیف پول</span>
          </button>
          <UserAvatar
            photoUrl={photoUrl}
            name={displayName}
            size="sm"
          />
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={searchRef}
            className="bg-transparent flex-1 text-right text-sm outline-none placeholder:text-gray-400"
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            dir="rtl"
          />
        </div>
      </div>

      <div className="px-4 pt-2">
        <p className="text-sm font-semibold text-gray-800 mb-3 text-right">دسته‌بندی‌ها</p>
        <div className="grid grid-cols-4 gap-2">
          {STORE_CATEGORIES.map((cat) => {
            const active = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  if (cat.comingSoon) return;
                  setActiveCategory(active ? null : cat.key);
                }}
                disabled={cat.comingSoon}
                className={`relative flex flex-col items-center gap-1.5 rounded-2xl p-2 border transition-all
                  ${cat.comingSoon
                    ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                    : active
                    ? "border-primary bg-primary-light"
                    : "border-gray-100 bg-gray-50"
                  }`}
              >
                {cat.comingSoon && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    به زودی
                  </span>
                )}
                <CategoryIcon category={cat.key} size="sm" />
                <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-gray-600"}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-4 pb-28 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            className="text-xs text-primary font-medium"
            onClick={clearFilters}
          >
            مشاهده همه
          </button>
          <p className="text-sm font-semibold text-gray-800">محصولات</p>
        </div>

        {fetching ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">محصولی یافت نشد</div>
        ) : (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} onBuy={handleBuy} />
          ))
        )}
      </div>

      {buyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-10 animate-slide-up">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <p className="text-right font-bold text-gray-900 text-base mb-1">تأیید خرید</p>
            <p className="text-right text-sm text-muted mb-5">{buyModal.name}</p>

            <div className="bg-gray-50 rounded-xl p-4 mb-5 text-right space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-primary font-bold">
                  {buyModal.price.toLocaleString("fa-IR")} تومان
                </span>
                <span className="text-muted">مبلغ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{buyModal.activation_minutes} دقیقه</span>
                <span className="text-muted">زمان فعال‌سازی</span>
              </div>
            </div>

            <button
              className="btn-primary w-full mb-3"
              onClick={confirmBuy}
              disabled={buying}
            >
              {buying ? "در حال پردازش..." : "تأیید و پرداخت از کیف پول"}
            </button>
            <button
              className="w-full text-sm text-muted py-2"
              onClick={() => setBuyModal(null)}
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed top-4 inset-x-4 z-50 rounded-xl px-4 py-3 text-white text-sm text-center font-medium shadow-lg
          ${toast.type === "success" ? "bg-primary" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
