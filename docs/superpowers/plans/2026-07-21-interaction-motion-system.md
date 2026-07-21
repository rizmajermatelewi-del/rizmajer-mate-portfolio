# Interaction & Motion System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Execution status (PHASE 1 COMPLETE 2026-07-21)

Branch `interaction-motion-system`, forked from `main` at `e9b9c6f`.

| Task | Status | Commit |
| --- | --- | --- |
| 1 — Test harness and motion tokens | complete, reviewed clean | `0876a99` |
| 2 — Extract data constants and brand icons | complete, reviewed clean | `ae6300e` |
| 3 — Extract leaf and showcase components | complete, reviewed clean | `8282ef0` |
| 4 — Extract sections, batch 1 | complete, controller-verified | `d2de51f` |
| 5 — Extract sections, batch 2 | complete, controller-verified | `a219af0` |
| 6 — `useInView` / `useReducedMotion` hooks | complete, in-session | `c9e527c` |
| 7 — Replace duplicated observers | complete, in-session | `b67f89e` |
| 8-15 | not started | — |

**Resume at Task 8.** Working ledger with per-task findings is at
`.superpowers/sdd/progress.md` (git-ignored scratch — if it is gone, this
table and `git log` are the recovery map).

**PHASE 1 GATE: PASSED.** A full browser pass via Chrome DevTools confirmed
all 11 sections still reveal on scroll at their original thresholds, the
Protocol scrub, the CountUp stats, all three Features showcases, the contact
form, both legal routes, the mobile menu, and a clean console at desktop and
mobile widths. This closes the visual-parity item that was open since Task 3.

Two notes carried forward:

1. **Two plan inaccuracies corrected during execution**, both recorded in the
   ledger: the Task 6 `useInView` test as written cannot pass (`renderHook`
   never attaches the ref, so no observer is constructed) and was replaced
   with a probe component; and Task 7's "10 observers in the section files"
   is really 9 — the tenth is in `CountUp.jsx` and is a different pattern
   that must not be converted.
2. **Cost decision in force:** pure-move tasks run on a cheap model and are
   verified by controller diff; tasks with real logic (8-15) get the full
   implementer plus independent reviewer gate.

`App.jsx` went from 1985 lines to 52 lines of pure composition across
Tasks 2-5, and Task 7 removed a further 152 lines of duplication. Phase 1
produced zero visible change, as required.

---

**Goal:** Give every meaningful element on the portfolio site an expressive pointer response, and add a click-through detail layer for projects and services.

**Architecture:** Split the 1985-line `src/App.jsx` into `sections/`, `data/`, and `components/`, then build a reusable `src/motion/` layer (tokens, `useInView`, `Cursor`, `Magnetic`, `TiltCard`, `ScrambleText`) that every section imports. Applied in three phases: restructure with zero visual change, then apply motion section by section, then the project modal.

**Tech Stack:** React 19, Vite 8, Tailwind 3.4, GSAP 3.15 + ScrollTrigger, lucide-react, react-router-dom 7. Vitest + jsdom added in Task 1 for pure-logic unit tests.

## Global Constraints

- **Language:** All user-facing copy is Hungarian. Never translate existing strings. New UI labels must be Hungarian (e.g. `Részletek`, `Bezárás`).
- **Palette:** Colours come from CSS variables via Tailwind tokens (`text-ink`, `bg-surface`, `border-divider`, `text-primary-dark`, `bg-deep`, `text-muted`). Never hardcode a hex or `rgb()` literal. The theme system in `src/index.css` is settled — do not modify it beyond the one addition in Task 11.
- **Component names are preserved.** The spec's file listing used idealised names (`Skills.jsx`, `Philosophy.jsx`, `Process.jsx`, `Services.jsx`, `Trust.jsx`, `Contact.jsx`). **Ignore those.** Keep the real existing names so the refactor stays a pure move: `Features`, `Pillars`, `Protocol`, `ServicesGrid`, `TrustSignals`, `ContactForm`. Each file is named after the component it exports.
- **`<Reveal>` is not built. `useInView` replaces it.** The spec proposed a `<Reveal>` wrapper component. A wrapper animates *itself*, but the existing sections drive staggered `transitionDelay` on their *children* from a `visible` boolean. A wrapper would therefore change behaviour, and Phase 1 must not. `useInView` is the exact-parity extraction of the duplication the spec was actually targeting. Do not add `<Reveal>` on top of it.
- **Motion values in JS come from `src/motion/tokens.js` only.** Never inline a duration or easing in a GSAP call or an inline `style` transition. Tailwind's built-in duration and delay utilities (`duration-500`, `delay-75`) remain allowed for pure-CSS transitions in classNames — Tailwind's scale is itself a constrained design system. Tilt max 8deg, magnetic max 12px, hover lift -4px.
- **Reduced motion:** Every primitive must consult `useReducedMotion()` and degrade to a static or opacity-only state. This is not optional per-component polish.
- **Section ids are load-bearing** — `#kezdolap`, `#projektek`, `#rolam`, `#keszsegek`, `#arak`, `#kapcsolat` are targeted by `NAV_LINKS`. Never rename them.
- **`gsap.registerPlugin(ScrollTrigger)` runs exactly once**, in `src/App.jsx`. Section files must not call it.
- **All ScrollTrigger work is wrapped in `gsap.context()` and reverted on unmount**, matching the existing pattern at `src/App.jsx:312`. The pointer primitives (`TiltCard`, `Magnetic`, `Cursor`) are exempt: `gsap.quickTo`/`quickSetter` create no revertable tweens, so they clean up by removing their listeners and calling `gsap.set(el, { x: 0, y: 0, willChange: 'auto' })`. That is the correct pattern for setters — do not wrap them in a context.
- **Commit after every task.** Never bundle two tasks into one commit.

## Verification model

This project has no test suite and no browser test harness. Adding a full component-test rig for GSAP visual behaviour would cost more than it returns, so verification is split three ways:

- **Unit tests (Vitest)** cover *pure logic only* — token shape, tilt math, magnetic clamping, scramble output, data shape. Cheap, fast, and they catch real bugs.
- **Build + lint** (`npm run build`, `npm run lint`) gate every task.
- **Browser verification** via Chrome DevTools covers everything visual. Each task states exactly what to look at.

Do not write component tests that assert on GSAP transforms. They are slow, brittle, and prove nothing.

---

# PHASE 1 — Restructure (Tasks 1-7)

**Phase 1 must produce zero visible change.** At the end of Task 7 the site must look and behave exactly as it does now. That equivalence is the whole point: any difference is a refactor bug with an obvious cause, rather than something hidden under new animation later.

---

### Task 1: Test harness and motion tokens

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/motion/tokens.js`
- Test: `src/motion/tokens.test.js`

**Interfaces:**
- Consumes: nothing
- Produces: `npm test` command. `src/motion/tokens.js` exporting `duration`, `durationMs`, `ease`, `easeCss`, `limit` — every later task imports from here.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest@^3 jsdom@^26
```

- [ ] **Step 2: Add the test scripts**

In `package.json`, add to `"scripts"` (keep the existing four scripts unchanged):

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
```

- [ ] **Step 4: Write the failing test**

Create `src/motion/tokens.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { duration, durationMs, ease, easeCss, limit } from './tokens'

describe('motion tokens', () => {
  it('exposes GSAP durations in seconds', () => {
    expect(duration.fast).toBe(0.2)
    expect(duration.reveal).toBe(0.9)
  })

  it('exposes CSS durations in milliseconds matching the second values', () => {
    expect(durationMs.fast).toBe(duration.fast * 1000)
    expect(durationMs.reveal).toBe(duration.reveal * 1000)
  })

  it('exposes both GSAP and CSS easings', () => {
    expect(ease.out).toBe('power3.out')
    expect(easeCss.out).toBe('cubic-bezier(0.22, 1, 0.36, 1)')
  })

  it('caps motion distances to the agreed limits', () => {
    expect(limit.tilt).toBe(8)
    expect(limit.magnet).toBe(12)
    expect(limit.lift).toBe(-4)
  })
})
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./tokens"`

