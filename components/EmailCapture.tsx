import { FormEvent, useState } from 'react';
import posthog from 'posthog-js';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('loading');
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      posthog.capture('newsletter_subscribed', { product: 'auspropertycalc' });
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  return (
    <form className="email-capture" onSubmit={submit}>
      <label htmlFor="email">Get property updates</label>
      <div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          Subscribe
        </button>
      </div>
      {status === 'success' && <p>Subscribed.</p>}
      {status === 'error' && <p>Could not subscribe. Check the email and try again.</p>}
    </form>
  );
}
