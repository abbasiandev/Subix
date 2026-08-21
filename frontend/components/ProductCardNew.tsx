import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProductIcon, getCategoryColor } from '../data/product-icons';
import { Product } from '../lib/api';

interface ProductCardNewProps {
  product: Product;
  delay?: number;
}

const ProductCardNew: React.FC<ProductCardNewProps> = ({ product, delay = 0 }) => {
  const IconComponent = getProductIcon(product.name, product.category);
  const categoryColor = getCategoryColor(product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group relative h-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden cursor-pointer">
          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}40 0%, transparent 100%)`,
            }}
          />

          {/* Content */}
          <div className="relative p-6 flex flex-col h-full">
            {/* Icon and category badge */}
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-8 h-8">
                  <IconComponent />
                </div>
              </motion.div>

              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
              >
                {product.category}
              </span>
            </div>

            {/* Product name */}
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
              {product.name}
            </h3>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
                {product.description}
              </p>
            )}

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{product.duration_days} روز</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>فعالسازی {product.activation_minutes} دقیقه</span>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">
                  {product.price.toLocaleString('fa-IR')}
                  <span className="text-sm text-gray-400 mr-1">تومان</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(product.price / product.duration_days).toLocaleString('fa-IR')} تومان/روز
                </p>
              </div>

              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                خرید
              </motion.button>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div
                className="absolute inset-0 rounded-3xl blur-xl"
                style={{ 
                  background: `radial-gradient(circle at 50% 50%, ${categoryColor}20 0%, transparent 70%)`,
                }}
              />
            </div>
          </div>

          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
              <div className="h-full w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCardNew;
