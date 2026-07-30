import portraitSunset from '../assets/portrait-sunset.jpg'
import { SOCIAL_LINKS } from '../data/nav'
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
  'Rizmajer Máté Levente vagyok, full-stack fejlesztő. Szoftverfejlesztő végzettséget szereztem, de a gyakorlatot éles projekteken gyűjtöttem: a kód akkor állt össze a fejemben, amikor egy valódi problémát kellett megoldanom vele, nem amikor egy feladatlapon szerepelt.',
  'Kis- és középvállalkozásokkal dolgozom, és a megkeresések nagy része ugyanarról szól: a foglalás, a rendelés vagy az ügyfelek nyilvántartása telefonon és táblázatban megy, ez pedig minden nap elvisz egy órát. Ilyenkor nem szebb weboldal kell, hanem folyamat, ami magától működik — gyors, mobilon is használható, és utána te is tudod kezelni.',
]

export default function About() {
  const [ref, visible] = useInView(0.2)

  const facts = [
    { label: 'Székhely', value: 'Magyarország' },
    { label: 'Fókusz', value: 'Full-stack fejlesztés' },
    { label: 'Elérhetőség', value: 'Nyitott új projektekre' },
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
                alt="Rizmajer Máté Levente naplementében, egy sziklán ülve"
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
              Néhány szó <span className="text-primary-dark font-semibold">rólam</span>.
            </h2>

            <div className="mt-6 space-y-4 text-muted text-base sm:text-lg leading-relaxed max-w-xl">
              {(() => {
                let w = 0
                return BIO_PARAGRAPHS.map((para, pi) => (
                  <p key={pi}>
                    {para.split(' ').map((word, i) => (
                      <span
                        key={i}
                        className="inline-block transition-all duration-500 ease-out motion-reduce:transition-none"
                        style={{
                          transitionDelay: visible ? `${w++ * 18}ms` : '0ms',
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(6px)',
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </p>
                ))
              })()}
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
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift-on-hover inline-flex items-center gap-2 bg-surface border border-divider text-ink px-5 py-3 rounded-full font-medium text-sm hover:border-primary/60 hover:text-primary-dark transition-colors duration-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
