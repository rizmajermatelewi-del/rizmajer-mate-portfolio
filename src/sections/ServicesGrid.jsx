import { useState } from 'react'
import { ORDERED_SKILLS } from '../data/skills'
import { useInView } from '../motion/useInView'

/* Grouped by category, but still one seamless mosaic rather than four separate
   labelled blocks. Splitting six tiles into four sections would have left two
   of them a single orphan tile, roughly doubled the section's height, and broken
   the gap-px hairline grid that ties this section to Pillars. Sorting so a
   category's tiles sit adjacent, and naming the category on each tile, groups
   them without paying any of that.

   The order itself lives in skills.js so the footer's short list cannot drift
   out of step with this grid. */

/* ----------------------------------------------------------------
   ServicesGrid
---------------------------------------------------------------- */
export default function ServicesGrid() {
  const [ref, visible] = useInView(0.1)
  const [expanded, setExpanded] = useState(null)

  return (
    /* This section renders SKILLS_FULL, and both the navbar and the footer
       link to "Készségek". The id used to sit on Features instead, so every
       one of those links scrolled the visitor to the wrong section. */
    <section id="keszsegek" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div aria-hidden="true" className="section-glow" />

      <div className="relative max-w-7xl mx-auto">
        {/* Stacked header. The explainer used to float in the opposite corner,
            right-aligned against nothing, mirroring the same split shape that
            Pillars used two sections earlier. */}
        <div className="max-w-2xl mb-14">
          {/* "A teljes eszköztár, egy kézben" is agency phrasing: it flatters
              the supplier, not the buyer. The thing worth saying is what the
              arrangement means for the client, which is that there is nobody
              to be passed along to. */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            Egy ember csinálja, <span className="text-primary-dark font-bold">elejétől a végéig</span>.
          </h2>
          <p className="text-muted text-base leading-relaxed mt-6">
            Nincs alvállalkozó és nincs projektmenedzser kettőnk közé ékelve. Akitől
            kérdezel, az ugyanaz, aki megépíti, és ugyanaz, aki fél év múlva felveszi
            a telefont.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-divider rounded-4xl overflow-hidden shadow-e2">
          {ORDERED_SKILLS.map((svc, i) => {
            const Icon = svc.icon
            return (
              <button
                key={i}
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
                className={`svc-tile group w-full text-left card-invert p-7 sm:p-9 relative card-motion ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* One wash only. This previously ran a white/[0.04] hover on
                    the button AND this overlay at the same time, which muddied
                    into an indeterminate grey. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 bg-primary/10 transition-opacity duration-200 ease-out group-hover:opacity-100"
                />
                {/* Left edge marks the active tile — a definite signal rather
                    than a wash you have to squint at. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-primary transition-transform duration-200 ease-out group-hover:scale-y-100"
                />

                <div className="relative flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center transition-all duration-200 ease-out group-hover:bg-primary group-hover:border-primary group-hover:scale-105">
                    <Icon className="h-5 w-5 text-primary transition-colors duration-200 group-hover:text-white" strokeWidth={2} />
                  </div>
                  {/* These tiles expand on click, so say so. */}
                  <span
                    aria-hidden="true"
                    className={`font-mono text-lg leading-none text-white/40 transition-transform duration-300 ease-out group-hover:text-primary-dark ${
                      expanded === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                <p className="relative font-mono text-[9px] uppercase tracking-[0.22em] text-primary-dark mb-2">
                  {svc.category}
                </p>
                <h3 className="relative font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="relative text-white/55 text-sm leading-relaxed">{svc.text}</p>

                <div
                  className={`relative grid transition-[grid-template-rows] duration-300 ease-out ${
                    expanded === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/45 text-sm leading-relaxed pt-3">{svc.detail}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
