import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { FAQ_QUESTIONS } from './faq'
import { PRICING_TIERS, PRICING_RETAINER } from './pricing'
import { t } from '../i18n/t'

/* "550 000 Ft-tól" -> "550 000". The thousands separator here is an ordinary
   space, so the class is explicit about which characters count rather than
   using \s, which would run across a line break. */
function amountIn(text) {
  const match = text.match(/\d[\d  ]*\d/)
  if (!match) throw new Error(`no amount found in: ${text}`)
  return match[0]
}

/* Faq.jsx used to define this list inline. The risk in moving it is a silently
   dropped or reworded answer, so this asserts both that the data survived and
   that the component no longer carries a second copy of it. */
const faqSource = readFileSync(path.resolve(process.cwd(), 'src/sections/Faq.jsx'), 'utf8')
const indexHtml = readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8')

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
    /* Read out of pricing.js rather than written down again here. Restated,
       these were literals that matched the price list only for as long as
       somebody remembered to edit both -- and on 2026-08-11 the FAQ was found
       still quoting 450 000 Ft and a "belső rendszer" that pricing.js had
       already dropped, with this test green throughout. Derived, the edit that
       moves a price fails here until the FAQ catches up. */
    const figures = [
      ...PRICING_TIERS.map((tier) => amountIn(t(tier.priceNote, 'hu'))),
      amountIn(t(PRICING_RETAINER, 'hu')),
    ]
    for (const figure of figures) {
      expect(joined, `the FAQ no longer mentions ${figure}`).toContain(figure)
    }
  })

  it('leaves no second copy of the list inside the component', () => {
    expect(faqSource).toContain("from '../data/faq'")
    expect(faqSource, 'Faq.jsx still declares its own QUESTIONS array').not.toMatch(/const QUESTIONS\s*=\s*\[/)
  })

  /* The same defect, in the place nothing was checking. index.html carried a
     hand-written FAQPage copy of all eight answers; after the pricing review
     the page said 550 000 Ft and the structured data still said 450 000, and
     every test stayed green. Structured data is what Google reproduces, so
     the stale copy was the one most likely to be read.

     scripts/prerender.mjs now fills mainEntity from faq.js, which only works
     as long as the template stays empty -- a re-pasted question here would be
     overwritten on / and shipped verbatim nowhere, which is a confusing way
     to be wrong. So: assert the template holds the node's shape and none of
     its content. */
  it('leaves no second copy of the answers in the JSON-LD template', () => {
    const graph = JSON.parse(indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    const faqNode = graph['@graph'].find((node) => node['@type'] === 'FAQPage')

    expect(faqNode, 'index.html has no FAQPage node for prerender to fill').toBeTruthy()
    expect(faqNode.mainEntity, 'index.html is hand-maintaining questions again').toEqual([])

    for (const { a } of FAQ_QUESTIONS) {
      expect(indexHtml, 'an answer was pasted back into index.html').not.toContain(a.slice(0, 40))
    }
  })
})
