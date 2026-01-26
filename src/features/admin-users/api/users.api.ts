import type { ApiResponse } from "@/shared/lib/api/types";
import { http, request } from "@/shared/lib/api/http";

import type { UpdateUserDTO, User } from "../model/users.types";

export const usersApi = {
  list() {
    return request<User[]>(() => http.get<ApiResponse<User[]>>("/users"));
  },

  getById(id: string) {
    return request<User>(() => http.get<ApiResponse<User>>(`/users/${id}`));
  },

  update(id: string, payload: UpdateUserDTO) {
    return request<User>(() => http.patch<ApiResponse<User>>(`/users/${id}`, payload));
  },

  remove(id: string) {
    return request<void>(() => http.delete<ApiResponse<void>>(`/users/${id}`));
  },
} as const;
