import { describe, it, expect } from 'vitest'
import { buildKnowledge } from '../../scripts/knowledge.mjs'
import { PRICING_TIERS, PRICING_SMALL_OFFERS, PRICING_RETAINER } from './pricing'
import { AI_SERVICES } from './ai'
import { ORDERED_SKILLS } from './skills'
import { FAQ_QUESTIONS } from './faq'
import { PROTOCOL_STEPS } from './protocol'

/* Same shape of guard as nav.test.js and routePaths.test.js: derive from the
   source of truth and compare, rather than trusting two lists to be edited
   together. The failure this prevents is worse than the ones those catch —
   a chatbot answering a prospect from a price list that lost a tier. */
const k = buildKnowledge(new Date('2026-08-01T00:00:00Z'))

describe('knowledge object', () => {
  it('is non-empty and serialises to JSON', () => {
    const json = JSON.stringify(k)
    expect(json.length).toBeGreaterThan(500)
    expect(JSON.parse(json)).toEqual(k)
  })

  it('carries every price floor from pricing.js', () => {
    for (const tier of PRICING_TIERS) {
      const match = k.pricing.tiers.find((t) => t.name === tier.name)
      expect(match, `tier "${tier.name}" is missing from the knowledge file`).toBeTruthy()
      expect(match.floor).toBe(tier.priceNote)
    }
    expect(k.pricing.tiers).toHaveLength(PRICING_TIERS.length)
    expect(k.pricing.retainer).toBe(PRICING_RETAINER)
  })

  /* The plan for this file predates the wider ladder: it covered the three
     tiers and PRICING_ENTRY only. Three more published prices have appeared
     since (átvilágítás, Google-megjelenés, felújítás), and a bot that quotes
     180 000 Ft to someone who already has a site — when the page offers them
     a 45 000 Ft audit — is exactly the drift this file exists to stop. */
  it('carries every small offer, not just the entry one', () => {
    expect(k.pricing.smallOffers).toHaveLength(PRICING_SMALL_OFFERS.length)
    for (const offer of PRICING_SMALL_OFFERS) {
      const match = k.pricing.smallOffers.find((o) => o.name === offer.name)
      expect(match, `small offer "${offer.name}" is missing from the knowledge file`).toBeTruthy()
      expect(match.floor).toBe(offer.priceNote)
      expect(match.desc).toBe(offer.desc)
    }
  })

  it('carries every AI service with its price and scope', () => {
    expect(k.aiServices).toHaveLength(AI_SERVICES.length)
    for (const svc of AI_SERVICES) {
      const match = k.aiServices.find((s) => s.title === svc.title)
      expect(match, `AI service "${svc.title}" is missing`).toBeTruthy()
      expect(match.priceNote).toBe(svc.priceNote)
      expect(match.scope).toBe(svc.scope)
    }
  })

  it('carries every FAQ pair and every process step', () => {
    expect(k.faq).toHaveLength(FAQ_QUESTIONS.length)
    for (const { q } of FAQ_QUESTIONS) {
      expect(k.faq.some((f) => f.q === q), `FAQ "${q}" is missing`).toBe(true)
    }
    expect(k.process).toHaveLength(PROTOCOL_STEPS.length)
  })

  it('carries every skill, and never a React component', () => {
    expect(k.skills).toHaveLength(ORDERED_SKILLS.length)
    for (const skill of k.skills) {
      expect(skill).not.toHaveProperty('icon')
      expect(typeof skill.detail).toBe('string')
    }
    expect(JSON.stringify(k)).not.toContain('[object Object]')
  })

  it('states the contact address and an ISO build date', () => {
    expect(k.contact.email).toBe('rizmajermatelewi@gmail.com')
    expect(k.generated).toBe('2026-08-01')
  })
})
