export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  views?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'guides',
    name: 'راهنمای استفاده',
    description: 'آموزش‌های گام به گام استفاده از ابزارهای هوش مصنوعی',
    icon: '📚'
  },
  {
    id: 'news',
    name: 'اخبار و به‌روزرسانی',
    description: 'آخرین اخبار دنیای هوش مصنوعی',
    icon: '📰'
  },
  {
    id: 'comparison',
    name: 'مقایسه محصولات',
    description: 'مقایسه جامع ابزارهای مختلف AI',
    icon: '⚖️'
  },
  {
    id: 'tips',
    name: 'نکات و ترفندها',
    description: 'ترفندهای کاربردی برای بهره‌وری بیشتر',
    icon: '💡'
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'chatgpt-vs-claude-comparison',
    title: 'مقایسه جامع ChatGPT و Claude: کدام برای شما مناسب‌تر است؟',
    excerpt: 'در این مقاله به بررسی کامل تفاوت‌ها، مزایا و معایب ChatGPT و Claude می‌پردازیم تا بتوانید بهترین انتخاب را داشته باشید.',
    category: 'comparison',
    tags: ['ChatGPT', 'Claude', 'مقایسه', 'هوش مصنوعی'],
    coverImage: '/images/blog/chatgpt-vs-claude.jpg',
    author: {
      name: 'تیم سابیکس',
      avatar: '/images/avatar-default.png'
    },
    publishedAt: '2026-08-15',
    readTime: 8,
    views: 1243,
    content: `# مقایسه جامع ChatGPT و Claude

در دنیای پرشتاب هوش مصنوعی، انتخاب بین ChatGPT و Claude می‌تواند چالش‌برانگیز باشد. هر دو این ابزارها قابلیت‌های قدرتمندی دارند، اما تفاوت‌های مهمی نیز وجود دارد.

## ChatGPT: پیشرو بازار

ChatGPT توسط OpenAI توسعه یافته و با مدل GPT-4 به یکی از محبوب‌ترین چت‌بات‌های هوش مصنوعی تبدیل شده است.

### مزایا:
- پایگاه دانش گسترده و به‌روز
- قابلیت تولید تصویر با DALL-E 3
- دسترسی به اینترنت در نسخه Plus
- پلاگین‌های متنوع برای کارهای تخصصی

### معایب:
- محدودیت تعداد پیام در ساعات شلوغ
- هزینه نسبتاً بالا (20 دلار ماهانه)
`
  },
  {
    slug: 'spotify-premium-benefits',
    title: 'چرا اسپاتیفای پرمیوم؟ 10 دلیل برای ارتقا به نسخه پریمیوم',
    excerpt: 'کشف کنید چرا میلیون‌ها کاربر اسپاتیفای پرمیوم را انتخاب می‌کنند و چه مزایایی نسبت به نسخه رایگان دارد.',
    category: 'guides',
    tags: ['Spotify', 'موسیقی', 'پرمیوم'],
    coverImage: '/images/blog/spotify-premium.jpg',
    author: {
      name: 'تیم سابیکس',
      avatar: '/images/avatar-default.png'
    },
    publishedAt: '2026-08-10',
    readTime: 6,
    views: 892,
    content: `# چرا اسپاتیفای پرمیوم؟

اسپاتیفای با بیش از 500 میلیون کاربر فعال، بزرگ‌ترین پلتفرم پخش موسیقی جهان است.
`
  },
  {
    slug: 'ai-productivity-tips',
    title: '10 ترفند طلایی برای افزایش بهره‌وری با هوش مصنوعی',
    excerpt: 'با این ترفندهای کاربردی، بهره‌وری خود را با استفاده از ابزارهای AI تا 300% افزایش دهید.',
    category: 'tips',
    tags: ['بهره‌وری', 'ترفندها', 'ChatGPT', 'Claude'],
    coverImage: '/images/blog/productivity-tips.jpg',
    author: {
      name: 'تیم سابیکس',
      avatar: '/images/avatar-default.png'
    },
    publishedAt: '2026-08-05',
    readTime: 10,
    views: 2156,
    content: `# 10 ترفند طلایی برای افزایش بهره‌وری با AI

هوش مصنوعی می‌تواند دستیار قدرتمندی برای شما باشد، اگر بدانید چگونه از آن استفاده کنید.
`
  },
  {
    slug: 'cursor-ide-complete-guide',
    title: 'راهنمای کامل Cursor: محیط توسعه هوشمند برای برنامه‌نویسان',
    excerpt: 'همه چیز درباره Cursor، IDE مبتنی بر AI که انقلابی در برنامه‌نویسی ایجاد کرده است.',
    category: 'guides',
    tags: ['Cursor', 'برنامه‌نویسی', 'AI', 'IDE'],
    coverImage: '/images/blog/cursor-guide.jpg',
    author: {
      name: 'تیم سابیکس',
      avatar: '/images/avatar-default.png'
    },
    publishedAt: '2026-07-28',
    readTime: 12,
    views: 1678,
    content: `# راهنمای کامل Cursor

Cursor یک IDE مبتنی بر هوش مصنوعی است که تجربه برنامه‌نویسی را متحول کرده است.
`
  },
  {
    slug: 'gemini-advanced-new-features',
    title: 'معرفی قابلیت‌های جدید Gemini Advanced در سال 2026',
    excerpt: 'گوگل با عرضه Gemini Advanced، به رقابت جدی با ChatGPT و Claude وارد شده است.',
    category: 'news',
    tags: ['Gemini', 'Google', 'هوش مصنوعی', 'اخبار'],
    coverImage: '/images/blog/gemini-features.jpg',
    author: {
      name: 'تیم سابیکس',
      avatar: '/images/avatar-default.png'
    },
    publishedAt: '2026-07-20',
    readTime: 7,
    views: 1534,
    content: `# معرفی قابلیت‌های جدید Gemini Advanced

گوگل با عرضه نسخه Advanced از Gemini، گامی بلند در دنیای هوش مصنوعی برداشته است.
`
  },
  {
    slug: 'secure-ai-account-purchase',
    title: 'راهنمای خرید امن اکانت هوش مصنوعی: نکات کلیدی',
    excerpt: 'قبل از خرید اشتراک AI، این نکات امنیتی مهم را بدانید تا از کلاهبرداری جلوگیری کنید.',
    category: 'tips',
    tags: ['امنیت', 'خرید', 'راهنما'],
    coverImage: '/images/blog/secure-purchase.jpg',
    author: {
      name: 'تیم سابیکس',
      avatar: '/images/avatar-default.png'
    },
    publishedAt: '2026-07-15',
    readTime: 5,
    views: 987,
    content: `# راهنمای خرید امن اکانت هوش مصنوعی

با رشد روزافزون تقاضا برای اشتراک‌های AI، متأسفانه فعالیت‌های کلاهبرداری نیز افزایش یافته است.
`
  }
];
