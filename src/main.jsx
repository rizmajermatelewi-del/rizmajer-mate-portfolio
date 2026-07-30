import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'
import ErrorBoundary from './components/ErrorBoundary'
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
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
