import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useToast } from "@/shared/ui/use-toast";

import { useAuth } from "@/features/auth/model/AuthProvider";
import { AuthShell } from './../ui/AuthShell';
import { AuthCard } from './../ui/AuthCard';

function getRedirectFrom(state: unknown): string {
  const s = state as any;
  const from = typeof s?.from === "string" ? s.from : null;
  return from && from.startsWith("/") ? from : "/";
}

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = useMemo(() => getRedirectFrom(location.state), [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    try {
      setBusy(true);
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <AuthCard
        title="Welcome back"
        description="Login to manage forms or submit answers."
        footer={
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/register" className="text-foreground underline underline-offset-4 hover:text-primary">
              Register
            </Link>
          </p>
        }
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={busy}>
            <LogIn className="mr-2 h-4 w-4" />
            {busy ? "Signing in..." : "Login"}
          </Button>

          <div className="text-xs text-muted-foreground">
            Tip: Use the same host for frontend/backend during dev (localhost vs IP) so auth works reliably.
          </div>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
