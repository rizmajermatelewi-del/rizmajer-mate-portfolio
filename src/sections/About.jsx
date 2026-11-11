import portraitSunset from '../assets/portrait-sunset.webp'
import { SOCIAL_LINKS } from '../data/nav'
import { t } from '../i18n/t'
import { useLocale } from '../i18n/useLocale'
import { useInView } from '../motion/useInView'
import Hl from '../components/Hl'

/* ----------------------------------------------------------------
   About
---------------------------------------------------------------- */
/* Two short paragraphs, rendered plain since 2026-11-10 (the word-by-word
   reveal it was sized for is gone). */
const BIO_PARAGRAPHS = [
  {
    hu: 'Rizmajer Máté Levente vagyok, weboldalakat és belső rendszereket építek. Szoftverfejlesztő végzettséget szereztem, de a gyakorlatot éles projekteken gyűjtöttem: a kód akkor állt össze a fejemben, amikor egy valódi problémát kellett megoldanom vele, nem amikor egy feladatlapon szerepelt.',
    en: 'I am Rizmajer Máté Levente, and I build websites and internal systems. I trained as a software developer, but I learned the craft on real projects: the code only came together in my head when I had to solve an actual problem with it, not when it sat on a worksheet.',
  },
  {
    hu: 'Kis- és középvállalkozásokkal dolgozom, és a megkeresések nagy része ugyanarról szól: a foglalás, a rendelés vagy az ügyfelek nyilvántartása telefonon és táblázatban megy, ez pedig ==minden nap elvisz egy órát==. Ilyenkor nem szebb weboldal kell, hanem folyamat, ami magától működik: gyors, mobilon is használható, és utána te is tudod kezelni. Nincs alvállalkozó, nincs projektmenedzser: akitől kérdezel, az építi meg, és ugyanő veszi fel a telefont fél év múlva is.',
    en: 'I work with small and medium businesses, and most enquiries are about the same thing: bookings, orders or customer records run on the phone and in a spreadsheet, and that ==costs an hour every day==. What is needed then is not a prettier website but a process that runs on its own: quick, usable on a phone, and something you can handle yourself afterwards. There is no subcontractor and no project manager: the person you ask is the person who builds it, and the same person who picks up the phone six months later.',
  },
]

const COPY = {
  headingLead: { hu: 'Webfejlesztő', en: 'A web developer' },
  headingAccent: { hu: 'Pest megyéből', en: 'from Pest County' },
  photoAlt: {
    hu: 'Rizmajer Máté Levente naplementében, egy sziklán ülve',
    en: 'Rizmajer Máté Levente at sunset, sitting on a rock',
  },
  factBase: { hu: 'Székhely', en: 'Based in' },
  factBaseValue: { hu: 'Inárcs, Pest vármegye', en: 'Inárcs, Pest County' },
  factFocus: { hu: 'Amit kapsz', en: 'What you get' },
  factFocusValue: { hu: 'Saját kód, nincs bérelt sablon', en: 'Your own code, no rented template' },
  factAvailability: { hu: 'Elérhetőség', en: 'Availability' },
  factAvailabilityValue: { hu: 'Nyitott új projektekre', en: 'Open to new projects' },
}

export default function About() {
  const [ref, visible] = useInView(0.2)
  const locale = useLocale()


  const facts = [
    { label: t(COPY.factBase, locale), value: t(COPY.factBaseValue, locale) },
    { label: t(COPY.factFocus, locale), value: t(COPY.factFocusValue, locale) },
    { label: t(COPY.factAvailability, locale), value: t(COPY.factAvailabilityValue, locale) },
  ]

  return (
    <section id="rolam" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div
            className={`lg:col-span-3 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group relative aspect-square w-40 sm:w-48 lg:w-full rounded-4xl overflow-hidden border border-divider">
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
            className={`lg:col-span-9 transition-all duration-1000 ease-out delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* No eyebrow. It read "╱ Rólam" directly above a headline ending
                in the word "rólam", announcing the section twice. */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              {t(COPY.headingLead, locale)}{' '}
              <span className="font-semibold">{t(COPY.headingAccent, locale)}</span>.
            </h2>

            <div className="mt-6 space-y-4 text-muted text-base sm:text-lg leading-relaxed max-w-prose">
              {/* Plain paragraphs (critique, 2026-11-10): the word-by-word reveal
                  held the last words back for ~2.5 s between the hero and the proof. */}
              {BIO_PARAGRAPHS.map((para, pi) => (
                <p key={pi}><Hl text={t(para, locale)} /></p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {facts.map((f, i) => (
                <div key={i} className="border-t-2 border-primary pt-3">
                  <p className="font-semibold text-[13px] text-primary-dark">{f.label}</p>
                  <p className="font-display font-semibold text-ink text-base mt-1">{f.value}</p>
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
