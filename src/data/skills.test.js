import { describe, it, expect } from 'vitest'
import { SKILLS_FULL, SKILL_CATEGORIES, ORDERED_SKILLS } from './skills'

describe('SKILLS_FULL', () => {
  it('gives every skill one of the declared categories', () => {
    for (const s of SKILLS_FULL) {
      expect(SKILL_CATEGORIES, `${s.title} has an unknown category: ${s.category}`).toContain(s.category)
    }
  })

  /* ORDERED_SKILLS filters by category, so a typo in either list drops the
     affected tile from the grid and from the footer with no error anywhere — it
     just stops being on the page. Asserted against the real export rather than
     a copy of its logic, so the test fails if the derivation itself breaks. */
  it('loses no skill when grouped into categories', () => {
    expect(ORDERED_SKILLS).toHaveLength(SKILLS_FULL.length)
  })

  it('orders skills so a category never appears twice in the list', () => {
    const seen = ORDERED_SKILLS.map((s) => s.category)
    const firstIndexes = seen.map((c) => seen.indexOf(c))
    expect(firstIndexes, 'a category is split across the list, so grouping is broken').toEqual(
      [...firstIndexes].sort((a, b) => a - b),
    )
  })

  it('leaves no declared category without a skill in it', () => {
    for (const c of SKILL_CATEGORIES) {
      expect(
        SKILLS_FULL.some((s) => s.category === c),
        `${c} is declared but has no skills, so it would render as an empty group`,
      ).toBe(true)
    }
  })

  it('keeps an icon on every skill', () => {
    for (const s of SKILLS_FULL) {
      expect(s.icon, `${s.title} is missing its icon`).toBeTruthy()
    }
  })
})
