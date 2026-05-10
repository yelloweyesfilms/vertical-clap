import { Resend } from "resend";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = "Studio Vertical <hello@studiovertical.app>";
const APP_URL = "https://studiovertical.app";
const RED = "#E85C3A";

export async function sendWelcomeEmail({ email, plan }) {
  const resend = getResend();
  if (!resend || !email) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Bienvenue sur Studio Vertical — ${plan === "premium" ? "Premium 🎭" : "Standard ⚡"}`,
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
      subject: "Ton abonnement Studio Vertical a été résilié",
      html: cancelHtml(),
    });
  } catch (e) {
    console.error("[email] cancel:", e.message);
  }
}

// ── TEMPLATES ──────────────────────────────────────────────────────────────

function base(title, body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#F2EDE6;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EDE6;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0F1A12;padding:24px 32px;text-align:center;">
            <span style="font-family:Georgia,serif;font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.5px;">
              STUDIO <span style="color:${RED};">VERTICAL</span>
            </span>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:32px 32px 24px;">${body}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F2EDE6;padding:20px 32px;text-align:center;border-top:1px solid #E8E4DC;">
            <p style="font-size:12px;color:#8A8880;margin:0;">
              © 2026 Studio Vertical ·
              <a href="${APP_URL}/confidentialite" style="color:#8A8880;">Confidentialité</a> ·
              <a href="${APP_URL}/cgu" style="color:#8A8880;">CGU</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function btn(text, url) {
  return `<a href="${url}" style="display:inline-block;background:${RED};color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:700;margin:24px 0;">${text}</a>`;
}

function welcomeHtml(plan) {
  const isPremium = plan === "premium";
  const features = isPremium
    ? ["⚡ Fast Drama + 🎭 Premium Suspense", "Jusqu'à 40 épisodes par série", "4 variations de script par épisode", "Titres viraux avec score de viralité", "Traduction en 6 langues", "Sauvegarde cloud + Export PDF"]
    : ["⚡ Fast Drama", "10 épisodes par série", "Scripts 1 à 2 min prêts à tourner", "Mode Tournage + Téléprompteur", "Traduction en 6 langues", "Sauvegarde cloud + Export PDF"];
  const badge = isPremium
    ? `<span style="background:#1a2e22;color:#4ade80;font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:1px;">🎭 PREMIUM</span>`
    : `<span style="background:#fff0ec;color:${RED};font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:1px;">⚡ STANDARD</span>`;

  return base("Bienvenue sur Studio Vertical", `
    <div style="text-align:center;margin-bottom:28px;">
      ${badge}
    </div>
    <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:900;color:#0F1A12;margin:0 0 12px;text-align:center;letter-spacing:-0.5px;">
      Ton studio est prêt. 🎬
    </h1>
    <p style="font-size:15px;color:#6B6B68;line-height:1.7;margin:0 0 24px;text-align:center;">
      Bienvenue ! Génère ta première série verticale en moins de 5 minutes — bible, épisodes, scripts, tout y est.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F7F4;border-radius:12px;padding:20px;margin-bottom:24px;">
      <tr><td>
        <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8A8880;margin:0 0 14px;">Ton plan inclut</p>
        ${features.map(f => `<p style="font-size:14px;color:#0F1A12;margin:0 0 10px;display:flex;align-items:center;gap:8px;">✓ &nbsp;${f}</p>`).join("")}
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Ouvrir mon studio →", `${APP_URL}/app`)}
    </div>
    <p style="font-size:13px;color:#8A8880;text-align:center;margin:8px 0 0;">
      Tu peux annuler à tout moment depuis ton espace Stripe.
    </p>
    <div style="margin-top:28px;padding:20px;background:#0F1A12;border-radius:12px;">
      <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${RED};margin:0 0 12px;">Comment commencer</p>
      ${[
        ["🎲", "Le Mixeur", "Choisis ton univers, casting et secret central — ou utilise un pack en 1 clic."],
        ["📖", "La Bible", "La série se génère en streaming : titre, logline, personnages en quelques secondes."],
        ["📝", "Les Scripts", "Ouvre un épisode → génère le script en 10s. Hook, dialogues, directions 9:16."],
        ["📱", "Mode Tournage", "Téléprompteur auto-scroll, fond clair/sombre, vitesse réglable. Prêt à filmer."],
      ].map(([icon, t, d]) => `
        <div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start;">
          <span style="font-size:18px;flex-shrink:0;">${icon}</span>
          <div>
            <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 3px;">${t}</p>
            <p style="font-size:12px;color:#6a7a6e;margin:0;line-height:1.5;">${d}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `);
}

function referralHtml(creditEuros) {
  return base("1 mois offert !", `
    <div style="text-align:center;margin-bottom:28px;">
      <div style="font-size:48px;margin-bottom:12px;">🎁</div>
      <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:900;color:#0F1A12;margin:0 0 12px;letter-spacing:-0.5px;">
        Ton filleul vient de s'abonner !
      </h1>
      <p style="font-size:15px;color:#6B6B68;line-height:1.7;margin:0;">
        Un crédit de <strong style="color:${RED};">${creditEuros}€</strong> vient d'être appliqué à ton compte.<br>
        Il sera déduit automatiquement de ton prochain paiement.
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F7F4;border-radius:12px;padding:20px;margin-bottom:24px;">
      <tr><td>
        <p style="font-size:13px;color:#0F1A12;margin:0;line-height:1.7;">
          💡 <strong>Comment ça marche :</strong> Chaque filleul qui s'abonne avec ton code t'offre 1 mois d'abonnement gratuit. Sans limite.
        </p>
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Partager mon code →", `${APP_URL}/app`)}
    </div>
    <p style="font-size:13px;color:#8A8880;text-align:center;margin:12px 0 0;">
      Ton code de parrainage est disponible dans l'onglet 🎁 du studio.
    </p>
  `);
}

function cancelHtml() {
  return base("Abonnement résilié", `
    <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:900;color:#0F1A12;margin:0 0 12px;text-align:center;letter-spacing:-0.5px;">
      Ton abonnement a été résilié
    </h1>
    <p style="font-size:15px;color:#6B6B68;line-height:1.7;margin:0 0 24px;text-align:center;">
      Tu gardes l'accès jusqu'à la fin de ta période payée. Tes séries restent sauvegardées dans le cloud.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F7F4;border-radius:12px;padding:20px;margin-bottom:24px;">
      <tr><td>
        <p style="font-size:13px;color:#0F1A12;margin:0;line-height:1.7;">
          Tu peux te réabonner à tout moment et retrouver toutes tes séries exactement là où tu les avais laissées.
        </p>
      </td></tr>
    </table>
    <div style="text-align:center;">
      ${btn("Se réabonner →", `${APP_URL}/#pricing`)}
    </div>
    <p style="font-size:13px;color:#8A8880;text-align:center;margin:12px 0 0;">
      Une question ? Réponds à cet email, on est là.
    </p>
  `);
}
