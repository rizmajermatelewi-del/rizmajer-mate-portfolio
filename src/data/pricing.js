import { forint, priceEn } from './fx.js'
import { UI } from '../i18n/ui.js'

/* Figures are floors, not quotes. The earlier version published no numbers
   at all, on the theory that a price anchors the conversation before the
   scope is known. In practice it anchored nothing and cost the inquiry: a
   pricing section that says "ajánlat egyeztetés után" three times is not a
   pricing section, and the visitor leaves to find someone who will say a
   number.

   The floors sit just under Hungarian agency rates for 2026, which is the
   honest position for a solo developer: bemutatkozó oldal runs 150-400e at
   agencies, közepes céges oldal 400-900e, a booking or ordering module adds
   50-300e on top, and custom or AI-integrated work starts around 1M. Every
   figure below is a "-tól" and the written quote still follows a call.

   Repriced on 2026-08-17 at Máté's direction: 180e -> 240e, 550e -> 690e,
   1.2M unchanged. The brief's reasoning was positional rather than
   arithmetic — the page should not read as cheap website work — and the
   numbers land where the effort estimates already pointed.

   Tier 01 had been held deliberately below the market floor (265-350e) as an
   acquisition price while the calendar was empty. 240e enters the bottom of
   that band rather than sitting under it, which is the same decision the old
   note deferred until "three won projects or a half-full calendar"; it is
   being taken early on purpose, and the risk is real — the first inquiries
   are also the ones most likely to be lost on price. Tier 02 is covered in
   its own note below. Tier 03 was already moved from 900e to 1.2M because a
   multi-module system with permission levels does not fit the ~7 billable
   days 900e buys at 16e/hour; nothing about that changed.

   The top tier's job is to anchor rather than to close, which is why raising
   the two beneath it lifts the middle rather than flattening the set. */
/* Named after what the client is buying, not after what gets built. The tiers
   used to read "Landing Oldal / Webalkalmazás / Egyedi Rendszer" — artifact
   names. An SME owner does not shop for a webalkalmazás; they shop for a way
   to take bookings without the phone ringing all day.

   Tier 02 was marked "Leggyakoribb" on the strength of a comment here claiming
   both paying clients in projects.js had bought it. Those two entries were
   removed on 2026-08-10 because neither was delivered and neither was invoiced
   — leaving a frequency claim about a tier nobody has ever bought, on a live
   commercial page. It reads "Ajánlott" now: a judgement that survives zero
   sales.

   `scope` is DELIVERY time, not billable hours, and now says so. Before,
   "Jellemzően 1-2 hét" sat beside a price derived from ~11 hours, and a reader
   taking the week at face value would put the rate near 3 000 Ft/hour. */
/* Both languages are built from the forint amount rather than written out
   twice, so a price can only be changed in one place. Typing "550 000 Ft-tól"
   in Hungarian and forgetting the English figure is the same drift that left
   450 000 Ft in the FAQ and in the structured data after this file had already
   moved on. */
/* "from 550 000 Ft (~1 600 EUR)", not "550 000 Ft (~1 600 EUR) and up".
   A trailing "and up" put the qualifier at the far end of the longest string
   on the card, and tier 03 — the only price carrying both seven forint digits
   and four euro ones — overran its column and wrapped onto a second line.
   That pushed its scope note and its whole feature list a line below the two
   cards beside it, so the row lost its alignment on the one tier whose job is
   to anchor. Hungarian never showed it: "-tól" is a suffix, so every Hungarian
   price is shorter than its English twin and all three fit.

   Leading "from" is also the ordinary English pricing idiom and the exact
   sense of "-tól", so the shorter line is the better line either way. */
const fromPrice = (huf) => ({ hu: `${forint(huf)}-tól`, en: `from ${priceEn(huf)}` })
const flatPrice = (huf) => ({ hu: forint(huf), en: priceEn(huf) })

