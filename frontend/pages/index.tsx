import Head from 'next/head';
import { useEffect } from 'react';
import { NavigationBar, Footer } from '@/components/Layout';
import WebGLHero from '@/components/WebGLHero';
import Catalog from '@/components/Products/Catalog';
import { ArticleGrid } from '@/components/Articles/ArticleGrid';
import { products } from '@/data/products';
import ScrollStory from '@/components/ScrollStory';

export default function HomePage() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    // Only opt in to hidden/reveal states after JavaScript is ready.
    document.querySelectorAll('.story-reveal').forEach((element) => { element.classList.add('reveal-pending'); observer.observe(element); });
    return () => { observer.disconnect(); document.querySelectorAll('.reveal-pending').forEach((element) => element.classList.remove('reveal-pending')); };
  }, []);

  return <div className="rive-home">
     <Head><title>سابیکس — انتخاب سریع‌تر اکانت هوش مصنوعی</title><meta name="description" content="سابیکس به شما کمک می‌کند اکانت هوش مصنوعی مناسب کار، خلق تصویر، ویدیو، صدا و توسعه را سریع‌تر مقایسه و انتخاب کنید." /></Head>
    <NavigationBar />
    <main id="main-content" tabIndex={-1}>
      <WebGLHero />
      <section className="editorial-intro site-container story-reveal" aria-labelledby="intro-title">
        <span className="eyebrow">برای کار. برای خلق. برای زندگی.</span>
        <h2 id="intro-title">برای ایده‌های شما.<br/><span className="accent-text">بدون محدودیت.</span></h2>
         <p>از دستیارهای متنی تا تصویر، ویدیو، صدا و توسعه.<br/>ابزار مناسب را با تصمیمی روشن‌تر پیدا کنید.</p>
         <div className="intro-categories"><span>مقایسه قابلیت‌ها</span><span>بررسی مدت و قیمت</span><span>انتخاب اکانت مناسب</span></div>
      </section>
      <ScrollStory />
       <section id="products" className="catalog-section" aria-labelledby="catalog-title"><div className="site-container"><div className="editorial-heading story-reveal"><span className="eyebrow">۰۳ · کاتالوگ اکانت‌ها</span><h2 id="catalog-title">انتخابی برای<br/><span className="accent-text">هر مسیر هوش مصنوعی.</span></h2><p>قابلیت‌ها، مدت و قیمت را کنار هم ببینید و بعد وارد صفحه جزئیات شوید.</p></div><Catalog products={products}/></div></section>
       <section id="articles" className="guides-section site-container" aria-labelledby="guides-title"><div className="editorial-heading story-reveal"><span className="eyebrow">۰۴ · راهنمای انتخاب</span><h2 id="guides-title">کمتر جست‌وجو کنید.<br/><span className="accent-text">بهتر انتخاب کنید.</span></h2><p>راهنماها و مقایسه‌هایی برای فهمیدن تفاوت ابزارها قبل از خرید.</p></div><ArticleGrid showFilters /></section>
       <section className="closing-section site-container story-reveal" aria-labelledby="closing-title"><span className="eyebrow">سابیکس، مسیر کوتاه‌تر انتخاب</span><h2 id="closing-title">اکانت مناسب را<br/><span className="accent-text">پیدا کنید.</span></h2><p>از کاتالوگ شروع کنید یا برای راهنمایی در تلگرام با ما در تماس باشید.</p><a className="site-button" href="/products">مشاهده کاتالوگ اکانت‌ها <span aria-hidden="true">←</span></a></section>
    </main>
    <Footer />
  </div>;
}
