import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Space_Grotesk, Playfair_Display } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sg", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","900"], style: ["normal","italic"], variable: "--font-pd", display: "swap" });

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#b0bfd4";
const SITE = "https://verticalclap.com";

const Check = ({ color = RED }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill={color} opacity="0.2" />
    <path d="M5 9l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
    <circle cx="9" cy="9" r="9" fill={MUTED} opacity="0.2" />
    <path d="M6 6l6 6M12 6l-6 6" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, userSelect: "none" }}>
    <img src="/1024.webp" alt="VC" width={34} height={34} style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

const FEATURES = [
  { label: "Episodes per series", std: "20 max", prem: "90 max" },
  { label: "Bible + 9:16 scripts ready to shoot", std: true, prem: true },
  { label: "3-second Hook + calibrated Cliffhanger", std: true, prem: true },
  { label: "Creator universe packs (K-Drama, Thriller…)", std: true, prem: true },
  { label: "Pro universe packs (Dark Romance, Psycho…)", std: false, prem: true },
  { label: "3 script versions (Intense / Subtle / Stripped)", std: false, prem: true },
  { label: "Viral title generator", std: false, prem: true },
  { label: "TikTok hooks (viral captions)", std: "3 / series", prem: "All" },
  { label: "Automatic Season 2", std: false, prem: true },
  { label: "AI Casting — character profile cards", std: true, prem: true },
  { label: "Prod Guide — Zero Budget shooting", std: true, prem: true },
  { label: "Shot-by-shot breakdown", std: true, prem: true },
  { label: "Shoot Mode + Teleprompter", std: true, prem: true },
  { label: "AI Poster (9:16)", std: true, prem: true },
  { label: "Translation into 8 languages", std: true, prem: true },
  { label: "PDF export", std: true, prem: true },
];

const FAQ = [
  { q: "What's the difference between Creator and Pro?", r: "Creator (€9/month) lets you create up to 20 episodes per series with all the essential tools (Bible, Scripts, AI Casting, Shot List, Shoot Mode, PDF, Translation). Pro (€19/month) unlocks up to 90 episodes, advanced universe packs, 3 script variations, full TikTok hooks for all episodes, and automatic Season 2 generation." },
  { q: "Can I switch from Creator to Pro at any time?", r: "Yes, in one click from your Stripe dashboard. The price difference is prorated automatically." },
  { q: "Can I cancel my subscription?", r: "Yes, at any time from your Stripe dashboard. No commitment. You keep access until the end of the paid period." },
  { q: "Is the annual subscription refundable?", r: "Yes, within 7 days of the annual charge. Contact us via chat." },
];

