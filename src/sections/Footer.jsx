import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { SOCIAL_LINKS } from '../data/nav'
import { ORDERED_SKILLS } from '../data/skills'
import { useInView } from '../motion/useInView'
import { ScrambleText } from '../motion/ScrambleText'
import { Magnetic } from '../motion/Magnetic'

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
export default function Footer() {
  const [ref, visible] = useInView(0.1)

  return (
    <footer ref={ref} className="card-invert relative rounded-t-6xl mt-12 overflow-hidden">
      {/* Bookends the hero: the page opens and closes dark, with the light
          body between. The top gradient dissolves the boundary.

          No photograph here. The hero image used to repeat at opacity-25
          under a deep/95-to-deep gradient, which rendered it invisible while
          still costing a full-size JPEG on the longest section of the page.
          The gradient alone gives the identical result. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-deep/95 via-deep/90 to-deep" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      </div>
      <div aria-hidden="true" className="section-glow" />

      <div
        className={`relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="border-b border-divider pb-12 mb-12">
          {/* whitespace-nowrap keeps the two-word accent from splitting across
              the wrap at text-8xl. Without it the break lands mid-phrase and
              leaves the emphasis in two disconnected halves.

              The old line read "Beszéljük meg, mi vinné el a munkát", which
              parses several ways and lands on none of them cleanly. */}
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Mondd el, mi <span className="text-primary-dark font-bold whitespace-nowrap">viszi el</span> a legtöbb időd.
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-muted max-w-md">
              Rizmajer Máté — full-stack fejlesztő Magyarországról, elérhető távoli és helyi
              projektekre egyaránt.
            </p>
            <a href="#kapcsolat" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Kérj ajánlatot
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <LogoMark className="h-9 w-9 text-primary" />
              <span className="font-display font-bold text-lg">Rizmajer Máté</span>
            </div>
            {/* "szakértelmével" is gone. Expertise is not something you award
                yourself in your own footer, and this page argues everywhere else
                that a claim needs something behind it. */}
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Full-stack fejlesztő. React, Node.js és modern web-technológiák.
              Ötlettől a működő termékig.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-4">Készségek</p>
            <ul className="space-y-2.5">
              {/* Same order as the Készségek section, not authoring order, so
                  the two lists cannot disagree about what comes first. */}
              {ORDERED_SKILLS.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a href="#keszsegek" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">
                    <ScrambleText text={s.title} trigger="hover" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* "Oldalak", not "Rólam". The group used to be named after one of
                its own five items, which made the label useless as a heading. */}
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-4">Oldalak</p>
            <ul className="space-y-2.5">
              <li><a href="#projektek" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">Projektek</a></li>
              <li><a href="#rolam" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">Rólam</a></li>
              <li><a href="#folyamat" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">Folyamat</a></li>
              <li><a href="#arak" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">Árak</a></li>
              <li><a href="#kapcsolat" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">Kapcsolat</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-4">Kapcsolat</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:rizmajermatelewi@gmail.com" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">
                  rizmajermatelewi@gmail.com
                </a>
              </li>
              <li className="text-muted text-sm">Magyarország</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Indigo, not emerald, and no ping. The site runs one accent colour
              start to finish; a green pulsing dot in the footer was the only
              place it broke, and the infinite animation drew the eye to a
              status that never changes. */}
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Elérhető új projektekre
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full text-muted hover:text-primary-dark hover:scale-110 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted text-xs font-mono">
            <Link to="/adatvedelem" className="inline-block py-1 hover:text-primary-dark transition">Adatvédelem</Link>
            <Link to="/aszf" className="inline-block py-1 hover:text-primary-dark transition">ÁSZF</Link>
            <span>© 2026 Rizmajer Máté</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
