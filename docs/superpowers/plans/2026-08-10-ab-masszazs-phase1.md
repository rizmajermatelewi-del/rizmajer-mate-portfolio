# AB Masszázs Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put AB Masszázs on the internet as a credible, findable one-page site with an adatvédelmi tájékoztató — deployed, free, and without a booking system.

**Architecture:** Every business fact lives in one of two data modules. The page renders from them, the JSON-LD is generated from them, and a build guard refuses to produce a deployable `dist/` while the facts that cannot be invented are still missing. Two routes are prerendered to real HTML so a crawler never has to run JavaScript.

**Tech Stack:** Vite 8, React 19, Tailwind 3.4, Vitest 3 (jsdom), oxlint — the same versions as the portfolio, so its conventions transfer.

## Global Constraints

- **Source of truth:** `docs/superpowers/specs/2026-08-10-ab-masszazs-design.md`. This plan is **Phase 1 of that spec's §11**. Booking, `/foglalas`, the calendar functions and e-mail are Phase 2 and must not be started here.
- **New repository**, created at `C:\Users\madew\Desktop\ab-masszazs`. It is client property and must never live inside the portfolio repo.
- **Nothing about the business may be invented.** No sample prices, no placeholder address, no "Lorem ipsum", no stock photographs. Where a fact is unknown, the data module keeps its empty default and the UI omits that block.
- **No stock imagery of any kind.** Spec §5: stock massage photography is what makes a real salon look fake.
- **No third-party embeds, trackers or fonts.** Spec §7 relies on the site setting no cookies beyond the host's, so the map is a link and not an iframe, and fonts are self-hosted or system.
- All copy is Hungarian. No English, no second locale (spec §10).
- Commit after each task. Do not deploy until Task 9.

---

## File structure

```
ab-masszazs/
├── index.html                     entry, per-route <title> patched at prerender
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── scripts/
│   ├── check-content.mjs          build guard: refuses to build on missing facts
│   └── prerender.mjs              writes dist/index.html and dist/adatvedelem/index.html
└── src/
    ├── main.jsx                   browser entry
    ├── entry-server.jsx           SSR entry used only by the prerender
    ├── routes.jsx                 two routes
    ├── index.css                  Tailwind layers
    ├── data/
    │   ├── business.js            name, address, hours, phone, e-mail, social
    │   ├── services.js            service list: name, duration, price
    │   └── seo.js                 buildLocalBusinessJsonLd(), per-route meta
    ├── lib/
    │   └── format.js              Hungarian price and duration formatting
    ├── components/
    │   └── PhotoSlot.jsx          renders a photo, or something deliberate
    ├── sections/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── Services.jsx           services and prices
    │   ├── About.jsx
    │   ├── Visit.jsx              hours, address, map link, phone
    │   ├── Faq.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        └── Privacy.jsx            /adatvedelem
```

Two data modules, not one: `business.js` changes when she moves or changes her hours; `services.js` changes when she changes her price list. They have different rates of change.

---

### Task 1: Scaffold the repository

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/index.css`, `src/routes.jsx`, `src/pages/Home.jsx`, `.gitignore`
- Test: `src/smoke.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: a repo where `npm run dev`, `npm test` and `npx oxlint` all work. Every later task depends on this.

- [ ] **Step 1: Create the project directory and initialise git**

```bash
mkdir -p /c/Users/madew/Desktop/ab-masszazs
cd /c/Users/madew/Desktop/ab-masszazs
git init
```

- [ ] **Step 2: Write `package.json`**

Versions are pinned to match the portfolio exactly. Do not run `npm init` and accept newer majors — Tailwind 4 uses a different config format and the config files below assume 3.4.

```json
{
  "name": "ab-masszazs",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "node scripts/check-content.mjs && vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs",
    "lint": "oxlint",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.2",
    "@vitejs/plugin-react": "^6.0.3",
    "autoprefixer": "^10.5.2",
    "jsdom": "^26.1.0",
    "oxlint": "^1.71.0",
    "postcss": "^8.5.16",
    "tailwindcss": "^3.4.19",
    "vite": "^8.1.1",
    "vitest": "^3.2.7"
  }
}
```

Then run: `npm install`

- [ ] **Step 3: Write the config files**

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* Found during execution, and load-bearing: vitest 3.2.7 bundles its own
     Vite 7, while @vitejs/plugin-react 6 hands JSX to Vite 8's native
     transform. Without this line, JSX inside tests falls back to the classic
     runtime and every rendering test dies on "React is not defined" — while
     dev and build, driven by the real Vite 8, work fine. Tasks 4-7 all ship
     JSX test files and depend on this. */
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
```

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

`postcss.config.js`:

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}
```

`.gitignore`:

```
node_modules
dist
dist-ssr
.env
.env.*
*.local
.DS_Store
```

- [ ] **Step 4: Write the entry files**

`index.html`:

```html
<!doctype html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AB Masszázs</title>
    <meta name="description" content="" />
    <link rel="canonical" href="" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'
import './index.css'

/* Hydrate when the prerendered markup is present, mount when it is not — the
   dev server serves an empty #root, the built site does not. */
const root = document.getElementById('root')
const tree = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
```

`src/routes.jsx` — the privacy route is added in Task 7:

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
```

`src/pages/Home.jsx` — a stub, filled in Task 6:

```jsx
export default function Home() {
  return <main>AB Masszázs</main>
}
```

- [ ] **Step 5: Write a smoke test**

Create `src/smoke.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes.jsx'

/* Proves the toolchain works end to end — JSX compiles, jsdom renders, the
   router resolves — before any real component depends on all three. */
describe('app shell', () => {
  it('renders the home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByText('AB Masszázs')).toBeTruthy()
  })
})
```

- [ ] **Step 6: Run everything**

Run: `npx vitest run && npx oxlint`
Expected: test PASSES, lint exit 0.

Then run `npm run dev` and confirm the page says "AB Masszázs". Stop the server.

`npm run build` fails at this point — `scripts/check-content.mjs` does not exist yet. That is expected; Task 3 creates it.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold the site with the portfolio's toolchain"
```

---

### Task 2: The two data modules

