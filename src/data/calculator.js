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
export function estimate(serviceId, selectedIds = []) {
  const service = CALC_SERVICES.find((s) => s.id === serviceId)
  if (!service) return null
  const base = service.priceHuf
  let total = base
  for (const addon of addonsFor(serviceId)) {
    if (!selectedIds.includes(addon.id)) continue
    total += addon.flatHuf ?? Math.round((base * addon.percent) / 100)
  }
  return Math.ceil(total / 10000) * 10000
}

/* "4 900 Ft–12 900 Ft/hó" as a { hu, en } pair, for the build-or-subscribe
   table. Here rather than in the component so that the Hungarian suffixes
   stay in a data module, where the i18n guard expects them. */
export const monthlyRange = (lo, hi) => ({
  hu: `${forint(lo)}–${forint(hi)}/hó`,
  en: `${priceEn(lo)}–${priceEn(hi)} a month`,
})
