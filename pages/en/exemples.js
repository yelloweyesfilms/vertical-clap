import { useState, useEffect } from "react";
import Head from "next/head";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#94a3b8";
const SITE = "https://verticalclap.com";

const EXAMPLES = [
  {
    mode: "fast",
    modeLabel: "⚡ Vertical Drama",
    genre: "Medical · Thriller",
    casting: "1 Woman + 1 Man",
    setting: "Private hospital",
    bible: {
      title: "The Lie Beneath",
      logline: "A cardiologist discovers her husband — chief of surgery — has a secret family. His next patient is their son.",
      pitch: "Sofia thinks she controls everything: her career, her marriage, her emotions. Until an unknown man arrives in the ER with her last name tattooed on his wrist. As she unravels the truth, she dismantles ten years of lies — and puts a life she never knew existed at risk.",
      characters: [
        { name: "Sofia", age: 38, role: "Head cardiologist", secret: "She's known for 6 months. She said nothing." },
        { name: "Marc", age: 42, role: "Chief of surgery, Sofia's husband", secret: "He has a 7-year-old daughter with another woman — in the same hospital." },
      ],
      central_tension: "Can you save the life of someone you want to see die?",
      episodes: 10,
    },
    script: {
      number: 1,
      title: "The Tattoo",
      hook_scene: {
        text: "An unknown man. My last name. On his wrist.",
        visual_916: "Close-up wrist, tattoo sharp, Sofia's hands trembling above it",
      },
      scenes: [
        { character: "SOFIA", dialogue: "Who are you? That name... it's mine.", acting: "flat voice, inner shock", visual_916: "Face-on camera, fixed eyes" },
        { character: "MARC", dialogue: "Sofia. Leave this room. Now.", acting: "cold panic", visual_916: "Shoulder shot, he blocks the hallway" },
        { character: "SOFIA", dialogue: "You know him. You know him and you told me nothing.", acting: "restrained fury", visual_916: "Slow zoom on her face" },
      ],
      cliffhanger_scene: {
        text: "The man opens his eyes. He whispers: \"Dad...\"",
        visual_916: "Insert patient's face, gaze toward Marc off-screen",
        label: "EP. 2: THE TRUTH",
      },
    },
  },
  {
    mode: "premium",
    modeLabel: "🎭 Premium Series",
    genre: "Finance · Psychological Thriller",
    casting: "2 Men",
    setting: "International finance",
    bible: {
      title: "The Heir",
      logline: "Two founding partners of an investment fund — one is secretly staging a hostile takeover of the other's family company.",
      pitch: "Thomas and Karim built everything together. Fifteen years of friendship, a hundred million under management, an office on the 32nd floor. But Thomas knows something Karim doesn't: the fund they run is secretly buying out Karim's family business. In 72 hours, Karim will lose everything. And he'll have to decide whether he can still trust the man who orchestrated it all.",
      characters: [
        { name: "Thomas", age: 44, role: "Managing partner, strategist", secret: "He's sabotaging Karim on orders from a foreign investor — or he'll die." },
        { name: "Karim", age: 41, role: "Operational partner, heir", secret: "He's already discovered part of the plan. He's waiting to see how far Thomas will go." },
      ],
      central_tension: "Between betrayal and survival — which of them is really the victim?",
      episodes: 20,
    },
    script: {
      number: 3,
      title: "72 Hours",
      hook_scene: {
        text: "I signed. For you. Now I can't stop anything.",
        visual_916: "Close-up hand on contract, pen set down, no eye contact",
      },
      scenes: [
        { character: "KARIM", dialogue: "You called me at 3am to tell me this.", acting: "dangerous calm", visual_916: "Low angle, city night behind him" },
        { character: "THOMAS", dialogue: "They have my wife. Karim. They've had her since last night.", acting: "broken voice, first crack", visual_916: "Tight shoulder shot, he looks away" },
        { character: "KARIM", dialogue: "And you think that changes anything for me?", acting: "heavy silence before speaking", visual_916: "Very slow zoom, direct eye contact" },
      ],
      cliffhanger_scene: {
        text: "Karim sets an envelope on the table. \"I've known from the beginning.\"",
        visual_916: "Insert envelope, photos visible inside, Thomas goes pale",
        label: "EP. 4: THE REVERSAL",
      },
    },
  },
  {
    mode: "fast",
    modeLabel: "⚡ Vertical Drama",
    genre: "Romance · Dark Drama",
    casting: "Mixed trio",
    setting: "Blended family",
    bible: {
      title: "Our Blood",
      logline: "A woman discovers that her new husband's teenage son is the child she gave up for adoption seventeen years ago.",
      pitch: "Laura rebuilt her life. New husband, new home, a second chance. Until Nathan, 17, the perfect stepson, finds his birth certificate in his father's things. The dates don't lie. Three people. One secret that changes everything. And a question nobody dares ask: can you love someone you chose to abandon?",
      characters: [
        { name: "Laura", age: 36, role: "Stepmother, former nurse", secret: "She gave up a baby at 19. She never spoke of it." },
        { name: "Nathan", age: 17, role: "Stepson, high schooler", secret: "He found the birth certificate. He's waiting for Laura to tell him the truth." },
        { name: "Eric", age: 40, role: "Nathan's father, Laura's husband", secret: "He knows. He arranged everything so Laura and Nathan would find each other." },
      ],
      central_tension: "When lies become family, can the truth still repair anything?",
      episodes: 10,
    },
    script: {
      number: 2,
      title: "The Paper",
      hook_scene: {
        text: "Nathan places a sheet on the table. He says nothing. He waits.",
        visual_916: "Wide shot kitchen table, Nathan's hands, Laura standing in the background",
      },
      scenes: [
        { character: "LAURA", dialogue: "What is this?", acting: "forced smile that freezes", visual_916: "Close-up face, she reads without moving" },
        { character: "NATHAN", dialogue: "You know exactly what it is.", acting: "steady voice, seventeen years of restraint", visual_916: "Face-on camera, arms crossed" },
        { character: "LAURA", dialogue: "Nathan... please, let me explain.", acting: "collapse, tears held back", visual_916: "She sits, chest shot" },
      ],
      cliffhanger_scene: {
        text: "Nathan: \"How long has Eric known?\"",
        visual_916: "Insert half-open door, Eric's shadow in the hallway",
        label: "EP. 3: THE FATHER",
      },
    },
  },
  {
    mode: "fast",
    modeLabel: "⚡ Vertical Drama",
    genre: "K-Drama · Romance",
    casting: "1 Woman + 1 Man",
    setting: "Fashion & Influence",
    bible: {
      title: "False Appearances",
      logline: "A fashion influencer discovers her new boss is the man who stole her designs five years ago — and he doesn't remember her.",
      pitch: "Jade rebuilt everything. Her account, her audience, her reputation. When she lands a contract with luxury brand Volvane, she doesn't yet know that behind the CEO hides the man who stole her creations at 22. He doesn't recognize her. She does. And she'll decide whether revenge is worth more than the truth — or whether, somewhere, she's still in love.",
      characters: [
        { name: "Jade", age: 27, role: "Fashion influencer, ex-designer", secret: "She accepted this contract only for revenge. She has a plan." },
        { name: "Luca", age: 34, role: "Volvane CEO, self-made", secret: "He knows exactly who she is. He's waiting to see what she'll do." },
      ],
      central_tension: "Can you fall in love with someone you came to destroy?",
      episodes: 10,
    },
    script: {
      number: 1,
      title: "The Contract",
      hook_scene: {
        text: "He smiled at me. He didn't recognize me. Perfect.",
        visual_916: "Close-up Jade's eyes, cold smile, glass office behind",
      },
      scenes: [
        { character: "LUCA", dialogue: "Your portfolio is impressive. Welcome to Volvane.", acting: "professional charm, direct gaze", visual_916: "Slight overhead shot, he signs without looking up" },
        { character: "JADE", dialogue: "Thank you. I'll give it everything I have.", acting: "perfect smile, neutral voice", visual_916: "Face-on camera, eyes to lens for a second" },
        { character: "LUCA", dialogue: "Do we know each other? You look familiar.", acting: "genuine curiosity", visual_916: "Slow zoom on him, Jade blurred behind" },
      ],
      cliffhanger_scene: {
        text: "Jade gets home. On her desk: her designs from five years ago — with the Volvane logo.",
        visual_916: "Insert folder, Jade's hands trembling, photo of original contract",
        label: "EP. 2: THE PROOF",
      },
    },
  },
];

