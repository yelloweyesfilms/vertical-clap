import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { POSTS } from "../lib/posts";
import { POSTS_EN } from "../lib/posts-en";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#94a3b8";

const COPY = {
  fr: {
    studioBadge: "Studio IA · Micro-drama · Vertical Drama",
    heroLine1: "Ta série,",
    heroLine2: "virale,",
    heroLine3: "maintenant.",
    heroTitle: "La plateforme d'écriture",
    heroTitleItalic: "pensée pour les micro-dramas.",
    heroHeadline1: "Crée des séries virales",
    heroHeadline2: "en 5 minutes.",
    heroSubtitleBold: "Bible, scripts, hooks — générés en 30 sec. Toi, tu tournes.",
    heroFeatures: ["Bible en 30 sec", "Cliffhanger calibré", "Format 9:16 natif", "Script prêt à tourner"],
    heroStatViews: "10M+",
    heroStatViewsLabel: "vues générées",
    heroStatCreators: "500+",
    heroStatCreatorsLabel: "créateurs actifs",
    heroStatGoal: "1 objectif",
    heroStatGoalLabel: "te faire percer",
    heroCtaBig: "Créer ma série maintenant →",
    scaleLabel: "Créez à toutes les échelles",
    scaleTitle: "Du micro-drama au projet ambitieux.",
    scaleSub: "Vertical Clap accompagne chaque étape — de la première idée au showrunner confirmé.",
    scaleSteps: [
      { emoji: "⚡", label: "Micro-drama", sub: "TikTok · Reels · 60s", color: RED },
      { emoji: "📱", label: "Série verticale", sub: "10–20 épisodes · Mobile", color: "#f97316" },
      { emoji: "🎬", label: "Web série", sub: "Storytelling social · Binge", color: "#eab308" },
      { emoji: "🎭", label: "Série premium", sub: "Plateformes premium · 90 éps", color: "#22c55e" },
      { emoji: "🎞️", label: "Film narratif", sub: "Structure · Arcs · Traitement", color: "#3b82f6" },
      { emoji: "🌌", label: "Univers narratif", sub: "Bible · Spin-offs · Franchise", color: VIO },
    ],
    howLabel: "Studio narratif modulaire",
    howTitle: "Tu valides. L'IA développe.",
    howSub: "5 niveaux pour construire n'importe quelle histoire — de l'idée au projet ambitieux.",
    howSteps: [
      { n: "01", emoji: "💡", title: "Idée & Hook", you: "Tu choisis un genre, un univers, une tension.", ai: ["Concepts & pitchs", "Hooks percutants", "Tropes narratifs", "Prémisse addictive"], color: RED },
      { n: "02", emoji: "📖", title: "Bible & Personnages", you: "Tu valides les personnages et les arcs.", ai: ["Synopsis court et long", "Personnages & motivations", "Arcs émotionnels", "Structure globale"], color: "#f97316" },
      { n: "03", emoji: "🎬", title: "Épisodes & Structure", you: "Tu ajustes le rythme et les tensions.", ai: ["Découpage épisodique", "Cliffhangers calibrés", "Twists & révélations", "Progression des arcs"], color: "#eab308" },
      { n: "04", emoji: "✍️", title: "Scènes & Dialogues", you: "Tu modifies chaque scène, chaque réplique.", ai: ["Scènes individuelles", "Dialogues & sous-texte", "Moments émotionnels", "Indications de jeu"], color: "#22c55e" },
      { n: "05", emoji: "🎞️", title: "Script & Tournage", you: "Tu contrôles, tu valides, tu tournes.", ai: ["Script formaté prêt à tourner", "Mode Tournage + Téléprompteur", "Export PDF", "3 variations de ton"], color: VIO },
    ],
    howTagline: "Pas un bouton magique. Un studio narratif à ta mesure.",
    howAiLabel: "L'IA génère",
    heroSubtitle: "Des hooks. Des twists. Des cliffhangers.",
    heroSubtitleOld: "Bible, scripts, hooks et cliffhangers générés en 5 minutes — prêts pour TikTok, Reels et Shorts.",
    canceledMsg: "Paiement annulé. Réessaie quand tu veux.",
    ctaBtnCreate: "Générer ma série →",
    ctaBtnDemo: "Voir des exemples réels",
    ctaBtn: "Commencer →",
    redirecting: "Redirection…",
    pricingSubline: "9€/mois · Annulable à tout moment · Aucun engagement",
    trustSecurePayment: "Paiement sécurisé Stripe",
    trustNoCreditCard: "Sans carte bancaire requise",
    trustImmediateAccess: "Accès immédiat",
    cliffhangersLabel: "Le scroll s'arrête. Le commentaire part.",
    cliffhangersCaption: "Le scroll s'arrête. Le commentaire part. L'épisode suivant s'ouvre. Pas par accident — chaque fin est architecturée pour ça.",
    cliffExamples: [
      { genre: "Romance", emoji: "❤️", color: "#e879a0", hook: "« Je t'ai menti depuis le début. »", scene: "Sofia pose la photo sur la table. Marc ne bouge pas. Il savait.", cliff: "Elle ouvre l'enveloppe. Son nom est dessus. Mais ce n'est pas son écriture.", next: "Ép. 2 · La Vérité" },
      { genre: "Thriller", emoji: "🔪", color: "#E85C3A", hook: "« Il est mort à cause de toi. »", scene: "Les lumières s'éteignent. Karim est seul dans le bureau. La porte se verrouille.", cliff: "Le téléphone vibre. Numéro inconnu. \"On sait que tu as tout vu.\"", next: "Ép. 3 · Le Retournement" },
      { genre: "K-Drama", emoji: "💗", color: "#a78bfa", hook: "« Je ne t'aime pas. Menteur. »", scene: "Jiwoo croise son regard dans le couloir. Il détourne les yeux. Elle sourit.", cliff: "Sa mère lui tend une photo. \"C'est lui ton fiancé.\" C'est le même homme.", next: "Ép. 4 · L'Impossible" },
      { genre: "Dark Drama", emoji: "🌑", color: "#64748b", hook: "« La famille ne pardonne jamais. »", scene: "Le testament est sur la table. Trois héritiers. Un seul survivant possible.", cliff: "La notaire lève les yeux. \"Il vous reste 48 heures pour disparaître.\"", next: "Ép. 5 · La Chute" },
    ],
    addictionLabel: "L'architecture de l'addiction",
    addictionTitle1: "Tu publies un épisode.",
    addictionTitle2: "Ils en veulent dix.",
    addictionBody: "Chaque script se termine par un cliffhanger calculé pour déclencher une réaction physique. Le scroll s'arrête. Le commentaire arrive. L'épisode suivant se lance tout seul.",
    statWatchTime: "Watch time moyen",
    statComments: "Commentaires / épisode",
    statReturn: "Retour épisode suivant",
    platformsTitle: "Ton format tourne partout.",
    platformsSubtitle: "9:16 nativement optimisé pour chaque plateforme où ton audience regarde",
    socialNetworks: "Réseaux sociaux",
    microDramaPlat: "Plateformes micro-drama",
    bibleLabel: "Bible complète",
    bibleTitle1: "Titre, personnages, séquencier.",
    bibleTitle2: "Tout généré en une fois.",
    readyToShoot: "Prêt à tourner",
    scriptTitle1: "Un script complet",
    scriptTitle2: "en 10 secondes.",
    scriptBody: "Hook percutant, dialogues, indications de jeu, cadrage 9:16 — tout est là. Ouvre le Mode Tournage et tourne directement depuis l'écran.",
    viralLabel: "Conçu pour percer",
    viralTitle1: "1 épisode = 1 cliffhanger.",
    viralTitle2: "L'audience revient toujours.",
    mixerLabel: "Le Mixeur",
    mixerTitle1: "12 univers, 16 secrets, 4 castings.",
    mixerTitle2: "Ou entre le tien.",
    forYouLabel: "Fait pour toi",
    forYouTitle1: "Du créateur TikTok",
    forYouTitle2: "au showrunner.",
    forYouProfiles: [
      { emoji: "📱", title: "Le créateur solo", sub: "Tu postes sur TikTok, Reels ou Shorts. Tu veux des hooks qui accrochent et du contenu prêt à tourner — sans passer 3 heures à écrire. Plan Créateur à 9€.", color: "#E85C3A" },
      { emoji: "🎬", title: "L'auteur ambitieux", sub: "Tu veux des personnages complexes, des arcs narratifs sur plusieurs épisodes, une Direction Artistique réelle. Plan Pro à 19€.", color: "#f97316" },
      { emoji: "🎭", title: "Le showrunner", sub: "Tu livres sur des plateformes premium. 90 épisodes, 3 variations par script, fiche technique de production — tout y est en Pro.", color: "#a855f7" },
    ],
    pipelineLabel: "De l'idée au tournage",
    pipelineTitle1: "5 minutes. Série complète.",
    pipelineTitle2: "Du concept au script prêt à tourner.",
    variationsLabel: "3 variations par script",
    variationsTitle1: "Intense, Subtil ou Rapide.",
    variationsTitle2: "Le bon ton, du premier coup.",
    pricingLabel: "Tarifs",
    pricingTitle: "Simple. Transparent.",
    billingMonthly: "Mensuel",
    billingAnnual: "Annuel",
    annualSavings: "🎉 2 mois offerts — économise 38€/an",
    billedStandardAnnual: "facturé 90€/an",
    billedPremiumAnnual: "facturé 179€/an",
    perMonth: "/mois",
    planStandard: "Créateur",
    planStandardSub: "Micro-dramas viraux pour TikTok, Reels et Shorts",
    planPremium: "Pro",
    planPremiumSub: "Séries longues, direction artistique et univers narratifs",
    standardFeatures: [
      "⚡ Vertical Drama · micro-drama",
      "20 épisodes par série",
      "Scripts 9:16 prêts à tourner",
      "Hook 3 sec + Cliffhanger calibré",
      "Mode Tournage + Téléprompteur",
      "🌍 Traduction en 8 langues",
      "☁️ Cloud · Export PDF",
    ],
    premiumFeatures: [
      "⚡ Vertical + 🎭 Série Premium",
      "Jusqu'à 90 épisodes par série",
      "Direction Artistique avancée",
      "🎲 3 variations de ton par script",
      "🎬 Fiche technique de production",
      "Mode Tournage + Téléprompteur",
      "🌍 Traduction en 8 langues",
      "☁️ Cloud · Export PDF",
    ],
    recommendedBadge: "RECOMMANDÉ",
    ctaBtnPremium: "Commencer Pro →",
    trustItems: [
      { icon: "·", label: "Stripe · Paiement sécurisé" },
      { icon: "·", label: "Annulable en 1 clic" },
      { icon: "·", label: "Accès immédiat après paiement" },
      { icon: "🛡️", label: "Données chiffrées" },
    ],
    tryFreeText1: "Vois le résultat avant de t'abonner → ",
    tryFreeLink: "Exemples réels",
    tryFreeText2: "",
    faqLabel: "FAQ",
    faqTitle: "Ce qu'on nous demande souvent.",
    faqItems: [
      { q: "C'est quoi un micro-drama vertical ?", r: "Un format vidéo court (1 à 2 min), filmé en 9:16 pour mobile, avec une structure dramatique forte : hook percutant, tension montante et cliffhanger final. Le format qui explose sur TikTok, Instagram Reels, YouTube Shorts — et sur les plateformes spécialisées de micro-dramas comme DramaBox et ReelShort." },
      { q: "Combien de temps pour générer une série complète ?", r: "Moins de 5 minutes. La bible (titre, logline, personnages, tension centrale) se génère en quelques secondes. Les épisodes arrivent en parallèle. Le script formaté d'un épisode prend 10 secondes." },
      { q: "Quelle différence entre Creator et Pro ?", r: "Creator (9€) : émotions frontales, hooks agressifs, rythme maximal — idéal pour TikTok, Reels et Shorts. Pro (19€) : tension psychologique, sous-texte, silences lourds, Direction Artistique avancée, 90 épisodes — pour des séries ambitieuses et une audience plus mature." },
      { q: "Les scripts sont-ils vraiment prêts à tourner ?", r: "Oui. Chaque scène inclut le dialogue, l'indication de jeu d'acteur et la directive de cadrage 9:16. Le Mode Tournage intègre un téléprompteur auto-scroll. Tu tournes directement depuis l'écran." },
      { q: "Mes séries sont-elles sauvegardées ?", r: "Elles sont sauvegardées localement et synchronisées dans le cloud automatiquement. Tu y accèdes depuis n'importe quel appareil via l'onglet ☁️ Cloud." },
      { q: "Puis-je annuler mon abonnement ?", r: "Oui, à tout moment en un clic depuis ton espace Stripe. Aucun engagement, aucune pénalité. Tu gardes l'accès jusqu'à la fin de la période payée." },
    ],
    nlLabel: "Pas prêt à sauter ?",
    nlTitle1: "Reste dans la boucle.",
    nlTitle2: "On t'envoie du concret.",
    nlBody: "Hooks, trends, plateformes — les outils concrets pour percer avec tes séries. Zéro bla-bla.",
    nlDone: "Tu es dans la boucle — à bientôt !",
    nlSubscribe: "M'inscrire",
    nlError: "Une erreur est survenue, réessaie.",
    nlNoSpam: "Aucun spam. Désabonnement en 1 clic.",
    nlEmailPlaceholder: "ton@email.com",
    resourcesLabel: "Ressources",
    resourcesTitle: "Guides pour créateurs",
    resourcesTitleItalic: "qui veulent percer.",
    resourcesBody: "Écriture, hooks, plateformes, monétisation — les méthodes qui marchent.",
    readTime: "de lecture",
    viewAllGuides: "Voir tous les guides →",
    footerBlogLinks: [
      { href: "/blog", label: "Ressources" },
      { href: "/blog/qu-est-ce-qu-un-micro-drama", label: "Guide micro-drama" },
      { href: "/blog/comment-ecrire-un-hook-tiktok", label: "Écrire un hook" },
      { href: "/blog/monetiser-micro-drama-dramabox-reelshort", label: "Monétiser sa série" },
    ],
    ctaFinalTitle1: "Ta première série,",
    ctaFinalConnector: "dans",
    ctaFinalTitle2: "5 minutes",
    ctaFinalSubtitle: "Pendant que tu lis ça, d'autres créateurs viennent de générer la leur.",
    ctaFinalTrustItems: [
      { icon: "·", label: "Paiement sécurisé Stripe" },
      { icon: "·", label: "Sans engagement" },
      { icon: "·", label: "Accès immédiat" },
    ],
    footerTagline: "Le studio IA pour créateurs de micro-dramas verticaux. De l'idée à la série complète en 5 minutes.",
    footerProduit: "Produit",
    footerRessources: "Ressources",
    footerLegal: "Légal",
    footerTarifs: "Tarifs",
    footerExemples: "Exemples",
    footerCGU: "CGU",
    footerConfidentialite: "Confidentialité",
    footerContact: "Contact",
    footerCopyright: "© 2026 VerticalClap — Tous droits réservés",
    navPricing: "Tarifs",
    navSignin: "Se connecter →",
    emailError: "Entre ton email pour continuer",
    networkError: "Erreur réseau. Réessaie.",
    readMore: "Lire →",
    featLabels: [
      { emoji: "⚡", label: "Série en 5 min", sub: "Bible + scripts générés ensemble" },
      { emoji: "📱", label: "Format 9:16 natif", sub: "Hook inclus, prêt à tourner" },
      { emoji: "🎬", label: "6 formats narratifs", sub: "Vertical, Série, K-Drama, Thriller…" },
      { emoji: "🌍", label: "8 langues", sub: "Traduit instantanément" },
      { emoji: "🎭", label: "Direction Artistique", sub: "Émotion, rythme, narration, ton" },
      { emoji: "☁️", label: "Cloud & Export PDF", sub: "Multi-appareils, sauvegarde auto" },
    ],
    marqueeItems: ["Le Mensonge", "Héritage", "Deux Vies", "La Trahison", "Le Dernier Appel", "Secrets de Famille", "Le Pacte", "Double Jeu", "La Chute", "Huis Clos", "Rupture", "Le Témoin", "Zone Rouge", "L'Imposteur", "Sous Pression"],
    phoneSeriesTitle: "Héritage Maudit",
    phoneEpisode: "Épisode 8 · Saison 1",
    phoneQuote: "\"Tu m'as menti\ndepuis le début.\"",
    phoneProgress: "ÉP. 8 / 10",
    phoneShare: "Partager",
    phoneNext: "Ép. 9 →",
    phoneComments: [
      { user: "sofia_makes", comment: "omg j'ai pas vu venir ça 😱", likes: "847", color: VIO },
      { user: "théo.tourne", comment: "Élodie savait depuis l'épisode 3 !! 🤯", likes: "1.2k", color: RED },
      { user: "laure_content", comment: "le cliffhanger… j'ai lâché mon téléphone", likes: "562", color: "#60a5fa" },
      { user: "marc_prod", comment: "épisode 9 MAINTENANT je peux pas attendre", likes: "2.9k", color: VIO },
      { user: "créa.studio", comment: "comment ils écrivent aussi bien ?? 🔥", likes: "445", color: RED },
      { user: "youssef.films", comment: "j'ai montré à ma mère elle est accro aussi 😂", likes: "738", color: "#4ade80" },
      { user: "nadia.réalise", comment: "le regard à 2:34… oscar mérité", likes: "1.8k", color: VIO },
      { user: "tom_kl", comment: "cette série c'est du crack narratif", likes: "3.2k", color: RED },
      { user: "ines.crea", comment: "j'ai regardé les 8 épisodes en 1h", likes: "992", color: "#60a5fa" },
      { user: "alexis.vertical", comment: "quand saison 2 ?? 🙏🙏", likes: "4.1k", color: VIO },
      { user: "sofia_makes", comment: "omg j'ai pas vu venir ça 😱", likes: "847", color: VIO },
      { user: "théo.tourne", comment: "Élodie savait depuis l'épisode 3 !! 🤯", likes: "1.2k", color: RED },
      { user: "laure_content", comment: "le cliffhanger… j'ai lâché mon téléphone", likes: "562", color: "#60a5fa" },
      { user: "marc_prod", comment: "épisode 9 MAINTENANT je peux pas attendre", likes: "2.9k", color: VIO },
      { user: "créa.studio", comment: "comment ils écrivent aussi bien ?? 🔥", likes: "445", color: RED },
    ],
    imgHero: "/banniere%20hero.png",
    imgCliffhangers: "/cliffhangers%20.png",
    imgBible: "/bible%20complete%20.png",
    imgScript: "/script%20%C3%A0%20l'%C3%A9cran.png",
    imgViral: "/serie%20virale.png",
    imgMixeur: "/le%20mixeur.png",
    imgCreateurs: "/les%20createurs.png",
    imgPipeline: "/pipeline.png",
    imgVariations: "/les%203%20variations.png",
  },
  en: {
    studioBadge: "AI Studio · Micro-drama · Vertical Drama",
    heroLine1: "Your series,",
    heroLine2: "viral,",
    heroLine3: "now.",
    heroTitle: "The writing platform",
    heroTitleItalic: "built for micro-dramas.",
    heroSubtitle: "Hooks. Twists. Cliffhangers.",
    heroHeadline1: "Create viral series",
    heroHeadline2: "in 5 minutes.",
    heroSubtitleBold: "Bible, scripts, hooks — generated in 30 sec. You shoot.",
    heroFeatures: ["Bible in 30 sec", "Calibrated cliffhanger", "Native 9:16 format", "Shoot-ready script"],
    heroStatViews: "10M+",
    heroStatViewsLabel: "views generated",
    heroStatCreators: "500+",
    heroStatCreatorsLabel: "active creators",
    heroStatGoal: "1 goal",
    heroStatGoalLabel: "make you viral",
    heroCtaBig: "Generate my series now →",
    scaleLabel: "Create at every scale",
    scaleTitle: "From micro-drama to ambitious projects.",
    scaleSub: "Vertical Clap accompanies every step — from first idea to confirmed showrunner.",
    scaleSteps: [
      { emoji: "⚡", label: "Micro-drama", sub: "TikTok · Reels · 60s", color: RED },
      { emoji: "📱", label: "Vertical series", sub: "10–20 episodes · Mobile", color: "#f97316" },
      { emoji: "🎬", label: "Web series", sub: "Social storytelling · Binge", color: "#eab308" },
      { emoji: "🎭", label: "Premium series", sub: "Premium platforms · 90 eps", color: "#22c55e" },
      { emoji: "🎞️", label: "Narrative film", sub: "Structure · Arcs · Treatment", color: "#3b82f6" },
      { emoji: "🌌", label: "Narrative universe", sub: "Bible · Spin-offs · Franchise", color: VIO },
    ],
    howLabel: "Modular narrative studio",
    howTitle: "You validate. The AI develops.",
    howSub: "5 levels to build any story — from first idea to ambitious project.",
    howSteps: [
      { n: "01", emoji: "💡", title: "Idea & Hook", you: "You choose a genre, a universe, a tension.", ai: ["Concepts & pitches", "Punchy hooks", "Narrative tropes", "Addictive premise"], color: RED },
      { n: "02", emoji: "📖", title: "Bible & Characters", you: "You validate the characters and arcs.", ai: ["Short & long synopsis", "Characters & motivations", "Emotional arcs", "Global structure"], color: "#f97316" },
      { n: "03", emoji: "🎬", title: "Episodes & Structure", you: "You adjust the pacing and tensions.", ai: ["Episode breakdown", "Calibrated cliffhangers", "Twists & reveals", "Arc progression"], color: "#eab308" },
      { n: "04", emoji: "✍️", title: "Scenes & Dialogue", you: "You edit each scene, each line.", ai: ["Individual scenes", "Dialogue & subtext", "Emotional moments", "Acting notes"], color: "#22c55e" },
      { n: "05", emoji: "🎞️", title: "Script & Shoot", you: "You control, validate, and shoot.", ai: ["Shoot-ready formatted script", "Shoot Mode + Teleprompter", "PDF Export", "3 tone variations"], color: VIO },
    ],
    howTagline: "Not a magic button. A narrative studio built around you.",
    howAiLabel: "AI generates",
    heroSubtitleOld: "Bible, scripts, hooks and cliffhangers generated in 5 minutes — ready for TikTok, Reels and Shorts.",
    canceledMsg: "Payment canceled. Try again whenever you're ready.",
    ctaBtnCreate: "Generate my series →",
    ctaBtnDemo: "See real examples",
    ctaBtn: "Get started →",
    redirecting: "Redirecting…",
    pricingSubline: "€9/month · Cancel anytime · No commitment",
    trustSecurePayment: "Secure Stripe payment",
    trustNoCreditCard: "No credit card required",
    trustImmediateAccess: "Immediate access",
    cliffhangersLabel: "The scroll stops. The comment fires.",
    cliffhangersCaption: "The scroll stops. The comment fires. The next episode opens. Not by luck — every ending is architected for that.",
    cliffExamples: [
      { genre: "Romance", emoji: "❤️", color: "#e879a0", hook: "\"I've been lying to you from the start.\"", scene: "Sofia puts the photo on the table. Marc doesn't move. He already knew.", cliff: "She opens the envelope. Her name is on it. But it's not her handwriting.", next: "Ep. 2 · The Truth" },
      { genre: "Thriller", emoji: "🔪", color: "#E85C3A", hook: "\"He died because of you.\"", scene: "The lights go out. Karim is alone in the office. The door locks.", cliff: "The phone vibrates. Unknown number. \"We know you saw everything.\"", next: "Ep. 3 · The Twist" },
      { genre: "K-Drama", emoji: "💗", color: "#a78bfa", hook: "\"I don't love you. Liar.\"", scene: "Jiwoo meets his gaze in the hallway. He looks away. She smiles.", cliff: "Her mother hands her a photo. \"This is your fiancé.\" It's the same man.", next: "Ep. 4 · The Impossible" },
      { genre: "Dark Drama", emoji: "🌑", color: "#64748b", hook: "\"Family never forgives.\"", scene: "The will is on the table. Three heirs. Only one possible survivor.", cliff: "The notary looks up. \"You have 48 hours to disappear.\"", next: "Ep. 5 · The Fall" },
    ],
    addictionLabel: "The architecture of addiction",
    addictionTitle1: "You publish one episode.",
    addictionTitle2: "They want ten more.",
    addictionBody: "Every script ends with a cliffhanger calculated to trigger a physical reaction. The scroll stops. The comment fires. The next episode plays itself.",
    statWatchTime: "Average watch time",
    statComments: "Comments / episode",
    statReturn: "Return next episode",
    platformsTitle: "Your format runs everywhere.",
    platformsSubtitle: "9:16 natively optimized for every platform where your audience watches",
    socialNetworks: "Social networks",
    microDramaPlat: "Micro-drama platforms",
    bibleLabel: "Complete bible",
    bibleTitle1: "Title, characters, sequence.",
    bibleTitle2: "All generated at once.",
    readyToShoot: "Ready to shoot",
    scriptTitle1: "A complete script",
    scriptTitle2: "in 10 seconds.",
    scriptBody: "Punchy hook, dialogue, acting notes, 9:16 framing — it's all there. Open Shoot Mode and film straight from the screen.",
    viralLabel: "Built to break through",
    viralTitle1: "1 episode = 1 cliffhanger.",
    viralTitle2: "The audience always comes back.",
    mixerLabel: "The Mixer",
    mixerTitle1: "12 universes, 16 secrets, 4 castings.",
    mixerTitle2: "Or enter your own.",
    forYouLabel: "Built for you",
    forYouTitle1: "From TikTok creator",
    forYouTitle2: "to showrunner.",
    forYouProfiles: [
      { emoji: "📱", title: "The solo creator", sub: "You post on TikTok, Reels or Shorts. You want hooks that grab and content ready to shoot — without spending 3 hours writing. Creator plan at €9.", color: "#E85C3A" },
      { emoji: "🎬", title: "The ambitious author", sub: "You want complex characters, multi-episode narrative arcs, real Artistic Direction. Pro plan at €19.", color: "#f97316" },
      { emoji: "🎭", title: "The showrunner", sub: "You deliver to premium platforms. 90 episodes, 3 variations per script, production sheet — all in Pro.", color: "#a855f7" },
    ],
    pipelineLabel: "From idea to shoot",
    pipelineTitle1: "5 minutes. Complete series.",
    pipelineTitle2: "From concept to shoot-ready script.",
    variationsLabel: "3 variations per script",
    variationsTitle1: "Intense, Subtle or Fast.",
    variationsTitle2: "The right tone, first time.",
    pricingLabel: "Pricing",
    pricingTitle: "Simple. Transparent.",
    billingMonthly: "Monthly",
    billingAnnual: "Annual",
    annualSavings: "🎉 2 months free — save €38/year",
    billedStandardAnnual: "billed €90/year",
    billedPremiumAnnual: "billed €179/year",
    perMonth: "/month",
    planStandard: "Creator",
    planStandardSub: "Viral micro-dramas for TikTok, Reels and Shorts",
    planPremium: "Pro",
    planPremiumSub: "Long series, artistic direction and narrative universes",
    standardFeatures: [
      "⚡ Vertical Drama · micro-drama",
      "20 episodes per series",
      "9:16 shoot-ready scripts",
      "3-sec hook + calibrated cliffhanger",
      "Shoot Mode + Teleprompter",
      "🌍 Translation in 8 languages",
      "☁️ Cloud · PDF Export",
    ],
    premiumFeatures: [
      "⚡ Vertical + 🎭 Premium Series",
      "Up to 90 episodes per series",
      "Advanced Artistic Direction",
      "🎲 3 tone variations per script",
      "🎬 Production sheet",
      "Shoot Mode + Teleprompter",
      "🌍 Translation in 8 languages",
      "☁️ Cloud · PDF Export",
    ],
    recommendedBadge: "RECOMMENDED",
    ctaBtnPremium: "Get started Pro →",
    trustItems: [
      { icon: "·", label: "Stripe · Secure payment" },
      { icon: "·", label: "Cancel in 1 click" },
      { icon: "·", label: "Immediate access after payment" },
      { icon: "🛡️", label: "Encrypted data" },
    ],
    tryFreeText1: "See the result before subscribing → ",
    tryFreeLink: "Real examples",
    tryFreeText2: "",
    faqLabel: "FAQ",
    faqTitle: "What people ask us most.",
    faqItems: [
      { q: "What is a vertical micro-drama?", r: "A short video format (1 to 2 min), filmed in 9:16 for mobile, with a strong dramatic structure: punchy hook, rising tension and final cliffhanger. The format exploding on TikTok, Instagram Reels, YouTube Shorts — and on specialized platforms like DramaBox and ReelShort." },
      { q: "How long does it take to generate a complete series?", r: "Less than 5 minutes. The bible (title, logline, characters, central tension) generates in seconds. Episodes arrive in parallel. A formatted episode script takes 10 seconds." },
      { q: "What's the difference between Creator and Pro?", r: "Creator (€9): frontal emotions, aggressive hooks, maximum pace — ideal for TikTok, Reels and Shorts. Pro (€19): psychological tension, subtext, heavy silences, advanced Artistic Direction, 90 episodes — for ambitious series and a more mature audience." },
      { q: "Are the scripts really ready to shoot?", r: "Yes. Each scene includes dialogue, acting direction and 9:16 framing directive. Shoot Mode includes an auto-scroll teleprompter. You shoot straight from the screen." },
      { q: "Are my series saved?", r: "They are saved locally and synced to the cloud automatically. Access them from any device via the ☁️ Cloud tab." },
      { q: "Can I cancel my subscription?", r: "Yes, at any time in one click from your Stripe account. No commitment, no penalty. You keep access until the end of the paid period." },
    ],
    nlLabel: "Not ready to jump?",
    nlTitle1: "Stay in the loop.",
    nlTitle2: "We'll send you the good stuff.",
    nlBody: "Hooks, trends, platforms — actionable tools to break through with your series. Zero fluff.",
    nlDone: "You're in the loop — see you soon!",
    nlSubscribe: "Subscribe",
    nlError: "An error occurred, please try again.",
    nlNoSpam: "No spam. Unsubscribe in 1 click.",
    nlEmailPlaceholder: "your@email.com",
    resourcesLabel: "Resources",
    resourcesTitle: "Guides for creators",
    resourcesTitleItalic: "who want to break through.",
    resourcesBody: "Writing, hooks, platforms, monetization — methods that actually work.",
    readTime: "read",
    viewAllGuides: "View all guides →",
    footerBlogLinks: [
      { href: "/en/blog", label: "Resources" },
      { href: "/en/blog/qu-est-ce-qu-un-micro-drama", label: "Micro-drama guide" },
      { href: "/en/blog/comment-ecrire-un-hook-tiktok", label: "Write a hook" },
      { href: "/en/blog/tiktok-vs-dramabox-vs-reelshort-ou-publier-micro-drama", label: "Monetize your series" },
    ],
    ctaFinalTitle1: "Your first series,",
    ctaFinalConnector: "in",
    ctaFinalTitle2: "5 minutes",
    ctaFinalSubtitle: "While you're reading this, other creators just generated theirs.",
    ctaFinalTrustItems: [
      { icon: "·", label: "Secure Stripe payment" },
      { icon: "·", label: "No commitment" },
      { icon: "·", label: "Immediate access" },
    ],
    footerTagline: "The AI studio for vertical micro-drama creators. From idea to complete series in 5 minutes.",
    footerProduit: "Product",
    footerRessources: "Resources",
    footerLegal: "Legal",
    footerTarifs: "Pricing",
    footerExemples: "Examples",
    footerCGU: "Terms",
    footerConfidentialite: "Privacy",
    footerContact: "Contact",
    footerCopyright: "© 2026 VerticalClap — All rights reserved",
    navPricing: "Pricing",
    navSignin: "Sign in →",
    emailError: "Enter your email to continue",
    networkError: "Network error. Please try again.",
    readMore: "Read →",
    featLabels: [
      { emoji: "⚡", label: "Series in 5 min", sub: "Bible + scripts generated together" },
      { emoji: "📱", label: "Native 9:16 format", sub: "Hook included, shoot-ready" },
      { emoji: "🎬", label: "6 narrative formats", sub: "Vertical, Series, K-Drama, Thriller…" },
      { emoji: "🌍", label: "8 languages", sub: "Translated instantly" },
      { emoji: "🎭", label: "Artistic Direction", sub: "Emotion, pace, narration, tone" },
      { emoji: "☁️", label: "Cloud & PDF Export", sub: "Multi-device, auto-save" },
    ],
    marqueeItems: ["The Lie", "Legacy", "Two Lives", "The Betrayal", "The Last Call", "Family Secrets", "The Pact", "Double Game", "The Fall", "Locked In", "Rupture", "The Witness", "Red Zone", "The Impostor", "Under Pressure"],
    phoneSeriesTitle: "Cursed Legacy",
    phoneEpisode: "Episode 8 · Season 1",
    phoneQuote: "\"You've been lying\nto me all along.\"",
    phoneProgress: "EP. 8 / 10",
    phoneShare: "Share",
    phoneNext: "Ep. 9 →",
    phoneComments: [
      { user: "sofia_makes", comment: "omg did NOT see that coming 😱", likes: "847", color: VIO },
      { user: "theo.films", comment: "Elodie knew since episode 3!! 🤯", likes: "1.2k", color: RED },
      { user: "laure_content", comment: "that cliffhanger… dropped my phone", likes: "562", color: "#60a5fa" },
      { user: "marc_prod", comment: "episode 9 NOW i can't wait", likes: "2.9k", color: VIO },
      { user: "crea.studio", comment: "how do they write this well?? 🔥", likes: "445", color: RED },
      { user: "youssef.films", comment: "showed my mom and she's hooked too 😂", likes: "738", color: "#4ade80" },
      { user: "nadia.directs", comment: "that look at 2:34… oscar worthy", likes: "1.8k", color: VIO },
      { user: "tom_kl", comment: "this series is narrative crack", likes: "3.2k", color: RED },
      { user: "ines.crea", comment: "watched all 8 episodes in 1 hour", likes: "992", color: "#60a5fa" },
      { user: "alexis.vertical", comment: "when is season 2?? 🙏🙏", likes: "4.1k", color: VIO },
      { user: "sofia_makes", comment: "omg did NOT see that coming 😱", likes: "847", color: VIO },
      { user: "theo.films", comment: "Elodie knew since episode 3!! 🤯", likes: "1.2k", color: RED },
      { user: "laure_content", comment: "that cliffhanger… dropped my phone", likes: "562", color: "#60a5fa" },
      { user: "marc_prod", comment: "episode 9 NOW i can't wait", likes: "2.9k", color: VIO },
      { user: "crea.studio", comment: "how do they write this well?? 🔥", likes: "445", color: RED },
    ],
    imgHero: "/banniere%20hero.png",
    imgCliffhangers: "/cliffhangers%20.png",
    imgBible: "/bible%20complete%20.png",
    imgScript: "/script%20%C3%A0%20l'%C3%A9cran.png",
    imgViral: "/serie%20virale.png",
    imgMixeur: "/le%20mixeur.png",
    imgCreateurs: "/les%20createurs.png",
    imgPipeline: "/pipeline.png",
    imgVariations: "/les%203%20variations.png",
  },
};

