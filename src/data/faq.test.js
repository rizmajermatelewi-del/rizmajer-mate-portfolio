import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { FAQ_QUESTIONS } from './faq'

/* Faq.jsx used to define this list inline. The risk in moving it is a silently
   dropped or reworded answer, so this asserts both that the data survived and
   that the component no longer carries a second copy of it. */
const faqSource = readFileSync(path.resolve(process.cwd(), 'src/sections/Faq.jsx'), 'utf8')

describe('FAQ data', () => {
  it('keeps every question and answer non-empty', () => {
    expect(FAQ_QUESTIONS.length).toBe(8)
    for (const { q, a } of FAQ_QUESTIONS) {
      expect(typeof q).toBe('string')
      expect(q.trim().length).toBeGreaterThan(0)
      expect(a.trim().length).toBeGreaterThan(20)
    }
  })

  it('still contains the answers the pricing FAQ depends on', () => {
    const joined = FAQ_QUESTIONS.map((x) => x.a).join(' ')
    for (const floor of ['180 000', '450 000', '1 200 000', '25 000']) {
      expect(joined, `the FAQ no longer mentions ${floor}`).toContain(floor)
    }
  })

  it('leaves no second copy of the list inside the component', () => {
    expect(faqSource).toContain("from '../data/faq'")
    expect(faqSource, 'Faq.jsx still declares its own QUESTIONS array').not.toMatch(/const QUESTIONS\s*=\s*\[/)
  })
})
