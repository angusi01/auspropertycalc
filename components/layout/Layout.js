import Link from 'next/link';
import { Footer } from './Footer';
import { calculatorSlugs, calculators } from '../../lib/calculators';

export function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">AusPropertyCalc</Link>
        <nav>
          <details className="nav-menu">
            <summary>Calculators</summary>
            <div>
              {calculatorSlugs.map((slug) => (
                <Link key={slug} href={`/${slug}`}>{calculators[slug].title}</Link>
              ))}
            </div>
          </details>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>
      {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
        <div className="ad-slot">Advertisement</div>
      )}
      {children}
      <Footer />
    </>
  );
}
