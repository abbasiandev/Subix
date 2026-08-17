import {FormEvent, useEffect, useState} from "react";
import {
    getAdminProducts,
    Product,
    setAdminKey,
    updateProductPrice,
} from "@/lib/api";

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
                [product.id]: {type: "err", msg: "قیمت باید عدد مثبت باشد"},
            }));
            return;
        }

        setSavingId(product.id);
        setRowStatus((s) => {
            const next = {...s};
            delete next[product.id];
            return next;
        });

        try {
            const updated = await updateProductPrice(product.id, price);
            setProducts((items) =>
                items.map((p) => (p.id === updated.id ? updated : p))
            );
            setDrafts((d) => ({...d, [product.id]: String(updated.price)}));
            setRowStatus((s) => ({
                ...s,
                [product.id]: {type: "ok", msg: "ذخیره شد"},
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
                >
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">مدیریت قیمت‌ها</h1>
                        <p className="text-sm text-muted mt-1">
                            کلید ادمین را از فایل <code className="text-xs">backend/.env</code>{" "}
                            وارد کنید.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="admin-key" className="block text-sm font-medium mb-1">
                            کلید ادمین
                        </label>
                        <input
                            id="admin-key"
                            type="password"
                            value={keyInput}
                            onChange={(e) => setKeyInput(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            placeholder="ADMIN_SECRET"
                            autoComplete="off"
                        />
                    </div>

                    {keyError && (
                        <p className="text-sm text-red-600">{keyError}</p>
                    )}

                    <button type="submit" className="btn-primary w-full">
                        ورود
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-gray-900">مدیریت قیمت‌ها</h1>
                    <p className="text-xs text-muted mt-0.5">
                        تغییرات بلافاصله در فروشگاه اعمال می‌شود
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-800"
                >
                    خروج
                </button>
            </header>

            <main className="max-w-3xl mx-auto p-4 space-y-3">
                {loading && (
                    <p className="text-sm text-muted text-center py-8">در حال بارگذاری...</p>
                )}

                {fetchError && (
                    <div className="bg-red-50 text-red-700 text-sm rounded-xl p-4">
                        {fetchError}
                    </div>
                )}

                {!loading && !fetchError && products.length === 0 && (
                    <p className="text-sm text-muted text-center py-8">محصولی یافت نشد</p>
                )}

                {products.map((product) => {
                    const status = rowStatus[product.id];
                    const unchanged =
                        parsePriceInput(drafts[product.id] ?? "") === product.price;

                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-muted mt-0.5">
                                        {product.category}
                                        {!product.is_active && " • غیرفعال"}
                                    </p>
                                    <p className="text-xs text-muted mt-1">
                                        قیمت فعلی: {formatPrice(product.price)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={drafts[product.id] ?? ""}
                                        onChange={(e) =>
                                            setDrafts((d) => ({...d, [product.id]: e.target.value}))
                                        }
                                        className="w-32 rounded-xl border border-gray-200 px-3 py-2 text-sm text-left dir-ltr focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        aria-label={`قیمت ${product.name}`}
                                    />
                                    <span className="text-xs text-muted">تومان</span>
                                    <button
                                        type="button"
                                        onClick={() => handleSave(product)}
                                        disabled={savingId === product.id || unchanged}
                                        className="bg-primary text-white text-xs font-semibold rounded-xl py-2 px-4 disabled:opacity-50 active:scale-95 transition-transform"
                                    >
                                        {savingId === product.id ? "..." : "ذخیره"}
                                    </button>
                                </div>
                            </div>

                            {status && (
                                <p
                                    className={`text-xs mt-2 ${
                                        status.type === "ok" ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {status.msg}
                                </p>
                            )}
                        </div>
                    );
                })}
            </main>
        </div>
    );
}
