import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { FadeIn } from "../ui/FadeIn";
import { useAuth } from "@/features/auth/model/AuthProvider";

export function CtaSection() {
  const { user } = useAuth();

  return (
    <section className="container mx-auto px-4 py-14 md:py-16">
      <FadeIn>
        <Card className="p-6 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold md:text-2xl">Ready to build your first form?</h3>
              <p className="text-muted-foreground mt-1">
                Start simple. Publish when you’re ready. Then track results.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {user ? (
                <Link to="/forms">
                  <Button className="w-full sm:w-auto">
                    Go to dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button className="w-full sm:w-auto">
                      Create account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Sign in
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Card>
      </FadeIn>
    </section>
  );
}
