import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import Field from '../components/Field'

/* The landing page for paid ads (Meta, local radius around Inárcs).
   ---------------------------------------------------------------------
   One offer, one form, no navbar: an ad visitor who lands here came for the
   free review, and every link off the page is a way to lose them before the
   form. The home page is one "back" link away for anyone who wants the proof.

   Hungarian-only, like the legal pages: the ads run in Hungarian to Hungarian
   businesses, and an /en twin would be a page nobody is sent to.

   Same Formspree form as the home page, told apart by `_subject` and the
   `tipus` field. `forras` carries the utm_source/utm_campaign of the ad link,
   so every submission says which ad it came from — that and Cloudflare Web
   Analytics are the whole measurement, no pixel and so no cookie banner. */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqgvjbv'

/* Read on submit rather than on mount: the page is prerendered, so there is
   no URL at build time, and reading late costs nothing. */
function adSource() {
  const params = new URLSearchParams(window.location.search)
  const parts = ['utm_source', 'utm_campaign', 'utm_content'].map((k) => params.get(k)).filter(Boolean)
  return parts.length ? parts.join(' / ') : 'kozvetlen'
}

const CHECKS = [
  {
    title: 'Telefonon',
    body: 'Gyorsan betölt-e, olvasható-e hunyorgás nélkül, és egy érintéssel hívható-e a számod. A vevőid többsége innen néz meg.',
  },
  {
    title: 'A Google-ben',
    body: 'Mit lát az, aki a szakmádra és a településedre keres: megjelensz-e, és mit ír rólad a találat meg a térkép.',
  },
  {
    title: 'Az ajánlatkérésnél',
    body: 'Hol akad el az, aki foglalna, rendelne vagy ajánlatot kérne. Működnek-e az űrlapok, a linkek és az e-mail cím.',
  },
]

export default function Atvilagitas() {
  const [form, setForm] = useState({ name: '', email: '', website: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const honeypotRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !consent) return
    if (honeypotRef.current?.value) return // bot trap — silently drop
    setStatus('sending')
    try {
      const data = new FormData()
      data.append('_subject', `Ingyenes átvilágítás: ${form.website || 'nincs weboldala'}`)
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
    <main className="min-h-screen bg-background text-ink font-body px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="flex w-fit items-center gap-2 py-3 text-sm font-medium text-primary-dark lift-on-hover mb-7">
          <ArrowLeft className="h-4 w-4" /> Vissza a főoldalra
        </Link>

        <h1 className="font-display font-extrabold text-4xl max-[380px]:text-3xl sm:text-5xl text-ink leading-[1.05] tracking-tight">
          Ingyenes weboldal-átvilágítás
        </h1>
        <p className="text-muted text-lg mt-6 leading-relaxed">
          Megnézem a vállalkozásod weboldalát telefonon és gépen, és két munkanapon belül leírom
          e-mailben, mi az, ami ma vevőt veszít neked. Ingyen, kötelezettség nélkül.
        </p>

        <h2 className="font-display font-bold text-2xl text-ink mt-14">Mit nézek meg</h2>
        <ul className="mt-6 space-y-5">
          {CHECKS.map((c) => (
            <li key={c.title} className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary-dark mt-0.5" aria-hidden="true" />
              <p className="text-muted leading-relaxed">
                <strong className="text-ink font-semibold">{c.title}:</strong> {c.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-muted leading-relaxed mt-6">
          A végén kapsz egy rövid listát: mi a hiba, miért számít, és mi a javítás. Ha egy része
          házon belül megoldható, azt is megírom.
        </p>

        <h2 className="font-display font-bold text-2xl text-ink mt-14">Miért ingyen?</h2>
        <p className="text-muted leading-relaxed mt-4">
          Mert így ismersz meg, kockázat nélkül. Ha a lista alapján szeretnéd, hogy én javítsam ki,
          adok rá fix árat. Ha nem kéred, ennyi volt: nem foglak hívogatni, és nem kerülsz
          hírlevél-listára.
        </p>
        <p className="text-muted leading-relaxed mt-4">
          <strong className="text-ink font-semibold">Nincs még weboldalad?</strong> Akkor hagyd üresen
          a mezőt, és írd meg, mivel foglalkozol. Leírom, mi kellene egy első oldalra, és mennyibe
          kerülne.
        </p>

        <form onSubmit={handleSubmit} className="card-invert border border-divider rounded-5xl p-7 sm:p-10 shadow-e3 mt-14">
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
                Hiba történt a küldés során. Próbáld újra, vagy írj a{' '}
                <a href="mailto:info@rizmajerdev.com" className="underline font-medium">info@rizmajerdev.com</a> címre.
              </p>
            </div>
          )}
          {status !== 'sent' ? (
            <>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field name="name" label="Neved" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field name="email" label="E-mail címed" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field
                  name="website"
                  label="A weboldalad címe"
                  /* text, not url: type=url refuses "pelda.hu" without https://,
                     which is how almost everyone types an address. */
                  type="text"
                  value={form.website}
                  onChange={(v) => setForm({ ...form, website: v })}
                  className="sm:col-span-2"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80 mb-2 block">
                  Mivel foglalkozol? (opcionális)
                </label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Pl. fodrászat Dabason, a vendégek telefonon foglalnak"
                  className="input-edge w-full bg-background rounded-2xl px-4 py-3.5 text-ink placeholder-ink/55 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                />
              </div>
              <div className="mt-6 flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="input-edge mt-0.5 h-5 w-5 shrink-0 rounded-md bg-background accent-primary focus:ring-4 focus:ring-primary/15 outline-none"
                />
                <label htmlFor="consent" className="text-sm text-muted leading-relaxed">
                  Hozzájárulok, hogy a megadott adataimat az átvilágítás elkészítése és elküldése céljából kezeld.{' '}
                  <Link to="/adatvedelem" className="text-primary-dark underline underline-offset-2">
                    Adatkezelési tájékoztató
                  </Link>
                </label>
              </div>
              <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-muted">A *-gal jelölt mezők kötelezőek.</p>
                <button
                  type="submit"
                  disabled={status === 'sending' || !consent}
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Küldés...' : 'Kérem az átvilágítást'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div role="status" className="text-center py-12">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary-dark" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">Megkaptam, köszönöm</h2>
              <p className="text-muted max-w-md mx-auto">
                Két munkanapon belül küldöm az átvilágítást a megadott e-mail címre.
              </p>
            </div>
          )}
        </form>

        <p className="text-sm text-muted leading-relaxed mt-10">
          Rizmajer Máté, webfejlesztő, Inárcs. Kérdésed van?{' '}
          <a href="tel:+36301314353" className="text-primary-dark underline underline-offset-2">+36 30 13 14 353</a>
          {' · '}
          <a href="mailto:info@rizmajerdev.com" className="text-primary-dark underline underline-offset-2">info@rizmajerdev.com</a>
        </p>
      </div>
    </main>
  )
}
