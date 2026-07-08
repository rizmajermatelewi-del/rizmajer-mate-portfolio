/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF6A00',
        'primary-dark': '#D65600',
        'primary-light': '#FF9142',
        accent: '#F2B705',
        'accent-dark': '#C99400',
        background: '#FAF8F5',
        surface: '#FFFFFF',
        ink: '#211E1B',
        muted: '#6E655D',
        divider: '#E7E1D9',
        deep: '#17140F',
      },
      fontFamily: {
        display: ['"Libre Caslon Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Lora"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
      },
    },
  },
  plugins: [],
}
