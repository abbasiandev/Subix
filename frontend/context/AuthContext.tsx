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
}

const Ctx = createContext<AuthCtx>({ user: null, photoUrl: null, loading: true, error: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser?.photo_url) {
      setPhotoUrl(tgUser.photo_url);
    }

    const initData = window.Telegram?.WebApp?.initData;

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
    <Ctx.Provider value={{ user, photoUrl, loading, error }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
