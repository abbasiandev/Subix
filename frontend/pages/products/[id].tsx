import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { getProduct, createOrder, Product } from "@/lib/api";
import GlassContainer from "@/components/GlassContainer";
import Link from "next/link";

// Fake comments data
const FAKE_COMMENTS = [
  {
    id: 1,
    author: "محمد رضایی",
    rating: 5,
    date: "۲ روز پیش",
    text: "عالی بود! اکانت خیلی سریع فعال شد و تا الان هیچ مشکلی نداشتم. قیمتش هم واقعا مناسب بود.",
    verified: true,
  },
  {
    id: 2,
    author: "سارا احمدی",
    rating: 5,
    date: "۵ روز پیش",
    text: "خدمات عالی! پشتیبانی خیلی سریع جواب داد و مشکل من رو حل کرد. حتما دوباره خرید می‌کنم.",
    verified: true,
  },
  {
    id: 3,
    author: "علی کریمی",
    rating: 4,
    date: "۱ هفته پیش",
    text: "خوب بود ولی فعال‌سازی کمی طول کشید. در کل راضی‌ام.",
    verified: true,
  },
  {
    id: 4,
    author: "زهرا محمدی",
    rating: 5,
    date: "۲ هفته پیش",
    text: "بهترین سایت برای خرید اشتراک! قیمت مناسب، فعال‌سازی سریع، پشتیبانی عالی. پیشنهاد می‌کنم.",
    verified: true,
  },
  {
    id: 5,
    author: "حسین نوری",
    rating: 5,
    date: "۳ هفته پیش",
    text: "واقعا راضی‌ام. چند بار از این سایت خرید کردم همیشه تجربه خوبی داشتم.",
    verified: true,
  },
];

