import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { emitAuthEvent } from "@/shared/lib/api/authEvents";
import { env } from "@/app/config/env";
import type { ApiError, ApiResponse, ErrorResponse, SuccessResponse } from "./types";
import { getAccessToken, setAccessToken } from "@/shared/lib/api/tokenStore";
import { authApi } from "@/features/auth/api/auth.api";

export const http = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

let refreshing: Promise<void> | null = null;

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const e = error as AxiosError<any>;
    const status = e.response?.status ?? 0;
    const data = e.response?.data;

    const message =
      typeof data?.message === "string"
        ? data.message
        : typeof e.message === "string" && e.message
          ? e.message
          : "Request failed";

    return { status, message, details: data };
  }

  if (error instanceof Error) {
    return { status: 0, message: error.message };
  }

  return { status: 0, message: "Unknown error", details: error };
}

export function unwrap<T>(res: ApiResponse<T>): T {
  if ((res as SuccessResponse<T>).success === true) return (res as SuccessResponse<T>).data;
  const err = res as ErrorResponse;
  throw new Error(err.message || "Request failed");
}

export async function request<T>(fn: () => Promise<{ data: ApiResponse<T> }>): Promise<T> {
  try {
    const res = await fn();
    return unwrap(res.data);
  } catch (err) {
    const apiErr = toApiError(err);
    throw new Error(apiErr.message);
  }
}

async function refreshSession(): Promise<void> {
  const res = await http.post<ApiResponse<{ accessToken: string }>>("/auth/refresh");
  const data = unwrap(res.data); 
  setAccessToken(data.accessToken);
}

http.interceptors.request.use(async (cfg) => {
  let token = getAccessToken();
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }

  return cfg;
});

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      emitAuthEvent("unauthorized");
     
    }
    throw error;
  }
);

// http.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const status = error.response?.status;
//     const cfg = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;


//     if (!cfg) throw error;


//     if (status !== 401 || cfg._retry) throw error;


//     cfg._retry = true;

//     try {
//       // Deduplicate refresh requests
//       refreshing = refreshing ?? refreshSession();
//       await refreshing;
//       refreshing = null;

//       // Retry original request
//       return http.request(cfg);
//     } catch (e) {
//     refreshing = null;
//     emitAuthEvent("unauthorized");
//     throw error; 
//     }
//   }
// );
