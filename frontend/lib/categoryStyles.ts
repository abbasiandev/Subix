export const CATEGORY_TILE_CLASS: Record<string, string> = {
  ChatGPT: "bg-[#10A37F]",
  Gemini: "bg-gradient-to-br from-[#F5C842] via-[#F0A030] to-[#E87830]",
  Cursor: "bg-[#1B2A4A]",
  Spotify: "bg-[#1DB954]",
  Telegram: "bg-[#29B6F6]",
  Discord: "bg-[#7289DA]",
  YouTube: "bg-[#FF0000]",
  SoundCloud: "bg-[#FF5500]",
};

export function getCategoryTileClass(category: string): string {
  return CATEGORY_TILE_CLASS[category] ?? "bg-gray-200";
}
