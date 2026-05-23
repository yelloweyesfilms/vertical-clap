import { useState, useEffect } from "react";
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
    studioBadge: "Vertical drama · Séries · Univers narratifs",
    heroLine1: "Ta série,",
    heroLine2: "virale,",
    heroLine3: "maintenant.",
    heroTitle: "Du vertical drama",
    heroTitleItalic: "aux univers narratifs.",
    scaleLabel: "Créez à toutes les échelles",
    scaleTitle: "Du micro-drama au projet ambitieux.",
    scaleSub: "Vertical Clap accompagne chaque étape — de la première idée au showrunner confirmé.",
    scaleSteps: [
      { emoji: "⚡", label: "Micro-drama", sub: "TikTok · Reels · 60s", color: RED },
      { emoji: "📱", label: "Série verticale", sub: "10–20 épisodes · Mobile", color: "#f97316" },
      { emoji: "🎬", label: "Web série", sub: "Storytelling social · Binge", color: "#eab308" },
      { emoji: "🎭", label: "Série premium", sub: "DramaBox · ReelShort · 90 éps", color: "#22c55e" },
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
    heroSubtitle: "Créez des séries, des films et des univers narratifs depuis une seule plateforme.",
    heroSubtitleOld: "Bible, scripts, hooks et cliffhangers générés en 5 minutes — prêts pour TikTok, DramaBox et ReelShort.",
    canceledMsg: "Paiement annulé. Réessaie quand tu veux.",
    ctaBtnCreate: "Commencer à créer →",
    ctaBtnDemo: "Voir les exemples",
    ctaBtn: "Commencer →",
    redirecting: "Redirection…",
    pricingSubline: "9€/mois · Annulable à tout moment · Aucun engagement",
    trustSecurePayment: "Paiement sécurisé Stripe",
    trustNoCreditCard: "Sans carte bancaire requise",
    trustImmediateAccess: "Accès immédiat",
    cliffhangersLabel: "Des vidéos impossibles à scroller",
    cliffhangersCaption: "Chaque épisode généré se termine par un cliffhanger conçu pour retenir l'audience.",
    cliffExamples: [
      { genre: "Romance", emoji: "❤️", color: "#e879a0", hook: "« Je t'ai menti depuis le début. »", scene: "Sofia pose la photo sur la table. Marc ne bouge pas. Il savait.", cliff: "Elle ouvre l'enveloppe. Son nom est dessus. Mais ce n'est pas son écriture.", next: "Ép. 2 · La Vérité" },
      { genre: "Thriller", emoji: "🔪", color: "#E85C3A", hook: "« Il est mort à cause de toi. »", scene: "Les lumières s'éteignent. Karim est seul dans le bureau. La porte se verrouille.", cliff: "Le téléphone vibre. Numéro inconnu. \"On sait que tu as tout vu.\"", next: "Ép. 3 · Le Retournement" },
      { genre: "K-Drama", emoji: "💗", color: "#a78bfa", hook: "« Je ne t'aime pas. Menteur. »", scene: "Jiwoo croise son regard dans le couloir. Il détourne les yeux. Elle sourit.", cliff: "Sa mère lui tend une photo. \"C'est lui ton fiancé.\" C'est le même homme.", next: "Ép. 4 · L'Impossible" },
      { genre: "Dark Drama", emoji: "🌑", color: "#64748b", hook: "« La famille ne pardonne jamais. »", scene: "Le testament est sur la table. Trois héritiers. Un seul survivant possible.", cliff: "La notaire lève les yeux. \"Il vous reste 48 heures pour disparaître.\"", next: "Ép. 5 · La Chute" },
    ],
    addictionLabel: "L'addiction narrative",
    addictionTitle1: "Tu vends un épisode.",
    addictionTitle2: "Ils reviennent pour dix.",
    addictionBody: "Chaque script se termine par un cliffhanger calculé pour provoquer une réaction physique. Le scroll s'arrête. Le commentaire arrive. L'épisode suivant se lance.",
    statWatchTime: "Watch time moyen",
    statComments: "Commentaires / épisode",
    statReturn: "Retour épisode suivant",
    platformsTitle: "Le format 9:16 fonctionne partout.",
    platformsSubtitle: "Le format 9:16 fonctionne partout où ton audience regarde",
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
      { emoji: "📱", title: "Le créateur solo", sub: "Tu postes sur TikTok, Reels ou Shorts. Tu veux des séries courtes, des hooks qui accrochent, un rythme maximal. Creator te donne tout ça en 5 minutes.", color: "#E85C3A" },
      { emoji: "🎬", title: "L'auteur en développement", sub: "Tu as des idées plus ambitieuses — personnages complexes, arcs narratifs, plusieurs épisodes. Storyteller te donne la structure et la Direction Artistique.", color: "#f97316" },
      { emoji: "🎭", title: "Le showrunner", sub: "Tu gères une équipe, tu livres sur des plateformes (DramaBox, ReelShort). 90 épisodes, 3 variations par script, fiche de production — tout y est.", color: "#a855f7" },
    ],
    pipelineLabel: "De l'idée au tournage",
    pipelineTitle1: "5 minutes. Série complète.",
    pipelineTitle2: "Du concept au script prêt à tourner.",
    variationsLabel: "3 variations par script",
    variationsTitle1: "Intense, Subtil ou Rapide.",
    variationsTitle2: "Le bon ton, du premier coup.",
    pricingLabel: "Tarifs",
    pricingTitle: "Choisissez votre plan.",
    billingMonthly: "Mensuel",
    billingAnnual: "Annuel",
    annualSavings: "2 mois offerts par rapport au mensuel",
    billedStandardAnnual: "facturé 90€/an",
    billedPremiumAnnual: "facturé 179€/an",
    perMonth: "/mois",
    planStandard: "Creator",
    planStandardSub: "Pour créateurs, micro-dramas et storytelling social",
    planPremium: "Storyteller",
    planPremiumSub: "Pour séries, univers narratifs et projets ambitieux",
    standardFeatures: [
      "⚡ Vertical Drama · micro-drama",
      "20 épisodes par série",
      "Scripts 60–90 secondes",
      "Mode Tournage + Téléprompteur",
      "🌍 Traduction en 8 langues",
      "☁️ Sauvegarde cloud",
      "📄 Export PDF",
    ],
    premiumFeatures: [
      "⚡ Vertical + 🎭 Série Premium",
      "Jusqu'à 90 épisodes par série",
      "Scripts courts et longs formats",
      "Mode Tournage + Téléprompteur",
      "🎲 3 variations par script",
      "🌍 Traduction en 8 langues",
      "🎬 Fiche technique de production",
      "☁️ Sauvegarde cloud",
      "📄 Export PDF",
    ],
    recommendedBadge: "⭐ RECOMMANDÉ",
    ctaBtnPremium: "Commencer Storyteller →",
    trustItems: [
      { icon: "🔒", label: "Stripe · Paiement sécurisé" },
      { icon: "✓", label: "Annulable en 1 clic" },
      { icon: "⚡", label: "Accès immédiat après paiement" },
      { icon: "🛡️", label: "Données chiffrées" },
    ],
    tryFreeText1: "Teste gratuitement dans les ",
    tryFreeLink: "Exemples",
    tryFreeText2: " avant de t'abonner.",
    faqLabel: "FAQ",
    faqTitle: "Questions fréquentes.",
    faqItems: [
      { q: "C'est quoi un micro-drama vertical ?", r: "Un format vidéo court (1 à 2 min), filmé en 9:16 pour mobile, avec une structure dramatique forte : hook percutant, tension montante et cliffhanger final. Le format qui explose sur TikTok, Instagram Reels, YouTube Shorts — et sur les plateformes spécialisées comme DramaBox, ReelShort ou Crazy Maple." },
      { q: "Combien de temps pour générer une série complète ?", r: "Moins de 5 minutes. La bible (titre, logline, personnages) se génère en streaming en quelques secondes. Les épisodes arrivent en parallèle. Le script d'un épisode prend 10 secondes." },
      { q: "Quelle différence entre le plan Creator et Storyteller ?", r: "Creator (Vertical Drama) : émotions frontales, hooks agressifs, rythme maximal — idéal pour TikTok, Reels et Shorts. Storyteller (Série Premium) : tension psychologique, sous-texte, silences lourds, Direction Artistique avancée — pour des séries ambitieuses et une audience plus mature." },
      { q: "Les scripts sont-ils vraiment prêts à tourner ?", r: "Oui. Chaque scène inclut le dialogue, l'indication de jeu d'acteur et la directive de cadrage 9:16. Le Mode Tournage intègre un téléprompteur auto-scroll et une checklist décors." },
      { q: "Mes séries sont-elles sauvegardées ?", r: "Elles sont sauvegardées localement sur ton appareil et synchronisées dans le cloud automatiquement. Tu y accèdes depuis n'importe quel appareil via l'onglet ☁️ Cloud." },
      { q: "Puis-je annuler mon abonnement ?", r: "Oui, à tout moment en un clic depuis ton espace Stripe. Aucun engagement, aucune pénalité. Tu gardes l'accès jusqu'à la fin de la période payée." },
    ],
    nlLabel: "Restez informé",
    nlTitle1: "Pas encore prêt ?",
    nlTitle2: "On garde le contact.",
    nlBody: "Reçois nos guides sur le micro-drama vertical, les nouvelles fonctionnalités et les astuces des créateurs.",
    nlDone: "Tu es inscrit — à bientôt !",
    nlSubscribe: "M'inscrire",
    nlError: "Une erreur est survenue, réessaie.",
    nlNoSpam: "Aucun spam. Désabonnement en 1 clic.",
    nlEmailPlaceholder: "ton@email.com",
    resourcesLabel: "Ressources",
    resourcesTitle: "Guides pour créateurs",
    resourcesTitleItalic: "qui veulent progresser.",
    resourcesBody: "Écriture, hooks, plateformes, monétisation — tout ce qu'il faut savoir.",
    readTime: "de lecture",
    viewAllGuides: "Voir tous les guides →",
    footerBlogLinks: [
      { href: "/blog", label: "Blog" },
      { href: "/blog/qu-est-ce-qu-un-micro-drama", label: "Guide micro-drama" },
      { href: "/blog/comment-ecrire-un-hook-tiktok", label: "Écrire un hook" },
      { href: "/blog/monetiser-micro-drama-dramabox-reelshort", label: "Monétiser sa série" },
    ],
    ctaFinalTitle1: "Ta première série,",
    ctaFinalConnector: "dans",
    ctaFinalTitle2: "5 minutes",
    ctaFinalSubtitle: "Rejoins les créateurs qui produisent plus vite avec l'IA.",
    ctaFinalTrustItems: [
      { icon: "🔒", label: "Paiement sécurisé Stripe" },
      { icon: "✓", label: "Sans engagement" },
      { icon: "⚡", label: "Accès immédiat" },
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
      { emoji: "📱", label: "Format 9:16", sub: "Prêt à tourner, hook inclus" },
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
    studioBadge: "Vertical drama · Series · Narrative universes",
    heroLine1: "Your series,",
    heroLine2: "viral,",
    heroLine3: "now.",
    heroTitle: "From vertical drama",
    heroTitleItalic: "to narrative universes.",
    heroSubtitle: "Create series, films and narrative universes from one single platform.",
    scaleLabel: "Create at every scale",
    scaleTitle: "From micro-drama to ambitious projects.",
    scaleSub: "Vertical Clap accompanies every step — from first idea to confirmed showrunner.",
    scaleSteps: [
      { emoji: "⚡", label: "Micro-drama", sub: "TikTok · Reels · 60s", color: RED },
      { emoji: "📱", label: "Vertical series", sub: "10–20 episodes · Mobile", color: "#f97316" },
      { emoji: "🎬", label: "Web series", sub: "Social storytelling · Binge", color: "#eab308" },
      { emoji: "🎭", label: "Premium series", sub: "DramaBox · ReelShort · 90 eps", color: "#22c55e" },
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
    heroSubtitleOld: "Bible, scripts, hooks and cliffhangers generated in 5 minutes — ready for TikTok, DramaBox and ReelShort.",
    canceledMsg: "Payment canceled. Try again whenever you're ready.",
    ctaBtnCreate: "Start creating →",
    ctaBtnDemo: "See examples",
    ctaBtn: "Get started →",
    redirecting: "Redirecting…",
    pricingSubline: "€9/month · Cancel anytime · No commitment",
    trustSecurePayment: "Secure Stripe payment",
    trustNoCreditCard: "No credit card required",
    trustImmediateAccess: "Immediate access",
    cliffhangersLabel: "Videos impossible to scroll past",
    cliffhangersCaption: "Every generated episode ends with a cliffhanger designed to keep the audience hooked.",
    cliffExamples: [
      { genre: "Romance", emoji: "❤️", color: "#e879a0", hook: "\"I've been lying to you from the start.\"", scene: "Sofia puts the photo on the table. Marc doesn't move. He already knew.", cliff: "She opens the envelope. Her name is on it. But it's not her handwriting.", next: "Ep. 2 · The Truth" },
      { genre: "Thriller", emoji: "🔪", color: "#E85C3A", hook: "\"He died because of you.\"", scene: "The lights go out. Karim is alone in the office. The door locks.", cliff: "The phone vibrates. Unknown number. \"We know you saw everything.\"", next: "Ep. 3 · The Twist" },
      { genre: "K-Drama", emoji: "💗", color: "#a78bfa", hook: "\"I don't love you. Liar.\"", scene: "Jiwoo meets his gaze in the hallway. He looks away. She smiles.", cliff: "Her mother hands her a photo. \"This is your fiancé.\" It's the same man.", next: "Ep. 4 · The Impossible" },
      { genre: "Dark Drama", emoji: "🌑", color: "#64748b", hook: "\"Family never forgives.\"", scene: "The will is on the table. Three heirs. Only one possible survivor.", cliff: "The notary looks up. \"You have 48 hours to disappear.\"", next: "Ep. 5 · The Fall" },
    ],
    addictionLabel: "Narrative addiction",
    addictionTitle1: "You sell one episode.",
    addictionTitle2: "They come back for ten.",
    addictionBody: "Every script ends with a cliffhanger calculated to trigger a physical reaction. The scroll stops. The comment arrives. The next episode plays.",
    statWatchTime: "Average watch time",
    statComments: "Comments / episode",
    statReturn: "Return next episode",
    platformsTitle: "The 9:16 format works everywhere.",
    platformsSubtitle: "The 9:16 format works wherever your audience watches",
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
      { emoji: "📱", title: "The solo creator", sub: "You post on TikTok, Reels or Shorts. You want short series, hooks that grab, maximum pace. Creator gives you all that in 5 minutes.", color: "#E85C3A" },
      { emoji: "🎬", title: "The developing author", sub: "You have bigger ideas — complex characters, narrative arcs, multi-episode formats. Storyteller gives you the structure and Artistic Direction.", color: "#f97316" },
      { emoji: "🎭", title: "The showrunner", sub: "You manage a team, deliver to platforms (DramaBox, ReelShort). 90 episodes, 3 variations per script, production sheet — all there.", color: "#a855f7" },
    ],
    pipelineLabel: "From idea to shoot",
    pipelineTitle1: "5 minutes. Complete series.",
    pipelineTitle2: "From concept to shoot-ready script.",
    variationsLabel: "3 variations per script",
    variationsTitle1: "Intense, Subtle or Fast.",
    variationsTitle2: "The right tone, first time.",
    pricingLabel: "Pricing",
    pricingTitle: "Choose your plan.",
    billingMonthly: "Monthly",
    billingAnnual: "Annual",
    annualSavings: "2 months free compared to monthly",
    billedStandardAnnual: "billed €90/year",
    billedPremiumAnnual: "billed €179/year",
    perMonth: "/month",
    planStandard: "Creator",
    planStandardSub: "For creators, micro-dramas and social storytelling",
    planPremium: "Storyteller",
    planPremiumSub: "For series, narrative universes and ambitious projects",
    standardFeatures: [
      "⚡ Vertical Drama · micro-drama",
      "10 episodes per series",
      "60–90 second scripts",
      "Shoot Mode + Teleprompter",
      "🌍 Translation in 8 languages",
      "☁️ Cloud save",
      "📄 PDF Export",
    ],
    premiumFeatures: [
      "⚡ Vertical + 🎭 Premium Series",
      "Up to 90 episodes per series",
      "Short and long format scripts",
      "Shoot Mode + Teleprompter",
      "🎲 3 variations per script",
      "🌍 Translation in 8 languages",
      "🎬 Production sheet",
      "☁️ Cloud save",
      "📄 PDF Export",
    ],
    recommendedBadge: "⭐ RECOMMENDED",
    ctaBtnPremium: "Get started Storyteller →",
    trustItems: [
      { icon: "🔒", label: "Stripe · Secure payment" },
      { icon: "✓", label: "Cancel in 1 click" },
      { icon: "⚡", label: "Immediate access after payment" },
      { icon: "🛡️", label: "Encrypted data" },
    ],
    tryFreeText1: "Try it free in the ",
    tryFreeLink: "Examples",
    tryFreeText2: " before subscribing.",
    faqLabel: "FAQ",
    faqTitle: "Frequently asked questions.",
    faqItems: [
      { q: "What is a vertical micro-drama?", r: "A short video format (1 to 2 min), filmed in 9:16 for mobile, with a strong dramatic structure: punchy hook, rising tension and final cliffhanger. The format exploding on TikTok, Instagram Reels, YouTube Shorts — and on specialized platforms like DramaBox, ReelShort or Crazy Maple." },
      { q: "How long does it take to generate a complete series?", r: "Less than 5 minutes. The bible (title, logline, characters) is generated in streaming in a few seconds. Episodes arrive in parallel. A single episode script takes 10 seconds." },
      { q: "What's the difference between Creator and Storyteller?", r: "Creator (Vertical Drama): frontal emotions, aggressive hooks, maximum pace — ideal for TikTok, Reels and Shorts. Storyteller (Premium Series): psychological tension, subtext, heavy silences, advanced Artistic Direction — for ambitious series and a more mature audience." },
      { q: "Are the scripts really ready to shoot?", r: "Yes. Each scene includes dialogue, acting direction and 9:16 framing directive. Shoot Mode includes an auto-scroll teleprompter and a set checklist." },
      { q: "Are my series saved?", r: "They are saved locally on your device and synced to the cloud automatically. You can access them from any device via the ☁️ Cloud tab." },
      { q: "Can I cancel my subscription?", r: "Yes, at any time in one click from your Stripe account. No commitment, no penalty. You keep access until the end of the paid period." },
    ],
    nlLabel: "Stay informed",
    nlTitle1: "Not ready yet?",
    nlTitle2: "Let's stay in touch.",
    nlBody: "Receive our guides on vertical micro-drama, new features and creator tips.",
    nlDone: "You're subscribed — see you soon!",
    nlSubscribe: "Subscribe",
    nlError: "An error occurred, please try again.",
    nlNoSpam: "No spam. Unsubscribe in 1 click.",
    nlEmailPlaceholder: "your@email.com",
    resourcesLabel: "Resources",
    resourcesTitle: "Guides for creators",
    resourcesTitleItalic: "who want to grow.",
    resourcesBody: "Writing, hooks, platforms, monetization — everything you need to know.",
    readTime: "read",
    viewAllGuides: "View all guides →",
    footerBlogLinks: [
      { href: "/en/blog", label: "Blog" },
      { href: "/en/blog/qu-est-ce-qu-un-micro-drama", label: "Micro-drama guide" },
      { href: "/en/blog/comment-ecrire-un-hook-tiktok", label: "Write a hook" },
      { href: "/en/blog/tiktok-vs-dramabox-vs-reelshort-ou-publier-micro-drama", label: "Monetize your series" },
    ],
    ctaFinalTitle1: "Your first series,",
    ctaFinalConnector: "in",
    ctaFinalTitle2: "5 minutes",
    ctaFinalSubtitle: "Join creators who produce faster with AI.",
    ctaFinalTrustItems: [
      { icon: "🔒", label: "Secure Stripe payment" },
      { icon: "✓", label: "No commitment" },
      { icon: "⚡", label: "Immediate access" },
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
      { emoji: "📱", label: "9:16 Format", sub: "Ready to shoot, hook included" },
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

const Logo = ({ size = "md" }) => {
  const sm = size === "sm";
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: sm ? 7 : 10, userSelect: "none" }}>
      <div style={{ width: 3, borderRadius: 2, background: "linear-gradient(to bottom, #ff8c42, #E85C3A)", flexShrink: 0 }} />
      <svg width={sm ? 13 : 17} height={sm ? 22 : 28} viewBox="0 0 17 28" fill="none" style={{ flexShrink: 0, alignSelf: "center" }}>
        <rect x="1" y="1" width="15" height="26" rx="3" stroke="white" strokeWidth="1.5"/>
        <circle cx="8.5" cy="23.5" r="1.1" fill="white" opacity="0.5"/>
        <rect x="5.5" y="3.5" width="6" height="1" rx="0.5" fill="white" opacity="0.4"/>
      </svg>
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

  const submit = async () => {
    if (!nlEmail || !nlEmail.includes("@")) return;
    setNlState("loading");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nlEmail, lang }) });
      const data = await res.json();
      setNlState(data.ok ? "done" : "error");
    } catch { setNlState("error"); }
  };

  return (
    <div style={{ borderTop: `1px solid ${BORDER}`, padding: "72px 40px", textAlign: "center", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>{c.nlLabel}</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, color: TEXT, letterSpacing: -1, lineHeight: 1.1, marginBottom: 12 }}>
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
  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 900, textAlign: "center", marginBottom: 12, letterSpacing: -1.5, lineHeight: 1.1, color: TEXT, ...style }}>{children}</h2>
);

