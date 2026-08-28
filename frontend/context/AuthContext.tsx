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
  const [loading, setLoading] = useState(typeof window === 'undefined' ? false : true);
  const [error, setError] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Restore token from localStorage if present
    const savedToken = localStorage.getItem("subix_token");
    if (savedToken) {
      setToken(savedToken);
    }

    const tg = window.Telegram?.WebApp;
    const hasTelegramContext = !!(tg?.initData && tg.initData.length > 0);
    setIsTelegram(hasTelegramContext);

    const timeoutId = setTimeout(() => {
      setLoading(false);
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
          setToken(res.access_token);
          localStorage.setItem("subix_token", res.access_token);
          setUser(res.user);
        })
        .catch((e) => {
          console.error('Telegram login failed:', e);
          setError(e.message);
        })
        .finally(() => {
          clearTimeout(timeoutId);
          setLoading(false);
        });
    } else {
      // Desktop / Phone browser flow
      getMe()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // If token was invalid, clear it
          if (savedToken) {
            localStorage.removeItem("subix_token");
            setToken("");
          }
        })
        .finally(() => {
          clearTimeout(timeoutId);
          setLoading(false);
        });
    }

    return () => clearTimeout(timeoutId);
  }, []);

  const loginWithPhone = async (phoneNumber: string, code: string): Promise<User> => {
    setError(null);
    try {
      const res = await verifyOtp(phoneNumber, code);
      setToken(res.access_token);
      localStorage.setItem("subix_token", res.access_token);
      setUser(res.user);
      return res.user;
    } catch (err: any) {
      const msg = err.message || "کد تایید وارد شده نادرست است.";
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      // Silent error
    } finally {
      localStorage.removeItem("subix_token");
      setToken("");
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
