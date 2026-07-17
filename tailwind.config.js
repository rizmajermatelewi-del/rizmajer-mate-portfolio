/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8B5A2B',
        'primary-dark': '#6B4520',
        'primary-light': '#A9754A',
        accent: '#C08552',
        'accent-dark': '#A66B3D',
        background: '#F5EDE4',
        surface: '#FFF8F0',
        ink: '#2B1B12',
        muted: '#8A7566',
        divider: '#E4D6C7',
        deep: '#2B1B12',
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
