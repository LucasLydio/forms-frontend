import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import type { Form } from "../model/forms.types";
import { ArrowDownLeftFromSquare, ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, Eye, PenLineIcon, Trash, Trash2Icon, X } from "lucide-react";

type Props = {
  form: Form;
  canManage: boolean;
  busy?: boolean;
  onTogglePublish?: () => void;
  onDelete?: () => void;
};

export function FormCard({ form, canManage, busy, onTogglePublish, onDelete }: Props) {

  let openActions: boolean = false;
  const [actions, setActions] = useState(false);

  return (
    <Card className="min-w-72  p-4 flex flex-col gap-4 border-blue-100" >
      <div className="min-w-0 w-full">
        <div className="flex w-full items-center justify-between gap-2">
          <p className="truncate font-medium">{form.title}</p>
          {form.isPublished ? <Badge>Published</Badge> : <Badge variant="secondary">Draft</Badge>}
        </div>
        {form.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{form.description}</p>
        ) : null}
      </div>

      {!actions ? (
        <div>
          <Button className="w-full min-w-48 " variant="outline" onClick={() => setActions((v) => !v)}>
              <div className="flex w-full min-w-fit items-center justify-between mt-1 line-clamp-2 ">
                  <p>See Actions</p>
                  <ArrowDownLeftFromSquare />
              </div>
          </Button>
        </div>
      ) : (

      <div className="flex flex-col gap-4 items-start">
        <Button className="min-w-fit" variant="secondary" onClick={() => setActions((v) => !v)}>
            <div className="flex min-w-fit items-center justify-between gap-2">
                <p>Close Actions</p>
                <X />
            </div>
        </Button>
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
                variant={form.isPublished ? "ghost" : "link"}
                className="flex-1 "
                onClick={onTogglePublish}
                disabled={busy}
              >
                {form.isPublished ? (
                  <div className="flex items-center gap-2 text-primary">
                    <p>Unpublish</p>
                    <ArrowDownNarrowWideIcon />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-primary">
                    <p>Publish</p>
                    <ArrowUpNarrowWideIcon />
                  </div>
                )}
              </Button>

              <Button className="text-destructive" size="sm" variant="ghost" onClick={onDelete} disabled={busy}>
                  <div className="flex items-center gap-2 text-destructive">
                    Delete
                    <Trash2Icon />
                  </div>
              </Button>
            </div>
          ) : null}
          
        </div>
      </div>

      )}
    </Card>
  );
}