const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
  </svg>
);

const ReelsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

const ShortsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.86.55 9.38.55 9.38.55s7.52 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z" />
  </svg>
);

const BoltIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PhoneIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="20" rx="3" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
  </svg>
);

const ClapperIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.2 6L3 11l-.9-2.4c-.3-.8.1-1.7.9-2l1-.4" />
    <path d="M20.2 6l.9 2.4c.3.8-.1 1.7-.9 2L3 16" />
    <path d="M2 19.5h20a1 1 0 001-1v-9a1 1 0 00-1-1H2a1 1 0 00-1 1v9a1 1 0 001 1z" />
    <line x1="7" y1="8.5" x2="9.5" y2="14" />
    <line x1="13" y1="7" x2="15.5" y2="12.5" />
  </svg>
);

const ClockIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(32px)", down: "translateY(-24px)", left: "translateX(-32px)", right: "translateX(32px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : (transforms[direction] || "translateY(32px)"),
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ── Animated number counter ── */
function useCountUp(target, duration = 1400, startOnMount = false) {
  const [count, setCount] = useState(startOnMount ? 0 : target);
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return [count, start];
}

const Logo = ({ size = "md" }) => {
  const sm = size === "sm";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: sm ? 7 : 9, userSelect: "none" }}>
      <img src="/1024.png" alt="VC" style={{ width: sm ? 26 : 34, height: sm ? 26 : 34, borderRadius: sm ? 7 : 9, flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} />
      <div style={{ alignSelf: "center", lineHeight: 1 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 8 : 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 13 : 18, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CLAP</div>
      </div>
    </div>
  );
};

const GlowBtn = ({ children, onClick, disabled, gradient, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: gradient ? `linear-gradient(135deg, ${RED}, ${VIO})` : RED,
    color: "#fff", border: "none", padding: "16px 32px", borderRadius: 14,
    fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.7 : 1, fontFamily: "'Space Grotesk', sans-serif",
    boxShadow: gradient ? `0 0 32px rgba(168,85,247,0.35), 0 0 16px rgba(232,92,58,0.25)` : `0 0 24px rgba(232,92,58,0.4)`,
    transition: "all .2s", letterSpacing: -0.3, ...style,
  }}>{children}</button>
);

