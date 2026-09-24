import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Boxes, Building2, CalendarCheck, Check, FileText, Globe, MapPin,
  MessageSquare, Mic, Paintbrush, RefreshCw, Rocket, ShoppingCart, Sparkles, Ticket, UtensilsCrossed,
} from 'lucide-react'
import { SERVICE_GROUPS, priceLabel, isDiscounted, saleHuf, LAUNCH_OFFER } from '../data/services'
import {
  CALC_SERVICES, SITE_KINDS, addonsFor, breakdown, PAGES, pagesApply, upkeepFor, perMonth, hostingLabel, paymentSplit, PAYMENT,
} from '../data/calculator'
import { forint, priceEn } from '../data/fx'
import { t } from '../i18n/t'

const COPY = {
  title: { hu: 'Mennyibe kerülne nekem?', en: 'What would mine cost?' },
  intro: {
    hu: 'Három lépés, és látod az árat tételesen. A becslés a kiírt árakból számol; a végleges árat az első beszélgetés után írásban kapod.',
    en: 'Three steps and you see the price line by line. The estimate works from the published prices; the final one comes in writing after our first conversation.',
  },
  steps: [
    { hu: 'Mire van szükséged?', en: 'What do you need?' },
    { hu: 'Mi kell még?', en: 'What else?' },
    { hu: 'Utána', en: 'Afterwards' },
  ],
  step: { hu: 'lépés', en: 'Step' },
  next: { hu: 'Tovább', en: 'Next' },
  back: { hu: 'Vissza', en: 'Back' },
  multi: {
    hu: 'Többet is választhatsz, például weboldalt foglalóval és chatbottal. Weboldal-típusból egyet.',
    en: 'You can pick several, say a site with bookings and a chatbot. One kind of site, though.',
  },
  none: { hu: 'Ehhez nincs választható kiegészítő.', en: 'There are no extras for this one.' },
  pages: { hu: 'Hány aloldal kell?', en: 'How many pages?' },
  pagesNote: {
    hu: `${PAGES.included} oldal benne van az árban, minden további +${forint(PAGES.perPageHuf)}.`,
    en: `${PAGES.included} pages are in the price, each further one +${priceEn(PAGES.perPageHuf)}.`,
  },
  upkeepIntro: {
    hu: 'Kérsz karbantartást az átadás után? Nincs hűségidő, hónapra felmondható.',
    en: 'Do you want upkeep after handover? No minimum term, cancellable monthly.',
  },
  noUpkeep: { hu: 'Most nem kérek', en: 'Not for now' },
  noUpkeepNote: { hu: 'Később bármikor kérheted.', en: 'You can ask for it any time later.' },
  shopUpkeep: {
    hu: 'Webshop karbantartását külön árazom, mert a forgalomtól függ. Az ajánlatban benne lesz.',
    en: 'Upkeep for a shop is priced separately, as it depends on the traffic. It will be in the quote.',
  },
  summary: { hu: 'Összesítő', en: 'Summary' },
  total: { hu: 'Egyszeri ár, becslés', en: 'One-off price, estimate' },
  rounded: { hu: '10 ezerre felfelé kerekítve', en: 'rounded up to 10 000 Ft' },
  discount: { hu: 'Indulási kedvezmény', en: 'Launch discount' },
  firstYear: { hu: 'Első év nálam összesen', en: 'First year, paid to me' },
  payment: { hu: 'Fizetés két részletben', en: 'Paid in two parts' },
  upfront: { hu: 'Induláskor', en: 'When work starts' },
  onHandover: { hu: 'Átadáskor', en: 'On handover' },
  hosting: { hu: 'Domain és tárhely, a szolgáltatónak', en: 'Domain and hosting, paid to the provider' },
  cta: { hu: 'Ajánlatot kérek erre', en: 'Get a quote for this' },
  estimateWord: { hu: 'becslés', en: 'estimate' },
  pagesWord: { hu: 'oldal', en: 'pages' },
}

const ICONS = {
  idopontfoglalo: CalendarCheck,
  rendeles: UtensilsCrossed,
  webshop: ShoppingCart,
  utalvany: Ticket,
  bemutatkozo: Globe,
  landing: Rocket,
  cegoldal: Building2,
  felujitas: Paintbrush,
  atepites: RefreshCw,
  'egyedi-rendszer': Boxes,
  arajanlat: FileText,
  chatbot: MessageSquare,
  hangasszisztens: Mic,
  google: MapPin,
}

const fmt = (huf) => ({ hu: forint(huf), en: priceEn(huf) })
const minus = (huf) => ({ hu: `−${forint(huf)}`, en: `−${priceEn(huf)}` })

/* The price rolls to its new value instead of jumping, so a choice visibly
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

/* A selectable card. The input is a real radio or checkbox, visually
   hidden, so arrow keys, Space and screen readers work without any code;
   the card styles itself from the input's state through :has(). */
