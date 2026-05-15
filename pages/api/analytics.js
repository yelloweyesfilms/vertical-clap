import { Redis } from "@upstash/redis";

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { event, meta = {} } = req.body || {};
  if (!event) return res.status(400).json({ error: "event required" });

  const redis = getRedis();
  if (redis) {
    const today = new Date().toISOString().slice(0, 10);
    const key = `analytics:${today}`;
    await redis.hincrby(key, event, 1);
    if (meta.variant) await redis.hincrby(key, `${event}:${meta.variant}`, 1);
    if (meta.position) await redis.hincrby(key, `${event}:${meta.position}`, 1);
    await redis.expire(key, 60 * 60 * 24 * 90); // keep 90 days
  }

  res.status(200).json({ ok: true });
}
