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
    // idopontfoglalo 690 000: +30% english = 207 000, +25% rush = 172 500 -> 1 069 500 -> 1 070 000
    expect(estimate('idopontfoglalo', ['english', 'rush'])).toBe(1070000)
    // bemutatkozo 240 000 + copy 40 000 + payment 90 000 = 370 000
    expect(estimate('bemutatkozo', ['copy', 'payment'])).toBe(370000)
  })

  it('ignores an add-on that does not apply to the chosen service', () => {
    expect(estimate('napi-menu', ['payment'])).toBe(estimate('napi-menu'))
  })

  it('only offers one-off builds, and knows every add-on target', () => {
    expect(CALC_SERVICES.every((s) => (s.priceUnit ?? 'from') === 'from')).toBe(true)
    const ids = new Set(ALL_SERVICES.map((s) => s.id))
    for (const a of ADDONS) for (const id of a.appliesTo) expect(ids.has(id), `${a.id} -> ${id}`).toBe(true)
    expect(untranslatedIn(ADDONS)).toEqual([])
    expect(estimate('nincs-ilyen')).toBeNull()
  })
})

describe('kinds that replace each other', () => {
  it('treats the daily menu and ordering as one kind, ordering being the bigger one', async () => {
    const { SITE_KINDS, MENU_KINDS } = await import('./calculator')
    const ids = new Set(CALC_SERVICES.map((s) => s.id))
    for (const id of [...SITE_KINDS, ...MENU_KINDS]) expect(ids.has(id), id).toBe(true)
    expect(MENU_KINDS).toEqual(['napi-menu', 'rendeles'])
    expect(estimate('napi-menu')).toBeLessThan(estimate('rendeles'))
  })
})

describe('breakdown and upkeep', () => {
  it('lists every charged line and totals them, rounded up', async () => {
    const { breakdown } = await import('./calculator')
    const b = breakdown('bemutatkozo', ['english', 'seo'])
    // 240 000 + 72 000 english + 50 000 seo = 362 000 -> 370 000
    expect(b.lines.map((l) => l.id)).toEqual(['bemutatkozo', 'english', 'seo'])
    expect(b.lines.reduce((a, l) => a + l.huf, 0)).toBe(362000)
    expect(b.total).toBe(370000)
    expect(untranslatedIn(b.lines.map((l) => l.label))).toEqual([])
  })

  it('offers both monthly upkeep tiers', async () => {
    const { UPKEEP } = await import('./calculator')
    expect(UPKEEP.map((s) => s.id)).toEqual(['uzemeltetes-alap', 'uzemeltetes'])
  })
})

describe('combined services', () => {
  it('sums the services, charges a flat extra once and a percentage on what it covers', async () => {
    const { breakdown } = await import('./calculator')
    // bemutatkozo 240 000 + idopontfoglalo 690 000 + napi-menu 350 000 = 1 280 000
    // payment flat 90 000 once; english 30% of all three = 384 000
    const b = breakdown(['bemutatkozo', 'idopontfoglalo', 'napi-menu'], ['payment', 'english'])
    expect(b.lines.reduce((a, l) => a + l.huf, 0)).toBe(1280000 + 90000 + 384000)
    expect(b.total).toBe(1760000)
    expect(breakdown(['bemutatkozo', 'nincs-ilyen'])).toBeNull()
  })
})

describe('running costs and payment', () => {
  it('splits the price into two parts that add up exactly', async () => {
    const { paymentSplit } = await import('./calculator')
    for (const huf of [336000, 552000, 1008000, 1450000]) {
      const [a, b] = paymentSplit(huf)
      expect(a + b).toBe(huf)
      expect(Math.abs(a - b)).toBeLessThanOrEqual(2000)
    }
  })

  it('offers the booking and ordering extras only where they belong', async () => {
    const { addonsFor } = await import('./calculator')
    const ids = (x) => addonsFor(x).map((a) => a.id)
    expect(ids('idopontfoglalo')).toEqual(expect.arrayContaining(['sms', 'gcal', 'legal']))
    expect(ids('rendeles')).toEqual(expect.arrayContaining(['invoice', 'legal']))
    expect(ids('bemutatkozo')).not.toContain('sms')
    expect(ids('napi-menu')).not.toContain('invoice')
    expect(ids('idopontfoglalo')).toEqual(expect.arrayContaining(['review', 'staff', 'deposit']))
    expect(ids('napi-menu')).toEqual(expect.arrayContaining(['allergens', 'qr']))
    expect(ids('napi-menu')).not.toContain('delivery')
    expect(ids('rendeles')).toContain('delivery')
    expect(ids('felujitas')).toContain('migration')
  })
})