const STATS = [
  { val: "5 min", label: "to generate a full series" },
  { val: "90 ep.", label: "maximum per series (Pro plan)" },
  { val: "8", label: "translation languages available" },
];

const track = (event, meta = {}) => fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, meta }) }).catch(() => {});

export default function ExemplesEn() {
  const [active, setActive] = useState(0);
  const ex = EXAMPLES[active];
  const isPremium = ex.mode === "premium";

  useEffect(() => { track("page_view_exemples", { lang: "en" }); }, []);

  return (
    <>
      <Head>
        <title>Generated Series Examples — VerticalClap AI Micro-Drama Studio</title>
        <meta name="description" content="Discover 4 complete series generated by VerticalClap: medical, finance, family, romance. Full bible, characters, scripts and cliffhangers ready to shoot for TikTok and Reels." />
        <link rel="canonical" href={`${SITE}/en/exemples`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}/exemples`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/exemples`} />
        <meta property="og:title" content="Generated Series Examples — VerticalClap" />
        <meta property="og:description" content="4 complete AI-generated micro-dramas: medical, finance, family, romance. Bible, scripts, hooks and cliffhangers for TikTok, Reels and Shorts." />
        <meta property="og:url" content={`${SITE}/en/exemples`} />
        <meta property="og:image" content={`${SITE}/banniere%20EN.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          a { text-decoration: none; color: inherit; }
          input { font-size: 16px !important; }
          .ex-tabs { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
          @media (max-width: 640px) {
            .ex-nav { padding: 12px 16px !important; }
            .ex-header { padding: 48px 16px 0 !important; }
            .ex-stats { flex-direction: column !important; }
            .ex-stats > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
            .ex-stats > div:last-child { border-bottom: none !important; }
            .ex-tabs-wrap { padding: 0 16px 36px !important; }
            .ex-tabs { flex-direction: row !important; overflow-x: auto !important; flex-wrap: nowrap !important; justify-content: flex-start !important; padding-bottom: 4px !important; scrollbar-width: none !important; }
            .ex-tabs::-webkit-scrollbar { display: none !important; }
            .ex-content { padding: 0 16px 60px !important; }
            .ex-cta { padding: 36px 20px !important; }
            .ex-screen { padding: 0 12px 36px !important; }
          }
          @media (max-width: 480px) {
            .ex-header { padding: 40px 14px 0 !important; }
            .ex-content { padding: 0 14px 60px !important; }
          }
          @media (hover: none) {
            button:hover { opacity: 1 !important; }
          }
        `}</style>

        {/* NAV */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
          <nav className="ex-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px", maxWidth: 1100, margin: "0 auto" }}>
            <a href="/en" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
              <img src="/1024.png" alt="VC" style={{ width: 32, height: 32, borderRadius: "50%" }} />
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>VERTICAL</div>
                <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: "-0.02em", background: `linear-gradient(135deg, #ff8c42, ${RED})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CLAP</div>
              </div>
            </a>
            <a href="/tarifs" style={{ background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "10px 22px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none", letterSpacing: 0.2 }}>
              Get started →
            </a>
          </nav>
        </div>

        {/* HEADER */}
        <div className="ex-header" style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 0", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(232,92,58,0.1)`, border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 20, padding: "5px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase" }}>Generated by AI in 30 seconds</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 16, color: TEXT, textTransform: "uppercase" }}>
            4 series ready<br /><span style={{ color: RED }}>to shoot.</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 48px" }}>
            Medical, finance, family, romance — each bible, script and cliffhanger generated in under 30 seconds with VerticalClap.
          </p>

          {/* STATS */}
          <div className="ex-stats" style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 64, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.02)", maxWidth: 560, margin: "0 auto 64px" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "20px 12px", borderRight: i < STATS.length - 1 ? `1px solid ${BORDER}` : "none", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: i === 1 ? VIO : RED, letterSpacing: -1, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: MUTED, marginTop: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SCREENSHOT */}
        <div className="ex-screen" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 56px" }}>
          <img src="/ecran.png" alt="VerticalClap interface" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: `0 0 60px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.5)`, border: `1px solid ${BORDER}` }} />
        </div>

        {/* TABS */}
        <div className="ex-tabs-wrap" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 20 }}>Choose an example</p>
          <div className="ex-tabs">
            {EXAMPLES.map((e, i) => (
              <button key={i} onClick={() => { setActive(i); track("example_tab", { index: i, title: e.title }); }} style={{
                padding: "10px 20px", borderRadius: 100, flexShrink: 0,
                border: `1px solid ${active === i ? RED : BORDER}`,
                background: active === i ? RED : "rgba(255,255,255,0.04)",
                color: active === i ? "#fff" : MUTED,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif", transition: "all .2s",
              }}>
                {e.bible.title}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="ex-content" style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 100px" }}>

          {/* META */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: isPremium ? "rgba(168,85,247,0.12)" : "rgba(232,92,58,0.12)", color: isPremium ? VIO : RED, border: `1px solid ${isPremium ? "rgba(168,85,247,0.3)" : "rgba(232,92,58,0.3)"}`, fontSize: 12, fontWeight: 700 }}>{ex.modeLabel}</span>
            <span style={{ fontSize: 12, color: MUTED, background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: 100, border: `1px solid ${BORDER}` }}>{ex.genre}</span>
            <span style={{ fontSize: 12, color: MUTED }}>{ex.casting} · {ex.setting} · {ex.bible.episodes} episodes</span>
          </div>

          {/* BIBLE */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32, marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${isPremium ? "rgba(168,85,247,0.08)" : "rgba(232,92,58,0.08)"} 0%, transparent 70%)`, pointerEvents: "none" }} />
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 16 }}>📖 The Bible</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 900, color: TEXT, marginBottom: 12, letterSpacing: -1, lineHeight: 1.1 }}>{ex.bible.title}</h2>
            <p style={{ fontSize: 15, fontStyle: "italic", color: MUTED, lineHeight: 1.6, marginBottom: 20, borderLeft: `3px solid ${RED}`, paddingLeft: 16 }}>« {ex.bible.logline} »</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>{ex.bible.pitch}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
              {ex.bible.characters.map((p, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, borderLeft: `3px solid ${i === 0 ? RED : VIO}` }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: TEXT, marginBottom: 4 }}>{p.name}</p>
                  <p style={{ fontSize: 11, color: i === 0 ? RED : VIO, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{p.role} · {p.age}</p>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.55 }}>🔒 {p.secret}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "16px 20px", border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: isPremium ? VIO : RED, textTransform: "uppercase", marginBottom: 8 }}>Central question</p>
              <p style={{ fontSize: 14, fontStyle: "italic", color: TEXT, lineHeight: 1.6 }}>« {ex.bible.central_tension} »</p>
            </div>
          </div>

          {/* SCRIPT */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: 28, marginBottom: 48 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
              <span style={{ background: RED, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>EP. {ex.script.number}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>✍️ {ex.script.title}</span>
            </div>
            <div style={{ background: "rgba(232,92,58,0.08)", border: `1px solid rgba(232,92,58,0.25)`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>⚡ Hook — first 3 seconds</p>
              <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, marginBottom: 8, color: TEXT }}>{ex.script.hook_scene.text}</p>
              <p style={{ fontSize: 11, color: RED, fontStyle: "italic" }}>[9:16] {ex.script.hook_scene.visual_916}</p>
            </div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>Script</p>
            {ex.script.scenes.map((sc, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, borderLeft: `3px solid ${BORDER}`, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: isPremium ? VIO : RED }}>{sc.character}</p>
                  {sc.acting && <span style={{ fontSize: 10, background: "rgba(255,255,255,0.06)", color: MUTED, padding: "2px 8px", borderRadius: 20, fontStyle: "italic" }}>{sc.acting}</span>}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 6, fontWeight: 500, color: TEXT }}>{sc.dialogue}</p>
                <p style={{ fontSize: 11, color: MUTED, fontStyle: "italic" }}>[9:16] {sc.visual_916}</p>
              </div>
            ))}
            <div style={{ background: "rgba(232,92,58,0.06)", borderRadius: 12, padding: 20, marginTop: 8, border: `1px solid rgba(232,92,58,0.2)` }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>🎬 Cliffhanger</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 8, lineHeight: 1.45 }}>{ex.script.cliffhanger_scene.text}</p>
              <p style={{ fontSize: 11, color: RED, fontStyle: "italic", marginBottom: ex.script.cliffhanger_scene.label ? 14 : 0 }}>[9:16] {ex.script.cliffhanger_scene.visual_916}</p>
              {ex.script.cliffhanger_scene.label && (
                <span style={{ display: "inline-block", background: RED, borderRadius: 6, padding: "6px 14px", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: 1.5, textTransform: "uppercase" }}>{ex.script.cliffhanger_scene.label}</span>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="ex-cta" style={{ textAlign: "center", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 24, padding: "48px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 16 }}>Ready to create your series?</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: TEXT, letterSpacing: -1, marginBottom: 12, textTransform: "uppercase", lineHeight: 1.1 }}>
              Your first series<br /><span style={{ color: RED }}>in 5 minutes.</span>
            </h2>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 32, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 32px" }}>
              Full bible, scripts ready to shoot, hooks and cliffhangers — all generated in under 5 minutes.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "16px 36px", borderRadius: 14, fontWeight: 800, fontSize: 15, textDecoration: "none", letterSpacing: -0.2, boxShadow: `0 0 32px rgba(168,85,247,0.3)` }}>
                Start creating →
              </a>
              <a href="/tarifs" style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", color: MUTED, padding: "16px 28px", borderRadius: 14, fontWeight: 600, fontSize: 14, textDecoration: "none", border: `1px solid ${BORDER}` }}>
                View pricing
              </a>
            </div>
            <p style={{ fontSize: 12, color: MUTED, marginTop: 20, opacity: 0.7 }}>From €9/month · No commitment · Cancel anytime</p>
          </div>
        </div>
      </div>
    </>
  );
}
