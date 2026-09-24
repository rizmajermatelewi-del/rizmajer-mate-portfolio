# Services Catalogue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One priced services catalogue replaces ServicesGrid, AiServices and Pricing; Pillars and Features go; Protocol becomes a 4-step "Így dolgozom"; skill tiles move to /fejleszto.

**Architecture:** `src/data/services.js` becomes the single price/offer source (absorbing `pricing.js` and `ai.js`). Every consumer (FAQ, llms.txt, knowledge.json, the new `Services.jsx`) reads it. Sections are deleted, not hidden.

**Tech Stack:** React 19, Vite, Tailwind, Vitest, GSAP (Protocol only).

**Spec:** `docs/superpowers/specs/2026-09-24-services-catalogue-design.md`

## Global Constraints

- Every user-facing string is `{ hu, en }`; `untranslatedIn()` must stay empty.
- Prices exist once, in forint, in `services.js`; hu/en text built with `forint`/`priceEn` from `fx.js`.
- Copy tone per PRODUCT.md: direct, factual, second person singular, no stack-flexing.
- `demo` only for URLs present in `PROJECTS_FULL[].live`; `isNew` and `demo` never together.
- Anchors stay Hungarian (`#szolgaltatasok`, `#folyamat`, ...); nav order must match page order (nav.test.js).
- Existing copy for existing offers is carried over verbatim, not rewritten.
- `npm run build` (tests + prerender) green at the end of every task.

## Spec amendment (found while planning)

pricing.js already sells "Meglévő weboldal felújítása" at 150 000 Ft-tól (keeps the
site, fixes it) and "Google-megjelenés" at 60 000 Ft-tól. Both stay. The approved
"Meglévő oldal átépítése" (290 000 Ft-tól, a new site replacing the old one) is a
separate item. Weboldalak therefore has 5 items, 17 in total.

---

### Task 1: services.js as the single source

**Files:**
- Create: `src/data/services.js`, `src/data/services.test.js`
- Modify: `src/data/faq.js`, `src/data/faq.test.js`, `scripts/knowledge.mjs`, `scripts/generate-knowledge.mjs`, `src/data/knowledge.test.js`, `src/data/knowledge-output.test.js`, `scripts/generate-static.mjs`, `src/data/static-output.test.js`

**Interfaces, produces:**
```js
export const TIER_FLOORS = { intro: 240000, booking: 690000, system: 1200000 }
export const RETAINER_HUF = 25000
export const RETAINER          // { hu, en } sentence, carried from PRICING_RETAINER
export const SERVICE_GROUPS    // [{ id, title{hu,en}, intro{hu,en}, items: SERVICE[] }]
export const ALL_SERVICES      // flat list, each item plus `group: <group id>`
export function priceLabel(s)  // -> { hu, en }; unit 'from' (default) | 'flat' | 'month' | 'process'
// SERVICE = { id, name, problem, forWho, includes[3-4], priceHuf, priceUnit?,
//             timeline?, demo?, isNew?, proof? }
```
Group ids: `weboldalak`, `eladas`, `rendszerek`, `folyamatos`.

- [ ] Step 1: write `services.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { SERVICE_GROUPS, ALL_SERVICES, priceLabel, TIER_FLOORS } from './services'
import { PROJECTS_FULL } from './projects'
import { t } from '../i18n/t'
// plus the untranslatedIn helper, imported the way protocol.test.js imports it

describe('services catalogue', () => {
  it('has four groups and every string in both languages', () => {
    expect(SERVICE_GROUPS.map((g) => g.id)).toEqual(['weboldalak', 'eladas', 'rendszerek', 'folyamatos'])
    expect(untranslatedIn(SERVICE_GROUPS)).toEqual([])
  })
  it('gives every service a unique id, a price and 3-4 includes', () => {
    expect(new Set(ALL_SERVICES.map((s) => s.id)).size).toBe(ALL_SERVICES.length)
    for (const s of ALL_SERVICES) {
      expect(s.priceHuf, s.id).toBeGreaterThan(0)
      expect(s.includes.length, s.id).toBeGreaterThanOrEqual(3)
      expect(s.includes.length, s.id).toBeLessThanOrEqual(4)
      expect(t(priceLabel(s), 'hu')).toMatch(/Ft/)
    }
  })
  it('links a demo only where the portfolio has that live demo, and never on a new item', () => {
    const live = PROJECTS_FULL.map((p) => p.live)
    for (const s of ALL_SERVICES.filter((x) => x.demo)) {
      expect(live, s.id).toContain(s.demo)
      expect(s.isNew, `${s.id} cannot be both new and demoed`).toBeFalsy()
    }
    expect(ALL_SERVICES.filter((s) => s.demo)).toHaveLength(3)
  })
  it('keeps the tier floors on the matching catalogue items', () => {
    const price = (id) => ALL_SERVICES.find((s) => s.id === id).priceHuf
    expect(price('bemutatkozo')).toBe(TIER_FLOORS.intro)
    expect(price('idopontfoglalo')).toBe(TIER_FLOORS.booking)
    expect(price('egyedi-rendszer')).toBe(TIER_FLOORS.system)
  })
})
```
- [ ] Step 2: `npx vitest run src/data/services.test.js` → FAIL (module missing).
- [ ] Step 3: write `services.js`: 17 items from the spec table plus the amendment. Copy for existing offers is lifted verbatim from pricing.js / ai.js (desc → forWho, features → includes, scope → timeline). pricing.js and ai.js stay until Task 3, because their sections still import them.
- [ ] Step 4: switch consumers. faq.js imports `TIER_FLOORS` from services. faq.test figures = `Object.values(TIER_FLOORS)` + `RETAINER_HUF`. knowledge.mjs emits `services` (group title, name, price, timeline, problem, forWho, includes) and `retainer`, dropping `pricing` and `aiServices`. generate-knowledge guards on `services.length`. generate-static writes one llms.txt line per service, `- name: price`. Tests use the same derivations.
- [ ] Step 5: `npm run build` → green. Commit.

