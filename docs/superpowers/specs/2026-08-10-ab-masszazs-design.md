# AB Masszázs — site and booking design

**Date:** 2026-08-10
**Status:** approved in brainstorm, not yet planned
**Client:** AB Masszázs — a one-therapist massage salon. The owner is the
developer's mother, which makes this a real brief with a real user, not a demo.

This spec lives in the portfolio repo because that is where the spec convention
already is. **The site itself gets its own repository** — it is a client
property, not part of the portfolio, and mixing them would make handing it over
impossible later.

---

## 1. Why this exists

Two goals, chosen by the owner's son on her behalf and confirmed in the
brainstorm:

1. **Get found.** Someone searching for a massage nearby should find her rather
   than a competitor.
2. **Look credible.** A link she can send that reads as a real business.

A third goal was raised mid-brainstorm and accepted: **take bookings without the
phone**. This is what turns the project from a brochure into a system.

For the portfolio it is also the missing evidence. `src/data/projects.js`
reserves AB Masszázs a slot with a comment saying it returns "the day it is
live, with a screenshot and a URL, and not before", and `projects.test.js` fails
any entry labelled `Ügyfélprojekt` without something a stranger can open. The
`Foglalás és rendelés` tier at 450 000 Ft is the most-sold tier on the pricing
page and has never been built for anyone. This builds it once, for real.

## 2. Decisions, and what they cost

| Decision | Chosen | Rejected, and why |
|---|---|---|
| Booking depth | Real availability, custom-built | A request form proves little and does not stop the phone; a third-party embed proves nothing at all |
| Source of truth | Her Google Calendar | A database means two calendars that can disagree, and she already lives in her phone's calendar |
| Confirmation | Instant, e-mail both sides | Approval queues recreate the phone tag the system exists to remove |
| Photography | Design so photos are optional | She has none, and stock massage imagery makes a real salon look fake |
| Hosting | Free tier, zero spend | Owner's call |
| Scope of v1 | No payments, no deposits, no accounts | Each one drags in law and liability disproportionate to a solo salon |

## 3. Architecture

**There is no database.** The booking *is* the calendar event.

A slot is busy because an event exists on her calendar. Client name, phone and
service go into the event's summary and description. This removes a schema,
migrations, a hosting dependency and an entire class of bug where the site
believes she is free and her phone knows she is at the dentist. She can cancel
from bed and the site is correct immediately.

```
Browser (Vite + React, static, prerendered)
   │
   ├── GET  /api/slots?service=<id>&from=<date>&to=<date>
   │        → free slots, computed server-side
   ├── POST /api/book
   │        → re-check conflict, create event, send two e-mails
   └── GET  /api/cancel?token=<signed>
            → delete event, notify both sides
                    │
        Google Calendar API  ·  Gmail SMTP
```

- **Front end.** Vite + React, matching the portfolio's stack so components,
  motion and Tailwind conventions carry over. No client-side secrets: the
  browser never talks to Google.
- **Functions.** Three, stateless. Whichever free host is picked, they are plain
  handlers with no framework lock-in.
- **Calendar access.** A Google Cloud service account; she shares her calendar
  with the service account's address, granting "make changes to events". No
  OAuth consent flow, no refresh-token rotation, and she can revoke it in two
  taps without contacting anyone.
- **E-mail.** Gmail SMTP from her own address using an app password.
  Free, needs no domain, and the confirmation arrives *from her*, which reads
  better than a no-reply from a stranger's server.
- **Hours.** A data module in the repo, not an admin screen. She changes her
  standing hours roughly never; one-off closures go in her calendar as ordinary
  events, which the availability calculation already subtracts.
- **Timezone.** `Europe/Budapest` as an IANA zone everywhere. Never a fixed
  offset.

### Hosting

Zero spend was chosen. Two constraints follow, and they are not the same thing:

- **Vercel's Hobby plan forbids commercial use**, and a salon taking bookings is
  commercial. **Cloudflare Pages** and **Netlify** free tiers permit it and
  cover this traffic many times over. Host there.
- A `*.pages.dev` URL is the weakest part of the "get found" goal. This is
  accepted for launch. The mitigation is section 6: for local search the Google
  cégprofil matters more than the domain. A `.hu` domain stays the first thing
  to buy if the site earns it.

## 4. The booking flow

Four steps on one screen: **service → day → free slot → details**.

Details collected: name, phone, e-mail, an optional note, and a required tick
consenting to the adatvédelmi tájékoztató. Nothing else. No account, no
password, no address (she works in one room).

### Availability rules

Given her working hours, the busy events on her calendar, the chosen service's
duration and the current time, a slot is offered only if:

- the whole duration fits inside a working block;
- no busy event overlaps it;
- a **buffer** (default 15 minutes) separates it from the appointment before and
  after, so she is never booked back-to-back with no time to reset the room;
- it starts at least a **minimum lead time** from now (default 2 hours), so a
  stranger cannot take a slot she is already driving to;
- it starts within the **horizon** (default 60 days).

Slot start times are on a fixed grid (default every 30 minutes) rather than
every free minute, which keeps the list readable.

### Failure modes

- **Race between two bookers.** Google Calendar offers no transactional lock.
  `book` re-queries busy immediately before inserting, which narrows the window
  to milliseconds without closing it. If it loses, the client is told the slot
  was just taken and the list refreshes. A silent double-booking in her diary is
  the outcome this exists to prevent.
- **Calendar API unavailable.** The form must not pretend to work. It shows her
  phone number and says to call. A booking that vanishes is worse for her than a
  form that admits it is broken.
