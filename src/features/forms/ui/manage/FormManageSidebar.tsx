import React, { useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { PlusCircle, Trash2, Copy, Settings2, ListOrdered, Plus } from "lucide-react";

type Props = {
  disabled?: boolean;
  canAddOption?: boolean;

  showAddQuestion: boolean;
  onToggleAddQuestion: () => void;

  onDuplicate: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAddOption: () => void;
  onToggleReorder: () => void;

  reorderEnabled: boolean;
};


export function FormManageSidebar({
  disabled,
  canAddOption,
  showAddQuestion,
  onToggleAddQuestion,
  onDuplicate,
  onDelete,
  onEdit,
  onAddOption,
  onToggleReorder,
  reorderEnabled,
}: Props) {
  
  
  return (
    <TooltipProvider>
      <Card className="sticky top-24 w-14 p-2 flex flex-col gap-2 border-border bg-card/80 backdrop-blur-sm max-lg:flex-row max-lg:w-fit">
        <IconBtn
          label={showAddQuestion ? "Close add question" : "Add question"}
          onClick={onToggleAddQuestion}
          disabled={disabled}
        >
          <PlusCircle className="h-4 w-4" />
        </IconBtn>
        <IconBtn label="Edit" onClick={onEdit} disabled={disabled}>
          <Settings2 className="h-4 w-4" />
        </IconBtn>

        <IconBtn label="Duplicate" onClick={onDuplicate} disabled={disabled}>
          <Copy className="h-4 w-4" />
        </IconBtn>

        <IconBtn label="Delete" onClick={onDelete} disabled={disabled}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </IconBtn>

        <div className="my-1 h-px bg-border" />

        <IconBtn label="Add option" onClick={onAddOption} disabled={disabled || !canAddOption}>
          <Plus className="h-4 w-4" />
        </IconBtn>

        <IconBtn label={reorderEnabled ? "Stop reorder" : "Reorder"} onClick={onToggleReorder} disabled={disabled}>
          <ListOrdered className={["h-4 w-4", reorderEnabled ? "text-primary" : ""].join(" ")} />
        </IconBtn>
      </Card>
    </TooltipProvider>
  );
}

function IconBtn(props: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl hover:bg-muted/70"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">{props.label}</TooltipContent>
    </Tooltip>
  );
}
