# Demo proof landing — Design

**Date:** 2026-07-30
**Project:** `rizmajer-mate-portfolio` (`C:\Users\madew\Desktop\Final_Port`)
**Status:** Awaiting user review

---

## 1. Context

Three demo sites are being built next week in a separate repo (`docs/demo-sites-plan.md`).
This spec covers the work **inside this repo** that receives them: replacing the four
dataless project entries with three deployed demos, and rewriting every proof claim on
the page so each one is backed by data that exists.

The site is otherwise finished. Prices are published, routes are prerendered, the
anti-slop pass has shipped, and the AI section is live with honest "not yet delivered to
a paying client" framing. What is missing is the one thing the Projects section exists to
provide: something a visitor can open.

This spec supersedes Workstream B of `2026-07-28-portfolio-growth-design.md`, which
assumed the four existing projects would be filled in as client case studies.

### What this session already fixed

`Pillars.jsx` claimed *"Mindegyik megnyitható és kipróbálható."* while every `live` field
in `projects.js` was `''` and every `github` was `'#'`. Nothing on the site could be
opened. Removed and pushed as `2fe6092` — the one item pulled forward out of this spec,
because a false claim shipping on the page that sells honesty could not wait a week.

The rest of the work waits for the demos, by decision: it lands in one pass.

## 2. Goals

1. Three demo cards, each with a live URL, a public repo, and real screenshots.
2. Every counted claim on the page derived from data, so it cannot drift out of true.
3. `Számokban` rewritten around what a visitor can independently verify.

## 3. Non-goals

Building the demos. Testimonials (no permission obtained). Booking. Domain purchase.
Palette, theme tokens or colorway switcher — off-limits per the 2026-07-28 decision.
Returning client work to the page.

## 4. Decisions

| Decision | Choice | Reason |
|---|---|---|
| The four existing entries | **All four removed** | User decision, 2026-07-30. Demos take their place. |
| Client work elsewhere on the page | **Not stated anywhere** | User decision, 2026-07-30. The concern was raised — `PRODUCT.md` holds that "two paying clients is the truth, and the site should say two", and paid work is stronger evidence than a demo — and the decision stands after that. |
| When it ships | **One pass, after all three demos are live** | Half-landed proof recreates the exact "claims the page cannot back" state this build exists to end. |
| Demo presentation | **Link out, do not embed** | Iframing three separate sites is heavy, breaks on mobile, creates nested scrolling, and needs a CSP `frame-src` that `vercel.json` does not have. A screenshot plus a real link is checkable at a fraction of the cost. |
| Counted claims | **Derived from `PROJECTS_FULL`** | The count and the prose describing it were two independent copies of one fact. That is how they drifted apart into a false claim. |
| `Számokban` slot 02 | **`nyilvános repó`, not a Lighthouse score** | A Lighthouse 100 decays on any dependency bump or added image, silently making the homepage wrong again. A repo count cannot decay, and derives from the same array as slot 01. |

## 5. Trigger

This build does not start until **all three demos are deployed at public URLs, with
public repos, and screenshots exist.** All-or-nothing, for the reason in §4.

## 6. Data model — `src/data/projects.js`

`PROJECTS_FULL` shrinks from four entries to three. Every field currently `''` is filled.

| Field | Demo value |
|---|---|
| `label` | **`Bemutató projekt`** — a third label value; today only `Ügyfélprojekt` and `Saját projekt` exist |
| `live` | deployed URL — required, non-empty |
| `github` | public repo URL — required, no longer `'#'` |
| `image` / `imageAlt` | card screenshot, ≥1200×750, showing realistic Hungarian sample data |
| `problem` / `solution` | the user's sentences, plain language, no stack-flexing |
| `year` / `role` | `2026` / `Tervezés, fejlesztés, deploy` |
| `gallery` | 2–3 screenshots each |

`Bemutató projekt` carries the honesty load for the whole section, so it renders with the
same visual weight as the other labels — not as small grey caveat text. The demo plan's
central rule is that a demo labelled as client work is trivially falsifiable and
discredits everything else on the page.

`tone` objects exist for `--color-card-1` through `-4`. Three demos use 1–3; the card-4
tone becomes unused and stays in place for the next project.

**No component change is needed for the links.** `ProjectModal.jsx:162-178` already
renders the link block only when `live` is set or `github !== '#'`, already with
`target="_blank" rel="noopener noreferrer"`.

`ProjectMock`'s empty-frame branch stays. With all three demos carrying screenshots it is
unreachable for shipped data, but it is the honest fallback for a future dataless entry.

## 7. `Számokban` — `src/sections/Pillars.jsx`

`src/data/projects.js` exports two derived counts and Pillars consumes them, instead of
Pillars hardcoding `target: 4` (`Pillars.jsx:20`):

```js
export const LIVE_COUNT = PROJECTS_FULL.filter(p => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter(p => p.github && p.github !== '#').length
```

- pillar 01 `target` = `LIVE_COUNT`
- pillar 02 `target` = `REPO_COUNT`
- pillars 01 and 02 render **only when their count is non-zero**, mirroring the
  `TESTIMONIALS` pattern. Pillar 03 (`24ó`) is a promise rather than a count and always
  renders.

The counts live in `projects.js` rather than inside Pillars so the invariant in §10 is
testable without rendering a component — the existing test suite is pure-data and stays
that way.

