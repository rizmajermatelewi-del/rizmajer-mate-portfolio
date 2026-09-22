import { describe, it, expect } from 'vitest'
import { PROJECTS_FULL, PROJECT_COUNT, LIVE_COUNT, REPO_COUNT } from './projects'
import { SITE_ORIGIN } from '../site.js'

const CASE_FIELDS = ['year', 'role', 'problem', 'solution', 'gallery', 'github', 'live']

/* Pulled out of the loop below so the negative case can call the real
   assertions instead of restating them. */
function assertGalleryItemShape(g, label) {
  expect(typeof g, `${label} gallery item must be an object, not a bare string`).toBe('object')
  expect(g.src, `${label} gallery item is missing src`).toBeTruthy()
  expect(g.alt, `${label} gallery item needs Hungarian alt text, not ''`).toBeTruthy()
  expect(g.width, `${label} gallery item needs a width`).toBeGreaterThan(0)
  expect(g.height, `${label} gallery item needs a height`).toBeGreaterThan(0)
}

function labelHu(p) {
  return typeof p.label === 'string' ? p.label : p.label?.hu
}

describe('PROJECTS_FULL', () => {
  /* The reason two entries were deleted on 2026-08-10: both were labelled
     'Ügyfélprojekt' and described work that had never been delivered or
     invoiced, on the one section of the site whose entire job is proof. That is
     not a typo you notice in review — it reads perfectly well and is simply
     untrue, and the person who finds out is a prospect asking for a reference.

     So the rule is mechanical now. Call something client work and you must be
     able to hand over a URL or a repo. AB Masszázs is a real salon and will
     pass this the day it ships; until then it stays out. */
  it('never claims client work without something a stranger can open', () => {
    for (const p of PROJECTS_FULL) {
      if (labelHu(p) !== 'Ügyfélprojekt') continue
      expect(
        Boolean(p.live) || p.github !== '#',
        `${p.title} is labelled Ügyfélprojekt but has no live URL and no repo to back it`,
      ).toBe(true)
    }
  })

  /* What it is for: the number of projects is a fact this repo has already
     let rot once, by keeping it in four files at the same time. Pinning it
     here makes adding or removing an entry deliberate, and PROJECT_COUNT
     must stay in sync so Pillars cannot drift. */
  it('pins the project count, so a change to the list cannot be accidental', () => {
    expect(PROJECTS_FULL).toHaveLength(3)
    expect(PROJECT_COUNT).toBe(PROJECTS_FULL.length)
  })

  it('exports live and repo counts from the same list Pillars reads', () => {
    expect(LIVE_COUNT).toBe(PROJECTS_FULL.filter((p) => Boolean(p.live)).length)
    expect(REPO_COUNT).toBe(PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length)
    expect(LIVE_COUNT).toBeGreaterThanOrEqual(1)
    expect(REPO_COUNT).toBeGreaterThanOrEqual(1)
  })

  it('gives every project every case-study field, so the modal never reads undefined', () => {
    for (const p of PROJECTS_FULL) {
      for (const field of CASE_FIELDS) {
        expect(p, `${p.title} is missing ${field}`).toHaveProperty(field)
      }
    }
  })

  it('keeps github as # or a real https URL — never a fake or relative link', () => {
    for (const p of PROJECTS_FULL) {
      if (p.github === '#') continue
      expect(p.github, `${p.title} github must be https`).toMatch(/^https:\/\//)
      expect(p.github).not.toMatch(/example\.(com|org)|localhost|TODO|KITÖLTENDŐ/i)
    }
  })

  it('keeps live empty or a real https URL on this origin or a public host', () => {
    for (const p of PROJECTS_FULL) {
      if (!p.live) continue
      expect(p.live, `${p.title} live must be https`).toMatch(/^https:\/\//)
      expect(p.live).not.toMatch(/example\.(com|org)|localhost|127\.0\.0\.1|TODO|KITÖLTENDŐ/i)
    }
  })

  it('ships this portfolio with its real live URL and public repo', () => {
    const self = PROJECTS_FULL.find((p) => p.live?.startsWith(SITE_ORIGIN))
    expect(self, 'expected a project whose live URL is this site').toBeTruthy()
    expect(self.github).toBe('https://github.com/rizmajermatelewi-del/rizmajer-mate-portfolio')
    expect(self.image).toBeTruthy()
    expect(self.featured).toBe(true)
  })

  it('keeps gallery an array so the modal can map over it safely', () => {
    for (const p of PROJECTS_FULL) {
      expect(Array.isArray(p.gallery)).toBe(true)
    }
  })

  it('gives every gallery item a src, real alt text, and intrinsic dimensions', () => {
    for (const p of PROJECTS_FULL) {
      for (const g of p.gallery) {
        assertGalleryItemShape(g, p.title)
      }
    }
  })

  it('fails on a gallery item that is missing alt text or dimensions', () => {
    const good = { src: 'foo.webp', alt: 'Képernyőkép a felületről', width: 800, height: 600 }

    expect(() => assertGalleryItemShape(good, 'good')).not.toThrow()
    expect(() => assertGalleryItemShape('foo.webp', 'bare string')).toThrow()
    expect(() => assertGalleryItemShape({ ...good, alt: '' }, 'empty alt')).toThrow()
    expect(() => assertGalleryItemShape({ ...good, width: undefined }, 'no width')).toThrow()
    expect(() => assertGalleryItemShape({ ...good, height: 0 }, 'zero height')).toThrow()
  })

  it('keeps features an array of bilingual fields when filled', () => {
    for (const p of PROJECTS_FULL) {
      expect(Array.isArray(p.features), `${p.title} features must be an array`).toBe(true)
      for (const f of p.features) {
        expect(f, `${p.title} feature needs hu`).toHaveProperty('hu')
        expect(f, `${p.title} feature needs en`).toHaveProperty('en')
        expect(f.hu).toBeTruthy()
        expect(f.en).toBeTruthy()
      }
    }
  })

  /* The badge means "this is the strongest one". Two of them means it means
     nothing, and the card renders it from a plain boolean per project, so
     nothing in the component itself would stop a second one appearing. */
  it('never marks more than one project as featured', () => {
    for (const p of PROJECTS_FULL) {
      expect(typeof p.featured, `${p.title} featured must be a boolean`).toBe('boolean')
    }
    expect(PROJECTS_FULL.filter((p) => p.featured).length).toBeLessThanOrEqual(1)
  })
})
