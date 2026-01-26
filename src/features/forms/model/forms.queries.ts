import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { formsApi } from "../api/forms.api";
import type { CreateFormDTO, Form, FormWithQuestions, UpdateFormDTO } from "./forms.types";

export const formsKeys = {
  all: ["forms"] as const,
  list: () => [...formsKeys.all, "list"] as const,
  detail: (id: string) => [...formsKeys.all, "detail", id] as const,
};

export function useFormsList(enabled: boolean) {
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

export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      formsApi.publish(id, isPublished),
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
    mutationFn: (id: string) => formsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: formsKeys.list() });
    },
  });
}
