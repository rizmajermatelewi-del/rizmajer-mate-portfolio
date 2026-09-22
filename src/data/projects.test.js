import { describe, it, expect } from 'vitest'
import { LIVE_COUNT, PROJECT_COUNT, PROJECTS_FULL, REPO_COUNT } from './projects'

const CASE_FIELDS = ['year', 'role', 'problem', 'solution', 'gallery', 'github', 'live']

function assertGalleryItemShape(g, label) {
  expect(typeof g, `${label} gallery item must be an object, not a bare string`).toBe('object')
  expect(g.src, `${label} gallery item is missing src`).toBeTruthy()
  expect(g.alt, `${label} gallery item needs Hungarian alt text, not ''`).toBeTruthy()
  expect(g.width, `${label} gallery item needs a width`).toBeGreaterThan(0)
  expect(g.height, `${label} gallery item needs a height`).toBeGreaterThan(0)
}

describe('PROJECTS_FULL', () => {
  it('never claims client work without something a stranger can open', () => {
    for (const p of PROJECTS_FULL) {
      const labelHu = typeof p.label === 'object' ? p.label.hu : p.label
      if (labelHu !== 'Ügyfélprojekt') continue
      expect(
        Boolean(p.live) || p.github !== '#',
        `${p.title} is labelled Ügyfélprojekt but has no live URL and no repo to back it`,
      ).toBe(true)
    }
  })

  it('pins the project count, so a change to the list cannot be accidental', () => {
    expect(PROJECTS_FULL).toHaveLength(2)
    expect(PROJECT_COUNT).toBe(2)
  })

  it('keeps derived live/repo counts in sync with the array', () => {
    expect(LIVE_COUNT).toBe(PROJECTS_FULL.filter((p) => p.live).length)
    expect(REPO_COUNT).toBe(
      PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length,
    )
  })

  it('gives every project every case-study field, so the modal never reads undefined', () => {
    for (const p of PROJECTS_FULL) {
      for (const field of CASE_FIELDS) {
        expect(p, `${p.title} is missing ${field}`).toHaveProperty(field)
      }
    }
  })

  it('ships a public live URL for every demo', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.live, `${p.title} needs a live https URL`).toMatch(/^https:\/\//)
    }
    expect(LIVE_COUNT).toBe(PROJECTS_FULL.length)
  })

  /* github stays '#' until the separate portfolio-demos repo is created and
     pushed — the cloud agent cannot create GitHub repositories. When that
     lands, flip DEMOS_REPO_READY in projects.js and expect real URLs here. */
  it('keeps github honest: either a public URL or the # placeholder', () => {
    for (const p of PROJECTS_FULL) {
      if (p.github === '#') continue
      expect(p.github).toMatch(/^https:\/\/github\.com\//)
    }
  })

  it('labels demos as Bemutató projekt, never fake client work', () => {
    for (const p of PROJECTS_FULL) {
      const labelHu = typeof p.label === 'object' ? p.label.hu : p.label
      expect(labelHu).toBe('Bemutató projekt')
    }
  })

  it('ships a card screenshot with alt text for every demo', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.image, `${p.title} needs a card image`).toBeTruthy()
      expect(p.imageAlt, `${p.title} needs imageAlt`).toBeTruthy()
    }
  })

  it('keeps gallery an array so the modal can map over it safely', () => {
    for (const p of PROJECTS_FULL) {
      expect(Array.isArray(p.gallery)).toBe(true)
      expect(p.gallery.length, `${p.title} needs gallery shots`).toBeGreaterThanOrEqual(2)
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

  it('keeps features an array so the card can map over it safely', () => {
    for (const p of PROJECTS_FULL) {
      expect(Array.isArray(p.features), `${p.title} features must be an array`).toBe(true)
    }
  })

  it('never marks more than one project as featured', () => {
    for (const p of PROJECTS_FULL) {
      expect(typeof p.featured, `${p.title} featured must be a boolean`).toBe('boolean')
    }
    expect(PROJECTS_FULL.filter((p) => p.featured).length).toBeLessThanOrEqual(1)
  })
})
