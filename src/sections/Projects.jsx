import { useState, lazy, Suspense } from 'react'
import { Star, Check } from 'lucide-react'
import { PROJECTS_FULL } from '../data/projects'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

import ProjectMock from '../components/ProjectMock'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'

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
  /* These three counted four projects and two live client jobs. PROJECTS_FULL
     holds two entries, both labelled "Saját projekt", both with `live: ''` and
     `github: '#'`.

     The two fabricated client entries were deleted on 2026-08-10 — Máté said
     plainly the paying clients were not real — and Pillars was corrected in the
     same commit from "4 megépített projekt / 2 fizető ügyfél" to "2 / 1 készül".
     This block was missed. So the section went on announcing four projects and
     two client jobs directly above two cards that both read "Saját projekt",
     while Pillars said the opposite two sections earlier. A visitor who counts
     the cards catches it in about three seconds, and what they catch is not a
     typo: it is the page overstating delivered work on the one section whose
     entire job is to prove it.

     projects.test.js could not see this. It asserts that no *entry* calls
     itself client work without a URL a stranger can open — it has no view of a
     sentence hardcoded in the JSX above the entries. The lesson is the one this
     codebase keeps relearning: a count restated in prose drifts from the data
     it counts. Wording it so it stays true at two, three or ten entries is what
     keeps it from drifting again.

     "Amint él, itt lesz a link hozzá" is deliberately the same promise Pillars
     makes about the same salon, in the same words. */
  headingLead: { hu: 'Amin dolgozom.', en: 'What I am working on.' },
  headingAccent: { hu: 'Egyelőre a sajátjaim.', en: 'My own, for now.' },
  intro: {
    hu: 'Mindegyiket végig én építettem. Ügyfélmunkát még nem adtam át — az első most készül, és amint él, itt lesz a link hozzá.',
    en: 'I built every one of them end to end. I have not handed over client work yet — the first is being built now, and the moment it is live the link will be here.',
  },
  featured: { hu: 'Kiemelt projekt', en: 'Featured project' },
  whatItDoes: { hu: 'Amit tud', en: 'What it does' },
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
  const [sectionRef, visible] = useInView(0.1)
  const [openIndex, setOpenIndex] = useState(null)
  const [originRect, setOriginRect] = useState(null)

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
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ {t(COPY.eyebrow, locale)}</span>
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
            <span className="block font-display font-semibold text-primary-dark mt-1">{t(COPY.headingAccent, locale)}</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-xl">
            {t(COPY.intro, locale)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS_FULL.map((p, i) => (
            <button
              key={t(p.title, locale)}
              type="button"
              onClick={(e) => openProject(i, e)}
              /* Fetches the modal chunk on intent rather than on click, so the
                 panel still opens instantly despite being a separate chunk.
                 Focus counts as intent too — keyboard users never hover. */
              onPointerEnter={preloadModal}
              onFocus={preloadModal}
              aria-label={`${t(p.title, locale)} — ${t(COPY.details, locale)}`}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`proj-card group w-full text-left card-invert border border-divider rounded-4xl overflow-hidden card-motion shadow-e2 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-e4 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <TiltCard className="h-full">
                <ProjectMock tone={p.tone} image={p.image} alt={p.imageAlt} />
                <div className="p-6">
                  {/* The "01 / 02 / 03 / 04" counter that sat opposite the
                      label is gone. Four cards in a row are already countable
                      and the number carried no other meaning. */}
                  <div className="mb-3.5 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                      {t(p.label, locale)}
                    </span>
                    {/* Only when a project has actually earned it — see the
                        note in projects.js on why all four are false today. */}
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2.5 py-1 rounded-full">
                        <Star className="h-2.5 w-2.5" strokeWidth={2.5} />
                        {t(COPY.featured, locale)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink leading-snug tracking-tight">{t(p.title, locale)}</h3>
                  {/* 13px of muted grey is below where this stays comfortable
                      on a phone, and the phone is the primary viewport. 14px at
                      the same line height costs one wrapped line at most. */}
                  <p className="text-muted text-sm mt-2.5 leading-relaxed">{t(p.text, locale)}</p>

                  {/* Renders only when filled, like every other case-study
                      field. An "Amit tud" heading standing over nothing would
                      be the same empty-proof problem this section already had
                      once. */}
                  {p.features.length > 0 && (
                    <div className="mt-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark">{t(COPY.whatItDoes, locale)}</p>
                      <ul className="mt-2 space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-2 text-muted text-[13px] leading-relaxed">
                            <Check className="h-3.5 w-3.5 shrink-0 mt-[3px] text-primary" strokeWidth={2.5} />
                            <span>{f}</span>
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
                        className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
                      >
                        {techName}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
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
          <ProjectModal project={PROJECTS_FULL[openIndex]} originRect={originRect} onClose={closeProject} />
        </Suspense>
      )}
    </section>
  )
}
