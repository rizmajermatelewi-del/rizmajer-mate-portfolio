import { useState } from 'react'
import { useInView } from '../motion/useInView'

/* ----------------------------------------------------------------
   FAQ — the objections an SME actually raises before hiring.
   This matters more now that no prices are published: something has to
   answer "mennyibe kerül" before the visitor reaches the contact form.
---------------------------------------------------------------- */
const QUESTIONS = [
  {
    q: 'Mennyibe kerül egy weboldal?',
    a: 'Az árat a terjedelem ismeretében adom meg, egy rövid egyeztetés után — így nem fizetsz olyanért, amire nincs szükséged. [KITÖLTENDŐ: add meg a tipikus tartományt, pl. „a legtöbb bemutatkozó oldal X és Y között van", hogy a látogató tudjon tájékozódni.]',
  },
  {
    q: 'Mennyi idő alatt készül el?',
    a: 'Egy egyoldalas bemutatkozó jellemzően 1–2 hét, egy egyedi funkciókkal bíró webalkalmazás 3–6 hét. A pontos ütemezést az első egyeztetésen rögzítjük, és tartom is.',
  },
  {
    q: 'Mi történik, ha nem tetszik, amit csinálsz?',
    a: 'Nem a végén látod először. Menet közben folyamatosan megmutatom, hol tart, így a korrekció olcsó marad ahelyett, hogy a leadáskor derülne ki. [KITÖLTENDŐ: hány egyeztetési kör van benne, és mi történik, ha a projekt félbeszakad.]',
  },
  {
    q: 'Ki tartja karban az oldalt utána?',
    a: 'Ahogy megbeszéljük. Az oldalt úgy építem, hogy a tartalmat magad is tudd kezelni, és az átadáskor megmutatom, hogyan. Ha inkább rám bíznád, arra is van lehetőség. [KITÖLTENDŐ: van-e havidíjas karbantartási konstrukció, és mi tartozik bele.]',
  },
  {
    q: 'Kié lesz a kód és a domain?',
    a: 'A tiéd. A forráskódot átadom, a domaint és a tárhelyet a te nevedre regisztráljuk — nem kerülsz függő helyzetbe, és bármikor tovább tudsz lépni máshoz.',
  },
]

export default function Faq() {
  const [ref, visible] = useInView(0.1)
  const [open, setOpen] = useState(0)

  return (
    <section id="gyik" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <div
          className={`mb-14 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Gyakori kérdések</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Amit meg szoktak
            <span className="block font-display font-semibold text-primary-dark">kérdezni.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }}
              className={`card-invert border border-divider rounded-4xl overflow-hidden card-motion shadow-e2 hover:border-primary/60 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="group flex w-full items-center justify-between gap-5 px-6 sm:px-8 py-5 text-left"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-ink">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 font-mono text-lg leading-none text-muted transition-transform duration-300 ease-out group-hover:text-primary-dark ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {/* grid-rows trick: animates to the content's real height
                  without hard-coding a max-height that clips longer answers. */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-muted text-sm sm:text-base leading-relaxed px-6 sm:px-8 pb-6">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
