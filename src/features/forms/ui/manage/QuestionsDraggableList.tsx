import React, { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Question } from "../../model/forms.types";
import { QuestionCard } from "./QuestionCard";

type Props = {
  questions: Question[];
  selectedId: string | null;
  reorderEnabled: boolean;
  onSelect: (id: string) => void;

  /** optimistic reorder in UI */
  onReorderLocal: (next: Question[]) => void;

  /** persist reorder to backend (optional) */
  onPersistReorder?: (next: Question[]) => void;
};

export function QuestionsDraggableList({
  questions,
  selectedId,
  reorderEnabled,
  onSelect,
  onReorderLocal,
  onPersistReorder,
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const sorted = useMemo(
    () => questions.slice().sort((a, b) => a.orderIndex - b.orderIndex),
    [questions]
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = sorted.findIndex((x) => x.id === active.id);
    const newIndex = sorted.findIndex((x) => x.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const moved = arrayMove(sorted, oldIndex, newIndex).map((q, idx) => ({
      ...q,
      orderIndex: idx,
    }));

    onReorderLocal(moved);
    onPersistReorder?.(moved);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={reorderEnabled ? onDragEnd : undefined}>
      <SortableContext items={sorted.map((q) => q.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {sorted.map((q) => (
            <SortableRow
              key={q.id}
              q={q}
              selected={q.id === selectedId}
              reorderEnabled={reorderEnabled}
              onClick={() => onSelect(q.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  q,
  selected,
  reorderEnabled,
  onClick,
}: {
  q: Question;
  selected: boolean;
  reorderEnabled: boolean;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: q.id,
    disabled: !reorderEnabled,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <QuestionCard q={q} selected={selected} dragging={isDragging} onClick={onClick} />
    </div>
  );
}
