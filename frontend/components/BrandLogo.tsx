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
    /** Defaults to white — use brand hex on light product tiles */
    color?: string;
}

const BRAND_COLOR: Record<string, string> = {
    ChatGPT: "#10A37F",
    Gemini: "#4285F4",
    Cursor: "#1E293B",
    Spotify: "#1DB954",
    Telegram: "#229ED9",
    Discord: "#5865F2",
    YouTube: "#FF0000",
    SoundCloud: "#FF5500",
};

// ─── ChatGPT / OpenAI "bloom" logo ───────────────────────────────────────────
// Accurate OpenAI hexagonal-knot logomark, scaled to 24 × 24 viewBox.
function ChatGPTLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                fill={color}
                d="M20.89 9.54a5.83 5.83 0 0 0-.5-4.79 5.9 5.9 0 0 0-6.35-2.83A5.83 5.83 0 0 0 9.65 0a5.9 5.9 0 0 0-5.63 4.09A5.83 5.83 0 0 0 .12 6.92a5.9 5.9 0 0 0 .73 6.93A5.83 5.83 0 0 0 1.35 18.64a5.9 5.9 0 0 0 6.35 2.83A5.83 5.83 0 0 0 12.08 24a5.9 5.9 0 0 0 5.64-4.09A5.83 5.83 0 0 0 21.62 17.08a5.9 5.9 0 0 0-.73-6.93zm-8.96 12.55a4.37 4.37 0 0 1-2.82-1.01l.14-.08 4.67-2.7a.78.78 0 0 0 .39-.67V10.9l1.97 1.14a.07.07 0 0 1 .04.06v5.45a4.41 4.41 0 0 1-4.39 4.54zm-9.44-4.07a4.37 4.37 0 0 1-.52-2.97l.14.08 4.67 2.7a.78.78 0 0 0 .78 0l5.7-3.29v2.28a.07.07 0 0 1-.03.06l-4.72 2.73a4.41 4.41 0 0 1-6.02-1.59zm-1.23-10.2a4.37 4.37 0 0 1 2.28-1.92v5.51a.78.78 0 0 0 .39.67l5.7 3.29-1.97 1.14a.07.07 0 0 1-.07 0L3.8 13.8a4.41 4.41 0 0 1-.54-5.98zm16.22 3.8-5.7-3.3 1.97-1.14a.07.07 0 0 1 .07 0l4.73 2.73a4.41 4.41 0 0 1-.68 7.96v-5.51a.78.78 0 0 0-.39-.74zm1.96-2.98-.14-.08-4.67-2.7a.78.78 0 0 0-.78 0L8.11 9.15V6.87a.07.07 0 0 1 .03-.06l4.72-2.72a4.41 4.41 0 0 1 6.58 4.55zm-12.34 4.06L5.13 11.56a.07.07 0 0 1-.04-.06V6.05a4.41 4.41 0 0 1 7.25-3.39l-.14.08L7.53 5.44a.78.78 0 0 0-.39.67v6.59zm1.07-2.3 2.54-1.47 2.54 1.46v2.93l-2.54 1.47-2.54-1.47z"
            />
        </svg>
    );
}

// ─── Gemini — smooth 4-pointed sparkle star ───────────────────────────────────
// Matches Google Gemini's characteristic 4-point glint shape.
function GeminiLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            {/* Main 4-pointed star via two thin diamond shapes */}
            <path
                fill={color}
                d="M12 2C12 2 13.18 8.18 22 12C13.18 15.82 12 22 12 22C12 22 10.82 15.82 2 12C10.82 8.18 12 2Z"
            />
        </svg>
    );
}

// ─── Cursor — the Cursor IDE bold X logo ─────────────────────────────────────
// Two thick rounded rectangles crossing diagonally at 45°.
function CursorLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect
                x="4" y="10.6" width="16" height="2.8" rx="1.4"
                fill={color}
                transform="rotate(45 12 12)"
            />
            <rect
                x="4" y="10.6" width="16" height="2.8" rx="1.4"
                fill={color}
                transform="rotate(-45 12 12)"
            />
        </svg>
    );
}

