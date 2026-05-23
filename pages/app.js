import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { jsPDF } from "jspdf";

// ── CONFIG ──────────────────────────────────────────────────
const OPTS = {
  fr: {
    casting: ["1 Femme + 1 Homme", "2 Femmes", "2 Hommes", "Trio mixte", "Femme seule", "Homme seul", "Quartet mixte", "2 Teenagers", "Teenager + Adulte", "Trio Teenagers"],
    univers_fast: ["Hôpital privé", "Milieu corporate", "Famille recomposée", "Mode & Influence", "Sport élite", "Lycée & Secrets", "Immobilier de luxe", "Réseau social viral", "Télévision & Célébrité", "Collège & Cliques", "Fête de lycée", "Compétition scolaire", "TikTok House", "Villa de vacances", "Star Academy", "Pensionnat", "Mariage catastrophe", "Hôpital", "Yacht de riches", "Tournage de film", "Teen mom", "Mariée disparue", "Famille toxique", "Concours de beauté", "Pop star", "K-pop trainees", "Apocalypse"],
    univers_prem: ["Start-up IA", "Finance internationale", "Héritage familial", "Politique & Pouvoir", "Pharma & Biotech", "Armée & Services secrets", "Justice & Tribunal", "Immobilier & Blanchiment", "Cinéma & Pouvoir", "Diplomatie internationale", "Expérience secrète", "Procès", "True crime", "Miroir maléfique", "Boucle temporelle"],
    secret_fast: ["Trahison amoureuse", "Double vie", "Vengeance planifiée", "Enfant caché", "Identité volée", "Grossesse cachée", "Faillite secrète", "Addiction dissimulée", "Passé criminel", "Relation interdite au lycée", "Triche scolaire organisée", "Gang secret entre ados"],
    secret_prem: ["Sabotage interne", "Espionnage industriel", "Héritage volé", "Manipulation psychologique", "Complot financier", "Corruption judiciaire", "Chantage politique", "Meurtre maquillé", "Faux témoin", "Dette de sang"],
  },
  en: {
    casting: ["1 Woman + 1 Man", "2 Women", "2 Men", "Mixed trio", "Woman alone", "Man alone", "Mixed quartet", "2 Teenagers", "Teen + Adult", "Teen trio"],
    univers_fast: ["Private hospital", "Corporate world", "Blended family", "Fashion & Influence", "Elite sport", "High school secrets", "Luxury real estate", "Viral social media", "TV & Celebrity", "College cliques", "House party", "Academic competition", "TikTok House", "Holiday villa", "Star Academy", "Boarding school", "Wedding disaster", "Hospital", "Luxury yacht", "Film set", "Teen mom", "Missing bride", "Toxic family", "Beauty contest", "Pop star", "K-pop trainees", "Apocalypse"],
    univers_prem: ["AI startup", "International finance", "Family inheritance", "Politics & Power", "Pharma & Biotech", "Military & Secret services", "Law & Courtroom", "Real estate & Laundering", "Film & Power", "International diplomacy", "Secret experiment", "Trial", "True crime", "Evil mirror", "Time loop"],
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
    revelation: "💥 Révélation", revelation_sub: "Insère un secret explosif dans le script",
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
    tropes_label: "💘 Tropes", tropes_sub: "— injecte les codes narratifs qui cartonnent",
    tropes_romance: "Romance", tropes_drama: "Drama",
    casting_ia_label: "🎭 Casting IA", casting_ia_sub: "— donne une identité forte à tes personnages",
    casting_ia_age: "ans",
    logout: "Déconnexion", custom: "✏️ Perso.",
    choose_lang: "Choisir la langue", back: "← Retour", my_series_title: "Mes Séries",
    affiche_title: "🎨 Dossier de présentation", affiche_sub: "Ton kit visuel complet — affiche + direction artistique + image IA",
    affiche_loading: "Création de la direction artistique…",
    affiche_sec1_title: "01 — Affiche de présentation", affiche_sec1_sub: "Imprime-la ou joins-la à ton PDF d'épisodes pour présenter ta série.",
    affiche_sec2_title: "02 — Direction artistique", affiche_sec2_sub: "L'ambiance visuelle de ta série — pour briefer un DA, un graphiste ou une IA.",
    affiche_sec3_title: "03 — Générer l'image de couverture", affiche_sec3_sub: "Copie ce prompt et colle-le dans Midjourney, DALL-E (ChatGPT), Gemini ou Ideogram pour générer l'affiche.",
    affiche_copy: "📋 Copier le prompt", affiche_tools: "Midjourney → /imagine + colle · ChatGPT → \"Génère cette image :\" + colle · Gemini → même chose",
    vc_presents: "VERTICAL CLAP PRESENTS",
    social_title: "📱 Contenu Social", social_loading: "Génération du contenu social…",
    social_tiktok_legend: "📣 Légende TikTok", social_copy: "Copier",
    social_sms: "💬 SMS entre personnages", social_comments: "🎵 Commentaires TikTok",
    gen_bible: "Création de la bible de la série…",
    gen_episodes: "Génération des épisodes…",
    gen_episodes_batch: "Épisodes %a–%b générés… (%c/%d)",
    premium_titles: "Les titres viraux sont réservés au plan Premium.",
    premium_variations: "Les variations sont réservées au plan Premium.",
    loading_cartes: "Création des fiches personnages…",
    loading_titres: "Analyse de la viralité…",
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
    revelation: "💥 Revelation", revelation_sub: "Drop an explosive secret into the script",
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
    tropes_label: "💘 Tropes", tropes_sub: "— inject the narrative codes that go viral",
    tropes_romance: "Romance", tropes_drama: "Drama",
    casting_ia_label: "🎭 Casting IA", casting_ia_sub: "— give your characters a powerful identity",
    casting_ia_age: "yo",
    logout: "Sign out", custom: "✏️ Custom",
    choose_lang: "Choose language", back: "← Back", my_series_title: "My Series",
    affiche_title: "🎨 Presentation kit", affiche_sub: "Your complete visual kit — poster + art direction + AI image",
    affiche_loading: "Creating art direction…",
    affiche_sec1_title: "01 — Presentation poster", affiche_sec1_sub: "Print it or attach it to your episode PDF to present your series.",
    affiche_sec2_title: "02 — Art direction", affiche_sec2_sub: "Your series visual identity — to brief a designer, an art director, or an AI.",
    affiche_sec3_title: "03 — Generate cover image", affiche_sec3_sub: "Copy this prompt and paste it into Midjourney, DALL-E (ChatGPT), Gemini or Ideogram to generate the poster.",
    affiche_copy: "📋 Copy prompt", affiche_tools: "Midjourney → /imagine + paste · ChatGPT → \"Generate this image:\" + paste · Gemini → same",
    vc_presents: "VERTICAL CLAP PRESENTS",
    social_title: "📱 Social Content", social_loading: "Generating social content…",
    social_tiktok_legend: "📣 TikTok Caption", social_copy: "Copy",
    social_sms: "💬 SMS between characters", social_comments: "🎵 TikTok Comments",
    gen_bible: "Creating series bible…",
    gen_episodes: "Generating episodes…",
    gen_episodes_batch: "Episodes %a–%b generated… (%c/%d)",
    premium_titles: "Viral titles are reserved for Premium plan.",
    premium_variations: "Variations are reserved for Premium plan.",
    loading_cartes: "Creating character profiles…",
    loading_titres: "Analysing virality…",
  },
};

