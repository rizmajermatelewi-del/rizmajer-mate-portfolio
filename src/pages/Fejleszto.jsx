import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { ORDERED_SKILLS, categoryLabel } from '../data/skills'
import { PROJECTS_FULL } from '../data/projects'
import { SOCIAL_LINKS } from '../data/nav'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { withLocale } from '../i18n/locales'

const COPY = {
  eyebrow: { hu: 'Fejlesztői profil', en: 'Developer profile' },
  role: { hu: 'Full-stack fejlesztő — React és Node.js', en: 'Full-stack developer — React and Node.js' },
  bio1: {
    hu: 'Szoftverfejlesztő végzettséget szereztem, a gyakorlatot pedig éles projekteken gyűjtöttem: működő rendszereket építettem valódi felhasználóknak, nem feladatlapra. A munkáim nagyobb része full-stack — a felülettől az adatbázisig ugyanaz a kéz viszi végig.',
    en: 'I trained as a software developer and learned the craft on real projects: working systems for real users, not exercises. Most of my work is full-stack — the same pair of hands takes it from the interface to the database.',
  },
  bio2: {
    hu: 'Nyitott vagyok fejlesztői pozícióra, alkalmazottként és szerződéses formában egyaránt. Ha technikai részlet érdekel, amit itt nem találsz, írj — konkrét kérdésre konkrétan válaszolok.',
    en: 'I am open to developer roles, both employed and on contract. If there is a technical detail you want that is not here, write to me — a specific question gets a specific answer.',
  },
  stackHeading: { hu: 'Amivel dolgozom', en: 'What I work with' },
  projectsHeading: { hu: 'Projektek', en: 'Projects' },
  linksNote: {
    hu: 'Az ügyfélprojektekhez nyilvános linket és repót nem tudok adni: éles rendszerek, valódi ügyféladatokkal. A saját projektekhez demókat építek, amiket bárki megnyithat. Kódot szívesen mutatok személyesen.',
    en: 'I cannot give public links or repositories for client projects: they are live systems holding real customer data. For my own projects I build demos anyone can open. I am happy to walk through code in person.',
  },
  /* The last string on this page that was still written into the markup. It
     survived the sweep because the scanner keys on Hungarian diacritics and
     "Kapcsolat" has none — which is the documented limit of that guard, not a
     surprise, and the reason the build now also reads the rendered English
     pages back. */
  contactHeading: { hu: 'Kapcsolat', en: 'Contact' },
}

/* The second entry point.

   `/` sells a service to a business owner: it prices the work, links the ÁSZF
   and ends in a quote form. None of that helps someone assessing a developer
   for a role — it answers "what does this cost" when the question is "what can
   this person build". One page cannot do both, so this one drops the pricing,
   the terms and the form entirely and keeps what a technical reader wants.

   In sitemap.xml and, since 2026-08-17, in the footer's bottom row beside
   Adatvédelem and ÁSZF — Máté asked for it to be reachable the same way the
   legal pages are. The nav still does not carry it; those were always two
   separate decisions.

   The sitemap entry is there so a recruiter searching can actually arrive:
   a page nobody can find only works if you paste the URL into every
   application yourself. The footer link is the accepted half of a real trade:
   a prospective client who follows a link to a page saying its author wants a
   job can read the freelance business as a stopgap, which is the opposite of
   what `/` argues. It sits in the quietest row on the page, in the same
   register as the legal links, rather than in the navigation a buyer scans.

   Removing it is one line in Footer.jsx if that trade stops being worth it.

   Everything here reads from the same data the main page uses, so when the
   demos land and projects.js gains real `live` and `github` values, both pages
   gain them at once and neither can drift from the other. */

/* SKILLS_FULL carries two registers: `text` for the business owner and
   `detail` for whoever is checking the stack. `/` shows `text` and hides
   `detail` behind a click. Here it is the other way round — this reader is
   the one the technical copy was written for, so it leads. */
