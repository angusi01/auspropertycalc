import Link from 'next/link';
import { Footer } from './Footer';

export function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">AusPropertyCalc</Link>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/#calculators">Calculators</Link>
          <Link className="nav-cta" href="/stamp-duty">GET STARTED</Link>
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
