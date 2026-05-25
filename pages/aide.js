import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

const RED = "#E85C3A";
const VIO = "#a855f7";
const DARK = "#09090f";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, userSelect: "none" }}>
    <img src="/1024.png" alt="VC" style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 12px rgba(232,92,58,0.35)" }} onError={e => { e.target.style.display = "none"; }} />
    <div style={{ alignSelf: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>VERTICAL</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: -0.5, background: "linear-gradient(135deg, #ff8c42, #E85C3A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>CLAP</div>
    </div>
  </div>
);

const STEPS = [
  { emoji: "💡", label: "IDÉE", desc: "Choisis ton genre, budget, univers, casting et secret central" },
  { emoji: "📖", label: "BIBLE", desc: "L'IA génère le concept complet : titre, logline, personnages, tension" },
  { emoji: "🎬", label: "ÉPISODES", desc: "La série entière est planifiée automatiquement (10 à 90 épisodes)" },
  { emoji: "✍️", label: "SCRIPT", desc: "Génère le script de chaque épisode, modifie-le (pimenter, simplifier...)" },
  { emoji: "🎥", label: "TOURNAGE", desc: "Checklist de tournage, storyboard, export PDF" },
];

const BUDGETS = [
  { emoji: "📱", label: "Smartphone", desc: "1 lieu, seul·e, tension pure.", refs: "Cohérence, Locke" },
  { emoji: "🎬", label: "Mini-équipe", desc: "2-4 persos, lieux variés, petite équipe", refs: null },
  { emoji: "🚀", label: "Ambitieux", desc: "Production complète, aucune limite", refs: null },
];

const FAQS = [
  {
    q: "Combien de temps pour générer une série ?",
    a: "30 secondes pour la bible, 1-2 min pour les épisodes, quelques secondes par script.",
  },
  {
    q: "Le script ne correspond pas à ce que j'imaginais ?",
    a: "Utilise les boutons Pimenter / Subtil / Simplifier dans le Studio. Tu peux aussi relancer la génération ou modifier le casting et les tropes avant de regénérer.",
  },
  {
    q: "Je peux créer en plusieurs langues ?",
    a: "Oui — bouton EN/FR en haut de l'app pour changer la langue de l'interface et des scripts générés. Tu peux aussi traduire un script existant directement depuis le Studio.",
  },
  {
    q: "C'est quoi les Codes Narratifs ?",
    a: "Les tropes : les ressorts dramatiques de ta série. Ex : 'Revenge body', 'Secret de famille', 'Faux couple'. Choisis-en 1 ou 2 max — ils orientent l'IA vers le type de tension que tu veux.",
  },
  {
    q: "Comment exporter mon script ?",
    a: "Dans le Studio, bouton 'Exporter PDF' en bas. Le PDF inclut hook, dialogues, cliffhanger et les instructions de tournage 9:16.",
  },
  {
    q: "Quelle durée par épisode choisir ?",
    a: "60s = format TikTok pur (130-150 mots). 90s = DramaBox / Reels (200-225 mots). 120s = YouTube Shorts / format cinéma mobile (270-300 mots).",
  },
  {
    q: "La série est sauvegardée automatiquement ?",
    a: "Oui — chaque série générée est sauvegardée localement sur ton appareil. Retrouve-les depuis l'écran d'accueil avec le bouton 'Mes séries'.",
  },
  {
    q: "Différence plan Créateur vs Premium ?",
    a: "Créateur : jusqu'à 20 épisodes, fonctionnalités essentielles. Premium : jusqu'à 90 épisodes, casting avancé, identité visuelle, storyboard et variations de scripts.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #2a2a40",
        cursor: "pointer",
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        gap: 12,
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.4,
          flex: 1,
        }}>{q}</span>
        <span style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.4)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          flexShrink: 0,
        }}>›</span>
      </div>
      {open && (
        <div style={{
          paddingBottom: 16,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.6,
        }}>{a}</div>
      )}
    </div>
  );
}

export default function Aide() {
  return (
    <>
      <Head>
        <title>Mode d'emploi — Vertical Clap</title>
        <meta name="description" content="Guide complet pour créer ta première série verticale avec Vertical Clap : étapes, budgets, FAQ et conseils." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{
        background: DARK,
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {/* Header */}
        <header style={{
          borderBottom: "1px solid #2a2a40",
          padding: "16px 20px",
        }}>
          <div style={{
            maxWidth: 680,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <Logo />
            <Link href="/app" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              letterSpacing: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              ← Retour à l&apos;app
            </Link>
          </div>
        </header>

        <main style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 60px" }}>

          {/* Hero */}
          <section style={{ padding: "48px 0 40px", textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              background: `rgba(232,92,58,0.12)`,
              border: `1px solid rgba(232,92,58,0.3)`,
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 700,
              color: RED,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 20,
            }}>Guide</div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 8vw, 48px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              margin: "0 0 16px",
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
            }}>Mode d&apos;emploi</h1>
            <p style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
            }}>Tout ce qu&apos;il faut savoir pour créer ta première série</p>
          </section>

          {/* Les 5 étapes */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 20,
              color: "#fff",
            }}>Les 5 étapes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{
                  background: "#13131e",
                  border: "1px solid #2a2a40",
                  borderRadius: 16,
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: RED,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#fff",
                    flexShrink: 0,
                    boxShadow: `0 0 14px rgba(232,92,58,0.35)`,
                  }}>{i + 1}</div>
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      color: RED,
                      marginBottom: 4,
                    }}>{step.emoji} {step.label}</div>
                    <div style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.5,
                    }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mixeur vs Packs */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 20,
              color: "#fff",
            }}>Mixeur vs Packs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{
                background: "#13131e",
                border: `1px solid rgba(232,92,58,0.3)`,
                borderRadius: 16,
                padding: "20px 16px",
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>🎛️</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: RED, marginBottom: 8 }}>Mixeur</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  Tu configures toi-même genre, casting, univers, budget, tropes
                </div>
              </div>
              <div style={{
                background: "#13131e",
                border: `1px solid rgba(168,85,247,0.3)`,
                borderRadius: 16,
                padding: "20px 16px",
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>🎯</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: VIO, marginBottom: 8 }}>Packs</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  1 clic — tout est déjà configuré, idéal pour démarrer vite
                </div>
              </div>
            </div>
          </section>

          {/* Les budgets */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 20,
              color: "#fff",
            }}>Les budgets</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BUDGETS.map((b, i) => (
                <div key={i} style={{
                  background: "#13131e",
                  border: "1px solid #2a2a40",
                  borderRadius: 14,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{b.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                      {b.desc}
                      {b.refs && (
                        <span style={{ color: "rgba(255,255,255,0.35)", display: "block", marginTop: 2 }}>
                          Réf : {b.refs}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 8,
              color: "#fff",
            }}>FAQ</h2>
            <div style={{ borderTop: "1px solid #2a2a40" }}>
              {FAQS.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #2a2a40",
          padding: "24px 20px",
          textAlign: "center",
        }}>
          <a
            href="https://verticalclap.com/app"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: RED,
              textDecoration: "none",
            }}
          >
            → Aller sur verticalclap.com/app
          </a>
          <div style={{
            marginTop: 12,
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
          }}>© 2025 Vertical Clap</div>
        </footer>
      </div>
    </>
  );
}
