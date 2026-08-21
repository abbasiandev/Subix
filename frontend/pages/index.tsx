import React from 'react';
import Head from 'next/head';
import { NavigationBar, Footer } from '@/components/Layout';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { ArticleGrid } from '@/components/Articles/ArticleGrid';
import { ScrollReveal, Counter } from '@/components/Animations/ScrollReveal';
import { designSystem } from '@/styles/apple-design-system';
import { products } from '@/data/products';

/**
 * Homepage - Premium Apple-Inspired Single-Page Design
 * All products and articles visible on one page with WebGL effects
 */
const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>سابیکس - فروشگاه تخصصی اشتراک‌های دیجیتال و ابزارهای هوش مصنوعی</title>
        <meta
          name="description"
          content="خرید امن اشتراک ChatGPT، Spotify، Netflix، GitHub Copilot و ابزارهای هوش مصنوعی با بهترین قیمت"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="سابیکس - فروشگاه اشتراک‌های دیجیتال" />
        <meta
          property="og:description"
          content="خرید امن اشتراک‌های پریمیوم با پشتیبانی ۲۴ ساعته"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="hero-section">
          {/* Hero Content */}
          <div className="hero-content">
            <ScrollReveal direction="up">
              <h1 className="hero-title">
                دسترسی آسان به
                <span className="hero-title-gradient"> ابزارهای هوش مصنوعی</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <p className="hero-description">
                خرید امن اشتراک ChatGPT، Claude، Spotify، Netflix و بیش از ۵۰ سرویس دیگر
                <br />
                با پشتیبانی ۲۴ ساعته و بهترین قیمت بازار
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="hero-stats">
                <div className="stat-item">
                  <Counter end={15000} suffix="+" className="stat-number" />
                  <span className="stat-label">کاربر فعال</span>
                </div>
                <div className="stat-item">
                  <Counter end={50} suffix="+" className="stat-number" />
                  <span className="stat-label">محصول</span>
                </div>
                <div className="stat-item">
                  <Counter end={99} suffix="%" className="stat-number" />
                  <span className="stat-label">رضایت مشتری</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="hero-cta">
                <a href="#products" className="cta-button primary">
                  <span>مشاهده محصولات</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4L10 16M10 16L6 12M10 16L14 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a href="#articles" className="cta-button secondary">
                  <span>مقالات آموزشی</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </div>
        </section>

        {/* Products Section - ALL Products Visible */}
        <section id="products" className="products-section">
          <div className="section-container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <h2 className="section-title">محصولات پرطرفدار</h2>
                <p className="section-description">
                  تمامی اشتراک‌های دیجیتال و ابزارهای هوش مصنوعی در یک مکان
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <ProductGrid products={products} />
            </ScrollReveal>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-container">
            <ScrollReveal direction="up">
              <h2 className="section-title">چرا سابیکس؟</h2>
            </ScrollReveal>

            <div className="features-grid">
              <ScrollReveal direction="up" delay={0}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M16 4L20 12L28 16L20 20L16 28L12 20L4 16L12 12L16 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="feature-title">تحویل فوری</h3>
                  <p className="feature-description">
                    دریافت اشتراک بلافاصله پس از پرداخت
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M6 12H26" stroke="currentColor" strokeWidth="2" />
                      <circle cx="16" cy="18" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="feature-title">پرداخت امن</h3>
                  <p className="feature-description">
                    درگاه‌های معتبر با نماد اعتماد الکترونیکی
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 8V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="feature-title">پشتیبانی ۲۴/۷</h3>
                  <p className="feature-description">
                    پاسخگویی سریع در تمام ساعات شبانه‌روز
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M16 4V8M16 24V28M28 16H24M8 16H4M24.485 24.485L21.657 21.657M24.485 7.515L21.657 10.343M7.515 24.485L10.343 21.657M7.515 7.515L10.343 10.343"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="feature-title">قیمت مناسب</h3>
                  <p className="feature-description">
                    بهترین قیمت با تخفیف‌های ویژه
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Articles Section - ALL Articles Visible */}
        <section id="articles" className="articles-section">
          <div className="section-container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <h2 className="section-title">مقالات و راهنماها</h2>
                <p className="section-description">
                  آموزش‌ها و نکات کاربردی برای استفاده بهینه از محصولات
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <ArticleGrid showFilters={true} />
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <Footer />

      <style jsx>{`
        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }

        .webgl-hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .parallax-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
          text-align: center;
        }

        .hero-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: ${designSystem.typography.fontWeight.heavy};
          color: ${designSystem.colors.text.primary};
          line-height: ${designSystem.typography.lineHeight.tight};
          margin: 0 0 ${designSystem.spacing.scale['6']};
        }

        .hero-title-gradient {
          background: linear-gradient(
            135deg,
            ${designSystem.colors.primary.DEFAULT},
            ${designSystem.colors.primary.active}
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0 0 ${designSystem.spacing.scale['10']};
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: ${designSystem.spacing.scale['12']};
          margin-bottom: ${designSystem.spacing.scale['10']};
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${designSystem.spacing.scale['2']};
        }

        .stat-number {
          font-family: ${designSystem.typography.fontFamily.text};
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .stat-label {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .hero-cta {
          display: flex;
          gap: ${designSystem.spacing.scale['4']};
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['2']};
          padding: 16px 32px;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border-radius: ${designSystem.borderRadius.full};
          text-decoration: none;
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
          box-shadow: ${designSystem.shadows.md};
          min-height: ${designSystem.accessibility.touchTarget.mobile};
        }

        .cta-button.primary {
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
        }

        .cta-button.primary:hover {
          background: ${designSystem.colors.primary.active};
          transform: translateY(-4px);
          box-shadow: ${designSystem.shadows.xl};
        }

        .cta-button.secondary {
          background: ${designSystem.colors.surface.light};
          color: ${designSystem.colors.text.primary};
          border: 2px solid ${designSystem.colors.neutral[300]};
        }

        .cta-button.secondary:hover {
          background: white;
          border-color: ${designSystem.colors.primary.DEFAULT};
          transform: translateY(-4px);
          box-shadow: ${designSystem.shadows.xl};
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid ${designSystem.colors.text.tertiary};
          border-radius: 12px;
          position: relative;
          animation: float 2s ease-in-out infinite;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: ${designSystem.colors.text.tertiary};
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 1.5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(12px);
          }
        }

        /* Section Styles */
        .products-section,
        .articles-section,
        .features-section {
          padding: ${designSystem.spacing.scale['20']} 0;
          position: relative;
        }

        .products-section {
          background: linear-gradient(
            180deg,
            transparent 0%,
            ${designSystem.colors.neutral[50]} 50%,
            transparent 100%
          );
        }

        .features-section {
          background: linear-gradient(
            135deg,
            ${designSystem.colors.neutral[50]},
            ${designSystem.colors.primary.DEFAULT}10
          );
        }

        .section-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
        }

        .section-header {
          text-align: center;
          margin-bottom: ${designSystem.spacing.scale['12']};
        }

        .section-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing.scale['4']};
        }

        .section-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          color: ${designSystem.colors.text.secondary};
          margin: 0;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: ${designSystem.spacing.scale['8']};
        }

        .feature-card {
          background: white;
          padding: ${designSystem.spacing.scale['8']};
          border-radius: ${designSystem.borderRadius['2xl']};
          text-align: center;
          box-shadow: ${designSystem.shadows.md};
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: ${designSystem.shadows.xl};
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto ${designSystem.spacing.scale['4']};
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${designSystem.colors.primary.DEFAULT}15;
          border-radius: ${designSystem.borderRadius.full};
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .feature-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.xl};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing.scale['3']};
        }

        .feature-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 90vh;
            padding-top: 100px;
          }

          .hero-content {
            padding: 0 ${designSystem.spacing.scale['4']};
          }

          .hero-stats {
            gap: ${designSystem.spacing.scale['6']};
          }

          .products-section,
          .articles-section,
          .features-section {
            padding: ${designSystem.spacing.scale['12']} 0;
          }

          .section-container {
            padding: 0 ${designSystem.spacing.scale['4']};
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .scroll-indicator {
            bottom: 20px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .scroll-mouse,
          .scroll-wheel {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
