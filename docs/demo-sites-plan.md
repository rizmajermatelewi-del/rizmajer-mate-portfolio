# Demo sites — build plan

Purpose: close the credibility gap. The portfolio currently claims capability
it cannot demonstrate, because all four projects have empty `live` and `github`
fields. Three deployed, honestly-labelled demos fix that faster than anything
else on the site.

---

## The rule that makes this work

**Label every demo as `Saját projekt`, never `Ügyfélprojekt`.**

This is not caution for its own sake. Invented client work is trivially
falsifiable — an SME owner asks *"melyik pékség?"*, a recruiter searches the
company name, and one unverifiable claim discredits everything else on the
page. A real demo, honestly labelled, is strong evidence. A fabricated client
is a liability with no upside.

For "can this person build things", a working demo answers nearly as well as
paid work — **provided it is real and reachable**: deployed, public URL, public
repo. A demo with no link is worth less than no demo, because it reads as a
claim rather than proof.

---

## Candidates

Each targets a business type that actually exists in numbers in Hungary, and
each proves something different. Build **three**, not six — depth reads as
competence, volume reads as padding.

### 1. Napi menü — étterem / büfé
Daily menu with an admin screen the owner can actually use.

- **Proves:** CRUD, auth, an admin UI a non-technical person can operate
- **Scope:** public menu page, login, edit today's menu, weekly view
- **Stack:** React + Supabase (matches the stack already claimed on the site)
- **Why it lands:** almost every kisvendéglő has this problem and solves it
  with a photo of a printed sheet on Facebook

### 2. Időpontfoglaló — fodrász / kozmetikus / autószerviz
Booking with a calendar and email confirmation.

- **Proves:** date/time logic, double-booking prevention, transactional email
- **Scope:** service picker, availability calendar, booking form, confirmation
  email, simple admin list
- **Stack:** React + Supabase + Resend (or similar)
- **Why it lands:** you already built one of these for AB Masszázs. A second,
  cleanly executed, turns a one-off into a demonstrated repeatable capability —
  which is what a prospective client actually wants to know.

### 3. Egyoldalas bemutatkozó — szakiparos
One page for a villanyszerelő / burkoló, built for speed.

- **Proves:** performance discipline, mobile-first, SEO fundamentals
- **Scope:** one page, contact form, local business schema, 100 Lighthouse
- **Stack:** Astro or plain Vite — deliberately *not* heavy
- **Why it lands:** the demo is the argument. Publish the Lighthouse score
  next to it. It also directly counters the "developers over-build" objection.

### Optional 4. Webshop-kirakat
Small catalogue with a cart, no payment integration.

- **Proves:** commerce modelling without needing a merchant account
- Lower priority: more work, and it competes with Shopify in the buyer's mind

---

## Deployment

Non-negotiable, or none of this counts:

- Deploy to Vercel (already in use for the portfolio)
- Give each a real subdomain or a clean `*.vercel.app` URL
- Public GitHub repo with a README explaining the problem and the decisions
- Seed with **realistic Hungarian sample data** — not `Lorem ipsum`, not
  `Test Restaurant 1`. Fake-looking data undoes the credibility the demo buys.
- Add a visible banner: *"Bemutató projekt — saját kezdeményezés"*. Honest and
  it removes any ambiguity for a visitor who lands on the demo directly.

---

## What each demo owes the portfolio

Every demo must produce these, because `src/data/projects.js` has a field
waiting for each and `ProjectModal` renders them only when non-empty:

| Field | What it needs |
|---|---|
| `year` | when built |
| `role` | e.g. `Tervezés, fejlesztés, deploy` |
| `problem` | the concrete thing the business could not do before |
| `solution` | what you built, in plain language, no stack-flexing |
| `live` | the deployed URL |
| `github` | the repo |
| `gallery` | 2–3 real screenshots |

Until `live` and `github` are filled, the TrustSignals claim
*"Nem képernyőképeket mutatok"* is not yet true — it is marked
`[KITÖLTENDŐ]` in the copy for exactly that reason.

---

## Suggested order

1. **Időpontfoglaló** — closest to work already done, so fastest to a finished
   result, and it is the strongest sales asset for the SME audience
2. **Napi menü** — different enough to show range, similar enough to reuse
   patterns
3. **Egyoldalas bemutatkozó** — smallest, and the Lighthouse score is a
   quotable number for the site

Ship one fully — deployed, seeded, written up, linked from the portfolio —
before starting the next. Three finished beats five half-built.
