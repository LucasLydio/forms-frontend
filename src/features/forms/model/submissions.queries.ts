import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { submissionsApi } from "../api/submissions.api";
import type { FormSubmission, StartSubmissionDTO, SubmitAnswersDTO } from "./forms.types";

export const submissionsKeys = {
  all: ["submissions"] as const,
  list: () => [...submissionsKeys.all, "list"] as const,
  detail: (id: string) => [...submissionsKeys.all, "detail", id] as const,
};

export function useSubmissionsListByForm(formId: string) {
  return useQuery<FormSubmission[]>({
    queryKey: submissionsKeys.detail(formId),
    queryFn: () => submissionsApi.listByForm(formId),
  });
}


export function useStartSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: StartSubmissionDTO) => submissionsApi.start(dto.formId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: submissionsKeys.list() });
    },
  });
}

export function useUpsertAnswersBatch() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitAnswersDTO) =>
      submissionsApi.upsertAnswersBatch(input.submissionId, input.answers),

    onSuccess: (submission) => {
      qc.invalidateQueries({ queryKey: submissionsKeys.detail(submission.id) });
    },
  });
}

export function useDeleteSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submissionsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: submissionsKeys.list() });
    },
  });
}
