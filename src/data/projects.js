import { neutral } from '../i18n/t.js'
import idopontfoglaloCard from '../assets/demos/idopontfoglalo-card.webp'
import idopontfoglalo01 from '../assets/demos/idopontfoglalo-01.webp'
import idopontfoglalo02 from '../assets/demos/idopontfoglalo-02.webp'
import napiMenuCard from '../assets/demos/napi-menu-card.webp'
import napiMenu01 from '../assets/demos/napi-menu-01.webp'
import napiMenu02 from '../assets/demos/napi-menu-02.webp'
import napiMenu03 from '../assets/demos/napi-menu-03.webp'
import bemutatkozoCard from '../assets/demos/bemutatkozo-card.webp'
import bemutatkozo01 from '../assets/demos/bemutatkozo-01.webp'
import bemutatkozo02 from '../assets/demos/bemutatkozo-02.webp'
import autoszervizCard from '../assets/demos/autoszerviz-card.webp'
import autoszerviz01 from '../assets/demos/autoszerviz-01.webp'
import autoszerviz02 from '../assets/demos/autoszerviz-02.webp'
import cukraszdaCard from '../assets/demos/cukraszda-card.webp'
import cukraszda01 from '../assets/demos/cukraszda-01.webp'
import cukraszda02 from '../assets/demos/cukraszda-02.webp'
import vasboltCard from '../assets/demos/vasbolt-card.webp'
import vasbolt01 from '../assets/demos/vasbolt-01.webp'
import vasbolt02 from '../assets/demos/vasbolt-02.webp'
import edzoteremCard from '../assets/demos/edzoterem-card.webp'
import edzoterem01 from '../assets/demos/edzoterem-01.webp'
import edzoterem02 from '../assets/demos/edzoterem-02.webp'
import fogaszatCard from '../assets/demos/fogaszat-card.webp'
import fogaszat01 from '../assets/demos/fogaszat-01.webp'
import fogaszat02 from '../assets/demos/fogaszat-02.webp'
import konyveloCard from '../assets/demos/konyvelo-card.webp'
import konyvelo01 from '../assets/demos/konyvelo-01.webp'
import konyvelo02 from '../assets/demos/konyvelo-02.webp'
import viragboltCard from '../assets/demos/viragbolt-card.webp'
import viragbolt01 from '../assets/demos/viragbolt-01.webp'
import viragbolt02 from '../assets/demos/viragbolt-02.webp'
import masszazsCard from '../assets/demos/masszazs-card.webp'
import masszazs01 from '../assets/demos/masszazs-01.webp'
import masszazs02 from '../assets/demos/masszazs-02.webp'
import asztalosCard from '../assets/demos/asztalos-card.webp'
import asztalos01 from '../assets/demos/asztalos-01.webp'
import asztalos02 from '../assets/demos/asztalos-02.webp'

/* Demo apps live in a **separate** public repo (DEMOS) and each has its own
   Vercel project. This portfolio only stores screenshots + links. */

const DEMOS_REPO = 'https://github.com/rizmajermatelewi-del/DEMOS'
const DEMOS_REPO_READY = true

