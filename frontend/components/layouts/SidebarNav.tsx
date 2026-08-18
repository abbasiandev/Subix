import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  HeadsetIcon,
  ProfileIcon,
  ShoppingBagIcon,
} from "@/components/Icons";
import { SubixLogoIcon } from "@/components/Icons";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { href: "/products", label: "فروشگاه", Icon: ShoppingBagIcon },
  { href: "/dashboard", label: "داشبورد", Icon: DashboardIcon },
  { href: "/contact", label: "تماس با ما", Icon: HeadsetIcon },
  { href: "/profile", label: "پروفایل", Icon: ProfileIcon },
];

export default function SidebarNav() {
  const { pathname } = useRouter();
  const { user, photoUrl } = useAuth();

  const displayName = user?.first_name ?? user?.username ?? "کاربر";

  return (
    <div className="w-60 h-screen bg-white border-l border-gray-100 flex flex-col sticky top-0">
      {/* Logo section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <SubixLogoIcon size={40} />
          <span className="text-xl font-bold text-gray-900">سابیکس</span>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-150 cursor-pointer
                    ${
                      active
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon active={active} />
                  <span className="text-sm">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <UserAvatar
            photoUrl={photoUrl}
            name={displayName}
            size="sm"
            shape="circle"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {displayName}
            </p>
            <p className="text-xs text-muted truncate">
              {user?.username ? `@${user.username}` : "کاربر سابیکس"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
