/* Locale is derived from the URL, and nowhere else.
   ---------------------------------------------------------------------
   The obvious build is a context holding a `locale` state, a toggle that
   sets it, and localStorage to remember it. Every part of that is a
   liability here: the site is prerendered in Node, so a locale kept in
   state renders Hungarian into the HTML and then flips after hydration —
   which is a visible flash for the reader and, worse, means Google indexes
   whichever language the server guessed. localStorage cannot be read during
   SSR at all, so it guarantees a hydration mismatch.

   Making locale a pure function of the pathname removes all of it. There is
   no state to synchronise, `entry-server.jsx` already renders by path so
   prerendering the English pages costs nothing, and each language gets a
   real URL a crawler and a shared link can both point at. The language
   toggle is then just a link to the same page under the other prefix.

   Hungarian is unprefixed because it is the primary market and its URLs are
   already live and indexed; adding a prefix would move every existing page.

   Kept free of JSX and of any React import on purpose: `scripts/prerender.mjs`
   imports this file directly in Node, the same way it imports routePaths.js,
   to emit `lang` and `hreflang` per route. An import of react-router here
   would break the build. The hook lives in useLocale.js for that reason. */

export const LOCALES = ['hu', 'en']
export const DEFAULT_LOCALE = 'hu'

/* Every prefixed locale, i.e. the ones that actually appear in a path. */
const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE)

/* Anything unrecognised is Hungarian rather than an error: this runs on
   arbitrary user-supplied paths, and an unknown prefix means a 404 route,
   which should still render its chrome in the default language. */
export function localeFromPath(pathname) {
  const first = pathname.split('/')[1]
  return PREFIXED.includes(first) ? first : DEFAULT_LOCALE
}

/* Strips any existing locale prefix, so this is idempotent and safe to call
   on a path that already carries one — which is what the language toggle
   does on every render. */
export function stripLocale(pathname) {
  const first = pathname.split('/')[1]
  if (!PREFIXED.includes(first)) return pathname || '/'
  return pathname.slice(first.length + 1) || '/'
}

export function withLocale(pathname, locale) {
  const bare = stripLocale(pathname)
  if (locale === DEFAULT_LOCALE) return bare
  return bare === '/' ? `/${locale}` : `/${locale}${bare}`
}
