import * as Sentry from "@sentry/nextjs";

// Ne pas initialiser si DSN absent
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.01,
    enabled: process.env.NODE_ENV === "production",
    ignoreErrors: [
      "wrsParams",
      "Non-Error promise rejection",
      /^Rejected$/,
    ],
    beforeSend(event, hint) {
      const msg = String(hint?.originalException?.message || hint?.originalException || event?.exception?.values?.[0]?.value || "");
      if (msg.includes("usage limit") || msg.includes("usage_limit")) return null;
      if (msg.includes("wrsParams")) return null;
      return event;
    },
  });
}