// ─── Spotify — three concentric arcs ─────────────────────────────────────────
// Classic Spotify "sound wave" bars, accurately centered.
function SpotifyLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            {/* Top arc — widest */}
            <path
                d="M5.5 10.2c4.2-1.3 8.8-.9 12.6 1.5"
                stroke={color} strokeWidth="1.8" strokeLinecap="round"
            />
            {/* Middle arc */}
            <path
                d="M6.5 13.1c3.3-1 6.9-.7 10 1.1"
                stroke={color} strokeWidth="1.6" strokeLinecap="round"
            />
            {/* Bottom arc — narrowest */}
            <path
                d="M7.5 15.9c2.4-.7 5-.5 7.2.8"
                stroke={color} strokeWidth="1.4" strokeLinecap="round"
            />
        </svg>
    );
}

// ─── Telegram — paper-plane icon ─────────────────────────────────────────────
function TelegramLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M20.67 3.56 3.23 10.31c-1.15.45-1.14 1.07-.21 1.35l4.45 1.39 10.28-6.49c.49-.3.93-.14.57.19l-8.33 7.53-.32 4.7c.47 0 .67-.2.94-.45l2.26-2.2 4.52 3.33c.83.46 1.42.22 1.63-.77l2.95-13.93c.29-1.19-.46-1.73-1.3-1.4z"
                fill={color}
            />
        </svg>
    );
}

// ─── Discord — Wumpus / controller face ──────────────────────────────────────
function DiscordLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M18.93 5.34A16.4 16.4 0 0 0 15.12 4c-.17.3-.37.72-.5 1.04a15.17 15.17 0 0 0-5.25 0C9.24 4.72 9.03 4.3 8.87 4A16.4 16.4 0 0 0 5.06 5.35C2.27 9.49 1.5 13.52 1.89 17.48c1.77 1.3 3.49 2.1 5.18 2.61.42-.56.79-1.16 1.1-1.8a10.7 10.7 0 0 1-1.73-.84l.43-.34a11.7 11.7 0 0 0 10.26 0l.43.34c-.55.33-1.13.62-1.74.84.32.64.69 1.24 1.1 1.8 1.7-.51 3.42-1.31 5.19-2.61.46-4.6-.79-8.59-3.18-12.14zM8.68 15.04c-1.13 0-2.06-1.04-2.06-2.31s.9-2.32 2.06-2.32c1.15 0 2.08 1.04 2.06 2.32 0 1.27-.91 2.31-2.06 2.31zm6.64 0c-1.13 0-2.06-1.04-2.06-2.31s.9-2.32 2.06-2.32c1.15 0 2.08 1.04 2.06 2.32 0 1.27-.9 2.31-2.06 2.31z"
                fill={color}
            />
        </svg>
    );
}

// ─── YouTube — rounded rect + play triangle ───────────────────────────────────
function YouTubeLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            {/* Outer rounded rectangle */}
            <rect x="2" y="6" width="20" height="13" rx="4" fill={color} fillOpacity="0.25" />
            {/* Inner play triangle */}
            <path d="M9.5 8.5v7l6-3.5-6-3.5z" fill={color} />
        </svg>
    );
}

// ─── SoundCloud — layered waveform bars ──────────────────────────────────────
function SoundCloudLogo({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            {/* Waveform — 9 bars of varying height, centered */}
            <g fill={color} rx="1">
                <rect x="3"   y="13" width="1.6" height="4.5" rx="0.8" />
                <rect x="5.2" y="11" width="1.6" height="6.5" rx="0.8" />
                <rect x="7.4" y="9"  width="1.6" height="8.5" rx="0.8" />
                <rect x="9.6" y="7"  width="1.6" height="10.5" rx="0.8" />
                <rect x="11.8" y="5" width="1.6" height="12.5" rx="0.8" />
                <rect x="14"  y="7"  width="1.6" height="10.5" rx="0.8" />
                <rect x="16.2" y="9" width="1.6" height="8.5"  rx="0.8" />
                <rect x="18.4" y="11" width="1.6" height="6.5" rx="0.8" />
            </g>
        </svg>
    );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const LOGOS: Record<string, (props: { size: number; color: string }) => JSX.Element> = {
    ChatGPT: ChatGPTLogo,
    Gemini: GeminiLogo,
    Cursor: CursorLogo,
    Spotify: SpotifyLogo,
    Telegram: TelegramLogo,
    Discord: DiscordLogo,
    YouTube: YouTubeLogo,
    SoundCloud: SoundCloudLogo,
};

export { BRAND_COLOR };

export default function BrandLogo({ brand, size = 24, className = "", color = "#fff" }: Props) {
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
      <Logo size={size} color={color} />
    </span>
    );
}
