import { useRef, useState } from 'react'
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react'
import { SERVICE_GROUPS, priceLabel } from '../data/services'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

const COPY = {
  headingLead: { hu: 'Mit építhetek', en: 'What I can build' },
  headingAccent: { hu: 'neked.', en: 'for you.' },
  intro: {
    hu: 'Válaszd ki, mi a gond, és megmutatom, mivel oldanám meg. Az árak indulóárak: a végleges árat a munka megkezdése előtt rögzítjük — írásban, tételesen. Utólag nem jön hozzá semmi.',
    en: 'Pick what the problem is and I will show you how I would solve it. These are starting prices: the final one is fixed before any work begins — in writing and itemised. Nothing gets added afterwards.',
  },
  unsure: { hu: 'Nem tudod, melyik kell? Írd le a gondot, én megmondom.', en: 'Not sure which one you need? Describe the problem and I will tell you.' },
  tablist: { hu: 'Szolgáltatáscsoportok', en: 'Service groups' },
  /* What competitors list per package and this page did not say at all
     (market check, 2026-09-24): what the price already covers. Said once
     for everything rather than repeated on seventeen cards. */
  includedTitle: { hu: 'Minden projektnél benne van az árban', en: 'Included in the price of every project' },
  included: [
    { hu: 'Fix ár, írásban, előre', en: 'A fixed price, in writing, up front' },
    { hu: 'Weboldalnál domain, tárhely és SSL beállítása a nevedre', en: 'For sites: domain, hosting and SSL set up in your name' },
    { hu: 'Betanítás, hogy magad is tudd kezelni', en: 'A walkthrough, so you can run it yourself' },
    { hu: '1 év díjmentes hibajavítás, ha az én hibámból nem működik valami', en: 'A year of free fixes for anything that breaks through my fault' },
    { hu: 'A kód, a domain és a hozzáférések a tiéd', en: 'The code, the domain and the accounts are yours' },
  ],
  isNew: { hu: 'Új', en: 'New' },
  demo: { hu: 'Élő demó', en: 'Live demo' },
  includes: { hu: 'Amit kapsz', en: 'What you get' },
  openDemo: { hu: 'Megnyitom a demót', en: 'Open the demo' },
  cta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  /* The sentence the AI section used to carry for its three offers, now
     applied to every offer it is true of. Once per group rather than on each
     card, because six copies of it read as a disclaimer, not a statement. */
  newNote: {
    hu: 'Az „Új” jelölésűek a kínálatom legújabb részei: ilyet fizető ügyfélnek még nem szállítottam, ezért az első projekteknél ezt be is árazom. Ha menet közben kiderül, hogy nem éri meg neked, megmondom.',
    en: 'The ones marked “New” are the newest part of what I offer: I have not delivered one for a paying client yet, so I price the first few accordingly. If it turns out along the way that it is not worth it for you, I will say so.',
  },
}

/* Tells ContactForm which offer the visitor came from. An event rather than
   shared state because the two sections sit far apart in the tree and this
   is the only thing they ever say to each other. */
function requestQuote(name) {
  window.dispatchEvent(new CustomEvent('quote:prefill', { detail: { name } }))
}

/* The same card as "Amin dolgozom" above, at Máté's request (2026-09-24):
   dark inverted surface, the lift and tilt on hover, the pill labels, the
   check list and the ruled footer. What differs is only what a service has
   and a project does not — a price and a quote button — and what a project
   has and a service does not: a screenshot. Only three of seventeen offers
   have a demo to show, and a drawn stand-in on the other fourteen would be
   the fake product chrome the page rules out.

   "Kinek való" stayed in the data (the chatbot and llms.txt read it) but
   left the card: the problem sentence already answers it, and a sixth block
   is what made the first catalogue too long to scan. */
