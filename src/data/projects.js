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
      hu: 'Bemutató időpontfoglaló fodrászatra: szolgáltatás, naptár, foglalás, admin lista. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo booking flow for a salon: services, calendar, booking, admin list. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Dupla foglalás elleni védelem', en: 'Double-booking prevention' },
      { hu: 'Admin lista PIN-nel', en: 'Admin list with a PIN' },
      { hu: 'Magyar mintaadatok', en: 'Hungarian sample data' },
    ],
    featured: true,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: idopontfoglaloCard,
    imageAlt: {
      hu: 'Szálka Fodrászat bemutató foglaló: szolgáltatások, napválasztó és időpontok',
      en: 'Szalka salon demo booker: services, day picker and time slots',
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
          hu: 'Foglalási felület: szolgáltatások és időpontválasztó',
          en: 'Booking UI: services and time-slot picker',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo02,
        alt: {
          hu: 'Admin lista a bemutató foglalásokkal',
          en: 'Admin list of sample bookings',
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
      hu: 'Bemutató napi menü büfének: mai lap, heti nézet, egyszerű szerkesztő. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo daily menu for a buffet: today\'s board, week view, simple editor. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Mai menü + hét', en: 'Today + week view' },
      { hu: 'Tulaj-szerkesztő', en: 'Owner editor' },
      { hu: 'Magyar mintaadatok', en: 'Hungarian sample data' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary-dark' },
    image: napiMenuCard,
    imageAlt: {
      hu: 'Kispipa Büfé bemutató napi menü: leves, főételek, desszert Ft-ban',
      en: 'Kispipa buffet demo daily menu: soup, mains, dessert in HUF',
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
          hu: 'Mai menü telefonon a Kispipa Büfé bemutatóban',
          en: 'Today menu on a phone in the Kispipa buffet demo',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu02,
        alt: {
          hu: 'Heti áttekintés a napi menükről',
          en: 'Week overview of daily menus',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu03,
        alt: {
          hu: 'Menüszerkesztő admin felület',
          en: 'Menu editor admin screen',
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
      hu: 'Bemutató egyoldalas oldal villanyszerelőnek: mit vállal, hol, hívás gomb, ajánlatkérő. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo one-page site for an electrician: services, area, call button, quote form. My own initiative, not client work.',
    },
    tech: ['Vite', 'HTML', 'CSS'],
    features: [
      { hu: 'Lighthouse mobil: 99 / 100 / 100 / 100', en: 'Mobile Lighthouse: 99 / 100 / 100 / 100' },
      { hu: 'Helyi keresési adat (schema.org)', en: 'Local search data (schema.org)' },
      { hu: 'Ajánlatkérő mezőnkénti hibával', en: 'Quote form with per-field errors' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: bemutatkozoCard,
    imageAlt: {
      hu: 'Kovács Villanyszerelés bemutató oldal: név, szolgáltatások röviden, ajánlatkérés és hívás gomb',
      en: 'Kovacs Electrical demo page: name, services in brief, quote and call buttons',
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
          hu: 'Szolgáltatások listája: négy tétel rövid leírással',
          en: 'Services list: four items with short descriptions',
        },
        width: 1280,
        height: 800,
      },
      {
        src: bemutatkozo02,
        alt: {
          hu: 'Ajánlatkérő űrlap mezőnkénti hibaüzenetekkel',
          en: 'Quote form with per-field error messages',
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
      hu: 'Kormos Autószerviz bemutató: munkák árral és időtartammal, napválasztó és leadási időpontok',
      en: 'Kormos Garage demo: jobs with price and duration, day picker and drop-off times',
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
          hu: 'Időpontfoglalás: munkák listája, kiválasztott fékbetét-csere és nap',
          en: 'Booking: list of jobs, brake pad change and a day selected',
        },
        width: 1280,
        height: 800,
      },
      {
        src: autoszerviz02,
        alt: {
          hu: 'Árajánlatkérés rendszámmal, autóval és a hiba leírásával',
          en: 'Quote request with plate, car and a description of the fault',
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
      hu: 'Habcsók Cukrászda bemutató: tortakínálat, kosár felirattal és átvételi napválasztó',
      en: 'Habcsok patisserie demo: cakes on offer, basket with inscription and pickup day picker',
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
          hu: 'Kínálat és kosár: málnás torta felirattal, somlói tál, kiválasztott átvételi nap',
          en: 'Offer and basket: raspberry cake with inscription, somloi tray, pickup day chosen',
        },
        width: 1280,
        height: 800,
      },
      {
        src: cukraszda02,
        alt: {
          hu: 'Pult nézet: rendelések átvételi nap szerint, napi tortaszámmal',
          en: 'Counter view: orders by pickup day with the daily cake count',
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
      hu: 'Bemutató helyi bolt: termékkatalógus élő készlettel, nyitva/zárva jelzés, félretétel a pultnál. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo local shop: product catalogue with live stock, open/closed badge, hold for pickup at the counter. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Keresés ékezet nélkül is', en: 'Search that ignores accents' },
      { hu: 'Készlet: van / kevés / elfogyott, érkezéssel', en: 'Stock: in / low / out, with arrival date' },
      { hu: 'Félretétel webshop helyett', en: 'Hold for pickup instead of a web shop' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary' },
    image: vasboltCard,
    imageAlt: {
      hu: 'Bárány Vas-Műszaki bemutató: nyitva jelzés, keresés, kategóriák és készletjelzős termékkártyák',
      en: 'Barany Hardware demo: open badge, search, categories and product cards with stock labels',
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
          hu: 'Félretétel ablak: mennyiség, név és telefon, a katalógus fölött',
          en: 'Hold dialog: quantity, name and phone over the catalogue',
        },
        width: 1280,
        height: 800,
      },
      {
        src: vasbolt02,
        alt: {
          hu: 'Bolt nézet: félretett áruk és készlet plusz-mínusz gombokkal',
          en: 'Shop view: items on hold and stock with plus and minus buttons',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/bolt` : '#',
    live: 'https://demo-vasbolt.vercel.app',
  },
]

export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
