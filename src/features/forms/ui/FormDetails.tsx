import React from "react";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import type { FormWithQuestions, Question } from "../model/forms.types";

function QuestionRow({ q }: { q: Question }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="font-medium truncate">{q.prompt}</p>
        <p className="text-xs text-muted-foreground">
          Type: {q.type} {q.isRequired ? "• Required" : ""}
        </p>
      </div>
      <Badge variant="secondary">#{q.orderIndex}</Badge>
    </div>
  );
}

export function FormDetails({ form }: { form: FormWithQuestions }) {
  const questions = form.questions ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="gap-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="truncate">{form.title}</CardTitle>
            {form.isPublished ? <Badge>Published</Badge> : <Badge variant="secondary">Draft</Badge>}
          </div>
          {form.description ? <p className="text-sm text-muted-foreground">{form.description}</p> : null}
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {questions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No questions yet.</p>
          ) : (
            questions
              .slice()
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((q, idx) => (
                <React.Fragment key={q.id}>
                  {idx > 0 ? <Separator /> : null}
                  <QuestionRow q={q} />
                </React.Fragment>
              ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
