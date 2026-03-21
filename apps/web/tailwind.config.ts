import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#A8E6CF',
          'green-light': '#C8F0DF',
          'green-dark': '#7DD3AF',
          'green-deep': '#4AA87A',
          blush: '#FFB7B2',
          outline: '#6B4226',
          cream: '#FFF9F0',
          'cream-dark': '#FFF0E0',
          surface: '#FAFCFA',
          accent: '#B8D4E3',
        },
      },
      borderRadius: {
        brand: '1rem',
        'brand-lg': '1.25rem',
        'brand-xl': '1.5rem',
        'brand-pill': '9999px',
      },
      boxShadow: {
        brand: '0 2px 12px rgba(168, 230, 207, 0.15)',
        'brand-md': '0 4px 20px rgba(168, 230, 207, 0.2)',
        'brand-hover': '0 6px 24px rgba(168, 230, 207, 0.3)',
      },
      keyframes: {
        'brand-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'brand-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'brand-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'brand-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      animation: {
        'brand-bounce': 'brand-bounce 0.4s ease-in-out',
        'brand-fade-in': 'brand-fade-in 0.3s ease-out',
        'brand-pulse': 'brand-pulse 2s ease-in-out infinite',
        'brand-breathe': 'brand-breathe 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
