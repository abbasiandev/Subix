import React from 'react';
import { designSystem } from '@/styles/apple-design-system';

/**
 * Discount Badge Component
 * Displays "تخفیف" badge with animated gradient
 * Positioned at top-right of product cards
 */
export const DiscountBadge: React.FC = () => {
  return (
    <>
      <div className="discount-badge">
        تخفیف
      </div>
      
      <style jsx>{`
        .discount-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, 
            ${designSystem.colors.discount.from} 0%, 
            ${designSystem.colors.discount.to} 100%
          );
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          box-shadow: ${designSystem.shadows.glow.discount};
          z-index: 10;
          animation: pulse-subtle 2s ease-in-out infinite;
          letter-spacing: 0.5px;
        }

        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        /* Hover effect on parent */
        .discount-badge:hover {
          animation-play-state: paused;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default DiscountBadge;
