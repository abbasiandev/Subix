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
  loading: boolean;
  error: string | null;
}

const Ctx = createContext<AuthCtx>({ user: null, loading: true, error: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initData = window.Telegram?.WebApp?.initData;

    if (!initData) {
      // Dev mode: skip auth
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
    <Ctx.Provider value={{ user, loading, error }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
