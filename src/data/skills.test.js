import { describe, it, expect } from 'vitest'
import { SKILLS_FULL, SKILL_CATEGORIES, ORDERED_SKILLS, categoryLabel } from './skills'
import { t, untranslatedIn } from '../i18n/t'
import { LOCALES } from '../i18n/locales'

/* A category is an id that gets joined on plus a label that gets displayed.
   These assert the id side; the label side is checked separately below,
   because until they were split, translating the label broke the join. */
const CATEGORY_IDS = SKILL_CATEGORIES.map((c) => c.id)

describe('SKILLS_FULL', () => {
  it('gives every skill one of the declared categories', () => {
    for (const s of SKILLS_FULL) {
      expect(
        CATEGORY_IDS,
        `${t(s.title, 'hu')} has an unknown category: ${s.category}`,
      ).toContain(s.category)
    }
  })

  it('carries every skill and category label in both languages', () => {
    expect(untranslatedIn(SKILLS_FULL)).toEqual([])
    expect(untranslatedIn(SKILL_CATEGORIES)).toEqual([])
  })

  it('describes each skill differently in each language', () => {
    for (const s of SKILLS_FULL) {
      const rendered = LOCALES.map((locale) => t(s.detail, locale))
      expect(new Set(rendered).size, `"${t(s.title, 'hu')}" reads identically in both languages`).toBe(LOCALES.length)
    }
  })

  /* The id is never displayed and the label is never joined on. This catches
     the mix-up head on: a skill whose category was set to a label rather than
     an id would pass the first test only by coincidence. */
  it('resolves every category id to a label, and refuses an unknown one', () => {
    for (const id of CATEGORY_IDS) {
      for (const locale of LOCALES) {
        expect(t(categoryLabel(id), locale).trim().length).toBeGreaterThan(0)
      }
    }
    expect(() => categoryLabel('Adatbázis')).toThrow(/no category called/)
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
    for (const { id, label } of SKILL_CATEGORIES) {
      expect(
        SKILLS_FULL.some((s) => s.category === id),
        `${t(label, 'hu')} is declared but has no skills, so it would render as an empty group`,
      ).toBe(true)
    }
  })

  it('keeps an icon on every skill', () => {
    for (const s of SKILLS_FULL) {
      expect(s.icon, `${t(s.title, 'hu')} is missing its icon`).toBeTruthy()
    }
  })
})
