const tokens = require('./tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: tokens.colors.bg,
        surface: tokens.colors.surface,
        border: tokens.colors.border,
        accent: tokens.colors.accent,
        'accent-light': tokens.colors.accentLight,
        result: tokens.colors.resultBg,
        primary: tokens.colors.textPrimary,
        muted: tokens.colors.textMuted,
        positive: tokens.colors.positive,
        danger: tokens.colors.danger,
        brand: {
          DEFAULT: tokens.colors.accent,
          light: tokens.colors.accentLight,
          dark: tokens.colors.resultBg,
          bg: tokens.colors.bg,
        },
        success: tokens.colors.positive,
      },
      fontFamily: {
        sans: tokens.typography.fontSans.split(', '),
      },
      spacing: tokens.spacing,
      boxShadow: {
        card: '0 16px 40px rgba(15, 23, 42, .10)',
        'card-hover': '0 24px 48px rgba(15, 23, 42, .14)',
      },
    },
  },
  plugins: [],
};
