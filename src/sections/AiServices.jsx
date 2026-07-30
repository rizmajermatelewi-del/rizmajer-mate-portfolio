import { useState } from 'react'
import { AI_SERVICES } from '../data/ai'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   AI services.

   A screen panel rather than another card grid. The page already spends
   Features, ServicesGrid and Pricing on grids; a fourth would make the
   whole middle of the site one repeating shape. This is a sticky-heading
   split with disclosure rows, a layout family used nowhere else here.

   The honesty line is load-bearing, not a disclaimer. Every other section
   is backed by delivered work and this one is not yet; saying so is the
   brand's positioning against agencies that oversell, and it is what makes
   the prices below credible.
---------------------------------------------------------------- */
export default function AiServices() {
  const [ref, visible] = useInView(0.12)
  const [open, setOpen] = useState(0)

  return (
    <section id="ai" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* The panel is the section. Depth comes from the material, per the
            Two Materials Rule: a screen laid on the draughting page, with a
            top inner highlight so the edge catches light rather than sitting
            flat against the background. */}
        <div
          className={`card-invert relative overflow-hidden rounded-6xl shadow-e3 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-dark/60 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 p-8 sm:p-12 lg:p-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight">
                  Amit a gép <span className="text-primary-dark font-semibold">elvégez</span> helyetted.
                </h2>
                <p className="text-muted text-base sm:text-lg mt-6 leading-relaxed max-w-md">
                  A legtöbb kérdés, ami befut hozzád, ugyanaz a néhány kérdés. Ezekre nem
                  neked kell válaszolnod éjjel fél tizenegykor.
                </p>

                {/* Stated plainly and early: a visitor who works this out
                    later discounts everything above it too. */}
                <p className="text-muted text-sm mt-8 leading-relaxed max-w-md border-t border-divider pt-6">
                  Ez a legújabb része a kínálatomnak: fizető ügyfélnek még nem szállítottam
                  ilyet. Az árak ezért indulóárak, és az első projekteknél ezt be is árazom.
                  Ha valamiről menet közben kiderül, hogy nem éri meg neked, megmondom.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-divider border-t border-divider">
                {AI_SERVICES.map((svc, i) => {
                  const isOpen = open === i
                  return (
                    <div
                      key={svc.title}
                      style={{ transitionDelay: visible ? `${180 + i * 110}ms` : '0ms' }}
                      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="group w-full text-left py-7"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <h3 className="font-display font-semibold text-xl sm:text-2xl text-ink leading-tight">
                            {svc.title}
                          </h3>
                          <span
                            aria-hidden="true"
                            className={`mt-1 shrink-0 font-mono text-lg leading-none text-muted transition-transform duration-300 ease-out group-hover:text-primary-dark ${
                              isOpen ? 'rotate-45' : ''
                            }`}
                          >
                            +
                          </span>
                        </div>

                        <p className="text-muted text-[15px] mt-3 leading-relaxed max-w-lg">{svc.text}</p>

                        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-display font-semibold text-lg text-primary-dark">
                            {svc.priceNote}
                          </span>
                          <span className="text-muted text-[13px]">{svc.scope}</span>
                        </div>

                        {/* grid-rows so the panel animates to the content's
                            real height instead of a hard-coded max that would
                            clip the longer copy. */}
                        <span
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block text-muted text-sm leading-relaxed max-w-lg pt-5">
                              {svc.detail}
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
