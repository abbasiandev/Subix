import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useLayout } from "@/context/LayoutContext";
import BottomNav from "@/components/BottomNav";
import SidebarNav from "./SidebarNav";
import DesktopContainer from "./DesktopContainer";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isTelegram, isBrowser, isLoading } = useLayout();
  const router = useRouter();

  // Pages that should not have navigation (landing, login, public pages)
  const noLayoutPages = ["/", "/login", "/terms"];
  const isNoLayoutPage = noLayoutPages.includes(router.pathname);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Landing and public pages - no layout
  if (isNoLayoutPage) {
    return <>{children}</>;
  }

  // Telegram Mini App layout (existing)
  if (isTelegram) {
    return (
      <>
        {children}
        <BottomNav />
      </>
    );
  }

  // Desktop browser layout (new)
  if (isBrowser) {
    return (
      <DesktopContainer sidebar={<SidebarNav />}>
        <div className="animate-fade-in">
          {children}
        </div>
      </DesktopContainer>
    );
  }

  // Fallback
  return <>{children}</>;
}
