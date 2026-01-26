import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import type { CreateFormDTO } from "../model/forms.types";

type Props = {
  busy?: boolean;
  onCreate: (dto: CreateFormDTO) => void;
};

export function FormCreateCard({ busy, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      description: description.trim() ? description.trim() : null,
    });

    // Optional: clear fields after create
    // setTitle(""); setDescription("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new form</CardTitle>
        <CardDescription>Start with a title and a short description.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              placeholder="e.g. Customer Feedback"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              placeholder="Explain what this form is for..."
            />
          </div>

          <Button type="submit" disabled={busy}>
            {busy ? "Creating..." : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
