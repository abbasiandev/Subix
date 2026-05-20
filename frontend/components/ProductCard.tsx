// components/ProductCard.tsx
import { Product } from "@/lib/api";

const CATEGORY_ICONS: Record<string, string> = {
  "ChatGPT": "/icons/chatgpt.svg",
  "Gemini": "/icons/gemini.svg",
  "Spotify": "/icons/spotify.svg",
  "YouTube": "/icons/youtube.svg",
  "Discord": "/icons/discord.svg",
  "Telegram": "/icons/telegram.svg",
  "Cursor": "/icons/cursor.svg",
};

interface Props {
  product: Product;
  onBuy: (product: Product) => void;
}

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

function durationLabel(days: number) {
  if (days === 30) return "۱ ماه";
  if (days === 365) return "۱ سال";
  if (days === 37) return "۱ ماه و ۷ روز";
  return `${days} روز`;
}

export default function ProductCard({ product, onBuy }: Props) {
  const icon = CATEGORY_ICONS[product.category];
  const isComingSoon = false; // set from product.tag if needed

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {icon ? (
          <img src={icon} alt={product.category} className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-gray-900 truncate">
            {product.name}
          </span>
          <span className="badge badge-green">{durationLabel(product.duration_days)}</span>
          {isComingSoon && (
            <span className="badge bg-orange-100 text-orange-600">به زودی</span>
          )}
        </div>
        <p className="text-xs text-muted mt-1 leading-5">
          اختصاصی • فعال‌سازی: {product.activation_minutes} دقیقه
        </p>
        <p className="text-xs text-muted">
          نوع فعال‌سازی: {product.activation_type === "personal_email" ? "ایمیل شخصی" : "ایمیل آماده"}
        </p>
      </div>

      {/* Price + Buy */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-primary font-bold text-sm">
          {formatPrice(product.price)}
        </span>
        <button
          className="btn-primary text-xs py-1.5 px-3"
          onClick={() => onBuy(product)}
        >
          خرید محصول
        </button>
      </div>
    </div>
  );
}