// ── CASTING IA ───────────────────────────────────────────────
const CASTING_CATS = [
  { id: "romance", emoji: "❤️", label: { fr: "Romance", en: "Romance" } },
  { id: "teen",    emoji: "🔥", label: { fr: "Teen Drama", en: "Teen Drama" } },
  { id: "elite",   emoji: "👑", label: { fr: "Luxe & Élite", en: "Luxury" } },
  { id: "thriller",emoji: "🩸", label: { fr: "Thriller", en: "Thriller" } },
  { id: "scifi",   emoji: "🤖", label: { fr: "Sci-Fi", en: "Sci-Fi" } },
  { id: "horror",  emoji: "👻", label: { fr: "Horreur", en: "Horror" } },
];
const CASTING_IA = [
  // ❤️ ROMANCE
  { id: "garcon-timide",     cat:"romance", emoji:"🥺", auraTag:"fragile",      label:{fr:"Garçon timide",         en:"Shy boy"},             age:"20-24", desc:{fr:"ne sait pas comment dire qu'il aime — mais fait mille petites choses pour le montrer",             en:"doesn't know how to say he loves — but does a thousand small things to show it"} },
  { id: "fille-inaccessible",cat:"romance", emoji:"🌙", auraTag:"mystérieux",   label:{fr:"Fille inaccessible",    en:"Unreachable girl"},     age:"22-26", desc:{fr:"tout le monde la désire, personne ne la connaît vraiment — elle a construit des murs",            en:"everyone desires her, no one truly knows her — she built walls"} },
  { id: "sportif-arrogant",  cat:"romance", emoji:"🏆", auraTag:"dominant",     label:{fr:"Sportif arrogant",      en:"Arrogant athlete"},     age:"22-25", desc:{fr:"champion habitué à tout obtenir — déstabilisé par la première personne qui lui dit non",           en:"champion used to getting everything — destabilized by the first person who says no"} },
  { id: "romantique-malad",  cat:"romance", emoji:"🌹", auraTag:"solaire",      label:{fr:"Romantique maladroit",  en:"Clumsy romantic"},      age:"19-23", desc:{fr:"croit encore aux grands gestes — se plante à chaque fois mais n'abandonne jamais",                en:"still believes in grand gestures — fails every time but never gives up"} },
  { id: "voisin-myst",       cat:"romance", emoji:"🚪", auraTag:"mystérieux",   label:{fr:"Voisin mystérieux",     en:"Mysterious neighbor"},  age:"24-28", desc:{fr:"sort à des heures étranges, répond à aucune question — mais protège sans qu'on lui demande",       en:"leaves at strange hours, answers nothing — but protects without being asked"} },
  { id: "libraire",          cat:"romance", emoji:"📚", auraTag:"mélancolique", label:{fr:"Libraire introverti",   en:"Introverted bookseller"},age:"25-30", desc:{fr:"connaît tout des histoires d'amour fictives — incapable de vivre la sienne",                       en:"knows everything about fictional love stories — unable to live his own"} },
  { id: "artiste-torturé",   cat:"romance", emoji:"🎨", auraTag:"chaotique",    label:{fr:"Artiste torturé",       en:"Tortured artist"},      age:"22-28", desc:{fr:"crée des œuvres sublimes sur sa douleur — et sa douleur, c'est toi",                              en:"creates sublime works about his pain — and his pain is you"} },
  { id: "prince",            cat:"romance", emoji:"👑", auraTag:"royal",        label:{fr:"Prince héritier",       en:"Crown prince"},         age:"24-30", desc:{fr:"doit épouser pour le pays, tombe amoureux pour lui — les deux sont incompatibles",                  en:"must marry for the country, falls in love for himself — both are incompatible"} },
  { id: "influenceuse-fragile",cat:"romance",emoji:"📱",auraTag:"fragile",      label:{fr:"Influenceuse fragile",  en:"Fragile influencer"},   age:"20-24", desc:{fr:"des millions de followers mais personne qui la connaît — craque en privé",                         en:"millions of followers, no one who truly knows her — breaks down in private"} },
  { id: "etudiante-pauvre",  cat:"romance", emoji:"📖", auraTag:"solaire",      label:{fr:"Étudiante pauvre",      en:"Poor student"},         age:"20-23", desc:{fr:"intelligente et fière dans un monde qui favorise les riches — refuse toute aide par dignité",        en:"smart and proud in a world that favors the rich — refuses any help out of dignity"} },
  { id: "chef-intense",      cat:"romance", emoji:"🍴", auraTag:"dominant",     label:{fr:"Chef cuisinier intense", en:"Intense chef"},        age:"28-35", desc:{fr:"obsédé par la perfection jusqu'à oublier de vivre — sa cuisine est l'amour qu'il ne peut exprimer autrement", en:"obsessed with perfection to the point of forgetting to live — his cooking is love he can't express otherwise"} },
  { id: "bodyguard",         cat:"romance", emoji:"🛡️",auraTag:"protecteur",   label:{fr:"Bodyguard silencieux",  en:"Silent bodyguard"},     age:"26-32", desc:{fr:"a fait vœu de rester dans l'ombre — mais ne peut pas empêcher ce qu'il ressent",                  en:"sworn to stay in the shadows — but can't prevent what he feels"} },
  // 🔥 TEEN DRAMA
  { id: "reine-lycee",       cat:"teen",    emoji:"💅", auraTag:"dominant",     label:{fr:"Reine du lycée",        en:"Queen bee"},            age:"16-18", desc:{fr:"règne par la peur et les rumeurs — mais son empire repose sur un secret qui peut tout détruire",     en:"rules through fear and rumors — but her empire rests on a secret that could destroy everything"} },
  { id: "nerd-invisible",    cat:"teen",    emoji:"👓", auraTag:"mystérieux",   label:{fr:"Nerd invisible",        en:"Invisible nerd"},       age:"16-18", desc:{fr:"voit tout ce qui se passe dans le lycée — accumule les informations jusqu'au jour où il s'en sert", en:"sees everything happening in school — accumulates information until the day he uses it"} },
  { id: "skateur",           cat:"teen",    emoji:"🛹", auraTag:"chaotique",    label:{fr:"Skateur rebelle",       en:"Rebel skater"},         age:"16-19", desc:{fr:"refuse toutes les règles sauf les siennes — son attitude cache une sensibilité rare",               en:"refuses all rules except his own — his attitude hides a rare sensitivity"} },
  { id: "gothique",          cat:"teen",    emoji:"🖤", auraTag:"mélancolique", label:{fr:"Fille gothique",        en:"Gothic girl"},          age:"16-18", desc:{fr:"les autres pensent qu'elle est effrayante — elle est juste la seule à avoir compris que la vie est tragique", en:"others think she's scary — she just understood first that life is tragic"} },
  { id: "capitaine",         cat:"teen",    emoji:"⚽", auraTag:"dominant",     label:{fr:"Capitaine d'équipe",    en:"Team captain"},         age:"17-19", desc:{fr:"toute la pression sur les épaules — le seul à savoir qu'il ne veut plus jouer",                    en:"all the pressure on his shoulders — the only one who knows he doesn't want to play anymore"} },
  { id: "premier-classe",    cat:"teen",    emoji:"🏅", auraTag:"fragile",      label:{fr:"Premier de la classe",  en:"Top of the class"},     age:"16-18", desc:{fr:"perfection construite pour ses parents — intérieur en train d'imploser",                          en:"perfection built for his parents — inside about to implode"} },
  { id: "influenceur-fake",  cat:"teen",    emoji:"🤳", auraTag:"chaotique",    label:{fr:"Influenceur fake",      en:"Fake influencer"},      age:"17-20", desc:{fr:"ment sur tout ce qu'il est pour les followers — ne sait plus qui il est vraiment",                 en:"lies about everything he is for followers — no longer knows who he really is"} },
  { id: "ado-riche",         cat:"teen",    emoji:"💳", auraTag:"mélancolique", label:{fr:"Ado ultra riche",       en:"Ultra-rich teen"},      age:"16-18", desc:{fr:"a tout sauf ce qu'il veut vraiment — l'attention d'un parent qui n't est jamais là",              en:"has everything except what he truly wants — a parent's attention"} },
  { id: "boursier",          cat:"teen",    emoji:"📝", auraTag:"solaire",      label:{fr:"Élève boursier",        en:"Scholarship student"},  age:"16-18", desc:{fr:"dans une école de riches grâce à ses notes — refuse de se laisser écraser",                       en:"in a rich school thanks to his grades — refuses to be crushed"} },
  { id: "solitaire",         cat:"teen",    emoji:"🌧️",auraTag:"mystérieux",   label:{fr:"Fille solitaire",       en:"Loner girl"},           age:"15-17", desc:{fr:"a choisi d'être seule après une trahison — observe tout le monde avec une intensité qui fait peur",  en:"chose solitude after a betrayal — watches everyone with unsettling intensity"} },
  { id: "hacker-teen",       cat:"teen",    emoji:"💻", auraTag:"imprévisible", label:{fr:"Hacker discret",        en:"Quiet hacker"},         age:"16-19", desc:{fr:"sait des choses sur tout le monde — la question c'est ce qu'il va en faire",                      en:"knows things about everyone — the question is what he's going to do with it"} },
  // 👑 LUXE / ÉLITE
  { id: "heritier",          cat:"elite",   emoji:"🥂", auraTag:"dominant",     label:{fr:"Héritier arrogant",     en:"Arrogant heir"},        age:"24-30", desc:{fr:"né avec tout — peur secrète de ne rien valoir sans l'argent",                                     en:"born with everything — secret fear of being worthless without the money"} },
  { id: "ceo",               cat:"elite",   emoji:"👔", auraTag:"froid",        label:{fr:"CEO froid",             en:"Cold CEO"},             age:"32-40", desc:{fr:"a tout sacrifié pour le pouvoir — cherche quelque chose qu'il ne peut pas acheter",                 en:"sacrificed everything for power — looking for something he can't buy"} },
  { id: "femme-affaires",    cat:"elite",   emoji:"💼", auraTag:"dominant",     label:{fr:"Femme d'affaires glaciale", en:"Ice queen exec"},   age:"30-38", desc:{fr:"a dû être deux fois meilleure pour être prise au sérieux — maintenant elle écrase tout le monde",  en:"had to be twice as good to be taken seriously — now she crushes everyone"} },
  { id: "fils-politique",    cat:"elite",   emoji:"🏛️",auraTag:"imprévisible", label:{fr:"Fils de politicien",    en:"Politician's son"},     age:"22-28", desc:{fr:"son nom ouvre toutes les portes et ferme toutes ses libertés",                                      en:"his name opens every door and closes all his freedoms"} },
  { id: "jetsetteuse",       cat:"elite",   emoji:"✈️", auraTag:"mystérieux",   label:{fr:"Jet-setteuse",          en:"Jet-setter"},           age:"23-28", desc:{fr:"vit dans des hôtels 5 étoiles partout dans le monde — n'a jamais eu de chez-soi",                  en:"lives in 5-star hotels around the world — never had a home"} },
  { id: "mannequin",         cat:"elite",   emoji:"👗", auraTag:"fragile",      label:{fr:"Mannequin",             en:"Model"},                age:"20-26", desc:{fr:"vendu·e comme image depuis l'enfance — le corps comme prison dorée",                               en:"sold as an image since childhood — the body as a golden cage"} },
  { id: "star-montante",     cat:"elite",   emoji:"⭐", auraTag:"chaotique",    label:{fr:"Star montante",         en:"Rising star"},          age:"21-26", desc:{fr:"sur le point de tout avoir — terrifiée que ça disparaisse du jour au lendemain",                   en:"about to have everything — terrified it could vanish overnight"} },
  { id: "avocat-manip",      cat:"elite",   emoji:"⚖️", auraTag:"dangereux",    label:{fr:"Avocat manipulateur",   en:"Manipulative lawyer"},  age:"28-36", desc:{fr:"a appris que la vérité est une construction — maintenant il en joue sur tout le monde",           en:"learned truth is a construction — now plays it on everyone"} },
  // 🩸 THRILLER
  { id: "detective",         cat:"thriller",emoji:"🔍", auraTag:"mélancolique", label:{fr:"Détective fatigué",     en:"Tired detective"},      age:"38-50", desc:{fr:"a vu trop d'horreurs — tient debout uniquement parce qu'il n'a pas encore résolu cette affaire", en:"has seen too many horrors — still standing only because this case isn't closed"} },
  { id: "journaliste-obs",   cat:"thriller",emoji:"🎙️",auraTag:"chaotique",    label:{fr:"Journaliste obsessionnelle", en:"Obsessive journalist"}, age:"28-36", desc:{fr:"sacrifiera tout pour la vérité — y compris elle-même",                                    en:"will sacrifice everything for the truth — including herself"} },
  { id: "amnesique",         cat:"thriller",emoji:"🌫️",auraTag:"fragile",      label:{fr:"Femme amnésique",       en:"Amnesiac woman"},       age:"25-35", desc:{fr:"son passé est un trou noir — chaque souvenir retrouvé est pire que l'ignorance",                  en:"her past is a black hole — every recovered memory is worse than the ignorance"} },
  { id: "voisin-etrange",    cat:"thriller",emoji:"👁️",auraTag:"dangereux",    label:{fr:"Voisin inquiétant",     en:"Unsettling neighbor"},  age:"30-45", desc:{fr:"poli en surface, regard qui ne clignote jamais — que fait-il la nuit ?",                         en:"polite on the surface, eyes that never blink — what does he do at night?"} },
  { id: "gourou",            cat:"thriller",emoji:"🕯️",auraTag:"dominant",     label:{fr:"Gourou sectaire",       en:"Cult leader"},          age:"35-50", desc:{fr:"donne l'impression d'avoir toutes les réponses — et il en profite",                               en:"gives the impression of having all the answers — and takes advantage of it"} },
  { id: "faux-gentil",       cat:"thriller",emoji:"😇", auraTag:"dangereux",    label:{fr:"Faux gentil",           en:"Fake nice guy"},        age:"25-35", desc:{fr:"tout le monde l'adore — le spectateur voit ce que les autres ne voient pas encore",               en:"everyone loves him — the audience sees what others don't yet"} },
  { id: "survivante",        cat:"thriller",emoji:"🦋", auraTag:"imprévisible", label:{fr:"Survivante",            en:"Survivor"},             age:"25-40", desc:{fr:"a traversé l'enfer — cherche soit la paix soit la vengeance, elle n't a pas décidé",               en:"has been through hell — seeks either peace or revenge, not decided yet"} },
  { id: "psychologue-manip", cat:"thriller",emoji:"🧠", auraTag:"dangereux",    label:{fr:"Psychologue manipulateur", en:"Manipulative therapist"}, age:"35-45", desc:{fr:"utilise ce que ses patients confient comme arme — pour leur bien ou le sien ?",          en:"uses patients' confessions as a weapon — for their good or his own?"} },
  // 🤖 SCI-FI
  { id: "androide",          cat:"scifi",   emoji:"🤖", auraTag:"fragile",      label:{fr:"Androïde émotionnel",   en:"Emotional android"},    age:"∞",     desc:{fr:"programmé pour servir — a développé des émotions que ses créateurs n'avaient pas prévues",        en:"programmed to serve — developed emotions its creators never anticipated"} },
  { id: "clone",             cat:"scifi",   emoji:"👥", auraTag:"mélancolique", label:{fr:"Clone imparfait",       en:"Imperfect clone"},      age:"22-30", desc:{fr:"copie d'un original qui vit mieux — cherche ce qui le rend unique",                              en:"copy of an original living better — searching for what makes him unique"} },
  { id: "influenceur-virt",  cat:"scifi",   emoji:"💫", auraTag:"fragile",      label:{fr:"Influenceur virtuel",   en:"Virtual influencer"},   age:"20-25", desc:{fr:"existe uniquement en ligne — commence à vouloir exister vraiment",                                en:"exists only online — starts wanting to truly exist"} },
  { id: "soldat-aug",        cat:"scifi",   emoji:"⚙️", auraTag:"mélancolique", label:{fr:"Soldat augmenté",       en:"Augmented soldier"},    age:"25-35", desc:{fr:"corps modifié pour tuer — cherche ce qui lui reste d'humain",                                    en:"body modified to kill — searching for what's left that's human"} },
  { id: "hackeuse-cyber",    cat:"scifi",   emoji:"💻", auraTag:"chaotique",    label:{fr:"Hackeuse cyberpunk",    en:"Cyberpunk hacker"},     age:"22-28", desc:{fr:"vit dans les marges du système — la seule qui voit vraiment comment tout fonctionne",            en:"lives in the margins of the system — the only one who truly sees how it works"} },
  { id: "ia-humaine",        cat:"scifi",   emoji:"🌐", auraTag:"mystérieux",   label:{fr:"IA humaine",            en:"Human AI"},             age:"∞",     desc:{fr:"si avancée qu'on ne sait plus si elle souffre vraiment ou simule — elle non plus",               en:"so advanced no one knows if she truly suffers or simulates — including herself"} },
  // 👻 HORREUR
  { id: "medium",            cat:"horror",  emoji:"🔮", auraTag:"mystérieux",   label:{fr:"Médium",                en:"Medium"},               age:"25-40", desc:{fr:"voit ce que les autres ne voient pas — voudrait désespérément ne plus voir",                      en:"sees what others don't — desperately wishes she could stop"} },
  { id: "ado-possedee",      cat:"horror",  emoji:"😈", auraTag:"dangereux",    label:{fr:"Adolescente possédée",  en:"Possessed teen"},       age:"14-17", desc:{fr:"était la plus douce — ce qui la contrôle maintenant est son opposé exact",                       en:"was the sweetest — what controls her now is the exact opposite"} },
  { id: "garcon-etrange",    cat:"horror",  emoji:"🌀", auraTag:"dangereux",    label:{fr:"Garçon étrange",        en:"Strange boy"},           age:"10-14", desc:{fr:"ne pleure jamais, ne rit jamais — dit des choses impossibles à savoir",                          en:"never cries, never laughs — says things impossible to know"} },
  { id: "pretre",            cat:"horror",  emoji:"⛪", auraTag:"mélancolique", label:{fr:"Prêtre brisé",          en:"Broken priest"},         age:"45-60", desc:{fr:"a perdu la foi en affrontant quelque chose qu'il ne peut pas expliquer",                         en:"lost his faith facing something he cannot explain"} },
  { id: "final-girl",        cat:"horror",  emoji:"🔦", auraTag:"imprévisible", label:{fr:"Final girl",            en:"Final girl"},            age:"17-22", desc:{fr:"l'innocente qui survit — mais survivre lui coûte quelque chose qu'elle ne récupérera jamais",     en:"the innocent who survives — but surviving costs her something she'll never get back"} },
  { id: "youtubeur-parano",  cat:"horror",  emoji:"📹", auraTag:"chaotique",    label:{fr:"Youtubeur paranormal",  en:"Paranormal Youtuber"},  age:"20-26", desc:{fr:"cherchait des vues — a trouvé quelque chose de réel",                                             en:"was looking for views — found something real"} },
];

