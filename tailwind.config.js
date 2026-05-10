/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#18202b',
        paper: '#f7f8fb',
        line: '#d9dee8',
        ai: '#2563eb',
        manual: '#0f766e',
        accent: '#c2410c'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(24, 32, 43, 0.08)'
      }
    },
  },
  plugins: [],
};
