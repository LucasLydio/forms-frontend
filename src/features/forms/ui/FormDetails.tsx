import React from "react";
import { Badge } from "@/shared/ui/badge";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import { useToast } from "@/shared/ui/use-toast";
import type { FormWithQuestions, QuestionDTO, OptionDTO } from "../model/forms.types";
import {
  useAddQuestion,
  useDeleteQuestion,
  useUpdateQuestion,
  useAddOption,
  useUpdateOption,
  useDeleteOption,
} from "../model/forms.queries";
import { FormEditor } from "./manage/FormEditor";

type Props = {
  form: FormWithQuestions;
};

export function FormDetails({ form }: Props) {
  const { toast } = useToast();

  // Hooks for mutations (by form.id)
  const addQuestion = useAddQuestion(form.id);
  const updateQuestion = useUpdateQuestion(form.id);
  const deleteQuestion = useDeleteQuestion(form.id);
  const addOption = useAddOption(form.id);
  const updateOption = useUpdateOption(form.id);
  const deleteOption = useDeleteOption(form.id);

  // Loading state
  const busy =
    addQuestion.isPending ||
    updateQuestion.isPending ||
    deleteQuestion.isPending ||
    addOption.isPending ||
    updateOption.isPending ||
    deleteOption.isPending;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="gap-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="truncate">{form.title}</CardTitle>
            {form.isPublished ? (
              <Badge>Published</Badge>
            ) : (
              <Badge variant="secondary">Draft</Badge>
            )}
          </div>
          {form.description && (
            <p className="text-sm text-muted-foreground">{form.description}</p>
          )}
        </CardHeader>
      </Card>

      <FormEditor
        form={form}
        busy={busy}

        // --- Add Question ---
        onAddQuestion={async (dto: QuestionDTO) => {
          try {
            await addQuestion.mutateAsync(dto);
            toast({
              title: "Question added",
              description: "Your new question was added.",
            });
          } catch (err) {
            toast({
              title: "Failed to add question",
              description: err instanceof Error ? err.message : String(err),
              variant: "destructive",
            });
          }
        }}

        // --- Edit Question ---
        onEditQuestion={async (payload: QuestionDTO) => {
          // You likely want to open an edit modal.
          // Example for demo purpose:
          const updateDto: QuestionDTO = payload;
          try {
            await updateQuestion.mutateAsync(updateDto);
            toast({ title: "Question updated" });
          } catch (err) {
            toast({ title: "Failed to update question", variant: "destructive" });
          }
        }}

        // --- Delete Question ---
        onDeleteQuestion={async (questionId: string) => {
          try {
            await deleteQuestion.mutateAsync(questionId);
            toast({ title: "Question deleted" });
          } catch {
            toast({ title: "Failed to delete question", variant: "destructive" });
          }
        }}

        // --- Duplicate Question (placeholder) ---
        onDuplicateQuestion={async (questionId: string) => {
          toast({
            title: "Duplicate not implemented",
            description: `Would duplicate question ${questionId}`,
          });
        }}

        // --- Add Option ---
        onAddOption={async (dto: OptionDTO) => {
          try {
            await addOption.mutateAsync(dto);
            toast({ title: "Option added" });
          } catch {
            toast({ title: "Failed to add option", variant: "destructive" });
          }
        }}

        // Add others as needed: onUpdateOption, onDeleteOption...
        onReorderQuestions={(next) => {
          // TODO: implement reorder backend call, for now just a console.log
          console.log("Persist reorder:", next);
        }}
      />
    </div>
  );
}
