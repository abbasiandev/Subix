import { Product } from "@/lib/api";
import { CATEGORY_GRADIENT_CLASS, getCategoryGradientClass } from "@/lib/categoryStyles";

/** Per-product mesh gradients — tuned to mockup */
const PRODUCT_GRADIENT_BY_ID: Record<number, string> = {
  // ChatGPT Plus | 1 month — soft blue → white
  1: "bg-gradient-to-br from-[#BFDBFE] via-[#E0F2FE] to-white",
  // Gemini Pro | 1 year — purple → blue → teal
  2: "bg-gradient-to-br from-[#C084FC] via-[#60A5FA] to-[#2DD4BF]",
  // ChatGPT Plus | 1 month + 7 days
  3: "bg-gradient-to-br from-[#93C5FD] via-[#DBEAFE] to-[#F0F9FF]",
  // Pre-made ChatGPT Plus — pink → orange → purple
  4: "bg-gradient-to-br from-[#F472B6] via-[#FB923C] to-[#A78BFA]",
  // Cursor Pro
  5: "bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#2563EB]",
  // Spotify Premium
  6: "bg-gradient-to-br from-[#4ADE80] via-[#22C55E] to-[#15803D]",
};

/** Fallback by category + activation type when product id unknown after re-seed */
const PRODUCT_GRADIENT_BY_KEY: Record<string, string> = {
  "ChatGPT:personal_email": PRODUCT_GRADIENT_BY_ID[1],
  "Gemini:personal_email": PRODUCT_GRADIENT_BY_ID[2],
  "ChatGPT:ready_email:37": PRODUCT_GRADIENT_BY_ID[3],
  "ChatGPT:ready_email:30": PRODUCT_GRADIENT_BY_ID[4],
  "Cursor:personal_email": PRODUCT_GRADIENT_BY_ID[5],
  "Spotify:ready_email": PRODUCT_GRADIENT_BY_ID[6],
};

export function getProductGradient(product: Product): string {
  if (PRODUCT_GRADIENT_BY_ID[product.id]) {
    return PRODUCT_GRADIENT_BY_ID[product.id];
  }

  const key = `${product.category}:${product.activation_type}:${product.duration_days}`;
  if (key === "ChatGPT:ready_email:30") {
    return PRODUCT_GRADIENT_BY_KEY["ChatGPT:ready_email:30"];
  }
  if (key === "ChatGPT:ready_email:37") {
    return PRODUCT_GRADIENT_BY_KEY["ChatGPT:ready_email:37"];
  }

  const simpleKey = `${product.category}:${product.activation_type}`;
  if (PRODUCT_GRADIENT_BY_KEY[simpleKey]) {
    return PRODUCT_GRADIENT_BY_KEY[simpleKey];
  }

  return (
    CATEGORY_GRADIENT_CLASS[product.category] ??
    getCategoryGradientClass(product.category)
  );
}
