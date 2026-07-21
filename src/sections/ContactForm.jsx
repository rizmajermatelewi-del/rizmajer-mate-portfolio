import { useRef, useState } from 'react'
import { ArrowRight, AlertCircle, CheckCircle2, Upload, Mail, MapPin, Clock } from 'lucide-react'
import Field from '../components/Field'
import { useInView } from '../motion/useInView'
import { Magnetic } from '../motion/Magnetic'

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqgvjbv'

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB per file

export default function ContactForm() {
  const [sectionRef, visible] = useInView(0.1)
  const [form, setForm] = useState({ name: '', email: '', company: '', projectType: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [dragging, setDragging] = useState(false)
  const honeypotRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
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

  const handleFiles = (newFiles) => {
    const accepted = Array.from(newFiles).filter((f) => f.size <= MAX_FILE_SIZE)
    setFiles((prev) => [...prev, ...accepted].slice(0, 5))
  }

  return (
    <section id="kapcsolat" ref={sectionRef} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ Kapcsolat</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Hogyan segíthetek
              <span className="block font-display font-semibold text-primary-light">a vállalkozásodnak?</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Írj pár sort arról, mit szeretnél megépíteni — elolvasom, és 24 órán belül
              válaszolok, akkor is, ha csak kérdésed van.
            </p>

            <div className="mt-10 space-y-4">
              <a href="mailto:rizmajermatelewi@gmail.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-deep" />
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
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-light mb-2">Adatkezelés</p>
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
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
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
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">Üzeneted *</label>
                    <textarea
                      id="message"
                      name="message"
                      autoComplete="off"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Meséld el röviden a projekted vagy az ötleted..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
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
                      dragging ? 'border-primary bg-primary/5' : 'border-divider hover:border-primary/50'
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
                      <Upload className="h-6 w-6 mx-auto text-primary-light mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">
                        Csatolj egy briefet vagy referenciát (opcionális)
                      </p>
                      <p className="text-xs text-muted mt-1">Kattints vagy húzd ide a fájlokat (max 5 fájl)</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-light text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">24 órán belül válaszolok. A *-gal jelölt mezők kötelezőek.</p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
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
                    <CheckCircle2 className="h-8 w-8 text-primary-light" />
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
      </div>
    </section>
  )
}
