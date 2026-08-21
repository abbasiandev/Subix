/**
 * Article Data - Blog posts and guides
 * Real article images stored in public/articles/
 */

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: 'guide' | 'tutorial' | 'news' | 'comparison';
  imagePath: string;
  imageBlurDataURL: string;
  readTime: number;
  publishDate: string;
  author: string;
  content: string;
  tags: string[];
}

/**
 * Article catalog - Blog content and guides
 */
export const articles: Article[] = [
  {
    id: 1,
    slug: 'chatgpt-guide',
    title: 'راهنمای کامل ChatGPT: همه چیز درباره پرطرفدارترین هوش مصنوعی',
    excerpt: 'آموزش استفاده از ChatGPT، قابلیت‌های پیشرفته و نکات کاربردی',
    category: 'guide',
    imagePath: '/articles/chatgpt-guide.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AOTJgv/x4v/48f/v2ADfuGT/4rb/37H/2KYBS0JD/8Wn/8Ol/8CiBdMzLQqvDusAAAAASUVORK5CYII=',
    readTime: 8,
    publishDate: '2024-01-15',
    author: 'تیم سابیکس',
    content: '# راهنمای کامل ChatGPT...',
    tags: ['هوش مصنوعی', 'ChatGPT', 'راهنما'],
  },
  {
    id: 2,
    slug: 'claude-features',
    title: 'معرفی Claude: رقیب قدرتمند ChatGPT با قابلیت‌های منحصر به فرد',
    excerpt: 'بررسی ویژگی‌های منحصر به فرد Claude و مقایسه با ChatGPT',
    category: 'tutorial',
    imagePath: '/articles/claude-features.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWP4/5+h8f9/hvr//xnK/v9nSPz/n8H7/3+Gzf//M5T+/8+Q+P8/AwBwzh8lMKLGwAAAAABJRU5ErkJggg==',
    readTime: 7,
    publishDate: '2024-01-12',
    author: 'تیم سابیکس',
    content: '# Claude: نسل جدید AI...',
    tags: ['هوش مصنوعی', 'Claude', 'آموزش'],
  },
  {
    id: 3,
    slug: 'gemini-vs-gpt',
    title: 'Gemini در مقابل GPT: جنگ غول‌های هوش مصنوعی',
    excerpt: 'مقایسه جامع Gemini گوگل با GPT اوپن‌ای‌آی',
    category: 'comparison',
    imagePath: '/articles/gemini-vs-gpt.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AElaqv/y//+8//+Fxv9BPKb/z//+r//+YI3/QDSV/9j//7f//2iF/4Q1NwprDX0AAAAASUVORK5CYII=',
    readTime: 10,
    publishDate: '2024-01-10',
    author: 'تیم سابیکس',
    content: '# Gemini vs GPT...',
    tags: ['هوش مصنوعی', 'Gemini', 'GPT', 'مقایسه'],
  },
  {
    id: 4,
    slug: 'ai-tools-2024',
    title: 'بهترین ابزارهای هوش مصنوعی 2024: راهنمای انتخاب',
    excerpt: 'لیست کامل بهترین ابزارهای AI برای کار، تحصیل و سرگرمی',
    category: 'guide',
    imagePath: '/articles/ai-tools-2024.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AHQ8zv/R//+k//981f9sMsL/0//+m//+ct3/YS63/9L//5f//3DZ/607MgrCIyUAAAAASUVORK5CYII=',
    readTime: 12,
    publishDate: '2024-01-08',
    author: 'تیم سابیکس',
    content: '# بهترین ابزارهای AI...',
    tags: ['هوش مصنوعی', 'ابزار', 'راهنما'],
  },
  {
    id: 5,
    slug: 'spotify-premium',
    title: 'راهنمای خرید Spotify Premium: ارزش دارد یا نه؟',
    excerpt: 'بررسی کامل امکانات و مزایای اسپاتیفای پریمیوم',
    category: 'guide',
    imagePath: '/articles/spotify-premium.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgYGhv//Gf7/Z2BgYAAAoykMCiXNNFAAAAAASUVORK5CYII=',
    readTime: 6,
    publishDate: '2024-01-05',
    author: 'تیم سابیکس',
    content: '# Spotify Premium...',
    tags: ['موسیقی', 'Spotify', 'راهنما'],
  },
  {
    id: 6,
    slug: 'youtube-premium',
    title: 'YouTube Premium چیست و چه مزایایی دارد؟',
    excerpt: 'همه چیز درباره یوتیوب پرمیوم و ویژگی‌های اختصاصی آن',
    category: 'tutorial',
    imagePath: '/articles/youtube-premium.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWP4////g////wf//z/4//8BAv7//z9A0P///8H///8f/P//AAEAAHpZHwm7Bi0AAAAASUVORK5CYII=',
    readTime: 5,
    publishDate: '2024-01-03',
    author: 'تیم سابیکس',
    content: '# YouTube Premium...',
    tags: ['ویدئو', 'YouTube', 'آموزش'],
  },
  {
    id: 7,
    slug: 'netflix-plans',
    title: 'پلن‌های Netflix: کدام یک برای شما مناسب است؟',
    excerpt: 'مقایسه پلن‌های مختلف نتفلیکس و راهنمای انتخاب',
    category: 'comparison',
    imagePath: '/articles/netflix-plans.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgaG//8Z/v9nYGBgAAChoQwKv2r8NQAAAABJRU5ErkJggg==',
    readTime: 7,
    publishDate: '2024-01-01',
    author: 'تیم سابیکس',
    content: '# پلن‌های Netflix...',
    tags: ['رسانه', 'Netflix', 'مقایسه'],
  },
  {
    id: 8,
    slug: 'github-copilot',
    title: 'GitHub Copilot: دستیار هوش مصنوعی برنامه‌نویسان',
    excerpt: 'چگونه Copilot بهره‌وری کدنویسی را چند برابر می‌کند',
    category: 'tutorial',
    imagePath: '/articles/github-copilot.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgaG//8Z/v9nYGBgAAChoQwKv2r8NQAAAABJRU5ErkJggg==',
    readTime: 9,
    publishDate: '2023-12-28',
    author: 'تیم سابیکس',
    content: '# GitHub Copilot...',
    tags: ['برنامه‌نویسی', 'GitHub', 'AI'],
  },
  {
    id: 9,
    slug: 'cursor-review',
    title: 'بررسی Cursor: بهترین IDE با هوش مصنوعی داخلی',
    excerpt: 'تجربه استفاده از Cursor و مقایسه با IDE های سنتی',
    category: 'tutorial',
    imagePath: '/articles/cursor-review.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgaG//8Z/v9nYGBgAAChoQwKv2r8NQAAAABJRU5ErkJggg==',
    readTime: 8,
    publishDate: '2023-12-25',
    author: 'تیم سابیکس',
    content: '# بررسی Cursor...',
    tags: ['برنامه‌نویسی', 'Cursor', 'آموزش'],
  },
  {
    id: 10,
    slug: 'canva-pro',
    title: 'Canva Pro: ابزار طراحی حرفه‌ای برای همه',
    excerpt: 'راهنمای استفاده از Canva Pro و قابلیت‌های پیشرفته آن',
    category: 'guide',
    imagePath: '/articles/canva-pro.svg',
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AHQ8zv/R//+k//981f9sMsL/0//+m//+ct3/YS63/9L//5f//3DZ/607MgrCIyUAAAAASUVORK5CYII=',
    readTime: 6,
    publishDate: '2023-12-22',
    author: 'تیم سابیکس',
    content: '# Canva Pro...',
    tags: ['طراحی', 'Canva', 'راهنما'],
  },
];

/**
 * Get articles by category
 */
export const getArticlesByCategory = (category: Article['category']): Article[] => {
  return articles.filter(a => a.category === category);
};

/**
 * Get article by slug
 */
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(a => a.slug === slug);
};

/**
 * Get recent articles
 */
export const getRecentArticles = (count: number = 6): Article[] => {
  return articles
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

/**
 * Search articles
 */
export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery) ||
      a.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Category labels (Persian)
 */
export const categoryLabels: Record<Article['category'], string> = {
  guide: 'راهنما',
  tutorial: 'آموزش',
  news: 'اخبار',
  comparison: 'مقایسه',
};

export default articles;
