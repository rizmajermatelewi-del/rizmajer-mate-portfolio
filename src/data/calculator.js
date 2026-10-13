import { ALL_SERVICES } from './services.js'
import { forint, priceEn } from './fx.js'

/* The price calculator's arithmetic, kept out of the component so it can be
   tested and so the numbers live next to the catalogue they build on.

   Every estimate starts from a catalogue floor and only goes up, so the
   calculator can never quote below what the cards say. The add-ons were
   priced on 2026-09-24 from the same 16 000 Ft/hour the floors derive from
   (the market check that day put Hungarian freelancers at 12 500–22 500):
   copywriting ~2.5 hours, card payment integration ~5.5 hours, and the two
   percentages for work that scales with the whole build. The result is
   still a floor ("-tól"), and the section says the final price is written
   down after the first call. */

const WEB = ['bemutatkozo']
const SALES = ['idopontfoglalo', 'napi-menu', 'rendeles']

export const ADDONS = [
  {
    id: 'english',
    label: { hu: 'Angol nyelvű változat is', en: 'An English version too' },
    percent: 30,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'copy',
    label: { hu: 'A szövegeket is én írom', en: 'I write the copy too' },
    flatHuf: 40000,
    appliesTo: WEB,
  },
  {
    id: 'payment',
    label: { hu: 'Online bankkártyás fizetés', en: 'Card payments online' },
    flatHuf: 90000,
    appliesTo: ['bemutatkozo', 'idopontfoglalo', 'rendeles'],
  },
  {
    id: 'rush',
    label: { hu: 'Sürgős: a szokásos idő feléért', en: 'Rush: in half the usual time' },
    percent: 25,
    appliesTo: [...WEB, ...SALES],
  },
  /* Added 2026-09-24 at the same hourly rate: keyword research and per-page
     SEO ~3 hours, image selection and editing ~2, a newsletter signup wired
     to Brevo or Mailchimp ~2.5, automatic invoicing ~4.5, the Google
     listing set up ~4. */
  {
    id: 'seo',
    label: { hu: 'Bővített keresőoptimalizálás', en: 'Extended search optimisation' },
    flatHuf: 50000,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'google',
    label: { hu: 'Google-cégprofil beállítása', en: 'Google Business Profile set up' },
    flatHuf: 60000,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'photos',
    label: { hu: 'Képek válogatása és szerkesztése', en: 'Images chosen and edited' },
    flatHuf: 30000,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'newsletter',
    label: { hu: 'Hírlevél-feliratkozás', en: 'Newsletter signup' },
    flatHuf: 40000,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'invoice',
    label: { hu: 'Automatikus számlázás', en: 'Automatic invoicing' },
    flatHuf: 70000,
    appliesTo: ['idopontfoglalo', 'rendeles'],
  },
  /* Service-specific extras and the legal package, added 2026-09-24 at
     the same hourly rate: a second language as the first, a blog ~5 hours,
     a gallery ~2.5, SMS reminders ~3.75 (the texts themselves are billed by
     the SMS provider), a two-way Google Calendar sync ~3. The legal texts
     are filled in from templates with the client's details, ~3 hours; the
     note says plainly that it is not a lawyer's work. */
  {
    id: 'german',
    label: { hu: 'Német nyelvű változat is', en: 'A German version too' },
    percent: 30,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'legal',
    label: { hu: 'Jogi szövegek: ÁSZF, adatvédelem, süti-kezelés', en: 'Legal texts: terms, privacy notice, cookies' },
    note: {
      hu: 'Sablonból, a te adataiddal; ügyvédi átnézést nem helyettesít.',
      en: 'From templates with your details; not a substitute for a lawyer.',
    },
    flatHuf: 50000,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'blog',
    label: { hu: 'Blog vagy hírek, amit te szerkesztesz', en: 'A blog or news page you edit' },
    flatHuf: 80000,
    appliesTo: ['bemutatkozo'],
  },
  {
    id: 'gallery',
    label: { hu: 'Galéria vagy referenciák oldal', en: 'A gallery or references page' },
    flatHuf: 40000,
    appliesTo: WEB,
  },
  {
    id: 'sms',
    label: { hu: 'SMS-emlékeztető a vendégnek', en: 'SMS reminders for clients' },
    note: { hu: 'Az SMS-ek díját a szolgáltató számlázza, darabonként.', en: 'The texts are billed by the provider, per message.' },
    flatHuf: 60000,
    appliesTo: ['idopontfoglalo'],
  },
  {
    id: 'gcal',
    label: { hu: 'Google Naptár-szinkron', en: 'Google Calendar sync' },
    flatHuf: 50000,
    appliesTo: ['idopontfoglalo'],
  },
  /* Added 2026-10-13 at Máté's direction, at the same hourly rate, so the
     calculator carries the options the trimmed card grid no longer does:
     a review request after the visit ~3 hours, a calendar per staff member
     ~4, an online deposit ~3, allergens on the menu ~2, a printable menu QR
     ~1, delivery zones ~4, moving the old site's content across ~3. */
  {
    id: 'review',
    label: { hu: 'Google-értékelés kérése a látogatás után', en: 'A Google review request after the visit' },
    note: {
      hu: 'Automatikus e-mail vagy SMS a vendégnek, az értékelés linkjével.',
      en: 'An automatic e-mail or text to the client, with the review link.',
    },
    flatHuf: 50000,
    appliesTo: ['idopontfoglalo'],
  },
  {
    id: 'staff',
    label: { hu: 'Több munkatárs vagy szék, külön naptárral', en: 'Several staff or chairs, each with a calendar' },
    flatHuf: 60000,
    appliesTo: ['idopontfoglalo'],
  },
  {
    id: 'deposit',
    label: { hu: 'Foglalási előleg online', en: 'An online booking deposit' },
    note: { hu: 'Kevesebb vendég marad el szó nélkül.', en: 'Fewer clients fail to turn up.' },
    flatHuf: 50000,
    appliesTo: ['idopontfoglalo'],
  },
  {
    id: 'allergens',
    label: { hu: 'Allergének és jelölések a menün', en: 'Allergens and labels on the menu' },
    flatHuf: 30000,
    appliesTo: ['napi-menu', 'rendeles'],
  },
  {
    id: 'qr',
    label: { hu: 'Nyomtatható QR-kód a menühöz', en: 'A printable QR code for the menu' },
    note: { hu: 'Asztalra, ajtóra, szórólapra.', en: 'For the tables, the door, a flyer.' },
    flatHuf: 15000,
    appliesTo: ['napi-menu', 'rendeles'],
  },
  {
    id: 'delivery',
    label: { hu: 'Kiszállítási zónák és díjak', en: 'Delivery zones and fees' },
    flatHuf: 60000,
    appliesTo: ['rendeles'],
  },
  {
    id: 'migration',
    label: { hu: 'Tartalom átköltöztetése a régi oldalról', en: 'Content moved across from the old site' },
    flatHuf: 50000,
    appliesTo: ['bemutatkozo', 'felujitas'],
  },
]

