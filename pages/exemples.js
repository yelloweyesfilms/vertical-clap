import { useState, useEffect } from "react";
import Head from "next/head";
import { Space_Grotesk, Playfair_Display } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sg", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","900"], style: ["normal","italic"], variable: "--font-pd", display: "swap" });

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#b0bfd4";
const SITE = "https://verticalclap.com";

const EXEMPLES = [
  {
    mode: "fast",
    modeLabel: "⚡ Creator",
    genre: "Medical · Thriller",
    casting: "1 Femme + 1 Homme",
    univers: "Hôpital privé",
    bible: {
      titre: "Le Syndrome du Mensonge",
      logline: "Une cardiologue découvre que son mari, chef de chirurgie, mène une double vie — et que son prochain patient est son autre famille.",
      pitch: "Dans un hôpital privé parisien, Sofia croit tout contrôler : sa carrière, son couple, ses émotions. Jusqu'au jour où un homme inconnu arrive aux urgences avec son nom de famille tatoué sur le poignet. En cherchant à comprendre, elle va démanteler dix ans de mensonges — et mettre en danger une vie qu'elle ne savait pas protéger.",
      personnages: [
        { nom: "Sofia", age: 38, role: "Cardiologue cheffe de service", secret: "Elle sait depuis 6 mois. Elle n'a rien dit." },
        { nom: "Marc", age: 42, role: "Chef de chirurgie, mari de Sofia", secret: "Il a une fille de 7 ans avec une autre femme — dans le même hôpital." },
      ],
      tension_centrale: "Peut-on sauver la vie de quelqu'un qu'on veut voir mourir ?",
      episodes: 10,
    },
    script: {
      numero: 1,
      titre: "Le tatouage",
      hook_scene: {
        texte: "Un homme inconnu. Mon nom de famille. Sur son poignet.",
        visuel_916: "Gros plan poignet, tatouage net, mains de Sofia qui tremblent au-dessus",
      },
      scenes: [
        { perso: "SOFIA", dialogue: "Qui êtes-vous ? Ce nom... c'est le mien.", jeu: "voix plate, choc intérieur", visuel_916: "Face caméra, yeux fixes" },
        { perso: "MARC", dialogue: "Sofia. Sors de cette salle. Maintenant.", jeu: "panique froide", visuel_916: "Plan épaule, il bloque le couloir" },
        { perso: "SOFIA", dialogue: "Tu le connais. Tu le connais et tu ne m'as rien dit.", jeu: "colère retenue", visuel_916: "Zoom lent sur son visage" },
      ],
      cliffhanger_scene: {
        texte: "L'homme ouvre les yeux. Il murmure : « Papa... »",
        visuel_916: "Insert visage patient, regard vers Marc hors-champ",
        label: "ÉP. 2 : LA VÉRITÉ",
      },
    },
  },
  {
    mode: "premium",
    modeLabel: "🎭 Pro",
    genre: "Finance · Thriller psychologique",
    casting: "2 Hommes",
    univers: "Finance internationale",
    bible: {
      titre: "L'Héritier",
      logline: "Deux associés fondateurs d'un fonds d'investissement : l'un prépare une OPA hostile sur l'entreprise de l'autre — sans qu'il le sache.",
      pitch: "Thomas et Karim ont tout bâti ensemble. Quinze ans d'amitié, cent millions sous gestion, un bureau au 32e étage. Mais Thomas sait quelque chose que Karim ignore : le fonds qu'ils dirigent est en train d'acheter en secret les parts de l'entreprise familiale de Karim. Dans 72 heures, Karim sera dépossédé de tout. Et il devra décider s'il peut encore faire confiance à l'homme qui a tout organisé.",
      personnages: [
        { nom: "Thomas", age: 44, role: "Associé gérant, stratège", secret: "Il sabote Karim sur ordre d'un investisseur étranger — ou il mourra." },
        { nom: "Karim", age: 41, role: "Associé opérationnel, héritier", secret: "Il a déjà découvert une partie du plan. Il attend de voir jusqu'où Thomas ira." },
      ],
      tension_centrale: "Entre trahison et survie, lequel des deux est vraiment la victime ?",
      episodes: 20,
    },
    script: {
      numero: 3,
      titre: "72 heures",
      hook_scene: {
        texte: "J'ai signé. Pour toi. Maintenant je ne peux plus rien arrêter.",
        visuel_916: "Gros plan main sur contrat, stylo posé, pas de regard caméra",
      },
      scenes: [
        { perso: "KARIM", dialogue: "Tu m'as appelé à 3h du matin pour me dire ça.", jeu: "calme dangereux", visuel_916: "Contre-plongée, fenêtre nuit derrière" },
        { perso: "THOMAS", dialogue: "Ils ont ma femme. Karim. Ils ont ma femme depuis hier soir.", jeu: "voix brisée, premier signe de fissure", visuel_916: "Plan serré épaule, il ne regarde pas" },
        { perso: "KARIM", dialogue: "Et tu crois que ça change quelque chose pour moi ?", jeu: "silence lourd avant de parler", visuel_916: "Zoom très lent, regard direct caméra" },
      ],
      cliffhanger_scene: {
        texte: "Karim pose une enveloppe sur la table. « Je sais depuis le début. »",
        visuel_916: "Insert enveloppe, photos visibles à l'intérieur, Thomas pâlit",
        label: "ÉP. 4 : LE RETOURNEMENT",
      },
    },
  },
  {
    mode: "fast",
    modeLabel: "⚡ Creator",
    genre: "Romance · Dark Drama",
    casting: "Trio mixte",
    univers: "Famille recomposée",
    bible: {
      titre: "Notre Sang",
      logline: "Une mère découvre que l'enfant de son nouveau mari est en réalité le fils qu'elle a abandonné à la naissance — il y a dix-sept ans.",
      pitch: "Laure a refait sa vie. Nouveau mari, nouvelle maison, nouvelle chance. Jusqu'à ce que Nathan, 17 ans, beau-fils parfait, retrouve son acte de naissance dans les affaires de son père. Et que les dates ne mentent pas. Trois personnes. Un secret qui change tout. Et une question que personne n'ose poser : est-ce qu'on peut aimer quelqu'un qu'on a choisi d'abandonner ?",
      personnages: [
        { nom: "Laure", age: 36, role: "Belle-mère, ancienne infirmière", secret: "Elle a abandonné un enfant à 19 ans. Elle n'en a jamais parlé." },
        { nom: "Nathan", age: 17, role: "Beau-fils, lycéen", secret: "Il a trouvé l'acte de naissance. Il attend que Laure lui dise la vérité." },
        { nom: "Éric", age: 40, role: "Père de Nathan, mari de Laure", secret: "Il sait. Il a tout organisé pour que Laure et Nathan se retrouvent." },
      ],
      tension_centrale: "Quand le mensonge devient famille, la vérité peut-elle encore réparer ?",
      episodes: 10,
    },
    script: {
      numero: 2,
      titre: "Le papier",
      hook_scene: {
        texte: "Nathan pose une feuille sur la table. Il ne dit rien. Il attend.",
        visuel_916: "Plan large table de cuisine, mains de Nathan, Laure debout en fond",
      },
      scenes: [
        { perso: "LAURE", dialogue: "C'est quoi ça ?", jeu: "sourire forcé qui se fige", visuel_916: "Gros plan visage, elle lit sans bouger" },
        { perso: "NATHAN", dialogue: "Tu le sais très bien.", jeu: "voix posée, dix-sept ans de retenue", visuel_916: "Face caméra, bras croisés" },
        { perso: "LAURE", dialogue: "Nathan... je t'en supplie, laisse-moi t'expliquer.", jeu: "effondrement, larmes retenues", visuel_916: "Elle s'assoit, plan poitrine" },
      ],
      cliffhanger_scene: {
        texte: "Nathan : « Éric est au courant depuis combien de temps ? »",
        visuel_916: "Insert porte entrouverte, ombre d'Éric dans le couloir",
        label: "ÉP. 3 : LE PÈRE",
      },
    },
  },
  {
    mode: "fast",
    modeLabel: "⚡ Creator",
    genre: "K-Drama · Romance",
    casting: "1 Femme + 1 Homme",
    univers: "Mode & Influence",
    bible: {
      titre: "Faux Semblants",
      logline: "Une influenceuse mode découvre que son nouveau patron est l'homme qui l'a ruinée cinq ans plus tôt — et qu'il ne se souvient pas d'elle.",
      pitch: "Jade a tout reconstruit. Son compte, son audience, sa réputation. Quand elle décroche un contrat avec la marque de luxe Volvane, elle ne sait pas encore que derrière le CEO se cache l'homme qui a volé ses créations à 22 ans. Lui ne la reconnaît pas. Elle, si. Et elle va décider si la vengeance vaut plus que la vérité — ou si, quelque part, elle est encore amoureuse.",
      personnages: [
        { nom: "Jade", age: 27, role: "Influenceuse mode, ex-designeuse", secret: "Elle a accepté ce contrat uniquement pour se venger. Elle a un plan." },
        { nom: "Luca", age: 34, role: "CEO Volvane, self-made", secret: "Il sait très bien qui elle est. Il attend de voir ce qu'elle va faire." },
      ],
      tension_centrale: "Peut-on tomber amoureux de quelqu'un qu'on est venu détruire ?",
      episodes: 10,
    },
    script: {
      numero: 1,
      titre: "Le contrat",
      hook_scene: {
        texte: "Il m'a souri. Il ne m'a pas reconnue. Parfait.",
        visuel_916: "Gros plan yeux de Jade, sourire froid, bureau vitré derrière",
      },
      scenes: [
        { perso: "LUCA", dialogue: "Votre portfolio est impressionnant. Bienvenue chez Volvane.", jeu: "charme professionnel, regard direct", visuel_916: "Plongée légère, il signe sans lever les yeux" },
        { perso: "JADE", dialogue: "Merci. Je vais donner le meilleur de moi-même.", jeu: "sourire parfait, voix neutre", visuel_916: "Face caméra, regard vers l'objectif une seconde" },
        { perso: "LUCA", dialogue: "On se connaît ? Vous avez un visage familier.", jeu: "curiosité sincère", visuel_916: "Zoom lent sur lui, Jade dans le flou derrière" },
      ],
      cliffhanger_scene: {
        texte: "Jade rentre chez elle. Sur son bureau : ses créations d'il y a cinq ans — avec le logo Volvane.",
        visuel_916: "Insert dossier, mains de Jade qui tremblent, photo du contrat original",
        label: "ÉP. 2 : LA PREUVE",
      },
    },
  },
];

