import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

/* The project card's visual slot.

   This used to draw a fake browser window: three grey dots and a stack of
   placeholder bars, sitting under a headline reading "Valós munka, nem
   mockup". Four fake mockups under a promise of no mockups. Div-built
   product chrome is the clearest tell that a page has nothing real to show,
   and here it was contradicting the copy directly above it.

   So there are two states now and no third. Given an `image`, it renders
   the screenshot. Given nothing, it renders an honest empty frame that says
   what belongs there and does not pretend to be a screenshot of anything.
   The frame is drawn as blueprint ruling, the page's own material: a plan
   for something not built yet, which is what an empty slot is.

   To fill one: drop the file in src/assets, import it in
   src/data/projects.js, and set `image` on that project. Nothing here
   changes. */
/* `slotLabel` used to be a prop with a Hungarian default. Nothing has ever
   passed it, so it was a parameter that existed only to be defaulted — and
   translating it would have meant a caller-supplied string that t() cannot
   check. It reads the locale like every other piece of copy now. */
const COPY = {
  screenshotSoon: { hu: 'Képernyőkép hamarosan', en: 'Screenshot coming' },
}

export default function ProjectMock({ tone, image, alt = '' }) {
  const locale = useLocale()

  if (image) {
    return (
      <div className="relative h-48 w-full overflow-hidden bg-deep">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {/* Keeps the lower edge readable where a screenshot happens to be
            pale, without washing out the image itself. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-deep/70 to-transparent"
        />
      </div>
    )
  }

  return (
    <div
      className="relative h-48 w-full overflow-hidden"
      style={{ background: `linear-gradient(160deg, rgb(var(${tone.from})) 0%, rgb(var(${tone.to})) 100%)` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgb(var(${tone.accent}) / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(var(${tone.accent}) / 0.16) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-4 rounded-2xl border border-dashed"
        style={{ borderColor: `rgb(var(${tone.accent}) / 0.35)` }}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        {/* /45 measured 4.03:1 and 4.35:1 on the two card tones — under 4.5
            on both, and close enough that reading the class tells you nothing.
            /70 clears it at 7.4:1 on the darker of the two. */}
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
          {t(COPY.screenshotSoon, locale)}
        </span>
      </span>
    </div>
  )
}
