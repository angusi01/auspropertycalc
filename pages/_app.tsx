import type { AppProps } from 'next/app';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useEffect } from 'react';
import { CookieConsent } from '../components/CookieConsent';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        opt_out_capturing_by_default: true,
        capture_pageview: true,
      });
    }
  }, []);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">AusPropertyCalc</Link>
        <nav>
          <Link href="/blog/first-post">Blog</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>
      {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
        <div className="ad-slot">Advertisement</div>
      )}
      <Component {...pageProps} />
      <footer className="site-footer">General information only. Not financial, tax, or legal advice.</footer>
      <CookieConsent />
    </>
  );
}
