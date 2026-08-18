import { useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { getProducts, getCategories, Product } from "@/lib/api";
import Link from "next/link";

export default function ProductsPage() {
  const { loading: authCheckLoading } = useRequireAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
    setLoading(true);
    getProducts(cat || undefined)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (authCheckLoading || loading) {
    return <LoadingScreen />;
  }

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-surface p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">فروشگاه</h1>
          <p className="text-muted">اشتراک‌های هوش مصنوعی را انتخاب کنید</p>
        </div>

        {/* Category filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            همه
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted">محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <span className="inline-block mt-1 px-3 py-1 bg-primary-light text-primary text-xs font-medium rounded-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {product.description && (
                  <p className="text-sm text-muted mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-muted mb-1">قیمت</p>
                    <p className="text-xl font-bold text-primary">
                      {product.price.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted mb-1">مدت زمان</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {product.duration_days} روز
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
