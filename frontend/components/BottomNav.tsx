// components/BottomNav.tsx
import Link from "next/link";
import { useRouter } from "next/router";

const NAV = [
  {
    href: "/",
    label: "فروشگاه",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="3" y1="6" x2="21" y2="6"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M16 10a4 4 0 01-8 0"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard",
    label: "داشبورد",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="3" y="3" width="7" height="7" rx="1"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
        />
        <rect
          x="14" y="3" width="7" height="7" rx="1"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
        />
        <rect
          x="3" y="14" width="7" height="7" rx="1"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
        />
        <rect
          x="14" y="14" width="7" height="7" rx="1"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "تماس با ما",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="1" fill={active ? "#2DC572" : "#9CA3AF"} />
        <circle cx="8"  cy="10" r="1" fill={active ? "#2DC572" : "#9CA3AF"} />
        <circle cx="16" cy="10" r="1" fill={active ? "#2DC572" : "#9CA3AF"} />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "پروفایل",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="8" r="4"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
        />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? "#2DC572" : "#9CA3AF"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {active && (
          <circle cx="12" cy="8" r="4" fill="#E8F8F0" />
        )}
      </svg>
    ),
  },
];

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-50">
      <div className="grid grid-cols-4">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item${active ? " active" : ""}`}
            >
              {item.icon(active)}
              <span className="text-[11px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* iOS safe area */}
      <div className="h-safe-bottom" style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
