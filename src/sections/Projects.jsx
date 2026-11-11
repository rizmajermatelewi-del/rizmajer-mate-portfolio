import { useState, lazy, Suspense } from 'react'
import { Check, ArrowUpRight } from 'lucide-react'
import { PROJECTS_FULL, TRADES } from '../data/projects'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

import ProjectMock from '../components/ProjectMock'
import Hl from '../components/Hl'

/* This section's own strings, as opposed to the project data.
   ---------------------------------------------------------------------
   A `locale === 'en' ? … : …` ternary inline in the JSX would have been
   shorter, and it is precisely what t() exists to stop: a conditional buried
   in markup is invisible to untranslatedIn(), so the next string added that
   way goes missing silently. Section copy gets the same { hu, en } shape as
   the data modules, declared at the top where it can be found and counted. */
const COPY = {
  details: { hu: 'részletek', en: 'details' },
  eyebrow: { hu: 'Projektek', en: 'Work' },
  /* PROJECTS_FULL holds Bemutató projekt demos, each with a live URL and a
     folder in the public DEMOS repo. Do not restate a count here that can
     drift from PROJECTS_FULL — projects.test.js pins the array length. */
  headingLead: { hu: 'Próbáld ki,', en: 'Try it' },
  headingAccent: { hu: 'mielőtt bármit fizetnél.', en: 'before you pay for anything.' },
  intro: {
    hu: '==Mindegyik megnyitható==, és a kódja nyilvános. Kitalált vállalkozások, valós problémákkal. Az első fizető ügyfelem oldala most készül az átadásra; amint él, itt lesz az első helyen.',
    en: '==Every one can be opened==, and its code is public. Invented businesses, real problems. My first paying client’s site is being prepared for handover; once it is live, it goes first here.',
  },
  whatItDoes: { hu: 'Amit tud', en: 'What it does' },
  all: { hu: 'Mind', en: 'All' },
  filterLabel: { hu: 'Szűrés szakma szerint', en: 'Filter by trade' },
  problem: { hu: 'A gond', en: 'The problem' },
  showAll: (n) => ({ hu: `További ${n} bemutató`, en: `${n} more demos` }),
  tryIt: { hu: 'Kipróbálom', en: 'Try it' },
  code: { hu: 'Kód', en: 'Code' },
  more: { hu: 'Részletek', en: 'Details' },
  restHeading: { hu: 'A többi bemutató', en: 'The other demos' },
}

/* The modal is the one part of this page that can be deferred without cost to
   the prerender: it returns null until a card is clicked and portals itself out
   of this tree, so it contributes nothing to dist/index.html either way.

   Below-fold *sections* deliberately are not lazy. renderToString cannot wait on
   a lazy component, so it would emit Suspense fallbacks instead of markup and
   the prerendered HTML — the entire reason scripts/prerender.mjs exists — would
   lose most of its content. Worse, prerender.mjs only fails on sections left at
   opacity-0, so missing content would ship silently. */
const ProjectModal = lazy(() => import('../components/ProjectModal'))
const preloadModal = () => import('../components/ProjectModal')


