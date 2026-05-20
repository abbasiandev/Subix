import { Product } from "@/lib/api";
import CategoryIcon from "@/components/CategoryIcon";

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
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
      <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <CategoryIcon category={product.category} size="md" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-gray-900 truncate">
            {product.name}
          </span>
          <span className="badge badge-green">{durationLabel(product.duration_days)}</span>
        </div>
        <p className="text-xs text-muted mt-1 leading-5">
          اختصاصی • فعال‌سازی: {product.activation_minutes} دقیقه
        </p>
        <p className="text-xs text-muted">
          نوع فعال‌سازی: {product.activation_type === "personal_email" ? "ایمیل شخصی" : "ایمیل آماده"}
        </p>
      </div>

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
