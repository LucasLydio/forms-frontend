// endpoints.ts
export const endpoints = {
  auth: {
    login:    "/auth/login",
    logout:   "/auth/logout",
    refresh:  "/auth/refresh",
    register: "/auth/register",
  },
  users: {
    list:     "/users",
    create:   "/users",
    me:       "/users/me",     
    update:   (id: string) => `/users/${id}`,
    delete:   (id: string) => `/users/${id}`,
    get:      (id: string) => `/users/${id}`,
  },
  forms: {
    list:     "/forms",
    listBy:   (userId: string) => `/forms?userId=${userId}`,
    create:   "/forms",
    update:   (id: string) => `/forms/${id}`,
    delete:   (id: string) => `/forms/${id}`,
    get:      (id: string) => `/forms/${id}`,
  },
  
} as const;