export default function Projects() {
  const locale = useLocale()
  const [open, setOpen] = useState(null)
  const [originRect, setOriginRect] = useState(null)
  const [trade, setTrade] = useState(null)
  const [all, setAll] = useState(false)
  /* Three featured demos as wide case-study rows, one per trade group, and
     the rest as a compact list behind a button (2026-11-11, Máté). A trade
     filter applies to both and always shows that trade's whole list. */
  const inTrade = (p) => !trade || p.trade === trade
  const featured = PROJECTS_FULL.filter((p) => p.featured && inTrade(p))
  const rest = PROJECTS_FULL.filter((p) => !p.featured && inTrade(p))
  const showRest = Boolean(trade) || all
  const tradeLabel = (id) => t(TRADES.find((x) => x.id === id).label, locale)

  const openProject = (p, e) => {
    setOriginRect(e.currentTarget.getBoundingClientRect())
    setOpen(p)
  }

  const closeProject = () => {
    setOpen(null)
    setOriginRect(null)
  }

  return (
    <section id="projektek" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading left, intro right on wide screens, so the header spans the
            same width as the grid under it instead of leaving the right third
            of the section empty. Phones stack as before. */}
        <div className="mb-14 sm:mb-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            {/* "Valós munka, nem mockup" used a word the buyer does not have.
                "Mockup" is a designer's term; a rétesház owner reads past it.
                The split of client work versus own work is the actual point
                and needs no jargon to say. */}
            <span className="text-primary-dark">{t(COPY.headingLead, locale)}</span>
            {/* Same missing space as the hero h1 had, from the same cause:
                a `block` span reads as its own line, so whoever wrote the
                markup never saw the two sentences run together — but the
                heading is one accessible name, and it announced as
                "Amin dolgozom.Egyelőre a sajátjaim." Collapsed on screen,
                audible in a screen reader. Every other heading on the site
                already carries this space, because its accent span is inline
                and the gap was visible there. */}{' '}
            <span className="block font-display font-semibold mt-1">{t(COPY.headingAccent, locale)}</span>
          </h2>
          </div>
          <p className="text-muted text-lg mt-6 lg:mt-0 leading-relaxed max-w-xl">
            <Hl text={t(COPY.intro, locale)} />
          </p>
        </div>

        {/* On a phone the cards are a sideways strip, not a stack (2026-11-09:
            fifteen stacked cards were 10 000 px, twelve screens of scrolling
            between the visitor and everything below). From sm up it is the
            grid again, at full container width. */}
        {/* Native buttons with aria-pressed: a filter, not tabs, so no roving
            tabindex and no tabpanel to wire up. */}
        <div role="group" aria-label={t(COPY.filterLabel, locale)} className="-mt-6 mb-8 flex flex-wrap gap-2">
          {[{ id: null, label: COPY.all }, ...TRADES].map((tr) => (
            <button
              key={tr.id ?? 'all'}
              type="button"
              aria-pressed={trade === tr.id}
              onClick={() => setTrade(tr.id)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                trade === tr.id ? 'border-ink bg-ink text-paper' : 'border-ink/30 text-ink hover:border-ink/60'
              }`}
            >
              {t(tr.label, locale)}
            </button>
          ))}
        </div>

        {/* Case-study rows: the screenshot does the convincing, the owner's
            problem leads the text, and the live demo is one tap away. */}
        <div className="space-y-6 sm:space-y-8">
          {featured.map((p, i) => (
            <article
              key={t(p.title, locale)}
              className="card-invert overflow-hidden rounded-4xl border border-divider shadow-e2 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
            >
              <div className={i % 2 ? 'lg:order-2' : ''}>
                <ProjectMock tone={p.tone} image={p.image} alt={p.imageAlt ? t(p.imageAlt, locale) : ''} />
              </div>
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <p className="font-semibold text-[13px] text-primary-dark">{tradeLabel(p.trade)}</p>
                <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-ink leading-tight tracking-tight [text-wrap:balance]">{t(p.title, locale)}</h3>
                <p className="mt-4 text-muted leading-relaxed max-w-prose">{t(p.problem, locale)}</p>
                {p.features.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {p.features.map((ft, fi) => (
                      <li key={fi} className="flex gap-2 text-sm text-ink leading-relaxed">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
                        <span>{t(ft, locale)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-white transition-colors hover:bg-primary-dark">
                      {t(COPY.tryIt, locale)}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={(e) => openProject(p, e)}
                    onPointerEnter={preloadModal}
                    onFocus={preloadModal}
                    className="inline-flex min-h-11 items-center rounded-full border border-divider px-5 font-medium text-ink transition-colors hover:border-primary-light"
                  >
                    {t(COPY.more, locale)}
                  </button>
                  {p.github && p.github !== '#' && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-medium text-muted underline underline-offset-4 hover:text-ink">
                      {t(COPY.code, locale)}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {showRest && rest.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.restHeading, locale)}</h3>
            {/* A list to scan, not twelve more cards: name, trade, the problem
                in one line, and the live link. */}
            <ul className="mt-5 border-t border-ink/15">
              {rest.map((p) => (
                <li key={t(p.title, locale)} className="grid gap-x-6 gap-y-1 border-b border-ink/15 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="font-semibold text-[13px] text-primary-dark">{tradeLabel(p.trade)}</p>
                    <button
                      type="button"
                      onClick={(e) => openProject(p, e)}
                      onPointerEnter={preloadModal}
                      onFocus={preloadModal}
                      className="mt-0.5 text-left font-display font-semibold text-lg text-ink hover:text-primary-dark"
                    >
                      {t(p.title, locale)}
                    </button>
                    <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2 max-w-3xl">{t(p.problem, locale)}</p>
                  </div>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 justify-self-start font-semibold text-primary-dark hover:text-ink sm:justify-self-end">
                      {t(COPY.tryIt, locale)}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!trade && !all && (
          <button
            type="button"
            onClick={() => setAll(true)}
            className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/30 px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink/60"
          >
            {t(COPY.showAll(rest.length), locale)}
            <span aria-hidden="true">↓</span>
          </button>
        )}
      </div>

      {/* Mounted only while open. ProjectModal already returns null without a
          project, so this changes nothing visually — it just keeps the lazy
          import from resolving during the prerender, where a suspended
          component would render its fallback instead. */}
      {open && (
        <Suspense fallback={null}>
          <ProjectModal project={open} originRect={originRect} onClose={closeProject} />
        </Suspense>
      )}
    </section>
  )
}
