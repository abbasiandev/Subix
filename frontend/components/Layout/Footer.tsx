import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { SUPPORT_URL } from '@/lib/constants';
import { asset } from '@/lib/assets';

const ENAMAD_ID = '8347083';
const ENAMAD_CODE = '5NJ2iqw687f8Z2ma89dqajBIgCH5Ukrj';
const ENAMAD_LOGO_URL = `https://trustseal.enamad.ir/logo.aspx?id=${ENAMAD_ID}&Code=${ENAMAD_CODE}`;
const ENAMAD_VERIFY_URL = `https://trustseal.enamad.ir/?id=${ENAMAD_ID}&Code=${ENAMAD_CODE}`;

export function Footer() {
  const enamadImgRef = useRef<HTMLImageElement>(null);

  /* Set the non-standard `code` attribute that enamad's script looks for */
  useEffect(() => {
    enamadImgRef.current?.setAttribute('code', ENAMAD_CODE);
  }, []);

  const openEnamadPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      ENAMAD_VERIFY_URL,
      'enamad_popup',
      'width=450,height=630,scrollbars=no,resizable=no,toolbar=no,menubar=no,location=no,status=no',
    );
  };

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
        <div className="footer-support-column"><h2 className="footer-heading">پشتیبانی</h2><ul className="footer-list"><li><a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">گفت‌وگو در تلگرام <span aria-hidden="true">↗</span></a></li><li>پیش از انتخاب، مشخصات و مدت هر اکانت را بررسی کنید.</li></ul>
          <div className="footer-enamad">
            <a
              href={ENAMAD_VERIFY_URL}
              onClick={openEnamadPopup}
              referrerPolicy="origin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="نماد اعتماد الکترونیکی فلوکسو"
            >
              {/* Primary: remote enamad logo. Fallback: local SVG on load failure. */}
              <img
                ref={enamadImgRef}
                referrerPolicy="origin"
                src={ENAMAD_LOGO_URL}
                alt="نماد اعتماد الکترونیکی"
                width={180}
                height={110}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.dataset.fallback === 'true') return;
                  image.dataset.fallback = 'true';
                  image.src = asset('/enamad-fallback.svg?v=2');
                }}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom-line"><p>© {new Date().getFullYear()} فلوکسو. تمامی حقوق محفوظ است.</p><p>جریان انتخاب ابزارهای هوش مصنوعی</p></div>

      {/* Enamad verification widget script — loaded once, deferred */}
      <Script
        src="https://trustseal.enamad.ir/Content/partner-widget.js"
        strategy="lazyOnload"
      />
    </footer>
  );
}

export default Footer;
