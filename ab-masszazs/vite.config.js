import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* Found during execution, and load-bearing: vitest 3.2.7 bundles its own
     Vite 7, while @vitejs/plugin-react 6 hands JSX to Vite 8's native
     transform. Without this line, JSX inside tests falls back to the classic
     runtime and every rendering test dies on "React is not defined" — while
     dev and build, driven by the real Vite 8, work fine. Tasks 4-7 all ship
     JSX test files and depend on this. */
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
