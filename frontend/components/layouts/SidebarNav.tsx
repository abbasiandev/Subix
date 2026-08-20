import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  HeadsetIcon,
  ProfileIcon,
  ShoppingBagIcon,
  BlogIcon,
} from "@/components/Icons";
import { SubixLogoIcon } from "@/components/Icons";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { href: "/products", label: "فروشگاه", Icon: ShoppingBagIcon },
  { href: "/dashboard", label: "داشبورد", Icon: DashboardIcon },
  { href: "/blog", label: "بلاگ", Icon: BlogIcon },
  { href: "/contact", label: "تماس با ما", Icon: HeadsetIcon },
  { href: "/profile", label: "پروفایل", Icon: ProfileIcon },
];

export default function SidebarNav() {
  const { pathname } = useRouter();
  const { user, photoUrl } = useAuth();

  const displayName = user?.first_name ?? user?.username ?? "کاربر";

  return (
    <div className="w-72 h-screen flex flex-col sticky top-0 p-4">
      {/* Glass Sidebar Container */}
      <div className="glass-medium border border-white/20 rounded-3xl h-full flex flex-col overflow-hidden">
        
        {/* Logo section */}
        <div className="p-6 border-b border-white/20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="transform group-hover:scale-110 transition-transform">
              <SubixLogoIcon size={48} />
            </div>
            <span className="text-2xl font-black text-white">سابیکس</span>
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {NAV_ITEMS.map(({ href, label, Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-2xl
                      transition-all duration-300 cursor-pointer group
                      ${
                        active
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <div className={`transform transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                      <Icon active={active} />
                    </div>
                    <span className="text-sm font-bold">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/20">
          <Link href="/profile" className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-white/10 transition-all">
            <UserAvatar
              photoUrl={photoUrl}
              name={displayName}
              size="sm"
              shape="circle"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {displayName}
              </p>
              <p className="text-xs text-white/70 truncate">
                {user?.username ? `@${user.username}` : "کاربر سابیکس"}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
