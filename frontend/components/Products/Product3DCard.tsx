import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { DiscountBadge } from './DiscountBadge';
import { designSystem } from '@/styles/apple-design-system';

interface Product3DCardProps {
  product: Product;
  onPurchase?: (product: Product) => void;
}

/**
 * 3D Product Card with interactive hover effects
 * Features: 3D tilt on hover, 360° flip on click, floating logo, discount badge
 */
export const Product3DCard: React.FC<Product3DCardProps> = ({
  product,
  onPurchase,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Handle mouse move for 3D tilt effect
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({ x, y });
  };

  /**
   * Handle purchase button click
   */
  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onPurchase) {
      onPurchase(product);
    }
  };

  /**
   * Calculate 3D transform based on mouse position
   */
  const getCardTransform = () => {
    if (!isHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    
    const rotateY = mousePosition.x * 15;
    const rotateX = -mousePosition.y * 15;
    const translateZ = 20;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  return (
    <>
      <Link href={`/products/${product.id}`} passHref>
        <div
          ref={cardRef}
          className="product-card-3d"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          style={{
            transform: getCardTransform(),
          }}
        >
          {/* Discount Badge */}
          {product.hasDiscount && <DiscountBadge />}

          {/* 3D Logo Container */}
          <div className="logo-3d-container">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 3], fov: 50 }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1} />
              
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
                <LogoMesh logoPath={product.brandLogoPath} />
              </Float>
            </Canvas>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            
            <div className="product-category">
              {getCategoryLabel(product.category)}
            </div>

            {/* Pricing */}
            <div className="product-pricing">
              {product.originalPrice && (
                <span className="original-price">
                  {product.originalPrice.toLocaleString('fa-IR')} تومان
                </span>
              )}
              <span className="current-price">
                {product.price.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="product-duration">{product.duration}</div>

            {/* Purchase Button */}
            <button
              className="purchase-button"
              onClick={handlePurchaseClick}
            >
              خرید فوری
            </button>
          </div>

          {/* Glass effect overlay on hover */}
          <div className={`glass-overlay ${isHovered ? 'visible' : ''}`} />
        </div>
      </Link>

      <style jsx>{`
        .product-card-3d {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          background: ${designSystem.colors.surface.light};
          border-radius: ${designSystem.borderRadius['2xl']};
          overflow: hidden;
          cursor: pointer;
          transition: transform ${designSystem.animation.duration.normal} ${designSystem.animation.easing.spring},
                      box-shadow ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
          box-shadow: ${designSystem.shadows.md};
          transform-style: preserve-3d;
          will-change: transform;
        }

        .product-card-3d:hover {
          box-shadow: ${designSystem.shadows.xl};
        }

        .logo-3d-container {
          position: relative;
          width: 100%;
          height: 45%;
          background: linear-gradient(135deg, 
            ${designSystem.colors.surface.elevated.light} 0%,
            ${designSystem.colors.neutral[50]} 100%
          );
        }

        .product-info {
          position: relative;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .product-name {
          font-family: ${designSystem.typography.fontFamily.persian};
          font-size: ${designSystem.typography.fontSize['2xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.text.primary};
          margin: 0;
          line-height: ${designSystem.typography.lineHeight.tight};
        }

        .product-category {
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          font-weight: ${designSystem.typography.fontWeight.medium};
        }

        .product-pricing {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 8px;
        }

        .original-price {
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.tertiary};
          text-decoration: line-through;
          font-family: ${designSystem.typography.fontFamily.persian};
        }

        .current-price {
          font-size: ${designSystem.typography.fontSize['3xl']};
          font-weight: ${designSystem.typography.fontWeight.bold};
          color: ${designSystem.colors.primary.DEFAULT};
          font-family: ${designSystem.typography.fontFamily.persian};
        }

        .product-duration {
          font-size: ${designSystem.typography.fontSize.sm};
          color: ${designSystem.colors.text.secondary};
          font-family: ${designSystem.typography.fontFamily.persian};
        }

        .purchase-button {
          margin-top: auto;
          width: 100%;
          padding: 12px 24px;
          background: ${designSystem.colors.primary.DEFAULT};
          color: white;
          border: none;
          border-radius: ${designSystem.borderRadius.xl};
          font-size: ${designSystem.typography.fontSize.base};
          font-weight: ${designSystem.typography.fontWeight.semibold};
          font-family: ${designSystem.typography.fontFamily.persian};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          box-shadow: ${designSystem.shadows.sm};
        }

        .purchase-button:hover {
          background: ${designSystem.colors.primary.hover};
          transform: translateY(-2px);
          box-shadow: ${designSystem.shadows.lg};
        }

        .purchase-button:active {
          transform: translateY(0);
          box-shadow: ${designSystem.shadows.sm};
        }

        .glass-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          backdrop-filter: blur(${designSystem.liquidGlass.blur.card});
          -webkit-backdrop-filter: blur(${designSystem.liquidGlass.blur.card});
          opacity: 0;
          transition: opacity ${designSystem.animation.duration.normal} ${designSystem.animation.easing.default};
          pointer-events: none;
          z-index: 1;
        }

        .glass-overlay.visible {
          opacity: 1;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .product-card-3d {
            aspect-ratio: 4 / 5;
          }

          .product-name {
            font-size: ${designSystem.typography.fontSize.xl};
          }

          .current-price {
            font-size: ${designSystem.typography.fontSize['2xl']};
          }
        }
      `}</style>
    </>
  );
};

/**
 * 3D Logo Mesh Component
 */
const LogoMesh: React.FC<{ logoPath: string }> = ({ logoPath }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Slow rotation
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    
    // Breathing scale
    const breathe = 1 + Math.sin(time * 2) * 0.05;
    meshRef.current.scale.setScalar(breathe);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      >
        {/* Logo will be loaded as texture in production */}
        <primitive attach="map" object={createLogoTexture(logoPath)} />
      </meshBasicMaterial>
    </mesh>
  );
};

/**
 * Create logo texture (placeholder for now)
 * In production, this should load actual SVG and render to canvas
 */
const createLogoTexture = (path: string): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Draw gradient circle as placeholder
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, designSystem.colors.primary.DEFAULT);
    gradient.addColorStop(1, designSystem.colors.primary.hover);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(128, 128, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw first letter of path as placeholder text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(path.split('/').pop()?.charAt(0).toUpperCase() || '?', 128, 128);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
};

/**
 * Get category label in Persian
 */
const getCategoryLabel = (category: Product['category']): string => {
  const labels: Record<Product['category'], string> = {
    ai: 'هوش مصنوعی',
    music: 'موسیقی',
    devTools: 'ابزار توسعه',
    design: 'طراحی',
    media: 'رسانه',
    productivity: 'بهره‌وری',
  };
  
  return labels[category] || category;
};

export default Product3DCard;
