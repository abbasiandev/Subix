// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { loginWithTelegram, setToken, User } from "@/lib/api";

interface AuthCtx {
  user: User | null;
  photoUrl: string | null;
  loading: boolean;
  error: string | null;
  isTelegram: boolean;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  photoUrl: null,
  loading: true,
  error: null,
  isTelegram: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      setIsTelegram(true);
      tg.ready();
      tg.expand();
    }

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
  }, []);

  return (
    <Ctx.Provider value={{ user, photoUrl, loading, error, isTelegram }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
