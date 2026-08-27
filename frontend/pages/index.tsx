import Head from 'next/head';
import { NavigationBar, Footer } from '@/components/Layout';
import WebGLHero from '@/components/WebGLHero';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { ArticleGrid } from '@/components/Articles/ArticleGrid';
import { products } from '@/data/products';

export default function HomePage() {
  return <>
    <Head><title>سابیکس — AI ACCESS SYSTEM</title><meta name="description" content="خرید آنی اکانت‌های پریمیوم هوش مصنوعی" /></Head>
    <NavigationBar />
    <main>
      <WebGLHero />
      <section id="products" className="market-section"><div className="section-container"><div className="section-header"><span className="section-index">01 / MARKET</span><h2>ابزار بعدی تو، همین‌جاست.</h2><p>از مدل‌های مولد تا ابزارهای خلاقیت؛ دسترسی پریمیوم را با فعال‌سازی آنی دریافت کن.</p></div><ProductGrid products={products} /></div></section>
      <section id="how-it-works" className="process-section"><div className="section-container"><div className="section-header"><span className="section-index">02 / PROTOCOL</span><h2>سه حرکت تا دسترسی.</h2></div><div className="process-grid"><article><span>۰۱</span><h3>انتخاب کن</h3><p>سرویس و پلن مناسب کارت را پیدا کن.</p></article><article><span>۰۲</span><h3>پرداخت کن</h3><p>پرداخت امن در محیطی سریع و شفاف.</p></article><article><span>۰۳</span><h3>فعال شو</h3><p>اطلاعات اکانت بلافاصله در پنل تو قرار می‌گیرد.</p></article></div></div></section>
      <section id="articles" className="articles-section"><div className="section-container"><div className="section-header"><span className="section-index">03 / SIGNALS</span><h2>راهنماهای سیگنال.</h2></div><ArticleGrid showFilters /></div></section>
    </main><Footer />
  </>;
}
