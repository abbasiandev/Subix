// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>سابیکس</title>
      </Head>

      {/* Telegram WebApp SDK */}
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
