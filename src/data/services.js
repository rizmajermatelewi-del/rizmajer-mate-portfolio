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

   Widened again on 2026-11-09, at Máté's direction, to sixteen: offers a
   demo from the 2026-10-20 batch now stands behind (quote builder, direct
   booking, repair intake, reminders, multi-page site, product picker), plus
   the Google listing and accessibility work. The webshop, chatbot, voice
   assistant, automation and custom system stay cut: still nothing behind
   them. New prices from the same 16 000 Ft/hour.

   `isNew` means no paying client has bought this kind of work yet. It is
   shown on the card, and the section states once per group what it means —
   the same honesty the AI section used to carry, applied wherever it is
   true rather than only where it was first written. Since 2026-11-09 an
   offer can be new and demoed at once: the demo is my own project, not
   client work, and the group note says so. */

/* Floors other files quote in prose (faq.js). Named by role, not position,
   so inserting an offer cannot silently move one. */
export const TIER_FLOORS = {
  intro: 240000,
  booking: 690000,
}

export const RETAINER_HUF = 25000

export const RETAINER = {
  hu: `Karbantartás, ha kéred: ${forint(RETAINER_HUF)}/hó-tól: frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható.`,
  en: `Upkeep if you want it: from ${priceEn(RETAINER_HUF)} a month: updates, backups, an hour of small changes each month, and if it goes down I notice rather than you. No minimum term, cancellable monthly.`,
}

