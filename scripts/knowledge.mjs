import { PRICING_TIERS, PRICING_SMALL_OFFERS, PRICING_RETAINER } from '../src/data/pricing.js'
import { AI_SERVICES } from '../src/data/ai.js'
import { ORDERED_SKILLS } from '../src/data/skills.js'
import { FAQ_QUESTIONS } from '../src/data/faq.js'
import { PROTOCOL_STEPS } from '../src/data/protocol.js'
import { CONTACT_PHONE, CONTACT_EMAIL } from '../src/data/contact.js'
import { t } from '../src/i18n/t.js'
import { DEFAULT_LOCALE } from '../src/i18n/locales.js'

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
export { CONTACT_EMAIL }

/* Not "weboldalt és belső rendszert", which is how this read while it was
   still only a plan. Tier 03 was renamed away from "Belső rendszer" because
   no internal system has ever been delivered for anyone, and a summary is
   the last place to reintroduce a claim the pricing section just dropped. */
const SUMMARY =
  'Magyarországon dolgozó full-stack fejlesztő. Kis- és középvállalkozásoknak épít ' +
  'weboldalt, foglalási és rendelési felületet, és köti össze a már használt programjaikat — ' +
  'jellemzően olyan folyamatokat, amelyek ma telefonon és táblázatban mennek. Egy ember ' +
  'csinálja végig, alvállalkozó és projektmenedzser nélkül.'

/* `locale` is an explicit parameter rather than a hardcoded 'hu', because the
   corpus is what a bot answers a visitor from — and answering an English
   visitor in Hungarian is the same failure /en was withdrawn for.

   It still defaults to Hungarian and only one file is emitted, because the
   chatbot does not exist yet (Plan B). Building a second corpus for an
   unbuilt consumer would be guessing at its shape; when Plan B lands,
   emitting the English one is calling this a second time. What this does buy
   now is that the choice is visible and made in one place, instead of being
   the accident of whichever language the data modules happened to hold. */
export function buildKnowledge(today = new Date(), locale = DEFAULT_LOCALE) {
  return {
    summary: SUMMARY,
    contact: { email: CONTACT_EMAIL, phone: CONTACT_PHONE },
    pricing: {
      tiers: PRICING_TIERS.map((tier) => ({
        name: t(tier.name, locale),
        floor: t(tier.priceNote, locale),
        scope: t(tier.scope, locale),
        desc: t(tier.desc, locale),
        includes: tier.features.map((feature) => t(feature, locale)),
      })),
      /* Every offer under the three tiers, read from the same list the
         section maps. A prospect who already has a site is the largest group
         in the catchment, and the bot has to be able to name the 45 000 Ft
         audit rather than quoting them a new build. */
      smallOffers: PRICING_SMALL_OFFERS.map((o) => ({
        name: t(o.name, locale),
        floor: t(o.priceNote, locale),
        desc: t(o.desc, locale),
      })),
      retainer: t(PRICING_RETAINER, locale),
    },
    aiServices: AI_SERVICES.map((s) => ({
      title: s.title,
      text: s.text,
      detail: s.detail,
      priceNote: s.priceNote,
      scope: s.scope,
    })),
    process: PROTOCOL_STEPS.map((s) => ({ title: t(s.title, locale), text: t(s.text, locale) })),
    faq: FAQ_QUESTIONS.map((f) => ({ q: f.q, a: f.a })),
    skills: ORDERED_SKILLS.map((s) => ({
      category: s.category,
      title: s.title,
      detail: s.detail,
    })),
    generated: today.toISOString().slice(0, 10),
  }
}
