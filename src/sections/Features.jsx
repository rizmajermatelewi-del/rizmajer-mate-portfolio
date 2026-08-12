import { ArrowUpRight } from 'lucide-react'
import StackShuffler from '../components/showcases/StackShuffler'
import CodeScan from '../components/showcases/CodeScan'
import BookingScheduler from '../components/showcases/BookingScheduler'
import { useInView } from '../motion/useInView'
import { TiltCard } from '../motion/TiltCard'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

const COPY = {
  headingLead: { hu: 'Három dolog, amit', en: 'Three things you can' },
  headingAccent: { hu: 'elvárhatsz', en: 'expect' },
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
export default function Features() {
  const [sectionRef, visible] = useInView(0.15)
  const locale = useLocale()

  /* Sentence case, not Title Case. Hungarian does not capitalise every word
     in a heading; "Modern Tech Stack" and "Tiszta, Tesztelt Kód" read as
     English headings wearing Hungarian words, which is the loudest
     translated-from-English signal a Hungarian visitor picks up.
     The numbered eyebrows went for the same reason as the ones in Pillars:
     three cards side by side do not need to be counted for the reader. */
  /* Rewritten for the person paying, not the person hiring. The old headings
     were "Modern eszközkészlet / Frontendtől backendig", "Tiszta, tesztelt
     kód / Buildről buildre" and "Az ötlettől a kódig" — three developer
     phrases in a row on a page whose buyer runs a bakery. Every line here
     now names a consequence the owner can feel; the stack names moved into
     the expandable detail in skills.js, where whoever cares can find them. */
  const cards = [
    {
      eyebrow: { hu: 'Amit kapsz', en: 'What you get' },
      heading: { hu: 'Gyors marad', en: 'It stays fast' },
      sub: { hu: 'Nem sablonra épül', en: 'Not built on a template' },
      text: {
        hu: 'Az oldalad nem egy megvásárolt sablon, amit még ezren használnak. Ezért gyors, és később bővíteni lehet ahelyett, hogy elölről kellene kezdeni.',
        en: 'Your site is not a bought template that a thousand other people are running as well. That is why it is fast, and why it can be extended later instead of started again.',
      },
      Component: StackShuffler,
    },
    {
      eyebrow: { hu: 'Amire számíthatsz', en: 'What you can count on' },
      heading: { hu: 'Tesztelve adom ki', en: 'It ships tested' },
      sub: { hu: 'Nem a vevőd találja meg a hibát', en: 'Your customer does not find the bug' },
      text: {
        hu: 'Minden változtatás után automatikusan lefutnak az ellenőrzések. Ha valami elromlik, az nálam derül ki, nem akkor, amikor egy vevőd épp fizetne.',
        en: 'The checks run automatically after every change. If something breaks, it surfaces on my side — not while one of your customers is trying to pay.',
      },
      Component: CodeScan,
    },
    {
      eyebrow: { hu: 'Ahogy kezdünk', en: 'How we start' },
      heading: { hu: 'Előbb beszéljünk', en: 'We talk first' },
      sub: { hu: 'Kötelezettség nélkül', en: 'No obligation' },
      text: {
        hu: 'Elmondod, mi a gond, én megmondom, mennyi munka és mennyibe kerül. Ha kiderül, hogy nem éri meg neked, azt is megmondom.',
        en: 'You tell me what the problem is, I tell you how much work it is and what it costs. If it turns out not to be worth it for you, I tell you that too.',
      },
      Component: BookingScheduler,
    },
  ]

  return (
    /* The "keszsegek" id moved to ServicesGrid, which is the section that
       actually lists the skills the navbar and footer links name. */
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div
          className={`feature-heading max-w-3xl mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* "Három pillér, egy cél" was a headline shape with no content in
              it: it could sit on any page in any industry. This one states
              what the three cards below actually promise. */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            {t(COPY.headingLead, locale)}{' '}
            <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              style={{ transitionDelay: visible ? `${idx * 150}ms` : '0ms' }}
              className={`feature-card group relative card-invert border border-divider rounded-5xl p-7 card-motion shadow-e2 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-e4 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* max={4}: these cards run their own demos, and the default
                  8deg tilt fights the motion already happening inside them. */}
              <TiltCard max={4}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{t(card.eyebrow, locale)}</span>
                  <ArrowUpRight
                    className="h-5 w-5 text-ink/30 group-hover:text-primary-dark group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    strokeWidth={1.8}
                  />
                </div>

                <card.Component />

                <div className="mt-6">
                  <h3 className="font-display font-bold text-2xl text-ink leading-tight">{t(card.heading, locale)}</h3>
                  <p className="font-display font-medium text-primary-dark text-sm mt-1">{t(card.sub, locale)}</p>
                  <p className="text-muted text-[15px] mt-4 leading-relaxed">{t(card.text, locale)}</p>
                </div>
              </TiltCard>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
