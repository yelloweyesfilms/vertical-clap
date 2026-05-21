import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { POSTS } from "../lib/posts";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#94a3b8";

const COPY = {
  fr: {
    studioBadge: "Le studio IA des créateurs verticaux",
    heroLine1: "Ta série,",
    heroLine2: "virale,",
    heroLine3: "maintenant.",
    heroSubtitle: "Bible, scripts, hooks et cliffhangers générés en 5 minutes — prêts pour TikTok, DramaBox et ReelShort.",
    canceledMsg: "Paiement annulé. Réessaie quand tu veux.",
    ctaBtn: "Commencer →",
    redirecting: "Redirection…",
    pricingSubline: "9€/mois · Annulable à tout moment · Aucun engagement",
    trustSecurePayment: "Paiement sécurisé Stripe",
    trustNoCreditCard: "Sans carte bancaire requise",
    trustImmediateAccess: "Accès immédiat",
    cliffhangersLabel: "Des vidéos impossibles à scroller",
    cliffhangersCaption: "Chaque épisode généré se termine par un cliffhanger conçu pour retenir l'audience.",
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
    forYouTitle1: "Solo, équipe ou studio.",
    forYouTitle2: "Tu tournes, on écrit.",
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
    standardFeatures: [
      "⚡ Fast Drama uniquement",
      "10 épisodes par série",
      "Scripts 1 à 2 min",
      "Mode Tournage + Téléprompteur",
      "🌍 Traduction en 8 langues",
      "☁️ Sauvegarde cloud",
      "📄 Export PDF",
    ],
    premiumFeatures: [
      "⚡ Fast Drama + 🎭 Premium Suspense",
      "Jusqu'à 90 épisodes par série",
      "Scripts 1 à 2 min",
      "Mode Tournage + Téléprompteur",
      "🎲 3 variations par script",
      "🌍 Traduction en 8 langues",
      "🎬 Fiche technique de production",
      "☁️ Sauvegarde cloud",
      "📄 Export PDF",
    ],
    ctaBtnPremium: "Commencer Premium →",
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
      { q: "Quelle différence entre Fast Drama et Premium Suspense ?", r: "Fast Drama : émotions frontales, hooks agressifs, rythme maximal — idéal pour TikTok. Premium Suspense : tension psychologique, sous-texte, silences lourds — pour une audience plus mature et des séries premium." },
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
    ctaFinalTitle1: "Ta première série,",
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
    studioBadge: "The AI studio for vertical creators",
    heroLine1: "Your series,",
    heroLine2: "viral,",
    heroLine3: "now.",
    heroSubtitle: "Bible, scripts, hooks and cliffhangers generated in 5 minutes — ready for TikTok, DramaBox and ReelShort.",
    canceledMsg: "Payment canceled. Try again whenever you're ready.",
    ctaBtn: "Get started →",
    redirecting: "Redirecting…",
    pricingSubline: "€9/month · Cancel anytime · No commitment",
    trustSecurePayment: "Secure Stripe payment",
    trustNoCreditCard: "No credit card required",
    trustImmediateAccess: "Immediate access",
    cliffhangersLabel: "Videos impossible to scroll past",
    cliffhangersCaption: "Every generated episode ends with a cliffhanger designed to keep the audience hooked.",
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
    forYouTitle1: "Solo, team or studio.",
    forYouTitle2: "You shoot, we write.",
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
    standardFeatures: [
      "⚡ Fast Drama only",
      "10 episodes per series",
      "1 to 2 min scripts",
      "Shoot Mode + Teleprompter",
      "🌍 Translation in 8 languages",
      "☁️ Cloud save",
      "📄 PDF Export",
    ],
    premiumFeatures: [
      "⚡ Fast Drama + 🎭 Premium Suspense",
      "Up to 90 episodes per series",
      "1 to 2 min scripts",
      "Shoot Mode + Teleprompter",
      "🎲 3 variations per script",
      "🌍 Translation in 8 languages",
      "🎬 Production sheet",
      "☁️ Cloud save",
      "📄 PDF Export",
    ],
    ctaBtnPremium: "Get started Premium →",
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
      { q: "What's the difference between Fast Drama and Premium Suspense?", r: "Fast Drama: frontal emotions, aggressive hooks, maximum pace — ideal for TikTok. Premium Suspense: psychological tension, subtext, heavy silences — for a more mature audience and premium series." },
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
    ctaFinalTitle1: "Your first series,",
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
    imgHero: "/banniere%20EN.png",
    imgCliffhangers: "/cliffhangers%20EN.png",
    imgBible: "/la%20bible%20complete%20EN.png",
    imgScript: "/du%20script%20a%20l'ecran%20EN.png",
    imgViral: "/pour%20percer%20EN.png",
    imgMixeur: "/le%20mixeur%20EN.png",
    imgCreateurs: "/les%20createurs%20EN.png",
    imgPipeline: "/pipeline.png",
    imgVariations: "/3%20variations%20EN.png",
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
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nlEmail }) });
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
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, plan, billing: b, trial }) });
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
          nav { padding: 14px 16px !important; }
          .hero-pad { padding: 64px 20px 48px !important; }
          .sec { padding: 60px 20px !important; }
          .hero-visual-wrap { padding: 0 12px 48px !important; }
          .sec-img { padding: 60px 12px !important; }
          .mock-phone { display: none !important; }
          .feat-strip { gap: 0 !important; flex-wrap: wrap; }
          .feat-strip-item { width: 50% !important; border-right: none !important; border-bottom: 1px solid ${BORDER} !important; }
          .platform-row { gap: 20px !important; }
          .stats-bar { gap: 28px !important; padding: 28px 20px !important; }
          .footer-inner { padding: 40px 20px 32px !important; }
          .footer-inner > div:first-child { grid-template-columns: 1fr 1fr !important; }
          .trust-row { gap: 12px !important; }
          .addiction-layout { flex-direction: column !important; gap: 32px !important; }
          .addiction-layout .comments-col { display: none !important; }
          .mock-phone-section { padding: 60px 20px !important; }
        }
      `}</style>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.85)", backdropFilter: "blur(20px)" }}>
        <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 800, color: RED, letterSpacing: 2 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED, animation: "pulse 1.5s infinite" }} />
            REC
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 3, gap: 2 }}>
              <a href="/" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800, color: lang === "fr" ? "#fff" : MUTED, background: lang === "fr" ? "rgba(255,255,255,0.1)" : "transparent", textDecoration: "none", letterSpacing: 0.5 }}>FR</a>
              <a href="/en" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: lang === "en" ? 800 : 700, color: lang === "en" ? "#fff" : MUTED, background: lang === "en" ? "rgba(255,255,255,0.1)" : "transparent", textDecoration: "none", letterSpacing: 0.5 }}>EN</a>
            </div>
            <a href="/tarifs" style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>{c.navPricing}</a>
            <a href="/app" style={{ fontSize: 14, color: TEXT, fontWeight: 700, background: SURFACE, border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 10 }}>{c.navSignin}</a>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 40px 60px", position: "relative", overflow: "hidden" }} className="hero-pad">
        <div style={{ position: "absolute", top: 40, left: "10%", width: 600, height: 600, background: `radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 120, right: "5%", width: 350, height: 350, background: `radial-gradient(circle, rgba(232,92,58,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: VIO, padding: "7px 18px", borderRadius: 100, fontSize: 12, fontWeight: 600, marginBottom: 40, animation: "glow 3s infinite", letterSpacing: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: VIO, display: "inline-block" }} />
            {c.studioBadge}
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, letterSpacing: -3, marginBottom: 32, color: TEXT, lineHeight: 1 }}>
            <div style={{ fontSize: "clamp(56px, 11vw, 130px)", lineHeight: 0.92 }}>{c.heroLine1}</div>
            <div style={{ fontSize: "clamp(56px, 11vw, 130px)", lineHeight: 0.95, background: `linear-gradient(135deg, ${RED} 20%, ${VIO})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>{c.heroLine2}</div>
            <div style={{ fontSize: "clamp(56px, 11vw, 130px)", lineHeight: 0.95, color: TEXT }}>{c.heroLine3}</div>
          </h1>

          <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: MUTED, maxWidth: 420, margin: "0 auto 52px", lineHeight: 1.7, fontWeight: 400 }}>
            {c.heroSubtitle}
          </p>

          {canceled && <p style={{ color: RED, marginBottom: 16, fontSize: 14 }}>{c.canceledMsg}</p>}

          <div className="hero-row" style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: emailError ? 6 : 14 }}>
            <input type="email" placeholder={c.nlEmailPlaceholder} value={email} onChange={e => { setEmail(e.target.value); setEmailError(false); }} onKeyDown={e => e.key === "Enter" && startCheckout()}
              style={{ padding: "16px 20px", borderRadius: 14, border: `1px solid ${emailError ? RED : BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, width: 240, outline: "none", backdropFilter: "blur(8px)", transition: "border-color .2s" }} />
            <GlowBtn onClick={() => startCheckout("standard", "hero")} disabled={loading} gradient>
              {loading ? c.redirecting : c.ctaBtn}
            </GlowBtn>
          </div>
          {emailError && <p style={{ textAlign: "center", color: RED, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{c.emailError}</p>}
          <p style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>{c.pricingSubline}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: "🔒", label: c.trustSecurePayment },
              { icon: "✓", label: c.trustNoCreditCard },
              { icon: "⚡", label: c.trustImmediateAccess },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: MUTED }}>
                <span style={{ color: "#4ade80" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HERO VISUAL */}
      <div className="hero-visual-wrap" style={{ maxWidth: 900, margin: "0 auto 0" }}>
        <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 0 80px rgba(168,85,247,0.15), 0 0 40px rgba(232,92,58,0.1), 0 32px 80px rgba(0,0,0,0.5)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <img src={c.imgHero} alt="VerticalClap — Ta série prête à tourner en 5 minutes" style={{ width: "100%", display: "block", borderRadius: 20 }} />
        </div>
      </div>

      {/* CLIFFHANGERS */}
      <div className="sec-img" style={{ textAlign: "center", background: "linear-gradient(180deg, rgba(168,85,247,0.04) 0%, transparent 100%)", borderBottom: `1px solid ${BORDER}` }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: VIO, marginBottom: 32, fontFamily: "'Space Grotesk', sans-serif" }}>{c.cliffhangersLabel}</p>
        <div style={{ maxWidth: 900, margin: "0 auto", overflow: "hidden", borderRadius: 16 }}>
          <img src={c.imgCliffhangers} alt="Cliffhangers — scènes impossibles à scroller" style={{ width: "100%", display: "block", borderRadius: 16 }} />
        </div>
        <p style={{ color: MUTED, fontSize: 14, marginTop: 32 }}>{c.cliffhangersCaption}</p>
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
                    <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>Héritage Maudit</div>
                    <div style={{ fontSize: 8, color: VIO, fontWeight: 700 }}>Épisode 8 · Saison 1</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: RED, animation: "pulse 1.5s infinite" }} />
                    <span style={{ fontSize: 7, color: RED, fontWeight: 800, letterSpacing: 1 }}>LIVE</span>
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: -0.5, marginBottom: 14, textShadow: "0 0 40px rgba(168,85,247,0.5)" }}>
                    &quot;Tu m&apos;as menti<br />depuis le début.&quot;
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, padding: "0 16px 10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", fontWeight: 600 }}>ÉP. 8 / 10</span>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", fontWeight: 600 }}>94%</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 1 }}>
                    <div style={{ width: "94%", height: "100%", background: `linear-gradient(90deg, ${VIO}, ${RED})`, borderRadius: 1 }} />
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 2, padding: "8px 16px 14px", display: "flex", justifyContent: "space-around", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {[["❤️","47.2k"],["💬","2.1k"],["🔗","Partager"],["▶️","Ép. 9 →"]].map(([icon, val], i) => (
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
              {[
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
              ].map((comment, i) => (
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
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
        <div className="feat-strip" style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "center" }}>
          {[
            { Icon: BoltIcon, label: "Rapide", color: RED },
            { Icon: PhoneIcon, label: "Format 9:16", color: VIO },
            { Icon: ClapperIcon, label: "Scripts impactants", color: RED },
            { Icon: ClockIcon, label: "Sauvegarde cloud", color: VIO },
          ].map(({ Icon, label, color }, i, arr) => (
            <div key={i} className="feat-strip-item" style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 32px", borderRight: i < arr.length - 1 ? `1px solid ${BORDER}` : "none", flex: 1, justifyContent: "center" }}>
              <span style={{ color, display: "flex" }}><Icon size={20} /></span>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: TEXT, whiteSpace: "nowrap" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderBottom: `1px solid ${BORDER}`, padding: "16px 0", background: "rgba(255,255,255,0.01)", userSelect: "none" }}>
        <div style={{ display: "flex", gap: 0, animation: "marquee 40s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(2)].map((_, rep) => (
            ["Le Mensonge", "Héritage", "Deux Vies", "La Trahison", "Le Dernier Appel", "Secrets de Famille", "Le Pacte", "Double Jeu", "La Chute", "Huis Clos", "Rupture", "Le Témoin", "Zone Rouge", "L'Imposteur", "Sous Pression"].map((t, i) => (
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
          <img src={c.imgBible} alt="Bible complète — titre, logline, personnages, séquencier" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.12), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
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
          <img src={c.imgScript} alt="Script à l'écran — Mode Tournage VerticalClap" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 48px 80px rgba(0,0,0,0.8)" }} />
        </div>
      </div>

      {/* VIRAL STATS */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={RED}>{c.viralLabel}</Label>
          <Title>{c.viralTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.viralTitle2}</span></Title>
          <img src={c.imgViral} alt="Conçu pour percer — 1 épisode = 1 cliffhanger, TikTok Reels Shorts" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.12), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
        </div>
      </div>

      {/* LE MIXEUR */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={RED}>{c.mixerLabel}</Label>
          <Title>{c.mixerTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.mixerTitle2}</span></Title>
          <img src={c.imgMixeur} alt="Le Mixeur — 12 univers, 16 secrets, 4 castings" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(232,92,58,0.12), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
        </div>
      </div>

      {/* POUR QUI */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={RED}>{c.forYouLabel}</Label>
          <Title>{c.forYouTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.forYouTitle2}</span></Title>
          <img src={c.imgCreateurs} alt="Fait pour les créateurs qui tournent vraiment — solo, équipe, pro" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(232,92,58,0.1), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
        </div>
      </div>

      {/* PIPELINE */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.pipelineLabel}</Label>
          <Title>{c.pipelineTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.pipelineTitle2}</span></Title>
          <img src={c.imgPipeline} alt="Le pipeline créatif — du concept au tournage en 5 étapes" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.1), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
        </div>
      </div>

      {/* VARIATIONS */}
      <div className="sec" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label color={VIO}>{c.variationsLabel}</Label>
          <Title>{c.variationsTitle1}<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{c.variationsTitle2}</span></Title>
          <img src={c.imgVariations} alt="3 variations par script — Intense, Subtil, Rapide" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.5)", marginTop: 48 }} />
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

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            <div className="glass" style={{ borderRadius: 24, padding: "36px 32px", position: "relative" }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>Standard</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 58, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
                  {billing === "annual" ? "7.5€" : "9€"}
                </div>
                {billing === "annual" && <span style={{ fontSize: 14, color: MUTED, marginBottom: 10, textDecoration: "line-through" }}>9€</span>}
              </div>
              <p style={{ color: MUTED, fontSize: 13, marginBottom: billing === "annual" ? 6 : 28 }}>/mois</p>
              {billing === "annual" && <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginBottom: 22 }}>{c.billedStandardAnnual}</p>}
              <div style={{ marginBottom: 28 }}>
                {c.standardFeatures.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Check />
                    <span style={{ color: MUTED, fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
              <GlowBtn onClick={() => startCheckout("standard", "pricing")} disabled={loading} style={{ width: "100%", fontSize: 15, padding: 16 }}>
                {loading ? c.redirecting : c.ctaBtn}
              </GlowBtn>
            </div>

            <div style={{ borderRadius: 24, padding: "36px 32px", position: "relative", background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 0 48px rgba(168,85,247,0.08)" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 16px", borderRadius: 20, letterSpacing: 1.5, whiteSpace: "nowrap" }}>⭐ RECOMMANDÉ</div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: VIO, textTransform: "uppercase", marginBottom: 12 }}>Premium</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 58, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
                  {billing === "annual" ? "14.9€" : "19€"}
                </div>
                {billing === "annual" && <span style={{ fontSize: 14, color: MUTED, marginBottom: 10, textDecoration: "line-through" }}>19€</span>}
              </div>
              <p style={{ color: MUTED, fontSize: 13, marginBottom: billing === "annual" ? 6 : 28 }}>/mois</p>
              {billing === "annual" && <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginBottom: 22 }}>{c.billedPremiumAnnual}</p>}
              <div style={{ marginBottom: 28 }}>
                {c.premiumFeatures.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Check color={VIO} />
                    <span style={{ color: MUTED, fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
              <GlowBtn onClick={() => startCheckout("premium", "pricing")} disabled={loading} gradient style={{ width: "100%", fontSize: 15, padding: 16 }}>
                {loading ? c.redirecting : c.ctaBtnPremium}
              </GlowBtn>
            </div>
          </div>

          <div className="trust-row" style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 28 }}>
            {c.trustItems.map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: MUTED }}>
                <span style={{ color: "#4ade80", fontSize: 14 }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: MUTED, marginTop: 16 }}>
            {c.tryFreeText1}<a href="/exemples" style={{ color: VIO, fontWeight: 600 }}>{c.tryFreeLink}</a>{c.tryFreeText2}
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
            {POSTS.slice(0, 3).map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px 24px", textDecoration: "none", color: "inherit", transition: "border-color .2s" }}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: post.categoryColor, background: `${post.categoryColor}12`, border: `1px solid ${post.categoryColor}25`, padding: "3px 10px", borderRadius: 6 }}>{post.category}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 900, color: TEXT, letterSpacing: -0.3, lineHeight: 1.3, marginBottom: 12, flex: 1 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 20 }}>{post.description.slice(0, 100)}…</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: MUTED }}>{post.readTime} {c.readTime}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: post.categoryColor }}>Lire →</span>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="/blog" style={{ display: "inline-block", border: `1px solid ${BORDER}`, color: TEXT, padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", background: SURFACE }}>
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
            dans{" "}
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
              {[{ href: "/tarifs", label: c.footerTarifs }, { href: "/exemples", label: c.footerExemples }].map(({ href, label }) => (
                <a key={href} href={href} style={{ display: "block", fontSize: 13, color: MUTED, marginBottom: 10, fontWeight: 500 }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>{c.footerRessources}</p>
              {[
                { href: "/blog", label: "Blog" },
                { href: "/blog/qu-est-ce-qu-un-micro-drama", label: "Guide micro-drama" },
                { href: "/blog/comment-ecrire-un-hook-tiktok", label: "Écrire un hook" },
                { href: "/blog/monetiser-micro-drama-dramabox-reelshort", label: "Monétiser sa série" },
              ].map(({ href, label }) => (
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
