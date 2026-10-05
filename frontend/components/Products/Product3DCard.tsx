import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Product } from '@/data/products'
import { asset } from '@/lib/assets'
import { DiscountBadge } from './DiscountBadge'
import { getCategoryColor } from '@/data/product-icons'

interface Product3DCardProps { product: Product; onPurchase?: (product: Product) => void }

export const Product3DCard: React.FC<Product3DCardProps> = ({ product, onPurchase }) => {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const accent = getCategoryColor(product.category)

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setTilt({ x: ((event.clientY - rect.top) / rect.height - 0.5) * -8, y: ((event.clientX - rect.left) / rect.width - 0.5) * 10 })
  }
  return <Link href={`/products/${product.id}`} className="product-constellation-link">
    <article ref={ref} className="product-constellation-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }} onMouseMove={handleMove} style={{ transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
      <div className="product-card-noise" />
      {product.hasDiscount && <DiscountBadge />}
      <div className="product-orbit-label"><span className="status-dot" /> ACCESS NODE / {String(product.id).padStart(2, '0')}</div>
      <div className="product-icon-stage" style={{ '--product-accent': accent } as React.CSSProperties}>
        <div className="product-icon-preview">
          <img src={asset(product.brandLogoPath)} alt="" className="product-brand-icon" loading="lazy" />
        </div>
        <div className="product-icon-halo" />
        <div className="product-icon-caption">{hovered ? 'REVEALED / ACTIVE' : '3D / ORBITAL'}</div>
      </div>
      <div className="product-constellation-info">
        <div className="product-meta-row"><span>{product.category}</span><span>فعالسازی آنی</span></div>
        <h3>{product.name}</h3>
        {product.description && <p>{product.description}</p>}
        <div className="product-card-bottom">
          <div><small>دسترسی {product.duration}</small><strong>{product.price.toLocaleString('fa-IR')} <em>تومان</em></strong></div>
          <span className="product-card-action">دریافت دسترسی <span aria-hidden="true">↗</span></span>
        </div>
      </div>
      {hovered && <div className="product-scanline" />}
    </article>
  </Link>
}

export default Product3DCard
