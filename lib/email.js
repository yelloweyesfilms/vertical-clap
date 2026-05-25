import { Resend } from "resend";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = "VerticalClap <hello@verticalclap.app>";
const APP_URL = "https://verticalclap.com";
const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const CARD = "#0d0d1a";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "#8892a4";
const TEXT = "#f1f5f9";

export async function sendWelcomeEmail({ email, plan }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: plan === "premium"
        ? "Bienvenue sur VerticalClap Pro 🎭 — ton studio est prêt"
        : "Bienvenue sur VerticalClap Creator ⚡ — ton studio est prêt",
      html: welcomeHtml(plan),
    });
  } catch (e) {
    console.error("[email] welcome:", e.message);
  }
}

export async function sendReferralRewardEmail({ email, creditEuros }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "🎁 1 mois offert — ton filleul vient de s'abonner !",
      html: referralHtml(creditEuros),
    });
  } catch (e) {
    console.error("[email] referral reward:", e.message);
  }
}

export async function sendCancelEmail({ email }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Ton abonnement VerticalClap a été résilié",
      html: cancelHtml(),
    });
  } catch (e) {
    console.error("[email] cancel:", e.message);
  }
}

export async function sendRelanceEmail({ email }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Ta première série t'attend 🎬",
      html: relanceHtml(),
    });
  } catch (e) {
    console.error("[email] relance:", e.message);
  }
}

export async function sendNewsletterWelcomeEmail({ email, lang = "fr" }) {
  const resend = getResend();
  if (!resend || !email) return;
  const subject = lang === "en"
    ? "Welcome to the VerticalClap newsletter 🎬"
    : "Bienvenue dans la newsletter VerticalClap 🎬";
  const result = await resend.emails.send({
    from: FROM,
    to: email,
    subject,
    html: newsletterWelcomeHtml(lang),
  });
  if (result?.error) {
    console.error("[email] newsletter-welcome:", result.error);
    throw new Error(result.error?.message || JSON.stringify(result.error));
  }
  return result;
}

export async function sendWinbackEmail({ email }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Tes séries t'attendent encore 🎬",
      html: winbackHtml(),
    });
  } catch (e) {
    console.error("[email] winback:", e.message);
  }
}

export async function sendRelanceJ7Email({ email }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "7 jours et toujours pas de première série ? 🤔",
      html: relanceJ7Html(),
    });
  } catch (e) {
    console.error("[email] relance-j7:", e.message);
  }
}

