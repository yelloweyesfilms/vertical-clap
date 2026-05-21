import { useState } from "react";
import { useRouter } from "next/router";
import { CONTENT } from "../lib/content";

const LOGO = (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    {/* Fond arrondi */}
    <rect width="32" height="32" rx="8" fill="#E85C3A"/>
    {/* Corps du clapperboard — format vertical 9:16 */}
    <rect x="9" y="14" width="14" height="13" rx="2" fill="white"/>
    {/* Barre du haut avec stries */}
    <rect x="9" y="10" width="14" height="5" rx="1.5" fill="white"/>
    {/* Stries noires diagonales */}
    <line x1="11" y1="10" x2="13.5" y2="15" stroke="#E85C3A" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="15" y1="10" x2="17.5" y2="15" stroke="#E85C3A" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="19" y1="10" x2="21" y2="15" stroke="#E85C3A" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Charnière gauche */}
    <circle cx="10" cy="10" r="1.2" fill="#c0392b"/>
    {/* Lignes de script dans le corps */}
    <line x1="12" y1="18" x2="20" y2="18" stroke="#E85C3A" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <line x1="12" y1="21" x2="17" y2="21" stroke="#E85C3A" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

export default function LandingPage({ lang = "en" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const canceled = router.query.canceled;
  const c = CONTENT[lang];

  const startCheckout = async (plan = "standard") => {
    if (!email) { alert(lang === "fr" ? "Entre ton email pour continuer" : "Enter your email to continue"); return; }
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, plan }),
    });
    const { url, error } = await res.json();
    if (error) { alert(error); setLoading(false); return; }
    window.location.href = url;
  };

  const otherLang = lang === "en" ? "fr" : "en";
  const otherHref = lang === "en" ? "/fr" : "/";

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A08", color: "#fff", fontFamily: "var(--sans)" }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        .cta-btn{background:#E85C3A;color:#fff;border:none;padding:18px 36px;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;font-family:var(--sans);transition:all .2s;text-decoration:none;display:inline-block;}
        .cta-btn:hover{opacity:.88;transform:translateY(-1px);}
        .ghost-btn{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.25);padding:17px 32px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--sans);transition:all .2s;text-decoration:none;display:inline-block;}
        .ghost-btn:hover{border-color:rgba(255,255,255,.6);}
        .lang-btn{background:none;border:none;cursor:pointer;font-family:var(--sans);font-size:13px;font-weight:700;letter-spacing:.5px;padding:6px 10px;border-radius:6px;transition:all .15s;}
        input::placeholder{color:#555;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", background: "rgba(10,10,8,.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 900, display: "flex", alignItems: "center", gap: 8 }}>
          {LOGO} VerticalClap
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {/* Lang switcher */}
          <div style={{ display: "flex", background: "#111", borderRadius: 8, padding: 3, marginRight: 6 }}>
            <button className="lang-btn" style={{ color: lang === "en" ? "#fff" : "#555", background: lang === "en" ? "#1e1e1e" : "none" }} onClick={() => router.push("/")}>EN</button>
            <button className="lang-btn" style={{ color: lang === "fr" ? "#fff" : "#555", background: lang === "fr" ? "#1e1e1e" : "none" }} onClick={() => router.push("/fr")}>FR</button>
          </div>
          <a href="/app" className="ghost-btn" style={{ padding: "8px 16px", fontSize: 13 }}>{c.nav.login}</a>
          <a href="#tarifs" className="cta-btn" style={{ padding: "8px 18px", fontSize: 13 }}>{c.nav.cta}</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(232,92,58,.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E85C3A", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#E85C3A", letterSpacing: 2, textTransform: "uppercase" }}>{c.hero.badge}</span>
        </div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: -3, marginBottom: 28, maxWidth: 900 }}>
          {c.hero.h1_1}<br />{c.hero.h1_2}<br /><span style={{ color: "#E85C3A" }}>{c.hero.h1_3}</span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,.55)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.65 }}>{c.hero.sub}</p>
        {canceled && <p style={{ color: "#E85C3A", marginBottom: 20, fontSize: 14 }}>{lang === "fr" ? "Paiement annulé. Réessaie quand tu veux." : "Payment canceled. Try again whenever you're ready."}</p>}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <a href="/exemples" className="cta-btn">{c.hero.cta1}</a>
          <a href="#tarifs" className="ghost-btn">{c.hero.cta2}</a>
        </div>
        <p style={{ color: "rgba(255,255,255,.22)", fontSize: 13 }}>{c.hero.disclaimer}</p>

        {/* Script preview */}
        <div style={{ marginTop: 72, maxWidth: 340, width: "100%", background: "#111", borderRadius: 32, border: "6px solid #1e1e1e", padding: "24px 16px", boxShadow: "0 60px 100px rgba(0,0,0,.8)" }}>
          <div style={{ width: 60, height: 5, background: "#1e1e1e", borderRadius: 10, margin: "0 auto 18px" }} />
          {[
            { t: "lbl", v: lang === "fr" ? "⚡ HOOK — 3 PREMIÈRES SECONDES" : "⚡ HOOK — FIRST 3 SECONDS" },
            { t: "txt", v: lang === "fr" ? "Si tu regardes ça... c'est que j'ai pas tout dit." : "If you're watching this… I didn't tell you everything." },
            { t: "stg", v: lang === "fr" ? "[9:16] Gros plan — tremblements de lèvres" : "[9:16] Close-up — lips trembling" },
            { t: "nm", v: "LINH" },
            { t: "txt", v: lang === "fr" ? "J'ai signé les papiers ce matin." : "I signed the papers this morning." },
            { t: "nm", v: "ALEX" },
            { t: "txt", v: lang === "fr" ? "Sans me le dire ?" : "Without telling me?" },
            { t: "lbl", v: "🎬 CLIFFHANGER" },
            { t: "hi", v: lang === "fr" ? "ÉP. 2 : LA VÉRITÉ" : "EP. 2 : THE TRUTH" },
          ].map((l, i) => (
            <p key={i} style={{
              fontSize: l.t === "lbl" ? 9 : l.t === "nm" ? 10 : l.t === "stg" ? 10 : 13,
              fontWeight: l.t === "nm" || l.t === "lbl" || l.t === "hi" ? 800 : 500,
              color: l.t === "lbl" ? "#E85C3A" : l.t === "stg" ? "#333" : l.t === "nm" ? "#E85C3A" : l.t === "hi" ? "#fff" : "#e0e0e0",
              marginBottom: 7, letterSpacing: l.t === "lbl" ? 1.5 : 0,
              textTransform: l.t === "lbl" || l.t === "nm" ? "uppercase" : "none",
              background: l.t === "hi" ? "#E85C3A" : "transparent",
              display: l.t === "hi" ? "inline-block" : "block",
              padding: l.t === "hi" ? "4px 10px" : 0,
              borderRadius: l.t === "hi" ? 6 : 0,
              lineHeight: 1.5,
            }}>{l.v}</p>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section style={{ padding: "100px 24px", background: "#0D0D0B" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>{c.demo.badge}</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 60, lineHeight: 1.1 }}>
            {c.demo.h2_1}<br />{c.demo.h2_2}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, alignItems: "center" }}>
            <div style={{ background: "#161614", border: "1.5px solid #252522", borderRadius: 20, padding: 28, textAlign: "left" }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 14 }}>{c.demo.input_label}</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.8)", fontStyle: "italic" }}>{c.demo.input_text}</p>
              <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {c.demo.tags.map(t => <span key={t} style={{ fontSize: 11, background: "#222", color: "#666", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{t}</span>)}
              </div>
            </div>
            <div style={{ padding: "0 20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, color: "#E85C3A", fontWeight: 900 }}>→</div>
              <p style={{ fontSize: 10, color: "#444", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginTop: 6 }}>{c.demo.arrow_label}</p>
            </div>
            <div style={{ background: "#161614", border: "1.5px solid #E85C3A", borderRadius: 20, padding: 28, textAlign: "left" }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 14 }}>{c.demo.output_label}</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 900, marginBottom: 6 }}>{c.demo.output_title}</p>
              <p style={{ fontSize: 13, color: "#888", fontStyle: "italic", marginBottom: 16, lineHeight: 1.5 }}>{c.demo.output_logline}</p>
              {c.demo.output_items.map(t => <p key={t} style={{ fontSize: 12, color: "#bbb", marginBottom: 4 }}>{t}</p>)}
            </div>
          </div>
          <div style={{ marginTop: 48 }}>
            <a href="#tarifs" className="cta-btn">{c.demo.cta}</a>
          </div>
        </div>
      </section>

      {/* MARCHÉ */}
      <section style={{ padding: "100px 24px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>{c.market.badge}</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1 }}>
              {c.market.h2_1}<br />{c.market.h2_2}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
            {c.market.stats.map((s, i) => (
              <div key={i} style={{ background: "#111", borderRadius: 16, padding: 24, borderTop: "2px solid #E85C3A" }}>
                <p style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</p>
                <p style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 900, color: "#E85C3A", lineHeight: 1, marginBottom: 8 }}>{s.stat}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#111", borderRadius: 20, padding: "28px 32px", borderLeft: "4px solid #E85C3A" }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,.7)", fontStyle: "italic" }}>{c.market.quote}</p>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section style={{ padding: "100px 24px", background: "#0D0D0B" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>{c.pipeline.badge}</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1 }}>
              {c.pipeline.h2_1}<br />{c.pipeline.h2_2}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }}>
            {c.pipeline.steps.map((f, i) => (
              <div key={i} style={{ minWidth: 240, background: "#161614", border: `1.5px solid ${f.color}22`, borderTop: `3px solid ${f.color}`, borderRadius: 16, padding: 24, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: f.color, letterSpacing: 1 }}>{f.step}</span>
                </div>
                <p style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: "100px 24px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>{c.social.badge}</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.15, marginBottom: 12 }}>
            {c.social.h2_1}<br />{c.social.h2_2}
          </h2>
          <p style={{ fontSize: 13, color: "#555", marginBottom: 52 }}>{c.social.disclaimer}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {c.social.results.map((r, i) => (
              <div key={i} style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: 24, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>{r.handle}</p>
                    <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{r.serie}</p>
                  </div>
                  <span style={{ fontSize: 22 }}>{r.emoji}</span>
                </div>
                <p style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, color: "#E85C3A", marginBottom: 6 }}>{r.stat}</p>
                <p style={{ fontSize: 12, color: "#555" }}>{r.ep}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <section style={{ padding: "100px 24px", background: "#0D0D0B" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 24 }}>🎬</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.2, marginBottom: 20, whiteSpace: "pre-line" }}>{c.authors.h2}</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: 24 }}>{c.authors.p1}</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.22)", lineHeight: 1.6 }}>{c.authors.p2}</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" style={{ padding: "100px 24px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>{c.pricing.badge}</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 12 }}>{c.pricing.h2}</h2>
          <p style={{ color: "#555", marginBottom: 36, fontSize: 15 }}>{c.pricing.sub}</p>
          <input type="email" placeholder={c.pricing.placeholder} value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", maxWidth: 380, padding: "16px 20px", borderRadius: 12, border: "1.5px solid #252522", background: "#111", color: "#fff", fontSize: 15, marginBottom: 28, outline: "none", display: "block", margin: "0 auto 28px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {c.pricing.plans.map((plan, i) => (
              <div key={i} style={{ background: "#111", border: plan.highlighted ? "2px solid #E85C3A" : "1.5px solid #1e1e1e", borderRadius: 24, padding: "36px 32px", textAlign: "left", position: "relative" }}>
                {plan.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#E85C3A", color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: 1, whiteSpace: "nowrap" }}>{plan.badge}</div>}
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: plan.highlighted ? "#E85C3A" : "#666", textTransform: "uppercase", marginBottom: 8 }}>{plan.name}</p>
                <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 900, color: plan.highlighted ? "#E85C3A" : "#fff", lineHeight: 1 }}>{plan.price}</div>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 28, marginTop: 4 }}>{plan.period}</p>
                <div style={{ marginBottom: 28 }}>
                  {plan.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ color: "#E85C3A", fontSize: 14 }}>✓</span>
                      <span style={{ color: plan.highlighted ? "#ddd" : "#888", fontSize: 14 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => startCheckout(plan.highlighted ? "premium" : "standard")} disabled={loading}
                  style={{ width: "100%", padding: 16, borderRadius: 12, border: plan.highlighted ? "none" : "1.5px solid rgba(255,255,255,.2)", background: plan.highlighted ? "#E85C3A" : "transparent", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", transition: "all .2s" }}>
                  {loading ? "…" : plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p style={{ color: "#333", fontSize: 12, marginTop: 24 }}>{c.pricing.secure}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060604", borderTop: "1px solid #111", padding: "28px 40px", textAlign: "center", color: "#333", fontSize: 13 }}>
        <p>
          {c.footer.copy}
          {c.footer.links.map((l, i) => (
            <span key={i}> · <a href={l.href} style={{ color: "#444" }}>{l.label}</a></span>
          ))}
          <span> · <a href={otherHref} style={{ color: "#E85C3A", fontWeight: 700 }}>{otherLang.toUpperCase()}</a></span>
        </p>
      </footer>
    </div>
  );
}
