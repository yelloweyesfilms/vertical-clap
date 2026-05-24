import Head from "next/head";
import { POSTS } from "../../lib/posts";

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
    <img src="/1024.png" alt="VC" style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

function renderInline(text) {
  // Handle **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*)/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={j} style={{ color: TEXT, fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={j} style={{ color: TEXT, fontStyle: "italic" }}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function renderBody(text) {
  return text.split("\n\n").map((para, i) => {
    // Horizontal rule
    if (para.trim() === "---") return <hr key={i} style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: "24px 0" }} />;

    // Blockquote: lines starting with >
    if (para.startsWith("> ") || para.startsWith(">\n")) {
      const content = para.replace(/^> ?/gm, "").trim();
      return (
        <blockquote key={i} style={{ borderLeft: `3px solid ${VIO}`, paddingLeft: 20, margin: "0 0 20px", color: MUTED, fontSize: 15, lineHeight: 1.8, fontStyle: "italic" }}>
          {renderInline(content)}
        </blockquote>
      );
    }

    // Numbered list: lines starting with "1." "2." etc.
    const lines = para.split("\n");
    if (lines.length > 1 && /^\d+\.\s/.test(lines[0])) {
      return (
        <ol key={i} style={{ paddingLeft: 24, marginBottom: 20, color: MUTED, fontSize: 16, lineHeight: 1.8 }}>
          {lines.map((line, j) => {
            const match = line.match(/^\d+\.\s(.+)/);
            if (!match) return null;
            return <li key={j} style={{ marginBottom: 8 }}>{renderInline(match[1])}</li>;
          })}
        </ol>
      );
    }

    // Bullet list: lines starting with - or •
    if (lines.length > 1 && /^[-•]\s/.test(lines[0])) {
      return (
        <ul key={i} style={{ paddingLeft: 24, marginBottom: 20, color: MUTED, fontSize: 16, lineHeight: 1.8, listStyle: "disc" }}>
          {lines.map((line, j) => {
            const match = line.match(/^[-•]\s(.+)/);
            if (!match) return null;
            return <li key={j} style={{ marginBottom: 6 }}>{renderInline(match[1])}</li>;
          })}
        </ul>
      );
    }

    // Multi-line paragraph with embedded \n (keep as single block)
    return (
      <p key={i} style={{ color: MUTED, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
        {renderInline(para)}
      </p>
    );
  });
}

export default function BlogPost({ post, otherPosts }) {
  if (!post) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "VerticalClap" },
    "publisher": { "@type": "Organization", "name": "VerticalClap", "url": SITE },
    "url": `${SITE}/blog/${post.slug}`,
    "mainEntityOfPage": `${SITE}/blog/${post.slug}`,
  };

  return (
    <>
      <Head>
        <title>{post.title} — VerticalClap</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`${SITE}/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`${SITE}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE}/api/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.description.slice(0, 80))}&category=${encodeURIComponent(post.category)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          a { text-decoration: none; color: inherit; }
          a:hover { opacity: 0.85; }
          @media (max-width: 640px) { nav { padding: 14px 20px !important; } .article-pad { padding: 48px 20px !important; } }
        `}</style>

        <div style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.9)", backdropFilter: "blur(20px)" }}>
          <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/"><Logo /></a>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <a href="/blog" style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>← Blog</a>
              <a href="/app" style={{ fontSize: 14, color: TEXT, fontWeight: 700, background: SURFACE, border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 10 }}>Se connecter →</a>
            </div>
          </nav>
        </div>

        <div className="article-pad" style={{ padding: "72px 40px 0", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: post.categoryColor, background: `${post.categoryColor}12`, border: `1px solid ${post.categoryColor}25`, padding: "3px 10px", borderRadius: 6 }}>{post.category}</span>
            <span style={{ fontSize: 12, color: MUTED }}>{new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span style={{ fontSize: 12, color: MUTED }}>· {post.readTime} de lecture</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, color: TEXT, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 24 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.7, marginBottom: 48, borderLeft: `3px solid ${post.categoryColor}`, paddingLeft: 20 }}>
            {post.intro}
          </p>
        </div>

        <div className="article-pad" style={{ padding: "0 40px 80px", maxWidth: 760, margin: "0 auto" }}>
          {post.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: TEXT, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
                {section.h2}
              </h2>
              {renderBody(section.body)}
            </div>
          ))}

          <div style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 24, padding: "36px", textAlign: "center", margin: "48px 0" }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, color: TEXT, marginBottom: 12, letterSpacing: -0.5 }}>{post.cta.text}</p>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 24 }}>{post.cta.sub}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: `0 0 24px rgba(168,85,247,0.25)` }}>
                Commencer gratuitement →
              </a>
              <a href="/exemples" style={{ display: "inline-block", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: TEXT, padding: "14px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                Voir des exemples
              </a>
            </div>
          </div>
        </div>

        {otherPosts.length > 0 && (
          <div style={{ borderTop: `1px solid ${BORDER}`, padding: "64px 40px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>Autres articles</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {otherPosts.map(p => (
                  <a key={p.slug} href={`/blog/${p.slug}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: p.categoryColor, flexShrink: 0 }}>{p.category}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, flex: 1 }}>{p.title}</span>
                    <span style={{ color: VIO, fontSize: 14, flexShrink: 0 }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 40px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Logo />
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: MUTED }}>
            <a href="/">Accueil</a>
            <a href="/blog">Blog</a>
            <a href="/tarifs">Tarifs</a>
            <a href="/cgu">CGU</a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: POSTS.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = POSTS.find(p => p.slug === params.slug) || null;
  const otherPosts = POSTS.filter(p => p.slug !== params.slug);
  return { props: { post, otherPosts } };
}
