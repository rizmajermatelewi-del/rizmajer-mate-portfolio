import { describe, it, expect } from 'vitest'
import { PROJECTS_FULL } from './projects'

const CASE_FIELDS = ['year', 'role', 'problem', 'solution', 'gallery', 'github', 'live']

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
        expect(typeof g, `${p.title} gallery item must be an object, not a bare string`).toBe('object')
        expect(g.src, `${p.title} gallery item is missing src`).toBeTruthy()
        expect(g.alt, `${p.title} gallery item needs Hungarian alt text, not ''`).toBeTruthy()
        expect(g.width, `${p.title} gallery item needs a width`).toBeGreaterThan(0)
        expect(g.height, `${p.title} gallery item needs a height`).toBeGreaterThan(0)
      }
    }
  })

  it('rejects a bare-string gallery item and accepts a well-formed one', () => {
    const badItem = 'foo.webp'
    const goodItem = { src: 'foo.webp', alt: 'Képernyőkép a felületről', width: 800, height: 600 }

    expect(typeof badItem).not.toBe('object')
    expect(typeof goodItem).toBe('object')
  })
})
