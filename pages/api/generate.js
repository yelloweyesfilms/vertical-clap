import { callClaude } from "../../lib/anthropic";
import { requireSub } from "../../lib/auth";
import { checkRateLimit } from "../../lib/rateLimit";
import { Redis } from "@upstash/redis";
import * as Sentry from "@sentry/nextjs";

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

async function trackAction(action, customerId) {
  try {
    const redis = getRedis();
    if (!redis) return;
    const today = new Date().toISOString().slice(0, 10);
    await Promise.all([
      redis.incr(`analytics:daily:${today}:${action}`),
      redis.incr(`analytics:total:${action}`),
      redis.sadd(`analytics:users:${today}`, customerId),
      redis.expire(`analytics:users:${today}`, 60 * 60 * 24 * 60), // 60 jours
    ]);
  } catch {}
}

// Cache in-memory : bible et épisodes cachés 1h (même params = même résultat)
const genCache = new Map();
const CACHE_TTL = 60 * 60 * 1000;
function getCached(key) {
  const entry = genCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { genCache.delete(key); return null; }
  return entry.data;
}
function setCached(key, data) {
  if (genCache.size > 500) {
    const oldest = [...genCache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0];
    genCache.delete(oldest[0]);
  }
  genCache.set(key, { data, ts: Date.now() });
}


const VALID_ACTIONS = ["bible", "episodes", "script", "edit", "titres", "variations", "traduire", "production", "cartes", "social", "affiche", "profils", "calendrier", "storyboard"];
const VALID_MODES = ["fast", "premium"];
const VALID_DUREES = [60, 90, 120];
const VALID_FORMATS = [10, 20, 40, 60, 90];
const VALID_EDIT_TYPES = ["pimenter", "subtil", "simplifier", "rewrite_hook", "rewrite_ending", "revelation"];

function validatePayload(action, payload) {
  if (!payload || typeof payload !== "object") return "Payload invalide";
  if (action === "bible") {
    const { mode, casting, univers, secret, format, duree, genre, lieu } = payload;
    if (!VALID_MODES.includes(mode)) return "Mode invalide";
    if (!VALID_DUREES.includes(duree)) return "Durée invalide";
    if (!VALID_FORMATS.includes(format)) return "Format invalide";
    if (mode === "fast" && format > 20) return "Le mode Vertical est limité à 20 épisodes. Passez en mode Série pour créer jusqu'à 90 épisodes.";
    if (typeof casting !== "string" || casting.length > 100) return "Casting invalide";
    if (typeof univers !== "string" || univers.length > 100) return "Univers invalide";
    if (typeof secret !== "string" || secret.length > 100) return "Secret invalide";
    if (genre !== undefined && (typeof genre !== "string" || genre.length > 100)) return "Genre invalide";
    if (lieu !== undefined && (typeof lieu !== "string" || lieu.length > 100)) return "Lieu invalide";
    if (payload.ambiance !== undefined && (typeof payload.ambiance !== "string" || payload.ambiance.length > 100)) return "Ambiance invalide";
    if (payload.tropes !== undefined && (typeof payload.tropes !== "string" || payload.tropes.length > 800)) return "Tropes invalides";
    if (payload.castingIA !== undefined && (typeof payload.castingIA !== "string" || payload.castingIA.length > 1200)) return "Casting IA invalide";
    if (payload.ambianceVisuelle !== undefined && (typeof payload.ambianceVisuelle !== "string" || payload.ambianceVisuelle.length > 800)) return "Ambiance visuelle invalide";
    if (payload.saison2 !== undefined && (typeof payload.saison2 !== "object" || payload.saison2 === null || typeof payload.saison2.titre !== "string")) return "Saison 2 invalide";
    if (payload.remakeInspiration !== undefined && (typeof payload.remakeInspiration !== "string" || payload.remakeInspiration.length > 300)) return "Remake invalide";
    if (payload.drama !== undefined) {
      if (typeof payload.drama !== "object" || payload.drama === null) return "Drama invalide";
      for (const k of ["romance", "toxicite", "mystere", "humour", "violence", "spicy"]) {
        if (payload.drama[k] !== undefined && (typeof payload.drama[k] !== "number" || payload.drama[k] < 0 || payload.drama[k] > 10)) return `Curseur drama invalide: ${k}`;
      }
    }
    if (payload.dramaPremium !== undefined) {
      if (typeof payload.dramaPremium !== "object" || payload.dramaPremium === null) return "Direction artistique invalide";
      for (const k of ["emotion", "rythme", "narration", "ton", "tension"]) {
        if (payload.dramaPremium[k] !== undefined && payload.dramaPremium[k] !== null && typeof payload.dramaPremium[k] !== "string") return `Paramètre artistique invalide: ${k}`;
      }
    }
  } else if (action === "episodes") {
    const { titre, logline, mode, from, to, total } = payload;
    if (!VALID_MODES.includes(mode)) return "Mode invalide";
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
    if (typeof logline !== "string" || logline.length > 500) return "Logline invalide";
    if (!Number.isInteger(from) || !Number.isInteger(to) || !Number.isInteger(total)) return "Numéros d'épisodes invalides";
    if (from < 1 || to > 90 || from > to) return "Plage d'épisodes invalide";
  } else if (action === "script") {
    const { ep, bible, mode, duree } = payload;
    if (!VALID_MODES.includes(mode)) return "Mode invalide";
    if (!VALID_DUREES.includes(duree)) return "Durée invalide";
    if (!ep || typeof ep !== "object") return "Épisode invalide";
    if (!bible || typeof bible !== "object") return "Bible invalide";
    if (payload.budgetInstr !== undefined && (typeof payload.budgetInstr !== "string" || payload.budgetInstr.length > 1200)) return "Budget invalide";
  } else if (action === "edit") {
    const { script, type, duree } = payload;
    if (!VALID_EDIT_TYPES.includes(type)) return "Type d'édition invalide";
    if (!VALID_DUREES.includes(duree)) return "Durée invalide";
    if (!script || typeof script !== "object") return "Script invalide";
  } else if (action === "variations") {
    const { ep, bible, mode, duree } = payload;
    if (!VALID_MODES.includes(mode)) return "Mode invalide";
    if (!VALID_DUREES.includes(duree)) return "Durée invalide";
    if (!ep || typeof ep !== "object") return "Épisode invalide";
    if (!bible || typeof bible !== "object") return "Bible invalide";
  } else if (action === "titres") {
    const { titre, logline, pitch, mode } = payload;
    if (!VALID_MODES.includes(mode)) return "Mode invalide";
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
    if (typeof logline !== "string" || logline.length > 500) return "Logline invalide";
    if (pitch !== undefined && (typeof pitch !== "string" || pitch.length > 500)) return "Pitch invalide";
  } else if (action === "traduire") {
    const { script, langue } = payload;
    if (!script || typeof script !== "object") return "Script invalide";
    const VALID_LANGUES = ["en", "es", "de", "pt", "it", "ar", "he", "zh"];
    if (!VALID_LANGUES.includes(langue)) return "Langue invalide";
  } else if (action === "production") {
    const { titre, logline, personnages } = payload;
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
    if (typeof logline !== "string" || logline.length > 500) return "Logline invalide";
    if (!Array.isArray(personnages)) return "Personnages invalides";
  } else if (action === "cartes") {
    const { personnages, titre } = payload;
    if (!Array.isArray(personnages) || personnages.length === 0) return "Personnages invalides";
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
  } else if (action === "social") {
    const { ep, bible, mode } = payload;
    if (!ep || typeof ep !== "object") return "Épisode invalide";
    if (!bible || typeof bible !== "object") return "Bible invalide";
    if (!VALID_MODES.includes(mode)) return "Mode invalide";
  } else if (action === "affiche") {
    const { titre, logline } = payload;
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
    if (typeof logline !== "string" || logline.length > 500) return "Logline invalide";
  } else if (action === "profils") {
    const { titre, personnages } = payload;
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
    if (!Array.isArray(personnages)) return "Personnages invalides";
  } else if (action === "calendrier") {
    const { titre, logline } = payload;
    if (typeof titre !== "string" || titre.length > 200) return "Titre invalide";
    if (typeof logline !== "string" || logline.length > 500) return "Logline invalide";
  } else if (action === "storyboard") {
    const { ep, script, bible } = payload;
    if (!ep || typeof ep !== "object") return "Épisode invalide";
    if (!script || typeof script !== "object") return "Script invalide";
    if (!bible || typeof bible !== "object") return "Bible invalide";
  }
  return null;
}

