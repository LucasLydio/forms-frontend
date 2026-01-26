import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useToast } from "@/shared/ui/use-toast";

import { useAuth } from "@/features/auth/model/AuthProvider";
import { AuthShell } from './../ui/AuthShell';
import { AuthCard } from './../ui/AuthCard';

export default function RegisterPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [busy, setBusy] = useState(false);

  const passwordsMatch = useMemo(() => confirm.length === 0 || password === confirm, [password, confirm]);
  const canSubmit = name.trim().length > 1 && email.trim().length > 3 && password.length >= 6 && passwordsMatch;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    if (!passwordsMatch) {
      toast({
        title: "Check your password",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      setBusy(true);
      await register({ name: name.trim(), email: email.trim(), password });
      navigate("/forms", { replace: true });
    } catch (err) {
      toast({
        title: "Registration failed",
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
        title="Create your account"
        description="Register to create forms and view stats."
        footer={
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground underline underline-offset-4 hover:text-primary">
              Login
            </Link>
          </p>
        }
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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

            <p className="text-xs text-muted-foreground">
              Use 6+ characters. You can improve rules later (zod validation, strength meter).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
                className={[
                  "pr-10",
                  passwordsMatch ? "" : "border-destructive focus-visible:ring-destructive",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {!passwordsMatch ? (
              <p className="text-xs text-destructive">Passwords do not match.</p>
            ) : null}
          </div>

          <Button className="w-full" type="submit" disabled={busy || !canSubmit}>
            <UserPlus className="mr-2 h-4 w-4" />
            {busy ? "Creating..." : "Create account"}
          </Button>

          <p className="text-xs text-muted-foreground">
            By continuing, you agree to use this app responsibly. (You can add Terms later.)
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