- [ ] **Step 6: Create `src/motion/tokens.js`**

```js
/* Shared motion vocabulary. Every animation in the app pulls from here so
   timings cannot drift apart. GSAP takes seconds, CSS takes milliseconds. */

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
  reveal: 0.9,
}

export const durationMs = {
  instant: 120,
  fast: 200,
  base: 320,
  slow: 600,
  reveal: 900,
}

export const ease = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  spring: 'elastic.out(1, 0.6)',
}

export const easeCss = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
}

export const limit = {
  lift: -4,
  tilt: 8,
  magnet: 12,
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 4 tests

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.js src/motion/tokens.js src/motion/tokens.test.js
git commit -m "test: add vitest harness and motion tokens"
```

---

### Task 2: Extract data constants and brand icons

**Files:**
- Create: `src/components/BrandIcons.jsx`
- Create: `src/data/nav.js`, `src/data/projects.js`, `src/data/pricing.js`, `src/data/skills.js`
- Modify: `src/App.jsx:31-160` (delete after moving), `src/App.jsx:1-27` (imports)

**Interfaces:**
- Consumes: nothing
- Produces:
  - `src/components/BrandIcons.jsx` → `export function GithubIcon({ className })`, `export function LinkedinIcon({ className })`
  - `src/data/nav.js` → `export const NAV_LINKS`, `export const SOCIAL_LINKS`
  - `src/data/projects.js` → `export const PROJECTS_FULL`
  - `src/data/pricing.js` → `export const PRICING_TIERS`
  - `src/data/skills.js` → `export const SKILLS_FULL`

**Critical:** `SOCIAL_LINKS` holds `Icon` component references, so `src/data/nav.js` imports from `BrandIcons.jsx`. `SKILLS_FULL` holds lucide `icon` references, so `src/data/skills.js` imports `Code, Terminal, Database, Cloud, GitBranch, Cpu` from `lucide-react`.

- [ ] **Step 1: Create `src/components/BrandIcons.jsx`**

Move `src/App.jsx:31-49` verbatim (the comment block and both icon functions), adding `export` to each function:

```jsx
/* ----------------------------------------------------------------
   Brand marks — lucide-react dropped logo icons, so these are
   small inline SVGs instead.
---------------------------------------------------------------- */
export function GithubIcon({ className }) {
  // ...exact SVG body from src/App.jsx:36-40, unchanged
}

export function LinkedinIcon({ className }) {
  // ...exact SVG body from src/App.jsx:44-48, unchanged
}
```

Copy the `<path d="...">` strings character-for-character. Do not retype them.

- [ ] **Step 2: Create the four data modules**

`src/data/nav.js` — move `NAV_LINKS` (`src/App.jsx:54-61`) and `SOCIAL_LINKS` (`:63-66`) verbatim, adding `export`:

```js
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'

export const NAV_LINKS = [ /* verbatim from src/App.jsx:54-61 */ ]
export const SOCIAL_LINKS = [ /* verbatim from src/App.jsx:63-66 */ ]
```

`src/data/pricing.js` — move `PRICING_TIERS` (`:68-96`) verbatim with `export`. No imports needed.

`src/data/projects.js` — move `PROJECTS_FULL` (`:98-127`) verbatim with `export`. No imports needed. **Do not add the new case-study fields yet** — that is Task 14.

`src/data/skills.js`:

```js
import { Code, Terminal, Database, Cloud, GitBranch, Cpu } from 'lucide-react'

export const SKILLS_FULL = [ /* verbatim from src/App.jsx:129-160 */ ]
```

- [ ] **Step 3: Update `src/App.jsx`**

Delete lines 31-160 (brand icons comment through the end of `SKILLS_FULL`). Add these imports after the existing `portraitSunset` import:

```jsx
import { GithubIcon, LinkedinIcon } from './components/BrandIcons'
import { NAV_LINKS, SOCIAL_LINKS } from './data/nav'
import { PROJECTS_FULL } from './data/projects'
import { PRICING_TIERS } from './data/pricing'
import { SKILLS_FULL } from './data/skills'
```

Then remove `Code, Terminal, Database, Cloud, GitBranch, Cpu` from the `lucide-react` import in `src/App.jsx:5-26` — they are now only used by `src/data/skills.js`. Leave every other lucide import in place.

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, oxlint reports no errors. If oxlint flags an unused lucide import, remove that specific import.

- [ ] **Step 5: Verify in browser**

Run `npm run dev`, open the site. Check: navbar links present, 4 project cards render, pricing shows 3 tiers, services grid shows 6 cards with icons, footer shows social icons and 4 service links. Console clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/BrandIcons.jsx src/data src/App.jsx
git commit -m "refactor: extract data constants and brand icons from App.jsx"
```

---

### Task 3: Extract leaf and showcase components

**Files:**
- Create: `src/components/showcases/StackShuffler.jsx`, `src/components/showcases/CodeScan.jsx`, `src/components/showcases/BookingScheduler.jsx`
- Create: `src/components/ProjectMock.jsx`, `src/components/CountUp.jsx`, `src/components/Field.jsx`
- Modify: `src/App.jsx` (delete moved blocks, add imports)

**Interfaces:**
- Consumes: nothing from earlier tasks
- Produces:
  - `export default function StackShuffler()` / `CodeScan()` / `BookingScheduler()` — no props
  - `export default function ProjectMock({ tone })` — `tone` is `{ from, to, accent }` of CSS variable name strings
  - `export default function CountUp({ target, duration = 1800 })`
  - `export default function Field({ label, name, type = 'text', required, value, onChange })` — `onChange` receives the raw string value, not an event

- [ ] **Step 1: Move the six components**

Each moves verbatim into its own file. Line ranges in the *current* `src/App.jsx` (before this task's deletions):

| Component | Lines | New file |
| --- | --- | --- |
| `StackShuffler` | 397-459 | `src/components/showcases/StackShuffler.jsx` |
| `CodeScan` | 460-629 | `src/components/showcases/CodeScan.jsx` |
| `BookingScheduler` | 630-704 | `src/components/showcases/BookingScheduler.jsx` |
| `ProjectMock` | 801-823 | `src/components/ProjectMock.jsx` |
| `CountUp` | 1009-1046 | `src/components/CountUp.jsx` |
| `Field` | 1547-1570 | `src/components/Field.jsx` |

Work bottom-up (`Field` first, `StackShuffler` last) so earlier line numbers stay valid as you delete.

Change each `function X()` to `export default function X()`. Each file needs its own import header — read the moved body and import exactly what it references:

- All three showcases and `CountUp` use React hooks → `import { useEffect, useRef, useState } from 'react'` (include only the hooks that body actually uses)
- Showcases using GSAP → `import { gsap } from 'gsap'`
- Showcases and `Field` using lucide icons → import those specific icons from `lucide-react`
- `ProjectMock` needs no imports

- [ ] **Step 2: Add imports to `src/App.jsx`**

```jsx
import StackShuffler from './components/showcases/StackShuffler'
import CodeScan from './components/showcases/CodeScan'
import BookingScheduler from './components/showcases/BookingScheduler'
import ProjectMock from './components/ProjectMock'
import CountUp from './components/CountUp'
import Field from './components/Field'
```

- [ ] **Step 3: Prune now-unused lucide imports from `src/App.jsx`**

Run: `npm run lint`
Remove any lucide icon oxlint now reports as unused. Do not guess — let the linter name them.

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 5: Verify in browser**

Scroll to the "Amiben segíthetek" section. All three showcase demos must still animate (stack shuffling, code scanning, booking calendar). Check the About stats count up on scroll, project card gradient mocks render, and the contact form fields accept typing.

- [ ] **Step 6: Commit**

```bash
git add src/components src/App.jsx
git commit -m "refactor: extract leaf and showcase components from App.jsx"
```

---

### Task 4: Extract sections, batch 1

**Files:**
- Create: `src/sections/Navbar.jsx`, `src/sections/Hero.jsx`, `src/sections/Features.jsx`, `src/sections/Projects.jsx`, `src/sections/About.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `src/data/*` (Task 2), `src/components/*` (Task 3)
- Produces: `export default function Navbar/Hero/Features/Projects/About()` — all take no props

