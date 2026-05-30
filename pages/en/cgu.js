import Head from "next/head";

const RED = "#E85C3A";
const DARK = "#09090f";
const SITE = "https://verticalclap.com";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, userSelect: "none" }}>
    <img src="/1024.webp" alt="VC" style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700, color: "#f1f5f9", margin: "0 0 12px", letterSpacing: -0.3 }}>{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 15, lineHeight: 1.8, color: "#94a3b8", margin: "0 0 10px" }}>{children}</p>;
}

function Li({ children }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.8, color: "#94a3b8", margin: "0 0 6px", paddingLeft: 16 }}>
      <span style={{ color: RED, marginRight: 8 }}>—</span>{children}
    </p>
  );
}

export default function CGUEn() {
  return (
    <>
      <Head>
        <title>Terms of Service — VerticalClap</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE}/en/cgu`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/cgu`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/cgu`} />
      </Head>
      <div style={{ minHeight: "100vh", background: DARK, color: "#f1f5f9", fontFamily: "var(--sans)" }}>
        <nav style={{ borderBottom: "1px solid #1e1e2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/en" style={{ textDecoration: "none" }}><Logo /></a>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="/en/tarifs" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>Pricing</a>
            <a href="/app" style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", background: RED, padding: "7px 18px", borderRadius: 8, textDecoration: "none" }}>App →</a>
          </div>
        </nav>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 100px" }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: RED }}>Legal</span>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 900, color: "#f1f5f9", margin: "10px 0 8px", letterSpacing: -1 }}>Terms of Service</h1>
            <p style={{ fontSize: 13, color: "#475569" }}>Last updated: May 15, 2026</p>
          </div>

          <Section title="1. Purpose">
            <P>These Terms of Service govern access to and use of the VerticalClap service, available at verticalclap.com, operated by Sophie Attelann.</P>
            <P>By accessing the service, you unreservedly accept these Terms.</P>
          </Section>

          <Section title="2. Service description">
            <P>VerticalClap is an AI-assisted creation tool that enables content creators to generate scripts, series bibles and episode breakdowns for vertical 9:16 micro-dramas, intended for TikTok, Instagram Reels, YouTube Shorts and DramaBox.</P>
          </Section>

          <Section title="3. Access to the service">
            <P>Access to the service requires a monthly subscription (Creator at €9/month or Pro at €19/month) or annual subscription (Creator at €90/year or Pro at €179/year). Subscriptions are commitment-free and can be cancelled at any time.</P>
            <P>You must be at least 18 years old to subscribe.</P>
          </Section>

          <Section title="4. Intellectual property">
            <P>Content generated through VerticalClap (scripts, bibles, breakdowns) belongs entirely to you. VerticalClap claims no rights over your creations.</P>
            <P>The VerticalClap platform (code, design, brand) is protected by intellectual property law and belongs to Sophie Attelann.</P>
          </Section>

          <Section title="5. Liability">
            <P>VerticalClap is a creative assistance tool. AI-generated content may contain errors or inaccuracies. The user is solely responsible for how they use the generated content.</P>
            <P>VerticalClap shall not be liable for any direct or indirect damages resulting from use of the service.</P>
          </Section>

          <Section title="6. Cancellation">
            <P>You may cancel your subscription at any time via your Stripe customer portal. Cancellation takes effect at the end of the current billing period. Your series remain saved in the cloud.</P>
          </Section>

          <Section title="7. Governing law">
            <P>These Terms are governed by French law. Any dispute falls under the exclusive jurisdiction of French courts.</P>
          </Section>

          <Section title="8. Contact">
            <P>For any questions: <a href="mailto:verticalclapapp@gmail.com" style={{ color: RED, textDecoration: "none" }}>hello@verticalclap.com</a></P>
          </Section>
        </div>

        <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
            © 2026 VerticalClap ·{" "}
            <a href="/en/confidentialite" style={{ color: "#475569", textDecoration: "none" }}>Privacy</a>
            {" "}·{" "}
            <a href="mailto:verticalclapapp@gmail.com" style={{ color: "#475569", textDecoration: "none" }}>Contact</a>
          </p>
        </footer>
      </div>
    </>
  );
}
