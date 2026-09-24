import { describe, it, expect } from 'vitest'
import { buildKnowledge } from '../../scripts/knowledge.mjs'
import { ALL_SERVICES, RETAINER, priceLabel } from './services'
import { ORDERED_SKILLS } from './skills'
import { FAQ_QUESTIONS } from './faq'
import { PROTOCOL_STEPS } from './protocol'
import { t } from '../i18n/t'

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

  /* buildKnowledge() defaults to Hungarian, so the comparison resolves the
     Hungarian side. Comparing against the field object instead would put
     "550 000 Ft-tól" next to { hu, en } and fail for the wrong reason. */
  /* One test where there used to be three (tiers, small offers, AI
     services): services.js is one list now, so the knowledge file either
     carries all of it at the current price or it does not. A bot quoting
     180 000 Ft to someone the page offers a 45 000 Ft audit is exactly the
     drift this file exists to stop. */
  it('carries every service at the price services.js currently sets', () => {
    expect(k.services).toHaveLength(ALL_SERVICES.length)
    for (const s of ALL_SERVICES) {
      const name = t(s.name, 'hu')
      const match = k.services.find((entry) => entry.name === name)
      expect(match, `service "${name}" is missing from the knowledge file`).toBeTruthy()
      expect(match.price).toBe(t(priceLabel(s), 'hu'))
      expect(match.isNew).toBe(Boolean(s.isNew))
    }
    expect(k.retainer).toBe(t(RETAINER, 'hu'))
  })

  /* The corpus is what a bot answers a prospect from, so the language it was
     built in has to be checkable. Without this, buildKnowledge(date, 'en')
     quietly returning Hungarian would look exactly like success — which is
     the failure /en was withdrawn for, moved into the chatbot. */
  it('is built in the language it was asked for', () => {
    const english = buildKnowledge(new Date('2026-08-01T00:00:00Z'), 'en')
    expect(english.services.map((entry) => entry.name)).toEqual(ALL_SERVICES.map((s) => t(s.name, 'en')))
    expect(english.services[0].name).not.toBe(k.services[0].name)
  })

  it('carries every FAQ pair and every process step', () => {
    expect(k.faq).toHaveLength(FAQ_QUESTIONS.length)
    for (const { q } of FAQ_QUESTIONS) {
      const question = t(q, 'hu')
      expect(k.faq.some((f) => f.q === question), `FAQ "${question}" is missing`).toBe(true)
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
