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
   to take bookings without the phone ringing all day. Tier 02 is the one both
   paying clients in projects.js actually bought (a rendelő and an
   időpontfoglaló), so it is the one marked as most common. */
export const PRICING_TIERS = [
  {
    eyebrow: 'Kezdéshez',
    name: 'Bemutatkozó oldal',
    desc: 'Ha valaki rád keres a Google-ben, találjon valamit, ami rendben van, és ne a konkurenciádat.',
    priceNote: '180 000 Ft-tól',
    scope: 'Jellemzően 1-2 hét',
    features: ['Mobilon is jól működik', 'Megtalálnak a Google-ben', 'Kapcsolati űrlap, ami a postafiókodba jön', 'Elindítom és átadom'],
    highlight: false,
  },
  {
    eyebrow: 'Leggyakoribb',
    name: 'Foglalás és rendelés',
    desc: 'Ha a foglalás vagy a rendelés ma telefonon és üzenetben megy, és ez már napi egy órát elvisz.',
    priceNote: '450 000 Ft-tól',
    scope: 'Jellemzően 3-6 hét',
    features: ['Foglalás vagy rendelés online', 'Kezelőfelület, amit te is használsz', 'Értesítések e-mailben', 'Ahhoz illesztve, amit már használsz: naptár, számlázó, táblázat'],
    highlight: true,
  },
  {
    eyebrow: 'Egyedi',
    name: 'Belső rendszer',
    desc: 'Ha a munka ma táblázatban vagy papíron van, és már senki nem találja benne, amit keres.',
    priceNote: '1 200 000 Ft-tól',
    scope: 'Ütemezés a terjedelemtől függ',
    /* Was "Adatok kiajánlása", "Több modul, több jogosultsági szint" and the
       page's only plural address ("A ti folyamatotokra"). All three failed the
       same test: an SME owner does not parse "kiajánlás" or "modul", and the
       person shift read as a slip rather than as a deliberate address to a
       team. Written for the person paying, in the second person singular the
       rest of the site uses. */
    features: ['A te folyamataidra szabva', 'Te állítod be, ki mit láthat belőle', 'Az adataidat bármikor kiviheted Excelbe', 'Együtt nő a céggel'],
    highlight: false,
  },
]

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

/* Written out because the site already promised it twice without a number
   ("üzemeltetés havidíjas", "a részleteket megbeszéljük"), and an unpriced
   promise earns nothing. It is deliberately not sold on response time: the
   24-hour reply in Pillars is free and stays free, so a retainer that charged
   for it would be selling back something already given away. What it sells is
   work done, not work answered. */
export const PRICING_RETAINER = 'Üzemeltetés, ha kéred: 25 000 Ft/hó — frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható.'
