import { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FileText, Users, LogOut, User, Plus, Menu, LogIn, UserPlus, Home } from "lucide-react";

import { useAuth } from "@/features/auth/model/AuthProvider";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthed = !!user;
  const isActive = (path: string) => location.pathname === path;

  const canCreateForms = user?.role === "admin" || user?.role === "creator";
  const isAdmin = user?.role === "admin";

  const title = useMemo(() => {
    // You can rename the brand later
    return "Forms";
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">{title}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {!isAuthed ? (
                <>
                  <Link to="/">
                    <Button variant={isActive("/") ? "secondary" : "ghost"} size="sm">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                  {/* <Link to="/login">
                    <Button variant={isActive("/login") ? "secondary" : "ghost"} size="sm">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant={isActive("/register") ? "secondary" : "ghost"} size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Button>
                  </Link> */}
                </>
              ) : (
                <>
                  <Link to="/forms">
                    <Button variant={isActive("/forms") ? "secondary" : "ghost"} size="sm">
                      Forms
                    </Button>
                  </Link>

                  {isAdmin && (
                    <Link to="/admin/users">
                      <Button variant={isActive("/admin/users") ? "secondary" : "ghost"} size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Users
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {!isAuthed ? (
              // Logged-out CTA (desktop)
              <div className="hidden items-center gap-2 md:flex">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create account
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {canCreateForms && (
                  <Link to="/forms/new" className="hidden md:block">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Form
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="link" size="sm" className="gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="hidden md:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      {user?.role ? (
                        <p className="mt-1 text-xs capitalize text-primary">{user.role}</p>
                      ) : null}
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card p-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {!isAuthed ? (
                <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-start">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create account
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/forms" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Forms
                    </Button>
                  </Link>

                  {isAdmin && (
                    <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Users
                      </Button>
                    </Link>
                  )}

                  {canCreateForms && (
                    <Link to="/forms/new" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        New Form
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="secondary"
                    className="w-full justify-start text-destructive"
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await handleLogout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
