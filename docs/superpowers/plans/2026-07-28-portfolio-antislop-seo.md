# Portfolio Anti-Slop & SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the template-generated feel from the page's layout and imagery, and make the site's real HTML visible to crawlers — without altering the color system.

**Architecture:** Six sequential tasks against the existing Vite app. Task 1 makes scroll-reveal safe-by-default (content visible unless JS hides it), which is a hard prerequisite for Task 6's prerender — otherwise the prerendered HTML captures `opacity-0`. Tasks 2–5 are presentation-layer edits to `src/sections/*.jsx`. No new dependencies except the prerender tooling in Task 6.

**Tech Stack:** React 19, Vite 8, Tailwind 3, GSAP, React Router 7, Vitest 3, oxlint.

## Global Constraints

- **No color changes.** Do not modify any hex value, Tailwind color token, `src/index.css` custom property, or the palette switcher. Existing tokens (`text-primary`, `text-primary-dark`, `text-primary-light`, `text-ink`, `text-muted`) may be *re-applied to different elements*, but no token's value changes and no new color is introduced. User instruction 2026-07-28: "i dont want to change the colors stuff".
- **No fabricated content.** `src/data/testimonials.js` stays `[]`. Empty fields in `src/data/projects.js` stay empty. Do not invent case-study text, client quotes, metrics, or dates.
- **Preserve existing Hungarian copy wherever possible.** Headings may be restructured (line breaks, inline emphasis, word order); the words themselves change only where exact replacement text is given below.
- **Existing security posture holds.** Do not weaken `vercel.json` headers. CSP may only become *more* restrictive in this plan.
- **Every task ends green:** `npm run test`, `npm run build`, and `npm run lint` all pass before commit.
- Site language is Hungarian (`lang="hu"`). All user-facing strings are Hungarian.

---

### Task 1: Make scroll-reveal safe by default

Sections currently mount at `opacity-0` and only become visible when the IntersectionObserver fires. If the observer never fires — JS error, unsupported environment, or a prerender snapshot — the content is permanently invisible. This must land before Task 6.

**Files:**
- Modify: `src/motion/useInView.js:6-27`
- Test: `src/motion/useInView.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `useInView(threshold?: number) => [ref, visible]`. Signature unchanged; only the initial value of `visible` changes to `true` when `IntersectionObserver` is unavailable. All ten calling sections keep working untouched.

- [ ] **Step 1: Write the failing test**

Add to `src/motion/useInView.test.js`:

```javascript
it('starts visible when IntersectionObserver is unavailable', () => {
  const original = globalThis.IntersectionObserver
  delete globalThis.IntersectionObserver
  try {
    const { result } = renderHook(() => useInView(0.15))
    expect(result.current[1]).toBe(true)
  } finally {
    globalThis.IntersectionObserver = original
  }
})
```

If the existing test file does not already import `renderHook`, add it: `import { renderHook } from '@testing-library/react'`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- useInView`
Expected: FAIL — `expected false to be true`.

- [ ] **Step 3: Implement**

Replace the contents of `src/motion/useInView.js`:

```javascript
import { useEffect, useRef, useState } from 'react'

/* Replaces the ten hand-rolled IntersectionObserver blocks that used to
   live in each section. Latches true on first intersection and disconnects.

   Initial state is "visible" whenever IntersectionObserver is missing, so
   content can never be stranded at opacity-0 — that matters for crawlers,
   for the prerender snapshot, and for any environment where the observer
   never fires. When the observer IS available we start hidden so the
   reveal animation still plays. */
export function useInView(threshold = 0.15) {
  const supported = typeof IntersectionObserver !== 'undefined'
  const ref = useRef(null)
  const [visible, setVisible] = useState(!supported)

  useEffect(() => {
    if (!supported) return
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
  }, [threshold, supported])

  return [ref, visible]
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test`
Expected: PASS, including the pre-existing `useInView` tests.

- [ ] **Step 5: Verify reduced-motion behaviour manually**

Run `npm run dev`, then in DevTools enable *Rendering → Emulate CSS `prefers-reduced-motion: reduce`*. Scroll the full page.
Expected: every section's text is readable; no section stays blank.

- [ ] **Step 6: Commit**

```bash
git add src/motion/useInView.js src/motion/useInView.test.js
git commit -m "fix: never strand sections at opacity-0 when IntersectionObserver is absent"
```

---

### Task 2: Replace the remote stock hero image with an owned local asset

