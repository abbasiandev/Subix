import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export function useRequireAuth() {
  const { user, loading, isTelegram } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect browser users (not Telegram Mini App)
    if (!loading && !user && !isTelegram) {
      router.push("/login");
    }
  }, [user, loading, isTelegram, router]);

  return { user, loading };
}
