import Head from "next/head";
import { useState } from "react";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const SITE = "https://verticalclap.com";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, userSelect: "none" }}>
    <img src="/1024.webp" alt="VC" width={34} height={34} style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

const CHANNELS = [
  {
    icon: "✉️",
    title: "General enquiries",
    desc: "Questions, suggestions, partnerships.",
    link: "mailto:verticalclapapp@gmail.com",
    label: "hello@verticalclap.com",
  },
  {
    icon: "🛠️",
    title: "Technical support",
    desc: "Bug, access issue, generation error.",
    link: "mailto:verticalclapapp@gmail.com",
    label: "support@verticalclap.com",
  },
  {
    icon: "⚖️",
    title: "Personal data",
    desc: "Exercise your GDPR rights, deletion request.",
    link: "mailto:verticalclapapp@gmail.com?subject=GDPR%20—%20request",
    label: "Send a GDPR request →",
  },
];

const FAQS = [
  {
    q: "How do I cancel my subscription?",
    a: "Log into your Stripe customer portal via the link in your confirmation email, or from the app (menu → Manage subscription). Cancellation takes effect at the end of the current paid period.",
  },
  {
    q: "I was charged but can't log in.",
    a: "Make sure you're using the email address you subscribed with. If the problem persists, write to support@verticalclap.com with your payment email.",
  },
  {
    q: "Can I switch plan (Creator → Pro)?",
    a: "Yes, from the app (menu → Manage subscription). The change is prorated automatically by Stripe.",
  },
  {
    q: "Do I own the content I generate?",
    a: "Yes, entirely. Bibles, scripts, breakdowns — everything you generate with VerticalClap belongs to you and can be used commercially without restriction.",
  },
];

export default function ContactEn() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", background: "#0f0f1a", border: "1px solid #1e1e2e",
    borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#f1f5f9",
    fontFamily: "var(--sans)", outline: "none", boxSizing: "border-box",
  };

  return (
    <>
      <Head>
        <title>Contact — VerticalClap</title>
        <meta name="description" content="Contact the VerticalClap team for any question, technical support or GDPR request." />
        <link rel="canonical" href={`${SITE}/en/contact`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/contact`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/contact`} />
      </Head>
      <div style={{ minHeight: "100vh", background: DARK, color: "#f1f5f9", fontFamily: "var(--sans)" }}>

        <nav style={{ borderBottom: "1px solid #1e1e2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/en" style={{ textDecoration: "none" }}><Logo /></a>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="/en/tarifs" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>Pricing</a>
            <a href="/app" style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", background: RED, padding: "7px 18px", borderRadius: 8, textDecoration: "none" }}>App →</a>
          </div>
        </nav>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" }}>

          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: RED }}>Support</span>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 42, fontWeight: 900, color: "#f1f5f9", margin: "10px 0 16px", letterSpacing: -1, lineHeight: 1.1 }}>
              We're here.
            </h1>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
              A question, a bug, an idea — we usually reply within 24h (business days).
            </p>
          </div>

          {/* Contact channels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 56 }}>
            {CHANNELS.map(ch => (
              <a key={ch.title} href={ch.link} style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 16, padding: "24px 20px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 8, transition: "border-color .2s" }}>
                <div style={{ fontSize: 24 }}>{ch.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>{ch.title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{ch.desc}</div>
                <div style={{ fontSize: 13, color: RED, fontWeight: 600, marginTop: 4 }}>{ch.label}</div>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 20, padding: "36px 32px", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 900, color: "#f1f5f9", margin: "0 0 8px", letterSpacing: -0.5 }}>
              Send us a message
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 28px" }}>We reply within 24h on business days.</p>

            {status === "sent" ? (
              <div style={{ background: "rgba(232,92,58,0.08)", border: "1px solid rgba(232,92,58,0.3)", borderRadius: 12, padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>✅</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px" }}>Message sent!</p>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: 6, letterSpacing: 0.5 }}>Name</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Alex" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: 6, letterSpacing: 0.5 }}>Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="alex@email.com" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: 6, letterSpacing: 0.5 }}>Message</label>
                  <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Your question or feedback…" rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} />
                </div>
                {status === "error" && (
                  <p style={{ fontSize: 13, color: RED, margin: 0 }}>Something went wrong. Try again or write directly to hello@verticalclap.com.</p>
                )}
                <button type="submit" disabled={status === "sending"}
                  style={{ background: RED, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.7 : 1, alignSelf: "flex-start", fontFamily: "var(--sans)" }}>
                  {status === "sending" ? "Sending…" : "Send →"}
                </button>
              </form>
            )}
          </div>

          <div style={{ borderTop: "1px solid #1e1e2e", marginBottom: 56 }} />

          {/* FAQ */}
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 900, color: "#f1f5f9", margin: "0 0 32px", letterSpacing: -0.5 }}>
              Frequently asked questions
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

          <div style={{ marginTop: 64, background: "linear-gradient(135deg,#1a0a06,#120a1f)", border: "1px solid #2a1a2e", borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: VIO, margin: "0 0 10px" }}>Not subscribed yet?</p>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 900, color: "#f1f5f9", margin: "0 0 12px", letterSpacing: -0.5 }}>
              First series in 5 minutes.
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 24px" }}>Bible · Episodes · Scripts ready to shoot.</p>
            <a href="/en/tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg,${RED},${VIO})`, color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700 }}>
              See pricing →
            </a>
          </div>

        </div>

        <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
            © 2026 VerticalClap ·{" "}
            <a href="/en/cgu" style={{ color: "#475569", textDecoration: "none" }}>Terms</a>
            {" "}·{" "}
            <a href="/en/confidentialite" style={{ color: "#475569", textDecoration: "none" }}>Privacy</a>
          </p>
        </footer>

        <style>{`
          @media (max-width: 600px) { h1 { font-size: 32px !important; } }
        `}</style>
      </div>
    </>
  );
}
