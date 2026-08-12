import { useEffect, useState } from 'react'
import { t } from '../../i18n/t'
import { useLocale } from '../../i18n/useLocale'

/* The weekday initials carry no diacritics, so nothing that scans for
   Hungarian would ever have reported them — a Monday-first "H K Sze Cs P Szo
   V" would simply have sat on the English page reading as noise. They are
   listed as fields for the same reason every other string is: so the decision
   is written down rather than assumed. Both rows start on Monday, which is
   the week the calendar below actually draws. */
const DAYS = [
  { hu: 'H', en: 'M' },
  { hu: 'K', en: 'T' },
  { hu: 'Sze', en: 'W' },
  { hu: 'Cs', en: 'T' },
  { hu: 'P', en: 'F' },
  { hu: 'Szo', en: 'S' },
  { hu: 'V', en: 'S' },
]

const COPY = {
  week: { hu: '14. hét · Július', en: 'Week 14 · July' },
  badge: { hu: 'Foglalás', en: 'Booking' },
  booked: { hu: '✓ Időpont lefoglalva', en: '✓ Appointment booked' },
  prompt: { hu: 'Válassz egy napot', en: 'Pick a day' },
}

/* No drawn cursor. A fake pointer gliding across a fake calendar is the
   clearest "this is a simulation" tell there is, and it fights the real
   pointer the visitor is already moving. The day-tile highlight and the
   button state carry the same sequence on their own. */
export default function BookingScheduler() {
  const locale = useLocale()
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full bg-surface border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{t(COPY.week, locale)}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          {t(COPY.badge, locale)}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] opacity-70">{t(d, locale)}</span>
            <span className="font-display font-semibold text-sm">{idx + 7}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4 ? 'bg-accent text-deep scale-[1.02] shadow-md shadow-accent/30' : 'bg-divider/40 text-muted'
        }`}
      >
        {t(step >= 3 ? COPY.booked : COPY.prompt, locale)}
      </button>
    </div>
  )
}
