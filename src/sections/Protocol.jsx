import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
/* The two WebP files that used to be imported here are deleted, not merely
   unreferenced — 78 kB of stock photography that the CSP notes below were
   written to accommodate. Both notes are kept because they still describe a
   real constraint the next image would hit:

   img-src in vercel.json is 'self' data:, so an images.unsplash.com URL is
   blocked in production and only there, since `vite preview` does not apply
   vercel.json headers. Any future photograph has to be imported, not
   hotlinked. WebP needs no <picture> fallback at build.target
   chrome87/edge88/firefox78/safari14. */
import StepVisual from '../components/StepVisual'
import { PROTOCOL_STEPS } from '../data/protocol'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'

/* Split at the accent span rather than kept as one string with markup in it,
   so a translator can decide which word carries the emphasis instead of
   inheriting whichever one lands in that position. */
const COPY = {
  headingLead: { hu: 'Három lépés, semmi', en: 'Three steps, no' },
  headingAccent: { hu: 'meglepetés', en: 'surprises' },
}

/* Positional, like the steps themselves. PROTOCOL_STEPS is an ordered list of
   exactly three and protocol.test.js holds it to that, so an index is enough
   and the data file stays free of presentation. */
const STEP_VARIANTS = ['planning', 'build', 'handover']

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
export default function Protocol() {
  const containerRef = useRef(null)
  const locale = useLocale()

  useEffect(() => {
    /* matchMedia rather than a plain context, for two reasons. The recede is
       tuned differently on a phone than on a desktop, and GSAP re-evaluates
       and cleans up the right one on rotation or resize by itself. It also
       gives prefers-reduced-motion a branch, which this section never had:
       every other animation on the site honours the flag, and a scrubbed blur
       and scale is exactly the kind of thing it exists for. */
    const mm = gsap.matchMedia(containerRef)

    mm.add(
      {
        small: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        large: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (self) => {
        const { small, reduced } = self.conditions

        /* Reduced motion still gets the progress rail filled, so the section
           does not look like it failed to load — it just does not move. */
        if (reduced) {
          gsap.set('.progress-rail', { scaleY: 1 })
          return
        }

        /* No blur below lg. It is the most expensive filter on a phone GPU,
           it is doing the least there — a card 390px wide reads as muddy
           rather than distant — and the stack is a single column anyway, so
           depth is carried by scale and the card edge. The colour barely
           moves on mobile for the same reason: at this size a desaturated
           card just looks broken. */
        const recede = small
          ? { from: 'saturate(1)', to: 'saturate(0.94)', scale: 0.96, opacity: 0.85 }
          : { from: 'blur(0px) saturate(1)', to: 'blur(4px) saturate(0.88)', scale: 0.92, opacity: 0.7 }

        const cards = gsap.utils.toArray('.protocol-card')
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return
          /* fromTo, not to, and the `from` matters more than anything else.

             This was a `gsap.to` whose target filter was `blur() saturate()`
             while the card's computed filter was `none`. GSAP parses `none`
             by filling the missing functions with zero, so saturate tweened
             from 0 — fully greyscale — upward. The colour did not drain as
             the card receded; it was gone on the first pixel of scroll and
             crept back. Measured before the fix: saturate(0.0002) a fifth of
             the way through, still 0.057 near the end.

             Naming the start explicitly is the fix, because 1 is the neutral
             saturation and GSAP had no way to infer it.

             `power2.in` holds the card near full strength through the first
             half and does the work late, once the next card is actually
             covering it, rather than linearly from the moment it sticks. */
          gsap.fromTo(
            card,
            { filter: recede.from },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top top+=100',
                endTrigger: cards[cards.length - 1],
                end: 'top top+=120',
                scrub: 1,
              },
              scale: recede.scale,
              filter: recede.to,
              opacity: recede.opacity,
              ease: 'power2.in',
            },
          )
        })

        gsap.to('.progress-rail', {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        })
      },
    )

    return () => mm.revert()
  }, [])

  /* `meta` is gone. It read "Lépés 1 / Listen" — Hungarian and English in
     one label, on a page that is otherwise entirely Hungarian.

     `image` / `imageAlt` bring back the right-hand panel. It was originally
     three stock "developer at a laptop" shots, then an empty frame after
     those were pulled, and now it is a real slot: give it a file and it
     shows the photograph, leave it empty and it draws a labelled blueprint
     frame instead of pretending. Drop files in src/assets, import them at
     the top of this file, and set the fields.

     Wanted: 01 a real meeting or notes shot, 02 the build in progress on a
     screen, 03 the handover. Anything genuinely yours beats stock here.

     Superseded on 2026-08-17: all three panels are drawn now, by StepVisual.
     There is no `image` field left to fill, so a real photograph means
     restoring the branch, not just dropping a file into src/assets.

     The reasons are kept because each one cost something to learn. Slot 03
     held a phone covered in Facebook, WhatsApp, Instagram, Gmail and Uber
     icons — other companies' trademarks on a site that self-hosts its fonts
     specifically to keep third parties out of the page. Slot 02 held a
     monitor full of WordPress PHP — wp_head(), bloginfo(), a theme's
     get_favicon() — on a site that sells custom development against
     WordPress and answers "WordPress vagy egyedi fejlesztés?" in its own
     FAQ; pulling it left the slot advertising its own gap with a
     "Kép hamarosan" frame. Slot 01 was the notebook, pencil and glasses
     flat-lay that ships with every freelance template.

     A photograph of your own work still beats a drawing. This is what
     stands in until there is one. */
  /* Resolved here rather than at each of the three render sites below, so the
     JSX stays free of t() and there is one place to look for the locale. */
  const steps = PROTOCOL_STEPS.map((step, i) => ({
    title: t(step.title, locale),
    tagline: t(step.tagline, locale),
    text: t(step.text, locale),
    variant: STEP_VARIANTS[i],
  }))

  return (
    <section id="folyamat" ref={containerRef} className="relative px-4 sm:px-6 py-14 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-divider">
        <div className="progress-rail h-full w-full origin-top scale-y-0 bg-primary" />
      </div>

      <div className="max-w-7xl mx-auto mb-10 sm:mb-16 px-2 sm:px-10">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight max-w-3xl">
          {t(COPY.headingLead, locale)}{' '}
          <span className="text-primary-dark font-semibold">{t(COPY.headingAccent, locale)}</span>.
        </h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-20 sm:top-28 mx-auto max-w-6xl card-invert border border-divider rounded-6xl overflow-hidden shadow-e3"
          >
            {/* Text left, visual right. The panel is full-bleed to the card
                edge, so the padding lives on the text column rather than on
                the grid, and the image runs all the way into the corner
                radius instead of floating in a padded box. */}
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16">
                {/* The 6-8rem watermark numeral is gone. It was the only thing
                    keeping Lighthouse accessibility off 100, at
                    text-primary/15 — and clearing the 3:1 large-text bar would
                    have meant roughly tripling its opacity, turning a faint
                    watermark into a dominant element. Design principle 6
                    settles it rather than the contrast rule: decorative
                    numerals are the visual inflation this brand is positioned
                    against, and the order of the steps already carries the
                    sequence. */}
                <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight mt-6">
                  {step.title}
                </h3>
                <p className="font-display font-medium text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg border-t border-divider mt-8 pt-6">
                  {step.text}
                </p>
              </div>

              {/* One step lighter than the card, not the same fill. At bg-deep
                  the panel was invisible: an empty area the same colour as
                  everything around it, so the dashed frame looked like a
                  stray border rather than a slot waiting for a picture. The
                  tonal step is what makes it read as its own surface, which
                  is also how the card steps in projects.js work. */}
              {/* 240px on a 390px-wide phone was 40% of the card given over to
                  a decorative photograph, which pushed the step's actual text
                  most of a screen further down. 150px still reads as a
                  photograph and gives the text back the room. */}
              <div
                className="lg:col-span-5 relative overflow-hidden min-h-[150px] sm:min-h-[210px] lg:min-h-full"
                style={{ backgroundColor: 'rgb(var(--color-card-1))' }}
              >
                <StepVisual variant={step.variant} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
