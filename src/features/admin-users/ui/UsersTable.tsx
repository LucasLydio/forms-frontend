import React from "react";

import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

import type { User, UserRole } from "../model/users.types";

type Props = {
  users: User[];
  busy?: boolean;
  onChangeRole: (id: string, role: UserRole) => void;
  onDelete: (id: string) => void;
};

export function UsersTable({ users, busy, onChangeRole, onDelete }: Props) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[220px]">Name</TableHead>
            <TableHead className="min-w-[240px]">Email</TableHead>
            <TableHead className="min-w-[120px]">Provider</TableHead>
            <TableHead className="min-w-[160px]">Role</TableHead>
            <TableHead className="text-right min-w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell className="text-muted-foreground">{u.provider}</TableCell>

              <TableCell>
                <Select
                  value={u.role}
                  onValueChange={(v) => onChangeRole(u.id, v as UserRole)}
                  disabled={busy}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="creator">creator</SelectItem>
                    <SelectItem value="common">common</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(u.id)}
                  disabled={busy}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-6">
                No users found.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
