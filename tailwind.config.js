/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mist: {
          DEFAULT: '#e7ece9',
          deep: '#d5ddd8',
        },
        ink: {
          DEFAULT: '#141816',
          soft: '#3a423e',
        },
        sage: {
          DEFAULT: '#3f5348',
          mute: '#6a7a70',
        },
        line: '#c2cbc5',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Figtree"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        brand: '-0.035em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
