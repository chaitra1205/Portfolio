/** Palette is locked to Ivory · Emerald · Vermilion. Default colours are
 *  replaced (not extended) so no other colour utility can exist. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      ivory: '#F2EBDD',
      emerald: '#08765A',
      vermilion: '#E34234',
    },
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Tailwind's internal defaults would otherwise ship blue/white values.
      ringColor: { DEFAULT: '#E34234' },
      ringOffsetColor: { DEFAULT: '#F2EBDD' },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'pulse-dot': {
          '0%': { boxShadow: '0 0 0 0 rgb(227 66 52 / 0.55)' },
          '70%, 100%': { boxShadow: '0 0 0 10px rgb(227 66 52 / 0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
