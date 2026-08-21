import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { label: 'محصولات', href: '/products' },
      { label: 'قیمت‌گذاری', href: '/products' },
      { label: 'تخفیف‌ها', href: '/offers' },
      { label: 'جدیدترین‌ها', href: '/products?sort=newest' },
    ],
    company: [
      { label: 'درباره ما', href: '/about' },
      { label: 'تماس با ما', href: '/contact' },
      { label: 'بلاگ', href: '/blog' },
      { label: 'همکاری با ما', href: '/careers' },
    ],
    support: [
      { label: 'مرکز پشتیبانی', href: '/support' },
      { label: 'راهنما', href: '/help' },
      { label: 'سوالات متداول', href: '/faq' },
      { label: 'وضعیت سرویس', href: '/status' },
    ],
    legal: [
      { label: 'قوانین و مقررات', href: '/terms' },
      { label: 'حریم خصوصی', href: '/privacy' },
      { label: 'قوانین استفاده', href: '/usage' },
      { label: 'سیاست بازگشت', href: '/refund' },
    ],
  };

  const socialLinks = [
    { name: 'Telegram', icon: '📱', href: 'https://t.me/subix', color: '#0088cc' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com/subix', color: '#E4405F' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/subix', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/subix', color: '#0077b5' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="mb-6 cursor-pointer">
                <Logo variant="full" size="md" color="primary" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              دسترسی آسان و مقرون‌به‌صرفه به قدرتمندترین ابزارهای هوش مصنوعی جهان. 
              با بهترین قیمت و پشتیبانی ۲۴/۷
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center border border-white/10 transition-all"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="text-lg font-bold mb-4">
                {key === 'product' && 'محصولات'}
                {key === 'company' && 'شرکت'}
                {key === 'support' && 'پشتیبانی'}
                {key === 'legal' && 'قوانین'}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              عضویت در خبرنامه
            </h3>
            <p className="text-gray-400 mb-6">
              از آخرین تخفیف‌ها و محصولات جدید باخبر شوید
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="آدرس ایمیل شما"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all whitespace-nowrap"
              >
                عضویت
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>© {new Date().getFullYear()} سابیکس. تمامی حقوق محفوظ است.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/terms">
                <span className="hover:text-white transition-colors cursor-pointer">
                  قوانین و مقررات
                </span>
              </Link>
              <Link href="/privacy">
                <span className="hover:text-white transition-colors cursor-pointer">
                  حریم خصوصی
                </span>
              </Link>
              <Link href="/sitemap">
                <span className="hover:text-white transition-colors cursor-pointer">
                  نقشه سایت
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