function ChoiceCard({ type, name, checked, onChange, children }) {
  return (
    <label
      className={`group relative flex cursor-pointer gap-3 rounded-2xl border p-4 text-sm text-ink transition-[border-color,background-color,box-shadow] duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary ${
        checked ? 'border-primary bg-primary/10 shadow-e1' : 'border-divider hover:border-primary/60 hover:bg-primary/[0.04]'
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
      <span
        aria-hidden="true"
        className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center border transition-colors duration-200 ${
          type === 'radio' ? 'rounded-full' : 'rounded-md'
        } ${checked ? 'border-primary bg-primary text-white' : 'border-divider'}`}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
    </label>
  )
}

/* Three steps with a clickable progress bar, cards instead of a dropdown,
   and a summary that stays in view on wide screens and itemises the
   price. Ideas from the references Máté sent on 2026-09-24 (multi-step
   wizard, usage slider, sliding number, pricing breakdown); the
   cursor-driven effects from the same set were left out, as PRODUCT.md
   rules them out. */
export default function PriceCalculator({ locale, onQuote }) {
  const [step, setStep] = useState(0)
  const [serviceIds, setServiceIds] = useState([CALC_SERVICES[0].id])
  const [picked, setPicked] = useState([])
  const [pages, setPages] = useState(PAGES.included)
  const [upkeepId, setUpkeepId] = useState(null)
  const [groupId, setGroupId] = useState(CALC_SERVICES[0].group)
  const services = serviceIds.map((id) => CALC_SERVICES.find((s) => s.id === id))
  /* The extras specific to the chosen service come first: SMS reminders
     matter more to a booking system than a blog does. */
  const addons = addonsFor(serviceIds).sort((a, b) => a.appliesTo.length - b.appliesTo.length)
  const upkeeps = upkeepFor(serviceIds)
  const upkeep = upkeeps.find((u) => u.id === upkeepId) ?? null
  const withPages = pagesApply(serviceIds)
  const { lines, total } = breakdown(serviceIds, picked, pages)
  const discounted = services.some(isDiscounted)
  const finalHuf = discounted ? saleHuf(total) : total
  const rolling = useRollingNumber(finalHuf)
  const monthlyHuf = upkeep?.priceHuf ?? 0
  const firstYear = useRollingNumber(finalHuf + 12 * monthlyHuf)
  const extraPages = withPages && pages > PAGES.included

  /* Toggles a service. The last one cannot be removed (an empty estimate
     says nothing), and a kind of site replaces any other kind. */
  function toggleService(id) {
    let next
    if (serviceIds.includes(id)) {
      if (serviceIds.length === 1) return
      next = serviceIds.filter((x) => x !== id)
    } else {
      next = [...serviceIds.filter((x) => !(SITE_KINDS.includes(id) && SITE_KINDS.includes(x))), id]
    }
    setServiceIds(next)
    setPicked((p) => p.filter((a) => addonsFor(next).some((x) => x.id === a)))
    if (!upkeepFor(next).length) setUpkeepId(null)
  }
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  /* What lands in the enquiry: the offer, the extras, pages, upkeep and the
     estimate, so the first reply starts from the number the visitor saw. */
  function quoteName() {
    const line = (loc) => {
      const parts = addons.filter((a) => picked.includes(a.id)).map((a) => t(a.label, loc))
      if (extraPages) parts.push(`${pages} ${t(COPY.pagesWord, loc)}`)
      if (upkeep) parts.push(`${t(upkeep.name, loc)} (${t(perMonth(upkeep.priceHuf), loc)})`)
      const price = t(priceLabel({ priceHuf: finalHuf }), loc)
      return `${services.map((s) => t(s.name, loc)).join(' + ')}${parts.length ? ` + ${parts.join(', ')}` : ''} (${t(COPY.estimateWord, loc)}: ${price})`
    }
    return { hu: line('hu'), en: line('en') }
  }

  const stepLabel = (i) => (locale === 'en' ? `${t(COPY.step, locale)} ${i + 1}` : `${i + 1}. ${t(COPY.step, locale)}`)

  return (
    <div className="mt-10 card-invert border border-divider rounded-4xl p-6 sm:p-8 shadow-e2 grid gap-8 lg:grid-cols-[1fr_21rem]">
      <div className="min-w-0">
        <h3 className="font-display font-bold text-xl text-ink tracking-tight">{t(COPY.title, locale)}</h3>
        <p className="text-muted text-sm mt-2 leading-relaxed max-w-2xl">{t(COPY.intro, locale)}</p>

        {/* Progress: each step is a button, so a visitor can go back to
            any step directly; the bar fills to show how far along they are. */}
        <ol className="mt-7 grid grid-cols-3 gap-2">
          {COPY.steps.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={step === i ? 'step' : undefined}
                className="w-full text-left rounded-lg focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="block h-1.5 rounded-full bg-divider overflow-hidden">
                  <span
                    className={`block h-full rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left motion-reduce:transition-none ${
                      i <= step ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </span>
                <span className={`mt-2 block font-mono text-[9px] uppercase tracking-[0.2em] ${i === step ? 'text-primary-dark' : 'text-muted'}`}>
                  {stepLabel(i)}
                </span>
                <span className={`hidden sm:block text-[13px] font-semibold ${i === step ? 'text-ink' : 'text-muted'}`}>{t(s, locale)}</span>
              </button>
            </li>
          ))}
        </ol>

        <fieldset key={step} className="mt-7 motion-safe:animate-step-in min-w-0">
          <legend className="text-base font-semibold text-ink">{t(COPY.steps[step], locale)}</legend>

          {step === 0 && (
            <div className="mt-4">
              <p className="text-[13px] text-muted mb-3">{t(COPY.multi, locale)}</p>
              {/* The groups filter the cards rather than stacking all
                  fourteen; the choice itself survives switching groups. */}
              <div className="flex flex-wrap gap-2">
                {SERVICE_GROUPS.filter((g) => CALC_SERVICES.some((s) => s.group === g.id)).map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    aria-pressed={groupId === g.id}
                    onClick={() => setGroupId(g.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary ${
                      groupId === g.id ? 'border-ink bg-ink text-background' : 'border-divider text-muted hover:text-ink hover:border-primary/60'
                    }`}
                  >
                    {t(g.title, locale)}
                    {serviceIds.some((id) => CALC_SERVICES.find((s) => s.id === id).group === g.id) && (
                      <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
              {SERVICE_GROUPS.filter((g) => g.id === groupId).map((g) => {
                const items = CALC_SERVICES.filter((s) => s.group === g.id)
                return (
                  <div key={g.id} className="motion-safe:animate-step-in">
                    {/* Two columns; an odd last card spans both, so no row
                        ends with a lone card beside a hole. */}
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                      {items.map((s) => {
                        const Icon = ICONS[s.id] ?? Sparkles
                        return (
                          <ChoiceCard key={s.id} type="checkbox" name="calc-service" checked={serviceIds.includes(s.id)} onChange={() => toggleService(s.id)}>
                            <Icon className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                            <span className="pr-6">
                              <span className="block font-semibold leading-snug">{t(s.name, locale)}</span>
                              <span className="block text-[13px] text-muted mt-0.5">{t(priceLabel(s), locale)}</span>
                            </span>
                          </ChoiceCard>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {step === 1 && (
            <div className="mt-4">
              {addons.length === 0 && !withPages ? (
                <p className="text-sm text-muted">{t(COPY.none, locale)}</p>
              ) : (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {addons.map((a) => (
                    <ChoiceCard key={a.id} type="checkbox" name="calc-addon" checked={picked.includes(a.id)} onChange={() => toggle(a.id)}>
                      <span className="pr-6">
                        <span className="block font-semibold leading-snug">{t(a.label, locale)}</span>
                        <span className="block text-[13px] text-muted mt-0.5">
                          {a.percent ? `+${a.percent}%` : `+${t(fmt(a.flatHuf), locale)}`}
                        </span>
                        {a.note && <span className="block text-[12px] text-muted/80 mt-1 leading-snug">{t(a.note, locale)}</span>}
                      </span>
                    </ChoiceCard>
                  ))}
                </div>
              )}

              {withPages && (
                <div className="mt-6 max-w-md rounded-2xl border border-divider p-4">
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
          )}

          {step === 2 && (
            <div className="mt-4">
              {upkeeps.length === 0 ? (
                <p className="text-sm text-muted max-w-xl">{t(COPY.shopUpkeep, locale)}</p>
              ) : (
                <>
                  <p className="text-sm text-muted">{t(COPY.upkeepIntro, locale)}</p>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    <ChoiceCard type="radio" name="calc-upkeep" checked={upkeepId === null} onChange={() => setUpkeepId(null)}>
                      <span className="pr-6">
                        <span className="block font-semibold leading-snug">{t(COPY.noUpkeep, locale)}</span>
                        <span className="block text-[13px] text-muted mt-0.5">{t(COPY.noUpkeepNote, locale)}</span>
                      </span>
                    </ChoiceCard>
                    {upkeeps.map((u) => (
                      <ChoiceCard key={u.id} type="radio" name="calc-upkeep" checked={upkeepId === u.id} onChange={() => setUpkeepId(u.id)}>
                        <span className="pr-6">
                          <span className="block font-semibold leading-snug">{t(u.name, locale)}</span>
                          <span className="block text-[13px] text-ink/90 mt-0.5">{t(perMonth(u.priceHuf), locale)}</span>
                          <span className="block text-[13px] text-muted mt-1 leading-snug">{t(u.timeline, locale)}</span>
                        </span>
                      </ChoiceCard>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </fieldset>

        <div className="mt-6 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-divider px-4 py-2 text-sm font-semibold text-ink hover:border-primary/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{t(COPY.back, locale)}</span>
            </button>
          )}
          {step < COPY.steps.length - 1 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-background hover:opacity-90 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-primary"
            >
              {t(COPY.next, locale)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          {/* On a phone the summary sits below the steps, out of sight, so
              the running total rides along with the buttons. */}
          <span className="ml-auto lg:hidden font-display font-bold text-ink tabular-nums whitespace-nowrap" aria-hidden="true">
            {t(fmt(rolling), locale)}
          </span>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 self-start flex flex-col rounded-3xl bg-primary/10 p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark">{t(COPY.summary, locale)}</p>

        <ul className="mt-4 space-y-2 text-[13px]">
          {lines.map((l) => (
            <li key={l.id} className="flex items-baseline justify-between gap-3">
              <span className={l.kind === 'service' ? 'font-semibold text-ink' : 'text-ink/90'}>{t(l.label, locale)}</span>
              <span className="text-muted tabular-nums whitespace-nowrap">
                {l.kind === 'service' ? t(fmt(l.huf), locale) : `+${t(fmt(l.huf), locale)}`}
              </span>
            </li>
          ))}
          {discounted && (
            <li className="flex items-baseline justify-between gap-3">
              <span className="text-primary-dark font-semibold">
                {t(COPY.discount, locale)} −{LAUNCH_OFFER.percent}%
              </span>
              <span className="text-primary-dark tabular-nums whitespace-nowrap">{t(minus(total - finalHuf), locale)}</span>
            </li>
          )}
        </ul>

        <div className="mt-4 border-t border-divider pt-4">
          <p className="text-[13px] text-muted">{t(COPY.total, locale)}</p>
          {discounted && (
            <p className="text-sm text-muted mt-0.5">
              <s>{t(fmt(total), locale)}</s>
            </p>
          )}
          <p className="flex flex-wrap items-center gap-2" aria-live="polite">
            <span className="font-display font-extrabold text-[1.75rem] leading-tight whitespace-nowrap text-ink tabular-nums">
              {t(fmt(rolling), locale)}
            </span>
            {discounted && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-primary px-2 py-0.5 rounded-full">
                −{LAUNCH_OFFER.percent}%
              </span>
            )}
          </p>
          <p className="text-[12px] text-muted mt-0.5">{t(COPY.rounded, locale)}</p>
          {/* One service has one delivery time; for a combination the honest
              answer comes with the written quote. */}
          {services.length === 1 && services[0].timeline && (
            <p className="text-[13px] text-muted mt-2">{t(services[0].timeline, locale)}</p>
          )}
        </div>

        <div className="mt-4 border-t border-divider pt-4 space-y-1.5 text-[13px]">
          <p className="text-muted">
            {t(COPY.payment, locale)} ({PAYMENT.upfrontPercent}/{100 - PAYMENT.upfrontPercent}%)
          </p>
          {[COPY.upfront, COPY.onHandover].map((label, i) => (
            <p key={i} className="flex items-baseline justify-between gap-3">
              <span className="text-ink/90">{t(label, locale)}</span>
              <span className="text-ink tabular-nums whitespace-nowrap">{t(fmt(paymentSplit(finalHuf)[i]), locale)}</span>
            </p>
          ))}
        </div>

        <div className="mt-4 border-t border-divider pt-4 space-y-1.5 text-[13px]">
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-ink/90">{t(COPY.hosting, locale)}</span>
            <span className="text-muted tabular-nums whitespace-nowrap">{t(hostingLabel, locale)}</span>
          </p>
        </div>

        {upkeep && (
          <div className="mt-4 border-t border-divider pt-4 space-y-1.5 text-[13px]">
            <p className="flex items-baseline justify-between gap-3">
              <span className="text-ink/90">{t(upkeep.name, locale)}</span>
              <span className="text-muted tabular-nums whitespace-nowrap">+{t(perMonth(upkeep.priceHuf), locale)}</span>
            </p>
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-semibold text-ink">{t(COPY.firstYear, locale)}</span>
              <span className="font-semibold text-ink tabular-nums whitespace-nowrap">{t(fmt(firstYear), locale)}</span>
            </p>
          </div>
        )}

        <a
          href="#kapcsolat"
          onClick={() => onQuote(quoteName())}
          className="mt-6 flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors duration-300"
        >
          {t(COPY.cta, locale)}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </aside>
    </div>
  )
}
