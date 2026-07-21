import portraitSunset from '../assets/portrait-sunset.jpg'
import { SOCIAL_LINKS } from '../data/nav'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   About — placeholder bio, replaced with the real story over time
---------------------------------------------------------------- */
/* Split out of the JSX so the word-stagger below can map over it without the
   paragraphs being retyped. Word index runs across both, so the fade reads as
   one continuous sentence rather than two separate reveals. */
const BIO_PARAGRAPHS = [
  'Rizmajer Máté Levente vagyok, full-stack fejlesztő. Szoftverfejlesztő végzettséget szereztem, de a gyakorlat nagyját nem az iskolapadban gyűjtöttem: már a tanulmányaim alatt éles projekteken dolgoztam. A kód akkor válik igazán érthetővé, amikor egy valódi probléma megoldásához használom — nem akkor, amikor egy feladatlapon szerepel.',
  'Olyan weboldalakat és rendszereket építek, amik nem csak jól néznek ki, hanem használhatók is: gyorsak, stabilak, és az ügyfeleid is eligazodnak rajtuk. Leginkább kis- és középvállalkozásokkal dolgozom, [KITÖLTENDŐ: milyen iparágakban, és mi az a probléma, amivel a leggyakrabban megkeresnek].',
]

export default function About() {
  const [ref, visible] = useInView(0.2)

  const facts = [
    { label: 'Székhely', value: 'Magyarország' },
    { label: 'Fókusz', value: 'Full-stack fejlesztés' },
    { label: 'Elérhetőség', value: 'Nyitott új projektekre' },
  ]

  return (
    <section id="rolam" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
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
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Rólam</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Néhány szó
              <span className="block font-display font-semibold text-primary-dark">rólam.</span>
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
