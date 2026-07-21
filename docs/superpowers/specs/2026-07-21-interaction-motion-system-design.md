# Interaction & Motion System — Design Spec

**Date:** 2026-07-21
**Status:** Approved, ready for planning
**Scope:** Site-wide interaction pass on the portfolio single-page app

---

## Goal

Make every meaningful element on the site respond to the pointer, and give
project and skill cards a click-through layer for more detail. The target
register is "expressive — agency tier": noticeably alive, still controlled.

The interaction quality is itself the sales argument. This is a developer
portfolio; a visitor judging whether to hire the author is judging the
craft of the surface they are standing on.

## Non-goals

- No WebGL, shaders, scroll-jacking, or pinned full-screen takeovers.
- No routing changes. The detail layer is state-only, not URL-driven.
- No new written content. Case-study fields ship present but empty.
- No redesign of layout, palette, or typography. Those are settled.

---

## Current state

`src/App.jsx` is 1985 lines holding every section, every data constant, and
every animation. GSAP 3.15 with ScrollTrigger is already wired up and used
for hero entrance and the pinned process cards. Hover styling is thin and
inconsistent: 31 `hover:` utilities across the whole file, with no shared
timing or distance vocabulary.

Ten sections each hand-roll the same `IntersectionObserver` + `visible`
boolean to drive a scroll entrance. This is the single largest duplication
in the file and the natural thing to fix while doing this work.

`PROJECTS_FULL` holds four projects with one sentence each. There are no
screenshots; `ProjectMock` renders a fake gradient browser chrome as a
stand-in. GitHub links exist but are deliberately left as placeholders for
this pass.

---

## Architecture

`App.jsx` reduces to composition only, roughly 120 lines.

```
src/
  App.jsx                     composition only
  motion/
    tokens.js                 durations, easings, distance limits
    useReducedMotion.js       context hook
    Cursor.jsx                custom cursor + target states
    Magnetic.jsx              pointer-attracted wrapper
    TiltCard.jsx              3D tilt + specular sheen
    ScrambleText.jsx          decode-style text reveal
    Reveal.jsx                scroll entrance wrapper with stagger
  sections/
    Navbar.jsx  Hero.jsx  Skills.jsx  Projects.jsx  About.jsx
    Philosophy.jsx  Process.jsx  Services.jsx  Pricing.jsx
    Trust.jsx  Contact.jsx  Footer.jsx
  components/
    ProjectModal.jsx
  data/
    projects.js  pricing.js  skills.js  nav.js
```

`data/nav.js` holds both `NAV_LINKS` and `SOCIAL_LINKS`, since the footer
and navbar share them.

Each section file owns its own markup and its own section-specific GSAP
work, and imports shared behaviour from `motion/`. A section should be
readable and editable without opening any other section.

### Why extract

Two reasons, both practical. The interaction layer adds an estimated
800–1200 lines; a single 3000-line file makes every edit risk touching
unrelated code. And the primitives only pay off if they are applied
consistently, which means they need one definition, not a copy per section.

---

## Motion system

### `tokens.js`

The shared vocabulary. Every animation in the codebase pulls from here so
timings cannot drift apart.