// ── BASE TEMPLATE ──────────────────────────────────────────────────────
function base(title, body, lang = "fr") {
  const footer = lang === "en"
    ? `© 2026 VerticalClap &nbsp;·&nbsp; <a href="${APP_URL}/confidentialite" style="color:${MUTED};text-decoration:none;">Privacy</a> &nbsp;·&nbsp; <a href="${APP_URL}/cgu" style="color:${MUTED};text-decoration:none;">Terms</a> &nbsp;·&nbsp; <a href="${APP_URL}/contact" style="color:${MUTED};text-decoration:none;">Contact</a>`
    : `© 2026 VerticalClap &nbsp;·&nbsp; <a href="${APP_URL}/confidentialite" style="color:${MUTED};text-decoration:none;">Confidentialité</a> &nbsp;·&nbsp; <a href="${APP_URL}/cgu" style="color:${MUTED};text-decoration:none;">CGU</a> &nbsp;·&nbsp; <a href="${APP_URL}/contact" style="color:${MUTED};text-decoration:none;">Contact</a>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${DARK};font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${DARK};padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:580px;background:${CARD};border-radius:20px;overflow:hidden;border:1px solid ${BORDER};">

        <!-- HEADER LOGO -->
        <tr>
          <td style="background:${DARK};padding:18px 32px;border-bottom:1px solid ${BORDER};">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:10px;">
                        <img src="${APP_URL}/1024.png" alt="VC" width="36" height="36" style="width:36px;height:36px;border-radius:50%;display:block;" />
                      </td>
                      <td style="vertical-align:middle;">
                        <span style="font-family:Helvetica,Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:rgba(255,255,255,0.5);display:block;line-height:1;margin-bottom:3px;">VERTICAL</span>
                        <span style="font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:900;color:${RED};letter-spacing:-0.5px;line-height:1;text-transform:uppercase;">CLAP</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="text-align:right;vertical-align:middle;">
                  <span style="font-size:10px;font-weight:700;color:${MUTED};letter-spacing:1px;text-transform:uppercase;">Studio IA · Micro-drama</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ACCENT BAR -->
        <tr><td style="height:3px;background:linear-gradient(90deg,${RED},${VIO});padding:0;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- BODY -->
        <tr><td style="padding:36px 32px 28px;">${body}</td></tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:${DARK};padding:20px 32px;text-align:center;border-top:1px solid ${BORDER};">
            <p style="font-size:11px;color:${MUTED};margin:0 0 4px;line-height:1.6;">${footer}</p>
            <p style="font-size:10px;color:rgba(255,255,255,0.2);margin:0;">Tu reçois cet email car tu es abonné(e) à VerticalClap.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── BOUTON CTA ──────────────────────────────────────────────────────
function btn(text, url, gradient = false) {
  const bg = gradient
    ? `background:linear-gradient(135deg,${RED},${VIO});`
    : `background:${RED};`;
  return `<a href="${url}" style="display:inline-block;${bg}color:#fff;text-decoration:none;padding:16px 40px;border-radius:12px;font-size:14px;font-weight:800;margin:8px 0;letter-spacing:0.5px;text-transform:uppercase;">${text}</a>`;
}

// ── ÉTAPE HOW-TO (texte clair sur fond sombre) ──────────────────────
function step(icon, title, desc) {
  return `
    <tr>
      <td style="padding-bottom:18px;vertical-align:top;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="width:38px;vertical-align:top;padding-top:2px;">
              <div style="width:32px;height:32px;background:rgba(232,92,58,0.15);border-radius:8px;text-align:center;line-height:32px;font-size:16px;">${icon}</div>
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <p style="font-size:14px;font-weight:800;color:${TEXT};margin:0 0 3px;letter-spacing:0.2px;">${title}</p>
              <p style="font-size:12px;color:${MUTED};margin:0;line-height:1.55;">${desc}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

// ── WELCOME EMAIL (abonnement) ──────────────────────────────────────
function welcomeHtml(plan) {
  const isPremium = plan === "premium";
  const planColor = isPremium ? VIO : RED;
  const planName = isPremium ? "PRO" : "CREATOR";
  const planPrice = isPremium ? "19€" : "9€";

  const features = isPremium ? [
    { icon: "🎭", text: "Série Premium · jusqu'à 90 épisodes" },
    { icon: "⚡", text: "Vertical Drama · micro-dramas TikTok" },
    { icon: "🎲", text: "3 variations de ton par script" },
    { icon: "🎬", text: "Fiche technique de production" },
    { icon: "🌍", text: "Traduction en 8 langues" },
    { icon: "📱", text: "Mode Tournage + Téléprompteur" },
    { icon: "☁️", text: "Sauvegarde cloud · Export PDF" },
  ] : [
    { icon: "⚡", text: "Vertical Drama · micro-dramas TikTok" },
    { icon: "📺", text: "20 épisodes par série" },
    { icon: "✍️", text: "Scripts 1–2 min prêts à tourner" },
    { icon: "📱", text: "Mode Tournage + Téléprompteur" },
    { icon: "🌍", text: "Traduction en 8 langues" },
    { icon: "☁️", text: "Sauvegarde cloud · Export PDF" },
  ];

  const upsellBlock = !isPremium ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.2);border-radius:14px;margin-top:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${VIO};margin:0 0 10px;">✦ Disponible en Premium · 19€/mois</p>
        <p style="font-size:13px;color:rgba(200,180,255,0.85);margin:0 0 14px;line-height:1.65;">
          Jusqu'à <strong style="color:#fff;">90 épisodes</strong>, <strong style="color:#fff;">Série Premium</strong> avec tension psychologique, <strong style="color:#fff;">3 variations</strong> par script et <strong style="color:#fff;">fiche de production</strong> — pour +10€/mois.
        </p>
        <a href="${APP_URL}/tarifs" style="font-size:13px;font-weight:700;color:${VIO};text-decoration:none;letter-spacing:0.3px;">Passer à Pro →</a>
      </td></tr>
    </table>` : "";

  return base(`Bienvenue sur VerticalClap ${isPremium ? "Pro" : "Creator"}`, `

    <!-- BANNIÈRE -->
    <div style="margin:-36px -32px 28px;line-height:0;">
      <img src="${APP_URL}/banniere%20hero.webp" alt="VerticalClap" width="580" style="width:100%;max-width:580px;display:block;" />
    </div>

    <!-- HERO -->
    <div style="text-align:center;margin-bottom:32px;">

      <!-- Badge plan -->
      <div style="display:inline-block;background:${isPremium ? "rgba(168,85,247,0.12)" : "rgba(232,92,58,0.12)"};border:1px solid ${isPremium ? "rgba(168,85,247,0.3)" : "rgba(232,92,58,0.3)"};border-radius:20px;padding:6px 18px;margin-bottom:24px;">
        <span style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${planColor};">${isPremium ? "🎭" : "⚡"} ${planName} · ${planPrice}/mois</span>
      </div>

      <!-- Headline -->
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:32px;font-weight:900;color:${TEXT};margin:0 0 8px;letter-spacing:-1px;line-height:1.1;text-transform:uppercase;">
        Ton studio<br><span style="color:${RED};">est prêt.</span>
      </h1>
      <p style="font-size:15px;color:${MUTED};line-height:1.7;margin:16px 0 28px;">
        Génère ta première série en 5 minutes — bible, épisodes, scripts, tout est là.
      </p>

      <!-- CTA principal -->
      ${btn("Ouvrir mon studio →", `${APP_URL}/app`, isPremium)}
    </div>

    <!-- SÉPARATEUR -->
    <div style="height:1px;background:${BORDER};margin:0 0 28px;"></div>

    <!-- FEATURES -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid ${BORDER};border-radius:16px;margin-bottom:28px;">
      <tr><td style="padding:22px 24px;">
        <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${planColor};margin:0 0 16px;">Ton plan inclut</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${features.map((f, i) => `
          <tr>
            <td style="padding-bottom:${i === features.length - 1 ? "0" : "10px"};vertical-align:middle;">
              <span style="font-size:15px;margin-right:10px;">${f.icon}</span>
              <span style="font-size:13px;color:${TEXT};font-weight:600;">${f.text}</span>
            </td>
          </tr>`).join("")}
        </table>
      </td></tr>
    </table>

    <!-- SÉPARATEUR -->
    <div style="height:1px;background:${BORDER};margin:0 0 28px;"></div>

    <!-- HOW TO -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.02);border:1px solid ${BORDER};border-radius:16px;margin-bottom:24px;">
      <tr><td style="padding:22px 24px;">
        <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${RED};margin:0 0 20px;">Comment démarrer</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${step("🎲", "Le Mixeur", "Choisis un pack univers en 1 clic — genre, casting, secret, ambiance pré-configurés.")}
          ${step("📖", "La Bible", "Titre, logline, personnages et séquencier générés en streaming en quelques secondes.")}
          ${step("✍️", "Les Scripts", "Ouvre un épisode → script complet en 10s. Hook, dialogues, cadrage 9:16.")}
          ${step("📱", "Mode Tournage", "Téléprompteur auto-scroll, fond clair ou sombre. Prêt à filmer depuis l'écran.")}
        </table>
      </td></tr>
    </table>

    <!-- CTA secondaire -->
    <div style="text-align:center;margin-bottom:8px;">
      ${btn("Créer ma première série →", `${APP_URL}/app`, isPremium)}
    </div>

    ${upsellBlock}
  `);
}

