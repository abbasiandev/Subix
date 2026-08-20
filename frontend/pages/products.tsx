import { useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { getProducts, getCategories, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import GlassContainer from "@/components/GlassContainer";

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

  if (authCheckLoading) {
    return <LoadingScreen />;
  }

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="relative container mx-auto px-4 py-8 pb-32 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center animate-fade-up">
          <h1 className="text-5xl font-black text-white mb-3">فروشگاه</h1>
          <p className="text-white/80 text-xl">اشتراک‌های هوش مصنوعی را انتخاب کنید</p>
        </header>

        {/* Category Filter */}
        <GlassContainer elevation="subtle" className="rounded-2xl p-2 mb-10 animate-fade-up stagger-1">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`
                px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300
                ${!selectedCategory
                  ? "glass-medium text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
                }
              `}
            >
              همه محصولات
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`
                  px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300
                  ${selectedCategory === cat
                    ? "glass-medium text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </GlassContainer>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} delay={i + 1} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <GlassContainer elevation="light" className="rounded-3xl p-12 text-center animate-fade-up">
            <svg className="w-24 h-24 text-white/40 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-white/80 text-xl font-bold mb-2">محصولی یافت نشد</p>
            <p className="text-white/60">لطفا دسته‌بندی دیگری را انتخاب کنید</p>
          </GlassContainer>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
