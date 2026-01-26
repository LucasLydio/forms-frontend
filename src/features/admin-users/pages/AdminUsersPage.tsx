import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useToast } from "@/shared/ui/use-toast";

import { useUsersList, useUpdateUser, useDeleteUser } from "../model/users.queries";
import type { UserRole } from "../model/users.types";
import { UsersTable } from "../ui/UsersTable";

export default function AdminUsersPage() {
  const { toast } = useToast();

  const q = useUsersList();
  const updateM = useUpdateUser();
  const deleteM = useDeleteUser();

  const busy = q.isLoading || updateM.isPending || deleteM.isPending;

  function onChangeRole(id: string, role: UserRole) {
    updateM.mutate(
      { id, dto: { role } },
      {
        onSuccess: () => toast({ title: "Updated", description: "User role updated." }),
        onError: (e) =>
          toast({
            title: "Error",
            description: e instanceof Error ? e.message : "Failed to update role.",
            variant: "destructive",
          }),
      }
    );
  }

  function onDelete(id: string) {
    deleteM.mutate(id, {
      onSuccess: () => toast({ title: "Deleted", description: "User deleted." }),
      onError: (e) =>
        toast({
          title: "Error",
          description: e instanceof Error ? e.message : "Failed to delete user.",
          variant: "destructive",
        }),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Admin-only user management.</CardDescription>
      </CardHeader>

      <CardContent>
        {q.isLoading ? (
          <div className="py-10 text-sm text-muted-foreground">Loading...</div>
        ) : q.isError ? (
          <div className="py-10 text-sm text-muted-foreground">
            {q.error instanceof Error ? q.error.message : "Unknown error"}
          </div>
        ) : (
          <UsersTable users={q.data ?? []} busy={busy} onChangeRole={onChangeRole} onDelete={onDelete} />
        )}
      </CardContent>
    </Card>
  );
}
