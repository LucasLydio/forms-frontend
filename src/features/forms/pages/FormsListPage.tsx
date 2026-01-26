import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { useToast } from "@/shared/ui/use-toast";

import { useAuth } from "@/features/auth/model/AuthProvider";
import { useDeleteForm, useFormsList, useTogglePublish } from "../model/forms.queries";
import { useFormsBuckets } from "../ui/FormsBuckets";
import { FormCard } from "../ui/FormCard";
import { HandshakeIcon, Loader } from "lucide-react";

export default function FormsListPage() {
  const { user, isLoading: authLoading } = useAuth();

  const canManage = user?.role === "admin" || user?.role === "creator";
  const { toast } = useToast();

  const formsQ = useFormsList(!authLoading);

  const forms = Array.isArray(formsQ.data) ? formsQ.data : [];
  const buckets = useFormsBuckets(forms);

  const publishM = useTogglePublish();
  const deleteM = useDeleteForm();

  const busy = formsQ.isLoading || publishM.isPending || deleteM.isPending;

  function onTogglePublish(id: string, next: boolean) {
    publishM.mutate(
      { id, isPublished: next },
      {
        onSuccess: () => {
          toast({ title: "Updated", description: "Publish state updated." });
        },
        onError: (e) => {
          toast({
            title: "Error",
            description: e instanceof Error ? e.message : "Failed to update publish state.",
            variant: "destructive",
          });
        },
      }
    );
  }

  function onDelete(id: string) {
    deleteM.mutate(id, {
      onSuccess: () => toast({ title: "Deleted", description: "Form removed." }),
      onError: (e) =>
        toast({
          title: "Error",
          description: e instanceof Error ? e.message : "Failed to delete form.",
          variant: "destructive",
        }),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">Forms</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {canManage ? "Create, publish, and manage your forms." : "Browse published forms and submit answers."}
        </p>
      </header>

      {formsQ.isLoading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-sm text-muted-foreground">Loading...<Loader></Loader></div>
      ) : formsQ.isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Couldn’t load forms</CardTitle>
            <CardDescription>{formsQ.error instanceof Error ? formsQ.error.message : "Unknown error"}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Published</CardTitle>
              <CardDescription>Visible to common users.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              {buckets.published.length === 0 ? (
                <p className="text-sm text-muted-foreground">No published forms yet.</p>
              ) : (
                buckets.published.map((f) => (
                  <FormCard
                    key={f.id}
                    form={f}
                    canManage={canManage}
                    busy={busy}
                    onTogglePublish={() => onTogglePublish(f.id, false)}
                    onDelete={() => onDelete(f.id)}
                  />
                ))
              )}
            </CardContent>
          </Card>
          <Card>
            { canManage ? (
            <Card>
              <CardHeader>
                <CardTitle>Drafts</CardTitle>
                <CardDescription>Only admin/creator can access.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {buckets.drafts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No drafts.</p>
                ) : (
                  buckets.drafts.map((f) => (
                    <FormCard
                      key={f.id}
                      form={f}
                      canManage={canManage}
                      busy={busy}
                      onTogglePublish={() => onTogglePublish(f.id, true)}
                      onDelete={() => onDelete(f.id)}
                    />
                  ))
                )}
              </CardContent>
            </Card>
            ) : (
            <Card>
              <CardHeader>
                <CardTitle className="w-96 border">
                  Greate to see you here <HandshakeIcon ></HandshakeIcon> 
                </CardTitle>
                <CardDescription>Only admin/creator can access.</CardDescription>
              </CardHeader>
            </Card>
            )}
          </Card>
        </div>
      )}

      <Separator />
      <p className="text-xs text-muted-foreground">
        Tip: If you get logged out, refresh tokens are handled via httpOnly cookies.
      </p>
    </div>
  );
}
