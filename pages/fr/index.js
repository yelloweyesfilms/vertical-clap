import Head from "next/head";
import LandingPage from "../../components/LandingPage";
import { CONTENT } from "../../lib/content";

export default function HomeFr() {
  return (
    <>
      <Head>
        <title>{CONTENT.fr.meta.title}</title>
        <meta name="description" content={CONTENT.fr.meta.description} />
        <link rel="alternate" hrefLang="en" href="https://verticalclap.com" />
        <link rel="alternate" hrefLang="fr" href="https://verticalclap.com/fr" />
        <link rel="canonical" href="https://verticalclap.com/fr" />
      </Head>
      <LandingPage lang="fr" />
    </>
  );
}
