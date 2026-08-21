import React, { useState, useMemo } from 'react';
import { Product } from '@/data/products';
import Product3DCard from './Product3DCard';
import { designSystem } from '@/styles/apple-design-system';

interface ProductGridProps {
  products: Product[];
  onPurchase?: (product: Product) => void;
}

/**
 * Product Grid with responsive layout
 * Displays products in a grid with automatic column adjustment
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onPurchase,
}) => {
  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <Product3DCard
            key={product.id}
            product={product}
            onPurchase={onPurchase}
          />
        ))}
      </div>

      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
          width: 100%;
          padding: 0;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 24px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
};

/**
 * Product Filters Component
 * Category filters and search bar
 */
interface ProductFiltersProps {
  categories: Array<{ value: string; label: string }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <>
      <div className="product-filters">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="جستجوی محصول..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18.5 18.5l-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`category-pill ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .product-filters {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          margin-bottom: 40px;
        }

        .search-container {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .search-input {
          width: 100%;
          padding: 14px 48px 14px 20px;
          font-size: ${designSystem.typography.fontSize.base};
          font-family: ${designSystem.typography.fontFamily.persian};
          border: 2px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.xl};
          background: ${designSystem.colors.surface.light};
          color: ${designSystem.colors.text.primary};
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          direction: rtl;
        }

        .search-input:focus {
          outline: none;
          border-color: ${designSystem.colors.primary.DEFAULT};
          box-shadow: 0 0 0 4px ${designSystem.colors.primary.light};
        }

        .search-input::placeholder {
          color: ${designSystem.colors.text.tertiary};
        }

        .search-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: ${designSystem.colors.text.secondary};
          pointer-events: none;
        }

        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .category-pills::-webkit-scrollbar {
          display: none;
        }

        .category-pill {
          padding: 10px 20px;
          font-size: ${designSystem.typography.fontSize.sm};
          font-weight: ${designSystem.typography.fontWeight.medium};
          font-family: ${designSystem.typography.fontFamily.persian};
          border: 2px solid ${designSystem.colors.neutral[200]};
          border-radius: ${designSystem.borderRadius.full};
          background: ${designSystem.colors.surface.light};
          color: ${designSystem.colors.text.secondary};
          cursor: pointer;
          transition: all ${designSystem.animation.duration.fast} ${designSystem.animation.easing.default};
          white-space: nowrap;
          flex-shrink: 0;
        }

        .category-pill:hover {
          border-color: ${designSystem.colors.primary.DEFAULT};
          color: ${designSystem.colors.primary.DEFAULT};
          transform: translateY(-2px);
        }

        .category-pill.active {
          background: ${designSystem.colors.primary.DEFAULT};
          border-color: ${designSystem.colors.primary.DEFAULT};
          color: white;
          box-shadow: ${designSystem.shadows.glow.primary};
        }

        .category-pill:active {
          transform: translateY(0);
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .product-filters {
            gap: 16px;
            margin-bottom: 32px;
          }

          .search-container {
            max-width: 100%;
          }

          .category-pills {
            gap: 8px;
          }

          .category-pill {
            padding: 8px 16px;
            font-size: ${designSystem.typography.fontSize.xs};
          }
        }
      `}</style>
    </>
  );
};

/**
 * Empty State Component
 */
export const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <>
      <div className="empty-state">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <path
            d="M40 20v20M40 50v2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
        <p className="empty-message">{message}</p>
      </div>

      <style jsx>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          color: ${designSystem.colors.text.tertiary};
        }

        .empty-message {
          margin-top: 24px;
          font-size: ${designSystem.typography.fontSize.lg};
          font-family: ${designSystem.typography.fontFamily.persian};
          color: ${designSystem.colors.text.secondary};
        }
      `}</style>
    </>
  );
};

export default ProductGrid;
