import { useMemo } from 'react'
import portraitSunset from '../assets/portrait-sunset.jpg'
import { SOCIAL_LINKS } from '../data/nav'
import { t } from '../i18n/t'
import { useLocale } from '../i18n/useLocale'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   About
---------------------------------------------------------------- */
/* Split out of the JSX so the word-stagger below can map over it without the
   paragraphs being retyped. Word index runs across both, so the fade reads as
   one continuous sentence rather than two separate reveals. */
/* Tightened from two long paragraphs to two shorter ones. The word-stagger
   below animates one span per word, so length here is not free: every word
   added pushes the last one further behind the reveal, and the old version ran
   long enough that its closing promise arrived after the reader had moved on. */
const BIO_PARAGRAPHS = [
  {
    hu: 'Rizmajer Máté Levente vagyok, full-stack fejlesztő. Szoftverfejlesztő végzettséget szereztem, de a gyakorlatot éles projekteken gyűjtöttem: a kód akkor állt össze a fejemben, amikor egy valódi problémát kellett megoldanom vele, nem amikor egy feladatlapon szerepelt.',
    en: 'I am Rizmajer Máté Levente, a full-stack developer. I trained as a software developer, but I learned the craft on real projects: the code only came together in my head when I had to solve an actual problem with it, not when it sat on a worksheet.',
  },
  {
    hu: 'Kis- és középvállalkozásokkal dolgozom, és a megkeresések nagy része ugyanarról szól: a foglalás, a rendelés vagy az ügyfelek nyilvántartása telefonon és táblázatban megy, ez pedig minden nap elvisz egy órát. Ilyenkor nem szebb weboldal kell, hanem folyamat, ami magától működik — gyors, mobilon is használható, és utána te is tudod kezelni.',
    en: 'I work with small and medium businesses, and most enquiries are about the same thing: bookings, orders or customer records run on the phone and in a spreadsheet, and that costs an hour every day. What is needed then is not a prettier website but a process that runs on its own — quick, usable on a phone, and something you can handle yourself afterwards.',
  },
]

const COPY = {
  headingLead: { hu: 'Néhány szó', en: 'A few words' },
  headingAccent: { hu: 'rólam', en: 'about me' },
  photoAlt: {
    hu: 'Rizmajer Máté Levente naplementében, egy sziklán ülve',
    en: 'Rizmajer Máté Levente at sunset, sitting on a rock',
  },
  factBase: { hu: 'Székhely', en: 'Based in' },
  factBaseValue: { hu: 'Magyarország', en: 'Hungary' },
  factFocus: { hu: 'Fókusz', en: 'Focus' },
  factFocusValue: { hu: 'Full-stack fejlesztés', en: 'Full-stack development' },
  factAvailability: { hu: 'Elérhetőség', en: 'Availability' },
  factAvailabilityValue: { hu: 'Nyitott új projektekre', en: 'Open to new projects' },
}

/* The running word index used to be produced by an IIFE with a mutable counter
   inside the JSX, which recomputed the same split on every render and put the
   counter somewhere a reader has to unpick it.
   ---------------------------------------------------------------------
   It depended only on BIO_PARAGRAPHS, so it was derived once at module level.
   It depends on the locale now — the two languages do not split into the same
   number of words — so it moves into a useMemo keyed on the locale. That
   keeps the original point: derived once per language, not once per render. */
export default function About() {
  const [ref, visible] = useInView(0.2)
  const locale = useLocale()

  const bioWords = useMemo(() => {
    let index = 0
    return BIO_PARAGRAPHS.map((para) =>
      t(para, locale)
        .split(' ')
        .map((word) => ({ word, index: index++ })),
    )
  }, [locale])

  const facts = [
    { label: t(COPY.factBase, locale), value: t(COPY.factBaseValue, locale) },
    { label: t(COPY.factFocus, locale), value: t(COPY.factFocusValue, locale) },
    { label: t(COPY.factAvailability, locale), value: t(COPY.factAvailabilityValue, locale) },
  ]

  return (
    <section id="rolam" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group relative aspect-[3/4] rounded-6xl overflow-hidden border border-divider">
              <img
                src={portraitSunset}
                alt={t(COPY.photoAlt, locale)}
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] sepia-[0.15] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent" />
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* No eyebrow. It read "╱ Rólam" directly above a headline ending
                in the word "rólam", announcing the section twice. */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              {t(COPY.headingLead, locale)}{' '}
              <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>.
            </h2>

            <div className="mt-6 space-y-4 text-muted text-base sm:text-lg leading-relaxed max-w-xl">
              {bioWords.map((words, pi) => (
                <p key={pi}>
                  {words.map(({ word, index }) => (
                    <span
                      key={index}
                      className="inline-block transition-all duration-500 ease-out motion-reduce:transition-none"
                      style={{
                        transitionDelay: visible ? `${index * 18}ms` : '0ms',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(6px)',
                      }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {facts.map((f, i) => (
                <div key={i} className="rounded-2xl border border-divider bg-surface p-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-primary-dark">{f.label}</p>
                  <p className="font-display font-semibold text-ink text-sm mt-1">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={t(label)}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift-on-hover inline-flex items-center gap-2 bg-surface border border-divider text-ink px-5 py-3 rounded-full font-medium text-sm hover:border-primary/60 hover:text-primary-dark transition-colors duration-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {t(label)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
