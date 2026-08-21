import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  // Just render children directly - no auth, no loading, no layout complexity
  return <>{children}</>;
}
