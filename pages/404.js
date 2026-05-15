const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const MUTED = "#64748b";
const TEXT = "#f1f5f9";
const BORDER = "rgba(255,255,255,0.08)";
const SURFACE = "rgba(255,255,255,0.04)";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, userSelect: "none", justifyContent: "center", marginBottom: 40 }}>
      <svg width="26" height="37" viewBox="0 0 26 37" fill="none">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="26" y2="37" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E85C3A" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <clipPath id="logo-clip">
            <rect x="0.5" y="0.5" width="25" height="36" rx="5.5" />
          </clipPath>
        </defs>
        <rect x="0.5" y="0.5" width="25" height="36" rx="5.5" fill="url(#logo-grad)" />
        <rect x="0.5" y="0.5" width="25" height="36" rx="5.5" stroke="rgba(255,255,255,0.18)" />
        <rect x="4" y="4" width="18" height="29" rx="3" fill="rgba(0,0,0,0.22)" />
        <polygon points="10,13 10,24 20,18.5" fill="white" />
        <rect x="4" y="31" width="6" height="1.5" rx="0.75" fill="rgba(255,255,255,0.4)" />
        <rect x="12" y="31" width="10" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)" />
        <polygon points="0.5,0.5 25.5,0.5 25.5,12 0.5,20" fill="rgba(255,255,255,0.13)" clipPath="url(#logo-clip)" />
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginBottom: 2 }}>Studio</div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 900, letterSpacing: -0.5, color: TEXT, lineHeight: 1 }}>Vertical</div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "'Space Grotesk', system-ui, sans-serif", color: TEXT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Playfair+Display:wght@900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a:hover { opacity: 0.85; }
      `}</style>

      <div style={{ textAlign: "center", maxWidth: 480, position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: `radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 65%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <Logo />

          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(80px, 20vw, 140px)", fontWeight: 900, lineHeight: 1, marginBottom: 8, background: `linear-gradient(135deg, ${RED} 30%, ${VIO})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            404
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900, color: TEXT, marginBottom: 16, letterSpacing: -0.5 }}>
            Cette page n'existe pas
          </h1>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, marginBottom: 40 }}>
            Le lien est peut-être cassé ou la page a été déplacée.<br />
            Retourne au studio pour continuer à créer.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: `0 0 24px rgba(168,85,247,0.25)` }}>
              Accueil →
            </a>
            <a href="/app" style={{ display: "inline-block", background: SURFACE, color: MUTED, textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, border: `1px solid ${BORDER}`, fontFamily: "'Space Grotesk', sans-serif" }}>
              Mon studio
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { href: "/exemples", label: "Exemples de séries" },
              { href: "/tarifs", label: "Tarifs" },
              { href: "/parrainage", label: "Parrainage" },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ fontSize: 13, color: MUTED, textDecoration: "none", fontWeight: 500 }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
