import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  HeadsetIcon,
  ProfileIcon,
  ShoppingBagIcon,
} from "@/components/Icons";

const NAV = [
  { href: "/products", label: "فروشگاه", Icon: ShoppingBagIcon },
  { href: "/dashboard", label: "داشبورد", Icon: DashboardIcon },
  { href: "/contact", label: "تماس با ما", Icon: HeadsetIcon },
  { href: "/profile", label: "پروفایل", Icon: ProfileIcon },
];

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50">
      {/* Glass Bottom Navigation */}
      <div className="glass-strong border-t border-white/20 backdrop-blur-xl">
        <div className="grid grid-cols-4 px-2 pt-2">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex flex-col items-center gap-1 py-3 px-2 rounded-2xl transition-all duration-300
                  ${active 
                    ? "bg-white/20 text-white" 
                    : "text-white/60 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <Icon active={active} />
                <span className="text-[10px] font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
        {/* Safe area for iOS notch */}
        <div className="h-safe-bottom" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </div>
    </nav>
  );
}
