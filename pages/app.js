import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { jsPDF } from "jspdf";

// ── CONFIG ──────────────────────────────────────────────────
const OPTS = {
  fr: {
    casting: ["1 Femme + 1 Homme", "2 Femmes", "2 Hommes", "Trio mixte", "Femme seule", "Homme seul", "Quartet mixte", "2 Teenagers", "Teenager + Adulte", "Trio Teenagers"],
    univers_fast: ["Hôpital privé", "Milieu corporate", "Famille recomposée", "Mode & Influence", "Sport élite", "Lycée & Secrets", "Immobilier de luxe", "Réseau social viral", "Télévision & Célébrité", "Collège & Cliques", "Fête de lycée", "Compétition scolaire"],
    univers_prem: ["Start-up IA", "Finance internationale", "Héritage familial", "Politique & Pouvoir", "Pharma & Biotech", "Armée & Services secrets", "Justice & Tribunal", "Immobilier & Blanchiment", "Cinéma & Pouvoir", "Diplomatie internationale"],
    secret_fast: ["Trahison amoureuse", "Double vie", "Vengeance planifiée", "Enfant caché", "Identité volée", "Grossesse cachée", "Faillite secrète", "Addiction dissimulée", "Passé criminel", "Relation interdite au lycée", "Triche scolaire organisée", "Gang secret entre ados"],
    secret_prem: ["Sabotage interne", "Espionnage industriel", "Héritage volé", "Manipulation psychologique", "Complot financier", "Corruption judiciaire", "Chantage politique", "Meurtre maquillé", "Faux témoin", "Dette de sang"],
  },
  en: {
    casting: ["1 Woman + 1 Man", "2 Women", "2 Men", "Mixed trio", "Woman alone", "Man alone", "Mixed quartet", "2 Teenagers", "Teen + Adult", "Teen trio"],
    univers_fast: ["Private hospital", "Corporate world", "Blended family", "Fashion & Influence", "Elite sport", "High school secrets", "Luxury real estate", "Viral social media", "TV & Celebrity", "College cliques", "House party", "Academic competition"],
    univers_prem: ["AI startup", "International finance", "Family inheritance", "Politics & Power", "Pharma & Biotech", "Military & Secret services", "Law & Courtroom", "Real estate & Laundering", "Film & Power", "International diplomacy"],
    secret_fast: ["Love betrayal", "Double life", "Planned revenge", "Hidden child", "Stolen identity", "Secret pregnancy", "Hidden bankruptcy", "Concealed addiction", "Criminal past", "Forbidden school romance", "Organized cheating", "Secret teen gang"],
    secret_prem: ["Internal sabotage", "Industrial espionage", "Stolen inheritance", "Psychological manipulation", "Financial conspiracy", "Judicial corruption", "Political blackmail", "Staged murder", "False witness", "Blood debt"],
  },
};
const DUR_LABEL = { fr: { 60: "1 min", 90: "1 min 30", 120: "2 min" }, en: { 60: "1 min", 90: "1 min 30", 120: "2 min" } };
const DUR_SCENES = { 60: 5, 90: 7, 120: 10 };

// ── TRANSLATIONS ────────────────────────────────────────────
const T = {
  fr: {
    mode_fast: "⚡ Fast Drama", mode_premium: "🎭 Premium Suspense",
    casting: "Casting", univers: "Univers", secret: "Secret central",
    duree: "Durée par épisode", episodes: "Nombre d'épisodes",
    style: "Style de script", drama: "🎚 Drama Engine", drama_sub: "Dose les ingrédients de ta série",
    generate: "▶ Générer la série", my_series: "📂 Mes séries sauvegardées",
    content: "min de contenu", max_fast: "max 20 en Fast",
    back_mixer: "← Mixeur", see_eps: "Voir les", episodes_btn: "épisodes →",
    poster_btn: "🎨 Affiche", bible_tab: "Bible", persos_tab: "🎭 Persos", titres_tab: "🔥 Titres", titres_locked: "🔒 Titres",
    question_centrale: "Question centrale", personnages: "Personnages",
    enrich: "✨ Enrichir les fiches",
    back_bible: "← Bible", back_studio: "← Studio",
    writing: "Écriture du script", hook: "⚡ Hook — 3 premières secondes",
    script_label: "Script", repliques: "répliques",
    spice: "🌶 Pimenter", subtle: "🤫 Subtil", simplify: "🎬 Simple",
    variations_locked: "🔒 Générer 3 versions", variations: "🎲 Générer 3 versions",
    shooting: "📱 Mode Tournage", social: "🔥 Social",
    translate: "🌍 Traduire le script", translate_back: "↩ Original", translating: "🌍 Traduction en cours…",
    export_pdf: "📄 Exporter en PDF",
    saved: "séries sauvegardées", no_series: "Aucune série sauvegardée", generate_first: "Générez votre première série !",
    open: "Ouvrir →", perso_input: "Ton %s personnalisé…",
    dur_std: "Standard", dur_intense: "Intense", dur_epic: "Épique",
    style_cinema: "Silences & regards", style_tiktok: "Rythme haletant", style_soap: "Révélations multiples",
    lo_romance: "Neutre", hi_romance: "Passion brûlante",
    lo_toxicite: "Sain", hi_toxicite: "Manipulation totale",
    lo_mystere: "Transparent", hi_mystere: "Rien n'est vrai",
    lo_humour: "Pur drame", hi_humour: "Comédie noire",
    lo_violence: "Aucune", hi_violence: "Confrontations dures",
    lo_spicy: "Tous publics", hi_spicy: "Tension maximale",
    packs_label: "🎬 Packs d'univers", packs_sub: "— tout configuré en 1 clic",
    logout: "Déconnexion", custom: "✏️ Perso.",
    choose_lang: "Choisir la langue", back: "← Retour", my_series_title: "Mes Séries",
  },
  en: {
    mode_fast: "⚡ Fast Drama", mode_premium: "🎭 Premium Suspense",
    casting: "Casting", univers: "Setting", secret: "Central secret",
    duree: "Episode duration", episodes: "Number of episodes",
    style: "Script style", drama: "🎚 Drama Engine", drama_sub: "Tune your series ingredients",
    generate: "▶ Generate series", my_series: "📂 My saved series",
    content: "min of content", max_fast: "max 20 in Fast",
    back_mixer: "← Back", see_eps: "See all", episodes_btn: "episodes →",
    poster_btn: "🎨 Poster", bible_tab: "Bible", persos_tab: "🎭 Cast", titres_tab: "🔥 Titles", titres_locked: "🔒 Titles",
    question_centrale: "Central question", personnages: "Characters",
    enrich: "✨ Enrich profiles",
    back_bible: "← Bible", back_studio: "← Studio",
    writing: "Writing script", hook: "⚡ Hook — First 3 seconds",
    script_label: "Script", repliques: "lines",
    spice: "🌶 Spice up", subtle: "🤫 Subtle", simplify: "🎬 Simplify",
    variations_locked: "🔒 Generate 3 versions", variations: "🎲 Generate 3 versions",
    shooting: "📱 Shooting mode", social: "🔥 Social",
    translate: "🌍 Translate script", translate_back: "↩ Original", translating: "🌍 Translating…",
    export_pdf: "📄 Export as PDF",
    saved: "saved series", no_series: "No saved series", generate_first: "Generate your first series!",
    open: "Open →", perso_input: "Your custom %s…",
    dur_std: "Standard", dur_intense: "Intense", dur_epic: "Epic",
    style_cinema: "Silences & looks", style_tiktok: "Breathless pace", style_soap: "Multiple reveals",
    lo_romance: "Neutral", hi_romance: "Burning passion",
    lo_toxicite: "Healthy", hi_toxicite: "Total manipulation",
    lo_mystere: "Transparent", hi_mystere: "Nothing is true",
    lo_humour: "Pure drama", hi_humour: "Dark comedy",
    lo_violence: "None", hi_violence: "Harsh confrontations",
    lo_spicy: "All audiences", hi_spicy: "Maximum tension",
    packs_label: "🎬 Universe packs", packs_sub: "— all set in 1 click",
    logout: "Sign out", custom: "✏️ Custom",
    choose_lang: "Choose language", back: "← Back", my_series_title: "My Series",
  },
};

const PACKS = [
  { emoji: "🏥", label: "Médical Secret",   mode: "fast",    casting: "1 Femme + 1 Homme", univers: "Hôpital privé",          secret: "Double vie" },
  { emoji: "💼", label: "Corporate War",    mode: "premium", casting: "2 Hommes",           univers: "Finance internationale", secret: "Sabotage interne" },
  { emoji: "👨‍👩‍👧", label: "Famille Brisée",  mode: "fast",    casting: "Trio mixte",         univers: "Famille recomposée",     secret: "Enfant caché" },
  { emoji: "💕", label: "Amour Interdit",   mode: "fast",    casting: "1 Femme + 1 Homme", univers: "Mode & Influence",        secret: "Trahison amoureuse" },
  { emoji: "🔪", label: "Vengeance",        mode: "premium", casting: "2 Femmes",           univers: "Héritage familial",       secret: "Manipulation psychologique" },
  { emoji: "🤖", label: "IA & Pouvoir",     mode: "premium", casting: "1 Femme + 1 Homme", univers: "Start-up IA",             secret: "Espionnage industriel" },
  { emoji: "🏆", label: "Sport & Trahison", mode: "fast",    casting: "2 Hommes",           univers: "Sport élite",             secret: "Vengeance planifiée" },
  { emoji: "💊", label: "Pharma Noir",      mode: "premium", casting: "1 Femme + 1 Homme", univers: "Pharma & Biotech",        secret: "Complot financier" },
  { emoji: "🎒", label: "Lycée Toxique",   mode: "fast",    casting: "2 Teenagers",        univers: "Lycée & Secrets",          secret: "Relation interdite au lycée" },
  { emoji: "📱", label: "Viral & Danger",  mode: "fast",    casting: "Trio Teenagers",     univers: "Réseau social viral",      secret: "Gang secret entre ados" },
  { emoji: "🏆", label: "Cheat Code",      mode: "fast",    casting: "Teenager + Adulte",  univers: "Compétition scolaire",     secret: "Triche scolaire organisée" },
];

