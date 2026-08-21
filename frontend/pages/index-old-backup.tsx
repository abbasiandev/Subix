import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: '1',
      slug: 'chatgpt-plus',
      name: 'ChatGPT Plus',
      category: 'ai',
      price: 390000,
      period: 'ماهانه',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      gradient: 'from-emerald-500 to-teal-600',
      description: 'دسترسی نامحدود به GPT-4 و GPT-4 Turbo'
    },
    {
      id: '2',
      slug: 'claude-pro',
      name: 'Claude Pro',
      category: 'ai',
      price: 350000,
      period: 'ماهانه',
      gradient: 'from-amber-500 to-orange-600',
      description: 'مکالمات طولانی‌تر با Claude 3'
    },
    {
      id: '3',
      slug: 'gemini-advanced',
      name: 'Gemini Advanced',
      category: 'ai',
      price: 320000,
      period: 'ماهانه',
      icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
      gradient: 'from-blue-500 to-purple-600',
      description: 'قدرتمندترین مدل هوش مصنوعی Google'
    },
    {
      id: '4',
      slug: 'cursor-pro',
      name: 'Cursor Pro',
      category: 'dev',
      price: 280000,
      period: 'ماهانه',
      gradient: 'from-cyan-500 to-blue-600',
      description: 'ویرایشگر کد هوشمند با AI'
    },
    {
      id: '5',
      slug: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'dev',
      price: 250000,
      period: 'ماهانه',
      gradient: 'from-gray-700 to-gray-900',
      description: 'دستیار کدنویسی با هوش مصنوعی'
    },
    {
      id: '6',
      slug: 'spotify-premium',
      name: 'Spotify Premium',
      category: 'media',
      price: 150000,
      period: 'ماهانه',
      icon: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png',
      gradient: 'from-green-500 to-emerald-600',
      description: 'موسیقی بدون محدودیت و تبلیغ'
    },
  ];

  const categories = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'ai', name: 'هوش مصنوعی' },
    { id: 'dev', name: 'توسعه' },
    { id: 'media', name: 'رسانه' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <Head>
        <title>سابیکس - خرید اشتراک هوش مصنوعی</title>
      </Head>

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-12">
                <h1 className="text-2xl font-semibold">سابیکس</h1>
                <div className="hidden md:flex items-center gap-8">
                  <a href="#products" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    محصولات
                  </a>
                  <a href="#features" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    مزایا
                  </a>
                  <a href="#support" className="text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    پشتیبانی
                  </a>
                </div>
              </div>
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                ورود / ثبت‌نام
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              هر اشتراکی که
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                نیاز داری
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              دسترسی آسان به بهترین ابزارهای هوش مصنوعی و دیجیتال. 
              بدون دردسر، بدون محدودیت.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section id="products" className="pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => router.push(`/products/${product.slug}`)}
                  className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:scale-[1.02] text-right"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Product Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} mb-6 flex items-center justify-center`}>
                    {product.icon ? (
                      <img src={product.icon} alt={product.name} className="w-10 h-10" />
                    ) : (
                      <div className="w-10 h-10 bg-white/20 rounded-xl" />
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-bold">
                        {product.price.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm mr-2">
                        تومان
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.period}
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-8 left-8 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-white rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">چرا سابیکس؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">فعال‌سازی فوری</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  اشتراک شما ظرف چند دقیقه فعال می‌شود
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">پرداخت امن</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  تراکنش‌های شما کاملاً ایمن و رمزنگاری شده است
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">پشتیبانی ۲۴/۷</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  تیم پشتیبانی ما همیشه در دسترس شماست
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="support" className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              سوالی دارید؟ با ما در تماس باشید
            </p>
            <a href="mailto:support@subix.ir" className="text-blue-600 dark:text-blue-400 hover:underline">
              support@subix.ir
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
              © ۲۰۲۴ سابیکس. تمامی حقوق محفوظ است.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
