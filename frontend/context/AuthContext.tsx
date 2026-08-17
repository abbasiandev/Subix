// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { loginWithTelegram, setToken, getMe, logout as apiLogout, User } from "@/lib/api";

interface AuthCtx {
  user: User | null;
  photoUrl: string | null;
  loading: boolean;
  error: string | null;
  isTelegram: boolean;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  photoUrl: null,
  loading: true,
  error: null,
  isTelegram: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const tg = window.Telegram?.WebApp;
    const hasTelegramContext = !!(tg?.initData && tg.initData.length > 0);
    setIsTelegram(hasTelegramContext);

    if (hasTelegramContext) {
      // Telegram Mini App flow (existing)
      tg.ready();
      tg.expand();

      const tgUser = tg?.initDataUnsafe?.user;
      if (tgUser?.photo_url) {
        setPhotoUrl(tgUser.photo_url);
      }

      const initData = tg?.initData;
      if (!initData) {
        setLoading(false);
        return;
      }

      loginWithTelegram(initData)
        .then((res) => {
          setToken(res.access_token);
          setUser(res.user);
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    } else {
      // Desktop browser flow (new)
      // Session cookie is sent automatically with fetch (credentials: "include")
      // Try to fetch current user
      getMe()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // Not authenticated - will be handled by route protection
          // Don't redirect if on public pages (landing, login, terms)
          const publicPages = ["/", "/login", "/terms", "/contact"];
          if (!publicPages.includes(router.pathname)) {
            router.push("/login");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [router]);

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      setToken("");
      router.push("/login");
    } catch (e) {
      // Silent error - logout locally anyway
      setUser(null);
      setToken("");
      router.push("/login");
    }
  };

  return (
    <Ctx.Provider value={{ user, photoUrl, loading, error, isTelegram, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
