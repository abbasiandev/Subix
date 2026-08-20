import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DesktopContainer from '../components/layouts/DesktopContainer';
import BottomNav from '../components/BottomNav';
import GlassContainer from '../components/GlassContainer';
import { blogPosts, blogCategories } from '../data/blog-posts';

export default function Blog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp;

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isTelegram) {
    return (
      <>
        <BlogContent 
          filteredPosts={filteredPosts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          formatDate={formatDate}
        />
        <BottomNav />
      </>
    );
  }

  return (
    <DesktopContainer sidebar={null}>
      <BlogContent 
        filteredPosts={filteredPosts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        formatDate={formatDate}
      />
    </DesktopContainer>
  );
}

function BlogContent({ 
  filteredPosts, 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery,
  formatDate 
}: {
  filteredPosts: typeof blogPosts;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  formatDate: (date: string) => string;
}) {
  return (
    <>
      <Head>
        <title>بلاگ سابیکس - مقالات و راهنمای هوش مصنوعی</title>
        <meta name="description" content="آخرین مقالات، راهنماها و اخبار دنیای هوش مصنوعی. راهنمای خرید و استفاده از ChatGPT، Claude، Gemini، Cursor و Spotify" />
        <meta name="keywords" content="بلاگ هوش مصنوعی, راهنمای ChatGPT, آموزش AI, مقایسه هوش مصنوعی, راهنمای Cursor, نکات AI" />
        <link rel="canonical" href="https://abbasiandev.github.io/Subix/blog" />
        <meta property="og:title" content="بلاگ سابیکس - مقالات و راهنمای هوش مصنوعی" />
        <meta property="og:description" content="آخرین مقالات، راهنماها و اخبار دنیای هوش مصنوعی" />
        <meta property="og:url" content="https://abbasiandev.github.io/Subix/blog" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen" dir="rtl">
      <div className="relative container mx-auto px-4 py-8 pb-32 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            📝 بلاگ سابیکس
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-up stagger-1">
            آخرین مقالات، راهنماها و اخبار دنیای هوش مصنوعی
          </p>
        </div>

        {/* Search Bar */}
        <GlassContainer elevation="light" className="rounded-2xl p-4 mb-8 max-w-2xl mx-auto animate-fade-up stagger-2">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </GlassContainer>

        {/* Category Filter */}
        <div className="mb-10 animate-fade-up stagger-3">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              همه مقالات
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <GlassContainer
                  elevation="light"
                  hover
                  className="rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Cover Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                    <div className="text-6xl">
                      {blogCategories.find(c => c.id === post.category)?.icon || '📝'}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {blogCategories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {post.readTime} دقیقه
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views?.toLocaleString('fa-IR')}
                        </span>
                      </div>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </GlassContainer>
              </Link>
            ))}
          </div>
        ) : (
          <GlassContainer elevation="light" className="rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-400">لطفاً کلمات کلیدی دیگری را امتحان کنید</p>
          </GlassContainer>
        )}

        {/* Newsletter Section */}
        <GlassContainer elevation="medium" className="rounded-3xl p-8 md:p-12 mt-16 text-center animate-fade-up">
          <div className="max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              عضویت در خبرنامه سابیکس
            </h2>
            <p className="text-gray-300 mb-8">
              آخرین مقالات، راهنماها و تخفیف‌های ویژه را مستقیماً در تلگرام دریافت کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="آیدی تلگرام شما"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50">
                عضویت
              </button>
            </div>
          </div>
        </GlassContainer>
      </div>
      </div>
    </>
  );
}
