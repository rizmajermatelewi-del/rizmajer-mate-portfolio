import { PRICING_TIERS, PRICING_SMALL_OFFERS, PRICING_RETAINER } from '../src/data/pricing.js'
import { AI_SERVICES } from '../src/data/ai.js'
import { ORDERED_SKILLS } from '../src/data/skills.js'
import { FAQ_QUESTIONS } from '../src/data/faq.js'
import { PROTOCOL_STEPS } from '../src/data/protocol.js'
import { CONTACT_PHONE } from '../src/data/nav.js'

/* Assembles every content module into one machine-readable object, published
   at /knowledge.json and consumed by the chatbot demo at its build time.

   The point of generating rather than hand-writing it: this repo has been
   bitten by one fact living in several places until the copies drifted apart.
   Here the drifted copy would be a price quoted to a prospect by a bot, so
   the file is derived from the same modules the page renders, and
   src/data/knowledge.test.js fails if a tier or an offer stops appearing.

   Only plain data crosses this boundary. ORDERED_SKILLS carries an `icon`
   React component; it is dropped explicitly below, because JSON.stringify
   would otherwise turn it into an empty object and the bot would read a
   skill with a meaningless field. */
export const CONTACT_EMAIL = 'rizmajermatelewi@gmail.com'

/* Not "weboldalt és belső rendszert", which is how this read while it was
   still only a plan. Tier 03 was renamed away from "Belső rendszer" because
   no internal system has ever been delivered for anyone, and a summary is
   the last place to reintroduce a claim the pricing section just dropped. */
const SUMMARY =
  'Magyarországon dolgozó full-stack fejlesztő. Kis- és középvállalkozásoknak épít ' +
  'weboldalt, foglalási és rendelési felületet, és köti össze a már használt programjaikat — ' +
  'jellemzően olyan folyamatokat, amelyek ma telefonon és táblázatban mennek. Egy ember ' +
  'csinálja végig, alvállalkozó és projektmenedzser nélkül.'

export function buildKnowledge(today = new Date()) {
  return {
    summary: SUMMARY,
    contact: { email: CONTACT_EMAIL, phone: CONTACT_PHONE },
    pricing: {
      tiers: PRICING_TIERS.map((t) => ({
        name: t.name,
        floor: t.priceNote,
        scope: t.scope,
        desc: t.desc,
        includes: [...t.features],
      })),
      /* Every offer under the three tiers, read from the same list the
         section maps. A prospect who already has a site is the largest group
         in the catchment, and the bot has to be able to name the 45 000 Ft
         audit rather than quoting them a new build. */
      smallOffers: PRICING_SMALL_OFFERS.map((o) => ({
        name: o.name,
        floor: o.priceNote,
        desc: o.desc,
      })),
      retainer: PRICING_RETAINER,
    },
    aiServices: AI_SERVICES.map((s) => ({
      title: s.title,
      text: s.text,
      detail: s.detail,
      priceNote: s.priceNote,
      scope: s.scope,
    })),
    process: PROTOCOL_STEPS.map((s) => ({ title: s.title, text: s.text })),
    faq: FAQ_QUESTIONS.map((f) => ({ q: f.q, a: f.a })),
    skills: ORDERED_SKILLS.map((s) => ({
      category: s.category,
      title: s.title,
      detail: s.detail,
    })),
    generated: today.toISOString().slice(0, 10),
  }
}
