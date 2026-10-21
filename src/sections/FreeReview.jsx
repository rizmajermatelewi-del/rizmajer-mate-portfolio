import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertCircle, Check, CheckCircle2 } from 'lucide-react'
import Field from '../components/Field'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'
import { useInView } from '../motion/useInView'

/* The free website review: the cheapest yes on the site.
   ---------------------------------------------------------------------
   Rendered twice from this one file: as a section on the home page, straight
   after the hero, and as the whole of /ingyenes-atvilagitas, the page the
   paid ads point at (no navbar there, so an ad visitor has one thing to do).
   One component so the offer cannot say one thing on the home page and
   another on the ad page.

   Same Formspree form as the contact section, told apart by `_subject` and
   `tipus`. `forras` carries the ad link's utm_* values, so every submission
   says which ad brought it — that plus Cloudflare Web Analytics is the whole
   measurement: no pixel, so no cookie banner.

   Field ids carry an `rv-` prefix because the home page also renders the
   contact form, and both have a name, an email and a message field. */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqgvjbv'

/* Read on submit, not on mount: the page is prerendered, so there is no URL
   at build time. */
function adSource() {
  const params = new URLSearchParams(window.location.search)
  const parts = ['utm_source', 'utm_campaign', 'utm_content'].map((k) => params.get(k)).filter(Boolean)
  return parts.length ? parts.join(' / ') : window.location.pathname
}

const COPY = {
  titleLead: { hu: 'Ingyenes', en: 'A free' },
  titleAccent: { hu: 'weboldal-átvilágítás', en: 'website review' },
  lead: {
    hu: 'Megnézem a vállalkozásod weboldalát telefonon és gépen, és két munkanapon belül leírom e-mailben, mi az, ami ma vevőt veszít neked. Ingyen, kötelezettség nélkül.',
    en: 'I look at your business website on a phone and on a computer, and within two working days I email you what is costing you customers today. Free, no strings attached.',
  },
  checksHeading: { hu: 'Mit nézek meg', en: 'What I check' },
  after: {
    hu: 'A végén kapsz egy rövid listát: mi a hiba, miért számít, és mi a javítás. Ha egy része házon belül megoldható, azt is megírom.',
    en: 'You get a short list: what is wrong, why it matters, and how to fix it. If you can fix part of it yourself, I say so.',
  },
  whyHeading: { hu: 'Miért ingyen?', en: 'Why free?' },
  why: {
    hu: 'Mert így ismersz meg, kockázat nélkül. Ha a lista alapján szeretnéd, hogy én javítsam ki, adok rá fix árat. Ha nem kéred, ennyi volt: nem foglak hívogatni, és nem kerülsz hírlevél-listára.',
    en: 'Because it lets you get to know me at no risk. If you want me to fix what is on the list, I give you a fixed price. If not, that is it: no calls, and you are not added to any newsletter.',
  },
  noSiteLead: { hu: 'Nincs még weboldalad?', en: 'No website yet?' },
  noSite: {
    hu: 'Hagyd üresen a mezőt, és írd meg, mivel foglalkozol. Leírom, mi kellene egy első oldalra, és mennyibe kerülne.',
    en: 'Leave the field empty and tell me what your business does. I will write down what a first site needs and what it would cost.',
  },
  fieldName: { hu: 'Neved', en: 'Your name' },
  fieldEmail: { hu: 'E-mail címed', en: 'Your email address' },
  fieldWebsite: { hu: 'A weboldalad címe', en: 'Your website address' },
  fieldMessage: { hu: 'Mivel foglalkozol? (opcionális)', en: 'What does your business do? (optional)' },
  messagePlaceholder: {
    hu: 'Pl. fodrászat Dabason, a vendégek telefonon foglalnak',
    en: 'E.g. a hair salon in Dabas, clients book by phone',
  },
  consentLead: {
    hu: 'Hozzájárulok, hogy a megadott adataimat az átvilágítás elkészítése és elküldése céljából kezeld.',
    en: 'I consent to my details being used to prepare and send the review.',
  },
  privacyLink: { hu: 'Adatkezelési tájékoztató', en: 'Adatkezelési tájékoztató (in Hungarian)' },
  requiredNote: { hu: 'A *-gal jelölt mezők kötelezőek.', en: 'Fields marked * are required.' },
  sending: { hu: 'Küldés...', en: 'Sending…' },
  submit: { hu: 'Kérem az átvilágítást', en: 'Request my review' },
  sendError: {
    hu: 'Hiba történt a küldés során. Próbáld újra, vagy írj a',
    en: 'Something went wrong while sending. Try again, or email',
  },
  sendErrorTail: { hu: 'címre.', en: '.' },
  thanksHeading: { hu: 'Megkaptam, köszönöm', en: 'Got it, thank you' },
  thanksBody: {
    hu: 'Két munkanapon belül küldöm az átvilágítást a megadott e-mail címre.',
    en: 'You will have the review at that email address within two working days.',
  },
}

const CHECKS = [
  {
    title: { hu: 'Telefonon', en: 'On a phone' },
    body: {
      hu: 'Gyorsan betölt-e, olvasható-e hunyorgás nélkül, és egy érintéssel hívható-e a számod. A vevőid többsége innen néz meg.',
      en: 'Whether it loads fast, reads without squinting, and calls you in one tap. Most of your customers look at you from here.',
    },
  },
  {
    title: { hu: 'A Google-ben', en: 'On Google' },
    body: {
      hu: 'Mit lát az, aki a szakmádra és a településedre keres: megjelensz-e, és mit ír rólad a találat meg a térkép.',
      en: 'What someone searching for your trade and your town sees: whether you show up, and what the result and the map say about you.',
    },
  },
  {
    title: { hu: 'Az ajánlatkérésnél', en: 'At the enquiry' },
    body: {
      hu: 'Hol akad el az, aki foglalna, rendelne vagy ajánlatot kérne. Működnek-e az űrlapok, a linkek és az e-mail cím.',
      en: 'Where someone who wants to book, order or ask for a quote gets stuck. Whether the forms, the links and the email address work.',
    },
  },
]

