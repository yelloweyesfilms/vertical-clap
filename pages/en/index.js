import Head from "next/head";
import RichLandingPage from "../../components/RichLandingPage";

const SITE = "https://verticalclap.com";

export default function HomeEn() {
  return (
    <>
      <Head>
        <title>VerticalClap — Create 9:16 micro-dramas in 5 minutes with AI</title>
        <meta name="description" content="Generate a complete series in 5 minutes: bible, scripts, hooks and cliffhangers ready to shoot. For TikTok, Reels, Shorts and DramaBox. AI studio for content creators." />
        <link rel="preload" as="image" href="/poster-hero-sm.webp" />
        <link rel="canonical" href={`${SITE}/en`} />
        <link rel="alternate" hrefLang="fr" href={SITE} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en`} />
        <link rel="alternate" hrefLang="x-default" href={SITE} />
        <meta property="og:title" content="VerticalClap — Create 9:16 micro-dramas in 5 minutes with AI" />
        <meta property="og:description" content="Generate a complete series in 5 minutes: bible, scripts, hooks and cliffhangers ready to shoot. For TikTok, Reels, Shorts and DramaBox." />
        <meta property="og:url" content={`${SITE}/en`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={`${SITE}/banniere%20EN.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VerticalClap — AI Studio for vertical micro-dramas" />
        <meta name="twitter:title" content="VerticalClap — Create 9:16 micro-dramas in 5 minutes with AI" />
        <meta name="twitter:description" content="Generate a complete series in 5 minutes. Bible, scripts, hooks, cliffhangers. For TikTok, Reels, Shorts and DramaBox." />
      </Head>
      <RichLandingPage lang="en" />
    </>
  );
}