// ── UNIVERSE PACKS ───────────────────────────────────────────
const UNIVERSE_PACKS = [
  {
    id: "love-betrayal", emoji: "❤️", mode: "fast",
    label: { fr: "Love & Betrayal", en: "Love & Betrayal" },
    desc: { fr: "Triangle amoureux, meilleure amie toxique, secrets de grossesse — ultra TikTok.", en: "Love triangle, toxic best friend, pregnancy secrets — ultra TikTok." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Mode & Influence", en: "Fashion & Influence" }, secret: { fr: "Trahison amoureuse", en: "Love betrayal" },
    genre: "Romance dramatique", ambiance: "⚡ Intense & Direct",
    tropes: "enemies to lovers, fake dating, forbidden love, secret pregnancy, best friend betrayal, rich vs poor, arranged marriage",
  },
  {
    id: "lycee-elite", emoji: "🔥", mode: "fast",
    label: { fr: "Lycée Élite", en: "Elite High School" },
    desc: { fr: "Secrets anonymes, scandales, influenceurs scolaires — style Elite × Euphoria.", en: "Anonymous secrets, scandals, school influencers — Elite × Euphoria vibes." },
    casting: { fr: "Trio Teenagers", en: "Teen trio" }, univers: { fr: "Lycée & Secrets", en: "High school secrets" }, secret: { fr: "Relation interdite au lycée", en: "Forbidden school romance" },
    genre: "Teen drama", ambiance: "⚡ Intense & Direct",
    tropes: "rumeur anonyme, revenge porn, jalousie scolaire, élève riche vs pauvre, prof interdit, fête qui dérape, secret divulgué en live",
  },
  {
    id: "thriller-psycho", emoji: "🧠", mode: "premium",
    label: { fr: "Thriller Psycho", en: "Psych Thriller" },
    desc: { fr: "Double personnalité, faux souvenirs, manipulation — chaque perso cache quelque chose.", en: "Split personality, false memories, manipulation — everyone is hiding something." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Héritage familial", en: "Family inheritance" }, secret: { fr: "Manipulation psychologique", en: "Psychological manipulation" },
    genre: "Thriller psychologique", ambiance: "🧠 Psychologique & Lent",
    tropes: "unreliable narrator, hidden identity, faux souvenir, secte, huis clos, gaslighting, le meurtrier est connu du personnage",
  },
  {
    id: "influenceurs", emoji: "💄", mode: "fast",
    label: { fr: "Influenceurs", en: "Influencers" },
    desc: { fr: "Villa TikTok, faux couple pour les vues, bad buzz, leak privé — drama en direct.", en: "TikTok villa, fake couple for clout, scandal, private leak — live drama." },
    casting: { fr: "Trio mixte", en: "Mixed trio" }, univers: { fr: "Réseau social viral", en: "Viral social media" }, secret: { fr: "Double vie", en: "Double life" },
    genre: "Reality drama", ambiance: "⚡ Intense & Direct",
    tropes: "faux couple pour les followers, scandale live, bad buzz, leak de DM privés, rivalité créateurs, fan obsessionnel, cancel culture",
  },
  {
    id: "royal-dark", emoji: "👑", mode: "premium",
    label: { fr: "Royal Dark Romance", en: "Royal Dark Romance" },
    desc: { fr: "Prince héritier, garde du corps, mariage forcé — luxe noir et tension maximale.", en: "Crown prince, bodyguard, forced marriage — dark luxury and maximum tension." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Politique & Pouvoir", en: "Politics & Power" }, secret: { fr: "Identité volée", en: "Stolen identity" },
    genre: "Dark romance royale", ambiance: "💜 Émotionnel & Poétique",
    tropes: "prince héritier x roturière, garde du corps protecteur, mariage forcé, héritière rebelle, mafia royale, contrat amoureux, esthétique noir et or",
  },
  {
    id: "mafia-gang", emoji: "🩸", mode: "premium",
    label: { fr: "Mafia & Gang", en: "Mafia & Gang" },
    desc: { fr: "Dette familiale, chef dangereux, infiltrée — loyauté ou vengeance.", en: "Family debt, dangerous boss, undercover love — loyalty or revenge." },
    casting: { fr: "2 Hommes", en: "2 Men" }, univers: { fr: "Finance internationale", en: "International finance" }, secret: { fr: "Complot financier", en: "Financial conspiracy" },
    genre: "Crime drama", ambiance: "🧠 Psychologique & Lent",
    tropes: "dette de sang, chef charismatique et dangereux, infiltrée amoureuse, vengeance familiale, cartel, prison, trahison du lieutenant de confiance",
  },
  {
    id: "horreur", emoji: "👻", mode: "fast",
    label: { fr: "Horreur Virale", en: "Viral Horror" },
    desc: { fr: "Caméra retrouvée, rituel TikTok, école hantée — cliffhangers qui glacent.", en: "Found footage, TikTok ritual, haunted school — spine-chilling cliffhangers." },
    casting: { fr: "Trio Teenagers", en: "Teen trio" }, univers: { fr: "Collège & Cliques", en: "College cliques" }, secret: { fr: "Gang secret entre ados", en: "Secret teen gang" },
    genre: "Horreur POV", ambiance: "🧠 Psychologique & Lent",
    tropes: "found footage, défi interdit qui tourne mal, esprit vengeur, école hantée, rituel TikTok, disparition inexpliquée, message d'outre-tombe",
  },
  {
    id: "scifi-ia", emoji: "🤖", mode: "premium",
    label: { fr: "Sci-Fi & IA", en: "Sci-Fi & AI" },
    desc: { fr: "IA qui devient humaine, clone, souvenirs vendus — le futur qui fait peur.", en: "AI going human, clones, sold memories — the future that terrifies." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Start-up IA", en: "AI startup" }, secret: { fr: "Espionnage industriel", en: "Industrial espionage" },
    genre: "Sci-fi dramatique", ambiance: "🧠 Psychologique & Lent",
    tropes: "IA qui développe des émotions, clone identique, réalité simulée, souvenirs implantés ou vendus, influenceur virtuel, surveillance totale, humanité questionnée",
  },
];

// ── API HELPER ───────────────────────────────────────────────
async function gen(action, payload, customerId) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${customerId}`,
    },
    body: JSON.stringify({ action, payload }),
  });
  const d = await res.json();
  if (d.error) throw new Error(d.error);
  return d;
}

// ── COMPONENTS ───────────────────────────────────────────────
function VCLogo() {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 10, userSelect: "none" }}>
      <div style={{ width: 3, borderRadius: 2, background: "linear-gradient(to bottom, #ff8c42, #E85C3A)", flexShrink: 0 }} />
      <svg width={17} height={28} viewBox="0 0 17 28" fill="none" style={{ flexShrink: 0, alignSelf: "center" }}>
        <rect x="1" y="1" width="15" height="26" rx="3" stroke="white" strokeWidth="1.5"/>
        <circle cx="8.5" cy="23.5" r="1.1" fill="white" opacity="0.5"/>
        <rect x="5.5" y="3.5" width="6" height="1" rx="0.5" fill="white" opacity="0.4"/>
      </svg>
      <div style={{ alignSelf: "center", lineHeight: 1 }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
        <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CLAP</div>
      </div>
    </div>
  );
}

function Dots({ t = 0 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i < t ? "var(--r)" : "var(--bo)" }} />
      ))}
    </div>
  );
}

function Chip({ label, active, onClick, block, sub }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex", flexDirection: block ? "column" : "row",
        alignItems: "center", justifyContent: "center",
        padding: block ? "12px 8px" : "9px 16px",
        borderRadius: block ? 14 : 100,
        border: `1.5px solid ${active ? "var(--r)" : "var(--bo)"}`,
        background: active ? "var(--r)" : "var(--card)",
        color: active ? "#fff" : "var(--tx)",
        cursor: "pointer", userSelect: "none",
        fontSize: 13, fontWeight: 500,
        whiteSpace: "nowrap",
        transition: "all .15s",
        flex: block ? 1 : undefined, gap: 2,
      }}
    >
      <span style={{ fontSize: block ? 15 : 13, fontWeight: 700 }}>{label}</span>
      {sub && <span style={{ fontSize: 10, opacity: 0.75 }}>{sub}</span>}
    </div>
  );
}

// ── SAUVEGARDE ───────────────────────────────────────────────
const SAVE_KEY = "vs_series";

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "[]"); } catch { return []; }
}

function saveSerie(bible, episodes, state, scripts) {
  try {
    const saved = loadSaved();
    const entry = { id: Date.now(), savedAt: new Date().toISOString(), bible, episodes, state, scripts: scripts || {} };
    const updated = [entry, ...saved].slice(0, 10);
    localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
    return entry.id;
  } catch (e) {
    console.error("Sauvegarde impossible (localStorage plein)", e);
  }
}

function updateSerieScripts(bible, scripts) {
  try {
    const saved = loadSaved();
    const idx = saved.findIndex(s => s.bible?.titre === bible?.titre);
    if (idx === -1) return;
    saved[idx].scripts = { ...(saved[idx].scripts || {}), ...scripts };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
  } catch {}
}

function deleteSerie(id) {
  const updated = loadSaved().filter(s => s.id !== id);
  localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
}

// ── ÉCRAN MES SÉRIES ─────────────────────────────────────────
function MesSeriesView({ onLoad, onBack, t }) {
  const [series, setSeries] = useState(() => loadSaved());

  const handleDelete = (id) => {
    deleteSerie(id);
    setSeries(loadSaved());
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ background: "var(--tx)", padding: "28px 20px 24px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#3a5040", fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 14 }}>{t.back}</button>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>{t.my_series_title}</h1>
        <p style={{ fontSize: 12, color: "#3a5040", marginTop: 4 }}>{series.length} {t.saved}</p>
      </div>
      <div style={{ padding: "20px", maxWidth: 520, margin: "0 auto" }}>
        {series.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--mt)" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>📂</p>
            <p style={{ fontSize: 15 }}>{t.no_series}</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>{t.generate_first}</p>
          </div>
        ) : series.map(s => (
          <div key={s.id} style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1.5px solid var(--bo)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{s.bible.titre}</h3>
                <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.5, marginBottom: 6 }}>{s.bible.logline}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, background: s.state.mode === "fast" ? "#fff0ec" : "#e8edf2", color: s.state.mode === "fast" ? "var(--r)" : "var(--n)", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
                    {s.state.mode === "fast" ? "⚡ Fast" : "🎭 Premium"}
                  </span>
                  <span style={{ fontSize: 11, background: "var(--bo)", padding: "2px 8px", borderRadius: 4, color: "var(--mt)" }}>
                    {s.episodes.length} ép.
                  </span>
                  <span style={{ fontSize: 11, color: "var(--mt)" }}>
                    {new Date(s.savedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onLoad(s)} style={{ flex: 1, background: "var(--r)", color: "#fff", border: "none", padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
                {t.open}
              </button>
              <button onClick={() => handleDelete(s.id)} style={{ background: "none", border: "1.5px solid var(--bo)", color: "var(--mt)", padding: "10px 14px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "var(--sans)" }}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCREENS ──────────────────────────────────────────────────

const CUSTOM_PREFIX = "__custom__";

function Mixeur({ state, set, onGen, onMesSeries, hasSeries, plan, t, opts, lang }) {
  const univOpts = state.mode === "fast" ? opts.univers_fast : opts.univers_prem;
  const secOpts = state.mode === "fast" ? opts.secret_fast : opts.secret_prem;
  const totalMin = Math.round(state.format * state.duree / 60);
  const [customInputs, setCustomInputs] = useState({ casting: "", univers: "", secret: "" });

  const isCustom = (key) => state[key]?.startsWith(CUSTOM_PREFIX);
  const customValue = (key) => isCustom(key) ? state[key].slice(CUSTOM_PREFIX.length) : customInputs[key];

  const activateCustom = (key) => {
    const val = customInputs[key] || "";
    set({ [key]: CUSTOM_PREFIX + val });
  };
  const updateCustom = (key, val) => {
    setCustomInputs(p => ({ ...p, [key]: val }));
    set({ [key]: CUSTOM_PREFIX + val });
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      {/* Header */}
      <div style={{ background: "var(--tx)", padding: "28px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <VCLogo />
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: 0.5 }}>REC</span>
          </div>
        </div>
        <div style={{ display: "flex", background: "#1a2a1e", borderRadius: 12, padding: 4 }}>
          {[{ k: "fast", l: t.mode_fast }, { k: "premium", l: t.mode_premium }].map(({ k, l }) => {
            const locked = k === "premium" && plan === "standard";
            return (
              <button key={k} onClick={() => { if (!locked) set(prev => ({ mode: k, univers: k === "fast" ? opts.univers_fast[0] : opts.univers_prem[0], secret: k === "fast" ? opts.secret_fast[0] : opts.secret_prem[0], format: k === "fast" && prev.format > 20 ? 20 : prev.format })); }}
                style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: "none", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, background: state.mode === k ? (k === "fast" ? "var(--r)" : "var(--n)") : "transparent", color: locked ? "#3a5040" : state.mode === k ? "#fff" : "#3a5040", transition: "all .2s", cursor: locked ? "not-allowed" : "pointer", opacity: locked ? 0.5 : 1 }}>
                {l}{locked && " 🔒"}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "24px 20px", maxWidth: 520, margin: "0 auto" }}>

        {/* Universe Packs */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>
            {t.packs_label} <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>{t.packs_sub}</span>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {UNIVERSE_PACKS.map(p => {
              const locked = p.mode === "premium" && plan === "standard";
              const active = state.packId === p.id;
              const pLabel = typeof p.label === "object" ? (p.label[lang] || p.label.fr) : p.label;
              const pDesc = typeof p.desc === "object" ? (p.desc[lang] || p.desc.fr) : p.desc;
              const pCasting = typeof p.casting === "object" ? (p.casting[lang] || p.casting.fr) : p.casting;
              const pUnivers = typeof p.univers === "object" ? (p.univers[lang] || p.univers.fr) : p.univers;
              const pSecret = typeof p.secret === "object" ? (p.secret[lang] || p.secret.fr) : p.secret;
              return (
                <button key={p.id} onClick={() => {
                  if (locked) return;
                  set({ mode: p.mode, casting: pCasting, univers: pUnivers, secret: pSecret, genre: p.genre, ambiance: p.ambiance, tropes: p.tropes, packId: active ? null : p.id, format: p.mode === "fast" && state.format > 20 ? 20 : state.format });
                }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: `2px solid ${active ? "var(--r)" : "var(--bo)"}`, background: active ? "var(--r)" : "var(--card)", cursor: locked ? "not-allowed" : "pointer", fontFamily: "var(--sans)", textAlign: "left", opacity: locked ? 0.45 : 1, transition: "all .15s" }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{p.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: active ? "#fff" : "var(--tx)" }}>{pLabel}</span>
                      <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: p.mode === "premium" ? "var(--n)" : "#e8f0e8", color: p.mode === "premium" ? "#fff" : "var(--n)", fontWeight: 700, letterSpacing: 0.5 }}>{locked ? "🔒 PRO" : p.mode === "premium" ? "PRO" : "FAST"}</span>
                    </div>
                    <span style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.8)" : "var(--mt)", lineHeight: 1.3 }}>{pDesc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {[
          { label: t.casting, options: opts.casting, key: "casting" },
          { label: t.univers, options: univOpts, key: "univers" },
          { label: t.secret, options: secOpts, key: "secret" },
        ].map(({ label, options, key }) => (
          <div key={key} style={{ marginBottom: 22 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 10 }}>{label}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {options.map(o => <Chip key={o} label={o} active={state[key] === o} onClick={() => set({ [key]: o })} />)}
              <Chip label={t.custom} active={isCustom(key)} onClick={() => activateCustom(key)} />
            </div>
            {isCustom(key) && (
              <input
                autoFocus
                value={customValue(key)}
                onChange={e => updateCustom(key, e.target.value)}
                placeholder={t.perso_input.replace('%s', label.toLowerCase())}
                maxLength={100}
                style={{ marginTop: 10, width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--r)", background: "var(--bg)", color: "var(--tx)", fontFamily: "var(--sans)", fontSize: 14, outline: "none" }}
              />
            )}
          </div>
        ))}

        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 10 }}>{t.duree}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ v: 60, l: DUR_LABEL[lang][60], s: t.dur_std }, { v: 90, l: DUR_LABEL[lang][90], s: t.dur_intense }, { v: 120, l: DUR_LABEL[lang][120], s: t.dur_epic }].map(({ v, l, s }) => (
              <Chip key={v} label={l} sub={s} block active={state.duree === v} onClick={() => set({ duree: v })} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 10 }}>
            {t.episodes}
            {state.mode === "fast" && <span style={{ marginLeft: 8, fontSize: 10, color: "var(--r)", fontWeight: 700 }}>{t.max_fast}</span>}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {[10, 20, 40, 60, 90].map(f => {
              const lockedFast = state.mode === "fast" && f > 20;
              const lockedPlan = plan === "standard" && f > 20;
              const locked = lockedFast || lockedPlan;
              return (
                <div key={f} style={{ flex: 1, position: "relative" }}>
                  <Chip
                    label={`${f} ép.`}
                    sub={lockedFast ? "🎭 Premium" : lockedPlan ? "🔒 Premium" : `${Math.round(f * state.duree / 60)} min`}
                    block
                    active={state.format === f && !locked}
                    onClick={() => { if (!locked) set({ format: f }); }}
                  />
                  {locked && <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "rgba(var(--bg-rgb,242,237,230),0.6)", cursor: "not-allowed" }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Style de script */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 10 }}>{t.style}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { v: "🎬 Cinéma", s: t.style_cinema },
              { v: "⚡ TikTok Drama", s: t.style_tiktok },
              { v: "🎭 Soap Opera", s: t.style_soap },
            ].map(({ v, s }) => (
              <button key={v} onClick={() => set({ style: v })} style={{ flex: 1, padding: "10px 8px", borderRadius: 12, border: `2px solid ${state.style === v ? "var(--r)" : "var(--bo)"}`, background: state.style === v ? "var(--r)" : "var(--card)", color: state.style === v ? "#fff" : "var(--tx)", cursor: "pointer", fontFamily: "var(--sans)", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{s}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Drama Engine */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 4 }}>
            {t.drama}
          </p>
          <p style={{ fontSize: 11, color: "var(--mt)", marginBottom: 14 }}>{t.drama_sub}</p>
          {[
            { key: "romance", label: "💕 Romance", lo: t.lo_romance, hi: t.hi_romance },
            { key: "toxicite", label: "☠️ Toxicité", lo: t.lo_toxicite, hi: t.hi_toxicite },
            { key: "mystere", label: "🔍 Mystère", lo: t.lo_mystere, hi: t.hi_mystere },
            { key: "humour", label: "😈 Humour noir", lo: t.lo_humour, hi: t.hi_humour },
            { key: "violence", label: "💥 Violence", lo: t.lo_violence, hi: t.hi_violence },
            { key: "spicy", label: "🔥 Spicy", lo: t.lo_spicy, hi: t.hi_spicy },
          ].map(({ key, label, lo, hi }) => {
            const val = state.drama?.[key] ?? 5;
            return (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tx)" }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: val >= 7 ? "var(--r)" : val <= 3 ? "var(--mt)" : "var(--n)", minWidth: 20, textAlign: "right" }}>{val}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "var(--mt)", minWidth: 62, textAlign: "right" }}>{lo}</span>
                  <input type="range" min={0} max={10} value={val}
                    onChange={e => set({ drama: { ...(state.drama || {}), [key]: Number(e.target.value) } })}
                    style={{ flex: 1, accentColor: val >= 7 ? "var(--r)" : "var(--n)", cursor: "pointer" }} />
                  <span style={{ fontSize: 10, color: "var(--mt)", minWidth: 80 }}>{hi}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onGen} style={{ background: "var(--r)", color: "#fff", border: "none", padding: 18, borderRadius: 14, width: "100%", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {t.generate}
        </button>
        <p style={{ fontSize: 12, color: "var(--mt)", textAlign: "center", marginTop: 12 }}>
          {state.format} ép. · {DUR_LABEL[lang][state.duree]} · {totalMin} {t.content}
        </p>
        {hasSeries && (
          <button onClick={onMesSeries} style={{ background: "none", border: "1.5px solid var(--bo)", color: "var(--tx)", padding: 14, borderRadius: 14, width: "100%", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 10, fontFamily: "var(--sans)" }}>
            {t.my_series}
          </button>
        )}
      </div>
    </div>
  );
}

function BibleView({ bible, episodes, mode, duree, onEp, onBack, customerId, plan, onAffiche, t, lang }) {
  const [tab, setTab] = useState("bible");
  const [titres, setTitres] = useState(null);
  const [loadingTitres, setLoadingTitres] = useState(false);
  const [cartes, setCartes] = useState(null);
  const [loadingCartes, setLoadingCartes] = useState(false);

  const genTitres = async () => {
    setTab("titres");
    setLoadingTitres(true);
    try {
      const r = await gen("titres", { titre: bible.titre, logline: bible.logline, pitch: bible.pitch, mode }, customerId);
      setTitres(r.titres || []);
    } catch (e) {
      console.error(e);
      setTitres([]);
    }
    setLoadingTitres(false);
  };

  const genCartes = async () => {
    setTab("persos");
    if (cartes) return;
    setLoadingCartes(true);
    try {
      const r = await gen("cartes", { personnages: bible.personnages || [], titre: bible.titre, genre: bible.genre }, customerId);
      setCartes(r.cartes || []);
    } catch (e) {
      console.error(e);
      setCartes([]);
    }
    setLoadingCartes(false);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 6 }}>{t.back_mixer}</button>
        <div style={{ marginBottom: 10 }}>
          <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 6, background: mode === "fast" ? "#fff0ec" : "#e8edf2", color: mode === "fast" ? "var(--r)" : "var(--n)", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginRight: 6 }}>
            {mode === "fast" ? t.mode_fast : t.mode_premium}
          </span>
          <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 6, background: "#e8edf2", color: "var(--n)", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            ⏱ {DUR_LABEL[lang][duree]}/ép.
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1, marginBottom: 10 }}>{bible.titre}</h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 15, fontStyle: "italic", color: "var(--mt)", lineHeight: 1.5, marginBottom: 12 }}>« {bible.logline} »</p>
        <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{bible.pitch}</p>
        <div style={{ display: "flex", borderBottom: "2px solid var(--bo)", marginBottom: 0 }}>
          {[
            { k: "bible", l: t.bible_tab },
            { k: "persos", l: t.persos_tab },
            { k: "seq", l: `${episodes.length} ép.` },
            { k: "titres", l: plan === "standard" ? t.titres_locked : t.titres_tab },
          ].map(({ k, l }) => {
            const locked = k === "titres" && plan === "standard";
            const onClick = locked
              ? () => alert("Les titres viraux sont réservés au plan Premium.")
              : k === "titres" ? (titres ? () => setTab("titres") : genTitres)
              : k === "persos" ? genCartes
              : () => setTab(k);
            return (
              <button key={k} onClick={onClick}
                style={{ flex: 1, padding: "10px 0", border: "none", background: "none", cursor: locked ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 700, color: locked ? "var(--bo)" : tab === k ? "var(--r)" : "var(--mt)", borderBottom: `2px solid ${tab === k && !locked ? "var(--r)" : "transparent"}`, marginBottom: -2, fontFamily: "var(--sans)" }}>{l}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: "20px", maxWidth: 520, margin: "0 auto" }}>
        {tab === "bible" ? (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>{t.personnages}</p>
            {(bible.personnages || []).map((p, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 16, borderLeft: `4px solid ${i === 0 ? "var(--r)" : "var(--n)"}`, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700 }}>{p.nom}</span>
                  <span style={{ fontSize: 11, color: i === 0 ? "var(--r)" : "var(--n)", fontWeight: 700, textTransform: "uppercase" }}>{p.role} · {p.age} ans</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--mt)", lineHeight: 1.5 }}>🔒 {p.secret}</p>
              </div>
            ))}
            <div style={{ background: "var(--tx)", borderRadius: 12, padding: 16, marginBottom: 20, marginTop: 4 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--r)", marginBottom: 8 }}>{t.question_centrale}</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 15, fontStyle: "italic", color: "#fff", lineHeight: 1.5 }}>« {bible.tension_centrale} »</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={() => setTab("seq")} style={{ flex: 2, background: "var(--r)", color: "#fff", border: "none", padding: 16, borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {t.see_eps} {episodes.length} {t.episodes_btn}
              </button>
              <button onClick={onAffiche} style={{ flex: 1, background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 16, borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
                {t.poster_btn}
              </button>
            </div>
          </>
        ) : tab === "persos" ? (
          <>
            {loadingCartes ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--mt)" }}>
                <div style={{ fontSize: 28, marginBottom: 12, animation: "pulse 1.2s infinite" }}>🎭</div>
                <p>Création des fiches personnages…</p>
              </div>
            ) : (cartes || bible.personnages || []).map((p, i) => {
              const carte = cartes ? cartes[i] : null;
              const perso = (bible.personnages || [])[i] || {};
              const nom = perso.nom || carte?.nom || "";
              const couleur = carte?.couleur || (i === 0 ? "#E85C3A" : "#3a5040");
              return (
                <div key={i} style={{ background: "var(--card)", borderRadius: 16, overflow: "hidden", marginBottom: 14, border: `2px solid ${couleur}22` }}>
                  <div style={{ background: couleur, padding: "16px 18px 14px" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 2 }}>{nom}</h3>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{perso.role} · {perso.age} ans</p>
                    </div>
                    {carte?.citation && <p style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.9)", marginTop: 10, lineHeight: 1.4 }}>« {carte.citation} »</p>}
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    {carte ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                        <div style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 12px" }}>
                          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "var(--mt)", textTransform: "uppercase", marginBottom: 4 }}>💪 Force</p>
                          <p style={{ fontSize: 13, fontWeight: 700 }}>{carte.force}</p>
                        </div>
                        <div style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 12px" }}>
                          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "var(--mt)", textTransform: "uppercase", marginBottom: 4 }}>💔 Faiblesse</p>
                          <p style={{ fontSize: 13, fontWeight: 700 }}>{carte.faiblesse}</p>
                        </div>
                      </div>
                    ) : null}
                    {carte?.style && <p style={{ fontSize: 12, color: "var(--mt)", marginBottom: 8 }}>👗 {carte.style}</p>}
                    <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.5, borderTop: "1px solid var(--bo)", paddingTop: 10 }}>🔒 {perso.secret}</p>
                    {perso.arc && <p style={{ fontSize: 12, color: "var(--tx)", lineHeight: 1.5, marginTop: 6 }}>📈 {perso.arc}</p>}
                  </div>
                </div>
              );
            })}
            {!cartes && <button onClick={genCartes} style={{ background: "var(--n)", color: "#fff", border: "none", padding: 16, borderRadius: 14, width: "100%", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", marginTop: 8 }}>{t.enrich}</button>}
          </>
        ) : tab === "titres" ? (
          <>
            {loadingTitres ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--mt)" }}>
                <div style={{ fontSize: 28, marginBottom: 12, animation: "pulse 1.2s infinite" }}>🔥</div>
                <p>Analyse de la viralité…</p>
              </div>
            ) : (titres || []).map((t, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1.5px solid var(--bo)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 800, flex: 1 }}>{t.titre}</h3>
                  <div style={{ background: t.score >= 90 ? "var(--r)" : t.score >= 80 ? "#f59e0b" : "var(--n)", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 800, marginLeft: 10, flexShrink: 0 }}>
                    {t.score}
                  </div>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--tx)", marginBottom: 4 }}>« {t.accroche} »</p>
                <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.5 }}>{t.pourquoi}</p>
              </div>
            ))}
          </>
        ) : (
          (episodes || []).map((ep, i) => (
            <div key={i} onClick={() => onEp(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: "var(--card)", cursor: "pointer", border: "1.5px solid transparent", marginBottom: 8, transition: "all .15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--r)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
              <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, background: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 900, color: "#fff" }}>{ep.numero}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{ep.titre}</p>
                <Dots t={ep.tension} />
                <p style={{ fontSize: 12, color: "var(--mt)", marginTop: 4, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>🎬 {ep.cliffhanger}</p>
              </div>
              <span style={{ color: "var(--mt)", fontSize: 18, flexShrink: 0 }}>→</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StudioView({ bible, ep, script, loading, duree, onEdit, onTournage, onBack, onExport, onVariations, plan, onPrev, onNext, epIdx, totalEps, onSocial, onTranslate, t, lang }) {
  const [showLangs, setShowLangs] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translated, setTranslated] = useState(null);
  const [activeLang, setActiveLang] = useState(null);

  useEffect(() => { setTranslated(null); setActiveLang(null); setShowLangs(false); }, [ep?.numero]);

  const LANGS = [
    { code: "en", flag: "🇬🇧", label: "EN" },
    { code: "es", flag: "🇪🇸", label: "ES" },
    { code: "de", flag: "🇩🇪", label: "DE" },
    { code: "pt", flag: "🇵🇹", label: "PT" },
    { code: "it", flag: "🇮🇹", label: "IT" },
    { code: "ar", flag: "🇸🇦", label: "AR" },
    { code: "he", flag: "🇮🇱", label: "HE" },
    { code: "zh", flag: "🇨🇳", label: "ZH" },
  ];

  const handleTranslate = async (code) => {
    setTranslating(true);
    setActiveLang(code);
    setShowLangs(false);
    try {
      const r = await onTranslate(code);
      setTranslated(r);
    } catch (e) { console.error(e); setActiveLang(null); }
    setTranslating(false);
  };

  const displayScript = translated || script;
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", cursor: "pointer", padding: 0 }}>← {bible?.titre}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onPrev} disabled={epIdx === 0} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, width: 34, height: 34, cursor: epIdx === 0 ? "not-allowed" : "pointer", fontSize: 16, opacity: epIdx === 0 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <span style={{ fontSize: 12, color: "var(--mt)", minWidth: 40, textAlign: "center" }}>{epIdx + 1} / {totalEps}</span>
            <button onClick={onNext} disabled={epIdx === totalEps - 1} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, width: 34, height: 34, cursor: epIdx === totalEps - 1 ? "not-allowed" : "pointer", fontSize: 16, opacity: epIdx === totalEps - 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ background: "var(--r)", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>ÉP. {ep?.numero}</span>
          <span style={{ background: "var(--n)", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>⏱ {DUR_LABEL[lang][duree]}</span>
          <span style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 700 }}>{ep?.titre}</span>
        </div>
        <Dots t={ep?.tension} />
      </div>
      <div style={{ padding: "16px 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 14, animation: "pulse 1.2s infinite" }}>📝</div>
            <p style={{ fontSize: 14, color: "var(--mt)" }}>{t.writing} ({DUR_LABEL[lang][duree]})…</p>
          </div>
        ) : script ? (
          <>
            {/* Langue active + sélecteur */}
            {(translating || translated || showLangs) && (
              <div style={{ background: "var(--card)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, border: "1.5px solid var(--bo)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {translating ? (
                  <p style={{ fontSize: 13, color: "var(--mt)", animation: "pulse 1.2s infinite" }}>{t.translating}</p>
                ) : translated ? (
                  <>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--n)" }}>🌍 {LANGS.find(l => l.code === activeLang)?.flag} Traduit</span>
                    <button onClick={() => { setTranslated(null); setActiveLang(null); }} style={{ marginLeft: "auto", background: "none", border: "1.5px solid var(--bo)", color: "var(--mt)", padding: "4px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.translate_back}</button>
                  </>
                ) : null}
              </div>
            )}
            {showLangs && !translating && (
              <div style={{ background: "var(--card)", borderRadius: 12, padding: 14, marginBottom: 14, border: "1.5px solid var(--bo)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--mt)", marginBottom: 10 }}>{t.choose_lang}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => handleTranslate(l.code)} style={{ padding: "8px 12px", borderRadius: 10, border: "1.5px solid var(--bo)", background: "var(--bg)", cursor: "pointer", fontSize: 13, fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{l.flag}</span><span style={{ fontWeight: 700 }}>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ background: "var(--card)", border: "2px solid var(--r)", borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--r)", marginBottom: 8 }}>{t.hook}</p>
              <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 8, color: "var(--tx)" }}>{displayScript.hook_scene?.texte}</p>
              <p style={{ fontSize: 12, color: "var(--r)", fontStyle: "italic" }}>[9:16] {displayScript.hook_scene?.visuel_916}</p>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 10 }}>
              {t.script_label} · {DUR_LABEL[lang][duree]} · {(displayScript.scenes || []).length} {t.repliques}
            </p>
            {(displayScript.scenes || []).map((s, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 14, borderLeft: "3px solid var(--bo)", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--n)" }}>{s.perso}</p>
                  {s.jeu && <span style={{ fontSize: 10, background: "var(--bo)", color: "var(--tx)", padding: "2px 8px", borderRadius: 20, fontStyle: "italic" }}>{s.jeu}</span>}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 6, fontWeight: 500 }}>{s.dialogue}</p>
                <p style={{ fontSize: 12, color: "var(--mt)", fontStyle: "italic" }}>[9:16] {s.visuel_916}</p>
              </div>
            ))}
            <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--r)" }}>🎬 Cliffhanger</p>
                <button onClick={() => onEdit("rewrite_ending")} disabled={loading} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.7)", padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>♻️ Nouveau</button>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.4 }}>{displayScript.cliffhanger_scene?.texte}</p>
              <p style={{ fontSize: 12, color: "var(--r)", fontStyle: "italic", marginBottom: displayScript.cliffhanger_scene?.label ? 10 : 0 }}>[9:16] {displayScript.cliffhanger_scene?.visuel_916}</p>
              {displayScript.cliffhanger_scene?.label && (
                <span style={{ display: "inline-block", background: "var(--r)", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>{displayScript.cliffhanger_scene.label}</span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {[["pimenter", t.spice], ["subtil", t.subtle], ["simplifier", t.simplify]].map(([k, l]) => (
                <button key={k} onClick={() => onEdit(k)} disabled={loading} style={{ flex: 1, padding: "11px 6px", borderRadius: 10, border: "1.5px solid var(--bo)", background: "var(--card)", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "var(--sans)", transition: "all .15s" }}>{l}</button>
              ))}
            </div>
            <button onClick={plan === "standard" ? () => alert("Les variations sont réservées au plan Premium.") : onVariations} disabled={loading} style={{ background: "var(--card)", color: plan === "standard" ? "var(--mt)" : "var(--tx)", border: "1.5px solid var(--bo)", padding: 14, borderRadius: 12, width: "100%", fontSize: 14, fontWeight: 600, cursor: plan === "standard" ? "not-allowed" : "pointer", marginBottom: 10, fontFamily: "var(--sans)", opacity: plan === "standard" ? 0.6 : 1 }}>{plan === "standard" ? t.variations_locked : t.variations}</button>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button onClick={onTournage} style={{ flex: 2, background: "var(--n)", color: "#fff", border: "none", padding: 15, borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.shooting}</button>
              <button onClick={onSocial} style={{ flex: 1, background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 15, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.social}</button>
            </div>
            <button onClick={() => setShowLangs(s => !s)} disabled={translating} style={{ background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 14, borderRadius: 12, width: "100%", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 10, fontFamily: "var(--sans)" }}>
              {t.translate} {activeLang ? `· ${LANGS.find(l => l.code === activeLang)?.flag}` : ""}
            </button>
            <button onClick={onExport} style={{ background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 14, borderRadius: 12, width: "100%", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.export_pdf}</button>
          </>
        ) : null}
      </div>
    </div>
  );
}

function VariationsView({ variations, loading, ep, onSelect, onBack }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>← Studio</button>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>3 versions</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>Ép. {ep?.numero} · {ep?.titre} — Choisissez la meilleure</p>
      </div>
      <div style={{ padding: "0 20px 40px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16, animation: "pulse 1.2s infinite" }}>🎲</div>
            <p style={{ color: "var(--mt)" }}>Génération de 3 versions en parallèle…</p>
          </div>
        ) : (variations || []).map((v, i) => (
          <div key={i} style={{ background: "var(--card)", borderRadius: 16, padding: 18, marginBottom: 16, border: "1.5px solid var(--bo)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{v.label}</span>
              <button onClick={() => onSelect(v)} style={{ background: "var(--r)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
                Choisir →
              </button>
            </div>
            <div style={{ background: "#fff5f2", borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "var(--r)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>⚡ Hook</p>
              <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 4 }}>{v.hook_scene?.texte}</p>
              {v.hook_scene?.visuel_916 && <p style={{ fontSize: 11, color: "var(--r)", fontStyle: "italic" }}>[9:16] {v.hook_scene.visuel_916}</p>}
            </div>
            {(v.scenes || []).slice(0, 2).map((s, j) => (
              <div key={j} style={{ borderLeft: "2px solid var(--bo)", paddingLeft: 10, marginBottom: 8 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--n)", textTransform: "uppercase", marginBottom: 3 }}>{s.perso} {s.jeu && <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--mt)" }}>· {s.jeu}</span>}</p>
                <p style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 3 }}>{s.dialogue}</p>
                {s.visuel_916 && <p style={{ fontSize: 11, color: "var(--mt)", fontStyle: "italic" }}>[9:16] {s.visuel_916}</p>}
              </div>
            ))}
            {(v.scenes || []).length > 2 && <p style={{ fontSize: 12, color: "var(--mt)", fontStyle: "italic" }}>+ {v.scenes.length - 2} réplique(s)…</p>}
            <div style={{ background: "var(--tx)", borderRadius: 10, padding: 12, marginTop: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "var(--r)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>🎬 Cliffhanger</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 4 }}>{v.cliffhanger_scene?.texte}</p>
              {v.cliffhanger_scene?.visuel_916 && <p style={{ fontSize: 11, color: "var(--r)", fontStyle: "italic" }}>[9:16] {v.cliffhanger_scene.visuel_916}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ accent, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 3, borderRadius: 2, background: accent || "var(--r)", alignSelf: "stretch", flexShrink: 0, minHeight: 36 }} />
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: accent || "var(--r)", marginBottom: 2 }}>{title}</p>
        {sub && <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.4 }}>{sub}</p>}
      </div>
    </div>
  );
}

function AfficheView({ affiche, loading, bible, onBack }) {
  const accent = affiche?.palette?.[0] || "var(--r)";
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>← Bible</button>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>🎨 Dossier de présentation</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>Ton kit visuel complet — affiche + direction artistique + image IA</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16, animation: "pulse 1.2s infinite" }}>🎨</div>
            <p style={{ color: "var(--mt)" }}>Création de la direction artistique…</p>
          </div>
        ) : affiche ? (
          <>
            {/* — 1. AFFICHE — */}
            <SectionTitle accent={accent} title="01 — Affiche de présentation" sub="Imprime-la ou joins-la à ton PDF d'épisodes pour présenter ta série." />
            <div style={{ background: "#fff", borderRadius: 20, padding: "40px 28px 32px", marginBottom: 28, textAlign: "center", aspectRatio: "9/14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.15)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${affiche.palette?.[0] || "#E85C3A"}, ${affiche.palette?.[1] || "#ff8c42"})` }} />
              {affiche.palette?.[0] && (
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${affiche.palette[0]}12 0%, transparent 65%)`, pointerEvents: "none" }} />
              )}
              <p style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: affiche.palette?.[0] || "#E85C3A", marginBottom: 24, fontWeight: 700, position: "relative" }}>VERTICAL CLAP PRESENTS</p>
              <h1 style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 900, color: "#0a0a0f", lineHeight: 1, marginBottom: 18, letterSpacing: -1, position: "relative" }}>{bible?.titre}</h1>
              {affiche.tagline && (
                <div style={{ position: "relative", marginBottom: 14 }}>
                  <div style={{ width: 40, height: 2, background: affiche.palette?.[0] || "#E85C3A", margin: "0 auto 12px" }} />
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: 0.3 }}>{affiche.tagline}</p>
                </div>
              )}
              {affiche.sous_titre && <p style={{ fontSize: 12, color: "#666", fontStyle: "italic", lineHeight: 1.5, position: "relative" }}>{affiche.sous_titre}</p>}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: affiche.palette?.[0] || "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontSize: 8, letterSpacing: 2, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>verticalclap.com</span>
              </div>
            </div>

            {/* — 2. DIRECTION ARTISTIQUE — */}
            {affiche.style_visuel && (
              <>
                <SectionTitle accent={accent} title="02 — Direction artistique" sub="L'ambiance visuelle de ta série — pour briefer un DA, un graphiste ou une IA." />
                <div style={{ background: "var(--card)", borderRadius: 14, padding: 18, marginBottom: 28, border: "1.5px solid var(--bo)" }}>
                  <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: affiche.typographie ? 12 : 0 }}>{affiche.style_visuel}</p>
                  {affiche.typographie && (
                    <div style={{ borderTop: "1px solid var(--bo)", paddingTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>🔤</span>
                      <p style={{ fontSize: 13, color: "var(--mt)", fontStyle: "italic" }}>{affiche.typographie}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* — 3. PROMPT IA — */}
            {affiche.prompt_ia && (
              <>
                <SectionTitle accent={accent} title="03 — Générer l'image de couverture" sub="Copie ce prompt et colle-le dans Midjourney, DALL-E (ChatGPT), Gemini ou Ideogram pour générer l'affiche." />
                <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, border: `2px solid ${accent}33`, marginBottom: 12 }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--tx)", fontFamily: "monospace", marginBottom: 14 }}>{affiche.prompt_ia}</p>
                  <button onClick={() => navigator.clipboard?.writeText(affiche.prompt_ia)} style={{ background: accent, border: "none", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", width: "100%" }}>
                    📋 Copier le prompt
                  </button>
                </div>
                <p style={{ fontSize: 11, color: "var(--mt)", textAlign: "center", lineHeight: 1.5 }}>
                  Midjourney → /imagine + colle · ChatGPT → "Génère cette image :" + colle · Gemini → même chose
                </p>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function SocialView({ social, loading, ep, bible, onBack }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>← Studio</button>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>📱 Contenu Social</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>Ép. {ep?.numero} · {ep?.titre}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16, animation: "pulse 1.2s infinite" }}>📱</div>
            <p style={{ color: "var(--mt)" }}>Génération du contenu social…</p>
          </div>
        ) : social ? (
          <>
            {/* Légende TikTok */}
            {social.legende && (
              <div style={{ background: "linear-gradient(135deg, #ff0050, #ff6b6b)", borderRadius: 16, padding: 18, marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>📣 Légende TikTok</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{social.legende}</p>
                <button onClick={() => navigator.clipboard?.writeText(social.legende)} style={{ marginTop: 12, background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>Copier</button>
              </div>
            )}
            {/* SMS */}
            {(social.sms || []).length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>💬 SMS entre personnages</p>
                <div style={{ background: "#1a1a1a", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {(social.sms || []).map((m, i) => {
                    const isRight = i % 2 === 0;
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isRight ? "flex-end" : "flex-start" }}>
                        <p style={{ fontSize: 10, color: "#666", marginBottom: 3 }}>{isRight ? m.from : m.to} · {m.heure}</p>
                        <div style={{ background: isRight ? "#007AFF" : "#2a2a2a", borderRadius: isRight ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 14px", maxWidth: "80%" }}>
                          <p style={{ fontSize: 14, color: "#fff", lineHeight: 1.4 }}>{m.texte}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Commentaires TikTok */}
            {(social.commentaires || []).length > 0 && (
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>🎵 Commentaires TikTok</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(social.commentaires || []).map((c, i) => (
                    <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: "12px 14px", border: "1.5px solid var(--bo)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `hsl(${(i * 60) % 360}, 60%, 55%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 14 }}>{c.reaction}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--r)", marginBottom: 3 }}>{c.user}</p>
                        <p style={{ fontSize: 13, lineHeight: 1.5 }}>{c.texte}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <span style={{ fontSize: 16 }}>❤️</span>
                        <span style={{ fontSize: 10, color: "var(--mt)", fontWeight: 700 }}>{c.likes >= 1000 ? `${(c.likes / 1000).toFixed(1)}k` : c.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function TournageView({ script, ep, duree, onBack }) {
  const [playing, setPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [speed, setSpeed] = useState(duree <= 60 ? 50 : duree <= 90 ? 70 : 90);
  const [showSettings, setShowSettings] = useState(false);

  if (!script) return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#888", marginBottom: 20 }}>Script non disponible</p>
        <button onClick={onBack} style={{ background: "var(--r)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 700 }}>← Retour</button>
      </div>
    </div>
  );

  const lines = [];
  if (script.hook_scene) { lines.push({ t: "lbl", v: "⚡ HOOK" }); lines.push({ t: "txt", v: script.hook_scene.texte }); lines.push({ t: "stg", v: script.hook_scene.visuel_916 }); }
  (script.scenes || []).forEach(s => { lines.push({ t: "nm", v: s.perso, jeu: s.jeu }); lines.push({ t: "txt", v: s.dialogue }); lines.push({ t: "stg", v: s.visuel_916 }); });
  if (script.cliffhanger_scene) { lines.push({ t: "lbl", v: "🎬 CLIFFHANGER" }); lines.push({ t: "txt", v: script.cliffhanger_scene.texte }); if (script.cliffhanger_scene.label) lines.push({ t: "hi", v: script.cliffhanger_scene.label }); }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#000", color: "#fff", overflow: "hidden" }}>
      <style>{`
        @keyframes teleprompt { from { transform: translateY(100vh); } to { transform: translateY(-100%); } }
        .tp-content { animation: teleprompt ${speed}s linear infinite; animation-play-state: ${playing ? "running" : "paused"}; }
      `}</style>

      {/* Barre du haut */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#111", flexShrink: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #333", color: "#aaa", cursor: "pointer", padding: "8px 12px", borderRadius: 8, fontFamily: "var(--sans)", fontSize: 13 }}>← Retour</button>
        <button onClick={() => setPlaying(p => !p)} style={{ background: playing ? "#333" : "var(--r)", border: "none", cursor: "pointer", padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "var(--sans)", minWidth: 100 }}>
          {playing ? "⏸ Pause" : "▶ Démarrer"}
        </button>
        <button onClick={() => setShowSettings(s => !s)} style={{ background: showSettings ? "#333" : "none", border: "1px solid #333", color: "#aaa", cursor: "pointer", padding: "8px 12px", borderRadius: 8, fontFamily: "var(--sans)", fontSize: 16 }}>⚙️</button>
      </div>

      {/* Panneau réglages */}
      {showSettings && (
        <div style={{ background: "#1a1a1a", padding: "16px 20px", flexShrink: 0, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <p style={{ fontSize: 11, color: "#888", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Taille du texte — {fontSize}px</p>
              <input type="range" min={18} max={44} value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--r)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555", marginTop: 4 }}>
                <span>A</span><span style={{ fontSize: 16 }}>A</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <p style={{ fontSize: 11, color: "#888", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Vitesse — {speed}s</p>
              <input type="range" min={20} max={150} value={speed} onChange={e => setSpeed(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--r)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555", marginTop: 4 }}>
                <span>⚡ Rapide</span><span>🐢 Lent</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zone téléprompteur */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div className="tp-content" style={{ padding: "0 28px", willChange: "transform" }}>
          {lines.map((l, i) => {
            if (l.t === "lbl") return <p key={i} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "var(--r)", marginBottom: 8, marginTop: 40, textAlign: "center" }}>{l.v}</p>;
            if (l.t === "nm") return <div key={i} style={{ textAlign: "center", marginTop: 32, marginBottom: 6 }}><p style={{ fontSize: Math.round(fontSize * 0.55), fontWeight: 700, color: "#facc15", letterSpacing: 2, textTransform: "uppercase" }}>{l.v}</p>{l.jeu && <p style={{ fontSize: Math.round(fontSize * 0.45), color: "#aaa", fontStyle: "italic", marginTop: 2 }}>{l.jeu}</p>}</div>;
            if (l.t === "txt") return <p key={i} style={{ fontFamily: "var(--serif)", fontSize, color: "#fff", lineHeight: 1.6, marginBottom: 12, fontWeight: 700, textAlign: "center" }}>{l.v}</p>;
            if (l.t === "stg") return <p key={i} style={{ fontSize: Math.round(fontSize * 0.6), color: "#f97316", fontStyle: "italic", marginBottom: 28, textAlign: "center" }}>[{l.v}]</p>;
            if (l.t === "hi") return <div key={i} style={{ textAlign: "center", marginTop: 10, marginBottom: 28 }}><span style={{ display: "inline-block", background: "var(--r)", borderRadius: 6, padding: "8px 20px", fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{l.v}</span></div>;
            return null;
          })}
          <div style={{ height: "100vh" }} />
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState(null);
  const [plan, setPlan] = useState("standard");
  const [checking, setChecking] = useState(true);
  const [screen, setScreen] = useState("mix");
  const [darkMode, setDarkMode] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    try {
      if (localStorage.getItem("vs_theme") === "dark") setDarkMode(true);
      setSavedCount(JSON.parse(localStorage.getItem(SAVE_KEY) || "[]").length);
      const storedPlan = localStorage.getItem("vs_plan");
      if (storedPlan) setPlan(storedPlan);
      const storedLang = localStorage.getItem("vs_lang");
      if (storedLang) {
        setLang(storedLang);
      } else {
        const nav = (navigator.language || navigator.userLanguage || "fr").toLowerCase();
        const detected = nav.startsWith("fr") ? "fr" : "en";
        setLang(detected);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "");
    try { localStorage.setItem("vs_theme", darkMode ? "dark" : "light"); } catch {}
  }, [darkMode]);

  const toggleLang = () => {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    setState(prev => ({
      ...prev,
      casting: OPTS[next].casting[0],
      univers: prev.mode === "fast" ? OPTS[next].univers_fast[0] : OPTS[next].univers_prem[0],
      secret: prev.mode === "fast" ? OPTS[next].secret_fast[0] : OPTS[next].secret_prem[0],
    }));
    try { localStorage.setItem("vs_lang", next); } catch {}
  };

  const t = T[lang];
  const opts = OPTS[lang];

  const [state, setState] = useState({ mode: "fast", casting: OPTS.fr.casting[0], univers: OPTS.fr.univers_fast[0], secret: OPTS.fr.secret_fast[0], format: 10, duree: 60, genre: "", ambiance: "", tropes: "", packId: null, style: "⚡ TikTok Drama", drama: { romance: 5, toxicite: 5, mystere: 4, humour: 2, violence: 3, spicy: 3 } });
  const [bible, setBible] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [epIdx, setEpIdx] = useState(0);
  const epReqRef = useRef(0);
  const [script, setScript] = useState(null);
  const [scripts, setScripts] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("Initialisation…");
  const [err, setErr] = useState(null);

  const set = (patch) => setState(prev => ({ ...prev, ...(typeof patch === "function" ? patch(prev) : patch) }));
  const cleanState = (s) => ({
    ...s,
    casting: s.casting?.startsWith(CUSTOM_PREFIX) ? s.casting.slice(CUSTOM_PREFIX.length) : s.casting,
    univers: s.univers?.startsWith(CUSTOM_PREFIX) ? s.univers.slice(CUSTOM_PREFIX.length) : s.univers,
    secret: s.secret?.startsWith(CUSTOM_PREFIX) ? s.secret.slice(CUSTOM_PREFIX.length) : s.secret,
  });

  // ── Auth: check Stripe session or stored customerId ──
  useEffect(() => {
    if (!router.isReady) return;
    const stored = localStorage.getItem("vs_customer");
    const { session_id, admin } = router.query;
    if (admin && admin === process.env.NEXT_PUBLIC_JETON_ADMIN) {
      localStorage.setItem("vs_customer", admin);
      setCustomerId(admin);
      setChecking(false);
      router.replace("/app");
      return;
    }
    if (session_id) {
      fetch(`/api/session?session_id=${session_id}`)
        .then(r => r.json())
        .then(d => {
          if (d.customerId) {
            localStorage.setItem("vs_customer", d.customerId);
            localStorage.setItem("vs_plan", d.plan || "standard");
            setCustomerId(d.customerId);
            setPlan(d.plan || "standard");
            router.replace("/app");
          }
        })
        .finally(() => setChecking(false));
    } else if (stored) {
      fetch("/api/verify-plan", {
        method: "POST",
        headers: { Authorization: `Bearer ${stored}` },
      })
        .then(r => r.json())
        .then(d => {
          if (d.active) {
            setCustomerId(stored);
            setPlan(d.plan || "standard");
            localStorage.setItem("vs_plan", d.plan || "standard");
          } else {
            localStorage.removeItem("vs_customer");
            localStorage.removeItem("vs_plan");
          }
        })
        .catch(() => {
          // En cas d'erreur réseau, on fait confiance au localStorage
          setCustomerId(stored);
        })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [router.isReady, router.query]);

  const logout = () => { localStorage.removeItem("vs_customer"); localStorage.removeItem("vs_plan"); setCustomerId(null); setPlan("standard"); };

  // ── Generation ──
  const generate = async () => {
    setErr(null);
    setScreen("load");
    try {
      setLoadMsg("Création de la bible de la série…");
      const b = await gen("bible", { ...cleanState(state), lang }, customerId);
      setBible(b);

      const totalBatches = Math.ceil(state.format / 10);
      const batches = [];
      for (let i = 0; i < state.format; i += 10) {
        const from = i + 1, to = Math.min(i + 10, state.format);
        const batchNum = Math.floor(i / 10) + 1;
        const batchPromise = gen("episodes", { titre: b.titre, logline: b.logline, mode: state.mode, from, to, total: state.format, lang }, customerId)
          .then(result => {
            setLoadMsg(`Épisodes ${from}–${to} générés… (${batchNum}/${totalBatches})`);
            return result;
          });
        batches.push(batchPromise);
      }
      setLoadMsg(`Génération des ${state.format} épisodes…`);
      const results = await Promise.all(batches);
      const eps = results.flatMap(r => r.episodes || []);
      setEpisodes(eps);
      setScripts({});
      saveSerie(b, eps, state, {});
      setSavedCount(loadSaved().length);
      setScreen("bible");
    } catch (e) {
      setErr(e.message);
    }
  };

  const loadSerie = (s) => {
    setBible(s.bible);
    setEpisodes(s.episodes);
    setScripts(s.scripts || {});
    setState(prev => ({ ...prev, ...s.state }));
    setScript(null);
    setScreen("bible");
  };

  const openEp = async (idx) => {
    const reqId = ++epReqRef.current;
    setEpIdx(idx);
    setScreen("studio");
    setErr(null);

    // Use cached script if available
    if (scripts[idx]) {
      setScript(scripts[idx]);
      setLoading(false);
      return;
    }

    setScript(null);
    setLoading(true);
    try {
      const s = await gen("script", { ep: episodes[idx], bible, mode: state.mode, duree: state.duree, style: state.style, drama: state.drama, lang }, customerId);
      if (epReqRef.current === reqId) {
        setScript(s);
        setScripts(prev => {
          const updated = { ...prev, [idx]: s };
          updateSerieScripts(bible, { [idx]: s });
          return updated;
        });
      }
    } catch (e) {
      console.error(e);
      if (epReqRef.current === reqId) {
        setErr(e.message);
        setScreen("bible");
      }
    }
    if (epReqRef.current === reqId) setLoading(false);
  };

  const editScript = async (type) => {
    setLoading(true);
    try {
      const u = await gen("edit", { script, type, duree: state.duree }, customerId);
      setScript(u);
      setScripts(prev => {
        const updated = { ...prev, [epIdx]: u };
        updateSerieScripts(bible, { [epIdx]: u });
        return updated;
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const [variations, setVariations] = useState(null);
  const [loadingVariations, setLoadingVariations] = useState(false);
  const [social, setSocial] = useState(null);
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [affiche, setAffiche] = useState(null);
  const [loadingAffiche, setLoadingAffiche] = useState(false);

  const genVariations = async () => {
    setVariations(null);
    setLoadingVariations(true);
    setScreen("variations");
    try {
      const r = await gen("variations", { ep: episodes[epIdx], bible, mode: state.mode, duree: state.duree }, customerId);
      setVariations(r.variations || []);
    } catch (e) { console.error(e); }
    setLoadingVariations(false);
  };

  const selectVariation = (v) => {
    setScript(v);
    setScreen("studio");
  };

  const genSocial = async () => {
    setSocial(null);
    setLoadingSocial(true);
    setScreen("social");
    try {
      const r = await gen("social", { ep: episodes[epIdx], bible, mode: state.mode }, customerId);
      setSocial(r);
    } catch (e) { console.error(e); }
    setLoadingSocial(false);
  };

  const genAffiche = async () => {
    setAffiche(null);
    setLoadingAffiche(true);
    setScreen("affiche");
    try {
      const r = await gen("affiche", { titre: bible.titre, logline: bible.logline, personnages: bible.personnages || [], genre: state.genre, ambiance: state.ambiance }, customerId);
      setAffiche(r);
    } catch (e) { console.error(e); }
    setLoadingAffiche(false);
  };

  const exportScript = async () => {
    const b = bible, ep = episodes[epIdx], s = script;
    if (!s) return;

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, margin = 20, contentW = W - margin * 2;
    const RED = [232, 92, 58], DARK = [15, 26, 18], GRAY = [120, 120, 120];
    let y = margin;

    const addText = (text, opts = {}) => {
      const { size = 11, bold = false, color = [0, 0, 0], italic = false, align = "left", maxWidth = contentW } = opts;
      doc.setFontSize(size);
      doc.setFont("helvetica", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(String(text || ""), maxWidth);
      const lineH = size * 0.52;
      if (y + lines.length * lineH > 280) { doc.addPage(); y = margin; }
      doc.text(lines, align === "center" ? W / 2 : margin, y, { align });
      y += lines.length * lineH + 3;
      return lines.length * lineH + 3;
    };

    const addSpace = (h = 4) => { y += h; };
    const addLine = (color = [220, 220, 220]) => { doc.setDrawColor(...color); doc.line(margin, y, W - margin, y); addSpace(4); };

    const addWatermark = () => {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.07 }));
        doc.setFontSize(38);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(232, 92, 58);
        doc.text("VERTICALCLAP", W / 2, 148, { align: "center", angle: 45 });
        doc.restoreGraphicsState();
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 180, 180);
        doc.text("verticalclap.com", W / 2, 293, { align: "center" });
      }
    };

    // En-tête
    doc.setFillColor(...RED);
    doc.rect(0, 0, W, 12, "F");
    doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
    doc.text("VERTICALCLAP", margin, 8);
    doc.text(`${b.titre} — Ép. ${ep.numero}`, W - margin, 8, { align: "right" });
    y = 22;

    addText(b.titre.toUpperCase(), { size: 9, bold: true, color: GRAY });
    addText(ep.titre, { size: 22, bold: true });
    addSpace(2);
    addText(`« ${b.logline} »`, { size: 11, italic: true, color: GRAY });
    addSpace(2);
    addText(`Épisode ${ep.numero} · ${DUR_LABEL[lang][state.duree]}`, { size: 10, bold: true, color: RED });
    addSpace(4);
    addLine(RED);

    // Hook
    addText("⚡ HOOK — 3 PREMIÈRES SECONDES", { size: 8, bold: true, color: RED });
    addSpace(2);
    doc.setFillColor(255, 245, 242);
    const hookH = doc.splitTextToSize(String(s.hook_scene?.texte || ""), contentW - 8).length * 4.5 + 12;
    doc.roundedRect(margin, y, contentW, hookH, 3, 3, "F");
    y += 4;
    addText(s.hook_scene?.texte, { size: 13, bold: true, maxWidth: contentW - 8 });
    addText(`[9:16] ${s.hook_scene?.visuel_916}`, { size: 9, italic: true, color: RED, maxWidth: contentW - 8 });
    y = Math.max(y, margin + 22 + hookH + 4);
    addSpace(6);

    // Scènes
    addText(`SCRIPT · ${DUR_LABEL[lang][state.duree]}`, { size: 8, bold: true, color: RED });
    addSpace(3);
    (s.scenes || []).forEach(sc => {
      addText(sc.perso, { size: 9, bold: true, color: DARK });
      if (sc.jeu) addText(sc.jeu, { size: 8, italic: true, color: GRAY });
      addSpace(1);
      addText(sc.dialogue, { size: 12 });
      addSpace(2);
      addText(`[9:16] ${sc.visuel_916}`, { size: 9, italic: true, color: GRAY });
      addSpace(6);
      addLine();
    });

    // Cliffhanger
    addSpace(2);
    doc.setFillColor(...DARK);
    const cliffH = doc.splitTextToSize(String(s.cliffhanger_scene?.texte || ""), contentW - 8).length * 5.5 + 16;
    doc.roundedRect(margin, y, contentW, Math.max(cliffH, 24), 3, 3, "F");
    y += 5;
    addText("🎬 CLIFFHANGER", { size: 8, bold: true, color: RED });
    addSpace(1);
    addText(s.cliffhanger_scene?.texte, { size: 13, bold: true, color: [255, 255, 255], maxWidth: contentW - 8 });
    addText(s.cliffhanger_scene?.visuel_916, { size: 9, italic: true, color: RED, maxWidth: contentW - 8 });
    addSpace(12);

    addWatermark();
    doc.save(`${b.titre.replace(/\s+/g, "_")}_ep${ep.numero}.pdf`);
  };

  // ── Render ──
  if (checking) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><div style={{ width: 48, height: 48, borderRadius: "50%", background: "#E85C3A", animation: "pulse 1.5s infinite" }} /></div>;

  if (!customerId) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, textAlign: "center", background: "var(--bg)" }}>
        <div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Vertical Studio</h1>
          <p style={{ color: "var(--mt)", marginBottom: 28, lineHeight: 1.6 }}>Un abonnement est requis pour accéder à l'application.</p>
          <a href="/" style={{ display: "inline-block", background: "var(--r)", color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15 }}>Voir les tarifs →</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", overflow: "hidden", background: "var(--bg)" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>

      {/* Loading */}
      {screen === "load" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
          {err ? (
            <>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#999", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><span style={{ color: "#fff", fontSize: 20 }}>!</span></div>
              <p style={{ color: "var(--r)", fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 340 }}>{err}</p>
              <button onClick={() => setScreen("mix")} style={{ background: "var(--r)", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>← Retour</button>
            </>
          ) : (
            <>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "pulse 1.5s infinite" }}><span style={{ color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>REC</span></div>
              <p style={{ fontSize: 15, color: "var(--mt)" }}>{loadMsg}</p>
            </>
          )}
        </div>
      )}

      {screen === "mix" && <Mixeur state={state} set={set} onGen={generate} onMesSeries={() => setScreen("mes-series")} hasSeries={savedCount > 0} plan={plan} t={t} opts={opts} lang={lang} />}
      {screen === "mes-series" && <MesSeriesView onLoad={loadSerie} onBack={() => setScreen("mix")} t={t} />}
      {screen === "bible" && bible && <BibleView bible={bible} episodes={episodes} mode={state.mode} duree={state.duree} onEp={openEp} onBack={() => setScreen("mix")} customerId={customerId} plan={plan} onAffiche={genAffiche} t={t} lang={lang} />}
      {screen === "studio" && <StudioView bible={bible} ep={episodes[epIdx]} script={script} loading={loading} duree={state.duree} onEdit={editScript} onTournage={() => setScreen("tour")} onBack={() => setScreen("bible")} onExport={exportScript} onVariations={genVariations} plan={plan} onPrev={() => openEp(epIdx - 1)} onNext={() => openEp(epIdx + 1)} epIdx={epIdx} totalEps={episodes.length} onSocial={genSocial} onTranslate={(langue) => gen("traduire", { script, langue }, customerId)} t={t} lang={lang} />}
      {screen === "variations" && <VariationsView variations={variations} loading={loadingVariations} ep={episodes[epIdx]} onSelect={selectVariation} onBack={() => setScreen("studio")} t={t} />}
      {screen === "tour" && <TournageView script={script} ep={episodes[epIdx]} duree={state.duree} onBack={() => setScreen("studio")} />}
      {screen === "social" && <SocialView social={social} loading={loadingSocial} ep={episodes[epIdx]} bible={bible} onBack={() => setScreen("studio")} t={t} />}
      {screen === "affiche" && <AfficheView affiche={affiche} loading={loadingAffiche} bible={bible} onBack={() => setScreen("bible")} t={t} lang={lang} />}

      {/* Top bar: dark mode + lang toggle + logout */}
      {screen !== "tour" && (
        <div style={{ position: "fixed", top: 14, right: 20, zIndex: 100, display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={toggleLang} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)", letterSpacing: 0.5 }}>{lang === "fr" ? "EN" : "FR"}</button>
          <button onClick={() => setDarkMode(d => !d)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", lineHeight: 1 }} title={darkMode ? "Mode jour" : "Mode nuit"}>{darkMode ? "☀️" : "🌙"}</button>
          <button onClick={logout} style={{ background: "none", border: "none", fontSize: 12, color: "var(--mt)", cursor: "pointer" }}>{t.logout}</button>
        </div>
      )}
    </div>
  );
}
