import { describe, it, expect } from 'vitest'
import { HUF_PER_EUR, HUF_PER_EUR_CHECKED, approxEur, forint, priceEn } from './fx'

/* Every price the English pages show, so the property below is checked
   against the real figures rather than invented ones. */
const AMOUNTS = [180000, 550000, 1200000, 45000, 60000, 90000, 120000, 25000, 150000, 400000]

/* The strongest the forint got in 2026. If the shown euro figure survives
   this, it survives the whole observed range — a stronger forint is the
   direction that costs money, because a client converts the euro figure and
   expects to pay it. */
const STRONGEST_2026 = 349.37

const eurIn = (text) => Number(text.match(/~([\d ]+) EUR/)[1].replace(/ /g, ''))

describe('euro approximations', () => {
  /* This is the whole reason the rate is 350 rather than the spot rate.
     Stated as a property over every amount, so adding a price cannot quietly
     break it. */
  it('never shows fewer euros than the forint price actually converts to', () => {
    for (const huf of AMOUNTS) {
      const shown = eurIn(approxEur(huf))
      const actual = huf / STRONGEST_2026
      expect(
        shown,
        `${huf} Ft shows ${shown} EUR but converts to ${Math.round(actual)} EUR at the strongest 2026 rate`,
      ).toBeGreaterThanOrEqual(Math.floor(actual))
    }
  })

  it('rounds hard enough that nothing reads as a quote', () => {
    for (const huf of AMOUNTS) {
      const shown = eurIn(approxEur(huf))
      const step = shown < 100 ? 5 : shown < 200 ? 10 : shown < 500 ? 25 : shown < 2000 ? 50 : 100
      expect(shown % step, `${shown} EUR is precise to the euro, which reads as a quote`).toBe(0)
    }
  })

  /* The overstatement is the deliberate cost of the guarantee above, but it
     is only tolerable while it stays small — a figure reading 30% over the
     real conversion would cost inquiries rather than protect an invoice. */
  it('does not overstate by more than an eighth at the rate on the day it was set', () => {
    for (const huf of AMOUNTS) {
      const shown = eurIn(approxEur(huf))
      const spot = huf / 364.68
      expect(shown / spot, `${huf} Ft shows ${shown} EUR against a real ${Math.round(spot)} EUR`).toBeLessThan(1.125)
    }
  })

  it('leads with the forint, because that is what gets invoiced', () => {
    expect(priceEn(550000)).toBe('550 000 Ft (~1 600 EUR)')
    expect(forint(1200000)).toBe('1 200 000 Ft')
  })

  it('groups thousands with spaces, matching the Hungarian figures beside it', () => {
    expect(forint(180000)).toBe('180 000 Ft')
    expect(forint(45000)).toBe('45 000 Ft')
    expect(forint(900)).toBe('900 Ft')
  })

  /* Not a staleness alarm — a wrong-units guard. A rate typed as 3.5 or 3500
     would sail through every assertion above while making every price on the
     English site absurd. */
  it('carries a rate in the range a forint rate can be, and a date it was checked', () => {
    expect(HUF_PER_EUR).toBeGreaterThan(200)
    expect(HUF_PER_EUR).toBeLessThan(600)
    expect(HUF_PER_EUR_CHECKED).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
