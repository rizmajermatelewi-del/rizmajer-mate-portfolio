import { useState } from 'react'
import { AI_SERVICES } from '../data/ai'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

import { useInView } from '../motion/useInView'

const COPY = {
  /* The section had no eyebrow while Projektek, Árak and Pillars all have one,
     so it read as a peer of the sections backed by delivered work rather than
     as the one category that is not. Naming it here is the smallest change
     that fixes that: the heading and the offer stay, the label sets the frame
     before either is read.

     "Pilot" rather than "Új technológiák" because it says what the buyer is
     being invited into — an early project priced as one — instead of
     flattering the technology. The caveat below still states plainly that no
     paying client has bought one; the eyebrow makes that visible to somebody
     scanning who never reaches the sentence. */
  eyebrow: { hu: 'Pilot megoldások', en: 'Pilot services' },
  headingLead: { hu: 'Amit a gép', en: 'What the machine' },
  headingAccent: { hu: 'elvégez', en: 'handles' },
  headingTail: { hu: 'helyetted.', en: 'for you.' },
  intro: {
    hu: 'A legtöbb kérdés, ami befut hozzád, ugyanaz a néhány kérdés. Ezekre nem neked kell válaszolnod éjjel fél tizenegykor.',
    en: 'Most of the questions that reach you are the same few questions. You should not be the one answering those at half past ten at night.',
  },
  caveat: {
    hu: 'Ez a legújabb része a kínálatomnak: fizető ügyfélnek még nem szállítottam ilyet. Az árak ezért indulóárak, és az első projekteknél ezt be is árazom. Ha valamiről menet közben kiderül, hogy nem éri meg neked, megmondom.',
    en: 'This is the newest part of what I offer, and I have not delivered one for a paying client yet. The prices are starting prices for that reason, and I price the first few projects accordingly. If something turns out not to be worth it for you along the way, I will say so.',
  },
}

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
  const locale = useLocale()
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
                {/* Same mark and metrics as the eyebrow on Projektek and Árak,
                    so it reads as the page's own section label rather than as
                    a badge invented for this one. */}
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
                  ╱ {t(COPY.eyebrow, locale)}
                </span>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight mt-4">
                  {t(COPY.headingLead, locale)}{' '}
                  <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>{' '}
                  {t(COPY.headingTail, locale)}
                </h2>
                <p className="text-muted text-base sm:text-lg mt-6 leading-relaxed max-w-md">
                  {t(COPY.intro, locale)}
                </p>

                {/* Stated plainly and early: a visitor who works this out
                    later discounts everything above it too. */}
                <p className="text-muted text-sm mt-8 leading-relaxed max-w-md border-t border-divider pt-6">
                  {t(COPY.caveat, locale)}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-divider border-t border-divider">
                {AI_SERVICES.map((svc, i) => {
                  const isOpen = open === i
                  return (
                    <div
                      key={t(svc.title, locale)}
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
                            {t(svc.title, locale)}
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

                        <p className="text-muted text-[15px] mt-3 leading-relaxed max-w-lg">{t(svc.text, locale)}</p>

                        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-display font-semibold text-lg text-primary-dark">
                            {t(svc.priceNote, locale)}
                          </span>
                          <span className="text-muted text-[13px]">{t(svc.scope, locale)}</span>
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
                              {t(svc.detail, locale)}
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
