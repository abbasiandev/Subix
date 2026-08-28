import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { asset } from "@/lib/assets";
import "@/styles/globals.css";

const WebGLRouteStage = dynamic(() => import("@/components/WebGLRouteStage"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        <title>سابیکس - خرید انواع اکانت و لایسنس اورجینال</title>
        <meta name="description" content="خرید قانونی انواع اکانت و لایسنس اورجینال هوش مصنوعی، برنامه‌نویسی، طراحی و سرگرمی با تحویل آنی و پشتیبانی ۲۴ ساعته" />
        <meta name="keywords" content="خرید اکانت هوش مصنوعی, خرید لایسنس, خرید اشتراک ChatGPT, خرید لایسنس Cursor, خرید اکانت Claude, خرید اکانت Spotify, خرید اکانت یوتیوب" />
        <meta name="author" content="سابیکس" />
        <link rel="canonical" href="https://abbasiandev.github.io/Subix/" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="سابیکس - خرید انواع اکانت و لایسنس اورجینال" />
        <meta property="og:description" content="مرجع خرید قانونی انواع اکانت و لایسنس هوش مصنوعی، نرم‌افزار، توسعه و سرگرمی با تحویل آنی و ضمانت اصالت" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abbasiandev.github.io/Subix/" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="سابیکس" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سابیکس - خرید انواع اکانت و لایسنس اورجینال" />
        <meta name="twitter:description" content="خرید قانونی انواع اکانت و لایسنس اورجینال با فعال‌سازی آنی" />
        
        {/* Theme Color for mobile browsers */}
        <meta name="theme-color" content="#070a0d" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#070a0d" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#070a0d" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
      </Head>

      {!isHome && <WebGLRouteStage />}
      <div className="route-content-layer">
        <Component {...pageProps} />
      </div>
    </>
  );
}
