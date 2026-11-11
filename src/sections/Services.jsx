import { useRef, useState } from 'react'
import { Check, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { SERVICE_GROUPS, priceLabel, LABELS, salePriceLabel, isDiscounted, offerActive, LAUNCH_OFFER, LAUNCH_NOTE } from '../data/services'
import { useInView } from '../motion/useInView'
import { BuildOrSubscribe } from './ServicesExtras'
import PriceCalculator from './PriceCalculator'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'
import Hl from '../components/Hl'

const COPY = {
  count: { hu: 'szolgáltatás', en: 'services' },
  headingLead: { hu: 'Ami ma órákat visz el,', en: 'Whatever eats your hours today,' },
  headingAccent: { hu: 'arra van megoldásom.', en: 'I have a fix for it.' },
  intro: {
    hu: 'Válaszd ki, mi a gond, és megmutatom, mivel oldanám meg. Az árak indulóárak: a végleges árat ==a munka megkezdése előtt rögzítjük, írásban és tételesen==. Utólag nem jön hozzá semmi.',
    en: 'Pick what the problem is and I will show you how I would solve it. These are starting prices: ==the final one is fixed before any work begins, in writing and itemised==. Nothing gets added afterwards.',
  },
  unsure: { hu: 'Nem tudod, melyik kell, vagy nagyobb, egyedi rendszer kellene? Írd le a gondot, és megmondom, megéri-e.', en: 'Not sure which one you need, or need a bigger system of your own? Describe the problem and I will tell you whether it pays off.' },
  tablist: { hu: 'Szolgáltatáscsoportok', en: 'Service groups' },
  /* What competitors list per package and this page did not say at all
     (market check, 2026-09-24): what the price already covers. Said once
     for everything rather than repeated on every card. */
  includedPill: { hu: 'Minden projektnél', en: 'Every project' },
  includedTitle: { hu: 'Ez benne van az árban', en: 'This is in the price' },
  listPrice: { hu: 'Lista ár:', en: 'List price:' },
  salePrice: { hu: 'Akciós ár:', en: 'Offer price:' },
  noHidden: {
    hu: 'Nincs rejtett költség: ami nincs benne az írásos ajánlatban, azt utólag nem számlázom ki.',
    en: 'No hidden costs: whatever is not in the written quote, I do not bill afterwards.',
  },
  included: [
    { hu: 'Fix ár, írásban, előre', en: 'A fixed price, in writing, up front' },
    { hu: 'Weboldalnál domain, tárhely és SSL beállítása a nevedre', en: 'For sites: domain, hosting and SSL set up in your name' },
    { hu: 'Betanítás, hogy magad is tudd kezelni', en: 'A walkthrough, so you can run it yourself' },
    { hu: '1 év díjmentes hibajavítás, ha az én hibámból nem működik valami', en: 'A year of free fixes for anything that breaks through my fault' },
    { hu: 'A kód, a domain és a hozzáférések a tiéd', en: 'The code, the domain and the accounts are yours' },
  ],
  newHeading: { hu: 'Újabb ajánlatok', en: 'Newer offers' },
  moreOffers: (n) => ({ hu: `További ${n} ajánlat`, en: `${n} more offers` }),
  fewerOffers: { hu: 'Kevesebb', en: 'Fewer' },
  demo: { hu: 'Élő demó', en: 'Live demo' },
  includes: { hu: 'Amit kapsz', en: 'What you get' },
  openDemo: { hu: 'Megnyitom a demót', en: 'Open the demo' },
  cta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  /* The sentence the AI section used to carry for its three offers, now
     applied to every offer it is true of. Once per group rather than on each
     card, because six copies of it read as a disclaimer, not a statement. */
  newNote: {
    hu: 'Ezek a kínálatom legújabb részei, az első projekteknél ezt be is árazom. Ahol mellette élő demó van, az saját bemutató projektem, nem ügyfélmunka. Ha menet közben kiderül, hogy nem éri meg neked, megmondom.',
    en: 'These are the newest part of what I offer, and I price the first few accordingly. Where one has a live demo, that demo is my own project, not client work. If it turns out along the way that it is not worth it for you, I will say so.',
  },
}

/* Tells ContactForm which offer the visitor came from. An event rather than
   shared state because the two sections sit far apart in the tree and this
   is the only thing they ever say to each other. */
function requestQuote(name) {
  window.dispatchEvent(new CustomEvent('quote:prefill', { detail: { name } }))
}

function Price({ s, locale }) {
  return isDiscounted(s) ? (
    <p className="flex flex-wrap items-baseline justify-end gap-x-2">
      <span className="sr-only">{t(COPY.listPrice, locale)} </span>
      <s className="text-[13px] text-muted decoration-muted/70">{t(priceLabel(s), locale)}</s>
      <span className="sr-only">{t(COPY.salePrice, locale)} </span>
      <span className="font-display font-semibold text-lg text-warm">{t(salePriceLabel(s), locale)}</span>
      <span className="font-semibold text-[13px] text-white bg-primary px-2 py-0.5 rounded-full">−{LAUNCH_OFFER.percent}%</span>
    </p>
  ) : (
    <p className="font-display font-semibold text-lg text-warm whitespace-nowrap">{t(priceLabel(s), locale)}</p>
  )
}

/* One offer as a row, not a card (2026-11-09, Máté: the catalogue was a
   4 000 px wall, seven tall cards in the first tab alone). The row shows what
   a visitor scans for: the name, the problem, the price and the time. What
   you get, the demo proof and the quote button open on tap.

   A native <details>, not a JS accordion: no state, keyboard and screen
   readers work out of the box, and the closed rows still carry their whole
   text in the prerendered HTML that search engines and the chatbot read.

   The demo label in the summary is plain text on purpose: a link inside a
   <summary> fights with the toggle. The real demo link sits in the body.

   "Kinek való" stayed in the data (the chatbot and llms.txt read it) but
   is not shown: the problem sentence already answers it. */
function ServiceRow({ s, locale }) {
  return (
    <details className="group border-b border-divider last:border-b-0">
      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer grid grid-cols-[1fr_auto] gap-x-5 gap-y-2 px-5 sm:px-7 py-5 hover:bg-primary/5 transition-colors">
        <div className="min-w-0">
          <h3 className="flex flex-wrap items-center gap-2 font-display font-bold text-lg text-ink leading-snug tracking-tight">
            {t(s.name, locale)}
            {s.demo && (
              <span className="font-semibold text-[13px] text-white bg-primary px-2 py-0.5 rounded-full">{t(COPY.demo, locale)}</span>
            )}
          </h3>
          <p className="text-muted text-sm mt-1.5 leading-relaxed max-w-2xl">{t(s.problem, locale)}</p>
        </div>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="text-right hidden sm:block">
            <Price s={s} locale={locale} />
            {s.timeline && <p className="text-muted text-[13px] mt-0.5 whitespace-nowrap">{t(s.timeline, locale)}</p>}
          </div>
          <ChevronDown className="h-5 w-5 mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
        </div>
        {/* On a phone the price drops under the text instead of squeezing it. */}
        <div className="sm:hidden col-span-2 flex flex-wrap items-baseline justify-between gap-x-3">
          <Price s={s} locale={locale} />
          {s.timeline && <p className="text-muted text-[13px]">{t(s.timeline, locale)}</p>}
        </div>
      </summary>

      <div className="px-5 sm:px-7 pb-6 grid gap-5 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <div>
          <p className="font-semibold text-[13px] text-primary-dark">{t(COPY.includes, locale)}</p>
          <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {s.includes.map((x, i) => (
              <li key={i} className="flex gap-2 text-muted text-[13px] leading-relaxed">
                <Check className="h-3.5 w-3.5 shrink-0 mt-[3px] text-primary" strokeWidth={2.5} aria-hidden="true" />
                <span>{t(x, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          {s.proof && <p className="rounded-2xl bg-primary/10 px-3.5 py-2.5 text-[13px] text-ink leading-relaxed">{t(s.proof, locale)}</p>}
          <a
            href="#kapcsolat"
            onClick={() => requestQuote(s.name)}
            className="flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
          >
            {t(COPY.cta, locale)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          {s.demo && (
            <a
              href={s.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 px-5 py-2.5 rounded-full font-semibold border border-divider text-ink hover:border-primary/60 hover:text-primary-dark transition-colors duration-300"
            >
              {t(COPY.openDemo, locale)}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </details>
  )
}

export default function Services() {
  const [ref, visible] = useInView(0.05)
  const locale = useLocale()
  const [active, setActive] = useState(0)
  const [more, setMore] = useState({})
  const tabs = useRef([])

  /* The WAI-ARIA tabs pattern: arrows move between tabs and activate them,
     Home/End jump to the ends, and only the selected tab is in the Tab
     order so the next Tab press lands in the panel, not on tab two. */
  function onKeyDown(e) {
    const last = SERVICE_GROUPS.length - 1
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="szolgaltatasok" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div
        className={`relative max-w-7xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight [text-wrap:balance]">
            <span className="text-primary-dark">{t(COPY.headingLead, locale)}</span> <span className="font-semibold">{t(COPY.headingAccent, locale)}</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed"><Hl text={t(COPY.intro, locale)} /></p>
          {/* Up here rather than under the cards: the visitor who does not
              know which offer is theirs needs this before seventeen of them,
              not after. */}
          <a
            href="#kapcsolat"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-dark hover:text-ink transition-colors duration-300"
          >
            {t(COPY.unsure, locale)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Three doors, named after the problem rather than the product
            (2026-11-10, Máté): the owner picks what hurts, then sees what fixes
            it. Still the WAI-ARIA tabs pattern underneath, so arrows, Home and
            End keep working and only the open door is in the Tab order. */}
        <div role="tablist" aria-label={t(COPY.tablist, locale)} className="mt-10 sm:mt-12 grid gap-3 sm:grid-cols-3">
          {SERVICE_GROUPS.map((g, i) => {
            // Floor over every item, flat ones included: a door reading 150 000 Ft-tól
            // over a 30 000 Ft item was the critique's trust bug (2026-11-10).
            // Monthly upkeep is left out: "15 000 Ft-tól" would read as a one-off price.
            const from = Math.min(...g.items.filter((s) => s.priceUnit !== 'month').map((s) => s.priceHuf))
            return (
              <button
                key={g.id}
                ref={(el) => (tabs.current[i] = el)}
                id={`szolg-tab-${g.id}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls={`szolg-panel-${g.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={`flex flex-col justify-start text-left rounded-3xl border p-4 sm:p-5 transition-colors duration-200 ${
                  active === i ? 'bg-primary border-primary-light text-white shadow-e3' : 'card-invert border-divider text-ink shadow-e2 hover:border-primary-light'
                }`}
              >
                <span className="block font-display font-bold text-lg tracking-tight">{t(g.title, locale)}</span>
                <span className={`block text-sm leading-relaxed mt-2 ${active === i ? 'text-white/90' : 'text-muted'}`}>{t(g.intro, locale)}</span>
                <span className={`block font-semibold text-[13px] mt-4 ${active === i ? 'text-white' : 'text-primary-dark'}`}>
                  {g.items.length} {t(COPY.count, locale)} · {t(LABELS.from(from), locale)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Every panel is rendered and the inactive ones are hidden, so the
            prerendered HTML — what search engines read — carries the whole
            catalogue, not just tab one. */}
        {SERVICE_GROUPS.map((g, i) => (
          <div key={g.id} id={`szolg-panel-${g.id}`} role="tabpanel" aria-labelledby={`szolg-tab-${g.id}`} hidden={active !== i} className="mt-7">
            {/* Three headline offers per door, the rest one tap away (2026-11-11,
                Máté: too much to read). The rest stays in the DOM, only hidden,
                so the prerendered HTML still carries the whole catalogue. */}
            {(() => {
              const proven = g.items.filter((s) => !s.isNew)
              const fresh = g.items.filter((s) => s.isNew)
              const hiddenCount = Math.max(proven.length - 3, 0) + fresh.length
              const isOpen = Boolean(more[g.id])
              return (
                <>
                  <div className="mt-6 card-invert border border-divider rounded-4xl overflow-hidden shadow-e2">
                    {proven.slice(0, 3).map((s) => (
                      <ServiceRow key={s.id} s={s} locale={locale} />
                    ))}
                  </div>
                  <div id={`szolg-more-${g.id}`} hidden={!isOpen}>
                    {proven.length > 3 && (
                      <div className="mt-4 card-invert border border-divider rounded-4xl overflow-hidden shadow-e2">
                        {proven.slice(3).map((s) => (
                          <ServiceRow key={s.id} s={s} locale={locale} />
                        ))}
                      </div>
                    )}
                    {fresh.length > 0 && (
                      <>
                        <h3 className="mt-10 font-display font-bold text-xl text-ink tracking-tight">{t(COPY.newHeading, locale)}</h3>
                        <p className="text-muted text-sm leading-relaxed max-w-prose mt-2">{t(COPY.newNote, locale)}</p>
                        <div className="mt-5 card-invert border border-divider rounded-4xl overflow-hidden shadow-e2">
                          {fresh.map((s) => (
                            <ServiceRow key={s.id} s={s} locale={locale} />
                          ))}
                        </div>
                      </>
                    )}
                    {g.id === 'eladas' && <BuildOrSubscribe locale={locale} />}
                  </div>
                  {hiddenCount > 0 && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`szolg-more-${g.id}`}
                      onClick={() => setMore((m) => ({ ...m, [g.id]: !isOpen }))}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-divider px-5 text-sm font-semibold text-ink transition-colors hover:border-primary-light"
                    >
                      {isOpen ? t(COPY.fewerOffers, locale) : t(COPY.moreOffers(hiddenCount), locale)}
                      <span aria-hidden="true">{isOpen ? '↑' : '↓'}</span>
                    </button>
                  )}
                </>
              )
            })()}
          </div>
        ))}

        {/* After the offers, not before (2026-11-11 critique): the fine print
            reads as reassurance once the visitor has seen a price. */}
        <div className="mt-10 card-invert border border-divider rounded-4xl p-6 sm:p-8 shadow-e2">
          <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.includedTitle, locale)}</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {COPY.included.map((x, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted leading-relaxed">
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
                {t(x, locale)}
              </li>
            ))}
          </ul>
          <p className="mt-5 pt-4 border-t border-divider text-sm font-semibold text-ink max-w-prose">{t(COPY.noHidden, locale)}</p>
          {offerActive() && (
            <p className="mt-4 rounded-2xl bg-primary/15 px-4 py-3 text-sm font-semibold text-ink">{t(LAUNCH_NOTE, locale)}</p>
          )}
        </div>

        <PriceCalculator locale={locale} onQuote={requestQuote} />
      </div>
    </section>
  )
}
