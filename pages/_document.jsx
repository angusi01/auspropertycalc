import { Head, Html, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang="en-AU">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        {/* Google AdSense - replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
