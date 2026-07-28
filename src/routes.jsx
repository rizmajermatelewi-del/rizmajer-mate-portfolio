import { Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'

/* The route table itself, shared by both entries: `main.jsx` renders it
   inside a BrowserRouter in the browser, `entry-server.jsx` inside a
   StaticRouter in Node so the build can prerender each route. The path
   strings live in `routePaths.js`, which the prerender script also reads. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/adatvedelem" element={<PrivacyPolicy />} />
      <Route path="/aszf" element={<Terms />} />
    </Routes>
  )
}