`Hero.jsx:35` loads the LCP image from `https://images.unsplash.com/...` — a third-party runtime request in a codebase that self-hosts fonts to avoid exactly that, showing PHP/WordPress code while the site sells React and Node.

**Files:**
- Modify: `src/sections/Hero.jsx:35` and its import block
- Modify: `index.html:17-19,25`
- Modify: `vercel.json:31`
- Create: `public/og-image.jpg`
- Use existing: `src/assets/portrait-sunset.jpg`

**Interfaces:**
- Consumes: nothing.
- Produces: a local `heroBackdrop` import in `Hero.jsx`. Task 3 layers a scrim over this same element.

- [ ] **Step 1: Import the local asset**

Add to the import block at the top of `src/sections/Hero.jsx`:

```javascript
import heroBackdrop from '../assets/portrait-sunset.jpg'
```

- [ ] **Step 2: Point the `<img>` at it**

At `src/sections/Hero.jsx:35`, replace the remote `src` value. Keep every other attribute on that element exactly as-is:

```jsx
src={heroBackdrop}
```

- [ ] **Step 3: Create the OG image**

```bash
cd "C:/Users/madew/Desktop/Final_Port"
cp src/assets/portrait-sunset.jpg public/og-image.jpg
```

- [ ] **Step 4: Read its real dimensions**

```bash
node -e "const b=require('fs').readFileSync('public/og-image.jpg');let i=2;while(i<b.length){if(b[i]!==0xFF){i++;continue}const m=b[i+1];if(m>=0xC0&&m<=0xCF&&m!==0xC4&&m!==0xC8&&m!==0xCC){console.log('width',b.readUInt16BE(i+7),'height',b.readUInt16BE(i+5));break}i+=2+b.readUInt16BE(i+2)}"
```

Record the printed values. They are used in the next step.

- [ ] **Step 5: Update the meta tags**

In `index.html`, replace the Unsplash URL on line 17 with:

```html
<meta property="og:image" content="https://rizmajer-mate-portfolio.vercel.app/og-image.jpg" />
```

Replace the Unsplash URL on line 25 with:

```html
<meta name="twitter:image" content="https://rizmajer-mate-portfolio.vercel.app/og-image.jpg" />
```

Set `og:image:width` (line 18) and `og:image:height` (line 19) to the real values printed in Step 4. The tags must not claim dimensions the file does not have.

- [ ] **Step 6: Tighten the CSP**

In `vercel.json:31`, delete the substring ` https://images.unsplash.com` from the `img-src` directive so it reads exactly:

```
img-src 'self' data:;
```

Leave every other directive in that policy untouched.

- [ ] **Step 7: Verify no Unsplash reference survives**

Run: `grep -rn "unsplash" src/ index.html vercel.json`
Expected: no output.

- [ ] **Step 8: Build and verify**

Run: `npm run build && npm run lint`
Expected: exit 0 both. Then `npm run preview` and confirm in the Network tab that zero requests go to `images.unsplash.com`.

- [ ] **Step 9: Commit**

```bash
git add src/sections/Hero.jsx index.html vercel.json public/og-image.jpg
git commit -m "feat: own the hero and OG imagery, drop the third-party image host from CSP"
```

---

### Task 3: Fix hero headline contrast

The headline loses legibility against the backdrop — "rendszerek" fades mid-word. Both hero lines are ≥48px, so the WCAG AA large-text threshold of 3:1 applies.

**Files:**
- Modify: `src/sections/Hero.jsx` (overlay element and `hero-line-1`)
- Check: `src/index.css` for any `hero-line-1` gradient rule

**Interfaces:**
- Consumes: `heroBackdrop` from Task 2.
- Produces: nothing consumed downstream.

- [ ] **Step 1: Find the fade**

Run: `grep -rn "hero-line-1\|bg-clip-text\|text-transparent" src/sections/Hero.jsx src/index.css`
The mid-word fade comes from a `bg-clip-text` + `text-transparent` gradient. Record which file and line carries it.

- [ ] **Step 2: Replace the gradient with a solid existing token**

Remove `bg-clip-text` and `text-transparent` (and the accompanying `bg-gradient-*` classes) from `hero-line-1`, so the whole line renders at one contrast level. Use an existing light token already present in the file — do not introduce a new color.

- [ ] **Step 3: Strengthen the scrim**

Ensure an overlay sits between the image and the text. Add it directly after the `<img>` in `src/sections/Hero.jsx`:

```jsx
<div
  aria-hidden="true"
  className="absolute inset-0 bg-gradient-to-b from-deep/85 via-deep/70 to-deep/90"
/>
```

