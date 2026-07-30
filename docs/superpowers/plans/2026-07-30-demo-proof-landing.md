# Demo Proof Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four dataless project entries with three deployed demo sites, and make every counted proof claim on the page derive from that data so it cannot drift out of true.

**Architecture:** `src/data/projects.js` becomes the single source of truth for proof. It exports the project array plus two derived counts, which `Pillars.jsx` consumes instead of hardcoding numbers beside hand-written prose describing them. Prose states the number in exactly two places, both in `Projects.jsx`, and nowhere else. Tests are pure-data assertions over the exported array — the existing suite has no component-render tests and this plan does not add any.

**Tech Stack:** React 19, Vite 8, Tailwind 3, Vitest 3, oxlint. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-30-projects-demo-proof-design.md`

## Global Constraints

- **Do not start until all three demos are deployed at public URLs, with public repos, and screenshots exist.** All-or-nothing; half-landed proof recreates the false-claim state this build exists to end.
- All user-facing copy is Hungarian, written as Hungarian, never translated from English.
- WCAG 2.2 Level AA. Every image conveying information carries real alt text; `alt=""` is only for decoration.
- **No colour, palette, theme-token or colorway-switcher changes.** Off-limits per the 2026-07-28 decision.
- `label` is exactly the string `'Bemutató projekt'` on all three entries.
- **No client work is referenced anywhere on the page** — no card, no pillar, no line in About. User decision, 2026-07-30.
- **Only a rendered numeral states a count**, except two accepted prose copies in `Projects.jsx` (the headline accent line and the subcopy). Pillar `desc` strings must never write a count out in words.
- Asset budget: **≤150 KB per card image, ≤2 MB total** across all demo images.
- Tests stay pure-data. Do not add `@testing-library/react` render tests; the existing 6 test files are all pure-data and the spec preserves that.
- Commands: `npm test` (vitest run), `npm run lint` (oxlint), `npm run build` (vite build + SSR build + prerender).

## Required Inputs

These arrive with the demos. **Task 2 cannot be completed without them** — the tests in Task 2 are written to fail on placeholder values, so they cannot be faked past.

| Input | Count | Notes |
|---|---|---|
| Live URLs | 3 | `https://`, publicly reachable, no auth wall |
| Public repo URLs | 3 | `https://github.com/...`, actually public |
| `problem` sentence | 3 | **Verbatim from Máté.** Plain language, the concrete thing the business could not do before. |
| `solution` sentence | 3 | **Verbatim from Máté.** What was built, no stack-flexing. |
| Card screenshot | 3 | ≥1200×750, realistic Hungarian sample data |
| Gallery screenshots | 2–3 each | Same standard; each needs its own Hungarian alt text |

If any input is missing when execution starts, **stop and ask** rather than inventing a value.

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `src/components/ProjectModal.jsx` | Modify `:143-149` | Render gallery items as objects with alt text, lazy loading, and dimensions |
| `src/data/projects.js` | Rewrite | Three demo entries; export `LIVE_COUNT` and `REPO_COUNT` |
| `src/data/projects.test.js` | Rewrite | Assert the new state and the count invariant |
| `src/sections/Pillars.jsx` | Modify `:1-3`, `:16-41`, `:72` | Consume derived counts; drop client-work prose; adapt grid when a pillar is absent |
| `src/sections/Projects.jsx` | Modify `:29-39`, `:42` | Rewrite headline and subcopy; three-column grid |
| `src/assets/demos/` | Create | All demo screenshots, one flat directory |

Naming convention for assets, applied by the executor: `src/assets/demos/<slug>-card.webp` for card images and `<slug>-01.webp`, `<slug>-02.webp`, … for gallery images, where `<slug>` is one of `idopontfoglalo`, `napi-menu`, `bemutatkozo`.

---

### Task 1: Gallery items become objects with alt text

`gallery` is currently `string[]`, rendered at `ProjectModal.jsx:146` as `<img src={src} alt="" className="rounded-2xl border border-divider w-full" />` — no alt text, no lazy loading, and `w-full` with no height, which shifts layout as each image loads. This task changes the shape before any data uses it. Safe to do first: every `gallery` is currently `[]`, so nothing renders either way.

