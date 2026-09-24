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
  details: { hu: 'Részletek', en: 'Details' },
  forWho: { hu: 'Kinek való:', en: 'Who it is for:' },
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

/* A card per offer, carrying only what decides "is this mine": what it
   solves, what it costs, how long, and the button. Everything else is one
   click further, inside the card.

   History, so the shape is not re-litigated: the first catalogue (2026-09-24)
   showed all eight blocks on dark cards, ~3000px per tab on a phone; the
   second turned them into rows, which read well but lost the scannable grid
   Máté wanted back. This keeps the grid and the short read.

   Native <details> for the extra: keyboard and screen-reader behaviour for
   free, and the closed content is still in the prerendered HTML. Cards in a
   row stretch to one height so the prices line up while closed — the state
   nearly every visitor sees; opening one grows its row, which is the
   cheaper trade. */
function ServiceCard({ s, locale }) {
  return (
    <article className="flex flex-col rounded-4xl bg-surface border border-divider p-6 sm:p-7 shadow-e2 hover:border-primary/50 hover:shadow-e3 transition-[border-color,box-shadow] duration-300">
      <div className="flex flex-wrap items-center gap-2 min-h-[1.5rem]">
        {s.demo && (
          <a
            href={s.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-primary px-2.5 py-1 rounded-full hover:bg-primary-dark transition-colors"
          >
            {t(COPY.demo, locale)}
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
          </a>
        )}
        {s.isNew && (
          <span className="text-xs font-semibold text-primary-dark border border-primary/50 px-2.5 py-0.5 rounded-full">{t(COPY.isNew, locale)}</span>
        )}
      </div>

      <h3 className="font-display font-bold text-xl text-ink mt-4 [text-wrap:balance]">{t(s.name, locale)}</h3>
      <p className="text-muted text-[0.95rem] mt-2.5 leading-relaxed [text-wrap:pretty]">{t(s.problem, locale)}</p>

      <div className="mt-auto pt-6">
        <p className="font-display font-semibold text-2xl text-ink">{t(priceLabel(s), locale)}</p>
        {s.timeline && <p className="text-sm text-muted mt-1">{t(s.timeline, locale)}</p>}

        <a
          href="#kapcsolat"
          onClick={() => requestQuote(s.name)}
          className="mt-5 flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-ink text-surface hover:bg-primary transition-colors duration-300"
        >
          {t(COPY.cta, locale)}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <details className="group mt-4 border-t border-divider pt-3">
          <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-between py-1.5 text-sm font-semibold text-primary-dark rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {t(COPY.details, locale)}
            <ChevronDown
              className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180 motion-reduce:transition-none"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </summary>
          <div className="pt-3 pb-1">
            <ul className="space-y-2">
              {s.includes.map((x, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink/90">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  {t(x, locale)}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted mt-4 leading-relaxed">
              <span className="font-semibold text-ink">{t(COPY.forWho, locale)}</span> {t(s.forWho, locale)}
            </p>
            {s.proof && <p className="mt-3 rounded-2xl bg-primary/10 px-3.5 py-2.5 text-sm text-ink leading-relaxed">{t(s.proof, locale)}</p>}
          </div>
        </details>
      </div>
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

            Light cards on purpose: Projects above is dark slabs of work
            already built, and this is what is for sale. Two different jobs,
            and the page used to make them look identical. */}
        {SERVICE_GROUPS.map((g, i) => (
          <div key={g.id} id={`szolg-panel-${g.id}`} role="tabpanel" aria-labelledby={`szolg-tab-${g.id}`} hidden={active !== i} className="mt-7">
            <p className="text-muted leading-relaxed max-w-3xl">{t(g.intro, locale)}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {g.items.map((s) => (
                <ServiceCard key={s.id} s={s} locale={locale} />
              ))}
            </div>
            {g.items.some((s) => s.isNew) && <p className="text-muted text-sm leading-relaxed max-w-3xl mt-6">{t(COPY.newNote, locale)}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
