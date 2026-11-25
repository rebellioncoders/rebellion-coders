/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B16',
          900: '#0B1424',
          850: '#0E1A30',
          800: '#111827',
        },
        royal: {
          300: '#BAE6FD',
          400: '#7DD3FC',
          500: '#38BDF8',
          600: '#0EA5E9',
          700: '#0284C7',
        },
        cyan: {
          brand: '#38BDF8',
          soft: '#0284C7',
        },
        ice: {
          50: '#F8FCFF',
          100: '#EAF5FF',
          200: '#D5E9FA',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.18)',
        'glow-sm': '0 0 18px rgba(56, 189, 248, 0.28)',
        card: '0 8px 30px rgba(56, 189, 248, 0.12)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(56, 189, 248, 0.16), transparent 65%)',
        'grid-circuit':
          'linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