export const PROJECTS_FULL = [
  {
    title: {
      hu: 'Időpontfoglaló — Szálka Fodrászat',
      en: 'Booking — Szalka Hair Salon',
    },
    text: {
      hu: 'Bemutató időpontfoglaló fodrászatra: az időpontválasztó egy fésű, fél óránként egy foggal, a foglalt fog letört. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo booking flow for a salon: the time picker is a comb, one tooth per half hour, with booked teeth broken off. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Fésű alakú időpontválasztó', en: 'Comb-shaped time picker' },
      { hu: 'Dupla foglalás elleni védelem', en: 'Double-booking prevention' },
      { hu: 'Admin lista PIN-nel', en: 'Admin list with a PIN' },
    ],
    featured: true,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: idopontfoglaloCard,
    imageAlt: {
      hu: 'Szálka Fodrászat bemutató: zöld-rózsaszín plakátcím és kör alakú fotó egy hajszárításról',
      en: 'Szalka salon demo: green and pink poster headline with a round photo of a blow-dry',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis fodrászatnak kell egy egyszerű, telefonról is használható foglaló — anélkül, hogy Excelben vagy üzenetben egyeztessen.',
      en: 'A small salon needs a simple booker that works on a phone — without coordinating in Excel or chat.',
    },
    solution: {
      hu: 'Szolgáltatásválasztó, szabad sávok, foglalási űrlap, megerősítő képernyő és admin lista. A demó localStorage-ben fut; élesben Supabase + e-mail jön.',
      en: 'Service picker, free slots, booking form, confirmation screen and admin list. The demo uses localStorage; production would add Supabase + email.',
    },
    gallery: [
      {
        src: idopontfoglalo01,
        alt: {
          hu: 'Nyitóoldal: a szalon neve plakátbetűkkel, foglalás gomb és fotó',
          en: 'Landing: the salon name in poster type, booking button and photo',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo02,
        alt: {
          hu: 'A fésű: egy 90 perces festés három foga kiemelkedik, a zárás előtti fogak sötétek, mert oda már nem fér be',
          en: 'The comb: three teeth rise for a 90-minute colour, the teeth before closing are dark because it no longer fits',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/idopontfoglalo` : '#',
    live: 'https://demo-idopontfoglalo.vercel.app',
  },
  {
    title: {
      hu: 'Napi menü — Kispipa Büfé',
      en: 'Daily menu — Kispipa Buffet',
    },
    text: {
      hu: 'Bemutató napi menü büfének: a menü betűtáblán jelenik meg, betűnként kitűzve, heti nézettel és szerkesztővel. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo daily menu for a buffet: the menu appears on a felt letterboard, pinned letter by letter, with a week view and an editor. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Betűtábla, betűnként kitűzve', en: 'Felt letterboard, pinned letter by letter' },
      { hu: 'Szerkesztő élő tábla-előnézettel', en: 'Editor with a live board preview' },
      { hu: 'Hétvégén már a hétfői menü látszik', en: 'On weekends the board shows Monday' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary-dark' },
    image: napiMenuCard,
    imageAlt: {
      hu: 'Kispipa Büfé bemutató: a menü fehér betűkkel egy tölgyfakeretes filctáblán, sárga kockás abroszon',
      en: 'Kispipa buffet demo: the menu in white letters on an oak-framed felt board, on a yellow gingham cloth',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'A kisvendéglő a napi menüt gyakran papírlapról fotózza Facebookra — a vendég nem találja, a tulaj nehezen frissíti.',
      en: 'A small eatery often posts the daily menu as a photo of a printout on Facebook — hard to find, hard to update.',
    },
    solution: {
      hu: 'Nyilvános mai menü, heti áttekintés, jelszavas szerkesztő. A demó localStorage-ben ment; élesben Supabase auth + tábla.',
      en: 'Public today board, week overview, password editor. The demo saves to localStorage; production would use Supabase auth + a table.',
    },
    gallery: [
      {
        src: napiMenu01,
        alt: {
          hu: 'Nyitóoldal: a következő nyitvatartási nap menüje a betűtáblán',
          en: 'Landing: the next open day\'s menu on the letterboard',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu02,
        alt: {
          hu: 'Heti nézet: napválasztó fülek, a tábla minden napnál újra kirakva',
          en: 'Week view: day tabs, the board set again for each day',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu03,
        alt: {
          hu: 'Szerkesztő: az űrlap mellett élőben látszik, hogyan kerül ki a menü a táblára',
          en: 'Editor: next to the form, a live preview of the menu on the board',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/napi-menu` : '#',
    live: 'https://demo-napi-menu.vercel.app',
  },
  {
    title: {
      hu: 'Bemutatkozó oldal — Kovács Villanyszerelés',
      en: 'One-page site — Kovacs Electrical',
    },
    text: {
      hu: 'Bemutató egyoldalas oldal villanyszerelőnek: az ajánlatkérőben kismegszakítók felkapcsolásával választod ki a munkát. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo one-page site for an electrician: in the quote form you pick the job by flipping circuit breakers. My own initiative, not client work.',
    },
    tech: ['Vite', 'HTML', 'CSS'],
    features: [
      { hu: 'Ajánlatkérő kismegszakítókkal', en: 'Quote form with circuit breakers' },
      { hu: 'Élő státusz-LED a nyitvatartásból', en: 'Live status LED from the opening hours' },
      { hu: 'Lighthouse mobil: 99 / 100 / 100 / 100', en: 'Mobile Lighthouse: 99 / 100 / 100 / 100' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: bemutatkozoCard,
    imageAlt: {
      hu: 'Kovács Villanyszerelés bemutató: nagy nagybetűs cím szürke dobozszínen, státusz-LED és fotó egy mérésről',
      en: 'Kovacs Electrical demo: big uppercase headline on enclosure grey, a status LED and a photo of a measurement',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy szakiparosnak nem webshop kell, hanem egy oldal, ami telefonon azonnal betölt, megmondja, mit vállal és hol, és egy koppintással hívható.',
      en: 'A tradesperson does not need a shop, just a page that loads instantly on a phone, says what they do and where, and can be called with one tap.',
    },
    solution: {
      hu: 'Egy oldal sima HTML-lel és CSS-sel, keretrendszer nélkül, egy rövid scripttel az űrlaphoz. Helyi vállalkozás schema.org adattal. A bemutató űrlapja nem küld e-mailt; élesben egy űrlapszolgáltatás kerülne mögé.',
      en: 'One page in plain HTML and CSS, no framework, with a short script for the form. Local business schema.org data. The demo form sends no email; production would put a form service behind it.',
    },
    gallery: [
      {
        src: bemutatkozo01,
        alt: {
          hu: 'Nyitóoldal: cím, ajánlatkérés és hívás gomb, fejlécben a státusz-LED',
          en: 'Landing: headline, quote and call buttons, the status LED in the header',
        },
        width: 1280,
        height: 800,
      },
      {
        src: bemutatkozo02,
        alt: {
          hu: 'Elosztótábla az ajánlatkérőben: két kismegszakító felkapcsolva, a LED-jük és a leírásuk világít',
          en: 'Breaker panel in the quote form: two breakers on, their LEDs and descriptions lit',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/bemutatkozo` : '#',
    live: 'https://demo-bemutatkozo.vercel.app',
  },
  {
    title: {
      hu: 'Időpont és árajánlat — Kormos Autószerviz',
      en: 'Booking and quotes — Kormos Garage',
    },
    text: {
      hu: 'Bemutató autószerviz-oldal: műhelyidő foglalása rendszámmal, árajánlatkérés a hiba leírásával, műhely nézet. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo garage site: book a workshop slot by number plate, request a quote by describing the fault, workshop view. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Csak az a sáv látszik, amibe a munka belefér', en: 'Only slots the whole job fits into' },
      { hu: 'Rendszám-ellenőrzés (régi és új formátum)', en: 'Hungarian plate check (old and new format)' },
      { hu: 'Foglalás és ajánlatkérés egy műhelylistában', en: 'Bookings and quote requests in one workshop list' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: autoszervizCard,
    imageAlt: {
      hu: 'Kormos Autószerviz bemutató: papír munkalap munkákkal és árakkal, mellette egy szerelő fotója',
      en: 'Kormos Garage demo: a paper work order with jobs and prices, next to a photo of a mechanic',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis szervizben a telefon egész nap csörög: mikor hozhatom, mennyi lesz. A szerelő a kocsi alól veszi fel, az időpont füzetbe kerül, az ajánlat fejben marad.',
      en: 'In a small garage the phone rings all day: when can I bring it, how much will it be. The mechanic answers from under a car, the slot goes into a notebook, the quote stays in his head.',
    },
    solution: {
      hu: 'Két belépő: aki tudja, mi kell, foglal; aki csak azt tudja, hogy „kopog”, leírja, és visszahívást kér. A sávszámítás a fodrász-demóból jön, tesztekkel. A demó localStorage-ben fut; élesben adatbázis és SMS-emlékeztető jönne.',
      en: 'Two ways in: people who know what they need book a slot; people who only know it "knocks" describe it and ask for a call back. Slot logic is shared with the salon demo, with tests. The demo uses localStorage; production would add a database and SMS reminders.',
    },
    gallery: [
      {
        src: autoszerviz01,
        alt: {
          hu: 'Munkalap: elvégzendő munkák árral és időtartammal, mellette a műhely fotója',
          en: 'Work order: jobs with price and duration, next to a photo of the workshop',
        },
        width: 1280,
        height: 800,
      },
      {
        src: autoszerviz02,
        alt: {
          hu: 'Leadási nap és időpont, alatta az autó és az ügyfél adatai a munkalapon',
          en: 'Drop-off day and time, with the car and customer fields below on the work order',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/autoszerviz` : '#',
    live: 'https://demo-szerviz.vercel.app',
  },
  {
    title: {
      hu: 'Torta-előrendelés — Habcsók Cukrászda',
      en: 'Cake pre-orders — Habcsok Patisserie',
    },
    text: {
      hu: 'Bemutató cukrászda-oldal: torta és tálca előrendelése felirattal, átvételi nappal és időponttal, pult nézet. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo patisserie site: pre-order cakes and trays with an inscription, pickup day and time, counter view. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Átvételi nap az elkészítési idő szerint', en: 'Pickup day follows the baking lead time' },
      { hu: 'Napi tortakapacitás, betelt nap', en: 'Daily cake capacity, full days' },
      { hu: 'Felirat tortánként', en: 'Inscription per cake' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary-dark' },
    image: cukraszdaCard,
    imageAlt: {
      hu: 'Habcsók Cukrászda bemutató: retró kirakat napellenzővel, neon felirat és egy szelet torta',
      en: 'Habcsok patisserie demo: retro shop front with an awning, a neon sign and a slice of cake',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'A tortarendelés telefonon és Messengeren jön, egy füzetbe kerül, és péntek este derül ki, hogy szombatra több torta van felírva, mint amennyi belefér.',
      en: 'Cake orders arrive by phone and Messenger, go into a notebook, and on Friday night it turns out Saturday has more cakes than the kitchen can make.',
    },
    solution: {
      hu: 'A legkorábbi átvételi napot a szabály számolja (torta két nap, tálca egy, 14:00 után plusz egy), a betelt napot a napi kapacitás jelzi, és mentéskor újra ellenőrzi. Fizetés átvételkor.',
      en: 'The earliest pickup day comes from the rules (cakes two days, trays one, plus a day after 14:00), full days come from daily capacity, re-checked on save. Payment on pickup.',
    },
    gallery: [
      {
        src: cukraszda01,
        alt: {
          hu: 'Nyitóoldal: napellenzős kirakat, neon felirat és egy szelet torta',
          en: 'Landing: striped awning, neon sign and a slice of cake',
        },
        width: 1280,
        height: 800,
      },
      {
        src: cukraszda02,
        alt: {
          hu: 'Tortakínálat szeletszámmal, mellette a doboz: átvételi nap, időpont és adatok',
          en: 'Cakes with slice counts, next to the box: pickup day, time and details',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/cukraszda` : '#',
    live: 'https://demo-cukraszda.vercel.app',
  },
  {
    title: {
      hu: 'Készlet és félretétel — Bárány Vas-Műszaki',
      en: 'Stock and hold-for-pickup — Barany Hardware',
    },
    text: {
      hu: 'Bemutató helyi bolt: a katalógus egy szerszámtábla, ahol ami elfogyott, annak csak a körvonala marad. Élő készlet, félretétel a pultnál. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo local shop: the catalogue is a pegboard where a sold-out item leaves only its outline. Live stock, hold for pickup at the counter. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Árnyéktábla: az elfogyott áru helye üres', en: 'Shadow board: sold-out items leave an outline' },
      { hu: 'Keresés ékezet nélkül is', en: 'Search that ignores accents' },
      { hu: 'Félretétel webshop helyett', en: 'Hold for pickup instead of a web shop' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary' },
    image: vasboltCard,
    imageAlt: {
      hu: 'Bárány Vas-Műszaki bemutató: lyukacsos farost tábla, kampón lógó termékek árcédulával, Dymo-címkés kategóriák',
      en: 'Barany Hardware demo: a pegboard with products hanging on hooks over price tags, Dymo-tape categories',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis vas-műszaki boltot leginkább azért hívnak, hogy van-e raktáron és meddig vannak nyitva. Aki nem telefonál, a nagy barkácsáruházba megy. Egy teljes webshop viszont túl sok neki.',
      en: 'A small hardware shop mostly gets calls asking whether something is in stock and how long they are open. People who do not call go to the big DIY store. A full web shop is too much for it, though.',
    },
    solution: {
      hu: 'Katalógus élő készlettel és percre pontos nyitvatartással; a vevő félreteheti az árut a következő nyitvatartási nap zárásáig. A tulajdonos telefonról írja át a készletet. A demó localStorage-ben fut.',
      en: 'A catalogue with live stock and to-the-minute opening hours; customers can put items aside until the next open day closes. The owner updates stock from a phone. The demo uses localStorage.',
    },
    gallery: [
      {
        src: vasbolt01,
        alt: {
          hu: 'Nyitóoldal: cím a táblán, keresés, Dymo-címkés kategóriák és a raktáron-kapcsoló',
          en: 'Landing: headline on the board, search, Dymo-tape categories and the in-stock lever',
        },
        width: 1280,
        height: 800,
      },
      {
        src: vasbolt02,
        alt: {
          hu: 'A tábla: kampón lógó termékek árcédulával, az elfogyott szilikonnak csak a szaggatott körvonala látszik',
          en: 'The board: products on hooks with price tags, the sold-out sealant shows only its dashed outline',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/bolt` : '#',
    live: 'https://demo-vasbolt.vercel.app',
  },
  {
    title: { hu: "Havidíj-kalkulátor — Pálfi Könyvelőiroda", en: "Fee calculator — Palfi Accounting" },
    text: {
      hu: "Bemutató könyvelőiroda: a havidíjat egy összeadógép nyomtatja ki papírszalagra, a következő NAV-határidőket egy tépőnaptár mutatja. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo accounting office: an adding machine prints the monthly fee on a paper tape, and a tear-off calendar shows the next tax deadlines. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Havidíj számolószalagon, letéphető", en: "Monthly fee on a tear-off adding-machine tape" },
      { hu: "NAV-határidő tépőnaptár", en: "Tear-off calendar of tax deadlines" },
      { hu: "A számítás csatolódik az ajánlatkéréshez", en: "The calculation attaches to the enquiry" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: konyveloCard,
    imageAlt: {
      hu: "Pálfi Könyvelőiroda bemutató: sötétkék cím és egy tépőnaptár a következő határidővel",
      en: "Palfi Accounting demo: navy headline and a tear-off calendar with the next deadline",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Egy kisvállalkozó két dolgot akar tudni egy könyvelőtől, mielőtt felhívja: mennyibe kerül, és figyel-e a határidőkre. A legtöbb irodai oldal erre csak egy „Kérjen ajánlatot” gombot ad.",
      en: "A small business owner wants to know two things before calling an accountant: what it costs and whether they watch the deadlines. Most office sites only offer a \"request a quote\" button.",
    },
    solution: {
      hu: "Cégforma, bizonylatszám, alkalmazottak és ÁFA alapján azonnal kijön a havidíj, tételesen. A határidők a NAV-naptár szerint számolódnak, hétvégén hétfőre tolva. Mindkettő tesztelt modul, keretrendszer nélkül.",
      en: "Business type, document count, staff and VAT give the monthly fee instantly, line by line. Deadlines follow the tax calendar and move to Monday on weekends. Both are tested modules, no framework.",
    },
    gallery: [
      {
        src: konyvelo01,
        alt: { hu: "Nyitóoldal: cím, két gomb és a tépőnaptár a következő határidővel", en: "Landing: headline, two buttons and the tear-off calendar with the next deadline" },
        width: 1280,
        height: 800,
      },
      {
        src: konyvelo02,
        alt: { hu: "A kalkulátor: kft., két alkalmazott, ÁFA; a gép kinyomtatja a 64 500 Ft-os havidíjat", en: "The calculator: a company, two staff, VAT; the machine prints a 64,500 Ft monthly fee" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/konyvelo` : '#',
    live: 'https://demo-konyvelo.vercel.app',
  },
  {
    title: { hu: "Csokorkötő — Pipacs Virágkötészet", en: "Bouquet builder — Pipacs Florist" },
    text: {
      hu: "Bemutató virágbolt: a csokrot szálanként rakod össze a mai készletből, és élőben kötődik a kraftpapírban. A kártya szövege a masnira kötött cédulán jelenik meg. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo florist: you build the bouquet stem by stem from today's stock and it is tied live in kraft paper. The card text appears on a tag at the bow. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Élő SVG-csokor szálanként", en: "Live SVG bouquet, stem by stem" },
      { hu: "Mai készlet és ár szálanként", en: "Today's stock and price per stem" },
      { hu: "Átvételi nap, vasárnap zárva", en: "Pickup day, closed on Sundays" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: viragboltCard,
    imageAlt: {
      hu: "Pipacs Virágkötészet bemutató: zsályazöld oldal, dőlt pipacspiros cím és egy virágkötő fotója íves keretben",
      en: "Pipacs Florist demo: sage page, italic poppy-red headline and a photo of a florist in an arched frame",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Egy kis virágbolt oldalán általában fotógaléria és telefonszám van. Aki csokrot akar, felhív, és szóban próbálja elmagyarázni, mit szeretne.",
      en: "A small florist site usually has a photo gallery and a phone number. Anyone who wants a bouquet calls and tries to describe it in words.",
    },
    solution: {
      hu: "Csokorkötő a mai vödrökből: a virágok középre, a zöldek szélre kerülnek, a szálak átcsúsznak az új helyükre. Csomagolás, kártya, átvételi nap és napszak. A csokor logikája tesztelt modul.",
      en: "A bouquet builder from today's buckets: flowers go to the middle, greens to the edge, and stems glide to their new place. Wrapping, card, pickup day and time. The bouquet logic is a tested module.",
    },
    gallery: [
      {
        src: viragbolt01,
        alt: { hu: "Nyitóoldal: cím, csokor-gomb és a bolt fotója", en: "Landing: headline, bouquet button and a photo of the shop" },
        width: 1280,
        height: 800,
      },
      {
        src: viragbolt02,
        alt: { hu: "A csokorkötő: vödrök szálárral és készlettel, mellette a kraftpapíros csokor a kártyával", en: "The builder: buckets with price per stem and stock, next to the kraft-paper bouquet with its card" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/viragbolt` : '#',
    live: 'https://demo-viragbolt.vercel.app',
  },
  {
    title: { hu: "„Hol fáj?” — Oldó Masszázsstúdió", en: "\"Where does it hurt?\" — Oldo Massage Studio" },
    text: {
      hu: "Bemutató masszázsstúdió: a testtérképen megjelölöd, hol fáj, és kezelést, időtartamot, árat és első szabad időpontot kapsz. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo massage studio: mark where it hurts on a body map and get a treatment, length, price and the first free slots. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Testtérkép kezelésajánlással", en: "Body map that recommends a treatment" },
      { hu: "Szabad időpontok a kezelés hosszához", en: "Free slots that fit the treatment length" },
      { hu: "Sötét, lassú, nyugodt felület", en: "Dark, slow, calm interface" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: masszazsCard,
    imageAlt: {
      hu: "Oldó Masszázsstúdió bemutató: sötét palaszürke oldal, terrakotta cím és egy masszázsfotó kavics alakú keretben",
      en: "Oldo Massage demo: dark slate page, terracotta headline and a massage photo in a pebble-shaped frame",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Aki masszázsra jelentkezik, ritkán tudja, hogy svéd, sport vagy talp kell neki. Azt tudja, hol fáj. A legtöbb szalon oldala mégis a kezelések nevével kezd.",
      en: "People booking a massage rarely know whether they need Swedish, sports or foot massage. They know where it hurts. Most salon sites still start with treatment names.",
    },
    solution: {
      hu: "A fájó zónák és az erősség alapján ajánl kezelést, egy mondat indoklással, majd a kezelés hosszához illő szabad időpontokat mutat, zárás előtt befejezve. Mindkettő tesztelt modul.",
      en: "From the sore zones and how bad it is, it recommends a treatment with a one-line reason, then shows free slots that fit its length and end before closing. Both are tested modules.",
    },
    gallery: [
      {
        src: masszazs01,
        alt: { hu: "Nyitóoldal: cím, két gomb és a masszázsfotó egy légző gyűrűben", en: "Landing: headline, two buttons and the massage photo inside a breathing ring" },
        width: 1280,
        height: 800,
      },
      {
        src: masszazs02,
        alt: { hu: "A testtérkép: a váll és a derék felmelegszik, az ajánlás hát- és derékmasszázs 45 percre", en: "The body map: shoulders and lower back warm up, the recommendation is a 45-minute back massage" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/masszazs` : '#',
    live: 'https://demo-masszazs.vercel.app',
  },
  {
    title: { hu: "Szekrény méretre — Szálirány Asztalosműhely", en: "Cabinet to size — Szalirany Joinery" },
    text: {
      hu: "Bemutató asztalos: a szekrényt a műszaki rajzon húzod méretre, választasz faanyagot, és azonnal látod a becsült árat és a szabásjegyzéket. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo joinery: drag the cabinet to size on a technical drawing, pick a wood, and see the estimate and the cut list at once. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Húzható méretek a rajzon", en: "Drag-to-size technical drawing" },
      { hu: "Becsült ár és szabásjegyzék", en: "Estimate and cut list" },
      { hu: "A rajz csatolódik az ajánlatkéréshez", en: "The drawing attaches to the enquiry" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary' },
    image: asztalosCard,
    imageAlt: {
      hu: "Szálirány Asztalosműhely bemutató: nagybetűs cím kék kézírással és egy asztalos a műhelyben",
      en: "Szalirany Joinery demo: uppercase headline with blue handwriting and a carpenter in the workshop",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Asztalosnál az első kérdés mindig az, hogy nagyjából mennyi lenne. Erre általában csak felmérés után jön válasz, addig a vevő nem tudja, belefér-e.",
      en: "The first question for a joiner is always roughly how much. The answer usually comes only after a site visit, so the customer cannot tell whether it fits the budget.",
    },
    solution: {
      hu: "Elölnézeti rajz méretvonalakkal és húzható fogantyúkkal; mélység, polcok, ajtó és faanyag. A szabásjegyzékből élőben számol anyagot, vasalatot és munkadíjat. A számítás tesztelt modul.",
      en: "A front elevation with dimension lines and drag handles; depth, shelves, doors and wood. It prices board, hardware and labour live from the cut list. The calculation is a tested module.",
    },
    gallery: [
      {
        src: asztalos01,
        alt: { hu: "Nyitóoldal: cím kézírásos kiemeléssel és a műhely fotója", en: "Landing: headline with a handwritten accent and a photo of the workshop" },
        width: 1280,
        height: 800,
      },
      {
        src: asztalos02,
        alt: { hu: "A rajztábla: 100 × 200 cm-es diófa szekrény méretvonalakkal, mellette a becsült ár", en: "The drawing board: a 100 × 200 cm walnut cabinet with dimension lines, next to the estimate" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/asztalos` : '#',
    live: 'https://demo-asztalos.vercel.app',
  },
  {
    title: { hu: "Bérlet a rúdon — Súlypont Edzőterem", en: "Membership on the bar — Sulypont Gym" },
    text: {
      hu: "Bemutató edzőterem: a bérletet súlytárcsákként pakolod a rúdra, minden extra egy színes tárcsa, a rúd súlya mellett a havidíj. Mai órák szabad hellyel. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo gym: you load the membership onto a barbell, every extra is a coloured bumper plate, and the monthly fee sits next to the bar weight. Today's classes with free spots. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Bérlet súlytárcsákból", en: "Membership built from bumper plates" },
      { hu: "Mai órák élő szabad hellyel", en: "Today's classes with live free spots" },
      { hu: "Ingyenes első edzés a bérlettel csatolva", en: "Free first session with the membership attached" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: edzoteremCard,
    imageAlt: {
      hu: "Súlypont Edzőterem bemutató: nagy, fekete-piros kondenzált cím és egy felhúzásra készülő sportoló fotója",
      en: "Sulypont Gym demo: large black and red condensed headline and a photo of a lifter setting up a deadlift",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Az edzőtermek árlistája általában öt bérlettípus egy táblázatban. Aki csak gépezni és néha szaunázni jár, nem tudja, melyik az övé, és fizet azért is, amit nem használ.",
      en: "Gym price lists are usually five membership types in a table. Someone who only lifts and sometimes uses the sauna cannot tell which is theirs, and pays for things they never use.",
    },
    solution: {
      hu: "Az alapbérlet a rúd, az extrák tárcsák a súlyemelő színkódja szerint; a legnehezebb kerül a zárhoz, mindkét oldalra. Hűségkedvezmény, mai órák szabad hellyel, ingyenes próbaedzés. A számítás tesztelt modul.",
      en: "The base membership is the bar, extras are plates in the weightlifting colour code, heaviest next to the collar on both sides. Commitment discount, today's classes with free spots, a free trial. The pricing is a tested module.",
    },
    gallery: [
      {
        src: edzoterem01,
        alt: { hu: "Nyitóoldal: nagy cím, két gomb és egy sportoló a gumipadlón", en: "Landing: big headline, two buttons and a lifter on a rubber floor" },
        width: 1280,
        height: 800,
      },
      {
        src: edzoterem02,
        alt: { hu: "A rúd: személyi edzés, csoportos órák, szauna és törölköző tárcsaként, mellette a havidíj", en: "The bar: personal training, classes, sauna and towel as plates, next to the monthly fee" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/edzoterem` : '#',
    live: 'https://demo-edzoterem.vercel.app',
  },
  {
    title: { hu: "Fogszín-skála — Zománc Fogászat", en: "Shade guide — Zomanc Dental" },
    text: {
      hu: "Bemutató fogászat: a fogorvosi színskálán beállítod a mostani és a kívánt fogszínt, a mosoly átszíneződik, és kiírja a fehérítés árát. Mellé a következő sürgősségi időpont. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo dental practice: set your current and wished tooth shade on the dental shade guide, the smile recolours and the whitening is priced. Plus the next emergency slot. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "VITA fogszín-skála mosoly-előnézettel", en: "VITA shade guide with a smile preview" },
      { hu: "Fehérítési terv és ár", en: "Whitening plan and price" },
      { hu: "Következő sürgősségi időpont", en: "Next emergency slot" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: fogaszatCard,
    imageAlt: {
      hu: "Zománc Fogászat bemutató: türkiz-sötétzöld cím és egy fogorvos, aki a mosolygó pácienssel beszélget",
      en: "Zomanc Dental demo: teal and dark green headline and a dentist talking with a smiling patient",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Fogorvoshoz sokan félve mennek, két kérdéssel: mi fog történni, és mennyibe kerül. Fehérítésnél azt sem tudják, mennyit várhatnak.",
      en: "Many people go to the dentist nervous, with two questions: what will happen and what it costs. For whitening they do not even know what to expect.",
    },
    solution: {
      hu: "A 16 árnyalatú skálán csúszkával vagy kattintással állítható a szín, a mosoly-rajz átszíneződik, és kiírja az alkalmak számát és az árat. A sürgősségi időpontot a valódi órából számolja. Mindkettő tesztelt modul.",
      en: "The 16-shade guide is set with sliders or by clicking, the smile drawing recolours, and it shows the number of sessions and the price. The emergency slot comes from the real clock. Both are tested modules.",
    },
    gallery: [
      {
        src: fogaszat01,
        alt: { hu: "Nyitóoldal: cím, két gomb, a rendelő fotója és a sürgősségi sáv", en: "Landing: headline, two buttons, a photo of the surgery and the emergency band" },
        width: 1280,
        height: 800,
      },
      {
        src: fogaszat02,
        alt: { hu: "A fogszín-skála: A3-ról A1-re három alkalom, a mosoly már a cél színében", en: "The shade guide: A3 to A1 in three sessions, the smile already in the target shade" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/fogaszat` : '#',
    live: 'https://demo-fogaszat.vercel.app',
  },
]

export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
