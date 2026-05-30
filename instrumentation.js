export async function register() {
  // Ne pas initialiser Sentry si DSN absent — évite crash au démarrage
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.05,
      enabled: process.env.NODE_ENV === "production",
      beforeSend(event, hint) {
        const msg = String(hint?.originalException?.message || hint?.originalException || event?.exception?.values?.[0]?.value || "");
        if (msg.includes("usage limit") || msg.includes("usage_limit")) return null;
        return event;
      },
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.05,
      enabled: process.env.NODE_ENV === "production",
      beforeSend(event, hint) {
        const msg = String(hint?.originalException?.message || hint?.originalException || event?.exception?.values?.[0]?.value || "");
        if (msg.includes("usage limit") || msg.includes("usage_limit")) return null;
        return event;
      },
    });
  }
}
