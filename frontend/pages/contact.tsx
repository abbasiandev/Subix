import Head from 'next/head';
import Link from 'next/link';
import { NavigationBar, Footer } from '@/components/Layout';
import { SUPPORT_URL } from '@/lib/constants';
import { TelegramIcon } from '@/components/Icons';

export default function ContactPage() {
  return (
    <div className="rive-page" dir="rtl">
      <Head>
         <title>پشتیبانی تلگرام | فلوکسو</title>
         <meta name="description" content="برای پرسش درباره انتخاب اکانت‌های هوش مصنوعی، در تلگرام با پشتیبانی فلوکسو گفت‌وگو کنید." />
      </Head>
      <NavigationBar />
      <main id="main-content" tabIndex={-1} className="support-page site-container">
        <section className="support-hero" aria-labelledby="support-title">
           <span className="eyebrow">پشتیبانی فلوکسو</span>
          <h1 id="support-title">انتخاب سخت نیست؛<br /><span className="accent-text">سؤال درست را بپرسید.</span></h1>
          <p>اگر بین چند اکانت هوش مصنوعی مردد هستید یا درباره جزئیات یک محصول سؤال دارید، در تلگرام با ما در تماس باشید.</p>
        </section>
        <section className="support-card" aria-labelledby="support-card-title">
          <div className="support-card-icon"><TelegramIcon color="currentColor" size={34} /></div>
          <div>
            <span className="eyebrow">کانال ارتباطی رسمی</span>
            <h2 id="support-card-title">گفت‌وگو در تلگرام</h2>
            <p>نام ابزار، کاربردتان و گزینه‌هایی که بررسی کرده‌اید را بفرستید تا مسیر انتخاب کوتاه‌تر شود.</p>
          </div>
          <a className="site-button" href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">باز کردن تلگرام <span aria-hidden="true">↗</span></a>
        </section>
        <section className="support-notes" aria-label="راهنمای دریافت پاسخ">
          <article><span>۰۱</span><h2>کاربردتان را بگویید</h2><p>متن، تصویر، ویدیو، صدا یا کدنویسی؛ کاربرد اصلی به انتخاب دقیق‌تر کمک می‌کند.</p></article>
          <article><span>۰۲</span><h2>جزئیات را بررسی کنید</h2><p>صفحه محصول، قابلیت‌ها، مدت و قیمت را قبل از تصمیم نهایی کنار هم ببینید.</p></article>
          <article><span>۰۳</span><h2>سؤال بپرسید</h2><p>برای پرسش‌های تکمیلی یا راهنمایی بین چند گزینه، مستقیماً در تلگرام پیام دهید.</p></article>
        </section>
        <Link className="text-link support-back-link" href="/products">بازگشت به کاتالوگ اکانت‌ها <span aria-hidden="true">←</span></Link>
      </main>
      <Footer />
    </div>
  );
}
