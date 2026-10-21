import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavigationBar, Footer } from '@/components/Layout';

export default function RouteRedirect({ to, title }: { to: string; title: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <div className="rive-page" dir="rtl">
       <Head><title>{title} | فلوکسو</title></Head>
      <NavigationBar />
      <main id="main-content" tabIndex={-1} className="route-redirect site-container">
         <span className="eyebrow">مسیر فلوکسو تغییر کرده است</span>
        <h1>در حال انتقال به<br /><span className="accent-text">صفحه اصلی این بخش.</span></h1>
        <p>اگر انتقال خودکار انجام نشد، از لینک زیر ادامه دهید.</p>
        <Link className="site-button" href={to}>ادامه به صفحه مقصد <span aria-hidden="true">←</span></Link>
      </main>
      <Footer />
    </div>
  );
}
