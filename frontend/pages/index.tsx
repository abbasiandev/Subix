import Head from 'next/head';
import { NavigationBar, Footer } from '@/components/Layout';
import WebGLHero from '@/components/WebGLHero';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { ArticleGrid } from '@/components/Articles/ArticleGrid';
import { products } from '@/data/products';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <Head><title>سابیکس — خرید انواع اکانت و لایسنس اورجینال</title><meta name="description" content="مرجع خرید قانونی انواع اکانت و لایسنس اختصاصی هوش مصنوعی، برنامه‌نویسی، طراحی و سرگرمی با تحویل آنی" /></Head>
    <NavigationBar />
      <main id="main-content">
      <WebGLHero />
      <section id="products" className="market-section reveal"><div className="section-container"><div className="section-header"><span className="section-index">01 / STORE</span><h2>دسترسی فوری به ابزارهای موردنیاز شما</h2></div><ProductGrid products={products} /></div></section>
      <section id="articles" className="articles-section reveal"><div className="section-container"><div className="section-header"><span className="section-index">02 / GUIDES</span><h2>راهنماها و آموزش‌های تخصصی خرید و فعال‌سازی</h2></div><ArticleGrid showFilters /></div></section>
    </main><Footer />
  </>;
}