// ── NEWSLETTER WELCOME ──────────────────────────────────────────────
function newsletterWelcomeHtml(lang = "fr") {
  const isFr = lang !== "en";

  const articles = isFr ? [
    { title: "Qu'est-ce qu'un micro-drama vertical ?", url: `${APP_URL}/blog/qu-est-ce-qu-un-micro-drama`, label: "Guide", time: "7 min", color: RED, emoji: "🎬" },
    { title: "Écrire un hook TikTok irrésistible", url: `${APP_URL}/blog/comment-ecrire-un-hook-tiktok`, label: "Écriture", time: "5 min", color: VIO, emoji: "⚡" },
    { title: "TikTok vs Reelshort vs DramaBox : où publier ?", url: `${APP_URL}/blog/tiktok-vs-dramabox-vs-reelshort-ou-publier-micro-drama`, label: "Stratégie", time: "6 min", color: "#4ade80", emoji: "📲" },
  ] : [
    { title: "What is a vertical micro-drama?", url: `${APP_URL}/en/blog/qu-est-ce-qu-un-micro-drama`, label: "Guide", time: "7 min", color: RED, emoji: "🎬" },
    { title: "Writing an irresistible TikTok hook", url: `${APP_URL}/en/blog/comment-ecrire-un-hook-tiktok`, label: "Writing", time: "5 min", color: VIO, emoji: "⚡" },
    { title: "TikTok vs Reelshort vs DramaBox: where to publish?", url: `${APP_URL}/en/blog/tiktok-vs-dramabox-vs-reelshort-ou-publier-micro-drama`, label: "Strategy", time: "6 min", color: "#4ade80", emoji: "📲" },
  ];

  return base(isFr ? "Ton guide de démarrage VerticalClap 🎬" : "Your VerticalClap starter guide 🎬", `

    <!-- BANNIÈRE VISUELLE -->
    <div style="margin:-36px -32px 28px;line-height:0;overflow:hidden;max-height:260px;">
      <img src="${APP_URL}/banniere%20hero.webp" alt="" width="580" style="width:100%;max-width:580px;display:block;" />
    </div>

    <!-- HERO -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:rgba(232,92,58,0.1);border:1px solid rgba(232,92,58,0.25);border-radius:20px;padding:5px 16px;margin-bottom:20px;">
        <span style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${RED};">${isFr ? "Guide de démarrage" : "Starter guide"}</span>
      </div>
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:${TEXT};margin:0 0 12px;letter-spacing:-1px;line-height:1.15;text-transform:uppercase;">
        ${isFr ? "Tu peux créer une série<br><span style='color:" + RED + ";'>dès aujourd'hui.</span>" : "You can create a series<br><span style='color:" + RED + ";'>starting today.</span>"}
      </h1>
      <p style="font-size:15px;color:${MUTED};line-height:1.7;margin:0;max-width:420px;margin:0 auto;">
        ${isFr
          ? "Voilà exactement comment ça marche — et pourquoi c'est plus simple que tu ne le penses."
          : "Here's exactly how it works — and why it's simpler than you think."}
      </p>
    </div>

    <!-- SÉPARATEUR -->
    <div style="height:1px;background:${BORDER};margin:0 0 28px;"></div>

    <!-- C'EST QUOI -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid ${BORDER};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      <p style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${MUTED};margin:0 0 10px;">
        ${isFr ? "🎬 C'est quoi un micro-drama vertical ?" : "🎬 What is a vertical micro-drama?"}
      </p>
      <p style="font-size:14px;color:${TEXT};line-height:1.7;margin:0;">
        ${isFr
          ? "Une série filmée en <strong style='color:${TEXT};'>format 9:16</strong> (comme une story) composée d'épisodes courts de <strong style='color:${TEXT};'>60 secondes à 2 minutes</strong>. Chaque épisode se termine par un <strong style='color:${RED};'>cliffhanger</strong> qui force le spectateur à regarder le suivant. C'est le format qui explose sur TikTok, Reels et Shorts."
          : "A series filmed in <strong style='color:${TEXT};'>9:16 format</strong> (like a story) made of short episodes of <strong style='color:${TEXT};'>60 seconds to 2 minutes</strong>. Each episode ends with a <strong style='color:${RED};'>cliffhanger</strong> that forces viewers to watch the next one. It's the format exploding on TikTok, Reels and Shorts."}
      </p>
    </div>

    <!-- CE QUE GENERE VERTICALCLAP -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid ${BORDER};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      <p style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${MUTED};margin:0 0 14px;">
        ${isFr ? "✨ Ce que VerticalClap génère pour toi" : "✨ What VerticalClap generates for you"}
      </p>
      ${[
        isFr
          ? { emoji: "📖", label: "La Bible complète", desc: "Titre accrocheur, logline, tension centrale, 2 à 5 personnages avec leur secret, et 10 épisodes résumés — générée en 30 secondes." }
          : { emoji: "📖", label: "The full Bible", desc: "Catchy title, logline, central tension, 2 to 5 characters with their secrets, and 10 summarized episodes — generated in 30 seconds." },
        isFr
          ? { emoji: "✍️", label: "Les scripts prêts à tourner", desc: "Pour chaque épisode : hook percutant, dialogues, indications de jeu d'acteur et cadrage 9:16. Généré en 10 secondes." }
          : { emoji: "✍️", label: "Ready-to-shoot scripts", desc: "For each episode: punchy hook, dialogue, acting notes and 9:16 framing. Generated in 10 seconds." },
        isFr
          ? { emoji: "🎬", label: "Le Mode Tournage", desc: "Téléprompteur auto-scroll intégré. Tu poses ton téléphone, tu appuies sur Play, tu tournes. Ton téléphone devient ton plateau." }
          : { emoji: "🎬", label: "Shoot Mode", desc: "Built-in auto-scroll teleprompter. Set your phone, press Play, shoot. Your phone becomes your set." },
        isFr
          ? { emoji: "⚡", label: "Les accroches réseaux sociaux", desc: "Légendes et hooks adaptés à TikTok, Reels et Shorts pour maximiser la portée de chaque épisode." }
          : { emoji: "⚡", label: "Social media hooks", desc: "Captions and hooks tailored for TikTok, Reels and Shorts to maximize the reach of every episode." },
      ].map(item => `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
        <tr>
          <td style="width:32px;vertical-align:top;padding-top:1px;font-size:18px;">${item.emoji}</td>
          <td style="vertical-align:top;">
            <p style="font-size:13px;font-weight:700;color:${TEXT};margin:0 0 2px;">${item.label}</p>
            <p style="font-size:12px;color:${MUTED};margin:0;line-height:1.5;">${item.desc}</p>
          </td>
        </tr>
      </table>`).join("")}
    </div>

    <!-- LES 3 ETAPES -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid ${BORDER};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      <p style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${MUTED};margin:0 0 14px;">
        ${isFr ? "🎲 Comment ça marche — 3 étapes" : "🎲 How it works — 3 steps"}
      </p>
      ${[
        isFr
          ? { n: "01", color: RED, title: "Le Mixeur", desc: "Tu choisis un genre parmi 12 (Romance, Thriller, K-Drama…), un archétype de personnage parmi 48, et un secret central parmi 16. Ou tu tapes directement ton idée. 1 clic suffit." }
          : { n: "01", color: RED, title: "The Mixer", desc: "Choose a genre from 12 (Romance, Thriller, K-Drama…), a character archetype from 48, and a central secret from 16. Or just type your idea. 1 click is enough." },
        isFr
          ? { n: "02", color: VIO, title: "La Bible se génère", desc: "Tu cliques sur Générer. En moins de 30 secondes, tu vois apparaître le titre, la logline, les personnages avec leurs secrets, et les 10 épisodes résumés. Tout en live." }
          : { n: "02", color: VIO, title: "The Bible generates", desc: "Click Generate. In under 30 seconds, you see the title, logline, characters with their secrets, and 10 summarized episodes appear. All live." },
        isFr
          ? { n: "03", color: "#22c55e", title: "Tu tournes", desc: "Tu ouvres un épisode, tu génères le script (10 sec), et tu actives le Mode Tournage. Le téléprompteur défile automatiquement. Tu n'as plus qu'à filmer." }
          : { n: "03", color: "#22c55e", title: "You shoot", desc: "Open an episode, generate the script (10s), and activate Shoot Mode. The teleprompter scrolls automatically. All you have to do is film." },
      ].map(step => `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
        <tr>
          <td style="width:36px;vertical-align:top;">
            <div style="width:28px;height:28px;border-radius:8px;background:${step.color}20;border:1px solid ${step.color}40;display:flex;align-items:center;justify-content:center;text-align:center;line-height:28px;">
              <span style="font-size:10px;font-weight:900;color:${step.color};">${step.n}</span>
            </div>
          </td>
          <td style="vertical-align:top;padding-left:4px;">
            <p style="font-size:13px;font-weight:700;color:${TEXT};margin:0 0 2px;">${step.title}</p>
            <p style="font-size:12px;color:${MUTED};margin:0;line-height:1.5;">${step.desc}</p>
          </td>
        </tr>
      </table>`).join("")}
    </div>

    <!-- EXEMPLE CONCRET -->
    <div style="background:rgba(232,92,58,0.05);border:1px solid rgba(232,92,58,0.2);border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      <p style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${RED};margin:0 0 10px;">
        ${isFr ? "🎭 Exemple — généré en 30 secondes" : "🎭 Example — generated in 30 seconds"}
      </p>
      <p style="font-size:13px;font-weight:800;color:${TEXT};margin:0 0 4px;">
        ${isFr ? "« Le Syndrome du Mensonge »" : '"The Lie Syndrome"'}
      </p>
      <p style="font-size:12px;color:${MUTED};line-height:1.6;margin:0 0 10px;">
        ${isFr
          ? "Genre : Medical Thriller · 10 épisodes · 1 min chacun<br>Une cardiologue découvre que son mari dirige une double vie — et que son prochain patient est son autre famille."
          : "Genre: Medical Thriller · 10 episodes · 1 min each<br>A cardiologist discovers her husband leads a double life — and her next patient is his other family."}
      </p>
      <p style="font-size:11px;color:rgba(232,92,58,0.8);font-style:italic;margin:0;">
        ${isFr ? "Hook épisode 1 : « Un homme inconnu. Mon nom de famille. Sur son poignet. »" : 'Episode 1 hook: "An unknown man. My last name. On his wrist."'}
      </p>
    </div>

    <!-- TARIF -->
    <div style="background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.2);border-radius:14px;padding:20px 22px;margin-bottom:24px;">
      <p style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${VIO};margin:0 0 10px;">
        ${isFr ? "💡 Pour commencer" : "💡 To get started"}
      </p>
      <p style="font-size:14px;color:${TEXT};line-height:1.6;margin:0 0 6px;">
        ${isFr
          ? "<strong>Plan Creator à 9€/mois</strong> — Bible complète, 10 épisodes, scripts 1 min, Mode Tournage."
          : "<strong>Creator plan at €9/month</strong> — Full bible, 10 episodes, 1-min scripts, Shoot Mode."}
      </p>
      <p style="font-size:12px;color:${MUTED};margin:0;">
        ${isFr ? "Essai 24h sans débit. Annulable en 1 clic." : "24h trial, no charge. Cancel in 1 click."}
      </p>
    </div>

    <!-- SÉPARATEUR -->
    <div style="height:1px;background:${BORDER};margin:0 0 24px;"></div>

    <!-- ARTICLES -->
    <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${MUTED};margin:0 0 14px;">
      ${isFr ? "📚 3 articles pour aller plus loin" : "📚 3 articles to go further"}
    </p>
    ${articles.map(a => `
    <a href="${a.url}" style="text-decoration:none;display:block;margin-bottom:8px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:${a.color};width:3px;padding:0;font-size:0;">&nbsp;</td>
          <td style="padding:12px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="font-size:13px;font-weight:700;color:${TEXT};margin:0 0 2px;line-height:1.3;">${a.emoji} ${a.title}</p>
                  <p style="font-size:11px;color:${MUTED};margin:0;font-weight:600;">${a.label} · ${a.time} ${isFr ? "de lecture" : "read"}</p>
                </td>
                <td style="text-align:right;vertical-align:middle;padding-left:12px;">
                  <span style="font-size:16px;color:${a.color};font-weight:900;">→</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </a>`).join("")}

    <!-- CTA FINAL -->
    <div style="height:1px;background:${BORDER};margin:24px 0;"></div>
    <div style="text-align:center;">
      <p style="font-size:16px;font-weight:800;color:${TEXT};margin:0 0 6px;letter-spacing:-0.3px;">
        ${isFr ? "Voir des séries complètes générées" : "See complete generated series"}
      </p>
      <p style="font-size:13px;color:${MUTED};margin:0 0 20px;">
        ${isFr ? "Bible + scripts + cliffhangers — prêts à tourner." : "Bible + scripts + cliffhangers — ready to shoot."}
      </p>
      ${btn(isFr ? "Voir les exemples →" : "View examples →", isFr ? `${APP_URL}/exemples` : `${APP_URL}/en/exemples`, true)}
      <p style="font-size:12px;color:${MUTED};margin:16px 0 0;">
        ${isFr
          ? `Ou <a href="${APP_URL}/tarifs" style="color:${VIO};font-weight:700;text-decoration:none;">voir les tarifs →</a>`
          : `Or <a href="${APP_URL}/en#tarifs" style="color:${VIO};font-weight:700;text-decoration:none;">see pricing →</a>`}
      </p>
    </div>

  `, lang);
}

