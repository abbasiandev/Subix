import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { asset } from "@/lib/assets";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "@/styles/rive-redesign.css";

const WebGLRouteStage = dynamic(() => import("@/components/WebGLRouteStage"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
         <title>فلوکسو - انتخاب اکانت هوش مصنوعی</title>
         <meta name="description" content="مقایسه و انتخاب اکانت‌های هوش مصنوعی برای متن، تصویر، ویدیو، صدا و توسعه در فلوکسو." />
         <meta name="keywords" content="خرید اکانت هوش مصنوعی, مقایسه اکانت AI, ChatGPT, Claude, Gemini, Cursor, Leonardo AI" />
         <meta name="author" content="فلوکسو" />
         <link rel="canonical" href="https://fluxo.ir/" />
        
        {/* Open Graph tags */}
           <meta property="og:title" content="فلوکسو - انتخاب اکانت هوش مصنوعی" />
         <meta property="og:description" content="ابزارهای هوش مصنوعی را بر اساس کاربرد، قابلیت، مدت و قیمت مقایسه کنید." />
        <meta property="og:type" content="website" />
         <meta property="og:url" content="https://fluxo.ir/" />
        <meta property="og:locale" content="fa_IR" />
          <meta property="og:site_name" content="فلوکسو" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
           <meta name="twitter:title" content="فلوکسو - انتخاب اکانت هوش مصنوعی" />
         <meta name="twitter:description" content="راهنمای مقایسه و انتخاب اکانت‌های هوش مصنوعی" />
        
        {/* Theme Color for mobile browsers */}
        <meta name="theme-color" content="#070a0d" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#070a0d" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#070a0d" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
      </Head>

       <a className="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
       {!isHome && <WebGLRouteStage />}
       <AuthProvider>
         <div className="route-content-layer">
           <Component {...pageProps} />
         </div>
       </AuthProvider>
    </>
  );
}
