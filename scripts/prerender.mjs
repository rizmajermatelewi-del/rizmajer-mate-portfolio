/* Post-build prerender.
   ---------------------------------------------------------------------
   Turns the single client-rendered `dist/index.html` — whose body is an
   empty `<div id="root">` — into one real HTML file per route:

     dist/index.html
     dist/adatvedelem/index.html
     dist/aszf/index.html

   Rendering happens in plain Node through `dist-ssr/entry-server.js`, not
   in a headless browser. That is the whole point: Node defines no
   IntersectionObserver, so `useInView` starts `visible = true` and every
   section is emitted at full opacity. Headless Chrome DOES define
   IntersectionObserver, so a Puppeteer snapshot would capture every
   below-fold section at `opacity-0` unless the page were scrolled first —
   and it would put a Chromium download on every Vercel deploy, since
   vercel.json runs `npm run build`.

   Nothing inline is emitted. The production CSP is `script-src 'self'`
   with no `unsafe-inline`, so a hydration state blob would be blocked.
   None is needed: `main.jsx` uses `createRoot`, so React discards this
   markup and renders fresh on mount.

   These files are the whole routing story. vercel.json used to carry a
   `/(.*) -> /index.html` catch-all so a deep link survived client-side
   routing; with every route in ROUTE_PATHS written to disk here, that
   rewrite only ever caught paths the app does not answer — and turned them
   into HTTP 200 replies serving the entire ~146 kB homepage. Measured:
   /llms.txt and /nem-letezo-oldal-12345 both returned 200 with the full
   home page. That is a soft 404, and it invites crawlers to index unlimited
   URLs carrying duplicate content — undoing the SEO work this script exists
   to do. The rewrite is gone, so unknown paths 404 for real.
--------------------------------------------------------------------- */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

/* Sections reveal with `opacity-0 translate-y-N` until useInView latches.
   If that pair survives into the output, crawlers are being handed
   invisible content and the prerender is worse than useless — fail loudly
   rather than ship it. Bare `opacity-0` is not the same thing: the contact
   honeypot, the hover overlays and the closed mobile drawer all use it
   deliberately and must stay hidden. */
const HIDDEN_REVEAL = /opacity-0 translate-y-/

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
const escapeAttr = (s) => s.replace(/[&<>"]/g, (c) => ENTITIES[c])

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

/* Strips tags — including the `<!-- -->` separators React inserts between
   adjacent text nodes — and collapses whitespace. */
const textOf = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()

const firstMatch = (html, tag) => {
  const m = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  return m ? textOf(m[1]) : ''
}

/* Meta descriptions are built from the page's own first paragraph — whole
   sentences where they fit — so no new Hungarian copy is invented here. */
function summarise(text, limit = 170) {
  if (text.length <= limit) return text
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)
  if (sentences) {
    let out = ''
    for (const s of sentences) {
      if ((out + s).trim().length > limit) break
      out += s
    }
    if (out.trim()) return out.trim()
  }
  return `${text.slice(0, limit).replace(/\s+\S*$/, '')}…`
}

const replaceTitle = (html, value) =>
  html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(value)}</title>`)

const replaceMeta = (html, attr, name, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, 'i'),
    `$1${escapeAttr(value)}$2`
  )

const replaceCanonical = (html, value) =>
  html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${escapeAttr(value)}$2`)

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to fill.')
  }

  // Origin comes from the template's own canonical tag so the two can never
  // drift apart.
  const canonical = template.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)
  if (!canonical) throw new Error('dist/index.html has no <link rel="canonical">.')
  const origin = canonical[1].replace(/\/+$/, '')

  // Plain ESM with no JSX, so Node reads the route list straight from
  // source rather than from the SSR bundle.
  const { ROUTE_PATHS } = await import(pathToFileURL(path.join(root, 'src', 'routePaths.js')).href)
  const { render } = await import(pathToFileURL(ssrEntry).href)

  for (const route of ROUTE_PATHS) {
    const appHtml = render(route)

    if (HIDDEN_REVEAL.test(appHtml)) {
      throw new Error(
        `${route} rendered with reveal sections still at opacity-0. ` +
          'useInView must default to visible when IntersectionObserver is absent.'
      )
    }

    let page = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const url = route === '/' ? `${origin}/` : `${origin}${route}`
    page = replaceCanonical(page, url)
    page = replaceMeta(page, 'property', 'og:url', url)

    /* The homepage keeps the hand-written title and description in
       index.html. Subroutes would otherwise inherit them verbatim, so
       theirs are lifted from their own <h1> and opening paragraph. */
    if (route !== '/') {
      const heading = firstMatch(appHtml, 'h1')
      const intro = firstMatch(appHtml, 'p')
      const siteName = template.match(/<meta\s+property="og:site_name"\s+content="([^"]+)"/i)?.[1]

      if (heading) {
        const title = siteName ? `${heading} — ${decode(siteName)}` : heading
        page = replaceTitle(page, title)
        page = replaceMeta(page, 'property', 'og:title', title)
        page = replaceMeta(page, 'name', 'twitter:title', title)
      }
      if (intro) {
        const description = summarise(intro)
        page = replaceMeta(page, 'name', 'description', description)
        page = replaceMeta(page, 'property', 'og:description', description)
        page = replaceMeta(page, 'name', 'twitter:description', description)
      }
    }

    const outFile =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html')

    await mkdir(path.dirname(outFile), { recursive: true })
    await writeFile(outFile, page, 'utf8')

    const rel = path.relative(root, outFile).replace(/\\/g, '/')
    console.log(`prerendered ${route} -> ${rel} (${appHtml.length} chars of markup)`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