export default function FreeReview({ standalone = false }) {
  const locale = useLocale()
  const [form, setForm] = useState({ name: '', email: '', website: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const honeypotRef = useRef(null)
  const Heading = standalone ? 'h1' : 'h2'
  const [ref, visible] = useInView(0.1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !consent) return
    if (honeypotRef.current?.value) return // bot trap — silently drop
    setStatus('sending')
    try {
      const data = new FormData()
      // Inbox subject, never shown to the visitor; unaccented so the
      // untranslated-copy scan keeps meaning "copy".
      data.append('_subject', `Ingyenes atvilagitas: ${form.website || 'nincs weboldala'}`)
      data.append('tipus', 'ingyenes-atvilagitas')
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('website', form.website)
      data.append('message', form.message)
      data.append('forras', adSource())
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="atvilagitas"
      ref={ref}
      className={standalone ? '' : 'relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16'}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Heading on the paper, like every sibling section; the offer itself
            on one screen below it. Same two-tone heading as Services and
            Protocol: ink, then the accent at a lighter weight. */}
        <div className="max-w-2xl">
          <Heading className="font-display font-extrabold text-4xl max-[380px]:text-3xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight [text-wrap:balance]">
            {t(COPY.titleLead, locale)}{' '}
            <span className="text-primary-dark font-semibold">{t(COPY.titleAccent, locale)}</span>
          </Heading>
          <p className="text-muted text-lg mt-6 leading-relaxed">{t(COPY.lead, locale)}</p>
        </div>

        {/* One screen holding both halves: what gets checked, and the form
            that asks for it. Not a form card on the paper beside a text
            column: that is the contact section's layout, and two of those on
            one page read as the same section twice. The form sits straight on
            the screen, so there is no card inside a card. */}
        <div className="mt-10 card-invert border border-divider rounded-5xl shadow-e3 grid lg:grid-cols-12 overflow-hidden">
          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-divider">
            <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.checksHeading, locale)}</h3>
            <ul className="mt-6 divide-y divide-divider">
              {CHECKS.map((c) => (
                <li key={c.title.en} className="flex gap-3.5 py-4 first:pt-0">
                  <Check className="h-4 w-4 shrink-0 mt-1 text-primary-dark" strokeWidth={2.5} aria-hidden="true" />
                  <p className="text-sm text-muted leading-relaxed">
                    <span className="block font-semibold text-ink text-base">{t(c.title, locale)}</span>
                    {t(c.body, locale)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted leading-relaxed">{t(COPY.after, locale)}</p>

            <h3 className="font-display font-bold text-xl text-ink tracking-tight mt-10">{t(COPY.whyHeading, locale)}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{t(COPY.why, locale)}</p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              <span className="font-semibold text-ink">{t(COPY.noSiteLead, locale)}</span> {t(COPY.noSite, locale)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative lg:col-span-7 p-7 sm:p-10 lg:p-12">
            <input
              ref={honeypotRef}
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            {status === 'error' && (
              <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-accent-dark/30 bg-accent/10 p-4">
                <AlertCircle className="h-5 w-5 text-accent-dark shrink-0 mt-0.5" />
                <p className="text-sm text-accent-dark leading-relaxed">
                  {t(COPY.sendError, locale)}{' '}
                  <a href="mailto:info@rizmajerdev.com" className="underline font-medium">info@rizmajerdev.com</a>{' '}
                  {t(COPY.sendErrorTail, locale)}
                </p>
              </div>
            )}
            {status !== 'sent' ? (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="name" id="rv-name" label={t(COPY.fieldName, locale)} required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field name="email" id="rv-email" label={t(COPY.fieldEmail, locale)} type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  {/* text, not url: type=url refuses "pelda.hu" without
                      https://, which is how almost everyone types an address. */}
                  <Field
                    name="website"
                    id="rv-website"
                    label={t(COPY.fieldWebsite, locale)}
                    value={form.website}
                    onChange={(v) => setForm({ ...form, website: v })}
                    className="sm:col-span-2"
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="rv-message" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80 mb-2 block">
                    {t(COPY.fieldMessage, locale)}
                  </label>
                  <textarea
                    id="rv-message"
                    name="message"
                    autoComplete="off"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder={t(COPY.messagePlaceholder, locale)}
                    className="input-edge w-full bg-background rounded-2xl px-4 py-3.5 text-ink placeholder-ink/55 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                  />
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <input
                    id="rv-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="input-edge mt-0.5 h-5 w-5 shrink-0 rounded-md bg-background accent-primary focus:ring-4 focus:ring-primary/15 outline-none"
                  />
                  <label htmlFor="rv-consent" className="text-sm text-muted leading-relaxed">
                    {t(COPY.consentLead, locale)}{' '}
                    <Link to="/adatvedelem" className="text-primary-dark underline underline-offset-2">
                      {t(COPY.privacyLink, locale)}
                    </Link>
                  </label>
                </div>
                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-muted">{t(COPY.requiredNote, locale)}</p>
                  <button
                    type="submit"
                    disabled={status === 'sending' || !consent}
                    className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? t(COPY.sending, locale) : t(COPY.submit, locale)}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div role="status" className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-primary-dark" aria-hidden="true" />
                </div>
                <p className="font-display font-bold text-2xl text-ink mb-3">{t(COPY.thanksHeading, locale)}</p>
                <p className="text-muted max-w-md">{t(COPY.thanksBody, locale)}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
