import React from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import type { Form } from "../model/forms.types";
import { Eye, PenLineIcon, Trash } from "lucide-react";

type Props = {
  form: Form;
  canManage: boolean;
  busy?: boolean;
  onTogglePublish?: () => void;
  onDelete?: () => void;
};

export function FormCard({ form, canManage, busy, onTogglePublish, onDelete }: Props) {
  return (
    <Card className="w-80 p-4 flex flex-col gap-4 border-blue-100" >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{form.title}</p>
          {form.isPublished ? <Badge>Published</Badge> : <Badge variant="secondary">Draft</Badge>}
        </div>
        {form.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{form.description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to={`/forms/${form.id}`}>
          <Button variant="outline" size="sm" className="w-24">
            View <Eye></Eye>
          </Button>
        </Link>

        <Link to={`/forms/${form.id}/answer`}>
          <Button size="sm" variant={'default'} className="w-24">
            Answer <PenLineIcon></PenLineIcon>
          </Button>
        </Link>

        {canManage ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={form.isPublished ? "link" : "link"}
              className="flex-1"
              onClick={onTogglePublish}
              disabled={busy}
            >
              {form.isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button size="sm" variant="secondary" onClick={onDelete} disabled={busy}>
              <Trash color="red"></Trash>
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