function ServiceCard({ s, locale }) {
  return (
    <article className="group h-full card-invert border border-divider rounded-4xl overflow-hidden card-motion shadow-e2 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-e4">
      <TiltCard className="h-full">
        <div className="flex h-full flex-col p-6">
          <div className="mb-3.5 flex flex-wrap items-center gap-1.5 min-h-[1.375rem]">
            {s.demo && (
              <a
                href={s.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t(COPY.openDemo, locale)}: ${t(s.name, locale)}`}
                className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2.5 py-1 rounded-full hover:bg-primary-dark transition-colors"
              >
                {t(COPY.demo, locale)}
                <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
              </a>
            )}
            {s.isNew && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                {t(COPY.isNew, locale)}
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-lg text-ink leading-snug tracking-tight">{t(s.name, locale)}</h3>
          <p className="text-muted text-sm mt-2.5 leading-relaxed">{t(s.problem, locale)}</p>

          <div className="mt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark">{t(COPY.includes, locale)}</p>
            <ul className="mt-2 space-y-1.5">
              {s.includes.map((x, i) => (
                <li key={i} className="flex gap-2 text-muted text-[13px] leading-relaxed">
                  <Check className="h-3.5 w-3.5 shrink-0 mt-[3px] text-primary" strokeWidth={2.5} aria-hidden="true" />
                  <span>{t(x, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          {s.proof && <p className="mt-4 rounded-2xl bg-primary/10 px-3.5 py-2.5 text-[13px] text-ink leading-relaxed">{t(s.proof, locale)}</p>}

          <div className="mt-auto pt-5">
            <div className="pt-4 border-t border-divider">
              <p className="font-display font-semibold text-xl text-ink">{t(priceLabel(s), locale)}</p>
              {s.timeline && <p className="text-muted text-[13px] mt-0.5">{t(s.timeline, locale)}</p>}
            </div>
            <a
              href="#kapcsolat"
              onClick={() => requestQuote(s.name)}
              className="mt-5 flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors duration-300"
            >
              {t(COPY.cta, locale)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </TiltCard>
    </article>
  )
}

export default function Services() {
  const [ref, visible] = useInView(0.05)
  const locale = useLocale()
  const [active, setActive] = useState(0)
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
        className={`max-w-7xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight [text-wrap:balance]">
            {t(COPY.headingLead, locale)} <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">{t(COPY.intro, locale)}</p>
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

        <div className="mt-10 rounded-4xl border border-divider bg-surface/70 px-6 py-5 sm:px-8">
          <p className="font-display font-semibold text-ink">{t(COPY.includedTitle, locale)}</p>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {COPY.included.map((x, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/90">
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
                {t(x, locale)}
              </li>
            ))}
          </ul>
        </div>

        {/* Scrolls sideways on a phone rather than wrapping: four chips on
            two ragged rows read as two separate controls. */}
        <div className="mt-10 sm:mt-12 -mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto">
          <div role="tablist" aria-label={t(COPY.tablist, locale)} className="flex gap-2 min-w-max pb-1">
            {SERVICE_GROUPS.map((g, i) => (
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
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors duration-200 ${
                  active === i
                    ? 'bg-ink text-surface border-ink'
                    : 'bg-surface/60 border-divider text-ink hover:border-primary/60 hover:text-primary-dark'
                }`}
              >
                {t(g.title, locale)}
              </button>
            ))}
          </div>
        </div>

        {/* Every panel is rendered and the inactive ones are hidden, so the
            prerendered HTML — what search engines read — carries the whole
            catalogue, not just tab one.

            The cards match Projects on purpose (see ServiceCard). */}
        {SERVICE_GROUPS.map((g, i) => (
          <div key={g.id} id={`szolg-panel-${g.id}`} role="tabpanel" aria-labelledby={`szolg-tab-${g.id}`} hidden={active !== i} className="mt-7">
            <p className="text-muted leading-relaxed max-w-3xl">{t(g.intro, locale)}</p>
            {/* Wrapping flex rather than a fixed grid, so a short last row is
                centred instead of left hanging: the groups hold 3, 4 and 5
                offers, and a three-column grid turned four of them into
                3 + 1. Four go four across on wide screens (2 + 2 below),
                five go 3 + 2, three go 3. */}
            <div className="mt-6 flex flex-wrap justify-center gap-5">
              {g.items.map((s) => (
                <div
                  key={s.id}
                  className={`w-full sm:w-[calc(50%-0.625rem)] ${
                    g.items.length === 4 ? 'xl:w-[calc(25%-0.9375rem)]' : 'lg:w-[calc(33.333%-0.834rem)]'
                  }`}
                >
                  <ServiceCard s={s} locale={locale} />
                </div>
              ))}
            </div>
            {g.items.some((s) => s.isNew) && <p className="text-muted text-sm leading-relaxed max-w-3xl mt-6">{t(COPY.newNote, locale)}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
