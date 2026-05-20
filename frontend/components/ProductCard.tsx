import { Product } from "@/lib/api";
import IconTile from "@/components/IconTile";
import { getProductGradient, getProductLogoColor } from "@/lib/productIconStyles";

interface Props {
  product: Product;
  onBuy: (product: Product) => void;
}

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

export default function ProductCard({ product, onBuy }: Props) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
      <IconTile
        brand={product.category}
        gradient={getProductGradient(product)}
        logoColor={getProductLogoColor(product)}
        size="lg"
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 leading-5 mb-1">
          {product.name}
        </p>
        <p className="text-xs text-muted leading-5">
          اختصاصی • فعال‌سازی: {product.activation_minutes} دقیقه
        </p>
        <p className="text-xs text-muted">
          نوع فعال‌سازی:{" "}
          {product.activation_type === "personal_email" ? "ایمیل شخصی" : "ایمیل آماده"}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="price-pill">{formatPrice(product.price)}</span>
        <button
          className="bg-primary text-white text-xs font-semibold rounded-xl py-2 px-3 active:scale-95 transition-transform"
          onClick={() => onBuy(product)}
        >
          خرید محصول
        </button>
      </div>
    </div>
  );
}
