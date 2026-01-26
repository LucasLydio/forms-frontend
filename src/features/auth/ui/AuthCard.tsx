import React from "react";
import { Card } from "@/shared/ui/card";
import { FileEditIcon, FileText, FileTextIcon, LucideLogIn } from "lucide-react";

export function AuthCard(props: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Card
      className="
        w-full max-w-md overflow-hidden
        border-border bg-card/80 backdrop-blur-sm
        max-md:bg-transparent
      "
    >
      <div className="p-6">
        <div className="flex items-center justify-center rounded-lg bg-transparent mb-2">
            <FileText size={55} className="text-white p-2 bg-primary rounded-lg shadow-lg" />
        </div>
        <div className="space-y-1"> 
          <h2 className="text-2xl font-bold tracking-tight">{props.title}</h2>
          {props.description ? <p className="text-sm text-muted-foreground">{props.description}</p> : null}
        </div>

        <div className="mt-6">{props.children}</div>

        {props.footer ? <div className="mt-6">{props.footer}</div> : null}
      </div>

      {/* subtle bottom accent */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
    </Card>
  );
}
