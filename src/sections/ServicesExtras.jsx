import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { SERVICE_GROUPS, ALL_SERVICES, priceLabel, isDiscounted, saleHuf, LAUNCH_OFFER } from '../data/services'
import { CALC_SERVICES, addonsFor, estimate, monthlyRange } from '../data/calculator'
import { forint, priceEn } from '../data/fx'
import { t } from '../i18n/t'

/* The two pieces of the services section that are more than a card:
   the price calculator and the build-or-subscribe comparison. Split out of
   Services.jsx so that file stays about the catalogue. */

const COPY = {
  calcTitle: { hu: 'Mennyibe kerülne nekem?', en: 'What would mine cost?' },
  calcIntro: {
    hu: 'Válaszd ki, mire van szükséged, és pipáld be, ami még kell. A becslés a kiírt indulóárakból számol; a végleges árat az első beszélgetés után írásban kapod.',
    en: 'Pick what you need and tick what else you want. The estimate works from the published starting prices; the final price comes in writing after our first conversation.',
  },
  calcService: { hu: 'Mire van szükséged?', en: 'What do you need?' },
  calcExtras: { hu: 'Még ez is kell', en: 'I also need' },
  calcNone: { hu: 'Ehhez nincs választható kiegészítő.', en: 'There are no extras for this one.' },
  calcResult: { hu: 'Becsült induló ár', en: 'Estimated starting price' },
  calcCta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  estimateWord: { hu: 'becslés', en: 'estimate' },

  compareTitle: { hu: 'Egyedi, vagy havidíjas?', en: 'Built for you, or a subscription?' },
  compareIntro: {
    hu: 'Foglalásra és webshopra van kész, havidíjas megoldás is. Így néz ki a kettő egymás mellett, három évre számolva.',
    en: 'Bookings and shops also come ready-made, for a monthly fee. This is how the two compare over three years.',
  },
  colSaas: { hu: 'Havidíjas szolgáltatás', en: 'Subscription service' },
  colMine: { hu: 'Egyedi, nálam', en: 'Built for you, by me' },
  rowBooking: { hu: 'Időpontfoglaló', en: 'Booking' },
  rowShop: { hu: 'Webshop', en: 'Online shop' },
  rowRules: { hu: 'Szabályok', en: 'Rules' },
  rowData: { hu: 'Az adataid', en: 'Your data' },
  saasRules: { hu: 'Amit a szolgáltató enged', en: 'Whatever the provider allows' },
  mineRules: { hu: 'A tieid', en: 'Yours' },
  saasData: { hu: 'A szolgáltatónál', en: 'With the provider' },
  mineData: { hu: 'Nálad', en: 'With you' },
  once: { hu: 'egyszer', en: 'once' },
  threeYears: { hu: '3 év alatt', en: 'over 3 years' },
  honest: {
    hu: 'Ha egy dobozos megoldás tudja, amit kell, azt javaslom — három év alatt olcsóbb. Egyedi akkor éri meg, ha a szabályaid nem férnek bele, ha a vevőid adata nálad kell legyen, vagy ha nem akarsz örökké havidíjat fizetni.',
    en: 'If a ready-made one does what you need, I will recommend it — over three years it costs less. Building your own pays off when your rules do not fit, when your customers\' data has to stay with you, or when you do not want to pay a monthly fee forever.',
  },
}

const fmt = (huf) => ({ hu: forint(huf), en: priceEn(huf) })

/* Published monthly prices, checked 2026-09-24: idopontok.hu Pro 4 900 and
   Vállalati 12 900 Ft/month; Shoprenter / UNAS / Shopify plans roughly
   5 000–50 000 Ft/month. Literal because they are someone else's prices —
   recheck them before trusting this table a year from now. */
const SAAS = {
  booking: [4900, 12900],
  shop: [5000, 50000],
}
const priceOf = (id) => ALL_SERVICES.find((s) => s.id === id)

export function BuildOrSubscribe({ locale }) {
  const rows = [
    { label: COPY.rowBooking, range: SAAS.booking, mine: priceOf('idopontfoglalo') },
    { label: COPY.rowShop, range: SAAS.shop, mine: priceOf('webshop') },
  ]

  return (
    <div className="mt-10 card-invert border border-divider rounded-4xl p-6 sm:p-8 shadow-e2">
      <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.compareTitle, locale)}</h3>
      <p className="text-muted text-sm mt-2 leading-relaxed max-w-3xl">{t(COPY.compareIntro, locale)}</p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] text-sm text-left">
          <thead>
            <tr className="border-b border-divider">
              <th scope="col" className="py-2.5 pr-4" />
              <th scope="col" className="py-2.5 pr-4 font-semibold text-muted">{t(COPY.colSaas, locale)}</th>
              <th scope="col" className="py-2.5 font-semibold text-ink">{t(COPY.colMine, locale)}</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {rows.map((r) => (
              <tr key={t(r.label, 'hu')} className="border-b border-divider">
                <th scope="row" className="py-3 pr-4 font-semibold text-ink">{t(r.label, locale)}</th>
                <td className="py-3 pr-4">
                  {t(monthlyRange(r.range[0], r.range[1]), locale)}
                  <span className="block text-[13px]">
                    {t(COPY.threeYears, locale)}: {t(fmt(r.range[0] * 36), locale)}–{t(fmt(r.range[1] * 36), locale)}
                  </span>
                </td>
                <td className="py-3 text-ink">
                  {t(priceLabel(r.mine), locale)} <span className="text-muted">{t(COPY.once, locale)}</span>
                </td>
              </tr>
            ))}
            <tr className="border-b border-divider">
              <th scope="row" className="py-3 pr-4 font-semibold text-ink">{t(COPY.rowRules, locale)}</th>
              <td className="py-3 pr-4">{t(COPY.saasRules, locale)}</td>
              <td className="py-3 text-ink">{t(COPY.mineRules, locale)}</td>
            </tr>
            <tr>
              <th scope="row" className="py-3 pr-4 font-semibold text-ink">{t(COPY.rowData, locale)}</th>
              <td className="py-3 pr-4">{t(COPY.saasData, locale)}</td>
              <td className="py-3 text-ink">{t(COPY.mineData, locale)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-ink/90 mt-5 leading-relaxed max-w-3xl">{t(COPY.honest, locale)}</p>
    </div>
  )
}

