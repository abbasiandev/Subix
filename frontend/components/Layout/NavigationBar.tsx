import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { designSystem } from '@/styles/apple-design-system';
import { useScrollDirection, useSmoothScroll } from '@/hooks/useScrollProgress';

/**
 * Navigation Bar Component
 * Apple-inspired navigation with Liquid Glass effect
 * Hides on scroll down, shows on scroll up
 */
export const NavigationBar: React.FC = () => {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const { scrollToElement } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'خانه', href: '/', section: null },
    { label: 'محصولات', href: '/#products', section: 'products' },
    { label: 'مقالات', href: '/#articles', section: 'articles' },
    { label: 'درباره ما', href: '/#footer', section: 'footer' },
  ];

  const handleNavClick = (e: React.MouseEvent, section: string | null) => {
    e.preventDefault();
    
    if (section && router.pathname === '/') {
      // Smooth scroll on same page
      scrollToElement(section);
    } else if (section) {
      // Navigate to home then scroll
      router.push(`/#${section}`);
    } else {
      // Navigate to home
      router.push('/');
    }
    
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    return router.pathname === href || router.asPath === href;
  };

  return (
    <>
      <nav
        className={`navigation-bar ${isScrolled ? 'scrolled' : ''} ${
          scrollDirection === 'down' ? 'hidden' : ''
        }`}
      >
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
              <path
                d="M16 8L20 12L16 16L12 12L16 8Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M16 16L20 20L16 24L12 20L16 16Z"
                fill="white"
                fillOpacity="0.7"
              />
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={designSystem.colors.primary.DEFAULT} />
                  <stop offset="1" stopColor={designSystem.colors.primary.active} />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">سابیکس</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links desktop">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.section)}
                  className={isActive(item.href) ? 'active' : ''}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="nav-actions">
            <Link href="/account" className="account-link desktop">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M4 17C4 14 6.5 12 10 12C13.5 12 16 14 16 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>حساب کاربری</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="منوی موبایل"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.section)}
                  className={isActive(item.href) ? 'active' : ''}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                حساب کاربری
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .navigation-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: transform ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default},
                      background ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default},
                      box-shadow ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .navigation-bar.scrolled {
          background: ${designSystem.effects.liquidGlass.background};
          backdrop-filter: ${designSystem.effects.liquidGlass.backdropBlur};
          -webkit-backdrop-filter: ${designSystem.effects.liquidGlass.backdropBlur};
          border-bottom: 1px solid ${designSystem.effects.liquidGlass.border};
          box-shadow: ${designSystem.shadows.md};
        }

        .navigation-bar.hidden {
          transform: translateY(-100%);
        }

        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 ${designSystem.spacing.scale['6']};
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: ${designSystem.spacing.scale['8']};
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: ${designSystem.colors.text.primary};
          font-weight: ${designSystem.typography.fontWeight.bold};
          font-size: ${designSystem.typography.fontSize.xl};
          font-family: ${designSystem.typography.fontFamily.persian};
          transition: opacity ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .logo:hover {
          opacity: 0.8;
        }

        .logo-text {
          font-size: ${designSystem.typography.fontSize.xl};
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['8']};
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }

        .nav-links.desktop {
          display: none;
        }

        .nav-links a {
          text-decoration: none;
          color: ${designSystem.colors.text.secondary};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.medium};
          padding: 8px 16px;
          border-radius: ${designSystem.borderRadius.lg};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          position: relative;
        }

        .nav-links a:hover {
          color: ${designSystem.colors.text.primary};
          background: ${designSystem.colors.neutral[100]};
        }

        .nav-links a.active {
          color: ${designSystem.colors.primary.DEFAULT};
        }

        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background: ${designSystem.colors.primary.DEFAULT};
          border-radius: 2px;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: ${designSystem.spacing.scale['4']};
        }

        .account-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          text-decoration: none;
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.medium};
          border-radius: ${designSystem.borderRadius.full};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          box-shadow: ${designSystem.shadows.sm};
        }

        .account-link:hover {
          background: ${designSystem.colors.primary.active};
          box-shadow: ${designSystem.shadows.md};
          transform: translateY(-2px);
        }

        .account-link.desktop {
          display: none;
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 24px;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: ${designSystem.colors.text.primary};
          border-radius: 2px;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: ${designSystem.effects.liquidGlass.background};
          backdrop-filter: ${designSystem.effects.liquidGlass.backdropBlur};
          -webkit-backdrop-filter: ${designSystem.effects.liquidGlass.backdropBlur};
          border-bottom: 1px solid ${designSystem.effects.liquidGlass.border};
          box-shadow: ${designSystem.shadows.xl};
          max-height: 0;
          overflow: hidden;
          transition: max-height ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
        }

        .mobile-menu.open {
          max-height: 400px;
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: ${designSystem.spacing.scale['4']};
          display: flex;
          flex-direction: column;
          gap: ${designSystem.spacing.scale['2']};
        }

        .mobile-nav-links a {
          display: block;
          padding: 12px 16px;
          text-decoration: none;
          color: ${designSystem.colors.text.secondary};
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.medium};
          border-radius: ${designSystem.borderRadius.lg};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
        }

        .mobile-nav-links a:hover,
        .mobile-nav-links a.active {
          background: ${designSystem.colors.neutral[100]};
          color: ${designSystem.colors.primary.DEFAULT};
        }

        /* Desktop */
        @media (min-width: 768px) {
          .nav-links.desktop {
            display: flex;
          }

          .account-link.desktop {
            display: flex;
          }

          .mobile-menu-button {
            display: none;
          }

          .mobile-menu {
            display: none;
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 ${designSystem.spacing.scale['4']};
          }

          .nav-links {
            gap: ${designSystem.spacing.scale['4']};
          }
        }

        /* Mobile touch target */
        @media (max-width: 767px) {
          .logo-text {
            font-size: ${designSystem.typography.fontSize.lg};
          }
        }
      `}</style>
    </>
  );
};

export default NavigationBar;
