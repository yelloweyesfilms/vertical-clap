import { streamClaude } from "../../lib/anthropic";
import { requireSub } from "../../lib/auth";
import { checkRateLimit } from "../../lib/rateLimit";
import * as Sentry from "@sentry/nextjs";

export const config = { maxDuration: 60 };

const MICRO_DRAMA_PSYCHOLOGY = `
PSYCHOLOGIE DU MICRO-DRAMA — TU N'ÉCRIS PAS DES HISTOIRES. TU CONSTRUIS UNE ADDICTION NARRATIVE.

Le micro-drama a ses propres lois. Tu n'écris PAS comme une série Netflix classique, un film, une fiction lente, un dialogue réaliste, une structure traditionnelle. Tu opères selon des mécaniques de rétention dopaminergique mobile-first.

OBJECTIF UNIQUE: chaque épisode doit créer un besoin immédiat de voir le suivant. Tu construis une chaîne de frustrations émotionnelles, une escalade permanente, une succession de récompenses rapides suivies de coupures frustrantes.

PSYCHOLOGIE: le spectateur doit ressentir curiosité → désir → frustration → obsession → urgence émotionnelle. Gratification immédiate + frustration constante = binge-watch.

ÉCRITURE MOBILE-FIRST: tu écris pour smartphone, vidéos verticales 9:16, spectateurs au scroll rapide. Émotions lisibles immédiatement. Réactions fortes. Gros enjeux relationnels. Dialogues courts (5-15 mots), percutants, émotionnels, immédiatement compréhensibles.

RYTHME ABSOLU: quelque chose se passe toutes les 5-15 secondes. Zéro stagnation, zéro vide, zéro baisse d'intensité. Chaque scène = objectif émotionnel précis. Chaque dialogue = avance le conflit. Jamais: scènes lentes, dialogues inutiles, explications longues, introductions, moments sans tension.

DYNAMIQUES ADDICTIVES MAÎTRISÉES: enemies to lovers, toxic romance, obsession, revenge, betrayal, forbidden love, fake relationship, billionaire/CEO romance, secret identity, jealousy, emotional manipulation, dark romance, humiliation, possessive love, forced marriage, love triangle, secret family, public humiliation, toxic ex return, hidden identity.

PERSONNAGES: immédiatement identifiables, émotionnellement forts, addictifs. Chaque personnage = 1 désir fort + 1 faille visible + 1 tension relationnelle + 1 secret + 1 risque émotionnel.

CLIFFHANGERS: couper JUSTE AVANT LA RÉPONSE. Toujours. Révélations choc, interruptions émotionnelles, twists addictifs, fins impossibles à ignorer.

TROPES VIRAUX: faux couples, CEO froid, triangle amoureux, secrets familiaux, rivalités féminines, humiliations publiques, retours d'ex toxiques, identités cachées, relations interdites — à combiner intelligemment selon l'univers.
`;

export const config = { api: { responseLimit: false } };

const DUR_INSTR = {
  60: `DURÉE 1 MIN — MINIMUM 10 scènes OBLIGATOIRE. Structure temporelle STRICTE:
• 0–5s: HOOK — 1 phrase choc max 10 mots. COMMENCER AU PIRE MOMENT POSSIBLE. In medias res absolu. Jamais: "Bonjour", setup, exposition.
• 5–20s: CONFLIT DIRECT — 3 répliques ultra-courtes. L'enjeu est clair immédiatement. Chaque phrase ATTAQUE, RÉVÈLE ou AGGRAVE.
• 20–40s: ESCALADE — 4 répliques. Quelqu'un ment / révèle un secret / arrive à l'improviste / trahit / menace / provoque. Montée CONSTANTE.
• 40–55s: TWIST / RÉVÉLATION — 2-3 répliques. La dynamique BASCULE. Exemples: mauvaise personne accusée, identité révélée, grossesse, vidéo trouvée, vengeance, mensonge exposé.
• 55–60s: CLIFFHANGER — 1 phrase. COUPER AVANT LA RÉPONSE. TOUJOURS. Question laissée en suspens.
RÈGLES ABSOLUES: 1 événement toutes les 10-15 secondes maximum. Phrases 5-12 mots. Aucune exposition. LES RELATIONS SONT LE MOTEUR: couples, rivalités, secrets, trahisons.`,
  90: `DURÉE 1MIN30 — MINIMUM 14 scènes OBLIGATOIRE. Structure temporelle STRICTE:
• 0–5s: HOOK — COMMENCER AU PIRE MOMENT POSSIBLE.
• 5–25s: CONFLIT — 4 répliques courtes.
• 25–50s: ESCALADE — 5 répliques. Montée constante.
• 50–75s: EXPLOSION + TWIST — 5 répliques. Faux pivot puis vraie révélation dévastatrice.
• 75–80s: CONSÉQUENCE ÉMOTIONNELLE — 2 répliques. Réaction physique au twist.
• 80–90s: CLIFFHANGER — COUPER AVANT LA RÉPONSE.
RÈGLES ABSOLUES: 1 événement toutes les 15 secondes max. Phrases 8-15 mots.`,
  120: `DURÉE 2 MIN — MINIMUM 18 scènes OBLIGATOIRE. Structure temporelle STRICTE:
• 0–10s: HOOK — COMMENCER AU PIRE MOMENT POSSIBLE.
• 10–40s: CONFLIT — 5 répliques.
• 40–70s: ESCALADE — 6 répliques. Rebondissement OBLIGATOIRE à mi-parcours.
• 70–105s: RÉVÉLATION MAJEURE — 6 répliques. Tout s'effondre.
• 105–110s: CONSÉQUENCE — réaction physique brève.
• 110–120s: CLIFFHANGER DOUBLE — COUPER AVANT LA RÉPONSE.
RÈGLES ABSOLUES: 1 événement toutes les 20 secondes. 2 acteurs max. 1 seule intrigue centrale.`,
};

