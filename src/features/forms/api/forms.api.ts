import type { ApiResponse } from "@/shared/lib/api/types";
import { http, request } from "@/shared/lib/api/http";

import type { CreateFormDTO, Form, FormWithQuestions, UpdateFormDTO } from "../model/forms.types";

export const formsApi = {
  list() {
    return request<Form[]>(() => http.get<ApiResponse<Form[]>>("/forms"));
  },

  create(payload: CreateFormDTO) {
    return request<Form>(() => http.post<ApiResponse<Form>>("/forms", payload));
  },

  getById(id: string) {
    return request<FormWithQuestions>(() => http.get<ApiResponse<FormWithQuestions>>(`/forms/${id}`));
  },

  update(id: string, payload: UpdateFormDTO) {
    return request<Form>(() => http.patch<ApiResponse<Form>>(`/forms/${id}`, payload));
  },

  publish(id: string, isPublished: boolean) {
    return request<Form>(() =>
      http.patch<ApiResponse<Form>>(`/forms/${id}/publish`, { isPublished })
    );
  },

  remove(id: string) {
    return request<void>(() => http.delete<ApiResponse<void>>(`/forms/${id}`));
  },
} as const;
