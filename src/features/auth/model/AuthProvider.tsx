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
      console.log('teste22')
      if (user) {
      console.log('user')
        return setUser(user)
      }
      const me = await authApi.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  }

  async function refresh() {
    await authApi.refresh();
    await reloadMe();
  }

 
  useEffect(() => {
    let alive = true;

    async function boot() {
      try {
        await refresh();
      } catch {
        setUser(null);
      } finally {
        if (alive) setIsLoading(false);
      }
    }
    boot();

    return () => { alive = false; };
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
