import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isTelegram, isBrowser, isLoading: layoutLoading } = useLayout();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    if (isTelegram && !layoutLoading) {
      router.replace("/dashboard");
    }
  }, [isTelegram, layoutLoading, router]);

  useEffect(() => {
    if (isBrowser && !loading && user) {
      router.push("/dashboard");
    }
  }, [isBrowser, loading, user, router]);

  useEffect(() => {
    if (isBrowser && !loading) {
      getProducts()
        .then((data) => setProducts(data.slice(0, 6)))
        .catch((err) => console.error("Failed to fetch products:", err))
        .finally(() => setProductsLoading(false));
    }
  }, [isBrowser, loading]);

  if (layoutLoading || isTelegram) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cosmic-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isBrowser) return null;

  return (
    <div className="cosmic-bg" dir="rtl">
      <div className="starfield" />
      
      {/* Hero Section - Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container-apple text-center z-10">
          <div className="fade-in-up">
            <p className="body-large text-cosmic-orange mb-4">معرفی</p>
            <h1 className="hero-display mb-6">
              سابیکس
            </h1>
            <p className="headline text-gray-200 mb-12 max-w-3xl mx-auto">
              دنیای هوش مصنوعی را با اشتراک‌های پرمیوم تجربه کنید
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/login">
                <button className="btn-primary">
                  ورود به فروشگاه
                </button>
              </Link>
              <Link href="#products">
                <button className="btn-secondary">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in delay-3">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing">
        <div className="container-apple">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up delay-1">
              <div className="display-number mb-4">۹۹٪</div>
              <p className="body-large">رضایت مشتریان</p>
            </div>
            <div className="text-center fade-in-up delay-2">
              <div className="display-number mb-4">۵<span className="text-6xl">دقیقه</span></div>
              <p className="body-large">فعال‌سازی سریع</p>
            </div>
            <div className="text-center fade-in-up delay-3">
              <div className="display-number mb-4">۲۴/۷</div>
              <p className="body-large">پشتیبانی</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section id="products" className="section-spacing">
        <div className="container-apple">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="section-title mb-6">
              محصولات پیشرفته
            </h2>
            <p className="body-large max-w-2xl mx-auto">
              اشتراک‌های پرمیوم هوش مصنوعی با بهترین قیمت و کیفیت
            </p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card rounded-3xl p-8 h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <AppleProductCard key={product.id} product={product} delay={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container-apple">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="section-title mb-6">
                فعال‌سازی فوری
              </h2>
              <p className="body-large mb-8">
                اشتراک شما در کمتر از ۵ دقیقه فعال می‌شود. بدون انتظار، بدون پیچیدگی.
              </p>
              <div className="spec-grid">
                <div className="spec-item">
                  <div className="spec-label">سرعت</div>
                  <div className="spec-value">۵ دقیقه</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">قابلیت اطمینان</div>
                  <div className="spec-value">۹۹٪</div>
                </div>
              </div>
            </div>
            <div className="glass-premium rounded-3xl p-16 text-center fade-in-up delay-2">
              <div className="display-number">۵×</div>
              <p className="headline mt-4">سریع‌تر از روش‌های سنتی</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="section-spacing bg-gradient-to-b from-transparent to-space-blue/30">
        <div className="container-apple text-center">
          <div className="fade-in-up">
            <h2 className="section-title mb-6">
              امنیت در اولویت
            </h2>
            <p className="body-large max-w-2xl mx-auto mb-12">
              تمامی تراکنش‌ها با بالاترین استانداردهای امنیتی انجام می‌شود
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-8 fade-in-up delay-1">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cosmic-orange to-cosmic-purple flex items-center justify-center text-3xl">
                  🔒
                </div>
                <h3 className="headline text-xl mb-3">رمزنگاری پیشرفته</h3>
                <p className="body">اطلاعات شما با رمزنگاری ۲۵۶ بیتی محافظت می‌شود</p>
              </div>
              <div className="glass-card rounded-2xl p-8 fade-in-up delay-2">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cosmic-purple to-aurora-green flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h3 className="headline text-xl mb-3">تضمین کیفیت</h3>
                <p className="body">اشتراک‌های اصل و تست شده</p>
              </div>
              <div className="glass-card rounded-2xl p-8 fade-in-up delay-3">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-aurora-green to-cosmic-orange flex items-center justify-center text-3xl">
                  🛡️
                </div>
                <h3 className="headline text-xl mb-3">پشتیبانی ۲۴/۷</h3>
                <p className="body">تیم پشتیبانی همیشه در دسترس شماست</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-apple">
          <div className="glass-premium rounded-[3rem] p-16 text-center fade-in-up">
            <h2 className="section-title mb-6">
              آماده شروع هستید؟
            </h2>
            <p className="body-large mb-10 max-w-2xl mx-auto">
              به هزاران کاربر راضی بپیوندید و از اشتراک‌های پرمیوم هوش مصنوعی بهره‌مند شوید
            </p>
            <Link href="/login">
              <button className="btn-primary text-lg px-10 py-4">
                شروع کنید
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container-apple">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="headline text-lg mb-4">سابیکس</h4>
              <p className="caption">پلتفرم خرید اشتراک هوش مصنوعی</p>
            </div>
            <div>
              <h4 className="body font-semibold mb-4 text-white">محصولات</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="caption hover:text-white transition">فروشگاه</Link></li>
                <li><Link href="/blog" className="caption hover:text-white transition">بلاگ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="body font-semibold mb-4 text-white">پشتیبانی</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="caption hover:text-white transition">تماس با ما</Link></li>
                <li><Link href="/contact#faq" className="caption hover:text-white transition">سوالات متداول</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="body font-semibold mb-4 text-white">قانونی</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="caption hover:text-white transition">حریم خصوصی</Link></li>
                <li><Link href="/terms" className="caption hover:text-white transition">شرایط استفاده</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/10">
            <p className="caption">© ۲۰۲۶ سابیکس. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Apple-style Product Card Component
function AppleProductCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div 
        className="glass-card rounded-3xl p-8 cursor-pointer fade-in-up gpu-accelerate group"
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        {/* Product Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cosmic-orange/20 to-cosmic-purple/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
          {getProductIcon(product.category)}
        </div>
        
        {/* Product Name */}
        <h3 className="headline text-2xl text-center mb-4">{product.category}</h3>
        
        {/* Price */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-gradient">
            {product.price.toLocaleString('fa-IR')}
          </span>
          <span className="text-gray-400 mr-2">تومان</span>
          <span className="text-gray-500 text-sm block mt-1">
            / {product.duration_days} روز
          </span>
        </div>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-aurora-green">✓</span>
            <span>فعال‌سازی فوری</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-aurora-green">✓</span>
            <span>پشتیبانی ۲۴/۷</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-aurora-green">✓</span>
            <span>تضمین کیفیت</span>
          </div>
        </div>
        
        {/* CTA */}
        <button className="w-full py-3 bg-cosmic-orange/10 hover:bg-cosmic-orange/20 border border-cosmic-orange/30 hover:border-cosmic-orange/50 rounded-full font-medium text-cosmic-orange transition-all duration-300">
          مشاهده جزئیات
        </button>
      </div>
    </Link>
  );
}

function getProductIcon(category: string): string {
  const icons: Record<string, string> = {
    'ChatGPT': '🤖',
    'Claude': '🧠',
    'Gemini': '✨',
    'Cursor': '⚡',
    'Spotify': '🎵',
  };
  return icons[category] || '🔷';
}
