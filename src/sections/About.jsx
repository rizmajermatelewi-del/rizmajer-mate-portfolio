import { Phone, Mail, PhoneCall, ReceiptText, Handshake, BookOpen } from 'lucide-react'
import portraitSunset from '../assets/portrait-sunset.webp'
import { SOCIAL_LINKS } from '../data/nav'
import { CONTACT_PHONE, CONTACT_EMAIL } from '../data/contact'
import { t } from '../i18n/t'
import { useLocale } from '../i18n/useLocale'
import Hl from '../components/Hl'

/* ----------------------------------------------------------------
   About: who you will talk to (2026-11-11, Máté). Longer since the same
   day; titles invite rather than provoke (Máté: respectful, marketing),
   each card a benefit the client gets, with the detail under it.
---------------------------------------------------------------- */
const COPY = {
  headingLead: { hu: 'Személyesen,', en: 'In person,' },
  headingAccent: { hu: 'az első hívástól az átadásig', en: 'from the first call to handover' },
  paragraphs: [
    {
      hu: 'Rizmajer Máté vagyok, Inárcsról. Weboldalakat és foglalási, rendelési rendszereket építek kis- és középvállalkozásoknak Pest megyében és Budapesten. Nincs alvállalkozó, nincs projektmenedzser: ==akitől kérdezel, az építi meg==, és fél év múlva is ugyanő veszi fel a telefont.',
      en: 'I am Rizmajer Máté, from Inárcs. I build websites and booking and ordering systems for small and medium businesses in Pest County and Budapest. No subcontractor, no project manager: ==the person you ask is the person who builds it==, and the same person picks up the phone six months later.',
    },
    {
      hu: 'A legtöbb megkeresés ugyanúgy kezdődik: a foglalás, a rendelés vagy az ügyfelek nyilvántartása telefonon, füzetben és táblázatban megy, és ez ==minden nap elvisz egy órát==. Ilyenkor nem szebb weboldal kell, hanem egy folyamat, ami magától működik, mobilon is kényelmes, és utána te is tudod kezelni.',
      en: 'Most enquiries start the same way: bookings, orders or customer records live on the phone, in a notebook and in a spreadsheet, and that ==costs an hour every day==. What helps then is not a prettier website but a process that runs on its own, works well on a phone, and that you can handle yourself afterwards.',
    },
    {
      hu: 'Szoftverfejlesztőnek tanultam, de a szakmát éles projekteken tanultam meg. Ezért mindent ==előbb kipróbálhatsz==: a bemutatóim élnek, a kódjuk nyilvános, és az első egyeztetésen megmondom, ha valamire nincs szükséged.',
      en: 'I trained as a software developer, but I learned the trade on real projects. That is why ==you can try everything first==: my demos are live, their code is public, and at the first meeting I tell you if there is something you do not need.',
    },
  ],
  /* A benefit as the title, the concrete promise underneath. */
  cards: [
    {
      Icon: PhoneCall,
      title: { hu: 'Mindig elérsz', en: 'You can always reach me' },
      text: { hu: 'Nálam egy munkanapon belül válasz jön, akkor is, ha végül nem én leszek a jó választás.', en: 'You get an answer within one working day, even when I turn out not to be the right choice.' },
    },
    {
      Icon: ReceiptText,
      title: { hu: 'Előre tudod az árat', en: 'You know the price up front' },
      text: { hu: 'Az árat írásban, tételesen kapod meg, mielőtt bármit elkezdek. Utólag nem jön hozzá semmi.', en: 'You get the price in writing and itemised before I start anything. Nothing gets added later.' },
    },
    {
      Icon: Handshake,
      title: { hu: 'Az átadás után is számíthatsz rám', en: 'You can count on me after handover' },
      text: { hu: 'A leadás után is elérsz, a kód és a domain pedig a tiéd marad, nem vagy hozzám kötve.', en: 'You can still reach me after handover, and the code and the domain stay yours, so you are not tied to me.' },
    },
    {
      Icon: BookOpen,
      title: { hu: 'Nem kell értened a technikához', en: 'No technical knowledge needed' },
      text: { hu: 'Átadáskor megmutatom, hogyan kezeled, és írásban is megkapod a lépéseket.', en: 'At handover I show you how to run it, and you get the steps in writing too.' },
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
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Full colour and bigger: the grey filter made the one personal
              image on the page look like stock. */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-4xl border border-divider shadow-e3 lg:max-w-none">
              <img src={portraitSunset} alt={t(COPY.photoAlt, locale)} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight [text-wrap:balance]">
              <span className="text-primary-dark">{t(COPY.headingLead, locale)}</span>{' '}
              <span className="font-semibold">{t(COPY.headingAccent, locale)}</span>.
            </h2>
            <div className="mt-6 space-y-4 max-w-prose text-muted text-lg leading-relaxed">
              {COPY.paragraphs.map((p) => (
                <p key={p.hu.slice(0, 24)}>
                  <Hl text={t(p, locale)} />
                </p>
              ))}
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {COPY.cards.map(({ Icon, title, text }) => (
                <li key={title.hu} className="rounded-2xl border border-divider bg-surface p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display font-bold text-lg text-primary-dark">{t(title, locale)}</p>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">{t(text, locale)}</p>
                </li>
              ))}
            </ul>

            {/* The direct line, right under the promise to answer. */}
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
      </div>
    </section>
  )
}
