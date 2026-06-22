import Link from 'next/link';
import { calculatorSlugs, calculators } from '../../lib/calculators';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <section>
          <h2>Calculators</h2>
          {calculatorSlugs.map((slug) => (
            <Link key={slug} href={`/${slug}`}>{calculators[slug].title}</Link>
          ))}
        </section>
        <section>
          <h2>Resources</h2>
          <Link href="/blog">Blog</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </section>
        <section>
          <h2>Legal</h2>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </section>
      </div>
      <div className="footer-bottom">© 2026 AusPropertyCalc. All rights reserved.</div>
    </footer>
  );
}
