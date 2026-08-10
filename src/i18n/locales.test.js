import { describe, it, expect } from 'vitest'
import { LOCALES, DEFAULT_LOCALE, localeFromPath, stripLocale, withLocale } from './locales'
import { ROUTE_PATHS, HU_ROUTE_PATHS, EN_ROUTE_PATHS } from '../routePaths'

/* These four functions decide which language every page renders in, which URL
   the toggle points at, and which hreflang pairs the prerender emits. All of
   them are string surgery on a pathname, and all of them are wrong in the same
   silent way if an edge case slips: the page still renders, just in the other
   language, or the toggle points at a 404 that Google then de-indexes the pair
   over. Nothing else in the suite would notice. */

describe('localeFromPath', () => {
  it('treats the unprefixed tree as the default locale', () => {
    for (const path of ['/', '/aszf', '/fejleszto', '/adatvedelem']) {
      expect(localeFromPath(path)).toBe(DEFAULT_LOCALE)
    }
  })

  it('reads a prefixed locale off the first segment', () => {
    expect(localeFromPath('/en')).toBe('en')
    expect(localeFromPath('/en/fejleszto')).toBe('en')
  })

  /* "/english" and "/entries" both start with the letters "en". Matching on a
     prefix rather than on a whole segment would serve them in English. */
  it('does not match a segment that merely starts with a locale', () => {
    expect(localeFromPath('/english')).toBe(DEFAULT_LOCALE)
    expect(localeFromPath('/entries/2026')).toBe(DEFAULT_LOCALE)
  })

  it('falls back to the default for unknown prefixes', () => {
    expect(localeFromPath('/de/impressum')).toBe(DEFAULT_LOCALE)
  })
})

describe('withLocale', () => {
  it('is idempotent — the toggle calls it on already-prefixed paths', () => {
    for (const locale of LOCALES) {
      const once = withLocale('/fejleszto', locale)
      expect(withLocale(once, locale)).toBe(once)
    }
  })

  it('round-trips through every locale without accumulating prefixes', () => {
    let path = '/fejleszto'
    for (const locale of [...LOCALES, ...LOCALES].reverse()) path = withLocale(path, locale)
    expect(stripLocale(path)).toBe('/fejleszto')
  })

  it('keeps the root a single slash rather than an empty string', () => {
    expect(withLocale('/', DEFAULT_LOCALE)).toBe('/')
    expect(withLocale('/en', DEFAULT_LOCALE)).toBe('/')
    expect(withLocale('/', 'en')).toBe('/en')
  })
})

describe('route table', () => {
  it('gives every English route a Hungarian original to fall back to', () => {
    for (const path of EN_ROUTE_PATHS) {
      const original = withLocale(path, DEFAULT_LOCALE)
      expect(
        HU_ROUTE_PATHS,
        `${path} has no Hungarian twin, so its hreflang and x-default would 404`,
      ).toContain(original)
    }
  })

  it('leaves the legal pages Hungarian-only, on purpose', () => {
    for (const path of ['/aszf', '/adatvedelem']) {
      expect(ROUTE_PATHS).toContain(path)
      expect(
        ROUTE_PATHS,
        `${path} gained an English route — a translated ÁSZF is a second binding document, see routePaths.js`,
      ).not.toContain(withLocale(path, 'en'))
    }
  })

  it('lists no route twice', () => {
    expect(new Set(ROUTE_PATHS).size).toBe(ROUTE_PATHS.length)
  })
})
