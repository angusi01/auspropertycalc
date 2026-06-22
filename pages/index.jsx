import Link from 'next/link';
import { EmailCapture } from '../components/EmailCapture';
import { calculatorSlugs, calculators } from '../lib/calculators';

export default function Home() {
  return (
    <main className="page">
      {/* Hero */}
      <section className="hero split">
        <div>
          <p style={{fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5, marginBottom:'8px'}}>Free · Australian-specific · No signup</p>
          <h1>Australian Property Calculators</h1>
          <p>Free, instant, and updated for 2026 rates. Used by over 12,000 Australians to run the numbers before making a property decision.</p>
          <div className="stats-bar" style={{marginTop:'16px'}}>
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

      {/* Calculator grid */}
      <section className="link-grid">
        {calculatorSlugs.map((slug) => (<Link href={`/${slug}`} key={slug} className="calc-card">
            <h2>{calculators[slug].title}</h2>
            <p>{calculators[slug].description}</p>
            <span>Open calculator</span>
          </Link>))}
      </section>

      {/* Broker referral CTA */}
      <section style={{background:'#1a2a4a', color:'#fff', padding:'48px 24px', textAlign:'center'}}>
        <div style={{maxWidth:'640px', margin:'0 auto'}}>
          <p style={{fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em', opacity:0.5, marginBottom:'8px'}}>Ready to move forward?</p>
          <h2 style={{fontSize:'1.8rem', marginBottom:'12px'}}>Need help making it happen?</h2>
          <p style={{opacity:0.7, marginBottom:'24px', lineHeight:1.6}}>Once you’ve run the numbers, the next step is talking to a broker. We can connect you with a fee-free Australian mortgage broker who specialises in investor and first-home buyer finance.</p>
          <a
            href="mailto:brokers@auspropertycalc.com.au?subject=Broker referral request"
            style={{display:'inline-block', background:'#f59e0b', color:'#111', padding:'14px 32px', borderRadius:'8px', fontWeight:700, textDecoration:'none', fontSize:'1rem'}}
          >
            Get a free broker introduction
          </a>
          <p style={{fontSize:'0.78rem', opacity:0.4, marginTop:'12px'}}>No obligation. Fee-free brokers only. We may receive a referral fee.</p>
        </div>
      </section>

      {/* Email capture */}
      <section className="explanation-section">
        <h2>Get notified when rates change</h2>
        <p style={{opacity:0.6, marginBottom:'16px', maxWidth:'480px'}}>We update all calculators when stamp duty thresholds, RBA rates, or LMI tables change. Enter your email and we’ll let you know — no spam, unsubscribe any time.</p>
        <EmailCapture />
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid rgba(0,0,0,0.08)', padding:'32px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px', fontSize:'0.85rem', opacity:0.6}}>
        <span>© 2026 AusPropertyCalc. Results are estimates only.</span>
        <div style={{display:'flex', gap:'24px'}}>
          <Link href="/methodology">Methodology</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </footer>
    </main>
  );
}
