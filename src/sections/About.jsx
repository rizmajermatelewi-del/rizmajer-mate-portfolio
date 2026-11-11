import { Phone, Mail } from 'lucide-react'
import portraitSunset from '../assets/portrait-sunset.webp'
import { SOCIAL_LINKS } from '../data/nav'
import { CONTACT_PHONE, CONTACT_EMAIL } from '../data/contact'
import { t } from '../i18n/t'
import { useLocale } from '../i18n/useLocale'
import Hl from '../components/Hl'

/* ----------------------------------------------------------------
   About: who you will talk to (2026-11-11, Máté). Not a CV: one short
   introduction, three promises the reader can hold me to, and the direct
   line. The training and stack live on /fejleszto for the recruiter.
---------------------------------------------------------------- */
const COPY = {
  headingLead: { hu: 'Akivel', en: 'The person' },
  headingAccent: { hu: 'beszélni fogsz', en: 'you will talk to' },
  intro: {
    hu: 'Rizmajer Máté vagyok, Inárcsról. Weboldalakat és foglalási, rendelési rendszereket építek kis- és középvállalkozásoknak. Nincs alvállalkozó, nincs projektmenedzser: ==akitől kérdezel, az építi meg==, és fél év múlva is ugyanő veszi fel a telefont.',
    en: 'I am Máté Rizmajer, from Inárcs. I build websites and booking and ordering systems for small and medium businesses. No subcontractor, no project manager: ==the person you ask is the person who builds it==, and the same person picks up the phone six months later.',
  },
  promises: [
    {
      title: { hu: 'Válaszolok', en: 'I answer' },
      text: { hu: 'Egy munkanapon belül, akkor is, ha végül nem én leszek a jó választás.', en: 'Within one working day, even when I turn out not to be the right choice.' },
    },
    {
      title: { hu: 'Megmondom az árat', en: 'I name the price' },
      text: { hu: 'Írásban és tételesen, mielőtt bármit elkezdek. Utólag nem jön hozzá semmi.', en: 'In writing and itemised, before I start anything. Nothing gets added later.' },
    },
    {
      title: { hu: 'Nem tűnök el', en: 'I do not disappear' },
      text: { hu: 'A leadás után is elérsz, a kód és a domain pedig a tiéd marad.', en: 'You can still reach me after handover, and the code and the domain stay yours.' },
    },
  ],
  photoAlt: {
    hu: 'Rizmajer Máté naplementében, egy sziklán ülve',
    en: 'Rizmajer Máté at sunset, sitting on a rock',
  },
}

export default function About() {
  const locale = useLocale()

  return (
    <section id="rolam" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
        {/* Full colour and bigger: the grey filter made the one personal
            image on the page look like stock. */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-4xl border border-divider shadow-e3 lg:max-w-none">
            <img src={portraitSunset} alt={t(COPY.photoAlt, locale)} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            <span className="text-primary-dark">{t(COPY.headingLead, locale)}</span> <span className="font-semibold">{t(COPY.headingAccent, locale)}</span>.
          </h2>
          <p className="mt-6 max-w-prose text-muted text-lg leading-relaxed">
            <Hl text={t(COPY.intro, locale)} />
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {COPY.promises.map((p) => (
              <li key={p.title.hu} className="rounded-2xl border border-divider bg-surface p-5">
                <p className="font-display font-bold text-lg text-primary-dark">{t(p.title, locale)}</p>
                <p className="mt-2 text-sm text-ink/80 leading-relaxed">{t(p.text, locale)}</p>
              </li>
            ))}
          </ul>

          {/* The direct line, right where the promise to answer is made. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center gap-2.5 font-display font-semibold text-xl text-ink hover:text-primary-dark">
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
              {CONTACT_PHONE}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center gap-2.5 font-display font-semibold text-xl text-ink hover:text-primary-dark">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={t(label)}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="lift-on-hover inline-flex min-h-11 items-center gap-2 rounded-full border border-divider bg-surface px-5 text-sm font-medium text-ink transition-colors duration-300 hover:border-primary/60 hover:text-primary-dark"
              >
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {t(label)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