**Files:**
- Modify: `src/components/ProjectModal.jsx:143-149`
- Modify: `src/data/projects.test.js` (add shape assertion)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: the `gallery` item shape `{ src: string, alt: string, width: number, height: number }`, relied on by Task 2's data and Task 2's tests.

- [ ] **Step 1: Write the failing test**

Add to `src/data/projects.test.js`, inside the existing `describe('PROJECTS_FULL', …)` block:

```js
  it('gives every gallery item a src, real alt text, and intrinsic dimensions', () => {
    for (const p of PROJECTS_FULL) {
      for (const g of p.gallery) {
        expect(typeof g, `${p.title} gallery item must be an object, not a bare string`).toBe('object')
        expect(g.src, `${p.title} gallery item is missing src`).toBeTruthy()
        expect(g.alt, `${p.title} gallery item needs Hungarian alt text, not ''`).toBeTruthy()
        expect(g.width, `${p.title} gallery item needs a width`).toBeGreaterThan(0)
        expect(g.height, `${p.title} gallery item needs a height`).toBeGreaterThan(0)
      }
    }
  })
```

- [ ] **Step 2: Run the test and understand why it passes vacuously**

Run: `npm test -- src/data/projects.test.js`
Expected: PASS. Every `gallery` is `[]`, so the loop body never executes. This is correct — the assertion is a guard for Task 2's data and has nothing to check yet. Do not treat the pass as the test being wrong.

- [ ] **Step 3: Update the modal to read the object shape**

In `src/components/ProjectModal.jsx`, replace lines 143-149:

```jsx
        {project.gallery.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.gallery.map((g, i) => (
              <img
                key={i}
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                loading="lazy"
                decoding="async"
                className="rounded-2xl border border-divider w-full h-auto"
              />
            ))}
          </div>
        )}
```

`width` and `height` with `h-auto` let the browser reserve the right box before the file arrives, so the modal does not jump as screenshots load. `alt` is now required content rather than `""` — these images are the evidence, and a screen-reader user currently gets nothing from them.

- [ ] **Step 4: Verify nothing broke**

