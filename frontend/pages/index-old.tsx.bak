import { useRouter } from "next/router";
import { SubixLogoIcon } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import GlassContainer from "@/components/GlassContainer";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isTelegram, isBrowser, isLoading: layoutLoading } = useLayout();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Telegram Mini App users should NEVER see the landing page
  useEffect(() => {
    if (isTelegram && !layoutLoading) {
      router.replace("/dashboard");
    }
  }, [isTelegram, layoutLoading, router]);

  // Browser users who are already logged in should go to dashboard
  useEffect(() => {
    if (isBrowser && !loading && user) {
      router.push("/dashboard");
    }
  }, [isBrowser, loading, user, router]);

  // Fetch products for landing page
  useEffect(() => {
    if (isBrowser && !loading) {
      getProducts()
        .then((data) => {
          // Limit to 6 products for visual balance
          setProducts(data.slice(0, 6));
        })
        .catch((err) => {
          console.error("Failed to fetch products:", err);
        })
        .finally(() => {
          setProductsLoading(false);
        });
    }
  }, [isBrowser, loading]);

  const handleEnterStore = () => {
    router.push("/login");
  };

  // Show loading while detecting context
  if (layoutLoading || isTelegram) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // This landing page is ONLY for desktop/browser users
  if (!isBrowser) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-mesh overflow-hidden" dir="rtl">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 glass-medium px-6 py-3 rounded-xl text-white font-bold focus:outline-none focus:ring-4 focus:ring-white/40"
      >
        پرش به محتوای اصلی
      </a>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-slow gpu-accelerated" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float-gentle gpu-accelerated" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float-slow gpu-accelerated" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-12">
        
        {/* ═══════════════════════════════════════════ */}
        {/* Hero Section with Apple Spatial Depth */}
        {/* ═══════════════════════════════════════════ */}
        <header className="text-center mb-20 pt-8" id="main-content">
          {/* Floating Glass Logo Container */}
          <div className="inline-flex items-center justify-center mb-8 animate-float-gentle">
            <GlassContainer 
              elevation="medium"
              magnetic
              className="rounded-3xl p-8 border-gradient"
            >
              <SubixLogoIcon size={120} />
            </GlassContainer>
          </div>

          {/* Title with Gradient Effect */}
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight animate-fade-up">
            <span className="text-gradient-white">سابیکس</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 font-semibold mb-6 animate-fade-up stagger-1">
            خرید اشتراک‌های هوش مصنوعی
          </p>

          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-up stagger-2">
            دسترسی آسان به بهترین ابزارهای هوش مصنوعی با قیمت مناسب و فعال‌سازی سریع
          </p>
        </header>

        {/* ═══════════════════════════════════════════ */}
        {/* Feature Cards with Glass Morphism */}
        {/* ═══════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1: Fast Activation */}
            <GlassContainer
              elevation="light"
              hover
              className="rounded-3xl p-8 text-center transform-3d animate-fade-up stagger-3"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float-gentle">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">فعال‌سازی سریع</h3>
              <p className="text-white/80 leading-relaxed">
                اشتراک شما در کمتر از 5 دقیقه فعال می‌شود
              </p>
            </GlassContainer>

            {/* Feature 2: Secure Payment */}
            <GlassContainer
              elevation="light"
              hover
              className="rounded-3xl p-8 text-center transform-3d animate-fade-up stagger-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float-gentle" style={{ animationDelay: '1s' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">پرداخت امن</h3>
              <p className="text-white/80 leading-relaxed">
                تراکنش‌های شما با بالاترین استانداردهای امنیتی
              </p>
            </GlassContainer>

            {/* Feature 3: 24/7 Support */}
            <GlassContainer
              elevation="light"
              hover
              className="rounded-3xl p-8 text-center transform-3d animate-fade-up stagger-5"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float-gentle" style={{ animationDelay: '2s' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">پشتیبانی 24/7</h3>
              <p className="text-white/80 leading-relaxed">
                تیم پشتیبانی ما همیشه در کنار شما هستند
              </p>
            </GlassContainer>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Dynamic Product Showcase */}
        {/* ═══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fade-up">
              محصولات محبوب
            </h2>
            <p className="text-xl text-white/80 animate-fade-up stagger-1">
              اشتراک‌های پرطرفدار هوش مصنوعی
            </p>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} delay={i + 1} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <GlassContainer elevation="light" className="rounded-3xl p-12 text-center">
              <p className="text-white/80 text-lg">محصولی یافت نشد</p>
            </GlassContainer>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    delay={index + 1}
                  />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-10">
                <button
                  onClick={handleEnterStore}
                  aria-label="مشاهده تمام محصولات و ورود به فروشگاه"
                  className="glass-light glass-hover rounded-2xl px-8 py-4 text-white font-bold text-lg border border-white/30 transition-all duration-300 hover:border-white/50 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  مشاهده تمام محصولات
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Blog Section */}
        {/* ═══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fade-up">
              📝 بلاگ سابیکس
            </h2>
            <p className="text-xl text-white/80 animate-fade-up stagger-1">
              آخرین مقالات و راهنماهای کاربردی
            </p>
          </div>

          {/* Featured Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <GlassContainer
                  elevation="light"
                  hover
                  className="rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-40 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                    <div className="text-5xl">
                      {post.category === 'guides' ? '📚' : 
                       post.category === 'news' ? '📰' : 
                       post.category === 'comparison' ? '⚖️' : '💡'}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5">
                      <span>{post.readTime} دقیقه</span>
                      <span className="text-teal-400">ادامه مطلب ←</span>
                    </div>
                  </div>
                </GlassContainer>
              </Link>
            ))}
          </div>

          {/* View All Blog Button */}
          <div className="text-center">
            <Link href="/blog">
              <button className="glass-light glass-hover rounded-2xl px-8 py-4 text-white font-bold text-lg border border-white/30 transition-all duration-300 hover:border-white/50">
                مشاهده تمام مقالات
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* CTA Section with Apple Glass Panel */}
        {/* ═══════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto mb-20">
          <GlassContainer 
            elevation="medium" 
            className="rounded-[2.5rem] p-10 md:p-16 text-center border-gradient animate-scale-in"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              آماده شروع هستید؟
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              با ورود به فروشگاه سابیکس، از بهترین اشتراک‌های هوش مصنوعی با قیمت مناسب بهره‌مند شوید
            </p>

            {/* Premium CTA Button */}
            <button
              onClick={handleEnterStore}
              disabled={loading}
              aria-label="ورود به فروشگاه سابیکس"
              className="glass-magnetic inline-flex items-center gap-3 bg-white text-primary font-black text-xl px-14 py-5 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>در حال بارگذاری...</span>
                </>
              ) : (
                <>
                  <span>ورود به فروشگاه</span>
                  <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </>
              )}
            </button>

            {/* Trust Badge */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="glass-subtle rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white/80 font-medium">تأیید شده توسط بیش از 10,000+ کاربر</span>
            </div>
          </GlassContainer>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Footer */}
        {/* ═══════════════════════════════════════════ */}
        <footer className="text-center pb-12">
          <GlassContainer elevation="subtle" className="rounded-3xl p-8 max-w-2xl mx-auto">
            <p className="text-white/70 mb-4">
              © 2025 سابیکس. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center justify-center gap-6">
              <a 
                href="/terms" 
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                شرایط و قوانین
              </a>
              <span className="text-white/40">•</span>
              <a 
                href="/contact" 
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                تماس با ما
              </a>
            </div>
          </GlassContainer>
        </footer>
      </div>
    </div>
  );
}
