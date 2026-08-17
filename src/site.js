/* Where this site lives. One line to change when the domain does.
   ---------------------------------------------------------------------
   Before this, the origin was typed into 29 places across 8 files: eleven
   times in index.html (canonical, og:url, and every @id and url in the JSON-LD
   graph), six in sitemap.xml, three in llms.txt, once in robots.txt, and the
   rest in design documents. Moving to a real domain meant finding all of them,
   and missing one is silent — a canonical pointing at the old host tells
   Google the new one is a copy.

   Everything that ships now derives from this:

     - index.html keeps the origin below as its dev-server value, and
       prerender.mjs rewrites every occurrence in the built pages. That covers
       the JSON-LD @ids too, which the per-tag rewrites never touched.
     - sitemap.xml, robots.txt and llms.txt are generated into public/ by
       scripts/generate-static.mjs before vite copies that directory.

   No trailing slash. Everything appending to it starts with one, and two in a
   row is a different URL to a crawler. */
export const SITE_ORIGIN = 'https://rizmajer-mate-portfolio.vercel.app'

/* Absolute URL for a route path ('/', '/en/fejleszto'). The root keeps its
   trailing slash because that is the canonical form for a home page and the
   form already published in the sitemap; every other path has none. */
export const urlFor = (route) => (route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`)
