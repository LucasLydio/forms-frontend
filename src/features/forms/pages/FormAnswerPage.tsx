import React from "react";
import { useParams } from "react-router-dom";

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useToast } from "@/shared/ui/use-toast";

import { useFormById } from "../model/forms.queries";
import { useStartSubmission } from "../model/submissions.queries";
import { SubmissionStartCard } from "../ui/SubmissionStartCard";

export default function FormAnswerPage() {
  const { id } = useParams();
  const formId = id ?? "";

  const { toast } = useToast();

  const formQ = useFormById(formId);
  const startSubmission = useStartSubmission();

  function start() {
    if (!formId) return;

    startSubmission.mutate(
      { formId },
      {
        onSuccess: (submission) => {
          toast({ title: "Started", description: "Submission started." });
          console.log("submission:", submission);

          // Later we can navigate to /submissions/:id
          // navigate(`/submissions/${submission.id}`, { replace: true });
        },
        onError: (e) => {
          toast({
            title: "Error",
            description: e instanceof Error ? e.message : "Failed to start submission.",
            variant: "destructive",
          });
        },
      }
    );
  }

  if (!formId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invalid form</CardTitle>
          <CardDescription>Missing form id.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (formQ.isLoading) {
    return <div className="min-h-[40vh] flex items-center justify-center text-sm text-muted-foreground">Loading...</div>;
  }

  if (formQ.isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Couldn’t load form</CardTitle>
          <CardDescription>{formQ.error instanceof Error ? formQ.error.message : "Unknown error"}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const form = formQ.data;
  if (!form) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Form not found</CardTitle>
          <CardDescription>It may have been deleted.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <SubmissionStartCard
      formTitle={form.title}
      busy={startSubmission.isPending}
      onStart={start}
    />
  );
}
