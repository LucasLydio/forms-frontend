import React from "react";
import { BarChart3, Globe, Lock, Wand2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { FadeIn } from "../ui/FadeIn";

const items = [
  {
    icon: Wand2,
    title: "Form builder that feels fast",
    desc: "Create questions, options, and ordering with a smooth, modern UI.",
  },
  {
    icon: Globe,
    title: "Publish & share",
    desc: "Make forms public for anyone, or keep drafts private until ready.",
  },
  {
    icon: BarChart3,
    title: "Statistics & insights",
    desc: "Track submissions, completion, and see results clearly (next step).",
  },
  {
    icon: Lock,
    title: "Roles & access",
    desc: "Admin/creator/common roles to keep control and safety in place.",
  },
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-14 md:py-16">
      <FadeIn>
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Everything you need</h2>
          <p className="text-muted-foreground">
            A simple workflow: build → publish → collect answers → analyze.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <FadeIn key={it.title} delayMs={i * 70}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <it.icon className="h-4 w-4 text-primary" />
                  {it.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
