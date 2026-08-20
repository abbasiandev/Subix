import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ProductIconReal } from '../components/RealProductIcons';

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 'chatgpt', name: 'ChatGPT Plus', price: '۳۹۰,۰۰۰', period: 'ماهانه' },
    { id: 'claude', name: 'Claude Pro', price: '۳۵۰,۰۰۰', period: 'ماهانه' },
    { id: 'gemini', name: 'Gemini Advanced', price: '۳۲۰,۰۰۰', period: 'ماهانه' },
    { id: 'cursor', name: 'Cursor Pro', price: '۲۸۰,۰۰۰', period: 'ماهانه' },
    { id: 'spotify', name: 'Spotify Premium', price: '۱۵۰,۰۰۰', period: 'ماهانه' },
  ];

  return (
    <>
      <Head>
        <title>Subix - اشتراک هوش مصنوعی</title>
      </Head>

      <div className="apple-page">
        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-content">
            <h1 
              className="hero-title"
              style={{ 
                transform: `translateY(${scrollY * 0.5}px)`,
                opacity: 1 - scrollY / 500
              }}
            >
              Subix
            </h1>
            <p className="hero-subtitle">
              دسترسی به قدرتمندترین هوش‌های مصنوعی
            </p>
            <p className="hero-description">
              ChatGPT، Claude، Gemini و بیشتر. همه در یک مکان.
            </p>
            <button 
              className="hero-cta"
              onClick={() => router.push('/products')}
            >
              مشاهده محصولات
            </button>
          </div>

          {/* Floating 3D Product Icons */}
          <div className="floating-icons">
            <div className="icon-orbit icon-1">
              <ProductIconReal product="chatgpt" size={80} />
            </div>
            <div className="icon-orbit icon-2">
              <ProductIconReal product="claude" size={70} />
            </div>
            <div className="icon-orbit icon-3">
              <ProductIconReal product="gemini" size={75} />
            </div>
            <div className="icon-orbit icon-4">
              <ProductIconReal product="cursor" size={65} />
            </div>
            <div className="icon-orbit icon-5">
              <ProductIconReal product="spotify" size={70} />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <div className="stat-number">۱۲,۰۰۰+</div>
            <div className="stat-label">کاربر فعال</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">۵</div>
            <div className="stat-label">محصول پریمیوم</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">۲۴/۷</div>
            <div className="stat-label">پشتیبانی</div>
          </div>
        </section>

        {/* Products Carousel */}
        <section className="products-section">
          <h2 className="section-title">محصولات</h2>
          <div className="products-grid">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="product-card-3d"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateY(${Math.max(0, 300 - scrollY + index * 50)}px)`
                }}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <div className="product-icon-wrapper">
                  <ProductIconReal product={product.id} size={100} />
                </div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="price-amount">{product.price}</span>
                  <span className="price-period">تومان / {product.period}</span>
                </div>
                <button className="product-buy-btn">خرید اشتراک</button>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">چرا Subix؟</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>فعال‌سازی آنی</h3>
              <p>اشتراک شما در کمتر از ۱ دقیقه فعال می‌شود</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>امنیت بالا</h3>
              <p>تراکنش‌های امن با رمزنگاری پیشرفته</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>قیمت مناسب</h3>
              <p>بهترین قیمت‌ها در بازار ایران</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>پشتیبانی ۲۴/۷</h3>
              <p>تیم پشتیبانی همیشه در دسترس شماست</p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .apple-page {
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a2e 0%, #0a0a15 100%);
          overflow: hidden;
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          padding: 0 20px;
        }

        .hero-title {
          font-size: clamp(4rem, 15vw, 10rem);
          font-weight: 900;
          background: linear-gradient(135deg, #fff 0%, #999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          margin: 1.5rem 0;
          color: #fff;
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #aaa;
          margin: 1rem 0 2.5rem;
        }

        .hero-cta {
          background: #fff;
          color: #000;
          padding: 18px 48px;
          border-radius: 980px;
          font-size: 1.125rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(255,255,255,0.3);
        }

        .floating-icons {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .icon-orbit {
          position: absolute;
          animation: float 6s ease-in-out infinite;
        }

        .icon-1 {
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }

        .icon-2 {
          top: 25%;
          right: 15%;
          animation-delay: 1s;
        }

        .icon-3 {
          bottom: 20%;
          left: 20%;
          animation-delay: 2s;
        }

        .icon-4 {
          bottom: 30%;
          right: 20%;
          animation-delay: 3s;
        }

        .icon-5 {
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-30px) rotateY(180deg); }
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          background: #000;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #FF6B35 0%, #6B4FE8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 1.25rem;
          color: #888;
          margin-top: 0.5rem;
        }

        .products-section {
          padding: 5rem 2rem;
          background: #000;
        }

        .section-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, #fff 0%, #888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .product-card-3d {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(50px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card-3d:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        .product-icon-wrapper {
          margin: 0 auto 1.5rem;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-name {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }

        .product-price {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .price-amount {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FF6B35 0%, #6B4FE8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .price-period {
          font-size: 0.9rem;
          color: #888;
        }

        .product-buy-btn {
          width: 100%;
          background: linear-gradient(135deg, #FF6B35 0%, #6B4FE8 100%);
          color: #fff;
          padding: 14px 32px;
          border-radius: 980px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .product-buy-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(255,107,53,0.4);
        }

        .features-section {
          padding: 5rem 2rem;
          background: linear-gradient(180deg, #000 0%, #0a0a15 100%);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }

        .feature-card p {
          color: #aaa;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .floating-icons {
            display: none;
          }
          
          .stats-section {
            gap: 2rem;
            padding: 3rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
