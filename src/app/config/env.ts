function required(name: string): string {
  const v = import.meta.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function optional(name: string, fallback = ""): string {
  return import.meta.env[name] ?? fallback;
}

export const env = {
  // Example: http://localhost:3333  (NO /api here — we’ll control that in http.ts)
  API_BASE_URL: required("VITE_API_BASE_URL"),

  // Optional, useful in headers/titles
  APP_NAME: optional("VITE_APP_NAME", "Forms"),
} as const;
