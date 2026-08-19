import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Magnetic } from '../motion/Magnetic'
import { useReducedMotion } from '../motion/useReducedMotion'
import HeroVisual from '../components/HeroVisual'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'

const COPY = {
  /* The Hungarian comma is grammar — the "ami" clause requires one. The
     English line carries none, and that is a second draft rather than an
     oversight. The first was "that works, so you do not have to.", which
     says the same thing in more characters than the line has room for: the
     accent span is capped at 6xl so it holds on one row at desktop, and at
     34 characters it wrapped and left "to." alone on a third line. Found by
     opening the built page at 1440px, not by reading the source — the
     Hungarian fits on one row, so no test and nothing in the markup could
     have said otherwise.

     "that does the work for you." is also the nearer reading of "helyetted
     dolgozik": in your stead, rather than merely so-that-you-need-not. The
     stiff uncontracted "do not" goes with it. */
  headlineLead: { hu: 'Weboldal és rendszer,', en: 'A website and a system' },
  headlineAccent: { hu: 'ami helyetted dolgozik.', en: 'that does the work for you.' },
  /* Halved, and pointed at a different question.
     ---------------------------------------------------------------------
     Was: "Kis- és középvállalkozásoknak építek weboldalakat és foglalási
     rendszereket: gyorsan betöltő, mobilon is használható felületeket, amiket
     utána te is tudsz kezelni."

     Three of those clauses are made again further down the page — mobile in
     the Készségek tiles, speed in its own tile, "te is tudsz kezelni" in the
     Folyamat handover step and again in the FAQ. Spending the hero's one
     supporting line on claims the page repeats twice more left it saying
     nothing the headline had not already implied.

     What it says now is the part nothing else on the page states outright:
     the four things I actually build, who they are for, and the problem they
     remove. That is the whole positioning in one line, which is what a
     visitor deciding in five seconds needs — not a list of qualities.

     The accent span carries "kevesebb kézi adminisztrációval" rather than a
     capability, because the emphasis should land on what the buyer gets rid
     of, not on what I am good at. */
  introLead: {
    hu: 'Weboldalak, foglalási, rendelési és belső rendszerek kis- és középvállalkozásoknak —',
    en: 'Websites, booking, ordering and internal systems for small and medium businesses —',
  },
  introAccent: { hu: 'kevesebb kézi adminisztrációval', en: 'with less done by hand' },
  /* "Munkáim" -> "Munkáim megtekintése". The secondary CTA now reads as an
     action rather than as a section label, which is what it has to do sitting
     beside a primary button that names one. */
  seeWork: { hu: 'Munkáim megtekintése', en: 'See my work' },
  /* photoAlt went with the photograph. The backdrop is drawn and carries no
     information, so it is aria-hidden rather than described — alt text for a
     gradient is noise in a screen reader, not access. */
}