// Product content data based on category
const PRODUCT_CONTENT: Record<string, {
  description: string;
  features: string[];
  howToUse: string[];
  faqs: { q: string; a: string }[];
}> = {
  ChatGPT: {
    description: `ChatGPT Plus اشتراک پیشرفته ChatGPT است که به شما دسترسی کامل به قدرتمندترین مدل هوش مصنوعی OpenAI یعنی GPT-4 می‌دهد. با این اشتراک می‌توانید از سرعت بالاتر، پاسخ‌های دقیق‌تر و امکانات ویژه مانند تجزیه و تحلیل تصاویر، ایجاد کد، تحلیل داده و بسیاری دیگر بهره‌مند شوید.`,
    features: [
      "دسترسی به مدل GPT-4 و GPT-4 Turbo",
      "سرعت پاسخ‌دهی بسیار بالا",
      "امکان آپلود و تجزیه و تحلیل تصاویر",
      "دسترسی به پلاگین‌ها و ابزارهای اضافی",
      "حافظه مکالمه طولانی‌تر",
      "اولویت دسترسی حتی در ساعات شلوغی",
      "به‌روزرسانی‌های جدید زودتر از نسخه رایگان",
      "امکان استفاده از Custom Instructions",
    ],
    howToUse: [
      "پس از خرید، اطلاعات ایمیل و رمز عبور در پروفایل شما نمایش داده می‌شود",
      "به سایت chat.openai.com بروید",
      "روی دکمه Log in کلیک کنید",
      "ایمیل و رمز عبور دریافتی را وارد کنید",
      "در صفحه اصلی، گزینه GPT-4 را انتخاب کنید",
      "شروع به چت با هوش مصنوعی کنید!",
    ],
    faqs: [
      {
        q: "آیا می‌توانم رمز عبور را تغییر دهم؟",
        a: "بله، پس از ورود به حساب می‌توانید از قسمت Settings رمز عبور را تغییر دهید.",
      },
      {
        q: "چند نفر می‌توانند همزمان استفاده کنند؟",
        a: "اشتراک فقط برای یک نفر است و استفاده همزمان چند نفر ممکن است منجر به مسدود شدن اکانت شود.",
      },
      {
        q: "آیا اکانت اختصاصی است؟",
        a: "بله، اکانت‌های ما کاملا اختصاصی هستند و فقط برای شما فعال می‌شوند.",
      },
      {
        q: "اگر مشکلی پیش آمد چه کنم؟",
        a: "می‌توانید از طریق پشتیبانی تلگرام یا بخش تماس با ما با تیم پشتیبانی در ارتباط باشید.",
      },
    ],
  },
  Gemini: {
    description: `Google Gemini Pro اشتراک پیشرفته هوش مصنوعی گوگل است که یکی از قدرتمندترین مدل‌های AI در دنیا محسوب می‌شود. با Gemini می‌توانید از قابلیت‌های پیشرفته مانند درک عمیق متن، تجزیه و تحلیل داده، کدنویسی و بسیاری از امکانات دیگر استفاده کنید.`,
    features: [
      "دسترسی به مدل Gemini Ultra",
      "پردازش سریع‌تر و دقیق‌تر",
      "یکپارچگی با سرویس‌های Google",
      "تحلیل داده‌های پیچیده",
      "پشتیبانی از زبان‌های مختلف",
      "امکان استفاده در Gmail و Google Docs",
      "حافظه مکالمه قوی‌تر",
      "به‌روزرسانی‌های منظم",
    ],
    howToUse: [
      "بعد از خرید، لینک فعال‌سازی و اطلاعات حساب به شما ارسال می‌شود",
      "به سایت gemini.google.com مراجعه کنید",
      "با حساب Google ارائه شده وارد شوید",
      "از امکانات Gemini Pro استفاده کنید",
    ],
    faqs: [
      {
        q: "تفاوت Gemini Pro با ChatGPT چیست؟",
        a: "Gemini یکپارچگی بهتری با سرویس‌های Google دارد و در برخی زمینه‌ها مانند تحلیل داده دقیق‌تر است.",
      },
      {
        q: "آیا با اکانت Gmail من کار می‌کند؟",
        a: "خیر، شما یک حساب Google اختصاصی با اشتراک Gemini Pro فعال دریافت می‌کنید.",
      },
    ],
  },
  Cursor: {
    description: `Cursor ویرایشگر کد هوشمند مبتنی بر AI است که به برنامه‌نویسان کمک می‌کند کد بهتر و سریع‌تر بنویسند. با اشتراک Cursor Pro می‌توانید از قابلیت‌های پیشرفته مانند تکمیل خودکار کد، رفع باگ، توضیح کد و بازنویسی هوشمند استفاده کنید.`,
    features: [
      "تکمیل خودکار کد با AI",
      "Chat درون ادیتور با GPT-4",
      "رفع باگ خودکار",
      "توضیح و مستندسازی کد",
      "بازنویسی و بهینه‌سازی کد",
      "پشتیبانی از تمام زبان‌های برنامه‌نویسی",
      "سینک با GitHub",
      "Extensions و پلاگین‌های VS Code",
    ],
    howToUse: [
      "Cursor را از سایت cursor.sh دانلود و نصب کنید",
      "پس از باز کردن، روی Sign In کلیک کنید",
      "با ایمیل و رمز دریافتی وارد شوید",
      "پروژه خود را باز کنید و از AI Cursor استفاده کنید",
      "با Cmd+K (Mac) یا Ctrl+K (Windows) از دستیار AI استفاده کنید",
    ],
    faqs: [
      {
        q: "Cursor چه تفاوتی با VS Code دارد؟",
        a: "Cursor بر پایه VS Code ساخته شده اما قابلیت‌های AI پیشرفته‌تری دارد.",
      },
      {
        q: "آیا Extensions من کار می‌کنند؟",
        a: "بله، تمام افزونه‌های VS Code در Cursor قابل استفاده هستند.",
      },
    ],
  },
  Spotify: {
    description: `Spotify Premium دسترسی نامحدود به میلیون‌ها آهنگ، پادکست و پلی‌لیست بدون تبلیغ است. با کیفیت صدای عالی، قابلیت دانلود آهنگ برای گوش دادن آفلاین و پخش بدون محدودیت لذت ببرید.`,
    features: [
      "موسیقی بدون تبلیغ",
      "دانلود آهنگ برای گوش دادن آفلاین",
      "کیفیت صدای بالا (320kbps)",
      "پخش نامحدود",
      "رد شدن آهنگ بدون محدودیت",
      "دسترسی به میلیون‌ها آهنگ و پادکست",
      "پشتیبانی از همه دستگاه‌ها",
      "پخش با صفحه قفل",
    ],
    howToUse: [
      "اپلیکیشن Spotify را دانلود کنید",
      "با ایمیل و رمز دریافتی وارد شوید",
      "از موسیقی بدون محدودیت لذت ببرید",
    ],
    faqs: [
      {
        q: "آیا می‌توانم آهنگ دانلود کنم؟",
        a: "بله، با Premium می‌توانید آهنگ‌ها را برای گوش دادن آفلاین دانلود کنید.",
      },
      {
        q: "روی چند دستگاه کار می‌کند؟",
        a: "می‌توانید روی تمام دستگاه‌های خود نصب کنید اما فقط روی یک دستگاه همزمان پخش می‌شود.",
      },
    ],
  },
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { loading: authCheckLoading } = useRequireAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const productId = parseInt(id as string);
    if (isNaN(productId)) {
      router.push("/products");
      return;
    }

    getProduct(productId)
      .then(setProduct)
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        router.push("/products");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleOrder = async () => {
    if (!product) return;
    
    setOrdering(true);
    try {
      const order = await createOrder(product.id);
      router.push(`/dashboard`);
    } catch (err: any) {
      alert(err.message || "خطا در ثبت سفارش");
    } finally {
      setOrdering(false);
    }
  };

  if (authCheckLoading || loading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return null;
  }

  const content = PRODUCT_CONTENT[product.category] || PRODUCT_CONTENT.ChatGPT;
  const averageRating = (
    FAKE_COMMENTS.reduce((sum, c) => sum + c.rating, 0) / FAKE_COMMENTS.length
  ).toFixed(1);

  return (
    <div className="min-h-screen gradient-mesh" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="mb-6 animate-fade-up">
          <nav className="flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              خانه
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">
              محصولات
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Product Header */}
            <GlassContainer elevation="medium" className="rounded-3xl p-8 animate-fade-up">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-black text-white mb-2">
                    {product.name}
                  </h1>
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl">
                    {product.category}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(parseFloat(averageRating))
                            ? "text-yellow-400"
                            : "text-white/30"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm">
                    {averageRating} از 5 ({FAKE_COMMENTS.length} نظر)
                  </p>
                </div>
              </div>

              <p className="text-white/90 text-lg leading-relaxed">
                {content.description}
              </p>
            </GlassContainer>

            {/* Features */}
            <GlassContainer elevation="light" className="rounded-3xl p-8 animate-fade-up stagger-1">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                امکانات و ویژگی‌ها
              </h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </GlassContainer>

            {/* How to Use */}
            <GlassContainer elevation="light" className="rounded-3xl p-8 animate-fade-up stagger-2">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                نحوه استفاده
              </h2>
              <ol className="space-y-4">
                {content.howToUse.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </span>
                    <span className="text-white/90 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </GlassContainer>

            {/* FAQs */}
            <GlassContainer elevation="light" className="rounded-3xl p-8 animate-fade-up stagger-3">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                سوالات متداول
              </h2>
              <div className="space-y-4">
                {content.faqs.map((faq, index) => (
                  <div key={index} className="glass-subtle rounded-2xl p-5">
                    <h3 className="text-white font-bold mb-2 text-lg">{faq.q}</h3>
                    <p className="text-white/80 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </GlassContainer>

            {/* Comments Section */}
            <GlassContainer elevation="light" className="rounded-3xl p-8 animate-fade-up stagger-4">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                نظرات کاربران ({FAKE_COMMENTS.length})
              </h2>
              <div className="space-y-4">
                {FAKE_COMMENTS.map((comment) => (
                  <div key={comment.id} className="glass-subtle rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {comment.author[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">{comment.author}</span>
                            {comment.verified && (
                              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-white/60 text-sm">{comment.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < comment.rating ? "text-yellow-400" : "text-white/30"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed">{comment.text}</p>
                  </div>
                ))}
              </div>
            </GlassContainer>
          </div>

          {/* Sidebar - Order Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <GlassContainer elevation="strong" className="rounded-3xl p-6 animate-fade-up stagger-1">
                <div className="text-center mb-6">
                  <p className="text-white/70 text-sm mb-2">قیمت</p>
                  <p className="text-4xl font-black text-white mb-1">
                    {product.price.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-white/80">تومان</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-white/90">
                    <span>مدت زمان:</span>
                    <span className="font-bold">{product.duration_days} روز</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90">
                    <span>فعال‌سازی:</span>
                    <span className="font-bold">{product.activation_minutes} دقیقه</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90">
                    <span>نوع:</span>
                    <span className="font-bold">
                      {product.activation_type === "personal_email" ? "ایمیل اختصاصی" : "ایمیل آماده"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={ordering}
                  className="w-full glass-magnetic bg-white text-primary font-black text-lg py-4 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  {ordering ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                      در حال ثبت...
                    </span>
                  ) : (
                    "خرید و فعال‌سازی"
                  )}
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>پرداخت امن</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>گارانتی بازگشت وجه</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>پشتیبانی 24/7</span>
                  </div>
                </div>
              </GlassContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