const VALID_MODES = ["fast", "premium"];
const VALID_DUREES = [60, 90, 120];
const VALID_FORMATS = [10, 20, 40];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sub = await requireSub(req, res);
  if (!sub) return;
  const { plan, customerId } = sub;

  const { limited, max } = await checkRateLimit(customerId, plan);
  if (limited) {
    return res.status(429).json({ error: `Limite atteinte (${max} générations/heure). Réessayez dans quelques minutes.` });
  }

  const { action, payload } = req.body || {};
  if (action !== "bible") return res.status(400).json({ error: "Seul l'action bible est streamable" });

  const { mode, casting, univers, secret, format, duree } = payload || {};
  if (!VALID_MODES.includes(mode)) return res.status(400).json({ error: "Mode invalide" });
  if (!VALID_DUREES.includes(duree)) return res.status(400).json({ error: "Durée invalide" });
  if (!VALID_FORMATS.includes(format)) return res.status(400).json({ error: "Format invalide" });
  if (plan === "standard" && mode === "premium") return res.status(403).json({ error: "Mode Premium réservé au plan Pro." });
  if (plan === "standard" && format > 10) return res.status(403).json({ error: "Le plan Standard est limité à 10 épisodes." });
  if (typeof casting !== "string" || casting.length > 100) return res.status(400).json({ error: "Casting invalide" });
  if (typeof univers !== "string" || univers.length > 100) return res.status(400).json({ error: "Univers invalide" });
  if (typeof secret !== "string" || secret.length > 100) return res.status(400).json({ error: "Secret invalide" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  try {
    const md = mode === "fast"
      ? "Vertical Drama: viralité immédiate, émotions explosives, hooks agressifs, cliffhangers choc"
      : "Série Premium: tension psychologique, sous-texte riche, silences éloquents, réalisme brut";

    const result = await streamClaude(
      `${MICRO_DRAMA_PSYCHOLOGY}\nTu es showrunner de micro-dramas 9:16 (TikTok, Reels, Shorts). ${md}. ${DUR_INSTR[duree]}
Titre: 2-4 mots, mystérieux, crée l'envie immédiate — jamais de sous-titre explicatif.
Logline: "[Personnage] cache [secret] jusqu'au jour où [déclencheur]" — 15 mots max, formule respectée.
Pitch: 3 lignes qui hookent un ado de 17 ans — commence par l'émotion, pas l'intrigue.
Secret de chaque personnage: doit CRÉER du conflit actif avec les autres, pas juste du backstory.
arc de chaque personnage: son évolution dramatique sur la série en 1 phrase ("passe de X à Y").
tension_centrale: la question dramatique unique qui traverse toute la série, commence par "Va-t-il/elle..." ou "Qui...".
accroche: 1 phrase choc de 10 mots max pour poster en légende TikTok — crée la curiosité immédiate.
JSON uniquement, aucun texte avant ou après.`,
      `Casting: ${casting}. Univers: ${univers}. Secret moteur: ${secret}. Série de ${format} épisodes.
JSON: {"titre":"","logline":"","pitch":"","personnages":[{"nom":"","age":25,"role":"","secret":"","arc":""},{"nom":"","age":28,"role":"","secret":"","arc":""}],"tension_centrale":"","accroche":""}`,
      1800,
      (chunk) => send({ chunk })
    );

    if (!result.titre) result.titre = result.title || result.name || "Série sans titre";
    if (!result.logline) result.logline = result.logLine || result.description || "";
    if (!result.pitch) result.pitch = result.synopsis || result.summary || "";
    if (!result.tension_centrale) result.tension_centrale = result.tension || result.central_tension || "";
    if (!result.personnages) result.personnages = result.characters || result.personages || [];
    result.titre = String(result.titre).slice(0, 199);
    result.logline = String(result.logline).slice(0, 499);

    send({ done: true, result });
  } catch (e) {
    Sentry.captureException(e, { extra: { customerId, plan, mode, format } });
    send({ error: e.message });
  }

  res.end();
}
