import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { NAV_LINKS, SOCIAL_LINKS } from '../data/nav'
import { t } from '../i18n/t'
import { useLocale } from '../i18n/useLocale'
import { withLocale } from '../i18n/locales'
import { UI } from '../i18n/ui'
import { ORDERED_SKILLS } from '../data/skills'
import { useInView } from '../motion/useInView'
import { ScrambleText } from '../motion/ScrambleText'
import { Magnetic } from '../motion/Magnetic'

const COPY = {
  headlineLead: { hu: 'Mondd el, mi', en: 'Tell me what' },
  headlineAccent: { hu: 'viszi el', en: 'eats the most' },
  headlineTail: { hu: 'a legtöbb időd.', en: 'of your time.' },
  strapline: {
    hu: 'Rizmajer Máté Levente — full-stack fejlesztő Magyarországról, elérhető távoli és helyi projektekre egyaránt.',
    en: 'Rizmajer Máté Levente — full-stack developer from Hungary, available for remote and local projects alike.',
  },
  /* Was: "Full-stack fejlesztő. React, Node.js és modern web-technológiák.
     Ötlettől a működő termékig." Three problems in one line, all of them the
     kind Hero.jsx already settled.

     "modern web-technológiák" is the empty adjective — no competitor claims
     outdated ones, so it carries no information and the buyer cannot check it.
     Hero.jsx cut "clean code and modern technologies" from the brief's English
     for exactly this, and the footer kept saying it. The stack list has the
     same problem in a different direction: React and Node.js are written for a
     recruiter, and the person reading this footer runs a bakery. Finally
     "Full-stack fejlesztő" opens the strapline sitting a few lines above, so
     the phrase appeared twice in one footer.

     What replaces it says who it is for and what they end up with, which is
     what the rest of the page says everywhere else. The stack still lives in
     the Készségek tiles' `detail`, behind a click — the developer checking
     whether I know it will open one; the client never has to. */
  blurb: {
    hu: 'Weboldalak és foglalási rendszerek kis- és középvállalkozásoknak. Az ötlettől az élő oldalig, egy kézben.',
    en: 'Websites and booking systems for small and medium businesses. From the idea to the live site, in one pair of hands.',
  },
  skillsHeading: { hu: 'Készségek', en: 'Skills' },
  pagesHeading: { hu: 'Oldalak', en: 'Pages' },
  contactHeading: { hu: 'Kapcsolat', en: 'Contact' },
  country: { hu: 'Magyarország', en: 'Hungary' },
  available: { hu: 'Elérhető új projektekre', en: 'Available for new projects' },
  /* Both legal links keep their Hungarian names on the English page, because
     both documents are Hungarian-only by decision. An English label over a
     Hungarian document promises a translation that does not exist — and for
     an ÁSZF, a second binding text is worse than an untranslated one. */
  privacy: { hu: 'Adatvédelem', en: 'Adatvédelem (in Hungarian)' },
  /* Unlike the two legal links, this one has a real English twin at
     /en/fejleszto, so it gets a translated label and goes through
     withLocale — a bare "/fejleszto" would drop an English reader onto the
     Hungarian page. */
  devProfile: { hu: 'Fejlesztői profil', en: 'Developer profile' },
}

/* The four shared entries are looked up from NAV_LINKS by href rather than
   retyped, so the footer cannot end up calling a section something the navbar
   does not. Kapcsolat is footer-only: nav.js deliberately omits it, because
   the CTA button beside it already points at #kapcsolat. */
const labelFor = (href) => NAV_LINKS.find((link) => link.href === href)?.label

const PAGE_LINKS = [
  { href: '#projektek', label: labelFor('#projektek') },
  { href: '#rolam', label: labelFor('#rolam') },
  { href: '#folyamat', label: labelFor('#folyamat') },
  { href: '#arak', label: labelFor('#arak') },
  { href: '#kapcsolat', label: COPY.contactHeading },
]

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
export default function Footer() {
  const [ref, visible] = useInView(0.1)
  const locale = useLocale()

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
        {/* paper, not background. This element sits inside .card-invert, which
            redeclares --color-background to the dark card value — so this fade
            ran from the footer's own colour to transparent and had been doing
            nothing at all since the invert landed. It is supposed to carry the
            light page down into the dark footer. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
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
            {t(COPY.headlineLead, locale)}{' '}
            <span className="text-primary-dark font-bold whitespace-nowrap">{t(COPY.headlineAccent, locale)}</span>{' '}
            {t(COPY.headlineTail, locale)}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-muted max-w-md">{t(COPY.strapline, locale)}</p>
            <a href="#kapcsolat" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              {t(UI.ctaQuote, locale)}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              {/* Not inverted: the footer is the dark `card-invert` surface.
                  The wordmark that used to sit beside this is gone, so the mark
                  carries the name as its alt — it is the only place the footer
                  states whose site this is. */}
              <LogoMark className="h-9 w-auto" alt="Rizmajer Máté Levente" />
            </div>
            {/* "szakértelmével" is gone. Expertise is not something you award
                yourself in your own footer, and this page argues everywhere else
                that a claim needs something behind it. */}
            <p className="text-muted text-sm leading-relaxed max-w-xs">{t(COPY.blurb, locale)}</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-4">{t(COPY.skillsHeading, locale)}</p>
            <ul className="space-y-2.5">
              {/* Same order as the Készségek section, not authoring order, so
                  the two lists cannot disagree about what comes first. */}
              {ORDERED_SKILLS.slice(0, 4).map((s) => (
                <li key={t(s.title, locale)}>
                  <a href="#keszsegek" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">
                    <ScrambleText text={t(s.title, locale)} trigger="hover" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* "Oldalak", not "Rólam". The group used to be named after one of
                its own five items, which made the label useless as a heading. */}
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-4">{t(COPY.pagesHeading, locale)}</p>
            <ul className="space-y-2.5">
              {PAGE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">
                    {t(label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-4">{t(COPY.contactHeading, locale)}</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:rizmajermatelewi@gmail.com" className="inline-block py-1 text-muted hover:text-primary-dark transition text-sm">
                  rizmajermatelewi@gmail.com
                </a>
              </li>
              <li className="text-muted text-sm">{t(COPY.country, locale)}</li>
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
              {t(COPY.available, locale)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <Magnetic key={t(label)}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(label)}
                  className="p-2 rounded-full text-muted hover:text-primary-dark hover:scale-110 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted text-xs font-mono">
            <Link to={withLocale('/fejleszto', locale)} className="inline-block py-1 hover:text-primary-dark transition">{t(COPY.devProfile, locale)}</Link>
            <Link to="/adatvedelem" className="inline-block py-1 hover:text-primary-dark transition">{t(COPY.privacy, locale)}</Link>
            <Link to="/aszf" className="inline-block py-1 hover:text-primary-dark transition">ÁSZF</Link>
            <span>© 2026 Rizmajer Máté Levente</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
