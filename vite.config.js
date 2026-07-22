import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  // Vite 8 defaults to "baseline-widely-available", which cuts off around
  // Safari 16 / Chrome 107. Nothing here needs syntax that new, so the target
  // is pinned lower and stated explicitly — otherwise the supported browser
  // set silently moves every time Vite bumps its baseline.
  build: { target: ['es2020', 'chrome87', 'edge88', 'firefox78', 'safari14'] },
})
