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
      <section id="products" className="market-section"><div className="section-container"><div className="section-header"><span className="section-index">01 / STORE</span><h2>فروشگاه انواع اکانت و لایسنس‌های اورجینال</h2><p>از لایسنس نرم‌افزارهای تخصصی و ادیتورها تا اکانت‌های پریمیوم هوش مصنوعی و استریم؛ با تضمین اصالت و تحویل آنی.</p></div><ProductGrid products={products} /></div></section>
      <section id="how-it-works" className="process-section"><div className="section-container"><div className="section-header"><span className="section-index">02 / HOW IT WORKS</span><h2>سه گام ساده تا دریافت اکانت و لایسنس</h2></div><div className="process-grid"><article><span>۰۱</span><h3>انتخاب محصول</h3><p>اکانت اشتراکی، لایسنس اختصاصی یا پلن مورد نظر خود را انتخاب کنید.</p></article><article><span>۰۲</span><h3>پرداخت امن</h3><p>پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب در درگاه امن بانکی.</p></article><article><span>۰۳</span><h3>دریافت آنی</h3><p>کد لایسنس یا اطلاعات اکانت بلافاصله در پنل کاربری شما صادر می‌شود.</p></article></div></div></section>
       <section id="articles" className="articles-section" aria-labelledby="guides-title"><div className="section-container"><div className="section-header"><span className="section-index">۰۴ / راهنمای انتخاب</span><h2 id="guides-title">از نیازت شروع کن،<br />به ابزار مناسب برس.</h2><p>راهنماهای سابیکس برای تصمیم‌های واقعی: چه چیزی را امتحان کنید، کدام محدودیت را بررسی کنید و چه زمانی سراغ اشتراک بروید.</p></div><ArticleGrid showFilters /></div></section>
    </main><Footer />
  </>;
}