Run: `npm test && npm run lint`
Expected: all tests pass, no lint errors. Galleries are still empty so the modal renders exactly as before.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectModal.jsx src/data/projects.test.js
git commit -m "feat: gallery screenshots carry alt text and reserve their space"
```

---

### Task 2: Replace the four entries with three demos

**Files:**
- Modify: `src/data/projects.js` (rewrite)
- Modify: `src/data/projects.test.js:7-9` and `:19-23`
- Create: `src/assets/demos/*.webp`

**Interfaces:**
- Consumes: the gallery item shape from Task 1.
- Produces: `PROJECTS_FULL` with exactly 3 entries, every one having non-empty `live`, `github`, `image`, `imageAlt`, `problem`, `solution`, and `label === 'Bemutató projekt'`; plus the exports `LIVE_COUNT: number` and `REPO_COUNT: number`. Tasks 3, 4 and 5 depend on these.

- [ ] **Step 1: Place the image assets**

Copy the screenshots into `src/assets/demos/` using the naming convention from File Structure. Convert to WebP first if they are PNG or JPEG. Every card image must be ≥1200×750 and show realistic Hungarian sample data — not `Lorem ipsum`, not `Test Restaurant 1`. Fake-looking data undoes the credibility the demo buys.

- [ ] **Step 2: Write the failing tests**

In `src/data/projects.test.js`, delete the two tests named `still has four projects` and `keeps github as a placeholder for this pass`, and add the following in their place. Find them by name, not by line number — Task 1 already inserted a test into this block, so the original line numbers have shifted.

```js
  it('has three demo projects', () => {
    expect(PROJECTS_FULL).toHaveLength(3)
  })

  it('gives every project a real, public live URL', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.live, `${p.title} has no live URL`).toMatch(/^https:\/\//)
      expect(p.live, `${p.title} live URL is a placeholder`).not.toMatch(
        /example\.(com|org)|localhost|127\.0\.0\.1|TODO|KITÖLTENDŐ/i,
      )
    }
  })

  it('gives every project a real, public repo URL', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.github, `${p.title} github is still the '#' placeholder`).not.toBe('#')
      expect(p.github, `${p.title} github is not a GitHub URL`).toMatch(
        /^https:\/\/github\.com\/.+\/.+/,
      )
    }
  })

  it('labels every project as a demo, never as client work', () => {
    for (const p of PROJECTS_FULL) {
      expect(p.label, `${p.title} must be labelled 'Bemutató projekt'`).toBe('Bemutató projekt')
    }
  })

  it('fills the fields the card and modal actually show', () => {
    for (const p of PROJECTS_FULL) {
      for (const field of ['image', 'imageAlt', 'problem', 'solution', 'year', 'role']) {
        expect(p[field], `${p.title} has an empty ${field}`).toBeTruthy()
        expect(String(p[field]), `${p.title} still has the plan's stub in ${field}`).not.toMatch(
          /REQUIRED INPUT|TODO|KITÖLTENDŐ|Lorem ipsum/i,
        )
      }
    }
  })
```

The placeholder-rejecting patterns are deliberate: they make it impossible to satisfy the suite with a made-up URL or with a stub string copied out of this plan, which is the one failure mode that would put this site back where it started. `problem` and `solution` are truthy while still holding `REQUIRED INPUT`, so truthiness alone would not have caught them.

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test -- src/data/projects.test.js`
Expected: FAIL — `has three demo projects` reports 4, the live-URL test reports `''`, the repo test reports `'#'`, and the label test reports `'Ügyfélprojekt'`.

- [ ] **Step 4: Rewrite the data**

Replace the whole of `src/data/projects.js` with the following. Substitute every `REQUIRED INPUT` value with the real one; do not invent them. Add 2–3 gallery entries per project following the shape shown below, with real pixel dimensions and Hungarian alt text describing what each screenshot shows.

```js
import idopontfoglaloCard from '../assets/demos/idopontfoglalo-card.webp'
import napiMenuCard from '../assets/demos/napi-menu-card.webp'
import bemutatkozoCard from '../assets/demos/bemutatkozo-card.webp'

/* Three demo projects, each deployed and each with public code. They are
   labelled 'Bemutató projekt' and never 'Ügyfélprojekt': a demo presented as
   client work is trivially falsifiable — an SME owner asks "melyik pékség?"
   and one unverifiable claim discredits everything else on the page.

   LIVE_COUNT and REPO_COUNT below are what Pillars counts. They live here
   rather than in the section so the number on the page cannot disagree with
   the number of projects behind it; that disagreement is exactly how the page
   came to claim "Mindegyik megnyitható és kipróbálható" while nothing was.
   Add or remove a project and the homepage figures follow by themselves. */
export const PROJECTS_FULL = [
  {
    title: 'Időpontfoglaló',
    text: 'Bemutató foglalórendszer szolgáltatóknak — naptár, dupla foglalás kizárva, e-mailes visszaigazolás.',
    tech: ['React', 'Supabase', 'Resend'],
    label: 'Bemutató projekt',
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-accent' },
    image: idopontfoglaloCard,
    imageAlt: 'Az időpontfoglaló naptár nézete szabad és foglalt sávokkal.',
    year: '2026',
    role: 'Tervezés, fejlesztés, deploy',
    problem: 'REQUIRED INPUT — Máté szavaival',
    solution: 'REQUIRED INPUT — Máté szavaival',
    gallery: [],
    github: 'REQUIRED INPUT — https://github.com/...',
    live: 'REQUIRED INPUT — https://...',
  },
  {
    title: 'Napi menü',
    text: 'Bemutató napimenü-kezelő kisvendéglőknek — a tulaj maga írja át a mai menüt, a vendég azonnal azt látja.',
    tech: ['React', 'Supabase'],
    label: 'Bemutató projekt',
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary-light' },
    image: napiMenuCard,
    imageAlt: 'A napi menü szerkesztő felülete a mai ajánlattal.',
    year: '2026',
    role: 'Tervezés, fejlesztés, deploy',
    problem: 'REQUIRED INPUT — Máté szavaival',
    solution: 'REQUIRED INPUT — Máté szavaival',
    gallery: [],
    github: 'REQUIRED INPUT — https://github.com/...',
    live: 'REQUIRED INPUT — https://...',
  },
  {
    title: 'Egyoldalas bemutatkozó',
    text: 'Bemutató egyoldalas oldal szakiparosnak — gyorsan betölt, mobilra tervezve, a környéken megtalálható.',
    tech: ['Vite', 'Tailwind'],
    label: 'Bemutató projekt',
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: bemutatkozoCard,
    imageAlt: 'A szakiparos egyoldalas bemutatkozó oldala mobilnézetben.',
    year: '2026',
    role: 'Tervezés, fejlesztés, deploy',
    problem: 'REQUIRED INPUT — Máté szavaival',
    solution: 'REQUIRED INPUT — Máté szavaival',
    gallery: [],
    github: 'REQUIRED INPUT — https://github.com/...',
    live: 'REQUIRED INPUT — https://...',
  },
]