const Check = ({ color = RED }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill={color} opacity="0.2" />
    <path d="M5 9l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function NewsletterSection({ lang = "fr" }) {
  const [nlEmail, setNlEmail] = useState("");
  const [nlState, setNlState] = useState("idle");
  const c = COPY[lang];
  const track = (event, meta = {}) => fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, meta }) }).catch(() => {});

  const submit = async () => {
    if (!nlEmail || !nlEmail.includes("@")) return;
    setNlState("loading");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nlEmail, lang }) });
      const data = await res.json();
      if (data.ok) { track("newsletter_submit", { lang }); setNlState("done"); }
      else setNlState("error");
    } catch { setNlState("error"); }
  };

  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, padding: "72px 40px", textAlign: "center", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>{c.nlLabel}</p>
        <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: TEXT, letterSpacing: -1, lineHeight: 1.1, marginBottom: 12 }}>
          {c.nlTitle1}<br /><span style={{ fontStyle: "italic", color: MUTED }}>{c.nlTitle2}</span>
        </h2>
        <p style={{ color: MUTED, fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
          {c.nlBody}
        </p>
        {nlState === "done" ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 14, padding: "16px 28px" }}>
            <span style={{ color: "#4ade80", fontSize: 18 }}>✓</span>
            <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 15 }}>{c.nlDone}</span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input type="email" placeholder={c.nlEmailPlaceholder} value={nlEmail} onChange={e => setNlEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              style={{ padding: "14px 18px", borderRadius: 12, border: `1px solid ${nlState === "error" ? RED : BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, width: 240, outline: "none" }} />
            <button onClick={submit} disabled={nlState === "loading"}
              style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, padding: "14px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", transition: "all .2s" }}>
              {nlState === "loading" ? "…" : c.nlSubscribe}
            </button>
          </div>
        )}
        {nlState === "error" && <p style={{ color: RED, fontSize: 13, marginTop: 10 }}>{c.nlError}</p>}
        <p style={{ color: MUTED, fontSize: 12, marginTop: 14 }}>{c.nlNoSpam}</p>
      </div>
    </div>
  );
}

const Label = ({ children, color = VIO }) => (
  <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>{children}</p>
);

const Title = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(28px, 3.8vw, 50px)", fontWeight: 900, textAlign: "center", marginBottom: 12, letterSpacing: -1, lineHeight: 1.05, color: TEXT, textTransform: "uppercase", ...style }}>{children}</h2>
);

export default function RichLandingPage({ lang = "fr" }) {
  const c = COPY[lang];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [billing, setBilling] = useState("monthly");
  const [planTab, setPlanTab] = useState("creator");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const canceled = router.query.canceled;

  const track = (event, meta = {}) => fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, meta }) }).catch(() => {});

  useEffect(() => { track("page_view"); }, []);

  // Scroll depth tracking
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set();
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);
      milestones.forEach(m => {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { depth: m });
        }
      });
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startCheckout = async (plan = "standard", position = "unknown", opts = {}) => {
    if (!email || !email.includes("@")) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
      document.querySelector("input[type=email]")?.focus();
      return;
    }
    setEmailError(false);
    const { trial = false, billingOverride } = opts;
    const b = billingOverride || billing;
    track("checkout_started", { position, plan, billing: b, trial });
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, plan, billing: b, trial, lang }) });
      const { url, error } = await res.json();
      if (error) { alert(error); setLoading(false); return; }
      window.location.href = url;
    } catch {
      alert(c.networkError);
      setLoading(false);
    }
  };

  const FAQ_ITEMS = c.faqItems;

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "'Space Grotesk', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes glow { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollComments { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes heroBadge { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 32px rgba(168,85,247,0.35),0 0 16px rgba(232,92,58,0.25)} 50%{box-shadow:0 0 48px rgba(168,85,247,0.55),0 0 28px rgba(232,92,58,0.4)} }
        .hero-badge { animation: heroBadge 0.5s ease both; }
        .hero-h1 { animation: heroFadeUp 0.7s ease 0.15s both; }
        .hero-sub { animation: heroFadeUp 0.7s ease 0.3s both; }
        .hero-feats { animation: heroFadeUp 0.7s ease 0.42s both; }
        .hero-cta { animation: heroFadeUp 0.7s ease 0.55s both; }
        .hero-stats { animation: heroFadeUp 0.7s ease 0.7s both; }
        .cta-btn-glow { animation: glowPulse 2.8s ease-in-out infinite; }
        .card-hover { transition: transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.22s ease, border-color 0.22s ease !important; }
        .card-hover:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(0,0,0,0.45) !important; }
        .faq-item { transition: background 0.18s ease !important; }
        .faq-item:hover { background: rgba(255,255,255,0.05) !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-size: 16px !important; }
        input::placeholder { color: ${MUTED}; }
        a { text-decoration: none; }
        button:hover { opacity: .88 !important; }
        .glass { background: ${SURFACE}; border: 1px solid ${BORDER}; backdrop-filter: blur(12px); }
        body { overflow-x: hidden; }
        .hero-visual-wrap { padding: 0 40px 80px; }
        .sec-img { padding: 80px 40px; }
        @media (max-width: 640px) {
          .hero-row { flex-direction: column !important; }
          .hero-row input, .hero-row button { width: 100% !important; max-width: 100% !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          nav { padding: 10px 16px !important; }
          .nav-pricing { display: none !important; }
          .nav-rec { display: none !important; }
          .nav-signin { font-size: 12px !important; padding: 7px 12px !important; }
          .hero-pad { padding: 56px 20px 40px !important; }
          .sec { padding: 60px 20px !important; }
          .hero-visual-wrap { padding: 0 12px 48px !important; }
          .sec-img { padding: 60px 12px !important; }
          .mock-phone { display: none !important; }
          .feat-strip { gap: 0 !important; flex-wrap: wrap; }
          .feat-strip-item { width: 50% !important; border-right: none !important; border-bottom: 1px solid ${BORDER} !important; }
          .platform-row { gap: 20px !important; }
          .stats-bar { gap: 28px !important; padding: 28px 20px !important; }
          .footer-inner { padding: 40px 20px 32px !important; }
          .footer-inner > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .trust-row { gap: 12px !important; }
          .addiction-layout { flex-direction: column !important; gap: 32px !important; align-items: center !important; }
          .addiction-layout .comments-col { display: none !important; }
          .addiction-layout > div:first-child { max-width: 100% !important; }
          .mock-phone-section { padding: 60px 20px !important; overflow: hidden !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .hero-two-col { flex-direction: column !important; gap: 40px !important; }
          .hero-scene { width: 100% !important; max-width: 360px !important; margin: 0 auto !important; }
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1px !important; }
          .pipeline-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .pipeline-line { display: none !important; }
          .variations-grid { grid-template-columns: 1fr !important; }
          .mixeur-tabs-grid { grid-template-columns: 1fr !important; }
          .for-you-grid { grid-template-columns: 1fr !important; }
          .cliff-grid { grid-template-columns: 1fr !important; }
          .ep-phases-grid { grid-template-columns: 1fr !important; }
          .ep-rules-grid { grid-template-columns: 1fr !important; }
          .compare-table { display: none !important; }
        }
        @media (max-width: 900px) {
          .hero-scene { width: 340px !important; }
          .pipeline-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .feat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .variations-grid { grid-template-columns: 1fr !important; }
          .ep-phases-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .hero-pad { padding: 48px 16px 32px !important; }
          .sec { padding: 48px 16px !important; }
          nav { padding: 10px 12px !important; }
          .hero-visual-wrap { padding: 0 8px 36px !important; }
          .sec-img { padding: 48px 8px !important; }
          .stats-bar { flex-direction: column !important; gap: 0 !important; padding: 0 !important; border-radius: 14px !important; }
          .stats-bar > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; padding: 14px 16px !important; }
          .stats-bar > div:last-child { border-bottom: none !important; }
          .footer-inner > div:first-child { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .trust-row { flex-direction: column !important; align-items: center !important; gap: 8px !important; }
          .hero-feats { gap: 14px !important; flex-direction: column !important; align-items: flex-start !important; padding: 0 4px !important; }
        }
        @media (max-width: 390px) {
          .hero-pad { padding: 40px 14px 28px !important; }
          .sec { padding: 40px 14px !important; }
          .nav-signin { font-size: 11px !important; padding: 6px 10px !important; }
        }
        @media (hover: none) {
          .card-hover:hover { transform: none !important; box-shadow: none !important; }
          .faq-item:hover { background: none !important; }
          button:hover { opacity: 1 !important; }
        }
      `}</style>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.85)", backdropFilter: "blur(20px)" }}>
        <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo />
          <div className="nav-rec" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 800, color: RED, letterSpacing: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED, animation: "pulse 1.5s infinite" }} />
            REC
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 3, gap: 2 }}>
              <a href="/" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800, color: lang === "fr" ? "#fff" : MUTED, background: lang === "fr" ? "rgba(255,255,255,0.1)" : "transparent", textDecoration: "none", letterSpacing: 0.5 }}>FR</a>
              <a href="/en" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: lang === "en" ? 800 : 700, color: lang === "en" ? "#fff" : MUTED, background: lang === "en" ? "rgba(255,255,255,0.1)" : "transparent", textDecoration: "none", letterSpacing: 0.5 }}>EN</a>
            </div>
            <a href={lang === "en" ? "/en#tarifs" : "/tarifs"} className="nav-pricing" style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>{c.navPricing}</a>
            <a href="/app" className="nav-signin" style={{ fontSize: 14, color: TEXT, fontWeight: 700, background: SURFACE, border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 10 }}>{c.navSignin}</a>
          </div>
        </nav>
      </div>

      <main>
      {/* HERO — BOLD COMMERCIAL */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 900, height: 500, background: `radial-gradient(ellipse, ${RED}18 0%, ${VIO}0d 40%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "88px 40px 72px", position: "relative", zIndex: 1, textAlign: "center" }} className="hero-pad">

          {/* Big headline */}
          <h1 className="hero-h1" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 900, letterSpacing: -2, marginBottom: 0, color: TEXT, lineHeight: 1.0, fontSize: "clamp(36px, 7.5vw, 112px)", textTransform: "uppercase" }}>
            {c.heroHeadline1}<br />
            <span style={{ color: RED }}>{c.heroHeadline2}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.55)", margin: "28px auto 0", lineHeight: 1.6, maxWidth: 480 }}>
            {c.heroSubtitleBold}
          </p>

          {/* Features strip */}
          <div className="hero-feats" style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", margin: "28px 0 44px" }}>
            {(c.heroFeatures || []).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: `${RED}22`, border: `1px solid ${RED}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: RED }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>

          {canceled && <p style={{ color: RED, marginBottom: 16, fontSize: 14 }}>{c.canceledMsg}</p>}

          {/* Email + CTA */}
          <div className="hero-cta" style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <div className="hero-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
              <input type="email" placeholder={c.nlEmailPlaceholder} value={email}
                onChange={e => { setEmail(e.target.value); setEmailError(false); }}
                onKeyDown={e => e.key === "Enter" && startCheckout()}
                style={{ padding: "16px 20px", borderRadius: 14, border: `1px solid ${emailError ? RED : "rgba(255,255,255,0.1)"}`, background: "rgba(255,255,255,0.05)", color: TEXT, fontSize: 15, flex: "1 1 200px", minWidth: 0, outline: "none", backdropFilter: "blur(12px)", transition: "border-color .2s" }} />
              <button onClick={() => startCheckout("standard", "hero")} disabled={loading} className="cta-btn-glow"
                style={{ padding: "16px 28px", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.02em", textTransform: "uppercase", transition: "opacity .2s", opacity: loading ? 0.6 : 1 }}>
                {loading ? c.redirecting : c.ctaBtnCreate}
              </button>
            </div>
            <a href={lang === "en" ? "/en/exemples" : "/exemples"}
              onClick={() => track("demo_click", { position: "hero" })}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: 0.3, textDecoration: "none" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>▶</span>
              {c.ctaBtnDemo}
            </a>
          </div>
          {emailError && <p style={{ color: RED, fontSize: 13, fontWeight: 600, marginTop: 10 }}>{c.emailError}</p>}

          {/* Stats bar */}
          <div style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 56, border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.02)" }} className="stats-bar hero-stats">
            {[
              { val: c.heroStatViews, label: c.heroStatViewsLabel },
              { val: c.heroStatCreators, label: c.heroStatCreatorsLabel },
              { val: c.heroStatGoal, label: c.heroStatGoalLabel },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "20px 16px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(18px, 3vw, 34px)", fontWeight: 900, color: i === 2 ? RED : TEXT, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: -1, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.65)", marginTop: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Big CTA bottom */}
          <div style={{ marginTop: 20, maxWidth: 600, margin: "20px auto 0" }}>
            <div className="hero-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
              <input type="email" placeholder={c.nlEmailPlaceholder} value={email}
                onChange={e => { setEmail(e.target.value); setEmailError(false); }}
                onKeyDown={e => e.key === "Enter" && startCheckout("standard", "hero-bottom")}
                style={{ padding: "16px 20px", borderRadius: 14, border: `1px solid ${emailError ? RED : "rgba(255,255,255,0.15)"}`, background: "rgba(255,255,255,0.05)", color: TEXT, fontSize: 15, flex: 1, minWidth: 200, outline: "none", backdropFilter: "blur(12px)" }} />
              <button onClick={() => startCheckout("standard", "hero-bottom")} disabled={loading}
                style={{ padding: "16px 24px", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 900, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", transition: "opacity .2s", opacity: loading ? 0.6 : 1, whiteSpace: "nowrap", boxShadow: `0 0 32px rgba(168,85,247,0.35), 0 0 16px rgba(232,92,58,0.25)` }}>
                {loading ? c.redirecting : c.heroCtaBig}
              </button>
            </div>
            {emailError && <p style={{ color: RED, fontSize: 13, fontWeight: 600, textAlign: "center" }}>{c.emailError}</p>}
          </div>

        </div>
      </div>

      {/* TWO ENGINES */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: VIO, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
            {lang === "fr" ? "Deux niveaux d'intensité" : "Two intensity levels"}
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, color: TEXT, letterSpacing: -1.5, lineHeight: 1.05, textAlign: "center", marginBottom: 12 }}>
            {lang === "fr" ? "Un seul micro-drama." : "One micro-drama."}<br />
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.62)" }}>
              {lang === "fr" ? "Viral ou premium." : "Viral or premium."}
            </span>
          </h2>
          <p style={{ color: MUTED, fontSize: 15, textAlign: "center", maxWidth: 480, margin: "12px auto 52px", lineHeight: 1.7 }}>
            {lang === "fr"
              ? "Chaque micro-drama peut être écrit en mode viral immédiat ou en mode tension profonde."
              : "Every micro-drama can be written in immediate viral mode or deep tension mode."}
          </p>
          </Reveal>

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* MICRO DRAMA ENGINE */}
            <Reveal delay={0}>
            <div className="card-hover" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 24, overflow: "hidden", position: "relative", height: "100%" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${RED}, #f97316)` }} />
              <div style={{ padding: "28px 28px 12px" }}>
                <div style={{ display: "inline-block", padding: "4px 12px", background: `${RED}15`, border: `1px solid ${RED}30`, borderRadius: 20, fontSize: 11, fontWeight: 700, color: RED, marginBottom: 20, letterSpacing: "0.05em" }}>
                  {lang === "fr" ? "MICRO DRAMA ENGINE" : "MICRO DRAMA ENGINE"}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 900, color: TEXT, letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 12 }}>
                  {lang === "fr" ? "Viral. Intense." : "Viral. Intense."}<br />
                  <span style={{ color: "rgba(255,255,255,0.62)", fontStyle: "italic" }}>{lang === "fr" ? "Du premier scroll au binge." : "From first scroll to binge."}</span>
                </h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 24 }}>
                  {lang === "fr"
                    ? "Hooks ultra-rapides, cliffhangers immédiats, rythme maximal. Conçu pour TikTok, Reels et Shorts."
                    : "Ultra-fast hooks, immediate cliffhangers, maximum pace. Built for TikTok, Reels and Shorts."}
                </p>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, padding: "18px 28px 24px", display: "flex", flexDirection: "column", gap: 9 }}>
                {(lang === "fr" ? [
                  "Hook en 3 secondes ou moins",
                  "Cliffhanger à chaque fin d'épisode",
                  "Épisodes 30–90 secondes",
                  "Format 9:16 mobile-first",
                  "TikTok · Reels · Shorts",
                ] : [
                  "Hook in 3 seconds or less",
                  "Cliffhanger at every episode end",
                  "30–90 second episodes",
                  "9:16 mobile-first format",
                  "TikTok · Reels · Shorts",
                ]).map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: RED, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: MUTED }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 28px 24px" }}>
                <div style={{ fontSize: 11, color: MUTED, padding: "8px 14px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  {lang === "fr" ? "Plan Creator · 20 épisodes par série" : "Creator plan · 20 episodes per series"}
                </div>
              </div>
            </div>
            </Reveal>

            {/* SÉRIE PREMIUM ENGINE */}
            <Reveal delay={120}>
            <div className="card-hover" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 24, overflow: "hidden", position: "relative", height: "100%" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${VIO}, #e879f9)` }} />
              <div style={{ padding: "28px 28px 12px" }}>
                <div style={{ display: "inline-block", padding: "4px 12px", background: `${VIO}15`, border: `1px solid ${VIO}30`, borderRadius: 20, fontSize: 11, fontWeight: 700, color: VIO, marginBottom: 20, letterSpacing: "0.05em" }}>
                  {lang === "fr" ? "SÉRIE PREMIUM" : "PREMIUM SERIES"}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 900, color: TEXT, letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 12 }}>
                  {lang === "fr" ? "Profond. Addictif." : "Deep. Addictive."}<br />
                  <span style={{ color: "rgba(255,255,255,0.62)", fontStyle: "italic" }}>{lang === "fr" ? "Des personnages qu'on n'oublie pas." : "Characters you can't forget."}</span>
                </h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 24 }}>
                  {lang === "fr"
                    ? "Tension psychologique, sous-texte, Direction Artistique avancée. Pour des micro-dramas premium sur les plateformes verticales."
                    : "Psychological tension, subtext, advanced Artistic Direction. For premium micro-dramas on vertical platforms."}
                </p>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, padding: "18px 28px 24px", display: "flex", flexDirection: "column", gap: 9 }}>
                {(lang === "fr" ? [
                  "Personnages avec arcs et psychologie",
                  "Tension en sous-texte et silences",
                  "Jusqu'à 90 épisodes par série",
                  "3 variations de ton par script",
                  "Plateformes premium · verticales",
                ] : [
                  "Characters with arcs and psychology",
                  "Tension through subtext and silence",
                  "Up to 90 episodes per series",
                  "3 tone variations per script",
                  "Premium vertical platforms",
                ]).map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: VIO, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: MUTED }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 28px 24px" }}>
                <div style={{ fontSize: 11, color: MUTED, padding: "8px 14px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  {lang === "fr" ? "Plan Premium · Direction artistique avancée" : "Premium plan · Advanced artistic direction"}
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CLIFFHANGERS */}
      <div className="sec" style={{ padding: "80px 40px", background: "linear-gradient(180deg, rgba(168,85,247,0.04) 0%, transparent 100%)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
          <Label color={VIO}>{c.cliffhangersLabel}</Label>
          <Title>{lang === "fr" ? "Chaque épisode se termine" : "Every episode ends"}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.62)" }}>{lang === "fr" ? "par une scène impossible à ignorer." : "with a scene impossible to ignore."}</span></Title>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 15, maxWidth: 520, margin: "12px auto 52px", lineHeight: 1.7 }}>{c.cliffhangersCaption}</p>
          </Reveal>

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {c.cliffExamples.map(({ genre, color, hook, scene, cliff, next }, idx) => (
              <Reveal key={genre} delay={idx * 80}>
              <div className="card-hover" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>

                {/* Poster header — cinematic mood */}
                <div style={{ position: "relative", height: 110, overflow: "hidden", flexShrink: 0 }}>
                  {/* Atmosphere */}
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}28 0%, rgba(4,2,10,0.95) 100%)` }} />
                  <div style={{ position: "absolute", bottom: "10%", left: "10%", width: "40%", height: "70%", background: `radial-gradient(ellipse, ${color}40 0%, transparent 70%)`, filter: "blur(20px)" }} />
                  <div style={{ position: "absolute", top: "5%", right: "8%", width: "30%", height: "55%", background: `radial-gradient(ellipse, rgba(168,85,247,0.25) 0%, transparent 70%)`, filter: "blur(16px)" }} />
                  {/* Scanlines */}
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)" }} />
                  {/* Genre tag — TikTok style */}
                  <div style={{ position: "absolute", bottom: 12, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", background: color, padding: "3px 10px", borderRadius: 4 }}>{genre}</span>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.1em" }}>VERTICAL DRAMA</span>
                  </div>
                  {/* Top-right episode indicator */}
                  <div style={{ position: "absolute", top: 10, right: 12, fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "0.1em" }}>ÉP. 01</div>
                </div>

                {/* Card body */}
                <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Hook */}
                  <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 700, color: TEXT, fontStyle: "italic", lineHeight: 1.35, marginBottom: 14 }}>{hook}</p>

                  {/* Scene */}
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 16, paddingLeft: 10, borderLeft: `1.5px solid ${color}50`, flex: 1 }}>{scene}</p>

                  {/* Cliffhanger */}
                  <div style={{ background: `${color}0c`, border: `1px solid ${color}28`, borderRadius: 10, padding: "11px 14px", marginBottom: 12 }}>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color, marginBottom: 5 }}>CLIFFHANGER</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, fontWeight: 500 }}>{cliff}</p>
                  </div>

                  {/* Next episode */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, animation: "pulse 2s infinite", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "0.06em" }}>{next}</span>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* EPISODE STRUCTURE */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
          <Label color={RED}>{lang === "fr" ? "La structure" : "The structure"}</Label>
          <Title style={{ textAlign: "center", marginBottom: 12 }}>
            {lang === "fr" ? "1 minute." : "1 minute."}<br />
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.62)" }}>{lang === "fr" ? "5 phases. Zéro temps mort." : "5 phases. Zero dead time."}</span>
          </Title>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 15, maxWidth: 520, margin: "12px auto 52px", lineHeight: 1.7 }}>
            {lang === "fr"
              ? "Chaque épisode généré suit cette architecture temporelle exacte. Le cerveau n'a pas le temps de décrocher."
              : "Every generated episode follows this exact time architecture. The brain has no time to disengage."}
          </p>
          </Reveal>

          {/* Timeline bar */}
          <div style={{ position: "relative", marginBottom: 48 }}>
            {/* Progress bar */}
            <div style={{ display: "flex", height: 6, borderRadius: 999, overflow: "hidden", marginBottom: 32 }}>
              <div style={{ width: "8.3%", background: RED, opacity: 1 }} />
              <div style={{ width: "25%", background: `linear-gradient(90deg, ${RED}, #f59e0b)`, opacity: 0.85 }} />
              <div style={{ width: "33.3%", background: `linear-gradient(90deg, #f59e0b, ${VIO})`, opacity: 0.85 }} />
              <div style={{ width: "25%", background: `linear-gradient(90deg, ${VIO}, #ec4899)`, opacity: 0.9 }} />
              <div style={{ width: "8.4%", background: "#ec4899", opacity: 1 }} />
            </div>

            {/* Phase cards */}
            <div className="ep-phases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {[
                {
                  time: lang === "fr" ? "0 – 5s" : "0 – 5s",
                  label: "HOOK",
                  desc: lang === "fr" ? "Commencer au pire moment possible. In medias res. 1 phrase. 10 mots." : "Start at the worst possible moment. In medias res. 1 sentence.",
                  color: RED,
                  rule: lang === "fr" ? "Jamais: Bonjour" : "Never: Hello",
                },
                {
                  time: "5 – 20s",
                  label: lang === "fr" ? "CONFLIT" : "CONFLICT",
                  desc: lang === "fr" ? "3 répliques. Chaque phrase attaque, révèle ou aggrave." : "3 lines. Each one attacks, reveals or escalates.",
                  color: "#f59e0b",
                  rule: lang === "fr" ? "L'enjeu est immédiat" : "Stakes are immediate",
                },
                {
                  time: "20 – 40s",
                  label: lang === "fr" ? "ESCALADE" : "ESCALATION",
                  desc: lang === "fr" ? "4 répliques. Quelqu'un ment, trahit ou révèle. Montée constante." : "4 lines. Someone lies, betrays or reveals. Constant rise.",
                  color: VIO,
                  rule: lang === "fr" ? "1 événement / 15s" : "1 event every 15s",
                },
                {
                  time: "40 – 55s",
                  label: "TWIST",
                  desc: lang === "fr" ? "2-3 répliques. La dynamique bascule. Identité, secret, trahison." : "2-3 lines. The dynamic flips. Identity, secret, betrayal.",
                  color: "#ec4899",
                  rule: lang === "fr" ? "Relance le désir" : "Relaunches desire",
                },
                {
                  time: "55 – 60s",
                  label: "CLIFFHANGER",
                  desc: lang === "fr" ? "1 phrase. Question laissée en suspens. Jamais résolue." : "1 sentence. Question left open. Never resolved.",
                  color: "#ef4444",
                  rule: lang === "fr" ? "Couper avant la réponse" : "Cut before the answer",
                },
              ].map((phase, i) => (
                <div key={i} style={{
                  background: `linear-gradient(160deg, ${phase.color}12 0%, rgba(9,9,15,0.6) 100%)`,
                  border: `1px solid ${phase.color}30`,
                  borderTop: `3px solid ${phase.color}`,
                  borderRadius: 10,
                  padding: "16px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", color: phase.color, textTransform: "uppercase" }}>{phase.time}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: TEXT, textTransform: "uppercase" }}>{phase.label}</div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, margin: 0, flex: 1 }}>{phase.desc}</p>
                  <div style={{ fontSize: 9, fontWeight: 700, color: phase.color, letterSpacing: "0.06em", paddingTop: 6, borderTop: `1px solid ${phase.color}20` }}>{phase.rule}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Three rules footer */}
          <div className="ep-rules-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { label: lang === "fr" ? "Relations, toujours" : "Relationships, always", desc: lang === "fr" ? "Couples, rivalités, trahisons. L'enjeu est personnel — pas conceptuel." : "Couples, rivalries, betrayals. Stakes are personal — not conceptual.", color: RED },
              { label: lang === "fr" ? "1 idée forte par épisode" : "1 strong idea per episode", desc: lang === "fr" ? "Jamais 5 conflits en 1 minute. Une seule révélation centrale qui porte tout." : "Never 5 conflicts in 1 minute. One central reveal that carries everything.", color: VIO },
              { label: lang === "fr" ? "Couper avant la réponse" : "Cut before the answer", desc: lang === "fr" ? "Le cliffhanger = question suspendue. La réponse arrive dans l'épisode suivant. Toujours." : "Cliffhanger = suspended question. The answer comes next episode. Always.", color: "#ec4899" },
            ].map((rule, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid rgba(255,255,255,0.05)` }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: rule.color, flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{rule.label}</div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>{rule.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LE MIXEUR */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
          <Label color={RED}>{c.mixerLabel}</Label>
          <Title>{lang === "fr" ? "Ton studio narratif," : "Your narrative studio,"}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.62)" }}>{lang === "fr" ? "organisé en 4 onglets." : "organized in 4 tabs."}</span></Title>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 15, maxWidth: 520, margin: "12px auto 52px", lineHeight: 1.7 }}>
            {lang === "fr"
              ? "Chaque paramètre à sa place. Le bouton Générer toujours visible."
              : "Every parameter in its place. The Generate button always visible."}
          </p>
          </Reveal>

          {/* 4 tabs preview */}
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { emoji: "🎬", tab: lang === "fr" ? "Univers" : "Story", color: RED, items: lang === "fr"
                ? ["Packs univers (1 clic)", "Casting · Univers · Secret central", "Codes narratifs & tropes"]
                : ["Universe packs (1 click)", "Casting · Setting · Central secret", "Narrative codes & tropes"] },
              { emoji: "🎭", tab: lang === "fr" ? "Persos" : "Cast", color: "#f97316", items: lang === "fr"
                ? ["Archetypes IA (48 personnages)", "Morphologie · Culture · Aura", "Badge de compatibilité dramatique"]
                : ["AI archetypes (48 characters)", "Body type · Culture · Aura", "Dramatic compatibility badge"] },
              { emoji: "🎨", tab: lang === "fr" ? "Ambiance" : "Style", color: VIO, items: lang === "fr"
                ? ["Identité visuelle (8 esthétiques)", "Moteur Émotionnel (fast) · Direction Artistique (premium)", "Style de script · Inspiration série"]
                : ["Visual identity (8 aesthetics)", "Emotional Engine (fast) · Artistic Direction (premium)", "Script style · Series inspiration"] },
              { emoji: "⚙️", tab: lang === "fr" ? "Format" : "Format", color: "#22c55e", items: lang === "fr"
                ? ["Budget de tournage (0€ → Pro)", "Durée par épisode (60 · 90 · 120 sec)", "Nombre d'épisodes (10 → 90)"]
                : ["Shooting budget (€0 → Pro)", "Duration per episode (60 · 90 · 120 sec)", "Number of episodes (10 → 90)"] },
            ].map(({ emoji, tab, color, items }) => (
              <div key={tab} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "24px 22px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{tab}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color, fontSize: 12, marginTop: 1, flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 6 Story Formats */}
          <div style={{ background: "rgba(9,9,15,0.8)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "24px 28px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, marginBottom: 16, textAlign: "center" }}>
              {lang === "fr" ? "6 FORMATS NARRATIFS — TOUJOURS VISIBLES" : "6 NARRATIVE FORMATS — ALWAYS VISIBLE"}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: lang === "fr" ? "Vertical Drama" : "Vertical Drama", color: "#E85C3A" },
                { label: lang === "fr" ? "Série Premium" : "Premium Series", color: "#a855f7" },
                { label: "K-Drama", color: "#ec4899" },
                { label: "Thriller", color: "#f97316" },
                { label: "Romance", color: "#e879a0" },
                { label: "Dark Drama", color: "#64748b" },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 20, border: `1px solid ${color}35`, background: `${color}08` }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="tarifs" className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal>
          <Label color={VIO}>{c.pricingLabel}</Label>
          <Title>{c.pricingTitle}</Title>
          </Reveal>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 4, gap: 4 }}>
              {[
                { k: "monthly", l: c.billingMonthly },
                { k: "annual",  l: c.billingAnnual, badge: "-17%" },
              ].map(({ k, l, badge }) => (
                <button key={k} onClick={() => setBilling(k)} style={{
                  padding: "9px 20px", borderRadius: 10, border: "none", fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                  background: billing === k ? TEXT : "transparent",
                  color: billing === k ? DARK : MUTED,
                  display: "flex", alignItems: "center", gap: 7,
                }}>
                  {l}
                  {badge && <span style={{ fontSize: 10, fontWeight: 800 }}>{badge}</span>}
                </button>
              ))}
            </div>
          </div>
          {billing === "annual" && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 24, marginTop: -20 }}>
              🎉 {c.annualSavings}
            </p>
          )}

          <input type="email" placeholder={c.nlEmailPlaceholder} value={email} onChange={e => { setEmail(e.target.value); setEmailError(false); }}
            style={{ width: "100%", maxWidth: 400, display: "block", margin: `0 auto ${emailError ? "6px" : "32px"}`, padding: "14px 18px", borderRadius: 12, border: `1px solid ${emailError ? RED : BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, outline: "none", transition: "border-color .2s" }} />
          {emailError && <p style={{ textAlign: "center", color: RED, fontSize: 13, fontWeight: 600, marginBottom: 26 }}>{c.emailError}</p>}

          {/* Plan tab switcher */}
          <div style={{ maxWidth: 480, margin: "0 auto 28px" }}>
            <div style={{ display: "flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 5, gap: 5 }}>
              {[
                { id: "creator", label: c.planStandard, price: billing === "annual" ? "7.5€" : "9€", color: RED },
                { id: "pro", label: c.planPremium, price: billing === "annual" ? "14.9€" : "19€", color: VIO },
              ].map(tab => {
                const active = planTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setPlanTab(tab.id)} style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "13px 8px", borderRadius: 13, border: "none",
                    background: active ? (tab.id === "pro" ? `linear-gradient(135deg, ${RED}22, ${VIO}22)` : `${RED}18`) : "transparent",
                    boxShadow: active ? `inset 0 0 0 1.5px ${tab.color}55` : "none",
                    cursor: "pointer", transition: "all .2s", fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: active ? tab.color : MUTED, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, fontWeight: 800, color: active ? tab.color : MUTED }}>{tab.label}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: active ? TEXT : MUTED }}>{tab.price}<span style={{ fontWeight: 400, fontSize: 11 }}>{c.perMonth}</span></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Creator plan */}
          {planTab === "creator" && (
            <Reveal>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              <div className="glass card-hover" style={{ borderRadius: 24, padding: "36px 32px", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: `linear-gradient(90deg, ${RED}, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: MUTED, textTransform: "uppercase", marginBottom: 6 }}>{c.planStandard}</p>
                    {c.planStandardSub && <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{c.planStandardSub}</p>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 48, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
                      {billing === "annual" ? "7.5€" : "9€"}
                    </div>
                    <p style={{ color: MUTED, fontSize: 12 }}>{c.perMonth}{billing === "annual" ? " · facturé 90€/an" : ""}</p>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {c.standardFeatures.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                      <Check />
                      <span style={{ color: MUTED, fontSize: 14 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <GlowBtn onClick={() => startCheckout("standard", "pricing")} disabled={loading} style={{ width: "100%", fontSize: 15, padding: 16 }}>
                  {loading ? c.redirecting : c.ctaBtn}
                </GlowBtn>
                <p style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: MUTED }}>
                  <button onClick={() => setPlanTab("pro")} style={{ background: "none", border: "none", color: VIO, fontWeight: 700, cursor: "pointer", fontSize: 11, padding: 0 }}>Voir Premium →</button>
                </p>
              </div>
            </div>
            </Reveal>
          )}

          {/* Pro plan */}
          {planTab === "pro" && (
            <Reveal>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              <div className="card-hover" style={{ borderRadius: 24, padding: "36px 32px", position: "relative", background: "rgba(168,85,247,0.04)", border: "1.5px solid rgba(168,85,247,0.28)", boxShadow: "0 0 48px rgba(168,85,247,0.08)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: `linear-gradient(90deg, ${VIO}, ${RED})` }} />
                <div style={{ position: "absolute", top: -13, right: 24, background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: 1.5 }}>{c.recommendedBadge}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: VIO, textTransform: "uppercase", marginBottom: 6 }}>{c.planPremium}</p>
                    {c.planPremiumSub && <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{c.planPremiumSub}</p>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 48, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
                      {billing === "annual" ? "14.9€" : "19€"}
                    </div>
                    <p style={{ color: MUTED, fontSize: 12 }}>{c.perMonth}{billing === "annual" ? " · facturé 179€/an" : ""}</p>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {c.premiumFeatures.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                      <Check color={VIO} />
                      <span style={{ color: MUTED, fontSize: 14, fontWeight: i < 2 ? 600 : 400 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <GlowBtn onClick={() => startCheckout("premium", "pricing")} disabled={loading} gradient style={{ width: "100%", fontSize: 15, padding: 16 }}>
                  {loading ? c.redirecting : c.ctaBtnPremium}
                </GlowBtn>
              </div>
            </div>
            </Reveal>
          )}

          <div className="trust-row" style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 28 }}>
            {c.trustItems.map(({ label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: MUTED }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: MUTED, marginTop: 16 }}>
            {c.tryFreeText1}<a href={lang === "en" ? "/en/exemples" : "/exemples"} onClick={() => track("demo_click", { position: "pricing" })} style={{ color: VIO, fontWeight: 600 }}>{c.tryFreeLink}</a>{c.tryFreeText2}
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal>
          <Label color={RED}>{c.faqLabel}</Label>
          <Title>{c.faqTitle}</Title>
          </Reveal>
          <div style={{ marginTop: 48 }}>
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
              <div style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button onClick={() => { const next = openFaq === i ? null : i; setOpenFaq(next); if (next !== null) track("faq_open", { index: i, q: item.q?.slice(0, 50) }); }} className="faq-item"
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 8px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Space Grotesk', sans-serif", borderRadius: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, paddingRight: 16 }}>{item.q}</span>
                  <span style={{ color: VIO, fontSize: 22, flexShrink: 0, transition: "transform .2s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, paddingBottom: 20, paddingLeft: 8 }}>{item.r}</p>}
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsletterSection lang={lang} />

      {/* BLOG */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.resourcesLabel}</Label>
          <Title>{c.resourcesTitle}<br /><span style={{ fontStyle: "italic", color: MUTED }}>{c.resourcesTitleItalic}</span></Title>
          <p style={{ textAlign: "center", color: MUTED, marginBottom: 56, fontSize: 15 }}>{c.resourcesBody}</p>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            {(lang === "en" ? POSTS_EN : POSTS).slice(0, 3).map((post) => (
              <a key={post.slug} href={lang === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 24px", textDecoration: "none", color: "inherit", transition: "border-color .2s" }}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: post.categoryColor, background: `${post.categoryColor}12`, border: `1px solid ${post.categoryColor}25`, padding: "3px 10px", borderRadius: 6 }}>{post.category}</span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 900, color: TEXT, letterSpacing: -0.3, lineHeight: 1.3, marginBottom: 12, flex: 1 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 20 }}>{post.description.slice(0, 100)}…</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: MUTED }}>{post.readTime} {c.readTime}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: post.categoryColor }}>{c.readMore}</span>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href={lang === "en" ? "/en/blog" : "/blog"} style={{ display: "inline-block", border: `1px solid ${BORDER}`, color: TEXT, padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", background: SURFACE }}>
              {c.viewAllGuides}
            </a>
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="sec" style={{ padding: "100px 40px", textAlign: "center", borderTop: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(168,85,247,0.07) 0%, transparent 60%)`, pointerEvents: "none" }} />
        <Reveal>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, marginBottom: 20, letterSpacing: -2, lineHeight: 1.0 }}>
            {c.ctaFinalTitle1}<br />
            {c.ctaFinalConnector}{" "}
            <span style={{ background: `linear-gradient(135deg, ${RED}, ${VIO})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
              {c.ctaFinalTitle2}
            </span>
            .
          </h2>
          <p style={{ color: MUTED, fontSize: 16, marginBottom: 48, lineHeight: 1.6 }}>{c.ctaFinalSubtitle}</p>
          <div className="hero-row" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input type="email" placeholder={c.nlEmailPlaceholder} value={email} onChange={e => setEmail(e.target.value)}
              style={{ padding: "16px 20px", borderRadius: 14, border: `1px solid ${BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, width: 240, outline: "none" }} />
            <GlowBtn onClick={() => startCheckout("standard", "cta_final")} disabled={loading}>
              {loading ? c.redirecting : c.ctaBtn}
            </GlowBtn>
          </div>
          <div className="trust-row" style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {c.ctaFinalTrustItems.map(({ label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: MUTED }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </div>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.01)" }}>
        <div className="footer-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <Logo size="sm" />
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.75, marginTop: 16, maxWidth: 240 }}>
                {c.footerTagline}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>{c.footerProduit}</p>
              {[{ href: lang === "en" ? "/en#tarifs" : "/tarifs", label: c.footerTarifs }, { href: lang === "en" ? "/en/exemples" : "/exemples", label: c.footerExemples }].map(({ href, label }) => (
                <a key={href} href={href} style={{ display: "block", fontSize: 13, color: MUTED, marginBottom: 10, fontWeight: 500 }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>{c.footerRessources}</p>
              {c.footerBlogLinks.map(({ href, label }) => (
                <a key={href} href={href} style={{ display: "block", fontSize: 13, color: MUTED, marginBottom: 10, fontWeight: 500 }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>{c.footerLegal}</p>
              {[{ href: "/cgu", label: c.footerCGU }, { href: "/confidentialite", label: c.footerConfidentialite }, { href: "/contact", label: c.footerContact }].map(({ href, label }) => (
                <a key={href} href={href} style={{ display: "block", fontSize: 13, color: MUTED, marginBottom: 10, fontWeight: 500 }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: MUTED, fontSize: 12 }}>{c.footerCopyright}</p>
            <div style={{ display: "flex", gap: 6 }}>
              {["TikTok", "Reels", "Shorts", "Plateformes premium"].map(p => (
                <span key={p} style={{ fontSize: 10, color: MUTED, background: SURFACE, border: `1px solid ${BORDER}`, padding: "3px 8px", borderRadius: 6, fontWeight: 500 }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
