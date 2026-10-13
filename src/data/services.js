import { forint, priceEn } from './fx.js'

/* The one place the offer lives.

   Until 2026-09-24 it lived in three: skills.js tiles under "Egy ember
   csinálja", ai.js under "Amit a gép elvégez", and pricing.js under "Árak" —
   so the same booking system was a capability in one section, an AI-adjacent
   automation in another and a price tier in a third, and a visitor had to
   assemble the offer themselves. Everything that sells is here now, grouped
   the way a buyer arrives: "I need a site", "I need to take bookings or
   money", "I need my own system", "I need someone to keep it running".

   The copy of every offer that existed before this file was carried over
   word for word from pricing.js and ai.js; the reasoning behind those
   figures (repricing on 2026-08-17, the 16 000 Ft/hour the floors derive
   from, why the audit is flat) is in that history and was not re-litigated.
   New offers were priced on 2026-09-24 at Máté's direction.

   Trimmed on 2026-10-13, at Máté's direction, to the offers with something
   behind them: seventeen cards, half of them marked "never delivered", read
   as a shotgun rather than a specialist (PRODUCT.md: show less rather than
   imitate evidence). The cut offers live in git history. The daily menu was
   split from ordering the same day, at 350 000, so a buffet that only wants
   the menu board is not quoted the ordering system.

   `isNew` means no paying client has bought this kind of work yet. It is
   shown on the card, and the section states once per group what it means —
   the same honesty the AI section used to carry, applied wherever it is
   true rather than only where it was first written. `demo` is the opposite
   claim and services.test.js keeps the two apart. */

/* Floors other files quote in prose (faq.js). Named by role, not position,
   so inserting an offer cannot silently move one. */
export const TIER_FLOORS = {
  intro: 240000,
  booking: 690000,
}

export const RETAINER_HUF = 25000

export const RETAINER = {
  hu: `Karbantartás, ha kéred: ${forint(RETAINER_HUF)}/hó-tól — frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható.`,
  en: `Upkeep if you want it: from ${priceEn(RETAINER_HUF)} a month — updates, backups, an hour of small changes each month, and if it goes down I notice rather than you. No minimum term, cancellable monthly.`,
}

const LABELS = {
  from: (huf) => ({ hu: `${forint(huf)}-tól`, en: `from ${priceEn(huf)}` }),
  flat: (huf) => ({ hu: forint(huf), en: priceEn(huf) }),
  month: (huf) => ({ hu: `${forint(huf)}/hó-tól`, en: `from ${priceEn(huf)} a month` }),
  process: (huf) => ({ hu: `${forint(huf)}-tól / folyamat`, en: `from ${priceEn(huf)}, per process` }),
}

export const priceLabel = (service) => LABELS[service.priceUnit ?? 'from'](service.priceHuf)

/* Launch offer, 2026-09-24, at Máté's direction: 20% off for the first five
   clients.

   The struck-through figure is the list price the page has published all
   along, never an invented one: a reference price nobody was ever charged
   is misleading pricing under Hungarian consumer-protection law, and it is
   the opposite of what this site sells. The offer ends on its own terms —
   a count, not "for a limited time" forever.

   slotsLeft is maintained by hand: when a discounted order is signed,
   lower it by one. At 0 the offer disappears everywhere and the list
   prices stand alone. One-off projects only; monthly upkeep is not
   discounted, because it would stay discounted for as long as it runs.

   Ended 2026-10-13 at Máté's direction: the first client pays list price,
   so the page quotes list price too. */
export const LAUNCH_OFFER = {
  percent: 20,
  slots: 5,
  slotsLeft: 0,
}

export const offerActive = () => LAUNCH_OFFER.slotsLeft > 0

export const isDiscounted = (service) => offerActive() && (service.priceUnit ?? 'from') !== 'month'

/* Rounded down to the next 1 000 Ft, so the discount is never smaller than
   the percentage says. */
export const saleHuf = (huf) => Math.floor((huf * (100 - LAUNCH_OFFER.percent)) / 100 / 1000) * 1000

export const salePriceLabel = (service) => LABELS[service.priceUnit ?? 'from'](saleHuf(service.priceHuf))

