---
name: Rizmajer Máté Portfolio
description: A cool draughting-blue page carrying near-black navy screens. Technical, plain-spoken, Geist throughout, one indigo accent and no ornament.
colors:
  primary: "#4f46e5"
  primary-dark: "#4338ca"
  primary-light: "#818cf8"
  accent: "#a78bfa"
  accent-dark: "#8b5cf6"
  background: "#c5d3e7"
  surface: "#fcfdff"
  ink: "#0c1623"
  muted: "#405064"
  divider: "#aabdd5"
  deep: "#0b1421"
  card-1: "#1e293b"
  card-2: "#192333"
  card-3: "#151e2c"
  card-4: "#111925"
  terminal-1: "#182231"
  terminal-2: "#111925"
  terminal-3: "#0c121b"
  ink-inverted: "#f4f5fa"
  muted-inverted: "#9aa0b4"
  divider-inverted: "#2e3a4e"
  surface-inverted: "#1c283a"
  background-inverted: "#141e2e"
  primary-dark-inverted: "#a5b4fc"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
  numeral:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(5rem, 10vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "-0.025em"
rounded:
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  2xl: "1.5rem"
  4xl: "2rem"
  5xl: "2.5rem"
  6xl: "3rem"
  7xl: "4rem"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  card: "2.25rem"
  section: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-primary-active:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  button-secondary-on-screen:
    backgroundColor: "#ffffff1a"
    textColor: "#ffffff"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.5rem"
  card-screen:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.ink-inverted}"
    typography: "{typography.body}"
    rounded: "{rounded.5xl}"
    padding: "{spacing.card}"
  card-screen-large:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.ink-inverted}"
    typography: "{typography.body}"
    rounded: "{rounded.6xl}"
    padding: "4rem"
  surface-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.md}"
  text-input:
    backgroundColor: "{colors.background-inverted}"
    textColor: "{colors.ink-inverted}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    padding: "0.875rem 1rem"
  text-input-focused:
    backgroundColor: "{colors.background-inverted}"
    textColor: "{colors.ink-inverted}"
    rounded: "{rounded.2xl}"
  badge-pill:
    backgroundColor: "#4f46e51a"
    textColor: "{colors.primary-dark-inverted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  nav-bar:
    backgroundColor: "#c5d3e7e0"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "64px"
---

# Design System: Rizmajer Máté Portfolio

## 1. Overview

**Creative North Star: "The Blueprint and the Screen"**