// ── REFERRAL REWARD ─────────────────────────────────────────────────
function referralHtml(creditEuros) {
  return base("1 mois offert !", `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:52px;margin-bottom:16px;">🎁</div>
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:${TEXT};margin:0 0 12px;letter-spacing:-0.8px;text-transform:uppercase;">
        Ton filleul vient<br><span style="color:${RED};">de s'abonner !</span>
      </h1>
      <p style="font-size:15px;color:${MUTED};line-height:1.7;margin:0;">
        Un crédit de <strong style="color:${RED};">${creditEuros}€</strong> vient d'être appliqué à ton compte.<br>
        Il sera déduit automatiquement de ton prochain paiement.
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid ${BORDER};border-radius:14px;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="font-size:13px;color:${TEXT};margin:0;line-height:1.7;">
          💡 <strong>Comment ça marche :</strong><br>
          <span style="color:${MUTED};">Chaque filleul qui s'abonne avec ton code t'offre 1 mois gratuit. Sans limite.</span>
        </p>
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Voir mon code de parrainage →", `${APP_URL}/app`)}
    </div>
    <p style="font-size:12px;color:${MUTED};text-align:center;margin:12px 0 0;">
      Ton code est disponible dans l'onglet Parrainage du studio.
    </p>
  `);
}

