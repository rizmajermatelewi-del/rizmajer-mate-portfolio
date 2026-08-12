import { useState } from 'react'
import { useInView } from '../motion/useInView'
import { FAQ_QUESTIONS } from '../data/faq'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

/* ----------------------------------------------------------------
   FAQ — the objections an SME actually raises before hiring.
   Sits after the contact form: the visitor who is ready just writes,
   the one still hesitating finds the "mennyibe kerül" answer right below.
---------------------------------------------------------------- */
export default function Faq() {
  const [ref, visible] = useInView(0.1)
  const [open, setOpen] = useState(0)
  const locale = useLocale()

  // Standard section rhythm again. The padding was asymmetric while this sat
  // directly under the contact form and read as a continuation of it; now it
  // stands between the AI section and the prices, so it needs a full break on
  // both sides like every other band.
  return (
    <section id="gyik" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <div
          className={`mb-14 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* No eyebrow: "╱ Gyakori kérdések" sitting above "Amit meg szoktak
              kérdezni" is the same sentence twice in two registers. */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            Amit meg szoktak <span className="text-primary-dark font-semibold">kérdezni</span>.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_QUESTIONS.map((item, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }}
              className={`card-invert border border-divider rounded-4xl overflow-hidden card-motion shadow-e2 hover:border-primary/60 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="group flex w-full items-center justify-between gap-5 px-6 sm:px-8 py-5 text-left"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-ink">{t(item.q, locale)}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 font-mono text-lg leading-none text-muted transition-transform duration-300 ease-out group-hover:text-primary-dark ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {/* grid-rows trick: animates to the content's real height
                  without hard-coding a max-height that clips longer answers. */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-muted text-sm sm:text-base leading-relaxed px-6 sm:px-8 pb-6">{t(item.a, locale)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