/* The three floors, exported as numbers rather than only as rendered strings.
   faq.js answers "mennyibe kerül?" by naming all three, and it did that by
   typing forint(180000) into its own sentence — so the FAQ, and with it the
   FAQPage structured data Google reproduces, kept a price the tiers had
   already moved past. That has now happened twice: 450 000 survived in the FAQ
   after the 2026-08-12 review, and 180 000 / 550 000 survived here until the
   2026-08-17 repricing. Both times nothing failed, because nothing compared
   them.

   Naming the floors once and importing them is what ends it. The keys are
   roles rather than positions: TIER_FLOORS[1] would break silently the day a
   fourth tier is inserted anywhere but the end. */
export const TIER_FLOORS = {
  intro: 240000,
  booking: 690000,
  system: 1200000,
}

/* `desc` answers one question and only one: who is this for. It used to be a
   mixed sentence — part audience, part benefit, part reassurance — and read as
   three cards each making a slightly different kind of argument.

   A buyer comparing three tiers is doing one thing: working out which row is
   theirs. Answering that first, in the same shape on every card, is what makes
   the three comparable at a glance; the feature list underneath answers "what
   is in it" once they have found their row. The visible "Kinek való?" label
   lives in Pricing.jsx, because it is the same word on every card and belongs
   to the layout rather than to the data. */