// ── RELANCE J+3 ──────────────────────────────────────────────────────
function relanceHtml() {
  const packs = [
    { emoji: "💼", label: "CEO Froid", desc: "Patron glacial · Mariage de contrat" },
    { emoji: "🔥", label: "Vengeance", desc: "Humiliation · Retour d'identité cachée" },
    { emoji: "❤️", label: "Love & Betrayal", desc: "Triangle amoureux · Ultra TikTok" },
  ];
  return base("Ta première série t'attend", `
    <div style="text-align:center;margin-bottom:28px;">
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:${TEXT};margin:0 0 12px;letter-spacing:-0.8px;line-height:1.15;text-transform:uppercase;">
        Première série.<br><span style="color:${RED};">30 secondes.</span>
      </h1>
      <p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0;">
        Tu t'es abonné(e) récemment. En 30 secondes, tu peux avoir une bible complète et des scripts prêts à tourner.
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.02);border:1px solid ${BORDER};border-radius:14px;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${RED};margin:0 0 16px;">3 packs pour démarrer vite</p>
        ${packs.map(p => `
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:10px;">
          <tr>
            <td style="width:40px;vertical-align:middle;font-size:24px;">${p.emoji}</td>
            <td style="vertical-align:middle;padding-left:4px;">
              <p style="font-size:13px;font-weight:800;color:${TEXT};margin:0 0 2px;">${p.label}</p>
              <p style="font-size:11px;color:${MUTED};margin:0;">${p.desc}</p>
            </td>
          </tr>
        </table>`).join("")}
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Créer ma première série →", `${APP_URL}/app`)}
    </div>
  `);
}