**Files:**
- Create: `src/data/business.js`, `src/data/services.js`
- Test: `src/data/business.test.js`, `src/data/services.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `export const BUSINESS` — `{ name, legalName, tagline, street, city, postalCode, phone, email, facebook, instagram, mapsUrl, hours }`. Every string field defaults to `''`; `hours` is `Array<{ day: string, opens: string, closes: string }>` using 24-hour `'09:00'` strings and defaults to `[]`.
  - `export function missingFacts()` → `string[]`, naming every launch-blocking fact still empty. Tasks 3 and 6 rely on it.
  - `export const SERVICES` — `Array<{ id: string, name: string, minutes: number, price: number, desc: string }>`, empty by default.

- [ ] **Step 1: Write the failing tests**

Create `src/data/business.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { BUSINESS, missingFacts } from './business'

/* These fields cannot be invented — spec §9. The tests do not assert that they
   are filled, because an unfinished repo must still be green; they assert the
   SHAPE is right and that missingFacts() tells the truth about what is absent.
   The build guard in Task 3 is what actually blocks a launch. */
describe('business facts', () => {
  it('exposes every field the page and the schema need', () => {
    for (const key of [
      'name', 'legalName', 'tagline', 'street', 'city', 'postalCode',
      'phone', 'email', 'facebook', 'instagram', 'mapsUrl',
    ]) {
      expect(typeof BUSINESS[key], `BUSINESS.${key} must be a string`).toBe('string')
    }
    expect(Array.isArray(BUSINESS.hours)).toBe(true)
  })

  it('states opening hours as 24-hour strings when present', () => {
    for (const { day, opens, closes } of BUSINESS.hours) {
      expect(day.trim().length).toBeGreaterThan(0)
      expect(opens).toMatch(/^\d{2}:\d{2}$/)
      expect(closes).toMatch(/^\d{2}:\d{2}$/)
      expect(closes > opens, `${day} closes before it opens`).toBe(true)
    }
  })

  it('names each missing launch-blocking fact', () => {
    const missing = missingFacts()
    expect(Array.isArray(missing)).toBe(true)
    for (const item of missing) expect(typeof item).toBe('string')
    if (!BUSINESS.city) expect(missing.join(' ')).toContain('city')
  })
})
```

Create `src/data/services.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { SERVICES } from './services'

/* An invented price is the one unrecoverable mistake here: a client would quote
   it back to her. So the guard covers shape and internal sanity only, and
   emptiness stays legal until launch. */
