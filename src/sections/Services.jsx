import { useRef, useState } from 'react'
import { Check, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { SERVICE_GROUPS, priceLabel } from '../data/services'
import { useInView } from '../motion/useInView'
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
  isNew: { hu: 'Új', en: 'New' },
  demo: { hu: 'Élő demó', en: 'Live demo' },
  openDemo: { hu: 'Megnyitom a demót', en: 'Open the demo' },
  forWho: { hu: 'Kinek való:', en: 'Who it is for:' },
  cta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  /* The sentence the AI section used to carry for its three offers, now
     applied to every offer it is true of. Once per group rather than on each
     row, because six copies of it read as a disclaimer, not a statement. */
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

/* One row per offer, closed by default. The 2026-09-24 critique measured the
   first version — a full card per offer, eight blocks each — at ~3000px of
   scrolling per tab on a phone, for an owner who only wants to know which
   one is theirs. Closed, a row answers that: what it solves, what it costs,
   how long. Open, it answers the rest.

   Native <details>: keyboard and screen-reader behaviour for free, no state,
   and the closed content is still in the prerendered HTML. The demo is a
   plain label in the summary rather than a link, because a link inside the
   control that toggles the row is two actions on one target. */
function ServiceRow({ s, locale }) {
  return (
    <li className="border-t border-divider first:border-t-0">
      <details className="group">
        <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer py-6 grid gap-x-8 gap-y-3 sm:grid-cols-[1fr_auto] items-start rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink [text-wrap:balance]">{t(s.name, locale)}</h3>
              {s.demo && (
                <span className="text-xs font-semibold text-white bg-primary px-2.5 py-0.5 rounded-full">{t(COPY.demo, locale)}</span>
              )}
              {s.isNew && (
                <span className="text-xs font-semibold text-primary-dark border border-primary/50 px-2.5 py-0.5 rounded-full">
                  {t(COPY.isNew, locale)}
                </span>
              )}
            </div>
            <p className="text-muted mt-2 leading-relaxed max-w-2xl [text-wrap:pretty]">{t(s.problem, locale)}</p>
          </div>
          <div className="flex items-start justify-between gap-4 sm:justify-end sm:text-right">
            <div>
              <p className="font-display font-semibold text-lg text-ink whitespace-nowrap">{t(priceLabel(s), locale)}</p>
              {s.timeline && <p className="text-sm text-muted mt-0.5 sm:max-w-[16rem]">{t(s.timeline, locale)}</p>}
            </div>
            <ChevronDown
              className="h-5 w-5 mt-1 shrink-0 text-primary-dark transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180 motion-reduce:transition-none"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        </summary>

        <div className="pb-7 grid gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
          <div className="max-w-2xl">
            <ul className="space-y-2.5">
              {s.includes.map((x, i) => (
                <li key={i} className="flex items-start gap-2.5 text-ink/90">
                  <Check className="h-4 w-4 text-primary mt-1 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  {t(x, locale)}
                </li>
              ))}
            </ul>
            <p className="text-muted mt-5 leading-relaxed">
              <span className="font-semibold text-ink">{t(COPY.forWho, locale)}</span> {t(s.forWho, locale)}
            </p>
            {s.proof && <p className="mt-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm text-ink leading-relaxed">{t(s.proof, locale)}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:items-end sm:pt-1">
            <a
              href="#kapcsolat"
              onClick={() => requestQuote(s.name)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors duration-300 whitespace-nowrap"
            >
              {t(COPY.cta, locale)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {s.demo && (
              <a
                href={s.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-primary-dark hover:text-ink transition-colors"
              >
                {t(COPY.openDemo, locale)}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </details>
    </li>
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
        className={`max-w-6xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight [text-wrap:balance]">
            {t(COPY.headingLead, locale)} <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">{t(COPY.intro, locale)}</p>
          {/* Up here rather than under the list: the visitor who does not
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

            A light surface on purpose: Projects above is dark slabs of work
            already built, and this is what is for sale. Two different jobs,
            and the page used to make them look identical. */}
        {SERVICE_GROUPS.map((g, i) => (
          <div
            key={g.id}
            id={`szolg-panel-${g.id}`}
            role="tabpanel"
            aria-labelledby={`szolg-tab-${g.id}`}
            hidden={active !== i}
            className="mt-6 rounded-5xl bg-surface border border-divider px-6 sm:px-10 py-4 sm:py-6 shadow-e2"
          >
            <p className="text-muted leading-relaxed max-w-3xl pt-4 pb-2">{t(g.intro, locale)}</p>
            <ul>
              {g.items.map((s) => (
                <ServiceRow key={s.id} s={s} locale={locale} />
              ))}
            </ul>
            {g.items.some((s) => s.isNew) && (
              <div className="border-t border-divider pt-5 pb-3">
                <p className="text-muted text-sm leading-relaxed max-w-3xl">{t(COPY.newNote, locale)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
