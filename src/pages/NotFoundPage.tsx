import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-sm text-muted-foreground mt-1">The page you’re looking for doesn’t exist.</p>
      </div>
      <Link to="/forms">
        <Button>Go to Forms</Button>
      </Link>
    </div>
  );
}