The page is draughting paper. Not white, not cream: a cool blue-gray (`{colors.background}` — #c5d3e7) carrying a faint indigo grid at 40px intervals, the surface an engineer marks up before anything gets built. Laid on top of it are screens — near-black navy panels (`{colors.deep}` — #0b1421) that hold the product chrome, the process steps, the contact form. The whole system is those two materials and nothing else. Paper below, screen above.

That split is not decoration; it is the argument. This is a developer selling working systems to Hungarian business owners, and the interface says so in materials rather than adjectives: here is the plan, here is the thing running. Everything else has been stripped. One typeface (Geist, with its mono companion for labels), one accent (`{colors.primary}` — #4f46e5), no gradients carrying meaning, no ornament claiming significance it did not earn.

The system explicitly rejects what PRODUCT.md names. It is not a **generic Hungarian agency template**: no stock photography, no interchangeable service cards, no "modern megoldások". It is not an **Awwwards experimental portfolio**: no scroll-hijacking, no cursor effects, no intro animation standing between the visitor and the price. It is not **corporate enterprise SaaS**: no gradient-navy hero, no invented dashboards, no logo wall. And it is not a **Dribbble developer portfolio**: the type is large, but the page is built around evidence, not around type.

**Key Characteristics:**
- Cool draughting-blue page (`{colors.background}` — #c5d3e7) with a 40px indigo grid at 5.5% opacity. The defining choice: a committed mid-tone page, never off-white, never cream.
- Near-black navy screens (`{colors.deep}` — #0b1421) as the second and only other surface, produced by a single `.card-invert` token override rather than per-element classes.
- One accent, indigo `{colors.primary}` (#4f46e5), chosen at 600 rather than 500 because white on 500 measures 4.47:1 and misses AA.
- One typeface. Geist for everything, Geist Mono for small labels. Hierarchy comes from weight (400/600/700/800) and size, never from a second family.
- Full-pill CTAs against generous 2–3rem card radii. Two shapes, applied without exception.
- Self-hosted fonts with latin-ext subsets, so Hungarian ő and ű render natively instead of falling back mid-word.

## 2. Colors

A cool, desaturated blue field with a single saturated indigo doing all the signalling, and a near-black navy carrying every dark surface.

### Primary
- **Working Indigo** (#4f46e5): Every primary CTA, every active state, the grid lines on the page, the focus ring. It is indigo-600 rather than indigo-500 for one measured reason: white text on 500 reaches 4.47:1 and fails AA. Used sparingly on the light page and never as a background wash.
- **Working Indigo Deep** (#4338ca): The accent text tone on light surfaces — headline emphasis, eyebrow labels, inline links.
- **Working Indigo Pale** (#818cf8): The accent on dark surfaces. Inside a screen card, `primary-dark` re-resolves to #a5b4fc so accent text keeps its contrast when the ground inverts.

### Secondary
- **Signal Violet** (#a78bfa) and **Signal Violet Deep** (#8b5cf6): Reserved for form error states and the rare non-primary highlight. The palette's only other hue, and it should stay close to invisible in normal use.

### Neutral
- **Draughting Blue** (#c5d3e7): The page floor. A committed mid-tone, not a tint of white. Everything else is calibrated against it.
- **Chalk** (#fcfdff): The only near-white in the system. Small fact tiles on the light page. Never the page floor.
- **Screen Navy** (#0b1421): Every dark surface. Cards, footer, hero scrim, contact form.
- **Screen Navy Steps** (#1e293b / #192333 / #151e2c / #111925): Four graded fills for stacked panels, so adjacent dark cards separate without borders.
- **Terminal Steps** (#182231 / #111925 / #0c121b): Three deeper steps for code and terminal panels inside screen cards.
- **Ink** (#0c1623): All primary text on the light page. A cool near-black with no warmth in it.
- **Muted Ink** (#405064): Running body text. Measures 5.45:1 on Draughting Blue — chosen to clear AA on the mid-tone page, which a lighter gray would not.
- **Rule Gray** (#aabdd5): Hairlines and dividers on the light page only. Explicitly not strong enough to bound an interactive control.

### Named Rules

**The Two Materials Rule.** There are exactly two surfaces: draughting paper and screen. A third surface tone is forbidden. No white cards on the blue page, no mid-gray panels, no tinted section bands. If a block needs to separate itself, it becomes a screen or it uses space.

**The Inversion Rule.** Dark surfaces are produced by `.card-invert`, which re-declares `--color-ink`, `--color-muted`, `--color-divider`, `--color-surface`, `--color-background` and `--color-primary-dark` for the whole subtree. Never hand-write light-on-dark colors on a child. Add the class, and every descendant re-resolves correctly, including ones added later.

**The Control Boundary Rule.** `{colors.divider}` is for hairlines between blocks and is prohibited as the edge of anything a user clicks into. Interactive boundaries use `.input-edge` (ink at 55% on the light page, 38% on a screen card), solved to clear 3:1 under WCAG 2.2 SC 1.4.11. A field edge you have to hunt for is a failure, not a style.

**The One Accent Rule.** Indigo is the only signal color on the page. An emerald status dot, an amber badge or a teal highlight anywhere in the system is a defect — one existed in the footer and it read as a different website.

## 3. Typography

**Display Font:** Geist (fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Geist — the same family
**Label/Mono Font:** Geist Mono (fallback `ui-monospace, monospace`)

**Character:** One precision-drawn technical sans doing every job, with its monospace sibling for small labels. The pairing is deliberately not a contrast pairing: no serif, no second sans, no editorial flourish. Hierarchy is built from weight and size alone, which is the typographic equivalent of the brand's plain-spoken voice. Both faces are self-hosted with latin-ext subsets so Hungarian ő and ű never fall back mid-word.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 6vw, 3.75rem)`, 1.05, -0.025em): The hero headline only. Two lines maximum at desktop, and the scale is capped precisely so the second line does not wrap.
- **Headline** (700–800, `clamp(1.75rem, 4vw, 3rem)`, 1.02, -0.025em): Section headings. Emphasis inside a heading is a color shift to Working Indigo Deep at a lighter weight, never a second typeface.
- **Numeral** (800, `clamp(5rem, 10vw, 7rem)`, 0.85, tabular): Statistics figures and the ghost step numbers in the process section. Tabular figures, so a count-up animation cannot reflow the line.
- **Title** (600, 1.25rem, 1.3): Card headings, pricing tier names, FAQ questions.
- **Body Lead** (400, 1.125rem, 1.625): Section introductions and the hero subhead. Capped at 20 words in the hero.
- **Body** (400, 1rem, 1.625): Running text, constrained to `max-w-xl` / `max-w-lg` so lines land in the 65–75ch band.
- **Label** (Geist Mono, 400, 0.6875rem, 0.16em, uppercase): Form field labels, tech chips, metric captions. The only uppercase-tracked style in the system, and its use is rationed hard.

### Named Rules

**The One Family Rule.** Geist and Geist Mono, nothing else. Adding a serif display face — the standing temptation for any portfolio — would import an editorial voice this brand does not have and break the technical read entirely.

**The Eyebrow Ration.** The small uppercase mono label above a section heading is capped at one per three sections. Nine across eleven sections is not a system, it is scaffolding, and it makes every section look like the same section. Most headings stand alone.

**The No Numbering Rule.** `01 /`, `02 /`, `03 /` above section headings and card titles is forbidden. Numbers are permitted only where the order carries information the reader needs, which on this page means the three process steps and nothing else.

## 4. Elevation

Depth is color-block first, shadow second. The dominant separation is material: a near-black screen sitting on a cool blue page needs no shadow to read as a distinct object, and most cards carry only a light resting elevation. The `e1`–`e4` scale is reinforcement — it marks hover and separates stacked panels — not the primary ranking mechanism. Every shadow is tinted with ink (`rgb(12 22 35)`) rather than pure black, so it sits inside the palette instead of graying it out, and every step is two layers: a tight contact shadow plus a wide ambient one.

### Shadow Vocabulary
- **e1** (`0 1px 2px rgb(12 22 35 / 0.05), 0 2px 8px rgb(12 22 35 / 0.05)`): Barely-there lift. Small tiles.
- **e2** (`0 2px 4px rgb(12 22 35 / 0.06), 0 8px 20px rgb(12 22 35 / 0.09)`): The resting state for most cards.
- **e3** (`0 6px 12px rgb(12 22 35 / 0.09), 0 18px 40px rgb(12 22 35 / 0.14)`): Featured cards, the contact form, the process panels.
- **e4** (`0 12px 24px rgb(12 22 35 / 0.12), 0 32px 64px rgb(12 22 35 / 0.20)`): Hover only. Pairs with a 1.5px translate.

### Named Rules

**The Tinted Shadow Rule.** Pure black shadows are forbidden. Every elevation uses `rgb(12 22 35)` at the documented alphas. A black shadow on the blue page desaturates it and the whole surface goes muddy.

**The Two-Speed Rule.** Cards transition reveal properties slowly and hover properties fast: opacity at 600ms, transform at 240ms, border and shadow at 180–220ms. A single `transition-all duration-700` makes every hover feel broken, because it governs the border and shadow too.

## 5. Components

Precise and unfussy. Everything responds immediately to input, and nothing performs.

### Buttons
- **Shape:** Full pill (`{rounded.pill}`), without exception. A square button anywhere in this system is a defect.
- **Primary:** `{colors.primary}` fill, white label, `1rem 1.75rem` padding, indigo-tinted drop shadow. Carries a subtle bottom-to-top sheen on hover via a `::before` layer.
- **Hover / Active:** `scale(1.03) translateY(-1px)` on hover, `scale(0.98)` on press. Physical, small, fast.
- **Secondary on screen:** White at 10% with a `border-white/25` edge and backdrop blur. The hero's second CTA.
- **Disabled:** 50% opacity with `cursor: not-allowed`. The contact form's submit sits here until consent is given.

### Cards / Containers
- **Corner Style:** `{rounded.4xl}` (2rem) for compact cards, `{rounded.5xl}` (2.5rem) for feature and pricing cards, `{rounded.6xl}` (3rem) for full-width panels and the footer's top edge.
- **Background:** `{colors.deep}` via `.card-invert` for screens; `{colors.surface}` for the small light tiles.
- **Shadow Strategy:** `e2` at rest, `e4` on hover with a 1.5px lift. See Elevation.
- **Border:** 1px `{colors.divider}`, shifting to Working Indigo at 60% on hover.
- **Internal Padding:** `{spacing.card}` (2.25rem) typical, 4rem on the large process panels.

### Inputs / Fields
- **Style:** `.input-edge` boundary over a `{colors.background-inverted}` fill at `{rounded.2xl}`. Labels sit above the field in Geist Mono at 11px, never inside it as a placeholder.
- **Focus:** Border shifts to `{colors.primary}` with a 4px indigo ring at 15%.
- **Placeholder:** Ink at 55%, which clears 4.5:1. Placeholder text is held to the body-text bar, not a muted default.
- **Consent:** The contact form's submit stays disabled until the GDPR checkbox is ticked; the privacy policy link sits inside the consent label.

### Navigation
- Floating pill bar, max 1024px wide, 64px tall, fixed 1rem from the top. Transparent over the hero; on scroll it becomes `.glass` — the page color at 88% behind a 20px backdrop blur.
- The scroll state is driven by an `IntersectionObserver` sentinel, never a scroll listener.
- Below 1024px it collapses to a hamburger opening a full-width sheet.
- A `@supports not (backdrop-filter)` block raises the fill to 97%, because where the blur silently fails the bar becomes text over text.

### Screen Card (signature)
The system's defining component. A `.card-invert` panel that re-declares the color tokens for its whole subtree, letting any descendant use `text-ink`, `text-muted` or `border-divider` and resolve correctly against the dark ground. It also sets `color` directly, not only the token, so elements with no color class inherit correctly instead of rendering near-black on near-black.

## 6. Do's and Don'ts

### Do:
- **Do** anchor every page on `{colors.background}` (#c5d3e7). The committed mid-tone is the brand; a white or near-white page makes this any other developer portfolio.
- **Do** build every dark surface with `.card-invert` rather than hand-written light-on-dark utilities.
- **Do** keep hierarchy in weight and size. Geist at 400/600/700/800 covers every level the page needs.
- **Do** use `.input-edge` on every interactive boundary and verify it clears 3:1 against its own fill.
- **Do** cap the hero at a two-line headline and a 20-word subhead, with both CTAs above the fold.
- **Do** tint every shadow with `rgb(12 22 35)`.
- **Do** honor `prefers-reduced-motion`. The global CSS block collapses every animation and transition to 0.01ms; keep it, and keep the JS effects checking `useReducedMotion` too.

### Don't:
- **Don't** introduce a third surface tone. Two materials: paper and screen.
- **Don't** add a second typeface. A serif display face in particular is forbidden; it imports an editorial voice this brand does not have.
- **Don't** ship a second accent color. No emerald status dots, no amber badges, no teal highlights.
- **Don't** put an eyebrow above every section. One per three sections, maximum.
- **Don't** number sections `01 / 02 / 03` unless the order genuinely carries information.
- **Don't** build fake product chrome out of styled divs. PRODUCT.md's first principle is evidence over assertion: use a real screenshot or show less. A mock browser window under a headline reading *"Valós munka, nem mockup"* is the exact failure to avoid.
- **Don't** invent precision. No Lighthouse scores, response times, uptime figures or build counters the project does not measure. Named in PRODUCT.md as **corporate enterprise SaaS** behavior.
- **Don't** add cursor followers, pointer-tracked highlights, scroll-hijacking or intro animations. Named in PRODUCT.md as the **Awwwards-style experimental** anti-reference, and actively hostile to a visitor on a mid-range Android.
- **Don't** use stock photography of people at laptops, or three identical service cards. Named in PRODUCT.md as the **generic Hungarian agency template**.
- **Don't** let type size substitute for evidence. Named in PRODUCT.md as the **Dribbble-style developer portfolio**, and the failure mode this project sits closest to.
- **Don't** use `transition-all` on a card. See the Two-Speed Rule.
- **Don't** write English Title Case in Hungarian copy. "Adatbázis Tervezés" is a translation artifact; Hungarian takes sentence case.
