import { Redis } from "@upstash/redis";

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
  if (redis) {
    const already = await redis.sismember("newsletter:emails", normalized);
    if (already) return res.json({ ok: true, already: true });
    await redis.sadd("newsletter:emails", normalized);
    await redis.incr("analytics:total:newsletter_signup");
  }

  return res.json({ ok: true });
}
