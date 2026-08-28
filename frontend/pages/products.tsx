import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationNew from '../components/NavigationNew';
import ProductCardNew from '../components/ProductCardNew';
import { getProducts, getCategories, Product } from '../lib/api';

export default function ProductsNew() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'popular'>('popular');

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        
        // Calculate price range
        if (prods.length > 0) {
          const prices = prods.map(p => p.price);
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
        break;
      case 'popular':
      default:
        // Keep original order (from backend)
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory || searchQuery || sortBy !== 'popular';

  return (
    <>
      <Head>
        <title>محصولات - سابیکس</title>
        <meta name="description" content="مشاهده و خرید تمام محصولات اشتراک هوش مصنوعی - ChatGPT, Claude, Gemini, Spotify و بیشتر" />
      </Head>

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <NavigationNew />

        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                همه محصولات
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {filteredProducts.length} محصول در دسترس
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-32 space-y-6">
                  {/* Search */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold mb-4">جستجو</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="نام محصول یا دسته‌بندی..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold mb-4">دسته‌بندی</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-right px-4 py-2.5 rounded-xl font-medium transition-all ${
                          !selectedCategory
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        همه محصولات
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-right px-4 py-2.5 rounded-xl font-medium transition-all ${
                            selectedCategory === category
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold mb-4">مرتب‌سازی</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    >
                      <option value="popular">محبوب‌ترین</option>
                      <option value="price-asc">ارزان‌ترین</option>
                      <option value="price-desc">گران‌ترین</option>
                      <option value="name">بر اساس نام</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={clearFilters}
                      className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                    >
                      پاک کردن فیلترها
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="h-96 bg-white/5 backdrop-blur-xl rounded-3xl animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold mb-2">محصولی یافت نشد</h3>
                    <p className="text-gray-400 mb-6">
                      لطفاً فیلترها را تغییر دهید یا جستجوی دیگری انجام دهید
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all"
                    >
                      نمایش همه محصولات
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProductCardNew product={product} delay={index % 9} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
