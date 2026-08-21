import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavigationNew from '../components/NavigationNew';
import ProductCardNew from '../components/ProductCardNew';
import { getProduct, getProducts, Product } from '../lib/api';
import { getProductIcon, getCategoryColor } from '../data/product-icons';

export default function ProductDetailNew() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'features' | 'faq' | 'reviews'>('features');

  useEffect(() => {
    if (!id) return;
    
    Promise.all([
      getProduct(Number(id)),
      getProducts(),
    ])
      .then(([prod, allProds]) => {
        setProduct(prod);
        
        // Get 3 related products from same category
        const related = allProds
          .filter(p => p.category === prod?.category && p.id !== prod?.id)
          .slice(0, 3);
        setRelatedProducts(related);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const IconComponent = getProductIcon(product.name, product.category);
  const categoryColor = getCategoryColor(product.category);

  const features = [
    { icon: '⚡', title: 'فعالسازی سریع', description: `فعالسازی در ${product.activation_minutes} دقیقه` },
    { icon: '📅', title: 'مدت زمان', description: `${product.duration_days} روز اعتبار` },
    { icon: '🔒', title: 'امنیت بالا', description: 'تضمین امنیت و حریم خصوصی' },
    { icon: '💬', title: 'پشتیبانی 24/7', description: 'همیشه در کنار شما' },
  ];

  const faqs = [
    { q: 'چگونه اکانت را دریافت می‌کنم؟', a: 'بعد از پرداخت، اکانت در پنل کاربری شما نمایش داده می‌شود.' },
    { q: 'آیا می‌توانم اکانت را به اشتراک بگذارم؟', a: 'بله، اکانت برای استفاده شخصی شما است و می‌توانید در چند دستگاه استفاده کنید.' },
    { q: 'در صورت مشکل چه کنم؟', a: 'با پشتیبانی 24/7 ما تماس بگیرید، ما به شما کمک خواهیم کرد.' },
  ];

  return (
    <>
      <Head>
        <title>{product.name} - سابیکس</title>
        <meta name="description" content={product.description || product.name} />
      </Head>

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <NavigationNew />

        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">خانه</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">محصولات</Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </motion.div>

            {/* Product Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Left: Icon and Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="w-32 h-32 rounded-3xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                >
                  <div className="w-20 h-20">
                    <IconComponent />
                  </div>
                </div>

                <span
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                  style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                >
                  {product.category}
                </span>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                
                {product.description && (
                  <p className="text-xl text-gray-400 mb-8">{product.description}</p>
                )}

                <div className="flex flex-wrap gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/10"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{feature.title}</p>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Purchase Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="sticky top-32 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-2">قیمت</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-5xl font-bold">
                        {product.price.toLocaleString('fa-IR')}
                      </p>
                      <p className="text-xl text-gray-400">تومان</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {(product.price / product.duration_days).toLocaleString('fa-IR')} تومان در روز
                    </p>
                  </div>

                  <div className="space-y-3 mb-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">مدت زمان</span>
                      <span className="font-medium">{product.duration_days} روز</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">فعالسازی</span>
                      <span className="font-medium">{product.activation_minutes} دقیقه</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">نوع</span>
                      <span className="font-medium">
                        {product.activation_type === 'ready_email' ? 'ایمیل آماده' : 'ایمیل شخصی'}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/login')}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 mb-4"
                  >
                    خرید و دریافت
                  </motion.button>

                  <p className="text-center text-sm text-gray-400">
                    برای خرید وارد حساب کاربری شوید
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <div className="flex gap-4 mb-8 overflow-x-auto">
                {[
                  { id: 'features', label: 'ویژگی‌ها' },
                  { id: 'faq', label: 'سوالات متداول' },
                  { id: 'reviews', label: 'نظرات' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                      selectedTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {selectedTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === 'faq' && (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                    >
                      <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                      <p className="text-gray-400">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/10">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-2xl font-bold mb-2">هنوز نظری ثبت نشده</h3>
                  <p className="text-gray-400">اولین نفری باشید که نظر می‌دهد!</p>
                </div>
              )}
            </motion.div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8">محصولات مشابه</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                    <ProductCardNew key={relatedProduct.id} product={relatedProduct} delay={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
