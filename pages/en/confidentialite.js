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

function P({ children, style }) {
  return <p style={{ fontSize: 15, lineHeight: 1.8, color: "#94a3b8", margin: "0 0 10px", ...style }}>{children}</p>;
}

export default function ConfidentialiteEn() {
  return (
    <>
      <Head>
        <title>Privacy Policy — VerticalClap</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE}/en/confidentialite`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/confidentialite`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/confidentialite`} />
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
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 900, color: "#f1f5f9", margin: "10px 0 8px", letterSpacing: -1 }}>Privacy Policy</h1>
            <p style={{ fontSize: 13, color: "#475569" }}>Last updated: May 4, 2026</p>
          </div>

          <Section title="1. Data controller">
            <P>The data controller is Sophie Attelann, publisher of VerticalClap (verticalclap.com).
              Contact: <a href="mailto:verticalclapapp@gmail.com" style={{ color: RED, textDecoration: "none" }}>hello@verticalclap.com</a></P>
          </Section>

          <Section title="2. Data collected">
            <P><strong style={{ color: "#f1f5f9" }}>Account data:</strong> email address, provided at subscription via Stripe.</P>
            <P><strong style={{ color: "#f1f5f9" }}>Payment data:</strong> handled exclusively by Stripe. VerticalClap stores no banking data.</P>
            <P><strong style={{ color: "#f1f5f9" }}>Usage data:</strong> anonymous feature usage counters (via Upstash Redis). No generated content is retained on our servers beyond the session.</P>
            <P><strong style={{ color: "#f1f5f9" }}>Saved series:</strong> if you enable cloud saving, your bibles and scripts are stored encrypted and linked to your Stripe identifier.</P>
          </Section>

          <Section title="3. Processing purposes">
            <P>Your data is used to:</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Manage your subscription and service access</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Process payments via Stripe</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Send service-related transactional emails (welcome, reminders, cancellation)</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Improve the service via anonymous usage metrics</P>
          </Section>

          <Section title="4. Legal basis">
            <P>Processing of your data is based on the performance of the subscription contract entered into with VerticalClap (Art. 6.1.b GDPR). Marketing emails are based on legitimate interest and/or your consent.</P>
          </Section>

          <Section title="5. Retention period">
            <P>Your data is retained for the duration of your subscription and 3 years after cancellation, in accordance with accounting and tax legal obligations.</P>
          </Section>

          <Section title="6. Data sharing">
            <P><strong style={{ color: "#f1f5f9" }}>Stripe</strong> — for payment processing and subscription management.</P>
            <P><strong style={{ color: "#f1f5f9" }}>Anthropic</strong> — for AI content generation (Claude). Prompts are processed without being retained, in accordance with their enterprise policy.</P>
            <P><strong style={{ color: "#f1f5f9" }}>Resend</strong> — for transactional email delivery.</P>
            <P>VerticalClap does not sell any personal data to third parties.</P>
          </Section>

          <Section title="7. Your rights (GDPR)">
            <P>Under GDPR, you have the following rights:</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Right of access to your personal data</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Right of rectification</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Right to erasure (right to be forgotten)</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Right to data portability</P>
            <P style={{ paddingLeft: 16 }}><span style={{ color: RED, marginRight: 8 }}>—</span>Right to object</P>
            <P>To exercise these rights: <a href="mailto:verticalclapapp@gmail.com" style={{ color: RED, textDecoration: "none" }}>hello@verticalclap.com</a></P>
          </Section>

          <Section title="8. Cookies">
            <P>VerticalClap uses only technical cookies necessary for service operation (session, preferences). No advertising or third-party tracking cookies are set.</P>
          </Section>

          <Section title="9. Security">
            <P>VerticalClap implements appropriate technical measures: HTTPS, encryption of data at rest, restricted database access. Security incidents are reported to the relevant supervisory authority within 72 hours if required.</P>
          </Section>

          <Section title="10. Contact and complaints">
            <P>For any questions: <a href="mailto:verticalclapapp@gmail.com" style={{ color: RED, textDecoration: "none" }}>hello@verticalclap.com</a></P>
            <P>You have the right to lodge a complaint with your local data protection authority (in France: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: RED, textDecoration: "none" }}>www.cnil.fr</a>).</P>
          </Section>
        </div>

        <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
            © 2026 VerticalClap ·{" "}
            <a href="/en/cgu" style={{ color: "#475569", textDecoration: "none" }}>Terms</a>
            {" "}·{" "}
            <a href="mailto:verticalclapapp@gmail.com" style={{ color: "#475569", textDecoration: "none" }}>Contact</a>
          </p>
        </footer>
      </div>
    </>
  );
}
