import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setVisible(window.localStorage.getItem('analytics-consent') !== 'yes');
        });
        return () => window.cancelAnimationFrame(frame);
    }, []);
    function accept() {
        window.localStorage.setItem('analytics-consent', 'yes');
        posthog.opt_in_capturing();
        setVisible(false);
    }
    if (!visible)
        return null;
    return (<div className="cookie-banner">
      <span>We use privacy-conscious analytics after consent.</span>
      <button type="button" onClick={accept}>
        Accept
      </button>
    </div>);
}
