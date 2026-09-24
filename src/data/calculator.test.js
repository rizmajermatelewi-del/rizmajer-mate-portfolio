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

describe('breakdown and upkeep', () => {
  it('lists every charged line and totals them, rounded up', async () => {
    const { breakdown } = await import('./calculator')
    const b = breakdown('cegoldal', ['english', 'seo'], 7)
    // 420 000 + 126 000 english + 50 000 seo + 2 x 25 000 pages = 646 000 -> 650 000
    expect(b.lines.map((l) => l.id)).toEqual(['cegoldal', 'english', 'seo', 'pages'])
    expect(b.lines.reduce((a, l) => a + l.huf, 0)).toBe(646000)
    expect(b.total).toBe(650000)
    expect(untranslatedIn(b.lines.map((l) => l.label))).toEqual([])
  })

  it('offers monthly upkeep, except for the webshop', async () => {
    const { UPKEEP, upkeepFor } = await import('./calculator')
    expect(UPKEEP.map((s) => s.id)).toEqual(['uzemeltetes-alap', 'uzemeltetes', 'uzemeltetes-premium'])
    expect(upkeepFor('webshop')).toEqual([])
    expect(upkeepFor('bemutatkozo')).toBe(UPKEEP)
  })
})

describe('combined services', () => {
  it('sums the services, charges a flat extra once and a percentage on what it covers', async () => {
    const { breakdown, addonsFor } = await import('./calculator')
    // bemutatkozo 240 000 + idopontfoglalo 690 000 + chatbot 150 000 = 1 080 000
    // payment flat 90 000 once; english 30% of 240 000 + 690 000 (chatbot not covered) = 279 000
    const b = breakdown(['bemutatkozo', 'idopontfoglalo', 'chatbot'], ['payment', 'english'])
    expect(b.lines.reduce((a, l) => a + l.huf, 0)).toBe(1080000 + 90000 + 279000)
    expect(b.total).toBe(1450000)
    expect(addonsFor(['bemutatkozo', 'google']).some((a) => a.id === 'google')).toBe(false)
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

  it('offers the booking and shop extras only where they belong', async () => {
    const { addonsFor } = await import('./calculator')
    const ids = (x) => addonsFor(x).map((a) => a.id)
    expect(ids('idopontfoglalo')).toEqual(expect.arrayContaining(['sms', 'gcal', 'legal']))
    expect(ids('webshop')).toEqual(expect.arrayContaining(['shipping', 'products', 'legal']))
    expect(ids('bemutatkozo')).not.toContain('shipping')
    expect(ids('webshop')).not.toContain('sms')
  })
})