export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
```

A gallery entry looks like this — real dimensions, real alt text, imported at the top of the file alongside the card images:

```js
    gallery: [
      {
        src: idopontfoglaloBooking,
        alt: 'A foglalás visszaigazoló képernyője a kiválasztott időponttal.',
        width: 1600,
        height: 1000,
      },
    ],
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- src/data/projects.test.js`
Expected: PASS. If the live or repo tests still fail, the `REQUIRED INPUT` strings were not replaced with real URLs — that is the test doing its job. Stop and get the URLs.

- [ ] **Step 6: Commit**

```bash
git add src/data/projects.js src/data/projects.test.js src/assets/demos
git commit -m "feat: three deployed demos replace the four empty project slots"
```

---

### Task 3: Assert the count invariant

The counts are exported but nothing yet proves they match the data. This is the test that makes the original drift impossible rather than merely fixed.

**Files:**
- Modify: `src/data/projects.test.js:2` (import) and append a new `describe` block

**Interfaces:**
- Consumes: `LIVE_COUNT` and `REPO_COUNT` from Task 2.
- Produces: nothing new; Task 4 consumes the same two exports.

- [ ] **Step 1: Write the test**

Change the import on line 2 of `src/data/projects.test.js` from

```js
import { PROJECTS_FULL } from './projects'
```

to

```js
import { PROJECTS_FULL, LIVE_COUNT, REPO_COUNT } from './projects'
```

and add a new `describe` block after the existing one:

```js
describe('the counts Pillars displays', () => {
  it('LIVE_COUNT equals the number of projects that can actually be opened', () => {
    expect(LIVE_COUNT).toBe(PROJECTS_FULL.filter((p) => p.live).length)
  })

  it('REPO_COUNT equals the number of projects with real public code', () => {
    expect(REPO_COUNT).toBe(PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length)
  })

  it('never claims a number nobody can check', () => {
    expect(LIVE_COUNT).toBeGreaterThan(0)
    expect(REPO_COUNT).toBeGreaterThan(0)
  })
})
```

The third assertion is the one that matters. It fails the moment a project loses its link while the homepage still counts it — the exact bug this whole build exists to prevent.

- [ ] **Step 2: Run the tests**

Run: `npm test -- src/data/projects.test.js`
Expected: PASS, because Task 2 already added the exports. If `LIVE_COUNT` is `undefined`, the exports are missing from `projects.js` — add them exactly as written in Task 2, Step 4.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.test.js
git commit -m "test: the homepage counts cannot disagree with the projects behind them"
```

---

### Task 4: Pillars counts the data instead of restating it

**Files:**
- Modify: `src/sections/Pillars.jsx:1-3` (imports), `:16-41` (the array), `:72` (the grid)

**Interfaces:**
- Consumes: `LIVE_COUNT` and `REPO_COUNT` from Task 2.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Import the counts**

In `src/sections/Pillars.jsx`, add to the imports at the top:

```jsx
import { LIVE_COUNT, REPO_COUNT } from '../data/projects'
```

- [ ] **Step 2: Replace the pillars array**

Replace the whole `const pillars = [ … ]` block at `:16-41`, including the comment above it that this task supersedes, with:

```jsx
  /* Two of these three numbers come from projects.js rather than being typed
     here. They used to be typed, next to a sentence that also spelled the
     number out in words — two independent copies of one fact, which drifted
     until the page claimed every project could be opened while none could.
     The numeral is now the only thing that states a count: no `desc` below
     writes one out, so there is nothing left to drift.

     A pillar with a zero count renders nothing at all, the same way
     TESTIMONIALS keeps its section hidden rather than showing a placeholder.
     Pillar 03 is a promise rather than a tally, so it always shows. */
  const allPillars = [
    {
      n: '01',
      title: 'Kipróbálható',
      target: LIVE_COUNT,
      suffix: '',
      label: 'megnyitható rendszer',
      desc: 'Bemutató rendszerek, amiket magamnak építettem. Mind él, és bármelyik kipróbálható, regisztráció nélkül.',
    },
    {
      n: '02',
      title: 'Nyílt kód',
      target: REPO_COUNT,
      suffix: '',
      label: 'nyilvános repó',
      desc: 'A kód mindegyiknél megnyitható a GitHubon. Nem kell elhinned, amit írok — el tudod olvasni.',
    },
    {
      n: '03',
      title: 'Válaszidő',
      target: 24,
      suffix: 'ó',
      label: 'órán belül válaszolok',
      desc: 'A leadás után sem tűnök el. Kérdésre, hibára vagy bővítésre egy munkanapon belül reagálok.',
    },
  ]

  const pillars = allPillars.filter((p) => p.target > 0)
```

Neither new `desc` contains a written-out number, per the Global Constraints, and neither mentions client work.

- [ ] **Step 3: Make the grid follow the pillar count**

At `:72` the grid is hardcoded to three columns, which would leave a hole if a pillar dropped out. Replace that opening `div` with:

```jsx
        <div
          className={`grid grid-cols-1 ${
            pillars.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5`}
        >
```

- [ ] **Step 4: Verify**

Run: `npm test && npm run lint && npm run build`
Expected: all pass. Then `npm run dev` and confirm the section shows `3 / megnyitható rendszer`, `3 / nyilvános repó`, `24ó / órán belül válaszolok`, with no reference to clients anywhere in it.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Pillars.jsx
git commit -m "feat: Számokban counts the projects instead of restating them"
```

---

### Task 5: Projects section copy and layout

**Files:**
- Modify: `src/sections/Projects.jsx:29-39` (comment, headline accent line, subcopy), `:42` (grid)

**Interfaces:**
- Consumes: `PROJECTS_FULL` from Task 2 (already imported in this file).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Confirm the wording with Máté before writing it**

The copy below is a candidate in his voice, not his words. This is the section a skeptical buyer reads hardest, and the claims it makes must be exactly the ones Task 2's data supports. Get his version, then write it.

- [ ] **Step 2: Rewrite the heading and subcopy**

The accent line at `:34` reads *"Kettő ügyfélnek, kettő magamnak."* and the subcopy at `:37-38` begins *"Négy projekt…"* — both false now, and the two-and-two split was the section's whole framing. Replace lines 29-39 with:

```jsx
            {/* The old accent line split the set into "kettő ügyfélnek, kettő
                magamnak". There is no such split any more: all three are
                demos. These two sentences are the only places on the page
                that write a project count out in words — everywhere else a
                rendered numeral is the single statement of it — so they have
                to change whenever the project set does. */}
            Amin dolgozom.
            <span className="block font-display font-semibold text-primary-dark mt-1">Három rendszer, mind kipróbálható.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-xl">
            Három bemutató rendszer, amit magamnak építettem — hogy ne kelljen elhinned, amit
            írok. Mindegyik megnyitható, és mindháromnál nyilvános a kód.
          </p>
```

- [ ] **Step 3: Fix the grid column count**

At `:42` the grid is `lg:grid-cols-4`. Three cards in four columns leaves an empty cell on desktop. Change that one class:

```jsx
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
```

- [ ] **Step 4: Verify**

Run: `npm test && npm run lint && npm run build`
Expected: all pass. Then `npm run dev` and check at desktop width that three cards fill the row with no gap, and that each card shows its screenshot and the `Bemutató projekt` label.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Projects.jsx
git commit -m "feat: the projects section says what it now actually shows"
```

---

### Task 6: Asset budget, links, and full verification

The last gate. Every claim added above is now checkable by a visitor, so each one gets checked here first.

**Files:**
- Modify: `src/assets/demos/*` only if the budget fails
- Modify: `src/sections/Pricing.jsx:50-55` (stale comment)

- [ ] **Step 1: Measure the asset budget**

```bash
du -b src/assets/demos/* | sort -rn
du -cb src/assets/demos | tail -1
```

Expected: no single card image over 150 KB (153600 bytes), and the total under 2 MB (2097152 bytes). If either fails, re-encode at lower WebP quality or reduce dimensions — do not proceed over budget. Mobile is the primary viewport for this audience.

- [ ] **Step 2: Verify every link actually resolves**

Open all six URLs — three `live`, three `github` — in a browser, in a private window so a logged-in GitHub session cannot make a private repo look public.

Expected: all six load for an anonymous visitor. A `404` on a repo means it is still private; an auth wall on a demo means a visitor cannot try it. Either one makes the page's central claim false — fix before merging.

- [ ] **Step 3: Clean up the stale comment**

`src/sections/Pricing.jsx:50-55` is a comment reasoning about *"a Pillars section that plainly says '2'"*. Pillars no longer says 2. The argument it makes — that a "Legnépszerűbb" badge would overclaim — still holds, so keep the reasoning and drop the broken cross-reference: rewrite that clause so it stands on its own terms without pointing at a number Pillars no longer shows.

- [ ] **Step 4: Full automated verification**

```bash
npm test && npm run lint && npm run build
```

Expected: 6+ test files passing, no lint errors, build completes including the SSR pass and `scripts/prerender.mjs`.

- [ ] **Step 5: Manual QA**

Check each, and fix before merging:
- Mobile, tablet and desktop widths — three cards, no empty grid cell, screenshots not stretched
- Keyboard only: Tab through all three cards, open a modal with Enter, reach the live and repo links, close with Escape. Focus ring visible at every stop, including inside the dark inverted cards.
- `prefers-reduced-motion: reduce` — the `CountUp` figures and card reveals settle to static
- Open the modal at phone width and confirm gallery images do not shift content as they load
- Read the whole page for any surviving reference to client work or to four projects

- [ ] **Step 6: Cross-browser check**

The grid and modal changed structurally, and Chromium alone cannot answer "does it work in Safari". Playwright's webkit and firefox engines are installed but `playwright` is not a project dependency, so point Node at the npx cache:

```bash
NODE_PATH="C:/Users/madew/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules" node your-check-script.mjs
```

Vite's preview server ignores `vercel.json`, so to confirm the CSP does not block the new assets, serve `dist/` from a small Node server that replays `vercel.json`'s `headers[0].headers`. This build adds no new origin, so a CSP break is unlikely — but it would only surface in production otherwise.

- [ ] **Step 7: Commit and merge**

```bash
git add src/sections/Pricing.jsx src/assets/demos
git commit -m "chore: asset budget met, links verified, stale Pillars reference dropped"
```

Then merge to `main`. Pushing `main` auto-deploys to Vercel, so merge only once Step 5 is fully green — the whole point of this build is that the page stops claiming things it cannot back.

---

## Notes for the executor

- **Two commits already landed ahead of this plan.** `2fe6092` removed the false *"Mindegyik megnyitható és kipróbálható."* claim from `Pillars.jsx`, and `e4ab14e` added the spec. Do not re-add that sentence; Task 4 replaces the pillar it lived in.
- **`ProjectMock`'s empty-frame branch stays.** With all three demos carrying screenshots it becomes unreachable for shipped data, but deleting it would make the next dataless project render a broken card instead of an honest one.
- **No `width`/`height` on the card image.** `ProjectMock` renders it inside a fixed `h-48` container with `object-cover`, so there is no layout shift to prevent there. The gallery is the real CLS risk, which Task 1 handles.
- **The `--color-card-4` tone object goes with the fourth entry.** The CSS variable stays defined; the next project uses it.
- **Gallery images already load only when the modal opens**, which the spec asks for. `Projects.jsx:84-85` passes `project={openIndex === null ? null : …}`, so `ProjectModal` renders nothing until a card is clicked and the gallery `<img>` tags are not in the DOM before that. Importing the files in `projects.js` puts their hashed URLs in the bundle, not their bytes on the wire. No extra lazy-loading machinery is needed.
- **No CSP change is needed.** Links open in a new tab and no demo is iframed, so no `frame-src` directive is required and no new origin is introduced.
