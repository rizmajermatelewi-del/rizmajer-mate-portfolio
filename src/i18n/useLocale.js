import { useLocation } from 'react-router-dom'
import { localeFromPath } from './locales'

/* Separate from locales.js because this imports react-router and that file is
   loaded directly by scripts/prerender.mjs in plain Node.

   No state and no effect: the router already re-renders on navigation, so
   reading the locale out of the current location is both correct during SSR
   and free of the hydration flash a stored locale would cause. */
export function useLocale() {
  return localeFromPath(useLocation().pathname)
}
