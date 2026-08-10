import { Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import Fejleszto from './pages/Fejleszto.jsx'

/* The route table itself, shared by both entries: `main.jsx` renders it
   inside a BrowserRouter in the browser, `entry-server.jsx` inside a
   StaticRouter in Node so the build can prerender each route. The path
   strings live in `routePaths.js`, which the prerender script also reads.

   The /en pair is gone until there is English copy to serve — see the note in
   routePaths.js. Nothing here selects a language: components read it from the
   pathname via `useLocale()`, so restoring English is adding the two routes
   back, not rewiring anything. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adatvedelem" element={<PrivacyPolicy />} />
      <Route path="/aszf" element={<Terms />} />
      <Route path="/fejleszto" element={<Fejleszto />} />
    </Routes>
  )
}
