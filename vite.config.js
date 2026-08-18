import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/* Search Console and Bing Webmaster Tools ownership tags.
   ---------------------------------------------------------------------
   Both services verify a site by looking for a meta tag in the head. The
   token is not a secret — it ships in the HTML of every page and is meant to
   be read — but it is deployment-specific: a fork, a preview domain or a
   second property needs a different one, and a hardcoded token silently
   verifies the wrong property.

   So they come from the environment, and an unset variable emits nothing.
   That matters more than it sounds: a tag with an empty content attribute is
   not "no tag", it is a claim of ownership with no proof, and both services
   report it as a failed verification rather than as an absent one.

   transformIndexHtml runs during `vite build`, so the tags are already in
   dist/index.html before scripts/prerender.mjs reads it as its template —
   which puts them on all six routes rather than only the home page.

   The names are fixed by the services, not chosen: Google reads
   `google-site-verification`, Bing reads `msvalidate.01`. */
function siteVerification(env) {
  const tokens = [
    ['google-site-verification', env.VITE_GOOGLE_SITE_VERIFICATION],
    ['msvalidate.01', env.VITE_BING_SITE_VERIFICATION],
  ]

  return {
    name: 'site-verification-meta',
    transformIndexHtml() {
      return tokens
        .filter(([, content]) => typeof content === 'string' && content.trim())
        .map(([name, content]) => ({
          tag: 'meta',
          attrs: { name, content: content.trim() },
          injectTo: 'head',
        }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild, mode }) => ({
  /* Third argument 'VITE_' rather than '': loadEnv with an empty prefix hands
     the whole process environment to the plugin, and this plugin writes what
     it is given straight into the HTML. Restricting it to the public prefix
     means a value can only reach the page if somebody named it for the
     browser. */
  plugins: [react(), siteVerification(loadEnv(mode, process.cwd(), 'VITE_'))],
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
