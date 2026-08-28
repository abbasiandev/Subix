import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { Product } from '@/data/products'
import { asset } from '@/lib/assets'
import { DiscountBadge } from './DiscountBadge'
import { getCategoryColor } from '@/data/product-icons'

interface Product3DCardProps { product: Product; onPurchase?: (product: Product) => void }

function ProductIconScene({ product }: { product: Product }) {
  const group = useRef<THREE.Group>(null)
  const color = getCategoryColor(product.category)
  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.34 + pointer.x * 0.12
    group.current.rotation.x = Math.sin(t * 0.7) * 0.08 + pointer.y * 0.08
  })
  return <>
    <ambientLight intensity={0.4} />
    <pointLight position={[2, 3, 3]} color={color} intensity={8} />
    <pointLight position={[-3, -2, 2]} color="#7c5cff" intensity={5} />
    <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.55}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[0.82, 2]} />
          <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={1.6} metalness={0.72} roughness={0.16} wireframe />
        </mesh>
        <mesh scale={0.72}>
          <icosahedronGeometry args={[0.82, 2]} />
          <meshPhysicalMaterial color="#080315" emissive={color} emissiveIntensity={0.8} metalness={0.95} roughness={0.12} transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.018, 10, 96]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[0.7, 0.2, 0.7]}>
          <torusGeometry args={[1.42, 0.012, 10, 96]} />
          <meshBasicMaterial color="#ff4ecd" transparent opacity={0.62} />
        </mesh>
      </group>
    </Float>
    <Sparkles count={26} scale={3.8} size={1.8} speed={0.4} color={color} />
  </>
}

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
        {hovered ? (
          <Canvas camera={{ position: [0, 0, 3.8], fov: 42 }} dpr={[0.6, 1.25]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
            <ProductIconScene product={product} />
          </Canvas>
        ) : (
          <div className="product-icon-preview">
            <img src={asset(product.brandLogoPath)} alt={product.name} className="product-brand-icon" />
          </div>
        )}
        <div className="product-icon-halo" />
        <div className="product-icon-caption">{hovered ? '3D / LIVE' : 'PREVIEW'}</div>
      </div>
      <div className="product-constellation-info">
        <div className="product-meta-row"><span>{product.category}</span><span>فعالسازی آنی</span></div>
        <h3>{product.name}</h3>
        {product.description && <p>{product.description}</p>}
        <div className="product-card-bottom">
          <div><small>دسترسی {product.duration}</small><strong>{product.price.toLocaleString('fa-IR')} <em>تومان</em></strong></div>
          <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onPurchase?.(product) }}>دریافت دسترسی <span>↗</span></button>
        </div>
      </div>
      {hovered && <div className="product-scanline" />}
    </article>
  </Link>
}

export default Product3DCard
