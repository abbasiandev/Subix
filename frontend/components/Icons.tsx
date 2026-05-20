interface IconProps {
  className?: string;
  color?: string;
  size?: number;
}

const INACTIVE = "#9CA3AF";
const ACTIVE = "#00B894";

export function WalletIcon({ color = "white", size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M17 12h.01"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M3 9h18"
        stroke={color}
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function BellIcon({ color = "#374151", size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 01-3.46 0"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ color = "white", size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ color = "#00B894", size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TelegramIcon({ color = "white", size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 7.5a2.25 2.25 0 00.023 4.114l3.8 1.498 1.497 4.743a1.125 1.125 0 001.873.398l2.396-2.4 4.052 3.044a2.25 2.25 0 003.497-1.378l2.7-13.5a2.25 2.25 0 00-2.316-2.234z"
        fill={color}
      />
    </svg>
  );
}

export function SubixLogoIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 7v10l8 5 8-5V7L12 2zm0 3.2l5.5 3.4v6.8L12 18.8 6.5 15.4V8.6L12 5.2z" />
      <path d="M10 11h4v2h-4z" />
    </svg>
  );
}

export function HeadsetIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? ACTIVE : INACTIVE;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12v4a2 2 0 002 2h1v-6H5a1 1 0 00-1 1zM20 12v4a2 2 0 01-2 2h-1v-6h2a1 1 0 011 1z"
        fill={color}
      />
      <path
        d="M4 14a8 8 0 0116 0v2a4 4 0 01-4 4h-1"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 20v2M8 20h8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShoppingBagIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? ACTIVE : INACTIVE;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M3 6h18"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DashboardIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? ACTIVE : INACTIVE;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

export function ProfileIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? ACTIVE : INACTIVE;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
