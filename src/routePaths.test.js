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

  /* The history of this assertion is the point of it.

     It first required a <lastmod> on every entry. Then it required their
     absence, because the six dates in the file were hand-maintained and the
     newest was weeks behind the pages it described — and a lastmod a crawler
     has learned to distrust is worse than none, for the whole domain. It was
     left as an assertion rather than deleted specifically so that bringing
     dates back would have to be deliberate, and on 2026-08-19 it did its job:
     the build went red the moment they came back.

     They are allowed now because nobody types them. generate-static.mjs takes
     each date from the last commit touching that route's sources, so the field
     cannot drift from the page without a change going uncommitted, and on a
     shallow clone — where every path reports the same commit — it omits the
     field instead of publishing a date it cannot stand behind.

     changefreq and priority stay banned. Google ignores both outright. */
  it('publishes a lastmod on every entry, and never changefreq or priority', () => {
    expect(sitemap).not.toContain('<changefreq>')
    expect(sitemap).not.toContain('<priority>')

    const dates = [...sitemap.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1])
    expect(dates.length, 'sitemap has fewer lastmod dates than URLs').toBe(locs.length)

    const today = new Date().toISOString().slice(0, 10)
    for (const date of dates) {
      expect(date, `${date} is not a plain ISO date`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      /* A commit date cannot be in the future, so one here means the value
         came from somewhere other than git — a clock, or a literal. */
      expect(date <= today, `${date} is in the future`).toBe(true)
    }
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
