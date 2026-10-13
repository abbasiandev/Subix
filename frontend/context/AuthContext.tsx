// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import {
  loginWithTelegram,
  verifyOtp,
  setToken,
  getToken,
  getMe,
  logout as apiLogout,
  User,
} from "@/lib/api";

interface AuthCtx {
  user: User | null;
  photoUrl: string | null;
  loading: boolean;
  error: string | null;
  isTelegram: boolean;
  loginWithPhone: (phoneNumber: string, code: string) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  photoUrl: null,
  loading: true,
  error: null,
  isTelegram: false,
  loginWithPhone: async () => { throw new Error("Not implemented"); },
  logout: async () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const router = useRouter();

  const readSavedToken = () => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem("subix_token");
    } catch {
      return null;
    }
  };

  const saveToken = (token: string) => {
    setToken(token);
    if (typeof window === "undefined") return;
    try {
      if (token) window.localStorage.setItem("subix_token", token);
      else window.localStorage.removeItem("subix_token");
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Restore token from localStorage if present
    let mounted = true;
    const savedToken = readSavedToken();
    if (savedToken) {
      setToken(savedToken);
    }

    const tg = window.Telegram?.WebApp;
    const hasTelegramContext = !!(tg?.initData && tg.initData.length > 0);
    setIsTelegram(hasTelegramContext);

    const timeoutId = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 6000);

    if (hasTelegramContext) {
      // Telegram Mini App flow
      tg.ready();
      tg.expand();

      const tgUser = tg?.initDataUnsafe?.user;
      if (tgUser?.photo_url) {
        setPhotoUrl(tgUser.photo_url);
      }

      const initData = tg?.initData;
      if (!initData) {
        clearTimeout(timeoutId);
        setLoading(false);
        return;
      }

        loginWithTelegram(initData)
        .then((res) => {
          if (!mounted) return;
          saveToken(res.access_token);
          setUser(res.user);
        })
        .catch((e) => {
          console.error('Telegram login failed:', e);
          if (mounted) setError(e.message);
        })
        .finally(() => {
          clearTimeout(timeoutId);
          if (mounted) setLoading(false);
        });
    } else if (savedToken) {
      // Desktop / Phone browser flow
      getMe()
        .then((userData) => {
          if (mounted && getToken() === savedToken) setUser(userData);
        })
        .catch(() => {
          // Do not clear a token issued by a completed login while this restore is in flight.
          if (mounted && getToken() === savedToken) {
            saveToken("");
            setUser(null);
          }
        })
        .finally(() => {
          clearTimeout(timeoutId);
          if (mounted) setLoading(false);
        });
    } else {
      // Anonymous visits do not need a network request.
      clearTimeout(timeoutId);
      setLoading(false);
    }

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const loginWithPhone = async (phoneNumber: string, code: string): Promise<User> => {
    setError(null);
    try {
      const res = await verifyOtp(phoneNumber, code);
      saveToken(res.access_token);
      setUser(res.user);
      return res.user;
    } catch (err: any) {
      const msg = err.message || "کد تایید وارد شده نادرست است.";
      setError(msg);
      throw err instanceof Error ? err : new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      // Silent error
    } finally {
      saveToken("");
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <Ctx.Provider value={{ user, photoUrl, loading, error, isTelegram, loginWithPhone, logout, setUser }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
