import Head from "next/head";
import RichLandingPage from "../components/RichLandingPage";

const SITE = "https://verticalclap.com";

export default function Home() {
  return (
    <>
      <Head>
        <title>VerticalClap — Crée tes micro-dramas 9:16 en 5 minutes avec l'IA</title>
        <meta name="description" content="Génère une série complète en 5 minutes : bible, scripts, hooks et cliffhangers prêts à tourner. Pour TikTok, Reels, Shorts et DramaBox. Studio IA pour créateurs de contenu." />
        <link rel="canonical" href={SITE} />
        <link rel="alternate" hrefLang="fr" href={SITE} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en`} />
        <link rel="alternate" hrefLang="x-default" href={SITE} />
        <meta property="og:title" content="VerticalClap — Crée tes micro-dramas 9:16 en 5 minutes avec l'IA" />
        <meta property="og:description" content="Génère une série complète en 5 minutes : bible, scripts, hooks et cliffhangers prêts à tourner. Pour TikTok, Reels, Shorts et DramaBox." />
        <meta property="og:url" content={SITE} />
        <meta property="og:image" content={`${SITE}/banniere%20hero.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VerticalClap — Studio IA pour micro-dramas verticaux" />
        <meta name="twitter:title" content="VerticalClap — Crée tes micro-dramas 9:16 en 5 minutes avec l'IA" />
        <meta name="twitter:description" content="Génère une série complète en 5 minutes. Bible, scripts, hooks, cliffhangers. Pour TikTok, Reels, Shorts et DramaBox." />
      </Head>
      <RichLandingPage lang="fr" />
    </>
  );
}