const CASTING_PHYSIQUE = [
  { id: "musclé",      emoji: "💪", label: { fr: "Musclé·e",        en: "Muscular" } },
  { id: "mince",       emoji: "🌿", label: { fr: "Mince",           en: "Slim" } },
  { id: "rond",        emoji: "🌊", label: { fr: "Rond·e / Curvy",  en: "Curvy" } },
  { id: "grand",       emoji: "📏", label: { fr: "Très grand·e",    en: "Very tall" } },
  { id: "petit",       emoji: "🍄", label: { fr: "Petit·e",         en: "Short" } },
  { id: "prothese",    emoji: "🦿", label: { fr: "Prothèse visible", en: "Visible prosthetic" } },
  { id: "fauteuil",    emoji: "♿", label: { fr: "Fauteuil roulant", en: "Wheelchair user" } },
  { id: "cicatrices",  emoji: "⚔️", label: { fr: "Cicatrices",      en: "Scars" } },
  { id: "vitiligo",    emoji: "🌓", label: { fr: "Vitiligo",         en: "Vitiligo" } },
  { id: "albinisme",   emoji: "🤍", label: { fr: "Albinisme",        en: "Albinism" } },
];
const CASTING_CULTURE = [
  { id: "française",  emoji: "🇫🇷", label: { fr: "Française",    en: "French" } },
  { id: "coréenne",   emoji: "🇰🇷", label: { fr: "Coréenne",     en: "Korean" } },
  { id: "maghrébine", emoji: "🌙",  label: { fr: "Maghrébine",   en: "Maghrebi" } },
  { id: "afro",       emoji: "✊",  label: { fr: "Afro",          en: "Afro" } },
  { id: "latina",     emoji: "🌺",  label: { fr: "Latino·a",      en: "Latino/a" } },
  { id: "japonaise",  emoji: "🇯🇵", label: { fr: "Japonaise",    en: "Japanese" } },
  { id: "indienne",   emoji: "🪷",  label: { fr: "Indienne",      en: "Indian" } },
  { id: "italienne",  emoji: "🇮🇹", label: { fr: "Italienne",    en: "Italian" } },
  { id: "brésilienne",emoji: "🇧🇷", label: { fr: "Brésilienne",  en: "Brazilian" } },
  { id: "mixte",      emoji: "🌍",  label: { fr: "Mixte",         en: "Mixed" } },
  { id: "diaspora",   emoji: "🧳",  label: { fr: "Diaspora",      en: "Diaspora" } },
];
const CASTING_AESTHETIC = [
  { id: "soft-girl",   emoji: "🌸", label: { fr: "Soft girl",     en: "Soft girl" } },
  { id: "goth",        emoji: "🖤", label: { fr: "Goth",           en: "Goth" } },
  { id: "luxury",      emoji: "💎", label: { fr: "Luxury",         en: "Luxury" } },
  { id: "grunge",      emoji: "🎸", label: { fr: "Grunge",         en: "Grunge" } },
  { id: "y2k",         emoji: "🌀", label: { fr: "Y2K",            en: "Y2K" } },
  { id: "old-money",   emoji: "🎀", label: { fr: "Old money",      en: "Old money" } },
  { id: "streetwear",  emoji: "👟", label: { fr: "Streetwear",     en: "Streetwear" } },
  { id: "coquette",    emoji: "🩷", label: { fr: "Coquette",       en: "Coquette" } },
  { id: "biker",       emoji: "🏍️",label: { fr: "Biker",          en: "Biker" } },
  { id: "kawaii",      emoji: "🎀", label: { fr: "Kawaii",         en: "Kawaii" } },
  { id: "cyberpunk",   emoji: "🔋", label: { fr: "Cyberpunk",      en: "Cyberpunk" } },
  { id: "dark-fem",    emoji: "🌹", label: { fr: "Dark feminine",  en: "Dark feminine" } },
  { id: "clean",       emoji: "🤍", label: { fr: "Clean girl",     en: "Clean girl" } },
  { id: "punk",        emoji: "🔩", label: { fr: "Punk",           en: "Punk" } },
  { id: "vintage",     emoji: "📻", label: { fr: "Vintage",        en: "Vintage" } },
];
const CASTING_BLESSURE = [
  { id: "jalousie",       emoji: "💚", label: { fr: "Hyper jaloux·se",           en: "Hyper jealous" } },
  { id: "incapable",      emoji: "💔", label: { fr: "Incapable d'aimer",          en: "Unable to love" } },
  { id: "attention",      emoji: "📢", label: { fr: "Besoin maladif d'attention", en: "Attention addict" } },
  { id: "abandon",        emoji: "🌧️",label: { fr: "Peur de l'abandon",          en: "Fear of abandonment" } },
  { id: "menteur",        emoji: "🎭", label: { fr: "Menteur·se compulsif·ve",    en: "Compulsive liar" } },
  { id: "empathie",       emoji: "🫂", label: { fr: "Trop empathique",            en: "Too empathetic" } },
  { id: "autodestructeur",emoji: "🌪️",label: { fr: "Autodestructeur·rice",       en: "Self-destructive" } },
  { id: "controle",       emoji: "🔒", label: { fr: "Besoin de tout contrôler",   en: "Control freak" } },
  { id: "trauma",         emoji: "🌊", label: { fr: "Trauma caché",               en: "Hidden trauma" } },
  { id: "colere",         emoji: "🔥", label: { fr: "Colère profonde",            en: "Deep rage" } },
];
const CASTING_AURA = [
  { id: "dangereux",    emoji: "⚡", label: { fr: "Dangereux·se",   en: "Dangerous" } },
  { id: "solaire",      emoji: "☀️", label: { fr: "Solaire",        en: "Radiant" } },
  { id: "toxique",      emoji: "☠️", label: { fr: "Toxique",        en: "Toxic" } },
  { id: "mystérieux",   emoji: "🌑", label: { fr: "Mystérieux·se",  en: "Mysterious" } },
  { id: "innocent",     emoji: "🕊️",label: { fr: "Innocent·e",     en: "Innocent" } },
  { id: "dominant",     emoji: "👑", label: { fr: "Dominant·e",     en: "Dominant" } },
  { id: "fragile",      emoji: "🫧", label: { fr: "Fragile",        en: "Fragile" } },
  { id: "chaotique",    emoji: "🌀", label: { fr: "Chaotique",      en: "Chaotic" } },
  { id: "mélancolique", emoji: "🌧️",label: { fr: "Mélancolique",   en: "Melancholic" } },
  { id: "royal",        emoji: "💎", label: { fr: "Royal·e",        en: "Royal" } },
  { id: "sexy",         emoji: "🔥", label: { fr: "Sexy",           en: "Sexy" } },
  { id: "froid",        emoji: "🧊", label: { fr: "Froid·e",        en: "Cold" } },
  { id: "protecteur",   emoji: "🛡️",label: { fr: "Protecteur·rice", en: "Protective" } },
  { id: "imprévisible", emoji: "🎲", label: { fr: "Imprévisible",   en: "Unpredictable" } },
];

