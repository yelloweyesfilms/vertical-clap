import { useState } from "react";

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

const TAG_STYLE = {
  fast: { bg: "#FFF0EC", color: "#E85C3A", border: "1px solid #FBD5C8" },
  premium: { bg: "#E8EDF2", color: "#2a3a2e", border: "1px solid #c8d5c8" },
};

export default function Exemples() {
  const [active, setActive] = useState(0);
  const ex = EXEMPLES[active];
  const tag = TAG_STYLE[ex.mode];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#1A1A18", fontFamily: "var(--sans)" }}>
      {/* NAV */}
      <div style={{ borderBottom: "1px solid #E8E4DC" }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <a href="/" style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 900, textDecoration: "none", color: "#1A1A18" }}>
            ← VERTICALCLAP
          </a>
          <a href="/app" style={{ fontSize: 14, color: "#6B6B68", textDecoration: "none" }}>Se connecter</a>
        </nav>
      </div>

      {/* HEADER */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 12 }}>Exemples générés</p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, marginBottom: 16 }}>
          3 séries prêtes à tourner
        </h1>
        <p style={{ color: "#6B6B68", fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 40px" }}>
          Médical, finance, famille — chaque série est générée en moins de 30 secondes avec Vertical Studio.
        </p>

        {/* TABS */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {EXEMPLES.map((e, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ padding: "10px 20px", borderRadius: 100, border: `1.5px solid ${active === i ? "#E85C3A" : "#E8E4DC"}`, background: active === i ? "#E85C3A" : "#fff", color: active === i ? "#fff" : "#1A1A18", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", transition: "all .15s" }}>
              {e.bible.titre}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* MODE + META */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, alignItems: "center" }}>
          <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: 100, background: tag.bg, color: tag.color, border: tag.border, fontSize: 12, fontWeight: 700 }}>{ex.modeLabel}</span>
          <span style={{ fontSize: 13, color: "#6B6B68" }}>{ex.casting}</span>
          <span style={{ fontSize: 13, color: "#aaa" }}>·</span>
          <span style={{ fontSize: 13, color: "#6B6B68" }}>{ex.univers}</span>
          <span style={{ fontSize: 13, color: "#aaa" }}>·</span>
          <span style={{ fontSize: 13, color: "#6B6B68" }}>{ex.bible.episodes} épisodes</span>
        </div>

        {/* BIBLE */}
        <div style={{ background: "#1A1A18", borderRadius: 20, padding: "32px", marginBottom: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>La Bible</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: -0.5 }}>{ex.bible.titre}</h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 15, fontStyle: "italic", color: "#aaa", lineHeight: 1.5, marginBottom: 16 }}>« {ex.bible.logline} »</p>
          <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7, marginBottom: 24 }}>{ex.bible.pitch}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
            {ex.bible.personnages.map((p, i) => (
              <div key={i} style={{ background: "#2a2a28", borderRadius: 12, padding: 16, borderLeft: `3px solid ${i === 0 ? "#E85C3A" : "#4a6a4e"}` }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.nom}</p>
                <p style={{ fontSize: 11, color: "#E85C3A", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{p.role} · {p.age} ans</p>
                <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>🔒 {p.secret}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#111", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 6 }}>Question centrale</p>
            <p style={{ fontFamily: "var(--serif)", fontSize: 14, fontStyle: "italic", color: "#fff", lineHeight: 1.5 }}>« {ex.bible.tension_centrale} »</p>
          </div>
        </div>

        {/* SCRIPT */}
        <div style={{ background: "#F7F5F2", borderRadius: 20, padding: "28px 28px" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ background: "#E85C3A", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>ÉP. {ex.script.numero}</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700 }}>{ex.script.titre}</span>
          </div>

          {/* Hook */}
          <div style={{ background: "#FFF0EC", border: "2px solid #E85C3A", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 8 }}>⚡ Hook — 3 premières secondes</p>
            <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 6 }}>{ex.script.hook_scene.texte}</p>
            <p style={{ fontSize: 11, color: "#E85C3A", fontStyle: "italic" }}>[9:16] {ex.script.hook_scene.visuel_916}</p>
          </div>

          {/* Scènes */}
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 10 }}>Script</p>
          {ex.script.scenes.map((sc, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 14, borderLeft: "3px solid #E8E4DC", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#2a3a2e" }}>{sc.perso}</p>
                {sc.jeu && <span style={{ fontSize: 10, background: "#F0F4F0", color: "#2a3a2e", padding: "2px 8px", borderRadius: 20, fontStyle: "italic" }}>{sc.jeu}</span>}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 6, fontWeight: 500 }}>{sc.dialogue}</p>
              <p style={{ fontSize: 11, color: "#aaa", fontStyle: "italic" }}>[9:16] {sc.visuel_916}</p>
            </div>
          ))}

          {/* Cliffhanger */}
          <div style={{ background: "#1A1A18", borderRadius: 12, padding: 16, marginTop: 6 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 8 }}>🎬 Cliffhanger</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6, lineHeight: 1.4 }}>{ex.script.cliffhanger_scene.texte}</p>
            <p style={{ fontSize: 11, color: "#E85C3A", fontStyle: "italic", marginBottom: ex.script.cliffhanger_scene.label ? 10 : 0 }}>[9:16] {ex.script.cliffhanger_scene.visuel_916}</p>
            {ex.script.cliffhanger_scene.label && (
              <span style={{ display: "inline-block", background: "#E85C3A", borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>{ex.script.cliffhanger_scene.label}</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "#6B6B68", fontSize: 14, marginBottom: 20 }}>Génère ta propre série en moins de 30 secondes.</p>
          <a href="/#tarifs" style={{ display: "inline-block", background: "#E85C3A", color: "#fff", padding: "16px 36px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Commencer →</a>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  );
}
