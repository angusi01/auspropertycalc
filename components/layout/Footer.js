import Link from 'next/link';
import { calculatorSlugs, calculators } from '../../lib/calculators';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <section>
          <h2 className="footer-brand">AusPropertyCalc</h2>
          <p>Free Australian property calculators for practical planning.</p>
        </section>
        <section>
          <h2>Calculators</h2>
          {calculatorSlugs.map((slug) => (
            <Link key={slug} href={`/${slug === 'lvr' ? 'lvr-lmi' : slug}`}>{calculators[slug].title.replace(' Calculator', '')}</Link>
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
      <div className="footer-bottom">© 2026 AusPropertyCalc Australia</div>
    </footer>
  );
}
