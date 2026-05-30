import Head from "next/head";
import { POSTS_EN } from "../../../lib/posts-en";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#64748b";
const SITE = "https://verticalclap.com";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, userSelect: "none" }}>
    <img src="/1024.webp" alt="VC" style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

export default function BlogEnIndex() {
  return (
    <>
      <Head>
        <title>Blog VerticalClap — Micro-drama guides and vertical writing</title>
        <meta name="description" content="Practical guides on vertical micro-drama: how to write a TikTok hook, structure your episodes, choose your platforms and generate series with AI." />
        <link rel="canonical" href={`${SITE}/en/blog`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/blog`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/blog`} />
        <meta property="og:title" content="Blog VerticalClap — Micro-drama guides and vertical writing" />
        <meta property="og:url" content={`${SITE}/en/blog`} />
      </Head>

      <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          a { text-decoration: none; color: inherit; }
          a:hover { opacity: 0.85; }
          @media (max-width: 640px) { nav { padding: 14px 20px !important; } .page-pad { padding: 60px 20px !important; } }
        `}</style>

        <div style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.9)", backdropFilter: "blur(20px)" }}>
          <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/en"><Logo /></a>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <a href="/en/exemples" style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>Examples</a>
              <a href="/en#tarifs" style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>Pricing</a>
              <a href="/app" style={{ fontSize: 14, color: TEXT, fontWeight: 700, background: SURFACE, border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 10 }}>Sign in →</a>
            </div>
          </nav>
        </div>

        <div className="page-pad" style={{ padding: "72px 40px 56px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: `radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: VIO, marginBottom: 16 }}>Blog</p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 16, color: TEXT }}>
            Guides & resources<br />
            <span style={{ fontStyle: "italic", color: MUTED }}>micro-drama.</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 440, margin: "0 auto" }}>
            Writing, hooks, platforms, AI — everything you need to create vertical series that perform.
          </p>
        </div>

        <div className="page-pad" style={{ padding: "0 40px 96px" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
            {POSTS_EN.map((post) => (
              <a key={post.slug} href={`/en/blog/${post.slug}`} style={{ display: "block", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 24, padding: "32px 36px", transition: "border-color .2s", textDecoration: "none", color: "inherit" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: post.categoryColor, background: `${post.categoryColor}12`, border: `1px solid ${post.categoryColor}25`, padding: "3px 10px", borderRadius: 6 }}>{post.category}</span>
                  <span style={{ fontSize: 12, color: MUTED }}>{new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span style={{ fontSize: 12, color: MUTED }}>· {post.readTime} read</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 900, color: TEXT, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 12 }}>{post.title}</h2>
                <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{post.description}</p>
                <span style={{ fontSize: 14, fontWeight: 700, color: VIO }}>Read article →</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "64px 40px", textAlign: "center" }}>
          <p style={{ color: MUTED, fontSize: 15, marginBottom: 24 }}>Ready to generate your first series?</p>
          <a href="/en" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "15px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: `0 0 28px rgba(168,85,247,0.25)`, textDecoration: "none" }}>
            Get started →
          </a>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 40px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Logo />
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: MUTED }}>
            <a href="/en">Home</a>
            <a href="/en/exemples">Examples</a>
            <a href="/en/tarifs">Pricing</a>
            <a href="/en/cgu">Terms</a>
          </div>
        </div>
      </div>
    </>
  );
}
