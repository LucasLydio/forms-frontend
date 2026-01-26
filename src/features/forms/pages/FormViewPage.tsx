import React from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

import { useFormById } from "../model/forms.queries";
import { FormDetails } from "../ui/FormDetails";

export default function FormViewPage() {
  const { id } = useParams();
  const formId = id ?? "";

  const q = useFormById(formId);

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

  if (q.isLoading) {
    return <div className="min-h-[40vh] flex items-center justify-center text-sm text-muted-foreground">Loading...</div>;
  }

  if (q.isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Couldn’t load form</CardTitle>
          <CardDescription>{q.error instanceof Error ? q.error.message : "Unknown error"}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!q.data) {
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <Link to="/forms">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>

        <Link to={`/forms/${formId}/answer`}>
          <Button size="sm">Answer</Button>
        </Link>
      </div>

      <FormDetails form={q.data} />
    </div>
  );
}
