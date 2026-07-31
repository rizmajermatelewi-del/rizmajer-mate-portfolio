import { describe, it, expect } from 'vitest'
import { PROJECTS_FULL } from './projects'

const CASE_FIELDS = ['year', 'role', 'problem', 'solution', 'gallery', 'github', 'live']

/* Pulled out of the loop below so the negative case can call the real
   assertions instead of restating them. Every `gallery` is still `[]`, so the
   loop has nothing to walk; without this the guard could not fail today and
   would reach Task 2 — where it becomes load-bearing — unproven. */
function assertGalleryItemShape(g, label) {
  expect(typeof g, `${label} gallery item must be an object, not a bare string`).toBe('object')
  expect(g.src, `${label} gallery item is missing src`).toBeTruthy()
  expect(g.alt, `${label} gallery item needs Hungarian alt text, not ''`).toBeTruthy()
  expect(g.width, `${label} gallery item needs a width`).toBeGreaterThan(0)
  expect(g.height, `${label} gallery item needs a height`).toBeGreaterThan(0)
}

describe('PROJECTS_FULL', () => {
  it('still has four projects', () => {
    expect(PROJECTS_FULL).toHaveLength(4)
  })

  it('gives every project every case-study field, so the modal never reads undefined', () => {
    for (const p of PROJECTS_FULL) {
      for (const field of CASE_FIELDS) {
        expect(p, `${p.title} is missing ${field}`).toHaveProperty(field)
      }
    }
  })

  it('keeps github as a placeholder for this pass', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.github).toBe('#')
    }
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

  it('keeps features an array so the card can map over it safely', () => {
    for (const p of PROJECTS_FULL) {
      expect(Array.isArray(p.features), `${p.title} features must be an array`).toBe(true)
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
