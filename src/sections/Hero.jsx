import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { useReducedMotion } from '../motion/useReducedMotion'
import phoneSzalka from '../assets/demos/hero-phone-szalka.webp'
import phoneSzalkaSmall from '../assets/demos/hero-phone-szalka-300.webp'
import phoneKispipa from '../assets/demos/hero-phone-kispipa.webp'
import phoneKispipaSmall from '../assets/demos/hero-phone-kispipa-300.webp'
import phoneKormos from '../assets/demos/hero-phone-kormos.webp'
import phoneKormosSmall from '../assets/demos/hero-phone-kormos-300.webp'
import phoneKovacs from '../assets/demos/hero-phone-kovacs.webp'
import phoneKovacsSmall from '../assets/demos/hero-phone-kovacs-300.webp'
import phoneVirag from '../assets/demos/hero-phone-virag.webp'
import phoneViragSmall from '../assets/demos/hero-phone-virag-300.webp'
import phoneMasszazs from '../assets/demos/hero-phone-masszazs.webp'
import phoneMasszazsSmall from '../assets/demos/hero-phone-masszazs-300.webp'
import heroBg from '../assets/bg/hero-1600.webp'
import { useLocale } from '../i18n/useLocale'
import { t } from '../i18n/t'
import { UI } from '../i18n/ui'
import { TIER_FLOORS } from '../data/services'
import { PROJECTS_FULL } from '../data/projects'
import { forint, priceEn } from '../data/fx'

/* Six live demos, captured at 390px, each linking to the live site. Six
   trades rather than one, because the buyer is looking for their own. Links are
   labelled by trade, not business name, so the label translates. Kept
   in column pairs: the wall lays them out as three staggered columns, and the
   swipe row below xl takes all six in order. */
const PHONES = [
  { src: phoneSzalka, small: phoneSzalkaSmall, href: 'https://demo-idopontfoglalo.vercel.app', name: { hu: 'Fodrászat', en: 'Hair salon' } },
  { src: phoneKispipa, small: phoneKispipaSmall, href: 'https://demo-napi-menu.vercel.app', name: { hu: 'Büfé', en: 'Snack bar' } },
  { src: phoneKormos, small: phoneKormosSmall, href: 'https://demo-szerviz.vercel.app', name: { hu: 'Autószerviz', en: 'Car service' } },
  { src: phoneMasszazs, small: phoneMasszazsSmall, href: 'https://demo-masszazs.vercel.app', name: { hu: 'Masszázs', en: 'Massage' } },
  { src: phoneVirag, small: phoneViragSmall, href: 'https://demo-viragbolt.vercel.app', name: { hu: 'Virágbolt', en: 'Florist' } },
  { src: phoneKovacs, small: phoneKovacsSmall, href: 'https://demo-bemutatkozo.vercel.app', name: { hu: 'Villanyszerelő', en: 'Electrician' } },
]
const TRY = {
  label: { hu: 'Válassz szakmát, és próbáld ki itt:', en: 'Pick a trade and try it here:' },
  play: { hu: 'Kipróbálom itt', en: 'Try it here' },
  newTab: { hu: 'új lapon', en: 'new tab' },
  frame: { hu: 'bemutató, élőben', en: 'demo, live' },
}

/* The real demo, live, in a phone frame (2026-11-11, Máté: a demo you can
   try in the hero). The screenshot is the poster; the iframe loads only on
   request, so first paint and LCP stay the same. Wide screens only: on a
   phone a scrollable page inside the page traps the thumb, so below xl the
   strip links out instead. The iframe renders at a real 390px phone width
   and is scaled into the frame. */
