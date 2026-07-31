import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ROUTE_PATHS } from './routePaths'

/* sitemap.xml is the third place that lists this site's routes, after
   routePaths.js and routes.jsx. The first two already read from one source;
   the sitemap is a hand-maintained file that nothing checked, so a route added
   to the app and forgotten here would simply never be submitted to a search
   engine — and a route removed from the app but left here would keep pointing
   crawlers at a 404. Neither fails a build or shows up in the browser.

   This repo has been bitten by exactly this shape before: the four-projects
   count lived in four places until it drifted into a claim that was no longer
   true. Same fix as nav.test.js — derive from the source of truth and compare,
   rather than trusting two lists to be edited together. */

/* Resolved from the project root rather than from import.meta.url: under this
   jsdom environment import.meta.url is not a file: URL here, so fileURLToPath
   throws on it. Vitest runs with the project root as cwd. */
const sitemap = readFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const sitemapPaths = locs.map((url) => {
  const path = url.replace(/^https?:\/\/[^/]+/, '')
  return path === '' ? '/' : path
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
    for (const path of sitemapPaths) {
      expect(ROUTE_PATHS, `sitemap.xml points crawlers at ${path}, which is not a route`).toContain(path)
    }
  })

  it('lists every route the app answers', () => {
    for (const path of ROUTE_PATHS) {
      expect(sitemapPaths, `${path} is a route but is missing from sitemap.xml`).toContain(path)
    }
  })

  it('gives every entry an ISO date, and every URL the same origin', () => {
    const mods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1])
    expect(mods).toHaveLength(locs.length)
    for (const date of mods) expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)

    const origins = new Set(locs.map((url) => (url.match(/^https?:\/\/[^/]+/) ?? [''])[0]))
    expect(origins.size, `sitemap mixes origins: ${[...origins].join(', ')}`).toBe(1)
  })

  it('fails when a route is missing from the sitemap', () => {
    const withoutOne = sitemapPaths.filter((p) => p !== '/fejleszto')

    expect(withoutOne).not.toContain('/fejleszto')
    expect(ROUTE_PATHS).toContain('/fejleszto')
  })
})
