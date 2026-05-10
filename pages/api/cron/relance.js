import { stripe } from "../../../lib/stripe";
import { sendRelanceEmail } from "../../../lib/email";
import { Redis } from "@upstash/redis";

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

export default async function handler(req, res) {
  // Vercel envoie automatiquement le CRON_SECRET en Bearer
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  const redis = getRedis();

  // Plage J-3 : de minuit à minuit
  const d3 = new Date();
  d3.setDate(d3.getDate() - 3);
  d3.setHours(0, 0, 0, 0);
  const d2 = new Date(d3);
  d2.setDate(d2.getDate() + 1);

  try {
    const subs = await stripe.subscriptions.list({
      status: "active",
      created: { gte: Math.floor(d3.getTime() / 1000), lt: Math.floor(d2.getTime() / 1000) },
      expand: ["data.customer"],
      limit: 100,
    });

    let sent = 0;
    for (const sub of subs.data) {
      const email = sub.customer?.email;
      const customerId = sub.customer?.id;
      if (!email || !customerId) continue;

      // Ne pas envoyer deux fois
      const key = `relance:j3:${customerId}`;
      if (redis) {
        const already = await redis.get(key);
        if (already) continue;
      }

      await sendRelanceEmail({ email });
      if (redis) await redis.set(key, "1", { ex: 60 * 60 * 24 * 30 });
      sent++;
    }

    return res.json({ ok: true, sent, total: subs.data.length });
  } catch (e) {
    console.error("[cron/relance]", e.message);
    return res.status(500).json({ error: e.message });
  }
}
