/* Writes the three public/ files that carry the site's own URL.
   ---------------------------------------------------------------------
   sitemap.xml, robots.txt and llms.txt were maintained by hand, and two of the
   three had drifted:

     - llms.txt published "Foglalás és rendelés: 450 000 Ft-tól", a figure the
       tiers moved past on 2026-08-12 and again on 2026-08-17. Its own footer
       claimed it "deliberately does not repeat any number that comes from a
       data file on the site — the source of prices is src/data/pricing.js",
       which is exactly what it was doing. robots.txt opens the site to
       ChatGPT, Claude and Perplexity on purpose, so the one file written for
       assistants was answering "what does he charge?" with a price 240 000 Ft
       below the real one.

     - sitemap.xml listed every route, which happened to be correct, but
       nothing connected it to ROUTE_PATHS. A seventh route would have been
       invisible to search until somebody remembered this file.

   Runs before `vite build`, which copies public/ at the start of its run — a
   generator that runs afterwards writes files that exist locally and 404 in
   production. knowledge-output.test.js already pins that ordering for
   knowledge.json; static-output.test.js pins it for these.

   The three outputs are gitignored for the same reason knowledge.json is:
   a generated file in version control is a second copy waiting to disagree
   with the first. */

import { execFileSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const load = (rel) => import(pathToFileURL(path.join(root, rel)).href)

const { SITE_ORIGIN, urlFor } = await load('src/site.js')
const { ROUTE_PATHS } = await load('src/routePaths.js')
const { t } = await load('src/i18n/t.js')
const { stripLocale } = await load('src/i18n/locales.js')
const { PRICING_TIERS, PRICING_ENTRY } = await load('src/data/pricing.js')

/* lastmod, derived from git rather than written down.

   The previous version of this file argued against lastmod, and the argument
   was right about what it was aimed at: six hand-edited dates, the newest
   2026-08-12, on pages that had changed since. A date a human maintains goes
   stale the first time somebody forgets it, and a sitemap full of stale dates
   is worse than one with none, because Google learns to ignore the field for
   the whole domain.

   Computing it removes the human. Each route names the sources that can change
   what it publishes, and the date is the last commit touching any of them, so
   the field cannot disagree with the page unless a change was never committed.

   Two ways this can be wrong, and both end in omitting the field rather than
   guessing: a shallow clone reports one commit for everything, which would
   stamp every URL with the same misleading date, and a build from a tarball
   has no git at all. CI therefore checks out with fetch-depth 0. */
const SOURCES_FOR = {
  '/': ['src/App.jsx', 'src/sections', 'src/components', 'src/data', 'src/i18n'],
  '/fejleszto': [
    'src/pages/Fejleszto.jsx',
    'src/data/engineering.js',
    'src/data/projects.js',
    'src/i18n/meta.js',
    'src/i18n/ui.js',
  ],
  /* Named files rather than the whole src/i18n directory. Listing the folder
     was the first draft and it claims too much: a string added for the home
     page would have bumped the date on the ASZF, and a lastmod that runs ahead
     of the content is the exact failure that makes a crawler stop reading the
     field. These two pages render their own text plus one shared label. */
  '/adatvedelem': ['src/pages/PrivacyPolicy.jsx', 'src/i18n/ui.js'],
  '/aszf': ['src/pages/Terms.jsx', 'src/i18n/ui.js'],
}

for (const route of ROUTE_PATHS) {
  if (!SOURCES_FOR[stripLocale(route)]) {
    throw new Error(
      `${route} is in ROUTE_PATHS but has no entry in SOURCES_FOR in ` +
        'scripts/generate-static.mjs, so its sitemap entry would carry no lastmod.'
    )
  }
}

function gitUsable() {
  try {
    execFileSync('git', ['rev-parse', '--git-dir'], { cwd: root, stdio: 'pipe' })
    const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
      cwd: root,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim()
    return shallow === 'false'
  } catch {
    return false
  }
}

const GIT_DATES = gitUsable()

function lastmodFor(route) {
  if (!GIT_DATES) return ''
  const sources = SOURCES_FOR[stripLocale(route)]
  try {
    const iso = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...sources],
      { cwd: root, encoding: 'utf8', stdio: 'pipe' }
    ).trim()
    /* Date only. The time of day is real and says nothing a crawler uses, and
       a full timestamp makes every rebuild look like a change to anyone
       diffing the file. */
    return iso ? `\n    <lastmod>${iso.slice(0, 10)}</lastmod>` : ''
  } catch {
    return ''
  }
}