function buildLangInstr(lang) {
  if (lang === "en") return "\nLANGUAGE: Generate ALL content in English — titles, dialogues, loglines, descriptions, character names where appropriate. The entire output must be in English.";
  return "";
}

function buildDramaInstr(drama) {
  if (!drama || typeof drama !== "object") return "";
  const { romance = 5, toxicite = 5, mystere = 4, humour = 2, violence = 3, spicy = 3 } = drama;
  const lines = [];
  if (romance >= 7) lines.push("ROMANCE INTENSE: tension amoureuse omniprésente, regards, frôlements, désir non dit — la relation amoureuse est au cœur de chaque scène.");
  else if (romance <= 2) lines.push("ROMANCE ABSENTE: aucune dimension romantique, les relations sont purement conflictuelles ou professionnelles.");
  if (toxicite >= 7) lines.push("TOXICITÉ MAXIMALE: manipulation, gaslighting, chantage émotionnel, emprise — les personnages se blessent intentionnellement et systématiquement.");
  else if (toxicite >= 5) lines.push("TOXICITÉ PRÉSENTE: dynamiques de pouvoir déséquilibrées, dépendance, coups bas récurrents.");
  else if (toxicite <= 2) lines.push("DYNAMIQUES SAINES: les conflits sont francs et directs, sans manipulation.");
  if (mystere >= 7) lines.push("MYSTÈRE MAXIMAL: chaque scène révèle quelque chose mais en cache davantage — narrateur peu fiable, vrais motifs jamais explicites, twist possible à chaque réplique.");
  else if (mystere >= 5) lines.push("COUCHE DE MYSTÈRE: des sous-entendus et questions non résolues traversent l'épisode.");
  else if (mystere <= 2) lines.push("CLARTÉ TOTALE: tout est dit clairement, aucun sous-texte caché.");
  if (humour >= 7) lines.push("COMÉDIE NOIRE: ironie mordante, situations absurdes, second degré omniprésent — le drama est traité avec distance et dérision.");
  else if (humour >= 5) lines.push("TOUCHES D'HUMOUR NOIR: quelques répliques piquantes ou situations ironiques allègent la tension.");
  else if (humour <= 2) lines.push("AUCUN HUMOUR: ton sérieux et dramatique du début à la fin, zéro légèreté.");
  if (violence >= 7) lines.push("VIOLENCE FORTE: confrontations physiques ou verbales dures, menaces crédibles, conséquences corporelles ou émotionnelles graves.");
  else if (violence >= 4) lines.push("VIOLENCE MODÉRÉE: éclats de violence verbale ou physique brève, menaces sous-entendues.");
  else if (violence <= 1) lines.push("SANS VIOLENCE: aucune confrontation physique ni menace directe.");
  if (spicy >= 7) lines.push("TENSION MAXIMALE: attirance physique explicite, désir brûlant, tension sexuelle palpable — les corps parlent autant que les mots.");
  else if (spicy >= 5) lines.push("TENSION PALPABLE: chemistry forte entre les personnages, regard et proximité physique assumés.");
  else if (spicy <= 2) lines.push("TON SOBRE: aucune tension physique, registre neutre et familial.");
  return lines.length > 0 ? `\nDRAMA ENGINE — instructions de ton:\n${lines.join("\n")}` : "";
}

