import { describe, it, expect, beforeAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { SITE_ORIGIN } from '../site.js'
import { PRICING_TIERS } from './pricing.js'
import { t } from '../i18n/t.js'

/* Runs the generator for real rather than trusting it was wired up — the same
   shape as knowledge-output.test.js, and for the same reason: the failure
   worth catching is the file never reaching dist/. */
const root = process.cwd()
const read = (rel) => readFileSync(path.join(root, rel), 'utf8')

beforeAll(() => {
  execFileSync('node', ['scripts/generate-static.mjs'], { cwd: root })
})

describe('generated public files', () => {
  it('runs before vite copies public/', () => {
    const build = JSON.parse(read('package.json')).scripts.build
    const genAt = build.indexOf('generate-static.mjs')
    const viteAt = build.indexOf('vite build')
    expect(genAt, 'generate-static.mjs is not in the build script').toBeGreaterThan(-1)
    expect(genAt, 'the generator must run before `vite build` copies public/').toBeLessThan(viteAt)
  })

  it('leaves no generated file tracked in git', () => {
    const ignore = read('.gitignore')
    for (const file of ['public/sitemap.xml', 'public/robots.txt', 'public/llms.txt']) {
      expect(ignore, `${file} is generated but not ignored`).toContain(file)
    }
  })
})

/* sitemap.xml's contents are asserted in src/routePaths.test.js, which has
   covered them since before the file was generated and already carries the
   guard-the-guard case. Repeating the route comparison here would be two files
   failing for one cause. What is checked below is the part that file does not
   own: the origin, and llms.txt. */

describe('llms.txt', () => {
  /* The reason this file is generated at all. It published
     "Foglalás és rendelés: 450 000 Ft-tól" — two tier revisions behind — while
     its own footer claimed it repeated no figure that came from a data file.
     robots.txt opens the site to assistant crawlers deliberately, so a stale
     price here is a wrong answer given to somebody asking what he charges. */
  it('quotes every tier at the price pricing.js currently sets', () => {
    const txt = read('public/llms.txt')
    for (const tier of PRICING_TIERS) {
      const line = `- ${t(tier.name, 'hu')}: ${t(tier.priceNote, 'hu')}`
      expect(txt, `llms.txt does not carry the current line for ${t(tier.name, 'hu')}`).toContain(line)
    }
  })

  it('does not claim delivered client work', () => {
    const txt = read('public/llms.txt')
    expect(txt).toContain('Fizető ügyfélnek átadott munka még nincs')
  })
})

describe('the site origin', () => {
  /* The point of src/site.js: one line to change on a domain move. If any
     generated file stopped deriving from it, the move would half-happen and
     the half left behind would be a canonical or a sitemap pointing at a host
     that is no longer the site. */
  /* An XML namespace is an identifier that happens to be spelled as a URL —
     nothing dereferences it, and it must not change when the domain does.
     Listed rather than the check being loosened to "ignore anything that is
     not the site", which would pass a stray link to the old host. */
  const NOT_A_SITE_URL = ['http://www.sitemaps.org']

  it('is the only origin in every generated file', () => {
    for (const file of ['public/sitemap.xml', 'public/robots.txt', 'public/llms.txt']) {
      const found = [...read(file).matchAll(/https?:\/\/[^/\s)"']+/g)].map((m) => m[0])
      const foreign = found.filter((u) => u !== SITE_ORIGIN && !NOT_A_SITE_URL.includes(u))
      expect(foreign, `${file} points at ${foreign.join(', ')} rather than SITE_ORIGIN`).toEqual([])
    }
  })

  it('has no trailing slash, so nothing builds a double-slashed URL', () => {
    expect(SITE_ORIGIN.endsWith('/')).toBe(false)
  })
})
