import { Redis } from "@upstash/redis";
import { sendNewsletterWelcomeEmail } from "../../lib/email";
import { Resend } from "resend";

const NOTIF_TO = "verticalclapapp@gmail.com";
const FROM = "VerticalClap <hello@verticalclap.app>";

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, lang = "fr" } = req.body || {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Email invalide" });
  }

  const normalized = email.trim().toLowerCase();

  const redis = getRedis();
  let isNew = true;
  if (redis) {
    const already = await redis.sismember("newsletter:emails", normalized);
    if (already) {
      isNew = false;
    } else {
      await redis.sadd("newsletter:emails", normalized);
      await redis.incr("analytics:total:newsletter_signup");
    }
  }

  // Toujours envoyer le mail de bienvenue (même si déjà inscrit, au cas où il ne l'a pas reçu)
  try {
    await sendNewsletterWelcomeEmail({ email: normalized, lang });
  } catch (e) {
    const msg = e?.message || String(e);
    console.error("[newsletter] sendNewsletterWelcomeEmail failed for", normalized, ":", msg);
    // Still return ok so UX shows success, but include error for debugging
    return res.json({ ok: true, already: !isNew, emailError: msg });
  }

  console.log("[newsletter] welcome email sent to", normalized, "lang:", lang);

  // Notification interne si nouvelle inscription
  if (isNew && process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: FROM,
        to: NOTIF_TO,
        subject: `📩 Nouvelle inscription newsletter — ${normalized}`,
        html: `<p style="font-family:sans-serif;font-size:15px;">Nouvelle inscription : <strong>${normalized}</strong> (lang: ${lang})</p>`,
      });
    } catch (e) {
      console.error("[newsletter] notif failed:", e.message);
    }
  }

  return res.json({ ok: true, already: !isNew });
}