- **Spam.** A honeypot field plus per-IP rate limiting. No captcha until real
  abuse appears — a captcha on a salon booking form costs real bookings.
- **No-shows.** Out of scope for v1, deliberately. Deposits mean payments, which
  mean a merchant account and considerably more law. If it becomes a real
  problem, a reminder e-mail the day before is the cheap first answer.

### Cancellation

The confirmation e-mail carries a cancel link containing an HMAC-signed token
over the event id and its start time. Following it deletes the event and
notifies both sides. Signed rather than guessable, so one client cannot cancel
another's appointment by editing a URL.

## 5. Pages

Three routes. A salon site with a blog is a salon site with an abandoned blog.

- **`/`** — who she is and where; services with durations and prices; book now;
  about her; hours, address, map, phone; a short GYIK.
- **`/foglalas`** — the booking flow on its own URL, so it can be linked
  directly from Facebook, Instagram and the Google profile.
- **`/adatvedelem`** — see section 7.

### Looking credible without photographs

The failure mode is not "no pictures", it is **stock pictures**. Oiled
shoulders, hot stones and orchids are the visual signature of a template, and a
local client reads it instantly — it makes a real salon look fake.

So: typographic and warm. Large type, generous space, a calm palette, soft
texture instead of imagery. Every photo slot follows the pattern already used in
the portfolio's `Protocol.jsx` — supply a file and it renders the photograph,
leave it empty and it draws something deliberate instead of a broken frame. When
she is ready to be photographed, filling them is a data edit, not a redesign.

## 6. Getting found

Mostly not the site:

- **The Google cégprofil she does not have is the biggest single lever.** For
  "masszázs [település]" it outranks any website. Free, an afternoon's work, and
  it should be done *before a line of code*. It is also exactly the 60 000 Ft
  Google-megjelenés service on the portfolio's price list, done once for real.
- `HealthAndBeautyBusiness` JSON-LD carrying address, opening hours, phone and
  the service list.
- A `<title>` and description naming the town, because that is what people
  actually type.
- Links both ways between the site, the Facebook page and the Google profile.

## 7. Data protection

The site collects a name, a phone number and an e-mail address in order to book
a **massage**, which sits close enough to health that carelessness is not an
option.

- An **adatvédelmi tájékoztató** at `/adatvedelem`, naming her as controller,
  what is collected, why, how long it is kept, and Google and the e-mail
  provider as processors.
- A **required consent tick** on the form, unticked by default, linking to it.
- Personal data lives only in her calendar event and in the two e-mails. Nothing
  is logged to a third-party analytics service. No cookies beyond what the host
  sets, so no cookie banner is needed.
- Free-text notes are a foreseeable place for someone to type a medical
  complaint. The field's label asks for practical information only, and the
  tájékoztató says plainly that health details should be discussed in person.

## 8. Testing

The slot calculator is a pure function — hours, busy events, duration, now →
free slots — and every genuine bug lives in it. It gets unit tests covering:

- both DST changeover weekends in `Europe/Budapest`;
- an event that ends exactly when a candidate slot begins (buffer boundary);
- a fully booked day, returning empty rather than throwing;
- the minimum-lead-time edge, at exactly the threshold;
- a service longer than any remaining gap.

The three functions are tested against a **fake calendar client**, so the suite
never calls Google and runs offline. The race path is tested by making the fake
report a conflict on the second read.

## 9. Inputs required before implementation

None of these can be invented, and the build cannot finish without them:

1. **The service list** — every service, its duration, and its price. Blocks the
   booking flow entirely, not just the price section.
2. **Address, opening hours, phone number, and the business's legal name** — for
   the schema markup, the Google profile and the tájékoztató.
3. **Her Google account**, to share the calendar with the service account and to
   generate a Gmail app password.
4. **The name to launch under** — the exact spelling of "AB Masszázs" as she
   uses it.

Photographs are explicitly *not* on this list. The design ships without them.

## 10. Out of scope for v1

Payments and deposits. Client accounts and booking history. Loyalty cards or
vouchers. SMS reminders — a real running cost, revisit if e-mail proves
insufficient for her client base. Multiple therapists or rooms. Home visits.
English or any second language.

## 11. Order of delivery

Three phases, each one shippable on its own. The point is that she has something
real early rather than nothing for a month.

- **Phase 0 — the Google cégprofil.** No code. Claim and fill the profile:
  address, hours, phone, services, the Facebook link. This is the largest share
  of the "get found" goal and it can be done the day the address and hours are
  in hand, before anything is built.
- **Phase 1 — the site, without booking.** Home page, services and prices,
  hours and map, `/adatvedelem`, schema markup, deployed. The booking section
  shows her phone number in the place the booking flow will later occupy. This
  is already the whole "look credible" goal, and it goes live in days.
- **Phase 2 — booking.** The three functions, the slot calculator and its
  tests, the calendar wiring, the confirmation and cancel e-mails. `/foglalas`
  replaces the phone-number placeholder when it works, and not before.

Phase 1 must not be held back waiting on the service account, the app password
or anything else in phase 2.

## 12. What it owes the portfolio

Once live, and not before: the entry returns to `src/data/projects.js` labelled
`Ügyfélprojekt` with a live URL, a public repo, `year`, `role`, `problem`,
`solution` and two or three real screenshots, per `docs/demo-sites-plan.md`.
`Pillars` moves from "2 / 1 készül" to reflect one delivered project. If she is
not invoiced, it is not described as paid work anywhere.
