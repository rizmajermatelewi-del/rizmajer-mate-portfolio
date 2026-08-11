import { describe, it, expect } from 'vitest'
import { t, neutral, untranslatedIn } from './t'

/* The point of this module is that it REFUSES the convenient thing, so most
   of these assert a throw. /en was withdrawn once because the convenient
   thing -- serve Hungarian when the English is missing -- is invisible to
   whoever ships it, and visible only to the reader who cannot read the
   result. */
describe('t()', () => {
  it('returns the text for the locale asked for', () => {
    const field = { hu: 'Foglalás és rendelés', en: 'Booking and ordering' }
    expect(t(field, 'hu')).toBe('Foglalás és rendelés')
    expect(t(field, 'en')).toBe('Booking and ordering')
  })

  it('refuses to fall back to Hungarian when the English is missing', () => {
    expect(() => t({ hu: 'Van magyar', en: '' }, 'en')).toThrow(/no en text/)
    expect(() => t({ hu: 'Van magyar' }, 'en')).toThrow(/no en text/)
  })

  it('treats whitespace as missing, because a space is not a translation', () => {
    expect(() => t({ hu: 'Van', en: '   ' }, 'en')).toThrow(/no en text/)
  })

  it('throws on a bare string, so a half-converted module cannot pass', () => {
    expect(() => t('Foglalás és rendelés', 'en')).toThrow(/never translated/)
  })

  it('passes a neutral value through unchanged in every locale', () => {
    const phone = neutral('+36 30 000 0000')
    expect(t(phone, 'hu')).toBe('+36 30 000 0000')
    expect(t(phone, 'en')).toBe('+36 30 000 0000')
  })
})

describe('untranslatedIn()', () => {
  it('finds nothing in a fully translated structure', () => {
    expect(
      untranslatedIn({
        tiers: [{ name: { hu: 'Egy', en: 'One' }, href: neutral('#kapcsolat') }],
      }),
    ).toEqual([])
  })

  it('names the exact path of a half-finished entry', () => {
    const found = untranslatedIn({
      tiers: [{ name: { hu: 'Egy', en: 'One' } }, { name: { hu: 'Kettő', en: '' } }],
    })
    expect(found).toHaveLength(1)
    expect(found[0]).toContain('tiers[1].name')
    expect(found[0]).toContain('missing: en')
  })

  /* Without this it would call a field complete whenever ANY locale key is
     present -- the same silent half-translation in a new costume. */
  it('reports a field carrying only one of the two languages', () => {
    expect(untranslatedIn({ title: { hu: 'Csak magyar' } })[0]).toContain('missing: en')
    expect(untranslatedIn({ title: { en: 'English only' } })[0]).toContain('missing: hu')
  })

  it('walks through plain containers without treating them as fields', () => {
    expect(untranslatedIn({ a: { b: { c: { hu: 'x', en: '' } } } })[0]).toContain('a.b.c')
  })

  /* Bare strings are invisible here on purpose: untranslatedIn answers "is
     every FIELD complete", and t() refuses the bare string at the point of
     use. Splitting the two keeps this usable on structures that legitimately
     carry non-text values -- ids, numbers, booleans. */
  it('ignores non-text leaves rather than reporting them', () => {
    expect(untranslatedIn({ id: 'sved-60', minutes: 60, highlight: true })).toEqual([])
  })
})