function buildDramaPremiumInstr(dramaPremium) {
  if (!dramaPremium || typeof dramaPremium !== "object") return "";
  const { emotion, rythme, narration, ton, tension } = dramaPremium;
  const lines = [];

  if (emotion) {
    const map = {
      "Intime": "REGISTRE INTIME: émotions intériorisées, micro-expressions, silences significatifs — chaque regard en dit plus que les dialogues.",
      "Intimate": "INTIMATE REGISTER: internalized emotions, micro-expressions, meaningful silences — every glance says more than words.",
      "Épique": "REGISTRE ÉPIQUE: enjeux élevés, grandeur émotionnelle, destins qui se jouent — chaque scène a le poids d'un moment historique.",
      "Epic": "EPIC REGISTER: high stakes, emotional grandeur, fates at play — every scene carries the weight of a defining moment.",
      "Mélancolique": "REGISTRE MÉLANCOLIQUE: nostalgie, regret, beauté de ce qui est perdu — une tristesse élégante traverse tout le récit.",
      "Melancholic": "MELANCHOLIC REGISTER: nostalgia, regret, beauty of what is lost — an elegant sadness runs through the whole narrative.",
      "Brutal": "REGISTRE BRUTAL: crûté sans filtre, confrontations directes, vérités qui font mal — aucune complaisance, aucun adoucissement.",
      "Brutal": "BRUTAL REGISTER: unfiltered rawness, direct confrontations, truths that hurt — no softening, no politeness.",
    };
    if (map[emotion]) lines.push(map[emotion]);
  }

  if (rythme) {
    const map = {
      "Slow burn": "RYTHME SLOW BURN: tension qui monte imperceptiblement, patience narrative, la récompense vient tard mais fort — chaque épisode installe un peu plus l'inévitable.",
      "Progressif": "RYTHME PROGRESSIF: escalade contrôlée, chaque épisode monte d'un cran — structure en crescendo vers une révélation finale.",
      "Progressive": "PROGRESSIVE PACE: controlled escalation, each episode raises the stakes — crescendo structure toward a final reveal.",
      "Frénétique": "RYTHME FRÉNÉTIQUE: tout s'emballe, les événements se percutent, le spectateur n'a pas le temps de respirer — urgence permanente.",
      "Frenetic": "FRENETIC PACE: everything accelerates, events collide, the viewer has no time to breathe — permanent urgency.",
      "Minimaliste": "RYTHME MINIMALISTE: peu de scènes, beaucoup de vide — la tension vit dans les silences, les absences, ce qui n'est pas dit.",
      "Minimalist": "MINIMALIST PACE: few scenes, much silence — tension lives in the gaps, absences, what goes unsaid.",
    };
    if (map[rythme]) lines.push(map[rythme]);
  }

  if (narration) {
    const map = {
      "Linéaire": "NARRATION LINÉAIRE: chronologie claire, cause → effet, le spectateur suit une progression logique et satisfaisante.",
      "Linear": "LINEAR NARRATION: clear chronology, cause → effect, the viewer follows a logical and satisfying progression.",
      "Fragmentée": "NARRATION FRAGMENTÉE: non-linéaire, flashbacks, ellipses — le spectateur assemble les pièces lui-même, la structure crée du mystère.",
      "Fragmented": "FRAGMENTED NARRATION: non-linear, flashbacks, ellipses — the viewer assembles the pieces, the structure itself creates mystery.",
      "Mystère": "NARRATION MYSTÈRE: information retenue, révélations en cascade, chaque réponse ouvre trois nouvelles questions.",
      "Mystery": "MYSTERY NARRATION: information withheld, cascading reveals, every answer opens three new questions.",
      "Multi-POV": "MULTI-POV: plusieurs points de vue contradictoires sur les mêmes événements — la vérité dépend de qui parle.",
    };
    if (map[narration]) lines.push(map[narration]);
  }

  if (ton) {
    const map = {
      "Réaliste": "TON RÉALISTE: dialogues comme dans la vraie vie, situations vraisemblables, psychologie crédible — le spectateur s'identifie.",
      "Realistic": "REALISTIC TONE: dialogue as in real life, plausible situations, credible psychology — the viewer identifies.",
      "Poétique": "TON POÉTIQUE: métaphores dans les dialogues, images fortes, instants suspendus — le récit transcende le réel.",
      "Poetic": "POETIC TONE: metaphors in dialogue, strong images, suspended moments — the narrative transcends reality.",
      "Commercial": "TON COMMERCIAL: efficacité maximale, moments viraux, hooks évidents, satisfaction immédiate — optimisé pour les plateformes.",
      "Commercial": "COMMERCIAL TONE: maximum efficiency, viral moments, obvious hooks, immediate satisfaction — optimized for platforms.",
      "Auteur": "TON AUTEUR: point de vue assumé, thématiques profondes, ambiguïté morale — le récit dit quelque chose sur le monde.",
      "Auteur": "AUTEUR TONE: an authored perspective, deep themes, moral ambiguity — the narrative says something about the world.",
    };
    if (map[ton]) lines.push(map[ton]);
  }

  if (tension) {
    const map = {
      "Romance": "MOTEUR ROMANTIQUE: l'attraction et les sentiments amoureux sont le cœur de la tension — tout converge vers la question 'seront-ils ensemble?'",
      "Rivalité": "MOTEUR RIVALITÉ: compétition, ambition, ego — deux personnages veulent la même chose et un seul peut gagner.",
      "Rivalry": "RIVALRY ENGINE: competition, ambition, ego — two characters want the same thing and only one can win.",
      "Toxicité": "MOTEUR TOXICITÉ: emprise, dépendance, fascination malsaine — une relation qui détruit mais dont on ne peut pas s'échapper.",
      "Toxicity": "TOXICITY ENGINE: control, dependency, unhealthy fascination — a relationship that destroys but can't be escaped.",
      "Désir": "MOTEUR DÉSIR: tension physique et émotionnelle, l'attraction interdit ou impossible — ce qui ne peut pas être dit est tout.",
      "Desire": "DESIRE ENGINE: physical and emotional tension, forbidden or impossible attraction — what cannot be said is everything.",
      "Manipulation": "MOTEUR MANIPULATION: un personnage orchestre les autres — les rapports de force changent, les alliances se font et défont.",
    };
    if (map[tension]) lines.push(map[tension]);
  }

  return lines.length > 0 ? `\nDIRECTION ARTISTIQUE — vision cinématographique:\n${lines.join("\n")}` : "";
}

