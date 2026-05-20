export type BrandKey =
  | "ChatGPT"
  | "Gemini"
  | "Cursor"
  | "Spotify"
  | "Telegram"
  | "Discord"
  | "YouTube"
  | "SoundCloud";

interface Props {
  brand: BrandKey | string;
  size?: number;
  className?: string;
}

function ChatGPTLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2a7.5 7.5 0 0 0-5.2 12.7L4.5 20.5l5.8-2.3A7.5 7.5 0 1 0 12 2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function GeminiLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function CursorLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 16.5V7.5l10 4.5-10 4.5z" fill="#FFFFFF" />
    </svg>
  );
}

function SpotifyLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 10.8c3.2-.9 6.7-.7 9.8 1.1"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 13.2c2.6-.7 5.4-.5 7.9.9"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 15.4c1.9-.5 3.9-.4 5.7.6"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TelegramLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.2 11.8l8.8-3.4c.4-.2.8 0 .7.5l-1.5 7c-.1.5-.4.6-.8.4l-2.2-1.6-1.1 1.1c-.1.1-.2.2-.4.2l.2-2.8 4.1-3.7c.2-.2 0-.3-.2-.1l-5.1 3.2-2.2-.7c-.5-.2-.5-.4.1-.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function DiscordLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18.9 5.5A15.7 15.7 0 0 0 15.1 4l-.3.6a14.3 14.3 0 0 0-5.6 0L9 4a15.7 15.7 0 0 0-3.8 1.5C3.6 9.1 2.9 12.6 3.2 16l2.3 1.7c.5-.2 1-.4 1.5-.6l-.4-1.8 1.1.8c.8-.4 1.7-.7 2.6-.9l-.1-1.2 1.1.7c1.8-.3 3.7-.3 5.5 0l1.1-.7-.1 1.2c.9.2 1.8.5 2.6.9l1.1-.8-.4 1.8c.5.2 1 .4 1.5.6L20.8 16c.4-3.8-.4-7.3-1.9-10.5z"
        fill="#FFFFFF"
      />
      <circle cx="9.4" cy="12.8" r="1.2" fill="#FFFFFF" />
      <circle cx="14.6" cy="12.8" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

function YouTubeLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="#FFFFFF" />
    </svg>
  );
}

function SoundCloudLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13.5h1.2v3H4v-3zm1.8 0h1.1v3H5.8v-3zm1.7 0h1v3h-1v-3zm1.6-.4h.9v3.4h-.9v-3.4zm1.5-.6h.8v4h-.8v-4zm1.4-.8h.8v4.8h-.8v-4.8zm1.3-1h.7v5.8h-.7v-5.8zm1.2-1.1h.7v6.9h-.7V10.6zm1.1-1.2h.6v8.1h-.6V9.4zm1-.9h.6v9h-.6v-9zm1-.5h.5v9.5h-.5v-9.5zm1-.2h.5v9.7h-.5v-9.7zm1 0h.5v9.7h-.5v-9.7zm1 .3h.5v9.4h-.5v-9.4zm1 .7h.5v8.7h-.5v-8.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

const LOGOS: Record<string, (props: { size: number }) => JSX.Element> = {
  ChatGPT: ChatGPTLogo,
  Gemini: GeminiLogo,
  Cursor: CursorLogo,
  Spotify: SpotifyLogo,
  Telegram: TelegramLogo,
  Discord: DiscordLogo,
  YouTube: YouTubeLogo,
  SoundCloud: SoundCloudLogo,
};

export default function BrandLogo({ brand, size = 24, className = "" }: Props) {
  const Logo = LOGOS[brand];
  if (!Logo) {
    return (
      <span className={`inline-flex items-center justify-center text-white ${className}`}>
        📦
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Logo size={size} />
    </span>
  );
}
