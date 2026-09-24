import { PROTOCOL_STEPS } from '../data/protocol'
import { useInView } from '../motion/useInView'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

const COPY = {
  headingLead: { hu: 'Így', en: 'How I' },
  headingAccent: { hu: 'dolgozom', en: 'work' },
  intro: {
    hu: 'Négy lépés, és mindegyik végén tudod, mit kapsz. Nincs olyan pont, ahol meglepetés érne.',
    en: 'Four steps, and you know what you get at the end of each one. There is no point where a surprise is waiting.',
  },
}

/* One screen instead of four.

   Until 2026-09-24 this was four sticky cards that stacked on scroll, each
   with a drawing beside it — about four screens of scrolling to read four
   short paragraphs, and on a phone the drawings pushed the text a screen
   further down. The order is the information here, so it is an <ol>, and
   the numbers are the one numbered sequence on the page: this section
   actually is a sequence.

   The line is the only motion: it draws once as the section arrives, across
   on wide screens and down on narrow ones, and the steps follow it in. The
   text is readable without it — reduced motion gets the finished state. */
export default function Protocol() {
  const [ref, visible] = useInView(0.2)
  const locale = useLocale()

  return (
    <section id="folyamat" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            {t(COPY.headingLead, locale)} <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>.
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">{t(COPY.intro, locale)}</p>
        </div>

        <ol className="relative mt-14 sm:mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* The connecting line. Behind the numbers, from the centre of the
              first to the centre of the last. */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bg-primary/60 origin-top lg:origin-left transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none left-5 top-5 bottom-5 w-px lg:right-[calc(25%-1.25rem)] lg:bottom-auto lg:h-px lg:w-auto ${
              visible ? 'scale-100' : 'scale-y-0 lg:scale-y-100 lg:scale-x-0'
            }`}
          />
          {PROTOCOL_STEPS.map((step, i) => (
            <li
              key={i}
              style={{ transitionDelay: visible ? `${200 + i * 180}ms` : '0ms' }}
              className={`relative grid grid-cols-[2.5rem_1fr] gap-x-5 lg:flex lg:flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface font-display font-bold ring-8 ring-background">
                {i + 1}
              </span>
              <div className="lg:mt-6 lg:flex lg:flex-1 lg:flex-col">
                <h3 className="font-display font-bold text-2xl text-ink tracking-tight">{t(step.title, locale)}</h3>
                <p className="font-display font-semibold text-primary-dark mt-1.5">{t(step.tagline, locale)}</p>
                <p className="text-muted text-[0.95rem] leading-relaxed mt-4 [text-wrap:pretty]">{t(step.text, locale)}</p>
                {/* Pushed to the bottom on wide screens so the four promises
                    sit on one line whatever the paragraph above runs to. */}
                <div className="mt-5 lg:mt-auto lg:pt-5">
                  <p className="inline-block rounded-full bg-surface border border-divider px-3.5 py-1.5 text-sm font-semibold text-ink">
                    {t(step.promise, locale)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
