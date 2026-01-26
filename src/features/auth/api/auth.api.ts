// auth.api.ts
import type { ApiResponse } from "@/shared/lib/api/types";
import { http, request } from "@/shared/lib/api/http";
import type { AuthUser, AuthSession, LoginDTO, RegisterDTO } from "../model/auth.types";
import { setAccessToken } from "@/shared/lib/api/tokenStore";

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
        headers: { "Cache-Control": "no-store" },
        params: { _t: Date.now() },
      })
    );
  },

  async refresh() {
    const r = await request<{ accessToken: string }>(() =>
      http.post<ApiResponse<{ accessToken: string }>>("/auth/refresh")
    );
    setAccessToken(r.accessToken);
    return r;
  },

  logout() {
    return request<void>(() => http.post<ApiResponse<void>>("/auth/logout"));
  },
} as const;
