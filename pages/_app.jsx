import '../styles/globals.css';
import posthog from 'posthog-js';
import { useEffect } from 'react';
import { useState } from 'react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { CookieConsent } from '../components/CookieConsent';
import { Layout } from '../components/layout/Layout';
export default function App({ Component, pageProps }) {
    const [supabaseClient] = useState(() => createPagesBrowserClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'local-anon-key',
    }));
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
                opt_out_capturing_by_default: true,
                capture_pageview: true,
            });
        }
    }, []);
    return (<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <Layout>
        <Component {...pageProps}/>
        <CookieConsent />
      </Layout>
    </SessionContextProvider>);
}
