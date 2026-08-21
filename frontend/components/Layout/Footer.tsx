import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { designSystem } from '@/styles/apple-design-system';

/**
 * Footer Component
 * Three column layout with payment badges center, Zarinpal badge left
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer id="footer" className="footer">
        <div className="footer-container">
          {/* Column 1: About */}
          <div className="footer-column">
            <h3 className="footer-title">درباره سابیکس</h3>
            <p className="footer-description">
              فروشگاه تخصصی اشتراک‌های دیجیتال و ابزارهای هوش مصنوعی.
              خرید امن با بهترین قیمت و پشتیبانی ۲۴ ساعته.
            </p>
            <div className="social-links">
              <a href="https://t.me/subix" target="_blank" rel="noopener noreferrer" aria-label="تلگرام">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a href="https://instagram.com/subix" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="mailto:info@subix.ir" aria-label="ایمیل">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">دسترسی سریع</h3>
            <ul className="footer-links">
              <li><Link href="/#products">محصولات</Link></li>
              <li><Link href="/#articles">مقالات</Link></li>
              <li><Link href="/account">حساب کاربری</Link></li>
              <li><Link href="/help">راهنما و پشتیبانی</Link></li>
              <li><Link href="/privacy">حریم خصوصی</Link></li>
              <li><Link href="/terms">شرایط استفاده</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-column">
            <h3 className="footer-title">تماس با ما</h3>
            <ul className="footer-contact">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>info@subix.ir</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5.5L7.5 2L12 5.5V18H3V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M12 8H17V18H12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <span>تهران، ایران</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 3h4l2 5-2.5 1.5a11 11 0 005 5L12 12l5 2v4a2 2 0 01-2 2A13 13 0 012 5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <span>پشتیبانی ۲۴ ساعته</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment and Trust Section */}
        <div className="footer-bottom">
          {/* Left: Zarinpal Trust Badge */}
          <div className="trust-badge-container">
            <a
              href="https://www.zarinpal.com/trustPage/YOUR_MERCHANT_ID"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/trust-badges/zarinpal-trust-badge.svg"
                alt="نماد اعتماد الکترونیکی زرین‌پال"
                width={100}
                height={100}
                className="trust-badge"
              />
            </a>
          </div>

          {/* Center: Payment Methods */}
          <div className="payment-badges">
            <span className="payment-label">روش‌های پرداخت:</span>
            <div className="payment-icons">
              <div className="payment-icon">
                <Image
                  src="/trust-badges/idpay-logo.svg"
                  alt="آی‌دی‌پی"
                  width={60}
                  height={30}
                />
              </div>
              <div className="payment-icon">
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                  <rect width="60" height="30" rx="4" fill="#21AC4B"/>
                  <text x="30" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    زرین‌پال
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Empty for balance */}
          <div className="footer-spacer"></div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            © {currentYear} سابیکس. تمامی حقوق محفوظ است.
          </p>
          <p className="footer-note">
            خرید و فروش اشتراک‌های دیجیتال به صورت کاملاً قانونی
          </p>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(180deg, 
            ${designSystem.colors.neutral[50]} 0%,
            ${designSystem.colors.neutral[100]} 100%
          );
          border-top: 1px solid ${designSystem.colors.neutral[200]};
          padding: ${designSystem.spacing.scale['16']} 0 ${designSystem.spacing.scale['8']};
          margin-top: ${designSystem.spacing.scale['20']};
        }

        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: ${designSystem.spacing.scale['12']};
          margin-bottom: ${designSystem.spacing.scale['12']};
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['4']};
        }

        .footer-title {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.lg};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0 0 ${designSystem.spacing.scale['4']};
        }

        .footer-description {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          line-height: ${designSystem.typography.lineHeight.relaxed};
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: ${designSystem.spacing.scale['3']};
          margin-top: ${designSystem.spacing.scale['4']};
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: ${designSystem.borderRadius.full};
          background: ${designSystem.colors.neutral[200]};
          color: ${designSystem.colors.text.secondary};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .social-links a:hover {
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          transform: translateY(-2px);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['3']};
        }

        .footer-links a {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          text-decoration: none;
          transition: color ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .footer-links a:hover {
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .footer-contact {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['3']};
        }

        .footer-contact li {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['3']};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
        }

        .footer-contact svg {
          flex-shrink: 0;
          color: ${designSystem.colors.text.tertiary};
        }

        .footer-bottom {
          max-width: 1440px;
          margin: 0 auto;
          padding: ${designSystem.spacing.scale['8']} ${designSystem.spacing.scale['6']};
          border-top: 1px solid ${designSystem.colors.neutral[200]};
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: ${designSystem.spacing.scale['8']};
        }

        .trust-badge-container {
          flex: 0 0 auto;
        }

        .trust-badge-container a {
          display: block;
          transition: opacity ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .trust-badge-container a:hover {
          opacity: 0.8;
        }

        .payment-badges {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${designSystem.spacing.scale['3']};
        }

        .payment-label {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          font-weight: ${designSystem.typography.fontWeight.medium};
        }

        .payment-icons {
          display: flex;
          gap: ${designSystem.spacing.scale['4']};
          align-items: center;
        }

        .payment-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          background: white;
          border-radius: ${designSystem.borderRadius.lg};
          box-shadow: ${designSystem.shadows.sm};
        }

        .footer-spacer {
          flex: 0 0 100px;
        }

        .footer-copyright {
          max-width: 1440px;
          margin: 0 auto;
          padding: ${designSystem.spacing.scale['6']} ${designSystem.spacing.scale['6']} 0;
          text-align: center;
          border-top: 1px solid ${designSystem.colors.neutral[200]};
        }

        .footer-copyright p {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.tertiary};
          margin: ${designSystem.spacing.scale['2']} 0;
        }

        .footer-note {
          font-size: ${designSystem.typography.fontSize.xs} !important;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: repeat(2, 1fr);
            gap: ${designSystem.spacing.scale['8']};
          }

          .footer-column:last-child {
            grid-column: 1 / -1;
          }

          .footer-bottom {
            flex-wrap: wrap;
            justify-content: center;
          }

          .trust-badge-container {
            order: 2;
          }

          .payment-badges {
            order: 1;
            flex: 1 1 100%;
          }

          .footer-spacer {
            display: none;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .footer {
            padding: ${designSystem.spacing.scale['12']} 0 ${designSystem.spacing.scale['6']};
          }

          .footer-container {
            grid-template-columns: 1fr;
            gap: ${designSystem.spacing.scale['8']};
            padding: 0 ${designSystem.spacing.scale['4']};
          }

          .footer-column:last-child {
            grid-column: auto;
          }

          .footer-bottom {
            flex-direction: column;
            padding: ${designSystem.spacing.scale['6']} ${designSystem.spacing.scale['4']};
          }

          .trust-badge-container :global(.trust-badge) {
            width: 80px;
            height: 80px;
          }

          .payment-icons {
            flex-wrap: wrap;
            justify-content: center;
          }

          .footer-copyright {
            padding: ${designSystem.spacing.scale['4']} ${designSystem.spacing.scale['4']} 0;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