/* One-off builds only. Monthly upkeep, the flat audit and per-process
   automation already say their whole price on the card; putting them
   through a calculator would only add a step. */
export const CALC_SERVICES = ALL_SERVICES.filter((s) => (s.priceUnit ?? 'from') === 'from')

/* Several services can be combined (2026-09-24): a site with a booking
   system and a chatbot is one project. Every function below takes one id
   or a list of them. The one combination that makes no sense is two
   different main sites, so SITE_KINDS are mutually exclusive: picking one
   replaces the other. The menu and ordering are the same kind for the same
   reason: ordering already includes the menu. */
export const SITE_KINDS = ['bemutatkozo', 'felujitas']
export const MENU_KINDS = ['napi-menu', 'rendeles']
const list = (ids) => [].concat(ids)

export const addonsFor = (ids) => ADDONS.filter((a) => list(ids).some((id) => a.appliesTo.includes(id)))

/* The estimate line by line, so the summary can show what the number is
   made of rather than asking the visitor to trust it.

   Percentages apply to the base of the services they cover, not to each
   other, so ticking "rush" after "English" does not charge a rush premium
   on the translation twice over. A flat extra is charged once however many
   services it covers: one card integration serves the site and the
   booking alike. Rounded up to the next 10 000 Ft: an estimate that
   pretends to be exact to the forint claims a precision it does not have. */
export function breakdown(ids, selectedIds = []) {
  const services = list(ids).map((id) => CALC_SERVICES.find((s) => s.id === id))
  if (!services.length || services.some((s) => !s)) return null
  const lines = services.map((s) => ({ id: s.id, kind: 'service', label: s.name, huf: s.priceHuf }))
  for (const addon of addonsFor(ids)) {
    if (!selectedIds.includes(addon.id)) continue
    const base = services.filter((s) => addon.appliesTo.includes(s.id)).reduce((a, s) => a + s.priceHuf, 0)
    lines.push({ id: addon.id, kind: 'addon', label: addon.label, huf: addon.flatHuf ?? Math.round((base * addon.percent) / 100) })
  }
  const sum = lines.reduce((a, l) => a + l.huf, 0)
  return { lines, total: Math.ceil(sum / 10000) * 10000 }
}

export const estimate = (ids, selectedIds) => breakdown(ids, selectedIds)?.total ?? null

/* Upkeep is a choice in the calculator, not a line in the one-off price:
   it is monthly and never discounted. */
export const UPKEEP = ALL_SERVICES.filter((s) => s.priceUnit === 'month')

/* What the site costs to keep online, paid to the registrar and host in
   the client's name, not to Máté; the same range the FAQ quotes. */
export const HOSTING = { lo: 15000, hi: 30000 }
export const hostingLabel = {
  hu: `${forint(HOSTING.lo)}–${forint(HOSTING.hi)}/év`,
  en: `${priceEn(HOSTING.lo)}–${priceEn(HOSTING.hi)} a year`,
}

/* Payment in two parts, set 2026-09-24 at Máté's direction: half when
   work starts, the rest on handover. The written contract governs. */
export const PAYMENT = { upfrontPercent: 50 }
export const paymentSplit = (huf) => {
  const upfront = Math.round((huf * PAYMENT.upfrontPercent) / 100 / 1000) * 1000
  return [upfront, huf - upfront]
}

export const perMonth = (huf) => ({ hu: `${forint(huf)}/hó`, en: `${priceEn(huf)} a month` })

/* "4 900 Ft–12 900 Ft/hó" as a { hu, en } pair, for the build-or-subscribe
   table. Here rather than in the component so that the Hungarian suffixes
   stay in a data module, where the i18n guard expects them. */
export const monthlyRange = (lo, hi) => ({
  hu: `${forint(lo)}–${forint(hi)}/hó`,
  en: `${priceEn(lo)}–${priceEn(hi)} a month`,
})
