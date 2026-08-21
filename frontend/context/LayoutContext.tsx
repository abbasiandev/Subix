import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface LayoutContextType {
  isTelegram: boolean;
  isBrowser: boolean;
  isLoading: boolean;
}

const LayoutContext = createContext<LayoutContextType>({
  isTelegram: false,
  isBrowser: false,
  isLoading: true,
});

export function LayoutProvider({ children }: { children: ReactNode }) {
  // For SSR/SSG, don't show loading state - assume browser mode
  const [isTelegram, setIsTelegram] = useState(false);
  const [isLoading, setIsLoading] = useState(typeof window === 'undefined' ? false : true);

  useEffect(() => {
    // Check if running in Telegram Mini App context
    // The key is checking if we have actual initData, not just the SDK loaded
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    const tg = window.Telegram?.WebApp;
    const hasInitData = !!(tg?.initData && tg.initData.length > 0);
    
    setIsTelegram(hasInitData);
    setIsLoading(false);
  }, []);

  const isBrowser = !isTelegram && !isLoading;

  return (
    <LayoutContext.Provider value={{ isTelegram, isBrowser, isLoading }}>
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);
