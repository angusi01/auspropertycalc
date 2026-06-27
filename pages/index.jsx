import Link from 'next/link';
import Head from 'next/head';
import { EmailCapture } from '../components/EmailCapture';
import { calculatorSlugs, calculators } from '../lib/calculators';

const iconNames = {
  'stamp-duty': 'Home',
  'borrowing-capacity': 'Banknote',
  lvr: 'Percent',
  cgt: 'TrendingUp',
  'rental-yield': 'BarChart',
  depreciation: 'Calculator',
};

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
  const paths = {
    Home: [<path key="1" d="m3 10 9-7 9 7" />, <path key="2" d="M5 10v10h14V10" />, <path key="3" d="M9 20v-6h6v6" />],
    Banknote: [<rect key="1" x="3" y="6" width="18" height="12" rx="2" />, <circle key="2" cx="12" cy="12" r="2" />, <path key="3" d="M7 12h.01M17 12h.01" />],
    Percent: [<path key="1" d="m19 5-14 14" />, <circle key="2" cx="7" cy="7" r="2" />, <circle key="3" cx="17" cy="17" r="2" />],
    TrendingUp: [<path key="1" d="m3 17 6-6 4 4 8-8" />, <path key="2" d="M14 7h7v7" />],
    BarChart: [<path key="1" d="M3 3v18h18" />, <path key="2" d="M7 16v-5" />, <path key="3" d="M12 16V8" />, <path key="4" d="M17 16v-3" />],
    Calculator: [<rect key="1" x="4" y="2" width="16" height="20" rx="2" />, <path key="2" d="M8 6h8" />, <path key="3" d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />],
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Australian Property Calculators | AusPropertyCalc</title>
        <meta name="description" content="Free Australian stamp duty, borrowing capacity, LVR, rental yield, capital gains tax, and capital works calculators." />
      </Head>
      <main>
      <section className="property-hero">
        <div>
          <h1>Plan your next property move with clear Australian numbers.</h1>
          <p>AusPropertyCalc brings stamp duty, borrowing capacity, LVR, rental yield, depreciation, and capital gains estimates into one calm planning workspace.</p>
          <div className="hero-actions">
            <Link href="/stamp-duty" className="primary-link">GET STARTED</Link>
            <Link href="#calculators" className="secondary-link">View calculators</Link>
          </div>
        </div>
        <div className="visual-panel">
          <div className="panel-head">
            <span>Guided Calculator</span>
            <small>Updated 2026</small>
          </div>
          <span><small>Purchase budget</small>$800,000</span>
          <span><small>Estimated duty</small>$30,412</span>
          <span><small>Loan position</small>80% LVR</span>
        </div>
      </section>
      <section className="goal-section">
        <div>
          <h2>Choose a goal, then run the numbers.</h2>
          <p>Start with the question you need answered. Each calculator keeps the path focused and the result easy to compare.</p>
        </div>
        <div className="goal-grid">
          <span>Buying a home</span>
          <span>Testing borrowing power</span>
          <span>Checking investment returns</span>
          <span>Planning a sale</span>
        </div>
      </section>
      <section id="calculators" className="calculator-grid-section">
        <div className="section-heading">
          <h2>Calculators</h2>
          <p>Line-by-line estimates for common Australian property decisions.</p>
        </div>
        <div className="link-grid">
          {calculatorSlugs.map((slug) => (
            <Link href={`/${slug === 'lvr' ? 'lvr-lmi' : slug}`} key={slug} className="calc-card">
              <span className="icon-box"><Icon name={iconNames[slug]} /></span>
              <h2>{calculators[slug].title}</h2>
              <p>{calculators[slug].description}</p>
              <strong>Open calculator</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="email-band">
        <h2>Stay current when assumptions change.</h2>
        <p>One email when major Australian property settings are updated.</p>
        <EmailCapture />
        <small>No spam. Unsubscribe any time.</small>
      </section>
      </main>
    </>
  );
}
