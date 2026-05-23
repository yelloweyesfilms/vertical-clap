import { useState } from "react";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f1f5f9";
const MUTED = "#94a3b8";

const EXAMPLES = [
  {
    mode: "fast",
    modeLabel: "⚡ Vertical Drama",
    casting: "1 Woman + 1 Man",
    setting: "Private hospital",
    secret: "Double life",
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
    casting: "2 Men",
    setting: "International finance",
    secret: "Internal sabotage",
    bible: {
      title: "The Heir",
      logline: "Two founding partners of an investment fund — one is secretly staging a hostile takeover of the other's family company.",
      pitch: "Thomas and Karim built everything together. Fifteen years of friendship, a hundred million under management, an office on the 32nd floor. But Thomas knows something Karim doesn't: the fund they run is secretly buying out Karim's family business. In 72 hours, Karim will lose everything. And he'll have to decide whether he can still trust the man who orchestrated it all.",
      characters: [
        { name: "Thomas", age: 44, role: "Managing partner, strategist", secret: "He's sabotaging Karim on orders from a foreign investor — or he'll die." },
        { name: "Karim", age: 41, role: "Operational partner, heir", secret: "He's already discovered part of the plan. He's waiting to see how far Thomas will go." },
      ],
      central_tension: "Between betrayal and survival — which of them is really the victim?",
      episodes: 10,
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
    casting: "Mixed trio",
    setting: "Blended family",
    secret: "Hidden child",
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
];

export default function ExemplesEn() {
  const [active, setActive] = useState(0);
  const ex = EXAMPLES[active];
  const isPremium = ex.mode === "premium";

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: TEXT, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* NAV */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", maxWidth: 1100, margin: "0 auto" }}>
          <a href="/en" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 900, color: TEXT, letterSpacing: -0.5 }}>
            ← VerticalClap
          </a>
          <a href="/app" style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>Sign in →</a>
        </nav>
      </div>

      {/* HEADER */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 0", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: RED, textTransform: "uppercase", marginBottom: 16 }}>Generated examples</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 16, color: TEXT }}>
          3 series ready to shoot
        </h1>
        <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
          Medical, finance, family — each series generated in under 30 seconds.
        </p>
      </div>

      {/* VISUAL */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 48px" }}>
        <img src="/ecran.png" alt="Example series" style={{ width: "100%", display: "block", borderRadius: 20, boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.5)" }} />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}>
        {/* TABS */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          {EXAMPLES.map((e, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: "10px 22px", borderRadius: 100,
              border: `1px solid ${active === i ? RED : BORDER}`,
              background: active === i ? RED : "rgba(255,255,255,0.04)",
              color: active === i ? "#fff" : MUTED,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif", transition: "all .2s",
            }}>
              {e.bible.title}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 100px" }}>

        {/* MODE + META */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
          <span style={{
            display: "inline-block", padding: "5px 14px", borderRadius: 100,
            background: isPremium ? "rgba(168,85,247,0.12)" : "rgba(232,92,58,0.12)",
            color: isPremium ? VIO : RED,
            border: `1px solid ${isPremium ? "rgba(168,85,247,0.3)" : "rgba(232,92,58,0.3)"}`,
            fontSize: 12, fontWeight: 700,
          }}>{ex.modeLabel}</span>
          <span style={{ fontSize: 13, color: MUTED }}>{ex.casting}</span>
          <span style={{ fontSize: 13, color: BORDER }}>·</span>
          <span style={{ fontSize: 13, color: MUTED }}>{ex.setting}</span>
          <span style={{ fontSize: 13, color: BORDER }}>·</span>
          <span style={{ fontSize: 13, color: MUTED }}>{ex.bible.episodes} episodes</span>
        </div>

        {/* BIBLE */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "32px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${isPremium ? "rgba(168,85,247,0.08)" : "rgba(232,92,58,0.08)"} 0%, transparent 70%)`, pointerEvents: "none" }} />
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 16 }}>The Bible</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 900, color: TEXT, marginBottom: 12, letterSpacing: -0.5, lineHeight: 1.1 }}>{ex.bible.title}</h2>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontStyle: "italic", color: MUTED, lineHeight: 1.6, marginBottom: 20 }}>« {ex.bible.logline} »</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 28 }}>{ex.bible.pitch}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
            {ex.bible.characters.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, borderLeft: `3px solid ${i === 0 ? RED : VIO}` }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontSize: 11, color: i === 0 ? RED : VIO, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{p.role} · {p.age}</p>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.55 }}>🔒 {p.secret}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "16px 20px", border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: isPremium ? VIO : RED, textTransform: "uppercase", marginBottom: 8 }}>Central question</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontStyle: "italic", color: TEXT, lineHeight: 1.6 }}>« {ex.bible.central_tension} »</p>
          </div>
        </div>

        {/* SCRIPT */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "28px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <span style={{ background: RED, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>EP. {ex.script.number}</span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: TEXT }}>{ex.script.title}</span>
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
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <p style={{ color: MUTED, fontSize: 14, marginBottom: 24 }}>Generate your own series in under 30 seconds.</p>
          <a href="/en#tarifs" style={{ display: "inline-block", background: `linear-gradient(135deg, ${RED}, ${VIO})`, color: "#fff", padding: "16px 40px", borderRadius: 14, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: -0.2 }}>Get started →</a>
        </div>
      </div>
    </div>
  );
}
