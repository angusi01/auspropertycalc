import Link from 'next/link';
import { EmailCapture } from '../components/EmailCapture';
import { calculatorSlugs, calculators } from '../lib/calculators';
export default function Home() {
    return (<main className="page">
      <section className="hero split">
        <div>
          <h1>Australian Property Calculators</h1>
          <p>Free, instant, and updated for 2026 rates. No signup, no spam - just answers.</p>
          <div className="stats-bar">
            <span>Updated for 2026</span>
            <span>Australian-specific</span>
            <span>No signup required</span>
          </div>
        </div>
        <div className="visual-panel">
          <span><small>Purchase example</small>$800k</span>
          <span><small>Target leverage</small>80% LVR</span>
          <span><small>Rental benchmark</small>4.96% yield</span>
        </div>
      </section>
      <section className="link-grid">
        {calculatorSlugs.map((slug) => (<Link href={`/${slug}`} key={slug} className="calc-card">
            <h2>{calculators[slug].title}</h2>
            <p>{calculators[slug].description}</p>
            <span>Open calculator</span>
          </Link>))}
      </section>
      <section className="explanation-section">
        <h2>Get updates when rates change</h2>
        <EmailCapture />
      </section>
    </main>);
}
