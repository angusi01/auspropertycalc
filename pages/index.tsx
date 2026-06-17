import Link from 'next/link';
import { calculatorSlugs, calculators } from '../lib/calculators';

export default function Home() {
  return (
    <main className="page">
      <section className="hero split">
        <div>
          <h1>Australian property calculators for quick planning.</h1>
          <p>Run common purchase, borrowing, tax, yield, and depreciation estimates from transparent local configuration.</p>
        </div>
        <div className="visual-panel">
          <span>$800k</span>
          <span>80% LVR</span>
          <span>4.96% yield</span>
        </div>
      </section>
      <section className="link-grid">
        {calculatorSlugs.map((slug) => (
          <Link href={`/${slug}`} key={slug} className="calc-card">
            <h2>{calculators[slug].title}</h2>
            <p>{calculators[slug].description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
