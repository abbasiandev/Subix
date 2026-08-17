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
    const tg = window.Telegram?.WebApp;
    const hasTelegramContext = !!tg;
    
    setIsTelegram(hasTelegramContext);
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
