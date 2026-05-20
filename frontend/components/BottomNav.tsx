import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  HeadsetIcon,
  ProfileIcon,
  ShoppingBagIcon,
} from "@/components/Icons";

const NAV = [
  { href: "/", label: "فروشگاه", Icon: ShoppingBagIcon },
  { href: "/dashboard", label: "داشبورد", Icon: DashboardIcon },
  { href: "/contact", label: "تماس با ما", Icon: HeadsetIcon },
  { href: "/profile", label: "پروفایل", Icon: ProfileIcon },
];

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-50">
      <div className="grid grid-cols-4">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`bottom-nav-item${active ? " active" : ""}`}
            >
              <Icon active={active} />
              <span className="text-[11px]">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-bottom" style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
