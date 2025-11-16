"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProp {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProp) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const getUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) setAuth(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    };
    void getUser();
  }, [setAuth, clearAuth]);

  return children;
};

export default AuthProvider;
