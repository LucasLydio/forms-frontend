import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useAuth } from "@/features/auth/model/AuthProvider";

export default function IndexPage() {

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forms</CardTitle>
          <CardDescription>Build forms, publish them, and collect submissions.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Link to="/login" className="flex-1">
            <Button className="w-full">Login</Button>
          </Link>
          <Link to="/register" className="flex-1">
            <Button variant="outline" className="w-full">
              Register
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