### Task 2: Services section + quote prefill

**Files:** Create `src/sections/Services.jsx`. Modify `src/sections/ContactForm.jsx`.

**Interfaces, produces:** window event `quote:prefill` with `detail: { name: { hu, en } }`. ContactForm listens, sets `message` to `Érdekel: <name>` + blank line (en: `Interested in: <name>`) when the field is empty or holds only an earlier prefill line, then focuses `#message`.

- [ ] Step 1: Services.jsx. `<section id="szolgaltatasok">`, heading "Szolgáltatások / Mit építhetek neked.". A tablist of 4 `role="tab"` buttons (`aria-selected`, `aria-controls`, roving tabIndex, ArrowLeft/ArrowRight/Home/End). One `role="tabpanel"` per group, always rendered, inactive ones `hidden`. Card: name, badges (`Új` / `Élő demó →` link, new tab), problem, includes with a Check icon, proof line, `priceLabel` + timeline, and `Ajánlatot kérek erre` = `<a href="#kapcsolat">` whose onClick dispatches `quote:prefill`. Group intro under the tabs. The honesty line appears once, in groups that contain `isNew` items. Closing line "Nem tudod, melyik kell? ..." → #kapcsolat. RETAINER sentence under the folyamatos group. Styles reuse the Pricing card classes.
- [ ] Step 2: the ContactForm `useEffect` listener described above.
- [ ] Step 3: render it in App after Projects; `npm run build`; commit.

### Task 3: Rebuild the homepage around it

**Files:** Modify `src/App.jsx`, `src/data/nav.js`, `src/data/protocol.js`, `src/data/protocol.test.js`, `src/sections/Protocol.jsx`, `src/components/StepVisual.jsx`, `src/sections/About.jsx`, `src/sections/Footer.jsx`. Delete `src/sections/{Pillars,Features,ServicesGrid,AiServices,Pricing}.jsx` and `src/data/{pricing,ai}.js`.

- [ ] App order: Hero, Testimonial, About, Projects, Services, Protocol, Faq, ContactForm.
- [ ] NAV_LINKS: Rólam #rolam, Projektek #projektek, Szolgáltatások #szolgaltatasok, Folyamat #folyamat, GYIK #gyik.
- [ ] protocol.js: 4 steps per spec §2 (hu/en); the test expects 4. Protocol heading "Így dolgozom." / "How I work.". STEP_VARIANTS gains `'support'`; StepVisual gets a `Support` shape drawn in the same style as the other three.
- [ ] About: the "egy ember" sentence goes at the end of the second paragraph (hu/en).
- [ ] Footer: the "Készségek" column becomes "Szolgáltatások", listing the 4 group titles, each linking to `#szolgaltatasok`.
- [ ] Remove dead imports. Grep src/ and scripts/ for `#arak`, `#ai`, `#keszsegek`, `#filozofia`, `PRICING_`, `AI_SERVICES` and fix every hit.
- [ ] `npm run build` green; commit.

### Task 4: Skill tiles on /fejleszto

**Files:** Modify `src/pages/Fejleszto.jsx`.

- [ ] New `<section aria-labelledby="kepessegek">` after "approach": h2 "Mit csinálok" / "What I do", a grid of ORDERED_SKILLS showing icon, title, text and detail, using the same section and heading classes as its neighbours.
- [ ] knowledge.mjs keeps `skills`. `npm run build`; commit.

### Task 5: Verify and ship

- [ ] Update the "N teszt, M fájlban" line in `src/data/engineering.js` to the real Vitest count (engineering.test.js pins it).
- [ ] `npm run build`; screenshot the homepage at 1280 and 390 px (services tabs, one card per group, Így dolgozom) and /fejleszto.
- [ ] Fast-forward main, push, wait for Vercel Ready, check the live site.
