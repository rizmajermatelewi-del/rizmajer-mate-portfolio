import { ALL_SERVICES, priceLabel } from '../data/services'
import { monthlyRange } from '../data/calculator'
import { forint, priceEn } from '../data/fx'
import { t } from '../i18n/t'

/* The build-or-subscribe comparison, split out of Services.jsx so that file
   stays about the catalogue. The calculator lives in PriceCalculator.jsx. */

const COPY = {
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
