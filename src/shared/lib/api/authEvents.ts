type AuthEvent = "unauthorized";
type Handler = () => void;

const handlers = new Set<Handler>();

export function onAuthEvent(handler: Handler): () => void {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

export function emitAuthEvent(event: AuthEvent) {
  if (event !== "unauthorized") return;
  for (const h of handlers) h();
}