export const LAUNCH_NOTE = {
  hu: `Indulási kedvezmény: −${LAUNCH_OFFER.percent}% minden egyszeri projektre, az első ${LAUNCH_OFFER.slots} megrendelőnek. Még ${LAUNCH_OFFER.slotsLeft} hely szabad. Utána a lista ár érvényes.`,
  en: `Launch offer: ${LAUNCH_OFFER.percent}% off every one-off project for the first ${LAUNCH_OFFER.slots} clients. ${LAUNCH_OFFER.slotsLeft} places left. After that the list price applies.`,
}

export const SERVICE_GROUPS = [
  {
    id: 'eladas',
    title: { hu: 'Foglalás, rendelés, eladás', en: 'Bookings, orders, sales' },
    intro: {
      hu: 'Ha a foglalás, a rendelés vagy a fizetés ma telefonon, üzenetben és kézzel megy.',
      en: 'When bookings, orders or payments run by phone, by message and by hand today.',
    },
    items: [
      {
        id: 'idopontfoglalo',
        name: { hu: 'Időpontfoglaló', en: 'Appointment booking' },
        problem: {
          hu: 'A vendég maga választ szolgáltatást és szabad időpontot, te pedig egy listában látod, ki jön és mikor.',
          en: 'Customers pick a service and a free slot themselves, and you see who is coming and when in one list.',
        },
        forWho: {
          hu: 'Annak, aki a telefonálgatást, az üzenetváltást és a kézi időpont-felvételt szeretné kiváltani.',
          en: 'For anyone who wants to stop taking bookings by phone, by message, and by hand.',
        },
        includes: [
          { hu: 'Online időpontfoglalás', en: 'Booking online' },
          { hu: 'Adminfelület, amit te is használsz', en: 'An admin screen you will actually use' },
          { hu: 'Automatikus e-mail értesítések', en: 'Notifications by e-mail, automatically' },
          { hu: 'Kapacitás- és időpontkezelés, hogy ne legyen ütközés', en: 'Capacity and slot handling, so nothing collides' },
        ],
        priceHuf: TIER_FLOORS.booking,
        timeline: { hu: 'Átadás jellemzően 3-6 hét', en: 'Delivered in 3-6 weeks, typically' },
        demo: 'https://demo-idopontfoglalo.vercel.app',
        proof: {
          hu: 'A bemutatóban a szabad sávot mentéskor újraszámolja, így két vendég nem kaphatja meg ugyanazt az időpontot.',
          en: 'In the demo the free slot is recomputed at the moment of saving, so two customers cannot get the same time.',
        },
      },
      {
        id: 'napi-menu',
        name: { hu: 'Napi menü a weboldalon', en: 'A daily menu on your site' },
        problem: {
          hu: 'A mai menü és az árak a weboldaladon, nem egy lefotózott papírlapon. Reggel telefonról beírod, és a vendég már látja.',
          en: 'Today\'s menu and prices on your site rather than on a photographed sheet of paper. You type it in from your phone in the morning, and guests see it straight away.',
        },
        forWho: {
          hu: 'Büfének, étteremnek, ahol naponta változik a kínálat, de a rendelés továbbra is telefonon vagy helyben megy.',
          en: 'For a buffet or restaurant whose offer changes daily, where orders still come by phone or at the counter.',
        },
        includes: [
          { hu: 'Mai és heti menü, amit te szerkesztesz', en: 'Today\'s and this week\'s menu, edited by you' },
          { hu: 'Szerkesztés telefonról, jelszóval', en: 'Edited from your phone, behind a password' },
          { hu: 'Nyitvatartás és elérhetőség ugyanott', en: 'Opening hours and contact details on the same page' },
        ],
        priceHuf: 350000,
        timeline: { hu: 'Átadás jellemzően 1-2 hét', en: 'Delivered in 1-2 weeks, typically' },
        demo: 'https://demo-napi-menu.vercel.app',
      },
      {
        id: 'rendeles',
        name: { hu: 'Rendelésfelvétel', en: 'Taking orders online' },
        problem: {
          hu: 'A napi menü mellé a rendelés is a weboldaladon érkezik be, nem telefonon és Messengeren szétszórva.',
          en: 'Beyond the daily menu, orders come in on your site too, rather than scattered across phone calls and Messenger.',
        },
        forWho: {
          hu: 'Büfének, étteremnek, cukrászdának, ahol a telefonos rendelés már elviszi a napot.',
          en: 'For a buffet, restaurant or bakery where phone orders already eat up the day.',
        },
        includes: [
          { hu: 'Minden, ami a napi menüben', en: 'Everything in the daily menu' },
          { hu: 'Rendelésfelvétel vagy előrendelés', en: 'Orders or pre-orders taken online' },
          { hu: 'Értesítés minden új rendelésről', en: 'A notification for every new order' },
          { hu: 'Rendelési lista, amit te kezelsz', en: 'An order list you run yourself' },
        ],
        priceHuf: TIER_FLOORS.booking,
        timeline: { hu: 'Átadás jellemzően 3-6 hét', en: 'Delivered in 3-6 weeks, typically' },
      },
    ],
  },
  {
    id: 'weboldalak',
    title: { hu: 'Weboldalak', en: 'Websites' },
    intro: {
      hu: 'Ha az a gond, hogy nem találnak meg, vagy amit találnak, az nem mutat jól.',
      en: 'When the problem is that people cannot find you, or what they find does not do you justice.',
    },
    items: [
      {
        id: 'bemutatkozo',
        name: { hu: 'Bemutatkozó weboldal', en: 'Introductory website' },
        problem: {
          hu: 'Egy oldal, ami telefonon azonnal betölt, megmondja, mit csinálsz és hol, és egy koppintással hívható.',
          en: 'One page that loads instantly on a phone, says what you do and where, and can be called with one tap.',
        },
        forWho: {
          hu: 'Annak, akinek rendes online megjelenés kell, de nincs mögötte bonyolult üzleti logika.',
          en: 'For anyone who needs a proper presence online, without complicated business logic behind it.',
        },
        includes: [
          { hu: 'Egyedi megjelenés, mobilon is', en: 'A design of your own, on a phone too' },
          { hu: 'Kapcsolatfelvétel, ami a postafiókodba jön', en: 'An enquiry form that lands in your inbox' },
          { hu: 'Alap keresőoptimalizálás, hogy megtaláljanak', en: 'The search basics, so people find you' },
          { hu: 'Élesítés és átadás', en: 'Put live and handed over' },
        ],
        priceHuf: TIER_FLOORS.intro,
        timeline: { hu: 'Átadás jellemzően 1-2 hét', en: 'Delivered in 1-2 weeks, typically' },
        demo: 'https://demo-bemutatkozo.vercel.app',
        proof: {
          hu: 'A bemutató oldal mobilon Lighthouse-ban 99 / 100 / 100 / 100.',
          en: 'The demo page scores 99 / 100 / 100 / 100 in mobile Lighthouse.',
        },
      },
      {
        id: 'felujitas',
        name: { hu: 'Meglévő weboldal felújítása', en: 'Overhauling the site you have' },
        problem: {
          hu: 'A meglévő oldalad marad, csak működni fog: gyorsan betölt, és a fontos gomb ott lesz, ahol keresik.',
          en: 'You keep the site you have, it just starts working: quick to load, and the button that matters where people look for it.',
        },
        forWho: {
          hu: 'Akkor éri meg, ha a tartalom és a megjelenés alapvetően jó — ha nem, azt az átvilágításban megmondom, és inkább újat javaslok.',
          en: 'Worth doing when the content and the look are basically sound — if they are not, I say so in the audit and suggest building new instead.',
        },
        includes: [
          { hu: 'Gyorsítás, mobilos javítások', en: 'Speed and phone fixes' },
          { hu: 'A fontos gombok és űrlapok rendbetétele', en: 'The buttons and forms that matter, put right' },
          { hu: 'Az átvilágításban talált hibák javítása', en: 'The problems the audit found, fixed' },
        ],
        priceHuf: 150000,
        timeline: { hu: 'Átadás jellemzően 1-2 hét', en: 'Delivered in 1-2 weeks, typically' },
      },
    ],
  },
  {
    id: 'folyamatos',
    title: { hu: 'Folyamatos munka', en: 'Ongoing work' },
    intro: {
      hu: 'Ha már van oldalad, vagy azt szeretnéd, hogy az átadás után is legyen, aki figyel rá.',
      en: 'When you already have a site, or want someone still looking after it once it is handed over.',
    },
    items: [
      {
        id: 'atvilagitas',
        name: { hu: 'Weboldal- és folyamatátvilágítás', en: 'Site and process audit' },
        problem: {
          hu: 'Végigmérem a meglévő oldaladat: mitől lassú, hol akad el a látogató, mi az, amit egy fogyatékkal élő vagy idősebb vásárló nem tud használni.',
          en: 'I go over your existing site on a phone and on a computer: what makes it slow, where visitors give up, and what a disabled or older customer cannot use at all.',
        },
        forWho: {
          hu: 'Annak, akinek van oldala, és tudni akarja, mi a baj vele, mielőtt pénzt költ rá.',
          en: 'For anyone with a site who wants to know what is wrong with it before spending money on it.',
        },
        includes: [
          { hu: 'Írásban, fontossági sorrendben', en: 'In writing, in order of importance' },
          { hu: 'Akkor is a tiéd, ha nem velem csináltatod meg', en: 'Yours to keep, even if someone else does the fixing' },
          { hu: 'Ha velem, az árát beszámítom a javításba', en: 'If I do it, the fee comes off the price of the work' },
        ],
        priceHuf: 45000,
        priceUnit: 'flat',
        timeline: { hu: 'Jellemzően néhány nap', en: 'Usually a few days' },
      },
      /* Upkeep in two tiers. Three from 2026-09-24, because one tier left the
         owner of a quiet one-pager paying for hours they never use; the
         premium tier went with the 2026-10-13 trim. Priced against the
         market check: freelancer basic 10–20e, standard 15–35e a month.
         Standard is the old single offer, unchanged, which is why it keeps
         RETAINER_HUF and the FAQ keeps quoting it. `timeline` carries the
         reply time for a fault, the thing the tiers differ in besides hours. */
      {
        id: 'uzemeltetes-alap',
        name: { hu: 'Karbantartás — Alap', en: 'Upkeep — Basic' },
        problem: {
          hu: 'Frissítések, mentés és leállásfigyelés egy csendes oldalnak, amin ritkán kell változtatni.',
          en: 'Updates, backups and downtime monitoring for a quiet site that rarely needs changing.',
        },
        forWho: {
          hu: 'Bemutatkozó oldalnak, ahol havonta nincs mit módosítani. Nincs hűségidő, hónapra felmondható.',
          en: 'For an introductory site with nothing to change month to month. No minimum term, cancellable monthly.',
        },
        includes: [
          { hu: 'Frissítések és heti biztonsági mentés', en: 'Updates and weekly backups' },
          { hu: 'Leállásfigyelés', en: 'Downtime monitoring' },
          { hu: 'Módosítás óradíjban, ha kell', en: 'Changes at the hourly rate, when needed' },
        ],
        priceHuf: 15000,
        priceUnit: 'month',
        timeline: { hu: 'Hibára 2 munkanapon belül reagálok', en: 'I respond to a fault within 2 working days' },
      },
      {
        id: 'uzemeltetes',
        name: { hu: 'Karbantartás — Standard', en: 'Upkeep — Standard' },
        problem: {
          hu: 'Frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te.',
          en: 'Updates, backups, an hour of small changes each month, and if it goes down I notice rather than you.',
        },
        forWho: {
          hu: 'Annak, aki nem akar a weboldala működésével foglalkozni. Nincs hűségidő, hónapra felmondható.',
          en: 'For anyone who would rather not think about keeping their site running. No minimum term, cancellable monthly.',
        },
        includes: [
          { hu: 'Frissítések és napi biztonsági mentés', en: 'Updates and daily backups' },
          { hu: 'Havi egy óra apró módosítás', en: 'An hour of small changes each month' },
          { hu: 'Leállásfigyelés', en: 'Downtime monitoring' },
        ],
        priceHuf: RETAINER_HUF,
        priceUnit: 'month',
        timeline: { hu: 'Hibára egy munkanapon belül reagálok', en: 'I respond to a fault within one working day' },
      },
    ],
  },
]

export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.items.map((s) => ({ ...s, group: g.id })))
