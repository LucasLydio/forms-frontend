import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { usersApi } from "../api/users.api";
import type { UpdateUserDTO, User } from "./users.types";

export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
  detail: (id: string) => [...usersKeys.all, "detail", id] as const,
};

export function useUsersList() {
  return useQuery<User[]>({
    queryKey: usersKeys.list(),
    queryFn: () => usersApi.list(),
  });
}

export function useUserById(id: string) {
  return useQuery<User>({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDTO }) => usersApi.update(id, dto),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: usersKeys.list() });
      qc.invalidateQueries({ queryKey: usersKeys.detail(updated.id) });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.list() });
    },
  });
}
