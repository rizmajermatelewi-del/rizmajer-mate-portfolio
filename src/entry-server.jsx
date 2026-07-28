import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'

/* Server entry, used only by `scripts/prerender.mjs` at build time. It is
   never shipped to the browser.

   Rendering in plain Node — rather than snapshotting a headless browser —
   is deliberate. Node defines no IntersectionObserver, so `useInView`
   starts `visible = true` and every section is emitted at full opacity.
   Headless Chrome DOES define IntersectionObserver, so a Puppeteer
   snapshot would freeze every below-fold section at `opacity-0` unless the
   whole page were scrolled first. Node also keeps Chromium off the Vercel
   build, which runs `npm run build` on every deploy.

   No `index.css` import here: styling is the client bundle's job, and
   pulling Tailwind into the SSR build would only slow it down.

   The output is markup only — no hydration state blob. `main.jsx` uses
   `createRoot`, not `hydrateRoot`, so React discards this DOM and renders
   fresh on mount. That sidesteps hydration mismatches entirely, and it
   means nothing inline needs emitting — the production CSP is
   `script-src 'self'` with no `unsafe-inline`. */
export function render(path) {
  return renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>
  )
}
