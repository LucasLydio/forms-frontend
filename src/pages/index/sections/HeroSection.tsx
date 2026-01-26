import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, FileText, Sparkles } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { FadeIn } from "../ui/FadeIn";
import { useAuth } from "@/features/auth/model/AuthProvider";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <Badge className="w-fit" variant="secondary">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Build forms • Collect answers • Track stats
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Create forms in minutes.
                <span className="block text-primary">See insights instantly.</span>
              </h1>

              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                A simple platform for anyone who wants to create forms, publish them, collect submissions, and view
                statistics—without complexity.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                {user ? (
                  <Link to="/forms" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                      <FileText className="mr-2 h-4 w-4" />
                      Go to Forms
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto">
                        <FileText className="mr-2 h-4 w-4" />
                        Create your account
                      </Button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Sign in
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <BarChart3 className="h-3.5 w-3.5" /> Stats-ready
                </span>
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" /> Publish & share
                </span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Clean UI
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delayMs={120}>
            <Card className="relative overflow-hidden p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Example: Customer Feedback</p>
                  <Badge>Published</Badge>
                </div>

                <div className="space-y-3">
                  <div className="h-10 w-full rounded-md bg-muted/60" />
                  <div className="h-10 w-full rounded-md bg-muted/60" />
                  <div className="h-10 w-2/3 rounded-md bg-muted/60" />
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-9 w-24 rounded-md bg-primary/90" />
                  <div className="h-9 w-20 rounded-md bg-muted/70" />
                </div>

                <p className="text-xs text-muted-foreground">
                  Clean building experience + ready for submissions and analytics.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
