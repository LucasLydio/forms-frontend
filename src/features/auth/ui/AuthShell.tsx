import { ChartLineIcon, Lock, Sparkles } from "lucide-react";
import React from "react";

export function AuthShell(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* ambient background */}
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute left-10 top-24 h-48 w-48 rounded-full bg-muted/30 blur-3xl" />
        </div>

        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
          <div className="w-full max-w-5xl grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left side marketing copy */}
            <div className="hidden lg:block">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Build forms fast.
                  <span className="block text-primary">Track answers clearly.</span>
                </h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Create, publish, collect submissions, and view stats — a simple platform made for everyone.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                  <div className="rounded-lg border border-border bg-card/50 p-3 border-indigo-200">
                    <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
                    Smooth builder UI + clean UX
                  </div>
                  <div className="rounded-lg border border-border bg-card/50 p-3 border-indigo-200">
                  <ChartLineIcon className="mr-2 h-3.5 w-3.5 text-primary" />
                    Stats-ready workflow (submissions + insights)
                  </div>
                  <div className="rounded-lg border border-border bg-card/50 p-3 border-indigo-200">
                    <Lock className="mr-2 h-3.5 w-3.5 text-primary" />
                    Roles support (admin/creator/common)
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: auth card */}
            <div className="flex justify-center lg:justify-end">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
