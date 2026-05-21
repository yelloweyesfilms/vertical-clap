import { useState } from "react";
import { useRouter } from "next/router";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const canceled = router.query.canceled;

  const startCheckout = async (plan = "standard") => {
    if (!email) { alert("Entre ton email pour continuer"); return; }
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

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A08", color: "#fff", fontFamily: "var(--sans)" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scroll { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
        .cta-btn { background:#E85C3A; color:#fff; border:none; padding:18px 36px; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; font-family:var(--sans); transition:all .2s; text-decoration:none; display:inline-block; }
        .cta-btn:hover { opacity:.88; transform:translateY(-1px); }
        .ghost-btn { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.25); padding:17px 32px; border-radius:12px; font-size:15px; font-weight:600; cursor:pointer; font-family:var(--sans); transition:all .2s; text-decoration:none; display:inline-block; }
        .ghost-btn:hover { border-color:rgba(255,255,255,.6); }
        input::placeholder { color:#555; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", background: "rgba(10,10,8,.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 900, letterSpacing: -0.3, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="7" fill="#E85C3A"/><rect x="6" y="14" width="18" height="11" rx="2" fill="white"/><rect x="6" y="10" width="18" height="5" rx="1" fill="white" opacity="0.9"/><line x1="10" y1="10" x2="8" y2="15" stroke="#E85C3A" strokeWidth="1.5"/><line x1="15" y1="10" x2="13" y2="15" stroke="#E85C3A" strokeWidth="1.5"/><line x1="20" y1="10" x2="18" y2="15" stroke="#E85C3A" strokeWidth="1.5"/><polygon points="13,17 13,23 20,20" fill="#E85C3A"/></svg>
          VERTICAL STUDIO
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="/app" className="ghost-btn" style={{ padding: "10px 18px", fontSize: 13 }}>Se connecter</a>
          <a href="#tarifs" className="cta-btn" style={{ padding: "10px 20px", fontSize: 13 }}>Créer ma série →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(232,92,58,.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, opacity: .9 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E85C3A", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#E85C3A", letterSpacing: 2, textTransform: "uppercase" }}>Studio IA · Micro-dramas · 9:16</span>
        </div>

        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: -3, marginBottom: 28, maxWidth: 900 }}>
          Des séries<br />impossibles à<br /><span style={{ color: "#E85C3A" }}>scroller.</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,.55)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.65 }}>
          Génère des micro-dramas verticaux avec bible, scripts et cliffhangers — prêts à tourner en moins de 30 secondes.
        </p>

        {canceled && <p style={{ color: "#E85C3A", marginBottom: 20, fontSize: 14 }}>Paiement annulé. Réessaie quand tu veux.</p>}

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <a href="/exemples" className="cta-btn">Voir un exemple →</a>
          <a href="#tarifs" className="ghost-btn">Créer ma série</a>
        </div>
        <p style={{ color: "rgba(255,255,255,.25)", fontSize: 13 }}>9€/mois · Sans engagement · Annulable à tout moment</p>

        {/* Animated script preview */}
        <div style={{ marginTop: 72, maxWidth: 340, width: "100%", background: "#111", borderRadius: 32, border: "6px solid #1e1e1e", padding: "24px 16px", boxShadow: "0 60px 100px rgba(0,0,0,.8)", position: "relative" }}>
          <div style={{ width: 60, height: 5, background: "#1e1e1e", borderRadius: 10, margin: "0 auto 18px" }} />
          {[
            { t: "lbl", v: "⚡ HOOK — 3 PREMIÈRES SECONDES", c: "#E85C3A" },
            { t: "txt", v: "Si tu regardes ça... c'est que j'ai pas tout dit." },
            { t: "stg", v: "[9:16] Gros plan — tremblements de lèvres" },
            { t: "nm", v: "LINH" },
            { t: "txt", v: "J'ai signé les papiers ce matin." },
            { t: "nm", v: "ALEX" },
            { t: "txt", v: "Sans me le dire ?" },
            { t: "lbl", v: "🎬 CLIFFHANGER", c: "#E85C3A" },
            { t: "hi", v: "ÉP. 2 : LA VÉRITÉ" },
          ].map((l, i) => (
            <p key={i} style={{
              fontSize: l.t === "lbl" ? 9 : l.t === "nm" ? 10 : l.t === "stg" ? 10 : 13,
              fontWeight: l.t === "nm" || l.t === "lbl" || l.t === "hi" ? 800 : 500,
              color: l.c || (l.t === "stg" ? "#333" : l.t === "nm" ? "#E85C3A" : l.t === "hi" ? "#fff" : "#e0e0e0"),
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

      {/* DEMO : INPUT → OUTPUT */}
      <section style={{ padding: "100px 24px", background: "#0D0D0B" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>Comment ça marche</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 60, lineHeight: 1.1 }}>
            Une idée.<br />Une série complète.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, alignItems: "center" }}>
            {/* INPUT */}
            <div style={{ background: "#161614", border: "1.5px solid #252522", borderRadius: 20, padding: 28, textAlign: "left" }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 14 }}>Ton idée</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.8)", fontStyle: "italic" }}>
                "Une fille découvre que son petit ami est fiancé à sa mère."
              </p>
              <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Fast Drama", "10 épisodes", "1 min 30"].map(t => (
                  <span key={t} style={{ fontSize: 11, background: "#222", color: "#666", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* ARROW */}
            <div style={{ padding: "0 20px", textAlign: "center" }}>
              <div style={{ fontSize: 28, color: "#E85C3A", fontWeight: 900, lineHeight: 1 }}>→</div>
              <p style={{ fontSize: 10, color: "#444", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginTop: 6 }}>28s</p>
            </div>

            {/* OUTPUT */}
            <div style={{ background: "#161614", border: "1.5px solid #E85C3A", borderRadius: 20, padding: 28, textAlign: "left" }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 14 }}>Ta série</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 900, marginBottom: 6 }}>Mère Rivale</p>
              <p style={{ fontSize: 13, color: "#888", fontStyle: "italic", marginBottom: 16, lineHeight: 1.5 }}>« Elle aimait sa mère. Elle aimait son homme. Les deux venaient de fusionner. »</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["✓  Bible complète — 2 personnages, tension centrale", "✓  10 épisodes séquencés + cliffhangers", "✓  Scripts prêts à tourner — format 9:16", "✓  Mode Tournage + Téléprompteur"].map(t => (
                  <p key={t} style={{ fontSize: 12, color: "#bbb" }}>{t}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <a href="#tarifs" className="cta-btn">Générer ma première série →</a>
          </div>
        </div>
      </section>

      {/* MARCHÉ */}
      <section style={{ padding: "100px 24px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>Pourquoi maintenant</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1 }}>
              Les micro-dramas sont<br />la prochaine vague.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
            {[
              { stat: "500M+", label: "téléchargements de ReelShort en 2 ans", icon: "📱" },
              { stat: "94%", label: "de watch time jusqu'à la fin sur les micro-dramas", icon: "👁" },
              { stat: "3×", label: "plus d'engagement qu'un format long", icon: "⚡" },
              { stat: "2026", label: "explosion du marché européen estimée", icon: "🌍" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#111", borderRadius: 16, padding: 24, borderTop: "2px solid #E85C3A" }}>
                <p style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</p>
                <p style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 900, color: "#E85C3A", lineHeight: 1, marginBottom: 8 }}>{s.stat}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#111", borderRadius: 20, padding: "28px 32px", borderLeft: "4px solid #E85C3A" }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,.75)", fontStyle: "italic" }}>
              "DramaBox et ReelShort génèrent chacun plus de 100M$/an. Le marché français n'a pas encore son studio vertical. Vertical Studio est là pour ça."
            </p>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section style={{ padding: "100px 24px", background: "#0D0D0B" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>Le pipeline</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1 }}>
              Du concept au tournage.<br />Tout. Automatiquement.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }}>
            {[
              { step: "01", icon: "🎲", title: "Le Mixeur", desc: "Casting, univers, secret central. 8 packs thématiques prêts en 1 clic. Tu cadres — l'IA crée.", color: "#E85C3A" },
              { step: "02", icon: "📖", title: "La Bible Express", desc: "Personnages, tensions, logline, séquencier complet. De l'idée floue à la structure en 10 secondes.", color: "#4a8a5a" },
              { step: "03", icon: "🎬", title: "Scripts 9:16", desc: "Chaque épisode : hook choc, dialogues millimétrés, directives de cadrage vertical. Prêt à tourner.", color: "#E85C3A" },
              { step: "04", icon: "🎲", title: "3 Variations", desc: "Intense, subtil, rapide — 3 versions de chaque script générées en parallèle. Tu choisis la meilleure.", color: "#4a8a5a" },
              { step: "05", icon: "📱", title: "Mode Tournage", desc: "Téléprompteur auto-scroll, taille et vitesse réglables. Pose ton téléphone. Tu tournes.", color: "#E85C3A" },
            ].map((f, i) => (
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

      {/* PREUVE SOCIALE */}
      <section style={{ padding: "100px 24px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>Résultats des créateurs</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.15, marginBottom: 12 }}>
            Les séries créées avec<br />Vertical Studio performent.
          </h2>
          <p style={{ fontSize: 13, color: "#555", marginBottom: 52 }}>Données issues de créateurs bêta. Résultats variables selon audience et niche.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { handle: "@leo_fiction", serie: "Héritage Maudit", stat: "2.1k commentaires", ep: "Ép. 1 — 94% de watch time", emoji: "🔥" },
              { handle: "@drama_mobile", serie: "Le Contrat", stat: "38k vues en 48h", ep: "Ép. 3 — partagé 800 fois", emoji: "⚡" },
              { handle: "@seriemobile_fr", serie: "Double Vie", stat: "4.7k sauvegardes", ep: "Ép. 2 — 89% de rétention", emoji: "🎬" },
            ].map((r, i) => (
              <div key={i} style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: 24, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.handle}</p>
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

      {/* AUTEURS */}
      <section style={{ padding: "100px 24px", background: "#0D0D0B" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 24 }}>🎬</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.2, marginBottom: 20 }}>
            Conçu par des auteurs<br />et réalisateurs.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: 36 }}>
            Vertical Studio n'a pas été construit par des développeurs qui lisent des threads sur le micro-drama. Il a été construit par des gens qui connaissent la narration, la mise en scène et les mécaniques d'addiction du format vertical.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.25)", lineHeight: 1.6 }}>
            Chaque prompt, chaque structure de script, chaque cliffhanger — pensé pour performer sur TikTok, Reels, Shorts.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" style={{ padding: "100px 24px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 16 }}>Tarifs</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: -1.5, marginBottom: 12 }}>Créer ma série</h2>
          <p style={{ color: "#555", marginBottom: 36, fontSize: 15 }}>Annulable à tout moment · Sans engagement</p>

          <input type="email" placeholder="ton@email.com" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", maxWidth: 380, padding: "16px 20px", borderRadius: 12, border: "1.5px solid #252522", background: "#111", color: "#fff", fontSize: 15, marginBottom: 28, outline: "none", display: "block", margin: "0 auto 28px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {/* Standard */}
            <div style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 24, padding: "36px 32px", textAlign: "left" }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 8 }}>Standard</p>
              <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1 }}>9€</div>
              <p style={{ color: "#555", fontSize: 14, marginBottom: 28, marginTop: 4 }}>/mois</p>
              <div style={{ marginBottom: 28 }}>
                {["⚡ Fast Drama", "10 épisodes max", "Scripts 1min – 2min", "Mode Tournage + Téléprompteur", "Export PDF", "Sauvegardes illimitées"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: "#E85C3A", fontSize: 14 }}>✓</span>
                    <span style={{ color: "#888", fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="ghost-btn" style={{ width: "100%", textAlign: "center", padding: 16 }} onClick={() => startCheckout("standard")} disabled={loading}>
                {loading ? "Redirection…" : "Commencer →"}
              </button>
            </div>

            {/* Premium */}
            <div style={{ background: "#111", border: "2px solid #E85C3A", borderRadius: 24, padding: "36px 32px", textAlign: "left", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#E85C3A", color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: 1, whiteSpace: "nowrap" }}>⭐ RECOMMANDÉ</div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#E85C3A", textTransform: "uppercase", marginBottom: 8 }}>Premium</p>
              <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 900, color: "#E85C3A", lineHeight: 1 }}>19€</div>
              <p style={{ color: "#555", fontSize: 14, marginBottom: 28, marginTop: 4 }}>/mois</p>
              <div style={{ marginBottom: 28 }}>
                {["⚡ Fast Drama + 🎭 Premium Suspense", "Jusqu'à 40 épisodes", "Scripts 1min – 2min", "Mode Tournage + Téléprompteur", "🎲 3 variations par script", "🔥 Titres viraux IA", "Export PDF", "Sauvegardes illimitées"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: "#E85C3A", fontSize: 14 }}>✓</span>
                    <span style={{ color: "#ddd", fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="cta-btn" style={{ width: "100%", textAlign: "center", padding: 16 }} onClick={() => startCheckout("premium")} disabled={loading}>
                {loading ? "Redirection…" : "Créer ma série Premium →"}
              </button>
            </div>
          </div>

          <p style={{ color: "#333", fontSize: 12, marginTop: 24 }}>Paiement sécurisé via Stripe</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060604", borderTop: "1px solid #111", padding: "28px 40px", textAlign: "center", color: "#333", fontSize: 13 }}>
        <p>© 2026 Vertical Studio · <a href="mailto:hello@vertical-studio.app" style={{ color: "#444" }}>Contact</a> · <a href="/exemples" style={{ color: "#444" }}>Exemples</a> · <a href="/cgu" style={{ color: "#444" }}>CGU</a> · <a href="/confidentialite" style={{ color: "#444" }}>Confidentialité</a></p>
      </footer>
    </div>
  );
}
