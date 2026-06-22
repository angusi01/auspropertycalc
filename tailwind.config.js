/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#b45309',
          light: '#d97706',
          dark: '#78350f',
          bg: '#fff7ed',
        },
        accent: '#e8b44b',
        danger: '#b42318',
        success: '#147a43',
      },
      boxShadow: {
        card: '0 16px 40px rgba(31, 47, 37, .10)',
        'card-hover': '0 18px 40px rgba(31, 47, 37, .14)',
      },
    },
  },
  plugins: [],
};