export const PRICING_TIERS = [
  {
    eyebrow: { hu: 'Kezdéshez', en: 'To start' },
    name: { hu: 'Bemutatkozó weboldal', en: 'Introductory website' },
    desc: {
      hu: 'Annak, akinek rendes online megjelenés kell, de nincs mögötte bonyolult üzleti logika.',
      en: 'For anyone who needs a proper presence online, without complicated business logic behind it.',
    },
    priceNote: fromPrice(TIER_FLOORS.intro),
    scope: { hu: 'Átadás jellemzően 1-2 hét', en: 'Delivered in 1-2 weeks, typically' },
    features: [
      { hu: 'Egyedi megjelenés, mobilon is', en: 'A design of your own, on a phone too' },
      { hu: 'Kapcsolatfelvétel, ami a postafiókodba jön', en: 'An enquiry form that lands in your inbox' },
      { hu: 'Alap keresőoptimalizálás, hogy megtaláljanak', en: 'The search basics, so people find you' },
      { hu: 'Élesítés és átadás', en: 'Put live and handed over' },
    ],
    highlight: false,
  },
  {
    eyebrow: { hu: 'Ajánlott', en: 'Recommended' },
    name: { hu: 'Foglalási / rendelési rendszer', en: 'Booking / ordering system' },
    desc: {
      hu: 'Annak, aki a telefonálgatást, az üzenetváltást és a kézi időpont- vagy rendelésfelvételt szeretné kiváltani.',
      en: 'For anyone who wants to stop taking bookings and orders by phone, by message, and by hand.',
    },
    /* 450 000 implied ~28 billable hours for online booking, an admin UI,
       e-mail notifications AND "ahhoz illesztve, amit már használsz: naptár,
       számlázó, táblázat" — an open-ended promise sitting behind a floor price.
       Each integration is days, and the floor did not move when a client named
       a third system.

       There was evidence to hand: AB Masszázs IS this tier, and phase 1 — the
       site, with no booking at all — already ran past 28 hours. As a paying
       450 000 Ft job it would have been underwater before booking started.

       550 000 buys ~34 hours, and the scope below now fits in them. Calendar
       sync stays in, because a booking system without it double-books; the
       számlázó and táblázat move out to the 90 000 Ft/folyamat offer further
       down, which is the same promise priced per unit of work. */
    /* 690 000 buys ~43 hours at the 16 000 Ft/hour the page derives from, up
       from ~34 at 550 000. The scope below did not grow to match, and that is
       the point of the move rather than an oversight: at 550 000 the four
       lines here were the whole budget, so a client naming one more system to
       integrate, one more booking rule, or a second location put the job
       underwater. The floor now carries the variance that a real booking
       build has and the four lines do not describe. */
    priceNote: fromPrice(TIER_FLOORS.booking),
    scope: { hu: 'Átadás jellemzően 3-6 hét', en: 'Delivered in 3-6 weeks, typically' },
    features: [
      { hu: 'Online időpontfoglalás vagy rendelésfelvétel', en: 'Booking or ordering online' },
      { hu: 'Adminfelület, amit te is használsz', en: 'An admin screen you will actually use' },
      { hu: 'Automatikus e-mail értesítések', en: 'Notifications by e-mail, automatically' },
      {
        hu: 'Kapacitás- és időpontkezelés, hogy ne legyen ütközés',
        en: 'Capacity and slot handling, so nothing collides',
      },
    ],
    highlight: true,
  },
  {
    eyebrow: { hu: 'Egyedi', en: 'Bespoke' },
    /* This slot has now been named three things, and the history is worth
       keeping because it is the same argument each time.

       It began as "Belső rendszer" and was renamed to "Rendszerek
       összekötése" on the grounds that no internal system had been built for
       anyone, so the tier named a category never delivered. Máté asked for
       "Egyedi üzleti rendszer" on 2026-08-17, which is closer to the original
       than to the replacement.

       That is a defensible reversal, and the distinction the first rename
       missed is worth stating so it is not re-litigated: a price tier is an
       offer, not a claim about past work. Nothing here says one has been
       built. The 2026-08-10 problem was different in kind — projects.js listed
       two client projects that did not exist, which is a statement of fact
       that was false. Naming a service you are willing to be hired for is not.

       What the tier must not do is borrow credibility from the ones beside it.
       If that ever becomes a risk, the honest fix is the one PRICING_ENTRY
       already uses: say plainly that no paying client has bought it yet. Not
       added here, because the section carries no claim of delivery at all —
       Pillars states the real count two sections up, and the projects section
       now says outright that no client work has been handed over.

       Connecting existing tools stays as the first feature line rather than as
       the tier name. It is still the one thing a SaaS cannot take: a booking
       product serves every salon identically, but no product knows that this
       client's számlázó has to talk to that client's naptár. And it ladders up
       from the 90 000 Ft single-process offer below, so the cheapest and the
       dearest thing on the page remain the same promise at two sizes. */
    name: { hu: 'Egyedi üzleti rendszer', en: 'A business system of your own' },
    desc: {
      hu: 'Annak, aki több belső folyamatot, adatot vagy munkatársat szeretne egy saját rendszerben kezelni.',
      en: 'For anyone who needs several internal processes, or their data and staff, handled in one system of their own.',
    },
    priceNote: fromPrice(TIER_FLOORS.system),
    scope: { hu: 'Ütemezés a terjedelemtől függ', en: 'Timeline depends on the scope' },
    /* Was "Adatok kiajánlása", "Több modul, több jogosultsági szint" and the
       page's only plural address ("A ti folyamatotokra"). All three failed the
       same test: an SME owner does not parse "kiajánlás" or "modul", and the
       person shift read as a slip rather than as a deliberate address to a
       team. Written for the person paying, in the second person singular the
       rest of the site uses. */
    features: [
      { hu: 'Egyedi adminfelület a te folyamataidra', en: 'An admin system built around your processes' },
      { hu: 'Több munkatárs, külön jogosultságokkal', en: 'Several people, each with their own permissions' },
      { hu: 'Amit ma kézzel másolsz át, magától megy', en: 'What you copy across by hand today happens on its own' },
      { hu: 'A meglévő programjaid összekötve', en: 'The programs you already run, wired together' },
    ],
    highlight: false,
  },
]

/* The only offer on the page for someone who already has a site.
   Every tier above assumes the visitor is buying a thing they do not have yet,
   which excludes the largest group in the catchment by far: businesses whose
   site exists and is slow, broken on a phone, or unusable with a keyboard.
   They are also the only group a stranger can be told something specific and
   true about before the first call, which is what makes this the door-opener
   rather than a discount.

   Fixed price, not "-tól" — the whole point is that it is a small, bounded yes,
   and a "-tól" reintroduces the open-ended risk it exists to remove. 45 000 Ft
   is about three hours at the 16 000 Ft/hour the tiers above are derived from,
   which is a real audit plus a written report and no more.

   Crediting it against the fix is what stops this being a dead end: it turns an
   audit into the first invoice of a project without discounting the project.

   Not sold as a legal obligation. The Hungarian accessibility rules that took
   effect on 2025-06-28 exempt micro-enterprises (under 10 staff and under €2M
   turnover) and never covered informational sites that conclude no contract
   online — which is nearly every local business worth calling. Sold as reach,
   the way the FAQ already puts it, because that claim is true for all of them. */