The page then cannot claim a number of openable systems that differs from the number of
openable systems on it. `CountUp` takes `target` as a prop, so computed values flow in
unchanged.

| # | Number | Label | Source |
|---|---|---|---|
| 01 | 3 | kipróbálható rendszer | derived from `live` |
| 02 | 3 | nyilvános repó | derived from `github` |
| 03 | 24ó | válaszidő | unchanged |

Pillar 01's `desc` (`Pillars.jsx:23`) and pillar 02's `desc` (`:31`, currently *"Két
magyar vállalkozás, akiknek a rendszere ma is élesben fut."*) are both rewritten: the
first describes the demos, the second describes public code. Neither may reference client
work, per §4.

**Neither `desc` may restate its own count in words.** The numeral above it already says
the number; a written-out "négy" beside a rendered `4` is the second copy that produced
the false claim this spec opens with. The descriptions say what the things are, not how
many.

The triad flips the section from "trust these counts" to "go check": all three numbers
are verifiable by the visitor in under a minute.

## 8. Projects section — `src/sections/Projects.jsx`

**Copy.** The headline accent line (`:34`, *"Kettő ügyfélnek, kettő magamnak."*) and the
subcopy (`:37-38`, *"Négy projekt… kettő élő ügyfélmunka, kettő saját kezdeményezés…"*)
are both false under demos-only, and the 2-and-2 split is the section's entire current
framing. Candidate wording, for the user to correct into his own voice:

> **Amin dolgozom.**
> *Három rendszer, mind kipróbálható.*
>
> Három bemutató rendszer, amit magamnak építettem — hogy ne kelljen elhinned, amit írok.
> Mindegyik megnyitható, a kód mindháromnál nyilvános.

This turns the weakness into the argument: the demos cannot be shown as paid work, so
they lean on the one thing a paid client system cannot offer — open it and read the code
right now.

**Layout.** `:42` is `lg:grid-cols-4`. Three cards in four columns leaves a hole on
desktop; it becomes `lg:grid-cols-3`.

## 9. Assets and performance budget

Three card images plus up to nine gallery images is 12 new assets on a page that
currently ships almost none, and mobile is the primary viewport.

- WebP or AVIF
- explicit `width` / `height` on every image, to prevent layout shift
- `loading="lazy"` on everything below the fold
- gallery images fetched when the modal opens, not with the page
- **budget: ≤150 KB per card image, ≤2 MB total for all 12** — checked before merge, not hoped for

No CSP change is required: link-out introduces no new origin and no frame. `img-src`
already covers self-hosted assets.

## 10. Testing

`src/data/projects.test.js` currently asserts the *old* state and must invert:

| Line | Now | Becomes |
|---|---|---|
| `:8` | `toHaveLength(4)` | `toHaveLength(3)` |
| `:19-23` | `expect(p.github).toBe('#')` | every `github` is a non-empty `https://` URL, not `'#'` |

New assertions:

- every `live` is a non-empty `https://` URL
- every project has a non-empty `image`, `imageAlt`, `problem`, `solution`
- every `label` is `'Bemutató projekt'`
- **the invariant:** `LIVE_COUNT` equals the number of entries with a non-empty `live`,
  `REPO_COUNT` equals the number with a real `github`, and both are non-zero — this is
  the test that makes the drift impossible rather than merely fixed, and it fails the
  moment a project loses its link while the homepage still counts it

Manual, before merge: mobile / tablet / desktop; keyboard focus order and visible focus
rings through the three cards and the modal; `prefers-reduced-motion`; every `live` and
`github` link actually resolves. `npm run build` and `npm run lint` pass.

Cross-browser, if the modal or grid changes structurally — per the recipe in project
memory, Chromium alone cannot answer "does it work in Safari", and `vercel.json`'s CSP is
invisible to Vite's preview server.

## 11. Required inputs from the user

Not open design questions — data that arrives with the demos:

1. Three live URLs
2. Three public repo URLs
3. Per demo: a `problem` sentence and a `solution` sentence in his own words
4. Card screenshot plus 2–3 gallery screenshots per demo, seeded with realistic
   Hungarian data — not `Lorem ipsum`, not `Test Restaurant 1`
5. Confirmation of the §8 copy in his own wording

## 12. Risks

- **The demos slip or only one lands.** Mitigated by the §5 trigger: nothing ships until
  all three are live. The page stays in its current honest state meanwhile.
- **The page loses its paid-work claim.** Accepted by user decision, §4. Recorded here
  because it is the site's strongest asset and the decision should be revisitable when a
  client screenshot or a testimonial becomes available.
- **Image weight regresses mobile performance.** Mitigated by the §9 budget being a
  merge gate.
- **Prose drifts from data again.** Exactly two prose copies of the count remain, both in
  `Projects.jsx` (§8's accent line and subcopy) — deriving a Hungarian sentence from an
  array would be worse than the disease. Everywhere else the numeral is the only
  statement of the number, per §7. Mitigated by §10's invariant test and by §7 and §8
  naming every location that must change when the project set changes.

## 13. Stale reference to clean up

`src/sections/Pricing.jsx:54` is a code comment reasoning about "a Pillars section that
plainly says '2'". Its argument holds independently of what Pillars displays, but the
cross-reference goes stale when pillar 02 changes. Comment-only; no rendered output
depends on it.
