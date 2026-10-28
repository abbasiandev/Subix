import Link from 'next/link';
import { SUPPORT_URL } from '@/lib/constants';
import { asset } from '@/lib/assets';

export function Footer() {
  return (
    <footer id="support" className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-about">
          <Link href="/" className="site-wordmark"><span className="wordmark-symbol" aria-hidden="true">F<span>.</span></span><span>فلوکسو</span></Link>
          <h2 className="footer-heading">درباره فلوکسو</h2>
          <p><span dir="ltr">Fluxo</span> یعنی جریان. ما این نام را برای مسیری انتخاب کرده‌ایم که از نیاز شما شروع می‌شود و با مقایسه قابلیت، مدت و قیمت به انتخاب اکانت هوش مصنوعی می‌رسد.</p>
          <div className="footer-social"><a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">پشتیبانی در تلگرام <span aria-hidden="true">↗</span></a></div>
        </div>
        <div><h2 className="footer-heading">دسترسی سریع</h2><ul className="footer-list">
           <li><Link href="/products">کاتالوگ اکانت‌ها</Link></li><li><Link href="/blog">راهنمای انتخاب</Link></li><li><Link href="/account">حساب کاربری</Link></li><li><Link href="/contact">پشتیبانی تلگرام</Link></li>
          <li><span className="footer-unavailable">حریم خصوصی <small>به‌زودی</small></span></li><li><span className="footer-unavailable">شرایط استفاده <small>به‌زودی</small></span></li>
        </ul></div>
        <div className="footer-support-column"><h2 className="footer-heading">پشتیبانی</h2><ul className="footer-list"><li><a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">گفت‌وگو در تلگرام <span aria-hidden="true">↗</span></a></li><li>پیش از انتخاب، مشخصات و مدت هر اکانت را بررسی کنید.</li></ul><div className="footer-enamad"><a referrerPolicy="origin" target="_blank" rel="noopener noreferrer" aria-label="نماد اعتماد الکترونیکی فلوکسو" href="https://trustseal.enamad.ir/?id=8347083&Code=5NJ2iqw687f8Z2ma89dqajBIgCH5Ukrj"><img referrerPolicy="origin" src="https://trustseal.enamad.ir/logo.aspx?id=8347083&Code=5NJ2iqw687f8Z2ma89dqajBIgCH5Ukrj" alt="نماد اعتماد الکترونیکی" width="180" height="110" data-code="5NJ2iqw687f8Z2ma89dqajBIgCH5Ukrj" ref={(image) => image?.setAttribute('code', '5NJ2iqw687f8Z2ma89dqajBIgCH5Ukrj')} style={{ cursor: 'pointer' }} onError={(event) => { const image = event.currentTarget; if (image.dataset.fallback === 'true') return; image.dataset.fallback = 'true'; image.src = asset('/enamad-fallback.svg'); }} /></a></div></div>
      </div>
        <div className="site-container footer-bottom-line"><p>© {new Date().getFullYear()} فلوکسو. تمامی حقوق محفوظ است.</p><p>جریان انتخاب ابزارهای هوش مصنوعی</p></div>
    </footer>
  );
}

export default Footer;