export default function RichLandingPage({ lang = "fr" }) {
  const c = COPY[lang];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [billing, setBilling] = useState("monthly");
  const [planTab, setPlanTab] = useState("storyteller");
  const router = useRouter();
  const canceled = router.query.canceled;

  const track = (event, meta = {}) => fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, meta }) }).catch(() => {});

  useEffect(() => { track("page_view"); }, []);

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
        }
        @media (max-width: 900px) {
          .hero-scene { width: 340px !important; }
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

      {/* HERO — CINEMATIC */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "96px 40px 80px", position: "relative" }} className="hero-pad">
        <div className="hero-two-col" style={{ position: "relative", zIndex: 1, display: "flex", gap: 64, alignItems: "center" }}>

          {/* LEFT — COPY */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: VIO, padding: "7px 18px", borderRadius: 100, fontSize: 12, fontWeight: 600, marginBottom: 36, animation: "glow 3s infinite", letterSpacing: 1 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: VIO, display: "inline-block" }} />
              {c.studioBadge}
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, letterSpacing: -2, marginBottom: 24, color: TEXT, lineHeight: 1.05, fontSize: "clamp(40px, 4.8vw, 68px)" }}>
              {c.heroTitle}<br />
              <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${RED} 10%, ${VIO} 90%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{c.heroTitleItalic}</span>
            </h1>

            <p style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: MUTED, marginBottom: 48, lineHeight: 1.8, maxWidth: 400 }}>
              {c.heroSubtitle}
            </p>

            {canceled && <p style={{ color: RED, marginBottom: 16, fontSize: 14 }}>{c.canceledMsg}</p>}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <input type="email" placeholder={c.nlEmailPlaceholder} value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(false); }}
                  onKeyDown={e => e.key === "Enter" && startCheckout()}
                  style={{ padding: "15px 18px", borderRadius: 14, border: `1px solid ${emailError ? RED : BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, width: 210, outline: "none", backdropFilter: "blur(8px)", transition: "border-color .2s" }} />
                <GlowBtn onClick={() => startCheckout("standard", "hero")} disabled={loading} gradient>
                  {loading ? c.redirecting : c.ctaBtnCreate}
                </GlowBtn>
              </div>
              <a href={lang === "en" ? "/en/exemples" : "/exemples"}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: MUTED, fontWeight: 600, letterSpacing: 0.2, textDecoration: "none" }}>
                <span style={{ color: VIO, fontSize: 11 }}>▶</span>
                {c.ctaBtnDemo}
              </a>
            </div>
            {emailError && <p style={{ color: RED, fontSize: 13, fontWeight: 600, marginTop: 10 }}>{c.emailError}</p>}
          </div>

          {/* RIGHT — CINEMATIC LIGHT COMPOSITION */}
          <div className="hero-scene" style={{ flexShrink: 0, width: 420, position: "relative" }}>

            {/* Outer ambient glow */}
            <div style={{ position: "absolute", inset: -40, borderRadius: 50, background: "radial-gradient(ellipse at 45% 65%, rgba(232,92,58,0.22) 0%, rgba(168,85,247,0.14) 45%, transparent 72%)", filter: "blur(28px)", pointerEvents: "none" }} />

            {/* SVG film-grain filter (hidden, referenced by id) */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <filter id="hgrain" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise" />
                  <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                  <feComposite in="SourceGraphic" in2="grayNoise" operator="in" result="masked" />
                  <feBlend in="SourceGraphic" in2="masked" mode="screen" />
                </filter>
              </defs>
            </svg>

            {/* Main cinematic frame */}
            <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", aspectRatio: "4/5", background: "#04020a", border: "1px solid rgba(168,85,247,0.18)", boxShadow: "0 0 80px rgba(168,85,247,0.18), 0 0 40px rgba(232,92,58,0.12), 0 56px 120px rgba(0,0,0,0.9)" }}>

              {/* ── ATMOSPHERE ─────────────────────────────── */}

              {/* Sunset bloom — rises from bottom center */}
              <div style={{ position: "absolute", bottom: "-8%", left: "50%", transform: "translateX(-50%)", width: "170%", height: "58%", background: "radial-gradient(ellipse at 50% 100%, rgba(232,92,58,0.72) 0%, rgba(200,55,15,0.35) 38%, rgba(232,92,58,0.08) 65%, transparent 80%)", filter: "blur(40px)", pointerEvents: "none" }} />

              {/* Violet sky canopy */}
              <div style={{ position: "absolute", top: "-6%", left: "50%", transform: "translateX(-50%)", width: "150%", height: "50%", background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.6) 0%, rgba(110,40,190,0.25) 42%, transparent 72%)", filter: "blur(36px)", pointerEvents: "none" }} />

              {/* Horizon color bleed — warm meeting cool */}
              <div style={{ position: "absolute", top: "44%", left: 0, right: 0, height: "14%", background: "linear-gradient(90deg, rgba(232,92,58,0.12) 0%, rgba(168,85,247,0.16) 50%, rgba(232,92,58,0.12) 100%)", filter: "blur(22px)", pointerEvents: "none" }} />

              {/* ── CITY BOKEH (upper 40%) ──────────────────── */}
              {[
                { x: 6,  y: 6,  s: 2,   o: 0.6,  c: "#ff8c42" },
                { x: 14, y: 11, s: 1.5, o: 0.45, c: "#fff"     },
                { x: 22, y: 5,  s: 3,   o: 0.5,  c: "#a855f7" },
                { x: 31, y: 14, s: 2,   o: 0.55, c: "#ff8c42" },
                { x: 40, y: 7,  s: 1.5, o: 0.4,  c: "#fff"     },
                { x: 49, y: 10, s: 3.5, o: 0.38, c: "#a855f7" },
                { x: 57, y: 5,  s: 2,   o: 0.52, c: "#ff8c42" },
                { x: 66, y: 13, s: 1.5, o: 0.45, c: "#fff"     },
                { x: 75, y: 6,  s: 3,   o: 0.42, c: "#a855f7" },
                { x: 83, y: 11, s: 2.5, o: 0.58, c: "#ff8c42" },
                { x: 91, y: 7,  s: 2,   o: 0.4,  c: "#fff"     },
                { x: 97, y: 15, s: 1.5, o: 0.35, c: "#a855f7" },
                { x: 10, y: 22, s: 1.5, o: 0.3,  c: "#ff8c42" },
                { x: 27, y: 25, s: 2,   o: 0.32, c: "#fff"     },
                { x: 46, y: 20, s: 1.5, o: 0.28, c: "#a855f7" },
                { x: 63, y: 23, s: 2,   o: 0.35, c: "#ff8c42" },
                { x: 80, y: 21, s: 1.5, o: 0.3,  c: "#fff"     },
                { x: 93, y: 26, s: 2.5, o: 0.33, c: "#a855f7" },
                { x: 18, y: 34, s: 1,   o: 0.2,  c: "#ff8c42" },
                { x: 38, y: 31, s: 1,   o: 0.18, c: "#fff"     },
                { x: 58, y: 35, s: 1,   o: 0.2,  c: "#a855f7" },
                { x: 76, y: 32, s: 1.5, o: 0.18, c: "#ff8c42" },
              ].map(({ x, y, s, o, c }, i) => (
                <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: "50%", background: c, opacity: o, pointerEvents: "none" }} />
              ))}

              {/* ── CHARACTER PRESENCES ─────────────────────── */}

              {/* Person 1 — left, warm orange rim (woman, slightly behind) */}
              <div style={{ position: "absolute", bottom: "4%", left: "6%", width: "34%", height: "66%", background: "radial-gradient(ellipse at 45% 12%, rgba(255,130,55,0.38) 0%, rgba(232,92,58,0.18) 32%, transparent 68%)", filter: "blur(22px)", pointerEvents: "none" }} />
              {/* Dark silhouette column — person 1 */}
              <div style={{ position: "absolute", bottom: "4%", left: "16%", width: "12%", height: "60%", background: "linear-gradient(to top, rgba(4,2,10,0.97) 0%, rgba(6,3,14,0.88) 55%, rgba(8,4,18,0.4) 85%, transparent 100%)", borderRadius: "48% 48% 0 0", filter: "blur(1px)", pointerEvents: "none" }} />
              {/* Head glow — person 1 */}
              <div style={{ position: "absolute", bottom: "60%", left: "17%", width: "10%", paddingTop: "12%", background: "radial-gradient(ellipse at 50% 50%, rgba(255,130,55,0.22) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(6px)", pointerEvents: "none" }} />

              {/* Person 2 — right, cool violet rim (man, closer/larger) */}
              <div style={{ position: "absolute", bottom: "0%", right: "4%", width: "40%", height: "78%", background: "radial-gradient(ellipse at 52% 10%, rgba(168,85,247,0.42) 0%, rgba(130,60,210,0.2) 36%, transparent 70%)", filter: "blur(24px)", pointerEvents: "none" }} />
              {/* Dark silhouette column — person 2 */}
              <div style={{ position: "absolute", bottom: "0%", right: "13%", width: "15%", height: "72%", background: "linear-gradient(to top, rgba(4,2,10,0.98) 0%, rgba(6,3,14,0.9) 50%, rgba(8,4,18,0.45) 82%, transparent 100%)", borderRadius: "45% 45% 0 0", filter: "blur(1.5px)", pointerEvents: "none" }} />
              {/* Head glow — person 2 */}
              <div style={{ position: "absolute", bottom: "68%", right: "14%", width: "12%", paddingTop: "14%", background: "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.28) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(8px)", pointerEvents: "none" }} />

              {/* Space between figures — tension light thread */}
              <div style={{ position: "absolute", bottom: 0, left: "28%", right: "28%", height: "72%", background: "linear-gradient(to top, rgba(255,110,40,0.14) 0%, rgba(232,92,58,0.07) 35%, transparent 65%)", filter: "blur(12px)", pointerEvents: "none" }} />

              {/* ── OVERLAYS ────────────────────────────────── */}

              {/* Radial vignette */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 38%, transparent 22%, rgba(4,2,10,0.5) 72%, rgba(4,2,10,0.88) 100%)", pointerEvents: "none" }} />

              {/* Subtle scanline texture */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)", pointerEvents: "none" }} />

              {/* ── MIXEUR NARRATIF PANEL ───────────────────── */}
              <div style={{ position: "absolute", top: 18, right: 16, background: "rgba(4,2,10,0.92)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: 14, padding: "13px 15px", backdropFilter: "blur(24px)", boxShadow: "0 0 20px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.04)", minWidth: 128 }}>
                <p style={{ fontSize: 7, fontWeight: 800, letterSpacing: 3.5, textTransform: "uppercase", color: "rgba(168,85,247,0.7)", marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>MIXEUR NARRATIF</p>
                {[
                  { label: lang === "fr" ? "Romance"  : "Romance", pct: 70, color: "#e879f9" },
                  { label: lang === "fr" ? "Tension"  : "Tension", pct: 90, color: RED        },
                  { label: lang === "fr" ? "Mystère"  : "Mystery", pct: 60, color: VIO        },
                ].map(({ label, pct, color }) => (
                  <div key={label} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.42)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{label}</span>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.85, flexShrink: 0 }} />
                    </div>
                    <div style={{ height: 2.5, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}55, ${color}dd)`, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* SCALE — Créez à toutes les échelles */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "72px 40px", background: "linear-gradient(180deg, rgba(168,85,247,0.03) 0%, transparent 60%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: VIO, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>{c.scaleLabel}</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, color: TEXT, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12 }}>{c.scaleTitle}</h2>
          <p style={{ color: MUTED, fontSize: 15, marginBottom: 48, lineHeight: 1.7, maxWidth: 500, margin: "12px auto 52px" }}>{c.scaleSub}</p>

          {/* Steps — ascending flow */}
          <div style={{ display: "flex", gap: 0, alignItems: "flex-end", justifyContent: "center", flexWrap: "wrap", rowGap: 12 }}>
            {c.scaleSteps.map((step, i) => {
              const height = 72 + i * 18;
              return (
                <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, position: "relative" }}>
                  {/* Connector line */}
                  {i < c.scaleSteps.length - 1 && (
                    <div style={{ position: "absolute", right: 0, bottom: height - 2, width: "50%", height: 1.5, background: `linear-gradient(90deg, ${step.color}40, ${c.scaleSteps[i+1].color}40)`, pointerEvents: "none" }} />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 14px", width: 128, borderTop: `2px solid ${step.color}55`, background: `${step.color}08`, marginTop: "auto", height, justifyContent: "flex-start", borderRadius: "10px 10px 0 0", transition: "all .2s" }}>
                    <span style={{ fontSize: 22, marginBottom: 8 }}>{step.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: step.color, letterSpacing: 0.3, textAlign: "center", lineHeight: 1.2, marginBottom: 5 }}>{step.label}</span>
                    <span style={{ fontSize: 10, color: MUTED, textAlign: "center", lineHeight: 1.35 }}>{step.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tagline under steps */}
          <p style={{ fontSize: 13, color: MUTED, marginTop: 40, fontStyle: "italic", letterSpacing: 0.3 }}>
            {lang === "fr"
              ? "Le créateur TikTok d'aujourd'hui peut devenir le showrunner de demain."
              : "Today's TikTok creator can become tomorrow's showrunner."}
          </p>
        </div>
      </div>

      {/* HOW IT WORKS — 5 niveaux */}
      <div className="sec" style={{ padding: "88px 40px", borderTop: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: RED, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>{c.howLabel}</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 900, color: TEXT, letterSpacing: -1.5, lineHeight: 1.05, textAlign: "center", marginBottom: 12 }}>
            {c.howTitle}
          </h2>
          <p style={{ color: MUTED, fontSize: 15, textAlign: "center", maxWidth: 480, margin: "12px auto 60px", lineHeight: 1.7 }}>{c.howSub}</p>

          {/* Steps */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 27, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom, ${RED}50, ${VIO}50)`, pointerEvents: "none" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {c.howSteps.map((step, i) => (
                <div key={step.n} style={{ display: "flex", gap: 32, paddingBottom: i < c.howSteps.length - 1 ? 36 : 0, alignItems: "flex-start" }}>
                  {/* Circle */}
                  <div style={{ width: 54, height: 54, borderRadius: "50%", background: `${step.color}12`, border: `1.5px solid ${step.color}45`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, position: "relative", boxShadow: `0 0 16px ${step.color}18` }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: step.color, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0.5 }}>{step.n}</span>
                  </div>

                  {/* Content */}
                  <div className="grid-2" style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, paddingTop: 6 }}>
                    {/* Left: what you do */}
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 900, color: TEXT, letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.1 }}>
                        {step.emoji}&nbsp;&nbsp;{step.title}
                      </h3>
                      <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                        <span style={{ color: step.color, fontWeight: 700 }}>
                          {lang === "fr" ? "Toi · " : "You · "}
                        </span>
                        {step.you}
                      </p>
                    </div>
                    {/* Right: what AI does */}
                    <div style={{ background: `${step.color}07`, border: `1px solid ${step.color}20`, borderRadius: 14, padding: "14px 18px" }}>
                      <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: step.color, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>{c.howAiLabel}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        {step.ai.map((item, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: step.color, flexShrink: 0, opacity: 0.8 }} />
                            <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.3 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <div style={{ textAlign: "center", marginTop: 56, paddingTop: 40, borderTop: `1px solid ${BORDER}` }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(17px, 2vw, 22px)", fontStyle: "italic", color: "rgba(255,255,255,0.4)", letterSpacing: -0.3 }}>
              {c.howTagline}
            </p>
          </div>

        </div>
      </div>

      {/* CLIFFHANGERS */}
      <div className="sec" style={{ padding: "80px 40px", background: "linear-gradient(180deg, rgba(168,85,247,0.04) 0%, transparent 100%)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.cliffhangersLabel}</Label>
          <Title>{lang === "fr" ? "Chaque épisode se termine" : "Every episode ends"}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{lang === "fr" ? "par une scène impossible à ignorer." : "with a scene impossible to ignore."}</span></Title>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 15, maxWidth: 520, margin: "12px auto 52px", lineHeight: 1.7 }}>{c.cliffhangersCaption}</p>

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {c.cliffExamples.map(({ genre, emoji, color, hook, scene, cliff, next }) => (
              <div key={genre} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />

                {/* Genre badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: 18 }}>{emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color, padding: "3px 10px", background: `${color}12`, border: `1px solid ${color}25`, borderRadius: 6 }}>{genre}</span>
                </div>

                {/* Hook */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>HOOK</p>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: TEXT, fontStyle: "italic", lineHeight: 1.4 }}>{hook}</p>
                </div>

                {/* Scene */}
                <div style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2px solid ${BORDER}` }}>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>{scene}</p>
                </div>

                {/* Cliffhanger */}
                <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 12, padding: "12px 14px" }}>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color, marginBottom: 6 }}>CLIFFHANGER</p>
                  <p style={{ fontSize: 13, color: TEXT, lineHeight: 1.7, fontWeight: 500 }}>{cliff}</p>
                </div>

                {/* Next episode badge */}
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 0.5 }}>{next}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADDICTION NARRATIVE */}
      <div className="mock-phone-section" style={{ padding: "100px 40px", borderTop: `1px solid ${BORDER}`, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "30%", left: "20%", width: 500, height: 500, background: "radial-gradient(circle, rgba(232,92,58,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "15%", width: 600, height: 600, background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="addiction-layout" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 64, alignItems: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: 320, flexShrink: 0 }}>
            <Label color={VIO}>{c.addictionLabel}</Label>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 900, color: TEXT, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
              {c.addictionTitle1}<br />
              <span style={{ fontStyle: "italic", color: MUTED }}>{c.addictionTitle2}</span>
            </h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>{c.addictionBody}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: c.statWatchTime, value: "94%", color: VIO },
                { label: c.statComments, value: "2.1k", color: RED },
                { label: c.statReturn, value: "78%", color: VIO },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  <span style={{ fontSize: 12, color: MUTED }}>{label}</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 900, color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: -80, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div style={{ width: 255, borderRadius: 36, overflow: "hidden", background: "#080610", boxShadow: "0 0 0 1px rgba(168,85,247,0.28), 0 0 60px rgba(168,85,247,0.18), 0 48px 100px rgba(0,0,0,0.85)", position: "relative", zIndex: 1 }}>
              <div style={{ height: 26, background: "#050308", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 56, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2 }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "9/16", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0818 0%, #1a0828 45%, #0d0818 100%)" }} />
                <div style={{ position: "relative", zIndex: 2, padding: "14px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>{c.phoneSeriesTitle}</div>
                    <div style={{ fontSize: 8, color: VIO, fontWeight: 700 }}>{c.phoneEpisode}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: RED, animation: "pulse 1.5s infinite" }} />
                    <span style={{ fontSize: 7, color: RED, fontWeight: 800, letterSpacing: 1 }}>LIVE</span>
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: -0.5, marginBottom: 14, textShadow: "0 0 40px rgba(168,85,247,0.5)" }}>
                    {c.phoneQuote.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, padding: "0 16px 10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", fontWeight: 600 }}>{c.phoneProgress}</span>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", fontWeight: 600 }}>94%</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 1 }}>
                    <div style={{ width: "94%", height: "100%", background: `linear-gradient(90deg, ${VIO}, ${RED})`, borderRadius: 1 }} />
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, padding: "8px 16px 14px", display: "flex", justifyContent: "space-around", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {[["❤️","47.2k"],["💬","2.1k"],["🔗",c.phoneShare],["▶️",c.phoneNext]].map(([icon, val], i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <span style={{ fontSize: 13 }}>{icon}</span>
                      <span style={{ fontSize: 7, color: i === 3 ? VIO : "rgba(255,255,255,0.4)", fontWeight: i === 3 ? 800 : 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 18, background: "#050308", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 72, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
              </div>
            </div>
          </div>

          <div className="comments-col" style={{ width: 210, flexShrink: 0, height: 420, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 64, background: `linear-gradient(to bottom, ${DARK}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: `linear-gradient(to top, ${DARK}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ animation: "scrollComments 22s linear infinite", display: "flex", flexDirection: "column", gap: 10 }}>
              {c.phoneComments.map((comment, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "10px 12px", flexShrink: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: comment.color }}>@{comment.user}</span>
                    <span style={{ fontSize: 9, color: MUTED }}>❤️ {comment.likes}</span>
                  </div>
                  <p style={{ fontSize: 12, color: TEXT, lineHeight: 1.45, margin: 0 }}>{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE STRIP */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1 }}>
          {c.featLabels.map(({ emoji, label, sub }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "16px 12px", borderRight: i < c.featLabels.length - 1 ? `1px solid ${BORDER}` : "none", textAlign: "center" }}>
              <span style={{ fontSize: 22 }}>{emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: TEXT, lineHeight: 1.2 }}>{label}</span>
              <span style={{ fontSize: 10, color: MUTED, lineHeight: 1.4 }}>{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderBottom: `1px solid ${BORDER}`, padding: "16px 0", background: "rgba(255,255,255,0.01)", userSelect: "none" }}>
        <div style={{ display: "flex", gap: 0, animation: "marquee 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(2)].map((_, rep) => (
            c.marqueeItems.map((t, i) => (
              <span key={`${rep}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 20px", fontSize: 13, fontWeight: 600, color: i % 3 === 0 ? TEXT : MUTED, letterSpacing: 0.5 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: i % 5 === 0 ? RED : i % 5 === 2 ? VIO : BORDER, display: "inline-block", flexShrink: 0 }} />
                {t}
              </span>
            ))
          ))}
        </div>
      </div>

      {/* PLATFORMS */}
      <div className="sec" style={{ padding: "56px 40px", borderBottom: `1px solid ${BORDER}`, textAlign: "center", background: "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(232,92,58,0.04) 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: TEXT, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12 }}>{c.platformsTitle}</h2>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 40, maxWidth: 520, margin: "12px auto 40px" }}>{c.platformsSubtitle}</p>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, opacity: 0.6, marginBottom: 20 }}>{c.socialNetworks}</p>
        <div className="platform-row" style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 44 }}>
          {[
            { Icon: TikTokIcon, name: "TikTok", color: "#69C9D0", sub: "For You Page" },
            { Icon: ReelsIcon, name: "Instagram Reels", color: VIO, sub: "Explore & Feed" },
            { Icon: ShortsIcon, name: "YouTube Shorts", color: RED, sub: "Shorts Feed" },
          ].map(({ Icon, name, color, sub }) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: `${color}12`, border: `1px solid ${color}28`, display: "flex", alignItems: "center", justifyContent: "center", color, animation: "float 4s ease-in-out infinite" }}>
                <Icon size={34} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{name}</p>
                <p style={{ fontSize: 12, color: MUTED }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, opacity: 0.6, marginBottom: 16 }}>{c.microDramaPlat}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {[
            { name: "DramaBox", color: "#f59e0b" },
            { name: "ReelShort", color: "#e879f9" },
            { name: "Crazy Maple", color: "#34d399" },
            { name: "FlexTV", color: "#60a5fa" },
            { name: "GoodShort", color: VIO },
            { name: "MoboReels", color: RED },
          ].map(({ name, color }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 7, background: `${color}0f`, border: `1px solid ${color}25`, borderRadius: 10, padding: "8px 16px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BIBLE COMPLETE */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.bibleLabel}</Label>
          <Title>{c.bibleTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.bibleTitle2}</span></Title>
          <Image
            src={c.imgBible}
            alt="Bible complète — titre, logline, personnages, séquencier"
            width={1329}
            height={1183}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.12), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }}
          />
        </div>
      </div>

      {/* MOCK PHONE */}
      <div className="mock-phone" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px", display: "flex", justifyContent: "center", alignItems: "center", gap: 80 }}>
        <div style={{ maxWidth: 340 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: RED, marginBottom: 16 }}>{c.readyToShoot}</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: TEXT, letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 20 }}>
            {c.scriptTitle1}<br /><span style={{ fontStyle: "italic", color: MUTED }}>{c.scriptTitle2}</span>
          </h2>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.75 }}>{c.scriptBody}</p>
        </div>
        <div style={{ position: "relative", flexShrink: 0, maxWidth: 300 }}>
          <div style={{ position: "absolute", inset: -40, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,92,58,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <Image
            src={c.imgScript}
            alt="Script à l'écran — Mode Tournage VerticalClap"
            width={481}
            height={500}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 48px 80px rgba(0,0,0,0.8)" }}
          />
        </div>
      </div>

      {/* VIRAL STATS */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={RED}>{c.viralLabel}</Label>
          <Title>{c.viralTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.viralTitle2}</span></Title>
          <Image
            src={c.imgViral}
            alt="Conçu pour percer — 1 épisode = 1 cliffhanger, TikTok Reels Shorts"
            width={1024}
            height={1536}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.12), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }}
          />
        </div>
      </div>

      {/* LE MIXEUR */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={RED}>{c.mixerLabel}</Label>
          <Title>{lang === "fr" ? "Ton studio narratif," : "Your narrative studio,"}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{lang === "fr" ? "organisé en 4 onglets." : "organized in 4 tabs."}</span></Title>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 15, maxWidth: 520, margin: "12px auto 52px", lineHeight: 1.7 }}>
            {lang === "fr"
              ? "Chaque paramètre à sa place. Le bouton Générer toujours visible."
              : "Every parameter in its place. The Generate button always visible."}
          </p>

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
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 22 }}>{emoji}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color }}>{tab}</span>
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
                { emoji: "⚡", label: lang === "fr" ? "Vertical" : "Vertical", color: "#E85C3A" },
                { emoji: "🎭", label: lang === "fr" ? "Série" : "Series", color: "#a855f7" },
                { emoji: "💗", label: "K-Drama", color: "#ec4899" },
                { emoji: "🔪", label: "Thriller", color: "#f97316" },
                { emoji: "❤️", label: "Romance", color: "#e879a0" },
                { emoji: "🌑", label: "Dark Drama", color: "#64748b" },
              ].map(({ emoji, label, color }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${color}40`, background: `${color}10`, minWidth: 80 }}>
                  <span style={{ fontSize: 20 }}>{emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color, whiteSpace: "nowrap" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POUR QUI */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={RED}>{c.forYouLabel}</Label>
          <Title>{c.forYouTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.forYouTitle2}</span></Title>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 16, maxWidth: 540, margin: "12px auto 56px", lineHeight: 1.7 }}>
            {lang === "fr"
              ? "Un seul outil pour toutes les étapes de ta carrière créative."
              : "One tool for every stage of your creative career."}
          </p>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {c.forYouProfiles.map(({ emoji, title, sub, color }, i) => (
              <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 24, padding: "36px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>
                  {emoji}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 900, color: TEXT, marginBottom: 12, letterSpacing: -0.3, lineHeight: 1.2 }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75 }}>{sub}</p>
                <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color }}>
                  {i === 0 ? (lang === "fr" ? "⚡ Plan Creator" : "⚡ Creator plan") : i === 1 ? (lang === "fr" ? "🎭 Plan Storyteller" : "🎭 Storyteller plan") : (lang === "fr" ? "🎭 Plan Storyteller" : "🎭 Storyteller plan")}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: i === 2 ? 32 : 8, height: 8, borderRadius: 4, background: i === 0 ? "#E85C3A" : i === 1 ? "#f97316" : "#a855f7", opacity: i === 2 ? 1 : 0.4 }} />
            ))}
            <span style={{ fontSize: 12, color: MUTED, marginLeft: 8 }}>
              {lang === "fr" ? "Commencez là où vous êtes. Évoluez à votre rythme." : "Start where you are. Grow at your pace."}
            </span>
          </div>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.pipelineLabel}</Label>
          <Title>{c.pipelineTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.pipelineTitle2}</span></Title>
          <Image src={c.imgPipeline} alt="Le pipeline créatif — du concept au tournage en 5 étapes" width={824} height={489} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: "100%", height: "auto", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.1), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
        </div>
      </div>

      {/* VARIATIONS */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.variationsLabel}</Label>
          <Title>{c.variationsTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.variationsTitle2}</span></Title>
          <Image src={c.imgVariations} alt="3 variations par script — Intense, Subtil, Rapide" width={1254} height={1254} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: "100%", height: "auto", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
        </div>
      </div>

      {/* PRICING */}
      <div id="tarifs" className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Label color={VIO}>{c.pricingLabel}</Label>
          <Title>{c.pricingTitle}</Title>

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
                { id: "creator", emoji: "⚡", label: c.planStandard, price: billing === "annual" ? "7.5€" : "9€", color: RED },
                { id: "storyteller", emoji: "🎭", label: c.planPremium, price: billing === "annual" ? "14.9€" : "19€", color: VIO, badge: "⭐" },
              ].map(tab => {
                const active = planTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setPlanTab(tab.id)} style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "13px 8px", borderRadius: 13, border: "none",
                    background: active ? (tab.id === "storyteller" ? `linear-gradient(135deg, ${RED}22, ${VIO}22)` : `${RED}18`) : "transparent",
                    boxShadow: active ? `inset 0 0 0 1.5px ${tab.color}55` : "none",
                    cursor: "pointer", transition: "all .2s", fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 16 }}>{tab.emoji}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: active ? tab.color : MUTED }}>{tab.label}</span>
                      {tab.badge && <span style={{ fontSize: 11 }}>{tab.badge}</span>}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: active ? TEXT : MUTED }}>{tab.price}<span style={{ fontWeight: 400, fontSize: 11 }}>{c.perMonth}</span></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Creator plan */}
          {planTab === "creator" && (
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              <div className="glass" style={{ borderRadius: 24, padding: "36px 32px", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: `linear-gradient(90deg, ${RED}, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: MUTED, textTransform: "uppercase", marginBottom: 6 }}>{c.planStandard}</p>
                    {c.planStandardSub && <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.4, opacity: 0.7 }}>{c.planStandardSub}</p>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
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
                  <button onClick={() => setPlanTab("storyteller")} style={{ background: "none", border: "none", color: VIO, fontWeight: 700, cursor: "pointer", fontSize: 11, padding: 0 }}>Voir Storyteller →</button>
                </p>
              </div>
            </div>
          )}

          {/* Storyteller plan */}
          {planTab === "storyteller" && (
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              <div style={{ borderRadius: 24, padding: "36px 32px", position: "relative", background: "rgba(168,85,247,0.04)", border: "1.5px solid rgba(168,85,247,0.28)", boxShadow: "0 0 48px rgba(168,85,247,0.08)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: `linear-gradient(90deg, ${VIO}, ${RED})` }} />
                <div style={{ position: "absolute", top: -13, right: 24, background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: 1.5 }}>{c.recommendedBadge}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: VIO, textTransform: "uppercase", marginBottom: 6 }}>{c.planPremium}</p>
                    {c.planPremiumSub && <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.4, opacity: 0.7 }}>{c.planPremiumSub}</p>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
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
          )}

          <div className="trust-row" style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 28 }}>
            {c.trustItems.map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: MUTED }}>
                <span style={{ color: "#4ade80", fontSize: 14 }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: MUTED, marginTop: 16 }}>
            {c.tryFreeText1}<a href={lang === "en" ? "/en/exemples" : "/exemples"} style={{ color: VIO, fontWeight: 600 }}>{c.tryFreeLink}</a>{c.tryFreeText2}
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Label color={RED}>{c.faqLabel}</Label>
          <Title>{c.faqTitle}</Title>
          <div style={{ marginTop: 48 }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, paddingRight: 16 }}>{item.q}</span>
                  <span style={{ color: VIO, fontSize: 22, flexShrink: 0, transition: "transform .2s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, paddingBottom: 20 }}>{item.r}</p>}
              </div>
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
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 900, color: TEXT, letterSpacing: -0.3, lineHeight: 1.3, marginBottom: 12, flex: 1 }}>{post.title}</h3>
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
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, marginBottom: 20, letterSpacing: -2, lineHeight: 1.0 }}>
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
            <GlowBtn onClick={() => startCheckout("standard", "cta_final")} disabled={loading} gradient>
              {loading ? c.redirecting : c.ctaBtn}
            </GlowBtn>
          </div>
          <div className="trust-row" style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {c.ctaFinalTrustItems.map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: MUTED }}>
                <span style={{ color: "#4ade80" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

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
              {["TikTok", "Reels", "Shorts", "DramaBox", "ReelShort"].map(p => (
                <span key={p} style={{ fontSize: 10, color: MUTED, background: SURFACE, border: `1px solid ${BORDER}`, padding: "3px 8px", borderRadius: 6, fontWeight: 500 }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
