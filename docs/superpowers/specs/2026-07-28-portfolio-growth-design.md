# Portfolio Growth Build — Design

**Date:** 2026-07-28
**Project:** `rizmajer-mate-portfolio` (`C:\Users\madew\Desktop\Final_Port`)
**Status:** Awaiting user approval

---

## 1. Context

The site already exists and is close to done. React 19 + Vite + Tailwind 3 + GSAP + React Router, deployed on Vercel, Hungarian-language, positioned as *Rizmajer Máté — full-stack fejlesztő* for Hungarian small businesses.

Existing sections: Hero, Pillars, ServicesGrid, Features, Projects, Protocol, Pricing, Testimonial, Faq, ContactForm, About, Footer. Separate routes for Privacy (`/adatvedelem`) and Terms (`/aszf`).

The codebase holds a deliberate standard that this build must not undo:

- `TESTIMONIALS` ships empty by design; the Testimonial section renders nothing rather than showing a placeholder frame.
- The JSON-LD block carries only verifiable facts — no address, phone, price, rating, or founding date.
- Fonts are self-hosted to avoid the Google Fonts GDPR problem and a Fontshare outage that silently degraded body text.
- CSP, HSTS, `frame-ancestors: none`, `X-Content-Type-Options`, and a form honeypot are all in place.

**Every decision below inherits that standard: nothing ships that the proof does not support.**

Three prior specs exist in `docs/superpowers/specs/` covering the coffee-chrome redesign, the interaction/motion system, and the themeable palette system. This spec does not supersede them; it builds on top.

## 2. Goals

1. Remove the generic-template feel from the page's layout and hero imagery.
2. Turn four hollow project cards into real case studies.
3. Add an AI/automation service section backed by something real.
4. Add booking as a second conversion path beside the existing form.
5. Ship crawlable HTML and correct canonical URLs on a real domain.

## 3. Non-goals

CMS, blog, English translation, client dashboard, payments, framework migration, redesign of the existing visual system, repositioning of the hero offer.

## 4. Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | **Stay on Vite** | The app is finished, tested, Vercel-linked and CSP-hardened. A Next.js migration costs days and buys only SSR, which a prerender step delivers here. |
| Positioning | **Dev-first, AI/automation added as a real section** | Placed after Projects so proven work is met before the newer offering. |
| Proof workflow | **Build slots, then interview** | Structure first; content filled verbatim from the user's answers. Nothing invented. |
| Primary CTA | **Booking and form, in parallel** | Both were requested. The form already works and stays untouched. |
| Booking provider | **Undecided — marketplace discovery first** | Deciding criterion is GDPR posture: an embed dropping third-party cookies on Hungarian visitors contradicts the existing self-hosted-fonts decision. |

## 5. Workstream A — Anti-slop pass

The page reads as generated because of layout uniformity, not because of its writing. The Hungarian copy is specific and in the user's own voice and is largely kept.

**A1. Break the heading formula.** Every section currently uses an identical two-line heading whose second line is accent-brown: *"Amin dolgozom. / Valós munka, nem mockup."*, *"Három lépés. / Semmi meglepetés."*, *"A teljes eszköztár, / egy kézben."*, *"Egyszerű csomagok. / Rugalmas megoldások."* Repeated six-plus times it reads as a template. Keep the device for the hero and one other deliberate moment; restructure the rest as single-line or differently-shaped headings. Preserve the existing wording wherever it carries voice.

**A2. Replace the hero background.** Currently a blurred stock photo of angled, syntax-highlighted **PHP/WordPress** code (`wp_title`, `bloginfo('charset')`, `pingback_url`) — the most common image in the developer-portfolio genre, and a stack that contradicts the React/Node positioning. Replace with owned material: `src/assets/portrait-sunset.jpg`, or a screenshot of one of the two live client systems.

**A3. Vary the vertical rhythm.** Currently every band is: mono label → centered heading → centered subtext → grid. Re-compose two or three sections — one left-aligned, one full-bleed, one asymmetric split — so the page reads as composed rather than stamped.

**A4. Fix hero headline contrast.** "rendszerek" currently fades into the background mid-word; the white-to-grey gradient on line one worsens it. Must meet WCAG AA against whatever background A2 lands on.

**A5. Palette switcher — RESOLVED: no change.** User decision, 2026-07-28: colors are off-limits. The four colorway dots stay exactly as designed in `docs/superpowers/specs/2026-07-21-themeable-palette-system-design.md`, and the coffee palette is not altered. **No workstream may change color values, theme tokens, or the switcher.** Workstream A is restricted to headings, imagery, layout rhythm and contrast.

**A6. Verify the blank-section behaviour.** A full-page capture shows large stretches rendering blank, consistent with `useInView` holding sections at `opacity-0` until the IntersectionObserver fires. Likely a capture artifact, but it must be confirmed that content is never permanently invisible when the observer does not fire, and that `prefers-reduced-motion` users see everything. Fix by making the revealed state the default and the hidden state opt-in via JS.

## 6. Workstream B — Proof — **DEFERRED**

