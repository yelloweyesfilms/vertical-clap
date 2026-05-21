import { useState } from "react";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#94a3b8";

const EXEMPLES = [
  {
    mode: "fast",
    modeLabel: "⚡ Fast Drama",
    casting: "1 Femme + 1 Homme",
    univers: "Hôpital privé",
    secret: "Double vie",
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
    modeLabel: "🎭 Premium Suspense",
    casting: "2 Hommes",
    univers: "Finance internationale",
    secret: "Sabotage interne",
    bible: {
      titre: "L'Héritier",
      logline: "Deux associés fondateurs d'un fonds d'investissement : l'un prépare une OPA hostile sur l'entreprise de l'autre — sans qu'il le sache.",
      pitch: "Thomas et Karim ont tout bâti ensemble. Quinze ans d'amitié, cent millions sous gestion, un bureau au 32e étage. Mais Thomas sait quelque chose que Karim ignore : le fonds qu'ils dirigent est en train d'acheter en secret les parts de l'entreprise familiale de Karim. Dans 72 heures, Karim sera dépossédé de tout. Et il devra décider s'il peut encore faire confiance à l'homme qui a tout organisé.",
      personnages: [
        { nom: "Thomas", age: 44, role: "Associé gérant, stratège", secret: "Il sabote Karim sur ordre d'un investisseur étranger — ou il mourra." },
        { nom: "Karim", age: 41, role: "Associé opérationnel, héritier", secret: "Il a déjà découvert une partie du plan. Il attend de voir jusqu'où Thomas ira." },
      ],
      tension_centrale: "Entre trahison et survie, lequel des deux est vraiment la victime ?",
      episodes: 10,
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
    modeLabel: "⚡ Fast Drama",
    casting: "Trio mixte",
    univers: "Famille recomposée",
    secret: "Enfant caché",
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
];

export default function Exemples() {
  const [active, setActive] = useState(0);
  const ex = EXEMPLES[active];
  const isPremium = ex.mode === "premium";

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* NAV */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <a href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 900, textDecoration: "none", color: TEXT, letterSpacing: -0.5 }}>
            ← VerticalClap
          </a>
          <a href="/app" style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontWeight: 500 }}>Se connecter →</a>
        </nav>
      </div>

      {/* HEADER */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 0", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: RED, textTransform: "uppercase", marginBottom: 16 }}>Exemples générés</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 16, color: TEXT }}>
          3 séries prêtes à tourner
        </h1>
        <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
          Médical, finance, famille — chaque série générée en moins de 30 secondes.
        </p>
      </div>

      {/* VISUAL */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 48px" }}>
        <img src="/cliffhangers%20.png" alt="Séries exemples" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.5)" }} />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}>
        {/* TABS */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          {EXEMPLES.map((e, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{
                padding: "10px 22px", borderRadius: 100,
                border: `1px solid ${active === i ? RED : BORDER}`,
                background: active === i ? RED : "rgba(255,255,255,0.04)",
                color: active === i ? "#fff" : MUTED,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Inter', sans-serif", transition: "all .2s",
              }}>
              {e.bible.titre}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 100px" }}>

        {/* MODE + META */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
          <span style={{
            display: "inline-block", padding: "5px 14px", borderRadius: 100,
            background: isPremium ? "rgba(168,85,247,0.12)" : "rgba(232,92,58,0.12)",
            color: isPremium ? VIO : RED,
            border: `1px solid ${isPremium ? "rgba(168,85,247,0.3)" : "rgba(232,92,58,0.3)"}`,
            fontSize: 12, fontWeight: 700,
          }}>{ex.modeLabel}</span>
          <span style={{ fontSize: 13, color: MUTED }}>{ex.casting}</span>
          <span style={{ fontSize: 13, color: BORDER }}>·</span>
          <span style={{ fontSize: 13, color: MUTED }}>{ex.univers}</span>
          <span style={{ fontSize: 13, color: BORDER }}>·</span>
          <span style={{ fontSize: 13, color: MUTED }}>{ex.bible.episodes} épisodes</span>
        </div>

        {/* BIBLE */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "32px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${isPremium ? "rgba(168,85,247,0.08)" : "rgba(232,92,58,0.08)"} 0%, transparent 70%)`, pointerEvents: "none" }} />
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 16 }}>La Bible</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 900, color: TEXT, marginBottom: 12, letterSpacing: -0.5, lineHeight: 1.1 }}>{ex.bible.titre}</h2>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontStyle: "italic", color: MUTED, lineHeight: 1.6, marginBottom: 20 }}>« {ex.bible.logline} »</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>{ex.bible.pitch}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
            {ex.bible.personnages.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, borderLeft: `3px solid ${i === 0 ? RED : VIO}` }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{p.nom}</p>
                <p style={{ fontSize: 11, color: i === 0 ? RED : VIO, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{p.role} · {p.age} ans</p>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.55 }}>🔒 {p.secret}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "16px 20px", border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: isPremium ? VIO : RED, textTransform: "uppercase", marginBottom: 8 }}>Question centrale</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontStyle: "italic", color: TEXT, lineHeight: 1.6 }}>« {ex.bible.tension_centrale} »</p>
          </div>
        </div>

        {/* SCRIPT */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <span style={{ background: RED, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>ÉP. {ex.script.numero}</span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: TEXT }}>{ex.script.titre}</span>
          </div>

          {/* Hook */}
          <div style={{ background: "rgba(232,92,58,0.08)", border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>⚡ Hook — 3 premières secondes</p>
            <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, marginBottom: 8, color: TEXT }}>{ex.script.hook_scene.texte}</p>
            <p style={{ fontSize: 11, color: RED, fontStyle: "italic" }}>[9:16] {ex.script.hook_scene.visuel_916}</p>
          </div>

          {/* Scènes */}
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

          {/* Cliffhanger */}
          <div style={{ background: "rgba(232,92,58,0.06)", borderRadius: 12, padding: 20, marginTop: 8, border: `1px solid rgba(232,92,58,0.2)` }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>🎬 Cliffhanger</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 8, lineHeight: 1.45 }}>{ex.script.cliffhanger_scene.texte}</p>
            <p style={{ fontSize: 11, color: RED, fontStyle: "italic", marginBottom: ex.script.cliffhanger_scene.label ? 14 : 0 }}>[9:16] {ex.script.cliffhanger_scene.visuel_916}</p>
            {ex.script.cliffhanger_scene.label && (
              <span style={{ display: "inline-block", background: RED, borderRadius: 6, padding: "6px 14px", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: 1.5, textTransform: "uppercase" }}>{ex.script.cliffhanger_scene.label}</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <p style={{ color: MUTED, fontSize: 14, marginBottom: 24 }}>Génère ta propre série en moins de 30 secondes.</p>
          <a href="/#tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "16px 40px", borderRadius: 14, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: -0.2 }}>Commencer →</a>
        </div>
      </div>
    </div>
  );
}