// ── CANCEL ───────────────────────────────────────────────────────────
function cancelHtml() {
  return base("Abonnement résilié", `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="font-size:40px;margin-bottom:16px;">👋</div>
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:26px;font-weight:900;color:${TEXT};margin:0 0 12px;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.2;">
        Ton abonnement<br><span style="color:${MUTED};">a été résilié.</span>
      </h1>
      <p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0;">
        Tu gardes l'accès jusqu'à la fin de ta période payée.<br>Tes séries restent sauvegardées dans le cloud.
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid ${BORDER};border-radius:14px;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="font-size:13px;color:${TEXT};margin:0;line-height:1.7;">
          Tu peux te réabonner à tout moment et retrouver toutes tes séries exactement là où tu les avais laissées.
        </p>
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Se réabonner →", `${APP_URL}/tarifs`)}
    </div>
  `);
}

// ── WINBACK ───────────────────────────────────────────────────────────
function winbackHtml() {
  return base("Tes séries t'attendent encore", `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="font-size:48px;margin-bottom:16px;">🎬</div>
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:${TEXT};margin:0 0 12px;letter-spacing:-0.8px;text-transform:uppercase;line-height:1.15;">
        Tes séries<br><span style="color:${RED};">t'attendent encore.</span>
      </h1>
      <p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0;">
        Tu as résilié ton abonnement — mais tout ce que tu avais créé est toujours là, sauvegardé.
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.02);border:1px solid ${BORDER};border-radius:14px;margin-bottom:24px;">
      <tr><td style="padding:22px 24px;">
        <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${RED};margin:0 0 20px;">Ce que tu retrouveras en revenant</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${step("📖", "Tes bibles sauvegardées", "Toutes tes séries, univers et personnages sont là.")}
          ${step("✍️", "Scripts prêts à tourner", "Reprends exactement là où tu t'étais arrêté(e).")}
          ${step("📱", "Mode Tournage", "Téléprompteur, fond adapté, prêt en 10 secondes.")}
        </table>
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Reprendre mon studio →", `${APP_URL}/tarifs`, true)}
    </div>
    <p style="font-size:12px;color:${MUTED};text-align:center;margin:12px 0 0;">
      Reprends quand tu veux. Tes séries t'attendent.
    </p>
  `);
}

