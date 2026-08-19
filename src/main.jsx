import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { AppRoutes } from './routes.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import { dismissPreloader } from './preloader'
import './index.css'

/* `createRoot`, not `hydrateRoot`, on purpose. The build prerenders each
   route into `dist/<route>/index.html` so crawlers get real HTML; React then
   throws that markup away and renders from scratch on mount. Slightly more
   client work, but zero hydration-mismatch surface — the prerender is a
   crawler artefact, not a contract the client has to match. */
/* The boundary is here and not in routes.jsx on purpose: routes.jsx is shared
   with entry-server.jsx, and a boundary in the prerender path would convert a
   build-time crash into a shipped fallback page. Build failures should stay
   loud; only the browser gets the net. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
        {/* Here and not in routes.jsx, which entry-server.jsx also renders:
            this belongs to the browser only, and putting it in the shared tree
            would write a script tag into six prerendered files for no reason.

            Chosen over Plausible and Umami for one structural reason. It
            serves its script from /_vercel/insights on this origin and beacons
            to the same place, so `script-src 'self'` and `connect-src 'self'`
            already cover it — no third-party host joins the CSP on a site that
            self-hosts its fonts specifically to keep them out. It also stores
            nothing on the visitor's device, which is what keeps the answer to
            "do we need a cookie banner" a no.

            Inside BrowserRouter because it reads the location to count a view
            per route rather than once per session. */}
        <Analytics />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

/* Called after render rather than from inside a component, and unawaited.
   render() only schedules the work, so this returns immediately and does not
   hold React up; dismissPreloader waits for the paint itself.

   Outside the ErrorBoundary on purpose. The boundary catches a render that
   throws and shows a fallback — but a fallback still needs the cover taken
   off it, and a dismissal living inside the tree would go down with whatever
   it was meant to reveal. index.css keeps a 4s failsafe underneath this for
   the case where the bundle never gets this far at all. */
dismissPreloader()
