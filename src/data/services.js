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
  system: 1500000,
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
        id: 'rendeles',
        name: { hu: 'Rendelésfelvétel, napi menü', en: 'Ordering and daily menus' },
        problem: {
          hu: 'A mai menü és az árak a weboldaladon, nem egy lefotózott papírlapon — és a rendelés is ott érkezik be.',
          en: 'Today\'s menu and prices on your site rather than on a photographed sheet of paper — and orders come in there too.',
        },
        forWho: {
          hu: 'Büfének, étteremnek, cukrászdának, ahol naponta változik a kínálat.',
          en: 'For a buffet, restaurant or bakery whose offer changes daily.',
        },
        includes: [
          { hu: 'Mai és heti menü, amit te szerkesztesz', en: 'Today\'s and this week\'s menu, edited by you' },
          { hu: 'Rendelésfelvétel vagy előrendelés', en: 'Orders or pre-orders taken online' },
          { hu: 'Értesítés minden új rendelésről', en: 'A notification for every new order' },
        ],
        priceHuf: TIER_FLOORS.booking,
        timeline: { hu: 'Átadás jellemzően 3-6 hét', en: 'Delivered in 3-6 weeks, typically' },
        demo: 'https://demo-napi-menu.vercel.app',
      },
      {
        id: 'webshop',
        name: { hu: 'Webshop', en: 'Online shop' },
        problem: {
          hu: 'Termékek, kosár, bankkártyás fizetés és számla — anélkül, hogy egy havidíjas platform szabályaihoz kellene igazodnod.',
          en: 'Products, a basket, card payments and invoices — without bending to a subscription platform\'s rules.',
        },
        forWho: {
          hu: 'Annak, aki kisebb termékkörrel online akar eladni, és a saját oldalán szeretné.',
          en: 'For anyone selling a modest range of products online, who wants it on their own site.',
        },
        includes: [
          { hu: 'Bankkártyás fizetés (Barion vagy SimplePay)', en: 'Card payments (Barion or SimplePay)' },
          { hu: 'Automatikus számla (Számlázz.hu vagy Billingo)', en: 'Invoices issued automatically (Számlázz.hu or Billingo)' },
          { hu: 'Termék- és készletkezelés, amit te használsz', en: 'Product and stock management you run yourself' },
          { hu: 'Rendelési értesítők neked és a vevőnek', en: 'Order e-mails for you and the customer' },
        ],
        priceHuf: 890000,
        timeline: { hu: 'Átadás jellemzően 4-8 hét', en: 'Delivered in 4-8 weeks, typically' },
        isNew: true,
      },
      {
        id: 'utalvany',
        name: { hu: 'Utalvány, bérlet, jegy online', en: 'Vouchers, passes and tickets online' },
        problem: {
          hu: 'Ajándékutalványt, bérletet vagy jegyet adsz el online, a vevő azonnal megkapja e-mailben, te pedig beváltáskor egy kattintással ellenőrzöd.',
          en: 'You sell gift vouchers, passes or tickets online; the buyer gets theirs by e-mail at once, and you check it with one click when it is redeemed.',
        },
        forWho: {
          hu: 'Szalonnak, stúdiónak, edzőteremnek, rendezvényszervezőnek.',
          en: 'For a salon, studio, gym or event organiser.',
        },
        includes: [
          { hu: 'Online vásárlás bankkártyával', en: 'Bought online by card' },
          { hu: 'Egyedi kód vagy QR e-mailben', en: 'A unique code or QR sent by e-mail' },
          { hu: 'Beváltás és egyenleg nyomon követése', en: 'Redemptions and balances tracked' },
        ],
        priceHuf: 320000,
        timeline: { hu: 'Átadás jellemzően 2-3 hét', en: 'Delivered in 2-3 weeks, typically' },
        isNew: true,
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
        id: 'landing',
        name: { hu: 'Kampány- vagy landing oldal', en: 'Campaign or landing page' },
        problem: {
          hu: 'Egy ajánlat, egy cél: ahová a hirdetésed visz, és ahol a látogató egy dolgot tud tenni — jelentkezik, foglal, vásárol.',
          en: 'One offer, one goal: where your ad lands people, and where they can do exactly one thing — sign up, book, buy.',
        },
        forWho: {
          hu: 'Annak, aki hirdet, akciót indít vagy egy új szolgáltatást vezet be, és tudni akarja, működik-e.',
          en: 'For anyone running ads, a promotion or a new service, who wants to know whether it works.',
        },
        includes: [
          { hu: 'Egy oldal egy ajánlatra, gyors betöltéssel', en: 'One page for one offer, quick to load' },
          { hu: 'Jelentkezés vagy ajánlatkérés, ami hozzád fut be', en: 'Sign-ups or enquiries that come straight to you' },
          { hu: 'Mérés: hányan jöttek, hányan jelentkeztek', en: 'Measured: how many came, how many signed up' },
        ],
        priceHuf: 150000,
        timeline: { hu: 'Átadás jellemzően 1 hét', en: 'Delivered in about a week, typically' },
        isNew: true,
      },
      {
        id: 'cegoldal',
        name: { hu: 'Többoldalas céges oldal, saját szerkesztéssel', en: 'Multi-page business site you edit yourself' },
        problem: {
          hu: 'Több szolgáltatás, csapat, referenciák, hírek — és a szöveget, képeket te cseréled, nem kell minden vesszőért engem hívnod.',
          en: 'Several services, a team, references, news — and you change the text and pictures yourself, without calling me for every comma.',
        },
        forWho: {
          hu: 'Annak, akinek egy oldal már kevés, és rendszeresen frissülő tartalma van.',
          en: 'For anyone who has outgrown one page and has content that changes regularly.',
        },
        includes: [
          { hu: 'Szolgáltatásonként külön oldal, hogy keresőből is megtaláljanak', en: 'A page per service, so search finds each one' },
          { hu: 'Szerkesztőfelület szövegre, képre, hírekre', en: 'An editor for text, pictures and news' },
          { hu: 'Betanítás, hogy magad is boldogulj vele', en: 'A walkthrough, so you can run it yourself' },
          { hu: 'Élesítés és átadás', en: 'Put live and handed over' },
        ],
        priceHuf: 420000,
        timeline: { hu: 'Átadás jellemzően 2-4 hét', en: 'Delivered in 2-4 weeks, typically' },
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
      {
        id: 'atepites',
        name: { hu: 'Meglévő oldal átépítése', en: 'Rebuilding the site you have' },
        problem: {
          hu: 'Ha a mostani oldal lassú sablon vagy elavult WordPress, amihez már hozzányúlni is kockázat: újraépítem, a tartalmad és a keresőben elért helyed megtartásával.',
          en: 'When the current site is a slow template or an ageing WordPress install that is risky to touch: I rebuild it, keeping your content and the place you have earned in search.',
        },
        forWho: {
          hu: 'Annak, akinek már van oldala, de a felújítás nem elég.',
          en: 'For anyone who already has a site, where an overhaul is not enough.',
        },
        includes: [
          { hu: 'Új, gyors oldal a meglévő tartalomra', en: 'A new, fast site around your existing content' },
          { hu: 'A régi címek átirányítva, hogy ne vesszen el a keresőforgalom', en: 'Old addresses redirected, so search traffic is not lost' },
          { hu: 'Költözés a domainnel és e-mailekkel együtt', en: 'The move, including your domain and e-mail' },
        ],
        priceHuf: 350000,
        timeline: { hu: 'Átadás jellemzően 2-4 hét', en: 'Delivered in 2-4 weeks, typically' },
        isNew: true,
      },
    ],
  },
  {
    id: 'rendszerek',
    title: { hu: 'Rendszerek és automatizálás', en: 'Systems and automation' },
    intro: {
      hu: 'Ha a munkád táblázatokban, jegyzetekben és kézzel átmásolt adatokban él.',
      en: 'When your work lives in spreadsheets, notes and data copied across by hand.',
    },
    items: [
      {
        id: 'egyedi-rendszer',
        name: { hu: 'Egyedi üzleti rendszer', en: 'A business system of your own' },
        problem: {
          hu: 'Ügyfelek, munkák, határidők, munkatársak egy helyen — a te folyamatodra szabva, nem egy dobozos szoftverre.',
          en: 'Customers, jobs, deadlines and staff in one place — built around your process, not a boxed product\'s.',
        },
        forWho: {
          hu: 'Annak, aki több belső folyamatot, adatot vagy munkatársat szeretne egy saját rendszerben kezelni.',
          en: 'For anyone who needs several internal processes, or their data and staff, handled in one system of their own.',
        },
        includes: [
          { hu: 'Egyedi adminfelület a te folyamataidra', en: 'An admin system built around your processes' },
          { hu: 'Több munkatárs, külön jogosultságokkal', en: 'Several people, each with their own permissions' },
          { hu: 'Amit ma kézzel másolsz át, magától megy', en: 'What you copy across by hand today happens on its own' },
          { hu: 'A meglévő programjaid összekötve', en: 'The programs you already run, wired together' },
        ],
        priceHuf: TIER_FLOORS.system,
        timeline: { hu: 'Ütemezés a terjedelemtől függ', en: 'Timeline depends on the scope' },
      },
      {
        id: 'arajanlat',
        name: { hu: 'Árajánlat-készítő', en: 'Quote builder' },
        problem: {
          hu: 'A helyszínen, telefonról összeállítod a tételes árajánlatot a saját árlistádból, és az ügyfél még aznap megkapja PDF-ben.',
          en: 'On site, from your phone, you put together an itemised quote from your own price list, and the customer has it as a PDF the same day.',
        },
        forWho: {
          hu: 'Szakiparosnak, kivitelezőnek, szerviznek, aki ma este, Wordben írja az ajánlatokat.',
          en: 'For tradespeople, contractors and repair shops who write quotes in Word, in the evening.',
        },
        includes: [
          { hu: 'Saját árlista és tételsablonok', en: 'Your own price list and line-item templates' },
          { hu: 'Egységes, logós PDF egy gombnyomásra', en: 'A consistent, branded PDF at one tap' },
          { hu: 'Kiküldött ajánlatok listája, állapottal', en: 'A list of quotes sent, with their status' },
        ],
        priceHuf: 590000,
        timeline: { hu: 'Átadás jellemzően 2-4 hét', en: 'Delivered in 2-4 weeks, typically' },
        isNew: true,
      },
      {
        id: 'automatizalas',
        name: { hu: 'Egy folyamat automatizálása', en: 'Automating one process' },
        problem: {
          hu: 'A meglévő eszközeid beszéljenek egymással. A rendelés magától a táblázatba kerül, az értesítő magától kimegy, a számla magától elkészül.',
          en: 'Getting the tools you already use to talk to each other. The order writes itself into the spreadsheet, the notification sends itself, the invoice makes itself.',
        },
        forWho: {
          hu: 'Ha egy nagyobb rendszer most túl nagy lépés: kezdjük egyetlen dologgal, ami ma kézzel megy.',
          en: 'If a bigger system is too big a step right now: we start with one thing that runs by hand today.',
        },
        includes: [
          { hu: 'Egy konkrét, naponta ismétlődő kézi lépés megszüntetve', en: 'One specific manual step you repeat daily, gone' },
          { hu: 'Folyamatonként árazva, nem kell egyben megrendelni mindent', en: 'Priced per process, so you need not order it all at once' },
          { hu: 'E-mail, táblázat, számlázó, naptár összekötve', en: 'E-mail, spreadsheets, invoicing and calendars joined up' },
        ],
        priceHuf: 90000,
        priceUnit: 'process',
        timeline: { hu: 'Folyamatonként · jellemzően néhány nap', en: 'Per process · usually a few days' },
        isNew: true,
      },
      {
        id: 'chatbot',
        name: { hu: 'Chatbot a weboldaladon', en: 'A chatbot on your site' },
        problem: {
          hu: 'A saját anyagaidból válaszol: árak, nyitvatartás, szolgáltatások, gyakori kérdések. Amit nem tud, azt átadja neked ahelyett, hogy kitalálná.',
          en: 'It answers from your own material: prices, opening hours, services, common questions. What it does not know, it hands to you rather than inventing.',
        },
        forWho: {
          hu: 'Annak, akihez naponta ugyanaz a néhány kérdés fut be, gyakran munkaidőn túl.',
          en: 'For anyone who gets the same few questions every day, often out of hours.',
        },
        includes: [
          { hu: 'A te tartalmaidra épül, nem egy általános modell találgat', en: 'Built on your content, not a general model guessing' },
          { hu: 'Beállítod, mikor kell embert hívnia', en: 'You decide when it has to fetch a person' },
          { hu: 'A beszélgetések visszanézhetők', en: 'Conversations you can read back' },
        ],
        priceHuf: 150000,
        timeline: {
          hu: `Bevezetés 1-2 hét · üzemeltetés ${forint(35000)}/hó + modellköltség`,
          en: `Set up in 1-2 weeks · running it ${priceEn(35000)} a month, plus model usage`,
        },
        isNew: true,
      },
      {
        id: 'hangasszisztens',
        name: { hu: 'Hangalapú asszisztens', en: 'A voice assistant' },
        problem: {
          hu: 'Felveszi a telefont, amikor te nem tudod. Foglalást rögzít, kérdésre válaszol, és minden hívásról kapsz egy leiratot.',
          en: 'It picks up the phone when you cannot. It takes a booking, answers a question, and you get a transcript of every call.',
        },
        forWho: {
          hu: 'Annak, aki munka közben nem tudja felvenni a telefont, és emiatt vevőt veszít.',
          en: 'For anyone who cannot answer the phone while working, and loses customers because of it.',
        },
        includes: [
          { hu: 'Magyar nyelvű hangmodell, telefonszámra kötve', en: 'A Hungarian-language voice model on your phone number' },
          { hu: 'Egy szűk, jól körülhatárolt esettel kezdünk', en: 'We start with one narrow, well-bounded case' },
          { hu: 'Leirat minden hívásról', en: 'A transcript of every call' },
        ],
        priceHuf: 400000,
        timeline: { hu: 'Terjedelemtől függ · a hívásdíj külön költség', en: 'Depends on the scope · call charges are separate' },
        isNew: true,
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
      {
        id: 'google',
        name: { hu: 'Google-megjelenés és helyi keresés', en: 'Google listing and local search' },
        problem: {
          hu: 'Hogy amikor valaki a környéken rád keres, meg is találjon: cégprofil, térkép, nyitvatartás, telefonszám, képek — kitöltve és rendben tartva.',
          en: 'So that when somebody nearby searches for you, they actually find you: business profile, map, opening hours, phone number, photographs — filled in and kept straight.',
        },
        forWho: {
          hu: 'Ha még nincs profilod, létrehozom; ha van, de elavult, rendbe rakom.',
          en: 'If you have no profile yet I create one; if you have one that has gone stale, I put it right.',
        },
        includes: [
          { hu: 'Google Cégprofil létrehozása vagy rendbetétele', en: 'Google Business Profile created or put right' },
          { hu: 'Kategóriák, szolgáltatáslista, nyitvatartás, képek', en: 'Categories, services, opening hours, photographs' },
          { hu: 'A hitelesítés végigvitele', en: 'The verification seen through' },
        ],
        priceHuf: 60000,
        timeline: { hu: 'Jellemzően néhány nap, a hitelesítéssel együtt', en: 'Usually a few days, verification included' },
        isNew: true,
      },
      {
        id: 'uzemeltetes',
        name: { hu: 'Üzemeltetés és karbantartás', en: 'Hosting and upkeep' },
        problem: {
          hu: 'Frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te.',
          en: 'Updates, backups, an hour of small changes each month, and if it goes down I notice rather than you.',
        },
        forWho: {
          hu: 'Annak, aki nem akar a weboldala működésével foglalkozni. Nincs hűségidő, hónapra felmondható.',
          en: 'For anyone who would rather not think about keeping their site running. No minimum term, cancellable monthly.',
        },
        includes: [
          { hu: 'Frissítések és biztonsági mentés', en: 'Updates and backups' },
          { hu: 'Havi egy óra apró módosítás', en: 'An hour of small changes each month' },
          { hu: 'Leállásfigyelés', en: 'Downtime monitoring' },
        ],
        priceHuf: RETAINER_HUF,
        priceUnit: 'month',
        timeline: { hu: 'Az átadást követő hónaptól', en: 'From the month after handover' },
      },
    ],
  },
]

export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.items.map((s) => ({ ...s, group: g.id })))
