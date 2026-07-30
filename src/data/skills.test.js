import { describe, it, expect } from 'vitest'
import { SKILLS_FULL, SKILL_CATEGORIES } from './skills'

describe('SKILLS_FULL', () => {
  it('gives every skill one of the declared categories', () => {
    for (const s of SKILLS_FULL) {
      expect(SKILL_CATEGORIES, `${s.title} has an unknown category: ${s.category}`).toContain(s.category)
    }
  })

  /* ServicesGrid builds its display order with
     SKILL_CATEGORIES.flatMap(c => SKILLS_FULL.filter(s => s.category === c)).
     A typo in either list drops the affected tile from the grid with no error
     anywhere — it just stops being on the page. This is the guard for that. */
  it('loses no skill when grouped into categories', () => {
    const grouped = SKILL_CATEGORIES.flatMap((c) => SKILLS_FULL.filter((s) => s.category === c))
    expect(grouped).toHaveLength(SKILLS_FULL.length)
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