export const PRICING_AUDIT = {
  eyebrow: { hu: 'Ha már van oldalad', en: 'If you already have a site' },
  name: { hu: 'Weboldal- és folyamatátvilágítás', en: 'Site and process audit' },
  priceNote: flatPrice(45000),
  desc: {
    hu: 'Végigmérem a meglévő oldaladat telefonon és gépen: mitől lassú, hol akad el a látogató, mi az, amit egy fogyatékkal élő vagy idősebb vásárló nem tud használni. Írásban kapod meg, magyarul, fontossági sorrendben — akkor is, ha utána nem velem csináltatod meg. Ha mégis velem, az árát beszámítom a javításba.',
    en: 'I go over your existing site on a phone and on a computer: what makes it slow, where visitors give up, and what a disabled or older customer cannot use at all. You get it in writing, in order of importance — including if you then have someone else fix it. If you have me do it, the fee comes off the price of the work.',
  },
  href: '#kapcsolat',
  linkLabel: UI.ctaQuote,
}

/* The smallest yes on the page, and the reason it sits here rather than only
   in the AI section: read in page order, a visitor met 90 000 Ft first — the
   lowest number on the site, in the one section that admits it has no paying
   client yet — and only then the 180 000 Ft floor. That anchors downward and
   then asks for more. Below the three cards it does the opposite job: the
   tiers set the scale, and this catches the owner for whom the scale is still
   too big. Per-process is also the best value metric on the site — it scales
   with what the client gets and lets them start with one thing. */
/* The link points at the contact form, not at #ai. It pointed up the page at
   first, which sent the lowest-commitment visitor backwards, away from the
   form sitting directly below — the one offer on the page with no way to act
   on it. The label is the same three words as every other CTA here, for the
   reason recorded further down in Pricing.jsx: two labels read as two
   destinations.

   The honesty clause is load-bearing rather than a hedge. In the AI section
   this offer sat underneath a stated "no paying client has bought this yet";
   lifted into a pricing section where every other figure is backed by
   delivered work, it would inherit a credibility it has not earned. Said
   plainly it also becomes a true reason to move now. */
export const PRICING_ENTRY = {
  eyebrow: { hu: 'Kisebb lépés', en: 'A smaller step' },
  name: { hu: 'Egy folyamat automatizálása', en: 'Automating one process' },
  priceNote: {
    hu: `${forint(90000)}-tól / folyamat`,
    en: `from ${priceEn(90000)}, per process`,
  },
  desc: {
    hu: 'Ha ez most túl nagy lépés, kezdjük egyetlen dologgal, ami ma kézzel megy: a rendelés magától a táblázatba kerül, az értesítő magától kimegy. Ilyet fizető ügyfélnek még nem szállítottam, ezért az első projekteknél ezt be is árazom.',
    /* The admission stays in the English word for word. It is the one claim on
       the page with no delivered work behind it, and a translation is exactly
       where a caveat quietly goes missing. */
    en: 'If that is too big a step right now, we start with one thing that runs by hand today: the order writes itself into the spreadsheet, the notification sends itself. I have not delivered one of these for a paying client yet, so I price the first few accordingly.',
  },
  href: '#kapcsolat',
  linkLabel: UI.ctaQuote,
}

