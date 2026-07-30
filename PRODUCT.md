# Product

## Register

brand

## Users

Two audiences read this site, and they are not equally important.

**Primary: Hungarian small and mid-sized business owners.** A rétesház owner taking orders over the phone. A massage salon booking appointments in a notebook. A workshop tracking jobs in a spreadsheet. They are not shopping for a "webalkalmazás" — they are looking for a way to stop losing an hour a day to admin. They arrive skeptical, usually on a phone, often after a bad experience with an agency that overpromised or a relative who built something and then disappeared. They cannot evaluate a tech stack and should never be asked to. The job to be done: find out whether this person can fix their specific problem, what it will cost, and whether they will still be reachable in six months.

**Secondary: recruiters and hiring managers.** They scan for evidence: real shipped work, code that exists, decisions that show judgment. They spend under a minute before deciding whether to keep reading. They should never be the reason a sentence gets more technical than the SME owner can follow — but nothing on the page should make a competent engineer wince either.

The site is written in Hungarian for the Hungarian market. Copy is not translated from English and must never read as if it were.

## Product Purpose

A portfolio and freelance sales page for Rizmajer Máté Levente, a full-stack developer building websites and internal systems for Hungarian SMEs.

It exists to convert a skeptical business owner into a written inquiry. Success is one number: qualified messages through the contact form. Everything else — the animation, the project cards, the FAQ — is in service of that, or it is decoration and should be cut.

The secondary job is to survive a recruiter's read without embarrassment. If a hiring manager opens it, the work shown should be real, the code behind it should be defensible, and the accessibility claims made in the FAQ should be true of the page making them.

## Brand Personality

**Direct, dependable, plain-spoken.**

The voice is already established in the copy and should not drift from it: *"Nem marketingszöveg."* *"A leadás után sem tűnök el."* *"Akkor is válaszolok, ha végül nem én leszek a jó választás."* *"Az első egyeztetésen megmondom, melyik éri meg neked, akkor is, ha az a kevesebb munka nekem."*

The differentiator is honesty that costs something. Anyone can claim to be reliable; this site says out loud when it is not the right fit, admits what it does not yet have, and prices in the open. That is the entire positioning against agencies that oversell.

Concretely:
- Say the number, the timeline, or the limitation. Never gesture at it.
- Claim nothing the page cannot back up. No invented metrics, no borrowed logos, no fake precision.
- Write for the bakery owner. If a sentence needs a CS degree, it belongs in an expandable detail, not the main line.
- Emotional target: relief. The visitor should finish thinking "this is someone I can just call," not "this person is impressive."

## Anti-references

All four were named explicitly by the owner. Each is a live risk for this specific project.

**Generic Hungarian agency templates.** Stock photography of people at laptops, "Modern megoldások vállalkozásoknak", three identical service cards, no actual work shown. This is what the target customer has already seen five times and learned to distrust. The defense is evidence: real screenshots, real client names, real prices.

**Awwwards-style experimental portfolios.** Scroll-hijacking, custom cursors, WebGL, multi-second intro animations. Impressive to other designers, actively hostile to a 55-year-old salon owner on a mid-range Android. Motion here is always subordinate to reading speed. No cursor followers or pointer-tracked effects, ever.

**Corporate enterprise SaaS.** "Unlock", "Seamless", "Elevate", "Next-gen". Gradient-navy hero, invented dashboard screenshots, logo walls of companies that are not customers. Two paying clients is the truth, and the site should say two.

**Dribbble-style developer portfolios.** All aesthetic, no evidence. Enormous type, no case studies, no prices, no way to tell whether the person has ever shipped anything for money. This is the failure mode the site is closest to today, and the one to guard hardest against.

## Design Principles

**1. Evidence over assertion.** Every claim earns its place by being checkable. A screenshot beats a description; a live link beats a screenshot; a named client beats an adjective. Where evidence does not exist yet, show less rather than filling the space with something that imitates it. Fake product chrome built from styled divs is the specific violation to watch for.

**2. Say the number.** Prices, timelines, response times, client counts. Vagueness reads as either inexperience or something being hidden, and both cost the inquiry. "Ajánlat egyeztetés után" three times in a pricing section is a pricing section that does not price.

**3. Write for the person paying, not the person hiring.** When the SME owner's clarity and the engineer's precision conflict, the owner wins on the surface and the precision moves one layer down (an expandable detail, a case study). Never the reverse.

**4. Practice what the FAQ preaches.** The site sells mobile quality, keyboard access, and screen-reader support. A contrast failure or an unreachable control on this page is not a bug, it is a broken sales claim.

**5. Motion serves reading, never performance.** Every animation answers "what does this communicate?" with hierarchy, sequence, or feedback. Infinite decorative loops, entrance animations applied by reflex to every section, and effects that delay content are subtractions. If it cannot be justified in one sentence, it goes.

**6. Restraint is the brand.** The voice is plain-spoken; the interface has to match. Numbered eyebrows over every section, decorative status dots, corner stamps, and micro-labels are the visual equivalent of marketing inflation: they claim significance nothing earned.

## Accessibility & Inclusion

**Target: WCAG 2.2 Level AA.** Non-negotiable, for two reasons: the FAQ sells accessibility to clients, and the European Accessibility Act sets this bar for e-commerce and several service categories from 2025, which is exactly the kind of system this business builds.

Specific commitments:
- Body text at least 4.5:1 against its background; large text at least 3:1. Placeholder text is held to the body-text bar, not a muted default.
- Interactive control boundaries (input borders, focus rings, toggles) at least 3:1 under SC 1.4.11. Field edges that read as voids on a dark card are a failure, not a style.
- Full keyboard operability with a visible focus indicator on every interactive element, including inside dark inverted cards where the browser default ring disappears.
- `prefers-reduced-motion: reduce` collapses all scroll-driven, parallax, and infinite animation to static. Already enforced globally in CSS; keep it that way.
- Hungarian is the document language (`lang="hu"`); labels, error messages, and consent copy are all Hungarian.
- Forms collecting personal data carry explicit consent and a link to the privacy policy at the point of submission.
- Mobile is the primary viewport, not an adaptation. Most of the target audience arrives on a phone.
