import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { Space_Grotesk, Playfair_Display } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sg',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-pd',
  display: 'swap',
});

const SITE = "https://verticalclap.com";
const TITLE = "VerticalClap — Génère tes micro-dramas 9:16 en 5 minutes avec l'IA";
const DESC = "Crée des séries complètes pour TikTok, Reels, Shorts et DramaBox : bible, scripts, hooks et cliffhangers prêts à tourner. Essai gratuit.";
const OG_IMAGE = `${SITE}/banniere%20hero.png`;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.asPath.split("?")[0];
  const isEn = path.startsWith("/en");
  const canonicalUrl = `${SITE}${path === "/" ? "" : path}`;
  const frPath = isEn ? path.replace(/^\/en/, "") || "/" : path;
  const enPath = isEn ? path : `/en${path === "/" ? "" : path}`;

  return (
    <div className={`${spaceGrotesk.variable} ${playfair.variable}`}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VerticalClap" />
        <meta name="theme-color" content="#09090f" />
        <meta name="msapplication-TileColor" content="#09090f" />
        <meta name="msapplication-TileImage" content="/windows/Square150x150Logo.scale-200.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/ios/120.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />

        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="micro-drama, vertical drama, 9:16, TikTok, Reels, Shorts, DramaBox, ReelShort, scénario IA, script série, générateur série, créateur contenu" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="fr" href={`${SITE}${frPath === "/" ? "" : frPath}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}${enPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}${frPath === "/" ? "" : frPath}`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VerticalClap — Studio IA pour micro-dramas verticaux" />
        <meta property="og:locale" content={isEn ? "en_US" : "fr_FR"} />
        <meta property="og:locale:alternate" content={isEn ? "fr_FR" : "en_US"} />
        <meta property="og:site_name" content="VerticalClap" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@verticalclap" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="VerticalClap — Studio IA pour micro-dramas verticaux" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "VerticalClap",
          "description": DESC,
          "url": SITE,
          "applicationCategory": "CreativeApplication",
          "operatingSystem": "Web, iOS, Android",
          "inLanguage": ["fr", "en"],
          "offers": [
            { "@type": "Offer", "price": "9", "priceCurrency": "EUR", "name": "Creator", "description": "Vertical Drama · micro-drama 9:16 avec IA, 20 épisodes par série" },
            { "@type": "Offer", "price": "19", "priceCurrency": "EUR", "name": "Storyteller", "description": "Vertical Drama + Série Premium, 90 épisodes, Direction Artistique, 3 variations par script" },
          ],
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5" },
          "publisher": { "@type": "Organization", "name": "VerticalClap", "url": SITE, "logo": `${SITE}/1024.png` },
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "VerticalClap",
          "url": SITE,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE}/exemples?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }) }} />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
