import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formsApi } from "../api/forms.api";
import type {
  CreateFormDTO,
  Form,
  FormWithQuestions,
  UpdateFormDTO,
  QuestionDTO,
  OptionDTO,
} from "./forms.types";

export const formsKeys = {
  all: ["forms"] as const,
  list: () => [...formsKeys.all, "list"] as const,
  detail: (id: string) => [...formsKeys.all, "detail", id] as const,
};

export function useFormsList(enabled: boolean = true) {
  return useQuery<Form[]>({
    queryKey: formsKeys.list(),
    queryFn: () => formsApi.list(),
    enabled,
  });
}

export function useFormById(id: string) {
  return useQuery<FormWithQuestions>({
    queryKey: formsKeys.detail(id),
    queryFn: () => formsApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateFormDTO) => formsApi.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.list() });
    },
  });
}

export function useUpdateForm(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateFormDTO) => formsApi.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.list() });
      qc.invalidateQueries({ queryKey: formsKeys.detail(id) });
    },
  });
}

export function useDeleteForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => formsApi.deleteForm(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.list() });
    },
  });
}

export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      formsApi.publish(id, isPublished),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.list() });
      // Optionally, also detail(id) if your UI shows publish state on details
    },
  });
}

// ==== Question Management ====

export function useAddQuestion(formId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: QuestionDTO) => formsApi.addQuestion(formId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.detail(formId) });
    },
  });
}

export function useUpdateQuestion(formId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: QuestionDTO) => formsApi.updateQuestion(payload.id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.detail(formId) });
    },
  });
}

export function useDeleteQuestion(formId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (questionId: string) => formsApi.deleteQuestion(questionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.detail(formId) });
    },
  });
}

// ==== Option Management ====

export function useAddOption(formId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: OptionDTO) => formsApi.addOption(formId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.detail(formId) });
    },
  });
}

export function useUpdateOption(formId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: OptionDTO) => formsApi.updateOption(payload.id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.detail(formId) });
    },
  });
}

export function useDeleteOption(formId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (optionId: string) => formsApi.deleteOption(optionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.detail(formId) });
    },
  });
}
