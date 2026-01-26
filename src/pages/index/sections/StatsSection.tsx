import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { FadeIn } from "../ui/FadeIn";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <FadeIn>
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Analytics that matter</h2>
            <p className="text-muted-foreground">
              Know what’s happening with your forms: submissions, completion rate, and trends.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3">
          <FadeIn delayMs={0}>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">128</p>
                <p className="text-xs text-muted-foreground mt-1">Last 7 days (example)</p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delayMs={90}>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Completion rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">74%</p>
                <p className="text-xs text-muted-foreground mt-1">Average completion (example)</p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delayMs={180}>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Most answered form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold line-clamp-1">Customer Feedback</p>
                <p className="text-xs text-muted-foreground mt-1">Top performer (example)</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