describe('service list', () => {
  it('is a list', () => {
    expect(Array.isArray(SERVICES)).toBe(true)
  })

  it('gives every service a unique id, a duration and a price', () => {
    const ids = new Set()
    for (const s of SERVICES) {
      expect(s.id, 'every service needs a stable id').toMatch(/^[a-z0-9-]+$/)
      expect(ids.has(s.id), `duplicate service id: ${s.id}`).toBe(false)
      ids.add(s.id)
      expect(s.name.trim().length).toBeGreaterThan(0)
      expect(Number.isInteger(s.minutes)).toBe(true)
      expect(s.minutes).toBeGreaterThan(0)
      expect(Number.isInteger(s.price)).toBe(true)
      expect(s.price).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run them and verify they fail**

Run: `npx vitest run src/data`
Expected: FAIL — `Failed to resolve import "./business"`.

- [ ] **Step 3: Write `src/data/business.js`**

```js
/* Every fact about the salon, in one place, because several of them are shown
   on the page AND published as JSON-LD AND used in the <title>. The portfolio
   this was built after was bitten repeatedly by one fact living in several
   files until the copies drifted; here a drifted copy would be a wrong address
   on a business listing.

   Empty strings are the honest default. Nothing here may be guessed: every
   value comes from her directly (spec §9). Sections omit themselves when their
   fields are empty, and scripts/check-content.mjs refuses to build while
   missingFacts() is non-empty. */
export const BUSINESS = {
  name: '',
  legalName: '',
  tagline: '',
  street: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
  facebook: '',
  instagram: '',
  /* A plain link to Google Maps, not an embedded iframe: an embed sets
     third-party cookies, which would drag a consent banner onto a site that
     otherwise needs none (spec §7). */
  mapsUrl: '',
  /* e.g. { day: 'Hétfő', opens: '09:00', closes: '18:00' } */
  hours: [],
}

/* The facts a launch cannot proceed without. Kept next to the data rather than
   in the build script, so the rule lives with what it describes. */
const REQUIRED = ['name', 'city', 'street', 'postalCode', 'phone']

export function missingFacts() {
  const missing = REQUIRED.filter((key) => !BUSINESS[key].trim())
  if (!BUSINESS.hours.length) missing.push('hours')
  return missing
}
```

- [ ] **Step 4: Write `src/data/services.js`**

```js
/* Her price list. Empty until she gives it — spec §9 makes this a hard blocker,
   and an invented price is worse than a missing one because a client will quote
   it back to her.

   `minutes` and `price` are integers, not strings: Phase 2's booking does
   arithmetic on the duration, and the price is formatted for display in one
   place rather than baked into the data.

   Shape:
     { id: 'svedmasszazs-60', name: 'Svédmasszázs', minutes: 60,
       price: 9000, desc: 'Egy mondat arról, kinek való.' } */
export const SERVICES = []
```

- [ ] **Step 5: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS, lint exit 0.

- [ ] **Step 6: Prove the guards are load-bearing**

Temporarily add `{ id: 'BAD ID', name: '', minutes: 0, price: -1, desc: '' }` to `SERVICES`, run `npx vitest run src/data/services.test.js`, and confirm it fails on the id pattern. Remove it. Then temporarily add `{ day: 'Hétfő', opens: '18:00', closes: '09:00' }` to `BUSINESS.hours` and confirm the "closes before it opens" case fails. Remove it and re-run to green.

- [ ] **Step 7: Commit**

```bash
git add src/data
git commit -m "feat: hold every business fact in one place, empty until she gives it"
```

---

### Task 3: The build guard

**Files:**
- Create: `scripts/check-content.mjs`
- Test: `src/data/check-content.test.js`

**Interfaces:**
- Consumes: `missingFacts` and `SERVICES` (Task 2).
- Produces: a script that exits 0 when the site is launchable and 1 with a readable list when it is not. Already first in `npm run build` from Task 1.

- [ ] **Step 1: Write the failing test**

Create `src/data/check-content.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { missingFacts } from './business'
import { SERVICES } from './services'

/* The point of this project is that nothing about the business is invented.
   The risk that creates is the opposite one: a live site with blank sections
   because a fact never arrived. This guard turns that into a failed build
   rather than a quiet embarrassment. */
const root = process.cwd()
const launchable = missingFacts().length === 0 && SERVICES.length > 0

describe('content guard', () => {
  it('agrees with the data modules about whether we can launch', () => {
    let exitCode = 0
    try {
      execFileSync('node', ['scripts/check-content.mjs'], { cwd: root, stdio: 'pipe' })
    } catch (err) {
      exitCode = err.status
    }
    expect(exitCode === 0).toBe(launchable)
  })

  it('runs before vite build, so a blank site is never produced', () => {
    const build = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')).scripts.build
    const guardAt = build.indexOf('check-content.mjs')
    const viteAt = build.indexOf('vite build')
    expect(guardAt, 'check-content.mjs is not in the build script').toBeGreaterThan(-1)
    expect(guardAt, 'the guard must run before vite build').toBeLessThan(viteAt)
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/check-content.test.js`
Expected: FAIL — cannot find `scripts/check-content.mjs`.

- [ ] **Step 3: Write the guard**

Create `scripts/check-content.mjs`:

```js
import { missingFacts } from '../src/data/business.js'
import { SERVICES } from '../src/data/services.js'

/* Runs first in `npm run build`. It exists because the honest choice — ship
   nothing invented — has a failure mode of its own: a live site with empty
   sections because an answer never came back. This makes that a loud build
   failure instead.

   It deliberately does not run in `npm run dev`: building the layout against
   empty data is exactly what Tasks 4-6 do. */
const missing = [...missingFacts()]
if (!SERVICES.length) missing.push('services (the price list)')

if (missing.length) {
  console.error('\nThis site cannot be built for launch yet. Still missing:\n')
  for (const item of missing) console.error(`  - ${item}`)
  console.error('\nThese come from the salon owner and must not be invented.')
  console.error('See §9 of the design spec.\n')
  process.exit(1)
}

console.log(`content check: ${SERVICES.length} services, all business facts present`)
```

- [ ] **Step 4: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS — the guard test passes because both sides agree the site is *not* launchable yet — and lint exit 0.

- [ ] **Step 5: Prove it fails for the right reason**

Run: `node scripts/check-content.mjs; echo "exit: $?"`
Expected: exit 1, listing `name`, `city`, `street`, `postalCode`, `phone`, `hours` and `services (the price list)`.

- [ ] **Step 6: Commit**

```bash
git add scripts/check-content.mjs src/data/check-content.test.js
git commit -m "feat: refuse to build a site that is missing facts only she can give"
```

---

### Task 4: The photo slot

**Files:**
- Create: `src/components/PhotoSlot.jsx`
- Test: `src/components/PhotoSlot.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `export default function PhotoSlot({ src, alt, label, className })`. Renders an `<img>` when `src` is truthy and a deliberate frame when it is not. Task 6 uses it.

- [ ] **Step 1: Write the failing test**

Create `src/components/PhotoSlot.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhotoSlot from './PhotoSlot.jsx'

/* She has no photographs yet and stock imagery is banned (spec §5), so every
   image on this site is a slot that must look intentional while empty. The
   failure this prevents is a broken-image icon on a live page. */
describe('PhotoSlot', () => {
  it('renders the photograph when there is one', () => {
    render(<PhotoSlot src="/kezelo.webp" alt="A kezelőszoba" label="Kezelőszoba" />)
    expect(screen.getByAltText('A kezelőszoba').getAttribute('src')).toBe('/kezelo.webp')
  })

  it('draws a deliberate frame when there is none, and no img element', () => {
    const { container } = render(<PhotoSlot src="" alt="" label="Kezelőszoba" />)
    expect(container.querySelector('img')).toBe(null)
    expect(screen.getByText('Kezelőszoba')).toBeTruthy()
  })

  it('keeps an empty slot out of the accessibility tree', () => {
    const { container } = render(<PhotoSlot src="" alt="" label="Kezelőszoba" />)
    expect(container.firstChild.getAttribute('aria-hidden')).toBe('true')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/components/PhotoSlot.test.jsx`
Expected: FAIL — cannot resolve `./PhotoSlot.jsx`.

- [ ] **Step 3: Write the component**

Create `src/components/PhotoSlot.jsx`:

```jsx
/* A photograph, or an honest absence.

   Taken in spirit from the portfolio's Protocol.jsx: give it a file and it
   shows the picture, leave it empty and it draws a labelled frame rather than
   a broken image or a stock photograph. She has no photographs yet, and stock
   massage imagery is precisely what makes a real salon look fake, so every
   image on this site goes through here.

   The empty state is aria-hidden: it carries nothing a screen-reader user
   needs, and announcing "Kezelőszoba" for a picture that does not exist would
   be a small lie. */
export default function PhotoSlot({ src, alt, label, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full items-center justify-center bg-stone-100 ${className}`}
    >
      <span className="absolute inset-4 rounded-2xl border border-dashed border-stone-300" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
        {label}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS, lint exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components
git commit -m "feat: an image slot that looks deliberate while it is empty"
```

---

### Task 5: The services section

**Files:**
- Create: `src/lib/format.js`, `src/sections/Services.jsx`
- Test: `src/lib/format.test.js`, `src/sections/Services.test.jsx`

**Interfaces:**
- Consumes: `SERVICES` (Task 2).
- Produces:
  - `export function formatPrice(huf)` → `'9 000 Ft'` with non-breaking spaces.
  - `export function formatDuration(minutes)` → `'60 perc'`.
  - `export default function Services()` — the price list, or `null` when `SERVICES` is empty.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/format.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { formatPrice, formatDuration } from './format'

describe('formatting', () => {
  it('groups thousands the Hungarian way', () => {
    expect(formatPrice(9000)).toBe('9\u00a0000\u00a0Ft')
    expect(formatPrice(12500)).toBe('12\u00a0500\u00a0Ft')
    expect(formatPrice(900)).toBe('900\u00a0Ft')
  })

  it('uses non-breaking spaces so a price never wraps mid-number', () => {
    expect(formatPrice(9000)).not.toContain(' ')
  })

  it('says durations in whole minutes', () => {
    expect(formatDuration(60)).toBe('60 perc')
    expect(formatDuration(90)).toBe('90 perc')
  })
})
```

Create `src/sections/Services.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

/* The section must disappear entirely rather than render an empty heading: a
   live page with a "Szolgáltatások" heading and nothing under it reads as
   broken, which is the opposite of what this site is for. */
describe('Services', () => {
  it('renders nothing while the price list is empty', async () => {
    vi.resetModules()
    vi.doMock('../data/services', () => ({ SERVICES: [] }))
    const { default: Services } = await import('./Services.jsx')
    const { container } = render(<Services />)
    expect(container.firstChild).toBe(null)
  })

  it('lists each service with its duration and price', async () => {
    vi.resetModules()
    vi.doMock('../data/services', () => ({
      SERVICES: [
        { id: 'a', name: 'Svédmasszázs', minutes: 60, price: 9000, desc: 'Leírás.' },
        { id: 'b', name: 'Frissítő', minutes: 30, price: 5500, desc: '' },
      ],
    }))
    const { default: Services } = await import('./Services.jsx')
    render(<Services />)
    expect(screen.getByText('Svédmasszázs')).toBeTruthy()
    expect(screen.getByText('60 perc')).toBeTruthy()
    expect(screen.getByText('9\u00a0000\u00a0Ft')).toBeTruthy()
    expect(screen.getByText('Frissítő')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run them and verify they fail**

Run: `npx vitest run src/lib src/sections/Services.test.jsx`
Expected: FAIL — cannot resolve `./format` and `./Services.jsx`.

- [ ] **Step 3: Write the formatters**

Create `src/lib/format.js`:

```js
/* Hungarian number formatting, in one place because the price appears on the
   page, in the JSON-LD, and (in Phase 2) in a confirmation e-mail.

   Every separator is non-breaking: "9 000 Ft" breaking across two lines as "9"
   and "000 Ft" happens on a 360px phone, and it reads as a different price for
   the half-second before the eye recovers. */
export function formatPrice(huf) {
  const grouped = huf.toLocaleString('hu-HU').replace(/[\s\u202f]/g, '\u00a0')
  return `${grouped}\u00a0Ft`
}

export function formatDuration(minutes) {
  return `${minutes} perc`
}
```

- [ ] **Step 4: Write the section**

Create `src/sections/Services.jsx`:

```jsx
import { SERVICES } from '../data/services'
import { formatPrice, formatDuration } from '../lib/format'

/* Returns null rather than an empty section while the price list is unknown.
   A heading with nothing under it tells a visitor the site is unfinished, on
   the one page whose job is to look like a real business. */
export default function Services() {
  if (!SERVICES.length) return null

  return (
    <section id="szolgaltatasok" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Szolgáltatások
        </h2>

        <ul className="mt-10 divide-y divide-stone-200 border-t border-stone-200">
          {SERVICES.map((service) => (
            <li key={service.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5">
              <h3 className="text-lg font-medium text-stone-900">{service.name}</h3>
              <span className="text-sm text-stone-500">{formatDuration(service.minutes)}</span>
              <span className="ml-auto text-lg tabular-nums text-stone-900">
                {formatPrice(service.price)}
              </span>
              {service.desc ? (
                <p className="w-full text-sm leading-relaxed text-stone-600">{service.desc}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS, lint exit 0.

- [ ] **Step 6: Prove the empty-state guard is load-bearing**

Temporarily change `if (!SERVICES.length) return null` to `if (false) return null`, run `npx vitest run src/sections/Services.test.jsx`, and confirm the "renders nothing" case fails. Restore it and re-run to green.

- [ ] **Step 7: Commit**

```bash
git add src/lib src/sections/Services.jsx src/sections/Services.test.jsx
git commit -m "feat: the price list, which renders nothing until there are prices"
```

---

### Task 6: The rest of the page

**Files:**
- Create: `src/sections/Header.jsx`, `src/sections/Hero.jsx`, `src/sections/About.jsx`, `src/sections/Visit.jsx`, `src/sections/Faq.jsx`, `src/sections/Footer.jsx`
- Modify: `src/pages/Home.jsx`
- Test: `src/sections/Visit.test.jsx`

**Interfaces:**
- Consumes: `BUSINESS` (Task 2), `PhotoSlot` (Task 4), `Services` (Task 5).
- Produces: a complete home page. Each section renders only the fields it has.

- [ ] **Step 1: Write the failing test**

`Visit` carries the address, hours and phone — the facts a local searcher came for, and the ones most likely to be half-filled.

Create `src/sections/Visit.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const EMPTY = {
  name: '', legalName: '', tagline: '', street: '', city: '', postalCode: '',
  phone: '', email: '', facebook: '', instagram: '', mapsUrl: '', hours: [],
}

describe('Visit', () => {
  it('omits the address block when there is no address', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({ BUSINESS: EMPTY, missingFacts: () => [] }))
    const { default: Visit } = await import('./Visit.jsx')
    render(<Visit />)
    expect(screen.queryByText('Cím')).toBe(null)
  })

  it('shows the address, the hours and a dialable phone number when present', async () => {
    vi.resetModules()
    vi.doMock('../data/business', () => ({
      BUSINESS: {
        ...EMPTY,
        street: 'Fő utca 1.',
        city: 'Inárcs',
        postalCode: '2365',
        phone: '+36 30 123 4567',
        hours: [{ day: 'Hétfő', opens: '09:00', closes: '18:00' }],
      },
      missingFacts: () => [],
    }))
    const { default: Visit } = await import('./Visit.jsx')
    render(<Visit />)
    expect(screen.getByText(/Fő utca 1\./)).toBeTruthy()
    expect(screen.getByText('Hétfő')).toBeTruthy()
    expect(screen.getByText('09:00 – 18:00')).toBeTruthy()
    expect(screen.getByRole('link', { name: /123 4567/ }).getAttribute('href')).toBe('tel:+36301234567')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/sections/Visit.test.jsx`
Expected: FAIL — cannot resolve `./Visit.jsx`.

- [ ] **Step 3: Write `Visit`**

Create `src/sections/Visit.jsx`:

```jsx
import { BUSINESS } from '../data/business'

/* The section a local searcher actually came for: where, when, and the number
   to ring. Every block is conditional because these facts arrive at different
   times, and a heading over a blank is worse than no heading.

   The map is a link, not an embedded iframe. An embed sets third-party cookies,
   which would put a consent banner on a site that otherwise needs none (spec
   §7), and it costs a large third-party script on a page whose whole argument
   is that it loads fast. */
export default function Visit() {
  const hasAddress = Boolean(BUSINESS.street && BUSINESS.city)
  const address = `${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.street}`.trim()

  return (
    <section id="elerhetoseg" className="bg-stone-50 px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2">
        {hasAddress ? (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">Cím</h2>
            <p className="mt-3 text-lg text-stone-900">{address}</p>
            {BUSINESS.mapsUrl ? (
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm underline underline-offset-4"
              >
                Megnyitás a térképen
              </a>
            ) : null}
          </div>
        ) : null}

        {BUSINESS.hours.length ? (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Nyitvatartás
            </h2>
            <dl className="mt-3 space-y-1">
              {BUSINESS.hours.map(({ day, opens, closes }) => (
                <div key={day} className="flex justify-between gap-6 text-stone-900">
                  <dt>{day}</dt>
                  <dd className="tabular-nums">{`${opens} – ${closes}`}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {BUSINESS.phone ? (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Időpontért
            </h2>
            {/* Phase 1 has no booking flow. Until Phase 2 replaces this block,
                the honest call to action is her telephone number. */}
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              className="mt-3 inline-block text-lg text-stone-900 underline underline-offset-4"
            >
              {BUSINESS.phone}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write the remaining sections**

`src/sections/Header.jsx`:

```jsx
import { BUSINESS } from '../data/business'

export default function Header() {
  return (
    <header className="px-5 py-6">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between">
        <a href="/" className="text-lg font-semibold tracking-tight text-stone-900">
          {BUSINESS.name || 'AB Masszázs'}
        </a>
        <nav className="flex gap-6 text-sm text-stone-600">
          <a href="#szolgaltatasok" className="hover:text-stone-900">Szolgáltatások</a>
          <a href="#elerhetoseg" className="hover:text-stone-900">Elérhetőség</a>
        </nav>
      </div>
    </header>
  )
}
```

`src/sections/Hero.jsx`:

```jsx
import { BUSINESS } from '../data/business'

/* No hero photograph, by design. She has none, and a stock massage image is the
   fastest way to make a real salon look like a template (spec §5). Type and
   space carry it instead. */
export default function Hero() {
  return (
    <section className="px-5 pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-6xl">
          {BUSINESS.name || 'AB Masszázs'}
        </h1>
        {BUSINESS.tagline ? (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">{BUSINESS.tagline}</p>
        ) : null}
        {BUSINESS.city ? (
          <p className="mt-4 text-sm uppercase tracking-widest text-stone-500">{BUSINESS.city}</p>
        ) : null}
      </div>
    </section>
  )
}
```

`src/sections/About.jsx`:

```jsx
import PhotoSlot from '../components/PhotoSlot.jsx'

/* The text is deliberately absent until she writes it in her own words. A
   generated "passionate about wellness" paragraph is the most obvious tell of a
   template site, and she is the only person who can say why someone should lie
   on her table. */
export const ABOUT_TEXT = ''

export default function About() {
  if (!ABOUT_TEXT) return null

  return (
    <section className="px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-3xl items-center gap-10 sm:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Rólam</h2>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-stone-600">{ABOUT_TEXT}</p>
        </div>
        <div className="aspect-[3/4] overflow-hidden rounded-3xl">
          <PhotoSlot src="" alt="" label="Portré" />
        </div>
      </div>
    </section>
  )
}
```

`src/sections/Faq.jsx`:

```jsx
/* Empty until she says what people actually ask her. The questions on a salon
   site are worth writing only if they are the real ones — "kell-e törölközőt
   hoznom" beats an invented question every time. */
export const FAQ = []

export default function Faq() {
  if (!FAQ.length) return null

  return (
    <section id="gyik" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Gyakori kérdések</h2>
        <dl className="mt-10 space-y-8">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-medium text-stone-900">{q}</dt>
              <dd className="mt-2 leading-relaxed text-stone-600">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
```

`src/sections/Footer.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 px-5 py-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-stone-500">
        <p>{`© ${year} ${BUSINESS.legalName || BUSINESS.name || 'AB Masszázs'}`}</p>
        <div className="flex gap-6">
          {BUSINESS.facebook ? (
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          ) : null}
          {BUSINESS.instagram ? (
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          ) : null}
          <Link to="/adatvedelem" className="underline underline-offset-4">Adatvédelem</Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Assemble the home page**

Replace `src/pages/Home.jsx`:

```jsx
import Header from '../sections/Header.jsx'
import Hero from '../sections/Hero.jsx'
import Services from '../sections/Services.jsx'
import About from '../sections/About.jsx'
import Visit from '../sections/Visit.jsx'
import Faq from '../sections/Faq.jsx'
import Footer from '../sections/Footer.jsx'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Visit />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
```

The Task 1 smoke test asserts the text `AB Masszázs`, which `Hero` still renders through its fallback — but `Header` now renders it too. Update the smoke test's assertion to `expect(screen.getAllByText('AB Masszázs').length).toBeGreaterThan(0)` so it does not fail on a duplicate match.

- [ ] **Step 6: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS, lint exit 0.

- [ ] **Step 7: Look at it**

Run `npm run dev` and open the page. With all data empty it must read as a deliberate, nearly-blank page — a name, a nav, a footer — and **not** a broken one: no empty headings, no dashed frames floating in white, no `undefined`. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add src/sections src/pages/Home.jsx src/smoke.test.jsx
git commit -m "feat: the page, with every section omitting itself until it has facts"
```

---

### Task 7: The privacy page and its route

**Files:**
- Create: `src/pages/Privacy.jsx`
- Modify: `src/routes.jsx`
- Test: `src/pages/Privacy.test.jsx`

**Interfaces:**
- Consumes: `BUSINESS` (Task 2).
- Produces: a `/adatvedelem` route. Task 8 prerenders it.

- [ ] **Step 1: Write the failing test**

Create `src/pages/Privacy.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../routes.jsx'

/* Phase 1 collects no personal data at all — there is no form yet. The page
   exists anyway because the footer links to it from day one, and a dead link in
   the footer of a business site is exactly the sloppiness this project is meant
   to disprove. Phase 2 rewrites it when the booking form lands. */
function renderAt(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('/adatvedelem', () => {
  it('is a real route with a heading', () => {
    renderAt('/adatvedelem')
    expect(screen.getByRole('heading', { name: /Adatkezelési tájékoztató/ })).toBeTruthy()
  })

  it('says plainly that the site collects nothing yet', () => {
    renderAt('/adatvedelem')
    expect(screen.getByText(/nem gyűjt/)).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/pages/Privacy.test.jsx`
Expected: FAIL — no such heading, because the route does not exist.

- [ ] **Step 3: Write the page**

Create `src/pages/Privacy.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

/* Deliberately short, because in Phase 1 it is true: the site has no form, no
   analytics, no cookies of its own and no third-party embeds. Phase 2 replaces
   this with the real tájékoztató covering booking data — name, telephone
   number, e-mail address — Google Calendar as processor, and the retention
   period. Writing that text now, before the form it describes exists, would be
   a document that does not match the site. */
export default function Privacy() {
  const owner = BUSINESS.legalName || BUSINESS.name

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Adatkezelési tájékoztató
      </h1>

      <div className="mt-8 space-y-5 leading-relaxed text-stone-600">
        <p>
          Ez az oldal jelenleg <strong>nem gyűjt</strong> személyes adatot: nincs rajta űrlap,
          hírlevél-feliratkozás, sem látogatottság-mérő. Saját sütit nem helyez el a böngésződben.
        </p>
        <p>
          Ha időpontot szeretnél, telefonon tudsz jelentkezni. A hívás során megadott adatokat
          {owner ? ` ${owner} ` : ' a szolgáltató '}
          kizárólag az időpont egyeztetésére használja.
        </p>
        <p>
          Az oldalt tárhelyszolgáltató szolgálja ki, amely üzemeltetési célból naplózhatja a
          kéréseket (például IP-cím, böngésző típusa). Ezekhez az oldal üzemeltetője azonosítható
          formában nem fér hozzá.
        </p>
        <p>
          Amint online időpontfoglalás indul, ez a tájékoztató kiegészül azzal, hogy a foglaláshoz
          megadott név, telefonszám és e-mail cím hogyan kerül kezelésre.
        </p>
        {BUSINESS.email ? (
          <p>
            Kérdés esetén:{' '}
            <a className="underline underline-offset-4" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </p>
        ) : null}
      </div>

      <Link to="/" className="mt-10 inline-block text-sm underline underline-offset-4">
        Vissza a főoldalra
      </Link>
    </main>
  )
}
```

- [ ] **Step 4: Add the route**

Replace `src/routes.jsx`:

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'

/* Both paths also live in src/data/seo.js as ROUTES, which the prerender script
   walks to write the HTML files. Adding a route means adding it there too, or
   it ships with no prerendered markup. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adatvedelem" element={<Privacy />} />
    </Routes>
  )
}
```

- [ ] **Step 5: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS, lint exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Privacy.jsx src/pages/Privacy.test.jsx src/routes.jsx
git commit -m "feat: an adatvedelmi tajekoztato that describes what the site actually does"
```

---

### Task 8: Prerender to real HTML, with schema and meta

**Files:**
- Create: `src/entry-server.jsx`, `src/data/seo.js`, `scripts/prerender.mjs`
- Test: `src/data/seo.test.js`

**Interfaces:**
- Consumes: `BUSINESS`, `SERVICES` (Task 2), `AppRoutes` (Task 7).
- Produces:
  - `export const ROUTES` — `['/', '/adatvedelem']`.
  - `export function buildLocalBusinessJsonLd(origin)` → the `HealthAndBeautyBusiness` object, or `null` when the address is unknown.
  - `export function metaFor(route)` → `{ title, description, index }`.
  - `dist/index.html` and `dist/adatvedelem/index.html` containing rendered markup.

- [ ] **Step 1: Write the failing test**

Create `src/data/seo.test.js`:

```js
import { describe, it, expect, vi } from 'vitest'
import { buildLocalBusinessJsonLd, ROUTES } from './seo'
import { BUSINESS } from './business'

/* The schema is generated from the same module the page renders, for the same
   reason the price list is: a business listing that disagrees with the page
   about the address or the opening hours is worse than no listing. */
const FILLED = {
  name: 'AB Masszázs', legalName: 'AB Masszázs', tagline: '', street: 'Fő utca 1.',
  city: 'Inárcs', postalCode: '2365', phone: '+36 30 123 4567', email: '',
  facebook: '', instagram: '', mapsUrl: '',
  hours: [{ day: 'Hétfő', opens: '09:00', closes: '18:00' }],
}

describe('structured data', () => {
  it('lists exactly the routes the app answers', () => {
    expect(ROUTES).toEqual(['/', '/adatvedelem'])
  })

  it('refuses to emit a listing without an address', () => {
    if (!BUSINESS.street) {
      expect(buildLocalBusinessJsonLd('https://example.pages.dev')).toBe(null)
    }
  })

  it('emits a valid listing once the facts are there', async () => {
    vi.resetModules()
    vi.doMock('./business', () => ({ BUSINESS: FILLED, missingFacts: () => [] }))
    vi.doMock('./services', () => ({
      SERVICES: [{ id: 'a', name: 'Svédmasszázs', minutes: 60, price: 9000, desc: '' }],
    }))
    const { buildLocalBusinessJsonLd: build } = await import('./seo')
    const ld = build('https://example.pages.dev')

    expect(ld['@type']).toBe('HealthAndBeautyBusiness')
    expect(ld.address.streetAddress).toBe('Fő utca 1.')
    expect(ld.address.addressLocality).toBe('Inárcs')
    expect(ld.address.addressCountry).toBe('HU')
    expect(ld.telephone).toBe('+36 30 123 4567')
    expect(ld.openingHoursSpecification[0].dayOfWeek).toBe('Monday')
    expect(ld.openingHoursSpecification[0].opens).toBe('09:00')
    expect(ld.hasOfferCatalog.itemListElement[0].priceCurrency).toBe('HUF')
    expect(JSON.stringify(ld)).not.toContain('undefined')
  })

  it('puts the town in the home title and keeps the tájékoztató out of search', async () => {
    vi.resetModules()
    vi.doMock('./business', () => ({ BUSINESS: FILLED, missingFacts: () => [] }))
    vi.doMock('./services', () => ({ SERVICES: [] }))
    const { metaFor } = await import('./seo')
    expect(metaFor('/').title).toContain('Inárcs')
    expect(metaFor('/').index).toBe(true)
    expect(metaFor('/adatvedelem').title).toContain('Adatkezelési')
    expect(metaFor('/adatvedelem').index).toBe(false)
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/seo.test.js`
Expected: FAIL — cannot resolve `./seo`.

- [ ] **Step 3: Write `src/data/seo.js`**

```js
import { BUSINESS } from './business.js'
import { SERVICES } from './services.js'

/* Everything a crawler reads, derived from the two data modules rather than
   written out a second time. The failure this prevents is the one that costs a
   local business real money: a listing showing an old address or last year's
   opening hours while the page shows the right ones.

   HealthAndBeautyBusiness rather than the generic LocalBusiness: it is the type
   Google documents for salons, and the more specific type is what earns the
   richer treatment in local results. */
export const ROUTES = ['/', '/adatvedelem']

/* schema.org wants English day names; the page shows Hungarian ones. This map
   is the only place the two meet. */
const DAY_NAMES = {
  Hétfő: 'Monday',
  Kedd: 'Tuesday',
  Szerda: 'Wednesday',
  Csütörtök: 'Thursday',
  Péntek: 'Friday',
  Szombat: 'Saturday',
  Vasárnap: 'Sunday',
}

export function buildLocalBusinessJsonLd(origin) {
  /* No address means no listing. A LocalBusiness entry without a location is
     not a weaker listing, it is an invalid one, and publishing invalid
     structured data is worse than publishing none. */
  if (!BUSINESS.street || !BUSINESS.city) return null

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${origin}/#business`,
    name: BUSINESS.name,
    url: `${origin}/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressCountry: 'HU',
    },
    openingHoursSpecification: BUSINESS.hours.map(({ day, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES[day] ?? day,
      opens,
      closes,
    })),
  }

  if (BUSINESS.phone) ld.telephone = BUSINESS.phone
  if (BUSINESS.email) ld.email = BUSINESS.email

  const sameAs = [BUSINESS.facebook, BUSINESS.instagram].filter(Boolean)
  if (sameAs.length) ld.sameAs = sameAs

  if (SERVICES.length) {
    ld.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Szolgáltatások',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name },
        price: String(s.price),
        priceCurrency: 'HUF',
      })),
    }
  }

  return ld
}

export function metaFor(route) {
  const name = BUSINESS.name || 'AB Masszázs'

  if (route === '/adatvedelem') {
    return {
      title: `Adatkezelési tájékoztató — ${name}`,
      description: 'Milyen adatokat kezel ez az oldal, és milyen célból.',
      index: false,
    }
  }

  return {
    title: `${name}${BUSINESS.city ? ` — ${BUSINESS.city}` : ''} — masszázs`,
    description:
      BUSINESS.tagline ||
      `Masszázs${BUSINESS.city ? ` ${BUSINESS.city}` : ''}. Szolgáltatások, árak, nyitvatartás és elérhetőség.`,
    index: true,
  }
}
```

- [ ] **Step 4: Write the SSR entry**

Create `src/entry-server.jsx`:

```jsx
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from './routes.jsx'

export function render(route) {
  return renderToString(
    <StaticRouter location={route}>
      <AppRoutes />
    </StaticRouter>,
  )
}
```

- [ ] **Step 5: Write the prerender script**

Create `scripts/prerender.mjs`:

```js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/* Writes real HTML for every route, so a crawler never has to run JavaScript to
   see the address, the prices or the opening hours. For a business whose whole
   goal is being found locally, "Google can usually render JS eventually" is not
   a good enough answer.

   SITE_ORIGIN comes from the environment so the deploy sets it once. Getting it
   wrong produces canonical URLs pointing at the wrong host, which is worth
   failing loudly over rather than guessing. */
const root = process.cwd()
const origin = (process.env.SITE_ORIGIN || '').replace(/\/$/, '')

if (!origin) {
  console.error('SITE_ORIGIN is not set — refusing to prerender canonicals pointing nowhere.')
  console.error('Example: SITE_ORIGIN=https://ab-masszazs.pages.dev npm run build')
  process.exit(1)
}

const template = readFileSync(path.join(root, 'dist/index.html'), 'utf8')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const { ROUTES, metaFor, buildLocalBusinessJsonLd } = await import(
  pathToFileURL(path.join(root, 'src/data/seo.js')).href
)

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const route of ROUTES) {
  const markup = render(route)
  const { title, description, index } = metaFor(route)
  const url = route === '/' ? `${origin}/` : `${origin}${route}`

  let page = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
    )

  /* The tájékoztató has no business in search results: it competes with the
     page that should rank and says nothing a searcher wants. */
  if (!index) {
    page = page.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
  }

  if (route === '/') {
    const ld = buildLocalBusinessJsonLd(origin)
    if (ld) {
      const json = JSON.stringify(ld).replace(/</g, '\\u003c')
      page = page.replace(
        '</head>',
        `  <script type="application/ld+json">${json}</script>\n  </head>`,
      )
    }
  }

  const outDir = route === '/' ? path.join(root, 'dist') : path.join(root, 'dist', route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, 'index.html'), page, 'utf8')
  console.log(`prerendered ${route} -> ${path.relative(root, path.join(outDir, 'index.html'))}`)
}
```

- [ ] **Step 6: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all PASS, lint exit 0.

- [ ] **Step 7: Prove the schema guard is load-bearing**

Temporarily change `if (!BUSINESS.street || !BUSINESS.city) return null` to `return null` unconditionally, run `npx vitest run src/data/seo.test.js`, and confirm the "emits a valid listing" case fails. Restore it and re-run to green.

- [ ] **Step 8: Commit**

```bash
git add src/entry-server.jsx src/data/seo.js src/data/seo.test.js scripts/prerender.mjs
git commit -m "feat: prerender both routes, with the listing derived from the same facts"
```

---

### Task 9: Deploy, and write down what launch still needs

**Files:**
- Create: `README.md`, `public/robots.txt`
- Test: none — this task ships what the previous eight built.

**Interfaces:**
- Consumes: everything above.
- Produces: a live URL.

- [ ] **Step 1: Write `public/robots.txt`**

Two routes, one of them `noindex`, do not justify a sitemap — and a `robots.txt` pointing at a `sitemap.xml` that 404s is a real error in Search Console. So the whole file is:

```
User-agent: *
Allow: /
```

- [ ] **Step 2: Write the README**

````markdown
# AB Masszázs

A one-page site for a one-therapist massage salon, plus an adatvédelmi
tájékoztató. Phase 1 of the design spec: no booking yet.

## Running it

    npm install
    npm run dev

## Building it

    SITE_ORIGIN=https://<host> npm run build

The build refuses to run while any fact only the owner can supply is still
missing — see `scripts/check-content.mjs`. That is deliberate: nothing about
the business is invented, so an unfinished site fails loudly instead of going
live with blank sections.

## Before launch

- [ ] Service list — name, duration, price for each — into `src/data/services.js`
- [ ] Address, opening hours, telephone, legal name — into `src/data/business.js`
- [ ] The "Rólam" paragraph, in her own words — `ABOUT_TEXT` in `src/sections/About.jsx`
- [ ] Facebook and Instagram URLs — `src/data/business.js`
- [ ] Google cégprofil claimed and filled — this matters more for local search
      than the website does

## Phase 2

Online booking against her Google Calendar. Not started.
````

- [ ] **Step 3: Push to GitHub**

```bash
git add -A
git commit -m "docs: how to run it, and what launch is still waiting on"
gh repo create ab-masszazs --public --source=. --push
```

- [ ] **Step 4: Deploy**

Connect the repo to **Cloudflare Pages** (or Netlify). Both free tiers permit commercial use; Vercel's Hobby plan does not, and this is a commercial site — spec §3.

- Build command: `SITE_ORIGIN=https://<the-assigned-host> npm run build`
- Output directory: `dist`
- Node version: 22 or newer

The first deploy **will fail**, because `check-content.mjs` exits 1 while the service list and address are empty. That is the guard working as designed. Fill the data modules with her real answers, commit, and the next deploy succeeds.

- [ ] **Step 5: Verify the live site**

```bash
curl -s https://<host>/ | grep -o '<title>[^<]*</title>'
curl -s https://<host>/ | grep -c 'HealthAndBeautyBusiness'
curl -s -o /dev/null -w '%{http_code}\n' https://<host>/adatvedelem
```

Expected: a title containing the town, `1` for the JSON-LD block, and `200` for the tájékoztató. Then paste the home page URL into Google's Rich Results Test and confirm the listing parses with no errors.

- [ ] **Step 6: Report**

Tell the user the live URL, whether the Rich Results Test passed, and which items on the README's launch checklist are still open.

---

## Self-Review

**Spec coverage.** §1's "get found" and "look credible" → Tasks 6, 8, 9. §3 front end and hosting → Tasks 1 and 9; the no-database decision belongs to Phase 2, and Phase 1 correctly has no store at all. §5 pages → Tasks 6 and 7; the photo-degradation rule → Task 4. §6 getting found → Task 8 (JSON-LD, titles) plus the README checklist for the cégprofil, which is deliberately not code. §7 data protection → Task 7, scoped honestly to what Phase 1 actually collects, which is nothing. §9 required inputs → Tasks 2 and 3 turn every one of them into a build failure rather than a blank section. §11 phase boundary → enforced in Global Constraints.

**Deliberately out of scope, belonging to Phase 2:** the three functions, the slot calculator and its DST tests, the calendar service account, Gmail SMTP, `/foglalas`, the cancel token, and the rewritten tájékoztató describing booking data. Spec §8's test list is Phase 2's, because the pure function it describes does not exist yet.

**Placeholder scan.** No TBD/TODO; every code step carries real code. The empty values in `business.js`, `services.js`, `ABOUT_TEXT` and `FAQ` are not placeholders in the plan's sense — they are the specified default, enforced by tests and a build guard, precisely so that no invented value can ship.

**Type consistency.** `BUSINESS` and `SERVICES` are defined in Task 2 and consumed under those names in Tasks 3, 5, 6, 7 and 8. `missingFacts()` is defined in Task 2 and called in Task 3. `formatPrice`/`formatDuration` are defined and used in Task 5. `PhotoSlot`'s four props are fixed in Task 4 and used unchanged in Task 6. `ROUTES`, `metaFor` and `buildLocalBusinessJsonLd` are defined in Task 8 and consumed by `scripts/prerender.mjs` in that same task. `BUSINESS.hours` is `{ day, opens, closes }` everywhere it appears. `metaFor` returns `index` in both branches, which Task 8's prerender relies on.

**One risk left open on purpose.** Task 9's first deploy is expected to fail. That is the guard behaving correctly, but it means the deploy pipeline is not proven green until her real content exists — and there is no way to prove it earlier without either inventing data or weakening the guard. Both are worse.
