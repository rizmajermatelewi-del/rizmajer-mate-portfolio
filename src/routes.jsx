import { Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import Fejleszto from './pages/Fejleszto.jsx'
import NotFound from './pages/NotFound.jsx'
import { ROUTE_PATHS } from './routePaths.js'
import { stripLocale } from './i18n/locales.js'

/* The route table itself, shared by both entries: `main.jsx` renders it
   inside a BrowserRouter in the browser, `entry-server.jsx` inside a
   StaticRouter in Node so the build can prerender each route.

   Which paths exist is routePaths.js's decision, not this file's. The two
   used to be separate hand-kept lists, and they fail silently in the
   direction that matters: prerender.mjs walks ROUTE_PATHS, so a path listed
   there but missing a <Route> here still gets a file written into dist/ —
   an empty page, published, with nothing raising a word about it. Mapping
   over ROUTE_PATHS deletes the second list instead of adding a test to
   compare it against the first.

   Nothing here selects a language. Each English path is its Hungarian path
   under an /en prefix and renders the same component; the component reads the
   language off the pathname via useLocale(). That is why adding English was
   two strings in routePaths.js and no change to any element below. */
const PAGE_FOR = {
  '/': <App />,
  '/adatvedelem': <PrivacyPolicy />,
  '/aszf': <Terms />,
  '/fejleszto': <Fejleszto />,
}

export function AppRoutes() {
  return (
    <Routes>
      {ROUTE_PATHS.map((path) => (
        <Route key={path} path={path} element={PAGE_FOR[stripLocale(path)]} />
      ))}
      {/* Everything else. Not decoration: Vercel serves dist/404.html for an
          unmatched path, and that file boots this same bundle. Without a
          catch-all the router would find no match, render nothing, and blank
          out a page that had just painted its content — so the missing route
          here would show up as a 404 page that works until React arrives. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
