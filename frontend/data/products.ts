import { asset } from '@/lib/assets';

/**
 * Subix Official Products Catalog
 * Contains authentic digital accounts, developer licenses, AI subscriptions, and entertainment services.
 * All prices in Iranian Toman (تومان)
 */

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  brandLogoPath: string;
  category: 'ai' | 'music' | 'devTools' | 'design' | 'media' | 'productivity';
  price: number;
  originalPrice?: number | null;
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

export const products: Product[] = [
  {
    "id": 1,
    "name": "اکانت لئوناردو هوش مصنوعی Leonardo AI Pro",
    "nameEn": "Leonardo AI Pro",
    "slug": "leonardo-ai-pro",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 3999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دسترسی به پیشرفته‌ترین ابزار تولید و ویرایش تصاویر با هوش مصنوعی، مدل‌های اختصاصی Photoreal، Alchemy و رندر بلادرنگ.",
    "features": [
      "تولید نامحدود تصویر با توکن‌های ماهانه",
      "دسترسی به موتور Alchemy و PhotoReal",
      "حالت خصوصی (Private Generation)",
      "سرعت پردازش اولویت‌دار Fast Queue"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 2,
    "name": "اشتراک ساخت موزیک هوش مصنوعی Suno AI Pro",
    "nameEn": "Suno AI Pro",
    "slug": "suno-ai-pro",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 3999000.0,
    "originalPrice": 4598000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "خلق آهنگ‌ها و قطعات موسیقی کامل همراه با خواننده و سازبندی زنده در تمام سبک‌ها تنها با یک پرامپت متنی ساده.",
    "features": [
      "۲۵۰۰ توکن ماهانه معادل ۵۰۰ آهنگ کامل",
      "حق مالکیت تجاری و انتشار عمومی قطعات",
      "تولید همزمان دو نسخه از هر قطعه",
      "کیفیت صوتی بالای استودیویی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 3,
    "name": "اکانت هوش مصنوعی کیمی Kimi AI Pro",
    "nameEn": "Kimi AI Pro",
    "slug": "kimi-ai-pro",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 5399000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دستیار هوش مصنوعی با پنجره زمینه غول‌پیکر ۲ میلیون کلمه‌ای، ایده‌آل برای تحلیل کتاب‌ها، پایان‌نامه‌ها و اسناد اداری طولانی.",
    "features": [
      "پنجره کانتکست فوق‌العاده بزرگ ۲ میلیون کاراکتر",
      "تحلیل و خلاصه‌سازی PDFها و اسناد سنگین",
      "جستجوی وب متصل و استخراج آمار زنده",
      "پشتیبانی عالی از زبان فارسی و نگارش روان"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 4,
    "name": "اشتراک چت‌جی‌پی‌تی پلاس ChatGPT Plus (GPT-4o)",
    "nameEn": "ChatGPT Plus",
    "slug": "chatgpt-plus",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 5399000.0,
    "originalPrice": 6208000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "نسخه پریمیوم و بدون محدودیت ChatGPT با دسترسی مستقیم به GPT-4o، تحلیل فایل‌های داده، تولید تصویر DALL-E و ویس چت طبیعی.",
    "features": [
      "دسترسی نامحدود به سریع‌ترین مدل GPT-4o",
      "تحلیل پیشرفته دیتا و اجرای کدهای پایتون",
      "ساخت و استفاده از کاستوم GPTهای اختصاصی",
      "حالت مکالمه صوتی پیشرفته Advanced Voice"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 5,
    "name": "اشتراک اپل موزیک Apple Music Individual",
    "nameEn": "Apple Music",
    "slug": "apple-music",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دسترسی به بیش از ۱۰۰ میلیون قطعه موسیقی با بالاترین استانداردهای کیفی Lossless Audio، Dolby Atmos و صدای فضایی Spatial Audio.",
    "features": [
      "کیفیت صوتی بی‌نظیر Hi-Res Lossless 24-bit",
      "پشتیبانی از صدای فراگیر Dolby Atmos",
      "دانلود آفلاین نامحدود روی آیفون، مک و اندروید",
      "متن ترانه‌ها به صورت زنده و هماهنگ"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 6,
    "name": "اشتراک فضای ابری مگا MEGA Pro",
    "nameEn": "MEGA Pro Cloud",
    "slug": "mega-pro",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 2999000.0,
    "originalPrice": 3448000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "فضای ذخیره‌سازی ابری امن با رمزنگاری سرتاسری (Zero-Knowledge) برای پشتیبان‌گیری مطمئن از اسناد، تصاویر و ویدیوها.",
    "features": [
      "۲ ترابایت فضای ابری اختصاصی و امن",
      "رمزنگاری پیشرفته End-to-End Encryption",
      "ترافیک انتقال داده بالا و بدون قطعی",
      "همگام‌سازی خودکار روی تمام دستگاه‌ها"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 7,
    "name": "اشتراک پریمیوم کوئیل‌بات QuillBot Premium",
    "nameEn": "QuillBot Premium",
    "slug": "quillbot-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 499000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ابزار هوشمند بازنویسی (Paraphrasing)، چک سرقت ادبی و بازبینی گرامری متون انگلیسی برای دانشجویان، پژوهشگران و مترجمان.",
    "features": [
      "بازنویسی نامحدود کلمات با حالت‌های متنوع",
      "تشخیص و اصلاح گرامر و ساختار جملات",
      "خلاصه‌ساز خودکار متون و مقالات علمی",
      "چک سرقت ادبی Plagiarism Checker ماهانه"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 8,
    "name": "افزایش فضای ابری گوگل درایو Google Drive Storage",
    "nameEn": "Google Drive Storage",
    "slug": "google-drive-storage",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "productivity",
    "price": 599000.0,
    "originalPrice": 688000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "افزایش مطمئن فضای ذخیره‌سازی جیمیل، گوگل فوتوز و گوگل درایو با نگهداری همیشگی فایل‌ها و دسترسی آسان از تمام پلتفرم‌ها.",
    "features": [
      "افزایش مستقیم ظرفیت ذخیره‌سازی ابری",
      "اشتراک‌گذاری آسان با جیمیل و Google Photos",
      "دسترسی پرسرعت و بدون افت کیفیت تصاویر",
      "پشتیبان‌گیری امن از دسکتاپ و گوشی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 9,
    "name": "اشتراک تقویت حافظه و ذهن لوموسیتی Lumosity Premium",
    "nameEn": "Lumosity Premium",
    "slug": "lumosity-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "تمرینات علمی و بازی‌های تقویت حافظه، تمرکز، انعطاف‌پذیری ذهنی و سرعت پردازش مغز طراحی شده توسط متخصصان علوم اعصاب.",
    "features": [
      "دسترسی به تمام بازی‌های ذهنی و شناختی",
      "گزارش‌های تحلیلی از روند پیشرفت مغزی",
      "برنامه‌ریزی روزانه اختصاصی برای تمرین",
      "تست‌های استاندارد حافظه و تمرکز"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 10,
    "name": "اشتراک پریمیوم چس دات کام Chess.com Diamond",
    "nameEn": "Chess.com Diamond",
    "slug": "chess-com-diamond",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 799000.0,
    "originalPrice": 918000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "عضویت سطح دایموند برترین پلتفرم شطرنج جهان با تحلیل نامحدود بازی‌ها، پازل‌های نامحدود، دروس ویدئویی استادان بزرگ و مربی هوش مصنوعی.",
    "features": [
      "تحلیل بازی‌ها با قوی‌ترین موتور Game Review",
      "پازل‌های تاکتیکی و Puzzle Rush نامحدود",
      "ویدیوها و دوره‌های آموزشی استادان بین‌المللی",
      "رفع عیب حرکات و پیشنهاد بهترین تاکتیک‌ها"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 11,
    "name": "اکانت گرامرلی پرمیوم Grammarly Premium",
    "nameEn": "Grammarly Premium",
    "slug": "grammarly-premium",
    "brandLogoPath": asset('/brands/grammarly.svg'),
    "category": "productivity",
    "price": 597000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دستیار هوشمند نگارش متون انگلیسی با تحلیل لحن، اصلاح گرامر پیشرفته، پیشنهاد کلمات غنی‌تر و بررسی روانی متن.",
    "features": [
      "اصلاح خودکار گرامر، املا و نشانه‌گذاری",
      "بهبود وضوح و بازنویسی جملات پیچیده",
      "تشخیص لحن متون (رسمی، دوستانه، متقاعدکننده)",
      "چک سرقت ادبی برای متون آکادمیک و اداری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 12,
    "name": "اشتراک هوش مصنوعی گروک Grok AI Premium (X Premium+)",
    "nameEn": "Grok AI (X Premium)",
    "slug": "grok-ai",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 7999000.0,
    "originalPrice": 9198000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دسترسی به چت‌بات بدون سانسور Grok شرکت xAI ایلان ماسک با تحلیل لحظه‌ای اخبار توییتر/X و تولید بدون محدودیت تصاویر.",
    "features": [
      "دسترسی به مدل Grok-2 با استدلال تحلیلی قوی",
      "اتصال زنده به ترندها و توییت‌های شبکه X",
      "تولید تصاویر بدون فیلترهای محدودکننده",
      "تیک آبی رسمی و ارتقای کامل اکانت X"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 13,
    "name": "اشتراک تلگرام پریمیوم Telegram Premium قانونی",
    "nameEn": "Telegram Premium",
    "slug": "telegram-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 3399000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "فعال‌سازی قانونی تلگرام پریمیوم بدون نیاز به لاگین با ایموجی‌های سفارشی، تبدیل ویس به متن، سرعت دانلود ۲ برابری و استوری.",
    "features": [
      "افزایش سقف آپلود فایل تا ۴ گیگابایت",
      "تبدیل بلادرنگ پیام‌های صوتی و ویدئویی به متن",
      "دانلود فایل‌ها با حداکثر سرعت سرورهای تلگرام",
      "استیکرها، ایموجی‌های متحرک و نشان پرمیوم"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 14,
    "name": "اکانت تریدینگ‌ویو پرو TradingView Pro / Plus",
    "nameEn": "TradingView Pro",
    "slug": "tradingview-pro",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 7999000.0,
    "originalPrice": 9198000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ابزار تخصصی تحلیل تکنیکال بازارهای مالی، کریپتو، فارکس و بورس جهانی با اندیکاتورهای نامحدود و هشدارهای قیمتی بلادرنگ.",
    "features": [
      "نمایش همزمان چندین نمودار در یک برگه",
      "دسترسی به اندیکاتورهای اختصاصی و والیوم پروفایل",
      "هشدارهای قیمتی سروری بدون تاخیر",
      "بک‌تست استراتژی‌های معاملاتی با دیتای تاریخی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 15,
    "name": "دستیار هوش مصنوعی چندکاره مونیکا Monica AI Pro",
    "nameEn": "Monica AI Pro",
    "slug": "monica-ai-pro",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "اکستنشن همه‌کاره مرورگر مجهز به GPT-4o، Claude 3.5 و Gemini Pro برای خلاصه‌سازی ویدیوهای یوتیوب، نگارش ایمیل و چت با صفحات وب.",
    "features": [
      "دسترسی یکپارچه به GPT-4o و Claude 3.5 Sonnet",
      "خلاصه‌سازی فوری ویدیوهای یوتیوب و مقالات",
      "نوار ابزار هوشمند در تمام صفحات وب و چت PDF",
      "تولید تصویر و ترجمه متن در کسری از ثانیه"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 16,
    "name": "اشتراک یوتیوب پرمیوم YouTube Premium + Music",
    "nameEn": "YouTube Premium",
    "slug": "youtube-premium",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 1990000.0,
    "originalPrice": 2288000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "حذف دائمی تمامی تبلیغات ویدیویی، پخش در پس‌زمینه گوشی، دانلود آفلاین با کیفیت 4K و دسترسی رایگان به YouTube Music.",
    "features": [
      "حذف کامل ۱۰۰٪ تبلیغات یوتیوب در تمام دستگاه‌ها",
      "پخش در پس‌زمینه (Background Play) هنگام قفل گوشی",
      "دانلود ویدیوها برای تماشای بدون اینترنت",
      "اشتراک رایگان سرویس استریم YouTube Music"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 17,
    "name": "اکانت پیکس‌آرت گلد PicsArt Gold Premium",
    "nameEn": "PicsArt Gold",
    "slug": "picsart-gold",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "کامل‌ترین استودیوی ادیت عکس و ویدیوی موبایل با ابزارهای هوش مصنوعی حذف پس‌زمینه، فیلترهای ترند و فونت‌های حرفه‌ای.",
    "features": [
      "حذف بک‌گراند و اشیا ناخواسته با AI",
      "دسترسی به میلیون‌ها استیکر، افکت و فونت پریمیوم",
      "ابزارهای ارتقا کیفیت و روتوش چهره",
      "بدون واترمارک و با خروجی بالاترین کیفیت"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 18,
    "name": "اشتراک آموزش مکالمه انگلیسی RealLife English Global",
    "nameEn": "RealLife English",
    "slug": "reallife-english",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 980000.0,
    "originalPrice": 1127000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پلتفرم تعاملی مکالمه با افراد بومی سراسر دنیا، تقویت مهارت شنیداری و تلفظ طبیعی انگلیسی بر پایه پادکست‌های محبوب.",
    "features": [
      "مکالمه روزانه تصادفی با انگلیسی‌زبانان جهان",
      "متن کامل و تحلیل واژگان پادکست‌های آموزشی",
      "تقویت لهجه و گرامر در بستر مکالمه واقعی",
      "دوره‌های ساختاریافته از مبتدی تا پیشرفته"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 19,
    "name": "اکانت کپشنز هوش مصنوعی Captions AI Pro",
    "nameEn": "Captions AI Pro",
    "slug": "captions-ai-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "هوش مصنوعی تولید خودکار زیرنویس متحرک، تدوین هوشمند، حذف سکوت‌ها و تصحیح زاویه نگاه (Eye Contact) برای ریلز و یوتیوب.",
    "features": [
      "زیرنویس خودکار فارسی و انگلیسی بسیار دقیق",
      "اصلاح هوشمند زاویه دید چشم به دوربین",
      "حذف خودکار نویز صدا و مکث‌های اضافه",
      "انیمیشن‌ها و افکت‌های وایرال اینستاگرامی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 20,
    "name": "اشتراک ساخت موزیک ویدیو اینملو InMelo VIP",
    "nameEn": "InMelo VIP",
    "slug": "inmelo-vip",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 5999000.0,
    "originalPrice": 6898000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "اپلیکیشن ساخت ویدیوهای ریتمیک، استوری‌ها و موزیک‌ویدیوهای ترند با صدها قالب آماده و افکت‌های ترنزیشن مدرن.",
    "features": [
      "صدها قالب آماده ترند شبکه‌های اجتماعی",
      "هماهنگ‌سازی خودکار برش‌های ویدیو با بیت آهنگ",
      "خروجی بدون واترمارک با کیفیت Full HD",
      "افکت‌های سینمایی و فیلترهای انحصاری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 21,
    "name": "اکانت کپ‌کات پرو CapCut Pro Desktop & Mobile",
    "nameEn": "CapCut Pro",
    "slug": "capcut-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "محبوب‌ترین نرم‌افزار ادیت ویدیو در دنیا با افکت‌های Pro، حذف بک‌گراند بدون پرده سبز، هوش مصنوعی تصحیح رنگ و خروجی 4K 60fps.",
    "features": [
      "دسترسی به تمام افکت‌ها، ترنزیشن‌ها و متن‌های Pro",
      "حذف پس‌زمینه ویدیو با هوش مصنوعی هوشمند",
      "کاهش خودکار نویز صدا و بهبود کیفیت صدا",
      "خروجی بدون لگ و سازگار با ویندوز، مک و موبایل"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 22,
    "name": "اشتراک کنوا پرو Canva Pro اختصاصی",
    "nameEn": "Canva Pro",
    "slug": "canva-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 299000.0,
    "originalPrice": 343000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پلتفرم طراحی آنلاین با بیش از ۱۰۰ میلیون عکس، وکتور و تمپلیت پریمیوم، ابزار تغییر سایز جادویی و هوش مصنوعی Magic Studio.",
    "features": [
      "دسترسی به ۱۰۰ میلیون منبع گرافیکی بدون واترمارک",
      "حذف پس‌زمینه تصویر و ویدیو با یک کلیک",
      "کیت برند (Brand Kit) برای ذخیره رنگ‌ها و فونت‌ها",
      "فضای ابری ۱ ترابایتی برای پروژه‌های طراحی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 23,
    "name": "اشتراک دولینگو سوپر / مکس Duolingo Super / Max",
    "nameEn": "Duolingo Super",
    "slug": "duolingo-super",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 299000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "یادگیری سرگرم‌کننده و بی‌وقفه بیش از ۴۰ زبان زنده با جان نامحدود (Hearts)، حذف کامل تبلیغات و کوییزهای تثبیت مهارت.",
    "features": [
      "قلب نامحدود و یادگیری بدون توقف",
      "حذف تمامی تبلیغات بین درس‌ها",
      "تست‌های اختصاصی اشتباهات و بازبینی پیشرفته",
      "امکان تمرین نامحدود مهارت شنیداری و گفتاری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 24,
    "name": "اکانت اینشات پرو InShot Pro Unlimited",
    "nameEn": "InShot Pro",
    "slug": "inshot-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 980000.0,
    "originalPrice": 1127000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ویرایشگر سریع و سبک ویدیو و عکس با امکانات کامل برش، افکت‌های تصویری، استیکرهای متحرک و فونت‌های فارسی اختصاصی.",
    "features": [
      "دسترسی کامل به تمام فیلترها و پک‌های افکت Pro",
      "حذف دائمی تبلیغات و واترمارک برنامه",
      "تنظیم دقیق سرعت و انیمیشن Keyframe",
      "خروجی باکیفیت 4K و نرخ ۶۰ فریم"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 25,
    "name": "اشتراک تولید ویدیو هوش مصنوعی کلینگ Kling AI Pro",
    "nameEn": "Kling AI Pro",
    "slug": "kling-ai-pro",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1199000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پیشرفته‌ترین موتور هوش مصنوعی تبدیل متن و عکس به ویدیوی واقع‌گرایانه ۱۰۸۰p با حرکات طبیعی و ماندگاری بالا در صحنه.",
    "features": [
      "تولید ویدیوهای باکیفیت و داینامیک از پرامپت متنی",
      "تبدیل عکس ثابت به ویدیوی متحرک (Image to Video)",
      "افزایش مدت زمان ویدیوها با حفظ ثبات سوژه",
      "رندر سریع با اولویت پردازش ابری Pro"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 26,
    "name": "اشتراک ادوبی لایت‌روم Adobe Lightroom CC",
    "nameEn": "Adobe Lightroom CC",
    "slug": "adobe-lightroom",
    "brandLogoPath": asset('/brands/adobe.svg'),
    "category": "design",
    "price": 999000.0,
    "originalPrice": 1148000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "استاندارد جهانی ادیت رنگ و نور عکس، تصحیح حرفه‌ای فایل‌های RAW و دسترسی به پریست‌های انحصاری عکاسان برتر دنیا.",
    "features": [
      "دسترسی به ماسک‌های هوشمند انتخاب سوژه و آسمان",
      "ابزارهای پیشرفته Color Grading و Tone Curve",
      "پریست‌های حرفه‌ای و ذخیره تنظیمات دلخواه",
      "همگام‌سازی ابری میان مک، ویندوز، آیپد و گوشی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 27,
    "name": "اشتراک میتو پریمیوم Meitu VIP Photo Editor",
    "nameEn": "Meitu VIP",
    "slug": "meitu-vip",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "برنامه تخصصی روتوش چهره، تبدیل عکس به آرت انیمه‌ای با هوش مصنوعی و زیباسازی ویدیوها با بالاترین دقت جزئیات.",
    "features": [
      "روتوش سه‌بعدی و طبیعی چهره و اندام",
      "فیلترهای سینمایی و هنری انحصاری VIP",
      "تبدیل عکس‌های واقعی به کاراکترهای فانتزی AI",
      "ادیت همزمان چند لایه عکس با کیفیت فوق‌العاده"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 28,
    "name": "هوش مصنوعی تولید ویدیو گوگل Veo 3 AI Pro",
    "nameEn": "Google Veo 3 AI",
    "slug": "google-veo-3-ai",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "ai",
    "price": 1599000.0,
    "originalPrice": 1838000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "مدل نسل جدید هوش مصنوعی گوگل برای تولید ویدیوهای سینمایی ۱۰۸۰p با درک عمیق از فیزیک نور، زوایای دوربین و پرامپت‌های پیچیده.",
    "features": [
      "تولید صحنه‌های سینمایی با زوایای دوربین سفارشی",
      "درک فوق‌العاده از دستورات متنی و تعامل اشیا",
      "رندر با رزولوشن Full HD و کیفیت پایدار",
      "اتصال به زیرساخت هوش مصنوعی پیشرفته گوگل"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 29,
    "name": "اکانت کلود پرو Claude 3.5 Sonnet (Claude Pro)",
    "nameEn": "Claude Pro (Anthropic)",
    "slug": "claude-pro",
    "brandLogoPath": asset('/brands/anthropic.svg'),
    "category": "ai",
    "price": 4599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "هوش مصنوعی بی‌رقیب شرکت Anthropic؛ برترین مدل برای برنامه‌نویسی، معماری کد، استدلال منطقی و پیش‌نمایش کدهای زنده با Artifacts.",
    "features": [
      "دسترسی اولویت‌دار به مدل خارق‌العاده Claude 3.5 Sonnet",
      "پنجره متنی عظیم ۲۰۰ هزار توکنی برای تحلیل سورس‌کد",
      "قابلیت زنده Artifacts برای اجرای وب و کدهای React",
      "پاسخ‌های بدون توهم، فوق‌العاده دقیق و با لحن طبیعی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 30,
    "name": "اکانت گوگل جمینای ادونسد Gemini Advanced (Google AI)",
    "nameEn": "Google Gemini Advanced",
    "slug": "gemini-advanced",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "ai",
    "price": 1499000.0,
    "originalPrice": 1723000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "قوی‌ترین هوش مصنوعی گوگل با کانتکست ۱ میلیون توکنی، ادغام مستقیم با اکوسیستم گوگل (Drive, Gmail, Docs) و ۲ ترابایت فضای ابری.",
    "features": [
      "دسترسی به هوش مصنوعی قدرتمند Gemini 1.5 Pro",
      "پنجره زمینه بی‌رقیب ۱ میلیون توکن (تحلیل ساعت‌ها ویدیو)",
      "۲ ترابایت فضای ذخیره‌سازی ابری Google One",
      "یکپارچگی کامل با جیمیل، داکس و جستجوی گوگل"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 31,
    "name": "اشتراک دستیار پژوهشی گوگل NotebookLM Pro",
    "nameEn": "Google NotebookLM Pro",
    "slug": "google-notebooklm",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "ai",
    "price": 1599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دستیار هوشمند یادداشت‌برداری و تحقیق دانشگاهی با قابلیت تبدیل یادداشت‌ها و فایل‌های PDF به پادکست‌های صوتی گفتگو محور.",
    "features": [
      "تحلیل و یادگیری مستقیم از منابع و PDFهای آپلودشده",
      "تولید خودکار پادکست گفتگومحور صوتی از جزوه‌ها",
      "استخراج خلاصه، جدول زمانی و نکات کلیدی متون",
      "ارجاع مستقیم به شماره صفحه منابع برای جلوگیری از خطا"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 32,
    "name": "اکانت نانو بنانا Nano Banana AI",
    "nameEn": "Nano Banana AI",
    "slug": "nano-banana-ai",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1999000.0,
    "originalPrice": 2298000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "مجموعه ابزارهای سبک و چابک هوش مصنوعی برای تولید محتوا، بازنویسی، کپی‌رایتینگ و نگارش پست‌های شبکه‌های اجتماعی.",
    "features": [
      "تولید سریع متون تبلیغاتی و کپشن‌های وایرال",
      "ایده‌پردازی تیترها و سناریوهای ویدیویی",
      "رابط کاربری ساده و دسترسی بدون تاخیر",
      "صرفه‌جویی چشمگیر در زمان تولید محتوای روزانه"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 33,
    "name": "اشتراک نتفلیکس پریمیوم Netflix Premium 4K Ultra HD",
    "nameEn": "Netflix Premium 4K",
    "slug": "netflix-premium",
    "brandLogoPath": asset('/brands/netflix.svg'),
    "category": "media",
    "price": 280000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "تماشای نامحدود هزاران فیلم، سریال، مستند و انیمه اختصاصی نتفلیکس با کیفیت خیره‌کننده 4K HDR و صدای فراگیر Dolby Atmos.",
    "features": [
      "کیفیت تصویر Ultra HD 4K با پشتیبانی از HDR",
      "پخش همزمان روی تلویزیون، لپ‌تاپ، تبلت و موبایل",
      "دانلود برای تماشای آفلاین بدون نیاز به نت",
      "آرشیو کامل جهانی با زیرنویس‌های فارسی و انگلیسی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 34,
    "name": "اشتراک کرانچی‌رول انیمه Crunchyroll Mega Fan",
    "nameEn": "Crunchyroll Mega Fan",
    "slug": "crunchyroll-mega-fan",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 57000.0,
    "originalPrice": 65000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "بزرگترین آرشیو قانونی انیمه‌های ژاپنی همزمان با پخش جهانی در توکیو بدون تبلیغات و با امکان دانلود آفلاین قسمت‌ها.",
    "features": [
      "تماشای جدیدترین انیمه‌ها یک ساعت پس از پخش ژاپن",
      "حذف ۱۰۰٪ تبلیغات در تمام پلتفرم‌ها",
      "دانلود آفلاین برای تماشا در سفر",
      "دسترسی به بخش مانگا و بازی‌های اختصاصی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 35,
    "name": "اشتراک اپل تی‌وی پلاس Apple TV+ Original",
    "nameEn": "Apple TV+",
    "slug": "apple-tv-plus",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 299000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "سریال‌ها و فیلم‌های برنده جوایز اسکار و امی با استانداردهای سینمایی بی‌نظیر اپل، کیفیت 4K Dolby Vision و صدای فضایی.",
    "features": [
      "دسترسی به آثار تحسین‌شده مانند Ted Lasso و Severance",
      "بالاترین بیت‌ریت تصویری 4K Dolby Vision در میان استریم‌ها",
      "صدای سه‌بعدی سینمایی Spatial Audio",
      "پخش آسان روی اپل تی‌وی، تلویزیون‌های هوشمند و وب"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 36,
    "name": "اشتراک دیزنی پلاس Disney+ Premium 4K",
    "nameEn": "Disney+ Premium",
    "slug": "disney-plus",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 399000.0,
    "originalPrice": 458000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دنیای انیمیشن‌های دیزنی و پیکسار، آثار حماسی مارول، دنیای جنگ ستارگان Star Wars و مستندهای شگفت‌انگیز نشنال جئوگرافیک.",
    "features": [
      "آرشیو کامل آثار Disney, Pixar, Marvel, Star Wars",
      "کیفیت پخش 4K UHD با نسبت تصویر IMAX Enhanced",
      "پروفایل اختصاصی امن برای کودکان",
      "دانلود آفلاین نامحدود بر روی ۱۰ دستگاه"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 37,
    "name": "اشتراک هولو Hulu Ad-Free Streaming",
    "nameEn": "Hulu Ad-Free",
    "slug": "hulu-ad-free",
    "brandLogoPath": asset('/brands/youtube.svg'),
    "category": "media",
    "price": 779000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "استریم برترین سریال‌های تلویزیونی آمریکا، برنامه‌های زنده و فیلم‌های روز بدون تبلیغات مزاحم و با پخش فوری قسمت‌های جدید.",
    "features": [
      "تماشای پرطرفدارترین سریال‌های شبکه‌های مطرح آمریکا",
      "حذف کامل تبلیغات در نسخه Ad-Free",
      "پخش روز بعد از پخش تلویزیونی سریال‌ها",
      "کیفیت تصویر و صدای فوق‌العاده"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 38,
    "name": "اشتراک ساندکلود گو پلاس SoundCloud Go+",
    "nameEn": "SoundCloud Go+",
    "slug": "soundcloud-go-plus",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 599000.0,
    "originalPrice": 688000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دسترسی به میلیون‌ها ریمیکس، سِت دی‌جی، آهنگ مستقل و ترک اورجینال با کیفیت عالی، پخش بدون تبلیغ و دانلود آفلاین.",
    "features": [
      "دسترسی به بیش از ۳۰۰ میلیون ترک و ریمیکس اختصاصی",
      "کیفیت صدای بالاتر با فرمت باکیفیت HQ Audio",
      "حذف تبلیغات صوتی و بنری آزاردهنده",
      "دانلود و گوش دادن آفلاین در هر مکان"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 39,
    "name": "اشتراک اسپاتیفای پرمیوم Spotify Premium Individual",
    "nameEn": "Spotify Premium",
    "slug": "spotify-premium",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پادشاه استریم موسیقی دنیا؛ رد کردن نامحدود آهنگ‌ها، حذف کامل تبلیغات، بالاترین کیفیت ۳۲۰kbps و فعال‌سازی روی ایمیل شخصی شما.",
    "features": [
      "حذف دائمی تبلیغات و اسکیپ نامحدود آهنگ‌ها",
      "بالاترین کیفیت پخش ممکن Extremely High 320kbps",
      "دانلود مستقیم موزیک‌ها و پادکست‌ها برای حالت آفلاین",
      "جلسات گوش دادن گروهی آنلاین Group Session"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 40,
    "name": "اشتراک یوتیوب موزیک YouTube Music Premium",
    "nameEn": "YouTube Music Premium",
    "slug": "youtube-music-premium",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 799000.0,
    "originalPrice": 918000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دسترسی اختصاصی به آرشیو بی‌پایان موسیقی، کنسرت‌های زنده، کاورها و ریمیکس‌های یوتیوب با امکان پخش در پس‌زمینه.",
    "features": [
      "پخش موسیقی در پس‌زمینه با صفحه قفل گوشی",
      "حذف ۱۰۰٪ تبلیغات و کیفیت صوتی ۲۵۶kbps AAC",
      "دانلود هوشمند پلی‌لیست‌های دلخواه",
      "سوییچ فوری بین حالت تماشای موزیک‌ویدیو و صوت"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 41,
    "name": "اشتراک دانلود موزیک اپیدمیک ساند Epidemic Sound Personal",
    "nameEn": "Epidemic Sound",
    "slug": "epidemic-sound",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 389000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "منبع شماره یک موزیک‌ها و افکت‌های صوتی بدون کپی‌رایت برای یوتیوبرها، پادکسترها و تولیدکنندگان محتوا با مجوز انتشار دائمی.",
    "features": [
      "بیش از ۴۰ هزار آهنگ و ۹۰ هزار افکت صوتی بدون کپی‌رایت",
      "مجوز تجاری و مصونیت کامل کانال یوتیوب از اخطار",
      "امکان دانلود لاین‌های مجزای سازها (Stems)",
      "آهنگ‌های دسته‌بندی‌شده بر اساس حس و حال و ژانر"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 42,
    "name": "اشتراک آلتیمیت گیتار پرو Ultimate Guitar Pro Tabs",
    "nameEn": "Ultimate Guitar Pro",
    "slug": "ultimate-guitar-pro",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 990000.0,
    "originalPrice": 1138000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "جامع‌ترین مرجع آکوردها، تبلچرها و نت‌های تعاملی گیتار، پیانو و یوکللی با قابلیت پخش بکینگ‌ترک و تنظیم تمپو.",
    "features": [
      "بیش از ۱.۵ میلیون آکورد و تبلچر تایید شده",
      "تبلچرهای تعاملی صوتی با کنترل سرعت و سازها",
      "تیونر دقیق و کتابخانه بزرگ پترن‌های ریتم",
      "ترانسپوز فوری آکوردها به گام‌های مختلف"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 43,
    "name": "اشتراک مکالمه زبان با هوش مصنوعی Talkpal AI Premium",
    "nameEn": "Talkpal AI Premium",
    "slug": "talkpal-ai-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "تیوتر خصوصی هوش مصنوعی برای مکالمه صوتی طبیعی، اصلاح گرامر در لحظه و آمادگی آزمون‌های آیلتس و تافل در بیش از ۵۷ زبان.",
    "features": [
      "مکالمه صوتی زنده با هوش مصنوعی درباره هر موضوعی",
      "اصلاح آنی اشتباهات گرامری و ارائه پیشنهادات بهتر",
      "شبیه‌سازی موقعیت‌های واقعی مصاحبه، سفر و کار",
      "حالت‌های نقش‌آفرینی (Roleplay) و مناظره"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 44,
    "name": "اشتراک سولولرن پرمیوم Sololearn PRO Developer",
    "nameEn": "Sololearn PRO",
    "slug": "sololearn-pro",
    "brandLogoPath": asset('/brands/github.svg'),
    "category": "devTools",
    "price": 179000.0,
    "originalPrice": 205000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "یادگیری تعاملی برنامه‌نویسی پایتون، جاوااسکریپت، C++ و وب با کامپایلر آنلاین روی موبایل، تمرینات کدنویسی و اهداف روزانه.",
    "features": [
      "تمرینات کدنویسی نامحدود بدون محدودیت قلب",
      "دسترسی به دوره‌های پیشرفته و کدهای آزمایشی",
      "کامپایلر قدرتمند کد مستقیماً درون گوشی",
      "دریافت مدرک رسمی پایان دوره"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 45,
    "name": "اشتراک آموزش علوم و ریاضی برلیانت Brilliant.org Premium",
    "nameEn": "Brilliant.org Premium",
    "slug": "brilliant-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "یادگیری تعاملی و مفهومی ریاضیات، فیزیک، علوم کامپیوتر، هوش مصنوعی و حل مسئله با متدهای حل چالش بصری جذاب.",
    "features": [
      "دوره‌های مفهومی هوش مصنوعی، الگوریتم و ریاضی",
      "چالش‌های روزانه برای تقویت تفکر تحلیلی",
      "یادگیری بدون فرمول‌های خشک و به صورت شهودی",
      "دسترسی کامل آفلاین روی تبلت و موبایل"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 46,
    "name": "اشتراک آموزش زبان بوسو Busuu Premium Plus",
    "nameEn": "Busuu Premium Plus",
    "slug": "busuu-premium-plus",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 199000.0,
    "originalPrice": 228000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "یادگیری زبان با متد استاندارد اروپایی CEFR، تصحیح تمرین‌ها توسط گویندگان بومی زبان و برنامه‌ریزی مطالعاتی هوشمند.",
    "features": [
      "برنامه یادگیری شخصی‌سازی شده بر اساس هدف شما",
      "تصحیح تمرینات متنی و صوتی توسط افراد بومی",
      "دروس گرامر تخصصی و آزمون‌های سنجش سطح",
      "دانلود دروس برای یادگیری بدون نیاز به اینترنت"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 47,
    "name": "اپل آیدی معتبر و اختصاصی آمریکا Apple ID Verified USA",
    "nameEn": "Apple ID USA Verified",
    "slug": "apple-id-usa",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ساخت کاملاً قانونی و شخصی‌سازی‌شده Apple ID با ریجن معتبر ایالات متحده، بدون قفل، بدون محدودیت و با امنیت ۱۰۰ درصدی.",
    "features": [
      "ریجن معتبر آمریکا برای دسترسی به تمام اپلیکیشن‌ها",
      "تنظیم بر روی ایمیل شخصی شما با سوالات امنیتی اختصاصی",
      "امکان تغییر رمز، اطلاعات و اتصال کارت بانکی بین‌المللی",
      "پشتیبانی دائمی و بدون خطر مسدودی یا قفل"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 48,
    "name": "اشتراک اپل وان Apple One Premier (Music, TV+, Arcade, iCloud)",
    "nameEn": "Apple One Premier",
    "slug": "apple-one-premier",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": 2298000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پکیج جامع سرویس‌های اپل شامل Apple Music، Apple TV+، Apple Arcade و فضای ابری iCloud با قیمت اقتصادی روی اپل آیدی شما.",
    "features": [
      "شامل Apple Music با کیفیت Lossless",
      "شامل Apple TV+ با کیفیت 4K HDR",
      "دسترسی به صدها بازی بدون تبلیغ Apple Arcade",
      "ارتقای ظرفیت ابری iCloud برای بک‌آپ تصاویر"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 49,
    "name": "اکانت گوگل کولب پرو Google Colab Pro Compute Units",
    "nameEn": "Google Colab Pro",
    "slug": "google-colab-pro",
    "brandLogoPath": asset('/brands/github.svg'),
    "category": "devTools",
    "price": 1990000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "محیط محاسباتی ابری پایتون برای پروژه‌های یادگیری عمیق، پردازش تصویر و ترین مدل‌های هوش مصنوعی با کارت‌های گرافیک قدرتمند.",
    "features": [
      "دسترسی به پردازنده‌های گرافیکی قدرتمند A100 و V100",
      "واحدهای محاسباتی پردازش ابری پرسرعت Compute Units",
      "حافظه رم بالا High-Memory Runtime",
      "اجرای طولانی‌تر نوت‌بوک‌ها بدون قطعی ارتباط"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 50,
    "name": "اکانت دستیار نگارش جینجر Ginger Software Premium",
    "nameEn": "Ginger Software Premium",
    "slug": "ginger-software-premium",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 199000.0,
    "originalPrice": 228000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "نرم‌افزار تصحیح گرامر، بازنویسی جملات و مترجم صوتی متن‌های انگلیسی برای مقالات پژوهشی، نامه‌های اداری و مکاتبات بین‌المللی.",
    "features": [
      "اصلاح غلط‌های املایی وابسته به مفهوم جمله",
      "پیشنهاد عبارات جایگزین برای بازنویسی حرفه‌ای",
      "تلفظ صحیح متون انگلیسی با صدای طبیعی",
      "سازگار با نرم‌افزارهای ورد، جیمیل و مرورگرها"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 51,
    "name": "لایسنس مایکروسافت ۳۶۵ Microsoft 365 Personal (Word, Excel, OneDrive)",
    "nameEn": "Microsoft 365 Personal",
    "slug": "microsoft-365",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "لایسنس اورجینال مجموعه اداری آفیس شامل Word, Excel, PowerPoint همراه با ۱ ترابایت فضای ابری وان‌درایو برای ۱ کاربر.",
    "features": [
      "دسترسی به آخرین نسخه Word, Excel, PowerPoint, Outlook",
      "۱ ترابایت فضای ذخیره‌سازی فوق‌العاده امن OneDrive",
      "امکان نصب روی ۵ دستگاه همزمان (ویندوز، مک، موبایل)",
      "آپدیت‌های دائمی و امنیت پیشرفته مایکروسافت"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 52,
    "name": "اشتراک مایکروسافت کوپایلت پرو Microsoft Copilot Pro (Office AI)",
    "nameEn": "Microsoft Copilot Pro",
    "slug": "microsoft-copilot-pro",
    "brandLogoPath": asset('/brands/github.svg'),
    "category": "devTools",
    "price": 2799000.0,
    "originalPrice": 3218000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ادغام هوش مصنوعی GPT-4 Turbo در برنامه‌های Word، PowerPoint و Excel برای نگارش خودکار اسناد، ساخت اسلاید و تحلیل داده‌ها.",
    "features": [
      "دسترسی مستقیم به هوش مصنوعی در Word و PowerPoint",
      "ساخت خودکار ارائه‌ها و اسلایدهای حرفه‌ای با یک پرامپت",
      "فرمول‌نویسی و تحلیل هوشمند جدول‌های Excel",
      "تولید تصویر سریع با موتور DALL-E در هوش مصنوعی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 53,
    "name": "اشتراک ریفیس پرو Reface AI Face Swap Pro",
    "nameEn": "Reface AI Pro",
    "slug": "reface-ai-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ابزار هوش مصنوعی جابجایی فوق‌العاده طبیعی چهره روی ویدیوها، میم‌ها، گیف‌ها و آواتارهای سینمایی با خروجی کیفیت بالا.",
    "features": [
      "جابجایی چهره در ویدیوها و گیف‌ها با یک کلیک",
      "ساخت آواتارهای هوش مصنوعی فوتورئالیستی",
      "حذف کامل تبلیغات و واترمارک ویدیویی",
      "دسترسی نامحدود به آرشیو قالب‌های ترند جهان"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 54,
    "name": "اشتراک بیوتی‌پلاس BeautyPlus Premium Selfie & Retouch",
    "nameEn": "BeautyPlus Premium",
    "slug": "beautyplus-premium",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1599000.0,
    "originalPrice": 1838000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "برنامه محبوب ادیت سلفی و روتوش چهره با بیش از ۵۰ ابزار تصحیح نور، آرایش هوشمند، پاک‌سازی پوست و افکت‌های ویدیویی.",
    "features": [
      "روتوش هوشمند و طبیعی پوست و فرم چهره",
      "ابزارهای پاکسازی بک‌گراند و نورپردازی حرفه‌ای",
      "پک‌های فیلتر و استیکرهای متحرک اختصاصی VIP",
      "خروجی عکس‌ها با حداکثر وضوح ممکن"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 55,
    "name": "دسترسی اختصاصی به مدل‌های باز گوگل Gemma AI Developer",
    "nameEn": "Google Gemma Developer",
    "slug": "google-gemma",
    "brandLogoPath": asset('/brands/google.svg'),
    "category": "ai",
    "price": 1599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "خانواده مدل‌های سبک و قدرتمند متن‌باز گوگل توسعه‌یافته بر پایه فناوری Gemini برای ساخت اپلیکیشن‌ها و فاین‌تیون اختصاصی.",
    "features": [
      "دسترسی به معماری پیشرفته مدل‌های باز گوگل",
      "بهینه‌سازی شده برای اجرای سریع روی سرور و دستگاه",
      "ایده‌آل برای ساخت بات‌ها و سرویس‌های هوشمند سفارشی",
      "پشتیبانی عالی از برنامه‌نویسی پایتون و ابزارهای داده"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 56,
    "name": "اشتراک پایگاه دانش تیمی تترا Tettra Knowledge Management",
    "nameEn": "Tettra Knowledge Base",
    "slug": "tettra-knowledge-base",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 999000.0,
    "originalPrice": 1148000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پلتفرم مدیریت دانش و مستندسازی پروژه‌ها برای تیم‌های توسعه و استارتاپ‌ها با هوش مصنوعی پاسخ‌دهی خودکار به سوالات تیم.",
    "features": [
      "پایگاه داده متمرکز برای داکیومنت‌ها و سوالات متداول",
      "پاسخ‌دهی خودکار ربات هوش مصنوعی به سوالات در اسلک",
      "جلوگیری از پاسخ‌های تکراری و اتلاف وقت اعضای تیم",
      "یکپارچگی کامل با Slack, Google Docs و GitHub"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 57,
    "name": "لایسنس یادداشت‌برداری گودنوتس Goodnotes 6 Pro (iOS/Mac)",
    "nameEn": "Goodnotes 6 Pro",
    "slug": "goodnotes-6-pro",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 99000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "بهترین اپلیکیشن یادداشت‌برداری دیجیتال برای آیپد، مک و آیفون با تشخیص دستخط، حل معادلات ریاضی و همگام‌سازی ابری.",
    "features": [
      "دفترچه‌ها و برگه‌های یادداشت نامحدود بدون محدودیت",
      "هوش مصنوعی اصلاح دستخط و رفع غلط‌های املایی",
      "تشخیص و حل مسائل ریاضی دست‌نویس",
      "تبدیل جزوه‌ها به فلش‌کارت‌های تمرینی هوشمند"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 58,
    "name": "اکانت کرسر پرو Cursor Pro AI Code Editor (Unlimited Claude Sonnet)",
    "nameEn": "Cursor Pro AI IDE",
    "slug": "cursor-pro",
    "brandLogoPath": asset('/brands/cursor.svg'),
    "category": "ai",
    "price": 5999000.0,
    "originalPrice": 6898000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "محیط توسعه مدرن بر پایه VS Code با هوش مصنوعی یکپارچه Claude 3.5 Sonnet، قابلیت Composer برای کدنویسی چندفایلی و چت با کل ریپازیتوری.",
    "features": [
      "استفاده نامحدود از مدل سریع Claude 3.5 Sonnet و GPT-4o",
      "قابلیت جادویی Composer برای ایجاد و ادیت چندین فایل همزمان",
      "شاخص‌گذاری کل کدبیس پروژه (Codebase Indexing)",
      "پیش‌بینی هوشمند حرکات بعدی کدنویس با Copilot++"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": true
  },
  {
    "id": 59,
    "name": "اشتراک دوربین و ادیت B612 VIP Filter & Video",
    "nameEn": "B612 VIP",
    "slug": "b612-vip",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 95000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دوربین سلفی و ویرایشگر ویدیوی همه‌کاره با بیش از ۱۵۰۰ فیلتر چهره، ابزارهای روتوش زنده و جلوه‌های واقعیت افزوده AR.",
    "features": [
      "دسترسی به تمام فیلترها و پریست‌های پولی VIP",
      "تنظیم دقیق رنگ و نور قبل از ثبت عکس و ویدیو",
      "خروجی باکیفیت و حذف واترمارک گوشه تصویر",
      "ابزارهای آرایش طبیعی و بهینه‌سازی چهره"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 60,
    "name": "اکانت فوتور پرو Fotor Pro AI Photo Editor & Design",
    "nameEn": "Fotor Pro AI",
    "slug": "fotor-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1599000.0,
    "originalPrice": 1838000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "ابزار آنلاین طراحی گرافیک و ادیت تصویر با هوش مصنوعی گسترش تصویر، حذف بک‌گراند، ساخت بنر و قالب‌های آماده مارکتینگ.",
    "features": [
      "تولید و گسترش تصاویر با هوش مصنوعی AI Expander",
      "بیش از ۱۰۰ هزار قالب آماده برای تبلیغات و سوشال مدیا",
      "حذف اشیا و واترماک با براش هوشمند پاک‌کننده",
      "فضای ابری اختصاصی و دانلود با فرمت‌های باکیفیت"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 61,
    "name": "اشتراک پریست‌ها و فیلترهای تزا Tezza Vintage Photo & Video",
    "nameEn": "Tezza Vintage Aesthetic",
    "slug": "tezza-aesthetic",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 599000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "اپلیکیشن ادیت عکس و ویدیوی وینتیج و هنری با پریست‌های سینمایی، افکت‌های فیلم‌های آنالوگ، گرد و غبار و فیلترهای ترند بلاگری.",
    "features": [
      "پریست‌های رنگی سینمایی و فیلم‌های آنالوگ ۳۵ میلی‌متری",
      "افکت‌های جذاب گرد و غبار، نشت نور و گرین فیلم",
      "ادیت دسته‌ای ویدیوها با حفظ ثبات رنگی پست‌ها",
      "ابزارهای کنترل دقیق HSL، کنتراست و سایه‌ها"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 62,
    "name": "اشتراک روتوش و ادیت پرتره Persona Beauty Camera VIP",
    "nameEn": "Persona VIP Camera",
    "slug": "persona-vip-camera",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1699000.0,
    "originalPrice": 1953000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "طبیعی‌ترین اپلیکیشن روتوش پرتره و زیبایی با هوش مصنوعی نامرئی برای اصلاح رنگ پوست، درخشش چشم و ثبت ویدیوهای خیره‌کننده.",
    "features": [
      "روتوش کاملاً نامحسوس و طبیعی بدون محو کردن بافت پوست",
      "ماسک‌های زیبایی سه‌بعدی متناسب با فرم صورت",
      "اصلاح نور و تیرگی‌های زیر چشم در لحظه",
      "پشتیبانی از ادیت پرتره‌های ویدیویی 4K"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 63,
    "name": "لایسنس دائمی طراحی دیجیتال پروکریت Procreate iPad / Mac",
    "nameEn": "Procreate iPad Original",
    "slug": "procreate-digital-art",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 2999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "استاندارد بی‌رقیب نقاشی دیجیتال، طراحی کاراکتر و تصویرسازی روی آیپد با صدها قلم‌مو (Brush)، سیستم لایه‌ها و پویانمایی تعاملی.",
    "features": [
      "موتور قلم‌موی فوق‌سریع و پاسخگو به فشار Apple Pencil",
      "صدها براش پیش‌فرض با قابلیت ایمپورت براش‌های فتوشاپ",
      "پشتیبانی از بوم‌های با رزولوشن فوق‌العاده بالا و لایه‌های زیاد",
      "ثبت تایم‌لپس خودکار از تمامی مراحل خلق اثر"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 64,
    "name": "اشتراک تولید تصویر و آواتار DaVinci AI Generator Pro",
    "nameEn": "DaVinci AI Art Pro",
    "slug": "davinci-ai-art",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 1699000.0,
    "originalPrice": 1953000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "هوش مصنوعی خلق تصاویر هنری، آواتارهای شخصی، کاراکترهای فانتزی و والپیپرهای باکیفیت از طریق دستورات متنی ساده.",
    "features": [
      "تولید نامحدود آثار هنری با سبک‌های متنوع کلاسیک و مدرن",
      "تبدیل عکس شخصی به آواتارهای حماسی و سینمایی",
      "افزایش رزولوشن و جزئیات تصاویر به کیفیت 4K",
      "سرعت رندر بالا و بدون معطلی در صف پردازش"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 65,
    "name": "اشتراک افزایش کیفیت عکس و ویدیو رمینی Remini Pro AI Enhancer",
    "nameEn": "Remini Pro AI Enhancer",
    "slug": "remini-pro-ai",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 940000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "معجزه هوش مصنوعی در بازیابی عکس‌های تار، قدیمی و بی‌کیفیت؛ تبدیل پرتره‌های مات به تصاویر فوق‌العاده شارپ و باکیفیت آتلیه‌ای.",
    "features": [
      "بازسازی و شارپ کردن تصاویر تار و چهره‌های محو",
      "افزایش رزولوشن و تعداد پیکسل‌های عکس‌های قدیمی",
      "رنگ‌آمیزی هوشمند تصاویر سیاه و سفید",
      "بهبود کیفیت و جزئیات ویدیوهای تار موبایلی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 66,
    "name": "اشتراک ساخت تمپلیت ویدیویی InMelo Pro Music Video Maker",
    "nameEn": "InMelo Music Video Pro",
    "slug": "inmelo-video-maker",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 5999000.0,
    "originalPrice": 6898000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "نرم‌افزار هوشمند ساخت کلیپ‌های کوتاه و ریلزهای جذاب اینستاگرام و تیک‌تاک با صدها ترنزیشن انیمیشنی هماهنگ با موسیقی.",
    "features": [
      "هزاران افکت و جلوه ویژه برای ساخت کلیپ‌های وایرال",
      "بدون تبلیغات و خروجی با حداکثر بیت‌ریت ممکن",
      "کتابخانه غنی از آهنگ‌های ترند شبکه‌های اجتماعی",
      "کاربری بسیار سریع و بدون نیاز به مهارت تدوینگری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 67,
    "name": "اشتراک دانلود نامحدود وکتور وکتزی Vecteezy Pro Subscription",
    "nameEn": "Vecteezy Pro Subscription",
    "slug": "vecteezy-pro",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 1980000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "اشتراک نامحدود دانلود فایل‌های وکتور، طرح‌های گرافیکی لایه‌باز، آیکون‌ها، تصاویر استوک و ویدیوهای فوتیج بدون محدودیت لایسنس.",
    "features": [
      "دانلود نامحدود فایل‌های وکتور، EPS و SVG لایه‌باز",
      "لایسنس تجاری معتبر (Pro License) برای چاپ و وب",
      "دسترسی به ویدیوهای استوک 4K و تصاویر اختصاصی",
      "بدون نیاز به ذکر نام منبع در پروژه‌های تجاری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 68,
    "name": "اشتراک تولید و تدوین ویدیوی هوش مصنوعی ران‌وی Runway Gen-2 / Gen-3 Alpha",
    "nameEn": "Runway ML Gen-3 Pro",
    "slug": "runway-gen3-pro",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 4999000.0,
    "originalPrice": 5748000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پیشرفته‌ترین پلتفرم هوش مصنوعی سینمایی دنیا؛ ساخت ویدیوهای واقع‌گرایانه با حرکت دوربین سفارشی، Motion Brush و رندر Gen-3 Alpha.",
    "features": [
      "دسترسی مستقیم به قوی‌ترین مدل ویدیوسازی Runway Gen-3 Alpha",
      "کنترل دقیق جهت حرکت اجزا با ابزار Motion Brush",
      "تبدیل متن و تصویر به صحنه‌های سینمایی ۴K",
      "حذف اشیا و تغییر استایل ویدیوها با هوش مصنوعی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 69,
    "name": "اکانت پریمیوم فری‌پیک Freepik Premium Unlimited Download",
    "nameEn": "Freepik Premium Unlimited",
    "slug": "freepik-premium",
    "brandLogoPath": asset('/brands/canva.svg'),
    "category": "design",
    "price": 3999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "محبوب‌ترین بانک گرافیکی دنیا با دسترسی نامحدود به میلیون‌ها فایل PSD لایه‌باز، وکتورهای حرفه‌ای، موکاپ‌های باکیفیت و عکس‌های استوک.",
    "features": [
      "دانلود ۱۰۰ فایل روزانه از بخش Premium فری‌پیک",
      "دسترسی به فایل‌های PSD موکاپ‌های فوق‌العاده باکیفیت",
      "لایسنس تجاری کامل برای استفاده در سفارشات مشتریان",
      "دسترسی به ابزارهای هوش مصنوعی تولید تصویر Flikon"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 70,
    "name": "اشتراک کست‌باکس پرمیوم Castbox Podcast Ad-Free VIP",
    "nameEn": "Castbox Podcast VIP",
    "slug": "castbox-podcast-vip",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 599000.0,
    "originalPrice": 688000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "محبوب‌ترین اپلیکیشن پادکست در میان فارسی‌زبانان؛ عضویت VIP برای حذف تبلیغات بنری، عضویت نامحدود در کانال‌ها و همگام‌سازی ابری.",
    "features": [
      "حذف کامل ۱۰۰٪ تبلیغات آزاردهنده در محیط برنامه",
      "عضویت و سابسکرایب نامحدود در تمام پادکست‌های جهان",
      "شخصی‌سازی تب اصلی و اولویت در دانلود اپیزودها",
      "حالت ذخیره انرژی و همگام‌سازی بین دستگاه‌ها"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 71,
    "name": "اشتراک ساخت موزیک هوش مصنوعی سوندفول Soundful AI Creator",
    "nameEn": "Soundful AI Music Creator",
    "slug": "soundful-ai-music",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 799000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "تولید قطعات موزیک و لوپ‌های الکترونیک، هیپ‌هاپ، امبینت و پاپ با هوش مصنوعی و دانلود فایل‌های لاین به لاین MIDI و STEM.",
    "features": [
      "تولید نامحدود ترک‌های موسیقی منحصر‌به‌فرد با AI",
      "دانلود فایل‌های صوتی با فرمت Lossless WAV و فشرده MP3",
      "دانلود فایل‌های نت‌نویسی MIDI و لاین‌های مجزا (Stems)",
      "حق کپی‌رایت آزاد برای استفاده در پروژه‌های ویدیویی و بازی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 72,
    "name": "اشتراک استریم موزیک باکیفیت نپستر Napster HiFi Premium",
    "nameEn": "Napster HiFi Premium",
    "slug": "napster-hifi-premium",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 399000.0,
    "originalPrice": 458000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "سرویس استریم موسیقی با سابقه با بیش از ۱۱۰ میلیون قطعه موزیک، کیفیت صدای بدون افت Hi-Res و پلی‌لیست‌های تخصصی سبک‌های مختلف.",
    "features": [
      "استریم موزیک با کیفیت صدای کریستالی Lossless FLAC",
      "بدون وقفه و بدون حتی یک ثانیه تبلیغات صوتی",
      "دانلود و ذخیره‌سازی آفلاین آهنگ‌ها با بالاترین کیفیت",
      "سازگار با تمامی سیستم‌های صوتی خانگی و اتومبیل"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 73,
    "name": "اشتراک کورسرا پلاس Coursera Plus با دسترسی نامحدود به دوره‌ها و مدارک",
    "nameEn": "Coursera Plus Official",
    "slug": "coursera-plus",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 2999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "دسترسی نامحدود به بیش از ۷۰۰۰ دوره تخصصی و گواهینامه‌های رسمی از معتبرترین دانشگاه‌ها و شرکت‌های دنیا (Google, IBM, Yale, Stanford).",
    "features": [
      "دسترسی آزاد به ۷۰۰۰+ دوره، تخصص و پروژه هدایت‌شده",
      "دریافت مدارک معتبر بین‌المللی با نام شما برای لینکدین",
      "آموزش‌های تخصصی هوش مصنوعی، برنامه‌نویسی و مدیریت",
      "انجام پروژه‌های عملی در بستر ابری Coursera Labs"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 74,
    "name": "اشتراک تولید ویدیو سینمایی هوش مصنوعی هیگزفیلد Higgsfield AI Cinema",
    "nameEn": "Higgsfield AI Cinema",
    "slug": "higgsfield-ai-cinema",
    "brandLogoPath": asset('/brands/openai.svg'),
    "category": "ai",
    "price": 4399000.0,
    "originalPrice": 5058000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "پلتفرم خلاقانه هوش مصنوعی متمرکز بر تولید ویدیوهای کاراکترمور و حرکات نمایشی سینمایی برای کارگردانان و طراحان تبلیغات.",
    "features": [
      "تولید حرکات واقع‌گرایانه انسانی و اکشن با هوش مصنوعی",
      "کنترل کامل ژست‌ها، دوربین و جریان ویدیویی",
      "کیفیت تصویر سینمایی با نورپردازی فوق‌العاده",
      "ابزارهای اختصاصی ساخت کاراکترهای باثبات"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 75,
    "name": "اشتراک آموزش گیتار و پیانو یوزیشن Yousician Premium Plus",
    "nameEn": "Yousician Premium Plus",
    "slug": "yousician-premium-plus",
    "brandLogoPath": asset('/brands/spotify.svg'),
    "category": "music",
    "price": 399000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "معلم خصوصی موسیقی با گوش دادن زنده به صدای ساز واقعی شما (گیتار، پیانو، یوکللی، باس، آواز) و ارائه فیدبک اصلاحی فوری.",
    "features": [
      "دسترسی نامحدود به آموزش ۵ ساز (گیتار، پیانو، باس، یوکللی، خوانندگی)",
      "تشخیص زنده نت‌های نواخته‌شده با میکروفون گوشی",
      "هزاران آهنگ معروف دسته‌بندی‌شده از سطح صفر تا پیشرفته",
      "تمرینات ریتم‌خوانی و تقویت تکنیک انگشت‌گذاری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 76,
    "name": "اشتراک آموزش هوشمند زبان لرنا Learna AI Language Tutor",
    "nameEn": "Learna AI Language Tutor",
    "slug": "learna-ai-tutor",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 799000.0,
    "originalPrice": 918000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "اپلیکیشن نسل جدید یادگیری زبان مبتنی بر سناریوهای صوتی تعاملی با هوش مصنوعی، تقویت دایره لغات و تمرین مصاحبه‌های بین‌المللی.",
    "features": [
      "جلسات مکالمه صوتی بی‌نهایت با سناریوهای کاری و روزمره",
      "ارزیابی و نمره‌دهی فوری به تلفظ و گرامر جملات شما",
      "برنامه یادگیری تطبیقی بر اساس نقاط ضعف شخصی",
      "یادگیری اصطلاحات کاربردی در موقعیت‌های شبیه‌سازی‌شده"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 77,
    "name": "اکانت دانشجویی و حل تمرین چگ Chegg Study Pack Premium",
    "nameEn": "Chegg Study Pack",
    "slug": "chegg-study-pack",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "مرجع پاسخ‌های تشریحی گام‌به‌گام به میلیون‌ها مسئله کتاب‌های درسی دانشگاهی در رشته‌های مهندسی، ریاضی، فیزیک، اقتصاد و برنامه‌نویسی.",
    "features": [
      "پاسخ تشریحی گام به گام به تمرینات هزاران کتاب دانشگاهی",
      "امکان طرح سوال جدید و دریافت پاسخ از اساتید چگ",
      "ابزارهای محاسباتی پیشرفته و حل معادلات ریاضی",
      "چک مقالات و اصلاح استنادات علمی و گرامری"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 78,
    "name": "اشتراک یادگیری سریع واژگان دراپز Drops Visual Language Premium",
    "nameEn": "Drops Visual Language",
    "slug": "drops-language-learning",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 67000.0,
    "originalPrice": 77000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "یادگیری تصویری و بازی‌محور لغات در بیش از ۴۵ زبان؛ ۵ دقیقه در روز برای ماندگاری دائمی کلمات در حافظه بلندمدت با گرافیک مینیمال.",
    "features": [
      "یادگیری بدون متن خسته‌کننده با ارتباط مستقیم تصویر و کلمه",
      "بدون محدودیت زمانی روزانه و تمرین نامحدود لغات",
      "تلفظ باکیفیت ضبط‌شده توسط گویندگان حرفه‌ای بومی",
      "دسترسی کامل آفلاین به تمام زبان‌های دنیا"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 79,
    "name": "اکانت تخصصی و رفرنس پزشکی آپتودیت UpToDate Clinical Decision",
    "nameEn": "UpToDate Clinical Decision",
    "slug": "uptodate-clinical-reference",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 1999000.0,
    "originalPrice": null,
    "hasDiscount": false,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "استاندارد طلایی رفرنس‌های بالینی پزشکان و داروسازان جهان؛ دسترسی به جدیدترین گایدلاین‌های درمانی، دوز داروها و تصمیم‌گیری‌های پزشکی.",
    "features": [
      "بیش از ۱۲ هزار مبحث بالینی معتبر و آپدیت‌شده توسط اساتید برتر",
      "دیتابیس جامع تداخلات دارویی Lexicomp و دوزهای دقیق",
      "گرافیک‌ها، ویدیوهای پروسیجر و الگوریتم‌های درمانی",
      "دسترسی فوری بدون نیاز به فیلترشکن از وب و اپلیکیشن"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
      }
    ],
    "popular": false
  },
  {
    "id": 80,
    "name": "ارتقا فضای ذخیره‌سازی ابری آیکلود پلاس Apple iCloud+ 50GB/200GB/2TB",
    "nameEn": "Apple iCloud+ Storage Upgrade",
    "slug": "apple-icloud-plus",
    "brandLogoPath": asset('/brands/notion.svg'),
    "category": "productivity",
    "price": 899000.0,
    "originalPrice": 1033000.0,
    "hasDiscount": true,
    "duration": "۱ ماه (قابل تمدید)",
    "description": "افزایش رسمی و قانونی ظرفیت ابری اکانت اپل برای پشتیبان‌گیری کامل از گالری، اسناد، نوت‌ها و واتس‌اپ همراه با امکانات امنیتی iCloud+.",
    "features": [
      "افزایش ظرفیت ابری اپل آیدی بدون پاک شدن هیچ فایلی",
      "پشتیبان‌گیری خودکار از عکس‌ها، فیلم‌ها و بک‌آپ کامل آیفون",
      "سرویس امنیتی iCloud Private Relay برای وب‌گردی ناشناس",
      "قابلیت ساخت ایمیل‌های موقت Hide My Email و دامنه اختصاصی"
    ],
    "specifications": [
      {
        "label": "نوع اشتراک",
        "value": "اکانت قانونی و اختصاصی / روی ایمیل شما"
      },
      {
        "label": "مدت اعتبار",
        "value": "۳۰ روزه (امکان تمدید دوره‌ای)"
      },
      {
        "label": "پشتیبانی",
        "value": "۲۴ ساعته توسط کارشناسان سابیکس"
      },
      {
        "label": "گارانتی",
        "value": "تضمین ۱۰۰٪ اصالت و بازگشت وجه در صورت قطعی"
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
