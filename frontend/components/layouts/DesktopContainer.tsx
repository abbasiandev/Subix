import { ReactNode } from "react";

interface DesktopContainerProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function DesktopContainer({ children, sidebar }: DesktopContainerProps) {
  return (
    <div className="min-h-screen gradient-mesh flex" dir="rtl">
      {/* Animated Background Orbs - Shared across all desktop pages */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-slow gpu-accelerated" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float-gentle gpu-accelerated" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float-slow gpu-accelerated" style={{ animationDelay: '4s' }} />
      </div>

      {/* Sidebar - appears on right in RTL */}
      <aside className="flex-shrink-0 relative z-10">
        {sidebar}
      </aside>
      
      {/* Main content area */}
      <main className="flex-1 overflow-auto relative z-10">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