> **Status 2026-07-28: deferred by the user.** No case-study or testimonial content exists yet ("we will do demo case studies for the website later, nothing yet"). `projects.js` fields and `TESTIMONIALS` stay empty, which is the correct honest state — the modal degrades to a short clean panel and the Testimonial section stays hidden. Revisit when content exists. Nothing below is built in this cycle.

**B1. Case studies.** In `src/data/projects.js`, all four entries have empty `year`, `role`, `problem`, `solution`, `gallery`, `live`, and `github: '#'`. `ProjectModal` already renders each field only when non-empty, so this is a data edit, not a code change. Fill from the user's answers for: Rétes-rendelő, AB Masszázs időpontfoglaló, Business Value Builder, WebWise Studio.

**B2. Testimonials.** `TESTIMONIALS` is `[]`. The user has real, nameable clients. Add entries only with the client's actual words and explicit permission, per the existing file comment. If permission is not obtained, the array stays empty and the section stays hidden.

## 7. Workstream C — AI & automation section — **DEFERRED**

> **Status 2026-07-28: deferred.** The ship-gate below is unmet — there is no client example and no demo yet. Per §7's own rule, the section does not ship. Design retained for when backing exists.

New section after Projects. Honest framing: what it does, who it is for, what trying it costs — presented as a current capability, not a track record.

**Gate:** this section ships only with real backing, being either a genuine client example the user supplies, or a **live working demo embedded in the page** that a visitor can trigger. The demo is preferred: it is simultaneously the proof and a work sample.

Renders nothing when its data is empty, mirroring the `TESTIMONIALS` pattern.

**If neither materialises, this section does not ship.** The site's credibility rests on not overclaiming, and this is the one change capable of damaging that.

## 8. Workstream D — Booking

Added beside the contact form, not replacing it.

- The Formspree flow stays exactly as-is: `FormData` POST, honeypot, visible error state with a `mailto:` fallback.
- Booking provider chosen after marketplace discovery, weighted toward GDPR posture.
- **CSP requires a `frame-src` directive**, currently absent entirely, before any embed will load.
- No backend is introduced; both paths stay client-side.

## 9. Workstream E — SEO, assets, domain

**E1. Prerender.** `vercel.json` rewrites all paths to `/index.html`, so `/`, `/adatvedelem` and `/aszf` currently serve an empty `<div id="root">` to crawlers. Add a prerender step emitting real HTML per route, with per-route `<title>`, description and canonical.

**E2. OG image.** Replace the Unsplash stock photo. It is off-brand for a personal site and is the sole reason `images.unsplash.com` appears in the CSP `img-src`; removing it tightens the policy.

**E3. Domain — DEFERRED.** User decision, 2026-07-28: staying on `rizmajer-mate-portfolio.vercel.app` for now. Canonical, OG URLs, JSON-LD `@id`, `sitemap.xml` and `robots.txt` are already internally consistent against that host, so no change is needed. Revisit on domain purchase; at that point all five move together, or canonicals will disagree.

## 10. Testing

- Existing Vitest suite (motion primitives, `projects.test.js`) must stay green.
- New: conditional-render tests for the AI section and Testimonial — empty data renders nothing.
- New: case-study data-shape test, following the existing `projects.test.js` pattern.
- Manual: mobile / tablet / desktop, keyboard focus order and visible focus rings, `prefers-reduced-motion`, form submit success and failure paths.
- Build and lint must pass (`npm run build`, `npm run lint`).

## 11. Build scope for this cycle

Answers received 2026-07-28 deferred B, C and E3. **Active scope is Workstream A plus E1 and E2**, all of which are unblocked and need no content from the user:

| ID | Work | Status |
|---|---|---|
| A1 | Break the repeated two-line heading formula | Active |
| A2 | Replace stock PHP-code hero background with owned imagery | Active |
| A3 | Vary section rhythm (left-aligned / full-bleed / asymmetric) | Active |
| A4 | Fix hero headline contrast to WCAG AA | Active |
| A5 | Palette switcher | Resolved — no change |
| A6 | Verify scroll-reveal never leaves content permanently invisible | Active |
| E1 | Prerender routes so crawlers get real HTML | Active |
| E2 | Replace Unsplash OG image, drop it from CSP `img-src` | Active |
| B, C, E3 | Case studies, testimonials, AI section, domain | Deferred |
| D | Booking | Awaiting user confirmation |

Deferred questions, for when the content exists:

1. Per project (×4): year, role, the client's problem, what was built, live URL, public repo?
2. May the rétesház and AB Masszázs be quoted by name, and in what exact words?
3. What backs the AI section — a real client example, or a live demo?
4. Which domain, once purchased?

## 12. Risks

- **Overclaiming (high impact).** Workstream C is the only change that can damage the site's core asset. Mitigated by the ship-gate in §7.
- **Anti-slop pass drifting into a redesign.** Mitigated by restricting Workstream A to headings, hero imagery, section rhythm, and contrast — the existing visual system, palette and components stay.
- **Third-party embed vs. GDPR posture.** Mitigated by making cookie behaviour the deciding factor in provider choice.

## 13. Working directory note

The session's working directory is `C:\Users\madew\Desktop\Final` (empty). The actual project is `C:\Users\madew\Desktop\Final_Port`. All work happens in `Final_Port`.
