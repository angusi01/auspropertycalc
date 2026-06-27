const typography = {
  fontSans: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: {
    weight: '800',
    tracking: '-0.03em',
    size: 'clamp(56px, 10vw, 80px)',
    lineHeight: '0.95',
  },
  heading: {
    weight: '600',
    tracking: '-0.02em',
    lineHeight: '1.05',
  },
  body: {
    weight: '400',
    strongWeight: '500',
    lineHeight: '1.6',
  },
  label: {
    size: '12px',
    tracking: '0.08em',
    transform: 'uppercase',
  },
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
};

const colors = {
  bg: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  accent: '#1d4ed8',
  accentLight: '#eff6ff',
  resultBg: '#0f172a',
  textPrimary: '#0f172a',
  textMuted: '#64748b',
  positive: '#16a34a',
  danger: '#ef4444',
  bodyOnDark: '#94a3b8',
  bodyOnLight: '#475569',
};

module.exports = {
  typography,
  spacing,
  colors,
};
