import { Product } from "@/lib/api";
import { BRAND_COLOR } from "@/components/BrandLogo";
import { CATEGORY_GRADIENT_CLASS, getCategoryGradientClass } from "@/lib/categoryStyles";

/**
 * Per-product "mesh" gradients — matched exactly to the product card tiles
 * visible in the screenshot (bottom of the store page).
 *
 * Screenshot order (top → bottom):
 *  1. ChatGPT Plus | 1 ماه          → pale blue/white (personal_email, 30 days)
 *  2. Gemini Pro   | 1 سال           → purple → cobalt → teal (personal_email)
 *  3. ChatGPT Plus | 1 ماه و ۷ روز  → blue → sky → white (ready_email, 37 days)
 *  4. ChatGPT Plus اکانت پیش‌ساخته  → pink → amber → violet (ready_email, 30 days)
 */
const PRODUCT_GRADIENT_BY_ID: Record<number, string> = {
  // 1 — ChatGPT Plus 1 month, personal email → very soft blue-white
  1: "bg-gradient-to-br from-[#BFDBFE] via-[#E0F2FE] to-white",

  // 2 — Gemini Pro 1 year, personal email → vivid purple–cobalt–teal
  2: "bg-gradient-to-br from-[#7C3AED] via-[#2563EB] to-[#0D9488]",

  // 3 — ChatGPT Plus 1 month + 7 days, ready email → mid-blue–sky–near-white
  3: "bg-gradient-to-br from-[#3B82F6] via-[#BAE6FD] to-[#F0F9FF]",

  // 4 — ChatGPT Plus pre-made account, ready email → hot pink–amber–soft violet
  4: "bg-gradient-to-br from-[#EC4899] via-[#F59E0B] to-[#8B5CF6]",

  // 5 — Cursor Pro
  5: "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#2563EB]",

  // 6 — Spotify Premium
  6: "bg-gradient-to-br from-[#4ADE80] via-[#22C55E] to-[#15803D]",
};

/**
 * Fallback keyed by `category:activation_type[:duration_days]` so the
 * correct tile is still shown after a DB re-seed changes numeric IDs.
 */
const PRODUCT_GRADIENT_BY_KEY: Record<string, string> = {
  "ChatGPT:personal_email":      PRODUCT_GRADIENT_BY_ID[1],
  "Gemini:personal_email":       PRODUCT_GRADIENT_BY_ID[2],
  "ChatGPT:ready_email:37":      PRODUCT_GRADIENT_BY_ID[3],
  "ChatGPT:ready_email:30":      PRODUCT_GRADIENT_BY_ID[4],
  "Cursor:personal_email":       PRODUCT_GRADIENT_BY_ID[5],
  "Spotify:ready_email":         PRODUCT_GRADIENT_BY_ID[6],
};

export function getProductGradient(product: Product): string {
  // 1. Exact ID match (most stable during development)
  if (PRODUCT_GRADIENT_BY_ID[product.id]) {
    return PRODUCT_GRADIENT_BY_ID[product.id];
  }

  // 2. Duration-aware key
  const fullKey = `${product.category}:${product.activation_type}:${product.duration_days}`;
  if (PRODUCT_GRADIENT_BY_KEY[fullKey]) {
    return PRODUCT_GRADIENT_BY_KEY[fullKey];
  }

  // 3. Simple category:type key
  const simpleKey = `${product.category}:${product.activation_type}`;
  if (PRODUCT_GRADIENT_BY_KEY[simpleKey]) {
    return PRODUCT_GRADIENT_BY_KEY[simpleKey];
  }

  // 4. Category-level fallback
  return (
      CATEGORY_GRADIENT_CLASS[product.category] ??
      getCategoryGradientClass(product.category)
  );
}

const LIGHT_PRODUCT_KEYS = new Set([
  "ChatGPT:personal_email",
  "ChatGPT:ready_email:37",
]);

const LIGHT_GRADIENT_PATTERN =
  /to-white|#F0F9FF|#E0F2FE|#BFDBFE|#BAE6FD/i;

/** Pale product tiles need brand-colored logos instead of white */
export function getProductLogoColor(product: Product): string {
  const fullKey = `${product.category}:${product.activation_type}:${product.duration_days}`;
  const simpleKey = `${product.category}:${product.activation_type}`;

  if (LIGHT_PRODUCT_KEYS.has(fullKey) || LIGHT_PRODUCT_KEYS.has(simpleKey)) {
    return BRAND_COLOR[product.category] ?? "#fff";
  }

  if (LIGHT_GRADIENT_PATTERN.test(getProductGradient(product))) {
    return BRAND_COLOR[product.category] ?? "#fff";
  }

  return "#fff";
}