// compatibility rules: based on selected archetype aura tags
function getCompatibility(auras, lang) {
  if (auras.length < 2) return null;
  const rules = [
    { a: "dangereux",   b: "fragile",     type: "🔥", fr: "Passion explosive",       en: "Explosive passion" },
    { a: "dominant",    b: "fragile",     type: "⚠️", fr: "Relation toxique probable",en: "Likely toxic relationship" },
    { a: "dangereux",   b: "innocent",    type: "🔥", fr: "Attirance irrésistible",   en: "Irresistible attraction" },
    { a: "mystérieux",  b: "solaire",     type: "💔", fr: "Amour impossible",         en: "Impossible love" },
    { a: "chaotique",   b: "dominant",    type: "🩸", fr: "Trahison probable",        en: "Betrayal likely" },
    { a: "mélancolique",b: "solaire",     type: "💔", fr: "Amour déchirant",          en: "Heartbreaking love" },
    { a: "royal",       b: "solaire",     type: "🔥", fr: "Passion romantique",       en: "Romantic passion" },
    { a: "froid",       b: "fragile",     type: "⚠️", fr: "Relation destructrice",    en: "Destructive relationship" },
    { a: "imprévisible",b: "protecteur",  type: "🩸", fr: "Trahison inévitable",      en: "Inevitable betrayal" },
    { a: "toxique",     b: "innocent",    type: "⚠️", fr: "Jeu de manipulation",      en: "Manipulation game" },
    { a: "mélancolique",b: "chaotique",   type: "🔥", fr: "Connexion dangereuse",     en: "Dangerous connection" },
    { a: "dominant",    b: "dominant",    type: "🩸", fr: "Guerre de pouvoir",        en: "Power war" },
    { a: "fragile",     b: "fragile",     type: "💔", fr: "Les deux se brisent",      en: "Both will break" },
  ];
  for (const r of rules) {
    if ((auras.includes(r.a) && auras.includes(r.b)) || (auras.includes(r.b) && auras.includes(r.a))) {
      return { type: r.type, label: lang === "en" ? r.en : r.fr };
    }
  }
  return { type: "💫", label: lang === "en" ? "Interesting dynamic" : "Dynamique intéressante" };
}