export default function Fejleszto() {
  const locale = useLocale()
  const linkedProjects = PROJECTS_FULL.filter((p) => p.live || p.github !== '#')

  return (
    <div className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* flex w-fit, not inline-flex — see the same note in Terms.jsx: as an
            inline box the eyebrow below shared this link's line. */}
        {/* withLocale, not "/" — from /en/fejleszto a bare "/" would drop the
            reader onto the Hungarian home page, which is the one page they
            came here instead of. */}
        <Link to={withLocale('/', locale)} className="flex w-fit items-center gap-2 text-sm font-medium text-primary-dark lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> {t(UI.backToHome, locale)}
        </Link>

        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ {t(COPY.eyebrow, locale)}</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
          Rizmajer Máté Levente
        </h1>
        <p className="font-display font-semibold text-xl sm:text-2xl text-primary-dark mt-3">
          {t(COPY.role, locale)}
        </p>

        <div className="mt-8 space-y-4 text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          <p>{t(COPY.bio1, locale)}</p>
          <p>{t(COPY.bio2, locale)}</p>
        </div>

        {/* ---------------- Stack ---------------- */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-16 tracking-tight">
          {t(COPY.stackHeading, locale)}
        </h2>
        <div className="mt-8 space-y-8">
          {ORDERED_SKILLS.map((skill) => {
            const Icon = skill.icon
            return (
              <div key={t(skill.title, locale)} className="border-t border-divider pt-6">
                <div className="flex items-start gap-4">
                  <span className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary-dark" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
                      {t(categoryLabel(skill.category), locale)}
                    </p>
                    <h3 className="font-display font-semibold text-lg text-ink mt-1">{t(skill.title, locale)}</h3>
                    {/* `detail`, not `text` — see the note above. */}
                    <p className="text-muted leading-relaxed mt-2">{t(skill.detail, locale)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ---------------- Projects ---------------- */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-16 tracking-tight">
          {t(COPY.projectsHeading, locale)}
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {PROJECTS_FULL.map((p) => (
            <article key={t(p.title, locale)} className="rounded-3xl border border-divider bg-surface p-6">
              {p.label && (
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
                  {t(p.label, locale)}
                </p>
              )}
              <h3 className="font-display font-semibold text-lg text-ink mt-2">{t(p.title, locale)}</h3>
              <p className="text-muted text-sm leading-relaxed mt-2">{t(p.text, locale)}</p>

              {/* Every field below renders only when it holds something. year,
                  role, problem and solution are all '' today and all four
                  github values are '#', so nothing here invents a link or a
                  date that does not exist. */}
              {p.role && <p className="text-muted text-sm mt-3">{t(p.role, locale)}</p>}

              {p.tech?.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((techName) => (
                    <li
                      key={techName}
                      className="font-mono text-[10px] uppercase tracking-wider text-muted border border-divider rounded-full px-2.5 py-1"
                    >
                      {techName}
                    </li>
                  ))}
                </ul>
              )}

              {(p.live || p.github !== '#') && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-dark"
                    >
                      {t(UI.openLink, locale)} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                  )}
                  {p.github !== '#' && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-dark"
                    >
                      GitHub <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Says the thing the cards cannot say for themselves. Without it a
            technical reader sees link-less cards and reads them as claims with
            nothing behind them — which is what they are today.

            No counts in the sentence on purpose. "Két ügyfélprojekt" would be
            another place stating a number that projects.js owns, and this repo
            has already been bitten once by the four-projects fact living in
            four places until it rotted into a false claim. */}
        {linkedProjects.length === 0 && (
          <p className="text-muted text-sm leading-relaxed mt-5">{t(COPY.linksNote, locale)}</p>
        )}

        {/* ---------------- Contact ---------------- */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-16 tracking-tight">
          {t(COPY.contactHeading, locale)}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:rizmajermatelewi@gmail.com"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-primary/30"
          >
            <Mail className="h-4 w-4" strokeWidth={2} />
            rizmajermatelewi@gmail.com
          </a>
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <a
              key={t(label)}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="lift-on-hover inline-flex items-center gap-2 bg-surface border border-divider text-ink px-6 py-3.5 rounded-full font-medium text-sm hover:border-primary/60 hover:text-primary-dark transition-colors duration-300"
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {t(label)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
