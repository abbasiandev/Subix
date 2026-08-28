import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const NavigationNew: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'خانه' },
    { href: '/products', label: 'محصولات' },
    { href: '/blog', label: 'بلاگ' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  const isActive = (href: string) => router.pathname === href;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <Logo variant="icon" size="md" color="primary" animated={false} />
                <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  SUBIX
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-xl font-medium transition-colors duration-300 cursor-pointer ${
                      isActive(link.href)
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-xl"
                        layoutId="navbar-active"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/dashboard">
                <motion.button
                  className="px-6 py-2.5 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  پنل کاربری
                </motion.button>
              </Link>
              <Link href="/login">
                <motion.button
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ورود / ثبت‌نام
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="relative bg-gradient-to-b from-gray-900 to-black h-full w-full flex flex-col p-6 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={link.href}>
                      <div
                        className={`px-6 py-4 rounded-2xl font-medium text-lg transition-colors duration-300 ${
                          isActive(link.href)
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <Link href="/dashboard">
                  <button className="w-full px-6 py-4 text-white font-medium rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300">
                    پنل کاربری
                  </button>
                </Link>
                <Link href="/login">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                    ورود / ثبت‌نام
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationNew;
