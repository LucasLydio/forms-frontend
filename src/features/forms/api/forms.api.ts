import type { ApiResponse } from "@/shared/lib/api/types";
import { http, request } from "@/shared/lib/api/http";

import type { OptionDTO, QuestionDTO, CreateFormDTO, Form, FormWithQuestions, UpdateFormDTO } from "../model/forms.types";

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

  addQuestion(id: string, payload: QuestionDTO) {
    return request<QuestionDTO>(() => http.post<ApiResponse<QuestionDTO>>(`/forms/${id}/questions`, payload));
  },

  updateQuestion(id: string, payload: QuestionDTO) {
    return request<QuestionDTO>(() => http.patch<ApiResponse<QuestionDTO>>(`/forms/questions/${id}`, payload));
  },

  addOption(id: string, payload: OptionDTO) {
    return request<OptionDTO>(() => http.post<ApiResponse<OptionDTO>>(`/forms/${id}/options`, payload));
  },

  updateOption(id: string, payload: OptionDTO) {
    return request<OptionDTO>(() => http.patch<ApiResponse<OptionDTO>>(`/forms/options/${id}`, payload));
  },

  deleteQuestion(id: string) {
    return request<void>(() => http.delete<ApiResponse<void>>(`/forms/questions/${id}`));
  },

  deleteOption(id: string) {
    return request<void>(() => http.delete<ApiResponse<void>>(`/forms/options/${id}`));
  },

  update(id: string, payload: UpdateFormDTO) {
    return request<Form>(() => http.patch<ApiResponse<Form>>(`/forms/${id}`, payload));
  },

  publish(id: string, isPublished: boolean) {
    return request<Form>(() =>
      http.patch<ApiResponse<Form>>(`/forms/${id}/publish`, { isPublished })
    );
  },

  deleteForm(id: string) {
    return request<void>(() => http.delete<ApiResponse<void>>(`/forms/${id}`));
  },
} as const;
