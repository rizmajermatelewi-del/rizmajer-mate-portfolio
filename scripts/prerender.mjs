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

/* Hungarian that survived onto an English page.
   ---------------------------------------------------------------------
   src/i18n/untranslated-jsx.test.js reads the components; untranslatedIn()
   reads the data modules. Neither reads the thing that actually ships. This
   does: it runs on the markup React just produced for a real /en route, so a
   string that reached the page by any route at all — a component, a data
   module, a default argument, a field added after the sweep — trips the same
   check.

   Scanning raw markup rather than visible text on purpose: aria-label and alt
   are copy too, and a screen-reader user is exactly the reader who cannot see
   that a button's label was translated and its accessible name was not.

   HU_ALLOWED_ON_EN is Hungarian that is correct on an English page: his name,
   and the two legal documents that stay Hungarian by decision and keep their
   Hungarian names so the label does not promise a translation that does not
   exist. Each is a decision, listed rather than the rule being weakened.

   The limit worth naming: it keys on diacritics, so it cannot see Hungarian
   written without them. "Kapcsolat" sat in Fejleszto.jsx through the whole
   section sweep for exactly that reason. This narrows the gap; it does not
   close it. */
const HU_DIACRITIC = '[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]'

const HU_ALLOWED_ON_EN = [
  /* The word, not the phrase "Rizmajer Máté". About.jsx staggers its opening
     line by wrapping every word in its own span, so in the markup the name
     arrives as `Rizmajer</span><span>Máté` and a phrase pattern never
     matches. Matching the one word that carries the diacritics is what
     actually holds here — and it is his name, so it is allowed wherever it
     appears. */
  /Máté/g,
  /* A place name, on the same footing as his: Inárcs is Inárcs in English.
     It reaches the page through the ProfessionalService node's
     addressLocality, which exists so local results have a town to work with,
     and translating it would name a town that does not exist. Listed rather
     than the rule weakened, like every other entry here. */
  /Inárcs/g,
  /Adatvédelmi tájékoztató/g,
  /Adatkezelési tájékoztató/g,
  /Adatvédelem/g,
  /Általános Szerződési Feltételek/g,
  /ÁSZF/g,
]

/* The Hungarian locale codes, which the diacritic rule cannot see — "hu_HU"
   and "hu-HU" are plain ASCII. They are the two places on an English page
   where being wrong is invisible to a person reading it and decisive to
   everything reading it mechanically: og:locale tells a link preview which
   language to present the card in, and schema.org inLanguage tells a search
   engine what it just indexed.

   Not `hreflang="hu"`, which is correct on the English page — that is the
   link to the Hungarian twin. Hence the region suffix in both patterns. */
const HU_LOCALE_CODES = [/hu_HU/g, /hu-HU/g]

