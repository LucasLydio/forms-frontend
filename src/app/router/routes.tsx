import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";
import { ProtectedRoute } from "@/app/guards/ProtectedRoute";

// Pages (we’ll create these next)
import IndexPage from "@/pages/index/IndexPage";
import NotFoundPage from "@/pages/NotFoundPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import FormsListPage from "@/features/forms/pages/FormsListPage";
import FormViewPage from "@/features/forms/pages/FormViewPage";
import FormBuilderPage from "@/features/forms/pages/FormBuilderPage";
import FormAnswerPage from "@/features/forms/pages/FormAnswerPage";

import AdminUsersPage from "@/features/admin-users/pages/AdminUsersPage";

export const router = createBrowserRouter([
  // Public
  { 
    element: <AppLayout /> ,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "*", element: <NotFoundPage /> },
    ]
  },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  // Protected (auth required)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/forms", element: <FormsListPage /> },
          { path: "/forms/new", element: <FormBuilderPage /> },
          { path: "/forms/:id", element: <FormViewPage /> },
          { path: "/forms/:id/answer", element: <FormAnswerPage /> },

          // Admin-only
          {
            element: <ProtectedRoute roles={["admin"]} />,
            children: [{ path: "/admin/users", element: <AdminUsersPage /> }],
          },
        ],
      },
    ],
  },

]);
