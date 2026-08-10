import { Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import Fejleszto from './pages/Fejleszto.jsx'

/* The route table itself, shared by both entries: `main.jsx` renders it
   inside a BrowserRouter in the browser, `entry-server.jsx` inside a
   StaticRouter in Node so the build can prerender each route. The path
   strings live in `routePaths.js`, which the prerender script also reads.

   The /en pair renders the same components as their Hungarian twins. Nothing
   here selects a language: components read it from the pathname via
   `useLocale()`, so a route is a route and the copy follows the URL. The two
   legal pages have no /en twin on purpose — see routePaths.js. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adatvedelem" element={<PrivacyPolicy />} />
      <Route path="/aszf" element={<Terms />} />
      <Route path="/fejleszto" element={<Fejleszto />} />
      <Route path="/en" element={<App />} />
      <Route path="/en/fejleszto" element={<Fejleszto />} />
    </Routes>
  )
}