function hungarianLeaks(html) {
  const rest = HU_ALLOWED_ON_EN.reduce((acc, pattern) => acc.replace(pattern, ''), html)
  const context = new RegExp(`[^<>]{0,50}${HU_DIACRITIC}[^<>]{0,50}`, 'g')

  return [
    ...[...rest.matchAll(context)].map((m) => m[0].trim()),
    ...HU_LOCALE_CODES.flatMap((pattern) => [...rest.matchAll(pattern)].map((m) => m[0])),
  ]
}

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
function withSchema(html, { entries, locale, siteName, schema, t, breadcrumb }) {
  return html.replace(
    /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/i,
    (whole, open, body, close) => {
      const data = JSON.parse(body)
      if (!Array.isArray(data['@graph'])) return whole

      if (entries && !data['@graph'].some((node) => node['@type'] === 'FAQPage')) {
        throw new Error('index.html has no FAQPage node for the faq.js questions to fill.')
      }

      if (!data['@graph'].some((node) => node['@type'] === 'ProfessionalService')) {
        throw new Error(
          'index.html has no ProfessionalService node. It carries the locality and ' +
            'the served area for local search results, and nothing else publishes them.'
        )
      }

      const graph = data['@graph'].flatMap((original) => {
        /* Every node that declares a language declares this page's language.
           The template says hu-HU throughout, which was true of every page
           that existed when it was written. */
        const node = original.inLanguage
          ? { ...original, inLanguage: t(schema.inLanguage, locale) }
          : original

        if (node['@type'] === 'Person') {
          return [
            {
              ...node,
              jobTitle: t(schema.jobTitle, locale),
              knowsAbout: schema.knowsAbout.map((topic) => t(topic, locale)),
            },
          ]
        }

        /* The site's name in the graph is the page title, not a second
           sentence that happens to match it today. */
        if (node['@type'] === 'WebSite') return [{ ...node, name: siteName }]

        /* The business node exists for local results, where the only field
           that can be in the wrong language is the country it serves. Filled
           from SCHEMA rather than written twice, for the same reason
           jobTitle is: the template carries the Hungarian side, and an
           English page publishing it would be caught by the leak scan below
           rather than by anybody reading the structured data.

           No priceRange here on purpose. It would have to restate figures
           that live in pricing.js, and prose restating a number is what let
           llms.txt publish a tier two revisions stale. */
        if (node['@type'] === 'ProfessionalService') {
          return [{ ...node, areaServed: { ...node.areaServed, name: t(schema.areaServed, locale) } }]
        }

        if (node['@type'] !== 'FAQPage') return [node]
        if (!entries) return []
        return [
          {
            ...node,
            mainEntity: entries.map(({ name, text }) => ({
              '@type': 'Question',
              name,
              acceptedAnswer: { '@type': 'Answer', text },
            })),
          },
        ]
      })

      /* Appended rather than declared in index.html, because unlike Person
         and WebSite a trail is different on every page and absent on the home
         page — a one-item breadcrumb naming the page you are already on is
         noise Google ignores at best. */
      const withCrumbs = breadcrumb
        ? [
            ...graph,
            {
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumb.map((crumb, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: crumb.name,
                item: crumb.item,
              })),
            },
          ]
        : graph

      return `${open}${JSON.stringify({ ...data, '@graph': withCrumbs }, null, 2)}${close}`
    }
  )
}

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> to fill.')
  }

  /* The origin the built pages publish comes from src/site.js, so moving to a
     real domain is one line rather than a hunt through eight files.

     The template's canonical is still read, but now as the *dev* origin — the
     string to replace rather than the value to publish. index.html has to
     carry a working absolute URL for the dev server and for anything reading
     the template before this script runs, and that copy is exactly the kind
     that drifts. Treating it as a placeholder means it cannot: whatever it
     says, the output says SITE_ORIGIN. */
  const canonical = template.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)
  if (!canonical) throw new Error('dist/index.html has no <link rel="canonical">.')
  const templateOrigin = canonical[1].replace(/\/+$/, '')

  const { SITE_ORIGIN } = await import(pathToFileURL(path.join(root, 'src', 'site.js')).href)
  const origin = SITE_ORIGIN.replace(/\/+$/, '')

  // Plain ESM with no JSX, so Node reads the route list straight from
  // source rather than from the SSR bundle.
  const { ROUTE_PATHS } = await import(pathToFileURL(path.join(root, 'src', 'routePaths.js')).href)
  /* Same trick, same reason: locales.js is deliberately free of JSX and of any
     React import so it can be read here as plain ESM. */
  const { LOCALES, DEFAULT_LOCALE, localeFromPath, withLocale, stripLocale } = await import(
    pathToFileURL(path.join(root, 'src', 'i18n', 'locales.js')).href
  )
  /* Same again for the FAQ: the page, the chatbot's knowledge.json and the
     FAQPage structured data all read this one module. */
  const { t } = await import(pathToFileURL(path.join(root, 'src', 'i18n', 't.js')).href)
  const { FAQ_QUESTIONS } = await import(
    pathToFileURL(path.join(root, 'src', 'data', 'faq.js')).href
  )
  const { HOME_META, PAGE_META, NOT_FOUND_META, CRUMB_HOME, PAGE_CRUMB, OG_LOCALE, SCHEMA } =
    await import(
    pathToFileURL(path.join(root, 'src', 'i18n', 'meta.js')).href
  )

  /* A written entry whose route no longer exists is dead copy nobody would
     notice, because the derive-from-markup fallback below quietly takes over
     and produces something plausible. Checking the keys against the real
     route list turns that into a build failure naming the stale key. */
  /* Same shape of guard as PAGE_META's below, for the same reason: a key that
     is not a route is a label nothing will ever print, and a route with no
     label would silently ship a trail with an undefined name in it. */
  for (const written of Object.keys(PAGE_CRUMB)) {
    if (!ROUTE_PATHS.includes(written)) {
      throw new Error(
        `src/i18n/meta.js has a breadcrumb label for "${written}", which is not a route.`
      )
    }
  }
  for (const route of ROUTE_PATHS) {
    const bare = stripLocale(route)
    if (bare !== '/' && !PAGE_CRUMB[bare]) {
      throw new Error(
        `${route} has no entry in PAGE_CRUMB in src/i18n/meta.js, so its ` +
          'BreadcrumbList would name the page "undefined".'
      )
    }
  }

  for (const written of Object.keys(PAGE_META)) {
    if (!ROUTE_PATHS.includes(written)) {
      throw new Error(
        `src/i18n/meta.js has written metadata for "${written}", which is not a route. ` +
          `Known routes: ${ROUTE_PATHS.join(', ')}`
      )
    }
  }

  /* index.html carries the Hungarian title and description as well, for the
     dev server and for anything reading the template before this script runs.
     Two copies of one sentence is precisely the arrangement that let a stale
     FAQ ship from this same file, so they are compared rather than trusted. */
  for (const [label, pattern, field] of [
    ['<title>', /<title>([\s\S]*?)<\/title>/i, HOME_META.title],
    ['meta description', /<meta\s+name="description"\s+content="([^"]*)"/i, HOME_META.description],
  ]) {
    const inTemplate = decode(template.match(pattern)?.[1] ?? '')
    if (inTemplate !== t(field, DEFAULT_LOCALE)) {
      throw new Error(
        `index.html's ${label} and src/i18n/meta.js disagree:\n  index.html: ${inTemplate}\n  meta.js:    ${t(field, DEFAULT_LOCALE)}`
      )
    }
  }
  const { render } = await import(pathToFileURL(ssrEntry).href)

  for (const route of ROUTE_PATHS) {
    const appHtml = render(route)

    if (HIDDEN_REVEAL.test(appHtml)) {
      throw new Error(
        `${route} rendered with reveal sections still at opacity-0. ` +
          'useInView must default to visible when IntersectionObserver is absent.'
      )
    }

    /* A route whose PAGE_FOR lookup comes back undefined renders nothing,
       and this loop would then happily write a blank page to dist/ and log a
       success line. The catch-all added to routes.jsx does not rescue this:
       the path still matches its own <Route>, which simply has no element.
       That failure is invisible everywhere except here. The threshold only
       has to separate "a page" from "nothing"; the smallest real route
       renders tens of thousands of characters. */
    if (appHtml.length < 1000) {
      throw new Error(
        `${route} rendered only ${appHtml.length} characters of markup. ` +
          'Most likely it has no component in PAGE_FOR in src/routes.jsx.'
      )
    }

    let page = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const routeLocale = localeFromPath(route)
    const isHome = stripLocale(route) === '/'

    const url = route === '/' ? `${origin}/` : `${origin}${route}`
    page = replaceCanonical(page, url)
    page = replaceMeta(page, 'property', 'og:url', url)
    page = replaceLang(page, routeLocale)
    page = replaceMeta(page, 'property', 'og:locale', OG_LOCALE[routeLocale])

    /* Both copies from the one field, which is also what makes the "keep
       these identical" comment in index.html true rather than hopeful. */
    const imageAlt = t(HOME_META.imageAlt, routeLocale)
    page = replaceMeta(page, 'property', 'og:image:alt', imageAlt)
    page = replaceMeta(page, 'name', 'twitter:image:alt', imageAlt)
    page = withAlternates(page, route, origin, LOCALES, DEFAULT_LOCALE, withLocale, ROUTE_PATHS)

    /* Two rules, and the split is by page rather than by language.

       The home page takes its written pair from meta.js, in whichever
       language the route is in. It used to take the Hungarian pair straight
       off the template, which was only ever right because there was one
       language; /en would have fallen through to the branch below and
       advertised itself with its own slogan, "A website and a system that
       works, so you do not have to. — Rizmajer Máté". A fine headline and a
       poor search result, on the page an English visitor arrives at.

       Every other route still derives its title from its own <h1> and its
       description from its opening paragraph. That is the right rule for a
       subpage — the heading is the subject — and it keeps working per
       language for free, because the markup it reads is already localised. */
    if (isHome) {
      const title = t(HOME_META.title, routeLocale)
      page = replaceTitle(page, title)
      page = replaceMeta(page, 'property', 'og:title', title)
      page = replaceMeta(page, 'name', 'twitter:title', title)

      /* A different sentence from the description on purpose; see meta.js. */
      const social = t(HOME_META.social, routeLocale)
      page = replaceMeta(page, 'name', 'description', t(HOME_META.description, routeLocale))
      page = replaceMeta(page, 'property', 'og:description', social)
      page = replaceMeta(page, 'name', 'twitter:description', social)
    } else if (PAGE_META[stripLocale(route)]) {
      /* A subpage whose written pair beat the derivation. /fejleszto is the
         only one so far, and it broke the default in both directions at once:
         its <h1> is a name, so both languages published the same title, and
         its first <p> is the role line, so the description was a fragment.
         See the note above PAGE_META in src/i18n/meta.js. */
      const written = PAGE_META[stripLocale(route)]

      const title = t(written.title, routeLocale)
      page = replaceTitle(page, title)
      page = replaceMeta(page, 'property', 'og:title', title)
      page = replaceMeta(page, 'name', 'twitter:title', title)

      const description = t(written.description, routeLocale)
      page = replaceMeta(page, 'name', 'description', description)
      page = replaceMeta(page, 'property', 'og:description', description)
      page = replaceMeta(page, 'name', 'twitter:description', description)
    } else {
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
       renders the questions, so it is filled on the FAQ-bearing route and
       removed everywhere else.

       Resolved to one language here rather than inside withFaqSchema, because
       structured data has to match the page it sits on: an English page
       carrying Hungarian answers would tell Google the two are duplicates of
       each other, which is the mistake /en was withdrawn for. The locale
       comes from the path, so it follows the route automatically. */
    /* Two levels, which is all this site has. The home item is the localised
       root so an English page's trail does not walk through the Hungarian
       one. */
    const homeUrl = routeLocale === DEFAULT_LOCALE ? `${origin}/` : `${origin}${withLocale('/', routeLocale)}`
    const breadcrumb = isHome
      ? null
      : [
          { name: t(CRUMB_HOME, routeLocale), item: homeUrl },
          { name: t(PAGE_CRUMB[stripLocale(route)], routeLocale), item: url },
        ]

    page = withSchema(page, {
      locale: routeLocale,
      siteName: t(HOME_META.title, routeLocale),
      schema: SCHEMA,
      t,
      breadcrumb,
      entries: isHome
        ? FAQ_QUESTIONS.map((entry) => ({
            name: t(entry.q, routeLocale),
            text: t(entry.a, routeLocale),
          }))
        : null,
    })

    /* Check the output, not the intention. Filling the node from faq.js turns
       one silent failure (a stale copy) into another (an empty one) unless
       somebody looks at what was actually written.

       Scoped to the JSON-LD block on purpose: the section below renders the
       same questions as visible text, so searching the whole page would pass
       even with the structured data empty — the exact failure this guards. */
    if (isHome) {
      const block = page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
      const faqNode = JSON.parse(block ?? '{}')['@graph']?.find((n) => n['@type'] === 'FAQPage')
      const published = faqNode?.mainEntity?.map((entry) => entry.name) ?? []
      const missing = FAQ_QUESTIONS.filter(({ q }) => !published.includes(t(q, routeLocale)))

      if (missing.length) {
        throw new Error(
          `${missing.length} of ${FAQ_QUESTIONS.length} FAQ questions missing from the ` +
            `prerendered JSON-LD: ${missing.map(({ q }) => t(q, routeLocale)).join(' | ')}`
        )
      }
    }

    /* The acceptance gate for the whole English conversion.
       /en was withdrawn once for serving Hungarian under an English URL, and
       nothing in the build noticed — that is the failure this exists to make
       impossible to repeat.

       Runs on the finished page rather than on the rendered app, and the
       difference was not theoretical: scanning only the app passed /en while
       its <head> still declared og:locale hu_HU and its JSON-LD described a
       Person whose jobTitle was "Full-stack fejlesztő". The head is where the
       copy a search engine quotes actually lives, so leaving it out checked
       everything except the part that gets republished. */
    if (routeLocale !== DEFAULT_LOCALE) {
      const leaks = hungarianLeaks(page)
      if (leaks.length) {
        throw new Error(
          `${route} is an English page but ${leaks.length} Hungarian string(s) rendered into it:\n  ` +
            `${leaks.slice(0, 20).join('\n  ')}`
        )
      }
    }

    /* Guards the guard. Every check above reports by finding nothing, so a
       broken scanner and a clean page are the same result. The Hungarian home
       page is the one input that must trip it. */
    if (route === '/' && hungarianLeaks(page).length === 0) {
      throw new Error(
        'The Hungarian-leak scan found nothing on the Hungarian home page, so it ' +
          'would pass on any page. HU_ALLOWED_ON_EN or the diacritic set is wrong.'
      )
    }

    /* Last, and deliberately a blunt string replace over the whole page rather
       than another per-tag rewrite. The tag rewrites above cover canonical and
       og:url; they never touched the JSON-LD, where the origin appears in
       every @id and in Person.url — so a domain move would have left the
       structured data pointing at the old host while the head pointed at the
       new one, which is precisely the kind of split a search engine reads as
       two sites. Anything absolute on the page is this origin, so replacing
       all of it is correct rather than merely convenient. */
    if (templateOrigin !== origin) page = page.split(templateOrigin).join(origin)

    const outFile =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html')

    await mkdir(path.dirname(outFile), { recursive: true })
    await writeFile(outFile, page, 'utf8')

    const rel = path.relative(root, outFile).replace(/\\/g, '/')
    console.log(`prerendered ${route} -> ${rel} (${appHtml.length} chars of markup)`)
  }

  /* dist/404.html. Vercel serves this file, with a 404 status, for any path
     its static output does not match. The status was already correct before
     this existed — what the visitor got with it was 79 bytes of text/plain.

     Written outside the loop and deliberately not added to ROUTE_PATHS. It is
     not a route: nothing links to it, it must never reach the sitemap, and
     unlike every real page it carries noindex and no canonical. A canonical
     here would be an instruction to treat every dead URL on the domain as the
     same page as the home page.

     One file, served in both languages. It is prerendered in Hungarian and
     the component swaps to English on hydration when the path starts with
     /en, because an address that produced a 404 cannot be trusted to say
     anything about language. */
  const notFoundHtml = render('/404')
  if (notFoundHtml.length < 400) {
    throw new Error(
      `The 404 page rendered only ${notFoundHtml.length} characters. ` +
        'Most likely the catch-all <Route path="*"> is gone from src/routes.jsx.'
    )
  }

  let notFound = template.replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`)
  notFound = replaceLang(notFound, DEFAULT_LOCALE)

  const notFoundTitle = t(NOT_FOUND_META.title, DEFAULT_LOCALE)
  notFound = replaceTitle(notFound, notFoundTitle)
  notFound = replaceMeta(notFound, 'property', 'og:title', notFoundTitle)
  notFound = replaceMeta(notFound, 'name', 'twitter:title', notFoundTitle)

  const notFoundDescription = t(NOT_FOUND_META.description, DEFAULT_LOCALE)
  notFound = replaceMeta(notFound, 'name', 'description', notFoundDescription)
  notFound = replaceMeta(notFound, 'property', 'og:description', notFoundDescription)
  notFound = replaceMeta(notFound, 'name', 'twitter:description', notFoundDescription)

  /* Person and WebSite stay true here as they do everywhere; FAQPage does
     not, and entries: null is what drops it. */
  notFound = withSchema(notFound, {
    locale: DEFAULT_LOCALE,
    siteName: t(HOME_META.title, DEFAULT_LOCALE),
    schema: SCHEMA,
    t,
    entries: null,
  })

  const canonicalTag = /<link\s+rel="canonical"[^>]*>/i
  if (!canonicalTag.test(notFound)) {
    throw new Error('The 404 template has no <link rel="canonical"> to replace with noindex.')
  }
  notFound = notFound.replace(canonicalTag, '<meta name="robots" content="noindex" />')

  if (templateOrigin !== origin) notFound = notFound.split(templateOrigin).join(origin)

  await writeFile(path.join(distDir, '404.html'), notFound, 'utf8')
  console.log(`prerendered 404 -> dist/404.html (${notFoundHtml.length} chars of markup)`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
