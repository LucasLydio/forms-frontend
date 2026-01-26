import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useToast } from "@/shared/ui/use-toast";

import { useAuth } from "@/features/auth/model/AuthProvider";
import { useCreateForm } from "../model/forms.queries";
import type { CreateFormDTO } from "../model/forms.types";
import { FormCreateCard } from "../ui/FormCreateCard";

export default function FormBuilderPage() {
  const { user } = useAuth();
  const canManage = user?.role === "admin" || user?.role === "creator";

  const navigate = useNavigate();
  const { toast } = useToast();

  const createM = useCreateForm();

  useEffect(() => {
    if (!canManage) {
      navigate("/forms", { replace: true });
    }
  }, [canManage, navigate]);

  function onCreate(dto: CreateFormDTO) {
    createM.mutate(dto, {
      onSuccess: (created) => {
        toast({ title: "Created", description: "Form created successfully." });
        navigate(`/forms/${created.id}`, { replace: true });
      },
      onError: (e) => {
        toast({
          title: "Error",
          description: e instanceof Error ? e.message : "Failed to create form.",
          variant: "destructive",
        });
      },
    });
  }

  if (!canManage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not allowed</CardTitle>
          <CardDescription>Only admin/creator can create forms.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <FormCreateCard busy={createM.isPending} onCreate={onCreate} />;
}
