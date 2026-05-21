import Head from "next/head";
import RichLandingPage from "../../components/RichLandingPage";
export default function HomeEn() {
  return (
    <>
      <Head>
        <title>VerticalClap — AI-generated 9:16 micro-dramas</title>
        <meta name="description" content="Generate a complete series in 5 minutes: bible, scripts, hooks and cliffhangers ready to shoot. For TikTok, Reels, Shorts and DramaBox." />
        <link rel="canonical" href="https://verticalclap.com/en" />
        <link rel="alternate" hrefLang="fr" href="https://verticalclap.com" />
        <link rel="alternate" hrefLang="en" href="https://verticalclap.com/en" />
        <meta property="og:image" content="https://verticalclap.com/banniere%20hero.png" />
      </Head>
      <RichLandingPage lang="en" />
    </>
  );
}
