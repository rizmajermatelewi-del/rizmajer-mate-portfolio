import { useState, lazy, Suspense } from 'react'
import { Check } from 'lucide-react'
import { PROJECTS_FULL, TRADES } from '../data/projects'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

import ProjectMock from '../components/ProjectMock'
import { useInView } from '../motion/useInView'

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
  headingLead: { hu: 'Bemutatók,', en: 'Demos' },
  headingAccent: { hu: 'amiket kipróbálhatsz.', en: 'you can try for yourself.' },
  intro: {
    hu: 'Mindegyik megnyitható, és a kódja nyilvános. Kitalált vállalkozások, valós problémákkal. Az első fizető ügyfelem oldala most készül az átadásra; amint él, itt lesz az első helyen.',
    en: 'Every one can be opened, and its code is public. Invented businesses, real problems. My first paying client’s site is being prepared for handover; once it is live, it goes first here.',
  },
  whatItDoes: { hu: 'Amit tud', en: 'What it does' },
  all: { hu: 'Mind', en: 'All' },
  filterLabel: { hu: 'Szűrés szakma szerint', en: 'Filter by trade' },
  problem: { hu: 'A gond', en: 'The problem' },
  swipe: (n) => ({ hu: `${n} bemutató · lapozz oldalra →`, en: `${n} demos · swipe sideways →` }),
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

// Last card alone on its row: 2 columns from sm, 3 from lg (the grid below).
// Takes the count, because the trade filter changes how many cards there are.
const lone2 = (i, n) => i === n - 1 && n % 2 === 1
const lone3 = (i, n) => i === n - 1 && n % 3 === 1
const wideClass = (i, n) => [lone2(i, n) && 'sm:col-span-2', lone3(i, n) ? 'lg:col-span-3' : lone2(i, n) && 'lg:col-span-1'].filter(Boolean).join(' ')
const wideInner = (i, n) => [lone2(i, n) && 'sm:grid sm:grid-cols-2 sm:items-center', !lone3(i, n) && lone2(i, n) && 'lg:block'].filter(Boolean).join(' ')

export default function Projects() {
  const locale = useLocale()
  const [sectionRef, visible] = useInView(0.1)
  const [openIndex, setOpenIndex] = useState(null)
  const [originRect, setOriginRect] = useState(null)
  const [trade, setTrade] = useState(null)
  const shown = trade ? PROJECTS_FULL.filter((p) => p.trade === trade) : PROJECTS_FULL
  const n = shown.length

  const openProject = (i, e) => {
    setOriginRect(e.currentTarget.getBoundingClientRect())
    setOpenIndex(i)
  }

  const closeProject = () => {
    setOpenIndex(null)
    setOriginRect(null)
  }

  return (
    <section id="projektek" ref={sectionRef} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
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
            {t(COPY.headingLead, locale)}
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
            {t(COPY.intro, locale)}
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

        <p className="sm:hidden -mt-2 mb-4 font-semibold text-[13px] text-muted">{t(COPY.swipe(n), locale)}</p>
        <div className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 lg:gap-6">
          {shown.map((p, i) => (
            <button
              key={t(p.title, locale)}
              type="button"
              onClick={(e) => openProject(i, e)}
              /* Fetches the modal chunk on intent rather than on click, so the
                 panel still opens instantly despite being a separate chunk.
                 Focus counts as intent too — keyboard users never hover. */
              onPointerEnter={preloadModal}
              onFocus={preloadModal}
              aria-label={`${t(p.title, locale)}, ${t(COPY.details, locale)}`}
              style={{ transitionDelay: visible ? `${Math.min(i, 5) * 120}ms` : '0ms' }}
              /* A card that would sit alone on the last row spans the row
                 instead, image beside text, so the grid never ends on an
                 orphan (fifteen cards since 2026-10-19). */
              className={`proj-card group w-[85%] shrink-0 snap-start sm:w-full text-left ${wideClass(i, n)} card-invert border border-divider rounded-4xl overflow-hidden card-motion shadow-e2 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-e4 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`h-full ${wideInner(i, n)}`}>
                <ProjectMock
                  tone={p.tone}
                  image={p.image}
                  alt={p.imageAlt ? t(p.imageAlt, locale) : ''}
                />
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-ink leading-snug tracking-tight">{t(p.title, locale)}</h3>
                  {/* 13px of muted grey is below where this stays comfortable
                      on a phone, and the phone is the primary viewport. 14px at
                      the same line height costs one wrapped line at most. */}
                  {/* Leads with the owner's problem, not with the interface idea that
                      solves it: the bakery owner recognises the ringing phone,
                      not the comb-shaped time picker. The pitch stays in the modal. */}
                  <p className="text-muted text-sm mt-2.5 leading-relaxed">{t(p.problem, locale)}</p>

                  {/* Renders only when filled, like every other case-study
                      field. An "Amit tud" heading standing over nothing would
                      be the same empty-proof problem this section already had
                      once. */}
                  {p.features.length > 0 && (
                    <div className="mt-5">
                      <ul className="mt-2 space-y-1.5">
                        {p.features.map((f, fi) => (
                          <li key={fi} className="flex gap-2 text-muted text-[13px] leading-relaxed">
                            <Check className="h-3.5 w-3.5 shrink-0 mt-[3px] text-primary" strokeWidth={2.5} />
                            <span>{t(f, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Hairline above the stack chips separates what the project
                      does from what it is built with, which are two different
                      questions asked by two different readers. */}
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-divider">
                    {p.tech.map((techName) => (
                      <span
                        key={techName}
                        className="font-mono text-[13px] text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
                      >
                        {techName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mounted only while open. ProjectModal already returns null without a
          project, so this changes nothing visually — it just keeps the lazy
          import from resolving during the prerender, where a suspended
          component would render its fallback instead. */}
      {openIndex !== null && (
        <Suspense fallback={null}>
          <ProjectModal project={shown[openIndex]} originRect={originRect} onClose={closeProject} />
        </Suspense>
      )}
    </section>
  )
}
