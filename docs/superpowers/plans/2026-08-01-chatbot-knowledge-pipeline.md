# Chatbot Knowledge Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish `https://rizmajer-mate-portfolio.vercel.app/knowledge.json` — a generated, drift-proof machine-readable summary of the site's real service data — so the chatbot demo can be built against one source of truth.

**Architecture:** Two content sources currently inline in components (`Faq.jsx`, `Protocol.jsx`) move to data modules. A pure builder function assembles every data module into one object; a thin writer script emits it to `public/` before `vite build` copies that directory. Tests assert the generated object against the data modules it derives from, so a new price tier or FAQ entry cannot silently go missing.

**Tech Stack:** Node ESM (`.mjs`), Vite 8, Vitest 3 (jsdom), oxlint.

## Global Constraints

- This is **Plan A of two**. It ships on its own and blocks Plan B — the chatbot's build fetches the URL this plan publishes. Do not start chatbot work here.
- Source of truth: `docs/superpowers/specs/2026-08-01-ai-chatbot-demo-design.md`.
- **No content may be reworded during extraction.** Every Hungarian string moves verbatim. This is a mechanical refactor; a changed answer is a regression.
- The generator must run **before `vite build`**, not before `prerender.mjs` — Vite copies `public/` at the start of `vite build`. (This corrects spec §6.2.)
- `skills.js` imports `lucide-react`; the `icon` field is a React component and **must never be serialised** into the JSON.
- Existing test convention: derive from the source of truth and compare (see `src/data/nav.test.js`, `src/routePaths.test.js`). Every guard must be proved load-bearing by mutation.
- Vitest only collects `src/**/*.test.{js,jsx}` — tests live under `src/`, even when they test `scripts/`.
- Do not touch: `projects.js`, the Projects section, the palette/theme tokens, or the AI section's honesty paragraph.
- Commit after each task. Do not push — pushing deploys to production and needs the user's go-ahead.

---

### Task 1: Extract the FAQ into a data module

**Files:**
- Create: `src/data/faq.js`
- Modify: `src/sections/Faq.jsx` (remove `const QUESTIONS`, lines 9–42; add import)
- Test: `src/data/faq.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `export const FAQ_QUESTIONS` — `Array<{ q: string, a: string }>`, 8 entries, order unchanged.

- [ ] **Step 1: Write the failing test**

Create `src/data/faq.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { FAQ_QUESTIONS } from './faq'

/* Faq.jsx used to define this list inline. The risk in moving it is a silently
   dropped or reworded answer, so this asserts both that the data survived and
   that the component no longer carries a second copy of it. */
const faqSource = readFileSync(path.resolve(process.cwd(), 'src/sections/Faq.jsx'), 'utf8')