// ── RELANCE J+7 ───────────────────────────────────────────────────────
function relanceJ7Html() {
  const tips = [
    { emoji: "🎲", title: "Utilise un pack univers", desc: "1 clic → thème, casting et secret pré-remplis. 21 packs disponibles." },
    { emoji: "📖", title: "La bible en 30 secondes", desc: "Clique sur Créer la série → bible complète générée en streaming." },
    { emoji: "📱", title: "Filme directement", desc: "Mode Tournage : téléprompteur auto-scroll intégré. Tourne depuis l'écran." },
  ];
  return base("7 jours — et ta première série ?", `
    <div style="text-align:center;margin-bottom:28px;">
      <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:28px;font-weight:900;color:${TEXT};margin:0 0 12px;letter-spacing:-0.8px;text-transform:uppercase;line-height:1.15;">
        7 jours.<br><span style="color:${RED};">Toujours pas de série ?</span>
      </h1>
      <p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0;">
        Ton studio est là, prêt. Une série complète prend moins de 5 minutes — bible, épisodes, scripts inclus.
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.02);border:1px solid ${BORDER};border-radius:14px;margin-bottom:24px;">
      <tr><td style="padding:22px 24px;">
        <p style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${VIO};margin:0 0 20px;">3 astuces pour démarrer en 2 minutes</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${tips.map(t => step(t.emoji, t.title, t.desc)).join("")}
        </table>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.2);border-radius:12px;margin-bottom:24px;">
      <tr><td style="padding:16px 20px;text-align:center;">
        <p style="font-size:13px;color:rgba(200,180,255,0.9);margin:0;line-height:1.6;">
          🎯 <strong style="color:#fff;">Objectif :</strong> Une série générée en 5 min. Un épisode filmé cette semaine.
        </p>
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Générer ma première série →", `${APP_URL}/app`, true)}
    </div>
    <p style="font-size:12px;color:${MUTED};text-align:center;margin:12px 0 0;">
      Des questions ? Réponds directement à cet email — on est là.
    </p>
  `);
}