export const LABELS = {
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
    id: 'weboldalak',
    title: { hu: 'Találjanak meg', en: 'Get found' },
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
        id: 'cegoldal',
        name: { hu: 'Többoldalas céges oldal', en: 'Multi-page business site' },
        problem: {
          hu: 'Külön oldal minden szolgáltatásodnak, árak, galéria és elérhetőség, úgyhogy aki keres, a konkrét kérdésére talál választ, nem csak egy névjegyre.',
          en: 'A page for each of your services, prices, a gallery and contact details, so people searching find the answer to their actual question, not just a business card.',
        },
        forWho: {
          hu: 'Annak, akinek több szolgáltatása van, mint amennyi egy oldalra kényelmesen ráfér.',
          en: 'For anyone with more services than fit comfortably on one page.',
        },
        includes: [
          { hu: 'Több aloldal egyedi megjelenéssel, mobilon is', en: 'Several pages with a design of your own, on a phone too' },
          { hu: 'Szövegek, árak és képek, amiket te is módosíthatsz', en: 'Text, prices and images you can change yourself' },
          { hu: 'Keresőoptimalizálás oldalanként', en: 'Search basics on every page' },
          { hu: 'Élesítés és átadás', en: 'Put live and handed over' },
        ],
        priceHuf: 420000,
        timeline: { hu: 'Átadás jellemzően 2-4 hét', en: 'Delivered in 2-4 weeks, typically' },
        demo: 'https://demo-szerviz.vercel.app',
        isNew: true,
      },
      {
        id: 'google',
        name: { hu: 'Google-cégprofil és helyi keresés', en: 'Google Business Profile and local search' },
        problem: {
          hu: 'Ha valaki rákeres a szakmádra a környéken, a térképen te is ott legyél, helyes nyitvatartással, képekkel és egy koppintással hívható számmal.',
          en: 'When someone searches for your trade nearby, you show up on the map too, with the right opening hours, photos and a number they can call with one tap.',
        },
        forWho: {
          hu: 'Helyi vállalkozásnak, amelyiknek nincs Google-profilja, vagy évek óta nem nyúlt hozzá.',
          en: 'For a local business with no Google profile, or one nobody has touched in years.',
        },
        includes: [
          { hu: 'Profil létrehozása vagy rendbetétele', en: 'Profile created or put right' },
          { hu: 'Kategóriák, nyitvatartás, képek, leírás', en: 'Categories, opening hours, photos, description' },
          { hu: 'Összekötés a weboldaladdal', en: 'Linked to your website' },
        ],
        priceHuf: 60000,
        priceUnit: 'flat',
        timeline: { hu: 'Jellemzően néhány nap, plusz a Google ellenőrzése', en: 'Usually a few days, plus Google\'s own verification' },
        isNew: true,
      },
      {
        id: 'akadalymentesites',
        name: { hu: 'Akadálymentesítés', en: 'Accessibility fixes' },
        problem: {
          hu: 'A meglévő oldaladat használhatóvá teszem annak is, aki rosszul lát, csak billentyűzettel vagy felolvasóval böngészik. 2025 óta az európai akadálymentességi szabály több szolgáltatásnál és webshopnál ezt elő is írja.',
          en: 'I make your existing site usable for people with poor sight, or who browse by keyboard or screen reader only. Since 2025 the European Accessibility Act requires it for several kinds of service and online shop.',
        },
        forWho: {
          hu: 'Annak, aki online értékesít vagy foglaltat, és tudni akarja, megfelel-e. Ha nem tudod, az átvilágítás megmondja.',
          en: 'For anyone selling or taking bookings online who wants to know whether they comply. If you are unsure, the audit tells you.',
        },
        includes: [
          { hu: 'Ellenőrzés a WCAG 2.2 AA szint szerint', en: 'Checked against WCAG 2.2 level AA' },
          { hu: 'Kontraszt, billentyűzetes és felolvasós használat javítása', en: 'Contrast, keyboard and screen-reader use fixed' },
          { hu: 'Akadálymentességi nyilatkozat a weboldalra', en: 'An accessibility statement for the site' },
        ],
        proof: {
          hu: 'Ez az oldal, amit most olvasol: billentyűzettel végigjárható, és a Lighthouse akadálymentességi pontszáma 100.',
          en: 'This page you are reading: fully keyboard operable, with a Lighthouse accessibility score of 100.',
        },
        priceHuf: 150000,
        timeline: { hu: 'Átadás jellemzően 1-3 hét', en: 'Delivered in 1-3 weeks, typically' },
        isNew: true,
      },
      {
        id: 'tobbnyelvu',
        name: { hu: 'Többnyelvű weboldal', en: 'Multilingual website' },
        problem: {
          hu: 'A külföldi vendég vagy ügyfél a saját nyelvén olvassa az oldaladat, és a Google is az ő nyelvén mutatja meg neki.',
          en: 'Foreign guests and customers read your site in their own language, and Google shows it to them in that language too.',
        },
        forWho: {
          hu: 'Szállásnak, étteremnek, szolgáltatónak turistás környéken vagy külföldi ügyfelekkel.',
          en: 'For guesthouses, restaurants and services in tourist areas or with foreign customers.',
        },
        includes: [
          { hu: 'Magyar és angol változat, kérésre német is', en: 'Hungarian and English, German on request' },
          { hu: 'Nyelvenként külön cím, hogy a Google jól indexelje', en: 'A separate address per language, so Google indexes each one' },
          { hu: 'Nyelvváltó, ami az aktuális oldalon marad', en: 'A language switch that stays on the page you are on' },
        ],
        proof: {
          hu: 'Ez az oldal is magyarul és angolul fut, nyelvenként külön címen.',
          en: 'This site runs in Hungarian and English too, each at its own address.',
        },
        priceHuf: 320000,
        timeline: { hu: 'Átadás jellemzően 2-3 hét', en: 'Delivered in 2-3 weeks, typically' },
        isNew: true,
      },
      {
        id: 'domain-email',
        name: { hu: 'Domain és céges e-mail', en: 'Domain and company e-mail' },
        problem: {
          hu: 'Saját domain a te nevedre, és egy info@ cím gmailes helyett, ami megbízhatóbbnak tűnik a levelek címzettjeinek.',
          en: 'Your own domain in your name, and an info@ address instead of a Gmail one, which looks more trustworthy to the people you write to.',
        },
        forWho: {
          hu: 'Annak, aki még gmailes címről ír az ügyfeleknek, vagy nem tudja, kinek a nevén van a domainje.',
          en: 'For anyone still writing to customers from a Gmail address, or unsure whose name their domain is in.',
        },
        includes: [
          { hu: 'Domain regisztrálása vagy átvétele a te nevedre', en: 'The domain registered or moved into your name' },
          { hu: 'Céges e-mail beállítása telefonra és gépre', en: 'Company e-mail set up on phone and computer' },
          { hu: 'Beállítások, hogy a leveleid ne a spamben landoljanak', en: 'Settings so your mail does not land in spam' },
        ],
        priceHuf: 30000,
        priceUnit: 'flat',
        timeline: { hu: 'Jellemzően 1-2 nap', en: 'Usually 1-2 days' },
        isNew: true,
      },

      {
        id: 'felujitas',
        name: { hu: 'Meglévő weboldal felújítása', en: 'Overhauling the site you have' },
        problem: {
          hu: 'A meglévő oldalad marad, csak működni fog: gyorsan betölt, és a fontos gomb ott lesz, ahol keresik.',
          en: 'You keep the site you have, it just starts working: quick to load, and the button that matters where people look for it.',
        },
        forWho: {
          hu: 'Akkor éri meg, ha a tartalom és a megjelenés alapvetően jó. Ha nem, azt az átvilágításban megmondom, és inkább újat javaslok.',
          en: 'Worth doing when the content and the look are basically sound. If they are not, I say so in the audit and suggest building new instead.',
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
    id: 'eladas',
    title: { hu: 'Kevesebb telefon', en: 'Fewer phone calls' },
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
        demo: 'https://demo-napi-menu.vercel.app',
        proof: {
          hu: 'A bemutatóban átvételi időt csak annyira előre ad, amennyi a konyhának kell, és a pult nézetben látod a blokkot.',
          en: 'In the demo, pickup times start only as early as the kitchen needs, and the counter view shows the slip.',
        },
      },
      {
        id: 'szallasfoglalo',
        name: { hu: 'Közvetlen szállásfoglalás', en: 'Direct booking for your rooms' },
        problem: {
          hu: 'A vendég a saját oldaladon látja a szabad szobákat és a végösszeget, és ott is foglal, nem egy portálon, ami minden foglalásból jutalékot visz.',
          en: 'Guests see the free rooms and the full price on your own site and book there, not on a portal that takes a commission on every stay.',
        },
        forWho: {
          hu: 'Vendégháznak, panziónak, apartmannak, amelyik a foglalásai nagy részét ma portálon keresztül kapja.',
          en: 'For a guesthouse, B&B or apartment that gets most of its bookings through a portal today.',
        },
        includes: [
          { hu: 'Szabad szobák a kiválasztott napokra', en: 'Free rooms for the chosen dates' },
          { hu: 'Végösszeg idegenforgalmi adóval együtt', en: 'The full price, tourist tax included' },
          { hu: 'Foglalási lista és e-mail értesítés', en: 'A booking list and an e-mail for each booking' },
          { hu: 'Ha ugyanaz a szoba portálon is fent van, a dupla foglalást kézzel kell kizárni, ezt előre megbeszéljük', en: 'If the same room is also on a portal, double bookings need ruling out by hand, and we agree how up front' },
        ],
        priceHuf: TIER_FLOORS.booking,
        timeline: { hu: 'Átadás jellemzően 3-6 hét', en: 'Delivered in 3-6 weeks, typically' },
        demo: 'https://demo-szallas.vercel.app',
        isNew: true,
        proof: {
          hu: 'A bemutatóban egymás mellett látszik, mennyivel olcsóbb közvetlenül foglalni, mint portálon.',
          en: 'The demo shows side by side how much cheaper it is to book direct than through a portal.',
        },
      },
      {
        id: 'arkalkulator',
        name: { hu: 'Árkalkulátor, árajánlat-készítő', en: 'Price estimator, quote builder' },
        problem: {
          hu: 'A látogató a weboldaladon megtudja, nagyjából mennyibe kerül és meddig tart, mielőtt felhív, te pedig kész igénnyel kapod meg az érdeklődést.',
          en: 'Visitors find out roughly what it costs and how long it takes on your site before they call, and the enquiry reaches you with the details already filled in.',
        },
        forWho: {
          hu: 'Annak, akit naponta hívnak azzal, hogy „mennyibe kerülne”, és a hívások fele ott el is akad.',
          en: 'For anyone who gets "how much would it be?" calls every day, half of which go nowhere.',
        },
        includes: [
          { hu: 'Kalkulátor a te áraiddal és szabályaiddal', en: 'A calculator with your prices and your rules' },
          { hu: 'Árajánlatkérés a kiválasztott tételekkel', en: 'A quote request with the chosen items attached' },
          { hu: 'Az árakat később te is módosíthatod', en: 'Prices you can change later yourself' },
        ],
        priceHuf: 590000,
        timeline: { hu: 'Átadás jellemzően 2-4 hét', en: 'Delivered in 2-4 weeks, typically' },
        demo: 'https://demo-ugyved.vercel.app',
        isNew: true,
        proof: {
          hu: 'A bemutató ügyvédi irodában ügytípusonként előre látszik a várható díj és időtartam.',
          en: 'In the law office demo the expected fee and duration show up front for each case type.',
        },
      },
      {
        id: 'szervizfelvetel',
        name: { hu: 'Hibabejelentő és szervizfelvétel', en: 'Fault reports and repair intake' },
        problem: {
          hu: 'Az ügyfél a weboldalon megmutatja, mi a baj, látja a várható árat és határidőt, és munkalapszámmal követi a javítást, ahelyett hogy naponta telefonálna.',
          en: 'Customers show what is wrong on your site, see the likely price and deadline, and follow the repair by job number instead of calling every day.',
        },
        forWho: {
          hu: 'Telefon-, számítógép-, kerékpár- vagy autószerviznek, ahol a „kész már?” hívások viszik el a napot.',
          en: 'For a phone, computer, bike or car repair shop where "is it ready yet?" calls eat up the day.',
        },
        includes: [
          { hu: 'Hibabejelentés a weboldalon', en: 'Fault reports on your site' },
          { hu: 'Várható ár és határidő a hiba típusa szerint', en: 'Likely price and deadline by type of fault' },
          { hu: 'Javítás követése munkalapszámmal', en: 'Repairs tracked by job number' },
          { hu: 'Munkalista, amit te kezelsz', en: 'A job list you run yourself' },
        ],
        priceHuf: 450000,
        timeline: { hu: 'Átadás jellemzően 3-5 hét', en: 'Delivered in 3-5 weeks, typically' },
        demo: 'https://demo-javito.vercel.app',
        isNew: true,
        proof: {
          hu: 'A bemutatóban a szétszedett telefon hibás rétegére bökve ott látszik az ár és a határidő.',
          en: 'In the demo, tapping the faulty layer of a phone taken apart shows the price and the deadline.',
        },
      },
      {
        id: 'termekvalaszto',
        name: { hu: 'Termék- és ajándékválasztó', en: 'Product and gift picker' },
        problem: {
          hu: 'A vásárló pár kérdés alapján a te készletedből kap ajánlatot, és félreteteti, amit kiválasztott. Nem webshop: a fizetés és az átvétel nálad történik.',
          en: 'Shoppers answer a few questions, get picks from your own stock, and have them put aside for collection. Not a webshop: payment and pickup happen in your shop.',
        },
        forWho: {
          hu: 'Ajándékboltnak, virágboltnak, kisboltnak, ahol a vásárló tanácsot kér, de a teljes webshop túl nagy falat.',
          en: 'For a gift shop, florist or small shop where customers ask for advice but a full webshop would be too much.',
        },
        includes: [
          { hu: 'Választó a te termékeiddel', en: 'A picker built on your products' },
          { hu: 'Félretétel kérése, értesítés neked', en: 'Put-aside requests, with a notification to you' },
          { hu: 'Készlet, amit te frissítesz', en: 'Stock you keep up to date yourself' },
        ],
        priceHuf: 450000,
        timeline: { hu: 'Átadás jellemzően 3-5 hét', en: 'Delivered in 3-5 weeks, typically' },
        demo: 'https://demo-ajandekbolt.vercel.app',
        isNew: true,
        proof: {
          hu: 'A bemutatóban az ajándékkereső a készletből ajánl, és a bolt félreteszi.',
          en: 'In the demo the gift finder recommends from stock and the shop puts it aside.',
        },
      },
      {
        id: 'utalvany',
        name: { hu: 'Online ajándékutalvány', en: 'Online gift vouchers' },
        problem: {
          hu: 'Az ajándékutalványt a vevő este, a kanapéról veszi meg kártyával, és azonnal megkapja e-mailben, te pedig egy kattintással ellenőrzöd beváltáskor.',
          en: 'Customers buy a gift voucher from the sofa at night by card and get it by e-mail at once, and you check it with one click when it is redeemed.',
        },
        forWho: {
          hu: 'Masszázsszalonnak, kozmetikának, étteremnek, élményszolgáltatónak: ahol az utalvány ma papíron, kézzel vagy sehogy sem megy.',
          en: 'For massage salons, beauticians, restaurants and experience providers, where vouchers today are paper, handwritten, or not offered at all.',
        },
        includes: [
          { hu: 'Vásárlás online, bankkártyás fizetéssel (Barion vagy Stripe)', en: 'Bought online, paid by card (Barion or Stripe)' },
          { hu: 'Egyedi kódos utalvány PDF-ben, e-mailben', en: 'A voucher with its own code, as a PDF by e-mail' },
          { hu: 'Beváltás ellenőrzése, hogy egy kód csak egyszer menjen át', en: 'Redemption checks, so each code goes through only once' },
          { hu: 'Lista az eladott és beváltott utalványokról', en: 'A list of vouchers sold and redeemed' },
        ],
        proof: {
          hu: 'A masszázs-bemutatóban az utalvány percre szól, és a beírt név és üzenet azonnal megjelenik a kártyán.',
          en: 'In the massage demo the voucher is for minutes, and the name and note appear on the card as you type.',
        },
        demo: 'https://demo-masszazs.vercel.app',
        priceHuf: 450000,
        timeline: { hu: 'Átadás jellemzően 3-5 hét', en: 'Delivered in 3-5 weeks, typically' },
        isNew: true,
      },
    ],
  },
  {
    id: 'folyamatos',
    title: { hu: 'Rend a háttérben', en: 'Order behind the scenes' },
    intro: {
      hu: 'Ha az emlékeztetés, az értékelések és a karbantartás ma fejben vagy füzetben van, vagy azt szeretnéd, hogy az átadás után is legyen, aki figyel az oldalra.',
      en: 'When reminders, reviews and upkeep live in your head or a notebook today, or you want someone still looking after the site once it is handed over.',
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
          /* Split from the free review (2026-10-21, Máté): the free one is a
             quick three-point list; this is the measured, complete version. */
          { hu: 'Mélyebb, mint az ingyenes átvilágítás: mérés, akadálymentesség, a teljes ügyfélút', en: 'Deeper than the free review: measured speed, accessibility, the whole customer path' },
          { hu: 'Írásban, fontossági sorrendben', en: 'In writing, in order of importance' },
          { hu: 'Akkor is a tiéd, ha nem velem csináltatod meg', en: 'Yours to keep, even if someone else does the fixing' },
          { hu: 'Ha velem, az árát beszámítom a javításba', en: 'If I do it, the fee comes off the price of the work' },
        ],
        priceHuf: 45000,
        priceUnit: 'flat',
        timeline: { hu: 'Jellemzően néhány nap', en: 'Usually a few days' },
      },
      {
        id: 'emlekezteto',
        name: { hu: 'Automatikus emlékeztető', en: 'Automatic reminders' },
        problem: {
          hu: 'Az ügyfél magától kap értesítést, amikor esedékes a következő oltás, vizsgálat vagy szerviz, így visszajön, és nem neked kell észben tartanod.',
          en: 'Clients get a reminder by themselves when the next vaccination, check-up or service is due, so they come back without you having to remember.',
        },
        forWho: {
          hu: 'Állatorvosnak, optikának, autószerviznek, fodrásznak: bárkinek, akihez az ügyfél rendszeresen visszatér.',
          en: 'For a vet, optician, garage or hairdresser: anyone whose clients come back on a schedule.',
        },
        includes: [
          { hu: 'Esedékesség a te szabályaid szerint', en: 'Due dates by your own rules' },
          { hu: 'E-mail emlékeztető automatikusan', en: 'E-mail reminders, automatically' },
          { hu: 'SMS is kérhető; az üzenetek díját a szolgáltató számlázza', en: 'SMS on request; the texts are billed by the provider' },
        ],
        priceHuf: 390000,
        timeline: { hu: 'Átadás jellemzően 2-4 hét', en: 'Delivered in 2-4 weeks, typically' },
        demo: 'https://demo-allatorvos.vercel.app',
        isNew: true,
        proof: {
          hu: 'A bemutatóban a teljes oltási naptár a születési dátumból számol.',
          en: 'In the demo the whole vaccination calendar is worked out from the date of birth.',
        },
      },
      /* Upkeep in two tiers. Three from 2026-09-24, because one tier left the
         owner of a quiet one-pager paying for hours they never use; the
         premium tier went with the 2026-10-13 trim. Priced against the
         market check: freelancer basic 10–20e, standard 15–35e a month.
         Standard is the old single offer, unchanged, which is why it keeps
         RETAINER_HUF and the FAQ keeps quoting it. `timeline` carries the
         reply time for a fault, the thing the tiers differ in besides hours. */
      {
        id: 'ertekeles',
        name: { hu: 'Google-értékelés gyűjtő', en: 'Google review collector' },
        problem: {
          hu: 'A látogatás után a vendég egy rövid üzenetet kap egy linkkel, ami egyenesen a Google-értékelésedhez visz. Több értékelés, jobb helyezés a térképen.',
          en: 'After the visit the customer gets a short message with a link straight to your Google review page. More reviews, a better spot on the map.',
        },
        forWho: {
          hu: 'Szalonnak, szerviznek, rendelőnek: ahol a vendég elégedett, csak senki nem kéri meg, hogy írja le.',
          en: 'For salons, garages and clinics, where customers are happy but nobody asks them to say so.',
        },
        includes: [
          { hu: 'Értékeléskérő e-mail a látogatás után', en: 'A review request e-mail after the visit' },
          { hu: 'Közvetlen link a Google-értékelő ablakhoz', en: 'A direct link to the Google review box' },
          { hu: 'Egy vendég csak egyszer kap kérést', en: 'Each customer is asked only once' },
        ],
        priceHuf: 120000,
        timeline: { hu: 'Átadás jellemzően 1-2 hét', en: 'Delivered in 1-2 weeks, typically' },
        isNew: true,
      },

      {
        id: 'uzemeltetes-alap',
        name: { hu: 'Alap karbantartás', en: 'Basic upkeep' },
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
        name: { hu: 'Standard karbantartás', en: 'Standard upkeep' },
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
