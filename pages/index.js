import Head from "next/head";
import RichLandingPage from "../components/RichLandingPage";
export default function Home() {
  return (
    <>
      <Head>
        <title>VerticalClap — Micro-dramas 9:16 générés par l'IA</title>
        <meta name="description" content="Génère une série complète en 5 minutes : bible, scripts, hooks et cliffhangers prêts à tourner. Pour TikTok, Reels, Shorts et DramaBox." />
        <link rel="canonical" href="https://verticalclap.com" />
        <link rel="alternate" hrefLang="fr" href="https://verticalclap.com" />
        <link rel="alternate" hrefLang="en" href="https://verticalclap.com/en" />
        <meta property="og:image" content="https://verticalclap.com/hero.png" />
      </Head>
      <RichLandingPage lang="fr" />
    </>
  );
}
