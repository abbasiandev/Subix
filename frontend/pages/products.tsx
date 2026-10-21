import Head from 'next/head';
import { NavigationBar, Footer } from '@/components/Layout';
import Catalog from '@/components/Products/Catalog';
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <div className="rive-page" dir="rtl">
      <Head>
         <title>کاتالوگ اکانت‌های هوش مصنوعی | فلوکسو</title>
         <meta name="description" content="اکانت‌های هوش مصنوعی فلوکسو را بر اساس کاربرد، قابلیت، مدت و قیمت جست‌وجو و مقایسه کنید." />
      </Head>
      <NavigationBar />
      <main id="main-content" tabIndex={-1} className="catalog-page">
        <section className="catalog-page-hero site-container" aria-labelledby="catalog-page-title">
           <span className="eyebrow">۰۱ · کاتالوگ فلوکسو</span>
          <h1 id="catalog-page-title">اکانت مناسب برای<br /><span className="accent-text">مسیر شما.</span></h1>
          <p>از دستیارهای متنی تا تصویر، ویدیو، صدا و توسعه؛ قابلیت‌ها و جزئیات هر اکانت را قبل از انتخاب کنار هم ببینید.</p>
        </section>
        <section className="catalog-section site-container" aria-label="فهرست اکانت‌ها">
          <Catalog products={products} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
