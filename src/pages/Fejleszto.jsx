import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { ENGINEERING_APPROACH, STACK_GROUPS, STACK_LEGEND, SITE_DECISIONS } from '../data/engineering'
import { PROJECTS_FULL } from '../data/projects'
import { SOCIAL_LINKS } from '../data/nav'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'
import { useLocale } from '../i18n/useLocale'
import { withLocale } from '../i18n/locales'

const COPY = {
  eyebrow: { hu: 'Fejlesztői profil', en: 'Developer profile' },
  role: { hu: 'Full-stack fejlesztő — React és Node.js', en: 'Full-stack developer — React and Node.js' },

  /* The opening.
     ---------------------------------------------------------------------
     Three paragraphs, in the order the reader's questions arrive: what do
     you build, how do you decide, and can I hire you. The previous version
     opened with where the training came from, which is the first thing a CV
     says and roughly the last thing anyone assessing a developer wants.

     No "senior", no "architect", no "expert". Two delivered projects do not
     support any of those, and a reader who checks finds out — at which point
     every other sentence on the page is discounted too. */
  bio1: {
    hu: 'Full-stack webalkalmazásokat építek: a felülettől az API-n át az adatbázisig ugyanaz a kéz viszi végig. Jellemzően olyan rendszereket, amik a napi adminisztrációt alakítják magától működő folyamattá — foglalás, rendelés, belső nyilvántartás.',
    en: 'I build full-stack web applications, carrying the same work from the interface through the API to the database. Usually the kind of system that turns daily admin into a process that runs on its own — booking, ordering, internal records.',
  },
  bio2: {
    hu: 'A munkamódszeremben az a rögzített pont, hogy a hibának hangosnak kell lennie. A tesztek, a lint és a build-idejű állítások azt fogják meg, amit egy átnézés nem: ezen az oldalon például a build leáll, ha egy magyar mondat átcsúszik az angol változatra. Ami csendben romlik el, azt előbb veszi észre a látogató, mint én.',
    en: 'The fixed point in how I work is that a failure has to be loud. Tests, linting and build-time assertions catch what a review does not: on this site, for instance, the build stops if a Hungarian sentence slips onto the English version. Anything that breaks quietly is noticed by a visitor before it is noticed by me.',
  },
  bio3: {
    hu: 'Most a TypeScript és a szélesebb tesztelési gyakorlat felé mélyítem a munkát — ezért nem szerepel egyik sem a stackben: éles kódot még nem írok bennük. Nyitott vagyok fejlesztői pozícióra és szerződéses munkára is. Ha olyan technikai részlet érdekel, ami itt nem szerepel, írj; konkrét kérdésre konkrétan válaszolok.',
    /* "deepening the work towards" was a Hungarian sentence wearing English
       words — mélyítem a munkát translates literally and lands nowhere. */
    en: 'I am working towards TypeScript and a broader testing practice at the moment, which is why neither appears in the stack below: I do not write production code in them yet. I am open to developer roles and to contract work. If there is a technical detail you want that is not here, write to me; a specific question gets a specific answer.',
  },

  approachHeading: { hu: 'Így dolgozom', en: 'How I build' },
  approachIntro: {
    hu: 'Öt terület, mindegyikhez egy álláspont és a hozzá tartozó konkrétumok. Nem az számít, ismerem-e a neveket, hanem hogy mi alapján döntök, amikor két megoldás is kínálja magát.',
    en: 'Five areas, each with a position and the specifics behind it. What matters is not whether I know the names, but what I decide on when two solutions are both available.',
  },

  stackHeading: { hu: 'Amivel dolgozom', en: 'What I work with' },
  stackIntro: {
    hu: 'Két csoportba osztva aszerint, mi ellenőrizhető. Ami ebben a repóban fut, azt meg lehet nyitni; a többit a leszállított munkából hozom. Százalékos tudásszint nincs, mert nincs mögötte semmi.',
    en: 'Split by what can be verified. Anything running in this repository can be opened and checked; the rest comes from delivered work. No percentage skill levels, because there is nothing behind them.',
  },

  siteHeading: { hu: 'Ez az oldal, belülről', en: 'This site, from the inside' },
  siteIntro: {
    hu: 'A legjobban ellenőrizhető munkám az az oldal, amit épp olvasol. Nyolc döntés, mindegyikhez az ok és a fájl, amiben megnézhető — mert az ok nélküli döntés csak funkciólista, a fájl nélküli ok pedig csak állítás.',
    en: 'The most checkable work I have is the page you are reading. Eight decisions, each with the reason behind it and the file it can be checked in — because a decision without its reason is a feature list, and a reason without a file is a claim.',
  },
  sourceLabel: { hu: 'Forrás', en: 'Source' },

  projectsHeading: { hu: 'Projektek', en: 'Projects' },
  /* Says the thing the cards cannot say for themselves, and says it before
     the reader forms the other explanation. Kept free of counts: the number
     of projects belongs to projects.js, and this repository has already been
     bitten once by that fact living in four files at the same time. */
  projectsNote: {
    hu: 'Ügyfélprojekthez nyilvános linket és repót nem adok: éles rendszerek, valódi ügyféladatokkal. A saját projektekhez demókat építek, amiket bárki megnyithat, és kódot szívesen mutatok egy beszélgetésen. Az első ügyfélmunka most készül — amint él, itt lesz a link és a képernyőkép.',
    en: 'I do not publish links or repositories for client projects: they are live systems holding real customer data. For my own projects I build demos anyone can open, and I am glad to walk through code in a conversation. The first client build is under way — the moment it is live, the link and the screenshot will be here.',
  },
  problemLabel: { hu: 'A feladat', en: 'The problem' },
  solutionLabel: { hu: 'A megoldás', en: 'What I built' },
  stackLabel: { hu: 'Stack', en: 'Stack' },

  hireHeading: { hu: 'Együttműködés', en: 'Working together' },
  hireIntro: {
    hu: 'Háromféle megkeresés érkezik, és mindhárom ugyanoda fut be. Nem kell előre eldöntened, melyikbe tartozol — írd meg, mi a helyzet.',
    en: 'Three kinds of enquiry reach me, and all three land in the same place. You do not have to decide in advance which one you are — just say what the situation is.',
  },
  trackRole: { hu: 'Fejlesztői pozíció', en: 'A developer role' },
  trackRoleText: {
    hu: 'Alkalmazottként és szerződéses formában is. Ha a csapatnak kódmintára vagy technikai beszélgetésre van szüksége a folytatáshoz, mindkettő megoldható.',
    en: 'Employed or on contract. If your team needs a code sample or a technical conversation before going further, both are available.',
  },
  trackFreelance: { hu: 'Projektalapú munka', en: 'Project work' },
  trackFreelanceText: {
    hu: 'Weboldal vagy belső rendszer, előre egyeztetett árral. Az árak és a folyamat a főoldalon nyilvánosak.',
    en: 'A website or an internal system, at a price agreed up front. The prices and the process are published on the home page.',
  },
  trackTechnical: { hu: 'Technikai kérdés', en: 'A technical question' },
  trackTechnicalText: {
    hu: 'Ha csak egy döntésről vagy egy megoldásról szeretnél kérdezni, arra is válaszolok — akkor is, ha nem lesz belőle munka.',
    en: 'If you only want to ask about a decision or an approach, that gets an answer too — including when nothing comes of it.',
  },
  pricingLink: { hu: 'Árak és folyamat a főoldalon', en: 'Prices and process on the home page' },
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
   separate decisions. Removing the footer link is one line in Footer.jsx if
   that trade stops being worth it.

   ---------------------------------------------------------------------
   Rebuilt on 2026-08-18. What was here was a stack list: the six tiles from
   skills.js with their `detail` field showing. That field is written for a
   client checking whether the supplier knows React, and it answers "does he
   know the names" — which is not what any of the five readers this page is
   for are asking. A recruiter, an engineering manager, a founder, a senior
   developer and a freelance buyer all want the same thing from different
   angles: how does this person decide, and what happens when something goes
   wrong.

   So the page now leads with method (data/engineering.js), then ranks the
   tools by what can actually be verified, then reads this repository back as
   a case study, and only then reaches the projects. The stack did not get
   smaller; it stopped being the argument. */
export default function Fejleszto() {
  const locale = useLocale()

  return (
    /* <main>, not <div>. App.jsx has carried one since it was written, and
       none of the three subpages did — so a screen-reader user landing on
       /fejleszto had no landmark to jump to and had to tab through the page
       from the top. It is the same one-word fix on all three. */
    <main className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* flex w-fit, not inline-flex — see the same note in Terms.jsx: as an
            inline box the eyebrow below shared this link's line. */}
        {/* withLocale, not "/" — from /en/fejleszto a bare "/" would drop the
            reader onto the Hungarian home page, which is the one page they
            came here instead of. */}
        {/* py-1.5 is a target-size fix, not spacing. At the bare line height
            this link measured 140x20, and SC 2.5.8 wants 24x24 — the "inline"
            exemption does not apply, because it stands alone on its line
            rather than inside a sentence. */}
        <Link
          to={withLocale('/', locale)}
          className="flex w-fit items-center gap-2 py-1.5 text-sm font-medium text-primary-dark lift-on-hover mb-9"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t(UI.backToHome, locale)}
        </Link>

        {/* ---------------- Header ----------------
            The page's only eyebrow. DESIGN.md rations them at one per three
            sections and this page now has five, so the five section headings
            below stand on their own. */}
        <header>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ {t(COPY.eyebrow, locale)}
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Rizmajer Máté Levente
          </h1>
          <p className="font-display font-semibold text-xl sm:text-2xl text-primary-dark mt-3">
            {t(COPY.role, locale)}
          </p>

          <div className="mt-8 space-y-4 text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            <p>{t(COPY.bio1, locale)}</p>
            <p>{t(COPY.bio2, locale)}</p>
            <p>{t(COPY.bio3, locale)}</p>
          </div>
        </header>

        {/* ---------------- How I build ----------------
            Two columns from sm up: the area name in the rail, the position and
            its specifics in the body. It is the shape a technical document
            already has, which is the point — the reader can scan the rail for
            the area they care about without reading the prose first. */}
        <section aria-labelledby="approach" className="mt-20 sm:mt-24">
          <h2 id="approach" className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            {t(COPY.approachHeading, locale)}
          </h2>
          <p className="text-muted leading-relaxed mt-4 max-w-2xl">{t(COPY.approachIntro, locale)}</p>

          <div className="mt-10 space-y-10">
            {ENGINEERING_APPROACH.map((area) => (
              <div
                key={area.id}
                className="border-t border-divider pt-6 grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <h3 className="font-display font-semibold text-lg sm:text-base text-ink sm:pt-0.5">
                  {t(area.title, locale)}
                </h3>
                <div>
                  <p className="text-ink leading-relaxed">{t(area.body, locale)}</p>
                  <ul className="mt-4 space-y-3">
                    {area.points.map((point) => (
                      <li key={t(point, locale)} className="text-muted text-sm leading-relaxed flex gap-3">
                        {/* Decorative marker, so it stays out of the
                            accessibility tree — the list already announces
                            itself as a list and its items as items. */}
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-dark" />
                        <span>{t(point, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Stack ----------------
            Grouped, and split inside each group by whether the claim can be
            checked. No badges and no bars: the ranking is carried by a bucket
            heading that is a sentence rather than a colour. */}
        <section aria-labelledby="stack" className="mt-20 sm:mt-24">
          <h2 id="stack" className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            {t(COPY.stackHeading, locale)}
          </h2>
          <p className="text-muted leading-relaxed mt-4 max-w-2xl">{t(COPY.stackIntro, locale)}</p>

          <div className="mt-10 space-y-10">
            {STACK_GROUPS.map((group) => {
              /* Order is data, not markup: 'here' first in every group, and a
                 bucket with nothing in it is not rendered at all — Data has no
                 'here' entries and Testing has no 'projects' ones, and an empty
                 labelled column would read as a gap rather than as a fact. */
              const buckets = ['here', 'projects']
                .map((where) => [where, group.items.filter((item) => item.where === where)])
                .filter(([, items]) => items.length > 0)

              return (
                <div
                  key={group.id}
                  className="border-t border-divider pt-6 grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-8"
                >
                  <h3 className="font-display font-semibold text-lg sm:text-base text-ink sm:pt-0.5">
                    {t(group.label, locale)}
                  </h3>
                  <div className="space-y-5">
                    {buckets.map(([where, items]) => (
                      <div key={where}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
                          {t(STACK_LEGEND[where], locale)}
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {items.map((item) => (
                            <li key={t(item.name)} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                              <span className="text-ink font-medium">{t(item.name)}</span>
                              <span className="text-muted text-sm">{t(item.note, locale)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ---------------- This site as a case study ----------------
            Two columns of compact blocks rather than one long column, because
            eight three-sentence explanations in a single stack reads as an
            essay and gets skipped. The file path under each one is what makes
            it checkable rather than merely stated. */}
        <section aria-labelledby="site" className="mt-20 sm:mt-24">
          <h2 id="site" className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            {t(COPY.siteHeading, locale)}
          </h2>
          <p className="text-muted leading-relaxed mt-4 max-w-2xl">{t(COPY.siteIntro, locale)}</p>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {SITE_DECISIONS.map((decision) => (
              <article key={decision.id} className="border-t border-divider pt-5">
                <h3 className="font-display font-semibold text-base text-ink leading-snug">
                  {t(decision.title, locale)}
                </h3>
                <p className="text-muted text-sm leading-relaxed mt-2.5">{t(decision.why, locale)}</p>
                <p className="mt-3 font-mono text-[11px] text-primary-dark break-all">
                  <span className="sr-only">{t(COPY.sourceLabel, locale)}: </span>
                  {decision.source}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Projects ----------------
            Every slot below renders only when its field holds something, so
            filling one in is a data edit in projects.js and no change here:

              image + imageAlt   the screenshot
              problem            what the job was
              solution           what got built, and what was decided
              tech               the stack chips
              live               the demo link
              github             the repository link, once it stops being '#'

            Nothing invents a placeholder. An empty frame captioned "screenshot
            coming" is the mockup this page exists to avoid, and a disabled
            GitHub button is a dead link with better manners. */}
        <section aria-labelledby="projects" className="mt-20 sm:mt-24">
          <h2 id="projects" className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            {t(COPY.projectsHeading, locale)}
          </h2>
          <p className="text-muted leading-relaxed mt-4 max-w-2xl">{t(COPY.projectsNote, locale)}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PROJECTS_FULL.map((p) => (
              <article
                key={t(p.title, locale)}
                className="rounded-3xl border border-divider bg-surface p-6 flex flex-col"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={t(p.imageAlt, locale)}
                    loading="lazy"
                    className="mb-5 w-full rounded-2xl border border-divider"
                  />
                )}

                {p.label && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
                    {t(p.label, locale)}
                  </p>
                )}
                <h3 className="font-display font-semibold text-lg text-ink mt-2">{t(p.title, locale)}</h3>
                <p className="text-muted text-sm leading-relaxed mt-2">{t(p.text, locale)}</p>

                {p.role && <p className="text-muted text-sm mt-3">{t(p.role, locale)}</p>}

                {p.problem && (
                  <div className="mt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
                      {t(COPY.problemLabel, locale)}
                    </p>
                    <p className="text-muted text-sm leading-relaxed mt-1.5">{t(p.problem, locale)}</p>
                  </div>
                )}

                {p.solution && (
                  <div className="mt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
                      {t(COPY.solutionLabel, locale)}
                    </p>
                    <p className="text-muted text-sm leading-relaxed mt-1.5">{t(p.solution, locale)}</p>
                  </div>
                )}

                {p.tech?.length > 0 && (
                  <>
                    <p className="sr-only">{t(COPY.stackLabel, locale)}</p>
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
                  </>
                )}

                {(p.live || p.github !== '#') && (
                  <div className="flex flex-wrap gap-4 mt-5">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary-dark"
                      >
                        {t(UI.openLink, locale)}
                        <span className="sr-only"> — {t(p.title, locale)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      </a>
                    )}
                    {p.github !== '#' && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary-dark"
                      >
                        {/* Names the project, because "GitHub" on every card
                            gives a screen-reader user a list of identical
                            links and no way to tell them apart. */}
                        GitHub
                        <span className="sr-only"> — {t(p.title, locale)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Working together ----------------
            Three tracks named, one destination. Splitting them into three
            funnels would be the agency move, and would leave a recruiter
            deciding which form is for them before they can write a sentence;
            naming them and then pointing all three at the same address says
            the distinction is understood without charging the reader for it. */}
        <section aria-labelledby="hire" className="mt-20 sm:mt-24">
          <h2 id="hire" className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            {t(COPY.hireHeading, locale)}
          </h2>
          <p className="text-muted leading-relaxed mt-4 max-w-2xl">{t(COPY.hireIntro, locale)}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              [COPY.trackRole, COPY.trackRoleText],
              [COPY.trackFreelance, COPY.trackFreelanceText],
              [COPY.trackTechnical, COPY.trackTechnicalText],
            ].map(([term, description]) => (
              <div key={t(term, locale)} className="border-t border-divider pt-5">
                <dt className="font-display font-semibold text-base text-ink">{t(term, locale)}</dt>
                <dd className="text-muted text-sm leading-relaxed mt-2">{t(description, locale)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* The address is a 26-character unbreakable token, so at the
                narrowest supported width it is the button's padding that
                decides whether the page scrolls sideways. Measured at 320px:
                at text-base with px-6 the button ends 2px past the viewport.
                One step down on both, above the sm breakpoint only. */}
            <a
              href="mailto:rizmajermatelewi@gmail.com"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-full shadow-lg shadow-primary/30"
            >
              <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
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
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {t(label)}
              </a>
            ))}
          </div>

          {/* The freelance track names prices this page does not print. Rather
              than repeat a number it does not own, it links to the page that
              does — which is also the only sentence here written for the buyer
              rather than for the technical reader. */}
          <p className="mt-6">
            <Link
              to={`${withLocale('/', locale)}#arak`}
              className="inline-flex items-center gap-1.5 py-1.5 text-sm font-medium text-primary-dark lift-on-hover"
            >
              {t(COPY.pricingLink, locale)}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
