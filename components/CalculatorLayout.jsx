import { EmailCapture } from './EmailCapture';
export function CalculatorLayout({ title, description, children }) {
    return (<main className="page calculator-page">
      <section className="hero">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="calculator-shell">{children}</section>
      <EmailCapture />
      <section className="explanation-section">
        <h2>How to use this estimate</h2>
        <p>
          Enter realistic values and use the result as a planning guide before speaking with a licensed adviser.
          The assumptions are kept in local configuration so they can be reviewed and updated as rules change.
        </p>
      </section>
    </main>);
}
