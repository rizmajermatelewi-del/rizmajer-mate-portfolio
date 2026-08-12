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

/* index.html hardcodes lang="hu", which would otherwise be copied onto the
   English pages verbatim — telling a screen reader to pronounce English with
   Hungarian phonemes, and telling Google the page is Hungarian while it reads
   as English. */
const replaceLang = (html, locale) =>
  html.replace(/(<html\b[^>]*\blang=")[^"]*(")/i, `$1${escapeAttr(locale)}$2`)

/* Declares the translations of a page to each other.
   Emitted only for routes that actually have a twin: /adatvedelem and /aszf
   are Hungarian-only by design, and an hreflang pointing at a URL that 404s is
   worse than none — Google drops the whole cluster when one side is broken.
   x-default points at the Hungarian version of this same page, because that is
   the one to serve a reader whose language we have no better guess for. */
function withAlternates(html, route, origin, locales, defaultLocale, withLocale, routePaths) {
  const twins = locales
    .map((locale) => [locale, withLocale(route, locale)])
    .filter(([, target]) => routePaths.includes(target))

  if (twins.length < 2) return html

  const href = (target) => escapeAttr(target === '/' ? `${origin}/` : `${origin}${target}`)
  const tags = twins
    .map(([locale, target]) => `\n    <link rel="alternate" hreflang="${locale}" href="${href(target)}" />`)
    .join('')
  const fallback = `\n    <link rel="alternate" hreflang="x-default" href="${href(withLocale(route, defaultLocale))}" />`

  return html.replace(/(<link\s+rel="canonical"[^>]*>)/i, `$1${tags}${fallback}`)
}

/* Fills the FAQPage node's questions from faq.js, or drops the node when
   `entries` is null.
   ---------------------------------------------------------------------
   index.html used to carry its own hand-written copy of all eight answers,
   and it drifted: after the pricing review the visible page said 550 000 Ft
   while the structured data still said 450 000 and still quoted a "belső
   rendszer" that pricing.js had already retired as an undeliverable claim.
   Structured data is the copy Google reproduces in search results, so the
   stale one was the likeliest to be read — and nothing failed, because no
   test compared the two. Deriving the node here leaves no second copy to
   forget.

   Dropping is the other half: FAQPage belongs only on the page that renders
   the questions. It was being copied onto /adatvedelem, /aszf and /fejleszto,
   so a developer profile was publishing price structured data it does not
   display.

   Parses rather than pattern-matches, because a regex over JSON would break
   the moment a node gains a nested object — and it throws instead of silently
   passing the block through, since a graph that stopped being parseable is a
   build problem worth stopping for. */
function withFaqSchema(html, entries) {
  return html.replace(
    /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/i,
    (whole, open, body, close) => {
      const data = JSON.parse(body)
      if (!Array.isArray(data['@graph'])) return whole

      if (entries && !data['@graph'].some((node) => node['@type'] === 'FAQPage')) {
        throw new Error('index.html has no FAQPage node for the faq.js questions to fill.')
      }

      const graph = data['@graph'].flatMap((node) => {
        if (node['@type'] !== 'FAQPage') return [node]
        if (!entries) return []
        return [
          {
            ...node,
            mainEntity: entries.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ]
      })

      return `${open}${JSON.stringify({ ...data, '@graph': graph }, null, 2)}${close}`
    }
  )
}

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
  /* Same trick, same reason: locales.js is deliberately free of JSX and of any
     React import so it can be read here as plain ESM. */
  const { LOCALES, DEFAULT_LOCALE, localeFromPath, withLocale } = await import(
    pathToFileURL(path.join(root, 'src', 'i18n', 'locales.js')).href
  )
  /* Same again for the FAQ: the page, the chatbot's knowledge.json and the
     FAQPage structured data all read this one module. */
  const { FAQ_QUESTIONS } = await import(
    pathToFileURL(path.join(root, 'src', 'data', 'faq.js')).href
  )
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
    page = replaceLang(page, localeFromPath(route))
    page = withAlternates(page, route, origin, LOCALES, DEFAULT_LOCALE, withLocale, ROUTE_PATHS)

    /* The homepage keeps the hand-written title and description in
       index.html. Subroutes would otherwise inherit them verbatim, so
       theirs are lifted from their own <h1> and opening paragraph. */
    if (route !== '/') {
      const heading = firstMatch(appHtml, 'h1')
      const intro = firstMatch(appHtml, 'p')
      const siteName = template.match(/<meta\s+property="og:site_name"\s+content="([^"]+)"/i)?.[1]

      if (heading) {
        /* Suffixing the site name onto a heading that already contains it
           produced "Rizmajer Máté Levente — Rizmajer Máté" on the developer
           profile, whose h1 is the full name. Suffix only when it adds
           something. */
        const site = siteName ? decode(siteName) : ''
        const title = site && !heading.includes(site) ? `${heading} — ${site}` : heading
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

    /* The template's JSON-LD graph is Person + WebSite + FAQPage. The first
       two stay true on every route; FAQPage describes only the page that
       renders the questions, so it is filled on / and removed everywhere
       else. */
    page = withFaqSchema(page, route === '/' ? FAQ_QUESTIONS : null)

    /* Check the output, not the intention. Filling the node from faq.js turns
       one silent failure (a stale copy) into another (an empty one) unless
       somebody looks at what was actually written.

       Scoped to the JSON-LD block on purpose: the section below renders the
       same questions as visible text, so searching the whole page would pass
       even with the structured data empty — the exact failure this guards. */
    if (route === '/') {
      const block = page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
      const faqNode = JSON.parse(block ?? '{}')['@graph']?.find((n) => n['@type'] === 'FAQPage')
      const published = faqNode?.mainEntity?.map((entry) => entry.name) ?? []
      const missing = FAQ_QUESTIONS.filter(({ q }) => !published.includes(q))

      if (missing.length) {
        throw new Error(
          `${missing.length} of ${FAQ_QUESTIONS.length} FAQ questions missing from the ` +
            `prerendered JSON-LD: ${missing.map(({ q }) => q).join(' | ')}`
        )
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