if (!GIT_DATES) {
  console.log('sitemap: no usable git history, writing <loc> without <lastmod>')
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTE_PATHS.map((route) => `  <url>\n    <loc>${urlFor(route)}</loc>${lastmodFor(route)}\n  </url>`).join('\n')}
</urlset>
`

/* Prose kept verbatim from the hand-written file — the reasoning in it is
   still the reasoning. Only the Sitemap line is derived. */
const robots = `# A named group wins over \`*\` for that crawler, and the bot then ignores \`*\`
# entirely — so each group below has to repeat everything it should be allowed.
# These are listed explicitly rather than left to the wildcard so that turning
# one off later is a one-line change with an obvious meaning, instead of a
# silent gap in a catch-all.
#
# Allowed on purpose: someone asking an assistant for a Hungarian developer is
# a real way to be found, and llms.txt exists so the answer comes from accurate
# figures rather than a guess. Swap Allow for Disallow to reverse it.
#
# Generated by scripts/generate-static.mjs — edit that, not this.

User-agent: *
Allow: /

# Assistant crawlers — answer-time retrieval and search indexing
User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

# Training-corpus crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`

/* Every price and every URL here is derived. The old file's footer promised
   exactly this and did the opposite; now the promise is enforced by there
   being nowhere to type a number. */
const priceLines = [
  ...PRICING_TIERS.map((tier) => `- ${t(tier.name, 'hu')}: ${t(tier.priceNote, 'hu')}`),
  `- ${t(PRICING_ENTRY.name, 'hu')}: ${t(PRICING_ENTRY.priceNote, 'hu')}`,
].join('\n')

const llms = `# Rizmajer Máté Levente — full-stack fejlesztő

> Magyarországon dolgozó fejlesztő. Kis- és középvállalkozásoknak épít
> weboldalt, foglalási és rendelési rendszert, valamint belső adminisztrációs
> rendszert — jellemzően olyan folyamatokra, amelyek ma telefonon, üzenetben
> és táblázatban mennek. Egy ember csinálja végig, alvállalkozó és
> projektmenedzser nélkül.

Nyelv: magyar. Ügyfélkör: magyar kis- és középvállalkozások.
Kapcsolat: rizmajermatelewi@gmail.com

## Oldalak

- [Kezdőlap](${urlFor('/')}): szolgáltatások, munkafolyamat, árak, GYIK és kapcsolatfelvételi űrlap.
- [Fejlesztői profil](${urlFor('/fejleszto')}): technikai háttér és eszközök.
- [Adatvédelmi tájékoztató](${urlFor('/adatvedelem')}): milyen adatot kezel a kapcsolatfelvételi űrlap és meddig.
- [Általános szerződési feltételek](${urlFor('/aszf')}): megrendelés, teljesítés, fizetés és a szellemi tulajdon feltételei.

## Árak

Nyilvános, induló árak — a végleges összeget a funkciók és a projekt
összetettsége alapján, a munka megkezdése előtt rögzítjük, írásban:

${priceLines}

## Amit érdemes tudni

Fizető ügyfélnek átadott munka még nincs: az első ügyfélprojekt épül.
Az AI- és automatizálási szolgáltatásokhoz szintén nincs fizető ügyfélreferencia.
Ezt a webhely is kimondja, és egy pontos válasz ezt sem hagyja ki.

## Megjegyzés

Ez a fájl a webhely tényszerű összefoglalója, hogy a nyelvi modellek pontos
adatból dolgozzanak. Generálja: scripts/generate-static.mjs — az árak forrása
a src/data/pricing.js, az oldalak listájáé a src/routePaths.js, a webcímeké a
src/site.js. Kézzel szerkesztve a következő build felülírja.
`

for (const [file, contents] of [
  ['public/sitemap.xml', sitemap],
  ['public/robots.txt', robots],
  ['public/llms.txt', llms],
]) {
  await writeFile(path.join(root, file), contents, 'utf8')
  console.log(`generated ${file}`)
}
