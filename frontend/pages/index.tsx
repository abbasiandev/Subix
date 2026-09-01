import Head from 'next/head';
import { NavigationBar, Footer } from '@/components/Layout';
import WebGLHero from '@/components/WebGLHero';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { ArticleGrid } from '@/components/Articles/ArticleGrid';
import { products } from '@/data/products';

export default function HomePage() {
  return <>
    <Head><title>سابیکس — خرید انواع اکانت و لایسنس اورجینال</title><meta name="description" content="مرجع خرید قانونی انواع اکانت و لایسنس اختصاصی هوش مصنوعی، برنامه‌نویسی، طراحی و سرگرمی با تحویل آنی" /></Head>
    <NavigationBar />
    <main>
      <WebGLHero />
      <section id="products" className="market-section"><div className="section-container"><div className="section-header"><span className="section-index">01 / STORE</span><h2>فروشگاه انواع اکانت و لایسنس‌های اورجینال</h2><p>از لایسنس نرم‌افزارهای تخصصی و ادیتورها تا اکانت‌های پریمیوم هوش مصنوعی و استریم؛ با تحویل آنی.</p></div><ProductGrid products={products} /></div></section>
      <section id="articles" className="articles-section"><div className="section-container"><div className="section-header"><span className="section-index">02 / GUIDES</span><h2>راهنماها و آموزش‌های تخصصی خرید و فعال‌سازی</h2></div><ArticleGrid showFilters /></div></section>
    </main><Footer />
  </>;
}