- [ ] **Step 1: Move each section verbatim**

Line ranges refer to `src/App.jsx` **as it stands after Task 3**. Re-grep before moving rather than trusting stale numbers:

```bash
grep -n "^function " src/App.jsx
```

Move `Navbar`, `Hero`, `Features`, `Projects`, `About` — each including its preceding `/* ---- */` comment block — into the matching file. Change `function X()` to `export default function X()`.

- [ ] **Step 2: Give each file its own imports**

Read each moved body and import exactly what it uses. Reference:

- `Navbar.jsx` — react hooks; lucide icons used in the body (`Menu`, `X`, `Hexagon` — verify); `NAV_LINKS, SOCIAL_LINKS` from `../data/nav`
- `Hero.jsx` — react hooks; `gsap` from `gsap`; lucide icons used in the body
- `Features.jsx` — react hooks; the three showcases from `../components/showcases/*`
- `Projects.jsx` — react hooks; `PROJECTS_FULL` from `../data/projects`; `ProjectMock` from `../components/ProjectMock`
- `About.jsx` — react hooks; `portraitSunset` from `../assets/portrait-sunset.jpg`; `SOCIAL_LINKS` from `../data/nav`; `CountUp` from `../components/CountUp`; lucide icons used in the body

**Do not** call `gsap.registerPlugin(ScrollTrigger)` in any section file. It stays in `App.jsx`.

- [ ] **Step 3: Update `src/App.jsx`**

Delete the five moved blocks. Add:

```jsx
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Projects from './sections/Projects'
import About from './sections/About'
```

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both clean. Prune any lucide or data import oxlint now reports unused in `App.jsx`.

- [ ] **Step 5: Verify in browser**

Reload and scroll the top half of the page. Check specifically:
- Hero headline entrance animation still plays on load
- Navbar scroll state (background change on scroll) still fires
- Mobile menu opens and closes at 375px width
- Projects cards stagger in on scroll
- About portrait and stats render

Console must be clean. A `ScrollTrigger` warning here means a section moved out of its original DOM order — check `App.jsx` composition order matches the original.

- [ ] **Step 6: Commit**

```bash
git add src/sections src/App.jsx
git commit -m "refactor: extract Navbar, Hero, Features, Projects, About into sections"
```

---

### Task 5: Extract sections, batch 2

**Files:**
- Create: `src/sections/Pillars.jsx`, `Protocol.jsx`, `ServicesGrid.jsx`, `Pricing.jsx`, `TrustSignals.jsx`, `ContactForm.jsx`, `Footer.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `src/data/*`, `src/components/Field`
- Produces: `export default function Pillars/Protocol/ServicesGrid/Pricing/TrustSignals/ContactForm/Footer()` — no props

- [ ] **Step 1: Move each section verbatim**

Same method as Task 4. Re-grep for current line numbers first. Import notes:

- `Protocol.jsx` — uses `gsap` **and** `ScrollTrigger` for the pinned card stack. Import both: `import { gsap } from 'gsap'` and `import { ScrollTrigger } from 'gsap/ScrollTrigger'`. Registration still happens only in `App.jsx`; importing the plugin here is required so the module resolves, but do not re-register it.
- `ServicesGrid.jsx` — `SKILLS_FULL` from `../data/skills`
- `Pricing.jsx` — `PRICING_TIERS` from `../data/pricing`
- `ContactForm.jsx` — `Field` from `../components/Field`; lucide icons; react hooks
- `Footer.jsx` — `Link` from `react-router-dom`; `SOCIAL_LINKS` from `../data/nav`; `SKILLS_FULL` from `../data/skills`; lucide icons

- [ ] **Step 2: Update `src/App.jsx`**

After deleting the moved blocks, `App.jsx` should contain only imports, `gsap.registerPlugin(ScrollTrigger)`, and the `App` component. Final expected content:

```jsx
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import About from './sections/About'
import Features from './sections/Features'
import Pillars from './sections/Pillars'
import Protocol from './sections/Protocol'
import ServicesGrid from './sections/ServicesGrid'
import Pricing from './sections/Pricing'
import TrustSignals from './sections/TrustSignals'
import ContactForm from './sections/ContactForm'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 200)
    const t2 = setTimeout(refresh, 1000)
    document.fonts?.ready?.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <Pricing />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
```

**The section order in `<main>` must match the original exactly.** ScrollTrigger positions depend on it.

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 4: Full-page browser verification**

This is the parity gate for the whole refactor. Scroll the entire page top to bottom and confirm:
- Every section renders in the original order
- The Protocol pinned card stack still pins and releases correctly
- Pricing, TrustSignals, ContactForm and Footer all fade in on scroll
- The contact form still validates and submits as before
- `/adatvedelem` and `/aszf` footer links still route
- Console clean at 1440px and 375px widths

- [ ] **Step 5: Commit**

```bash
git add src/sections src/App.jsx
git commit -m "refactor: extract remaining sections, reduce App.jsx to composition"
```

---

### Task 6: `useInView` and `useReducedMotion` hooks

**Files:**
- Create: `src/motion/useInView.js`, `src/motion/useInView.test.js`
- Create: `src/motion/useReducedMotion.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `export function useInView(threshold = 0.15)` → returns `[ref, visible]` where `ref` attaches to the observed element and `visible` latches true once and never returns to false
  - `export function useReducedMotion()` → boolean
  - `export function useFinePointer()` → boolean, true when `(pointer: fine)` matches

- [ ] **Step 1: Install the testing library**

```bash
npm install -D @testing-library/react@^16
```

- [ ] **Step 2: Write the failing test**

Create `src/motion/useInView.test.js`:

```js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInView } from './useInView'

let triggerIntersect

beforeEach(() => {
  triggerIntersect = null
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb) { triggerIntersect = cb }
    observe() {}
    disconnect() {}
    unobserve() {}
  })
})

describe('useInView', () => {
  it('starts hidden', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current[1]).toBe(false)
  })

  it('latches visible once intersecting and never unlatches', () => {
    const { result } = renderHook(() => useInView())
    act(() => triggerIntersect([{ isIntersecting: true }]))
    expect(result.current[1]).toBe(true)
    act(() => triggerIntersect([{ isIntersecting: false }]))
    expect(result.current[1]).toBe(true)
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./useInView"`

- [ ] **Step 4: Create `src/motion/useInView.js`**

This is a verbatim generalisation of the ten duplicated observer blocks:

```js
import { useEffect, useRef, useState } from 'react'

/* Replaces the ten hand-rolled IntersectionObserver blocks that used to
   live in each section. Latches true on first intersection and disconnects,
   matching the original behaviour exactly. */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
```

- [ ] **Step 5: Create `src/motion/useReducedMotion.js`**

```js
import { useEffect, useState } from 'react'

const REDUCED = '(prefers-reduced-motion: reduce)'
const FINE = '(pointer: fine)'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/* True when the visitor has asked the OS to reduce motion. Every motion
   primitive must consult this and degrade to a static or fade-only state. */
