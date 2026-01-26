export type AuthProvider = "local" | "google";
export type UserRole = "admin" | "creator" | "common";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: AuthProvider;

  createdAt: string; 
  updatedAt: string; 

  googleId?: string | null;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  name: string;
  email: string;
  password: string;
};
