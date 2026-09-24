import { useRef, useState } from 'react'
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react'
import { SERVICE_GROUPS, priceLabel } from '../data/services'
import { useInView } from '../motion/useInView'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

const COPY = {
  eyebrow: { hu: 'Szolgáltatások', en: 'Services' },
  headingLead: { hu: 'Mit építhetek', en: 'What I can build' },
  headingAccent: { hu: 'neked.', en: 'for you.' },
  intro: {
    hu: 'Válaszd ki, mi a gond, és megmutatom, mivel oldanám meg. Az árak indulóárak: a végleges árat a munka megkezdése előtt rögzítjük — írásban, tételesen. Utólag nem jön hozzá semmi.',
    en: 'Pick what the problem is and I will show you how I would solve it. These are starting prices: the final one is fixed before any work begins — in writing and itemised. Nothing gets added afterwards.',
  },
  tablist: { hu: 'Szolgáltatáscsoportok', en: 'Service groups' },
  isNew: { hu: 'Új', en: 'New' },
  demo: { hu: 'Élő demó', en: 'Live demo' },
  forWho: { hu: 'Kinek való?', en: 'Who is it for?' },
  cta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  /* The sentence the AI section used to carry for its three offers, now
     applied to every offer it is true of. Shown once per group rather than
     on each card, because six copies of it read as a disclaimer, not as a
     statement. */
  newNote: {
    hu: 'Az „Új” jelölésűek a kínálatom legújabb részei: ilyet fizető ügyfélnek még nem szállítottam, ezért az első projekteknél ezt be is árazom. Ha menet közben kiderül, hogy nem éri meg neked, megmondom.',
    en: 'The ones marked “New” are the newest part of what I offer: I have not delivered one for a paying client yet, so I price the first few accordingly. If it turns out along the way that it is not worth it for you, I will say so.',
  },
  unsure: { hu: 'Nem tudod, melyik kell? Írd le a gondot, én megmondom.', en: 'Not sure which one you need? Describe the problem and I will tell you.' },
}

/* Tells ContactForm which offer the visitor came from. An event rather than
   shared state because the two sections sit far apart in the tree and this
   is the only thing they ever say to each other. */
function requestQuote(name) {
  window.dispatchEvent(new CustomEvent('quote:prefill', { detail: { name } }))
}

function ServiceCard({ s, locale }) {
  return (
    <article className="card-invert border border-divider rounded-5xl p-7 sm:p-8 flex h-full flex-col hover:border-primary/60 transition-colors duration-300">
      <div className="flex flex-wrap items-center gap-2 min-h-[1.5rem]">
        {s.isNew && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
            {t(COPY.isNew, locale)}
          </span>
        )}
        {s.demo && (
          <a
            href={s.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2.5 py-1 rounded-full hover:bg-primary-dark transition-colors"
          >
            {t(COPY.demo, locale)}
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </a>
        )}
      </div>

      <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mt-4">{t(s.name, locale)}</h3>
      <p className="font-display font-semibold text-xl text-ink mt-3">{t(priceLabel(s), locale)}</p>
      {s.timeline && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mt-1.5">{t(s.timeline, locale)}</p>
      )}

      <p className="text-muted text-sm mt-5 leading-relaxed">{t(s.problem, locale)}</p>

      <ul className="mt-5 space-y-2.5">
        {s.includes.map((x, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
            {t(x, locale)}
          </li>
        ))}
      </ul>

      {s.proof && <p className="mt-5 text-sm text-ink/80 leading-relaxed border-l-2 border-primary pl-3">{t(s.proof, locale)}</p>}

      <div className="mt-5 pt-5 border-t border-divider">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{t(COPY.forWho, locale)}</p>
        <p className="text-muted text-sm mt-2 leading-relaxed">{t(s.forWho, locale)}</p>
      </div>

      <div className="mt-auto pt-7">
        <a
          href="#kapcsolat"
          onClick={() => requestQuote(s.name)}
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold bg-background border border-divider text-ink hover:border-primary/60 hover:text-primary-dark transition-colors duration-300"
        >
          {t(COPY.cta, locale)}
          <ArrowRight className="h-4 w-4" />
        </a>
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
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ {t(COPY.eyebrow, locale)}</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            {t(COPY.headingLead, locale)} <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">{t(COPY.intro, locale)}</p>
        </div>

        {/* Scrolls sideways on a phone rather than wrapping: four chips on
            two ragged rows read as two separate controls. */}
        <div className="-mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto">
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
                    ? 'bg-primary text-white border-primary'
                    : 'border-divider text-ink hover:border-primary/60 hover:text-primary-dark'
                }`}
              >
                {t(g.title, locale)}
              </button>
            ))}
          </div>
        </div>

        {/* Every panel is rendered and the inactive ones are hidden, so the
            prerendered HTML — what search engines read — carries the whole
            catalogue, not just tab one. */}
        {SERVICE_GROUPS.map((g, i) => (
          <div
            key={g.id}
            id={`szolg-panel-${g.id}`}
            role="tabpanel"
            aria-labelledby={`szolg-tab-${g.id}`}
            hidden={active !== i}
            className="mt-8"
          >
            <p className="text-muted leading-relaxed max-w-3xl">{t(g.intro, locale)}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {g.items.map((s) => (
                <ServiceCard key={s.id} s={s} locale={locale} />
              ))}
            </div>
            {g.items.some((s) => s.isNew) && <p className="text-muted text-sm mt-6 leading-relaxed max-w-3xl">{t(COPY.newNote, locale)}</p>}
          </div>
        ))}

        <a
          href="#kapcsolat"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary-dark transition-colors duration-300"
        >
          {t(COPY.unsure, locale)}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
