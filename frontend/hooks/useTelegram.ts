// hooks/useTelegram.ts
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
  colorScheme: "light" | "dark";
  themeParams: Record<string, string>;
  MainButton: {
    text: string;
    show(): void;
    hide(): void;
    onClick(fn: () => void): void;
  };
  BackButton: {
    show(): void;
    hide(): void;
    onClick(fn: () => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: "light" | "medium" | "heavy"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
  };
}

export function useTelegram() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramWebApp["initDataUnsafe"]["user"] | null>(null);

  useEffect(() => {
    const webapp = window.Telegram?.WebApp;
    if (webapp) {
      webapp.ready();
      webapp.expand();
      setTg(webapp);
      setUser(webapp.initDataUnsafe?.user ?? null);
    }
  }, []);

  return { tg, user };
}