export function useReducedMotion() {
  return useMediaQuery(REDUCED)
}

/* True only for precise pointers (mouse, trackpad). Gates cursor, tilt and
   magnetic effects off on touch devices. */
export function useFinePointer() {
  return useMediaQuery(FINE)
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 6 tests total

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/motion
git commit -m "feat: add useInView and useReducedMotion motion hooks"
```

---

### Task 7: Replace the ten duplicated observers

**Files:**
- Modify: every section file holding an `IntersectionObserver` block

**Interfaces:**
- Consumes: `useInView` from Task 6
- Produces: no new interface. Removes roughly 110 lines of duplication.

- [ ] **Step 1: Find every remaining observer**

```bash
grep -rn "new IntersectionObserver" src/
```

Expected: 10 hits across the section files, plus the single implementation in `src/motion/useInView.js`.

- [ ] **Step 2: Replace each one**

In each section, delete this block:

```jsx
const sectionRef = useRef(null)
const [visible, setVisible] = useState(false)

useEffect(() => {
  const el = sectionRef.current
  if (!el) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  observer.observe(el)
  return () => observer.disconnect()
}, [])
```

and replace it with:

```jsx
const [sectionRef, visible] = useInView(0.15)
```

**Preserve each section's original threshold value.** They are not all `0.15` — `Projects` uses `0.1`. Read the block you are deleting and pass that exact number.

The local ref variable name differs per section (`sectionRef`, `ref`, `containerRef`). Keep whatever name that section already uses, so the JSX below it needs no edit.

Add the import: `import { useInView } from '../motion/useInView'`

Then remove `useRef` and/or `useState` from that file's react import **only if** nothing else in the file uses them. Let oxlint tell you.

- [ ] **Step 3: Verify no observers remain in sections**

```bash
grep -rn "new IntersectionObserver" src/sections/
```
Expected: no output.

- [ ] **Step 4: Verify build, lint and tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Browser parity check**

Scroll the full page. Every section that faded in before must still fade in, at the same scroll position, with the same stagger. Pay particular attention to `Projects` — its threshold is `0.1`, not `0.15`, and using the wrong value makes the cards appear noticeably early or late.

- [ ] **Step 6: Commit**

```bash
git add src/sections
git commit -m "refactor: replace ten duplicated observers with useInView"
```

**PHASE 1 GATE:** Before starting Task 8, confirm the site is visually identical to the pre-refactor build. Any difference is a bug to fix now, not later.

---

# PHASE 2 — Motion primitives and application (Tasks 8-13)

---

### Task 8: `TiltCard`

**Files:**
- Create: `src/motion/tilt.js`, `src/motion/tilt.test.js`, `src/motion/TiltCard.jsx`

**Interfaces:**
- Consumes: `tokens.js`, `useReducedMotion`, `useFinePointer`
- Produces:
  - `src/motion/tilt.js` → `export function tiltFromPointer(rect, clientX, clientY, maxDeg)` returning `{ rotateX, rotateY, px, py }` where `px`/`py` are 0-100 percentages for the sheen position
  - `src/motion/TiltCard.jsx` → `export function TiltCard({ children, className, sheen = true, max, ...rest })`

- [ ] **Step 1: Write the failing test**

Create `src/motion/tilt.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { tiltFromPointer } from './tilt'

const rect = { left: 0, top: 0, width: 200, height: 100 }

describe('tiltFromPointer', () => {
  it('is flat at the centre', () => {
    const t = tiltFromPointer(rect, 100, 50, 8)
    expect(t.rotateX).toBeCloseTo(0)
    expect(t.rotateY).toBeCloseTo(0)
    expect(t.px).toBeCloseTo(50)
    expect(t.py).toBeCloseTo(50)
  })

  it('tilts to the cap at the corners', () => {
    const t = tiltFromPointer(rect, 200, 0, 8)
    expect(t.rotateY).toBeCloseTo(8)
    expect(t.rotateX).toBeCloseTo(8)
  })

  it('never exceeds the cap even outside the rect', () => {
    const t = tiltFromPointer(rect, 1000, -1000, 8)
    expect(Math.abs(t.rotateX)).toBeLessThanOrEqual(8)
    expect(Math.abs(t.rotateY)).toBeLessThanOrEqual(8)
  })

  it('inverts rotateX so the top edge leans away', () => {
    const top = tiltFromPointer(rect, 100, 0, 8)
    const bottom = tiltFromPointer(rect, 100, 100, 8)
    expect(top.rotateX).toBeGreaterThan(0)
    expect(bottom.rotateX).toBeLessThan(0)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./tilt`

- [ ] **Step 3: Create `src/motion/tilt.js`**

```js
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* Maps a pointer position inside a rect to card rotation and sheen
   position. Pure, so it can be tested without a DOM. */
export function tiltFromPointer(rect, clientX, clientY, maxDeg) {
  const nx = clamp((clientX - rect.left) / rect.width, 0, 1)
  const ny = clamp((clientY - rect.top) / rect.height, 0, 1)

  return {
    rotateY: (nx - 0.5) * 2 * maxDeg,
    rotateX: (0.5 - ny) * 2 * maxDeg,
    px: nx * 100,
    py: ny * 100,
  }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`
Expected: PASS, 10 tests total

- [ ] **Step 5: Create `src/motion/TiltCard.jsx`**

```jsx
import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { duration, ease, limit } from './tokens'
import { tiltFromPointer } from './tilt'
import { useReducedMotion, useFinePointer } from './useReducedMotion'

/* 3D tilt with a specular sheen that tracks the pointer. Writes only
   transforms via gsap.quickTo, and never reads layout inside the frame
   loop — the rect is measured once on pointer enter. */
export function TiltCard({ children, className = '', sheen = true, max = limit.tilt, ...rest }) {
  const ref = useRef(null)
  const sheenRef = useRef(null)
  const rectRef = useRef(null)
  const quick = useRef(null)

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = !reduced && fine

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    quick.current = {
      rx: gsap.quickTo(el, 'rotateX', { duration: duration.base, ease: ease.out }),
      ry: gsap.quickTo(el, 'rotateY', { duration: duration.base, ease: ease.out }),
    }

    return () => {
      gsap.set(el, { rotateX: 0, rotateY: 0, willChange: 'auto' })
      quick.current = null
    }
  }, [active])

  const onEnter = useCallback(() => {
    const el = ref.current
    if (!el || !active) return
    rectRef.current = el.getBoundingClientRect()
    el.style.willChange = 'transform'
  }, [active])

  const onMove = useCallback((e) => {
    const rect = rectRef.current
    if (!rect || !quick.current) return
    const t = tiltFromPointer(rect, e.clientX, e.clientY, max)
    quick.current.rx(t.rotateX)
    quick.current.ry(t.rotateY)
    if (sheenRef.current) {
      sheenRef.current.style.setProperty('--sheen-x', `${t.px}%`)
      sheenRef.current.style.setProperty('--sheen-y', `${t.py}%`)
      sheenRef.current.style.opacity = '1'
    }
  }, [max])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (quick.current) {
      quick.current.rx(0)
      quick.current.ry(0)
    }
    if (sheenRef.current) sheenRef.current.style.opacity = '0'
    el.style.willChange = 'auto'
  }, [])

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={active ? { transformStyle: 'preserve-3d', perspective: 900 } : undefined}
      onPointerEnter={active ? onEnter : undefined}
      onPointerMove={active ? onMove : undefined}
      onPointerLeave={active ? onLeave : undefined}
      {...rest}
    >
      {children}
      {active && sheen && (
        <span
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
          style={{
            background:
              'radial-gradient(320px circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgb(255 255 255 / 0.10), transparent 60%)',
          }}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 6: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 7: Commit**

```bash
git add src/motion
git commit -m "feat: add TiltCard motion primitive"
```

---

### Task 9: `Magnetic`

**Files:**
- Create: `src/motion/magnet.js`, `src/motion/magnet.test.js`, `src/motion/Magnetic.jsx`

**Interfaces:**
- Consumes: `tokens.js`, `useReducedMotion`, `useFinePointer`
- Produces:
  - `src/motion/magnet.js` → `export function magnetOffset(rect, clientX, clientY, strength, cap)` returning `{ x, y }`
  - `src/motion/Magnetic.jsx` → `export function Magnetic({ children, className, strength = 0.35 })`

- [ ] **Step 1: Write the failing test**

Create `src/motion/magnet.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { magnetOffset } from './magnet'

const rect = { left: 0, top: 0, width: 100, height: 40 }

describe('magnetOffset', () => {
  it('is zero at the centre', () => {
    const o = magnetOffset(rect, 50, 20, 0.35, 12)
    expect(o.x).toBeCloseTo(0)
    expect(o.y).toBeCloseTo(0)
  })

  it('pulls toward the pointer', () => {
    const o = magnetOffset(rect, 100, 20, 0.35, 12)
    expect(o.x).toBeGreaterThan(0)
  })

  it('never exceeds the cap in either direction', () => {
    const far = magnetOffset(rect, 5000, 5000, 0.35, 12)
    expect(far.x).toBeLessThanOrEqual(12)
    expect(far.y).toBeLessThanOrEqual(12)
    const near = magnetOffset(rect, -5000, -5000, 0.35, 12)
    expect(near.x).toBeGreaterThanOrEqual(-12)
    expect(near.y).toBeGreaterThanOrEqual(-12)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./magnet`

- [ ] **Step 3: Create `src/motion/magnet.js`**

```js
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* Displacement toward the pointer, damped by strength and hard-capped so a
   fast pointer cannot fling the element across the layout. */
export function magnetOffset(rect, clientX, clientY, strength, cap) {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  return {
    x: clamp((clientX - cx) * strength, -cap, cap),
    y: clamp((clientY - cy) * strength, -cap, cap),
  }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`
Expected: PASS, 13 tests total

- [ ] **Step 5: Create `src/motion/Magnetic.jsx`**

The transparent padded wrapper is what lets the pull engage slightly before the pointer visually touches the element, without attaching a document-level listener.

```jsx
import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { duration, ease, limit } from './tokens'
import { magnetOffset } from './magnet'
import { useReducedMotion, useFinePointer } from './useReducedMotion'

const PAD = 16

/* Pulls its child toward the pointer and springs back on leave. The
   negative-margin padded wrapper widens the hit area so the pull engages
   just before visual contact, without a document-level listener. */
export function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null)
  const rectRef = useRef(null)
  const quick = useRef(null)

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = !reduced && fine

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    quick.current = {
      x: gsap.quickTo(el, 'x', { duration: duration.base, ease: ease.out }),
      y: gsap.quickTo(el, 'y', { duration: duration.base, ease: ease.out }),
    }

    return () => {
      gsap.set(el, { x: 0, y: 0, willChange: 'auto' })
      quick.current = null
    }
  }, [active])

  const onEnter = useCallback(() => {
    const el = ref.current
    if (!el || !active) return
    rectRef.current = el.getBoundingClientRect()
    el.style.willChange = 'transform'
  }, [active])

  const onMove = useCallback((e) => {
    const rect = rectRef.current
    if (!rect || !quick.current) return
    const o = magnetOffset(rect, e.clientX, e.clientY, strength, limit.magnet)
    quick.current.x(o.x)
    quick.current.y(o.y)
  }, [strength])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: duration.slow, ease: ease.spring })
    el.style.willChange = 'auto'
  }, [])

  if (!active) return <span className={className}>{children}</span>

  return (
    <span
      style={{ padding: PAD, margin: -PAD, display: 'inline-block' }}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span ref={ref} className={`inline-block ${className}`}>
        {children}
      </span>
    </span>
  )
}
```

- [ ] **Step 6: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 7: Commit**

```bash
git add src/motion
git commit -m "feat: add Magnetic motion primitive"
```

---

### Task 10: `ScrambleText`

**Files:**
- Create: `src/motion/scramble.js`, `src/motion/scramble.test.js`, `src/motion/ScrambleText.jsx`

**Interfaces:**
- Consumes: `tokens.js`, `useReducedMotion`, `useInView`
- Produces:
  - `src/motion/scramble.js` → `export function scrambleFrame(target, progress, seed)` returning a string of the same length as `target`
  - `src/motion/ScrambleText.jsx` → `export function ScrambleText({ text, className, trigger = 'inView', as = 'span' })` where `trigger` is `'inView'` or `'hover'`

- [ ] **Step 1: Write the failing test**

Create `src/motion/scramble.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { scrambleFrame } from './scramble'

describe('scrambleFrame', () => {
  it('never changes string length, so layout cannot reflow', () => {
    const target = 'Modern Tech Stack'
    for (const p of [0, 0.25, 0.5, 0.75, 1]) {
      expect(scrambleFrame(target, p, 1).length).toBe(target.length)
    }
  })

  it('returns the exact target at full progress', () => {
    expect(scrambleFrame('Projektek', 1, 1)).toBe('Projektek')
  })

  it('preserves whitespace at every progress', () => {
    expect(scrambleFrame('a b', 0.4, 7)[1]).toBe(' ')
  })

  it('resolves more characters as progress increases', () => {
    const target = 'Kapcsolat'
    const match = (s) => [...s].filter((c, i) => c === target[i]).length
    expect(match(scrambleFrame(target, 0.8, 3))).toBeGreaterThan(
      match(scrambleFrame(target, 0.2, 3))
    )
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./scramble`

- [ ] **Step 3: Create `src/motion/scramble.js`**

```js
const GLYPHS = '!<>-_\\/[]{}—=+*^?#'

/* One frame of a decode reveal. Characters resolve left to right as
   progress runs 0 -> 1. Output length always equals target length and
   whitespace is never scrambled, so the line cannot reflow mid-animation. */
export function scrambleFrame(target, progress, seed = 1) {
  const resolved = Math.floor(target.length * progress)

  return [...target]
    .map((char, i) => {
      if (char === ' ' || i < resolved) return char
      const n = (i * 31 + seed * 17 + Math.floor(progress * 100)) % GLYPHS.length
      return GLYPHS[n]
    })
    .join('')
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`
Expected: PASS, 17 tests total

- [ ] **Step 5: Create `src/motion/ScrambleText.jsx`**

```jsx
import { useCallback, useEffect, useRef, useState } from 'react'
import { durationMs } from './tokens'
import { scrambleFrame } from './scramble'
import { useInView } from './useInView'
import { useReducedMotion } from './useReducedMotion'

/* Decode-style reveal. The plain text is always present for screen readers;
   only the visual layer scrambles. */
export function ScrambleText({ text, className = '', trigger = 'inView', as: Tag = 'span' }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const seed = useRef(Math.floor(Math.random() * 100))
  const reduced = useReducedMotion()
  const [inViewRef, visible] = useInView(0.4)

  const run = useCallback(() => {
    if (reduced) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs.slow, 1)
      setDisplay(scrambleFrame(text, progress, seed.current))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [text, reduced])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  useEffect(() => {
    setDisplay(text)
  }, [text])

  useEffect(() => {
    if (trigger === 'inView' && visible) run()
  }, [trigger, visible, run])

  return (
    <Tag
      ref={trigger === 'inView' ? inViewRef : undefined}
      className={className}
      onPointerEnter={trigger === 'hover' ? run : undefined}
    >
      <span aria-hidden="true">{reduced ? text : display}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
```

- [ ] **Step 6: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean. `sr-only` is a built-in Tailwind utility — do not add a custom definition for it.

- [ ] **Step 7: Commit**

```bash
git add src/motion
git commit -m "feat: add ScrambleText motion primitive"
```

---

### Task 11: `Cursor`

**Files:**
- Create: `src/motion/Cursor.jsx`
- Modify: `src/App.jsx`, `src/index.css`

**Interfaces:**
- Consumes: `tokens.js`, `useReducedMotion`, `useFinePointer`
- Produces: `export function Cursor()` — mounted once in `App`. Reads `data-cursor` and `data-cursor-label` attributes off hovered elements via one delegated listener.

- [ ] **Step 1: Create `src/motion/Cursor.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { duration, ease } from './tokens'
import { useReducedMotion, useFinePointer } from './useReducedMotion'

/* Dot tracks the pointer exactly; ring lerps behind it. Elements opt in
   with data-cursor="link|card|text" and optional data-cursor-label, so
   adding a cursor state anywhere is a markup change, never a wiring one. */
export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [mode, setMode] = useState('default')
  const [label, setLabel] = useState('')

  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const active = !reduced && fine

  useEffect(() => {
    if (!active) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickSetter(dot, 'x', 'px')
    const dotY = gsap.quickSetter(dot, 'y', 'px')
    const ringX = gsap.quickTo(ring, 'x', { duration: duration.base, ease: ease.out })
    const ringY = gsap.quickTo(ring, 'y', { duration: duration.base, ease: ease.out })

    const onMove = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor]')
      if (target) {
        setMode(target.dataset.cursor)
        setLabel(target.dataset.cursorLabel || '')
      } else {
        setMode('default')
        setLabel('')
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [active])

  useEffect(() => {
    document.documentElement.classList.toggle('has-custom-cursor', active)
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [active])

  if (!active) return null

  const ringSize = mode === 'card' ? 'h-16 w-16' : mode === 'link' ? 'h-12 w-12' : 'h-8 w-8'

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ opacity: mode === 'text' ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 transition-[height,width,background-color] duration-200 ${ringSize} ${
          mode === 'card' ? 'bg-primary/90' : ''
        }`}
      >
        {mode === 'card' && label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-white">{label}</span>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Hide the native cursor only where the custom one is active**

Append to `src/index.css`:

```css
/* The custom cursor replaces the native one only on fine pointers. Text
   inputs keep their native caret so typing stays legible. */
.has-custom-cursor,
.has-custom-cursor a,
.has-custom-cursor button {
  cursor: none;
}

.has-custom-cursor input,
.has-custom-cursor textarea,
.has-custom-cursor select {
  cursor: auto;
}
```

- [ ] **Step 3: Mount it in `src/App.jsx`**

Add the import and render it as the first child of the root `<div>`, before `noise-overlay`:

```jsx
import { Cursor } from './motion/Cursor'
```

```jsx
    <div className="relative">
      <Cursor />
      <div className="noise-overlay" />
```

- [ ] **Step 4: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Browser verification**

- Desktop: the dot and ring follow the pointer with the ring trailing. No `data-cursor` attributes exist yet, so the ring should stay at its default size everywhere.
- Type into a contact form field — the native caret must still be visible and usable.
- Emulate a touch device: `Cursor` must render nothing and the native cursor must be restored.
- Emulate `prefers-reduced-motion: reduce`: same — nothing renders.

- [ ] **Step 6: Commit**

```bash
git add src/motion/Cursor.jsx src/App.jsx src/index.css
git commit -m "feat: add custom cursor with declarative data-cursor targets"
```

---

### Task 12: Apply motion — Navbar, Hero, Projects, Features

**Files:**
- Modify: `src/sections/Navbar.jsx`, `src/sections/Hero.jsx`, `src/sections/Projects.jsx`, `src/sections/Features.jsx`, `src/components/ProjectMock.jsx`

**Interfaces:**
- Consumes: `TiltCard`, `Magnetic`, `ScrambleText`, `tokens`
- Produces: no new module interface

- [ ] **Step 1: Navbar**

Imports needed across this task:

```jsx
import { TiltCard } from '../motion/TiltCard'
import { Magnetic } from '../motion/Magnetic'
import { ScrambleText } from '../motion/ScrambleText'
```

- Wrap the logo text in `<ScrambleText text="..." trigger="hover" />`
- Add `data-cursor="link"` to every nav anchor and the mobile menu toggle
- Add an underline that wipes in from the left. Add `group relative` to each nav link's className, and this as the link's last child:

```jsx
<span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-[width] duration-200 ease-out group-hover:w-full" />
```

- [ ] **Step 2: Hero**

- Wrap the primary CTA in `<Magnetic>` and add `data-cursor="link"`
- Add `group` to the CTA, and `transition-transform duration-200 group-hover:translate-x-1` to its arrow icon
- Leave the existing GSAP entrance timeline alone — it already works, and retiming it risks the load animation

Add the pointer-tracked sweep across the chrome headline. Add `sweep-target` to the `hero-line-1` / `hero-line-2` headline wrapper, then inside the existing `gsap.context()` in `Hero.jsx`:

```jsx
const hero = heroRef.current
const onSweep = (e) => {
  const el = hero.querySelector('.sweep-target')
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--sweep-x', `${((e.clientX - r.left) / r.width) * 100}%`)
}
hero.addEventListener('pointermove', onSweep, { passive: true })
// remove it in the same cleanup that reverts the context
```

and in `src/index.css`:

```css
/* Pointer-tracked highlight riding over the chrome headline. */
.sweep-target {
  position: relative;
}

.sweep-target::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    280px circle at var(--sweep-x, 50%) 50%,
    rgb(255 255 255 / 0.18),
    transparent 70%
  );
}

@media (prefers-reduced-motion: reduce) {
  .sweep-target::after { display: none; }
}
```

- [ ] **Step 3: Projects**

Wrap each card's inner content in `<TiltCard className="h-full">`, and add to the card element:

```jsx
data-cursor="card"
data-cursor-label="Részletek"
```

- [ ] **Step 4: Animate `ProjectMock` on hover**

In `src/components/ProjectMock.jsx`, the three placeholder bars currently render at fixed widths. Add hover transitions so they animate in sequence. The `group` class already exists on the project card in `src/sections/Projects.jsx`, so `group-hover:` works here:

```jsx
<div
  className="h-3 w-1/4 rounded-full transition-[width] duration-500 ease-out group-hover:w-2/3"
  style={{ background: `rgb(var(${tone.accent}) / 0.3333)` }}
/>
<div className="h-3 w-1/6 rounded-full mt-2.5 bg-white/15 transition-[width] delay-75 duration-500 ease-out group-hover:w-1/3" />
<div
  className="h-16 w-full rounded-xl mt-4 border border-white/10 opacity-60 transition-opacity delay-150 duration-500 ease-out group-hover:opacity-100"
  style={{ background: `rgb(var(${tone.accent}) / 0.0941)` }}
/>
```

Note the resting widths are reduced from the originals (`2/3` → `1/4`, `1/3` → `1/6`) so there is somewhere to animate *to*. Keep the `style` props exactly as they are — those carry the theme colours.

- [ ] **Step 5: Features**

Wrap each of the three showcase cards in `<TiltCard max={4}>` — a lower cap than the default 8deg, because these cards contain their own animating demos and a strong tilt fights them. Do not touch `StackShuffler`, `CodeScan` or `BookingScheduler` internals.

- [ ] **Step 6: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 7: Browser verification**

- Nav links: underline wipes from the left, cursor ring expands
- Logo scrambles on hover and settles on the correct text
- Hero CTA pulls toward the pointer and springs back
- Project cards tilt, show the sheen, cursor becomes a pill reading `Részletek`, mock bars animate in sequence
- Feature cards tilt gently without disturbing their demos
- At 375px nothing tilts and no cursor renders
- Console clean

- [ ] **Step 8: Commit**

```bash
git add src/sections src/components/ProjectMock.jsx
git commit -m "feat: apply motion primitives to Navbar, Hero, Projects, Features"
```

---

### Task 13: Apply motion — remaining sections

**Files:**
- Modify: `src/sections/About.jsx`, `Pillars.jsx`, `Protocol.jsx`, `ServicesGrid.jsx`, `Pricing.jsx`, `TrustSignals.jsx`, `ContactForm.jsx`, `Footer.jsx`
- Modify: `src/data/skills.js`, `tailwind.config.js`

**Interfaces:**
- Consumes: `TiltCard`, `Magnetic`, `ScrambleText`, `tokens`
- Produces: `SKILLS_FULL` entries gain a `detail` string field, consumed by `ServicesGrid`

- [ ] **Step 1: About**

Add `group` to the portrait's wrapping element, and to the `<img>`:

```jsx
className="... grayscale-[0.4] sepia-[0.15] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-[1.02]"
```

Then add the word-by-word bio fade. Split the bio paragraph on spaces and stagger each word off the section's existing `visible` boolean:

```jsx
<p className="...">
  {BIO_TEXT.split(' ').map((word, i) => (
    <span
      key={i}
      className="inline-block transition-all duration-500 ease-out motion-reduce:transition-none"
      style={{
        transitionDelay: visible ? `${i * 18}ms` : '0ms',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
      }}
    >
      {word}&nbsp;
    </span>
  ))}
</p>
```

Assign the existing paragraph's literal string to a `const BIO_TEXT` above the return rather than retyping it. The trailing `&nbsp;` is what preserves word spacing once each word becomes an inline-block.

- [ ] **Step 2: Pillars — focus by subtraction**

Add local state:

```jsx
const [focused, setFocused] = useState(null)
```

On each pillar element:

```jsx
onPointerEnter={() => setFocused(i)}
onPointerLeave={() => setFocused(null)}
className={`... transition-all duration-300 ease-out ${
  focused !== null && focused !== i ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
}`}
```

- [ ] **Step 3: Protocol**

Add `data-cursor="link"` to each `.protocol-card`. **Do not add tilt here** — these cards are already pinned and transformed by ScrollTrigger, and stacking a second transform source on them causes jitter.

Add the scroll-linked progress rail. Render it as the first child of the section, outside the pinned card stack:

```jsx
<div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-divider">
  <div className="progress-rail h-full w-full origin-top scale-y-0 bg-primary" />
</div>
```

and inside the existing `gsap.context()` in `Protocol.jsx`, alongside the current card triggers:

```jsx
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
```

Use whatever ref name `Protocol.jsx` already uses for the section container — it is `containerRef` in the original code, but confirm before writing.

- [ ] **Step 4: Add `detail` copy to `src/data/skills.js`**

Add a `detail` field to each of the six entries. Write them in Hungarian, two to three sentences each, in the same register as the existing `text` — direct and concrete, no marketing language. The first one, as the pattern to follow:

```js
detail: 'A gyakorlatban ez React 19-et, Vite-ot és Tailwindet jelent, komponens-alapú felépítéssel. Minden felület mobilra is optimalizált, a betöltési időt pedig méréssel ellenőrzöm, nem érzésre.',
```

Write the remaining five for Backend Fejlesztés, Adatbázis Tervezés, Felhő & Deployment, Verziókezelés & Csapatmunka, and Teljesítmény Optimalizálás.

- [ ] **Step 5: ServicesGrid — directional fill and click to expand**

Add state:

```jsx
const [expanded, setExpanded] = useState(null)
```

Convert each card to a `<button>` so it is keyboard-reachable with an accessible name — a click handler on a `<div>` is not:

```jsx
<button
  type="button"
  onClick={() => setExpanded(expanded === i ? null : i)}
  onPointerEnter={(e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--fill-x', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--fill-y', `${((e.clientY - r.top) / r.height) * 100}%`)
  }}
  aria-expanded={expanded === i}
  data-cursor="link"
  className="group relative w-full text-left ..."
>
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 rounded-[inherit] scale-0 opacity-0 bg-primary/15 transition-[transform,opacity] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
    style={{ transformOrigin: 'var(--fill-x, 50%) var(--fill-y, 50%)' }}
  />

  {/* existing card content, unchanged */}

  <div
    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
      expanded === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    }`}
  >
    <div className="overflow-hidden">
      <p className="text-muted text-sm leading-relaxed pt-3">{svc.detail}</p>
    </div>
  </div>
</button>
```

Keep the existing card className values — append to them rather than replacing.

- [ ] **Step 6: Pricing**

- Wrap each tier card in `<TiltCard max={5}>`
- Add `group` to the tier card; on each feature `<li>` add `className="... transition-transform duration-200 group-hover:translate-x-1"` and `style={{ transitionDelay: \`${fi * 40}ms\` }}` where `fi` is the feature index
- Wrap each tier's CTA in `<Magnetic>` and add `data-cursor="link"`

- [ ] **Step 7: TrustSignals — marquee**

Add the keyframes to `tailwind.config.js` under `theme.extend`. If `keyframes` or `animation` already exist there, merge into them rather than replacing:

```js
keyframes: {
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
  },
},
animation: {
  marquee: 'marquee 28s linear infinite',
},
```

Then duplicate the signal row, marking the clone `aria-hidden="true"` so screen readers hear the list once:

```jsx
<div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
  <div className="flex shrink-0 animate-marquee gap-12 motion-reduce:animate-none">
    {/* original row */}
  </div>
  <div aria-hidden="true" className="flex shrink-0 animate-marquee gap-12 motion-reduce:hidden">
    {/* identical clone */}
  </div>
</div>
```

- [ ] **Step 8: ContactForm**

- Add `data-cursor="text"` to each input and textarea in `src/components/Field.jsx` and to the message textarea
- Wrap the submit button in `<Magnetic>` and add `data-cursor="link"`
- Add a drag-over state to the file upload: `const [dragging, setDragging] = useState(false)` wired to `onDragOver`, `onDragLeave` and `onDrop`, toggling `border-primary bg-primary/5` on the drop zone

- [ ] **Step 9: Footer**

- Wrap each footer service link label in `<ScrambleText text={...} trigger="hover" />`
- Wrap each social icon anchor in `<Magnetic>` and add `data-cursor="link"`
- Add `data-cursor="link"` to the `Adatvédelem` and `ÁSZF` router links

- [ ] **Step 10: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 11: Browser verification**

Full scroll pass at 1440px, then 375px:
- About portrait warms to full colour on hover
- Hovering one pillar dims the others
- Services cards flood with colour from the pointer's entry corner; click expands the detail paragraph smoothly and `aria-expanded` flips
- Pricing tiers tilt, checkmarks stagger, CTA is magnetic
- Trust marquee scrolls continuously and loops seamlessly with no visible seam
- Contact inputs show the I-beam cursor and the caret still works
- Footer links scramble and settle on the correct text
- At 375px: no tilt, no cursor, no magnetic; marquee still scrolls; services still expand on tap
- Emulate `prefers-reduced-motion: reduce` — the page must be fully readable and navigable with all motion suppressed
- Console clean at both widths

- [ ] **Step 12: Commit**

```bash
git add src/sections src/components/Field.jsx src/data/skills.js tailwind.config.js
git commit -m "feat: apply motion primitives to remaining sections"
```

---

# PHASE 3 — Project detail modal (Tasks 14-15)

---

### Task 14: Extend the project data shape

**Files:**
- Modify: `src/data/projects.js`
- Create: `src/data/projects.test.js`

**Interfaces:**
- Consumes: nothing
- Produces: each entry of `PROJECTS_FULL` gains `year`, `role`, `problem`, `solution` (strings), `gallery` (array), `github` (string), `live` (string)

- [ ] **Step 1: Write the failing test**

Create `src/data/projects.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { PROJECTS_FULL } from './projects'

const CASE_FIELDS = ['year', 'role', 'problem', 'solution', 'gallery', 'github', 'live']

describe('PROJECTS_FULL', () => {
  it('still has four projects', () => {
    expect(PROJECTS_FULL).toHaveLength(4)
  })

  it('gives every project every case-study field, so the modal never reads undefined', () => {
    for (const p of PROJECTS_FULL) {
      for (const field of CASE_FIELDS) {
        expect(p, `${p.title} is missing ${field}`).toHaveProperty(field)
      }
    }
  })

  it('keeps github as a placeholder for this pass', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.github).toBe('#')
    }
  })

  it('keeps gallery an array so the modal can map over it safely', () => {
    for (const p of PROJECTS_FULL) {
      expect(Array.isArray(p.gallery)).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — missing `year` on the first project

- [ ] **Step 3: Add the fields**

Add these seven fields to each of the four entries in `src/data/projects.js`, keeping all existing fields untouched:

```js
  year: '',
  role: '',
  problem: '',
  solution: '',
  gallery: [],
  github: '#',
  live: '',
```

Leave them empty. The modal renders each only when non-empty, so filling them later is a data edit, not a code change.

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`
Expected: PASS, 21 tests total

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.js src/data/projects.test.js
git commit -m "feat: extend project data with empty case-study fields"
```

---

### Task 15: `ProjectModal`

**Files:**
- Create: `src/components/ProjectModal.jsx`
- Modify: `src/sections/Projects.jsx`

**Interfaces:**
- Consumes: the `PROJECTS_FULL` shape from Task 14, `tokens`, `useReducedMotion`
- Produces: `export default function ProjectModal({ project, originRect, onClose })` — renders nothing when `project` is null

- [ ] **Step 1: Note on GSAP Flip**

The spec floated GSAP's Flip plugin for the open animation. **Use the manual measured transform written below instead** — it has no plugin dependency, no licence question, and is about fifteen lines. Do not install or import Flip.

- [ ] **Step 2: Create `src/components/ProjectModal.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X, ArrowUpRight } from 'lucide-react'
import { duration, ease } from '../motion/tokens'
import { useReducedMotion } from '../motion/useReducedMotion'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'

/* Detail panel for a project. Animates from the clicked card's measured
   geometry so the card visually becomes the modal. Optional fields render
   only when non-empty, so a half-filled project degrades to a short clean
   panel rather than a page of empty headings. */
export default function ProjectModal({ project, originRect, onClose }) {
  const panelRef = useRef(null)
  const reduced = useReducedMotion()

  // Open animation from the origin card's geometry.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !project) return

    if (reduced || !originRect) {
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: duration.fast })
      return
    }

    const target = panel.getBoundingClientRect()
    gsap.fromTo(
      panel,
      {
        x: originRect.left - target.left,
        y: originRect.top - target.top,
        scaleX: originRect.width / target.width,
        scaleY: originRect.height / target.height,
        opacity: 0.6,
        transformOrigin: 'top left',
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: duration.slow, ease: ease.out }
    )
  }, [project, originRect, reduced])

  // Escape to close, scroll lock, focus trap, focus restore.
  useEffect(() => {
    if (!project) return

    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label="Bezárás"
        onClick={onClose}
        className="absolute inset-0 bg-deep/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-4xl border border-divider bg-surface p-6 sm:p-10 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Bezárás"
          data-cursor="link"
          className="absolute right-5 top-5 rounded-full p-2 text-muted transition-colors duration-200 hover:text-ink"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">
          {project.label}
          {project.year && ` · ${project.year}`}
        </span>

        <h2
          id="project-modal-title"
          className="font-display font-extrabold text-2xl sm:text-3xl text-ink mt-3 leading-tight"
        >
          {project.title}
        </h2>

        {project.role && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted mt-2">{project.role}</p>
        )}

        <p className="text-muted leading-relaxed mt-5">{project.text}</p>

        {project.problem && (
          <section className="mt-8">
            <h3 className="font-display font-bold text-ink text-lg">A feladat</h3>
            <p className="text-muted leading-relaxed mt-2">{project.problem}</p>
          </section>
        )}

        {project.solution && (
          <section className="mt-6">
            <h3 className="font-display font-bold text-ink text-lg">A megoldás</h3>
            <p className="text-muted leading-relaxed mt-2">{project.solution}</p>
          </section>
        )}

        {project.gallery.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.gallery.map((src, i) => (
              <img key={i} src={src} alt="" className="rounded-2xl border border-divider w-full" />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-8">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.live || project.github !== '#') && (
          <div className="flex flex-wrap gap-3 mt-8">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary-dark hover:text-ink transition-colors duration-200"
              >
                Élő oldal <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary-dark hover:text-ink transition-colors duration-200"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
```

- [ ] **Step 3: Wire it up in `src/sections/Projects.jsx`**

Add state and handlers:

```jsx
const [openIndex, setOpenIndex] = useState(null)
const [originRect, setOriginRect] = useState(null)

const openProject = (i, e) => {
  setOriginRect(e.currentTarget.getBoundingClientRect())
  setOpenIndex(i)
}

const closeProject = () => {
  setOpenIndex(null)
  setOriginRect(null)
}
```

Convert each project `<article>` to a `<button type="button">` so it is keyboard-reachable with an accessible name — a click handler on an `<article>` is not:

```jsx
<button
  type="button"
  onClick={(e) => openProject(i, e)}
  aria-label={`${p.title} — részletek`}
  data-cursor="card"
  data-cursor-label="Részletek"
  className={/* the article's existing className, plus */ ' w-full text-left'}
>
```

Render the modal after the grid:

```jsx
<ProjectModal
  project={openIndex === null ? null : PROJECTS_FULL[openIndex]}
  originRect={originRect}
  onClose={closeProject}
/>
```

Add the import: `import ProjectModal from '../components/ProjectModal'`

- [ ] **Step 4: Verify build, lint, tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 5: Browser verification**

- Click a project card: the panel grows from that card's position
- Backdrop is blurred; the page behind does not scroll
- `Escape` closes; clicking the backdrop closes; the X button closes
- After closing, keyboard focus returns to the card that was clicked
- `Tab` inside the modal cycles within it and never reaches the page behind
- With all case-study fields empty, the modal shows label, title, description and tech chips, with **no empty headings and no link row**
- Temporarily set `live: 'https://example.com'` on one project, confirm the link row appears, then revert it
- At 375px the modal fits the screen and scrolls internally
- With `prefers-reduced-motion: reduce` the modal fades instead of growing, and remains fully usable
- Console clean

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectModal.jsx src/sections/Projects.jsx
git commit -m "feat: add project detail modal with measured open and focus trap"
```

---

## Final verification

- [ ] `npm run build` succeeds
- [ ] `npm run lint` clean
- [ ] `npm test` — 21 tests pass
- [ ] `grep -rn "new IntersectionObserver" src/sections/` returns nothing
- [ ] `wc -l src/App.jsx` is under 60 lines
- [ ] Full-page pass at 1440px: every hover state responds, no layout shift, console clean
- [ ] Full-page pass at 375px: no tilt, no custom cursor, no magnetic, everything tappable
- [ ] Full keyboard pass: every interactive element reachable by `Tab` with a visible focus ring, services expand with `Enter`, modal opens and traps focus
- [ ] `prefers-reduced-motion: reduce` pass: site fully usable and legible with motion suppressed
- [ ] `/adatvedelem` and `/aszf` routes still work