// ── TROPES ──────────────────────────────────────────────────
const TROPES = [
  { id: "enemies-to-lovers",  cat: "romance", emoji: "⚔️", label: { fr: "Ennemis → Amants",   en: "Enemies to lovers"  }, instr: "enemies to lovers: les personnages se détestent avant de tomber amoureux — tension sexuelle déguisée en haine" },
  { id: "fake-dating",        cat: "romance", emoji: "🎭", label: { fr: "Faux couple",          en: "Fake dating"        }, instr: "fake dating: ils font semblant d'être ensemble pour une raison externe — et finissent par vraiment tomber amoureux" },
  { id: "forbidden-love",     cat: "romance", emoji: "🚫", label: { fr: "Amour interdit",       en: "Forbidden love"     }, instr: "forbidden love: leur relation est impossible (famille, classe sociale, secret) mais irrésistible" },
  { id: "friends-to-lovers",  cat: "romance", emoji: "🤝", label: { fr: "Amis → Amants",        en: "Friends to lovers"  }, instr: "friends to lovers: l'amitié bascule — l'un cache ses sentiments depuis longtemps" },
  { id: "grumpy-sunshine",    cat: "romance", emoji: "☀️", label: { fr: "Grumpy × Sunshine",    en: "Grumpy × Sunshine"  }, instr: "grumpy x sunshine: personnage froid/cynique vs personnage rayonnant/optimiste — opposés qui s'attirent" },
  { id: "revenge",            cat: "drama",   emoji: "🔪", label: { fr: "Vengeance",             en: "Revenge"            }, instr: "revenge: un personnage a tout perdu à cause d'un autre — chaque épisode rapproche du règlement de comptes final" },
  { id: "secret-child",       cat: "drama",   emoji: "👶", label: { fr: "Enfant caché",          en: "Secret child"       }, instr: "secret child: un enfant existe sans que l'autre parent le sache — révélation explosive en cours de série" },
  { id: "hidden-identity",    cat: "drama",   emoji: "🎭", label: { fr: "Identité cachée",       en: "Hidden identity"    }, instr: "hidden identity: un personnage n'est pas celui qu'il prétend être — fausse identité, infiltré, double vie" },
  { id: "betrayal",           cat: "drama",   emoji: "🗡️", label: { fr: "Trahison",              en: "Betrayal"           }, instr: "betrayal: la trahison vient de l'intérieur — l'allié de confiance est le vrai ennemi" },
  { id: "obsession",          cat: "drama",   emoji: "👁️", label: { fr: "Obsession",             en: "Obsession"          }, instr: "obsession: un personnage est consumé par un autre — amour toxique, stalking, possession émotionnelle" },
];

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
  {
    id: "pack-netflix", emoji: "🎬", mode: "premium",
    label: { fr: "Pack Netflix", en: "Netflix Pack" },
    desc: { fr: "Écriture ciné — silences lourds, dilemmes moraux, personnages à double fond.", en: "Cinematic writing — heavy silences, moral dilemmas, layered characters." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Cinéma & Pouvoir", en: "Film & Power" }, secret: { fr: "Manipulation psychologique", en: "Psychological manipulation" },
    genre: "Drame cinématographique", ambiance: "🎬 Cinématographique & Contemplatif",
    tropes: "slow burn, ambiguïté morale, personnage en quête de rédemption, retournement de situation, monologue puissant, révélation de backstory, fin ouverte, anti-héros attachant, sacrifice inattendu",
  },
  {
    id: "pack-euphoria", emoji: "🌈", mode: "fast",
    label: { fr: "Pack Euphoria", en: "Euphoria Pack" },
    desc: { fr: "Néons + teen drama — addiction, trauma, amitiés toxiques et fêtes qui déraillent.", en: "Neon + teen drama — addiction, trauma, toxic friendships and parties gone wrong." },
    casting: { fr: "Trio Teenagers", en: "Teen trio" }, univers: { fr: "Lycée & Secrets", en: "High school secrets" }, secret: { fr: "Addiction dissimulée", en: "Concealed addiction" },
    genre: "Teen drama néon", ambiance: "⚡ Intense & Direct",
    tropes: "addiction cachée, fête qui déraille, trauma d'enfance révélé, voix off introspective, esthétique néon, amitié qui vire à la toxicité, identité de genre, relation prof-élève, secrets de famille explosifs",
  },
  {
    id: "pack-squid-game", emoji: "🟩", mode: "premium",
    label: { fr: "Pack Squid Game", en: "Squid Game Pack" },
    desc: { fr: "Défis à enjeux mortels, trahisons calculées, argent contre dignité.", en: "High-stakes challenges, calculated betrayals, money versus dignity." },
    casting: { fr: "Trio mixte", en: "Mixed trio" }, univers: { fr: "Expérience secrète", en: "Secret experiment" }, secret: { fr: "Dette de sang", en: "Blood debt" },
    genre: "Survival drama", ambiance: "🧠 Psychologique & Lent",
    tropes: "jeu de survie mortel, alliance fragile, trahison au dernier moment, règles cachées révélées progressivement, désespoir financier, sacrifice d'un allié, identité masquée, organisateur mystérieux, twist sur l'organisateur",
  },
  {
    id: "pack-gossip-girl", emoji: "💌", mode: "fast",
    label: { fr: "Pack Gossip Girl", en: "Gossip Girl Pack" },
    desc: { fr: "Voix off mystérieuse, élite toxique, scandales qui explosent — XOXO.", en: "Mystery voiceover, toxic elite, exploding scandals — XOXO." },
    casting: { fr: "Trio mixte", en: "Mixed trio" }, univers: { fr: "Mode & Influence", en: "Fashion & Influence" }, secret: { fr: "Double vie", en: "Double life" },
    genre: "Drama élite avec voix off", ambiance: "💜 Émotionnel & Poétique",
    tropes: "voix off omnisciente et mystérieuse, commérage explosif, identité secrète du narrateur, rivalité entre héritières, trahison entre meilleurs amis, scandale médiatique, vie de façade vs réalité, romance interdite dans l'élite",
  },
  {
    id: "pack-black-mirror", emoji: "📲", mode: "premium",
    label: { fr: "Pack Black Mirror", en: "Black Mirror Pack" },
    desc: { fr: "Technologie qui dérape — réseaux comme arme, identité volée, surveillance totale.", en: "Technology gone wrong — social media as weapon, stolen identity, total surveillance." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Boucle temporelle", en: "Time loop" }, secret: { fr: "Identité volée", en: "Stolen identity" },
    genre: "Techno-thriller dystopique", ambiance: "🧠 Psychologique & Lent",
    tropes: "réseau social transformé en arme de destruction, identité numérique volée ou clonée, surveillance de masse découverte, twist technologique en fin d'épisode, déshumanisation progressive, réalité augmentée qui piège, boucle temporelle avec conséquences, IA malveillante cachée",
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
  const [castingCat, setCastingCat] = useState("romance");

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

        {/* Casting IA */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>
            {t.casting_ia_label} <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>{t.casting_ia_sub}</span>
          </p>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
            {CASTING_CATS.map(c => {
              const cLabel = c.label[lang] || c.label.fr;
              return (
                <button key={c.id} onClick={() => setCastingCat(c.id)} style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 100, border: `1.5px solid ${castingCat === c.id ? "var(--r)" : "var(--bo)"}`, background: castingCat === c.id ? "var(--r)" : "var(--card)", color: castingCat === c.id ? "#fff" : "var(--tx)", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "var(--sans)" }}>
                  {c.emoji} {cLabel}
                </button>
              );
            })}
          </div>
          {/* Archetype grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
            {CASTING_IA.filter(a => a.cat === castingCat).map(a => {
              const aLabel = a.label[lang] || a.label.fr;
              const aDesc = a.desc[lang] || a.desc.fr;
              const active = (state.castingIA || []).includes(a.id);
              return (
                <button key={a.id} onClick={() => set(prev => {
                  const sel = prev.castingIA || [];
                  return { castingIA: active ? sel.filter(x => x !== a.id) : [...sel, a.id] };
                })} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "11px 12px", borderRadius: 14, border: `2px solid ${active ? "var(--r)" : "var(--bo)"}`, background: active ? "rgba(232,92,58,0.08)" : "var(--card)", cursor: "pointer", fontFamily: "var(--sans)", textAlign: "left", transition: "all .15s", gap: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontSize: 24 }}>{a.emoji}</span>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: active ? "var(--r)" : "var(--bo)", color: active ? "#fff" : "var(--mt)", fontWeight: 700 }}>{a.age}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: active ? "var(--r)" : "var(--tx)", lineHeight: 1.2 }}>{aLabel}</div>
                  <div style={{ fontSize: 10, color: "var(--mt)", lineHeight: 1.4, fontStyle: "italic" }}>{aDesc}</div>
                </button>
              );
            })}
          </div>
          {/* Compatibility badge */}
          {(() => {
            const selAuras = (state.castingIA || []).map(id => CASTING_IA.find(a => a.id === id)?.auraTag).filter(Boolean);
            const compat = getCompatibility(selAuras, lang);
            return compat ? (
              <div style={{ background: "var(--card)", border: "1.5px solid var(--bo)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{compat.type}</span>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--mt)", marginBottom: 2 }}>Compatibilité IA</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--tx)" }}>{compat.label}</p>
                </div>
              </div>
            ) : null;
          })()}
          {/* Modifiers */}
          {[
            { key: "physique",   mods: CASTING_PHYSIQUE,  label: { fr: "🧬 Morphologie",           en: "🧬 Body type" } },
            { key: "culture",    mods: CASTING_CULTURE,   label: { fr: "🌍 Origine culturelle",     en: "🌍 Cultural origin" } },
            { key: "aesthetic",  mods: CASTING_AESTHETIC, label: { fr: "✨ Esthétique",             en: "✨ Aesthetic" } },
            { key: "blessure",   mods: CASTING_BLESSURE,  label: { fr: "💔 Défauts & Blessures",    en: "💔 Flaws & Wounds" } },
            { key: "aura",       mods: CASTING_AURA,      label: { fr: "✨ Aura",                   en: "✨ Aura" } },
          ].map(({ key, mods, label }) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--mt)", marginBottom: 8 }}>{label[lang] || label.fr}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {mods.map(m => {
                  const mLabel = m.label[lang] || m.label.fr;
                  const active = (state.castingMods?.[key] || []).includes(m.id);
                  return (
                    <button key={m.id} onClick={() => set(prev => {
                      const cur = prev.castingMods?.[key] || [];
                      const next = active ? cur.filter(x => x !== m.id) : [...cur, m.id];
                      return { castingMods: { ...(prev.castingMods || {}), [key]: next } };
                    })} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 100, border: `1.5px solid ${active ? "var(--n)" : "var(--bo)"}`, background: active ? "var(--n)22" : "var(--card)", color: active ? "var(--n)" : "var(--tx)", cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 400, fontFamily: "var(--sans)", transition: "all .15s" }}>
                      <span>{m.emoji}</span><span>{mLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tropes */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>
            {t.tropes_label} <span style={{ fontSize: 10, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>{t.tropes_sub}</span>
          </p>
          {[{ cat: "romance", label: `💘 ${t.tropes_romance}` }, { cat: "drama", label: `🎭 ${t.tropes_drama}` }].map(({ cat, label: catLabel }) => (
            <div key={cat} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--mt)", marginBottom: 8 }}>{catLabel}</p>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {TROPES.filter(tr => tr.cat === cat).map(tr => {
                  const tLabel = typeof tr.label === "object" ? (tr.label[lang] || tr.label.fr) : tr.label;
                  const active = (state.tropesSel || []).includes(tr.id);
                  return (
                    <button key={tr.id} onClick={() => set(prev => {
                      const sel = prev.tropesSel || [];
                      return { tropesSel: active ? sel.filter(x => x !== tr.id) : [...sel, tr.id] };
                    })} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 100, border: `1.5px solid ${active ? (cat === "romance" ? "#e879a0" : "var(--n)") : "var(--bo)"}`, background: active ? (cat === "romance" ? "#e879a022" : "var(--n)22") : "var(--card)", color: active ? (cat === "romance" ? "#e879a0" : "var(--n)") : "var(--tx)", cursor: "pointer", fontSize: 12, fontWeight: active ? 700 : 500, fontFamily: "var(--sans)", transition: "all .15s" }}>
                      <span>{tr.emoji}</span>
                      <span>{tLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
      const r = await gen("titres", { titre: bible.titre, logline: bible.logline, pitch: bible.pitch, mode, lang }, customerId);
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
      const r = await gen("cartes", { personnages: bible.personnages || [], titre: bible.titre, genre: bible.genre, lang }, customerId);
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
              ? () => alert(t.premium_titles)
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
                <p>{t.loading_cartes}</p>
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
                <p>{t.loading_titres}</p>
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
            <button onClick={() => onEdit("revelation")} disabled={loading} style={{ width: "100%", marginBottom: 10, padding: "14px 16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #E85C3A, #c0392b)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 800, fontFamily: "var(--sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 18px rgba(232,92,58,0.35)" }}>
              <span>{t.revelation}</span>
              <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.85 }}>— {t.revelation_sub}</span>
            </button>
            <button onClick={plan === "standard" ? () => alert(t.premium_variations) : onVariations} disabled={loading} style={{ background: "var(--card)", color: plan === "standard" ? "var(--mt)" : "var(--tx)", border: "1.5px solid var(--bo)", padding: 14, borderRadius: 12, width: "100%", fontSize: 14, fontWeight: 600, cursor: plan === "standard" ? "not-allowed" : "pointer", marginBottom: 10, fontFamily: "var(--sans)", opacity: plan === "standard" ? 0.6 : 1 }}>{plan === "standard" ? t.variations_locked : t.variations}</button>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button onClick={onTournage} style={{ flex: 2, background: "var(--n)", color: "#fff", border: "none", padding: 15, borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.shooting}</button>
              <button onClick={onSocial} style={{ flex: 1, background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 15, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.social}</button>
            </div>
            <button onClick={() => { if (translated) { setTranslated(null); setActiveLang(null); setShowLangs(false); } else { setShowLangs(s => !s); } }} disabled={translating} style={{ background: translated ? "var(--n)" : "var(--card)", color: translated ? "#fff" : "var(--tx)", border: `1.5px solid ${translated ? "var(--n)" : "var(--bo)"}`, padding: 14, borderRadius: 12, width: "100%", fontSize: 14, fontWeight: 600, cursor: translating ? "wait" : "pointer", marginBottom: 6, fontFamily: "var(--sans)" }}>
              {translating ? t.translating : translated ? `${LANGS.find(l => l.code === activeLang)?.flag} ${t.translate_back}` : t.translate}
            </button>
            {showLangs && !translating && (
              <div style={{ background: "var(--card)", borderRadius: 12, padding: 14, marginBottom: 6, border: "1.5px solid var(--bo)" }}>
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

            <button onClick={onExport} style={{ background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 14, borderRadius: 12, width: "100%", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", marginBottom: 10 }}>{t.export_pdf}</button>
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
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
      <div style={{ width: 3, borderRadius: 2, background: accent || "var(--r)", alignSelf: "stretch", flexShrink: 0, minHeight: 44 }} />
      <div>
        <p style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 900, letterSpacing: -0.5, textTransform: "uppercase", color: accent || "var(--r)", lineHeight: 1.1, marginBottom: 6 }}>{title}</p>
        {sub && <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.5 }}>{sub}</p>}
      </div>
    </div>
  );
}

function AfficheView({ affiche, loading, bible, onBack, t }) {
  const accent = affiche?.palette?.[0] || "var(--r)";
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>{t.back_bible}</button>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{t.affiche_title}</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>{t.affiche_sub}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16, animation: "pulse 1.2s infinite" }}>🎨</div>
            <p style={{ color: "var(--mt)" }}>{t.affiche_loading}</p>
          </div>
        ) : affiche ? (
          <>
            {/* — 1. AFFICHE — */}
            <SectionTitle accent={accent} title={t.affiche_sec1_title} sub={t.affiche_sec1_sub} />
            <div style={{ background: "#fff", borderRadius: 20, padding: "40px 28px 32px", marginBottom: 28, textAlign: "center", aspectRatio: "9/14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.15)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${affiche.palette?.[0] || "#E85C3A"}, ${affiche.palette?.[1] || "#ff8c42"})` }} />
              {affiche.palette?.[0] && (
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${affiche.palette[0]}12 0%, transparent 65%)`, pointerEvents: "none" }} />
              )}
              <p style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: affiche.palette?.[0] || "#E85C3A", marginBottom: 24, fontWeight: 700, position: "relative" }}>{t.vc_presents}</p>
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
                <SectionTitle accent={accent} title={t.affiche_sec2_title} sub={t.affiche_sec2_sub} />
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
                <SectionTitle accent={accent} title={t.affiche_sec3_title} sub={t.affiche_sec3_sub} />
                <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, border: `2px solid ${accent}33`, marginBottom: 12 }}>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--tx)", fontFamily: "monospace", marginBottom: 14 }}>{affiche.prompt_ia}</p>
                  <button onClick={() => navigator.clipboard?.writeText(affiche.prompt_ia)} style={{ background: accent, border: "none", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", width: "100%" }}>
                    {t.affiche_copy}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: "var(--mt)", textAlign: "center", lineHeight: 1.5 }}>
                  {t.affiche_tools}
                </p>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function SocialView({ social, loading, ep, bible, onBack, t }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>{t.back_studio}</button>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{t.social_title}</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>Ép. {ep?.numero} · {ep?.titre}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 16, animation: "pulse 1.2s infinite" }}>📱</div>
            <p style={{ color: "var(--mt)" }}>{t.social_loading}</p>
          </div>
        ) : social ? (
          <>
            {/* Légende TikTok */}
            {social.legende && (
              <div style={{ background: "linear-gradient(135deg, #ff0050, #ff6b6b)", borderRadius: 16, padding: 18, marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>{t.social_tiktok_legend}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>{social.legende}</p>
                <button onClick={() => navigator.clipboard?.writeText(social.legende)} style={{ marginTop: 12, background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.social_copy}</button>
              </div>
            )}
            {/* SMS */}
            {(social.sms || []).length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>{t.social_sms}</p>
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
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--mt)", marginBottom: 12 }}>{t.social_comments}</p>
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

  useEffect(() => {
    setState(prev => ({
      ...prev,
      casting: OPTS[lang].casting[0],
      univers: prev.mode === "fast" ? OPTS[lang].univers_fast[0] : OPTS[lang].univers_prem[0],
      secret: prev.mode === "fast" ? OPTS[lang].secret_fast[0] : OPTS[lang].secret_prem[0],
    }));
  }, [lang]);

  const t = T[lang];
  const opts = OPTS[lang];

  const [state, setState] = useState({ mode: "fast", casting: OPTS.fr.casting[0], univers: OPTS.fr.univers_fast[0], secret: OPTS.fr.secret_fast[0], format: 10, duree: 60, genre: "", ambiance: "", tropes: "", tropesSel: [], castingIA: [], castingMods: { physique: [], culture: [], aesthetic: [], blessure: [], aura: [] }, packId: null, style: "⚡ TikTok Drama", drama: { romance: 5, toxicite: 5, mystere: 4, humour: 2, violence: 3, spicy: 3 } });
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
  const cleanState = (s) => {
    const selInstr = (s.tropesSel || []).map(id => TROPES.find(t => t.id === id)?.instr).filter(Boolean).join("; ");
    const packTropes = s.tropes || "";
    const merged = [packTropes, selInstr].filter(Boolean).join("; ");
    return {
      ...s,
      casting: s.casting?.startsWith(CUSTOM_PREFIX) ? s.casting.slice(CUSTOM_PREFIX.length) : s.casting,
      univers: s.univers?.startsWith(CUSTOM_PREFIX) ? s.univers.slice(CUSTOM_PREFIX.length) : s.univers,
      secret: s.secret?.startsWith(CUSTOM_PREFIX) ? s.secret.slice(CUSTOM_PREFIX.length) : s.secret,
      tropes: merged,
    };
  };

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
      setLoadMsg(t.gen_bible);
      const ll = lang === "en" ? "en" : "fr";
      const archLines = (state.castingIA || []).map(id => {
        const a = CASTING_IA.find(x => x.id === id);
        if (!a) return "";
        return `${a.label[ll]} (${a.age} ans) — ${a.desc[ll]}`;
      }).filter(Boolean);
      const mods = state.castingMods || {};
      const modLines = [
        mods.physique?.length   ? `Morphologie: ${mods.physique.join(", ")}` : "",
        mods.culture?.length    ? `Origines: ${mods.culture.join(", ")}` : "",
        mods.aesthetic?.length  ? `Esthétique: ${mods.aesthetic.join(", ")}` : "",
        mods.blessure?.length   ? `Défauts/blessures: ${mods.blessure.join(", ")}` : "",
        mods.aura?.length       ? `Auras imposées: ${mods.aura.join(", ")}` : "",
      ].filter(Boolean);
      const castingIAInstr = [...archLines, ...modLines].join(" | ") || undefined;
      const b = await gen("bible", { ...cleanState(state), lang, castingIA: castingIAInstr }, customerId);
      setBible(b);

      const totalBatches = Math.ceil(state.format / 10);
      const batches = [];
      for (let i = 0; i < state.format; i += 10) {
        const from = i + 1, to = Math.min(i + 10, state.format);
        const batchNum = Math.floor(i / 10) + 1;
        const batchPromise = gen("episodes", { titre: b.titre, logline: b.logline, mode: state.mode, from, to, total: state.format, lang }, customerId)
          .then(result => {
            setLoadMsg(t.gen_episodes_batch.replace("%a", from).replace("%b", to).replace("%c", batchNum).replace("%d", totalBatches));
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
      const u = await gen("edit", { script, type, duree: state.duree, lang }, customerId);
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
      const r = await gen("variations", { ep: episodes[epIdx], bible, mode: state.mode, duree: state.duree, lang }, customerId);
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
      const r = await gen("social", { ep: episodes[epIdx], bible, mode: state.mode, lang }, customerId);
      setSocial(r);
    } catch (e) { console.error(e); }
    setLoadingSocial(false);
  };

  const genAffiche = async () => {
    setAffiche(null);
    setLoadingAffiche(true);
    setScreen("affiche");
    try {
      const r = await gen("affiche", { titre: bible.titre, logline: bible.logline, personnages: bible.personnages || [], genre: state.genre, ambiance: state.ambiance, lang }, customerId);
      setAffiche(r);
    } catch (e) { console.error(e); }
    setLoadingAffiche(false);
  };

  const exportScript = async () => {
    const b = bible, ep = episodes[epIdx], s = script;
    if (!s) return;

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, margin = 18, contentW = W - margin * 2;
    const RED = [232, 92, 58], DARK = [15, 26, 18], GRAY = [120, 120, 120];
    let y = margin;

    const lh = (size) => size * 0.53;

    const addText = (text, opts = {}) => {
      const { size = 11, bold = false, color = [0, 0, 0], italic = false, align = "left", maxWidth = contentW } = opts;
      doc.setFontSize(size);
      doc.setFont("helvetica", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(String(text || ""), maxWidth);
      const lineH = lh(size);
      if (y + lines.length * lineH > 278) { doc.addPage(); y = margin; }
      doc.text(lines, align === "center" ? W / 2 : margin, y, { align });
      y += lines.length * lineH + 2;
      return lines.length * lineH + 2;
    };

    const addSpace = (h = 4) => { y += h; };
    const addLine = (color = [220, 220, 220]) => { doc.setDrawColor(...color); doc.line(margin, y, W - margin, y); addSpace(4); };

    const calcBoxH = (items) => items.reduce((acc, { text, size, mw }) => {
      const lines = doc.splitTextToSize(String(text || ""), mw || contentW - 8);
      return acc + lines.length * lh(size) + 2;
    }, 0);

    const drawBox = (bgColor, height, rounded = true) => {
      if (y + height > 278) { doc.addPage(); y = margin; }
      doc.setFillColor(...bgColor);
      if (rounded) doc.roundedRect(margin, y, contentW, height, 3, 3, "F");
      else doc.rect(margin, y, contentW, height, "F");
      y += 5;
    };

    const addWatermark = () => {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.06 }));
        doc.setFontSize(36);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(232, 92, 58);
        doc.text("VERTICALCLAP", W / 2, 148, { align: "center", angle: 45 });
        doc.restoreGraphicsState();
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 180, 180);
        doc.text("verticalclap.com", W / 2, 293, { align: "center" });
      }
    };

    const isEn = lang === "en";

    // Header bar
    doc.setFillColor(...RED);
    doc.rect(0, 0, W, 11, "F");
    doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
    doc.text("VERTICALCLAP", margin, 7.5);
    doc.text(`${b.titre} — ${isEn ? "Ep." : "Ép."} ${ep.numero}`, W - margin, 7.5, { align: "right" });
    y = 20;

    // Title block
    addText(b.titre.toUpperCase(), { size: 8, bold: true, color: GRAY });
    addSpace(1);
    addText(ep.titre, { size: 20, bold: true });
    addSpace(3);
    addText(`« ${b.logline} »`, { size: 10, italic: true, color: GRAY });
    addSpace(3);
    addText(`${isEn ? "Episode" : "Épisode"} ${ep.numero} · ${DUR_LABEL[lang][state.duree]}`, { size: 9.5, bold: true, color: RED });
    if (ep.cliffhanger) {
      addSpace(2);
      addText(`🎬 ${ep.cliffhanger}`, { size: 9, italic: true, color: GRAY });
    }
    addSpace(5);
    addLine(RED);

    // Hook box
    addText(isEn ? "HOOK -- FIRST 3 SECONDS" : "HOOK -- 3 PREMIERES SECONDES", { size: 7.5, bold: true, color: RED });
    addSpace(3);
    const hookItems = [
      { text: s.hook_scene?.texte, size: 13 },
      { text: `[9:16] ${s.hook_scene?.visuel_916}`, size: 9 },
    ];
    const hookBoxH = calcBoxH(hookItems) + 14;
    drawBox([255, 245, 242], hookBoxH);
    addText(s.hook_scene?.texte, { size: 13, bold: true, maxWidth: contentW - 8 });
    addSpace(2);
    addText(`[9:16] ${s.hook_scene?.visuel_916}`, { size: 9, italic: true, color: RED, maxWidth: contentW - 8 });
    y = Math.max(y, margin + hookBoxH);
    addSpace(8);

    // Scenes
    addText(`${isEn ? "SCRIPT" : "SCRIPT"} · ${DUR_LABEL[lang][state.duree]} · ${(s.scenes || []).length} ${isEn ? "lines" : "répliques"}`, { size: 7.5, bold: true, color: RED });
    addSpace(4);
    (s.scenes || []).forEach((sc, i) => {
      addText(sc.perso, { size: 9, bold: true, color: DARK });
      if (sc.jeu) addText(sc.jeu, { size: 8, italic: true, color: GRAY });
      addSpace(1);
      addText(sc.dialogue, { size: 11.5 });
      addSpace(2);
      addText(`[9:16] ${sc.visuel_916}`, { size: 8.5, italic: true, color: GRAY });
      addSpace(5);
      if (i < (s.scenes || []).length - 1) addLine();
    });

    // Cliffhanger box
    addSpace(4);
    const cliffLabel = s.cliffhanger_scene?.label || "";
    const cliffItems = [
      { text: "CLIFFHANGER", size: 7.5 },
      { text: s.cliffhanger_scene?.texte, size: 13 },
      { text: s.cliffhanger_scene?.visuel_916, size: 9 },
    ];
    const cliffBoxH = calcBoxH(cliffItems) + (cliffLabel ? 18 : 0) + 20;
    drawBox(DARK, cliffBoxH);
    addText("CLIFFHANGER", { size: 7.5, bold: true, color: RED });
    addSpace(3);
    addText(s.cliffhanger_scene?.texte, { size: 13, bold: true, color: [255, 255, 255], maxWidth: contentW - 8 });
    addSpace(2);
    addText(s.cliffhanger_scene?.visuel_916, { size: 9, italic: true, color: [255, 120, 90], maxWidth: contentW - 8 });
    if (cliffLabel) {
      addSpace(5);
      // Measure with correct font before drawing chip
      doc.setFontSize(8); doc.setFont("helvetica", "bold");
      const chipW = Math.min(doc.getTextWidth(cliffLabel.toUpperCase()) + 14, contentW);
      const chipH = 8;
      doc.setFillColor(...RED);
      doc.roundedRect(margin, y, chipW, chipH, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(cliffLabel.toUpperCase(), margin + 7, y + 5.5);
      y += chipH + 3;
    }

    // Checklist
    if (s.checklist && s.checklist.length > 0) {
      addSpace(10);
      addLine([200, 200, 200]);
      addText(isEn ? "SHOOTING CHECKLIST" : "CHECKLIST TOURNAGE", { size: 7.5, bold: true, color: RED });
      addSpace(4);
      s.checklist.forEach(item => {
        addText(`- ${item}`, { size: 9, color: GRAY });
        addSpace(1);
      });
    }

    // Characters
    if (b.personnages && b.personnages.length > 0) {
      addSpace(8);
      addLine([200, 200, 200]);
      addText(isEn ? "CHARACTERS" : "PERSONNAGES", { size: 7.5, bold: true, color: RED });
      addSpace(4);
      b.personnages.forEach(p => {
        addText(`${p.nom}${p.age ? ` (${p.age})` : ""} -- ${p.role || ""}`, { size: 9, bold: true });
        if (p.secret) addText(`${isEn ? "Secret" : "Secret"}: ${p.secret}`, { size: 8.5, italic: true, color: GRAY });
        addSpace(3);
      });
    }

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
      {screen === "studio" && <StudioView bible={bible} ep={episodes[epIdx]} script={script} loading={loading} duree={state.duree} onEdit={editScript} onTournage={() => setScreen("tour")} onBack={() => setScreen("bible")} onExport={exportScript} onVariations={genVariations} plan={plan} onPrev={() => openEp(epIdx - 1)} onNext={() => openEp(epIdx + 1)} epIdx={epIdx} totalEps={episodes.length} onSocial={genSocial} onTranslate={(langue) => gen("traduire", { script, langue, lang }, customerId)} t={t} lang={lang} />}
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
