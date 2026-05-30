import { useRouter } from "next/router";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const MUTED = "#64748b";
const TEXT = "#f1f5f9";
const BORDER = "rgba(255,255,255,0.08)";
const SURFACE = "rgba(255,255,255,0.04)";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, userSelect: "none" }}>
    <img src="/1024.webp" alt="VC" style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

export default function NotFound() {
  const router = useRouter();
  const isEn = router.asPath?.startsWith("/en");

  const home = isEn ? "/en" : "/";
  const examples = isEn ? "/en/exemples" : "/exemples";
  const pricing = isEn ? "/en/tarifs" : "/tarifs";

  return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "'Space Grotesk', system-ui, sans-serif", color: TEXT }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a:hover { opacity: 0.85; }
      `}</style>

      <div style={{ textAlign: "center", maxWidth: 480, position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: `radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 65%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <Logo />
          </div>

          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(80px, 20vw, 140px)", fontWeight: 900, lineHeight: 1, marginBottom: 8, background: `linear-gradient(135deg, ${RED} 30%, ${VIO})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            404
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900, color: TEXT, marginBottom: 16, letterSpacing: -0.5 }}>
            {isEn ? "Page not found" : "Cette page n'existe pas"}
          </h1>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, marginBottom: 40 }}>
            {isEn
              ? <>The link may be broken or the page has moved.<br />Go back to the studio to keep creating.</>
              : <>Le lien est peut-être cassé ou la page a été déplacée.<br />Retourne au studio pour continuer à créer.</>}
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={home} style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: `0 0 24px rgba(168,85,247,0.25)` }}>
              {isEn ? "Home →" : "Accueil →"}
            </a>
            <a href="/app" style={{ display: "inline-block", background: SURFACE, color: MUTED, textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, border: `1px solid ${BORDER}`, fontFamily: "'Space Grotesk', sans-serif" }}>
              {isEn ? "My studio" : "Mon studio"}
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { href: examples, label: isEn ? "Series examples" : "Exemples de séries" },
              { href: pricing, label: isEn ? "Pricing" : "Tarifs" },
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
