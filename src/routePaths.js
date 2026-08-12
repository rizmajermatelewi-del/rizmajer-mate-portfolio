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
/* Back, and this time with copy behind them. The first attempt shipped these
   two paths while the string dictionary was still empty, so both pages served
   the Hungarian text under an English URL — worse than no English at all,
   because it told Google the Hungarian pages had a duplicate and handed the
   one visitor it was for the exact text they could not read.

   This list was therefore the last edit of the conversion rather than the
   first. Every field these two pages touch is a { hu, en } pair now and t()
   throws on a missing side, so a half-translated page cannot reach dist/ —
   the build fails instead of publishing it. */
const EN_PAGES = ['/', '/fejleszto']

export const EN_ROUTE_PATHS = EN_PAGES.map((path) => withLocale(path, 'en'))

export const ROUTE_PATHS = [...HU_ROUTE_PATHS, ...EN_ROUTE_PATHS]
