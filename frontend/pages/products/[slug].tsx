import React, { useState } from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NavigationBar, Footer } from '@/components/Layout';
import { PurchaseModal } from '@/components/Purchase/PurchaseModal';
import { ScrollReveal } from '@/components/Animations/ScrollReveal';
import { products, Product, getProductBySlug } from '@/data/products';
import { designSystem } from '@/styles/apple-design-system';

interface ProductDetailPageProps {
  product: Product;
}

/**
 * Product Detail Page
 * Shows full product information and purchase options
 */
const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  if (router.isFallback) {
    return <div>در حال بارگذاری...</div>;
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Head>
        <title>{product.name} - سابیکس</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - سابیکس`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.brandLogoPath} />
      </Head>

      <NavigationBar />

      <main className="product-detail-page">
        {/* Hero Section */}
        <section className="product-hero">
          <div className="hero-container">
            <div className="hero-content">
              {/* Back Button */}
              <ScrollReveal direction="left">
                <button
                  onClick={() => router.push('/#products')}
                  className="back-button"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M12 4L6 10L12 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  بازگشت به محصولات
                </button>
              </ScrollReveal>

              <div className="hero-grid">
                {/* Product Image */}
                <ScrollReveal direction="right">
                  <div className="product-image-container">
                    <div className="product-icon-large">
                      <Image
                        src={product.brandLogoPath}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="brand-icon"
                      />
                    </div>
                    {product.hasDiscount && (
                      <div className="discount-badge-large">
                        <span>{discountPercentage}%</span>
                        <span>تخفیف</span>
                      </div>
                    )}
                  </div>
                </ScrollReveal>

                {/* Product Info */}
                <ScrollReveal direction="left">
                  <div className="product-info">
                    <div className="category-badge">{getCategoryLabel(product.category)}</div>
                    
                    <h1 className="product-title">{product.name}</h1>
                    
                    <p className="product-description">{product.description}</p>

                    {/* Pricing */}
                    <div className="pricing-section">
                      {product.hasDiscount && product.originalPrice && (
                        <span className="original-price">
                          {product.originalPrice.toLocaleString('fa-IR')} تومان
                        </span>
                      )}
                      <div className="current-price">
                        <span className="price-amount">
                          {product.price.toLocaleString('fa-IR')}
                        </span>
                        <span className="price-currency">تومان</span>
                        <span className="price-period">/ {product.duration}</span>
                      </div>
                    </div>

                    {/* Purchase Button */}
                    <button
                      onClick={() => setIsPurchaseModalOpen(true)}
                      className="purchase-button"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      خرید و دریافت فوری
                    </button>

                    {/* Trust Indicators */}
                    <div className="trust-indicators">
                      <div className="trust-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 2L13 8L19 9L14.5 13.5L15.5 19L10 16L4.5 19L5.5 13.5L1 9L7 8L10 2Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>تحویل فوری</span>
                      </div>
                      <div className="trust-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 2C6 2 3 5 3 9C3 14 10 18 10 18C10 18 17 14 17 9C17 5 14 2 10 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <circle cx="10" cy="9" r="2" fill="currentColor" />
                        </svg>
                        <span>پرداخت امن</span>
                      </div>
                      <div className="trust-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>گارانتی بازگشت وجه</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="product-features">
          <div className="features-container">
            <ScrollReveal direction="up">
              <h2 className="features-title">ویژگی‌های اشتراک</h2>
            </ScrollReveal>

            <div className="features-grid">
              {product.features.map((feature, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 50}>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="feature-text">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="how-container">
            <ScrollReveal direction="up">
              <h2 className="how-title">نحوه خرید و دریافت</h2>
            </ScrollReveal>

            <div className="steps-grid">
              <ScrollReveal direction="up" delay={0}>
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3 className="step-title">انتخاب محصول</h3>
                  <p className="step-description">
                    محصول مورد نظر خود را انتخاب کنید
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3 className="step-title">ورود شماره موبایل</h3>
                  <p className="step-description">
                    با شماره موبایل خود وارد شوید
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3 className="step-title">پرداخت امن</h3>
                  <p className="step-description">
                    از طریق درگاه امن پرداخت کنید
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="step-card">
                  <div className="step-number">4</div>
                  <h3 className="step-title">دریافت فوری</h3>
                  <p className="step-description">
                    اشتراک را بلافاصله دریافت کنید
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Purchase Modal */}
      {isPurchaseModalOpen && (
        <PurchaseModal
          product={product}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      )}

      <style jsx>{`
        .product-detail-page {
          padding-top: 80px;
          min-height: 100vh;
        }

        /* Hero Section */
        .product-hero {
          padding: ${designSystem.spacing.scale['16']} 0;
          background: linear-gradient(
            180deg,
            ${designSystem.colors.neutral[50]} 0%,
            transparent 100%
          );
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['2']};
          padding: 10px 20px;
          background: ${designSystem.colors.surface.light};
          border: 1px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.full};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          margin-bottom: ${designSystem.spacing.scale['8']};
        }

        .back-button:hover {
          background: white;
          color: ${designSystem.colors.primary.DEFAULT};
          border-color: ${designSystem.colors.primary.DEFAULT};
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${designSystem.spacing.scale['12']};
          align-items: center;
        }

        .product-image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-icon-large {
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: ${designSystem.borderRadius['3xl']};
          box-shadow: ${designSystem.shadows.xl};
          padding: ${designSystem.spacing.scale['12']};
        }

        .brand-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .discount-badge-large {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          border-radius: ${designSystem.borderRadius.full};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-weight: ${designSystem.typography.fontWeight.bold};
          box-shadow: ${designSystem.shadows.lg};
          animation: pulse 2s ease-in-out infinite;
        }

        .discount-badge-large span:first-child {
          font-size: ${designSystem.typography.fontSize['2xl']};
        }

        .discount-badge-large span:last-child {
          font-size: ${designSystem.typography.fontSize.xs};
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['6']};
        }

        .category-badge {
          display: inline-block;
          padding: 6px 16px;
          background: ${designSystem.colors.primary.DEFAULT}20;
          color: ${designSystem.colors.primary.DEFAULT};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          border-radius: ${designSystem.borderRadius.full};
          width: fit-content;
        }

        .product-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['4xl']};
          font-weight: ${designSystem.typography.fontWeight.heavy};
          color: ${designSystem.colors.text.primary};
          margin: 0;
          line-height: ${designSystem.typography.lineHeight.tight};
        }

        .product-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        .pricing-section {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['2']};
          padding: ${designSystem.spacing.scale['6']};
          background: ${designSystem.colors.neutral[50]};
          border-radius: ${designSystem.borderRadius.xl};
        }

        .original-price {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          color: ${designSystem.colors.text.tertiary};
          text-decoration: line-through;
        }

        .current-price {
          display: flex;
          align-items: baseline;
          gap: ${designSystem.spacing.scale['2']};
          font-family: ${designSystem.typography.fontFamily.persian};
        }

        .price-amount {
          font-size: ${designSystem.typography.fontSize['4xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .price-currency,
        .price-period {
          font-size: ${designSystem.typography.fontSize.base};
          color: ${designSystem.colors.text.secondary};
        }

        .purchase-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${designSystem.spacing.scale['3']};
          width: 100%;
          padding: 18px 32px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          font-weight: ${designSystem.typography.fontWeight.bold};
          border: none;
          border-radius: ${designSystem.borderRadius.xl};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
          box-shadow: ${designSystem.shadows.lg};
          min-height: ${designSystem.accessibility.touchTarget.mobile};
        }

        .purchase-button:hover {
          background: ${designSystem.colors.primary.active};
          transform: translateY(-4px);
          box-shadow: ${designSystem.shadows.xl};
        }

        .trust-indicators {
          display: flex;
          gap: ${designSystem.spacing.scale['4']};
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['2']};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .trust-item svg {
          color: ${designSystem.colors.primary.DEFAULT};
        }

        /* Features Section */
        .product-features {
          padding: ${designSystem.spacing.scale['16']} 0;
          background: white;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
        }

        .features-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['3xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          text-align: center;
          margin: 0 0 ${designSystem.spacing.scale['10']};
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: ${designSystem.spacing.scale['4']};
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['3']};
          padding: ${designSystem.spacing.scale['4']};
          background: ${designSystem.colors.neutral[50]};
          border-radius: ${designSystem.borderRadius.xl};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .feature-item:hover {
          background: ${designSystem.colors.primary.DEFAULT}10;
        }

        .feature-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          border-radius: ${designSystem.borderRadius.full};
        }

        .feature-text {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          color: ${designSystem.colors.text.primary};
        }

        /* How It Works */
        .how-it-works {
          padding: ${designSystem.spacing.scale['16']} 0;
          background: ${designSystem.colors.neutral[50]};
        }

        .how-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
        }

        .how-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['3xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          text-align: center;
          margin: 0 0 ${designSystem.spacing.scale['10']};
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: ${designSystem.spacing.scale['6']};
        }

        .step-card {
          background: white;
          padding: ${designSystem.spacing.scale['8']};
          border-radius: ${designSystem.borderRadius['2xl']};
          text-align: center;
          box-shadow: ${designSystem.shadows.md};
          transition: all ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: ${designSystem.shadows.xl};
        }

        .step-number {
          width: 60px;
          height: 60px;
          margin: 0 auto ${designSystem.spacing.scale['4']};
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${designSystem.colors.primary.DEFAULT}, ${designSystem.colors.primary.active});
          color: white;
          font-family: ${designSystem.typography.fontFamily.text};
          font-size: ${designSystem.typography.fontSize['2xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          border-radius: ${designSystem.borderRadius.full};
        }

        .step-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing.scale['2']};
        }

        .step-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: ${designSystem.spacing.scale['8']};
          }

          .product-icon-large {
            width: 200px;
            height: 200px;
          }

          .product-title {
            font-size: ${designSystem.typography.fontSize['2xl']};
          }

          .price-amount {
            font-size: ${designSystem.typography.fontSize['3xl']};
          }

          .features-grid,
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = getProductBySlug(params?.slug as string);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

/**
 * Get category label in Persian
 */
const getCategoryLabel = (category: Product['category']): string => {
  const labels: Record<Product['category'], string> = {
    ai: 'هوش مصنوعی',
    music: 'موسیقی',
    media: 'رسانه',
    devTools: 'توسعه نرم‌افزار',
    design: 'طراحی',
    productivity: 'بهره‌وری',
  };
  return labels[category] || category;
};

export default ProductDetailPage;
