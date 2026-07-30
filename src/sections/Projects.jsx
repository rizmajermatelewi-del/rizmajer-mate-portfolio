import { useState } from 'react'
import { Star, Check } from 'lucide-react'
import { PROJECTS_FULL } from '../data/projects'
import ProjectMock from '../components/ProjectMock'
import ProjectModal from '../components/ProjectModal'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'

export default function Projects() {
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
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Projektek</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            {/* "Valós munka, nem mockup" used a word the buyer does not have.
                "Mockup" is a designer's term; a rétesház owner reads past it.
                The split of client work versus own work is the actual point
                and needs no jargon to say. */}
            Amin dolgozom.
            <span className="block font-display font-semibold text-primary-dark mt-1">Kettő ügyfélnek, kettő magamnak.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-xl">
            Négy projekt, amit ténylegesen megépítettem: kettő élő ügyfélmunka, kettő saját
            kezdeményezés, amivel a saját gondolkodásomat és árazási stratégiámat teszteltem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS_FULL.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => openProject(i, e)}
              aria-label={`${p.title} — részletek`}
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
                      {p.label}
                    </span>
                    {/* Only when a project has actually earned it — see the
                        note in projects.js on why all four are false today. */}
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2.5 py-1 rounded-full">
                        <Star className="h-2.5 w-2.5" strokeWidth={2.5} />
                        Kiemelt projekt
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink leading-snug tracking-tight">{p.title}</h3>
                  {/* 13px of muted grey is below where this stays comfortable
                      on a phone, and the phone is the primary viewport. 14px at
                      the same line height costs one wrapped line at most. */}
                  <p className="text-muted text-sm mt-2.5 leading-relaxed">{p.text}</p>

                  {/* Renders only when filled, like every other case-study
                      field. An "Amit tud" heading standing over nothing would
                      be the same empty-proof problem this section already had
                      once. */}
                  {p.features.length > 0 && (
                    <div className="mt-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark">Amit tud</p>
                      <ul className="mt-2 space-y-1.5">
                        {p.features.map((f, fi) => (
                          <li key={fi} className="flex gap-2 text-muted text-[13px] leading-relaxed">
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
                    {p.tech.map((t, ti) => (
                      <span
                        key={ti}
                        className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal
        project={openIndex === null ? null : PROJECTS_FULL[openIndex]}
        originRect={originRect}
        onClose={closeProject}
      />
    </section>
  )
}
