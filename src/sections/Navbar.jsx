import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { NAV_LINKS, SOCIAL_LINKS } from '../data/nav'
import { useLocale } from '../i18n/useLocale'
import { LOCALES, withLocale } from '../i18n/locales'
import { ROUTE_PATHS } from '../routePaths'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'

const COPY = {
  homeLink: { hu: 'Rizmajer Máté — kezdőlap', en: 'Rizmajer Máté — home' },
  openMenu: { hu: 'Menü megnyitása', en: 'Open menu' },
  closeMenu: { hu: 'Menü bezárása', en: 'Close menu' },
  /* The accessible name, in the language of the page it is on — not in the
     language it points at. An English reader hearing "Magyar nyelvű változat"
     from their screen reader has been handed the same problem the whole /en
     page exists to solve. The visible label goes the other way on purpose;
     see switchLabel.

     Each side names one destination, which works because LOCALES holds
     exactly two: on a Hungarian page the only target is English, on an
     English page the only target is Hungarian. A third language would have to
     key this by target — which is why the twin below is computed rather than
     assumed. */
  switchLanguage: { hu: 'Angol nyelvű változat', en: 'Hungarian version' },
  /* The drawer has room for a word where the desktop pill has room for two
     letters. Unlike the label above, this is the target language's own name
     for itself: a Hungarian speaker landing on the English page is looking
     for the word "Magyar", not for "Hungarian". That is the ordinary
     convention for a language switcher, and it is the one part of the control
     that works for a reader of neither language. Same two-locale assumption
     as switchLanguage above. */
  switchLabel: { hu: 'English', en: 'Magyar' },
}

/* The other-language twin of the page being viewed, or null when it has none.
   ---------------------------------------------------------------------
   /adatvedelem and /aszf are Hungarian-only by decision, so the toggle has to
   be able to not exist. Checking ROUTE_PATHS rather than assuming every page
   has a pair is what keeps that honest: a switch pointing at a URL the app
   does not answer sends the one visitor who needs it to a 404 — the same
   class of mistake, a language control promising something that is not
   behind it, that /en was withdrawn over the first time. */
function twinOf(pathname, locale) {
  const other = LOCALES.find((l) => l !== locale)
  const target = withLocale(pathname, other)
  return ROUTE_PATHS.includes(target) ? { locale: other, target } : null
}

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const locale = useLocale()
  const twin = twinOf(useLocation().pathname, locale)

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

  /* Escape closes the mobile menu, matching ProjectModal, which is the only
     other thing on this site that covers the page. A panel you can open with
     the keyboard and not close with it is a dead end. */
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          {/* The mark stands alone here, so the link carries the accessible
              name the removed wordmark used to give it. */}
          <a href="#kezdolap" className="flex items-center group" aria-label={t(COPY.homeLink, locale)}>
            {/* Inverts on scroll: unscrolled the pill is transparent over the
                dark hero, scrolled it is glass over the light page.

                On hover a highlight sweeps through the brush strokes — that
                lives in `.logo-sheen` in index.css, masked to the artwork.
                The scale is dialled back to 6% because it is now the quiet half
                of the effect rather than the whole of it, and it stays
                `motion-safe`: a logo that jumps is exactly what a
                vestibular-motion setting asks us not to do. The filter
                transition moved into Logo.jsx, which now owns the invert. */}
            <LogoMark
              className="h-8 w-auto shrink-0 transition-transform duration-700 motion-safe:group-hover:scale-[1.06]"
              inverted={scrolled}
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
                {t(link.label, locale)}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* A <Link>, not an <a>: the target is a real route, so the router
                swaps the page without a reload — and because locale is read
                off the pathname, changing the URL is the whole of changing the
                language. No state, nothing to keep in sync.

                Two characters wide, so it needs the accessible name; "EN" on
                its own tells a screen reader nothing about what pressing it
                does. */}
            {twin && (
              <Link
                to={twin.target}
                aria-label={t(COPY.switchLanguage, locale)}
                className={`font-mono text-xs font-semibold tracking-[0.15em] px-2.5 py-1.5 rounded-full border transition-colors duration-300 ${
                  scrolled
                    ? 'border-divider text-ink/60 hover:border-primary/60 hover:text-primary-dark'
                    : 'border-white/25 text-white/80 hover:border-white/60 hover:text-white'
                }`}
              >
                {twin.locale.toUpperCase()}
              </Link>
            )}
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={t(label)}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(label)}
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
              {t(UI.ctaQuote, locale)}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label={t(COPY.openMenu, locale)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu.

          `inert` is what keeps this out of the tab order while it is closed.
          opacity-0 and pointer-events-none hide it from the eye and from the
          mouse but do neither for the keyboard: below lg this panel stays in the
          document, so a keyboard user tabbing off the hamburger used to walk
          through seven invisible nav links, the CTA and two social links before
          reaching the page. Lighthouse scores 100 either way — axe treats
          hidden-content focus order as a manual check — so nothing but reading
          it catches this. */}
      <div
        inert={!open}
        aria-hidden={!open}
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
            <button onClick={() => setOpen(false)} aria-label={t(COPY.closeMenu, locale)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-divider/40">
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
                {t(link.label, locale)}
              </a>
            ))}
            {/* Here and not only in the desktop bar. The bar's toggle is
                `hidden lg:flex`, so leaving this out would mean the language
                switch does not exist on a phone — on a site whose traffic is
                mostly phones, and for the visitor least able to work around
                it by editing the URL. */}
            {twin && (
              <Link
                to={twin.target}
                onClick={() => setOpen(false)}
                aria-label={t(COPY.switchLanguage, locale)}
                className="font-display text-3xl font-semibold text-primary-dark py-3 border-b border-divider"
              >
                {t(COPY.switchLabel, locale)}
              </Link>
            )}
          </div>
          <a
            href="#kapcsolat"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            {t(UI.ctaQuote, locale)}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="mt-6 flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={t(label)}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(label)}
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
