import Head from 'next/head';
import { useEffect, useState } from 'react';
import { NavigationBar, Footer } from '@/components/Layout';
import WebGLHero from '@/components/WebGLHero';
import Catalog from '@/components/Products/Catalog';
import { ArticleGrid } from '@/components/Articles/ArticleGrid';
import { products } from '@/data/products';
import ScrollStory from '@/components/ScrollStory';
import { loadLiveCatalog } from '@/lib/live-prices';

export default function HomePage() {
  const [liveProducts, setLiveProducts] = useState(products);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    // Only opt in to hidden/reveal states after JavaScript is ready.
    document.querySelectorAll('.story-reveal').forEach((element) => { element.classList.add('reveal-pending'); observer.observe(element); });
    return () => { observer.disconnect(); document.querySelectorAll('.reveal-pending').forEach((element) => element.classList.remove('reveal-pending')); };
  }, []);

  useEffect(() => {
    loadLiveCatalog(products).then(setLiveProducts).catch(() => undefined);
  }, []);

  return <div className="rive-home">
       <Head><title>فلوکسو — جریان روشن انتخاب اکانت هوش مصنوعی</title><meta name="description" content="فلوکسو مسیر انتخاب اکانت هوش مصنوعی را از شناخت نیاز تا مقایسه قابلیت‌ها، مدت و قیمت روشن و روان می‌کند." /></Head>
    <NavigationBar />
    <main id="main-content" tabIndex={-1}>
      <WebGLHero />
       <section className="editorial-intro site-container story-reveal" aria-labelledby="intro-title">
         <span className="eyebrow">چرا <span dir="ltr">Fluxo</span>؟</span>
         <h2 id="intro-title">انتخاب،<br/><span className="accent-text">روان‌تر می‌شود.</span></h2>
         <p><span dir="ltr">Fluxo</span> یعنی جریان؛ جریانی که شما را از یک نیاز واقعی به یک انتخاب روشن می‌رساند.<br/>هر بخش از فلوکسو برای کوتاه‌تر شدن همین مسیر ساخته شده است.</p>
         <div className="intro-categories"><span>۰۱ نیازتان را مشخص کنید</span><span>۰۲ گزینه‌ها را مقایسه کنید</span><span>۰۳ انتخاب کنید</span></div>
       </section>
       <ScrollStory />
        <section id="products" className="catalog-section" aria-labelledby="catalog-title"><div className="site-container"><h2 id="catalog-title" className="sr-only">اکانت‌های هوش مصنوعی و سایر سرویس‌های دیجیتال</h2><Catalog products={liveProducts}/></div></section>
        <section id="articles" className="guides-section site-container" aria-labelledby="guides-title"><div className="editorial-heading story-reveal"><span className="eyebrow">۰۳ · راهنمای انتخاب</span><h2 id="guides-title">کمتر جست‌وجو کنید.<br/><span className="accent-text">بهتر انتخاب کنید.</span></h2><p>راهنماها و مقایسه‌هایی برای فهمیدن تفاوت ابزارها قبل از خرید.</p></div><ArticleGrid showFilters /></section>
        <section className="closing-section site-container story-reveal" aria-labelledby="closing-title"><span className="eyebrow">فلوکسو، مسیر کوتاه‌تر انتخاب</span><h2 id="closing-title">اکانت مناسب را<br/><span className="accent-text">پیدا کنید.</span></h2><p>مسیرتان را از ابزارها و راهنماها شروع کنید؛ برای پرسش‌های بیشتر، پشتیبانی تلگرام کنار شماست.</p><a className="site-button" href="/products">ادامه مسیر انتخاب <span aria-hidden="true">←</span></a></section>
    </main>
     <Footer />
   </div>;
}
