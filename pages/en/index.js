import Head from "next/head";
import LandingPage from "../../components/LandingPage";
import { CONTENT } from "../../lib/content";

export default function HomeEn() {
  return (
    <>
      <Head>
        <title>{CONTENT.en.meta.title}</title>
        <meta name="description" content={CONTENT.en.meta.description} />
        <link rel="alternate" hrefLang="fr" href="https://verticalclap.com" />
        <link rel="alternate" hrefLang="en" href="https://verticalclap.com/en" />
        <link rel="canonical" href="https://verticalclap.com/en" />
      </Head>
      <LandingPage lang="en" />
    </>
  );
}
