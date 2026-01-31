import React from "react";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import type { FormWithQuestions, Question } from "../model/forms.types";
import { FormEditor } from "./manage/FormEditor";

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

      <FormEditor
        form={form}
        busy={false}
        onAddQuestion={() => console.log("add question")}
        onDuplicateQuestion={(id) => console.log("duplicate", id)}
        onDeleteQuestion={(id) => console.log("delete", id)}
        onEditQuestion={(id) => console.log("edit", id)}
        onAddOption={(id) => console.log("add option to question", id)}
        onReorderQuestions={(next) => console.log("persist reorder", next)}
      />
    </div>
  );
}
