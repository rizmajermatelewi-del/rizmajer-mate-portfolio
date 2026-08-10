import { withLocale } from './i18n/locales.js'

/* Every route the app answers, in one list.
   `routes.jsx` renders them; `scripts/prerender.mjs` walks this array to
   decide which HTML files to write into `dist/`. A route added to one and
   not the other would ship without prerendered HTML, so they read the
   same source. */
export const HU_ROUTE_PATHS = ['/', '/adatvedelem', '/aszf', '/fejleszto']

/* Deliberately shorter than the Hungarian list: /adatvedelem and /aszf have
   no English twin.

   An ÁSZF and an adatvédelmi tájékoztató are binding documents under
   Hungarian law for a Hungarian egyéni vállalkozó. A translation of one is
   not a second version of the same document — it is a second document that
   can contradict the binding one, and the liability for the gap lands on the
   author. The English pages therefore link to the Hungarian originals and say
   plainly that those are the binding text, which is the ordinary practice and
   the only one that does not invent legal exposure. */
/* Empty, and deliberately so. The routing worked — /en and /en/fejleszto
   prerendered with the right `lang` and `hreflang` — but the string
   dictionary behind it was never written, so both pages served the Hungarian
   copy under an English URL. That is worse than having no English at all: it
   tells Google the Hungarian pages have a duplicate, lies about the language,
   and hands a visitor who clicks "EN" the exact text they could not read.

   The machinery stays (locales.js, useLocale.js and their tests): restoring
   English is putting the two paths back into EN_PAGES, adding their sitemap
   entries and their <Route>s, once there is copy to serve. */
const EN_PAGES = []

export const EN_ROUTE_PATHS = EN_PAGES.map((path) => withLocale(path, 'en'))

export const ROUTE_PATHS = [...HU_ROUTE_PATHS, ...EN_ROUTE_PATHS]
