import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import posthog from 'posthog-js';

const schema = z.object({
    email: z.string().email('Enter a valid email'),
});

export function EmailCapture() {
    const [status, setStatus] = useState('idle');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    async function submit(values) {
        setStatus('loading');
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: values.email }),
        });
        if (response.ok) {
            posthog.capture('newsletter_subscribed', { product: 'auspropertycalc' });
            setStatus('success');
        }
        else {
            setStatus('error');
        }
    }
    return (<form className="email-capture" onSubmit={handleSubmit(submit)}>
      <label htmlFor="email">Get property updates</label>
      <div>
        <input id="email" type="email" placeholder="you@example.com" required {...register('email')}/>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {errors.email && <p className="error-text">{errors.email.message}</p>}
      {status === 'success' && <p className="success-text">Thanks!</p>}
      {status === 'error' && <p className="error-text">Invalid email</p>}
    </form>);
}
