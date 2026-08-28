import { asset } from '@/lib/assets';

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
 * Product catalog - Live market & Subix products
 * Prices in Iranian Toman
 */
export const products: Product[] = [
  {
    "id": 1,
    "name": "خرید اکانت Leonardo AI لئوناردو (با 91% تخفیف ویژه)",
    "nameEn": "Leonardo AI   91",
    "slug": "leonardo-ai-91",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 3999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Leonardo AI لئوناردو (با 91% تخفیف ویژه) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": true
  },
  {
    "id": 2,
    "name": "خرید اکانت Suno AI سونو روی ایمیل شما (با 91% تخفیف)",
    "nameEn": "Suno AI      91",
    "slug": "suno-ai-91",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 3999000.0,
    "originalPrice": 4598000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Suno AI سونو روی ایمیل شما (با 91% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": true
  },
  {
    "id": 3,
    "name": "خرید اکانت Kimi کیمی روی ایمیل شما ارزان (فوری)",
    "nameEn": "Kimi",
    "slug": "kimi",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 5399000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Kimi کیمی روی ایمیل شما ارزان (فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": true
  },
  {
    "id": 4,
    "name": "خرید اشتراک و اکانت ChatGpt5 و ChatGpt Plus ارزان (آنی)",
    "nameEn": "ChatGpt5  ChatGpt Plus",
    "slug": "chatgpt5-chatgpt-plus",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 5399000.0,
    "originalPrice": 6208000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اشتراک و اکانت ChatGpt5 و ChatGpt Plus ارزان (آنی) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": true
  },
  {
    "id": 5,
    "name": "خرید اکانت اپل موزیک Apple Music ارزان آمریکا (قابل تمدید و فوری)",
    "nameEn": "Apple Music",
    "slug": "apple-music",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت اپل موزیک Apple Music ارزان آمریکا (قابل تمدید و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": true
  },
  {
    "id": 6,
    "name": "خرید اکانت مگا MEGA روی با ایمیل شما فوری (با 97% تخفیف)",
    "nameEn": "MEGA       97",
    "slug": "mega-97",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 2999000.0,
    "originalPrice": 3448000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت مگا MEGA روی با ایمیل شما فوری (با 97% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": true
  },
  {
    "id": 7,
    "name": "خرید اکانت QuillBot کویل بات پرمیوم با ایمیل شما (ارزان)",
    "nameEn": "QuillBot",
    "slug": "quillbot",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 499000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت QuillBot کویل بات پرمیوم با ایمیل شما (ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 8,
    "name": "خرید اکانت Character.AI بر روی ایمیل شما (ارزان و فوری)",
    "nameEn": "CharacterAI",
    "slug": "character-ai",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 2399000.0,
    "originalPrice": 2758000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Character.AI بر روی ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 9,
    "name": "خرید و افزایش فضای گوگل درایو Google Drive نامحدود (73% تخفیف)",
    "nameEn": "Google Drive  73",
    "slug": "google-drive-73",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "productivity",
    "price": 599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید و افزایش فضای گوگل درایو Google Drive نامحدود (73% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 10,
    "name": "خرید اکانت Lumosity لوموسیتی روی ایمیل شما (قابل تمدید)",
    "nameEn": "Lumosity",
    "slug": "lumosity",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": 1148000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Lumosity لوموسیتی روی ایمیل شما (قابل تمدید) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 11,
    "name": "خرید اکانت Chess.com چس دات کام (ارزان و فوری)",
    "nameEn": "Chesscom",
    "slug": "chess-com",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Chess.com چس دات کام (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 12,
    "name": "خرید اکانت گرامرلی Grammarly با ایمیل شما (با 93% تخفیف)",
    "nameEn": "Grammarly     93",
    "slug": "grammarly-93",
    "brandLogoPath": asset('/brands/grammarly.svg'),
    "category": "productivity",
    "price": 597000.0,
    "originalPrice": 686000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت گرامرلی Grammarly با ایمیل شما (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 13,
    "name": "خرید اکانت Grok گروک با ایمیل شما (ارزان و فوری)",
    "nameEn": "Grok",
    "slug": "grok",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 7999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Grok گروک با ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 14,
    "name": "خرید تلگرام پریمیوم Telegram Premium بدون لاگین(ارزان و فوری)",
    "nameEn": "Telegram Premium",
    "slug": "telegram-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 3399000.0,
    "originalPrice": 3908000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید تلگرام پریمیوم Telegram Premium بدون لاگین(ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 15,
    "name": "خرید اکانت تریدینگ ویو TradingView با ایمیل شما (ارزان و فوری)",
    "nameEn": "TradingView",
    "slug": "tradingview",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 7999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت تریدینگ ویو TradingView با ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 16,
    "name": "خرید اکانت یوتیوب پرمیوم YouTube Premium + Music (ارزان و فوری)",
    "nameEn": "YouTube Premium  Music",
    "slug": "youtube-premium-music",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 1990000.0,
    "originalPrice": 2288000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت یوتیوب پرمیوم YouTube Premium + Music (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 17,
    "name": "خرید اکانت Monica مونیکا با ایمیل شما (با 93% تخفیف)",
    "nameEn": "Monica      93",
    "slug": "monica-93",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Monica مونیکا با ایمیل شما (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 18,
    "name": "خرید اکانت پیکس آرت PicsArt پریمیوم (فوری و ارزان)",
    "nameEn": "PicsArt",
    "slug": "picsart",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 799000.0,
    "originalPrice": 918000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت پیکس آرت PicsArt پریمیوم (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 19,
    "name": "خرید اکانت RealLife English روی ایمیل شما (فوری و ارزان)",
    "nameEn": "RealLife English",
    "slug": "reallife-english",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 980000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت RealLife English روی ایمیل شما (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 20,
    "name": "خرید اکانت Captions کپشنز پرمیوم با ایمیل شما (ارزان)",
    "nameEn": "Captions",
    "slug": "captions",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": 1148000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Captions کپشنز پرمیوم با ایمیل شما (ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 21,
    "name": "خرید اکانت Capcut کپ کات پریمیوم روی ایمیل شما (آنی و ارزان)",
    "nameEn": "Capcut",
    "slug": "capcut",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Capcut کپ کات پریمیوم روی ایمیل شما (آنی و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 22,
    "name": "خرید اکانت Canva کانوا قابل تمدید ( آنی و ارزان)",
    "nameEn": "Canva",
    "slug": "canva",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 299000.0,
    "originalPrice": 343000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Canva کانوا قابل تمدید ( آنی و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 23,
    "name": "خرید اشتراک دولینگو Duolingo پلاس/مکس (ارزان و فوری)",
    "nameEn": "Duolingo",
    "slug": "duolingo",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 299000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اشتراک دولینگو Duolingo پلاس/مکس (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 24,
    "name": "خرید اکانت InShot Pro اینشات پرو (ارزان و فوری)",
    "nameEn": "InShot Pro",
    "slug": "inshot-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 980000.0,
    "originalPrice": 1127000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت InShot Pro اینشات پرو (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 25,
    "name": "خرید اکانت Kling Ai کی لینگ با ایمیل شما (ارزان و فوری)",
    "nameEn": "Kling Ai",
    "slug": "kling-ai",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1199000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Kling Ai کی لینگ با ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 26,
    "name": "خرید اکانت Lightroom لایت روم با ایمیل شخصی (فوری و ارزان)",
    "nameEn": "Lightroom",
    "slug": "lightroom",
    "brandLogoPath": asset('/brands/adobe.svg'),
    "category": "design",
    "price": 999000.0,
    "originalPrice": 1148000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Lightroom لایت روم با ایمیل شخصی (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 27,
    "name": "خرید اکانت Meitu میتو پرمیوم با ایمیل شما (فوری و ارزان)",
    "nameEn": "Meitu",
    "slug": "meitu",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Meitu میتو پرمیوم با ایمیل شما (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 28,
    "name": "خرید اکانت Veo 3 AI گوگل روی ایمیل شما (ارزان و فوری)",
    "nameEn": "Veo 3 AI",
    "slug": "veo-3-ai",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1599000.0,
    "originalPrice": 1838000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Veo 3 AI گوگل روی ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 29,
    "name": "خرید اکانت Claude Ai کلاد پرو روی ایمیل شما (با ضمانت و فوری)",
    "nameEn": "Claude Ai",
    "slug": "claude-ai",
    "brandLogoPath": asset('/brands/anthropic.svg'),
    "category": "ai",
    "price": 4599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Claude Ai کلاد پرو روی ایمیل شما (با ضمانت و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 30,
    "name": "خرید اکانت جمینی Gemini جمنای گوگل (ارزان و فوری)",
    "nameEn": "Gemini",
    "slug": "gemini",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "ai",
    "price": 1499000.0,
    "originalPrice": 1723000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت جمینی Gemini جمنای گوگل (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 31,
    "name": "خرید اکانت NotebookLM روی ایمیل شما (97% تخفیف)",
    "nameEn": "NotebookLM    97",
    "slug": "notebooklm-97",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت NotebookLM روی ایمیل شما (97% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 32,
    "name": "خرید اکانت Nano Banana نانو بنانا فوری (91% تخفیف)",
    "nameEn": "Nano Banana    91",
    "slug": "nano-banana-91",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": 2298000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Nano Banana نانو بنانا فوری (91% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 33,
    "name": "خرید اکانت نتفلیکس Netflix ارزان و قابل تمدید",
    "nameEn": "Netflix",
    "slug": "netflix",
    "brandLogoPath": asset('/brands/netflix.svg'),
    "category": "media",
    "price": 280000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت نتفلیکس Netflix ارزان و قابل تمدید با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 34,
    "name": "خرید اکانت کرانچی رول Crunchyroll پرمیوم (ارزان و فوری)",
    "nameEn": "Crunchyroll",
    "slug": "crunchyroll",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 57000.0,
    "originalPrice": 65000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت کرانچی رول Crunchyroll پرمیوم (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 35,
    "name": "خرید اشتراک و اکانت Apple TV Plus اپل تی وی پلاس (ارزان و فوری)",
    "nameEn": "Apple TV Plus",
    "slug": "apple-tv-plus",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 299000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اشتراک و اکانت Apple TV Plus اپل تی وی پلاس (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 36,
    "name": "خرید اکانت Disney Plus دیزنی پلاس روی ایمیل شما (فوری و ارزان)",
    "nameEn": "Disney Plus",
    "slug": "disney-plus",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 399000.0,
    "originalPrice": 458000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Disney Plus دیزنی پلاس روی ایمیل شما (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 37,
    "name": "خرید اکانت Hulu هولو با ایمیل شما (فوری و ارزان)",
    "nameEn": "Hulu",
    "slug": "hulu",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 779000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Hulu هولو با ایمیل شما (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 38,
    "name": "خرید اکانت ساندکلود SoundCloud با ایمیل شما (ارزان و فوری)",
    "nameEn": "SoundCloud",
    "slug": "soundcloud",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 599000.0,
    "originalPrice": 688000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت ساندکلود SoundCloud با ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 39,
    "name": "خرید اکانت اسپاتیفای Spotify ارزان (فوری)",
    "nameEn": "Spotify",
    "slug": "spotify",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت اسپاتیفای Spotify ارزان (فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 40,
    "name": "خرید اکانت Youtube Music یوتیوب موزیک ارزان و فوری",
    "nameEn": "Youtube Music",
    "slug": "youtube-music",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "music",
    "price": 799000.0,
    "originalPrice": 918000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Youtube Music یوتیوب موزیک ارزان و فوری با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 41,
    "name": "خرید اکانت Epidemic Sound اپیدمیک ساند (ارزان و سریع)",
    "nameEn": "Epidemic Sound",
    "slug": "epidemic-sound",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 389000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Epidemic Sound اپیدمیک ساند (ارزان و سریع) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 42,
    "name": "خرید اکانت آلتیمیت گیتار Ultimate Guitar Pro (سریع و ارزان)",
    "nameEn": "Ultimate Guitar Pro",
    "slug": "ultimate-guitar-pro",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 990000.0,
    "originalPrice": 1138000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت آلتیمیت گیتار Ultimate Guitar Pro (سریع و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 43,
    "name": "خرید اکانت Talkpal تاک پل روی ایمیل شما (ارزان و فوری)",
    "nameEn": "Talkpal",
    "slug": "talkpal",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Talkpal تاک پل روی ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 44,
    "name": "خرید اکانت Sololearn سولولرن پریمیوم (ارزان و فوری)",
    "nameEn": "Sololearn",
    "slug": "sololearn",
    "brandLogoPath": asset('/brands/github.svg'),
    "category": "devTools",
    "price": 179000.0,
    "originalPrice": 205000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Sololearn سولولرن پریمیوم (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 45,
    "name": "خرید اکانت Brilliant برلیانت با ایمیل شما (ارزان و فوری)",
    "nameEn": "Brilliant",
    "slug": "brilliant",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Brilliant برلیانت با ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 46,
    "name": "خرید اکانت یا شارژ Busuu بوسو بر روی اکانت شخصی(ارزان و فوری)",
    "nameEn": "Busuu",
    "slug": "busuu",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 199000.0,
    "originalPrice": 228000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت یا شارژ Busuu بوسو بر روی اکانت شخصی(ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 47,
    "name": "خرید AppleID اپل آیدی معتبر آمریکا (ارزان و فوری)",
    "nameEn": "AppleID",
    "slug": "appleid",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید AppleID اپل آیدی معتبر آمریکا (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 48,
    "name": "خرید اشتراک اپل وان Apple One قابل تمدید (ارزان و فوری)",
    "nameEn": "Apple One",
    "slug": "apple-one",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": 2298000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اشتراک اپل وان Apple One قابل تمدید (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 49,
    "name": "خرید اکانت Google Colab Pro گوگل کولب پرو با ایمیل شخصی",
    "nameEn": "Google Colab Pro",
    "slug": "google-colab-pro",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "devTools",
    "price": 1990000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Google Colab Pro گوگل کولب پرو با ایمیل شخصی با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 50,
    "name": "خرید اکانت Ginger جینجر با ایمیل شخصی (ارزان و فوری)",
    "nameEn": "Ginger",
    "slug": "ginger",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 199000.0,
    "originalPrice": 228000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Ginger جینجر با ایمیل شخصی (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 51,
    "name": "خرید اکانت مایکروسافت Microsoft 365 (با 97% تخفیف)",
    "nameEn": "Microsoft 365  97",
    "slug": "microsoft-365-97",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت مایکروسافت Microsoft 365 (با 97% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 52,
    "name": "خرید اکانت مایکروسافت کوپایلت Microsoft Copilot (آنی)",
    "nameEn": "Microsoft Copilot",
    "slug": "microsoft-copilot",
    "brandLogoPath": asset('/brands/github.svg'),
    "category": "devTools",
    "price": 2799000.0,
    "originalPrice": 3218000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت مایکروسافت کوپایلت Microsoft Copilot (آنی) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 53,
    "name": "خرید اکانت برنامه Reface ریفیس ارزان (با 93% تخفیف)",
    "nameEn": "Reface    93",
    "slug": "reface-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت برنامه Reface ریفیس ارزان (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 54,
    "name": "خرید اکانت BeautyPlus روی ایمیل شما (ارزان و فوری)",
    "nameEn": "BeautyPlus",
    "slug": "beautyplus",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1599000.0,
    "originalPrice": 1838000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت BeautyPlus روی ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 55,
    "name": "خرید اکانت Gemma بر روی ایمیل شما (93% تخفیف)",
    "nameEn": "Gemma     93",
    "slug": "gemma-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Gemma بر روی ایمیل شما (93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 56,
    "name": "خرید اکانت Tettra تترا روی ایمیل شما (91% تخفیف)",
    "nameEn": "Tettra     91",
    "slug": "tettra-91",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": 1148000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Tettra تترا روی ایمیل شما (91% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 57,
    "name": "خرید اکانت Goodnotes گودنوتس پرو با ایمیل شما (ارزان)",
    "nameEn": "Goodnotes",
    "slug": "goodnotes",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 99000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Goodnotes گودنوتس پرو با ایمیل شما (ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 58,
    "name": "خرید اکانت کرسر Cursor AI با ایمیل شما (با 93% تخفیف)",
    "nameEn": "Cursor AI     93",
    "slug": "cursor-ai-93",
    "brandLogoPath": asset('/brands/cursor.svg'),
    "category": "ai",
    "price": 5999000.0,
    "originalPrice": 6898000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت کرسر Cursor AI با ایمیل شما (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 59,
    "name": "خرید اکانت B612 پرمیوم روی ایمیل شما (با 93% تخفیف)",
    "nameEn": "B612      93",
    "slug": "b612-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 95000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت B612 پرمیوم روی ایمیل شما (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 60,
    "name": "خرید اکانت Fotor فوتور روی ایمیل شما (با 75% تخفیف)",
    "nameEn": "Fotor      75",
    "slug": "fotor-75",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1599000.0,
    "originalPrice": 1838000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Fotor فوتور روی ایمیل شما (با 75% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 61,
    "name": "خرید اکانت Tezza تزا پرمیوم روی ایمیل شما (ارزان)",
    "nameEn": "Tezza",
    "slug": "tezza",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Tezza تزا پرمیوم روی ایمیل شما (ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 62,
    "name": "خرید اکانت Persona روی ایمیل شما (ارزان و فوری)",
    "nameEn": "Persona",
    "slug": "persona",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1699000.0,
    "originalPrice": 1953000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Persona روی ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 63,
    "name": "خرید اکانت و لایسنس Procreate پروکریت (با 91% تخفیف)",
    "nameEn": "Procreate   91",
    "slug": "procreate-91",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 2999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت و لایسنس Procreate پروکریت (با 91% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 64,
    "name": "خرید اکانت DaVinci AI روی ایمیل شما (ارزان و فوری)",
    "nameEn": "DaVinci AI",
    "slug": "davinci-ai",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1699000.0,
    "originalPrice": 1953000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت DaVinci AI روی ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 65,
    "name": "خرید اکانت پرمیوم برنامه Remini روی ایمیل شما (ارزان و سریع)",
    "nameEn": "Remini",
    "slug": "remini",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 940000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت پرمیوم برنامه Remini روی ایمیل شما (ارزان و سریع) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 66,
    "name": "خرید اکانت InMelo روی ایمیل شما (با 93% تخفیف)",
    "nameEn": "InMelo     93",
    "slug": "inmelo-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 5999000.0,
    "originalPrice": 6898000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت InMelo روی ایمیل شما (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 67,
    "name": "خرید اکانت Vecteezy روی ایمیل شما (فوری و ارزان)",
    "nameEn": "Vecteezy",
    "slug": "vecteezy",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1980000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Vecteezy روی ایمیل شما (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 68,
    "name": "خرید اکانت Runway ML رانوی با ایمیل شما (با 93% تخفیف)",
    "nameEn": "Runway ML      93",
    "slug": "runway-ml-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 4999000.0,
    "originalPrice": 5748000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Runway ML رانوی با ایمیل شما (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 69,
    "name": "خرید اکانت فری پیک Freepik پرمیوم فوری (با 93% تخفیف)",
    "nameEn": "Freepik    93",
    "slug": "freepik-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 3999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت فری پیک Freepik پرمیوم فوری (با 93% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 70,
    "name": "خرید اکانت کست باکس Castbox (ارزان و فوری)",
    "nameEn": "Castbox",
    "slug": "castbox",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 599000.0,
    "originalPrice": 688000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت کست باکس Castbox (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 71,
    "name": "خرید اکانت سوندفول Soundful با ایمیل شما (90% تخفیف)",
    "nameEn": "Soundful    90",
    "slug": "soundful-90",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت سوندفول Soundful با ایمیل شما (90% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 72,
    "name": "خرید اکانت Napster نپستر پرمیوم (ارزان و فوری)",
    "nameEn": "Napster",
    "slug": "napster",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 399000.0,
    "originalPrice": 458000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Napster نپستر پرمیوم (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 73,
    "name": "خرید اکانت کورسرا پلاس Coursera با دوره ها و مدرک (ارزان)",
    "nameEn": "Coursera",
    "slug": "coursera",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 2999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت کورسرا پلاس Coursera با دوره ها و مدرک (ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 74,
    "name": "خرید اکانت Higgsfield روی ایمیل شما ارزان (91% تخفیف)",
    "nameEn": "Higgsfield     91",
    "slug": "higgsfield-91",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 4399000.0,
    "originalPrice": 5058000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Higgsfield روی ایمیل شما ارزان (91% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 75,
    "name": "خرید اکانت Yousician یوزیشن با ایمیل شما (91% تخفیف)",
    "nameEn": "Yousician     91",
    "slug": "yousician-91",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 399000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Yousician یوزیشن با ایمیل شما (91% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 76,
    "name": "خرید اکانت Learna AI روی ایمیل شما (با 90% تخفیف)",
    "nameEn": "Learna AI     90",
    "slug": "learna-ai-90",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 799000.0,
    "originalPrice": 918000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Learna AI روی ایمیل شما (با 90% تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 77,
    "name": "خرید اکانت Chegg چگ روی ایمیل شخصی شما (93٪تخفیف)",
    "nameEn": "Chegg      93",
    "slug": "chegg-93",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Chegg چگ روی ایمیل شخصی شما (93٪تخفیف) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 78,
    "name": "خرید اکانت Drops دراپز با ایمیل شما (ارزان و فوری)",
    "nameEn": "Drops",
    "slug": "drops",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 67000.0,
    "originalPrice": 77000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت Drops دراپز با ایمیل شما (ارزان و فوری) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 79,
    "name": "خرید اکانت آپتودیت UpToDate فوری و ارزان",
    "nameEn": "UpToDate",
    "slug": "uptodate",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اکانت آپتودیت UpToDate فوری و ارزان با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  },
  {
    "id": 80,
    "name": "خرید اشتراک افزایش فضای آیکلود پلاس iCloud Plus (فوری و ارزان)",
    "nameEn": "iCloud Plus",
    "slug": "icloud-plus",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 899000.0,
    "originalPrice": 1033000.0,
    "hasDiscount": true,
    "duration": "1 ماه (قابل تمدید)",
    "description": "خرید و فعال‌سازی قانونی خرید اشتراک افزایش فضای آیکلود پلاس iCloud Plus (فوری و ارزان) با ضمانت کامل و تحویل آنی",
    "features": [
      "فعال‌سازی قانونی و اختصاصی",
      "تحویل سریع (کمتر از ۳۰ دقیقه)",
      "ضمانت بازگشت وجه تا پایان دوره",
      "پشتیبانی ۲۴ ساعته و پاسخگویی آنلاین"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت اختصاصی / روی ایمیل شخصی"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روز (قابل تمدید)"
      },
      {
        "label": "گارانتی",
        "value": "ضمانت ۱۰۰٪ تا روز آخر اشتراک"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴/۷ توسط تیم سابیکس"
      }
    ],
    "popular": false
  }
];

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.popular === true);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(p => p.hasDiscount === true);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};

export const categoryLabels: Record<Product['category'], string> = {
  ai: 'هوش مصنوعی',
  music: 'موسیقی',
  devTools: 'ابزار توسعه',
  design: 'طراحی',
  media: 'رسانه',
  productivity: 'بهره‌وری',
};

export default products;
