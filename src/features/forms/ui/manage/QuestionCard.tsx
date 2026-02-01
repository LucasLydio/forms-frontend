import React from "react";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import type { QuestionDTO } from "../../model/forms.types";

export function QuestionCard({
  q,
  selected,
  dragging,
  onClick,
}: {
  q: QuestionDTO;
  selected: boolean;
  dragging?: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className={[
        "p-4 cursor-pointer transition-all",
        "hover:shadow-md hover:-translate-y-[1px]",
        selected ? "border-primary ring-2 ring-primary/15" : "border-border",
        dragging ? "opacity-70" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium truncate">{q.prompt}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Type: {q.type} {q.isRequired ? "• Required" : ""}
          </p>
        </div>
        <Badge variant="secondary">#{q.orderIndex}</Badge>
      </div>
    </Card>
  );
}