/* The cheapest real yes on the page, and the one most of the outbound list
   actually needs first. A local business that is missing from Google Maps, or
   listed with a dead phone number and last year's opening hours, is losing
   walk-ins today — and unlike a redesign, this is checkable from the outside
   before the first call, which makes it the only offer here that can open a
   conversation with a stranger.

   It used to say "genuinely a couple of hours", which put it at 32 000 Ft on
   the 16 000 Ft/hour the rest of the page derives from, and left the 60 000 Ft
   unexplained. Two hours was the wrong estimate, not the price: creating or
   claiming the profile, categories, service list, hours, photographs, and then
   seeing the verification through — which arrives days later and has to be
   finished — is 3-4 hours of real work spread across a fortnight.

   Now a "-tól", at Máté's direction, where it was previously flat. Worth
   recording that this trades something away rather than being free: the case
   for a flat number here was that a small figure with no open end is a
   decision a stranger can make on the spot, which is exactly what this offer
   exists to be. The "-tól" is the honest form for a listing that turns out to
   need a rebuilt service list or a verification fight, and it keeps the page
   consistent — the audit is the only fixed price left, which is defensible
   because its scope genuinely cannot grow. */
export const PRICING_GOOGLE = {
  eyebrow: { hu: 'A leggyorsabb', en: 'The quickest one' },
  name: { hu: 'Google-megjelenés és alap keresőoptimalizálás', en: 'Google listing and search basics' },
  priceNote: fromPrice(60000),
  desc: {
    hu: 'Hogy amikor valaki a környéken rád keres, meg is találjon: cégprofil, térkép, nyitvatartás, telefonszám, képek — kitöltve és rendben tartva. Ha még nincs profilod, létrehozom; ha van, de elavult, rendbe rakom.',
    en: 'So that when somebody nearby searches for you, they actually find you: business profile, map, opening hours, phone number, photographs — filled in and kept straight. If you have no profile yet I create one; if you have one that has gone stale, I put it right.',
  },
  href: '#kapcsolat',
  linkLabel: UI.ctaQuote,
}

/* The other half of the audit. Without it the 45 000 Ft ends in a written
   report and a quote invented on the spot every time, which is both slower for
   the client and the point where most of these conversations die. With it the
   audit has an obvious next step at a published price, and the credit note on
   the audit makes taking it the cheaper path. */
export const PRICING_REFRESH = {
  eyebrow: { hu: 'A következő lépés', en: 'The next step' },
  name: { hu: 'Meglévő weboldal felújítása', en: 'Overhauling the site you have' },
  /* 120 000 -> 150 000 on 2026-08-17. It had been the one small offer priced
     below its own tier logic: a refresh that has to survive the audit's own
     findings is rarely under a working week, and 120 000 bought seven and a
     half hours. */
  priceNote: fromPrice(150000),
  desc: {
    hu: 'A meglévő oldalad marad, csak működni fog: mobilon is használható, gyorsan betölt, és a fontos gomb ott lesz, ahol keresik. Akkor éri meg, ha a tartalom és a megjelenés alapvetően jó — ha nem, azt az átvilágításban megmondom, és inkább újat javaslok.',
    en: 'You keep the site you have, it just starts working: usable on a phone, quick to load, and the button that matters where people look for it. Worth doing when the content and the look are basically sound — if they are not, I say so in the audit and suggest building new instead.',
  },
  href: '#kapcsolat',
  linkLabel: UI.ctaQuote,
}

/* Ascending by price, which is also ascending by commitment. Exported as one
   list so a new offer is a data change and never a JSX change — the section
   maps whatever is in here. */
export const PRICING_SMALL_OFFERS = [
  PRICING_AUDIT,
  PRICING_GOOGLE,
  PRICING_ENTRY,
  PRICING_REFRESH,
]

/* Written out because the site already promised it twice without a number
   ("üzemeltetés havidíjas", "a részleteket megbeszéljük"), and an unpriced
   promise earns nothing. It is deliberately not sold on response time: the
   24-hour reply in Pillars is free and stays free, so a retainer that charged
   for it would be selling back something already given away. What it sells is
   work done, not work answered. */
export const PRICING_RETAINER = {
  hu: `Karbantartás, ha kéred: ${forint(25000)}/hó-tól — frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható.`,
  en: `Upkeep if you want it: from ${priceEn(25000)} a month — updates, backups, an hour of small changes each month, and if it goes down I notice rather than you. No minimum term, cancellable monthly.`,
}
