import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { products, Product } from '@/data/products';
import { asset } from '@/lib/assets';

type StoryBeat = {
  title: string;
  body: string;
  productIds: number[];
};

type StoryChapter = {
  number: string;
  label: string;
  beats: StoryBeat[];
};

const chapters: StoryChapter[] = [
  {
    number: '۰۱',
    label: 'متن و تحقیق',
    beats: [
      { title: 'از سؤال شروع کنید.', body: 'برای گفت‌وگو، نوشتن و حل مسئله، قابلیت‌هایی را مقایسه کنید که با نوع کار روزانه شما هماهنگ‌اند.', productIds: [4, 29] },
      { title: 'با اسناد بزرگ کار کنید.', body: 'اگر تحلیل فایل‌ها و متن‌های طولانی برایتان مهم است، قبل از انتخاب به ظرفیت و روش استفاده توجه کنید.', productIds: [3, 31] },
      { title: 'دستیار مناسب را پیدا کنید.', body: 'به‌جای دنبال کردن نام‌ها، خروجی موردنیاز، مدت اشتراک و مسیر استفاده را کنار هم بررسی کنید.', productIds: [12, 15] },
    ],
  },
  {
    number: '۰۲',
    label: 'تصویر و ویدیو',
    beats: [
      { title: 'تصویر را تصور کنید.', body: 'برای ایده‌پردازی و تولید تصویر، مدل‌ها و امکاناتی را پیدا کنید که با سبک خروجی شما هم‌خوانی دارند.', productIds: [1, 64] },
      { title: 'حرکت را اضافه کنید.', body: 'برای ویدیو و سینما، به نوع خروجی، کنترل‌های خلاقانه و مدت موردنیازتان نگاه کنید.', productIds: [68, 74] },
      { title: 'قبل از خرید مقایسه کنید.', body: 'یک نتیجه خوب فقط به نام ابزار وابسته نیست؛ جزئیات و محدودیت‌های هر اکانت را بخوانید.', productIds: [25, 28] },
    ],
  },
  {
    number: '۰۳',
    label: 'کدنویسی و ساخت',
    beats: [
      { title: 'کد را سریع‌تر جلو ببرید.', body: 'اگر دستیار کدنویسی می‌خواهید، تفاوت محیط، مدل و نوع دسترسی را در انتخاب خود وارد کنید.', productIds: [58, 55] },
      { title: 'ایده را آزمایش کنید.', body: 'ابزارهای ساخت و تصویر را بر اساس خروجی نهایی مقایسه کنید، نه فقط فهرست قابلیت‌ها.', productIds: [32, 30] },
      { title: 'از همین‌جا شروع کنید.', body: 'وقتی گزینه مناسب را پیدا کردید، صفحه محصول را برای مدت، قیمت و جزئیات اکانت باز کنید.', productIds: [4, 58] },
    ],
  },
];

function getProducts(ids: number[]): Product[] {
  return ids.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[];
}

function ChapterVisual({ items, active }: { items: Product[]; active: number }) {
  return (
    <div className="scroll-story-visual" aria-label="نمایش انتزاعی ابزارهای این بخش" role="group">
      <div className="scroll-story-grid" aria-hidden="true" />
      <svg className="scroll-story-route" viewBox="0 0 520 420" aria-hidden="true">
        <path className="scroll-story-route-muted" d="M40 335 C95 270 100 95 185 120 S270 330 330 250 S380 85 480 70" />
        <path className="scroll-story-route-active" d={active === 0 ? 'M40 335 C95 270 100 95 185 120' : active === 1 ? 'M40 335 C95 270 100 95 185 120 S270 330 330 250' : 'M40 335 C95 270 100 95 185 120 S270 330 330 250 S380 85 480 70'} />
        <circle cx={active === 0 ? 185 : active === 1 ? 330 : 480} cy={active === 0 ? 120 : active === 1 ? 250 : 70} r="8" />
      </svg>
      <div className="scroll-story-product-orbit">
        {items.map((product, index) => (
          <Link key={product.id} href={`/products/${product.slug}`} className={`scroll-story-product scroll-story-product-${index}`} aria-label={`مشاهده ${product.name}`}>
            <img src={asset(product.brandLogoPath)} alt="" width="42" height="42" loading="lazy" />
            <span dir="ltr">{product.nameEn}</span>
          </Link>
        ))}
      </div>
      <div className="scroll-story-core" aria-hidden="true"><span>{String(active + 1).padStart(2, '0')}</span><strong>SUBIX</strong></div>
       <span className="scroll-story-fact" aria-hidden="true">ابزارهای منتخب · مقایسه روشن‌تر</span>
    </div>
  );
}

export default function ScrollStory() {
  const storyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });
  const activeProducts = useMemo(() => chapters.map((chapter, index) => getProducts(chapter.beats[active[index] || 0].productIds)), [active]);

  useEffect(() => {
    const root = storyRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    root.classList.add('scroll-story-js');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const chapter = Number(target.dataset.chapter);
        const beat = Number(target.dataset.beat);
        setActive((current) => current[chapter] === beat ? current : { ...current, [chapter]: beat });
      });
    }, { rootMargin: '-46% 0px -46% 0px', threshold: 0 });
    root.querySelectorAll<HTMLElement>('[data-scroll-beat]').forEach((beat) => observer.observe(beat));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={storyRef} className="scroll-story" aria-label="داستان انتخاب ابزارهای سابیکس">
      {chapters.map((chapter, chapterIndex) => (
        <div className="scroll-story-chapter" key={chapter.number}>
          <div className="scroll-story-sticky">
            <div className="scroll-story-copy">
              <div className="scroll-story-heading"><span className="eyebrow">{chapter.number} · {chapter.label}</span><span className="scroll-story-progress" aria-hidden="true"><i style={{ transform: `scaleX(${((active[chapterIndex] || 0) + 1) / chapter.beats.length})` }} /></span></div>
              <div className="scroll-story-beats">
                {chapter.beats.map((beat, beatIndex) => {
                  const isActive = active[chapterIndex] === beatIndex;
                  const featured = getProducts(beat.productIds)[0];
                  return (
                    <article key={beat.title} className={`scroll-story-beat ${isActive ? 'is-active' : ''}`}>
                      <span className="scroll-story-beat-number">{String(beatIndex + 1).padStart(2, '0')}</span>
                      <h2>{beat.title}</h2>
                      <p>{beat.body}</p>
                      {featured && <Link href={`/products/${featured.slug}`} className="text-link">دیدن ابزار مرتبط <span aria-hidden="true">←</span></Link>}
                    </article>
                  );
                })}
              </div>
            </div>
            <ChapterVisual items={activeProducts[chapterIndex]} active={active[chapterIndex] || 0} />
          </div>
          <div className="scroll-story-sentinels" aria-hidden="true">
            {chapter.beats.map((beat, beatIndex) => <div key={beat.title} data-scroll-beat data-chapter={chapterIndex} data-beat={beatIndex} />)}
          </div>
        </div>
      ))}
    </section>
  );
}