describe('FAQ data', () => {
  it('keeps every question and answer non-empty', () => {
    expect(FAQ_QUESTIONS.length).toBe(8)
    for (const { q, a } of FAQ_QUESTIONS) {
      expect(typeof q).toBe('string')
      expect(q.trim().length).toBeGreaterThan(0)
      expect(a.trim().length).toBeGreaterThan(20)
    }
  })

  it('still contains the answers the pricing FAQ depends on', () => {
    const joined = FAQ_QUESTIONS.map((x) => x.a).join(' ')
    for (const floor of ['180 000', '450 000', '1 200 000', '25 000']) {
      expect(joined, `the FAQ no longer mentions ${floor}`).toContain(floor)
    }
  })

  it('leaves no second copy of the list inside the component', () => {
    expect(faqSource).toContain("from '../data/faq'")
    expect(faqSource, 'Faq.jsx still declares its own QUESTIONS array').not.toMatch(/const QUESTIONS\s*=\s*\[/)
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/faq.test.js`
Expected: FAIL — `Failed to resolve import "./faq"`.

- [ ] **Step 3: Create the data module**

Create `src/data/faq.js`. Move the array from `src/sections/Faq.jsx` lines 9–42 **verbatim** — all 8 objects, same order, every Hungarian string byte-identical. Rename `QUESTIONS` to `FAQ_QUESTIONS` and export it. Carry the explanatory comment across:

```js
/* The objections an SME actually raises before hiring.
   Moved out of Faq.jsx so the knowledge generator can read the same answers
   the page shows — one source, so the bot and the page cannot disagree. */
export const FAQ_QUESTIONS = [
  // ...the 8 { q, a } objects, moved verbatim from Faq.jsx
]
```

- [ ] **Step 4: Point the component at it**

In `src/sections/Faq.jsx`: delete the `const QUESTIONS = [...]` block, add `import { FAQ_QUESTIONS } from '../data/faq'` to the imports, and replace the single `QUESTIONS` usage in the render with `FAQ_QUESTIONS`. Keep the section's own comment block.

- [ ] **Step 5: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all tests PASS, lint exit 0.

- [ ] **Step 6: Prove the guard is load-bearing**

Temporarily delete one entry from `FAQ_QUESTIONS`, run `npx vitest run src/data/faq.test.js`, and confirm it fails naming the count. Restore the entry and re-run to green.

- [ ] **Step 7: Verify the page still renders all 8**

Run: `npm run dev`, open the GYIK section, confirm 8 questions and that opening one shows the full answer. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add src/data/faq.js src/data/faq.test.js src/sections/Faq.jsx
git commit -m "refactor: move the FAQ into a data module so one source feeds page and bot"
```

---

### Task 2: Extract the Protocol steps into a data module

**Files:**
- Create: `src/data/protocol.js`
- Modify: `src/sections/Protocol.jsx` (replace the `const steps` array, line 136; keep the three `.webp` imports)
- Test: `src/data/protocol.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `export const PROTOCOL_STEPS` — `Array<{ num: string, title: string, tagline: string, text: string }>`, 3 entries. **No `image` / `imageAlt` fields** — those stay in the component.

- [ ] **Step 1: Write the failing test**

Create `src/data/protocol.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { PROTOCOL_STEPS } from './protocol'

/* The images deliberately stay in Protocol.jsx: they are Vite asset imports,
   which resolve to hashed URLs at build time and mean nothing to a Node script
   or to the chatbot. Only the text moves. */
const protocolSource = readFileSync(path.resolve(process.cwd(), 'src/sections/Protocol.jsx'), 'utf8')

describe('Protocol steps data', () => {
  it('carries three numbered steps with text', () => {
    expect(PROTOCOL_STEPS.length).toBe(3)
    expect(PROTOCOL_STEPS.map((s) => s.num)).toEqual(['01', '02', '03'])
    for (const step of PROTOCOL_STEPS) {
      expect(step.title.trim().length).toBeGreaterThan(0)
      expect(step.tagline.trim().length).toBeGreaterThan(0)
      expect(step.text.trim().length).toBeGreaterThan(20)
    }
  })

  it('holds no image fields — those belong to the component', () => {
    for (const step of PROTOCOL_STEPS) {
      expect(step).not.toHaveProperty('image')
      expect(step).not.toHaveProperty('imageAlt')
    }
  })

  it('leaves no second copy of the step text inside the component', () => {
    expect(protocolSource).toContain("from '../data/protocol'")
    expect(protocolSource, 'Protocol.jsx still declares its own steps array').not.toMatch(/const steps\s*=\s*\[/)
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/protocol.test.js`
Expected: FAIL — `Failed to resolve import "./protocol"`.

- [ ] **Step 3: Create the data module**

Create `src/data/protocol.js` with the three steps' `num`, `title`, `tagline` and `text` copied **verbatim** from `Protocol.jsx` lines 136–161. Drop `image` and `imageAlt`:

```js
/* The three steps a client walks through, moved out of Protocol.jsx so the
   knowledge generator can read them. The photographs stay in the component:
   they are Vite asset imports and are decorative (every imageAlt is ''). */
export const PROTOCOL_STEPS = [
  // ...the 3 { num, title, tagline, text } objects, moved verbatim
]
```

- [ ] **Step 4: Rejoin text and images in the component**

In `src/sections/Protocol.jsx`, keep the three `.webp` imports and the comment above the old array. Add `import { PROTOCOL_STEPS } from '../data/protocol'` to the imports, then replace the `const steps = [...]` block with a merge that pairs each step with its image by index:

```js
const stepImages = [protocolEgyeztetes, protocolFejlesztes, protocolAtadas]
const steps = PROTOCOL_STEPS.map((step, i) => ({
  ...step,
  image: stepImages[i],
  imageAlt: '',
}))
```

- [ ] **Step 5: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all tests PASS, lint exit 0.

- [ ] **Step 6: Prove the guard is load-bearing**

Temporarily add `image: 'x'` to one entry in `PROTOCOL_STEPS`, run `npx vitest run src/data/protocol.test.js`, confirm the "holds no image fields" case fails. Remove it and re-run to green.

- [ ] **Step 7: Verify the section still works**

Run `npm run dev`, scroll the Folyamat section, and confirm all three cards show their photo, their heading and their text, and that the stacking scroll animation still runs. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add src/data/protocol.js src/data/protocol.test.js src/sections/Protocol.jsx
git commit -m "refactor: move the Folyamat step text into a data module, images stay put"
```

---

### Task 3: Build the knowledge object

**Files:**
- Create: `scripts/knowledge.mjs`
- Test: `src/data/knowledge.test.js`

**Interfaces:**
- Consumes: `PRICING_TIERS`, `PRICING_ENTRY`, `PRICING_RETAINER` (`src/data/pricing.js`); `AI_SERVICES` (`src/data/ai.js`); `ORDERED_SKILLS` (`src/data/skills.js`); `FAQ_QUESTIONS` (Task 1); `PROTOCOL_STEPS` (Task 2).
- Produces: `export function buildKnowledge(today = new Date())` returning the object described below. Task 4 imports this exact name.

Output shape — every field required:

```
{ summary, contact: { email }, pricing: { tiers[], entry, retainer },
  aiServices[], process[], faq[], skills[], generated }
```

- [ ] **Step 1: Write the failing test**

Create `src/data/knowledge.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { buildKnowledge } from '../../scripts/knowledge.mjs'
import { PRICING_TIERS, PRICING_ENTRY, PRICING_RETAINER } from './pricing'
import { AI_SERVICES } from './ai'
import { ORDERED_SKILLS } from './skills'
import { FAQ_QUESTIONS } from './faq'
import { PROTOCOL_STEPS } from './protocol'

/* Same shape of guard as nav.test.js and routePaths.test.js: derive from the
   source of truth and compare, rather than trusting two lists to be edited
   together. The failure this prevents is worse than the ones those catch —
   a chatbot answering a prospect from a price list that lost a tier. */
const k = buildKnowledge(new Date('2026-08-01T00:00:00Z'))

describe('knowledge object', () => {
  it('is non-empty and serialises to JSON', () => {
    const json = JSON.stringify(k)
    expect(json.length).toBeGreaterThan(500)
    expect(JSON.parse(json)).toEqual(k)
  })

  it('carries every price floor from pricing.js', () => {
    for (const tier of PRICING_TIERS) {
      const match = k.pricing.tiers.find((t) => t.name === tier.name)
      expect(match, `tier "${tier.name}" is missing from the knowledge file`).toBeTruthy()
      expect(match.floor).toBe(tier.priceNote)
    }
    expect(k.pricing.tiers).toHaveLength(PRICING_TIERS.length)
    expect(k.pricing.entry.floor).toBe(PRICING_ENTRY.priceNote)
    expect(k.pricing.retainer).toBe(PRICING_RETAINER)
  })

  it('carries every AI service with its price and scope', () => {
    expect(k.aiServices).toHaveLength(AI_SERVICES.length)
    for (const svc of AI_SERVICES) {
      const match = k.aiServices.find((s) => s.title === svc.title)
      expect(match, `AI service "${svc.title}" is missing`).toBeTruthy()
      expect(match.priceNote).toBe(svc.priceNote)
      expect(match.scope).toBe(svc.scope)
    }
  })

  it('carries every FAQ pair and every process step', () => {
    expect(k.faq).toHaveLength(FAQ_QUESTIONS.length)
    for (const { q } of FAQ_QUESTIONS) {
      expect(k.faq.some((f) => f.q === q), `FAQ "${q}" is missing`).toBe(true)
    }
    expect(k.process).toHaveLength(PROTOCOL_STEPS.length)
  })

  it('carries every skill, and never a React component', () => {
    expect(k.skills).toHaveLength(ORDERED_SKILLS.length)
    for (const skill of k.skills) {
      expect(skill).not.toHaveProperty('icon')
      expect(typeof skill.detail).toBe('string')
    }
    expect(JSON.stringify(k)).not.toContain('[object Object]')
  })

  it('states the contact address and an ISO build date', () => {
    expect(k.contact.email).toBe('rizmajermatelewi@gmail.com')
    expect(k.generated).toBe('2026-08-01')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/knowledge.test.js`
Expected: FAIL — cannot resolve `../../scripts/knowledge.mjs`.

- [ ] **Step 3: Write the builder**

Create `scripts/knowledge.mjs`:

```js
import { PRICING_TIERS, PRICING_ENTRY, PRICING_RETAINER } from '../src/data/pricing.js'
import { AI_SERVICES } from '../src/data/ai.js'
import { ORDERED_SKILLS } from '../src/data/skills.js'
import { FAQ_QUESTIONS } from '../src/data/faq.js'
import { PROTOCOL_STEPS } from '../src/data/protocol.js'

/* Assembles every content module into one machine-readable object, published
   at /knowledge.json and consumed by the chatbot demo at its build time.

   The point of generating rather than hand-writing it: this repo has been
   bitten by one fact living in several places until the copies drifted apart.
   Here the drifted copy would be a price quoted to a prospect by a bot, so
   the file is derived from the same modules the page renders, and
   src/data/knowledge.test.js fails if a tier or an entry stops appearing.

   Only plain data crosses this boundary. ORDERED_SKILLS carries an `icon`
   React component; it is dropped explicitly below, because JSON.stringify
   would otherwise turn it into an empty object and the bot would read a
   skill with a meaningless field. */
export const CONTACT_EMAIL = 'rizmajermatelewi@gmail.com'

const SUMMARY =
  'Magyarországon dolgozó full-stack fejlesztő. Kis- és középvállalkozásoknak épít ' +
  'weboldalt és belső rendszert: foglalást, rendelést, ügyfél-nyilvántartást — jellemzően ' +
  'olyan folyamatokat, amelyek ma telefonon és táblázatban mennek. Egy ember csinálja ' +
  'végig, alvállalkozó és projektmenedzser nélkül.'

export function buildKnowledge(today = new Date()) {
  return {
    summary: SUMMARY,
    contact: { email: CONTACT_EMAIL },
    pricing: {
      tiers: PRICING_TIERS.map((t) => ({
        name: t.name,
        floor: t.priceNote,
        scope: t.scope,
        desc: t.desc,
        includes: [...t.features],
      })),
      entry: {
        name: PRICING_ENTRY.name,
        floor: PRICING_ENTRY.priceNote,
        desc: PRICING_ENTRY.desc,
      },
      retainer: PRICING_RETAINER,
    },
    aiServices: AI_SERVICES.map((s) => ({
      title: s.title,
      text: s.text,
      detail: s.detail,
      priceNote: s.priceNote,
      scope: s.scope,
    })),
    process: PROTOCOL_STEPS.map((s) => ({ title: s.title, text: s.text })),
    faq: FAQ_QUESTIONS.map((f) => ({ q: f.q, a: f.a })),
    skills: ORDERED_SKILLS.map((s) => ({
      category: s.category,
      title: s.title,
      detail: s.detail,
    })),
    generated: today.toISOString().slice(0, 10),
  }
}
```

- [ ] **Step 4: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all tests PASS, lint exit 0.

- [ ] **Step 5: Prove the guard is load-bearing**

Temporarily comment out the last entry of `PRICING_TIERS` in `src/data/pricing.js`, run `npx vitest run src/data/knowledge.test.js`, and confirm it fails naming the missing tier. Then temporarily add `icon: s.icon` to the `skills` map and confirm the "never a React component" case fails. Restore both and re-run to green.

- [ ] **Step 6: Commit**

```bash
git add scripts/knowledge.mjs src/data/knowledge.test.js
git commit -m "feat: derive one machine-readable knowledge file from the page's own data"
```

---

### Task 4: Emit `public/knowledge.json` during the build

**Files:**
- Create: `scripts/generate-knowledge.mjs`
- Modify: `package.json` (the `build` script)
- Modify: `.gitignore`
- Test: `src/data/knowledge-output.test.js`

**Interfaces:**
- Consumes: `buildKnowledge` from `scripts/knowledge.mjs` (Task 3).
- Produces: `public/knowledge.json`, served in production at `/knowledge.json`. Plan B's build fetches this URL.

- [ ] **Step 1: Write the failing test**

Create `src/data/knowledge-output.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { buildKnowledge } from '../../scripts/knowledge.mjs'

/* Runs the writer for real rather than trusting that it was wired up. The
   failure this catches is the file never reaching dist/: Vite copies public/
   at the START of `vite build`, so a generator that runs afterwards produces
   a file that exists locally and 404s in production. */
const root = process.cwd()
const outPath = path.join(root, 'public/knowledge.json')

describe('knowledge.json output', () => {
  it('is written by the generator script', () => {
    execFileSync('node', ['scripts/generate-knowledge.mjs'], { cwd: root })
    expect(existsSync(outPath)).toBe(true)
    const parsed = JSON.parse(readFileSync(outPath, 'utf8'))
    expect(parsed.pricing.tiers.length).toBe(buildKnowledge().pricing.tiers.length)
    expect(parsed.contact.email).toBe('rizmajermatelewi@gmail.com')
  })

  it('is generated before vite copies public/', () => {
    const build = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')).scripts.build
    const genAt = build.indexOf('generate-knowledge.mjs')
    const viteAt = build.indexOf('vite build')
    expect(genAt, 'generate-knowledge.mjs is not in the build script').toBeGreaterThan(-1)
    expect(genAt, 'the generator must run before `vite build` copies public/').toBeLessThan(viteAt)
  })

  it('is not tracked in git — it is a build artifact', () => {
    const ignore = readFileSync(path.join(root, '.gitignore'), 'utf8')
    expect(ignore).toContain('public/knowledge.json')
  })
})
```

- [ ] **Step 2: Run it and verify it fails**

Run: `npx vitest run src/data/knowledge-output.test.js`
Expected: FAIL — cannot find `scripts/generate-knowledge.mjs`.

- [ ] **Step 3: Write the writer**

Create `scripts/generate-knowledge.mjs`:

```js
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { buildKnowledge } from './knowledge.mjs'

/* Writes the knowledge file into public/, which Vite copies verbatim into
   dist/. Ordering matters: that copy happens at the START of `vite build`,
   so this script runs before it, not after — see package.json. */
const out = path.resolve(process.cwd(), 'public/knowledge.json')
const knowledge = buildKnowledge()

if (!knowledge.pricing.tiers.length) {
  throw new Error('knowledge.json would ship with no price tiers — refusing to write it')
}

mkdirSync(path.dirname(out), { recursive: true })
writeFileSync(out, `${JSON.stringify(knowledge, null, 2)}\n`, 'utf8')
console.log(
  `knowledge.json: ${knowledge.pricing.tiers.length} tiers, ${knowledge.faq.length} FAQ, ${knowledge.aiServices.length} AI services`,
)
```

- [ ] **Step 4: Wire it into the build and ignore the artifact**

In `package.json`, change the `build` script to run the generator first:

```json
"build": "node scripts/generate-knowledge.mjs && vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs"
```

Append to `.gitignore`:

```
# Generated at build time from the data modules — see scripts/knowledge.mjs
public/knowledge.json
```

- [ ] **Step 5: Run the tests and the linter**

Run: `npx vitest run && npx oxlint`
Expected: all tests PASS, lint exit 0.

- [ ] **Step 6: Run the full build and confirm the file reaches `dist/`**

Run: `npm run build`
Then: `node -e "const k=JSON.parse(require('fs').readFileSync('dist/knowledge.json','utf8'));console.log(k.pricing.tiers.length,'tiers |',k.faq.length,'faq |',k.generated)"`
Expected: prints `3 tiers | 8 faq | <today's date>`. If `dist/knowledge.json` does not exist, the generator is running in the wrong position in the build script.

- [ ] **Step 7: Prove the ordering guard is load-bearing**

Temporarily move `node scripts/generate-knowledge.mjs &&` to the end of the `build` script, run `npx vitest run src/data/knowledge-output.test.js`, and confirm the ordering case fails with its message. Restore the correct order and re-run to green.

- [ ] **Step 8: Commit**

```bash
git add scripts/generate-knowledge.mjs package.json .gitignore src/data/knowledge-output.test.js
git commit -m "feat: publish knowledge.json at build time, ahead of vite's public copy"
```

---

### Task 5: Verify in production and hand off to Plan B

**Files:** none — this task ships and verifies what Tasks 1–4 built.

**Interfaces:**
- Consumes: everything above.
- Produces: a live `https://rizmajer-mate-portfolio.vercel.app/knowledge.json`, which Plan B Task 1 fetches.

- [ ] **Step 1: Confirm the working tree is green**

Run: `npx vitest run && npx oxlint && npm run build`
Expected: all tests PASS, lint exit 0, build succeeds with all four routes prerendered.

- [ ] **Step 2: Confirm nothing unrelated changed**

Run: `git status --short && git log --oneline origin/main..HEAD`
Expected: only `.impeccable/` untracked; exactly the four commits from Tasks 1–4.

- [ ] **Step 3: Ask the user before pushing**

Pushing to `main` auto-deploys to Vercel production. Stop here and ask. Do not push without an explicit go-ahead.

- [ ] **Step 4: Push, once authorised**

```bash
git push origin main
```

- [ ] **Step 5: Verify the live endpoint**

```bash
curl -s https://rizmajer-mate-portfolio.vercel.app/knowledge.json > /tmp/k.json
node -e "const k=JSON.parse(require('fs').readFileSync('/tmp/k.json','utf8'));console.log(k.pricing.tiers.length,'tiers |',k.faq.length,'faq |',k.aiServices.length,'ai |',k.generated)"
```

Expected: `3 tiers | 8 faq | 3 ai | <build date>`. Poll for up to five minutes — the deploy takes about 30 seconds.

- [ ] **Step 6: Confirm the page is unharmed**

Open the live site and check the GYIK section still lists 8 questions and the Folyamat section still shows three cards with their photos. This refactor touched both.

- [ ] **Step 7: Measure the corpus against the model that will read it**

This is the check spec §9 requires before the chatbot's cost plan can be trusted. Prompt caching on `claude-haiku-4-5` needs a **4096-token** prefix; below that it silently does not cache.

Run it with `npx -p`, which makes the SDK available for one command without
installing it. **Do not `npm i` the SDK into this repo** — the portfolio is a
static site and has no business carrying a model client in its dependency tree
just to take one measurement.

```bash
npx -y -p @anthropic-ai/sdk node --input-type=module -e "
import Anthropic from '@anthropic-ai/sdk'
const k = await (await fetch('https://rizmajer-mate-portfolio.vercel.app/knowledge.json')).json()
const r = await new Anthropic().messages.countTokens({
  model: 'claude-haiku-4-5',
  messages: [{ role: 'user', content: JSON.stringify(k) }],
})
console.log(r.input_tokens, 'tokens —', r.input_tokens >= 4096 ? 'CACHEABLE' : 'BELOW THE 4096 FLOOR')
"
```

Requires `ANTHROPIC_API_KEY` in the environment. If it is not set, skip this step
and record that it is outstanding — the measurement can also be taken from Plan B's
repo, where the SDK is a genuine dependency. Record the number either way: it decides
whether Plan B budgets for cached or uncached input. It does not block Plan B.

Afterwards, confirm the repo is unpolluted: `git status --short` must show no change
to `package.json` or `package-lock.json`.

- [ ] **Step 8: Report**

Tell the user: the live token count from Step 7, whether caching will work, and that Plan B is now unblocked.

---

## Self-Review

**Spec coverage.** §6.1 prerequisite refactor → Tasks 1–2. §6.2 generator and its exact field shape → Task 3. §6.3's "build fails on empty" → the guard in Task 4 Step 3 (portfolio side; the chatbot-side fetch guard is Plan B). §9's cache-floor measurement → Task 5 Step 7. §11's deterministic tests and the mutation requirement → Tasks 1–4, each with its own mutation step. **Deliberately out of scope, and belonging to Plan B:** §7 widget, §8 behaviour contract, §10 error handling, §11 eval and live acceptance, §12 the `ai.js` `live` field and the `AiServices.jsx` link — that one lands only *after* the demo is live, so it cannot be done here.

**Placeholder scan.** No TBD/TODO. Every code step carries real code. The two "move verbatim" instructions name exact source files and line ranges — reproducing eight long Hungarian answers inside the plan would add transcription risk, not precision.

**Type consistency.** `buildKnowledge(today)` is defined in Task 3 and imported under that name in Tasks 3, 4 and 5. `FAQ_QUESTIONS` and `PROTOCOL_STEPS` are produced in Tasks 1–2 and consumed in Task 3 under those names. `tier.priceNote` → `knowledge.pricing.tiers[].floor` is the one field renamed as it crosses, and Task 3's test asserts that mapping explicitly.

**One risk left open on purpose.** Task 4 Step 6 asserts `dist/knowledge.json` exists locally, but only Task 5 Step 5 proves Vercel serves it. Nothing between them can be verified without deploying, which is why the push gate sits where it does.
