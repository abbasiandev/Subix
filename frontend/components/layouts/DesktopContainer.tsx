import { ReactNode } from "react";

interface DesktopContainerProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function DesktopContainer({ children, sidebar }: DesktopContainerProps) {
  return (
    <div className="min-h-screen bg-white flex" dir="rtl">
      {/* Sidebar - appears on right in RTL */}
      <aside className="flex-shrink-0">
        {sidebar}
      </aside>
      
      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
