import { LOCALES, DEFAULT_LOCALE } from './locales.js'

/* Resolves a { hu, en } field to one language.
   ---------------------------------------------------------------------
   The obvious version of this function falls back to Hungarian when the
   English is missing. That is exactly how /en was lost the first time: the
   routing worked, the dictionary behind it did not exist, and both English
   pages quietly served Hungarian copy under an English URL — telling Google
   the Hungarian pages had a duplicate, and handing an English reader the one
   text they could not read (routePaths.js:20-29).

   So there is no fallback. A missing translation throws.

   Throwing sounds worse than it is, because of where it lands.
   scripts/prerender.mjs renders every route in ROUTE_PATHS through Node at
   build time, so the first missing string fails `npm run build` naming the
   offending field — before anything reaches a server. A silent fallback fails
   in front of a reader instead, and looks fine to everyone who ships it. Same
   rule the rest of this repo follows: drift is caught by a test, not by a
   comment.

   Kept free of JSX and of any React import: knowledge.mjs and prerender.mjs
   import this in plain Node, the way they already import locales.js. */

/* For values deliberately identical in both languages — a telephone number, an
   e-mail address, a URL, a proper noun.

   It exists so "this needs no translation" is a decision somebody wrote down,
   rather than the appearance of a field nobody got round to. A bare string
   reaching t() is treated as the second case and throws, so a half-converted
   data module cannot pass quietly. */
export function neutral(value) {
  return { neutral: value }
}

export function t(field, locale = DEFAULT_LOCALE) {
  if (field && typeof field === 'object') {
    if (typeof field.neutral === 'string') return field.neutral

    const value = field[locale]
    if (typeof value === 'string' && value.trim()) return value

    throw new Error(`t(): no ${locale} text in ${JSON.stringify(field).slice(0, 120)}`)
  }

  throw new Error(
    `t(): expected a { ${LOCALES.join(', ')} } field, got ${String(JSON.stringify(field)).slice(0, 120)}. ` +
      'A plain string here was never translated — wrap it in neutral() if that is deliberate.',
  )
}

/* Walks any data structure and returns the dotted path of every field that is
   not fully translated. Tests point it at a whole exported array, so adding a
   tier or an FAQ entry cannot land half-done: the failure names the exact
   path instead of reporting that something, somewhere, is missing.

   A "field" is any object carrying at least one locale key. Objects carrying
   none are plain containers and get walked through, which is what makes it
   safe to hand it a whole module's export. */
export function untranslatedIn(value, path = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => untranslatedIn(item, `${path}[${index}]`))
  }

  if (!value || typeof value !== 'object') return []

  if (typeof value.neutral === 'string') return []

  const isField = LOCALES.some((locale) => locale in value)
  if (isField) {
    const missing = LOCALES.filter(
      (locale) => typeof value[locale] !== 'string' || !value[locale].trim(),
    )
    return missing.length ? [`${path} (missing: ${missing.join(', ')})`] : []
  }

  return Object.entries(value).flatMap(([key, child]) =>
    untranslatedIn(child, path ? `${path}.${key}` : key),
  )
}
