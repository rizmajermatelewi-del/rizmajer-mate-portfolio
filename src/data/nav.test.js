import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { NAV_LINKS } from './nav'

/* Why this file exists.

   The navbar order drifted out of step with the page twice, and both times it
   was only caught by a person scrolling the site: GYIK stayed last after the
   FAQ moved above the price, and Rólam stayed second after Projects moved down
   below Pillars. Clicking a nav item then scrolled you *backwards* past
   sections you had already read.

   Nothing connects NAV_LINKS to App.jsx, so nothing could notice. This reads
   both and makes the connection explicit: the page order is derived from the
   source rather than restated here, so this test cannot itself go stale the
   way a hardcoded list of ids would. */

const read = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

/* The section ids in the order App.jsx renders them. Each section owns its own
   id, so the id is read out of the component file rather than duplicated. */
function pageOrder() {
  const app = read('../App.jsx')
  const main = app.slice(app.indexOf('<main>'), app.indexOf('</main>'))
  const components = [...main.matchAll(/<([A-Z][A-Za-z]*)\s*\/>/g)].map((m) => m[1])

  return components
    .map((name) => {
      const source = read(`../sections/${name}.jsx`)
      return source.match(/id="([a-z-]+)"/)?.[1] ?? null
    })
    .filter(Boolean)
}

const ORDER = pageOrder()
const anchorsIn = (rel) => [...read(rel).matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1])

describe('NAV_LINKS', () => {
  /* Guards the guard: if the extraction above silently stopped matching, every
     other assertion here would pass vacuously against an empty list. */
  it('derives a page order to check against', () => {
    expect(ORDER.length).toBeGreaterThanOrEqual(5)
    expect(ORDER[0]).toBe('kezdolap')
  })

  it('points every link at a section that exists', () => {
    for (const { label, href } of NAV_LINKS) {
      expect(ORDER, `${label} points at ${href}, which no section renders`).toContain(href.slice(1))
    }
  })

  it('lists the sections in the order the page renders them', () => {
    const positions = NAV_LINKS.map(({ href }) => ORDER.indexOf(href.slice(1)))

    /* Strictly increasing, so clicking down the nav always scrolls down the
       page. The message names the offender rather than printing two arrays. */
    for (let i = 1; i < positions.length; i++) {
      expect(
        positions[i],
        `${NAV_LINKS[i].label} sits after ${NAV_LINKS[i - 1].label} in the navbar but before it on the page`,
      ).toBeGreaterThan(positions[i - 1])
    }
  })

  it('fails when a link is moved out of page order', () => {
    const swapped = [...NAV_LINKS]
    ;[swapped[0], swapped[1]] = [swapped[1], swapped[0]]
    const positions = swapped.map(({ href }) => ORDER.indexOf(href.slice(1)))

    expect(positions[1]).toBeLessThan(positions[0])
  })
})

describe('Footer links', () => {
  /* The footer is laid out in columns, so its anchors are not in page order and
     should not be. What it must not do is point at a section that is gone —
     that is how a link dies silently. */
  it('points every in-page link at a section that exists', () => {
    for (const id of anchorsIn('../sections/Footer.jsx')) {
      expect(ORDER, `the footer links to #${id}, which no section renders`).toContain(id)
    }
  })
})
