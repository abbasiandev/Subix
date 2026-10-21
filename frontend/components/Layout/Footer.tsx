import Link from 'next/link';
import { SUPPORT_URL } from '@/lib/constants';

export function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-about">
          <Link href="/" className="site-wordmark"><span className="wordmark-symbol" aria-hidden="true">F<span>.</span></span><span>فلوکسو</span></Link>
          <h2 className="footer-heading">درباره فلوکسو</h2>
          <p>کاتالوگی برای پیدا کردن اکانت‌های هوش مصنوعی؛ با توضیحات کوتاه، مقایسه روشن و مسیر انتخابی که شما را سریع‌تر به ابزار مناسب می‌رساند.</p>
          <div className="footer-social"><a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">پشتیبانی در تلگرام <span aria-hidden="true">↗</span></a></div>
        </div>
        <div><h2 className="footer-heading">دسترسی سریع</h2><ul className="footer-list">
           <li><Link href="/products">کاتالوگ اکانت‌ها</Link></li><li><Link href="/blog">راهنمای انتخاب</Link></li><li><Link href="/account">حساب کاربری</Link></li><li><Link href="/contact">پشتیبانی تلگرام</Link></li>
          <li><span className="footer-unavailable">حریم خصوصی <small>به‌زودی</small></span></li><li><span className="footer-unavailable">شرایط استفاده <small>به‌زودی</small></span></li>
        </ul></div>
        <div><h2 className="footer-heading">پشتیبانی</h2><ul className="footer-list"><li><a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">گفت‌وگو در تلگرام <span aria-hidden="true">↗</span></a></li><li>پیش از انتخاب، مشخصات و مدت هر اکانت را بررسی کنید.</li></ul></div>
      </div>
       <div className="site-container footer-bottom-line"><p>© {new Date().getFullYear()} فلوکسو. تمامی حقوق محفوظ است.</p><p>انتخاب سریع‌تر اکانت‌های هوش مصنوعی</p></div>
    </footer>
  );
}

export default Footer;
