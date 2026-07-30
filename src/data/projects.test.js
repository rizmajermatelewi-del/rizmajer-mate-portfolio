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
