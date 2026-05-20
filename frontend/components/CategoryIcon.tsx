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
  /** color = brand img icon; white = inline SVG for colored tiles (Telegram-safe) */
  variant?: "color" | "white";
  className?: string;
}

const SIZE_PX = { sm: 28, md: 40, lg: 48 };

function WhiteIcon({ category, size }: { category: string; size: number }) {
  switch (category) {
    case "ChatGPT":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2a7.5 7.5 0 0 0-5.2 12.7L4.5 20.5l5.8-2.3A7.5 7.5 0 1 0 12 2z"
            fill="white"
          />
        </svg>
      );
    case "Gemini":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2z"
            fill="white"
          />
        </svg>
      );
    case "Cursor":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 16.5V7.5l10 4.5-10 4.5z" fill="white" />
        </svg>
      );
    case "Spotify":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7.5 10.8c3.2-.9 6.7-.7 9.8 1.1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 13.2c2.6-.7 5.4-.5 7.9.9" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8.5 15.4c1.9-.5 3.9-.4 5.7.6" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "Telegram":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7.2 11.8l8.8-3.4c.4-.2.8 0 .7.5l-1.5 7c-.1.5-.4.6-.8.4l-2.2-1.6-1.1 1.1c-.1.1-.2.2-.4.2l.2-2.8 4.1-3.7c.2-.2 0-.3-.2-.1l-5.1 3.2-2.2-.7c-.5-.2-.5-.4.1-.6z"
            fill="white"
          />
        </svg>
      );
    case "Discord":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8.5 10.5c1.2-.9 2.8-1.4 4.5-1.4s3.3.5 4.5 1.4c-.4 1.3-1.1 2.5-2 3.5-.9-.4-1.9-.6-2.9-.6s-2 .2-2.9.6c-.9-1-1.6-2.2-2-3.5z"
            fill="white"
          />
          <circle cx="9.4" cy="12.8" r="1.2" fill="white" />
          <circle cx="14.6" cy="12.8" r="1.2" fill="white" />
        </svg>
      );
    case "YouTube":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M10 9.5v5l5-2.5-5-2.5z" fill="white" />
        </svg>
      );
    case "SoundCloud":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 13.5h1.2v3H4v-3zm1.8 0h1.1v3H5.8v-3zm1.7 0h1v3h-1v-3zm1.6-.4h.9v3.4h-.9v-3.4zm1.5-.6h.8v4h-.8v-4zm1.4-.8h.8v4.8h-.8v-4.8zm1.3-1h.7v5.8h-.7v-5.8zm1.2-1.1h.7v6.9h-.7V9.4zm1-.9h.6v9h-.6v-9z"
            fill="white"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function CategoryIcon({
  category,
  size = "md",
  variant = "color",
  className = "",
}: Props) {
  const key = CATEGORY_ICON_KEYS[category];
  const px = SIZE_PX[size];

  if (!key) {
    return (
      <span className={`flex items-center justify-center text-xl ${className}`}>📦</span>
    );
  }

  if (variant === "white") {
    const icon = WhiteIcon({ category, size: px });
    if (!icon) {
      return (
        <span className={`flex items-center justify-center text-xl ${className}`}>📦</span>
      );
    }
    return <span className={`inline-flex ${className}`}>{icon}</span>;
  }

  return (
    <img
      src={asset(`/icons/${key}.svg`)}
      alt={category}
      width={px}
      height={px}
      className={`object-contain ${className}`}
    />
  );
}

export function categoryIconPath(category: string) {
  const key = CATEGORY_ICON_KEYS[category];
  return key ? asset(`/icons/${key}.svg`) : null;
}
