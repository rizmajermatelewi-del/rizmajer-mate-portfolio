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
export const EN_ROUTE_PATHS = ['/', '/fejleszto'].map((path) => withLocale(path, 'en'))

export const ROUTE_PATHS = [...HU_ROUTE_PATHS, ...EN_ROUTE_PATHS]
