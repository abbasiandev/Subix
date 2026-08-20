import { Product } from '@/lib/api';
import GlassContainer from './GlassContainer';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  delay?: number;
}

// Category icon mapping
const getCategoryIcon = (category: string) => {
  const icons: Record<string, JSX.Element> = {
    ChatGPT: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    Gemini: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    Cursor: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    Spotify: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    Claude: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  };

  return icons[category] || icons.ChatGPT;
};

// Category color mapping
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    ChatGPT: 'from-emerald-500 to-teal-500',
    Gemini: 'from-blue-500 to-purple-500',
    Cursor: 'from-indigo-500 to-cyan-500',
    Spotify: 'from-green-500 to-emerald-500',
    Claude: 'from-amber-500 to-orange-500',
  };

  return colors[category] || 'from-teal-500 to-cyan-500';
};

export default function ProductCard({ product, onClick, delay = 0 }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  const formatDuration = (days: number) => {
    if (days >= 365) {
      const years = Math.floor(days / 365);
      return `${years} سال`;
    }
    if (days >= 30) {
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      return remainingDays > 0 ? `${months} ماه و ${remainingDays} روز` : `${months} ماه`;
    }
    return `${days} روز`;
  };

  const categoryGradient = getCategoryColor(product.category);

  return (
    <GlassContainer
      elevation="light"
      hover
      animated
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
      className={`
        rounded-3xl p-6 cursor-pointer group
        transform-3d border-gradient
        animate-fade-up
        focus:outline-none focus:ring-4 focus:ring-white/40
        ${delay > 0 ? `stagger-${Math.min(delay, 8)}` : ''}
      `}
      style={{ animationDelay: delay > 8 ? `${delay * 0.1}s` : undefined }}
    >
      {/* Icon Container with Gradient */}
      <div className="mb-4 flex items-start justify-between">
        <div className={`
          w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryGradient}
          flex items-center justify-center
          shadow-lg
          transform transition-transform duration-300 ease-spring
          group-hover:scale-110 group-hover:rotate-3
        `} aria-hidden="true">
          {getCategoryIcon(product.category)}
        </div>

        {/* Category Badge */}
        <span className="
          px-3 py-1.5 rounded-full text-xs font-semibold
          bg-white/20 backdrop-blur-sm border border-white/30
          text-white shadow-sm
        ">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-white mb-2 leading-snug">
        {product.name}
      </h3>

      {/* Description */}
      {product.description && (
        <p className="text-sm text-white/80 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
        {/* Price */}
        <div>
          <p className="text-xs text-white/60 mb-1">قیمت</p>
          <p className="text-xl font-black text-white">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Duration */}
        <div className="text-left">
          <p className="text-xs text-white/60 mb-1">مدت زمان</p>
          <p className="text-sm font-bold text-white">
            {formatDuration(product.duration_days)}
          </p>
        </div>
      </div>

      {/* Activation Type Badge (if relevant) */}
      {product.activation_type === 'personal_email' && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>ایمیل اختصاصی</span>
        </div>
      )}

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </GlassContainer>
  );
}
