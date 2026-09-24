import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { SERVICE_GROUPS, priceLabel, isDiscounted, saleHuf, LAUNCH_OFFER } from '../data/services'
import { CALC_SERVICES, addonsFor, estimate, PAGES, pagesApply } from '../data/calculator'
import { forint, priceEn } from '../data/fx'
import { t } from '../i18n/t'

const COPY = {
  title: { hu: 'Mennyibe kerülne nekem?', en: 'What would mine cost?' },
  intro: {
    hu: 'Három lépés, és látod az induló árat. A becslés a kiírt árakból számol; a végleges árat az első beszélgetés után írásban kapod.',
    en: 'Three steps and you see the starting price. The estimate works from the published prices; the final one comes in writing after our first conversation.',
  },
  step1: { hu: '1. lépés', en: 'Step 1' },
  step2: { hu: '2. lépés', en: 'Step 2' },
  step3: { hu: '3. lépés', en: 'Step 3' },
  service: { hu: 'Mire van szükséged?', en: 'What do you need?' },
  extras: { hu: 'Mi kell még?', en: 'What else do you need?' },
  none: { hu: 'Ehhez nincs választható kiegészítő.', en: 'There are no extras for this one.' },
  pages: { hu: 'Hány aloldal kell?', en: 'How many pages?' },
  pagesNote: {
    hu: `${PAGES.included} oldal benne van az árban, minden további +${forint(PAGES.perPageHuf)}.`,
    en: `${PAGES.included} pages are in the price, each further one +${priceEn(PAGES.perPageHuf)}.`,
  },
  result: { hu: 'Becsült induló ár', en: 'Estimated starting price' },
  cta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  estimateWord: { hu: 'becslés', en: 'estimate' },
  pagesWord: { hu: 'oldal', en: 'pages' },
}

const fmt = (huf) => ({ hu: forint(huf), en: priceEn(huf) })

/* The price rolls to its new value instead of jumping, so a toggle visibly
   does something to the number (the sliding-number idea from
   animate-ui.com). 450ms, ease-out; reduced motion gets the new value at
   once. */
function useRollingNumber(target) {
  const [shown, setShown] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      from.current = target
      setShown(target)
      return undefined
    }
    const start = performance.now()
    const a = from.current
    let raf = 0
    const tick = (now) => {
      const p = Math.min((now - start) / 450, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setShown(Math.round((a + (target - a) * eased) / 1000) * 1000)
      if (p < 1) raf = requestAnimationFrame(tick)
      else from.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      from.current = target
    }
  }, [target])
  return shown
}

const StepPill = ({ children }) => (
  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">{children}</span>
)

/* Three numbered steps, a switch per extra, a page slider where pages are
   what the price scales with, and a result that rolls. Ideas taken from
   the references Máté sent on 2026-09-24 (usage slider, multi-step wizard,
   sliding number); cursor-driven effects from the same set were left out,
   as PRODUCT.md rules them out. */
