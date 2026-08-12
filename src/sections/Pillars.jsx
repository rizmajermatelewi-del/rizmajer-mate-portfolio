import { useState } from 'react'
import CountUp from '../components/CountUp'
import { useInView } from '../motion/useInView'
import { useLocale } from '../i18n/useLocale'
import { t, neutral } from '../i18n/t'

const COPY = {
  eyebrow: { hu: 'Számokban', en: 'In numbers' },
  headingLead: { hu: 'A számok', en: 'The numbers' },
  headingAccent: { hu: 'mögöttem', en: 'behind me' },
  intro: {
    hu: 'Nem kerekítek felfelé. Ennyi van mögöttem, se több, se kevesebb.',
    en: 'I do not round up. This is what is behind me, no more and no less.',
  },
}

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
export default function Pillars() {
  const [ref, visible] = useInView(0.15)
  const [focused, setFocused] = useState(null)
  const locale = useLocale()

  /* Back to the card layout. It was briefly rewritten as hairline rows to
     break up the run of card grids in the middle of the page; the rows were
     more restrained but the three big numerals lost the weight that made
     this section land, so the original wins on the thing that matters. */
  const pillars = [
    {
      n: '01',
      title: { hu: 'Leszállítva', en: 'Delivered' },
      /* Was 4, described as "kettő fizető ügyfélnek, kettő saját
         kezdeményezés". The two client projects were removed from projects.js
         on 2026-08-10 because neither had been delivered or invoiced, so this
         numeral counted work that did not exist. Two own projects, no client
         work yet — which is what the section now actually contains. */
      target: 2,
      suffix: neutral(''),
      label: { hu: 'megépített projekt', en: 'projects built' },
      /* The third sentence used to read "Mindegyik megnyitható és
         kipróbálható." Nothing on the site is: every `live` field in
         projects.js is empty and every `github` is '#'. It stays out until
         there are real links behind the project cards. */
      desc: {
        hu: 'Két saját kezdeményezésű projekt. Az első ügyfélmunka most indul.',
        en: 'Two projects I started myself. The first client job is beginning now.',
      },
    },
    {
      n: '02',
      /* Was "2 fizető ügyfél — két magyar vállalkozás, akiknek a rendszere ma
         is élesben fut." Neither existed. "1 készül" is a weaker claim and a
         true one; starting out is not something a first client holds against
         you, being caught inventing a track record is. Update this the day AB
         Masszázs goes live, and give it a link. */
      title: { hu: 'Első ügyfél', en: 'First client' },
      target: 1,
      suffix: neutral(''),
      label: { hu: 'ügyfélprojekt készül', en: 'client project in progress' },
      desc: {
        hu: 'Egy masszázsszalon időpontfoglalója, ami most épül. Amint él, itt lesz a link hozzá.',
        en: 'A booking system for a massage salon, being built now. The link goes here the day it is live.',
      },
    },
    {
      n: '03',
      title: { hu: 'Válaszidő', en: 'Response time' },
      target: 24,
      suffix: { hu: 'ó', en: 'h' },
      label: { hu: 'órán belül válaszolok', en: 'hours to a reply' },
      desc: {
        hu: 'A leadás után sem tűnök el. Kérdésre, hibára vagy bővítésre egy munkanapon belül reagálok.',
        en: 'I do not disappear after delivery. I respond to a question, a fault or a change request within one working day.',
      },
    },
  ]

  return (
    <section id="filozofia" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div aria-hidden="true" className="section-glow" />

      <div className="relative max-w-7xl mx-auto">
        {/* Headline and explainer stack vertically. They used to sit in a
            split header with the paragraph floating right-aligned in the
            opposite corner, anchored to nothing, and the same shape appeared
            again two sections later. */}
        <div
          className={`max-w-2xl mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
            ╱ {t(COPY.eyebrow, locale)}
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            {t(COPY.headingLead, locale)}{' '}
            <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>.
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-6">
            {t(COPY.intro, locale)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={p.n}
              onPointerEnter={() => setFocused(i)}
              onPointerLeave={() => setFocused(null)}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pillar-card relative card-invert p-9 sm:p-12 group overflow-hidden card-motion ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Wraps only the flow content, never the absolutely positioned
                  sweep below: a transform here would make this div its
                  containing block and shift it inward. */}
              <div
                className={`transition-all duration-300 ease-out ${
                  focused !== null && focused !== i ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {p.n} / {t(p.title, locale)}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
                </div>

                <div className="flex items-end gap-1 leading-none">
                  <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                    <CountUp target={p.target} duration={1800 + i * 200} />
                  </span>
                  <span className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                    {t(p.suffix, locale)}
                  </span>
                </div>

                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{t(p.label, locale)}</p>
                <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{t(p.desc, locale)}</p>
              </div>

              {/* The one thing not restored is the "01.dev" corner stamp. It
                  rendered at text-primary/30 on near-black, about 1.4:1, so
                  it was decoration nobody could actually read. Everything
                  else here is the original. */}
              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
