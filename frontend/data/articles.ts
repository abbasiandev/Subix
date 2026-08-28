import { asset } from '@/lib/assets';

/**
 * Article Data - Blog posts and guides for digital accounts and services
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

export const articles: Article[] = [
  {
    id: 1,
    slug: 'chatgpt-guide',
    title: 'راهنمای کامل خرید و استفاده از ChatGPT Plus: همه چیز درباره اشتراک پرطرفدار هوش مصنوعی',
    excerpt: 'آموزش جامع استفاده از ChatGPT Plus، تفاوت‌های نسخه رایگان با نسخه پلاس، دسترسی به مدل‌های پیشرفته GPT-4o و قابلیت‌های صوتی و تصویری.',
    category: 'guide',
    imagePath: asset('/articles/chatgpt-guide.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AOTJgv/x4v/48f/v2ADfuGT/4rb/37H/2KYBS0JD/8Wn/8Ol/8CiBdMzLQqvDusAAAAASUVORK5CYII=',
    readTime: 8,
    publishDate: '2024-01-15',
    author: 'تیم سابیکس',
    content: `سرویس ChatGPT Plus نسخه ارتقایافته و حرفه‌ای چت‌بات شرکت OpenAI است که امکانات متعددی را در اختیار کاربران حرفه‌ای، برنامه‌نویسان، نویسندگان و پژوهشگران قرار می‌دهد.

### مزایای کلیدی اشتراک ChatGPT Plus:
۱. دسترسی بدون محدودیت به پیشرفته‌ترین مدل‌ها از جمله GPT-4o و تحلیل عمیق دیتا.
۲. سرعت پاسخ‌دهی چندین برابر نسبت به نسخه رایگان حتی در ساعات اوج مصرف جهانی.
۳. امکان آپلود فایل‌های حجیم، اسناد PDF، تصاویر و تجزیه و تحلیل داده‌ها با Python داخلی.
۴. امکان ایجاد و استفاده از Custom GPTها برای کاربردهای تخصصی کسب‌وکار یا پژوهش.
۵. قابلیت‌های پیشرفته صوتی (Voice Mode) برای مکالمه طبیعی.

### نحوه خرید و فعال‌سازی در سابیکس:
با توجه به محدودیت‌های پرداخت بین‌المللی، سابیکس اشتراک قانونی ChatGPT Plus را با تحویل فوری، پشتیبانی ۲۴ ساعته و بدون نیاز به کارت‌های اعتباری خارجی در اختیار شما قرار می‌دهد. پس از ثبت سفارش، اطلاعات ورود به صورت آنی برای شما ارسال می‌شود.`,
    tags: ['هوش مصنوعی', 'ChatGPT', 'راهنمای خرید', 'OpenAI'],
  },
  {
    id: 2,
    slug: 'claude-features',
    title: 'معرفی و خرید اشتراک Claude Pro: رقیب قدرتمند هوش مصنوعی برای برنامه‌نویسی و تحلیل متن',
    excerpt: 'بررسی ویژگی‌های منحصر به فرد Claude 3.5 Sonnet، پنجره متنی ۲۰۰ هزار توکنی، قابلیت ساخت آرتیفکت و برتری در کدنویسی نسبت به رقبا.',
    category: 'tutorial',
    imagePath: asset('/articles/claude-features.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWP4/5+h8f9/hvr//xnK/v9nSPz/n8H7/3+Gzf//M5T+/8+Q+P8/AwBwzh8lMKLGwAAAAABJRU5ErkJggg==',
    readTime: 7,
    publishDate: '2024-01-12',
    author: 'تیم سابیکس',
    content: `هوش مصنوعی Claude محصول شرکت Anthropic، یکی از قدرتمندترین و دقیق‌ترین مدل‌های زبانی جهان است که در حوزه‌های کدنویسی، استدلال منطقی و نگارش متون تخصصی جایگاه ویژه‌ای یافته است.

### چرا Claude Pro انتخاب اول برنامه‌نویسان است؟
۱. عملکرد فوق‌العاده مدل Claude 3.5 Sonnet در بنچمارک‌های برنامه‌نویسی و تولید نرم‌افزار.
۲. قابلیت بی نظیر Artifacts برای پیش‌نمایش زنده کدهای React، وب و نمودارها به صورت Real-time.
۳. پنجره متنی غول‌پیکر ۲۰۰ هزار توکنی برای پردازش و خلاصه سازی کامل کتاب‌ها و سورس‌کدهای بزرگ.
۴. لحن نگارش بسیار طبیعی، دقیق و به دور از الگوهای ماشینی تکراری.

### خرید اکانت قانونی Claude Pro:
سابیکس اکانت Claude Pro را با فعال‌سازی آنی و تضمین کیفیت تا آخرین روز اشتراک ارائه می‌دهد تا بدون نگرانی از تحریم‌ها به به‌روزترین ابزار تولید محتوا و برنامه‌نویسی دسترسی داشته باشید.`,
    tags: ['هوش مصنوعی', 'Claude', 'Anthropic', 'برنامه‌نویسی'],
  },
  {
    id: 3,
    slug: 'gemini-vs-gpt',
    title: 'مقایسه جامع Gemini Advanced و ChatGPT Plus: کدام اشتراک ارزش خرید بیشتری دارد؟',
    excerpt: 'بررسی دقیق تفاوت‌های دو غول هوش مصنوعی دنیا؛ قیمت، سرعت پردازش، یکپارچگی با سرویس‌های گوگل، حافظه ابری و عملکرد مالتی‌مدیا.',
    category: 'comparison',
    imagePath: asset('/articles/gemini-vs-gpt.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AElaqv/y//+8//+Fxv9BPKb/z//+r//+YI3/QDSV/9j//7f//2iF/4Q1NwprDX0AAAAASUVORK5CYII=',
    readTime: 10,
    publishDate: '2024-01-10',
    author: 'تیم سابیکس',
    content: `انتخاب بین خرید اشتراک Gemini Advanced شرکت گوگل و ChatGPT Plus شرکت OpenAI یکی از پرتکرارترین سوالات کاربران حرفه‌ای هوش مصنوعی است.

### مقایسه مشخصات و ویژگی‌ها:
- **یکپارچگی با ابزارها**: Gemini با جیمیل، گوگل داکس و درایو همگام است و ۲ ترابایت فضای ابری ارائه می‌دهد. ChatGPT با اکوسیستم وسیع پلاگین‌ها و GPTهای سفارشی یکپارچه است.
- **پردازش چندوجهی (Multimodal)**: Gemini در درک همزمان ویدئو و تصویر توانمند است؛ ChatGPT در مکالمه صوتی طبیعی و تولید تصویر با DALL-E پیشتاز است.
- **کدنویسی**: مدل‌های OpenAI و Anthropic معمولاً در تولید کدهای پیچیده دقت بالاتری دارند، اما Gemini در تحلیل داده‌های حجیم با کانتکست ۱ میلیون توکنی بی‌رقیب است.

### جمع‌بندی:
اگر به فضای ابری گوگل و پردازش کتاب‌ها و اسناد بزرگ نیاز دارید، Gemini Advanced انتخابی عالی است. اگر ابزاری جامع برای کارهای روزمره، کدنویسی و تولید تصویر می‌خواهید، ChatGPT Plus برنده میدان است. هر دو اشتراک در سابیکس با بهترین قیمت در دسترس هستند.`,
    tags: ['هوش مصنوعی', 'Gemini', 'ChatGPT', 'مقایسه اشتراک'],
  },
  {
    id: 4,
    slug: 'ai-tools-2024',
    title: 'راهنمای جامع بهترین ابزارهای هوش مصنوعی و اشتراک‌های دیجیتال کاربردی',
    excerpt: 'معرفی کاربردی‌ترین اشتراک‌های هوش مصنوعی و دیجیتال برای افزایش ۵ برابری سرعت و کیفیت کارها در طراحی، توسعه، ترجمه و مدیریت کارها.',
    category: 'guide',
    imagePath: asset('/articles/ai-tools-2024.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AHQ8zv/R//+k//981f9sMsL/0//+m//+ct3/YS63/9L//5f//3DZ/607MgrCIyUAAAAASUVORK5CYII=',
    readTime: 12,
    publishDate: '2024-01-08',
    author: 'تیم سابیکس',
    content: `در دنیای مدرن امروز، استفاده از ابزارهای هوش مصنوعی دیگر یک گزینه نیست بلکه یک ضرورت برای افزایش بهره‌وری و کاهش ساعت کاری است.

### دسته‌بندی برترین اشتراک‌های کاربردی:
۱. **کدنویسی و توسعه نرم‌افزار**: Cursor Pro و GitHub Copilot با پیشنهاد هوشمند خطوط کد، دیباگ سریع و قابلیت چت مستقیم با سورس‌کد.
۲. **طراحی و تولید تصویر**: Midjourney و Canva Pro برای خلق تصاویر باکیفیت و طراحی سریع پست‌ها، بنرها و لوگوها.
۳. **تولید محتوا و دستیار نگارش**: ChatGPT Plus، Claude Pro و Grammarly Premium برای ویرایش حرفه‌ای مقالات، ایمیل‌ها و ترجمه دقیق.
۴. **مدیریت کارها و بهره‌وری**: Notion Plus برای ساخت پایگاه داده، داکیومنت‌ها و مدیریت پروژه‌های تیمی.

تمام این اشتراک‌ها در فروشگاه سابیکس با فعال‌سازی آنی و تضمین قانونی ارائه می‌شوند.`,
    tags: ['هوش مصنوعی', 'بهره‌وری', 'خرید اکانت', 'راهنما'],
  },
  {
    id: 5,
    slug: 'spotify-premium',
    title: 'راهنمای خرید اکانت Spotify Premium: لذت شنیدن موسیقی بدون تبلیغات و با بالاترین کیفیت',
    excerpt: 'بررسی امکانات اکانت پریمیوم اسپاتیفای، دانلود آفلاین، کیفیت صوتی ۳۲۰ کیلوبیت بر ثانیه، تفاوت نسخه‌های فمیلی و فردی و روش فعال‌سازی قانونی.',
    category: 'guide',
    imagePath: asset('/articles/spotify-premium.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgYGhv//Gf7/Z2BgYAAAoykMCiXNNFAAAAAASUVORK5CYII=',
    readTime: 6,
    publishDate: '2024-01-05',
    author: 'تیم سابیکس',
    content: `اسپاتیفای بزرگترین پلتفرم استریم موسیقی و پادکست در جهان است، اما نسخه رایگان آن با تبلیغات مکرر، محدودیت در رد کردن آهنگ‌ها و کیفیت پایین صدا همراه است.

### مزایای اکانت اسپاتیفای پریمیوم:
- حذف دائمی تمام تبلیغات صوتی و بنری آزاردهنده.
- امکان اسکیپ (رد کردن) نامحدود آهنگ‌ها در تمام پلی‌لیست‌ها.
- بالاترین کیفیت پخش ممکن (Very High Quality - 320 kbps).
- دانلود مستقیم موزیک‌ها و پادکست‌ها برای گوش دادن در حالت آفلاین بدون نیاز به اینترنت.
- قابلیت گوش دادن گروهی همزمان با دوستان (Group Session).

### فعال‌سازی روی اکانت شخصی شما:
در سابیکس، پرمیوم‌سازی روی ایمیل و اکانت شخصی شما بدون از دست رفتن پلی‌لیست‌ها انجام می‌شود.`,
    tags: ['موسیقی', 'Spotify', 'اسپاتیفای', 'خرید اکانت'],
  },
  {
    id: 6,
    slug: 'youtube-premium',
    title: 'خرید یوتیوب پرمیوم (YouTube Premium): حذف تبلیغات، پخش در پس‌زمینه و دسترسی به YouTube Music',
    excerpt: 'چرا یوتیوب پرمیوم پرطرفدارترین اشتراک ویدیویی است؟ تماشای بدون تبلیغ ویدیوها، دانلود آفلاین با کیفیت 4K و دسترسی رایگان به سرویس استریم موسیقی.',
    category: 'tutorial',
    imagePath: asset('/articles/youtube-premium.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWP4////g////wf//z/4//8BAv7//z9A0P///8H///8f/P//AAEAAHpZHwm7Bi0AAAAASUVORK5CYII=',
    readTime: 5,
    publishDate: '2024-01-03',
    author: 'تیم سابیکس',
    content: `یوتیوب دانشگاهی بی‌پایان از آموزش، سرگرمی و اخبار است؛ اما تبلیغات طولانی و غیرقابل رد شدن می‌توانند تجربه کاربر را به کلی خراب کنند.

### امکانات ویژه اشتراک YouTube Premium:
۱. **حذف ۱۰۰٪ تبلیغات**: تماشای پیوسته و روان ویدیوها در موبایل، تبلت، کامپیوتر و تلویزیون‌های هوشمند.
۲. **پخش در پس‌زمینه (Background Play)**: امکان گوش دادن به ویدیوها هنگام قفل بودن صفحه گوشی یا هنگام کار با سایر برنامه‌ها.
۳. **دانلود ویدیوها**: ذخیره‌سازی محتوا درون برنامه یوتیوب برای تماشای آفلاین در مسافرت یا مکان‌های بدون اینترنت.
۴. **دسترسی کامل به YouTube Music Premium**: یک سرویس استریم موسیقی کامل مشابه اسپاتیفای به ارزش ماهانه ۱۰ دلار که به صورت رایگان روی اشتراک پرمیوم قرار دارد.

سابیکس اشتراک یوتیوب پرمیوم را به صورت کاملاً قانونی روی ایمیل شخصی شما فعال می‌کند.`,
    tags: ['ویدئو', 'YouTube', 'یوتیوب پرمیوم', 'استریم'],
  },
  {
    id: 7,
    slug: 'netflix-plans',
    title: 'راهنمای خرید اکانت Netflix: تماشای نامحدود فیلم و سریال با کیفیت 4K HDR',
    excerpt: 'بررسی پلن‌های مختلف نتفلیکس، نحوه فعال‌سازی روی انواع تلویزیون و موبایل، بدون قطعی و با پشتیبانی کامل در تمام مدت اشتراک.',
    category: 'comparison',
    imagePath: asset('/articles/netflix-plans.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgaG//8Z/v9nYGBgAAChoQwKv2r8NQAAAABJRU5ErkJggg==',
    readTime: 7,
    publishDate: '2024-01-01',
    author: 'تیم سابیکس',
    content: `نتفلیکس با هزاران فیلم، سریال، مستند و انیمه اختصاصی، محبوب‌ترین پلتفرم تماشای فیلم و سریال در سراسر جهان است.

### ویژگی‌های اشتراک Netflix Premium در سابیکس:
- بالاترین کیفیت تصویر Ultra HD 4K با پشتیبانی از استانداردهای تصویری HDR و Dolby Vision.
- صدای فراگیر و باکیفیت فضایی (Spatial Audio / Dolby Atmos).
- قابلیت تماشا و نصب روی تلویزیون‌های هوشمند، لپ‌تاپ، کنسول‌های بازی و گوشی‌های همراه.
- دسترسی نامحدود به آرشیو کامل بین‌المللی بدون سانسور و با زیرنویس‌های فارسی و انگلیسی.
- اکانت‌های قانونی، اختصاصی و با پشتیبانی مداوم تا انتهای دوره.`,
    tags: ['فیلم و سریال', 'Netflix', 'نتفلیکس', 'اشتراک قانونی'],
  },
  {
    id: 8,
    slug: 'github-copilot',
    title: 'راهنمای خرید و فعال‌سازی GitHub Copilot: هوش مصنوعی دستیار برنامه‌نویسان',
    excerpt: 'افزایش سرعت توسعه نرم‌افزار با GitHub Copilot؛ پشتیبانی از پایتون، جاوااسکریپت، تایپ‌اسکریپت و یکپارچگی سریع با VS Code و JetBrains.',
    category: 'tutorial',
    imagePath: asset('/articles/github-copilot.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgaG//8Z/v9nYGBgAAChoQwKv2r8NQAAAABJRU5ErkJggg==',
    readTime: 9,
    publishDate: '2023-12-28',
    author: 'تیم سابیکس',
    content: `گیت‌هاب کوپایلت اولین و محبوب‌ترین دستیار کدنویسی مبتنی بر هوش مصنوعی است که توسط GitHub و OpenAI توسعه داده شده است.

### چرا هر برنامه‌نویسی به GitHub Copilot نیاز دارد؟
۱. **تکمیل خودکار کد**: بر اساس کامنت‌ها و کدهای قبلی شما، خطوط و توابع کامل را در کسری از ثانیه پیشنهاد می‌دهد.
۲. **کاهش خطاهای سینتکسی و تکراری**: کدهای روتین و تست‌ها را بدون نیاز به تایپ دستی می‌نویسد.
۳. **پشتیبانی از تمامی زبان‌های برنامه‌نویسی**: Python، TypeScript، JavaScript، Go، C++، PHP، Rust و غیره.
۴. **دستیار متنی Copilot Chat**: قابلیت پرسیدن سوال درباره باگ‌ها، داکیومنت‌نویسی و بازنویسی کدها مستقیماً درون ادیتور.

اشتراک‌های GitHub Copilot در سابیکس با فعال‌سازی قانونی و تضمین عدم مسدودی ارائه می‌شوند.`,
    tags: ['برنامه‌نویسی', 'GitHub Copilot', 'توسعه نرم‌افزار', 'AI'],
  },
  {
    id: 9,
    slug: 'cursor-review',
    title: 'بررسی جامع و خرید اکانت Cursor Pro: مدرن‌ترین IDE مبتنی بر هوش مصنوعی در جهان',
    excerpt: 'بررسی قابلیت‌های تحول‌آفرین Cursor، ویرایشگر بر پایه VS Code با هوش مصنوعی GPT-4 و Claude 3.5 Sonnet، قابلیت Composer و بازنویسی چندفایلی.',
    category: 'tutorial',
    imagePath: asset('/articles/cursor-review.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVQImWNgYPj/n+H/fwYGhv//Gf7/Z2Bg+P+f4f9/BgaG//8Z/v9nYGBgAAChoQwKv2r8NQAAAABJRU5ErkJggg==',
    readTime: 8,
    publishDate: '2023-12-25',
    author: 'تیم سابیکس',
    content: `ادیتور Cursor جهشی بزرگ در تجربه برنامه‌نویسی مدرن است. این نرم‌افزار که بر پایه هسته VS Code طراحی شده، هوش مصنوعی را به بطن ادیتور متصل کرده است.

### قابلیت‌های منحصربه‌فرد Cursor Pro:
- **Composer**: امکان نوشتن، ویرایش و ساخت همزمان چندین فایل در پروژه با یک پرامپت متنی.
- **Chat با پایگاه کد (Codebase Indexing)**: کرسر تمام پروژه شما را مطالعه کرده و پاسخ‌هایی دقیق بر اساس معماری پروژه شما می‌دهد.
- **پیش‌بینی و تکمیل چندخطی (Copilot++)**: حدس زدن ویرایش بعدی شما حتی قبل از حرکت دادن نشانگر ماوس.
- **انتخاب مدل هوش مصنوعی دلخواه**: سوییچ آسان بین Claude 3.5 Sonnet، GPT-4o و مدل‌های پیشرفته دیگر.

اکانت‌های Cursor Pro را می‌توانید از سابیکس با بهترین قیمت و تحویل فوری تهیه کنید.`,
    tags: ['Cursor', 'برنامه‌نویسی', 'IDE', 'هوش مصنوعی'],
  },
  {
    id: 10,
    slug: 'canva-pro',
    title: 'راهنمای خرید اشتراک Canva Pro: جعبه ابزار طراحی گرافیک، هوش مصنوعی و شبکه‌های اجتماعی',
    excerpt: 'دسترسی به بیش از ۱۰۰ میلیون قالب، المان، فونت اختصاصی، حذف پس‌زمینه عکس و ویدیو با یک کلیک و قابلیت‌های هوش مصنوعی Magic Studio.',
    category: 'guide',
    imagePath: asset('/articles/canva-pro.svg'),
    imageBlurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVQImQEnANj/AHQ8zv/R//+k//981f9sMsL/0//+m//+ct3/YS63/9L//5f//3DZ/607MgrCIyUAAAAASUVORK5CYII=',
    readTime: 6,
    publishDate: '2023-12-22',
    author: 'تیم سابیکس',
    content: `کنوا پرو ابزاری است که به هر فردی بدون نیاز به دانش فتوشاپ اجازه می‌دهد بنرهای تبلیغاتی، پست‌ها و استوری‌های اینستاگرام، ارائه‌های دانشگاهی و ویدیوهای حرفه‌ای خلق کند.

### امکانات نسخه Canva Pro:
۱. **حذف پس‌زمینه (Background Remover)**: حذف پس‌زمینه تصاویر و حتی ویدیوها با یک کلیک و با بالاترین دقت.
۲. **بیش از ۱۰۰ میلیون المان پریمیوم**: دسترسی رایگان و بدون واترمارک به عکس‌های استوک باکیفیت، گرافیک‌ها، ویدیوها و آهنگ‌ها.
۳. **کیت برند (Brand Kit)**: ذخیره رنگ‌های برند، لوگوها و فونت‌های فارسی اختصاصی برای یکپارچه‌سازی محتوا.
۴. **تغییر اندازه جادویی (Magic Switch)**: تغییر ابعاد طرح از پست به استوری یا بنر سایت در یک ثانیه.
۵. **ابزارهای هوش مصنوعی Magic Studio**: تولید و ویرایش هوشمند تصاویر و متون با AI.

اشتراک‌های Canva Pro در سابیکس با فعال‌سازی قانونی روی ایمیل شما در دسترس است.`,
    tags: ['طراحی گرافیک', 'Canva Pro', 'اینستاگرام', 'خرید اشتراک'],
  },
];

export const getArticlesByCategory = (category: Article['category']): Article[] => {
  return articles.filter(a => a.category === category);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(a => a.slug === slug);
};

export const getRecentArticles = (count: number = 6): Article[] => {
  return articles
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery) ||
      a.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const categoryLabels: Record<Article['category'], string> = {
  guide: 'راهنما',
  tutorial: 'آموزش',
  news: 'اخبار',
  comparison: 'مقایسه',
};

export default articles;
