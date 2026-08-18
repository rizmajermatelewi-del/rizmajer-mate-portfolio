import { describe, it, expect } from 'vitest'
import { HOME_META, PAGE_META, OG_LOCALE, SCHEMA } from './meta'
import { ROUTE_PATHS } from '../routePaths'
import { LOCALES } from './locales'
import { untranslatedIn, t } from './t'

describe('PAGE_META', () => {
  it('is fully translated', () => {
    expect(untranslatedIn(PAGE_META)).toEqual([])
  })

  /* prerender.mjs throws on this too, so the build cannot ship a stale key.
     It is asserted here as well because the build failure arrives after four
     other steps and a Vite compile, and this one arrives in three seconds. */
  it('only carries written copy for routes that exist', () => {
    for (const route of Object.keys(PAGE_META)) {
      expect(ROUTE_PATHS, `${route} has written metadata but is not a route`).toContain(route)
    }
  })

  /* The bug this map was added for. Both language versions of /fejleszto
     published the title "Rizmajer Máté Levente", because the fallback derives
     it from the <h1> and that <h1> is a name — two URLs, two languages, one
     title. Deriving is still right for every other subpage; it is wrong
     wherever the heading is not the subject. */
  it('gives each language its own title and description', () => {
    for (const [route, meta] of Object.entries(PAGE_META)) {
      for (const field of ['title', 'description']) {
        const rendered = LOCALES.map((locale) => t(meta[field], locale))
        expect(
          new Set(rendered).size,
          `${route} publishes the same ${field} in every language: ${rendered[0]}`,
        ).toBe(LOCALES.length)
      }
    }
  })

  /* Length, because both fields are read in a search result rather than on
     the page. A title is truncated around 60 characters and a description
     around 170; past that, the end of the sentence is the part nobody sees. */
  it('keeps titles and descriptions inside what a search result shows', () => {
    for (const [route, meta] of Object.entries(PAGE_META)) {
      for (const locale of LOCALES) {
        const title = t(meta.title, locale)
        const description = t(meta.description, locale)

        expect(
          title.length,
          `${route} ${locale} title is ${title.length} characters`,
        ).toBeLessThanOrEqual(60)
        expect(
          description.length,
          `${route} ${locale} description is ${description.length} characters`,
        ).toBeLessThanOrEqual(170)
        expect(description.length, `${route} ${locale} description is a fragment`).toBeGreaterThan(70)
      }
    }
  })

  /* Keyword stuffing has a shape: the same word repeated until the string
     reads as a list rather than as a sentence. A repeated-word check is a
     blunt proxy, but it catches the version that actually happens —
     "fejlesztő, React fejlesztő, full-stack fejlesztő" — without trying to
     judge prose. */
  it('reads as a sentence rather than a keyword list', () => {
    for (const [route, meta] of Object.entries(PAGE_META)) {
      for (const locale of LOCALES) {
        const title = t(meta.title, locale)
        const words = title.toLowerCase().match(/[\p{L}]{4,}/gu) ?? []
        expect(new Set(words).size, `${route} ${locale} title repeats a word: ${title}`).toBe(
          words.length,
        )
      }
    }
  })
})

describe('HOME_META', () => {
  it('is fully translated, including the social pair and the image alt', () => {
    expect(untranslatedIn(HOME_META)).toEqual([])
  })

  /* index.html carries the Hungarian side of both fields for the dev server,
     and prerender.mjs already fails the build when the two disagree. What it
     cannot catch is the title growing past what a result shows, because
     nothing truncates it locally. */
  it('keeps the home title and description inside what a search result shows', () => {
    for (const locale of LOCALES) {
      expect(t(HOME_META.title, locale).length).toBeLessThanOrEqual(65)
      expect(t(HOME_META.description, locale).length).toBeLessThanOrEqual(170)
    }
  })
})

describe('locale codes', () => {
  /* Two spellings of one decision — og:locale wants language_TERRITORY and
     schema.org wants an IETF tag — which makes them the pair most likely to
     be updated one at a time. */
  it('describes the same language in both notations', () => {
    for (const locale of LOCALES) {
      expect(OG_LOCALE, `no og:locale for ${locale}`).toHaveProperty(locale)
      expect(OG_LOCALE[locale].replace('_', '-')).toBe(t(SCHEMA.inLanguage, locale))
    }
  })

  it('translates every jobTitle and knowsAbout topic', () => {
    expect(untranslatedIn(SCHEMA)).toEqual([])
  })
})
