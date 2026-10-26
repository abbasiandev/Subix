import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const links = [
  { href: '/', section: 'home', label: 'خانه' },
  { href: '/products', section: 'products', label: 'کاتالوگ اکانت‌ها' },
  { href: '/blog', section: 'articles', label: 'راهنمای انتخاب' },
  { href: '/contact', section: 'support', label: 'پشتیبانی تلگرام' },
];

export function NavigationBar() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === 'light');
  }, []);

  useEffect(() => {
    if (router.pathname !== '/') return;

    const updateActiveSection = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 280);
      let nextSection = 'home';

      links.forEach((link) => {
        const section = document.getElementById(link.section);
        if (section && section.offsetTop <= marker) nextSection = link.section;
      });

      setActiveSection(nextSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [router.pathname]);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => {
      router.events.off('routeChangeStart', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open, router.events]);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
     try { localStorage.setItem('fluxo-theme', next ? 'light' : 'dark'); } catch { /* Theme still works without storage. */ }
  };

  const isRouteActive = (href: string) =>
    router.pathname === href || (href !== '/' && router.pathname.startsWith(`${href}/`));

  const linkHref = (link: (typeof links)[number]) =>
    router.pathname === '/' ? `#${link.section}` : link.href;

  const isLinkActive = (link: (typeof links)[number]) =>
    router.pathname === '/' ? activeSection === link.section : isRouteActive(link.href);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="ناوبری اصلی">
        <Link href="/" className="site-wordmark" aria-label="فلوکسو، صفحه اصلی">
          <span className="wordmark-symbol" aria-hidden="true">F<span>.</span></span>
          <span>فلوکسو</span>
        </Link>
        <div className="site-nav-links">
          {links.map((link) => {
            const active = isLinkActive(link);
            return <Link key={link.href} href={linkHref(link)} className={active ? 'is-active' : undefined} aria-current={active ? 'location' : undefined}>{link.label}</Link>;
          })}
        </div>
        <div className="site-nav-actions">
          <Link className="nav-account" href={user ? '/account' : '/login-phone'}>{user ? 'حساب کاربری' : 'ورود / عضویت'}</Link>
          <button type="button" className="site-icon-button" onClick={toggleTheme} aria-label={light ? 'فعال‌کردن پوسته تاریک' : 'فعال‌کردن پوسته روشن'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
          </button>
          <button ref={toggleRef} type="button" className="site-icon-button menu-toggle" aria-label={open ? 'بستن منو' : 'بازکردن منو'} aria-controls="site-mobile-menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 8h16M4 16h16'}/></svg>
          </button>
        </div>
        <div id="site-mobile-menu" className="site-mobile-menu" hidden={!open}>
          {links.map((link) => {
            const active = isLinkActive(link);
            return <Link key={link.href} href={linkHref(link)} className={active ? 'is-active' : undefined} aria-current={active ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}</Link>;
          })}
          <Link href={user ? '/account' : '/login-phone'} onClick={() => setOpen(false)}>{user ? 'حساب کاربری' : 'ورود / عضویت با شماره موبایل'}</Link>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;