export function PriceCalculator({ locale, onQuote }) {
  const [serviceId, setServiceId] = useState(CALC_SERVICES[0].id)
  const [picked, setPicked] = useState([])
  const service = CALC_SERVICES.find((s) => s.id === serviceId)
  const addons = addonsFor(serviceId)
  const total = estimate(serviceId, picked)
  const chosen = addons.filter((a) => picked.includes(a.id))

  function choose(id) {
    setServiceId(id)
    setPicked((p) => p.filter((a) => addonsFor(id).some((x) => x.id === a)))
  }
  function toggle(id) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }
  /* What lands in the enquiry: the offer, the extras, and the estimate, so
     the first reply can start from the same number the visitor saw. */
  function quoteName() {
    const line = (loc) => {
      const extras = chosen.map((a) => t(a.label, loc)).join(', ')
      const price = t(priceLabel({ priceHuf: isDiscounted(service) ? saleHuf(total) : total }), loc)
      return `${t(service.name, loc)}${extras ? ` + ${extras}` : ''} (${t(COPY.estimateWord, loc)}: ${price})`
    }
    return { hu: line('hu'), en: line('en') }
  }

  return (
    <div className="mt-10 card-invert border border-divider rounded-4xl p-6 sm:p-8 shadow-e2 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div>
        <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.calcTitle, locale)}</h3>
        <p className="text-muted text-sm mt-2 leading-relaxed max-w-2xl">{t(COPY.calcIntro, locale)}</p>

        <label htmlFor="calc-service" className="block mt-6 text-sm font-semibold text-ink">
          {t(COPY.calcService, locale)}
        </label>
        <select
          id="calc-service"
          value={serviceId}
          onChange={(e) => choose(e.target.value)}
          className="mt-2 w-full sm:max-w-md rounded-2xl border border-divider bg-background text-ink px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-primary"
        >
          {SERVICE_GROUPS.map((g) => {
            const items = CALC_SERVICES.filter((s) => s.group === g.id)
            if (!items.length) return null
            return (
              <optgroup key={g.id} label={t(g.title, locale)}>
                {items.map((s) => (
                  <option key={s.id} value={s.id}>
                    {t(s.name, locale)}
                  </option>
                ))}
              </optgroup>
            )
          })}
        </select>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">{t(COPY.calcExtras, locale)}</legend>
          {addons.length === 0 ? (
            <p className="text-sm text-muted mt-2">{t(COPY.calcNone, locale)}</p>
          ) : (
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {addons.map((a) => (
                <label key={a.id} className="flex items-center gap-3 rounded-2xl border border-divider px-4 py-3 text-sm text-ink cursor-pointer hover:border-primary/60 has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors">
                  <input type="checkbox" checked={picked.includes(a.id)} onChange={() => toggle(a.id)} className="h-4 w-4 accent-[rgb(var(--color-primary))]" />
                  <span className="flex-1">{t(a.label, locale)}</span>
                  <span className="text-muted text-[13px] whitespace-nowrap">
                    {a.percent ? `+${a.percent}%` : `+${t(fmt(a.flatHuf), locale)}`}
                  </span>
                </label>
              ))}
            </div>
          )}
        </fieldset>
      </div>

      <div className="flex flex-col justify-end rounded-3xl bg-primary/10 p-6">
        <p className="text-sm text-muted">{t(COPY.calcResult, locale)}</p>
        {isDiscounted(service) ? (
          <div aria-live="polite">
            <p className="text-sm text-muted mt-1">
              <s>{t(priceLabel({ priceHuf: total }), locale)}</s>
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <span className="font-display font-extrabold text-[1.75rem] leading-tight whitespace-nowrap text-ink">
                {t(priceLabel({ priceHuf: saleHuf(total) }), locale)}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2 py-0.5 rounded-full">
                −{LAUNCH_OFFER.percent}%
              </span>
            </p>
          </div>
        ) : (
          <p className="font-display font-extrabold text-[1.75rem] leading-tight whitespace-nowrap text-ink mt-1" aria-live="polite">
            {t(priceLabel({ priceHuf: total }), locale)}
          </p>
        )}
        {service.timeline && <p className="text-[13px] text-muted mt-1">{t(service.timeline, locale)}</p>}
        {chosen.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {chosen.map((a) => (
              <li key={a.id} className="flex gap-2 text-[13px] text-ink/90">
                <Check className="h-3.5 w-3.5 mt-[3px] shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                {t(a.label, locale)}
              </li>
            ))}
          </ul>
        )}
        <a
          href="#kapcsolat"
          onClick={() => onQuote(quoteName())}
          className="mt-6 flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors duration-300"
        >
          {t(COPY.calcCta, locale)}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
