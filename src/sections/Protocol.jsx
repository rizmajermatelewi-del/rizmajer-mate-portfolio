import { Check } from 'lucide-react'
import { PROTOCOL_STEPS } from '../data/protocol'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

const COPY = {
  headingLead: { hu: 'Így', en: 'How I' },
  headingAccent: { hu: 'dolgozom', en: 'work' },
  intro: {
    hu: 'Négy lépés, és mindegyik végén tudod, mit kapsz. Nincs olyan pont, ahol meglepetés érne.',
    en: 'Four steps, and you know what you get at the end of each one. There is no point where a surprise is waiting.',
  },
  step: { hu: 'lépés', en: 'Step' },
}

/* One screen instead of four, in the same card as Projects and Services.

   Until 2026-09-24 this was four sticky cards that stacked on scroll, each
   with a drawing beside it — about four screens of scrolling to read four
   short paragraphs. Then briefly a numbered line; Máté asked for it to
   share the card design of the sections around it, so it does: four cards
   side by side on wide screens, two by two on tablets, stacked on phones.

   It stays an <ol>, because the order is the information, and each card
   ends the way a project card does — a ruled footer — carrying what that
   step hands you. The cards come in one after another, in reading order;
   reduced motion gets them all at once. */
export default function Protocol() {
  const [ref, visible] = useInView(0.15)
  const locale = useLocale()

  return (
    <section id="folyamat" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            {t(COPY.headingLead, locale)} <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>.
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">{t(COPY.intro, locale)}</p>
        </div>

        <ol className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PROTOCOL_STEPS.map((step, i) => (
            <li
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`group card-invert border border-divider rounded-4xl overflow-hidden card-motion shadow-e2 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-e4 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <TiltCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                      {locale === 'hu' ? `${i + 1}. ${t(COPY.step, locale)}` : `${t(COPY.step, locale)} ${i + 1}`}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-ink leading-snug tracking-tight mt-5">{t(step.title, locale)}</h3>
                  <p className="font-display font-semibold text-primary-dark mt-1.5">{t(step.tagline, locale)}</p>
                  <p className="text-muted text-sm mt-3 leading-relaxed">{t(step.text, locale)}</p>

                  <div className="mt-auto pt-5">
                    <p className="flex items-start gap-2 pt-4 border-t border-divider text-sm font-semibold text-ink">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
                      {t(step.promise, locale)}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