| Token | Value | Used for |
| --- | --- | --- |
| `duration.instant` | 120ms | Colour and opacity flips |
| `duration.fast` | 200ms | Hover lifts, underline wipes |
| `duration.base` | 320ms | Card transforms, expansion |
| `duration.slow` | 600ms | Modal open, section transitions |
| `duration.reveal` | 900ms | Scroll entrances |
| `ease.out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, expo-out feel |
| `ease.inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` | Reversible state changes |
| `ease.spring` | GSAP `elastic.out(1, 0.6)` | Magnetic snap-back |
| `limit.lift` | -4px | Hover elevation |
| `limit.tilt` | 8deg | Max card rotation |
| `limit.magnet` | 12px | Max magnetic displacement |

### Primitives

**`<Cursor>`** — Mounted once at app root. A small dot tracking the pointer
exactly, plus a ring that lerps behind it. Elements opt in declaratively
through a `data-cursor` attribute, so adding a cursor state to any element
is a markup change, never a wiring change:

- `data-cursor="link"` — ring expands, dot shrinks
- `data-cursor="card"` — ring becomes a filled pill with a label taken from
  `data-cursor-label` (for example `Részletek`)
- `data-cursor="text"` — ring collapses to an I-beam

Renders nothing unless `(pointer: fine)` matches and reduced motion is off.
The native cursor is never hidden on interactive elements that need a
system affordance, and is restored entirely when the custom cursor is
inactive.

**`<Magnetic>`** — Wraps a button or link. While the pointer is within a
radius of the element's centre, the child translates toward it, damped, up
to `limit.magnet`. On leave it springs back. Used on primary CTAs, social
icons, and back-to-top.

**`<TiltCard>`** — rotateX/rotateY driven by normalised pointer position
within the element, capped at `limit.tilt`. Carries a specular sheen: a
radial-gradient overlay positioned at the pointer. Used on project cards,
pricing tiers, and skill cards.

**`<ScrambleText>`** — Character-scramble decode reveal. Fires on scroll
entrance for headlines and on hover for `╱ Eyebrow` labels and footer
links. Respects word boundaries so layout does not reflow mid-animation.

**`<Reveal>`** — One wrapper replacing the ten duplicated
`IntersectionObserver` blocks. Props: `stagger`, `delay`, `direction`,
`threshold`. Disconnects its observer after firing, as the current code
already does.

**`useReducedMotion()`** — Context provider reading
`prefers-reduced-motion` and listening for changes. Every primitive above
consults it and degrades to a plain opacity fade or a static state.

---

## Section interaction map

This is the concrete definition of "animations everywhere".

**Navbar** — Active-section indicator slides between links, driven by
ScrollTrigger. Underline wipes in from the left on hover. Logo scrambles on
hover. Mobile menu items reveal on a stagger.

**Hero** — Pointer-tracked highlight sweep across the chrome headline.
Magnetic primary CTA with an arrow that slides on hover. Scroll cue with a
soft loop. Subtle pointer parallax on decorative background layers. The
existing GSAP entrance timeline is retimed against `tokens.js` but its
choreography is kept.

**Features** — The three showcase cards (`StackShuffler`, `CodeScan`,
`BookingScheduler`) are already bespoke interactive demos. They are
enhanced, not replaced: hover tilt on the card shell and a border trace,
with the demos left intact.

**Projects** — Tilt plus sheen. `ProjectMock` animates itself alive on
hover: the fake UI blocks stagger in, the placeholder bars fill. Since
there are no real screenshots, the mock becomes the interaction rather than
an apology for missing imagery. Cursor reads `Részletek`. Click opens the
project modal.

**About** — Portrait transitions duotone to full colour on hover, with
scroll parallax. Existing `CountUp` stats retained, retriggered through
`<Reveal>`. Bio paragraph fades in per word.

**Philosophy** — Hovering one pillar dims and recedes the others; the
hovered one scales slightly. Focus-by-subtraction.

**Process** — The existing pinned card stack gains a scroll-linked progress
rail. Step numbers snap as they become active. Hovering a step expands its
detail text.

**Services** — Renders `SKILLS_FULL` (six cards). Directional fill: on hover
the accent colour floods the cell from whichever edge the pointer crossed,
computed from entry geometry. Arrow icon slides. Click expands the card in
place to reveal a longer description — this is the cheap and honest half of
"clickable for more info", since service copy is easy to extend, unlike
case studies.

**Pricing** — Tilt on tier cards. Feature checkmarks stagger in on hover.
The highlighted tier carries a slow animated gradient border. Price digits
roll into place on scroll entrance.

**Trust** — Converted to an infinite marquee that slows, and does not stop,
on hover.

**Contact** — Floating labels that lift on focus. Focus ring draws around
the field rather than appearing. Inline validation micro-states. Submit
button morphs loading to success. File upload shows a drag-over state.

**Footer** — Link list items scramble and slide an arrow in on hover.
Magnetic social icons and back-to-top control.

---

## Project modal

Opens with a FLIP-style transform: the clicked card's bounding box is
measured and the modal animates from that geometry to its final position,
so the card visually becomes the modal. GSAP's Flip plugin is the intended
mechanism; its availability under the installed GSAP 3.15 licence must be
confirmed during implementation, and a manual measured transform is the
fallback if it is not available.

Behaviour: backdrop blur, focus trap, `Escape` closes, body scroll locked
while open, focus returned to the originating card on close. Rendered
through a portal. State-only, no route change.

`src/data/projects.js` carries the extended shape with new fields present
but empty, so filling them in later is a data edit rather than a code
change:

```js
{
  title, label, text, tech, tone,   // existing
  year: '',
  role: '',
  problem: '',
  solution: '',
  gallery: [],
  github: '#',                       // placeholder for this pass
  live: '',
}
```

The modal renders each optional field only when non-empty, so a
half-filled project degrades to a clean short panel rather than a page of
empty headings.

---

## Accessibility

- `prefers-reduced-motion: reduce` disables tilt, magnetic, cursor, and
  scramble. Opacity fades remain.
- The custom cursor renders only under `(pointer: fine)`.
- Every hover affordance has a `:focus-visible` equivalent. A keyboard user
  reaches the same states a mouse user does.
- Project cards are real buttons with accessible names, not click-handling
  `<article>` elements.
- The modal is a labelled dialog with a trapped, restoring focus cycle.
- Marquee content is duplicated with `aria-hidden` on the clone so screen
  readers hear the list once.

## Performance

- Tilt and magnetic run on `requestAnimationFrame`, write only `transform`,
  and never read layout inside the frame loop.
- `will-change` is applied on pointer enter and removed on leave, not left
  standing.
- Pointer listeners are passive and attached per-element, not globally per
  card.
- Touch devices skip tilt, magnetic, and cursor entirely and use tap states.
- ScrollTrigger instances are created inside `gsap.context()` and reverted
  on unmount, matching the existing pattern.

---

## Phasing

The work splits into three phases, each independently viewable.

1. **Restructure and primitives.** Extract sections and data, build
   `motion/`, replace the ten duplicated observers with `<Reveal>`. The
   site must look and behave identically at the end of this phase. That
   equivalence is what makes the refactor verifiable.
2. **Apply across sections.** Work the interaction map section by section.
3. **Project modal.** Data shape, modal component, FLIP open, card wiring.

## Verification

- `npm run build` succeeds and `npm run lint` (oxlint) is clean.
- Phase 1 specifically: visual and behavioural parity with the current
  site, checked section by section before any new motion is added.
- Each phase is driven in a real browser through Chrome DevTools: hover and
  click states exercised per section at desktop and mobile widths, console
  clean, no layout shift introduced by transforms.
- Reduced-motion is verified by emulating the preference and confirming the
  site is fully usable and still legible with all motion suppressed.

## Risks

**Uniform application reads as gimmick.** Custom cursor plus tilt on
everything is the combination most likely to feel cheap. Mitigation: the
cursor stays small and quiet by default and only becomes expressive over
genuine targets; tilt is limited to card grids, never to text blocks or
layout containers.

**Refactor regression.** Moving 1985 lines into a dozen files can silently
break scroll triggers that depend on mount order or DOM position.
Mitigation: phase 1 ships with no behaviour change, so any difference is a
bug with an obvious cause rather than something hidden under new motion.
