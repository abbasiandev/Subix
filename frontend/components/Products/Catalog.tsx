import { useMemo, useState } from 'react';
import { isAiProduct, Product } from '@/data/products';
import Product3DCard, { categoryLabels } from './Product3DCard';

export default function Catalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<'ai' | 'other'>('ai');
  const scopedProducts = useMemo(() => products.filter((product) => scope === 'ai' ? isAiProduct(product) : !isAiProduct(product)), [products, scope]);
  const visibleCategories = Object.entries(categoryLabels).filter(([value]) => scopedProducts.some((product) => product.category === value));
  const matches = useMemo(() => scopedProducts.filter((product) => (category === 'all' || product.category === category) && `${product.name} ${product.nameEn} ${product.description}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [scopedProducts, category, query]);

  const changeScope = (nextScope: 'ai' | 'other') => {
    setScope(nextScope);
    setCategory('all');
  };

  return <>
    <div className="catalog-toolbar">
      <div className="catalog-search"><label className="sr-only" htmlFor="catalog-search">جستجوی اکانت و لایسنس</label><input id="catalog-search" type="search" placeholder="ابزار موردنظرتان را پیدا کنید…" value={query} onChange={(event) => setQuery(event.target.value)} /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg></div>
     <span className="catalog-count" role="status">{matches.length.toLocaleString('fa-IR')} اکانت برای بررسی</span>
    </div>
    <div className="catalog-scope" role="group" aria-label="نوع سرویس">
      <button type="button" aria-pressed={scope === 'ai'} onClick={() => changeScope('ai')}>اکانت‌های هوش مصنوعی</button>
      <button type="button" aria-pressed={scope === 'other'} onClick={() => changeScope('other')}>سایر سرویس‌های دیجیتال</button>
    </div>
    <div className="catalog-filters" role="group" aria-label="دسته‌بندی محصولات">
       {[['all', scope === 'ai' ? 'همه اکانت‌های AI' : 'همه سرویس‌ها'], ...visibleCategories].map(([value, label]) => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{label}</button>)}
    </div>
    <div className="catalog-grid">{matches.map((product) => <Product3DCard key={product.id} product={product} />)}</div>
    {matches.length === 0 && <div className="catalog-empty"><p>ابزاری با این مشخصات پیدا نشد.</p><button type="button" className="site-button" onClick={() => { setCategory('all'); setQuery(''); }}>نمایش همه ابزارها</button></div>}
  </>;
}
