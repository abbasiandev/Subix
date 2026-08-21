/**
 * Product Data - Real digital services
 * Contains actual pricing and product information
 * Brand logos stored in public/brands/
 */

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  brandLogoPath: string;
  category: 'ai' | 'music' | 'devTools' | 'design' | 'media' | 'productivity';
  price: number;
  originalPrice?: number;
  hasDiscount: boolean;
  duration: string;
  description: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  popular?: boolean;
}

/**
 * Product catalog - 50+ digital services
 * Prices in Iranian Toman (realistic market prices)
 */
export const products: Product[] = [
  // AI Tools Category
  {
    id: 1,
    name: 'چت‌جی‌پی‌تی پلاس',
    nameEn: 'ChatGPT Plus',
    slug: 'chatgpt-plus',
    brandLogoPath: '/brands/openai.svg',
    category: 'ai',
    price: 850000,
    originalPrice: 1000000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'دسترسی به GPT-4، پاسخ‌های سریع‌تر و دسترسی اولویت‌دار به قابلیت‌های جدید',
    features: [
      'دسترسی به مدل GPT-4',
      'سرعت پاسخ‌دهی بالاتر',
      'دسترسی حتی در ساعات شلوغی',
      'ویژگی‌های جدید به صورت اولویت‌دار',
    ],
    specifications: [
      { label: 'نوع سرویس', value: 'اشتراک ماهانه' },
      { label: 'مدت', value: '1 ماه (30 روز)' },
      { label: 'تحویل', value: 'آنی (کمتر از 5 دقیقه)' },
      { label: 'پشتیبانی', value: '24/7' },
    ],
    popular: true,
  },
  {
    id: 2,
    name: 'کلود پرو',
    nameEn: 'Claude Pro',
    slug: 'claude-pro',
    brandLogoPath: '/brands/anthropic.svg',
    category: 'ai',
    price: 950000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'هوش مصنوعی پیشرفته Anthropic با تمرکز بر ایمنی و قابلیت اطمینان',
    features: [
      'دسترسی به Claude 3 Opus',
      'پنجره زمینه 200K توکن',
      'تحلیل پیشرفته متن',
      'پاسخ‌های دقیق و قابل اطمینان',
    ],
    specifications: [
      { label: 'نوع سرویس', value: 'اشتراک ماهانه' },
      { label: 'مدت', value: '1 ماه (30 روز)' },
      { label: 'تحویل', value: 'آنی' },
      { label: 'پشتیبانی', value: '24/7' },
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'جمینای ادونسد',
    nameEn: 'Gemini Advanced',
    slug: 'gemini-advanced',
    brandLogoPath: '/brands/google.svg',
    category: 'ai',
    price: 800000,
    originalPrice: 900000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'هوش مصنوعی پیشرفته گوگل با قابلیت‌های چندوجهی',
    features: [
      'دسترسی به Gemini Ultra',
      'تحلیل تصویر و ویدئو',
      'یکپارچگی با سرویس‌های گوگل',
      'ظرفیت بالای پردازش',
    ],
    specifications: [
      { label: 'نوع سرویس', value: 'اشتراک ماهانه' },
      { label: 'مدت', value: '1 ماه' },
      { label: 'تحویل', value: 'آنی' },
      { label: 'پشتیبانی', value: '24/7' },
    ],
  },
  {
    id: 4,
    name: 'میدجرنی',
    nameEn: 'Midjourney',
    slug: 'midjourney',
    brandLogoPath: '/brands/midjourney.svg',
    category: 'ai',
    price: 1200000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'ابزار هوش مصنوعی حرفه‌ای برای تولید تصاویر با کیفیت بالا',
    features: [
      'تولید نامحدود تصویر',
      'رزولوشن بالا (Upscale 4X)',
      'حالت خصوصی',
      'دسترسی سریع به نسخه‌های جدید',
    ],
    specifications: [
      { label: 'نوع سرویس', value: 'اشتراک ماهانه' },
      { label: 'مدت', value: '1 ماه' },
      { label: 'تعداد تصویر', value: 'نامحدود' },
      { label: 'پشتیبانی', value: '24/7' },
    ],
    popular: true,
  },

  // Music & Media Category
  {
    id: 5,
    name: 'اسپاتیفای پرمیوم',
    nameEn: 'Spotify Premium',
    slug: 'spotify-premium',
    brandLogoPath: '/brands/spotify.svg',
    category: 'music',
    price: 120000,
    originalPrice: 150000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'پخش موسیقی بدون تبلیغ با کیفیت عالی',
    features: [
      'پخش بدون تبلیغ',
      'دانلود برای گوش دادن آفلاین',
      'کیفیت صدای عالی',
      'رد کردن نامحدود آهنگ',
    ],
    specifications: [
      { label: 'کیفیت صدا', value: 'تا 320 kbps' },
      { label: 'دانلود آفلاین', value: 'تا 10000 آهنگ' },
      { label: 'دستگاه', value: 'نامحدود' },
      { label: 'مدت', value: '1 ماه' },
    ],
    popular: true,
  },
  {
    id: 6,
    name: 'یوتیوب پرمیوم',
    nameEn: 'YouTube Premium',
    slug: 'youtube-premium',
    brandLogoPath: '/brands/youtube.svg',
    category: 'media',
    price: 180000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'تماشای ویدئوهای یوتیوب بدون تبلیغ و با قابلیت پخش در پس‌زمینه',
    features: [
      'بدون تبلیغ',
      'پخش در پس‌زمینه',
      'دانلود ویدئوها',
      'یوتیوب موزیک رایگان',
    ],
    specifications: [
      { label: 'پخش آفلاین', value: 'بله' },
      { label: 'کیفیت', value: 'تا 4K' },
      { label: 'پخش پس‌زمینه', value: 'بله' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },
  {
    id: 7,
    name: 'نتفلیکس',
    nameEn: 'Netflix',
    slug: 'netflix',
    brandLogoPath: '/brands/netflix.svg',
    category: 'media',
    price: 250000,
    originalPrice: 300000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'تماشای نامحدود سریال‌ها و فیلم‌های اختصاصی',
    features: [
      'محتوای اختصاصی Netflix',
      'کیفیت 4K Ultra HD',
      'پخش روی 4 دستگاه همزمان',
      'دانلود برای تماشای آفلاین',
    ],
    specifications: [
      { label: 'کیفیت', value: '4K HDR' },
      { label: 'نمایش همزمان', value: '4 دستگاه' },
      { label: 'دانلود', value: 'بله' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },

  // Developer Tools Category
  {
    id: 8,
    name: 'گیت‌هاب کوپایلت',
    nameEn: 'GitHub Copilot',
    slug: 'github-copilot',
    brandLogoPath: '/brands/github.svg',
    category: 'devTools',
    price: 450000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'دستیار هوش مصنوعی برای کدنویسی سریع‌تر و بهتر',
    features: [
      'پیشنهاد کد هوشمند',
      'پشتیبانی از همه زبان‌های برنامه‌نویسی',
      'یادگیری از کدهای شما',
      'یکپارچگی با IDEها',
    ],
    specifications: [
      { label: 'پلتفرم', value: 'VS Code, JetBrains, Neovim' },
      { label: 'زبان‌ها', value: 'همه زبان‌های محبوب' },
      { label: 'مدت', value: '1 ماه' },
      { label: 'پشتیبانی', value: '24/7' },
    ],
    popular: true,
  },
  {
    id: 9,
    name: 'کرسر پرو',
    nameEn: 'Cursor Pro',
    slug: 'cursor-pro',
    brandLogoPath: '/brands/cursor.svg',
    category: 'devTools',
    price: 380000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'ویرایشگر کد هوشمند با قابلیت‌های AI پیشرفته',
    features: [
      'کدنویسی با AI',
      'تکمیل خودکار هوشمند',
      'Copilot++ داخلی',
      'Chat با کدهای پروژه',
    ],
    specifications: [
      { label: 'پلتفرم', value: 'Windows, Mac, Linux' },
      { label: 'مدل AI', value: 'GPT-4' },
      { label: 'مدت', value: '1 ماه' },
      { label: 'پشتیبانی', value: 'کامل' },
    ],
  },

  // Design Tools Category
  {
    id: 10,
    name: 'کنوا پرو',
    nameEn: 'Canva Pro',
    slug: 'canva-pro',
    brandLogoPath: '/brands/canva.svg',
    category: 'design',
    price: 220000,
    originalPrice: 280000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'ابزار طراحی گرافیکی حرفه‌ای برای همه',
    features: [
      '100 میلیون عکس، ویدئو و گرافیک',
      'حذف پس‌زمینه با یک کلیک',
      'ابزارهای برند کیت',
      'فضای ذخیره‌سازی نامحدود',
    ],
    specifications: [
      { label: 'تمپلیت', value: '610,000+' },
      { label: 'فضای ذخیره', value: 'نامحدود' },
      { label: 'تیم', value: 'تا 5 نفر' },
      { label: 'مدت', value: '1 ماه' },
    ],
    popular: true,
  },
  {
    id: 11,
    name: 'فیگما پروفشنال',
    nameEn: 'Figma Professional',
    slug: 'figma-professional',
    brandLogoPath: '/brands/figma.svg',
    category: 'design',
    price: 500000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'پلتفرم طراحی و همکاری تیمی آنلاین',
    features: [
      'پروژه‌های نامحدود',
      'نسخه‌گیری خودکار',
      'پلاگین‌های حرفه‌ای',
      'همکاری تیمی',
    ],
    specifications: [
      { label: 'پروژه', value: 'نامحدود' },
      { label: 'اعضای تیم', value: 'نامحدود' },
      { label: 'فضا', value: 'نامحدود' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },
  {
    id: 12,
    name: 'ادوبی کریتیو کلاود',
    nameEn: 'Adobe Creative Cloud',
    slug: 'adobe-creative-cloud',
    brandLogoPath: '/brands/adobe.svg',
    category: 'design',
    price: 1500000,
    originalPrice: 1800000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'دسترسی به تمام ابزارهای حرفه‌ای Adobe',
    features: [
      '20+ اپلیکیشن Adobe',
      'Photoshop, Illustrator, Premiere Pro',
      '100GB فضای ابری',
      'آپدیت‌های خودکار',
    ],
    specifications: [
      { label: 'اپلیکیشن‌ها', value: '20+ برنامه' },
      { label: 'فضای ابری', value: '100GB' },
      { label: 'دستگاه', value: '2 دستگاه' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },

  // Productivity Category
  {
    id: 13,
    name: 'نوشن پلاس',
    nameEn: 'Notion Plus',
    slug: 'notion-plus',
    brandLogoPath: '/brands/notion.svg',
    category: 'productivity',
    price: 280000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'فضای کاری همه‌کاره برای یادداشت و پروژه‌ها',
    features: [
      'فضای نامحدود',
      'همکاری تیمی',
      'API دسترسی',
      'تاریخچه نسخه 30 روزه',
    ],
    specifications: [
      { label: 'فضا', value: 'نامحدود' },
      { label: 'فایل', value: 'تا 5GB هر فایل' },
      { label: 'مهمان', value: '100 نفر' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },
  {
    id: 14,
    name: 'گرمرلی پرمیوم',
    nameEn: 'Grammarly Premium',
    slug: 'grammarly-premium',
    brandLogoPath: '/brands/grammarly.svg',
    category: 'productivity',
    price: 150000,
    hasDiscount: false,
    duration: '1 ماه',
    description: 'دستیار نوشتاری هوشمند برای متون انگلیسی',
    features: [
      'بررسی دستور زبان پیشرفته',
      'پیشنهادات سبک نوشتاری',
      'تشخیص لحن متن',
      'چک سرقت ادبی',
    ],
    specifications: [
      { label: 'پلتفرم', value: 'Web, Desktop, Mobile' },
      { label: 'زبان', value: 'انگلیسی' },
      { label: 'یکپارچگی', value: 'Office, Gmail, Google Docs' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },
  {
    id: 15,
    name: 'دیسکورد نایترو',
    nameEn: 'Discord Nitro',
    slug: 'discord-nitro',
    brandLogoPath: '/brands/discord.svg',
    category: 'productivity',
    price: 200000,
    originalPrice: 240000,
    hasDiscount: true,
    duration: '1 ماه',
    description: 'ارتقا اکانت Discord با امکانات ویژه',
    features: [
      'استیکر‌های سفارشی',
      'کیفیت استریم 4K',
      '500MB حجم آپلود',
      'پروفایل سفارشی',
    ],
    specifications: [
      { label: 'کیفیت استریم', value: '4K 60fps' },
      { label: 'حجم آپلود', value: '500MB' },
      { label: 'بوست سرور', value: '2 بوست' },
      { label: 'مدت', value: '1 ماه' },
    ],
  },
];

/**
 * Get products by category
 */
export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

/**
 * Get featured/popular products
 */
export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.popular === true);
};

/**
 * Get products with active discounts
 */
export const getDiscountedProducts = (): Product[] => {
  return products.filter(p => p.hasDiscount === true);
};

/**
 * Get product by ID
 */
export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

/**
 * Get product by slug
 */
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

/**
 * Search products
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Category labels (Persian)
 */
export const categoryLabels: Record<Product['category'], string> = {
  ai: 'هوش مصنوعی',
  music: 'موسیقی',
  devTools: 'ابزار توسعه',
  design: 'طراحی',
  media: 'رسانه',
  productivity: 'بهره‌وری',
};

export default products;
