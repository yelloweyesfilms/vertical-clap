import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
          }
        `}} />
      </body>
    </Html>
  );
}
