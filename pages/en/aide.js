import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

const RED = "#E85C3A";
const VIO = "#a855f7";
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

const STEPS = [
  { emoji: "💡", label: "IDEA",     desc: "Choose your genre, budget, setting, casting and central secret" },
  { emoji: "📖", label: "BIBLE",    desc: "AI generates the full concept: title, logline, characters, tension" },
  { emoji: "🎬", label: "EPISODES", desc: "The full series is planned automatically (10 to 90 episodes)" },
  { emoji: "✍️", label: "SCRIPT",   desc: "Generate each episode's script, edit it (Spice up, Simplify...)" },
  { emoji: "🎥", label: "SHOOT",    desc: "Shooting checklist, storyboard, PDF export" },
];

const BUDGETS = [
  { emoji: "📱", label: "Smartphone", desc: "1 location, solo, pure tension.", refs: "Coherence, Locke" },
  { emoji: "🎬", label: "Small crew",  desc: "2–4 characters, varied locations, small team", refs: null },
  { emoji: "🚀", label: "Ambitious",   desc: "Full production, no limits", refs: null },
];

const FAQS = [
  {
    q: "How long does it take to generate a series?",
    a: "30 seconds for the bible, 1–2 min for the episodes, a few seconds per script.",
  },
  {
    q: "The script doesn't match what I had in mind?",
    a: "Use the Spice up / Subtle / Simplify buttons in the Studio. You can also regenerate or tweak the casting and tropes before regenerating.",
  },
  {
    q: "Can I create in multiple languages?",
    a: "Yes — use the EN/FR toggle at the top of the app to switch the interface and script language. You can also translate an existing script directly from the Studio.",
  },
  {
    q: "What are Story Codes?",
    a: "Tropes: the dramatic engines of your series. E.g. 'Revenge body', 'Family secret', 'Fake couple'. Pick 1 or 2 max — they steer the AI toward the type of tension you want.",
  },
  {
    q: "How do I export my script?",
    a: "In the Studio, tap the 'Export PDF' button at the bottom. The PDF includes the hook, dialogues, cliffhanger and 9:16 shooting instructions.",
  },
  {
    q: "Which episode duration should I choose?",
    a: "60s = pure TikTok format (130–150 words). 90s = DramaBox / Reels (200–225 words). 120s = YouTube Shorts / mobile cinema format (270–300 words).",
  },
  {
    q: "Is the series saved automatically?",
    a: "Yes — every generated series is saved locally on your device. Find them from the home screen with the 'My Series' button.",
  },
  {
    q: "Difference between Creator and Pro plan?",
    a: "Creator: up to 20 episodes, essential features. Pro: up to 90 episodes, advanced casting, visual identity, storyboard and script variations.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #2a2a40", cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", gap: 12 }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.4, flex: 1 }}>{q}</span>
        <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}>›</span>
      </div>
      {open && (
        <div style={{ paddingBottom: 16, fontFamily: "var(--sans)", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{a}</div>
      )}
    </div>
  );
}

export default function AideEn() {
  return (
    <>
      <Head>
        <title>User Guide — VerticalClap</title>
        <meta name="description" content="Complete guide to creating your first vertical series with VerticalClap: steps, budgets, FAQ and tips." />
        <link rel="canonical" href={`${SITE}/en/aide`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/aide`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/aide`} />
      </Head>

      <div style={{ background: DARK, minHeight: "100vh", color: "#fff", fontFamily: "var(--sans)" }}>
        <header style={{ borderBottom: "1px solid #2a2a40", padding: "16px 20px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo />
            <Link href="/app" style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textDecoration: "none", letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 4 }}>
              ← Back to app
            </Link>
          </div>
        </header>

        <main style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 60px" }}>

          <section style={{ padding: "48px 0 40px", textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "rgba(232,92,58,0.12)", border: "1px solid rgba(232,92,58,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: RED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Guide</div>
            <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(32px, 8vw, 48px)", fontWeight: 900, letterSpacing: -1.5, margin: "0 0 16px", background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.1 }}>User Guide</h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>Everything you need to know to create your first series</p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, color: "#fff" }}>The 5 steps</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{ background: "#13131e", border: "1px solid #2a2a40", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0, boxShadow: "0 0 14px rgba(232,92,58,0.35)" }}>{i + 1}</div>
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: RED, marginBottom: 4 }}>{step.emoji} {step.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, color: "#fff" }}>Mixer vs Packs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#13131e", border: "1px solid rgba(232,92,58,0.3)", borderRadius: 16, padding: "20px 16px" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>🎛️</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: RED, marginBottom: 8 }}>Mixer</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  You configure genre, casting, setting, budget and tropes yourself
                </div>
              </div>
              <div style={{ background: "#13131e", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 16, padding: "20px 16px" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>🎯</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: VIO, marginBottom: 8 }}>Packs</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  1 click — everything is pre-configured, ideal for getting started fast
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20, color: "#fff" }}>Production budgets</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BUDGETS.map((b, i) => (
                <div key={i} style={{ background: "#13131e", border: "1px solid #2a2a40", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{b.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                      {b.desc}
                      {b.refs && <span style={{ color: "rgba(255,255,255,0.35)", display: "block", marginTop: 2 }}>Ref: {b.refs}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8, color: "#fff" }}>FAQ</h2>
            <div style={{ borderTop: "1px solid #2a2a40" }}>
              {FAQS.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </section>

        </main>

        <footer style={{ borderTop: "1px solid #2a2a40", padding: "24px 20px", textAlign: "center" }}>
          <a href="https://verticalclap.com/app" style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, color: RED, textDecoration: "none" }}>
            → Go to verticalclap.com/app
          </a>
          <div style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>© 2026 VerticalClap</div>
        </footer>
      </div>
    </>
  );
}
