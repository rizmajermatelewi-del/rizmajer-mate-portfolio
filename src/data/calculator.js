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

const WEB = ['bemutatkozo', 'landing', 'cegoldal', 'atepites']
const SALES = ['idopontfoglalo', 'rendeles', 'webshop', 'utalvany']
const byId = (id) => ALL_SERVICES.find((s) => s.id === id)

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
    appliesTo: ['bemutatkozo', 'cegoldal', 'idopontfoglalo', 'rendeles'],
  },
  {
    id: 'rush',
    label: { hu: 'Sürgős: a szokásos idő feléért', en: 'Rush: in half the usual time' },
    percent: 25,
    appliesTo: [...WEB, ...SALES, 'egyedi-rendszer', 'arajanlat', 'chatbot'],
  },
  /* Added 2026-09-24 at the same hourly rate: keyword research and per-page
     SEO ~3 hours, image selection and editing ~2, a newsletter signup wired
     to Brevo or Mailchimp ~2.5, automatic invoicing ~4.5 (the webshop
     already includes it). The Google listing is the catalogue offer itself,
     so its price comes from there rather than being typed twice. */
  {
    id: 'seo',
    label: { hu: 'Bővített keresőoptimalizálás', en: 'Extended search optimisation' },
    flatHuf: 50000,
    appliesTo: [...WEB, ...SALES],
  },
  {
    id: 'google',
    label: { hu: 'Google-cégprofil beállítása', en: 'Google Business Profile set up' },
    flatHuf: byId('google').priceHuf,
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
    appliesTo: ['idopontfoglalo', 'rendeles', 'utalvany'],
  },
]

/* One-off builds only. Monthly upkeep, the flat audit and per-process
   automation already say their whole price on the card; putting them
   through a calculator would only add a step. */
export const CALC_SERVICES = ALL_SERVICES.filter((s) => (s.priceUnit ?? 'from') === 'from')

export const addonsFor = (serviceId) => ADDONS.filter((a) => a.appliesTo.includes(serviceId))

/* Percentages apply to the base, not to each other, so ticking "rush"
   after "English" does not charge a rush premium on the translation twice
   over. Rounded up to the next 10 000 Ft: an estimate that pretends to be
   exact to the forint claims a precision it does not have. */
/* Extra pages for the multi-page builds (2026-09-24): five are in the
   floor price, each further one ~1.5 hours at the same hourly rate. */
export const PAGES = { appliesTo: ['cegoldal', 'atepites'], included: 5, max: 20, perPageHuf: 25000 }

export const pagesApply = (serviceId) => PAGES.appliesTo.includes(serviceId)

/* The estimate line by line, so the summary can show what the number is
   made of rather than asking the visitor to trust it. */
export function breakdown(serviceId, selectedIds = [], pages = PAGES.included) {
  const service = CALC_SERVICES.find((s) => s.id === serviceId)
  if (!service) return null
  const base = service.priceHuf
  const lines = [{ id: 'base', label: service.name, huf: base }]
  for (const addon of addonsFor(serviceId)) {
    if (!selectedIds.includes(addon.id)) continue
    lines.push({ id: addon.id, label: addon.label, huf: addon.flatHuf ?? Math.round((base * addon.percent) / 100) })
  }
  if (pagesApply(serviceId)) {
    const extra = Math.min(Math.max(pages, PAGES.included), PAGES.max) - PAGES.included
    if (extra > 0) {
      lines.push({
        id: 'pages',
        label: { hu: `${extra} további aloldal`, en: `${extra} more page${extra > 1 ? 's' : ''}` },
        huf: extra * PAGES.perPageHuf,
      })
    }
  }
  const sum = lines.reduce((a, l) => a + l.huf, 0)
  return { lines, total: Math.ceil(sum / 10000) * 10000 }
}

export const estimate = (serviceId, selectedIds, pages) => breakdown(serviceId, selectedIds, pages)?.total ?? null

/* Upkeep is a choice in the calculator, not a line in the one-off price:
   it is monthly and never discounted. Webshops get none here, because the
   catalogue quotes their upkeep separately (see services.js). */
export const UPKEEP = ALL_SERVICES.filter((s) => s.priceUnit === 'month')
export const upkeepFor = (serviceId) => (serviceId === 'webshop' ? [] : UPKEEP)

export const perMonth = (huf) => ({ hu: `${forint(huf)}/hó`, en: `${priceEn(huf)} a month` })

/* "4 900 Ft–12 900 Ft/hó" as a { hu, en } pair, for the build-or-subscribe
   table. Here rather than in the component so that the Hungarian suffixes
   stay in a data module, where the i18n guard expects them. */
export const monthlyRange = (lo, hi) => ({
  hu: `${forint(lo)}–${forint(hi)}/hó`,
  en: `${priceEn(lo)}–${priceEn(hi)} a month`,
})
