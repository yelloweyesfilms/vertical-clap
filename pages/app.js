import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

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
    mode_fast: "Vertical", mode_premium: "Série",
    casting: "Casting", univers: "Univers", secret: "Secret central",
    duree: "Durée par épisode", episodes: "Nombre d'épisodes",
    style: "Style de script", drama: "Drama Engine", drama_sub: "Dose les ingrédients de ta série",
    generate: "Créer la série", my_series: "Mes séries",
    content: "min de contenu", max_fast: "max 20 en Vertical",
    back_mixer: "← Studio", see_eps: "Voir les", episodes_btn: "épisodes →",
    poster_btn: "Affiche", bible_tab: "Bible", persos_tab: "Casting",
    question_centrale: "Tension centrale", personnages: "Personnages",
    enrich: "Enrichir les fiches",
    back_bible: "← Série", back_studio: "← Épisodes",
    writing: "Écriture du script", hook: "HOOK — 3 premières secondes",
    script_label: "Script", repliques: "répliques",
    spice: "Intensifier", subtle: "Subtil", simplify: "Épurer",
    revelation: "Révélation", revelation_sub: "Insère un secret explosif dans le script",
    variations_locked: "3 versions", variations: "3 versions du script",
    shooting: "Tournage",
    translate: "Traduire le script", translate_back: "↩ Original", translating: "Traduction…",
    export_pdf: "Exporter en PDF",
    saved: "séries sauvegardées", no_series: "Aucune série sauvegardée", generate_first: "Crée ta première série",
    open: "Ouvrir →", perso_input: "Décris ton %s en quelques mots…",
    dur_std: "Court", dur_intense: "Standard", dur_epic: "Long",
    style_cinema: "Silences & regards", style_tiktok: "Rythme haletant", style_soap: "Révélations multiples",
    lo_romance: "Neutre", hi_romance: "Passion brûlante",
    lo_toxicite: "Sain", hi_toxicite: "Manipulation totale",
    lo_mystere: "Transparent", hi_mystere: "Rien n'est vrai",
    lo_humour: "Pur drame", hi_humour: "Comédie noire",
    lo_violence: "Aucune", hi_violence: "Confrontations dures",
    lo_spicy: "Tous publics", hi_spicy: "Tension maximale",
    packs_label: "Packs d'univers", packs_sub: "— tout configuré en 1 clic",
    tropes_label: "Tropes", tropes_sub: "— injecte les codes narratifs qui cartonnent",
    tropes_romance: "Romance", tropes_drama: "Drama",
    casting_ia_label: "Casting IA", casting_ia_sub: "— donne une identité forte à tes personnages",
    casting_ia_age: "ans",
    ambiance_vis_label: "Ambiance Visuelle", ambiance_vis_sub: "— l'identité visuelle de ta série",
    budget_label: "Production Scale", budget_sub: "— adapte l'écriture à ton budget réel",
    budget_lieux: "Lieux tournables",
    budget_guide: "Guide Prod",
    budget_teleprompter: "Script",
    budget_equip: "Équipement", budget_lumiere: "Lumière", budget_tricks: "Fake expensive", budget_decors: "Décors",
    logout: "Déconnexion", custom: "✏️ Mon idée",
    choose_lang: "Choisir la langue", back: "← Retour", my_series_title: "Mes Séries",
    affiche_title: "Dossier de présentation", affiche_sub: "Ton kit visuel complet — affiche + direction artistique + image IA",
    affiche_loading: "Création de la direction artistique…",
    affiche_sec1_title: "01 — Affiche de présentation", affiche_sec1_sub: "Imprime-la ou joins-la à ton PDF d'épisodes pour présenter ta série.",
    affiche_sec2_title: "02 — Direction artistique", affiche_sec2_sub: "L'ambiance visuelle de ta série — pour briefer un DA, un graphiste ou une IA.",
    affiche_sec3_title: "03 — Générer l'image de couverture", affiche_sec3_sub: "Copie ce prompt et colle-le dans Midjourney, DALL-E (ChatGPT), Gemini ou Ideogram pour générer l'affiche.",
    affiche_copy: "Copier le prompt", affiche_tools: "Midjourney → /imagine + colle · ChatGPT → \"Génère cette image :\" + colle · Gemini → même chose",
    vc_presents: "VERTICAL CLAP PRESENTS",
    gen_bible: "Création de la bible de la série…",
    gen_episodes: "Génération des épisodes…",
    gen_episodes_batch: "Épisodes %a–%b générés… (%c/%d)",
    premium_variations: "Les variations sont réservées au plan Pro.",
    premium_calendrier: "Le calendrier éditorial est réservé au plan Pro (19€/mois).",
    accroches_locked_hint: "Les 3 premières accroches sont disponibles. Passe au plan Pro pour les générer sur tous tes épisodes.",
    loading_cartes: "Création des fiches personnages…",
    style_voixoff: "Narration intime",
    voix_off_label: "Voix Off",
    loading_profils: "Création des profils réseaux…",
    profils_title: "Profils Réseaux",
    calendrier_btn: "Calendrier",
    loading_calendrier: "Création du calendrier éditorial…",
    calendrier_title: "Calendrier Éditorial",
    storyboard_btn: "Découpage",
    loading_storyboard: "Création du découpage technique…",
    storyboard_title: "Découpage technique",
    accroches_tab: "Accroches",
    loading_accroches: "Génération des accroches TikTok…",
    gen_accroches: "Générer les accroches TikTok",
    accroches_copy: "Copier",
    accroches_copied: "✓ Copié",
    remake_label: "Inspiration Série",
    remake_sub: "— adapte l'ADN d'une série connue",
  },
  en: {
    mode_fast: "Vertical", mode_premium: "Series",
    casting: "Casting", univers: "Setting", secret: "Central secret",
    duree: "Episode duration", episodes: "Number of episodes",
    style: "Script style", drama: "Drama Engine", drama_sub: "Tune your series ingredients",
    generate: "Create series", my_series: "My series",
    content: "min of content", max_fast: "max 20 in Vertical",
    back_mixer: "← Studio", see_eps: "See all", episodes_btn: "episodes →",
    poster_btn: "Poster", bible_tab: "Bible", persos_tab: "Cast",
    question_centrale: "Central tension", personnages: "Characters",
    enrich: "Enrich profiles",
    back_bible: "← Series", back_studio: "← Episodes",
    writing: "Writing script", hook: "HOOK — First 3 seconds",
    script_label: "Script", repliques: "lines",
    spice: "Intensify", subtle: "Subtle", simplify: "Strip down",
    revelation: "Revelation", revelation_sub: "Drop an explosive secret into the script",
    variations_locked: "3 versions", variations: "3 script versions",
    shooting: "Shoot",
    translate: "Translate script", translate_back: "↩ Original", translating: "Translating…",
    export_pdf: "Export as PDF",
    saved: "saved series", no_series: "No saved series", generate_first: "Create your first series",
    open: "Open →", perso_input: "Describe your %s in a few words…",
    dur_std: "Short", dur_intense: "Standard", dur_epic: "Long",
    style_cinema: "Silences & looks", style_tiktok: "Breathless pace", style_soap: "Multiple reveals",
    lo_romance: "Neutral", hi_romance: "Burning passion",
    lo_toxicite: "Healthy", hi_toxicite: "Total manipulation",
    lo_mystere: "Transparent", hi_mystere: "Nothing is true",
    lo_humour: "Pure drama", hi_humour: "Dark comedy",
    lo_violence: "None", hi_violence: "Harsh confrontations",
    lo_spicy: "All audiences", hi_spicy: "Maximum tension",
    packs_label: "Universe packs", packs_sub: "— all set in 1 click",
    tropes_label: "Tropes", tropes_sub: "— inject the narrative codes that go viral",
    tropes_romance: "Romance", tropes_drama: "Drama",
    casting_ia_label: "Casting IA", casting_ia_sub: "— give your characters a powerful identity",
    casting_ia_age: "yo",
    ambiance_vis_label: "Visual Ambiance", ambiance_vis_sub: "— your series' visual identity",
    budget_label: "Production Scale", budget_sub: "— adapts writing to your real budget",
    budget_lieux: "Shootable locations",
    budget_guide: "Prod Guide",
    budget_teleprompter: "Script",
    budget_equip: "Equipment", budget_lumiere: "Lighting", budget_tricks: "Fake expensive", budget_decors: "Sets",
    logout: "Sign out", custom: "✏️ My idea",
    choose_lang: "Choose language", back: "← Back", my_series_title: "My Series",
    affiche_title: "Presentation kit", affiche_sub: "Your complete visual kit — poster + art direction + AI image",
    affiche_loading: "Creating art direction…",
    affiche_sec1_title: "01 — Presentation poster", affiche_sec1_sub: "Print it or attach it to your episode PDF to present your series.",
    affiche_sec2_title: "02 — Art direction", affiche_sec2_sub: "Your series visual identity — to brief a designer, an art director, or an AI.",
    affiche_sec3_title: "03 — Generate cover image", affiche_sec3_sub: "Copy this prompt and paste it into Midjourney, DALL-E (ChatGPT), Gemini or Ideogram to generate the poster.",
    affiche_copy: "Copy prompt", affiche_tools: "Midjourney → /imagine + paste · ChatGPT → \"Generate this image:\" + paste · Gemini → same",
    vc_presents: "VERTICAL CLAP PRESENTS",
    gen_bible: "Creating series bible…",
    gen_episodes: "Generating episodes…",
    gen_episodes_batch: "Episodes %a–%b generated… (%c/%d)",
    premium_titles: "Viral titles are reserved for Pro plan.",
    premium_variations: "Variations are reserved for Pro plan.",
    premium_calendrier: "The editorial calendar is reserved for the Pro plan (€19/month).",
    accroches_locked_hint: "Les 3 premières accroches sont disponibles. Passe au plan Pro pour les générer sur tous tes épisodes.",
    loading_cartes: "Creating character profiles…",
    style_voixoff: "Intimate narration",
    voix_off_label: "Voice Over",
    loading_profils: "Creating social profiles…",
    profils_title: "Social Profiles",
    calendrier_btn: "Calendar",
    loading_calendrier: "Creating editorial calendar…",
    calendrier_title: "Editorial Calendar",
    storyboard_btn: "Shot List",
    loading_storyboard: "Creating shot list…",
    storyboard_title: "Shot List",
    accroches_tab: "Hooks",
    loading_accroches: "Generating TikTok hooks…",
    gen_accroches: "Generate TikTok hooks",
    accroches_copy: "Copy",
    accroches_copied: "✓ Copied",
    remake_label: "Series Inspiration",
    remake_sub: "— adapt the DNA of a famous series",
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

  // ── 50–85 ans ─────────────────────────────────────────────────
  { id: "veuve-riche",       cat:"romance", emoji:"🥀", auraTag:"mystérieux",   label:{fr:"Veuve énigmatique",     en:"Enigmatic widow"},      age:"55-68", desc:{fr:"son mari est mort dans des circonstances floues — elle sait exactement ce qui s'est passé",          en:"her husband died under vague circumstances — she knows exactly what happened"} },
  { id: "vieux-docteur",     cat:"romance", emoji:"🩺", auraTag:"mélancolique", label:{fr:"Médecin vieillissant",  en:"Aging doctor"},         age:"58-70", desc:{fr:"a sauvé des milliers de vies — ne peut pas sauver la sienne de la solitude",                         en:"saved thousands of lives — can't save his own from loneliness"} },
  { id: "grand-mere-feu",    cat:"romance", emoji:"🔥", auraTag:"dominant",     label:{fr:"Grand-mère de feu",    en:"Firecracker grandma"},  age:"65-75", desc:{fr:"refuse catégoriquement de vieillir gentiment — toujours le personnage le plus vivant dans la pièce",   en:"categorically refuses to age gracefully — always the most alive person in the room"} },
  { id: "patron-age",        cat:"elite",   emoji:"🏛️",auraTag:"froid",        label:{fr:"Patriarche implacable", en:"Ruthless patriarch"},   age:"65-80", desc:{fr:"a bâti un empire — refuse de le lâcher même si ça détruit sa famille",                               en:"built an empire — refuses to let go even if it destroys his family"} },
  { id: "matriарche",        cat:"elite",   emoji:"💎", auraTag:"dominant",     label:{fr:"Matriarche de clan",   en:"Clan matriarch"},       age:"60-78", desc:{fr:"tient la famille entière d'une main de fer depuis 40 ans — et connaît le secret qui pourrait tout effondrer", en:"has held the entire family with an iron fist for 40 years — and knows the secret that could collapse everything"} },
  { id: "juge-corrompu",     cat:"thriller",emoji:"⚖️", auraTag:"dangereux",    label:{fr:"Juge corrompu",        en:"Corrupt judge"},        age:"58-72", desc:{fr:"a rendu des verdicts injustes toute sa carrière — quelqu'un a enfin les preuves",                      en:"has rendered unjust verdicts his entire career — someone finally has the evidence"} },
  { id: "agent-retraite",    cat:"thriller",emoji:"🕵️",auraTag:"imprévisible", label:{fr:"Agent retraité",        en:"Retired agent"},        age:"60-72", desc:{fr:"a prétendu quitter le service — ils ne l'ont jamais vraiment laissé partir",                          en:"claimed to leave the service — they never truly let him go"} },
  { id: "scientifique-fol",  cat:"scifi",   emoji:"🧬", auraTag:"imprévisible", label:{fr:"Scientifique fou",      en:"Mad scientist"},        age:"62-78", desc:{fr:"a consacré 40 ans à une théorie que personne ne croyait — elle était juste",                          en:"spent 40 years on a theory no one believed — it was right"} },
  { id: "ancienne",          cat:"horror",  emoji:"🧿", auraTag:"dangereux",    label:{fr:"L'Ancienne",           en:"The Ancient"},          age:"80-85", desc:{fr:"vit dans cette maison depuis 60 ans — sait exactement ce qui se passe quand on y dort",               en:"has lived in this house for 60 years — knows exactly what happens when you sleep there"} },
  { id: "parrain-vieilli",   cat:"thriller",emoji:"🚬", auraTag:"dominant",     label:{fr:"Parrain vieillissant",  en:"Aging godfather"},      age:"68-80", desc:{fr:"son empire s'effondre — ses propres enfants le trahissent les uns après les autres",                   en:"his empire is crumbling — his own children betray him one by one"} },
  { id: "prof-dechu",        cat:"teen",    emoji:"📐", auraTag:"mélancolique", label:{fr:"Professeur déchu",      en:"Fallen teacher"},       age:"52-65", desc:{fr:"était brillant — un seul mensonge d'élève a tout détruit. Il n'a pas oublié.",                        en:"was brilliant — one student's lie destroyed everything. He hasn't forgotten."} },
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
  { id: "diaspora",   emoji: "🧳",  label: { fr: "Diaspora",      en: "Diaspora" }, desc: { fr: "Né·e ici, racines là-bas — vit entre deux cultures", en: "Born here, roots elsewhere — lives between two cultures" } },
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

// ── BUDGET MODE ─────────────────────────────────────────────
const BUDGET_LEVELS = [
  {
    id: "smartphone", emoji: "📱", stars: "",
    label: { fr: "Smartphone",   en: "Smartphone" },
    sub:   { fr: "Seul·e, 1 lieu, tension pure", en: "Solo, 1 location, pure tension" },
    color: "#16a34a",
    scriptInstr: "BUDGET SMARTPHONE — CONTRAINTES ABSOLUES (la contrainte EST la force créative): MAX 2 personnages à l'écran. 1 seul lieu intérieur simple (chambre, salle de bain, cuisine, voiture). INTERDIT: décors extérieurs complexes, figurants, effets spéciaux, éclairage professionnel. Équipement: smartphone fixe + lumière naturelle. COMPENSER PAR: tension psychologique pure, dialogues incisifs, secrets, conflits intimes, hors-champ, suggestion visuelle. visuel_916 = gros plan serré, plan épaule, plan table uniquement. Aucun travelling.",
    guide: {
      fr: {
        equip: ["📱 Smartphone (mode Portrait ou Cinématique)", "📐 Trépied ou pile de livres stables", "💡 LED ring ou lampe de bureau", "🎙️ Écouteurs avec micro intégré"],
        lumiere: ["Fenêtre côté — jamais de face", "Éteindre les plafonniers", "1 seule source = plus cinématographique", "Rideau blanc = diffuseur gratuit"],
        tricks: ["Flou → objet hors-focus au premier plan", "Couleur → LED colorée 10€", "Ombre dramatique → lampe au sol vers le mur", "Luxe → cadre vide, verre d'eau, une fleur"],
        decors: { romance: ["Guirlande LED chaude", "Draps blancs", "Bougies"], teen: ["LED colorées", "Posters au mur", "Vêtements épars"], thriller: ["Lampe unique au sol", "Pièce sombre", "Porte entrouverte"] },
      },
      en: {
        equip: ["📱 Smartphone (Portrait or Cinematic mode)", "📐 Tripod or stable stack of books", "💡 LED ring or desk lamp", "🎙️ Earphones with mic"],
        lumiere: ["Window from the side — never face-on", "Turn off ceiling lights", "1 light source = more cinematic", "White curtain = free diffuser"],
        tricks: ["Blur → out-of-focus object in foreground", "Color → €10 colored LED", "Dramatic shadow → floor lamp toward wall", "Luxury → empty frame, glass of water, a flower"],
        decors: { romance: ["Warm LED string lights", "White sheets", "Candles"], teen: ["Colored LEDs", "Wall posters", "Scattered clothes"], thriller: ["Single floor lamp", "Dark room", "Door ajar"] },
      },
    },
  },
  {
    id: "equipe", emoji: "🎬", stars: "",
    label: { fr: "Mini-équipe",  en: "Small crew" },
    sub:   { fr: "2-4 persos, lieux variés", en: "2-4 chars, varied locations" },
    color: "#9333ea",
    scriptInstr: "BUDGET MINI-ÉQUIPE — 2-4 personnages, figurants possibles. Lieux variés: café, appartement stylisé, bureau, rooftop, restaurant. Stabilisateur + kit LED 3 points. ÉCRITURE: ambition visuelle réelle — décors expressifs, compositions travaillées, identité de couleur forte. Les scènes exploitent l'espace et la lumière. visuel_916 = plans soignés: travelling lent, rack focus, plan séquence court, angles expressifs.",
    guide: {
      fr: {
        equip: ["📱 Smartphone + stabilisateur (DJI OM, ~100€)", "💡 Panneau LED bicolore (~40€)", "🎙️ Micro-cravate sans fil (~50€)", "📐 Petit slider (~60€)"],
        lumiere: ["Triangle 3 points: key + fill + backlight", "Gels de couleur pour l'ambiance", "Sous-exposer légèrement = plus ciné"],
        tricks: ["Rack focus entre 2 sujets = tension", "Plan séquence = impression de budget élevé", "LUT gratuite en post = look pro"],
        decors: { romance: ["Café vide le matin", "Appart avec belle fenêtre"], teen: ["Parking underground", "Couloir d'immeuble"], thriller: ["Garage", "Cage d'escalier"] },
      },
      en: {
        equip: ["📱 Smartphone + gimbal (DJI OM, ~€100)", "💡 Bicolor LED panel (~€40)", "🎙️ Wireless clip mic (~€50)", "📐 Small slider (~€60)"],
        lumiere: ["3-point triangle: key + fill + backlight", "Color gels for mood", "Slightly underexpose = more cinematic"],
        tricks: ["Rack focus between 2 subjects = tension", "One-shot sequence = higher budget feel", "Free LUT in post = pro look"],
        decors: { romance: ["Empty café in the morning", "Apartment with nice window"], teen: ["Underground parking", "Building corridor"], thriller: ["Garage", "Stairwell"] },
      },
    },
  },
  {
    id: "ambitieux", emoji: "🚀", stars: "",
    label: { fr: "Ambitieux",    en: "Ambitious" },
    sub:   { fr: "Production complète, sans limites", en: "Full production, no limits" },
    color: "#E85C3A",
    scriptInstr: "BUDGET AMBITIEUX — production complète sans contraintes. Tous lieux, tous effets, toute technique. Jusqu'à 8 personnages + figurants. Caméra ciné, lumière pro, drone, steadicam. ÉCRITURE: écrire la scène IDÉALE sans aucune limite — celle qui serait dans une série Netflix premium. Mise en scène sophistiquée, univers visuel fort, ambition cinématographique maximale. Chaque plan a une intention. Chaque décor est un personnage.",
    guide: {
      fr: {
        equip: ["🎥 Caméra ciné (Sony FX3, BMPCC 6K)", "💡 Kit lumière pro complet", "🎙️ Son pro + perchman", "🚁 Drone DJI", "📐 Steadicam ou cardan motorisé"],
        lumiere: ["Direction artistique lumière complète", "Color grade professionnel en post", "Effets pratiques: fumée, pluie, contre-jour"],
        tricks: ["Steadicam = fluidité premium", "Drone bas = planète cinéma", "Split focus = deux mondes dans 1 plan"],
        decors: {},
      },
      en: {
        equip: ["🎥 Cinema camera (Sony FX3, BMPCC 6K)", "💡 Full professional light kit", "🎙️ Pro sound + boom op", "🚁 DJI drone", "📐 Steadicam or motorized gimbal"],
        lumiere: ["Complete lighting art direction", "Professional color grade in post", "Practical effects: smoke, rain, backlight"],
        tricks: ["Steadicam = premium fluidity", "Low drone = cinematic grandeur", "Split focus = two worlds in 1 shot"],
        decors: {},
      },
    },
  },
];

// ── LIEUX — liste complète indépendante du budget ────────────
const ALL_LIEUX = [
  { id: "chambre",   emoji: "🛏",  label: { fr: "Chambre",           en: "Bedroom"            } },
  { id: "sdb",       emoji: "🚿",  label: { fr: "Salle de bain",     en: "Bathroom"           } },
  { id: "cuisine",   emoji: "🍽",  label: { fr: "Cuisine",           en: "Kitchen"            } },
  { id: "voiture",   emoji: "🚗",  label: { fr: "Voiture",           en: "Car"                } },
  { id: "cafe",      emoji: "☕",  label: { fr: "Café",              en: "Café"               } },
  { id: "rue-nuit",  emoji: "🌃",  label: { fr: "Rue de nuit",       en: "Night street"       } },
  { id: "parc",      emoji: "🌳",  label: { fr: "Parc / extérieur",  en: "Park / outdoors"    } },
  { id: "bureau",    emoji: "💼",  label: { fr: "Bureau",            en: "Office"             } },
  { id: "resto",     emoji: "🍷",  label: { fr: "Restaurant / bar",  en: "Restaurant / bar"   } },
  { id: "parking",   emoji: "🅿️",  label: { fr: "Parking",           en: "Underground parking" } },
  { id: "loft",      emoji: "🏙️",  label: { fr: "Loft / appart",     en: "Loft / apartment"   } },
  { id: "rooftop",   emoji: "🌅",  label: { fr: "Rooftop",           en: "Rooftop"            } },
  { id: "hotel",     emoji: "🏨",  label: { fr: "Hôtel",             en: "Hotel"              } },
  { id: "studio",    emoji: "🎭",  label: { fr: "Studio",            en: "Studio"             } },
  { id: "villa",     emoji: "🏡",  label: { fr: "Villa",             en: "Villa"              } },
];

// ── AMBIANCE VISUELLE ────────────────────────────────────────
const AMBIANCE_VIS = [
  {
    id: "dark-cine", emoji: "🌙",
    label: { fr: "Dark & Cinéma", en: "Dark & Cinematic" },
    desc: { fr: "Noirs profonds, lumière rasante, ombres dures", en: "Deep blacks, raking light, hard shadows" },
    palette: ["#0a0a0f", "#1a1a2e", "#e85c3a"],
    refs: "Dark · Squid Game · Minari",
    instr: { fr: "IDENTITÉ VISUELLE DARK CINÉMA: noirs profonds et ombres dures, lumière rasante venant d'un côté unique, contraste extrême entre zones éclairées et zones sombres. Plans larges qui écrasent puis gros plans brutaux. Palette: noirs, gris anthracite, une touche de rouge sang ou blanc froid. visuel_916 = toujours un détail dans l'ombre, un visage à moitié éclairé, une silhouette.", en: "DARK CINEMATIC VISUAL IDENTITY: deep blacks and hard shadows, raking single-source light, extreme contrast. Wide shots that crush characters then brutal close-ups. Palette: blacks, anthracite, one touch of blood red or cold white. visuel_916 = always a detail in shadow, a half-lit face, a silhouette." }
  },
  {
    id: "neon-viral", emoji: "⚡",
    label: { fr: "Neon Viral", en: "Neon Viral" },
    desc: { fr: "Néons saturés, contre-jour, coupes rapides", en: "Saturated neons, backlit, rapid cuts" },
    palette: ["#ff2d8b", "#7c3aed", "#06b6d4"],
    refs: "Euphoria · K-pop MV · TikTok viral",
    instr: { fr: "IDENTITÉ VISUELLE NEON VIRAL: néons rose/violet/bleu saturés, contre-jour intense, reflets sur peau et surfaces humides. Angles dynamiques, caméra inclinée, flares de lentilles. Coupes ultra-rapides entre plans. Palette: rose fluo, violet électrique, bleu cyan. visuel_916 = néon [couleur] qui découpe le visage en contre-jour, reflet dans les yeux, ombre colorée.", en: "NEON VIRAL VISUAL IDENTITY: saturated pink/purple/blue neons, intense backlight, reflections on skin and wet surfaces. Dynamic angles, tilted camera, lens flares. Ultra-fast cuts. Palette: hot pink, electric purple, cyan blue. visuel_916 = [color] neon cutting face in backlight, reflection in eyes, colored shadow." }
  },
  {
    id: "pastel-drama", emoji: "🌸",
    label: { fr: "Pastel Drama", en: "Pastel Drama" },
    desc: { fr: "Tons doux, lumière naturelle, gros plans émotionnels", en: "Soft tones, natural light, emotional close-ups" },
    palette: ["#fcd5ce", "#d4b8e0", "#b8d4e0"],
    refs: "K-drama romantique · Euphoria (calme) · Midsommar",
    instr: { fr: "IDENTITÉ VISUELLE PASTEL DRAMA: tons rose poudré, lavande, pêche, bleu pâle. Lumière naturelle diffuse et douce, fenêtres comme source principale. Gros plans prolongés sur les émotions subtiles — une larme qui ne coule pas encore, un sourire qui se casse. Textures douces: vêtements en lin, rideaux transparents. visuel_916 = gros plan [émotion] dans lumière de fenêtre, texture douce au premier plan, couleur pastel dominante.", en: "PASTEL DRAMA VISUAL IDENTITY: powder pink, lavender, peach, pale blue tones. Diffused, soft natural light, windows as main source. Extended close-ups on subtle emotions. Soft textures: linen clothes, sheer curtains. visuel_916 = close-up [emotion] in window light, soft texture in foreground, dominant pastel color." }
  },
  {
    id: "golden-hour", emoji: "☀️",
    label: { fr: "Golden Hour", en: "Golden Hour" },
    desc: { fr: "Lumière dorée chaude, extérieurs, magic hour", en: "Warm golden light, outdoors, magic hour" },
    palette: ["#f59e0b", "#ef4444", "#fef3c7"],
    refs: "Normal People · Call Me By Your Name · After",
    instr: { fr: "IDENTITÉ VISUELLE GOLDEN HOUR: lumière chaude orangée-dorée de magic hour, extérieurs ouverts, vent dans les cheveux. Ralentis subtils sur les moments clés. Couleurs saturées et chaudes: or, ambre, corail. Profondeur de champ floue sur les arrière-plans. visuel_916 = lumière dorée sur [visage/mains/détail], arrière-plan flou chaud, mouvement ralenti au moment émotionnel.", en: "GOLDEN HOUR VISUAL IDENTITY: warm orange-gold magic hour light, open exteriors, wind in hair. Subtle slow-motion on key moments. Warm saturated colors: gold, amber, coral. Shallow depth of field on backgrounds. visuel_916 = golden light on [face/hands/detail], warm blurred background, slow motion at emotional moment." }
  },
  {
    id: "cold-corporate", emoji: "🧊",
    label: { fr: "Cold Corporate", en: "Cold Corporate" },
    desc: { fr: "Bleus froids, espaces épurés, lumière froide", en: "Cold blues, clean spaces, cold light" },
    palette: ["#1e3a5f", "#64748b", "#e2e8f0"],
    refs: "Succession · Severance · Industry",
    instr: { fr: "IDENTITÉ VISUELLE COLD CORPORATE: bleus froids et gris ardoise, lumière artificielle froide (néons de bureau, écrans). Espaces épurés avec lignes droites, verre et béton. Personnages petits dans des cadres larges qui les écrasent. Palette: bleu foncé, gris acier, blanc cassé. visuel_916 = plan large qui [écrase/isole] le personnage dans l'espace, lumière froide de bureau, reflet dans vitre/écran.", en: "COLD CORPORATE VISUAL IDENTITY: cold blues and slate grey, cold artificial light (office neons, screens). Clean spaces with straight lines, glass and concrete. Characters made small in wide frames. Palette: dark blue, steel grey, off-white. visuel_916 = wide shot [crushing/isolating] character in space, cold office light, reflection in glass/screen." }
  },
  {
    id: "natural-light", emoji: "🌿",
    label: { fr: "Natural Light", en: "Natural Light" },
    desc: { fr: "Lumière naturelle, handheld, intimiste, brut", en: "Natural light, handheld, intimate, raw" },
    palette: ["#6b7280", "#d1d5db", "#f9fafb"],
    refs: "Fleabag · Normal People · Aftersun",
    instr: { fr: "IDENTITÉ VISUELLE NATURAL LIGHT: lumière naturelle uniquement, handheld légèrement instable. Textures authentiques: grain, imperfections. Couleurs neutres et désaturées. Caméra proche des corps, dans l'espace personnel. visuel_916 = caméra handheld à [distance] du visage, lumière naturelle [dure/douce], texture brute au premier plan.", en: "NATURAL LIGHT VISUAL IDENTITY: natural light only, slightly unstable handheld. Authentic textures: grain, imperfections. Neutral desaturated colors. Camera close to bodies, in personal space. visuel_916 = handheld camera at [distance] from face, natural [harsh/soft] light, raw texture in foreground." }
  },
  {
    id: "found-footage", emoji: "📹",
    label: { fr: "Found Footage", en: "Found Footage" },
    desc: { fr: "Caméra tremblante, grain, filtre VHS, POV", en: "Shaky cam, grain, VHS filter, POV" },
    palette: ["#1a1a1a", "#16a34a", "#ffffff"],
    refs: "Rec · Paranormal Activity · Horreur TikTok",
    instr: { fr: "IDENTITÉ VISUELLE FOUND FOOTAGE: caméra tenue à bout de bras, tremblements authentiques. Grain vidéo visible, aberrations de couleur, timestamp ou HUD visible. Plans en POV strict. Lumière de fortune: torche, téléphone, lumière de rue. visuel_916 = POV caméra tremblante, grain visible, [source lumière de fortune] qui éclaire partiellement.", en: "FOUND FOOTAGE VISUAL IDENTITY: camera held at arm's length, authentic shaking. Visible video grain, color aberrations, timestamp or HUD visible. Strict POV shots. Makeshift lighting: torch, phone, street light. visuel_916 = shaky POV camera, visible grain, [makeshift light source] partially illuminating." }
  },
  {
    id: "old-money", emoji: "💎",
    label: { fr: "Old Money Luxury", en: "Old Money Luxury" },
    desc: { fr: "Crème, or, bordeaux — décors opulents, plans lents", en: "Cream, gold, burgundy — opulent sets, slow shots" },
    palette: ["#f5f0e8", "#b8860b", "#722f37"],
    refs: "Gossip Girl · Bridgerton · The Crown",
    instr: { fr: "IDENTITÉ VISUELLE OLD MONEY: palettes crème, or mat, bordeaux profond. Lumière chaude tamisée par des lustres et bougies. Décors opulents: boiseries, marbres, velours. Plans lents et glissants, Steadicam fluide. Détails de luxe au premier plan. visuel_916 = plan glissant sur [matière de luxe], lumière de lustre/bougie, palette [crème/or/bordeaux] dominante.", en: "OLD MONEY VISUAL IDENTITY: cream, matte gold, deep burgundy palettes. Warm light dimmed by chandeliers and candles. Opulent sets: wood paneling, marble, velvet. Slow gliding shots, fluid Steadicam. Luxury details in foreground. visuel_916 = gliding shot on [luxury material], chandelier/candle light, dominant [cream/gold/burgundy] palette." }
  },
  {
    id: "urban-night", emoji: "🌆",
    label: { fr: "Urban Night", en: "Urban Night" },
    desc: { fr: "Nuit, néons de ville, pluie, contrastes forts", en: "Night, city neons, rain, high contrast" },
    palette: ["#0f172a", "#f97316", "#22d3ee"],
    refs: "Taxi Driver · Collateral · Night Call",
    instr: { fr: "IDENTITÉ VISUELLE URBAN NIGHT: nuit de ville, néons d'enseignes reflétés dans la pluie sur l'asphalte. Contraste extrême ombre/lumière. Profondeur: feux de voitures, signalisation floue en arrière-plan. Palette: nuit profonde, orange sodium, cyan. visuel_916 = reflet [néon/orange/cyan] sur asphalte mouillé, silhouette dans contre-jour de rue, vapeur ou pluie visible.", en: "URBAN NIGHT VISUAL IDENTITY: city night, sign neons reflected in rain on asphalt. Extreme shadow/light contrast. Depth: car lights, blurred signage in background. Palette: deep night, sodium orange, cyan. visuel_916 = [neon/orange/cyan] reflection on wet asphalt, silhouette in street backlight, visible steam or rain." }
  },
  {
    id: "vintage-film", emoji: "🎞️",
    label: { fr: "Vintage Film", en: "Vintage Film" },
    desc: { fr: "Grain 16mm, couleurs désaturées, caméra statique", en: "16mm grain, desaturated colors, static camera" },
    palette: ["#d4c5a9", "#8b6f47", "#4a4a4a"],
    refs: "Stranger Things · Daisy Jones · Super 8",
    instr: { fr: "IDENTITÉ VISUELLE VINTAGE FILM: grain 16mm ou Super 8 visible, couleurs désaturées avec légère dominante chaude. Caméra majoritairement statique, mouvement de zoom optique lent. Lumière de l'époque: lampes à incandescence, fenêtres sans diffuseur. Palette: sépia chaud, kaki délavé, blanc cassé. visuel_916 = plan fixe avec grain visible, lumière à incandescence [chaude/dorée], palette désaturée.", en: "VINTAGE FILM VISUAL IDENTITY: visible 16mm or Super 8 grain, desaturated colors with slight warm cast. Mostly static camera, slow optical zoom. Period lighting: incandescent lamps, undiffused windows. Palette: warm sepia, faded khaki, off-white. visuel_916 = static shot with visible grain, incandescent [warm/golden] light, desaturated palette." }
  },
];

// ── STORY FORMATS ────────────────────────────────────────────
const STORY_FORMATS = [
  {
    id: "romance",
    emoji: "💕",
    label: { fr: "Romance", en: "Romance" },
    sub: { fr: "Love story · Tension", en: "Love story · Tension" },
    color: "#f59e0b",
    mode: "fast",
    genre: "Romance Drama",
    tropes: "enemies to lovers, fake dating, forbidden love, friends to lovers",
    ambianceVisuelle: "golden-hour",
    style: "⚡ Format Vertical",
  },
  {
    id: "kdrama",
    emoji: "💗",
    label: { fr: "K-Drama", en: "K-Drama" },
    sub: { fr: "Romance coréenne · Slow burn", en: "Korean romance · Slow burn" },
    color: "#e879a0",
    mode: "premium",
    genre: "K-Drama romantique",
    tropes: "enemies to lovers, slow burn, forbidden love, grumpy x sunshine — codes K-Drama: retenue émotionnelle, tension non dite, proximité explosive",
    ambianceVisuelle: "pastel-drama",
    style: "🎬 Cinéma",
  },
  {
    id: "famille",
    emoji: "👨‍👩‍👧",
    label: { fr: "Famille", en: "Family" },
    sub: { fr: "Secrets · Trahisons · Retrouvailles", en: "Secrets · Betrayals · Reunions" },
    color: "#f97316",
    mode: "fast",
    genre: "Drame familial",
    tropes: "secret child, betrayal, hidden identity — liens du sang, secrets enfouis, retrouvailles explosives",
    ambianceVisuelle: "golden-hour",
    style: "⚡ Format Vertical",
  },
  {
    id: "thriller",
    emoji: "🔪",
    label: { fr: "Thriller", en: "Thriller" },
    sub: { fr: "Suspense · Manipulation", en: "Suspense · Manipulation" },
    color: "#dc2626",
    mode: "premium",
    genre: "Thriller psychologique",
    tropes: "betrayal, hidden identity, obsession — manipulation, révélations en cascade, personne n'est ce qu'il prétend",
    ambianceVisuelle: "dark-cine",
    style: "🎬 Cinéma",
  },
  {
    id: "dark",
    emoji: "🌃",
    label: { fr: "Dark Drama", en: "Dark Drama" },
    sub: { fr: "Crime · Psychologique", en: "Crime · Psychological" },
    color: "#7c3aed",
    mode: "premium",
    genre: "Dark Drama criminel",
    tropes: "betrayal, revenge, obsession, hidden identity — atmosphère sombre, personnages brisés, rédemption impossible",
    ambianceVisuelle: "urban-night",
    style: "🎬 Cinéma",
  },
  {
    id: "fantastique",
    emoji: "🌙",
    label: { fr: "Fantastique", en: "Fantasy" },
    sub: { fr: "Surnaturel · Pouvoirs · Paranormal", en: "Supernatural · Powers · Paranormal" },
    color: "#8b5cf6",
    mode: "premium",
    genre: "Fantastique surnaturel",
    tropes: "hidden identity, obsession, forbidden love — pouvoirs cachés, monde secret, destin impossible à fuir",
    ambianceVisuelle: "dark-cine",
    style: "🎬 Cinéma",
  },
  {
    id: "vengeance",
    emoji: "🔥",
    label: { fr: "Vengeance", en: "Revenge" },
    sub: { fr: "Justice · Plan · Trahison", en: "Justice · Plot · Betrayal" },
    color: "#ef4444",
    mode: "fast",
    genre: "Drame de vengeance",
    tropes: "revenge, betrayal, hidden identity — plan minutieux, humiliation retournée, le coupable ne s'y attend pas",
    ambianceVisuelle: "urban-night",
    style: "⚡ Format Vertical",
  },
  {
    id: "elite",
    emoji: "👑",
    label: { fr: "Élite & Pouvoir", en: "Elite & Power" },
    sub: { fr: "Argent · Héritiers · Secrets", en: "Money · Heirs · Secrets" },
    color: "#ca8a04",
    mode: "premium",
    genre: "Drama élite et pouvoir",
    tropes: "hidden identity, betrayal, forbidden love — guerre d'héritiers, façades parfaites, secrets financiers",
    ambianceVisuelle: "dark-cine",
    style: "🎬 Cinéma",
  },
  {
    id: "medical",
    emoji: "🏥",
    label: { fr: "Médical", en: "Medical" },
    sub: { fr: "Urgences · Dilemmes · Secrets", en: "ER · Dilemmas · Secrets" },
    color: "#0ea5e9",
    mode: "fast",
    genre: "Drama médical",
    tropes: "hidden identity, secret child, forbidden love — vies en jeu, double vie, secrets entre collègues",
    ambianceVisuelle: "dark-cine",
    style: "⚡ Format Vertical",
  },
  {
    id: "teen",
    emoji: "🎒",
    label: { fr: "Teen Drama", en: "Teen Drama" },
    sub: { fr: "Lycée · Scandale · Réseau social", en: "High school · Scandal · Social media" },
    color: "#06b6d4",
    mode: "fast",
    genre: "Teen drama scolaire",
    tropes: "enemies-to-lovers, forbidden love, hidden identity — secret révélé en live, rumeur virale, jalousie scolaire",
    ambianceVisuelle: "golden-hour",
    style: "⚡ Format Vertical",
  },
  {
    id: "comedie",
    emoji: "😂",
    label: { fr: "Comédie", en: "Comedy" },
    sub: { fr: "Quiproquos · Gags · Romance", en: "Mix-ups · Gags · Romance" },
    color: "#22c55e",
    mode: "fast",
    genre: "Comédie romantique",
    tropes: "fake dating, friends to lovers, grumpy x sunshine — quiproquos, maladresses, happy ending inattendu",
    ambianceVisuelle: "golden-hour",
    style: "⚡ Format Vertical",
  },
];

const REMAKE_INSPIRATIONS = [
  { id:"euphoria", emoji:"✨", label:"Euphoria", instr:"Adapte l'univers Euphoria: esthétique néon, addictions, identité brisée, chaos ado. Personnages fragiles et lumineux. Intimité crue et visuelle." },
  { id:"succession", emoji:"👑", label:"Succession", instr:"Adapte Succession: guerre de pouvoir familiale, argent, humiliation entre héritiers. Dialogues cinglants. Trahison systématique." },
  { id:"money-heist", emoji:"🎭", label:"La Casa de Papel", instr:"Adapte La Casa de Papel: casse + résistance + romance interdite. Tension de groupe. Chef charismatique et imprévisible." },
  { id:"breaking-bad", emoji:"💊", label:"Breaking Bad", instr:"Adapte Breaking Bad: transformation d'un personnage ordinaire en villain. Double vie. Empire qui se construit dans l'ombre." },
  { id:"white-lotus", emoji:"🌺", label:"White Lotus", instr:"Adapte White Lotus: hôtel de luxe, secrets de vacances, tensions de classe. Ironie mordante. Révélation finale dévastatrice." },
  { id:"beef", emoji:"🔥", label:"Beef", instr:"Adapte Beef: spirale de vengeance entre deux inconnus. Escalade absurde. Secrets de famille révélés en chemin." },
  { id:"dark", emoji:"🕳️", label:"Dark", instr:"Adapte Dark: mystère multigénérationnel, liens cachés entre familles. Atmosphère oppressante. Révélations en cascade." },
  { id:"the-crown", emoji:"👸", label:"The Crown", instr:"Adapte The Crown: institution contre individu. Sacrifice du bonheur pour le devoir. Façade parfaite, chaos intérieur." },
  { id:"stranger-things", emoji:"🔦", label:"Stranger Things", instr:"Adapte Stranger Things: mystère local, disparition, groupe d'amis face à une force invisible. Secrets institutionnels." },
  { id:"bridgerton", emoji:"💍", label:"Bridgerton", instr:"Adapte Bridgerton: romance de saison, ragots, mariage arrangé, passion secrète. Scandale révélé à la pire des moments." },
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
  {
    id: "ceo-cold", emoji: "💼", mode: "fast",
    label: { fr: "CEO Froid", en: "Cold CEO" },
    desc: { fr: "Patron glacial, assistante qu'il méprise, mariage arrangé pour sauver l'empire — tension explosive.", en: "Ice-cold CEO, assistant he despises, arranged marriage to save the empire — explosive tension." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Finance internationale", en: "International finance" }, secret: { fr: "Mariage arrangé secret", en: "Secret arranged marriage" },
    genre: "CEO romance", ambiance: "⚡ Intense & Direct",
    tropes: "CEO froid et distant, assistante sous-estimée, mariage de contrat, humiliation publique, jalousie possessive, identité cachée, revanche sur les actionnaires, faux couple qui devient réel, rival amoureux",
  },
  {
    id: "kdrama-pur", emoji: "🌸", mode: "premium",
    label: { fr: "K-Drama Pur", en: "Pure K-Drama" },
    desc: { fr: "Chaebol arrogant, vengeance sur 10 ans, fiançailles de façade — K-drama addictif.", en: "Arrogant chaebol, 10-year revenge plan, fake engagement — addictive K-drama." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Politique & Pouvoir", en: "Politics & Power" }, secret: { fr: "Plan de vengeance dissimulé", en: "Hidden revenge plan" },
    genre: "K-drama romantique", ambiance: "💜 Émotionnel & Poétique",
    tropes: "chaebol arrogant x fille ordinaire, slow burn enemies to lovers, fiançailles de façade, plan de vengeance sur des années, identité cachée révélée, mère possessive, premier amour retrouvé, triangle amoureux avec ami d'enfance, sacrifice du protagoniste",
  },
  {
    id: "medical-secret", emoji: "🏥", mode: "premium",
    label: { fr: "Médical Secret", en: "Medical Secret" },
    desc: { fr: "Chirurgien au passé trouble, patiente avec un secret mortel, identité cachée dans un hôpital privé.", en: "Surgeon with a dark past, patient with a deadly secret, hidden identity in a private hospital." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Hôpital privé", en: "Private hospital" }, secret: { fr: "Identité médicale cachée", en: "Hidden medical identity" },
    genre: "Medical drama", ambiance: "🧠 Psychologique & Lent",
    tropes: "chirurgien brillant au passé brisé, patient qui cache sa vraie identité, erreur médicale dissimulée, double vie médecin/patient, secret de famille révélé en salle d'op, relation interdite soignant/soigné, diagnostic qui change tout, complot interne à l'hôpital",
  },
  {
    id: "vengeance", emoji: "🔥", mode: "fast",
    label: { fr: "Vengeance", en: "Revenge" },
    desc: { fr: "Humiliation publique, 3 ans de préparation, retour d'identité cachée — revanche froide et addictive.", en: "Public humiliation, 3 years of prep, hidden identity comeback — cold addictive revenge." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Mode & Influence", en: "Fashion & Influence" }, secret: { fr: "Plan de vengeance dissimulé", en: "Hidden revenge plan" },
    genre: "Revenge drama", ambiance: "⚡ Intense & Direct",
    tropes: "humiliation publique passée, retour sous fausse identité, vengeance froide et calculée, allié inattendu, tomber amoureux de sa cible, l'ennemi découvre la vérité, sacrifice final, retournement de pouvoir, révélation publique explosive",
  },
  {
    id: "dark-academia", emoji: "📚", mode: "premium",
    label: { fr: "Dark Academia", en: "Dark Academia" },
    desc: { fr: "Université d'élite, société secrète, meurtre non résolu — l'ambition tue.", en: "Elite university, secret society, unsolved murder — ambition kills." },
    casting: { fr: "Trio mixte", en: "Mixed trio" }, univers: { fr: "Expérience secrète", en: "Secret experiment" }, secret: { fr: "Meurtre dissimulé", en: "Concealed murder" },
    genre: "Dark academia thriller", ambiance: "🧠 Psychologique & Lent",
    tropes: "société secrète de l'élite universitaire, meurtre non résolu d'un étudiant, nouveau membre qui découvre la vérité, rituel d'initiation qui tourne mal, obsession pour la perfection, trahison dans le groupe, professeur complice, manuscrit ou secret enseveli, sacrifier un ami pour réussir",
  },
  {
    id: "bff-drama", emoji: "💔", mode: "fast",
    label: { fr: "BFF Trahison", en: "BFF Betrayal" },
    desc: { fr: "Meilleure amie qui vole le fiancé, la carrière, la vie — trahison ultime en 9:16.", en: "Best friend steals the fiancé, the job, the life — ultimate betrayal in 9:16." },
    casting: { fr: "2 Femmes", en: "2 Women" }, univers: { fr: "Mode & Influence", en: "Fashion & Influence" }, secret: { fr: "Trahison de la meilleure amie", en: "Best friend betrayal" },
    genre: "Friendship betrayal drama", ambiance: "⚡ Intense & Direct",
    tropes: "meilleure amie jalouse depuis toujours, vol du fiancé ou du job, fausse gentillesse révélée en direct, preuve de trahison trouvée par accident, humiliation publique, la victime devient la prédatrice, ex-amie qui demande pardon, vrai ou faux regret, revanche froide",
  },
  {
    id: "famille-cachee", emoji: "🧬", mode: "premium",
    label: { fr: "Famille Cachée", en: "Hidden Family" },
    desc: { fr: "Test ADN qui brise tout, enfant secret, héritage volé — les secrets de famille explosent.", en: "DNA test that shatters everything, secret child, stolen inheritance — family secrets explode." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Héritage familial", en: "Family inheritance" }, secret: { fr: "Enfant caché", en: "Hidden child" },
    genre: "Famille & secrets", ambiance: "🧠 Psychologique & Lent",
    tropes: "test ADN qui révèle tout, enfant caché depuis des années, héritage volé par un faux héritier, double vie du père ou de la mère, fratrie qui ne savait pas, parent biologique qui réapparaît, testament falsifié, réunion de famille qui explose, amour interdit entre demi-frère et sœur",
  },
  {
    id: "paranormal-dark", emoji: "🌙", mode: "premium",
    label: { fr: "Paranormal Dark", en: "Paranormal Dark" },
    desc: { fr: "Vampire qui cache sa nature, loup-garou amoureux, monde caché sous la ville — dark romance addictive.", en: "Vampire hiding his nature, werewolf in love, hidden world beneath the city — addictive dark romance." },
    casting: { fr: "1 Femme + 1 Homme", en: "1 Woman + 1 Man" }, univers: { fr: "Monde caché", en: "Hidden world" }, secret: { fr: "Nature surnaturelle cachée", en: "Hidden supernatural nature" },
    genre: "Paranormal dark romance", ambiance: "💜 Émotionnel & Poétique",
    tropes: "être surnaturel qui cache sa vraie nature, humaine qui découvre le monde caché, lien d'âme ou de destin, clan qui interdit la relation, ennemi de sang amoureux, sacrifice pour protéger l'humaine, révélation de l'identité en danger, trahison dans le clan, choix entre deux mondes",
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
function LoadingVC({ msg }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <img src="/1024.webp" alt="VC" style={{ width: 56, height: 56, borderRadius: 14, marginBottom: 16, animation: "pulse 1.5s infinite", boxShadow: "0 0 24px rgba(232,92,58,0.45)" }} />
      {msg && <p style={{ fontSize: 14, color: "var(--mt)" }}>{msg}</p>}
    </div>
  );
}

function VCLogo() {
  return (
    <div style={{ userSelect: "none" }}>
      <img src="/1024.webp" alt="VC" style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "block" }} onError={e => { e.target.style.display='none'; }} />
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
      {sub && <span style={{ fontSize: 10, color: "var(--mt)" }}>{sub}</span>}
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
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--bo)", padding: "20px 20px 18px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--mt)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 12, fontFamily: "var(--sans)" }}>{t.back}</button>
        <h1 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 900, color: "var(--tx)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.my_series_title}</h1>
        <p style={{ fontSize: 12, color: "var(--mt)", marginTop: 4 }}>{series.length} {t.saved}</p>
      </div>
      <div style={{ padding: "20px", maxWidth: 520, margin: "0 auto" }}>
        {series.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--mt)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--bo)", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 15 }}>{t.no_series}</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>{t.generate_first}</p>
          </div>
        ) : series.map(s => (
          <div key={s.id} style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1.5px solid var(--bo)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 900, marginBottom: 4 }}>{s.bible.titre}</h3>
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

// ── STEP BAR — Progression narrative ─────────────────────────
const STEP_COLORS = ["#E85C3A", "#f97316", "#eab308", "#22c55e", "#a855f7"];
const STEP_DATA = {
  fr: [
    { emoji: "💡", short: "Idée"     },
    { emoji: "📖", short: "Bible"    },
    { emoji: "🎬", short: "Épisodes" },
    { emoji: "✍️", short: "Script"   },
    { emoji: "🎞️", short: "Tournage" },
  ],
  en: [
    { emoji: "💡", short: "Idea"     },
    { emoji: "📖", short: "Bible"    },
    { emoji: "🎬", short: "Episodes" },
    { emoji: "✍️", short: "Script"   },
    { emoji: "🎞️", short: "Shoot"    },
  ],
};

function StepBar({ step, lang = "fr" }) {
  const steps = STEP_DATA[lang] || STEP_DATA.fr;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "12px 12px 14px", gap: 0, borderBottom: "1px solid var(--bo)", background: "var(--bg)", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
      {steps.map((s, i) => {
        const n = i + 1;
        const done   = n < step;
        const active = n === step;
        const color  = STEP_COLORS[i];
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 44 }}>
              {/* Circle */}
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: done ? color : active ? color : "transparent",
                border: `1.5px solid ${done || active ? color : "var(--bo)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: done ? 12 : 14,
                color: done || active ? "#fff" : "var(--mt)",
                fontWeight: 800, fontFamily: "var(--sans)",
                flexShrink: 0,
                boxShadow: active ? `0 0 12px ${color}55` : "none",
                transition: "all .25s",
              }}>
                {done ? "✓" : s.emoji}
              </div>
              {/* Label */}
              <span style={{
                fontSize: 7.5, fontWeight: active ? 800 : done ? 600 : 400,
                color: active ? color : done ? "var(--tx)" : "var(--mt)",
                whiteSpace: "nowrap", letterSpacing: 0.8,
                textTransform: "uppercase", opacity: 1,
                fontFamily: "var(--sans)",
              }}>{s.short}</span>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div style={{
                height: 1.5, width: 20, flexShrink: 0,
                background: done ? `${STEP_COLORS[i]}55` : "var(--bo)",
                margin: "0 2px", marginBottom: 14,
                transition: "background .3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SectionHead({ title, sub, sep = true }) {
  return (
    <>
      {sep && <div style={{ height: 1, background: "var(--bo)", margin: "6px 0 20px" }} />}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: sub ? 5 : 0 }}>
          <div style={{ width: 2.5, height: 16, background: "var(--r)", borderRadius: 2, flexShrink: 0 }} />
          <h2 style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 900, letterSpacing: "0.1em", margin: 0, color: "var(--tx)", lineHeight: 1.1, textTransform: "uppercase" }}>{title}</h2>
        </div>
        {sub && <p style={{ fontSize: 11, color: "var(--mt)", margin: "3px 0 0 10px", lineHeight: 1.4 }}>{sub}</p>}
      </div>
    </>
  );
}

function Mixeur({ state, set, onGen, onMesSeries, hasSeries, plan, t, opts, lang, onUpgrade, toggleLang, logout, isAdmin, setPlan }) {
  const univOpts = state.mode === "fast" ? opts.univers_fast : opts.univers_prem;
  const secOpts = state.mode === "fast" ? opts.secret_fast : opts.secret_prem;
  const totalMin = Math.round(state.format * state.duree / 60);
  const [customInputs, setCustomInputs] = useState({ casting: "", univers: "", secret: "" });
  const [castingCat, setCastingCat] = useState("romance");
  const [mixTab, setMixTab] = useState("format");
  const mixScrollRef = useRef(null);
  useEffect(() => { if (mixScrollRef.current) mixScrollRef.current.scrollTop = 0; }, [mixTab]);
  const [creationMode, setCreationMode] = useState("mixeur"); // "mixeur" | "packs"
  const [showHelp, setShowHelp] = useState(false);

  const MIX_TABS = lang === "en"
    ? [{ id: "format", label: "Format" }, { id: "persos", label: "Cast" }, { id: "univers", label: "Story" }, { id: "ambiance", label: "Style" }]
    : [{ id: "format", label: "Format" }, { id: "persos", label: "Persos" }, { id: "univers", label: "Univers" }, { id: "ambiance", label: "Ambiance" }];

  const FORMAT_TROPES = {
    romance:     ["enemies-to-lovers", "fake-dating"],
    kdrama:      ["enemies-to-lovers", "forbidden-love"],
    famille:     ["secret-child", "betrayal"],
    thriller:    ["betrayal", "hidden-identity"],
    dark:        ["betrayal", "revenge"],
    fantastique: ["hidden-identity", "forbidden-love"],
    vengeance:   ["revenge", "betrayal"],
    elite:       ["hidden-identity", "betrayal"],
    medical:     ["hidden-identity", "secret-child"],
    teen:        ["enemies-to-lovers", "hidden-identity"],
    comedie:     ["fake-dating", "friends-to-lovers"],
  };

  const selectFormat = (f) => {
    const isToggleOff = false; // never deselect — always apply
    set(prev => ({
      genreFormat: prev.genreFormat === f.id ? null : f.id,
      genre: f.genre,
      tropes: f.tropes ? f.tropes : prev.tropes,
      ambianceVisuelle: f.ambianceVisuelle ? f.ambianceVisuelle : prev.ambianceVisuelle,
      style: f.style,
      tropesSel: FORMAT_TROPES[f.id] || [],
      packId: null, // reset pack to avoid conflicts
    }));
  };

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

  const HELP_STEPS = [
    { emoji: "💡", label: "IDÉE", desc: "Genre, budget, univers, casting, secret central" },
    { emoji: "📖", label: "BIBLE", desc: "L'IA génère le concept complet : titre, logline, persos, tension" },
    { emoji: "🎬", label: "ÉPISODES", desc: "La série entière planifiée automatiquement (10 à 90 épisodes)" },
    { emoji: "✍️", label: "SCRIPT", desc: "Génère chaque script, modifie-le (Pimenter, Simplifier...)" },
    { emoji: "🎥", label: "TOURNAGE", desc: "Checklist, storyboard, export PDF" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Help Modal */}
      {showHelp && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(9,9,15,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }} onClick={() => setShowHelp(false)}>
          <div style={{
            background: "#13131e",
            border: "1px solid #2a2a40",
            borderRadius: 20,
            padding: "24px 20px",
            maxWidth: 400,
            width: "100%",
            maxHeight: "80vh",
            overflowY: "auto",
            position: "relative",
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowHelp(false)} style={{
              position: "absolute", top: 14, right: 14,
              background: "none", border: "none",
              fontSize: 20, color: "rgba(255,255,255,0.4)",
              cursor: "pointer", lineHeight: 1, padding: 4,
              fontFamily: "var(--sans)",
            }}>×</button>
            <h2 style={{
              fontFamily: "var(--sans)", fontSize: 17, fontWeight: 800,
              color: "var(--tx)", marginBottom: 20, letterSpacing: -0.3,
            }}>Comment ça marche ?</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {HELP_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "#E85C3A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", color: "#E85C3A", marginBottom: 2 }}>{step.emoji} {step.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="/aide" style={{
              display: "block", textAlign: "center",
              fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700,
              color: "#E85C3A", textDecoration: "none",
              padding: "10px 0",
              borderTop: "1px solid #2a2a40",
            }}>Guide complet →</a>
          </div>
        </div>
      )}
      {/* Header fixe — logo + boutons + plan + toggle Mixeur/Packs */}
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--bo)", padding: "10px 16px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <VCLogo />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isAdmin && <button onClick={() => setPlan(p => p === "standard" ? "premium" : "standard")} style={{ background: plan === "standard" ? "rgba(232,92,58,0.12)" : "rgba(168,85,247,0.12)", border: `1px solid ${plan === "standard" ? "rgba(232,92,58,0.3)" : "rgba(168,85,247,0.3)"}`, borderRadius: 8, padding: "3px 7px", fontSize: 9, fontWeight: 700, color: plan === "standard" ? "#E85C3A" : "#a855f7", cursor: "pointer", fontFamily: "var(--sans)" }}>👁</button>}
            <button onClick={toggleLang} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, padding: "3px 7px", fontSize: 10, fontWeight: 700, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)", letterSpacing: 0.5 }}>{lang === "fr" ? "EN" : "FR"}</button>
            <button onClick={() => setShowHelp(true)} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)", padding: 0, flexShrink: 0 }}>?</button>
            <button onClick={logout} style={{ background: "none", border: "none", fontSize: 11, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)" }}>{t.logout}</button>
            <button onClick={async (e) => {
              if (plan === "standard") { onUpgrade("serie"); return; }
              const btn = e.currentTarget;
              btn.style.opacity = "0.5";
              try {
                const r = await fetch("/api/portal", { method: "POST" });
                const d = await r.json();
                if (d.url) { window.location.href = d.url; return; }
              } catch {}
              btn.style.opacity = "1";
              window.location.href = "/tarifs";
            }} style={{ display: "flex", alignItems: "center", gap: 4, background: plan === "standard" ? "rgba(232,92,58,0.08)" : "rgba(168,85,247,0.08)", border: `1px solid ${plan === "standard" ? "rgba(232,92,58,0.25)" : "rgba(168,85,247,0.25)"}`, borderRadius: 20, padding: "4px 10px 4px 8px", cursor: "pointer", transition: "opacity .2s" }}>
              <span style={{ fontSize: 9, color: "var(--mt)", fontWeight: 600, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: 1 }}>Plan</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: plan === "standard" ? "#E85C3A" : "#a855f7", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--sans)" }}>
                {plan === "standard" ? (lang === "en" ? "Creator" : "Créateur") : "Premium"}
              </span>
              <span style={{ fontSize: 9, color: plan === "standard" ? "#E85C3A" : "#a855f7", opacity: 0.6 }}>›</span>
            </button>
          </div>
        </div>
        {/* Bannière fixe */}
        <div style={{ margin: "8px -16px 8px", position: "relative", height: 100, overflow: "hidden" }}>
          <img src="/studio.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,9,15,0.2) 0%, rgba(9,9,15,0.6) 65%, var(--card) 100%)" }} />
          <div style={{ position: "absolute", bottom: 8, left: 16 }}>
            <p style={{ fontSize: 16, fontWeight: 900, color: "#fff", fontFamily: "var(--sans)", letterSpacing: -0.3, margin: 0 }}>{lang === "fr" ? "Crée ta série !" : "Create your series!"}</p>
          </div>
        </div>
        {/* Mode selector — Packs vs Mixeur */}
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setCreationMode("mixeur")} style={{ flex: 1, padding: "7px 10px", borderRadius: 10, border: `2px solid ${creationMode === "mixeur" ? "var(--r)" : "var(--bo)"}`, background: creationMode === "mixeur" ? "rgba(232,92,58,0.12)" : "var(--card)", cursor: "pointer", fontFamily: "var(--sans)", transition: "all .15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 15 }}>🎛️</span>
            <div style={{ fontSize: 12, fontWeight: 900, color: creationMode === "mixeur" ? "var(--r)" : "var(--tx)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{lang === "fr" ? "Mixeur" : "Mixer"}</div>
          </button>
          <button onClick={() => setCreationMode("packs")} style={{ flex: 1, padding: "7px 10px", borderRadius: 10, border: `2px solid ${creationMode === "packs" ? "#a855f7" : "var(--bo)"}`, background: creationMode === "packs" ? "rgba(168,85,247,0.12)" : "var(--card)", cursor: "pointer", fontFamily: "var(--sans)", transition: "all .15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 15 }}>🎯</span>
            <div style={{ fontSize: 12, fontWeight: 900, color: creationMode === "packs" ? "#a855f7" : "var(--tx)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{lang === "fr" ? "Packs" : "Packs"}</div>
          </button>
        </div>
      </div>

      {/* Tab bar + contenu — seulement en mode Mixeur */}
      {creationMode === "mixeur" && <div style={{ display: "flex", background: "var(--bg)", borderBottom: "1.5px solid var(--bo)", flexShrink: 0 }}>
        {MIX_TABS.map(tab => {
          const active = mixTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setMixTab(tab.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px 8px", border: "none", background: "none", cursor: "pointer", borderBottom: `2.5px solid ${active ? "var(--r)" : "transparent"}`, transition: "all .15s", fontFamily: "var(--sans)" }}>
              <span style={{ fontSize: 9, fontWeight: active ? 800 : 500, color: active ? "var(--r)" : "var(--mt)", letterSpacing: 0.8, textTransform: "uppercase" }}>{tab.label}</span>
            </button>
          );
        })}
      </div>}

      {/* ═══ MODE PACKS ═══ */}
      {creationMode === "packs" && (
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <div style={{ padding: "12px 16px 8px" }}>
            <p style={{ fontSize: 18, fontWeight: 900, color: "var(--tx)", fontFamily: "var(--sans)", letterSpacing: -0.5, marginBottom: 4 }}>
              {lang === "fr" ? "🎯 Tu veux pas te prendre la tête ?" : "🎯 Don't want to overthink it?"}
            </p>
            <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.5, marginBottom: 16 }}>
              {lang === "fr" ? "Choisis un pack — genre, casting, ambiance, secrets, tout est déjà configuré." : "Pick a pack — genre, casting, mood, secrets, everything's already set."}
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
                    if (locked) { onUpgrade("serie"); return; }
                    set({ mode: p.mode, casting: pCasting, univers: pUnivers, secret: pSecret, genre: p.genre, ambiance: p.ambiance, tropes: p.tropes, tropesSel: [], packId: active ? null : p.id, format: p.mode === "fast" && state.format > 20 ? 20 : state.format });
                  }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: `2px solid ${locked ? "rgba(168,85,247,0.2)" : active ? "var(--r)" : "var(--bo)"}`, background: locked ? "rgba(168,85,247,0.04)" : active ? "var(--r)" : "var(--card)", cursor: "pointer", fontFamily: "var(--sans)", textAlign: "left", transition: "all .15s", position: "relative" }}>
                    <span style={{ fontSize: 28, flexShrink: 0, opacity: locked ? 0.5 : 1 }}>{p.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0, opacity: locked ? 0.7 : 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: active ? "#fff" : "var(--tx)" }}>{pLabel}</span>
                        <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: p.mode === "premium" ? "rgba(168,85,247,0.15)" : "rgba(232,92,58,0.15)", color: p.mode === "premium" ? "#a855f7" : "#E85C3A", fontWeight: 700, letterSpacing: 0.5, border: p.mode === "premium" ? "1px solid rgba(168,85,247,0.3)" : "none" }}>{p.mode === "premium" ? "🔒 PRO" : "Creator"}</span>
                      </div>
                      <span style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.8)" : "var(--mt)", lineHeight: 1.3 }}>{pDesc}</span>
                    </div>
                    {locked && <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Scrollable content per tab — seulement en mode Mixeur */}
      {creationMode === "mixeur" && <div ref={mixScrollRef} style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 8px", maxWidth: 520, margin: "0 auto" }}>

        {/* ═══ TAB: AMBIANCE ═══ */}
        {mixTab === "ambiance" && (<>

        {/* Ambiance Visuelle */}
        <div style={{ marginBottom: 28 }}>
          <SectionHead sep={false} title={lang === "fr" ? "Identité Visuelle" : "Visual Identity"} sub={lang === "fr" ? "L'esthétique cinématographique de ta série" : "The cinematic aesthetic of your series"} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {AMBIANCE_VIS.map(av => {
              const avLabel = av.label[lang] || av.label.fr;
              const avDesc = av.desc[lang] || av.desc.fr;
              const active = state.ambianceVisuelle === av.id;
              return (
                <button key={av.id} onClick={() => set({ ambianceVisuelle: active ? "" : av.id })} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "12px 13px", borderRadius: 14, border: `2px solid ${active ? av.palette[2] : "var(--bo)"}`, background: active ? `${av.palette[0]}22` : "var(--card)", cursor: "pointer", fontFamily: "var(--sans)", textAlign: "left", transition: "all .15s", gap: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontSize: 22 }}>{av.emoji}</span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {av.palette.map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.15)" }} />)}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: active ? av.palette[2] : "var(--tx)", lineHeight: 1.2 }}>{avLabel}</div>
                  <div style={{ fontSize: 10, color: "var(--mt)", lineHeight: 1.4 }}>{avDesc}</div>
                  <div style={{ fontSize: 9, color: "var(--mt)", fontStyle: "italic" }}>{av.refs}</div>
                </button>
              );
            })}
          </div>
        </div>

        </>)} {/* end TAB: AMBIANCE - visual identity only (moteur/direction added below) */}

        {/* ═══ TAB: PERSOS ═══ */}
        {mixTab === "persos" && (<>

        {/* Casting IA */}
        <div style={{ marginBottom: 28 }}>
          <SectionHead sep={false} title={lang === "fr" ? "Casting" : "Casting"} sub={lang === "fr" ? "Donne une identité forte à chaque personnage — âge, aura, blessures" : "Give each character a powerful identity — age, aura, wounds"} />
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
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--mt)", marginBottom: 2 }}>Compatibilité IA</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--tx)" }}>{compat.label}</p>
                </div>
              </div>
            ) : null;
          })()}
          {/* Modifiers */}
          {[
            { key: "physique",   mods: CASTING_PHYSIQUE,  max: 1, label: { fr: "🧬 Morphologie",           en: "🧬 Body type" } },
            { key: "culture",    mods: CASTING_CULTURE,   max: 1, label: { fr: "🌍 Origine culturelle",     en: "🌍 Cultural origin" } },
            { key: "aesthetic",  mods: CASTING_AESTHETIC, max: 2, label: { fr: "✨ Esthétique",             en: "✨ Aesthetic" } },
            { key: "blessure",   mods: CASTING_BLESSURE,  max: 2, label: { fr: "💔 Défauts & Blessures",    en: "💔 Flaws & Wounds" } },
            { key: "aura",       mods: CASTING_AURA,      max: 1, label: { fr: "✨ Aura",                   en: "✨ Aura" } },
          ].map(({ key, mods, max, label }) => {
            const sel = state.castingMods?.[key] || [];
            const atMax = sel.length >= max;
            return (
            <div key={key} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--mt)" }}>{label[lang] || label.fr}</p>
                <span style={{ fontSize: 10, color: atMax ? "var(--r)" : "var(--bo)", fontWeight: 700 }}>
                  {sel.length}/{max}
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {mods.map(m => {
                  const mLabel = m.label[lang] || m.label.fr;
                  const active = sel.includes(m.id);
                  const disabled = atMax && !active;
                  return (
                    <button key={m.id} onClick={() => {
                      if (disabled) return;
                      set(prev => {
                        const cur = prev.castingMods?.[key] || [];
                        const next = active ? cur.filter(x => x !== m.id) : [...cur, m.id];
                        return { castingMods: { ...(prev.castingMods || {}), [key]: next } };
                      });
                    }} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 100, border: `1.5px solid ${active ? "var(--n)" : "var(--bo)"}`, background: active ? "var(--n)22" : "var(--card)", color: active ? "var(--n)" : disabled ? "var(--bo)" : "var(--tx)", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.35 : 1, fontSize: 11, fontWeight: active ? 700 : 400, fontFamily: "var(--sans)", transition: "all .15s" }}>
                      <span>{m.emoji}</span><span>{mLabel}</span>
                    </button>
                  );
                })}
              </div>
              {/* Desc pour les chips avec description (ex: Diaspora) */}
              {sel.map(id => {
                const m = mods.find(x => x.id === id);
                if (!m?.desc) return null;
                const d = m.desc[lang] || m.desc.fr;
                return <p key={id} style={{ fontSize: 11, color: "var(--n)", marginTop: 6, fontStyle: "italic" }}>🧳 {d}</p>;
              })}
            </div>
          );})}
        </div>

        </>)} {/* end TAB: PERSOS */}

        {/* Genre + Budget + Lieux + Tropes — in UNIVERS tab */}
        {mixTab === "univers" && (<>

        {/* Genre */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 3, height: 18, background: "var(--r)", borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: "0.06em", color: "var(--tx)", fontFamily: "var(--sans)", textTransform: "uppercase" }}>{lang === "fr" ? "Genre" : "Genre"}</span>
          </div>
          <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {STORY_FORMATS.map(f => {
              const active = state.genreFormat === f.id;
              return (
                <button key={f.id} onClick={() => selectFormat(f)}
                  style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 22, border: `2px solid ${active ? f.color : "var(--bo)"}`, background: active ? `${f.color}28` : "var(--card)", cursor: "pointer", transition: "all .18s" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: active ? f.color : "var(--tx)", whiteSpace: "nowrap" }}>{f.emoji} {f.label[lang] || f.label.fr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 3, height: 18, background: "var(--r)", borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: "0.06em", color: "var(--tx)", fontFamily: "var(--sans)", textTransform: "uppercase" }}>{lang === "fr" ? "Budget" : "Budget"}</span>
          </div>
          <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
            {BUDGET_LEVELS.map(b => {
              const bLabel = b.label[lang] || b.label.fr;
              const active = state.budget === b.id;
              return (
                <button key={b.id} onClick={() => set({ budget: b.id, lieu: "" })} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "9px 6px", borderRadius: 12, border: `2px solid ${active ? b.color : "var(--bo)"}`, background: active ? `${b.color}18` : "var(--card)", cursor: "pointer", fontFamily: "var(--sans)", transition: "all .15s" }}>
                  <span style={{ fontSize: 18 }}>{b.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: active ? 800 : 500, color: active ? b.color : "var(--tx)", textAlign: "center", lineHeight: 1.2 }}>{bLabel}</span>
                </button>
              );
            })}
          </div>
          {/* Lieux */}
          <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 2, WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {ALL_LIEUX.map(l => {
              const lLabel = l.label[lang] || l.label.fr;
              const active = state.lieu === lLabel;
              return (
                <button key={l.id} onClick={() => set({ lieu: active ? "" : lLabel })} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 3, padding: "5px 10px", borderRadius: 100, border: `1.5px solid ${active ? "var(--r)" : "var(--bo)"}`, background: active ? "rgba(232,92,58,0.12)" : "var(--card)", color: active ? "var(--r)" : "var(--tx)", cursor: "pointer", fontSize: 11, fontWeight: active ? 700 : 400, fontFamily: "var(--sans)", transition: "all .15s", whiteSpace: "nowrap" }}>
                  <span>{l.emoji}</span><span>{lLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Codes Narratifs */}
        <div style={{ marginBottom: 28 }}>
          {(() => {
            const MAX_TROPES = 2;
            const selCount = (state.tropesSel || []).length;
            const atMax = selCount >= MAX_TROPES;
            return (<>
              <SectionHead sep={false} title={lang === "fr" ? "Codes Narratifs" : "Story Codes"} sub={lang === "fr" ? `Choisis 1 ou 2 tropes — ${selCount === 0 ? "aucun sélectionné" : selCount === 1 ? "1 sélectionné" : `${selCount}/${MAX_TROPES} — max atteint`}` : `Pick 1 or 2 — ${selCount === 0 ? "none selected" : selCount === 1 ? "1 selected" : `${selCount}/${MAX_TROPES} — max reached`}`} />
              {[{ cat: "romance", label: t.tropes_romance, color: "#e879a0" }, { cat: "drama", label: t.tropes_drama, color: "var(--n)" }].map(({ cat, label: catLabel, color }) => (
                <div key={cat} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color, marginBottom: 8 }}>{catLabel}</p>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {TROPES.filter(tr => tr.cat === cat).map(tr => {
                      const tLabel = typeof tr.label === "object" ? (tr.label[lang] || tr.label.fr) : tr.label;
                      const active = (state.tropesSel || []).includes(tr.id);
                      const disabled = atMax && !active;
                      return (
                        <button key={tr.id} onClick={() => {
                          if (disabled) return;
                          set(prev => {
                            const sel = prev.tropesSel || [];
                            return { tropesSel: active ? sel.filter(x => x !== tr.id) : [...sel, tr.id] };
                          });
                        }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 100, border: `1.5px solid ${active ? (cat === "romance" ? "#e879a0" : "var(--n)") : "var(--bo)"}`, background: active ? (cat === "romance" ? "#e879a022" : "var(--n)22") : "var(--card)", color: active ? (cat === "romance" ? "#e879a0" : "var(--n)") : disabled ? "var(--mt)" : "var(--tx)", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, fontSize: 12, fontWeight: active ? 700 : 500, fontFamily: "var(--sans)", transition: "all .15s" }}>
                          <span>{tLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>);
          })()}
        </div>

        {[
          { label: t.casting, options: opts.casting, key: "casting", titleFr: "Casting", titleEn: "Casting", subFr: "Composition des personnages", subEn: "Character composition" },
          { label: t.univers, options: univOpts, key: "univers", titleFr: "Univers", titleEn: "Setting", subFr: "Le monde dans lequel se déroule la série", subEn: "The world your series takes place in" },
          { label: t.secret, options: secOpts, key: "secret", titleFr: "Secret Central", titleEn: "Central Secret", subFr: "Le moteur dramatique de toute la série", subEn: "The dramatic engine of the entire series" },
        ].map(({ label, options, key, titleFr, titleEn, subFr, subEn }) => (
          <div key={key} style={{ marginBottom: 22 }}>
            <SectionHead title={lang === "fr" ? titleFr : titleEn} sub={lang === "fr" ? subFr : subEn} />
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
                style={{ marginTop: 10, width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--r)", background: "var(--bg)", color: "var(--tx)", fontFamily: "var(--sans)", fontSize: 14, outline: "none", boxShadow: "0 0 0 3px rgba(232,92,58,0.1)" }}
              />
            )}
          </div>
        ))}

        </>)} {/* end TAB: UNIVERS */}

        {/* ═══ TAB: FORMAT — durée + épisodes ═══ */}
        {mixTab === "format" && (<>

        <div style={{ marginBottom: 22 }}>
          <SectionHead sep={false} title={lang === "fr" ? "Durée par Épisode" : "Episode Duration"} sub={lang === "fr" ? "Format du script généré" : "Generated script format"} />
          <div style={{ display: "flex", gap: 8 }}>
            {[{ v: 60, l: DUR_LABEL[lang][60], s: t.dur_std }, { v: 90, l: DUR_LABEL[lang][90], s: t.dur_intense }, { v: 120, l: DUR_LABEL[lang][120], s: t.dur_epic }].map(({ v, l, s }) => (
              <Chip key={v} label={l} sub={s} block active={state.duree === v} onClick={() => set({ duree: v })} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <SectionHead title={lang === "fr" ? "Nombre d'Épisodes" : "Number of Episodes"} sub={plan === "standard" ? (lang === "fr" ? "Max 20 épisodes · jusqu'à 90 avec le plan Pro" : "Max 20 episodes · up to 90 with Pro plan") : (lang === "fr" ? "Jusqu'à 90 épisodes" : "Up to 90 episodes")} />
          <div style={{ display: "flex", gap: 8 }}>
            {[10, 20, 40, 60, 90].map(f => {
              const needsSerie = f > 20;
              const lockedPlan = plan === "standard" && f > 20;
              const locked = lockedPlan;
              const inactiveSerie = state.mode === "fast" && f > 20 && !lockedPlan;
              const handleClick = () => {
                if (lockedPlan) {
                  onUpgrade("episodes");
                  return;
                }
                if (inactiveSerie) {
                  set({ mode: "premium", format: f, univers: lang === "en" ? "AI startup" : "Start-up IA", secret: lang === "en" ? "Internal sabotage" : "Sabotage interne", genreFormat: null });
                  return;
                }
                set({ format: f });
              };
              return (
                <div key={f} style={{ flex: 1 }}>
                  <Chip
                    label={`${f} ép.`}
                    sub={lockedPlan ? "🔒 PRO" : inactiveSerie ? "Série →" : `${Math.round(f * state.duree / 60)} min`}
                    block
                    active={state.format === f && state.mode === (f > 20 ? "premium" : state.mode)}
                    onClick={handleClick}
                  />
                </div>
              );
            })}
          </div>
        </div>

        </>)} {/* end TAB: FORMAT - épisodes */}

        {/* Style de script + Remake — in AMBIANCE tab */}
        {mixTab === "ambiance" && (<>

        {/* Style de script */}
        <div style={{ marginBottom: 20 }}>
          <SectionHead title={lang === "fr" ? "Style de Script" : "Script Style"} sub={lang === "fr" ? "Influence le rythme, les dialogues et la mise en scène" : "Influences rhythm, dialogue and direction"} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { v: "🎬 Cinéma", s: t.style_cinema },
              { v: "⚡ Format Vertical", s: t.style_tiktok },
              { v: "🎭 Soap Opera", s: t.style_soap },
              { v: "🎙️ Voix Off", s: t.style_voixoff },
            ].map(({ v, s }) => {
              const isActive = state.style === v || (v === "⚡ Format Vertical" && (state.style === "⚡ TikTok Drama" || state.style === "⚡ Vertical Drama"));
              return (
                <button key={v} onClick={() => set({ style: v })} style={{ flex: "1 1 40%", padding: "10px 8px", borderRadius: 12, border: `2px solid ${isActive ? "var(--r)" : "var(--bo)"}`, background: isActive ? "var(--r)" : "var(--card)", color: isActive ? "#fff" : "var(--tx)", cursor: "pointer", fontFamily: "var(--sans)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                  <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{s}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Remake / Inspiration Série */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: "var(--tx)", marginBottom: 12 }}>
            {t.remake_label} <span style={{ fontSize: 13, fontWeight: 400 }}>{t.remake_sub}</span>
          </p>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {REMAKE_INSPIRATIONS.map(r => {
              const active = state.remake === r.id;
              return (
                <button key={r.id} onClick={() => set({ remake: active ? null : r.id })} style={{ flexShrink: 0, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 12px", borderRadius: 12, border: `2px solid ${active ? "var(--r)" : "var(--bo)"}`, background: active ? "var(--r)" : "var(--card)", color: active ? "#fff" : "var(--tx)", cursor: "pointer", fontFamily: "var(--sans)", transition: "all .15s" }}>
                  <span style={{ fontSize: 20 }}>{r.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Moteur Émotionnel — Fast (curseurs) */}
        {state.mode === "fast" && (
          <div style={{ marginBottom: 24 }}>
            <SectionHead
              title={lang === "fr" ? "🎚 Moteur Émotionnel" : "🎚 Emotional Engine"}
              sub={lang === "fr" ? "Compose l'intensité de ta série — dose chaque ingrédient" : "Compose your series intensity — tune each ingredient"}
            />
            {[
              { key: "romance",  label: lang === "fr" ? "💕 Romance"     : "💕 Romance",     lo: t.lo_romance,   hi: t.hi_romance  },
              { key: "toxicite", label: lang === "fr" ? "☠️ Toxicité"    : "☠️ Toxicity",    lo: t.lo_toxicite,  hi: t.hi_toxicite },
              { key: "mystere",  label: lang === "fr" ? "🔍 Twist & Mystère" : "🔍 Twist & Mystery", lo: t.lo_mystere, hi: t.hi_mystere },
              { key: "humour",   label: lang === "fr" ? "😈 Humour noir" : "😈 Dark humour", lo: t.lo_humour,    hi: t.hi_humour   },
              { key: "violence", label: lang === "fr" ? "💥 Violence"    : "💥 Violence",    lo: t.lo_violence,  hi: t.hi_violence },
              { key: "spicy",    label: lang === "fr" ? "🔥 Tension"     : "🔥 Tension",     lo: t.lo_spicy,     hi: t.hi_spicy    },
            ].map(({ key, label, lo, hi }) => {
              const val = state.drama?.[key] ?? 5;
              const accent = val >= 7 ? "var(--r)" : val >= 4 ? "var(--n)" : "var(--mt)";
              return (
                <div key={key} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tx)" }}>{label}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: accent, minWidth: 20, textAlign: "right" }}>{val}/10</span>
                  </div>
                  <input type="range" min={0} max={10} value={val}
                    onChange={e => set({ drama: { ...(state.drama || {}), [key]: Number(e.target.value) } })}
                    style={{ width: "100%", accentColor: accent, cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 9, color: "var(--mt)" }}>{lo}</span>
                    <span style={{ fontSize: 9, color: "var(--mt)" }}>{hi}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Direction Artistique — Série/Premium (chips qualitatives) */}
        {state.mode === "premium" && (() => {
          const CATS_FR = [
            { key: "emotion",  label: "Émotion",            emoji: "🎭", opts: ["Intime", "Épique", "Mélancolique", "Brutal"] },
            { key: "rythme",   label: "Rythme narratif",    emoji: "⏱", opts: ["Slow burn", "Progressif", "Frénétique", "Minimaliste"] },
            { key: "narration",label: "Structure",           emoji: "🔀", opts: ["Linéaire", "Fragmentée", "Mystère", "Multi-POV"] },
            { key: "ton",      label: "Ton",                 emoji: "🎨", opts: ["Réaliste", "Poétique", "Commercial", "Auteur"] },
            { key: "tension",  label: "Tension relationnelle", emoji: "⚡", opts: ["Romance", "Rivalité", "Toxicité", "Désir"] },
          ];
          const CATS_EN = [
            { key: "emotion",  label: "Emotion",             emoji: "🎭", opts: ["Intimate", "Epic", "Melancholic", "Brutal"] },
            { key: "rythme",   label: "Narrative pace",      emoji: "⏱", opts: ["Slow burn", "Progressive", "Frenetic", "Minimalist"] },
            { key: "narration",label: "Structure",            emoji: "🔀", opts: ["Linear", "Fragmented", "Mystery", "Multi-POV"] },
            { key: "ton",      label: "Tone",                 emoji: "🎨", opts: ["Realistic", "Poetic", "Commercial", "Auteur"] },
            { key: "tension",  label: "Relational tension",  emoji: "⚡", opts: ["Romance", "Rivalry", "Toxicity", "Desire"] },
          ];
          const cats = lang === "en" ? CATS_EN : CATS_FR;
          return (
            <div style={{ marginBottom: 24 }}>
              <SectionHead
                title={lang === "fr" ? "Direction Artistique" : "Artistic Direction"}
                sub={lang === "fr" ? "Compose le langage cinématographique de ta série" : "Compose the cinematic language of your series"}
              />
              {cats.map(cat => {
                const selected = state.dramaPremium?.[cat.key] ?? null;
                return (
                  <div key={cat.key} style={{ marginBottom: 18 }}>
                    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--mt)", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{cat.emoji}</span>{cat.label}
                    </p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {cat.opts.map(opt => {
                        const active = selected === opt;
                        return (
                          <button key={opt}
                            onClick={() => set(prev => ({ dramaPremium: { ...(prev.dramaPremium || {}), [cat.key]: active ? null : opt } }))}
                            style={{ padding: "8px 15px", borderRadius: 100, border: `1.5px solid ${active ? "var(--n)" : "var(--bo)"}`, background: active ? "var(--n)" : "var(--card)", color: active ? "#fff" : "var(--tx)", cursor: "pointer", fontSize: 12, fontWeight: active ? 700 : 400, fontFamily: "var(--sans)", transition: "all .15s", letterSpacing: 0.2 }}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        </>)} {/* end TAB: AMBIANCE */}

      </div>
      </div>}

      {/* ═══ Sticky bottom — Generate button ═══ */}
      <div style={{ flexShrink: 0, padding: "14px 20px 18px", borderTop: "1.5px solid var(--bo)", background: "var(--bg)" }}>
        <button onClick={onGen} style={{ background: "linear-gradient(135deg, #E85C3A 0%, #c94424 100%)", color: "#fff", border: "none", padding: "18px 20px", borderRadius: 14, width: "100%", fontSize: 15, fontWeight: 900, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "var(--sans)", boxShadow: "0 6px 28px rgba(232,92,58,0.4)", transition: "opacity .2s" }}>
          {t.generate}
        </button>
        <p style={{ fontSize: 11, color: "var(--mt)", textAlign: "center", marginTop: 8 }}>
          {state.format} ép. · {DUR_LABEL[lang][state.duree]} · {totalMin} {t.content}
        </p>
        {hasSeries && (
          <button onClick={onMesSeries} style={{ background: "none", border: "1.5px solid var(--bo)", color: "var(--tx)", padding: 12, borderRadius: 14, width: "100%", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8, fontFamily: "var(--sans)" }}>
            {t.my_series}
          </button>
        )}
      </div>
    </div>
  );
}

function BibleView({ bible, episodes, mode, duree, onEp, onBack, customerId, plan, onAffiche, t, lang, onUpgrade, toggleLang, logout, isAdmin }) {
  const [tab, setTab] = useState("bible");
  const [cartes, setCartes] = useState(null);
  const [loadingCartes, setLoadingCartes] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = React.useRef(null);

  React.useEffect(() => {
    if (!showMore) return;
    const handler = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler); };
  }, [showMore]);

  const genCartes = async () => {
    setTab("persos");
    if (cartes && cartes.length > 0) return;
    setCartes(null);
    setLoadingCartes(true);
    try {
      const r = await gen("cartes", { personnages: bible.personnages || [], titre: bible.titre, genre: bible.genre, lang }, customerId);
      setCartes(r.cartes || []);
    } catch (e) {
      console.error(e);
      setCartes(null);
    }
    setLoadingCartes(false);
  };

  const copyText = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  const bibleStep = tab === "seq" ? 3 : 2;

  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <StepBar step={bibleStep} lang={lang} />
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 13, color: "var(--mt)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5, letterSpacing: 0.3 }}>{t.back_mixer}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isAdmin && <button onClick={() => onUpgrade && onUpgrade("admin")} style={{ background: plan === "standard" ? "rgba(232,92,58,0.12)" : "rgba(168,85,247,0.12)", border: `1px solid ${plan === "standard" ? "rgba(232,92,58,0.3)" : "rgba(168,85,247,0.3)"}`, borderRadius: 8, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: plan === "standard" ? "#E85C3A" : "#a855f7", cursor: "pointer", fontFamily: "var(--sans)" }}>👁 {plan === "standard" ? "Créateur" : "Premium"}</button>}
            <button onClick={toggleLang} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)" }}>{lang === "fr" ? "EN" : "FR"}</button>
            <button onClick={logout} style={{ background: "none", border: "none", fontSize: 12, color: "var(--mt)", cursor: "pointer" }}>{t.logout}</button>
          </div>
        </div>
        <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--r)" }}>
            {mode === "fast" ? "VERTICAL DRAMA" : "SÉRIE PREMIUM"}
          </span>
          <span style={{ color: "var(--bo)" }}>·</span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "var(--mt)" }}>
            {DUR_LABEL[lang][duree]} / {lang === "fr" ? "épisode" : "episode"}
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1, textTransform: "uppercase", marginBottom: 8 }}>{bible.titre}</h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 14, fontStyle: "italic", color: "var(--mt)", lineHeight: 1.6, marginBottom: 10 }}>« {bible.logline} »</p>
        <p style={{ fontSize: 13, lineHeight: 1.75, marginBottom: 16, color: "var(--mt)" }}>{bible.pitch}</p>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", borderBottom: "1.5px solid var(--bo)" }}>
            {[
              { k: "bible", l: t.bible_tab, onClick: () => setTab("bible") },
              { k: "persos", l: t.persos_tab, onClick: genCartes },
              { k: "seq", l: lang === "fr" ? "Saison 1" : "Season 1", onClick: () => setTab("seq") },
            ].map(({ k, l, onClick }) => (
              <button key={k} onClick={onClick}
                style={{ flex: 1, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: tab === k ? "var(--r)" : "var(--tx)", borderBottom: `2px solid ${tab === k ? "var(--r)" : "transparent"}`, marginBottom: -2, fontFamily: "var(--sans)" }}>{l}
              </button>
            ))}
            <button onClick={() => setShowMore(v => !v)}
              style={{ width: 44, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontSize: 18, color: tab === "affiche" ? "var(--r)" : "var(--mt)", borderBottom: `2px solid ${tab === "affiche" ? "var(--r)" : "transparent"}`, marginBottom: -2, letterSpacing: 1 }}>···</button>
          </div>
          {showMore && (
            <div ref={moreRef} style={{ position: "absolute", right: 0, top: "calc(100% + 4px)", background: "var(--card)", border: "1.5px solid var(--bo)", borderRadius: 14, zIndex: 50, minWidth: 180, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
              {[
                { k: "affiche", l: t.poster_btn, emoji: "🎬", locked: false, onClick: () => { setShowMore(false); onAffiche(); } },
              ].map(({ k, l, emoji, locked, onClick }, idx, arr) => (
                <button key={k} onClick={onClick}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, width: "100%", padding: "13px 16px", border: "none", borderBottom: idx < arr.length - 1 ? "1px solid var(--bo)" : "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: locked ? "var(--mt)" : tab === k ? "var(--r)" : "var(--tx)", textAlign: "left", fontFamily: "var(--sans)", opacity: locked ? 0.75 : 1 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}><span>{emoji}</span>{l}</span>
                  {locked && <span style={{ fontSize: 10, fontWeight: 700, color: "#a855f7", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", padding: "2px 7px", borderRadius: 6, letterSpacing: 0.5 }}>🔒 PRO</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "20px", maxWidth: 520, margin: "0 auto" }}>
        {tab === "bible" ? (
          <>
            <p style={{ fontSize: 15, fontWeight: 800, color: "var(--tx)", marginBottom: 12 }}>{t.personnages}</p>
            {(bible.personnages || []).map((p, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 16, borderLeft: `4px solid ${i === 0 ? "var(--r)" : "var(--n)"}`, marginBottom: 10 }}>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700, display: "block", marginBottom: 3 }}>{p.nom}</span>
                  <span style={{ fontSize: 10, color: i === 0 ? "var(--r)" : "var(--n)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.4 }}>{p.role}{p.age ? ` · ${p.age} ans` : ""}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--mt)", lineHeight: 1.5, borderLeft: "2px solid #E85C3A22", paddingLeft: 8, margin: 0 }}>{p.secret}</p>
              </div>
            ))}
            <div style={{ background: "rgba(232,92,58,0.08)", border: "1px solid rgba(232,92,58,0.2)", borderRadius: 12, padding: 16, marginBottom: 20, marginTop: 4 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: "var(--r)", marginBottom: 8 }}>{t.question_centrale}</p>
              <p style={{ fontFamily: "var(--sans)", fontSize: 15, fontStyle: "italic", color: "var(--tx)", lineHeight: 1.5 }}>« {bible.tension_centrale} »</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
              <button onClick={() => setTab("seq")} style={{ flex: "1 1 120px", background: "var(--r)", color: "#fff", border: "none", padding: 16, borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {t.see_eps} {episodes.length} {t.episodes_btn}
              </button>
            </div>
          </>
        ) : tab === "persos" ? (
          <>
            {loadingCartes ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--mt)" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: "center" }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#E85C3A" : i === 1 ? "#a855f7" : "rgba(255,255,255,0.2)", animation: `pulse 1.2s ${i*0.2}s infinite` }} />)}
                </div>
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
                      <h3 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: 2 }}>{nom}</h3>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{perso.role} · {perso.age} ans</p>
                    </div>
                    {carte?.citation && <p style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.9)", marginTop: 10, lineHeight: 1.4 }}>« {carte.citation} »</p>}
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    {carte ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                        <div style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 12px" }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--mt)", marginBottom: 4 }}>Force</p>
                          <p style={{ fontSize: 13, fontWeight: 700 }}>{carte.force}</p>
                        </div>
                        <div style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 12px" }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--mt)", marginBottom: 4 }}>Faiblesse</p>
                          <p style={{ fontSize: 13, fontWeight: 700 }}>{carte.faiblesse}</p>
                        </div>
                      </div>
                    ) : null}
                    {carte?.style && <p style={{ fontSize: 12, color: "var(--mt)", marginBottom: 8 }}>{carte.style}</p>}
                    <p style={{ fontSize: 12, color: "var(--mt)", lineHeight: 1.5, borderTop: "1px solid var(--bo)", paddingTop: 10, borderLeft: "2px solid #E85C3A22", paddingLeft: 8 }}>{perso.secret}</p>
                    {perso.arc && <p style={{ fontSize: 12, color: "var(--tx)", lineHeight: 1.5, marginTop: 6 }}>{perso.arc}</p>}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--mt)" }}>
                {lang === "fr" ? "Saison 1" : "Season 1"} — {episodes.length} {lang === "fr" ? "épisodes" : "episodes"}
              </p>
              <p style={{ fontSize: 10, color: "var(--mt)" }}>
                {Math.round(episodes.length * (episodes[0]?.tension || 5) / 10 * 2)
                  ? `${Math.round(episodes.reduce((a,e) => a + (e.tension||5), 0) / episodes.length * 10)}% ${lang === "fr" ? "tension" : "tension"}`
                  : ""}
              </p>
            </div>
            {(episodes || []).map((ep, i) => (
              <div key={i} onClick={() => onEp(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: "var(--card)", cursor: "pointer", borderLeft: `3px solid ${ep.tension >= 8 ? "var(--r)" : ep.tension >= 5 ? "var(--n)" : "var(--bo)"}`, marginBottom: 6, transition: "all .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bo)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--card)"}>
                <div style={{ width: 32, flexShrink: 0, textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 900, color: "var(--mt)", lineHeight: 1 }}>{ep.numero}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: "var(--tx)" }}>{ep.titre}</p>
                  <p style={{ fontSize: 11, color: "var(--mt)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{ep.cliffhanger}</p>
                </div>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <Dots t={ep.tension} />
                  {ep.is_paywall ? (
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.5, color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 4, padding: "1px 5px" }}>PIVOT</span>
                  ) : (
                    <span style={{ fontSize: 10, color: "var(--mt)" }}>›</span>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function StudioView({ bible, ep, script, loading, duree, onEdit, onTournage, onStoryboard, onBack, onExport, onVariations, plan, onPrev, onNext, epIdx, totalEps, onTranslate, t, lang, onUpgrade, toggleLang, logout, isAdmin, selectedChoix, onChoixSelect }) {
  const [showLangs, setShowLangs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translated, setTranslated] = useState(null);
  const [activeLang, setActiveLang] = useState(null);

  useEffect(() => { setTranslated(null); setActiveLang(null); setShowLangs(false); }, [ep?.numero]);

  const LANGS = [
    { code: "en", flag: "🇬🇧", label: "Anglais",   labelEn: "English"    },
    { code: "es", flag: "🇪🇸", label: "Espagnol",  labelEn: "Spanish"    },
    { code: "de", flag: "🇩🇪", label: "Allemand",  labelEn: "German"     },
    { code: "pt", flag: "🇵🇹", label: "Portugais", labelEn: "Portuguese" },
    { code: "it", flag: "🇮🇹", label: "Italien",   labelEn: "Italian"    },
    { code: "ar", flag: "🇸🇦", label: "Arabe",     labelEn: "Arabic"     },
    { code: "he", flag: "🇮🇱", label: "Hébreu",    labelEn: "Hebrew"     },
    { code: "zh", flag: "🇨🇳", label: "Chinois",   labelEn: "Chinese"    },
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
      <StepBar step={4} lang={lang} />
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", cursor: "pointer", padding: 0 }}>← {bible?.titre}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={onPrev} disabled={epIdx === 0} style={{ background: epIdx === 0 ? "var(--card)" : "var(--r)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: epIdx === 0 ? "not-allowed" : "pointer", fontSize: 18, opacity: epIdx === 0 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>‹</button>
            <span style={{ fontSize: 12, color: "var(--mt)", minWidth: 36, textAlign: "center" }}>{epIdx + 1} / {totalEps}</span>
            <button onClick={onNext} disabled={epIdx === totalEps - 1} style={{ background: epIdx === totalEps - 1 ? "var(--card)" : "var(--r)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: epIdx === totalEps - 1 ? "not-allowed" : "pointer", fontSize: 18, opacity: epIdx === totalEps - 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>›</button>
            {toggleLang && <button onClick={toggleLang} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, padding: "3px 7px", fontSize: 11, fontWeight: 700, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)" }}>{lang === "fr" ? "EN" : "FR"}</button>}
            {logout && <button onClick={logout} style={{ background: "none", border: "none", fontSize: 12, color: "var(--mt)", cursor: "pointer" }}>{t.logout}</button>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--r)" }}>
            {lang === "fr" ? "S01" : "S01"} · {lang === "fr" ? "ÉP." : "EP."} {ep?.numero}
          </span>
          <span style={{ fontSize: 10, color: "var(--mt)", letterSpacing: 1 }}>· {DUR_LABEL[lang][duree]}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>{ep?.titre}</span>
        </div>
        <Dots t={ep?.tension} />
      </div>
      <div style={{ padding: "16px 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <LoadingVC msg={`${t.writing} (${DUR_LABEL[lang][duree]})…`} />
        ) : script ? (
          <>
            <div style={{ background: "var(--card)", border: "2px solid var(--r)", borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: "var(--r)", marginBottom: 8 }}>{t.hook}</p>
              <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 8, color: "var(--tx)" }}>{displayScript.hook_scene?.texte}</p>
              <p style={{ fontSize: 12, color: "var(--mt)", fontStyle: "italic" }}>[9:16] {displayScript.hook_scene?.visuel_916}</p>
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--mt)", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
              <span>{t.script_label} · {DUR_LABEL[lang][duree]} · {(displayScript.scenes || []).length} {t.repliques}</span>
              {(() => {
                const words = [displayScript.hook_scene?.texte, ...(displayScript.scenes || []).map(s => s.dialogue + " " + (s.jeu || "")), displayScript.cliffhanger_scene?.texte].filter(Boolean).join(" ").trim().split(/\s+/).filter(Boolean).length;
                const targets = { 60: [160, 200], 90: [250, 290], 120: [330, 380] };
                const [min, max] = targets[duree] || [0, 999];
                const ok = words >= min && words <= max;
                return <span style={{ fontSize: 11, fontWeight: 700, color: ok ? "#4ade80" : "#f59e0b", background: ok ? "rgba(74,222,128,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${ok ? "rgba(74,222,128,0.25)" : "rgba(245,158,11,0.3)"}`, borderRadius: 6, padding: "2px 8px" }}>{words} mots {ok ? "✓" : `(cible: ${min}-${max})`}</span>;
              })()}
            </p>
            {(displayScript.scenes || []).map((s, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 14, borderLeft: "3px solid rgba(232,92,58,0.35)", marginBottom: 10, border: "1px solid var(--bo)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 3, borderRadius: 2, background: "rgba(232,92,58,0.5)", alignSelf: "stretch", flexShrink: 0, minHeight: 16 }} />
                  <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--tx)" }}>{s.perso}</p>
                  {s.jeu && <span style={{ fontSize: 10, background: "rgba(255,255,255,0.08)", color: "var(--mt)", padding: "2px 8px", borderRadius: 20, fontStyle: "italic", border: "1px solid var(--bo)" }}>{s.jeu}</span>}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 6, fontWeight: 500, color: "var(--tx)" }}>{s.dialogue}</p>
                {s.voix_off && (
                  <div style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.18)", borderRadius: 8, padding: "8px 10px", marginBottom: 6, display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "#a855f7", flexShrink: 0, marginTop: 1 }}>VO</span>
                    <p style={{ fontSize: 12, fontStyle: "italic", color: "var(--mt)", lineHeight: 1.5 }}>{s.voix_off}</p>
                  </div>
                )}
                <p style={{ fontSize: 11, color: "var(--mt)", fontStyle: "italic", marginTop: 4 }}>[9:16] {s.visuel_916}</p>
              </div>
            ))}
            <div style={{ background: "var(--card)", border: "2px solid var(--r)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: "var(--r)" }}>🎬 Cliffhanger</p>
                <button onClick={() => onEdit("rewrite_ending")} disabled={loading} style={{ background: "rgba(232,92,58,0.1)", border: "1px solid rgba(232,92,58,0.25)", color: "var(--r)", padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>♻️ Nouveau</button>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--tx)", marginBottom: 8, lineHeight: 1.4 }}>{displayScript.cliffhanger_scene?.texte}</p>
              <p style={{ fontSize: 11, color: "var(--mt)", fontStyle: "italic", marginBottom: displayScript.cliffhanger_scene?.label ? 10 : 0 }}>[9:16] {displayScript.cliffhanger_scene?.visuel_916}</p>
              {displayScript.cliffhanger_scene?.label && (
                <span style={{ display: "inline-block", background: "var(--r)", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>{displayScript.cliffhanger_scene.label}</span>
              )}
            </div>
            {displayScript.choix && displayScript.choix.length === 2 && (
              <div style={{ background: "var(--card)", border: "1.5px solid rgba(168,85,247,0.3)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#a855f7", marginBottom: 12 }}>🎮 {lang === "en" ? "Your choice" : "Ton choix"}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {displayScript.choix.map((c, i) => (
                    <button key={i} onClick={() => onChoixSelect && onChoixSelect(selectedChoix === i ? null : i)} style={{ background: selectedChoix === i ? (i === 0 ? "rgba(232,92,58,0.18)" : "rgba(168,85,247,0.18)") : (i === 0 ? "rgba(232,92,58,0.07)" : "rgba(168,85,247,0.07)"), border: `2px solid ${selectedChoix === i ? (i === 0 ? "var(--r)" : "#a855f7") : (i === 0 ? "rgba(232,92,58,0.2)" : "rgba(168,85,247,0.2)")}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left", fontFamily: "var(--sans)", transition: "all .15s" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "var(--r)" : "#a855f7", marginBottom: 4 }}>{i === 0 ? "A" : "B"} — {c.label}</p>
                      <p style={{ fontSize: 12, color: "var(--mt)", fontStyle: "italic", lineHeight: 1.4 }}>{c.consequence}</p>
                      {selectedChoix === i && <p style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "var(--r)" : "#a855f7", marginTop: 6 }}>✓ {lang === "fr" ? "Choix retenu pour l'épisode suivant" : "Choice applied to next episode"}</p>}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* ── ACTIONS PRINCIPALES ── */}
            <button onClick={() => onEdit("revelation")} disabled={loading} style={{ width: "100%", marginBottom: 8, padding: "15px 16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #E85C3A, #c0392b)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 800, fontFamily: "var(--sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 18px rgba(232,92,58,0.35)" }}>
              <span>{t.revelation}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>— {t.revelation_sub}</span>
            </button>

            <button onClick={onTournage} style={{ width: "100%", background: "var(--n)", color: "#fff", border: "none", padding: "15px 16px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", marginBottom: 16 }}>{t.shooting}</button>

            {/* ── ACTIONS SECONDAIRES COLLAPSIBLES ── */}
            <div style={{ marginBottom: 8 }}>
              <button onClick={() => setShowTools(s => !s)} style={{ width: "100%", background: showTools ? "rgba(232,92,58,0.08)" : "rgba(232,92,58,0.05)", border: "1.5px solid var(--r)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", cursor: "pointer", fontFamily: "var(--sans)", marginBottom: showTools ? 10 : 0 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "var(--r)", letterSpacing: "-0.01em" }}>{lang === "fr" ? "✦ Affiner & exporter" : "✦ Refine & export"}</span>
                <span style={{ fontSize: 16, color: "var(--r)", transform: showTools ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
              </button>
              {showTools && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* Dosages */}
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["pimenter", t.spice], ["subtil", t.subtle], ["simplifier", t.simplify]].map(([k, l]) => (
                      <button key={k} onClick={() => onEdit(k)} disabled={loading} style={{ flex: 1, padding: "11px 4px", borderRadius: 10, border: "1.5px solid var(--bo)", background: "var(--card)", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "var(--sans)", color: "var(--tx)" }}>{l}</button>
                    ))}
                  </div>
                  {/* Variations */}
                  <button onClick={plan === "standard" ? () => onUpgrade("variations") : onVariations} disabled={loading} style={{ background: "var(--card)", color: plan === "standard" ? "var(--mt)" : "var(--tx)", border: `1.5px solid ${plan === "standard" ? "rgba(168,85,247,0.2)" : "var(--bo)"}`, padding: 13, borderRadius: 12, width: "100%", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    {plan === "standard" ? <><span>🔒</span><span>{t.variations_locked}</span><span style={{ fontSize: 10, fontWeight: 700, color: "#a855f7", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", padding: "2px 7px", borderRadius: 6 }}>PRO</span></> : t.variations}
                  </button>
                  {/* Découpage */}
                  <button onClick={onStoryboard} style={{ background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 13, borderRadius: 12, width: "100%", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.storyboard_btn}</button>
                  {/* Traduction */}
                  <button onClick={() => { if (translated) { setTranslated(null); setActiveLang(null); setShowLangs(false); } else { setShowLangs(s => !s); } }} disabled={translating} style={{ background: translated ? "var(--n)" : "var(--card)", color: translated ? "#fff" : "var(--tx)", border: `1.5px solid ${translated ? "var(--n)" : "var(--bo)"}`, padding: 13, borderRadius: 12, width: "100%", fontSize: 13, fontWeight: 600, cursor: translating ? "wait" : "pointer", fontFamily: "var(--sans)" }}>
                    {translating ? t.translating : translated ? `${LANGS.find(l => l.code === activeLang)?.flag} ${t.translate_back}` : t.translate}
                  </button>
                  {showLangs && !translating && (
                    <div style={{ background: "var(--card)", borderRadius: 12, padding: 14, border: "1.5px solid var(--bo)" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--mt)", marginBottom: 10 }}>{t.choose_lang}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {LANGS.map(l => (
                          <button key={l.code} onClick={() => handleTranslate(l.code)} style={{ padding: "10px 12px", borderRadius: 10, border: "1.5px solid var(--bo)", background: "var(--bg)", cursor: "pointer", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}>
                            <span style={{ fontSize: 20 }}>{l.flag}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--tx)" }}>{lang === "en" ? l.labelEn : l.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Export PDF */}
                  <button onClick={onExport} style={{ background: "var(--card)", color: "var(--tx)", border: "1.5px solid var(--bo)", padding: 13, borderRadius: 12, width: "100%", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)" }}>{t.export_pdf}</button>
                </div>
              )}
            </div>

            {/* Navigation épisodes — bas */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid var(--bo)", paddingTop: 16, marginBottom: 8 }}>
              <button onClick={onPrev} disabled={epIdx === 0} style={{ flex: 1, background: "var(--card)", border: "1.5px solid var(--bo)", borderRadius: 10, padding: "12px 8px", cursor: epIdx === 0 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 700, opacity: epIdx === 0 ? 0.3 : 1, color: "var(--tx)", fontFamily: "var(--sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                ‹ {lang === "fr" ? "Épisode précédent" : "Previous episode"}
              </button>
              <button onClick={onNext} disabled={epIdx === totalEps - 1} style={{ flex: 1, background: epIdx === totalEps - 1 ? "var(--card)" : "var(--r)", border: "none", borderRadius: 10, padding: "12px 8px", cursor: epIdx === totalEps - 1 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 700, opacity: epIdx === totalEps - 1 ? 0.3 : 1, color: epIdx === totalEps - 1 ? "var(--tx)" : "#fff", fontFamily: "var(--sans)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {lang === "fr" ? "Épisode suivant" : "Next episode"} ›
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function VariationsView({ variations, loading, ep, onSelect, onBack, t, lang }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>← Studio</button>
        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
          {variations?.length || 4} {lang === "fr" ? "versions" : "versions"}
        </h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>Ép. {ep?.numero} · {ep?.titre} — {lang === "fr" ? "Choisis la meilleure" : "Pick the best one"}</p>
      </div>
      <div style={{ padding: "0 20px 40px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <LoadingVC msg={lang === "fr" ? "Génération de 4 versions en parallèle…" : "Generating 4 versions in parallel…"} />
        ) : (variations || []).map((v, i) => (
          <div key={i} style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1.5px solid var(--bo)" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--tx)" }}>{v.label}</span>
              <button onClick={() => onSelect(v)} style={{ background: "var(--r)", color: "#fff", border: "none", padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
                {lang === "fr" ? "Choisir →" : "Select →"}
              </button>
            </div>
            {/* Hook — 2 lignes max */}
            <div style={{ borderLeft: "3px solid var(--r)", paddingLeft: 10, marginBottom: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "var(--r)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Hook</p>
              <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: "var(--tx)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.hook_scene?.texte}</p>
            </div>
            {/* Cliffhanger — 2 lignes max */}
            <div style={{ borderLeft: "3px solid rgba(232,92,58,0.35)", paddingLeft: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "var(--r)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, opacity: 0.7 }}>Cliffhanger</p>
              <p style={{ fontSize: 13, lineHeight: 1.4, color: "var(--mt)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.cliffhanger_scene?.texte}</p>
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
        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.affiche_title}</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>{t.affiche_sub}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <LoadingVC msg={t.affiche_loading} />
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


function TournageView({ script, ep, duree, onBack, budget, lang, t }) {
  const [playing, setPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [speed, setSpeed] = useState(duree <= 60 ? 50 : duree <= 90 ? 70 : 90);
  const [showSettings, setShowSettings] = useState(false);
  const [tab, setTab] = useState("script");
  const [activeBudget, setActiveBudget] = useState(budget || "smartphone");
  const ll = lang === "en" ? "en" : "fr";
  const bLevel = BUDGET_LEVELS.find(b => b.id === activeBudget) || BUDGET_LEVELS[0];
  const guide = bLevel.guide[ll];

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

      {/* Step bar — dark mode */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "10px 12px 12px", gap: 0, borderBottom: "1px solid #1a1a1a", background: "#0a0a0a", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", flexShrink: 0 }}>
        {(STEP_DATA[lang] || STEP_DATA.fr).map((s, i) => {
          const n = i + 1;
          const done   = n < 5;
          const active = n === 5;
          const color  = STEP_COLORS[i];
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 44 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? color : active ? color : "transparent", border: `1.5px solid ${done || active ? color : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 11 : 14, color: done || active ? "#fff" : "#555", fontWeight: 800, fontFamily: "var(--sans)", flexShrink: 0, boxShadow: active ? `0 0 12px ${color}55` : "none" }}>
                  {done ? "✓" : s.emoji}
                </div>
                <span style={{ fontSize: 7.5, fontWeight: active ? 800 : 400, color: active ? color : "#555", whiteSpace: "nowrap", letterSpacing: 0.8, textTransform: "uppercase", opacity: active ? 1 : done ? 0.6 : 0.3, fontFamily: "var(--sans)" }}>{s.short}</span>
              </div>
              {i < 4 && <div style={{ height: 1.5, width: 20, flexShrink: 0, background: done && n < 5 ? `${STEP_COLORS[i]}55` : "#222", margin: "0 2px", marginBottom: 14 }} />}
            </div>
          );
        })}
      </div>

      {/* Barre du haut */}
      <div style={{ background: "#111", flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #333", color: "#aaa", cursor: "pointer", padding: "8px 12px", borderRadius: 8, fontFamily: "var(--sans)", fontSize: 13 }}>← Retour</button>
          <div style={{ display: "flex", gap: 6 }}>
            {[["script", t?.budget_teleprompter || "▶ Script"], ["guide", t?.budget_guide || "🎬 Guide Prod"]].map(([k, lbl]) => (
              <button key={k} onClick={() => setTab(k)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: tab === k ? (k === "guide" ? bLevel.color : "var(--r)") : "#222", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "var(--sans)" }}>{lbl}</button>
            ))}
          </div>
          {tab === "script" && <button onClick={() => setShowSettings(s => !s)} style={{ background: showSettings ? "#333" : "none", border: "1px solid #333", color: "#aaa", cursor: "pointer", padding: "8px 12px", borderRadius: 8, fontFamily: "var(--sans)", fontSize: 16 }}>⚙️</button>}
          {tab === "guide" && <span style={{ fontSize: 16 }}>{bLevel.emoji}</span>}
        </div>
        {tab === "script" && <div style={{ display: "flex", padding: "0 16px 12px" }}>
          <button onClick={() => setPlaying(p => !p)} style={{ flex: 1, background: playing ? "#333" : "var(--r)", border: "none", cursor: "pointer", padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "var(--sans)" }}>
            {playing ? "⏸ Pause" : "▶ Démarrer"}
          </button>
        </div>}
      </div>

      {/* Panneau réglages */}
      {showSettings && (
        <div style={{ background: "#1a1a1a", padding: "16px 20px", flexShrink: 0, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <p style={{ fontSize: 13, color: "#888", fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>Taille du texte — {fontSize}px</p>
              <input type="range" min={18} max={44} value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--r)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555", marginTop: 4 }}>
                <span>A</span><span style={{ fontSize: 16 }}>A</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <p style={{ fontSize: 13, color: "#888", fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>Vitesse — {speed}s</p>
              <input type="range" min={20} max={150} value={speed} onChange={e => setSpeed(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--r)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555", marginTop: 4 }}>
                <span>⚡ Rapide</span><span>🐢 Lent</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zone Guide Prod */}
      {tab === "guide" && (
        <div style={{ flex: 1, overflowY: "auto", background: "#0a0a0f", padding: "20px 20px 40px" }}>
          {/* Sélecteur de budget */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {BUDGET_LEVELS.map(b => (
              <button key={b.id} onClick={() => setActiveBudget(b.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 6px", borderRadius: 12, border: `2px solid ${activeBudget === b.id ? b.color : "#333"}`, background: activeBudget === b.id ? `${b.color}18` : "#111", cursor: "pointer", fontFamily: "var(--sans)", transition: "all .15s" }}>
                <span style={{ fontSize: 18 }}>{b.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: activeBudget === b.id ? b.color : "#666", textTransform: "uppercase", letterSpacing: 0.5 }}>{b.label[ll]}</span>
              </button>
            ))}
          </div>
          {guide?.equip?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0, color: "#ccc", marginBottom: 10 }}>{t?.budget_equip || "Équipement"}</p>
              {guide.equip.map((e, i) => <p key={i} style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.6, marginBottom: 6, paddingLeft: 4 }}>{e}</p>)}
            </div>
          )}
          {guide?.lumiere?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0, color: "#ccc", marginBottom: 10 }}>{t?.budget_lumiere || "Lumière"}</p>
              {guide.lumiere.map((e, i) => <p key={i} style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.6, marginBottom: 6, paddingLeft: 4 }}>→ {e}</p>)}
            </div>
          )}
          {guide?.tricks?.length > 0 && (
            <div style={{ marginBottom: 20, background: "#111", borderRadius: 14, padding: "16px 18px", border: `1px solid ${bLevel.color}44` }}>
              <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0, color: bLevel.color, marginBottom: 10 }}>{t?.budget_tricks || "✨ Fake Expensive"}</p>
              {guide.tricks.map((e, i) => <p key={i} style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.6, marginBottom: 6 }}>✓ {e}</p>)}
            </div>
          )}
          {guide?.decors && Object.keys(guide.decors).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0, color: "#ccc", marginBottom: 10 }}>{t?.budget_decors || "Décors"}</p>
              {Object.entries(guide.decors).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: bLevel.color, letterSpacing: 0, marginBottom: 6 }}>
                    {cat === "romance" ? "❤️ Romance" : cat === "teen" ? "🔥 Teen" : cat === "thriller" ? "🩸 Thriller" : cat}
                  </p>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {items.map((item, i) => <span key={i} style={{ background: "#1a1a2e", border: "1px solid #333", padding: "5px 10px", borderRadius: 100, fontSize: 12, color: "#e2e8f0" }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Zone téléprompteur */}
      {tab === "script" && <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div className="tp-content" style={{ padding: "0 28px", willChange: "transform" }}>
          {lines.map((l, i) => {
            if (l.t === "lbl") return <p key={i} style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--r)", marginBottom: 8, marginTop: 40, textAlign: "center" }}>{l.v}</p>;
            if (l.t === "nm") return <div key={i} style={{ textAlign: "center", marginTop: 32, marginBottom: 6 }}><p style={{ fontSize: Math.round(fontSize * 0.55), fontWeight: 700, color: "#facc15", letterSpacing: 2, textTransform: "uppercase" }}>{l.v}</p>{l.jeu && <p style={{ fontSize: Math.round(fontSize * 0.45), color: "#aaa", fontStyle: "italic", marginTop: 2 }}>{l.jeu}</p>}</div>;
            if (l.t === "txt") return <p key={i} style={{ fontFamily: "var(--serif)", fontSize, color: "#fff", lineHeight: 1.6, marginBottom: 12, fontWeight: 700, textAlign: "center" }}>{l.v}</p>;
            if (l.t === "stg") return <p key={i} style={{ fontSize: Math.round(fontSize * 0.6), color: "#f97316", fontStyle: "italic", marginBottom: 28, textAlign: "center" }}>[{l.v}]</p>;
            if (l.t === "hi") return <div key={i} style={{ textAlign: "center", marginTop: 10, marginBottom: 28 }}><span style={{ display: "inline-block", background: "var(--r)", borderRadius: 6, padding: "8px 20px", fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{l.v}</span></div>;
            return null;
          })}
          <div style={{ height: "100vh" }} />
        </div>
      </div>}
    </div>
  );
}

function ProfilsView({ profils, loading, bible, onBack, t }) {
  const data = profils?.profils || [];
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>{t.back_bible}</button>
        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.profils_title}</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>{bible?.titre}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <LoadingVC msg={t.loading_profils} />
        ) : data.map((p, i) => {
          const couleur = p.couleur || (i === 0 ? "#E85C3A" : "#3a5040");
          return (
            <div key={i} style={{ background: "var(--card)", borderRadius: 20, overflow: "hidden", marginBottom: 20, border: `2px solid ${couleur}33` }}>
              {/* Header Instagram */}
              <div style={{ background: couleur, padding: "20px 18px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 22 }}>👤</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{p.nom}</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{p.pseudo}</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", lineHeight: 1.5, marginBottom: 12 }}>{p.bio}</p>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{p.followers}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>followers</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{p.abonnements || "—"}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>abonnements</p>
                  </div>
                  {p.posts && <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{p.posts.length}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>posts</p>
                  </div>}
                </div>
              </div>
              {/* Story & Highlight */}
              {(p.story || p.highlight) && (
                <div style={{ padding: "12px 16px 0", display: "flex", gap: 10 }}>
                  {p.story && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${couleur}`, display: "flex", alignItems: "center", justifyContent: "center", background: `${couleur}11` }}>
                        <span style={{ fontSize: 20 }}>📸</span>
                      </div>
                      <p style={{ fontSize: 9, color: "var(--mt)", textAlign: "center", maxWidth: 60, lineHeight: 1.2 }}>{p.story}</p>
                    </div>
                  )}
                  {p.highlight && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid var(--bo)", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
                        <span style={{ fontSize: 20 }}>⭐</span>
                      </div>
                      <p style={{ fontSize: 9, color: "var(--mt)", textAlign: "center", maxWidth: 60, lineHeight: 1.2 }}>{p.highlight}</p>
                    </div>
                  )}
                </div>
              )}
              {/* Posts */}
              {(p.posts || []).length > 0 && (
                <div style={{ padding: "12px 16px 16px" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--mt)", marginBottom: 10 }}>Posts récents</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {p.posts.map((post, j) => (
                      <div key={j} style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 12px", border: "1px solid var(--bo)" }}>
                        <p style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 6 }}>{post.caption}</p>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ fontSize: 11, color: "var(--mt)" }}>❤️ {post.likes}</span>
                          {post.commentaires && <span style={{ fontSize: 11, color: "var(--mt)" }}>💬 {post.commentaires}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendrierView({ calendrier, loading, bible, onBack, t }) {
  const data = calendrier;
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>{t.back_bible}</button>
        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.calendrier_title}</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>{bible?.titre}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <LoadingVC msg={t.loading_calendrier} />
        ) : data ? (
          <>
            {data.strategie && (
              <div style={{ background: "var(--card)", borderRadius: 14, padding: 16, marginBottom: 20, border: "1.5px solid var(--bo)" }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: "var(--r)", marginBottom: 8 }}>Stratégie</p>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{data.strategie}</p>
                {data.plateformes && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                    {data.plateformes.map((pl, i) => (
                      <span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "var(--r)", color: "#fff", fontWeight: 700 }}>{pl}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {(data.semaines || []).map((sem, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: "#fff" }}>S{sem.semaine}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800 }}>Semaine {sem.semaine}</p>
                    {sem.theme && <p style={{ fontSize: 11, color: "var(--mt)" }}>{sem.theme}</p>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(sem.episodes || []).map((ep, j) => (
                    <div key={j} style={{ background: "var(--card)", borderRadius: 12, padding: "12px 14px", border: "1.5px solid var(--bo)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, background: "var(--r)", color: "#fff", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>Ép. {ep.numero}</span>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>{ep.jour} {ep.heure}</span>
                        </div>
                        <span style={{ fontSize: 11, background: "var(--n)", color: "#fff", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{ep.plateforme}</span>
                      </div>
                      {ep.legende && <p style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>{ep.legende}</p>}
                      {(ep.hashtags || []).length > 0 && (
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {ep.hashtags.map((h, k) => (
                            <span key={k} style={{ fontSize: 10, color: "var(--n)", fontWeight: 600 }}>{h}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {data.conseil && (
              <div style={{ background: "linear-gradient(135deg, var(--n), #2a5040)", borderRadius: 14, padding: 16, marginTop: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.9)", marginBottom: 8 }}>Pro tip</p>
                <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.6 }}>{data.conseil}</p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

function StoryboardView({ storyboard, loading, ep, bible, onBack, t }) {
  const shots = storyboard?.shots || [];
  return (
    <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ padding: "16px 20px 0", maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mt)", marginBottom: 14, cursor: "pointer", padding: 0 }}>{t.back_studio}</button>
        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.storyboard_title}</h2>
        <p style={{ fontSize: 13, color: "var(--mt)", marginBottom: 20 }}>Ép. {ep?.numero} · {ep?.titre}</p>
      </div>
      <div style={{ padding: "0 20px 60px", maxWidth: 520, margin: "0 auto" }}>
        {loading ? (
          <LoadingVC msg={t.loading_storyboard} />
        ) : shots.map((shot, i) => (
          <div key={i} style={{ background: "var(--card)", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1.5px solid var(--bo)" }}>
            <div style={{ background: "#0a0a0f", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 7, background: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", flexShrink: 0 }}>{shot.numero}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{shot.type_plan}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {shot.duree_sec && <span style={{ fontSize: 11, color: "#f97316", fontWeight: 700 }}>{shot.duree_sec}s</span>}
                {shot.mouvement && <span style={{ fontSize: 10, color: "#888", padding: "2px 8px", borderRadius: 20, border: "1px solid #333" }}>{shot.mouvement}</span>}
              </div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {shot.angle && <p style={{ fontSize: 13, fontWeight: 700, color: "var(--mt)", marginBottom: 6 }}>📐 {shot.angle}</p>}
              {shot.cadrage && <p style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>{shot.cadrage}</p>}
              {shot.son && (
                <div style={{ background: "var(--bg)", borderRadius: 8, padding: "8px 10px", marginBottom: 8, borderLeft: "2px solid var(--n)" }}>
                  <p style={{ fontSize: 12, color: "var(--n)", fontWeight: 600 }}>🎙 {shot.son}</p>
                </div>
              )}
              {shot.note && <p style={{ fontSize: 11, color: "var(--mt)", fontStyle: "italic", lineHeight: 1.5 }}>🎬 {shot.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── UPGRADE MODAL ────────────────────────────────────────────
function UpgradeModal({ feature, onClose, lang }) {
  const FEATURES = {
    fr: {
      serie:       { title: "Plan Pro", desc: "Séries longues jusqu'à 90 épisodes, arcs narratifs complexes, direction artistique avancée.", perks: ["Jusqu'à 90 épisodes par série", "3 variations de script par épisode", "Tous les packs univers", "Calendrier éditorial", "Préparation Saison 2"] },
      episodes:    { title: "Séries longues", desc: "Dépasse les 20 épisodes et construis des arcs narratifs de série complète.", perks: ["40, 60 ou 90 épisodes", "Arc narratif complet calculé", "Progression de tension optimisée"] },
      variations:  { title: "3 variations de script", desc: "Génère 3 versions différentes d'un même épisode pour choisir la meilleure.", perks: ["3 scripts par épisode", "Angles narratifs différents", "Choisir ou mixer les versions"] },
      calendrier:  { title: "Calendrier éditorial", desc: "Un plan de publication semaine par semaine avec légendes et hashtags par plateforme.", perks: ["Planning semaine par semaine", "Légendes virales par plateforme", "TikTok, Reels, Shorts, Vertical"] },
      saison2:     { title: "Saison 2", desc: "Prolonge ta série avec une saison 2 cohérente — nouveaux arcs, nouveau casting, nouvelles tensions.", perks: ["Bible Saison 2 complète", "Cohérence narrative garantie", "Nouveaux personnages et secrets"] },
      accroches:   { title: "Accroches complètes", desc: "Génère des légendes virales pour tous tes épisodes, pas seulement les 3 premiers.", perks: ["Légendes pour tous les épisodes", "Hashtags ciblés par épisode", "Copie en 1 clic"] },
    },
    en: {
      serie:       { title: "Premium Series Mode", desc: "Long series up to 90 episodes, complex narrative arcs, advanced art direction.", perks: ["Up to 90 episodes per series", "3 script variations per episode", "All universe packs", "Editorial calendar", "Season 2 prep"] },
      episodes:    { title: "Long series", desc: "Go beyond 20 episodes and build full series narrative arcs.", perks: ["40, 60 or 90 episodes", "Full narrative arc calculated", "Optimized tension progression"] },
      variations:  { title: "3 script variations", desc: "Generate 3 different versions of the same episode to pick the best.", perks: ["3 scripts per episode", "Different narrative angles", "Mix or choose versions"] },
      calendrier:  { title: "Editorial calendar", desc: "A week-by-week publishing plan with captions and hashtags per platform.", perks: ["Week-by-week schedule", "Viral captions per platform", "TikTok, Reels, Shorts, Vertical"] },
      saison2:     { title: "Season 2", desc: "Extend your series with a coherent season 2 — new arcs, new cast, new tensions.", perks: ["Full Season 2 bible", "Guaranteed narrative consistency", "New characters and secrets"] },
      accroches:   { title: "Full hooks", desc: "Generate viral captions for all your episodes, not just the first 3.", perks: ["Captions for all episodes", "Targeted hashtags per episode", "1-click copy"] },
    },
  };

  const info = (FEATURES[lang] || FEATURES.fr)[feature] || (FEATURES[lang] || FEATURES.fr).serie;

  const handleUpgrade = async () => {
    try {
      const r = await fetch("/api/portal", { method: "POST" });
      const d = await r.json();
      if (d.url) window.location.href = d.url;
    } catch (e) {
      window.location.href = "https://verticalclap.com/#pricing";
    }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "var(--card)", borderRadius: "20px 20px 0 0", padding: "28px 24px 36px", maxWidth: 520, width: "100%", border: "1.5px solid var(--bo)", borderBottom: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "#a855f7" }}>Pro · 19€/mois</span>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 900, marginTop: 4, lineHeight: 1.2 }}>{info.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: "var(--bg)", border: "1.5px solid var(--bo)", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: "var(--mt)", flexShrink: 0 }}>✕</button>
        </div>
        <p style={{ fontSize: 14, color: "var(--mt)", lineHeight: 1.6, marginBottom: 20 }}>{info.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {info.perks.map((perk, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#a855f7", fontSize: 14, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: "var(--tx)", fontWeight: 600 }}>{perk}</span>
            </div>
          ))}
        </div>
        <button onClick={handleUpgrade} style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#fff", border: "none", padding: "16px 20px", borderRadius: 14, width: "100%", fontSize: 15, fontWeight: 900, cursor: "pointer", fontFamily: "var(--sans)", letterSpacing: "0.03em" }}>
          {lang === "fr" ? "Passer au Premium →" : "Upgrade to Premium →"}
        </button>
        <p style={{ fontSize: 11, color: "var(--mt)", textAlign: "center", marginTop: 10 }}>
          {lang === "fr" ? "Sans engagement · Annulable à tout moment" : "No commitment · Cancel anytime"}
        </p>
      </div>
    </div>
  );
}

// ── ONBOARDING ───────────────────────────────────────────────
const ONBOARDING_KEY = "vc_onboarded_v1";
function OnboardingOverlay({ lang, onDone }) {
  const [step, setStep] = useState(0);
  const steps = lang === "fr" ? [
    { emoji: "🎬", title: "Bienvenue sur VerticalClap", desc: "Crée des micro-dramas verticaux prêts à poster sur TikTok, Reels et Shorts — en 5 minutes chrono." },
    { emoji: "⚡", title: "1. Configure ton univers", desc: "Choisis le casting, l'univers, le secret central. L'IA fait le reste — bible, personnages, arcs narratifs." },
    { emoji: "✍️", title: "2. Écris les scripts", desc: "Génère chaque épisode avec hook, twist et cliffhanger. Modifie, intensifie, exporte en PDF." },
    { emoji: "📣", title: "3. Distribue ta série", desc: "Légendes TikTok, calendrier de publication, affiche — tout est prêt. Lance ta série." },
  ] : [
    { emoji: "🎬", title: "Welcome to VerticalClap", desc: "Create vertical micro-dramas ready to post on TikTok, Reels and Shorts — in 5 minutes flat." },
    { emoji: "⚡", title: "1. Set up your universe", desc: "Choose casting, setting, central secret. AI does the rest — bible, characters, narrative arcs." },
    { emoji: "✍️", title: "2. Write the scripts", desc: "Generate each episode with hook, twist and cliffhanger. Edit, intensify, export to PDF." },
    { emoji: "📣", title: "3. Distribute your series", desc: "TikTok captions, publishing calendar, poster — all ready. Launch your series." },
  ];
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "var(--card)", borderRadius: "20px 20px 0 0", padding: "32px 24px 40px", maxWidth: 520, width: "100%", border: "1.5px solid var(--bo)", borderBottom: "none" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {step === 0 ? (
            <img src="/1024.webp" alt="VerticalClap" style={{ width: 80, height: 80, borderRadius: 20, marginBottom: 16, boxShadow: "0 8px 32px rgba(232,92,58,0.4)" }} />
          ) : (
            <div style={{ fontSize: 48, marginBottom: 16 }}>{current.emoji}</div>
          )}
          <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 900, marginBottom: 10, lineHeight: 1.2 }}>{current.title}</h2>
          <p style={{ fontSize: 14, color: "var(--mt)", lineHeight: 1.7 }}>{current.desc}</p>
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 28 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? "var(--r)" : "var(--bo)", transition: "all .3s" }} />
          ))}
        </div>
        <button onClick={() => { if (isLast) { localStorage.setItem(ONBOARDING_KEY, "1"); onDone(); } else setStep(s => s + 1); }}
          style={{ background: isLast ? "var(--r)" : "var(--card)", color: isLast ? "#fff" : "var(--tx)", border: isLast ? "none" : "1.5px solid var(--bo)", padding: "16px 20px", borderRadius: 14, width: "100%", fontSize: 15, fontWeight: 900, cursor: "pointer", fontFamily: "var(--sans)" }}>
          {isLast ? (lang === "fr" ? "Créer ma première série →" : "Create my first series →") : (lang === "fr" ? "Suivant →" : "Next →")}
        </button>
        {!isLast && (
          <button onClick={() => { localStorage.setItem(ONBOARDING_KEY, "1"); onDone(); }}
            style={{ background: "none", border: "none", color: "var(--mt)", fontSize: 12, cursor: "pointer", width: "100%", marginTop: 12, padding: 4 }}>
            {lang === "fr" ? "Passer" : "Skip"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────
function AppInner() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState(null);
  const [plan, setPlan] = useState("standard");
  const [checking, setChecking] = useState(true);
  const [screen, setScreen] = useState("mix");
  const darkMode = true;
  const [savedCount, setSavedCount] = useState(0);
  const [lang, setLang] = useState("fr");
  const [upgradeFeature, setUpgradeFeature] = useState(null);
  const showUpgrade = (feature) => setUpgradeFeature(feature);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
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
      if (!localStorage.getItem(ONBOARDING_KEY)) setShowOnboarding(true);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "");
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

  // Auto-set mode selon le plan
  useEffect(() => {
    setState(prev => ({ ...prev, mode: plan === "premium" ? "premium" : "fast" }));
  }, [plan]);

  const t = T[lang];
  const opts = OPTS[lang];

  const [state, setState] = useState({ mode: "fast", casting: OPTS.fr.casting[0], univers: OPTS.fr.univers_fast[0], secret: OPTS.fr.secret_fast[0], format: 10, duree: 60, genre: "", ambiance: "", ambianceVisuelle: "", budget: "smartphone", lieu: "", tropes: "", tropesSel: [], castingIA: [], castingMods: { physique: [], culture: [], aesthetic: [], blessure: [], aura: [] }, packId: null, style: "⚡ Vertical Drama", drama: { romance: 5, toxicite: 5, mystere: 4, humour: 2, violence: 3, spicy: 3 }, dramaPremium: { emotion: null, rythme: null, narration: null, ton: null, tension: null }, remake: null, genreFormat: null });
  const [bible, setBible] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [epIdx, setEpIdx] = useState(0);
  const [selectedChoix, setSelectedChoix] = useState(null);
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
    const { session_id, admin, preview } = router.query;
    const ADMIN_IDS = ["vc-admin-sophie-2026", "vc-admin-test-2026"];
    if (admin && (admin === process.env.NEXT_PUBLIC_JETON_ADMIN || ADMIN_IDS.includes(admin))) {
      localStorage.setItem("vs_customer", admin);
      setCustomerId(admin);
      setIsAdmin(true);
      const sp = localStorage.getItem("vs_plan");
      if (sp) setPlan(sp);
      setChecking(false);
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
      const avPreset = AMBIANCE_VIS.find(x => x.id === state.ambianceVisuelle);
      const avInstr = avPreset ? (avPreset.instr[lang === "en" ? "en" : "fr"]) : undefined;
      const remakeObj = REMAKE_INSPIRATIONS.find(r => r.id === state.remake);
      const remakeInspiration = remakeObj ? remakeObj.instr : undefined;
      const b = await gen("bible", { ...cleanState(state), lang, castingIA: castingIAInstr, ambianceVisuelle: avInstr, remakeInspiration }, customerId);
      setBible(b);

      // Mode test : la bible contient déjà les épisodes
      if (b._episodes && b._episodes.length > 0) {
        setEpisodes(b._episodes);
        setScripts({});
        saveSerie(b, b._episodes, state, {});
        setSavedCount(loadSaved().length);
        setScreen("bible");
        return;
      }

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
    // Capture current choice before clearing it
    const choixContext = selectedChoix !== null && script?.choix?.[selectedChoix] ? script.choix[selectedChoix] : null;
    setSelectedChoix(null);
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
      const bLevel = BUDGET_LEVELS.find(b => b.id === state.budget);
      const s = await gen("script", { ep: episodes[idx], bible, mode: state.mode, duree: state.duree, style: state.style, drama: state.drama, dramaPremium: state.dramaPremium, ambianceVisuelle: state.ambianceVisuelle || "", budgetInstr: bLevel?.scriptInstr || "", lang, isChoix: !!episodes[idx]?.has_choix, genreFormat: state.genreFormat || null, choixContext: choixContext || null }, customerId);
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
  const [affiche, setAffiche] = useState(null);
  const [loadingAffiche, setLoadingAffiche] = useState(false);
  const [profils, setProfils] = useState(null);
  const [loadingProfils, setLoadingProfils] = useState(false);
  const [storyboard, setStoryboard] = useState(null);
  const [loadingStoryboard, setLoadingStoryboard] = useState(false);

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

  const genProfils = async () => {
    setProfils(null); setLoadingProfils(true); setScreen("profils");
    try {
      const r = await gen("profils", { titre: bible.titre, personnages: bible.personnages || [], genre: state.genre, lang }, customerId);
      setProfils(r);
    } catch(e) { console.error(e); }
    setLoadingProfils(false);
  };

  const genStoryboard = async () => {
    setStoryboard(null); setLoadingStoryboard(true); setScreen("storyboard");
    try {
      const r = await gen("storyboard", { ep: episodes[epIdx], script, bible, lang }, customerId);
      setStoryboard(r);
    } catch(e) { console.error(e); }
    setLoadingStoryboard(false);
  };



  const exportScript = async () => {
    const b = bible, ep = episodes[epIdx], s = script;
    if (!s) return;

    const loadImgB64 = (url) => new Promise(resolve => {
      const img = new Image(); img.crossOrigin = "anonymous";
      img.onload = () => { const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; c.getContext("2d").drawImage(img, 0, 0); resolve(c.toDataURL("image/png")); };
      img.onerror = () => resolve(null);
      img.src = url;
    });
    const logoB64 = await loadImgB64("/1024.webp");

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, ML = 16, MR = 16, contentW = W - ML - MR;
    const RED = [232, 92, 58], INK = [22, 22, 32], GRAY = [130, 130, 145], LGRAY = [200, 200, 210];
    const BGRED = [255, 245, 241], BGDARK = [18, 18, 30];
    let y = ML;

    // ── helpers ──────────────────────────────────────────────────
    const checkPage = (needed = 20) => { if (y + needed > 282) { doc.addPage(); y = ML; } };
    const sp = (h = 5) => { y += h; };
    const lh = (size) => size * 0.45 + 1.2;

    const txt = (text, opts = {}) => {
      const { size = 10.5, bold = false, italic = false, color = INK, align = "left", mw = contentW, x = ML } = opts;
      if (!text) return;
      doc.setFontSize(size);
      doc.setFont("helvetica", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(String(text), mw);
      const lineH = lh(size);
      checkPage(lines.length * lineH + 2);
      doc.text(lines, align === "center" ? W / 2 : x, y, { align });
      y += lines.length * lineH + 1.5;
    };

    const rule = (color = LGRAY, thick = 0.3) => {
      doc.setDrawColor(...color); doc.setLineWidth(thick);
      doc.line(ML, y, W - MR, y); sp(4);
    };

    const badge = (label, bgColor = RED) => {
      doc.setFontSize(7); doc.setFont("helvetica", "bold");
      const tw = doc.getTextWidth(label.toUpperCase());
      const bw = tw + 10, bh = 5.5;
      doc.setFillColor(...bgColor);
      doc.roundedRect(ML, y, bw, bh, 1.5, 1.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(label.toUpperCase(), ML + 5, y + 3.8);
      y += bh + 3;
    };

    const colorBlock = (bgColor, drawFn, padH = 5, padV = 6) => {
      const savedY = y;
      y += padV;
      const innerY = y;
      drawFn();
      const blockH = y - savedY + padV;
      y = savedY;
      checkPage(blockH + 4);
      doc.setFillColor(...bgColor);
      doc.roundedRect(ML, y, contentW, blockH, 3, 3, "F");
      y += padV;
      drawFn();
      y += padV;
    };

    const addWatermark = () => {
      const n = doc.getNumberOfPages();
      for (let i = 1; i <= n; i++) {
        doc.setPage(i);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.05 }));
        doc.setFontSize(40); doc.setFont("helvetica", "bold"); doc.setTextColor(232, 92, 58);
        doc.text("VERTICALCLAP", W / 2, 148, { align: "center", angle: 45 });
        doc.restoreGraphicsState();
        // Footer
        doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(...LGRAY);
        doc.text(`verticalclap.com  ·  ${b.titre} — Ép. ${ep.numero}`, W / 2, 292, { align: "center" });
      }
    };

    const isEn = lang === "en";

    // ── HEADER BAR ───────────────────────────────────────────────
    doc.setFillColor(...RED);
    doc.rect(0, 0, W, 13, "F");
    if (logoB64) doc.addImage(logoB64, "PNG", ML, 1.5, 10, 10);
    doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
    doc.text("VERTICAL CLAP", ML + (logoB64 ? 13 : 0), 7.5);
    doc.text(`${b.titre.toUpperCase()}  ·  ${isEn ? "EP." : "ÉP."} ${ep.numero}`, W - MR, 7.5, { align: "right" });
    y = 21;

    // ── TITLE BLOCK ──────────────────────────────────────────────
    // Série name pill
    doc.setFillColor(240, 240, 245); doc.roundedRect(ML, y, doc.getTextWidth(b.titre.toUpperCase()) + 14, 7, 3, 3, "F");
    doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(...GRAY);
    doc.text(b.titre.toUpperCase(), ML + 7, y + 5);
    y += 16;
    // Episode title — grand et fort
    txt(ep.titre, { size: 26, bold: true, color: INK });
    sp(2);
    // Logline
    txt(`« ${b.logline} »`, { size: 9, italic: true, color: GRAY });
    sp(3);
    // Metadata pills
    doc.setFillColor(...RED); doc.roundedRect(ML, y, 70, 7, 3, 3, "F");
    doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255);
    doc.text(`ÉP. ${ep.numero}  ·  ${DUR_LABEL[lang][state.duree]}  ·  ${(s.scenes || []).length} répliques`, ML + 5, y + 5);
    y += 13;
    rule(RED, 0.8); sp(2);

    // ── HOOK ────────────────────────────────────────────────────
    badge(isEn ? "HOOK — FIRST 3 SECONDS" : "HOOK — 3 PREMIÈRES SECONDES");
    colorBlock(BGRED, () => {
      txt(s.hook_scene?.texte, { size: 12.5, bold: true, color: INK, mw: contentW - 10, x: ML + 4 });
      sp(2);
      txt(`[9:16]  ${s.hook_scene?.visuel_916}`, { size: 8.5, italic: true, color: RED, mw: contentW - 10, x: ML + 4 });
    });
    sp(7);

    // ── SCENES ──────────────────────────────────────────────────
    badge(isEn ? "SCRIPT" : "SCRIPT");
    sp(2);
    (s.scenes || []).forEach((sc, i) => {
      checkPage(24);
      // Character name
      txt(sc.perso.toUpperCase(), { size: 8, bold: true, color: RED });
      if (sc.jeu) { txt(`(${sc.jeu})`, { size: 8, italic: true, color: GRAY }); }
      sp(0.5);
      txt(sc.dialogue, { size: 11, color: INK });
      sp(1.5);
      txt(`[9:16]  ${sc.visuel_916}`, { size: 8, italic: true, color: GRAY });
      if (sc.voix_off) { sp(1); txt(`VO: ${sc.voix_off}`, { size: 8, italic: true, color: [140, 100, 200] }); }
      sp(5);
      if (i < (s.scenes || []).length - 1) {
        doc.setDrawColor(...LGRAY); doc.setLineWidth(0.2);
        doc.setLineDash([1.5, 2]);
        doc.line(ML + 10, y, W - MR - 10, y);
        doc.setLineDash([]);
        sp(5);
      }
    });

    // ── CLIFFHANGER ─────────────────────────────────────────────
    sp(6);
    checkPage(50);
    const cliffLabel = s.cliffhanger_scene?.label || "";
    doc.setFontSize(14); const cliffLines = doc.splitTextToSize(String(s.cliffhanger_scene?.texte || ""), contentW - 20);
    doc.setFontSize(8.5); const visLines = doc.splitTextToSize(String(s.cliffhanger_scene?.visuel_916 || ""), contentW - 20);
    const cliffH = 14 + cliffLines.length * lh(14) + 4 + visLines.length * lh(8.5) + (cliffLabel ? 14 : 0) + 10;
    // fond blanc + bordure rouge épaisse (print-friendly)
    doc.setFillColor(255, 255, 255); doc.roundedRect(ML, y, contentW, cliffH, 5, 5, "F");
    doc.setDrawColor(...RED); doc.setLineWidth(1.5); doc.roundedRect(ML, y, contentW, cliffH, 5, 5, "S");
    doc.setLineWidth(0.3);
    // barre gauche rouge pleine
    doc.setFillColor(...RED); doc.roundedRect(ML, y, 5, cliffH, 2, 2, "F");
    // label CLIFFHANGER
    y += 5;
    doc.setFontSize(7); doc.setFont("helvetica", "bold");
    doc.setTextColor(...RED);
    doc.text("— CLIFFHANGER", ML + 12, y + 3);
    y += 8;
    // texte principal grand et sombre (lisible à l'impression)
    txt(s.cliffhanger_scene?.texte, { size: 14, bold: true, color: INK, mw: contentW - 20, x: ML + 12 });
    sp(3);
    // direction visuelle en gris
    txt(`[9:16]  ${s.cliffhanger_scene?.visuel_916}`, { size: 8, italic: true, color: GRAY, mw: contentW - 20, x: ML + 12 });
    if (cliffLabel) {
      sp(5);
      doc.setFontSize(7.5); doc.setFont("helvetica", "bold");
      const cw = doc.getTextWidth(cliffLabel.toUpperCase()) + 14;
      doc.setFillColor(...RED); doc.roundedRect(ML + 12, y, cw, 7, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(cliffLabel.toUpperCase(), ML + 19, y + 5);
      y += 10;
    }
    y = Math.max(y, y) + 6;

    // ── CHARACTERS ──────────────────────────────────────────────
    if (b.personnages?.length > 0) {
      sp(10); rule(); sp(2);
      badge(isEn ? "CHARACTERS" : "PERSONNAGES", [60, 60, 80]);
      sp(2);
      b.personnages.forEach(p => {
        txt(`${p.nom}${p.age ? `  (${p.age})` : ""}  —  ${p.role || ""}`, { size: 9.5, bold: true, color: INK });
        if (p.secret) txt(`Secret : ${p.secret}`, { size: 8.5, italic: true, color: GRAY });
        sp(4);
      });
    }

    // ── CHECKLIST ───────────────────────────────────────────────
    if (s.checklist?.length > 0) {
      sp(6); rule(); sp(2);
      badge(isEn ? "SHOOTING CHECKLIST" : "CHECKLIST TOURNAGE", [60, 60, 80]);
      sp(2);
      s.checklist.forEach(item => { txt(`☐  ${item}`, { size: 9, color: INK }); sp(1.5); });
    }

    sp(16);
    addWatermark();
    doc.save(`${b.titre.replace(/\s+/g, "_")}_ep${ep.numero}.pdf`);
  };

  // ── Render ──
  if (checking) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0c0c12" }}><LoadingVC /></div>;

  if (!customerId) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, textAlign: "center", background: "#0c0c12", position: "relative", overflow: "hidden" }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(232,92,58,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo mark */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.6)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--sans)" }}>VERTICAL</span>
              <div style={{ width: "100%", height: 1.5, background: "#E85C3A", margin: "3px 0" }} />
              <span style={{ fontSize: 10, fontWeight: 900, color: "#E85C3A", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--sans)" }}>CLAP</span>
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(32px, 8vw, 52px)", fontWeight: 900, marginBottom: 12, color: "#f1f5f9", textTransform: "uppercase", letterSpacing: -1, lineHeight: 1 }}>
            {lang === "en" ? "Create viral series" : "Crée des séries virales"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 8, fontFamily: "var(--sans)" }}>
            {lang === "en" ? "Your AI studio for addictive vertical micro-dramas." : "Ton studio IA pour micro-dramas verticaux addictifs."}
          </p>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32, fontFamily: "var(--sans)" }}>
            {lang === "en" ? "Hooks · Twists · Cliffhangers" : "Hooks · Twists · Cliffhangers"}
          </p>
          <a href="/" style={{ display: "inline-block", background: "#E85C3A", color: "#fff", padding: "16px 32px", borderRadius: 14, fontWeight: 900, fontSize: 14, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.06em", boxShadow: "0 6px 28px rgba(232,92,58,0.4)" }}>
            {lang === "en" ? "See plans →" : "Voir les tarifs →"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", justifyContent: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", overflow: "hidden", width: "100%", maxWidth: 480 }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>

      {/* Loading */}
      {screen === "load" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
          {err ? (
            <>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><span style={{ color: "#fff", fontSize: 28 }}>!</span></div>
              <p style={{ color: "var(--tx)", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Oups, une erreur est survenue</p>
              <p style={{ color: "var(--mt)", fontSize: 13, lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>{err}</p>
              <button onClick={() => setScreen("mix")} style={{ background: "var(--r)", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>← Retour</button>
            </>
          ) : (
            <>
              <img src="/1024.webp" alt="VC" style={{ width: 72, height: 72, borderRadius: 18, marginBottom: 24, animation: "pulse 1.5s infinite", boxShadow: "0 0 32px rgba(232,92,58,0.5)" }} />
              <p style={{ fontSize: 15, color: "var(--mt)", marginBottom: 6 }}>{loadMsg}</p>
              <p style={{ fontSize: 11, color: "var(--bo)", letterSpacing: 1 }}>VERTICAL CLAP</p>
            </>
          )}
        </div>
      )}

      {screen === "mix" && <Mixeur state={state} set={set} onGen={generate} onMesSeries={() => setScreen("mes-series")} hasSeries={savedCount > 0} plan={plan} t={t} opts={opts} lang={lang} onUpgrade={showUpgrade} toggleLang={toggleLang} logout={logout} isAdmin={isAdmin} setPlan={setPlan} />}
      {screen === "mes-series" && <MesSeriesView onLoad={loadSerie} onBack={() => setScreen("mix")} t={t} />}
      {screen === "bible" && bible && <BibleView bible={bible} episodes={episodes} mode={state.mode} duree={state.duree} onEp={openEp} onBack={() => setScreen("mix")} customerId={customerId} plan={plan} onAffiche={genAffiche} t={t} lang={lang} onUpgrade={showUpgrade} toggleLang={toggleLang} logout={logout} isAdmin={isAdmin} />}
      {screen === "studio" && <StudioView bible={bible} ep={episodes[epIdx]} script={script} loading={loading} duree={state.duree} onEdit={editScript} onTournage={() => setScreen("tour")} onStoryboard={genStoryboard} onBack={() => setScreen("bible")} onExport={exportScript} onVariations={genVariations} plan={plan} onPrev={() => openEp(epIdx - 1)} onNext={() => openEp(epIdx + 1)} epIdx={epIdx} totalEps={episodes.length} onTranslate={(langue) => gen("traduire", { script, langue, lang }, customerId)} t={t} lang={lang} onUpgrade={showUpgrade} toggleLang={toggleLang} logout={logout} isAdmin={isAdmin} selectedChoix={selectedChoix} onChoixSelect={setSelectedChoix} />}
      {screen === "variations" && <VariationsView variations={variations} loading={loadingVariations} ep={episodes[epIdx]} onSelect={selectVariation} onBack={() => setScreen("studio")} t={t} lang={lang} />}
      {screen === "tour" && <TournageView script={script} ep={episodes[epIdx]} duree={state.duree} onBack={() => setScreen("studio")} budget={state.budget} lang={lang} t={t} />}
      {screen === "affiche" && <AfficheView affiche={affiche} loading={loadingAffiche} bible={bible} onBack={() => setScreen("bible")} t={t} lang={lang} />}
      {screen === "profils" && <ProfilsView profils={profils} loading={loadingProfils} bible={bible} onBack={() => setScreen("bible")} t={t} />}
      {screen === "storyboard" && <StoryboardView storyboard={storyboard} loading={loadingStoryboard} ep={episodes[epIdx]} bible={bible} onBack={() => setScreen("studio")} t={t} />}

      {/* Top bar: lang toggle + logout — uniquement sur les écrans intermédiaires sans header propre */}
      {screen !== "tour" && screen !== "mix" && screen !== "bible" && screen !== "studio" && screen !== "variations" && screen !== "affiche" && screen !== "profils" && screen !== "storyboard" && (
        <div style={{ position: "absolute", top: 14, right: 20, zIndex: 100, display: "flex", alignItems: "center", gap: 10 }}>
          {isAdmin && (
            <button onClick={() => setPlan(p => p === "standard" ? "premium" : "standard")} style={{ background: plan === "standard" ? "rgba(232,92,58,0.12)" : "rgba(168,85,247,0.12)", border: `1px solid ${plan === "standard" ? "rgba(232,92,58,0.3)" : "rgba(168,85,247,0.3)"}`, borderRadius: 8, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: plan === "standard" ? "#E85C3A" : "#a855f7", cursor: "pointer", fontFamily: "var(--sans)", letterSpacing: 0.5 }}>
              👁 {plan === "standard" ? "Créateur" : "Premium"}
            </button>
          )}
          <button onClick={toggleLang} style={{ background: "none", border: "1.5px solid var(--bo)", borderRadius: 8, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: "var(--mt)", cursor: "pointer", fontFamily: "var(--sans)", letterSpacing: 0.5 }}>{lang === "fr" ? "EN" : "FR"}</button>
          <button onClick={logout} style={{ background: "none", border: "none", fontSize: 12, color: "var(--mt)", cursor: "pointer" }}>{t.logout}</button>
        </div>
      )}

      {/* Upgrade modal */}
      {upgradeFeature && <UpgradeModal feature={upgradeFeature} onClose={() => setUpgradeFeature(null)} lang={lang} />}

      {/* Onboarding */}
      {showOnboarding && !checking && <OnboardingOverlay lang={lang} onDone={() => setShowOnboarding(false)} />}
    </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AppInner), { ssr: false });