const FRAME_W = 300
const FRAME_H = 470
const VIEW_W = 390
function DemoPhone({ locale }) {
  const [i, setI] = useState(0)
  const [live, setLive] = useState(false)
  const demo = PHONES[i]
  return (
    <div className="absolute right-[5%] top-1/2 z-20 hidden -translate-y-1/2 xl:block" style={{ width: FRAME_W + 24 }}>
      <p className="mb-3 font-semibold text-[13px] text-ink/80">{t(TRY.label, locale)}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {PHONES.map((p, pi) => (
          <button
            key={p.href}
            type="button"
            aria-pressed={pi === i}
            onClick={() => setI(pi)}
            className={`min-h-9 rounded-full border px-3 text-[13px] font-medium transition-colors duration-200 ${pi === i ? 'border-primary-light bg-primary text-white' : 'border-white/20 text-ink/85 hover:border-white/45'}`}
          >
            {t(p.name, locale)}
          </button>
        ))}
      </div>
      <div className="rounded-[2.4rem] border border-white/20 bg-black/40 p-3 shadow-e4">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-deep" style={{ width: FRAME_W, height: FRAME_H }}>
          {live ? (
            <iframe
              key={demo.href}
              src={demo.href}
              title={`${t(demo.name, locale)} ${t(TRY.frame, locale)}`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{ width: VIEW_W, height: (FRAME_H * VIEW_W) / FRAME_W, transform: `scale(${FRAME_W / VIEW_W})` }}
            />
          ) : (
            <>
              <img src={demo.src} alt="" width={440} height={684} decoding="async" className="h-full w-full object-cover object-top" />
              <button
                type="button"
                onClick={() => setLive(true)}
                className="absolute inset-x-4 bottom-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-white shadow-e3 transition-colors hover:bg-primary-dark"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                {t(TRY.play, locale)}
              </button>
            </>
          )}
        </div>
      </div>
      <a
        href={demo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-ink/80 underline underline-offset-4 hover:text-ink"
      >
        {t(demo.name, locale)}, {t(TRY.newTab, locale)}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  )
}
const OPENS = { hu: 'bemutató, új lapon nyílik', en: 'demo, opens in a new tab' }

/* One phone screenshot as a link to the live demo. Cropped to the top of the
   page (9:14), which is the part that says what the business is. */
function Phone({ phone, locale, className = '' }) {
  return (
    <a
      href={phone.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t(phone.name, locale)} ${t(OPENS, locale)}`}
      className={`block overflow-hidden rounded-[1.5rem] border border-white/15 shadow-e3 transition-colors duration-300 hover:border-white/40 ${className}`}
    >
      {/* Cropped to the 9:14 that shows (they were 440x952 with the bottom
          third never on screen), plus a 300w copy for phones (2026-11-09):
          ~250 KB -> ~100 KB in the mobile strip, where they competed with the
          hero text for bandwidth. */}
      <img
        src={phone.src}
        srcSet={`${phone.small} 300w, ${phone.src} 440w`}
        sizes="(min-width: 1280px) 13rem, min(38vw, 11rem)"
        alt=""
        width={440}
        height={684}
        loading="lazy"
        decoding="async"
        className="aspect-[9/14] w-full object-cover object-top"
      />
    </a>
  )
}

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
  /* Problem-led (2026-11-11, Máté): the line names what the owner wants gone.
     "Weboldal" stays in the h1 for search. */
  headlineLead: { hu: 'Weboldal és foglalási rendszer,', en: 'A website and a booking system,' },
  headlineAccent: { hu: 'hogy ne a telefon vigye el a napod.', en: 'so the phone stops eating your day.' },
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
    hu: 'Kis- és középvállalkozásoknak Pest megyében és Budapesten: az ügyfél online foglal, rendel vagy kérdez,',
    en: 'For small and medium businesses in Pest County and Budapest: customers book, order or ask online,',
  },
  introAccent: { hu: 'te közben dolgozol', en: 'while you get on with the work' },
  /* "Munkáim" -> "Munkáim megtekintése". The secondary CTA now reads as an
     action rather than as a section label, which is what it has to do sitting
     beside a primary button that names one. */
  seeWork: { hu: 'Munkáim megtekintése', en: 'See my work' },
  freeReview: { hu: 'Vagy kérj ingyenes weboldal-átvilágítást', en: 'Or ask for a free website review' },
  /* Three checkable facts in the first screen (2026-11-10): "say the number"
     was true everywhere on the page except where most visitors stop. Price
     and count are derived, so neither can drift from the catalogue. */
  facts: [
    { hu: `Bemutatkozó oldal ${forint(TIER_FLOORS.intro)}-tól`, en: `Introductory site from ${priceEn(TIER_FLOORS.intro)}` },
    { hu: 'Válasz egy munkanapon belül', en: 'A reply within one working day' },
    { hu: `${PROJECTS_FULL.length} bemutató, mind kipróbálható`, en: `${PROJECTS_FULL.length} demos, all of them live` },
  ],
  /* The phones were marked as demos only in their aria-label, so a sighted
     visitor could take them for client work. Now the label is on screen. */
  phonesCaption: { hu: 'Bemutatók: koppints rá, és kipróbálod', en: 'Demos: tap one to try it' },
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
      /* No entrance (2026-10-13): DESIGN.md rules out intro animation
         between the visitor and the call to action, so the copy is simply
         there. Under reduced motion the scroll depth below is skipped too. */
      // No scroll-scrubbed parallax on touch (critique, 2026-11-10): on a phone it faded
      // the hero copy to 35% while the visitor was still reading it.
      if (reduce || window.matchMedia('(pointer: coarse)').matches) return

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

  /* card-invert on the section, like every other dark surface in the system.
     The hero had been writing text-white, text-white/80 and border-white/25 by
     hand, which looked identical and was not: the class also carries
     `.card-invert :focus-visible { outline-color: primary-dark }`, and
     primary-dark outside an inverted subtree is #4338ca — a dark indigo ring
     on a near-black hero, which is where keyboard focus on the two most
     important buttons on the site was landing. Inside, it resolves to #a5b4fc
     and is plainly visible.

     The background-color the class paints is harmless: the backdrop div
     covers the section edge to edge and is drawn over it. What is not
     harmless is that .card-invert also redeclares --color-background, which
     is why the fade at the bottom names paper instead. */
  return (
    <section id="kezdolap" ref={heroRef} className="card-invert relative min-h-viewport w-full overflow-hidden">
      <div className="absolute inset-0">
        {/* No photograph. The three that have held this slot were a holiday
            snapshot carrying another studio's watermark, then a night shot of
            somebody else's barber shop — atmosphere borrowed from a business
            that is not this one. What a developer's hero can honestly show is
            the work itself. Until 2026-10-13 that was a drawn wireframe, which
            DESIGN.md calls fake product chrome; now it is a screenshot of a
            real demo (below).

            .hero-backdrop is what gsap parallaxes. The 1.12 pre-scale is the
            headroom the parallax translate consumes. */}
        <div
          aria-hidden="true"
          className="hero-backdrop absolute inset-0 scale-[1.12] will-change-transform"
          style={{
            backgroundColor: 'rgb(var(--color-deep))',
            backgroundImage: [
              'radial-gradient(58% 62% at 72% 34%, rgb(var(--color-primary) / 0.40), transparent 72%)',
              'radial-gradient(60% 50% at 10% 2%, rgb(var(--color-primary-dark) / 0.30), transparent 70%)',
              /* Abstract indigo light (Higgsfield, 2026-11-10), under the
                 gradients; 9 KB, self-hosted so img-src stays same-origin. */
              `url(${heroBg})`,
            ].join(', '),
            backgroundSize: 'auto, auto, cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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
        </div>
        <DemoPhone locale={locale} />
        {/* Scrim weighted left, where the headline sits, so the panels keep the
            right of the frame instead of being flattened everywhere. */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/60 to-transparent" />
        {/* Fades into the light page, so the boundary is a transition
            rather than the hard seam a flat cut would leave. */}
        {/* Linear ramp, no midpoint stop. With via-background/70 the fade was
            already 70% opaque halfway up, which read as a white smear across
            the lower third rather than a transition into the page. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
      </div>

      {/* Left-aligned, not centred. The scrim is heaviest on the left, so the
          copy sits where it is most legible and the photograph keeps the
          right half of the frame. */}
      <div className="relative z-10 flex min-h-viewport flex-col justify-center px-6 pb-36 pt-28 sm:px-10 lg:px-16 xl:py-0">
        <div className="hero-copy w-full max-w-4xl xl:max-w-[44rem] will-change-transform">
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
          <h1 className="font-display font-extrabold text-ink leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-3xl sm:text-4xl">
              <span className="text-primary-dark">{t(COPY.headlineLead, locale)}</span>
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
              className="hero-line-2 block font-display font-semibold text-4xl sm:text-5xl md:text-6xl mt-2"
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
          <p className="hero-meta max-w-lg text-ink/80 text-base sm:text-lg mt-7 leading-relaxed">
            {t(COPY.introLead, locale)}{' '}
            <span className="text-ink">{t(COPY.introAccent, locale)}</span>.
          </p>

          <ul className="mt-6 flex flex-col gap-1.5 text-sm font-medium text-ink sm:flex-row sm:flex-wrap sm:gap-x-6">
            {COPY.facts.map((fact) => (
              <li key={fact.hu}>{t(fact, locale)}</li>
            ))}
          </ul>

          {/* Two CTAs, two intents. The secondary used to be the email address
              spelled out in full: a long label pointing at the same "contact
              me" action as the primary button beside it. Sending it to the
              work instead gives the visitor who is not ready to write
              somewhere to go. */}
          <div className="hero-cta mt-9 flex flex-col sm:flex-row gap-4">
            <a
              href="#kapcsolat"
              className="magnetic-btn group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full"
            >
              {t(UI.ctaQuote, locale)}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            {/* Was content-width while the primary beside it was full-width, so
                on a phone the two buttons were visibly different sizes in the
                same stack. The arrow is a down-arrow, not a right-arrow: this
                one scrolls to a section further down the same page, and it
                should not mimic the primary action's gesture. */}
            <a
              href="#projektek"
              className="lift-on-hover group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-ink/10 backdrop-blur-md text-ink border border-ink/25 font-medium px-7 py-4 rounded-full transition-colors duration-300 hover:bg-ink/[0.18] hover:border-ink/45"
            >
              {t(COPY.seeWork, locale)}
              <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* The free review, as a quiet third option for the visitor who is not
              ready to talk about a project yet. A text link, not a third button:
              two buttons already split the decision, and a third would flatten it. */}
          <a href="#atvilagitas" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary-dark underline underline-offset-4 hover:no-underline">
            {t(COPY.freeReview, locale)}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* Below xl the wall is hidden, so the evidence comes here instead,
              after both buttons so it can never push them below the fold. All
              six, in a row you swipe: native scroll-snap, no script. The row
              bleeds to the screen edge (-mx-6 / px-6) so the cut-off phone on
              the right says there is more. */}
          <p className="mt-10 hidden font-semibold text-[13px] text-ink/80 sm:block xl:hidden">{t(COPY.phonesCaption, locale)}</p>
          <div className="-mx-6 mt-3 hidden sm:flex snap-x snap-mandatory scroll-px-6 gap-2.5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 xl:hidden">
            {PHONES.map((phone) => (
              <Phone key={phone.href} phone={phone} locale={locale} className="w-[38%] max-w-[11rem] shrink-0 snap-start" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
