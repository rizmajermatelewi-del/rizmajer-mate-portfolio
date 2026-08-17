import { describe, it, expect, beforeAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ROUTE_PATHS } from './routePaths'

/* sitemap.xml is the third place that lists this site's routes, after
   routePaths.js and routes.jsx. The first two already read from one source;
   the sitemap was a hand-maintained file that nothing checked, so a route added
   to the app and forgotten here would simply never be submitted to a search
   engine — and a route removed from the app but left here would keep pointing
   crawlers at a 404. Neither fails a build or shows up in the browser.

   Since 2026-08-17 the file is generated from ROUTE_PATHS by
   scripts/generate-static.mjs, so these checks are no longer catching a human
   editing one list and not the other — they are checking that the generator
   still does what it says. That is worth keeping: the generator is now the
   single point where this can go wrong for every route at once.

   It also means the file under test does not exist until something builds it,
   and it is gitignored, so a fresh clone has no copy. Hence the beforeAll —
   reading it at module scope threw on a clean checkout. */

const root = process.cwd()
let sitemap
let locs
let sitemapPaths

beforeAll(() => {
  execFileSync('node', ['scripts/generate-static.mjs'], { cwd: root })
  sitemap = readFileSync(path.resolve(root, 'public/sitemap.xml'), 'utf8')
  locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  sitemapPaths = locs.map((url) => {
    const p = url.replace(/^https?:\/\/[^/]+/, '')
    return p === '' ? '/' : p
  })
})

describe('sitemap.xml', () => {
  /* Guards the guard: if the extraction stopped matching, everything below
     would compare two empty lists and pass. */
  it('parses at least the homepage out of the sitemap', () => {
    expect(locs.length).toBeGreaterThan(0)
    expect(sitemapPaths).toContain('/')
  })

  it('lists exactly the routes the app answers', () => {
    expect([...sitemapPaths].sort()).toEqual([...ROUTE_PATHS].sort())
  })

  it('names no route the app does not answer', () => {
    for (const p of sitemapPaths) {
      expect(ROUTE_PATHS, `sitemap.xml points crawlers at ${p}, which is not a route`).toContain(p)
    }
  })

  it('lists every route the app answers', () => {
    for (const p of ROUTE_PATHS) {
      expect(sitemapPaths, `${p} is a route but is missing from sitemap.xml`).toContain(p)
    }
  })

  /* This used to require an ISO <lastmod> on every entry. The dates are gone
     on purpose: Google ignores changefreq and priority outright and trusts
     lastmod only where a site has earned it, which a hand-edited date cannot —
     the moment one page changes without its date being touched, every date in
     the file becomes noise. The old file carried six, the newest of which was
     already weeks behind the pages it described.

     Asserted as an absence rather than deleted, so that reintroducing dates is
     a deliberate act with this reasoning in front of it. */
  it('publishes no lastmod, changefreq or priority', () => {
    expect(sitemap).not.toContain('<lastmod>')
    expect(sitemap).not.toContain('<changefreq>')
    expect(sitemap).not.toContain('<priority>')
  })

  it('serves every URL from one origin', () => {
    const origins = new Set(locs.map((url) => (url.match(/^https?:\/\/[^/]+/) ?? [''])[0]))
    expect(origins.size, `sitemap mixes origins: ${[...origins].join(', ')}`).toBe(1)
  })

  it('fails when a route is missing from the sitemap', () => {
    const withoutOne = sitemapPaths.filter((p) => p !== '/fejleszto')

    expect(withoutOne).not.toContain('/fejleszto')
    expect(ROUTE_PATHS).toContain('/fejleszto')
  })
})
