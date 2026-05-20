import { asset } from "@/lib/assets";

export const CATEGORY_ICON_KEYS: Record<string, string> = {
  ChatGPT: "chatgpt",
  Gemini: "gemini",
  Cursor: "cursor",
  Spotify: "spotify",
  YouTube: "youtube",
  Discord: "discord",
  Telegram: "telegram",
  SoundCloud: "soundcloud",
};

interface Props {
  category: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASS = {
  sm: "w-7 h-7",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export default function CategoryIcon({ category, size = "md", className = "" }: Props) {
  const key = CATEGORY_ICON_KEYS[category];
  if (!key) {
    return (
      <span className={`flex items-center justify-center text-xl ${className}`}>📦</span>
    );
  }

  return (
    <img
      src={asset(`/icons/${key}.svg`)}
      alt={category}
      className={`object-contain ${SIZE_CLASS[size]} ${className}`}
    />
  );
}

export function categoryIconPath(category: string) {
  const key = CATEGORY_ICON_KEYS[category];
  return key ? asset(`/icons/${key}.svg`) : null;
}
