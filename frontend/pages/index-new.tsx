import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import NavigationNew from '../components/NavigationNew';
import WebGLHero from '../components/WebGLHero';
import ProductCardNew from '../components/ProductCardNew';
import { getProducts, Product } from '../lib/api';

export default function HomeNew() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(products => {
        // Get 6 featured products
        setFeaturedProducts(products.slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const features = [
    {
      icon: '⚡',
      title: 'فعالسازی فوری',
      description: 'دریافت اکانت در کمتر از 30 دقیقه',
    },
    {
      icon: '🔒',
      title: 'امنیت بالا',
      description: 'تضمین امنیت و حریم خصوصی شما',
    },
    {
      icon: '💰',
      title: 'بهترین قیمت',
      description: 'قیمت‌های رقابتی با کیفیت عالی',
    },
    {
      icon: '🎯',
      title: 'پشتیبانی 24/7',
      description: 'همیشه در کنار شما هستیم',
    },
  ];

  const stats = [
    { value: '10K+', label: 'کاربر فعال' },
    { value: '50+', label: 'محصول متنوع' },
    { value: '99.9%', label: 'رضایت مشتری' },
    { value: '24/7', label: 'پشتیبانی' },
  ];

  return (
    <>
      <Head>
        <title>سابیکس - اشتراک هوش مصنوعی در دسترس همه</title>
        <meta name="description" content="دسترسی به بهترین ابزارهای هوش مصنوعی با قیمت مناسب - ChatGPT, Claude, Gemini, Spotify Premium و بیشتر" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-x-hidden" dir="rtl">
        <NavigationNew />

        {/* WebGL Hero Section */}
        <WebGLHero />

        {/* Features Section */}
        <section className="relative py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                چرا سابیکس؟
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                تجربه متفاوت خرید اشتراک با بهترین امکانات
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-blue-500/10 blur-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="relative py-32 px-4" id="products">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                محصولات پیشنهادی
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                دسترسی به قدرتمندترین ابزارهای هوش مصنوعی جهان
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-96 bg-white/5 backdrop-blur-xl rounded-3xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <ProductCardNew key={product.id} product={product} delay={index} />
                ))}
              </div>
            )}

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="/products"
                className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                مشاهده همه محصولات
              </a>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-32 px-4" id="how-it-works">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                نحوه خرید
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                فقط ۳ مرحله ساده تا دریافت اشتراک
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '۱',
                  title: 'محصول را انتخاب کنید',
                  description: 'از بین محصولات متنوع، محصول مورد نظر خود را انتخاب کنید',
                  icon: '🛍️',
                },
                {
                  step: '۲',
                  title: 'با شماره موبایل وارد شوید',
                  description: 'با شماره تلفن خود وارد شوید و پرداخت را انجام دهید',
                  icon: '📱',
                },
                {
                  step: '۳',
                  title: 'اکانت را دریافت کنید',
                  description: 'اکانت شما در کمتر از ۳۰ دقیقه فعال می‌شود',
                  icon: '🚀',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative text-center"
                >
                  <div className="mb-6 inline-block relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mb-4">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                آماده شروع هستید؟
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                همین حالا به هزاران کاربر راضی بپیوندید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  مشاهده محصولات
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  تماس با ما
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">سابیکس</h3>
                <p className="text-gray-400 text-sm">
                  دسترسی آسان به قدرتمندترین ابزارهای هوش مصنوعی
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">لینک‌های مفید</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/products" className="hover:text-white transition-colors">محصولات</a></li>
                  <li><a href="/blog" className="hover:text-white transition-colors">بلاگ</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">تماس با ما</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">پشتیبانی</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/dashboard" className="hover:text-white transition-colors">پنل کاربری</a></li>
                  <li><a href="/help" className="hover:text-white transition-colors">راهنما</a></li>
                  <li><a href="/faq" className="hover:text-white transition-colors">سوالات متداول</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">تماس با ما</h4>
                <p className="text-gray-400 text-sm">
                  پشتیبانی ۲۴/۷
                  <br />
                  support@subix.ir
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
              <p>© 2026 سابیکس. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
