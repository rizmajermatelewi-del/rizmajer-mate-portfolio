import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { PROTOCOL_STEPS } from './protocol'
import { t, untranslatedIn } from '../i18n/t'
import { LOCALES } from '../i18n/locales'

/* The images deliberately stay in Protocol.jsx: they are Vite asset imports,
   which resolve to hashed URLs at build time and mean nothing to a Node script
   or to the chatbot. Only the text moves. */
const protocolSource = readFileSync(path.resolve(process.cwd(), 'src/sections/Protocol.jsx'), 'utf8')

describe('Protocol steps data', () => {
  /* The `num` field ('01'…'03') was dropped rather than translated: the
     watermark numeral it fed was removed for contrast reasons and nothing has
     rendered it since. */
  it('carries three steps whose text is filled in, in every language', () => {
    expect(PROTOCOL_STEPS.length).toBe(3)
    expect(untranslatedIn(PROTOCOL_STEPS)).toEqual([])

    for (const locale of LOCALES) {
      for (const step of PROTOCOL_STEPS) {
        expect(t(step.title, locale).trim().length).toBeGreaterThan(0)
        expect(t(step.tagline, locale).trim().length).toBeGreaterThan(0)
        expect(t(step.text, locale).trim().length).toBeGreaterThan(20)
      }
    }
  })

  /* A step whose English is a copy of its Hungarian would satisfy every check
     above. This is the one that notices. */
  it('says something different in each language', () => {
    for (const step of PROTOCOL_STEPS) {
      const rendered = LOCALES.map((locale) => t(step.text, locale))
      expect(new Set(rendered).size, `"${t(step.title, 'hu')}" reads identically in both languages`).toBe(LOCALES.length)
    }
  })

  it('holds no image fields — those belong to the component', () => {
    for (const step of PROTOCOL_STEPS) {
      expect(step).not.toHaveProperty('image')
      expect(step).not.toHaveProperty('imageAlt')
    }
  })

  it('leaves no second copy of the step text inside the component', () => {
    expect(protocolSource).toContain("from '../data/protocol'")
    expect(protocolSource, 'Protocol.jsx still declares its own steps array').not.toMatch(/const steps\s*=\s*\[/)
  })
})
