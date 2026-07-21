/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-dark': 'rgb(var(--color-accent-dark) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        divider: 'rgb(var(--color-divider) / <alpha-value>)',
        deep: 'rgb(var(--color-deep) / <alpha-value>)',
      },
      /* One family, hierarchy from weight and size. Geist is a precision
         technical face with full latin-ext, so Hungarian ő/ű render natively
         rather than falling back mid-word. */
      fontFamily: {
        display: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      /* One elevation scale instead of ad-hoc shadow-sm/xl/2xl. Tinted with
         the ink colour rather than pure black, so shadows sit in the palette
         instead of greying it out. Two layers each: a tight contact shadow
         plus a wide ambient one. */
      boxShadow: {
        e1: '0 1px 2px rgb(12 22 35 / 0.05), 0 2px 8px rgb(12 22 35 / 0.05)',
        e2: '0 2px 4px rgb(12 22 35 / 0.06), 0 8px 20px rgb(12 22 35 / 0.09)',
        e3: '0 6px 12px rgb(12 22 35 / 0.09), 0 18px 40px rgb(12 22 35 / 0.14)',
        e4: '0 12px 24px rgb(12 22 35 / 0.12), 0 32px 64px rgb(12 22 35 / 0.20)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
