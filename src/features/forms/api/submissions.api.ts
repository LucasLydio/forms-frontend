import type { ApiResponse, SuccessResponse } from "@/shared/lib/api/types";
import { http, request } from "@/shared/lib/api/http";

import type { FormSubmission, UpsertAnswersDTO } from "../model/forms.types";

export const submissionsApi = {
  
  listByForm(formId: string) {
    return request<FormSubmission[]>(() => http.get<ApiResponse<FormSubmission[]>>(`/forms/${formId}/submissions`));
  },

  start(formId: string) {
    return request<FormSubmission>(() => http.post<ApiResponse<FormSubmission>>(`/forms/${formId}/submissions/start`));
  },

  upsertAnswersBatch(submissionId: string, payload: UpsertAnswersDTO[]) {
    return request<FormSubmission>(() =>
      http.patch<SuccessResponse<FormSubmission>>(
        `/submissions/${submissionId}/answers/batch`,
        payload
      )
    );
  },

  submit(submissionId: string) {
    return request<FormSubmission>(() => http.post<ApiResponse<FormSubmission>>(`/submissions/${submissionId}/submit`));
  },

  getById(id: string) {
    return request<FormSubmission>(() => http.get<ApiResponse<FormSubmission>>(`/submissions/${id}`));
  },

  remove(id: string) {
    return request<void>(() => http.delete<ApiResponse<void>>(`/submissions/${id}`));
  },
} as const;
