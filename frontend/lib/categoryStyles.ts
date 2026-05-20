export const CATEGORY_GRADIENT_CLASS: Record<string, string> = {
  // ── Active categories ──────────────────────────────────────────────────────
  ChatGPT:    "bg-gradient-to-br from-[#0D9488] to-[#14B8A6]",
  // Gemini tile: blue-teal bottom-right, warm gold top-left — matches the
  // multi-hue Google Gemini brand palette visible in the screenshot.
  Gemini:     "bg-gradient-to-br from-[#FBBF24] via-[#60A5FA] to-[#818CF8]",
  Cursor:     "bg-gradient-to-br from-[#0F172A] to-[#1E40AF]",
  Spotify:    "bg-gradient-to-br from-[#22C55E] to-[#15803D]",

  // ── Coming-soon categories (grey overlay applied by IconTile) ──────────────
  Telegram:   "bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9]",
  Discord:    "bg-gradient-to-br from-[#818CF8] to-[#6366F1]",
  YouTube:    "bg-gradient-to-br from-[#F87171] to-[#DC2626]",
  SoundCloud: "bg-gradient-to-br from-[#FB923C] to-[#EA580C]",
};

/** @deprecated use CATEGORY_GRADIENT_CLASS */
export const CATEGORY_TILE_CLASS = CATEGORY_GRADIENT_CLASS;

export function getCategoryGradientClass(category: string): string {
  return (
      CATEGORY_GRADIENT_CLASS[category] ??
      "bg-gradient-to-br from-gray-300 to-gray-400"
  );
}

/** @deprecated use getCategoryGradientClass */
export function getCategoryTileClass(category: string): string {
  return getCategoryGradientClass(category);
}