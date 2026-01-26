import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/features/auth/model/AuthProvider";
import type { UserRole } from "@/features/auth/model/auth.types";

type Props = {
  roles?: UserRole[]; // optional role restriction
};

export function ProtectedRoute({ roles }: Props) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/forms" replace />;
  }

  return <Outlet />;
}
