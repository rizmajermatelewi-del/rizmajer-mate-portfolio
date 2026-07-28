import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'
import './index.css'

/* `createRoot`, not `hydrateRoot`, on purpose. The build prerenders each
   route into `dist/<route>/index.html` so crawlers get real HTML; React then
   throws that markup away and renders from scratch on mount. Slightly more
   client work, but zero hydration-mismatch surface — the prerender is a
   crawler artefact, not a contract the client has to match. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
