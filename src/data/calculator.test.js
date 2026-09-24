import { describe, it, expect } from 'vitest'
import { ADDONS, CALC_SERVICES, addonsFor, estimate } from './calculator'
import { ALL_SERVICES } from './services'
import { untranslatedIn } from '../i18n/t'

describe('price calculator', () => {
  it('never quotes below the catalogue floor', () => {
    for (const s of CALC_SERVICES) {
      expect(estimate(s.id), s.id).toBeGreaterThanOrEqual(s.priceHuf)
      const all = addonsFor(s.id).map((a) => a.id)
      expect(estimate(s.id, all), s.id).toBeGreaterThanOrEqual(estimate(s.id))
    }
  })

  it('adds percentages to the base, not to each other, and rounds up to 10 000', () => {
    // webshop 890 000: +30% english = 267 000, +25% rush = 222 500 -> 1 379 500 -> 1 380 000
    expect(estimate('webshop', ['english', 'rush'])).toBe(1380000)
    // bemutatkozo 240 000 + copy 40 000 + payment 90 000 = 370 000
    expect(estimate('bemutatkozo', ['copy', 'payment'])).toBe(370000)
  })

  it('ignores an add-on that does not apply to the chosen service', () => {
    expect(estimate('webshop', ['payment'])).toBe(estimate('webshop'))
  })

  it('only offers one-off builds, and knows every add-on target', () => {
    expect(CALC_SERVICES.every((s) => (s.priceUnit ?? 'from') === 'from')).toBe(true)
    const ids = new Set(ALL_SERVICES.map((s) => s.id))
    for (const a of ADDONS) for (const id of a.appliesTo) expect(ids.has(id), `${a.id} -> ${id}`).toBe(true)
    expect(untranslatedIn(ADDONS)).toEqual([])
    expect(estimate('nincs-ilyen')).toBeNull()
  })
})

describe('page count', () => {
  it('charges only pages beyond the included five, capped at the maximum', async () => {
    const { estimate, PAGES } = await import('./calculator')
    // cegoldal 420 000; 8 pages = 3 extra x 25 000 = 495 000 -> 500 000
    expect(estimate('cegoldal', [], 8)).toBe(500000)
    expect(estimate('cegoldal', [], 3)).toBe(estimate('cegoldal'))
    expect(estimate('cegoldal', [], 99)).toBe(estimate('cegoldal', [], PAGES.max))
    expect(estimate('webshop', [], 15)).toBe(estimate('webshop'))
  })
})
