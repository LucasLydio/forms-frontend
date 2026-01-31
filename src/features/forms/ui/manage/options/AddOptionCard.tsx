import React, { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import { X, Plus } from "lucide-react";

import type { OptionDTO } from "@/features/forms/model/forms.types";

type Props = {
  questionId: string;
  show: boolean;
  busy?: boolean;

  /** optional defaults */
  initial?: Partial<OptionDTO>;

  onCancel: () => void;
  onSubmit: (dto: OptionDTO) => Promise<void> | void;
};

export function AddOptionCard({ questionId, show, busy, initial, onCancel, onSubmit }: Props) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [value, setValue] = useState(initial?.value ?? "");

  const canSubmit = useMemo(() => {
    if (!show) return false;
    if (!label.trim()) return false;
    if (!value.trim()) return false;
    return true;
  }, [show, label, value]);

  if (!show) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;

    const dto: OptionDTO = {
      questionId,
      label: label.trim(),
      value: value.trim(),
    } as any; // remove 'as any' if your DTO already includes questionId

    await onSubmit(dto);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-primary/30 bg-card/70 backdrop-blur-sm">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              Add option
              <Badge variant="secondary">Question</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Options are used by <b>radio</b> and <b>checkbox</b> questions.
            </p>
          </div>

          <Button type="button" size="icon" variant="ghost" onClick={onCancel} disabled={busy} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="opt-label">Label</Label>
              <Input
                id="opt-label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. React"
                disabled={busy}
              />
              <p className="text-xs text-muted-foreground">What the user will see.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="opt-value">Value</Label>
              <Input
                id="opt-value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. react"
                disabled={busy}
              />
              <p className="text-xs text-muted-foreground">What will be stored in the database.</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>

          <Button type="submit" disabled={!canSubmit || !!busy} className="gap-2">
            <Plus className="h-4 w-4" />
            {busy ? "Adding..." : "Add option"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
