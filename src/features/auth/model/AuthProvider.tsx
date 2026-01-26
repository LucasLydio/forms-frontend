import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthEvent } from "@/shared/lib/api/authEvents";

import { authApi } from "../api/auth.api";
import type { AuthUser, LoginDTO, RegisterDTO } from "./auth.types";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;

  login: (dto: LoginDTO) => Promise<void>;
  register: (dto: RegisterDTO) => Promise<void>;
  logout: () => Promise<void>;

  
  refresh: () => Promise<void>;
  reloadMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function reloadMe() {
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  }

  // Initial load: fetch /users/me once
useEffect(() => {
  let alive = true;

  (async () => {
    try {
      // If user has a refresh cookie, this restores the access token after reload
      await authApi.refresh().catch(() => {});
      await reloadMe();
    } finally {
      if (alive) setIsLoading(false);
    }
  })();

  return () => {
    alive = false;
  };
}, []);


  // Listen for unauthorized events (refresh failed or hard 401)
  useEffect(() => {
    return onAuthEvent(() => {
      setUser(null);
    });
  }, []);

  async function login(dto: LoginDTO) {
    const me = await authApi.login(dto);
    setUser(me.user);
  }

  async function register(dto: RegisterDTO) {
    const me = await authApi.register(dto);
    setUser(me.user);
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }

  async function refresh() {
    await authApi.refresh();
    await reloadMe();
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, login, register, logout, refresh, reloadMe }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
