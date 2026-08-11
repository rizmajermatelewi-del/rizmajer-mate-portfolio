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

   Tier 03 moved from 900e to 1.2M. Its implied effort was out of line with
   its own scope — a multi-module system with permission levels and
   integrations does not fit in the ~7 billable days that 900e buys at a
   16e/hour freelance rate, while tiers 01 and 02 imply 1.4 and 3.5 days for
   scopes that plausibly fit. The top tier's job is to anchor, not to close,
   so raising it costs no inquiries and lifts the perceived value of the
   middle tier. Tier 01 stays deliberately below the market floor (265-350e)
   as an acquisition price while the calendar is empty; the trigger to move it
   to 260e is three won projects or a half-full calendar. */
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
export const PRICING_TIERS = [
  {
    eyebrow: 'Kezdéshez',
    name: 'Bemutatkozó oldal',
    desc: 'Ha valaki rád keres a Google-ben, találjon valamit, ami rendben van, és ne a konkurenciádat.',
    priceNote: '180 000 Ft-tól',
    scope: 'Átadás jellemzően 1-2 hét',
    features: ['Mobilon is jól működik', 'Megtalálnak a Google-ben', 'Kapcsolati űrlap, ami a postafiókodba jön', 'Elindítom és átadom'],
    highlight: false,
  },
  {
    eyebrow: 'Ajánlott',
    name: 'Foglalás és rendelés',
    desc: 'Ha a foglalás vagy a rendelés ma telefonon és üzenetben megy, és ez már napi egy órát elvisz.',
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
    priceNote: '550 000 Ft-tól',
    scope: 'Átadás jellemzően 3-6 hét',
    features: ['Foglalás vagy rendelés online', 'Kezelőfelület, amit te is használsz', 'Értesítések e-mailben', 'A naptáraddal összekötve, hogy ne legyen dupla foglalás'],
    highlight: true,
  },
  {
    eyebrow: 'Egyedi',
    /* Was "Belső rendszer". Same slot, same price, same anchoring job — but
       that version was the one claim on the site with nothing behind it: no
       internal system has been built for anyone, so a yes to it would have
       been a seven-figure quote for a category never delivered.

       Connecting existing tools is the honest version of the same tier. It is
       also the one thing a SaaS cannot take: a booking product serves every
       salon identically, which is why the Salonic-shaped competitor exists,
       but no product knows that this client's számlázó has to talk to that
       client's naptár. And it ladders directly up from the 90 000 Ft
       single-process offer below, so the cheapest and the dearest thing on the
       page are now the same promise at two sizes. */
    name: 'Rendszerek összekötése',
    desc: 'Ha már több program fut nálad, és a köztük lévő átmásolgatás viszi el a napodat.',
    priceNote: '1 200 000 Ft-tól',
    scope: 'Ütemezés a terjedelemtől függ',
    /* Was "Adatok kiajánlása", "Több modul, több jogosultsági szint" and the
       page's only plural address ("A ti folyamatotokra"). All three failed the
       same test: an SME owner does not parse "kiajánlás" or "modul", and the
       person shift read as a slip rather than as a deliberate address to a
       team. Written for the person paying, in the second person singular the
       rest of the site uses. */
    features: ['A te folyamataidra szabva', 'Amit ma kézzel másolsz át, magától megy', 'Az adataidat bármikor kiviheted Excelbe', 'Együtt nő a céggel'],
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
  eyebrow: 'Ha már van oldalad',
  name: 'Átvilágítás és javaslat',
  priceNote: '45 000 Ft',
  desc: 'Végigmérem a meglévő oldaladat telefonon és gépen: mitől lassú, hol akad el a látogató, mi az, amit egy fogyatékkal élő vagy idősebb vásárló nem tud használni. Írásban kapod meg, magyarul, fontossági sorrendben — akkor is, ha utána nem velem csináltatod meg. Ha mégis velem, az árát beszámítom a javításba.',
  href: '#kapcsolat',
  linkLabel: 'Kérj ajánlatot',
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
  eyebrow: 'Kisebb lépés',
  name: 'Egy folyamat automatizálása',
  priceNote: '90 000 Ft-tól / folyamat',
  desc: 'Ha ez most túl nagy lépés, kezdjük egyetlen dologgal, ami ma kézzel megy: a rendelés magától a táblázatba kerül, az értesítő magától kimegy. Ilyet fizető ügyfélnek még nem szállítottam, ezért az első projekteknél ezt be is árazom.',
  href: '#kapcsolat',
  linkLabel: 'Kérj ajánlatot',
}

/* The cheapest real yes on the page, and the one most of the outbound list
   actually needs first. A local business that is missing from Google Maps, or
   listed with a dead phone number and last year's opening hours, is losing
   walk-ins today — and unlike a redesign, this is checkable from the outside
   before the first call, which makes it the only offer here that can open a
   conversation with a stranger.

   Flat, not "-tól", for the same reason the audit is: a small number with no
   open end is a decision somebody can make on the spot.

   It used to say "genuinely a couple of hours", which put it at 32 000 Ft on
   the 16 000 Ft/hour the rest of the page derives from, and left the 60 000 Ft
   unexplained. Two hours was the wrong estimate, not the price: creating or
   claiming the profile, categories, service list, hours, photographs, and then
   seeing the verification through — which arrives days later and has to be
   finished — is 3-4 hours of real work spread across a fortnight. */
export const PRICING_GOOGLE = {
  eyebrow: 'A leggyorsabb',
  name: 'Google-megjelenés beállítása',
  priceNote: '60 000 Ft',
  desc: 'Hogy amikor valaki a környéken rád keres, meg is találjon: cégprofil, térkép, nyitvatartás, telefonszám, képek — kitöltve és rendben tartva. Ha még nincs profilod, létrehozom; ha van, de elavult, rendbe rakom.',
  href: '#kapcsolat',
  linkLabel: 'Kérj ajánlatot',
}

/* The other half of the audit. Without it the 45 000 Ft ends in a written
   report and a quote invented on the spot every time, which is both slower for
   the client and the point where most of these conversations die. With it the
   audit has an obvious next step at a published price, and the credit note on
   the audit makes taking it the cheaper path. */
export const PRICING_REFRESH = {
  eyebrow: 'A következő lépés',
  name: 'Meglévő oldal felújítása',
  priceNote: '120 000 Ft-tól',
  desc: 'A meglévő oldalad marad, csak működni fog: mobilon is használható, gyorsan betölt, és a fontos gomb ott lesz, ahol keresik. Akkor éri meg, ha a tartalom és a megjelenés alapvetően jó — ha nem, azt az átvilágításban megmondom, és inkább újat javaslok.',
  href: '#kapcsolat',
  linkLabel: 'Kérj ajánlatot',
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
export const PRICING_RETAINER = 'Üzemeltetés, ha kéred: 25 000 Ft/hó — frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható.'
