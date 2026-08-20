import { FormEvent, useEffect, useState } from "react";
import {
  getAdminProducts,
  Product,
  setAdminKey,
  updateProductPrice,
} from "@/lib/api";
import GlassContainer from "@/components/GlassContainer";

const ADMIN_KEY_STORAGE = "subix_admin_key";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

function parsePriceInput(value: string): number | null {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [rowStatus, setRowStatus] = useState<
    Record<number, { type: "ok" | "err"; msg: string }>
  >({});
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (saved) {
      setAdminKey(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);
    setFetchError(null);
    getAdminProducts()
      .then((items) => {
        setProducts(items);
        const initial: Record<number, string> = {};
        for (const p of items) {
          initial[p.id] = String(p.price);
        }
        setDrafts(initial);
      })
      .catch((e) => setFetchError(e.message ?? "خطا در بارگذاری محصولات"))
      .finally(() => setLoading(false));
  }, [authenticated]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setKeyError(null);
    const key = keyInput.trim();
    if (!key) {
      setKeyError("کلید ادمین را وارد کنید");
      return;
    }

    setAdminKey(key);
    try {
      await getAdminProducts();
      sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
      setAuthenticated(true);
    } catch {
      setAdminKey("");
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      setKeyError("کلید ادمین نامعتبر است");
    }
  }

  function handleLogout() {
    setAdminKey("");
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAuthenticated(false);
    setKeyInput("");
    setProducts([]);
    setDrafts({});
    setRowStatus({});
  }

  async function handleSave(product: Product) {
    const price = parsePriceInput(drafts[product.id] ?? "");
    if (price === null) {
      setRowStatus((s) => ({
        ...s,
        [product.id]: { type: "err", msg: "قیمت باید عدد مثبت باشد" },
      }));
      return;
    }

    setSavingId(product.id);
    setRowStatus((s) => {
      const next = { ...s };
      delete next[product.id];
      return next;
    });

    try {
      const updated = await updateProductPrice(product.id, price);
      setProducts((items) =>
        items.map((p) => (p.id === updated.id ? updated : p))
      );
      setDrafts((d) => ({ ...d, [product.id]: String(updated.price) }));
      setRowStatus((s) => ({
        ...s,
        [product.id]: { type: "ok", msg: "ذخیره شد" },
      }));
    } catch (e) {
      setRowStatus((s) => ({
        ...s,
        [product.id]: {
          type: "err",
          msg: e instanceof Error ? e.message : "خطا در ذخیره",
        },
      }));
    } finally {
      setSavingId(null);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center p-4">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-slow gpu-accelerated" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float-gentle gpu-accelerated" style={{ animationDelay: '2s' }} />
        </div>

        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md animate-scale-in"
        >
          <GlassContainer elevation="strong" className="rounded-3xl p-8 space-y-6">
            <div className="text-center">
              <svg className="w-16 h-16 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h1 className="text-3xl font-black text-white mb-2">مدیریت قیمت‌ها</h1>
              <p className="text-white/80">
                کلید ادمین را از فایل <code className="text-xs font-mono bg-white/10 px-2 py-1 rounded">backend/.env</code> وارد کنید
              </p>
            </div>

            <div>
              <label htmlFor="admin-key" className="block text-white font-bold mb-2">
                کلید ادمین
              </label>
              <input
                id="admin-key"
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-2xl px-5 py-4 text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                placeholder="ADMIN_SECRET"
                autoComplete="off"
              />
            </div>

            {keyError && (
              <GlassContainer elevation="subtle" className="rounded-xl p-3 bg-red-500/20 border-red-500/30">
                <p className="text-white text-sm text-center">{keyError}</p>
              </GlassContainer>
            )}

            <button type="submit" className="w-full glass-magnetic bg-white text-primary font-black text-lg py-4 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
              ورود به پنل ادمین
            </button>
          </GlassContainer>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <GlassContainer elevation="medium" className="rounded-3xl p-6 mb-8 flex items-center justify-between animate-fade-up">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">مدیریت قیمت‌ها</h1>
            <p className="text-white/70 text-sm">
              تغییرات بلافاصله در فروشگاه اعمال می‌شود
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="glass-subtle px-5 py-3 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
          >
            خروج
          </button>
        </GlassContainer>

        <main className="space-y-4">
          {loading && (
            <GlassContainer elevation="light" className="rounded-2xl p-12 text-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white">در حال بارگذاری...</p>
            </GlassContainer>
          )}

          {fetchError && (
            <GlassContainer elevation="light" className="rounded-2xl p-6 bg-red-500/20 border-red-500/30">
              <p className="text-white text-center">{fetchError}</p>
            </GlassContainer>
          )}

          {!loading && !fetchError && products.length === 0 && (
            <GlassContainer elevation="light" className="rounded-2xl p-12 text-center">
              <p className="text-white/70">محصولی یافت نشد</p>
            </GlassContainer>
          )}

          {products.map((product, index) => {
            const status = rowStatus[product.id];
            const unchanged =
              parsePriceInput(drafts[product.id] ?? "") === product.price;

            return (
              <GlassContainer 
                key={product.id} 
                elevation="light" 
                hover
                className={`rounded-2xl p-6 animate-fade-up stagger-${Math.min(index + 1, 8)}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg text-white mb-1">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <span className="px-3 py-1 bg-white/10 rounded-lg">{product.category}</span>
                      {!product.is_active && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg">غیرفعال</span>
                      )}
                    </div>
                    <p className="text-white/80 mt-2">
                      قیمت فعلی: <span className="font-bold">{formatPrice(product.price)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={drafts[product.id] ?? ""}
                      onChange={(e) =>
                        setDrafts((d) => ({ ...d, [product.id]: e.target.value }))
                      }
                      className="w-36 bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white text-left dir-ltr outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                      aria-label={`قیمت ${product.name}`}
                    />
                    <span className="text-white/70 text-sm">تومان</span>
                    <button
                      type="button"
                      onClick={() => handleSave(product)}
                      disabled={savingId === product.id || unchanged}
                      className="bg-white text-primary font-bold rounded-xl py-3 px-6 disabled:opacity-50 hover:shadow-lg transition-all"
                    >
                      {savingId === product.id ? "..." : "ذخیره"}
                    </button>
                  </div>
                </div>

                {status && (
                  <div className={`mt-4 p-3 rounded-xl ${
                    status.type === "ok" 
                      ? "bg-emerald-500/20 border border-emerald-500/30" 
                      : "bg-red-500/20 border border-red-500/30"
                  }`}>
                    <p className={`text-sm ${
                      status.type === "ok" ? "text-emerald-300" : "text-red-300"
                    }`}>
                      {status.msg}
                    </p>
                  </div>
                )}
              </GlassContainer>
            );
          })}
        </main>
      </div>
    </div>
  );
}