`deep` must be an existing token. Confirm first with `grep -n "deep" tailwind.config.js`; if the dark-surface token has a different name there, use that name instead. Do not define a new one.

- [ ] **Step 4: Measure**

Run `npm run dev`, open DevTools → Elements → select the h1 → Accessibility pane → read the contrast ratio.
Expected: ≥ 3:1 for both hero lines. Record the measured value in the commit message.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.jsx src/index.css
git commit -m "a11y: hero headline meets AA contrast against the backdrop"
```

---

### Task 4: Break the repeated two-line heading formula

Ten sections use an identical construction: `<h2>` first line, then `<span className="block font-display font-semibold text-primary-dark">` second line. Repeated ten times it reads as a template. Keep the device as a deliberate signature in exactly two places; convert the other eight to single-line headings with inline emphasis.

**Retained as-is — do not touch:** `Hero.jsx:60-64`, `Projects.jsx:29-30`.

**Files:**
- Modify: `src/sections/About.jsx:52-53`
- Modify: `src/sections/ContactForm.jsx:63-64`
- Modify: `src/sections/Faq.jsx:62-63`
- Modify: `src/sections/Features.jsx:50-51`
- Modify: `src/sections/Pillars.jsx:54-55`
- Modify: `src/sections/Pricing.jsx:19-20`
- Modify: `src/sections/Protocol.jsx:83-84`
- Modify: `src/sections/ServicesGrid.jsx:21-22`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. Presentation-only; no exported symbols change.

- [ ] **Step 1: Apply the eight replacements**

In each file, replace the two-line heading body with the single-line version below. The surrounding `<h2 ...>` tag, its classes, and the `╱` eyebrow `<span>` above it all stay exactly as they are. Only the inner content changes.

`About.jsx` lines 52-53 →
```jsx
              Néhány szó <span className="text-primary-dark font-semibold">rólam</span>.
```

`ContactForm.jsx` lines 63-64 →
```jsx
              Hogyan segíthetek a <span className="text-primary-dark font-semibold">vállalkozásodnak</span>?
```

`Faq.jsx` lines 62-63 →
```jsx
              Amit meg szoktak <span className="text-primary-dark font-semibold">kérdezni</span>.
```

`Features.jsx` lines 50-51 →
```jsx
              Három pillér, egy <span className="text-primary-dark font-semibold">cél</span>.
```

`Pillars.jsx` lines 54-55 →
```jsx
              A számok <span className="text-primary-dark font-semibold">mögöttem</span>.
```

`Pricing.jsx` lines 19-20 →
```jsx
              Egyszerű csomagok, <span className="text-primary-dark font-semibold">rugalmas</span> megoldások.
```

`Protocol.jsx` lines 83-84 →
```jsx
              Három lépés, semmi <span className="text-primary-dark font-semibold">meglepetés</span>.
```

`ServicesGrid.jsx` lines 21-22 →
```jsx
              A teljes <span className="text-primary-dark font-bold">eszköztár</span>, egy kézben.
