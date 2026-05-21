export const SERIES = [
  {
    slug: "le-mensonge",
    mode: "fast",
    platform: "TikTok",
    genre: "Médical",
    mixeurParams: { mode: "fast", casting: "1 Femme + 1 Homme", univers: "Hôpital privé", secret: "Double vie", lieu: "Couloir vide" },
    bible: {
      titre: "Le Mensonge",
      logline: "Une infirmière cache une erreur médicale jusqu'au jour où la victime revient comme interne.",
      pitch: "À l'hôpital Saint-Luc, personne ne sait que la meilleure infirmière a commis l'irréparable. Quand le patient qu'elle a blessé revient en blouse blanche, chaque couloir devient un piège. Jusqu'où ira-t-elle pour protéger sa vie ?",
      tension_centrale: "Va-t-elle avouer avant qu'il ne découvre tout seul ?",
      accroche: "Elle l'a presque tué. Il ne sait pas encore.",
      personnages: [
        { nom: "Clara", age: 34, role: "Infirmière cheffe", secret: "A falsifié un dossier médical après une erreur de dosage" },
        { nom: "Julien", age: 28, role: "Interne en médecine", secret: "Est le patient qu'elle a blessé 3 ans plus tôt" },
      ],
    },
    episodes: [
      { numero: 1, titre: "Première garde", cliffhanger: "Julien ouvre le dossier 2021...", tension: 3 },
      { numero: 2, titre: "Il sait", cliffhanger: "Clara trouve son téléphone déverrouillé sur son propre dossier.", tension: 6 },
      { numero: 3, titre: "Le chef de service", cliffhanger: "Le directeur convoque Clara. Et Julien est déjà dans son bureau.", tension: 8 },
      { numero: 4, titre: "Trop tard", cliffhanger: "Clara signe sa démission — mais Julien déchire la feuille.", tension: 10 },
    ],
    script: {
      hook_scene: {
        texte: "Clara tient le dossier. Ses mains tremblent. Le nom sur la couverture : JULIEN MOREAU.",
        visuel_916: "Gros plan mains crispées sur dossier, bague qui claque contre le carton",
      },
      scenes: [
        { perso: "JULIEN", dialogue: "Infirmière Bertin. On se connaît ?", jeu: "sourire innocent, regard qui cherche", visuel_916: "Plan américain, couloir désert derrière lui" },
        { perso: "CLARA", dialogue: "Non. Bienvenue dans le service.", jeu: "voix trop calme, yeux qui fuient", visuel_916: "Contre-champ serré, elle tourne le dos" },
        { perso: "JULIEN", dialogue: "Bizarre. J'ai l'impression qu'on s'est déjà vus.", jeu: "penche la tête, observe", visuel_916: "Zoom lent sur son visage" },
        { perso: "CLARA", dialogue: "On voit beaucoup de monde ici.", jeu: "force un sourire, repart vite", visuel_916: "Plan large, elle s'éloigne dans le couloir" },
      ],
      cliffhanger_scene: {
        texte: "Clara referme la porte de la réserve. Julien est de l'autre côté — il tient un dossier de 2021.",
        visuel_916: "Cut brutal profil Clara, porte qui se ferme, silence",
        label: "Il sait ?",
      },
    },
  },
];
