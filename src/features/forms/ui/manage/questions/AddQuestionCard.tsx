import React, { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { Checkbox } from "@/shared/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { PlusCircle, X } from "lucide-react";

import type { QuestionDTO } from "@/features/forms/model/forms.types";

type Props = {
  formId: string;
  show: boolean;
  busy?: boolean;

  /** defaults for editing UX (optional) */
  initial?: Partial<QuestionDTO>;

  onCancel: () => void;
  onSubmit: (dto: QuestionDTO) => Promise<void> | void;
};

const QUESTION_TYPES = ["text", "radio", "checkbox"] as const;

export function AddQuestionCard({ formId, show, busy, initial, onCancel, onSubmit }: Props) {
  const [prompt, setPrompt] = useState(initial?.prompt ?? "");
  const [type, setType] = useState<QuestionDTO["type"]>((initial?.type as any) ?? "text");
  const [isRequired, setIsRequired] = useState(!!initial?.isRequired);

  const [minChoices, setMinChoices] = useState<string>(initial?.minChoices != null ? String(initial.minChoices) : "");
  const [maxChoices, setMaxChoices] = useState<string>(initial?.maxChoices != null ? String(initial.maxChoices) : "");

  const isChoice = type === "radio" || type === "checkbox";

  const canSubmit = useMemo(() => {
    if (!show) return false;
    if (!prompt.trim()) return false;
    if (isChoice) {
      const min = minChoices.trim() ? Number(minChoices) : undefined;
      const max = maxChoices.trim() ? Number(maxChoices) : undefined;
      if (min != null && Number.isNaN(min)) return false;
      if (max != null && Number.isNaN(max)) return false;
      if (min != null && max != null && min > max) return false;
    }
    return true;
  }, [show, prompt, isChoice, minChoices, maxChoices]);

  if (!show) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;

    const dto: QuestionDTO = {
      prompt: prompt.trim(),
      type,
      isRequired,
      minChoices: isChoice && minChoices.trim() ? Number(minChoices) : undefined,
      maxChoices: isChoice && maxChoices.trim() ? Number(maxChoices) : undefined,
    } as any;

    await onSubmit(dto);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-primary/30 bg-card/70 backdrop-blur-sm">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              Add question
              <Badge variant="secondary" className="capitalize">
                {type}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Write the prompt and choose the question type.
            </p>
          </div>

          <Button type="button" size="icon" variant="ghost" onClick={onCancel} disabled={busy} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="q-prompt">Prompt</Label>
            <Textarea
              id="q-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. What is your favorite framework?"
              className="min-h-[84px]"
              disabled={busy}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={String(type)} onValueChange={(v) => setType(v as any)} disabled={busy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_TYPES.map((t) => (
                    <SelectItem key={t} value={t} className="capitalize">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Use <b>radio/checkbox</b> when you will add options.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Required</Label>
              <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
                <Checkbox checked={isRequired} onCheckedChange={(v) => setIsRequired(!!v)} disabled={busy} />
                <span className="text-sm">User must answer this question</span>
              </div>
            </div>
          </div>

          {isChoice ? (
            <>
              <Separator />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="min">Min choices (optional)</Label>
                  <Input
                    id="min"
                    inputMode="numeric"
                    value={minChoices}
                    onChange={(e) => setMinChoices(e.target.value)}
                    placeholder="e.g. 1"
                    disabled={busy}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Max choices (optional)</Label>
                  <Input
                    id="max"
                    inputMode="numeric"
                    value={maxChoices}
                    onChange={(e) => setMaxChoices(e.target.value)}
                    placeholder="e.g. 2"
                    disabled={busy}
                  />
                  {minChoices.trim() && maxChoices.trim() && Number(minChoices) > Number(maxChoices) ? (
                    <p className="text-xs text-destructive">Min cannot be greater than Max.</p>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>

          <Button type="submit" disabled={!canSubmit || !!busy} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            {busy ? "Adding..." : "Add question"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
