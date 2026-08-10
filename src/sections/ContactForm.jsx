import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertCircle, CheckCircle2, Upload, Mail, MapPin, Clock, Phone } from 'lucide-react'
import Field from '../components/Field'
import { CONTACT_PHONE } from '../data/nav'
import { useInView } from '../motion/useInView'
import { Magnetic } from '../motion/Magnetic'

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqgvjbv'

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB per file
const MAX_FILES = 5

/* Mirrors the `accept` attribute on the file input, because that attribute
   only filters the picker dialog. The drop zone below hands
   `e.dataTransfer.files` straight to handleFiles, so dragging a file in
   bypassed `accept` entirely and only the size check applied — any file type
   at all could be attached and forwarded.

   Worth being honest about what this is: a client-side control, and the MIME
   type is the browser's guess from the extension. It is not a security
   boundary — Formspree and the mail client are. It stops the accidental and
   the casual, and it makes the form enforce the rule it already advertised. */
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const isAllowedType = (file) => file.type.startsWith('image/') || ALLOWED_TYPES.includes(file.type)

export default function ContactForm() {
  const [sectionRef, visible] = useInView(0.1)
  const [form, setForm] = useState({ name: '', email: '', company: '', projectType: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [dragging, setDragging] = useState(false)
  const [consent, setConsent] = useState(false)
  const [fileNotice, setFileNotice] = useState('')
  const honeypotRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message || !consent) return
    if (honeypotRef.current?.value) return // bot trap — silently drop
    setStatus('sending')
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('company', form.company)
      data.append('projectType', form.projectType)
      data.append('message', form.message)
      files.forEach((f) => data.append('attachments', f))

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

  /* Rejections used to be silent: an oversized file, and now a disallowed one,
     was filtered out and nothing said so, while the chip list showed only what
     survived. Someone attaching a 20MB PDF watched it vanish and submitted
     believing it was on the message. The same went for the sixth file, which
     `.slice` dropped without a word. Say what was refused and why. */
  const handleFiles = (newFiles) => {
    const incoming = Array.from(newFiles)
    const tooBig = incoming.filter((f) => f.size > MAX_FILE_SIZE)
    const wrongType = incoming.filter((f) => f.size <= MAX_FILE_SIZE && !isAllowedType(f))
    const accepted = incoming.filter((f) => f.size <= MAX_FILE_SIZE && isAllowedType(f))

    let overflow = 0
    setFiles((prev) => {
      const merged = [...prev, ...accepted]
      overflow = Math.max(0, merged.length - MAX_FILES)
      return merged.slice(0, MAX_FILES)
    })

    const reasons = []
    if (wrongType.length) reasons.push(`${wrongType.length} fájl típusa nem támogatott (kép, PDF vagy Word megy)`)
    if (tooBig.length) reasons.push(`${tooBig.length} fájl nagyobb 8 MB-nál`)
    if (overflow) reasons.push(`${overflow} fájl nem fért bele az ${MAX_FILES}-ös keretbe`)
    setFileNotice(reasons.length ? `Nem csatoltam: ${reasons.join('; ')}.` : '')
  }

  return (
    <section id="kapcsolat" ref={sectionRef} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              Hogyan segíthetek a <span className="text-primary-dark font-semibold">vállalkozásodnak</span>?
            </h2>
            {/* The response-time promise is stated once, in the contact tile
                below. It used to run here, in that tile, and again under the
                submit button: the same sentence three times inside one
                viewport. */}
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Nem kell kész tervvel érkezned. Elég, ha leírod, mi az, ami ma nehézkesen
              megy, a többit kitaláljuk. Akkor is válaszolok, ha végül nem én leszek
              a jó választás.
            </p>

            <div className="mt-10 space-y-4">
              {/* First tile on purpose: an SME owner deciding on a six-figure
                  job calls before they type. `tel:` so it dials from a phone,
                  where most of the traffic is. Hidden until the number exists. */}
              {CONTACT_PHONE && (
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="lift-on-hover flex items-center gap-4 group">
                  <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                    <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Hívj fel</span>
                    <span className="font-display font-semibold text-ink text-lg">{CONTACT_PHONE}</span>
                  </span>
                </a>
              )}

              <a href="mailto:rizmajermatelewi@gmail.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Írj emailt</span>
                  <span className="font-display font-semibold text-ink text-lg">rizmajermatelewi@gmail.com</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Székhely</span>
                  <span className="font-display font-semibold text-ink text-lg">Magyarország</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Válaszidő</span>
                  <span className="font-display font-semibold text-ink text-lg">24 órán belül</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">Adatkezelés</p>
              <p className="text-sm text-muted leading-relaxed">
                Az adataid biztonságban vannak. Kizárólag a megkeresésed kapcsán veszem fel veled a
                kapcsolatot, harmadik féllel nem osztom meg őket.
              </p>
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="card-invert border border-divider rounded-5xl p-7 sm:p-10 shadow-e3">
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
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-accent-dark/30 bg-accent/10 p-4">
                  <AlertCircle className="h-5 w-5 text-accent-dark shrink-0 mt-0.5" />
                  <p className="text-sm text-accent-dark leading-relaxed">
                    Hiba történt a küldés során. Próbáld újra, vagy írj emailt közvetlenül a{' '}
                    <a href="mailto:rizmajermatelewi@gmail.com" className="underline font-medium">
                      rizmajermatelewi@gmail.com
                    </a>{' '}
                    címre.
                  </p>
                </div>
              )}
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field name="name" label="Neved" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field name="email" label="E-mail címed" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field name="company" label="Cégnév" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field name="projectType" label="Projekt típusa" value={form.projectType} onChange={(v) => setForm({ ...form, projectType: v })} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80 mb-2 block">
                      Üzeneted <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      autoComplete="off"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Meséld el röviden a projekted vagy az ötleted"
                      className="input-edge w-full bg-background rounded-2xl px-4 py-3.5 text-ink placeholder-ink/55 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      handleFiles(e.dataTransfer.files)
                    }}
                    className={`mt-5 border-2 border-dashed rounded-3xl p-6 text-center transition-colors cursor-pointer ${
                      dragging ? 'border-primary bg-primary/5' : 'border-ink/25 hover:border-primary/60'
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      id="file-up"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">
                        Csatolj egy briefet vagy referenciát (opcionális)
                      </p>
                      {/* The limits were enforced but never stated. Someone
                          only found out about them by having a file quietly
                          disappear. */}
                      <p className="text-xs text-muted mt-1">
                        Kattints vagy húzd ide a fájlokat — legfeljebb {MAX_FILES} db, egyenként 8 MB.
                        Kép, PDF vagy Word.
                      </p>
                      {fileNotice && (
                        <p role="status" className="text-xs text-primary-dark font-medium mt-2">
                          {fileNotice}
                        </p>
                      )}
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Explicit consent, not an assurance box off to one side.
                      The form collects a name and an email address from
                      visitors in the EU, so the visitor ticks the box and the
                      policy is one click away at the moment of submission.
                      Not posted as a field: it gates the submit button, and
                      the record of consent is the message itself. */}
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
                      Hozzájárulok, hogy a megadott adataimat a megkeresésem megválaszolása
                      céljából kezeld.{' '}
                      <Link to="/adatvedelem" className="text-primary-dark underline underline-offset-2">
                        Adatkezelési tájékoztató
                      </Link>
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">A *-gal jelölt mezők kötelezőek.</p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === 'sending' || !consent}
                        className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? 'Küldés...' : 'Üzenet küldése'}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Magnetic>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">Köszönöm a megkeresésed</h3>
                  <p className="text-muted max-w-md mx-auto">
                    Hamarosan jelentkezem, hogy megbeszéljük a részleteket.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Closing line, under both columns rather than beside one, so it reads
            as the page signing off instead of as another form label. "Amazing"
            from the brief's English version is the one word this site's voice
            never uses: every other claim on the page is checkable and that one
            is not. It echoes the hero's "helyetted dolgozik" instead, closing
            the loop the first screen opened.

            Full-stack, so not "frontend fejlesztőt" — the visitor who reaches
            this line has just read a page about booking and ordering systems. */}
        <div
          className={`mt-16 sm:mt-20 pt-10 border-t border-divider text-center transition-all duration-1000 ease-out delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
            Fejlesztőt keresel?
          </p>
          <p className="font-display font-semibold text-2xl sm:text-3xl text-primary-dark tracking-tight mt-1">
            Építsünk valamit, ami tényleg dolgozik.
          </p>
        </div>
      </div>
    </section>
  )
}