const STATS = [
  { val: "5 min", label: "pour générer une série complète" },
  { val: "90 ép.", label: "maximum par série (plan Pro)" },
  { val: "8", label: "langues de traduction disponibles" },
];

const track = (event, meta = {}) => fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, meta }) }).catch(() => {});

export default function Exemples() {
  const [active, setActive] = useState(0);
  const ex = EXEMPLES[active];
  const isPremium = ex.mode === "premium";

  useEffect(() => { track("page_view_exemples", { lang: "fr" }); }, []);

  return (
    <div className={`${spaceGrotesk.variable} ${playfair.variable}`}>
      <Head>
        <title>Exemples de séries générées par VerticalClap — Micro-dramas 9:16</title>
        <meta name="description" content="Découvrez 4 séries complètes générées par VerticalClap en 30 secondes : médical, finance, famille, romance. Bible, personnages, scripts et cliffhangers — toi, tu tournes." />
        <link rel="canonical" href={`${SITE}/exemples`} />
        <meta property="og:title" content="Exemples de séries — VerticalClap" />
        <meta property="og:description" content="4 micro-dramas complets générés par IA : médical, finance, famille, romance. Bible, scripts, hooks et cliffhangers pour TikTok, Reels et Shorts." />
        <meta property="og:url" content={`${SITE}/exemples`} />
        <meta property="og:image" content={`${SITE}/banniere%20hero.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "var(--sans)" }}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          a { text-decoration: none; color: inherit; }
          input { font-size: 16px !important; }
          .ex-tabs { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
          @media (max-width: 640px) {
            .ex-nav { padding: 12px 16px !important; }
            .ex-header { padding: 48px 16px 0 !important; }
            .ex-stats { flex-direction: column !important; }
            .ex-stats > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
            .ex-stats > div:last-child { border-bottom: none !important; }
            .ex-tabs-wrap { padding: 0 16px 36px !important; }
            .ex-tabs { flex-direction: row !important; overflow-x: auto !important; flex-wrap: nowrap !important; justify-content: flex-start !important; padding-bottom: 4px !important; scrollbar-width: none !important; }
            .ex-tabs::-webkit-scrollbar { display: none !important; }
            .ex-content { padding: 0 16px 60px !important; }
            .ex-cta { padding: 36px 20px !important; }
            .ex-screen { padding: 0 12px 36px !important; }
          }
          @media (max-width: 480px) {
            .ex-header { padding: 40px 14px 0 !important; }
            .ex-content { padding: 0 14px 60px !important; }
          }
          @media (hover: none) {
            button:hover { opacity: 1 !important; }
          }
        `}</style>

        {/* NAV */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
          <nav className="ex-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px", maxWidth: 1100, margin: "0 auto" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
              <img src="/1024.png" alt="VC" style={{ width: 32, height: 32, borderRadius: "50%" }} />
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 2 }}>VERTICAL</div>
                <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: "-0.02em", background: `linear-gradient(135deg, #ff8c42, ${RED})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CLAP</div>
              </div>
            </a>
            <a href="/tarifs" style={{ background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "10px 22px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none", letterSpacing: 0.2 }}>
              Commencer →
            </a>
          </nav>
        </div>

        {/* HEADER */}
        <div className="ex-header" style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 0", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(232,92,58,0.1)`, border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 20, padding: "5px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase" }}>Générés par l'IA en 30 secondes</span>
          </div>
          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 16, color: TEXT, textTransform: "uppercase" }}>
            4 séries générées<br /><span style={{ color: RED }}>en 30 secondes.</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 48px" }}>
            Médical, finance, famille, romance — bible complète, personnages et scripts générés par l'IA en 30 secondes.
          </p>

          {/* STATS */}
          <div className="ex-stats" style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 64, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.02)", maxWidth: 560, margin: "0 auto 64px" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "20px 12px", borderRight: i < STATS.length - 1 ? `1px solid ${BORDER}` : "none", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: i === 1 ? VIO : RED, letterSpacing: -1, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: MUTED, marginTop: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="ex-tabs-wrap" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 20 }}>Choisir un exemple</p>
          <div className="ex-tabs">
            {EXEMPLES.map((e, i) => (
              <button key={i} onClick={() => { setActive(i); track("example_tab", { index: i, title: e.title }); }} style={{
                padding: "10px 20px", borderRadius: 100, flexShrink: 0,
                border: `1px solid ${active === i ? RED : BORDER}`,
                background: active === i ? RED : "rgba(255,255,255,0.04)",
                color: active === i ? "#fff" : MUTED,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "var(--sans)", transition: "all .2s",
              }}>
                {e.bible.titre}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="ex-content" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 100px" }}>

          {/* META */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: isPremium ? "rgba(168,85,247,0.12)" : "rgba(232,92,58,0.12)", color: isPremium ? VIO : RED, border: `1px solid ${isPremium ? "rgba(168,85,247,0.3)" : "rgba(232,92,58,0.3)"}`, fontSize: 12, fontWeight: 700 }}>{ex.modeLabel}</span>
            <span style={{ fontSize: 12, color: MUTED, background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: 100, border: `1px solid ${BORDER}` }}>{ex.genre}</span>
            <span style={{ fontSize: 12, color: MUTED }}>{ex.casting} · {ex.univers} · {ex.bible.episodes} épisodes</span>
          </div>

          {/* BIBLE */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32, marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${isPremium ? "rgba(168,85,247,0.08)" : "rgba(232,92,58,0.08)"} 0%, transparent 70%)`, pointerEvents: "none" }} />
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 16 }}>📖 La Bible</p>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 28, fontWeight: 900, color: TEXT, marginBottom: 12, letterSpacing: -1, lineHeight: 1.1 }}>{ex.bible.titre}</h2>
            <p style={{ fontSize: 15, fontStyle: "italic", color: MUTED, lineHeight: 1.6, marginBottom: 20, borderLeft: `3px solid ${RED}`, paddingLeft: 16 }}>« {ex.bible.logline} »</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.75, marginBottom: 28 }}>{ex.bible.pitch}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
              {ex.bible.personnages.map((p, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, borderLeft: `3px solid ${i === 0 ? RED : VIO}` }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: TEXT, marginBottom: 4 }}>{p.nom}</p>
                  <p style={{ fontSize: 11, color: i === 0 ? RED : VIO, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{p.role} · {p.age} ans</p>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.55 }}>🔒 {p.secret}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "16px 20px", border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: isPremium ? VIO : RED, textTransform: "uppercase", marginBottom: 8 }}>Question centrale</p>
              <p style={{ fontSize: 14, fontStyle: "italic", color: TEXT, lineHeight: 1.6 }}>« {ex.bible.tension_centrale} »</p>
            </div>
          </div>

          {/* SCRIPT */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: 28, marginBottom: 48 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ background: RED, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>ÉP. {ex.script.numero}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>✍️ {ex.script.titre}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: RED, background: "rgba(232,92,58,0.12)", border: `1px solid rgba(232,92,58,0.35)`, borderRadius: 6, padding: "3px 10px", letterSpacing: 0.5, textTransform: "uppercase" }}>Extrait</span>
            </div>
            <div style={{ background: "rgba(232,92,58,0.07)", border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
              <p style={{ fontSize: 13, color: TEXT, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: RED }}>Extraits seulement.</strong> <span style={{ color: MUTED }}>Un script complet contient 8 à 12 répliques sur 4 à 6 scènes + cliffhanger. L'app génère la version intégrale en 10 secondes.</span>
              </p>
            </div>
            <div style={{ background: "rgba(232,92,58,0.08)", border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>⚡ Hook — 3 premières secondes</p>
              <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, marginBottom: 8, color: TEXT }}>{ex.script.hook_scene.texte}</p>
              <p style={{ fontSize: 11, color: RED, fontStyle: "italic" }}>[9:16] {ex.script.hook_scene.visuel_916}</p>
            </div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>Script</p>
            {ex.script.scenes.map((sc, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, borderLeft: `3px solid ${BORDER}`, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: isPremium ? VIO : RED }}>{sc.perso}</p>
                  {sc.jeu && <span style={{ fontSize: 10, background: "rgba(255,255,255,0.06)", color: MUTED, padding: "2px 8px", borderRadius: 20, fontStyle: "italic" }}>{sc.jeu}</span>}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 6, fontWeight: 500, color: TEXT }}>{sc.dialogue}</p>
                <p style={{ fontSize: 11, color: MUTED, fontStyle: "italic" }}>[9:16] {sc.visuel_916}</p>
              </div>
            ))}
            <div style={{ background: "rgba(232,92,58,0.06)", borderRadius: 12, padding: 20, marginTop: 8, border: `1px solid rgba(232,92,58,0.2)` }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>🎬 Cliffhanger</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 8, lineHeight: 1.45 }}>{ex.script.cliffhanger_scene.texte}</p>
              <p style={{ fontSize: 11, color: RED, fontStyle: "italic", marginBottom: ex.script.cliffhanger_scene.label ? 14 : 0 }}>[9:16] {ex.script.cliffhanger_scene.visuel_916}</p>
              {ex.script.cliffhanger_scene.label && (
                <span style={{ display: "inline-block", background: RED, borderRadius: 6, padding: "6px 14px", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: 1.5, textTransform: "uppercase" }}>{ex.script.cliffhanger_scene.label}</span>
              )}
            </div>
          </div>

          {/* SCREENSHOT */}
          <div className="ex-screen" style={{ margin: "0 0 48px" }}>
            <img src="/ecran.png" alt="Interface VerticalClap" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: `0 0 60px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.5)`, border: `1px solid ${BORDER}` }} />
          </div>

          {/* CTA */}
          <div className="ex-cta" style={{ textAlign: "center", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 24, padding: "48px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 16 }}>Prêt à créer ta série ?</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: TEXT, letterSpacing: -1, marginBottom: 12, textTransform: "uppercase", lineHeight: 1.1 }}>
              Ta première série<br /><span style={{ color: RED }}>en 5 minutes.</span>
            </h2>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 32, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 32px" }}>
              Bible, personnages, scripts, hooks et cliffhangers — tout généré en moins de 5 minutes.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "16px 36px", borderRadius: 14, fontWeight: 800, fontSize: 15, textDecoration: "none", letterSpacing: -0.2, boxShadow: `0 0 32px rgba(168,85,247,0.3)` }}>
                Commencer à créer →
              </a>
              <a href="/tarifs" style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", color: MUTED, padding: "16px 28px", borderRadius: 14, fontWeight: 600, fontSize: 14, textDecoration: "none", border: `1px solid ${BORDER}` }}>
                Voir les tarifs
              </a>
            </div>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 20 }}>À partir de 9€/mois · Sans engagement · Annulable à tout moment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
