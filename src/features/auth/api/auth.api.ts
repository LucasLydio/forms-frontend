// auth.api.ts
import type { ApiResponse } from "@/shared/lib/api/types";
import { http, request } from "@/shared/lib/api/http";
import type { AuthUser, AuthSession, LoginDTO, RegisterDTO } from "../model/auth.types";
import { getAccessToken, setAccessToken } from "@/shared/lib/api/tokenStore";

let refreshingPromise: Promise<void> | null = null;

export const authApi = {
  async login(dto: LoginDTO) {
    const s = await request<AuthSession>(() => http.post<ApiResponse<AuthSession>>("/auth/login", dto));
    setAccessToken(s.accessToken);
    return s;
  },

  async register(dto: RegisterDTO) {
    const s = await request<AuthSession>(() => http.post<ApiResponse<AuthSession>>("/auth/register", dto));
    setAccessToken(s.accessToken);
    return s;
  },
  
  me() {
    return request<AuthUser>(() =>
      http.get<ApiResponse<AuthUser>>("/users/me", {
        headers: { "Cache-Control": "store" },
        params: { _t: Date.now() },
      })
    );
  },

  async refresh() {
    
    if (refreshingPromise) return refreshingPromise;

    refreshingPromise = (async () => {
      try {
        const r = await request<{ accessToken: string }>(() =>
          http.post<ApiResponse<{ accessToken: string }>>("/auth/refresh")
        );
        setAccessToken(r.accessToken);
        return;
      } finally {
        refreshingPromise = null;
      }
    })();

    return refreshingPromise;
  },

  logout() {
    return request<void>(() => http.post<ApiResponse<void>>("/auth/logout"));
  },
} as const;
