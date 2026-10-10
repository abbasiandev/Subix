import Link from 'next/link';
import { Product } from '@/data/products';
import { asset } from '@/lib/assets';

export const categoryLabels: Record<Product['category'], string> = {
  ai: 'هوش مصنوعی', design: 'طراحی', devTools: 'برنامه‌نویسی', music: 'موسیقی', media: 'فیلم و سریال', productivity: 'بهره‌وری',
};

interface Product3DCardProps { product: Product; onPurchase?: (product: Product) => void }

export function Product3DCard({ product, onPurchase }: Product3DCardProps) {
   const content = <>
    <div className="catalog-card-top"><div className="catalog-logo"><img src={asset(product.brandLogoPath)} width="48" height="48" alt="" loading="lazy" /></div><span className="catalog-category">{categoryLabels[product.category]}</span>{product.hasDiscount && <span className="catalog-discount">تخفیف</span>}</div>
    <div className="catalog-card-body"><span className="catalog-english" dir="ltr">{product.nameEn}</span><h3>{product.name}</h3><p>{product.description}</p></div>
    <div className="catalog-card-price"><small>دسترسی {product.duration}</small><strong>{product.price.toLocaleString('fa-IR')} <span>تومان</span></strong></div>
     <div className="catalog-card-bottom"><span>مشاهده مشخصات</span><span className="catalog-action">بررسی و انتخاب <span aria-hidden="true">↖</span></span></div>
  </>;
  return onPurchase ? <article className="catalog-card"><Link className="catalog-card-link" href={`/products/${product.slug}`}>{content}</Link><button className="site-button" type="button" onClick={() => onPurchase(product)}>خرید {product.nameEn}</button></article> : <article className="catalog-card"><Link className="catalog-card-link" href={`/products/${product.slug}`}>{content}</Link></article>;
}

export default Product3DCard;
