import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { NAV_LINKS, SOCIAL_LINKS } from '../data/nav'
import { ScrambleText } from '../motion/ScrambleText'

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  /* A sentinel plus an observer, not a scroll handler. The old version ran a
     callback on every scroll frame to recompute one boolean; the browser can
     watch an 80px-tall element cross the top of the viewport instead and
     report back only on the two frames where the answer changes.
     The sentinel is created here rather than placed in the markup so nothing
     downstream can style, move or reorder it. */
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    Object.assign(sentinel.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '1px',
      height: '80px',
      pointerEvents: 'none',
    })
    document.body.prepend(sentinel)

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#kezdolap" className="flex items-center gap-2 group">
            <LogoMark
              className={`h-9 w-9 shrink-0 transition-colors duration-300 group-hover:text-primary-light ${
                scrolled ? 'text-ink' : 'text-white'
              }`}
            />
            <ScrambleText
              text="Rizmajer Máté"
              trigger="hover"
              className={`font-display font-bold tracking-tight text-lg ${
                scrolled ? 'text-ink' : 'text-white'
              } transition-colors`}
            />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-tight pb-0.5 transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-ink/70 hover:text-primary-dark' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    scrolled ? 'text-ink/60 hover:text-primary-dark' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
            <a
              href="#kapcsolat"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
            >
              Kérj ajánlatot
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Menü megnyitása"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Rizmajer Máté</span>
            <button onClick={() => setOpen(false)} aria-label="Menü bezárása" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#kapcsolat"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            Kérj ajánlatot
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="mt-6 flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full bg-divider/40 text-ink/60 hover:text-primary-dark hover:scale-110 transition-all duration-300"
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
