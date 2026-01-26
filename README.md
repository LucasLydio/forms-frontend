# forms-frontend 

This is the frontend UI for the Forms platform — a React + TypeScript app (Vite) used to build, publish, and answer forms, manage users, and collect submissions. This folder is one of the frontend implementations in this repository and is production-ready for local development and integration with the backend.

---

## ✨ Key Features

- **Authentication:** Login, register, session restore (`GET /auth/me`), Google OAuth entrypoints.
- **Forms:** Create/edit forms (builder flow), publish/unpublish, list by buckets (published/drafts), view form details.
- **Submissions:** Answer forms, list and view submissions, exportable/accessible via API.
- **Admin:** Role-based access with an admin area to list and manage users.
- **Modern UI:** Tailwind CSS + shadcn/ui components, responsive layout, toasts and polished form controls.

---

## 🧱 Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- TanStack React Query
- Tailwind CSS + shadcn/ui (Radix UI)

---

## 📦 Expected Backend API

This frontend integrates with the repository's backend and expects the following routes and semantics. Most endpoints return a consistent success response (shape below).

Auth
- POST /auth/login
- POST /auth/register
- POST /auth/refresh
- POST /auth/logout
- GET /auth/me
- GET /auth/google
- GET /auth/google/callback

Users (admin)
- GET /users
- GET /users/:id
- PATCH /users/:id
- DELETE /users/:id

Forms
- GET /forms
- POST /forms
- GET /forms/:id
- PATCH /forms/:id
- DELETE /forms/:id

Submissions
- GET /submissions
- POST /submissions
- GET /submissions/:id
- DELETE /submissions/:id

---

## ✅ Response shape (important)

Most API responses follow this shape:

```ts
type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
}
```

---

## Project structure (important files)

Top-level of this folder:

- `index.html` — Vite entry
- `package.json` — scripts & deps
- `tsconfig.json` — TypeScript config
- `src/` — application source

Notable `src` layout:

- `src/app/` — app-level wiring (providers, router, layout)
- `src/features/` — domain features: `auth`, `forms`, `admin-users`, etc.
- `src/shared/` — shared UI components, hooks, utils
- `src/pages/` — top-level pages (Index, NotFound)

Example paths you will find:

- src/app/router/routes.tsx — app routes
- src/features/auth/api/auth.api.ts — auth API client
- src/features/forms/api/forms.api.ts — forms API client
- src/shared/ui — design system components

---

## Local development

Install dependencies (use your package manager of choice; the repo includes a `bun.lockb` but `npm`/`pnpm`/`yarn` work too):

```bash
npm install
npm run dev
```

If you want to use Bun (faster installs):

```bash
bun install
bun dev
```

The frontend expects the backend to be running (see `../backend`). By default the app will call the API base defined in `src/app/config/env.ts` — update that file or set the appropriate env variable for your environment.

---

## Notes & tips

- Session restoration happens against `GET /auth/me` — ensure cookies or tokens are handled by the backend CORS policy.
- The UI assumes the backend returns success responses using the shape above; small mismatches can be adapted in the `src/shared/lib/api` client.

---

File updated: [frontend2/README.md](frontend2/README.md)