export default function TarifsEn() {
  const [billing, setBilling] = useState("monthly");
  const [planTab, setPlanTab] = useState("pro");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const track = () => fetch("/api/analytics", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "page_view_pricing_en" }),
    }).catch(() => {});
    track();
  }, []);

  const startCheckout = async (plan, position) => {
    if (!email) { alert("Enter your email to continue"); return; }
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, plan, billing }),
    });
    const { url, error } = await res.json();
    if (error) { alert(error); setLoading(false); return; }
    window.location.href = url;
  };

  return (
    <div className={`${spaceGrotesk.variable} ${playfair.variable}`}>
      <Head>
        <title>Pricing — VerticalClap · AI micro-dramas from €9/month</title>
        <meta name="description" content="Two simple plans: Creator €9/month (vertical micro-drama, 20 episodes) and Pro €19/month (long series, 90 episodes, art direction). No commitment. Cancel anytime." />
        <link rel="canonical" href={`${SITE}/en/tarifs`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/tarifs`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/tarifs`} />
        <meta property="og:title" content="Pricing — VerticalClap · AI micro-dramas from €9/month" />
        <meta property="og:description" content="Creator €9/month or Pro €19/month. Create complete series for TikTok, DramaBox, ReelShort. No commitment." />
        <meta property="og:url" content={`${SITE}/en/tarifs`} />
        <meta property="og:image" content={`${SITE}/banniere%20EN.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "var(--sans)" }}>
        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          input { font-size: 16px !important; }
          a { text-decoration: none; color: inherit; }
          button:hover { opacity: .88 !important; }
          .glass { background: ${SURFACE}; border: 1px solid ${BORDER}; }
          @media (max-width: 900px) {
            .plans-grid { grid-template-columns: 1fr !important; max-width: 420px !important; margin: 0 auto !important; }
            .compare-table { display: none !important; }
            .faq-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 640px) {
            .page-pad { padding: 48px 20px !important; }
            nav { padding: 12px 16px !important; }
            .nav-examples { display: none !important; }
            .plan-card { padding: 28px 20px !important; }
            .plan-price { font-size: clamp(36px, 8vw, 56px) !important; }
          }
          @media (max-width: 480px) {
            .page-pad { padding: 40px 14px !important; }
            nav { padding: 10px 12px !important; }
            .plan-card { padding: 24px 16px !important; }
          }
          @media (hover: none) { button:hover { opacity: 1 !important; } }
        `}</style>

        {/* NAV */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.9)", backdropFilter: "blur(20px)" }}>
          <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/en"><Logo /></a>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <a href="/en/exemples" className="nav-examples" style={{ fontSize: 14, color: MUTED, fontWeight: 600 }}>Examples</a>
              <a href="/app" style={{ fontSize: 14, color: TEXT, fontWeight: 700, background: SURFACE, border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 10 }}>Sign in →</a>
            </div>
          </nav>
        </div>

        {/* HERO */}
        <div className="page-pad" style={{ padding: "80px 40px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(600px, 100vw)", height: 300, background: `radial-gradient(ellipse, rgba(232,92,58,0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(232,92,58,0.1)`, border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 20, padding: "5px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase" }}>Pricing</span>
          </div>
          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.0, marginBottom: 20, color: TEXT, textTransform: "uppercase" }}>
            Simple.<br />
            <span style={{ color: RED }}>Transparent.</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 17, maxWidth: 460, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Two plans, no surprises. Cancel anytime.
          </p>

          <div style={{ maxWidth: 360, margin: "0 auto 32px" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: "100%", padding: "15px 18px", borderRadius: 12, border: `1px solid ${BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, outline: "none", backdropFilter: "blur(8px)" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "inline-flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 4, gap: 4 }}>
              {[
                { k: "monthly", l: "Monthly" },
                { k: "annual", l: "Annual", badge: "-17%" },
              ].map(({ k, l, badge }) => (
                <button key={k} onClick={() => setBilling(k)} style={{
                  padding: "9px 22px", borderRadius: 10, border: "none",
                  fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", transition: "all .2s",
                  background: billing === k ? TEXT : "transparent",
                  color: billing === k ? DARK : MUTED,
                  display: "flex", alignItems: "center", gap: 7,
                }}>
                  {l}
                  {badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 800,
                      background: billing === k ? `linear-gradient(135deg,${RED},${VIO})` : "transparent",
                      WebkitBackgroundClip: billing === k ? "text" : "initial",
                      WebkitTextFillColor: billing === k ? "transparent" : MUTED,
                      backgroundClip: billing === k ? "text" : "initial",
                      color: billing !== k ? MUTED : undefined,
                    }}>{badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {billing === "annual" && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 4 }}>
              🎉 2 months free vs monthly billing
            </p>
          )}
        </div>

        {/* PLANS */}
        <div className="page-pad" style={{ padding: "0 40px 80px" }}>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>

            <div style={{ display: "flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 5, gap: 5, marginBottom: 28 }}>
              {[
                { id: "creator", label: "Creator", price: billing === "annual" ? "€7.5" : "€9", color: RED },
                { id: "pro", label: "Pro", price: billing === "annual" ? "€14.9" : "€19", color: VIO },
              ].map(tab => {
                const active = planTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setPlanTab(tab.id)} style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "14px 8px", borderRadius: 13, border: "none",
                    background: active ? (tab.id === "pro" ? `linear-gradient(135deg, ${RED}22, ${VIO}22)` : `${RED}18`) : "transparent",
                    boxShadow: active ? `inset 0 0 0 1.5px ${tab.color}55` : "none",
                    cursor: "pointer", transition: "all .2s", fontFamily: "var(--sans)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: active ? tab.color : MUTED, flexShrink: 0 }} />
                      <span style={{ fontSize: 15, fontWeight: 800, color: active ? tab.color : MUTED }}>{tab.label}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: active ? TEXT : MUTED }}>{tab.price}<span style={{ fontWeight: 400, fontSize: 11 }}>/month</span></span>
                  </button>
                );
              })}
            </div>

            {planTab === "creator" && (
              <div className="glass plan-card" style={{ borderRadius: 24, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${RED}, transparent)` }} />
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 4 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: MUTED, textTransform: "uppercase", marginBottom: 8 }}>Creator</p>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                      <span className="plan-price" style={{ fontFamily: "var(--serif)", fontSize: 56, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
                        {billing === "annual" ? "€7.5" : "€9"}
                      </span>
                      {billing === "annual" && <span style={{ fontSize: 14, color: MUTED, marginBottom: 10, textDecoration: "line-through" }}>€9</span>}
                      <span style={{ fontSize: 14, color: MUTED, marginBottom: 10 }}>/month</span>
                    </div>
                    {billing === "annual" && <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginTop: 4 }}>billed €90/year</p>}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, textAlign: "right", lineHeight: 1.6 }}>
                    For creators<br />TikTok · Reels · Shorts
                  </div>
                </div>
                <button onClick={() => startCheckout("standard", "tarifs")} disabled={loading}
                  style={{ width: "100%", background: RED, color: "#fff", border: "none", padding: "16px 0", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", boxShadow: `0 0 24px rgba(232,92,58,0.35)`, transition: "all .2s", marginTop: 24 }}>
                  {loading ? "Redirecting…" : "Start Creator →"}
                </button>
                <div style={{ height: 1, background: BORDER, margin: "24px 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {[
                    { t: "Bible + AI-generated 9:16 scripts", hi: true },
                    { t: "20 episodes per series", hi: true },
                    { t: "9:16 scripts ready to shoot", hi: false },
                    { t: "Auto Hook 3s + Cliffhanger", hi: false },
                    { t: "AI Poster (9:16)", hi: false },
                    { t: "Shoot Mode + Teleprompter", hi: false },
                    { t: "Translation into 8 languages", hi: false },
                    { t: "Multi-device cloud backup", hi: false },
                    { t: "PDF export", hi: false },
                  ].map(({ t: feat, hi }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Check />
                      <span style={{ color: hi ? TEXT : MUTED, fontSize: 14, fontWeight: hi ? 600 : 400 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 12, background: `${RED}10`, border: `1px solid ${RED}25` }}>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
                    <span style={{ color: RED, fontWeight: 700 }}>Not included: </span>
                    90 episodes · 3 variations · Viral titles · Art Direction · Production sheet
                    {" "}<button onClick={() => setPlanTab("pro")} style={{ background: "none", border: "none", color: VIO, fontWeight: 700, cursor: "pointer", fontSize: 12, padding: 0 }}>→ See Pro</button>
                  </p>
                </div>
              </div>
            )}

            {planTab === "pro" && (
              <div className="plan-card" style={{ borderRadius: 24, padding: "36px 32px", position: "relative", overflow: "hidden", background: "rgba(168,85,247,0.04)", border: `1.5px solid rgba(168,85,247,0.28)`, boxShadow: `0 0 60px rgba(168,85,247,0.08)` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${VIO}, ${RED})` }} />
                <div style={{ position: "absolute", top: -12, right: 24, background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: 1.5 }}>RECOMMENDED</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 4 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: VIO, textTransform: "uppercase", marginBottom: 8 }}>Pro</p>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                      <span className="plan-price" style={{ fontFamily: "var(--serif)", fontSize: 56, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: -2 }}>
                        {billing === "annual" ? "€14.9" : "€19"}
                      </span>
                      {billing === "annual" && <span style={{ fontSize: 14, color: MUTED, marginBottom: 10, textDecoration: "line-through" }}>€19</span>}
                      <span style={{ fontSize: 14, color: MUTED, marginBottom: 10 }}>/month</span>
                    </div>
                    {billing === "annual" && <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginTop: 4 }}>billed €179/year</p>}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, textAlign: "right", lineHeight: 1.6 }}>
                    For showrunners<br />Series · Worlds · Ambition
                  </div>
                </div>
                <button onClick={() => startCheckout("premium", "tarifs")} disabled={loading}
                  style={{ width: "100%", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", border: "none", padding: "16px 0", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", boxShadow: `0 0 32px rgba(168,85,247,0.3)`, transition: "all .2s", marginTop: 24 }}>
                  {loading ? "Redirecting…" : "Start Pro →"}
                </button>
                <div style={{ height: 1, background: "rgba(168,85,247,0.15)", margin: "24px 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {[
                    { t: "Everything in Creator + long series up to 90 episodes", hi: true },
                    { t: "Up to 90 episodes per series", hi: true },
                    { t: "Art Direction (emotion, rhythm, narration…)", hi: true },
                    { t: "3 script versions — Intense · Subtle · Fast", hi: true },
                    { t: "Viral title generator", hi: true },
                    { t: "Production sheet", hi: true },
                    { t: "9:16 scripts ready to shoot", hi: false },
                    { t: "AI Poster (9:16)", hi: false },
                    { t: "Shoot Mode + Teleprompter", hi: false },
                    { t: "Translation into 8 languages", hi: false },
                    { t: "Multi-device cloud backup", hi: false },
                    { t: "PDF export", hi: false },
                  ].map(({ t: feat, hi }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Check color={VIO} />
                      <span style={{ color: hi ? TEXT : MUTED, fontSize: 14, fontWeight: hi ? 600 : 400 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 12, background: `${VIO}08`, border: `1px solid ${VIO}20` }}>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
                    <span style={{ color: VIO, fontWeight: 700 }}>Everything in Creator, plus: </span>
                    Art Direction · 3 variations · Viral titles · Production sheet · 90 episodes
                  </p>
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginTop: 24 }}>
              {["Stripe · Secure", "No commitment", "Instant access", "Encrypted data"].map(label => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: MUTED }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: MUTED, marginTop: 12 }}>
              Try it free in <a href="/en/exemples" style={{ color: VIO, fontWeight: 600 }}>Examples</a> before subscribing.
            </p>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="compare-table" style={{ borderTop: `1px solid ${BORDER}`, padding: "80px 40px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: VIO, marginBottom: 12 }}>Comparison</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, textAlign: "center", marginBottom: 48, letterSpacing: -1.5, lineHeight: 1.1, color: TEXT }}>
              Creator vs Pro<br /><span style={{ fontStyle: "italic", color: MUTED }}>in detail.</span>
            </h2>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", borderBottom: `1px solid ${BORDER}`, padding: "18px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 2, textTransform: "uppercase" }}>Feature</div>
                <div style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: RED }}>Creator</div>
                <div style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: VIO }}>Pro</div>
              </div>
              {FEATURES.map(({ label, std, prem }, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", padding: "14px 24px", borderBottom: i < FEATURES.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                  <span style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{label}</span>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {std === true ? <Check /> : std === false ? <Cross /> : <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{std}</span>}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {prem === true ? <Check color={VIO} /> : prem === false ? <Cross /> : <span style={{ fontSize: 12, fontWeight: 700, color: VIO }}>{prem}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "80px 40px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: RED, marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, textAlign: "center", marginBottom: 48, letterSpacing: -1.5, lineHeight: 1.1, color: TEXT }}>
              Common questions.
            </h2>
            {FAQ.map((item, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--sans)" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, paddingRight: 16 }}>{item.q}</span>
                  <span style={{ color: VIO, fontSize: 22, flexShrink: 0, transition: "transform .2s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, paddingBottom: 20 }}>{item.r}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA FINAL */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 5vw, 58px)", fontWeight: 900, marginBottom: 16, letterSpacing: -2, lineHeight: 1.1, color: TEXT }}>
              Your first series<br />
              in{" "}
              <span style={{ background: `linear-gradient(135deg, ${RED}, ${VIO})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
                5 minutes.
              </span>
            </h2>
            <p style={{ color: MUTED, fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
              See <a href="/en/exemples" style={{ color: VIO, fontWeight: 600 }}>example series →</a>
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ padding: "16px 20px", borderRadius: 14, border: `1px solid ${BORDER}`, background: SURFACE, color: TEXT, fontSize: 15, width: 240, outline: "none" }} />
              <button onClick={() => startCheckout("standard", "cta_final")} disabled={loading}
                style={{ background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", border: "none", padding: "16px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", boxShadow: `0 0 32px rgba(168,85,247,0.3)` }}>
                {loading ? "Redirecting…" : "Get started →"}
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 40px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Logo />
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: MUTED }}>
            <a href="/en">Home</a>
            <a href="/en/exemples">Examples</a>
            <a href="/en/cgu">Terms</a>
            <a href="/en/confidentialite">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