export default function PriceCalculator({ locale, onQuote }) {
  const [serviceId, setServiceId] = useState(CALC_SERVICES[0].id)
  const [picked, setPicked] = useState([])
  const [pages, setPages] = useState(PAGES.included)
  const service = CALC_SERVICES.find((s) => s.id === serviceId)
  const addons = addonsFor(serviceId)
  const withPages = pagesApply(serviceId)
  const total = estimate(serviceId, picked, pages)
  const discounted = isDiscounted(service)
  const finalHuf = discounted ? saleHuf(total) : total
  const rolling = useRollingNumber(finalHuf)
  const chosen = addons.filter((a) => picked.includes(a.id))
  const extraPages = withPages && pages > PAGES.included

  function choose(id) {
    setServiceId(id)
    setPicked((p) => p.filter((a) => addonsFor(id).some((x) => x.id === a)))
  }
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  /* What lands in the enquiry: the offer, the extras, pages and the
     estimate, so the first reply starts from the number the visitor saw. */
  function quoteName() {
    const line = (loc) => {
      const parts = chosen.map((a) => t(a.label, loc))
      if (extraPages) parts.push(`${pages} ${t(COPY.pagesWord, loc)}`)
      const price = t(priceLabel({ priceHuf: finalHuf }), loc)
      return `${t(service.name, loc)}${parts.length ? ` + ${parts.join(', ')}` : ''} (${t(COPY.estimateWord, loc)}: ${price})`
    }
    return { hu: line('hu'), en: line('en') }
  }

  return (
    <div className="mt-10 card-invert border border-divider rounded-4xl p-6 sm:p-8 shadow-e2 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div>
        <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.title, locale)}</h3>
        <p className="text-muted text-sm mt-2 leading-relaxed max-w-2xl">{t(COPY.intro, locale)}</p>

        <div className="mt-7">
          <StepPill>{t(COPY.step1, locale)}</StepPill>
          <label htmlFor="calc-service" className="block mt-3 text-sm font-semibold text-ink">
            {t(COPY.service, locale)}
          </label>
          <select
            id="calc-service"
            value={serviceId}
            onChange={(e) => choose(e.target.value)}
            className="mt-2 w-full sm:max-w-md rounded-2xl border border-divider bg-background text-ink px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-primary"
          >
            {SERVICE_GROUPS.map((g) => {
              const items = CALC_SERVICES.filter((s) => s.group === g.id)
              if (!items.length) return null
              return (
                <optgroup key={g.id} label={t(g.title, locale)}>
                  {items.map((s) => (
                    <option key={s.id} value={s.id}>
                      {t(s.name, locale)}
                    </option>
                  ))}
                </optgroup>
              )
            })}
          </select>
        </div>

        <div className="mt-7">
          <StepPill>{t(COPY.step2, locale)}</StepPill>
          <p className="mt-3 text-sm font-semibold text-ink">{t(COPY.extras, locale)}</p>
          {addons.length === 0 && !withPages ? (
            <p className="text-sm text-muted mt-2">{t(COPY.none, locale)}</p>
          ) : (
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {addons.map((a) => {
                const on = picked.includes(a.id)
                return (
                  <button
                    key={a.id}
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => toggle(a.id)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm text-ink transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary ${
                      on ? 'border-primary bg-primary/10' : 'border-divider hover:border-primary/60'
                    }`}
                  >
                    {/* Position, not colour alone, carries the state; and
                        aria-checked says it to a screen reader. */}
                    <span
                      aria-hidden="true"
                      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${on ? 'bg-primary' : 'bg-divider'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          on ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </span>
                    <span className="flex-1">{t(a.label, locale)}</span>
                    <span className="text-muted text-[13px] whitespace-nowrap">
                      {a.percent ? `+${a.percent}%` : `+${t(fmt(a.flatHuf), locale)}`}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {withPages && (
            <div className="mt-5 max-w-md">
              <div className="flex items-baseline justify-between">
                <label htmlFor="calc-pages" className="text-sm font-semibold text-ink">
                  {t(COPY.pages, locale)}
                </label>
                <span className="font-display font-semibold text-ink tabular-nums">{pages}</span>
              </div>
              <input
                id="calc-pages"
                type="range"
                min={1}
                max={PAGES.max}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="mt-2 w-full accent-[rgb(var(--color-primary))]"
              />
              <p className="text-[13px] text-muted mt-1">{t(COPY.pagesNote, locale)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-end rounded-3xl bg-primary/10 p-6">
        <div>
          <StepPill>{t(COPY.step3, locale)}</StepPill>
        </div>
        <p className="text-sm text-muted mt-3">{t(COPY.result, locale)}</p>
        {discounted && (
          <p className="text-sm text-muted mt-1">
            <s>{t(priceLabel({ priceHuf: total }), locale)}</s>
          </p>
        )}
        <p className="flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="font-display font-extrabold text-[1.75rem] leading-tight whitespace-nowrap text-ink tabular-nums">
            {t(priceLabel({ priceHuf: rolling }), locale)}
          </span>
          {discounted && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2 py-0.5 rounded-full">
              −{LAUNCH_OFFER.percent}%
            </span>
          )}
        </p>
        {service.timeline && <p className="text-[13px] text-muted mt-1">{t(service.timeline, locale)}</p>}
        {(chosen.length > 0 || extraPages) && (
          <ul className="mt-4 space-y-1.5">
            {chosen.map((a) => (
              <li key={a.id} className="flex gap-2 text-[13px] text-ink/90">
                <Check className="h-3.5 w-3.5 mt-[3px] shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                {t(a.label, locale)}
              </li>
            ))}
            {extraPages && (
              <li className="flex gap-2 text-[13px] text-ink/90">
                <Check className="h-3.5 w-3.5 mt-[3px] shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                {pages} {t(COPY.pagesWord, locale)}
              </li>
            )}
          </ul>
        )}
        <a
          href="#kapcsolat"
          onClick={() => onQuote(quoteName())}
          className="mt-6 flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors duration-300"
        >
          {t(COPY.cta, locale)}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
