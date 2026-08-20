import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutProvider } from "@/context/LayoutContext";
import AppLayout from "@/components/layouts/AppLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        <title>سابیکس - خرید اشتراک‌های هوش مصنوعی</title>
        <meta name="description" content="خرید اشتراک ChatGPT، Gemini، Cursor، Claude و سایر ابزارهای هوش مصنوعی با فعال‌سازی سریع و پشتیبانی 24/7" />
        <meta name="keywords" content="خرید اشتراک ChatGPT, خرید اشتراک Claude, خرید اشتراک Gemini, خرید اشتراک Cursor, خرید اشتراک Spotify, هوش مصنوعی, AI subscription" />
        <meta name="author" content="سابیکس" />
        <link rel="canonical" href="https://abbasiandev.github.io/Subix/" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="سابیکس - خرید اشتراک‌های هوش مصنوعی" />
        <meta property="og:description" content="خرید اشتراک ChatGPT، Gemini، Cursor، Claude و سایر ابزارهای هوش مصنوعی با فعال‌سازی سریع و پشتیبانی 24/7" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abbasiandev.github.io/Subix/" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="سابیکس" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سابیکس - خرید اشتراک‌های هوش مصنوعی" />
        <meta name="twitter:description" content="خرید اشتراک ChatGPT، Gemini، Cursor و سایر ابزارهای هوش مصنوعی" />
        
        {/* Theme Color for mobile browsers */}
        <meta name="theme-color" content="#14b8a6" />
        
        {/* Favicon - using existing logo */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      {/* Telegram WebApp SDK - only load in Telegram context */}
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
        id="telegram-sdk"
      />

      <AuthProvider>
        <LayoutProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </LayoutProvider>
      </AuthProvider>
    </>
  );
}
