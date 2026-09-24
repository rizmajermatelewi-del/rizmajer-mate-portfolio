import { describe, it, expect } from 'vitest'
import { SERVICE_GROUPS, ALL_SERVICES, priceLabel, TIER_FLOORS } from './services'
import { PROJECTS_FULL } from './projects'
import { t, untranslatedIn } from '../i18n/t'

describe('services catalogue', () => {
  it('has four groups and every string in both languages', () => {
    expect(SERVICE_GROUPS.map((g) => g.id)).toEqual(['eladas', 'weboldalak', 'rendszerek', 'folyamatos'])
    expect(untranslatedIn(SERVICE_GROUPS)).toEqual([])
  })

  it('gives every service a unique id, a price and 3-4 includes', () => {
    expect(new Set(ALL_SERVICES.map((s) => s.id)).size).toBe(ALL_SERVICES.length)
    for (const s of ALL_SERVICES) {
      expect(s.priceHuf, s.id).toBeGreaterThan(0)
      expect(s.includes.length, s.id).toBeGreaterThanOrEqual(3)
      expect(s.includes.length, s.id).toBeLessThanOrEqual(4)
      expect(t(priceLabel(s), 'hu')).toMatch(/Ft/)
    }
  })

  /* "Élő demó" is a claim a stranger can check in one click, so it may only
     point at a demo the portfolio itself lists — and an offer marked new has,
     by definition, nothing delivered behind it to point at. */
  it('links a demo only where the portfolio has that live demo, and never on a new item', () => {
    const live = PROJECTS_FULL.map((p) => p.live)
    for (const s of ALL_SERVICES.filter((x) => x.demo)) {
      expect(live, s.id).toContain(s.demo)
      expect(s.isNew, `${s.id} cannot be both new and demoed`).toBeFalsy()
    }
    expect(ALL_SERVICES.filter((s) => s.demo)).toHaveLength(3)
  })

  it('keeps the tier floors on the matching catalogue items', () => {
    const price = (id) => ALL_SERVICES.find((s) => s.id === id).priceHuf
    expect(price('bemutatkozo')).toBe(TIER_FLOORS.intro)
    expect(price('idopontfoglalo')).toBe(TIER_FLOORS.booking)
    expect(price('egyedi-rendszer')).toBe(TIER_FLOORS.system)
  })
})
