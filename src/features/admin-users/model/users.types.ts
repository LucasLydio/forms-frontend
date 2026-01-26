export type AuthProvider = "local" | "google";
export type UserRole = "admin" | "creator" | "common";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: AuthProvider;

  googleId?: string | null;

  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type UpdateUserDTO = {
  name?: string;
  role?: UserRole;
  provider?: AuthProvider; // only if you allow changing it (often you don't)
};