const DUR_INSTR = {
  60: `DURÉE 1 MIN — Tu DOIS générer exactement 10 à 13 scènes dans le tableau "scenes" (ni plus ni moins). Structure temporelle OBLIGATOIRE:
• 0–5s: HOOK — 1 phrase choc max 10 mots, in medias res, jamais de bonjour
• 5–20s: Conflit immédiat — 3 répliques courtes, tension explose [scènes 1-3]
• 20–40s: Escalade / révélation — 4 répliques, secret révélé ou menace [scènes 4-7]
• 40–55s: Explosion émotionnelle — 3 répliques, pic dramatique [scènes 8-10]
• 55–60s: CLIFFHANGER — 1 phrase qui coupe net, question sans réponse
RÈGLES: phrases ULTRA courtes (5-12 mots max), aucune exposition, aucune politesse, chaque réplique révèle ou cache quelque chose. 1 SEULE idée forte par épisode. MINIMUM 10 scènes obligatoire.`,
  90: `DURÉE 1MIN30 — Tu DOIS générer exactement 14 à 18 scènes dans le tableau "scenes". Structure temporelle OBLIGATOIRE:
• 0–5s: HOOK — 1 phrase choc, situation déjà explosive
• 5–25s: Conflit — 4 répliques courtes, tension immédiate [scènes 1-4]
• 25–55s: Escalade — 6 répliques, faux pivot puis vraie révélation [scènes 5-10]
• 55–80s: Explosion — 4 répliques, conséquence émotionnelle [scènes 11-14]
• 80–90s: CLIFFHANGER — retournement brutal, question ouverte
RÈGLES: phrases courtes (8-15 mots), sous-texte riche, silences pesants, 1 idée centrale maximum. MINIMUM 14 scènes obligatoire.`,
  120: `DURÉE 2 MIN — Tu DOIS générer exactement 18 à 24 scènes dans le tableau "scenes". Structure temporelle OBLIGATOIRE:
• 0–5s: HOOK — situation déjà en crise
• 5–30s: Conflit — 5 répliques, contexte minimal par l'action [scènes 1-5]
• 30–70s: Escalade — 7 répliques, rebondissement à mi-parcours obligatoire [scènes 6-12]
• 70–105s: Révélation — 6 répliques, tout s'effondre [scènes 13-18]
• 105–120s: CLIFFHANGER — double révélation ou question dévastatrice
RÈGLES: phrases moyennes (10-20 mots), une seule intrigue centrale, 2 acteurs max. MINIMUM 18 scènes obligatoire.`,
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sub = await requireSub(req, res);
  if (!sub) return;
  const { customerId, plan } = sub;

  const { limited, count, max } = await checkRateLimit(customerId, plan);
  if (limited) {
    return res.status(429).json({ error: `Limite atteinte (${max} générations/heure). Réessayez dans quelques minutes.` });
  }

  const { action, payload } = req.body || {};

  if (!VALID_ACTIONS.includes(action)) {
    return res.status(400).json({ error: "Action inconnue" });
  }

  // Restrictions plan Standard
  const PREMIUM_ACTIONS = ["variations", "titres"];
  if (plan === "standard" && PREMIUM_ACTIONS.includes(action)) {
    return res.status(403).json({ error: "Cette fonctionnalité est réservée au plan Premium. Passez à Premium pour débloquer les variations et les titres viraux." });
  }
  if (plan === "standard" && action === "bible" && payload?.mode === "premium") {
    return res.status(403).json({ error: "Le mode Série est réservé au plan Premium." });
  }
  if (plan === "standard" && action === "bible" && payload?.format > 20) {
    return res.status(403).json({ error: "Le plan Standard est limité à 20 épisodes. Passez à Premium pour créer jusqu'à 90 épisodes." });
  }

  const validationError = validatePayload(action, payload);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    if (action === "bible") {
      const { mode, casting, univers, secret, format, duree, genre, lieu, ambiance, tropes, drama, dramaPremium, lang, castingIA, ambianceVisuelle, saison2, remakeInspiration } = payload;
      const ck = `bible:${mode}:${casting}:${univers}:${secret}:${format}:${duree}:${genre || ""}:${lieu || ""}:${ambiance || ""}:${tropes || ""}:${JSON.stringify(drama || {})}:${JSON.stringify(dramaPremium || {})}:${lang || "fr"}:${saison2 ? saison2.titre : ""}:${remakeInspiration || ""}`;
      const cached = getCached(ck);
      if (cached) return res.json(cached);
      const md = mode === "fast"
        ? "Vertical Drama: rythme haletant, émotions explosives, hooks dévastateurs, cliffhangers choc — format court optimisé mobile"
        : "Série Premium: tension psychologique profonde, sous-texte riche, silences éloquents, réalisme cinématographique";
      const genreInstr = genre ? `Genre: ${genre} — respecte les codes émotionnels et narratifs de ce genre.` : "";
      const lieuInstr = lieu ? `Lieu principal: "${lieu}" — les scènes se déroulent dans ce lieu limité, exploite l'espace pour créer la tension et la claustrophobie dramatique.` : "";
      const ambianceMap = { "⚡ Intense & Direct": "Ton INTENSE ET DIRECT: dialogues percutants, confrontations frontales, émotions à fleur de peau, rythme rapide.", "💜 Émotionnel & Poétique": "Ton ÉMOTIONNEL ET POÉTIQUE: dialogues touchants, métaphores, profondeur des sentiments, moments de vulnérabilité.", "🧠 Psychologique & Lent": "Ton PSYCHOLOGIQUE ET LENT: sous-texte riche, silences significatifs, manipulation subtile, tension qui monte sans éclater." };
      const ambianceInstr = ambiance && ambianceMap[ambiance] ? ambianceMap[ambiance] : "";
      const tropesInstr = tropes ? `Tropes & codes narratifs du pack: ${tropes}. Respecte ces codes comme ADN de la série.` : "";
      const castingIAInstr = castingIA ? `CASTING IA — identités fortes imposées: ${castingIA}. Chaque personnage DOIT avoir exactement cette voix, ce style, cette personnalité et cette aura. Ces traits définissent leurs dialogues, leurs réactions et leur présence dans chaque scène.` : "";
      const ambianceVisInstr = ambianceVisuelle ? `${ambianceVisuelle}` : "";
      const dramaInstr = mode === "premium" ? buildDramaPremiumInstr(dramaPremium) : buildDramaInstr(drama);
      const langInstr = buildLangInstr(lang);
      const saison2Instr = saison2 ? `\nSAISON 2 — SUITE DIRECTE: Cette série est la continuité directe de "${saison2.titre}". La saison 1 s'est terminée sur: "${saison2.tension_centrale}". Les personnages reviennent transformés par les événements de S1. OBLIGATOIRE: nouveaux secrets inédits, nouvelle tension centrale différente, nouveaux arcs d'évolution — pas une répétition. Fais référence aux conséquences de S1 dans les secrets et arcs de S2.` : "";
      const remakeInstr = remakeInspiration ? `\nINSPIRATION SÉRIE: ${remakeInspiration}. Garde l'ADN émotionnel et narratif de cette référence mais crée des personnages 100% originaux, un univers adapté au micro-drama mobile vertical.` : "";
      const result = await callClaude(
        `Tu es showrunner de micro-dramas verticaux 9:16 (TikTok, DramaBox, ReelShort, Reels, YouTube Shorts). ${md}. ${DUR_INSTR[duree]}\n${genreInstr}\n${lieuInstr}\n${ambianceInstr}\n${tropesInstr}\n${castingIAInstr}\n${ambianceVisInstr}${dramaInstr}${saison2Instr}${remakeInstr}${langInstr}\nTitre: 2-4 mots, mystérieux, crée l'envie immédiate — jamais de sous-titre explicatif.\nLogline: "[Personnage] cache [secret] jusqu'au jour où [déclencheur]" — 15 mots max, formule respectée.\nPitch: 3 lignes qui hookent un ado de 17 ans — commence par l'émotion, pas l'intrigue.\nSecret de chaque personnage: doit CRÉER du conflit actif avec les autres, pas juste du backstory.\narc de chaque personnage: son évolution dramatique sur la série en 1 phrase ("passe de X à Y").\ntension_centrale: la question dramatique unique qui traverse toute la série, commence par "Va-t-il/elle..." ou "Qui...".\naccroche: 1 phrase choc de 10 mots max pour poster en légende TikTok — crée la curiosité immédiate.\nJSON uniquement, aucun texte avant ou après.`,
        `Casting: ${casting}. Univers: ${univers}. Secret moteur: ${secret}. Série de ${format} épisodes.\nJSON: {"titre":"","logline":"","pitch":"","personnages":[{"nom":"","age":25,"role":"","secret":"","arc":""},{"nom":"","age":28,"role":"","secret":"","arc":""}],"tension_centrale":"","accroche":""}`,
        1800
      );
      if (!result.titre) result.titre = result.title || result.name || "Série sans titre";
      if (!result.logline) result.logline = result.logLine || result.description || "";
      if (!result.pitch) result.pitch = result.synopsis || result.summary || "";
      if (!result.tension_centrale) result.tension_centrale = result.tension || result.central_tension || "";
      if (!result.personnages) result.personnages = result.characters || result.personages || [];
      result.titre = String(result.titre).slice(0, 199);
      result.logline = String(result.logline).slice(0, 499);
      setCached(ck, result);
      trackAction("bible", customerId);
      return res.json(result);
    }

    if (action === "episodes") {
      const { titre, logline, mode, from, to, total, lang } = payload;
      const ck = `episodes:${titre}:${mode}:${from}:${to}:${total}:${lang || "fr"}`;
      const cached = getCached(ck);
      if (cached) return res.json(cached);
      const md = mode === "fast"
        ? "Vertical Drama: rythme court, émotions frontales, format mobile"
        : "Série Premium: tension psychologique, sous-texte profond";
      const tFrom = Math.max(1, Math.round(from * 10 / total));
      const tTo = Math.min(10, Math.round(to * 10 / total));
      const langInstr = buildLangInstr(lang);
      const result = await callClaude(
        `Tu es showrunner expert. JSON uniquement.${langInstr}\nRègles pour chaque épisode:\n- titre: 2-3 mots max, teaser sans spoiler, crée la curiosité (ex: "Le mensonge", "Elle sait", "Trop tard")\n- cliffhanger: action ou révélation coupée net qui oblige à regarder l'épisode suivant — phrase incomplète ou question suspendue, jamais de résolution\n- tension: entier 1-10 en progression logique sur la série`,
        `Série "${titre}" — ${logline}. Mode: ${md}.\nÉpisodes ${from} à ${to} (série de ${total} épisodes). Tension globale: ${tFrom} → ${tTo}/10.\nJSON: {"episodes":[{"numero":${from},"titre":"","cliffhanger":"","tension":${tFrom}}]}`,
        2500
      );
      setCached(ck, result);
      trackAction("episodes", customerId);
      return res.json(result);
    }

    if (action === "script") {
      const { ep, bible, mode, duree, prevEps, lang, ambianceVisuelle: scriptAV, budgetInstr, dramaPremium: scriptDramaPremium } = payload;
      const md = mode === "fast"
        ? "Vertical Drama: émotions explosives, confrontations directes, cliffhangers choc"
        : "Série Premium: sous-texte intense, silences signifiants, tension dramatique progressive";
      const maxS = duree <= 60 ? 8 : duree <= 90 ? 11 : 15;
      const persos = (bible.personnages || []).map(p => `${p.nom} (${p.role}${p.secret ? `, secret: ${p.secret}` : ""})`).join(", ");
      const prevEpsInstr = prevEps && prevEps.length > 0
        ? `\nCONTINUITÉ: Les épisodes précédents se sont terminés ainsi — ${prevEps.map(e => `ép.${e.numero} "${e.titre}": ${e.cliffhanger}`).join(" / ")}. Assure la cohérence narrative et fais des références implicites aux événements passés.`
        : "";
      const styleMap = {
        "🎬 Cinéma": "Style CINÉMA: silences pesants, regards caméra, peu de mots — chaque réplique est un événement. Phrases 5-10 mots. Pauses et émotions > dialogue.",
        "⚡ TikTok Drama": "Style VERTICAL DRAMA: rythme haletant, punchlines, interruptions. Phrases 8-15 mots. Cuts rapides. Émotion brute et immédiate.",
        "⚡ Vertical Drama": "Style VERTICAL DRAMA: rythme haletant, punchlines, interruptions. Phrases 8-15 mots. Cuts rapides. Émotion brute et immédiate.",
        "🎭 Soap Opera": "Style SOAP OPERA: dialogues plus développés, révélations multiples, retournements. Phrases 12-20 mots. Tension qui s'accumule.",
        "🎙️ Voix Off": "Style VOIX OFF NARRATION: format hybride dialogue + narration. Ajoute un champ 'voix_off' dans chaque scène (8-15 mots, ton intime et confidentiel, pensées du personnage OU narration rétrospective). Le dialogue reste 5-10 mots, incisif. Format populaire sur DramaBox et TikTok storytelling. Dans la voix_off: révèle ce que le personnage ne dit pas.",
      };
      const styleInstr = payload.style && styleMap[payload.style] ? styleMap[payload.style] : styleMap["⚡ TikTok Drama"];
      const scriptDramaInstr = mode === "premium" ? buildDramaPremiumInstr(scriptDramaPremium) : buildDramaInstr(payload.drama);
      const scriptLangInstr = buildLangInstr(lang);
      const scriptAVInstr = scriptAV ? `\n${scriptAV}\nLes descriptions visuel_916 DOIVENT refléter cette identité visuelle précisément.` : "";
      const scriptBudgetInstr = budgetInstr ? `\n${budgetInstr}` : "";
      const result = await callClaude(
        `Tu es scénariste expert de micro-dramas 9:16 viraux. ${DUR_INSTR[duree]} Mode: ${md}. ${styleInstr}${scriptDramaInstr}${scriptAVInstr}${scriptBudgetInstr}${scriptLangInstr}\nRÈGLES ABSOLUES:\n• 1 SEULE idée forte par épisode — jamais 5 conflits en 1 minute\n• IN MEDIAS RES — déjà en plein conflit, INTERDIT: "Bonjour", exposition, question banale\n• Chaque réplique révèle OU cache — zéro remplissage, zéro politesse\n• Max 2 acteurs à l'écran, format 9:16 gros plans\n• Ce qui fonctionne: jalousie, humiliation, secret révélé, tension sexuelle, retournement brutal\n• Ce qui tue: dialogues longs, scènes lentes, trop de personnages, concepts compliqués\n• visuel_916: NOM DU PLAN + émotion précise (ex: "gros plan yeux larmoyants", "zoom lent sur main qui tremble")\n• jeu: état interne court (ex: "retient ses larmes", "sourire glacial", "voix qui tremble")\n• label cliffhanger: question du spectateur (ex: "Il sait?", "C'était lui?")\nJSON uniquement.`,
        `Script ép.${ep.numero} "${ep.titre}". Série: "${bible.titre}". Personnages: ${persos}.\nTension: ${bible.tension_centrale || ""}.\nCliffhanger cible: ${ep.cliffhanger}.${prevEpsInstr}\nJSON: {"hook_scene":{"texte":"","visuel_916":""},"scenes":[{"perso":"","dialogue":"","jeu":"","visuel_916":""}],"cliffhanger_scene":{"texte":"","visuel_916":"","label":""},"checklist":[""]}`,
        4000
      );
      trackAction("script", customerId);
      return res.json(result);
    }

    if (action === "edit") {
      const { script, type, duree, lang } = payload;
      const maxS = duree <= 60 ? 8 : duree <= 90 ? 11 : 15;
      const currentHook = script?.hook_scene?.texte || "";
      const currentCliff = script?.cliffhanger_scene?.texte || "";
      const instr = {
        pimenter: `INTENSIFIE ce script au maximum. Remplace chaque réplique ordinaire par une révélation, une accusation ou une menace. Interdit: hésitations, politesse, questions vagues. Chaque ligne doit blesser ou exposer un secret. Max ${maxS} échanges. Retourne exactement la même structure JSON.`,
        subtil: `RENDS ce script subtil et psychologique. Aucun personnage ne dit ce qu'il veut vraiment — tout passe par le sous-texte, les silences (indique "(silence)" dans jeu), les métaphores et les regards. Remplace les confrontations directes par des non-dits lourds. Max ${maxS} échanges. Même structure JSON.`,
        simplifier: `SIMPLIFIE radicalement ce script. Un seul lieu. Une seule révélation centrale. Répliques 5-8 mots max, chaque mot compte. Supprime tout ce qui n'est pas essentiel à la tension principale. Max ${maxS} échanges. Même structure JSON.`,
        rewrite_hook: `RÉÉCRIS UNIQUEMENT le hook d'ouverture (hook_scene). Le hook actuel est: "${currentHook}" — tu DOIS produire quelque chose de radicalement différent: autre situation de départ, autre émotion d'ouverture, autre dynamique entre les personnages. INTERDIT de reprendre les mêmes mots ou la même situation. Le reste du script (scenes + cliffhanger_scene) reste identique. Même structure JSON.`,
        rewrite_ending: `RÉÉCRIS UNIQUEMENT la fin (cliffhanger_scene). Le cliffhanger actuel est: "${currentCliff}" — tu DOIS produire quelque chose de complètement différent: autre révélation, autre retournement, autre question laissée ouverte. INTERDIT de reprendre les mêmes mots ou la même situation. Pense: trahison inattendue, révélation d'identité, objet découvert, mensonge exposé, arrivée surprise. Le hook et les scenes du milieu restent identiques. Même structure JSON.`,
        revelation: `INSÈRE UNE RÉVÉLATION EXPLOSIVE dans ce script. Choisis LE SECRET LE PLUS DÉVASTATEUR et inattendu qui colle aux personnages et à l'univers — parmi ces possibilités: adoption cachée, mensonge sur l'âge réel, grossesse secrète, ruine financière dissimulée, fausse identité / faux profil, connaissait déjà la victime depuis le début, liaison cachée avec un proche, enfant caché, trahison organisée depuis le premier épisode, double vie révélée. La révélation DOIT tomber comme une bombe: un personnage lâche la vérité (ou la découvre) de façon brutale et irréversible. RÉÉCRIS le cliffhanger_scene pour que ce secret éclate au grand jour — réaction de choc, silence, fuite ou confrontation immédiate. Adapte 1 ou 2 scenes du milieu pour que la révélation soit crédible rétrospectivement (des indices qui prennent sens). Garde le hook_scene identique. Même structure JSON.`,
      };
      const langInstr = buildLangInstr(lang);
      const result = await callClaude(
        `Tu es scénariste expert en micro-dramas 9:16. JSON uniquement, structure identique à l'original.${langInstr}`,
        `${instr[type]}\n\nScript original:\n${JSON.stringify(script)}`,
        2000
      );
      return res.json(result);
    }

    if (action === "variations") {
      const { ep, bible, mode, duree, lang } = payload;
      const maxS = duree <= 60 ? 8 : duree <= 90 ? 11 : 15;
      const persos = (bible.personnages || []).map(p => `${p.nom} (${p.role}${p.secret ? `, secret: ${p.secret}` : ""})`).join(", ");
      const base = `Script ép.${ep.numero} "${ep.titre}". Série: "${bible.titre}". Persos: ${persos}. Tension: ${bible.tension_centrale || ""}. Cliffhanger: ${ep.cliffhanger}.\nRÈGLES: IN MEDIAS RES, ${maxS} échanges max 25 mots, max 2 acteurs, visuel_916 = nom du plan + émotion, jeu = état interne court.\nJSON: {"hook_scene":{"texte":"","visuel_916":""},"scenes":[{"perso":"","dialogue":"","jeu":"","visuel_916":""}],"cliffhanger_scene":{"texte":"","visuel_916":"","label":""},"checklist":[""]}`;
      const styles = [
        { label: "🌶 Intense", instr: "Version INTENSE: confrontation directe, accusations, révélations brutales. Chaque réplique choque ou blesse. Aucune politesse." },
        { label: "🤫 Subtil", instr: "Version SUBTILE: tout passe par le sous-texte, jamais de confrontation directe. Les personnages parlent D'AUTRE CHOSE mais le vrai conflit est partout. Silences ('(silence)' dans jeu) significatifs." },
        { label: "⚡ Rapide", instr: "Version RAPIDE: répliques 3-8 mots max, rythme haletant. Chaque échange coupe l'autre. Tension physique, mouvement, action." },
        { label: "🌙 Sombre", instr: "Version SOMBRE: atmosphère lourde et enfermée, dialogue murmuré ou retenu, révélation finale dévastatrice, fin ambiguë qui laisse une question ouverte." },
      ];
      const langInstr = buildLangInstr(lang);
      const results = await Promise.all(styles.map(({ instr }) =>
        callClaude(`Tu es scénariste expert micro-dramas 9:16. ${DUR_INSTR[duree]} JSON uniquement.${langInstr}`, `${instr}\n\n${base}`, 2000)
      ));
      trackAction("variations", customerId);
      return res.json({ variations: results.map((r, i) => ({ ...r, label: styles[i].label })) });
    }

    if (action === "titres") {
      const { titre, logline, pitch, mode, lang } = payload;
      const langInstr = buildLangInstr(lang);
      const result = await callClaude(
        `Tu es expert en viralité des contenus courts (TikTok, Reels, Shorts). Tu maîtrises les 5 patterns de titres qui stoppent le scroll:\nRÉVÉLATION: expose un secret ("Il mentait depuis le début")\nQUESTION: pose une question impossible à ignorer ("Et si elle savait tout?")\nIDENTITÉ: menace l'identité d'un personnage ("Plus jamais sa femme")\nSECRET: suggère un secret explosif ("Ton patron sait tout")\nTWIST: annonce un retournement ("C'était elle")\nRègles: titre 2-5 mots, jamais de point d'exclamation, score = probabilité de stopper le scroll (1-100).\nJSON uniquement.${langInstr}`,
        `Série micro-drama 9:16. Titre actuel: "${titre}". Logline: ${logline}. Pitch: ${pitch || ""}.\nGénère 5 titres viraux — exactement un par pattern (RÉVÉLATION, QUESTION, IDENTITÉ, SECRET, TWIST).\nJSON: {"titres":[{"titre":"","score":95,"accroche":"en quoi ce titre arrête le scroll","pourquoi":"mécanisme psychologique exploité","pattern":"RÉVÉLATION"}]}`,
        1000
      );
      trackAction("titres", customerId);
      return res.json(result);
    }

    if (action === "traduire") {
      const { script, langue } = payload;
      const noms = { en: "English", es: "Español", de: "Deutsch", pt: "Português", it: "Italiano", ar: "العربية", he: "עברית", zh: "中文" };
      const result = await callClaude(
        `Tu es expert en adaptation de scripts micro-dramas 9:16 pour ${noms[langue]}.\nRègles strictes:\n• Préserve le ton, les émotions et l'intensité dramatique — pas de traduction littérale plate\n• Les indications de jeu (champ "jeu") doivent sonner naturel en ${noms[langue]}, adaptées culturellement\n• Les dialogues doivent avoir le même punch dans la langue cible — si nécessaire, reformule pour garder l'impact\n• Conserve exactement la même structure JSON, ne modifie aucune clé\n• JSON uniquement, aucun texte avant ou après`,
        JSON.stringify(script),
        2400
      );
      trackAction("traduction", customerId);
      return res.json(result);
    }

    if (action === "production") {
      const { titre, logline, personnages, mode } = payload;
      const persos = (personnages || []).map(p => `${p.nom} (${p.role}, ${p.age} ans)`).join(", ");
      const md = mode === "fast" ? "Vertical Drama — décors minimalistes, émotions frontales" : "Série Premium — décors évocateurs, atmosphère cinématographique";
      const result = await callClaude(
        `Tu es directeur artistique expert en micro-dramas 9:16 tournés au smartphone. ${md}. JSON uniquement.`,
        `Série "${titre}". Logline: ${logline}. Personnages: ${persos}.\nGénère une fiche technique de production complète pour tourner avec un smartphone.\nJSON: {"decors":[{"nom":"","description":"","ambiance":"","conseil_tournage":""}],"costumes":[{"personnage":"","look":"","couleurs":"","symbolique":""}],"lieux":[{"type":"","exemples":[""],"lumiere":"","heure_ideale":""}]}`,
        1200
      );
      trackAction("production", customerId);
      return res.json(result);
    }

    if (action === "cartes") {
      const { personnages, titre, genre, lang } = payload;
      const persosList = personnages.map(p => `${p.nom} (${p.role}, ${p.age} ans) — secret: "${p.secret}"${p.arc ? `, arc: "${p.arc}"` : ""}`).join("\n");
      const langInstr = buildLangInstr(lang);
      const result = await callClaude(
        `Tu es directeur artistique expert en micro-dramas 9:16. Pour chaque personnage, crée une fiche visuelle et dramatique riche. JSON uniquement.${langInstr}`,
        `Série "${titre}"${genre ? ` — genre: ${genre}` : ""}.\nPersonnages:\n${persosList}\nJSON: {"cartes":[{"nom":"","citation":"phrase signature 5-10 mots que ce perso dirait souvent","style":"look vestimentaire précis en 1 phrase","force":"qualité dramatique principale en 3 mots","faiblesse":"talon d'achille dramatique en 3 mots","energie":"comment il entre dans une scène — 1 adjectif saisissant","couleur":"#hexcode couleur qui représente ce perso"}]}`,
        1200
      );
      trackAction("cartes", customerId);
      return res.json(result);
    }

    if (action === "social") {
      const { ep, bible, mode, lang } = payload;
      const langInstr = buildLangInstr(lang);
      const result = await callClaude(
        `Tu es community manager TikTok spécialisé en micro-dramas viraux. JSON uniquement.${langInstr}`,
        `Épisode ${ep.numero} "${ep.titre}" — série "${bible.titre}".\nLogline: ${bible.logline}.\nCliffhanger: ${ep.cliffhanger}.\n\nGénère:\n• 6 commentaires TikTok ultra-réalistes (mix réactions, théories, team A vs B, emojis, argot actuel)\n• 4 SMS entre personnages liés aux révélations de l'épisode (style iMessage, très courts)\n• 1 légende TikTok virale pour poster cet épisode (15 mots max + hashtags)\nJSON: {"commentaires":[{"user":"@pseudo","texte":"","likes":1200,"reaction":"😱"}],"sms":[{"from":"Prénom","to":"Prénom","texte":"","heure":"21:47"}],"legende":""}`,
        900
      );
      trackAction("social", customerId);
      return res.json(result);
    }

    if (action === "affiche") {
      const { titre, logline, personnages, genre, ambiance, lang } = payload;
      const persosList = (personnages || []).map(p => `${p.nom} (${p.role})`).join(", ");
      const langInstr = buildLangInstr(lang);
      const result = await callClaude(
        `Tu es directeur artistique expert en posters de séries verticales 9:16 (TikTok, Reels). JSON uniquement.${langInstr}`,
        `Série "${titre}". Genre: ${genre || "Drama"}. Ambiance: ${ambiance || ""}. Logline: ${logline}. Casting: ${persosList}.\nJSON: {"tagline":"accroche poster 3-6 mots, choc","sous_titre":"complément émotionnel 5-8 mots","palette":["#hex1","#hex2","#hex3"],"style_visuel":"description artistique 2 phrases — composition, lumière, ambiance","prompt_ia":"image generation prompt in English, compatible with Midjourney/DALL-E/Gemini, cinematic vertical 9:16 style, ultra-detailed, 50 words max","typographie":"style typo recommandé pour le titre (ex: serif condensé blanc sur fond sombre)"}`,
        700
      );
      trackAction("affiche", customerId);
      return res.json(result);
    }

    if (action === "profils") {
      const { titre, personnages, genre, lang } = payload;
      const langInstr = buildLangInstr(lang);
      const persosList = (personnages || []).map(p => `${p.nom} (${p.role}, ${p.age} ans) — secret: "${p.secret}"`).join("\n");
      const result = await callClaude(
        `Tu es directeur artistique spécialisé en personal branding pour acteurs de micro-dramas. Crée des profils réseaux sociaux fictifs ultra-réalistes pour chaque personnage de la série. JSON uniquement.${langInstr}`,
        `Série "${titre}"${genre ? ` — ${genre}` : ""}.\nPersonnages:\n${persosList}\n\nJSON: {"profils":[{"nom":"","pseudo":"@pseudo","bio":"bio 150 chars max avec emojis, ton du perso","followers":"12.4K","abonnements":"342","posts":[{"caption":"légende de post 1 — 15 mots avec emojis","likes":"1.2K","commentaires":45},{"caption":"légende de post 2","likes":"876","commentaires":23},{"caption":"légende de post 3","likes":"2.1K","commentaires":89}],"story":"texte de story active 10 mots","highlight":"titre du highlight principal","couleur":"#hexcode couleur du profil"}]}`,
        1400
      );
      trackAction("profils", customerId);
      return res.json(result);
    }

    if (action === "calendrier") {
      const { titre, logline, episodes, lang } = payload;
      const langInstr = buildLangInstr(lang);
      const epList = (episodes || []).slice(0, 20).map(e => `Ép.${e.numero} "${e.titre}" — ${e.cliffhanger}`).join("\n");
      const result = await callClaude(
        `Tu es stratège de contenu spécialisé en micro-dramas mobiles (TikTok, DramaBox, ReelShort, Reels, YouTube Shorts). Crée un calendrier de publication optimal. JSON uniquement.${langInstr}`,
        `Série "${titre}". Logline: ${logline}.\nÉpisodes:\n${epList}\n\nCrée un calendrier semaine par semaine. Alterne les plateformes. Donne des légendes virales et des hashtags spécifiques.\nJSON: {"strategie":"stratégie globale en 2 phrases","plateformes":["TikTok","DramaBox","Reels"],"semaines":[{"semaine":1,"theme":"thème dramatique de la semaine","episodes":[{"numero":1,"jour":"Lundi","heure":"19h00","plateforme":"TikTok","legende":"légende virale 15 mots","hashtags":["#microdrama","#drama"]}]}],"conseil":"1 conseil pro pour maximiser la viralité"}`,
        1600
      );
      trackAction("calendrier", customerId);
      return res.json(result);
    }

    if (action === "storyboard") {
      const { ep, script, bible, lang } = payload;
      const langInstr = buildLangInstr(lang);
      const scenesText = [
        script?.hook_scene ? `HOOK: ${script.hook_scene.texte} [${script.hook_scene.visuel_916}]` : "",
        ...(script?.scenes || []).map((s, i) => `Sc.${i+1} ${s.perso}: "${s.dialogue}" [${s.visuel_916}]`),
        script?.cliffhanger_scene ? `CLIFF: ${script.cliffhanger_scene.texte} [${script.cliffhanger_scene.visuel_916}]` : "",
      ].filter(Boolean).join("\n");
      const result = await callClaude(
        `Tu es directeur de la photographie expert en micro-dramas verticaux 9:16. Décompose ce script en shots précis pour un tournage au smartphone. JSON uniquement.${langInstr}`,
        `Série "${bible?.titre}" — Épisode ${ep?.numero} "${ep?.titre}".\n\nScript:\n${scenesText}\n\nJSON: {"shots":[{"numero":1,"duree_sec":3,"type_plan":"Gros plan","angle":"Face","mouvement":"Fixe","cadrage":"description précise de ce qu'on voit dans le cadre","son":"dialogue ou son ambiance","note":"note technique ou émotionnelle du réalisateur"}]}`,
        1800
      );
      trackAction("storyboard", customerId);
      return res.json(result);
    }

  } catch (e) {
    Sentry.captureException(e, { extra: { action: req.body?.action, customerId, plan } });
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
