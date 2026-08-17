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
  const [isTelegram, setIsTelegram] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if running in Telegram Mini App context
    // The key is checking if we have actual initData, not just the SDK loaded
    const tg = window.Telegram?.WebApp;
    const hasInitData = !!(tg?.initData && tg.initData.length > 0);
    
    // Debug logging
    console.log('🔍 Layout Detection:', {
      'window.Telegram': !!window.Telegram,
      'window.Telegram.WebApp': !!tg,
      'initData exists': hasInitData,
      'initData length': tg?.initData?.length || 0,
      'Detected as Telegram': hasInitData
    });
    
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
