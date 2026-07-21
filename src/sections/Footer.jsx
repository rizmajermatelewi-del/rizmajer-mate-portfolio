import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { SOCIAL_LINKS } from '../data/nav'
import { SKILLS_FULL } from '../data/skills'
import { useInView } from '../motion/useInView'
import { ScrambleText } from '../motion/ScrambleText'
import { Magnetic } from '../motion/Magnetic'

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
export default function Footer() {
  const [ref, visible] = useInView(0.1)

  return (
    <footer ref={ref} className="relative rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div
        className={`relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="border-b border-divider pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Weboldalakat és
            <span className="font-display font-semibold text-primary block"><span className="chrome-text font-bold">alkalmazásokat</span> építek.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-muted max-w-md">
              Rizmajer Máté — full-stack fejlesztő Magyarországról, elérhető távoli és helyi
              projektekre egyaránt.
            </p>
            <a href="#kapcsolat" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
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
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Full-stack fejlesztő React, Node.js és modern web-technológiák szakértelmével.
              Ötlettől a működő termékig.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Készségek</p>
            <ul className="space-y-2.5">
              {SKILLS_FULL.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a href="#keszsegek" className="text-muted hover:text-primary transition text-sm">
                    <ScrambleText text={s.title} trigger="hover" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Rólam</p>
            <ul className="space-y-2.5">
              <li><a href="#projektek" className="text-muted hover:text-primary transition text-sm">Projektek</a></li>
              <li><a href="#rolam" className="text-muted hover:text-primary transition text-sm">Rólam</a></li>
              <li><a href="#folyamat" className="text-muted hover:text-primary transition text-sm">Folyamat</a></li>
              <li><a href="#arak" className="text-muted hover:text-primary transition text-sm">Árak</a></li>
              <li><a href="#kapcsolat" className="text-muted hover:text-primary transition text-sm">Kapcsolat</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Kapcsolat</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:rizmajermatelewi@gmail.com" className="text-muted hover:text-primary transition text-sm">
                  rizmajermatelewi@gmail.com
                </a>
              </li>
              <li className="text-muted text-sm">Magyarország</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
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
                  className="p-2 rounded-full text-muted hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted text-xs font-mono">
            <Link to="/adatvedelem" className="hover:text-primary transition">Adatvédelem</Link>
            <Link to="/aszf" className="hover:text-primary transition">ÁSZF</Link>
            <span>© 2026 Rizmajer Máté</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
