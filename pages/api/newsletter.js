import { Redis } from "@upstash/redis";
import { sendNewsletterWelcomeEmail } from "../../lib/email";

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body || {};
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
    await sendNewsletterWelcomeEmail({ email: normalized });
  } catch (e) {
    console.error("[newsletter] sendNewsletterWelcomeEmail failed:", e?.message || e);
    return res.json({ ok: true, already: !isNew, emailError: e?.message });
  }

  return res.json({ ok: true, already: !isNew });
}
