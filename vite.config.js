import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    // Vite 8 defaults to "baseline-widely-available", which cuts off around
    // Safari 16 / Chrome 107. Nothing here needs syntax that new, so the target
    // is pinned lower and stated explicitly — otherwise the supported browser
    // set silently moves every time Vite bumps its baseline.
    target: ['es2020', 'chrome87', 'edge88', 'firefox78', 'safari14'],

    /* Everything shipped as one ~440 kB chunk, so a one-word copy change
       invalidated React, GSAP and the icon set along with it. Splitting the
       dependencies out lets them stay cached across deploys while the app
       chunk — the part that actually changes — re-downloads alone.

       Route-level React.lazy would have been the wrong tool here: this app is
       prerendered through renderToString, which emits Suspense fallbacks
       rather than content, so lazy routes would hand crawlers empty markup and
       defeat scripts/prerender.mjs. Chunking changes packaging only, never the
       rendered output.

       Client build only. The SSR bundle runs once in Node during the build and
       is never downloaded, so splitting it buys nothing. */
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks(id) {
              if (!id.includes('node_modules')) return
              if (id.includes('gsap')) return 'gsap'
              if (id.includes('lucide-react')) return 'icons'
              if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
            },
          },
        },
  },
}))
