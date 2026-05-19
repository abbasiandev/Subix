// pages/index.tsx
import { useEffect, useRef, useState } from "react";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { createOrder, getCategories, getProducts, Product } from "@/lib/api";

const CATEGORY_ICONS: Record<string, { icon: string; label: string }> = {
  "ChatGPT":  { icon: "🤖", label: "چت جی‌پی‌تی" },
  "Gemini":   { icon: "✨", label: "جمینی" },
  "Cursor":   { icon: "🖱️", label: "کرسر" },
  "Spotify":  { icon: "🎵", label: "اسپاتیفای" },
  "YouTube":  { icon: "▶️", label: "یوتیوب" },
  "Discord":  { icon: "💬", label: "دیسکورد" },
  "Telegram": { icon: "✈️", label: "تلگرام" },
};

export default function StorePage() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(true);
  const [buyModal, setBuyModal] = useState<Product | null>(null);
  const [buying, setBuying] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .finally(() => setFetching(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory ? p.category === activeCategory : true;
    const matchSearch = search
      ? p.name.includes(search) || p.category.includes(search)
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

  return (
    <div className="min-h-dvh bg-white flex flex-col">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="text-right">
          <p className="text-xs text-muted">سلام، خوش اومدی</p>
          <p className="font-bold text-gray-900">
            {loading ? "..." : user?.first_name ?? user?.username ?? "کاربر"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-primary text-white text-xs font-semibold rounded-xl px-3 py-2 flex items-center gap-1"
            onClick={() => {}}
          >
            <span>💰</span>
            <span>شارژ کیف پول</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm">
            {user?.first_name?.[0] ?? "U"}
          </div>
        </div>
      </div>

      {/* ── Search ── */}
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

      {/* ── Category grid ── */}
      <div className="px-4 pt-2">
        <p className="text-sm font-semibold text-gray-800 mb-3 text-right">دسته‌بندی‌ها</p>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => {
            const meta = CATEGORY_ICONS[cat];
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(active ? null : cat)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl p-2 border transition-all
                  ${active
                    ? "border-primary bg-primary-light"
                    : "border-gray-100 bg-gray-50"
                  }`}
              >
                <span className="text-2xl">{meta?.icon ?? "📦"}</span>
                <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-gray-600"}`}>
                  {meta?.label ?? cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Products ── */}
      <div className="px-4 pt-4 pb-28 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button className="text-xs text-primary font-medium">مشاهده همه</button>
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

      {/* ── Buy confirmation modal ── */}
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

      {/* ── Toast ── */}
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