```

- [ ] **Step 2: Verify only two block-span headings remain**

Run: `grep -rn 'block font-display font-semibold' src/sections/`
Expected: exactly two hits — `Hero.jsx` and `Projects.jsx`.

- [ ] **Step 3: Verify no color token values changed**

Run: `git diff -- src/index.css tailwind.config.js`
Expected: no output. Existing tokens were re-applied; none redefined.

- [ ] **Step 4: Build, lint, test**

Run: `npm run build && npm run lint && npm run test`
Expected: exit 0 for all three.

- [ ] **Step 5: Commit**

```bash
git add src/sections/
git commit -m "design: single-line headings with inline emphasis, keeping the two-line device for hero and projects"
```

---

### Task 5: Vary the section rhythm

Every band is currently: mono eyebrow → heading → subtext → grid, at the same width and alignment. That uniformity is what makes the page read as stamped out rather than composed.

**Files:**
- Modify: `src/sections/Pricing.jsx:16`
- Modify: `src/sections/Protocol.jsx` (outer `<section>` and inner container)
- Modify: the section headers identified in Step 1

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Record current alignment of every section header**

```bash
grep -rn 'max-w-3xl\|max-w-2xl\|text-center\|mx-auto' src/sections/*.jsx | head -30
```
Paste the result into the commit message as the before-state.

- [ ] **Step 2: Apply the rule — exactly one centered section**

`Pricing.jsx:16` keeps `text-center mx-auto` and becomes the single centered moment on the page. For every other section header wrapper, remove `text-center` and `mx-auto`, leaving the width constraint (`max-w-3xl` / `max-w-2xl`) intact so the header sits left within its column.

- [ ] **Step 3: Make one section full-bleed**

On `Protocol.jsx`'s outer `<section>`, remove the horizontal padding classes `px-6 sm:px-10 lg:px-16` and add that same padding to its inner `max-w-7xl` container instead. The section background then spans the full viewport while content stays on the grid.

- [ ] **Step 4: Verify at three widths**

Run `npm run dev` and check 375px, 768px, and 1440px.
Expected: no horizontal scrollbar at any width; Pricing is visibly the only centered header; Protocol's background reaches both viewport edges.

- [ ] **Step 5: Build, lint, test**

Run: `npm run build && npm run lint && npm run test`
Expected: exit 0 for all three.

- [ ] **Step 6: Commit**

```bash
git add src/sections/
git commit -m "design: vary section rhythm — one centered band, one full-bleed, rest left-aligned"
```

---

### Task 6: Prerender routes so crawlers receive real HTML

`vercel.json:36-38` rewrites every path to `/index.html`, and the app is client-rendered, so each route currently serves an empty `<div id="root">`. Task 1 is a prerequisite: without it the snapshot captures `opacity-0` sections.

**Files:**
- Modify: `vite.config.js`
- Modify: `package.json`
- Verify: `dist/index.html` and one `index.html` per subroute

**Interfaces:**
- Consumes: `useInView`'s reveal-by-default behaviour from Task 1.
- Produces: prerendered HTML in `dist/`. Nothing imports these.

- [ ] **Step 1: Confirm the exact route paths**

```bash
grep -rn 'path=' src/App.jsx src/main.jsx src/pages/*.jsx
```
Use the exact strings found. Do not assume `/adatvedelem` and `/aszf` if the source says otherwise.

- [ ] **Step 2: Install prerender tooling**

```bash
cd "C:/Users/madew/Desktop/Final_Port"
npm install -D puppeteer
```

Puppeteer is chosen over a Vite plugin because the plugin ecosystem for Vite 8 is unsettled; a post-build script is version-independent and the deliverable is prerendered HTML either way.

- [ ] **Step 3: Add the post-build prerender script**

Create `scripts/prerender.mjs`. It must: start a static server over `dist`, visit each route from Step 1, wait for network idle, read `document.documentElement.outerHTML`, and write it to `dist/<route>/index.html` (root route writes to `dist/index.html`).

- [ ] **Step 4: Chain it into the build**

In `package.json`, change the build script to:

```json
"build": "vite build && node scripts/prerender.mjs"
```

- [ ] **Step 5: Build and verify real content is present**

```bash
npm run build
grep -c "Weboldal, amit megtalálnak" dist/index.html
```
Expected: 1 or greater — the hero copy is in the served HTML, not only in the JS bundle.

- [ ] **Step 6: Verify sections are not snapshotted hidden**

```bash
grep -c "opacity-0" dist/index.html
```
Expected: 0. A non-zero result means Task 1 did not take effect and crawlers would receive hidden content — stop and fix before continuing.

- [ ] **Step 7: Verify the subroutes**

```bash
ls dist/*/index.html
```
Expected: one directory per non-root route, each containing an `index.html` carrying that page's real text.

- [ ] **Step 8: Lint and test**

Run: `npm run lint && npm run test`
Expected: exit 0 both.

- [ ] **Step 9: Commit**

```bash
git add vite.config.js package.json package-lock.json scripts/prerender.mjs
git commit -m "feat: prerender routes so crawlers get real HTML instead of an empty root div"
```

---

## Verification checklist

Run after all six tasks:

- [ ] `npm run test` — green
- [ ] `npm run build` — exit 0
- [ ] `npm run lint` — exit 0
- [ ] `grep -rn "unsplash" src/ index.html vercel.json` — no output
- [ ] `grep -rn 'block font-display font-semibold' src/sections/` — exactly two hits
- [ ] `git diff HEAD~6 -- src/index.css tailwind.config.js` — no output (no color values changed)
- [ ] `src/data/testimonials.js` still exports `[]`
- [ ] `grep -c "opacity-0" dist/index.html` — returns 0
- [ ] Manual: 375 / 768 / 1440px, keyboard focus visible throughout, `prefers-reduced-motion` shows all content

## Out of scope

Case studies, testimonials, the AI/automation section, a custom domain, and booking. All deferred per the spec — they require content or accounts that do not exist yet.
