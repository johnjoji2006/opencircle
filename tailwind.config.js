/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF9F6',
          200: '#F5F2EB',
          300: '#ECE6DA',
        },
        brand: {
          teal: '#0F766E',
          'teal-dark': '#115E59',
          'teal-light': '#14B8A6',
          sage: '#CCFBF1',
          'sage-light': '#E6FBF5',
          amber: '#F59E0B',
          'amber-hover': '#D97706',
          slate: '#1E293B',
          'slate-muted': '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 118, 110, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 12px 30px -4px rgba(15, 118, 110, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'amber-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
        'teal-glow': '0 0 25px rgba(15, 118, 110, 0.25)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'sound-wave': 'wave 1.2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
