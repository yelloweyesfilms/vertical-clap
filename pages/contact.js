import Head from "next/head";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";

const Logo = () => (
  <svg width="120" height="28" viewBox="0 0 120 28" fill="none">
    <defs>
      <linearGradient id="lg-contact" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={RED} />
        <stop offset="100%" stopColor={VIO} />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="7" fill="url(#lg-contact)" />
    <text x="14" y="20" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fontWeight="900" fill="#fff">▶</text>
    <text x="38" y="20" fontFamily="Georgia,serif" fontSize="17" fontWeight="900" fill="#f1f5f9" letterSpacing="-0.5">VerticalClap</text>
  </svg>
);

const CHANNELS = [
  {
    icon: "✉️",
    title: "Email général",
    desc: "Questions, suggestions, partenariats.",
    link: "mailto:hello@verticalclap.app",
    label: "hello@verticalclap.app",
  },
  {
    icon: "🛠️",
    title: "Support technique",
    desc: "Bug, problème d'accès, erreur de génération.",
    link: "mailto:support@verticalclap.app",
    label: "support@verticalclap.app",
  },
  {
    icon: "⚖️",
    title: "Données personnelles",
    desc: "Exercer vos droits RGPD, demande de suppression.",
    link: "mailto:hello@verticalclap.app?subject=RGPD%20—%20demande",
    label: "Envoyer une demande RGPD →",
  },
];

const FAQS = [
  {
    q: "Comment résilier mon abonnement ?",
    a: "Connecte-toi à ton espace client Stripe via le lien reçu par email, ou depuis l'app (menu → Gérer mon abonnement). La résiliation est immédiate et prend effet en fin de période payée.",
  },
  {
    q: "J'ai été débité mais je n'arrive pas à me connecter.",
    a: "Vérifie que tu utilises bien l'adresse email avec laquelle tu as souscrit. Si le problème persiste, écris-nous à support@verticalclap.app avec ton email de paiement.",
  },
  {
    q: "Puis-je changer de plan (Standard → Premium) ?",
    a: "Oui, depuis l'app (menu → Gérer mon abonnement). Le changement est proratisé automatiquement par Stripe.",
  },
  {
    q: "Les contenus générés m'appartiennent-ils ?",
    a: "Oui, intégralement. Bibles, scripts, séquenciers — tout ce que tu génères avec VerticalClap t'appartient et peut être utilisé commercialement sans restriction.",
  },
];

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — VerticalClap</title>
        <meta name="description" content="Contactez l'équipe VerticalClap pour toute question, support technique ou demande RGPD." />
      </Head>
      <div style={{ minHeight: "100vh", background: DARK, color: "#f1f5f9", fontFamily: "'Space Grotesk',system-ui,sans-serif" }}>

        {/* Nav */}
        <nav style={{ borderBottom: "1px solid #1e1e2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none" }}><Logo /></a>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="/tarifs" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>Tarifs</a>
            <a href="/app" style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", background: RED, padding: "7px 18px", borderRadius: 8, textDecoration: "none" }}>Studio →</a>
          </div>
        </nav>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" }}>

          {/* Header */}
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: RED }}>Support</span>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 42, fontWeight: 900, color: "#f1f5f9", margin: "10px 0 16px", letterSpacing: -1, lineHeight: 1.1 }}>
              On est là.
            </h1>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
              Une question, un bug, une idée — on répond en général sous 24h (jours ouvrés).
            </p>
          </div>

          {/* Channels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 64 }}>
            {CHANNELS.map((c) => (
              <a
                key={c.title}
                href={c.link}
                style={{ textDecoration: "none", display: "block", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 16, padding: "24px 22px", transition: "border-color .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = RED}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e2e"}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px" }}>{c.title}</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 14px", lineHeight: 1.6 }}>{c.desc}</p>
                <span style={{ fontSize: 13, color: RED, fontWeight: 600 }}>{c.label}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #1e1e2e", marginBottom: 56 }} />

          {/* FAQ */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 900, color: "#f1f5f9", margin: "0 0 32px", letterSpacing: -0.5 }}>
              Questions fréquentes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {FAQS.map((faq) => (
                <div key={faq.q} style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 14, padding: "22px 24px" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px" }}>{faq.q}</p>
                  <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA bottom */}
          <div style={{ marginTop: 64, background: "linear-gradient(135deg,#1a0a06,#120a1f)", border: "1px solid #2a1a2e", borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: VIO, margin: "0 0 10px" }}>Pas encore abonné ?</p>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 900, color: "#f1f5f9", margin: "0 0 12px", letterSpacing: -0.5 }}>
              Première série en 5 minutes.
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 24px" }}>Bible · Episodes · Scripts prêts à tourner.</p>
            <a href="/tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg,${RED},${VIO})`, color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
              Voir les tarifs →
            </a>
          </div>

        </div>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
            © 2026 VerticalClap ·{" "}
            <a href="/cgu" style={{ color: "#475569", textDecoration: "none" }}>CGU</a>
            {" "}·{" "}
            <a href="/confidentialite" style={{ color: "#475569", textDecoration: "none" }}>Confidentialité</a>
          </p>
        </footer>

        <style>{`
          @media (max-width: 600px) {
            h1 { font-size: 32px !important; }
          }
        `}</style>
      </div>
    </>
  );
}
