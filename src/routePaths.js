/* Every route the app answers, in one list.
   `routes.jsx` renders them; `scripts/prerender.mjs` walks this array to
   decide which HTML files to write into `dist/`. A route added to one and
   not the other would ship without prerendered HTML, so they read the
   same source. */
export const ROUTE_PATHS = ['/', '/adatvedelem', '/aszf', '/fejleszto']
