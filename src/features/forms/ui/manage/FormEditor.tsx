import React, { useMemo, useState } from "react";
import type { FormWithQuestions, Question } from "../../model/forms.types";
import { QuestionsDraggableList } from "./QuestionsDraggableList";
import { FormManageSidebar } from "./FormManageSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { AddQuestionCard } from "./questions/AddQuestionCard";
import { AddOptionCard } from "./options/AddOptionCard";

type Props = {
  form: FormWithQuestions;
  busy?: boolean;

  onAddQuestion: () => void;
  onDuplicateQuestion: (questionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  onEditQuestion: (questionId: string) => void;

  onAddOption: (questionId: string) => void;

  onReorderQuestions?: (next: Question[]) => void;
};

export function FormEditor({
  form,
  busy,
  onAddQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
  onEditQuestion,
  onAddOption,
  onReorderQuestions,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(form.questions?.[0]?.id ?? null);
  const [reorderEnabled, setReorderEnabled] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showAddOption, setShowAddOption] = useState(false);

  const [localQs, setLocalQs] = useState<Question[]>(form.questions ?? []);

  const selected = useMemo(
    () => localQs.find((q) => q.id === selectedId) ?? null,
    [localQs, selectedId]
  );

  const canAddOption = selected?.type === "checkbox" || selected?.type === "radio";

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_80px] max-lg:flex flex-col-reverse">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-base">Editor</CardTitle>
              <p className="text-sm text-muted-foreground">Select a question to manage it like Google Forms.</p>
            </div>

            {selected ? (
              <Badge variant="secondary" className="capitalize">
                selected: {selected.type}
              </Badge>
            ) : null}
          </CardHeader>

          <CardContent>
              <div className="mb-3">
                <Button className=" min-w-48 my-3" variant={"outline"} onClick={() => setShowAddQuestion(true)}>
                    <div className="flex w-full min-w-fit items-center justify-between mt-1 line-clamp-2 ">
                        <p>Add Question</p>
                        <PlusCircleIcon />
                    </div>
                </Button>
                <AddQuestionCard
                  formId={form.id}
                  show={showAddQuestion}
                  busy={busy}
                  onCancel={() => setShowAddQuestion(false)}
                  onSubmit={async (dto: any) => {
                    await onAddQuestion(); 
                    setShowAddQuestion(false);
                  }}
                />

                <AddOptionCard
                  questionId={selected?.id ?? ""}
                  show={showAddOption}
                  busy={busy}
                  onCancel={() => setShowAddOption(false)}
                  onSubmit={async (dto: any) => {
                    await onAddOption(dto); 
                    setShowAddOption(false);
                  }}
                />
              </div>
            {localQs.length === 0 ? (
              <div>
                <p className="text-sm text-muted-foreground">No questions yet. Add your first question.</p>
              </div>
            ) : (
              <QuestionsDraggableList
                questions={localQs}
                selectedId={selectedId}
                reorderEnabled={reorderEnabled}
                onSelect={setSelectedId}
                onReorderLocal={setLocalQs}
                onPersistReorder={onReorderQuestions}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="">
        <FormManageSidebar
          disabled={busy || !selected}
          reorderEnabled={reorderEnabled}
          canAddOption={!!selected && canAddOption}
          showAddQuestion={showAddQuestion}
          onToggleAddQuestion={() => setShowAddQuestion((v) => !v)}
          onEdit={() => selected && onEditQuestion(selected.id)}
          onDuplicate={() => selected && onDuplicateQuestion(selected.id)}
          onDelete={() => selected && onDeleteQuestion(selected.id)}
          onAddOption={() => selected && onAddOption(selected.id)}
          onToggleReorder={() => setReorderEnabled((v) => !v)}
        />
      </div>
    </div>
  );
}
