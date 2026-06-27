import Link from 'next/link';
import Head from 'next/head';
import { calculatorSlugs, calculators } from '../lib/calculators';

function relatedCalculators(title) {
  return calculatorSlugs
    .filter((slug) => calculators[slug].title !== title)
    .slice(0, 3);
}

function SmallIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-7" /></svg>;
}

export function CalculatorLayout({ title, description, children }) {
    const related = relatedCalculators(title);
    return (<>
      <Head>
        <title>{title} | AusPropertyCalc</title>
        <meta name="description" content={description} />
      </Head>
      <main className="calculator-page">
      <section className="calculator-hero">
        <div>
          <p className="breadcrumb"><Link href="/">Home</Link> / Calculators / {title}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="calculator-shell">{children}</section>
      <section className="below-form">
        <article>
          <h3>About this calculator</h3>
          <p>Use this estimate as a planning guide before speaking with a licensed financial, tax, or legal adviser. The inputs are simplified so you can compare scenarios quickly without creating an account.</p>
          <p>Calculator assumptions are reviewed against current Australian property rules and common lender settings, but your final outcome can vary based on state rules, lender policy, income verification, exemptions, timing, and personal circumstances.</p>
        </article>
        <div className="related-divider" />
        <article>
          <h3>Related calculators</h3>
          <div className="related-grid">
            {related.map((slug) => (
              <Link key={slug} href={`/${slug === 'lvr' ? 'lvr-lmi' : slug}`}>
                <SmallIcon />
                <strong>{calculators[slug].title}</strong>
                <span>Open</span>
              </Link>
            ))}
          </div>
        </article>
      </section>
      </main>
    </>);
}