/* ----------------------------------------------------------------
   Hero.

   The backdrop carries no raster image at all any more — gradients, a grid
   and one drawn SVG. Before the photograph it was a hotlinked stock URL of
   PHP on a monitor: a third-party runtime request in a codebase that
   self-hosts its fonts precisely to avoid those, showing a language this
   site does not sell. Nothing here reaches off-origin now, which is why
   img-src can stay as tight as it is.
---------------------------------------------------------------- */
export default function Hero() {
  const heroRef = useRef(null)
  const reduce = useReducedMotion()
  const locale = useLocale()

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrance. Under reduced motion the copy is placed, not animated:
         gsap.set leaves it at its final values so nothing is ever gated
         behind a transition that will not run. */
      if (reduce) {
        gsap.set('.hero-line-1, .hero-line-2, .hero-cta, .hero-meta', { y: 0, opacity: 1 })
        return
      }

      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })

      /* Depth on scroll. The photograph drifts slower than the page and the
         copy drifts faster, so the two separate as you leave the hero and
         the frame reads as having a back and a front rather than being one
         flat plate.

         Both are transform and opacity only, so this stays on the compositor
         and costs nothing on the main thread. The image starts pre-scaled at
         1.12 in the markup, which is the headroom the translate consumes;
         without it the bottom edge would lift off the section. */
      gsap.to('.hero-backdrop', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.to('.hero-copy', {
        yPercent: -8,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="kezdolap" ref={heroRef} className="relative min-h-viewport w-full overflow-hidden">
      <div className="absolute inset-0">
        {/* No photograph. The three that have held this slot were a holiday
            snapshot carrying another studio's watermark, then a night shot of
            somebody else's barber shop — atmosphere borrowed from a business
            that is not this one. What a developer's hero can honestly show is
            the work itself, so it is drawn: a measured plan sheet, a wireframe
            and code. 130 kB of JPEG left with it. (It was a browser window
            until 2026-08-19; HeroVisual.jsx records why that had to go.)

            .hero-backdrop stays on this element because two other modules
            select it — gsap parallaxes it, and preloader.js waits on it before
            lifting the cover (its heroDecoded() guards on
            `typeof decode === 'function'`, so a div resolves immediately). The
            1.12 pre-scale is the headroom the parallax translate consumes. */}
        <div
          aria-hidden="true"
          className="hero-backdrop absolute inset-0 scale-[1.12] will-change-transform"
          style={{
            backgroundColor: 'rgb(var(--color-deep))',
            backgroundImage: [
              'radial-gradient(58% 62% at 72% 34%, rgb(var(--color-primary) / 0.40), transparent 72%)',
              'radial-gradient(60% 50% at 10% 2%, rgb(var(--color-primary-dark) / 0.30), transparent 70%)',
            ].join(', '),
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgb(var(--color-primary-light) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-primary-light) / 0.06) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(85% 75% at 70% 42%, #000 15%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(85% 75% at 70% 42%, #000 15%, transparent 80%)',
            }}
          />
          <HeroVisual />
        </div>
        {/* Scrim weighted left, where the headline sits, so the panels keep the
            right of the frame instead of being flattened everywhere. */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/60 to-transparent" />
        {/* Fades into the light page, so the boundary is a transition
            rather than the hard seam a flat cut would leave. */}
        {/* Linear ramp, no midpoint stop. With via-background/70 the fade was
            already 70% opaque halfway up, which read as a white smear across
            the lower third rather than a transition into the page. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Left-aligned, not centred. The scrim is heaviest on the left, so the
          copy sits where it is most legible and the photograph keeps the
          right half of the frame. */}
      <div className="relative z-10 flex min-h-viewport flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="hero-copy w-full max-w-4xl will-change-transform">
          {/* One sentence across two lines, not two separate promises. It used
              to read "Weboldal, amit megtalálnak." / "Rendszer, ami dolgozik."
              — two claims competing for the same glance, neither finishing the
              other. Naming both halves of the work in the small line and
              landing the benefit in the big one says what I build and what it
              is for in a single read.

              Deliberately not a stack list like "React & Next.js fejlesztő":
              the person paying for this runs a bakery, and an h1 written for a
              recruiter is written for someone who is not on this page. There is
              also no Next.js in this project. */}
          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-3xl sm:text-4xl">
              {t(COPY.headlineLead, locale)}
            </span>
            {/* This space is not decorative. The two spans are one sentence
                split across two lines, and without it the h1's accessible
                name — the whole of what a screen reader announces for this
                heading — read "Weboldal és rendszer,ami helyetted dolgozik."
                Whitespace between two block boxes is collapsed by CSS, so
                nothing moves on screen; only the text node changes. */}{' '}
            {/* Capped at 6xl so the line holds on one row at desktop. At 8xl
                it wrapped, which made the headline three lines tall and
                pushed the buttons toward the fold. */}
            <span
              className="hero-line-2 block font-display font-semibold text-primary-light text-4xl sm:text-5xl md:text-6xl mt-2"
              style={{ lineHeight: '0.95' }}
            >
              {t(COPY.headlineAccent, locale)}
            </span>
          </h1>

          {/* The brief's English version of this line was "fast, responsive,
              and user-friendly web applications with clean code and modern
              technologies" — five adjectives no competitor would claim the
              opposite of, which makes them worth nothing. Speed and mobile stay
              because they are checkable; "clean code" and "modern
              technologies" go, because the buyer cannot verify either and the
              developer who can is reading the repo, not the hero.

              "belső rendszereket" was the second half of this sentence until
              2026-08-12. pricing.js had already retired the internal-system
              tier — none has been built for anyone — and renamed it
              "Rendszerek összekötése", but the hero went on advertising the
              retired category to every visitor before they reached the prices.
              Named after the tier that is actually sold instead. */}
          <p className="hero-meta max-w-lg text-white/80 text-base sm:text-lg mt-7 leading-relaxed">
            {t(COPY.introLead, locale)}{' '}
            <span className="text-white">{t(COPY.introAccent, locale)}</span>.
          </p>

          {/* Two CTAs, two intents. The secondary used to be the email address
              spelled out in full: a long label pointing at the same "contact
              me" action as the primary button beside it. Sending it to the
              work instead gives the visitor who is not ready to write
              somewhere to go. */}
          <div className="hero-cta mt-9 flex flex-col sm:flex-row gap-4">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#kapcsolat"
                className="magnetic-btn group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/30 transition-shadow duration-300 hover:shadow-primary/50"
              >
                {t(UI.ctaQuote, locale)}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            {/* Was content-width while the primary beside it was full-width, so
                on a phone the two buttons were visibly different sizes in the
                same stack. The arrow is a down-arrow, not a right-arrow: this
                one scrolls to a section further down the same page, and it
                should not mimic the primary action's gesture. */}
            <a
              href="#projektek"
              className="lift-on-hover group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/25 font-medium px-7 py-4 rounded-full transition-colors duration-300 hover:bg-white/[0.18] hover:border-white/45"
            >
              {t(COPY.seeWork, locale)}
              <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
