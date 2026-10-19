import { neutral } from '../i18n/t.js'
import idopontfoglaloCard from '../assets/demos/idopontfoglalo-card.webp'
import idopontfoglalo01 from '../assets/demos/idopontfoglalo-01.webp'
import idopontfoglalo02 from '../assets/demos/idopontfoglalo-02.webp'
import idopontfoglalo03 from '../assets/demos/idopontfoglalo-03.webp'
import napiMenuCard from '../assets/demos/napi-menu-card.webp'
import napiMenu01 from '../assets/demos/napi-menu-01.webp'
import napiMenu02 from '../assets/demos/napi-menu-02.webp'
import napiMenu03 from '../assets/demos/napi-menu-03.webp'
import bemutatkozoCard from '../assets/demos/bemutatkozo-card.webp'
import bemutatkozo01 from '../assets/demos/bemutatkozo-01.webp'
import bemutatkozo02 from '../assets/demos/bemutatkozo-02.webp'
import bemutatkozo03 from '../assets/demos/bemutatkozo-03.webp'
import autoszervizCard from '../assets/demos/autoszerviz-card.webp'
import autoszerviz01 from '../assets/demos/autoszerviz-01.webp'
import autoszerviz02 from '../assets/demos/autoszerviz-02.webp'
import autoszerviz03 from '../assets/demos/autoszerviz-03.webp'
import viragboltCard from '../assets/demos/viragbolt-card.webp'
import viragbolt01 from '../assets/demos/viragbolt-01.webp'
import viragbolt02 from '../assets/demos/viragbolt-02.webp'
import viragbolt03 from '../assets/demos/viragbolt-03.webp'
import masszazsCard from '../assets/demos/masszazs-card.webp'
import masszazs01 from '../assets/demos/masszazs-01.webp'
import masszazs02 from '../assets/demos/masszazs-02.webp'
import masszazs03 from '../assets/demos/masszazs-03.webp'
import szallasCard from '../assets/demos/szallas-card.webp'
import szallas01 from '../assets/demos/szallas-01.webp'
import szallas02 from '../assets/demos/szallas-02.webp'
import szallas03 from '../assets/demos/szallas-03.webp'
import kavezoCard from '../assets/demos/kavezo-card.webp'
import kavezo01 from '../assets/demos/kavezo-01.webp'
import kavezo02 from '../assets/demos/kavezo-02.webp'
import kavezo03 from '../assets/demos/kavezo-03.webp'
import ajandekboltCard from '../assets/demos/ajandekbolt-card.webp'
import ajandekbolt01 from '../assets/demos/ajandekbolt-01.webp'
import ajandekbolt02 from '../assets/demos/ajandekbolt-02.webp'
import ajandekbolt03 from '../assets/demos/ajandekbolt-03.webp'
import javitoCard from '../assets/demos/javito-card.webp'
import javito01 from '../assets/demos/javito-01.webp'
import javito02 from '../assets/demos/javito-02.webp'
import javito03 from '../assets/demos/javito-03.webp'
import bicikliCard from '../assets/demos/bicikli-card.webp'
import bicikli01 from '../assets/demos/bicikli-01.webp'
import bicikli02 from '../assets/demos/bicikli-02.webp'
import bicikli03 from '../assets/demos/bicikli-03.webp'
import optikaCard from '../assets/demos/optika-card.webp'
import optika01 from '../assets/demos/optika-01.webp'
import optika02 from '../assets/demos/optika-02.webp'
import optika03 from '../assets/demos/optika-03.webp'
import allatorvosCard from '../assets/demos/allatorvos-card.webp'
import allatorvos01 from '../assets/demos/allatorvos-01.webp'
import allatorvos02 from '../assets/demos/allatorvos-02.webp'
import allatorvos03 from '../assets/demos/allatorvos-03.webp'
import ugyvedCard from '../assets/demos/ugyved-card.webp'
import ugyved01 from '../assets/demos/ugyved-01.webp'
import ugyved02 from '../assets/demos/ugyved-02.webp'
import ugyved03 from '../assets/demos/ugyved-03.webp'
import tetovaloCard from '../assets/demos/tetovalo-card.webp'
import tetovalo01 from '../assets/demos/tetovalo-01.webp'
import tetovalo02 from '../assets/demos/tetovalo-02.webp'
import tetovalo03 from '../assets/demos/tetovalo-03.webp'

/* Demo apps live in a **separate** public repo (DEMOS) and each has its own
   Vercel project. This portfolio only stores screenshots + links.

   Twelve demos until 2026-10-13; trimmed to the four that back an offer on
   the page (booking, daily menu, one-page site, garage booking and quotes).
   The other eight stay live in the DEMOS repo, just not listed here. */

const DEMOS_REPO = 'https://github.com/rizmajermatelewi-del/DEMOS'
const DEMOS_REPO_READY = true

export const PROJECTS_FULL = [
  {
    title: {
      hu: 'Szálka Fodrászat: szalonoldal foglalással',
      en: 'Szalka Hair Salon: site with booking',
    },
    text: {
      hu: 'Bemutató szalonoldal: az árak egy hajszínkártyán, a fodrászok kerek tükörben a saját legközelebbi szabad időpontjukkal, az időpontválasztó pedig egy fésű, fél óránként egy foggal. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo salon site: prices on a hair-colour swatch ring, stylists in round mirrors with their own next free time, and a comb for picking the time, one tooth per half hour. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Fésű alakú időpontválasztó', en: 'Comb-shaped time picker' },
      { hu: 'Árak hajszínkártyán', en: 'Prices on a swatch ring' },
      { hu: 'Élő következő szabad időpont fodrászonként', en: 'Live next free time per stylist' },
    ],
    featured: true,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: idopontfoglaloCard,
    imageAlt: {
      hu: 'Szálka Fodrászat bemutató: nagy fekete cím piros hajszál-vonallal, mellette fotó egy hajvágásról',
      en: 'Szalka salon demo: large black headline with a red strand line, next to a photo of a haircut',
    },
    year: neutral('2026'),
    role: {
      hu: 'Tervezés, fejlesztés, deploy',
      en: 'Design, build, deploy',
    },
    problem: {
      hu: 'Egy kis fodrászatnak kell egy egyszerű, telefonról is használható foglaló, anélkül, hogy Excelben vagy üzenetben egyeztessen.',
      en: 'A small salon needs a simple booker that works on a phone, without coordinating in Excel or chat.',
    },
    solution: {
      hu: 'Szolgáltatásválasztó, szabad sávok, foglalási űrlap, megerősítő képernyő és admin lista. A demó localStorage-ben fut; élesben Supabase + e-mail jön.',
      en: 'Service picker, free slots, booking form, confirmation screen and admin list. The demo uses localStorage; production would add Supabase + email.',
    },
    gallery: [
      {
        src: idopontfoglalo01,
        alt: {
          hu: 'Nyitóoldal: a szalon neve, foglalás gomb, a legközelebbi szabad időpont és egy hajvágás fotója',
          en: 'Landing: the salon name, booking button, the next free time and a photo of a haircut',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo02,
        alt: {
          hu: 'A hajszínkártya: hat tincs egy tűn, mindegyik egy kezelés árral, a kiválasztott balayage kártyája mellette',
          en: 'The swatch ring: six strands on one pin, each a treatment with its price, the chosen balayage card beside it',
        },
        width: 1280,
        height: 800,
      },
      {
        src: idopontfoglalo03,
        alt: {
          hu: 'A fésű: egy 90 perces festés három foga pirosra vált, a szürke fogakba a kezelés már nem fér bele',
          en: 'The comb: three teeth turn red for a 90-minute colour, the grey teeth are where it no longer fits',
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
      hu: 'Kispipa Büfé: napi menü',
      en: 'Kispipa Buffet: daily menu',
    },
    text: {
      hu: 'Bemutató napi menü büfének: a mai menü betűtáblán, allergénszűrővel. Elvitelre előre lehet rendelni, minden rendelés egy pecsét a telefonos törzskártyán, a hét letéphető naptárlapokon. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo daily menu for a buffet: today\'s menu on a felt letterboard, with an allergen filter. Takeaway can be ordered ahead, every order is a stamp on a loyalty card kept on the phone, and the week sits on tear-off calendar pages. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Betűtábla allergénszűrővel', en: 'Letterboard with an allergen filter' },
      { hu: 'Elviteles rendelés, pult nézettel', en: 'Takeaway orders with a counter view' },
      { hu: 'Pecsétkártya, tizedik ebéd ingyen', en: 'Stamp card, the tenth lunch free' },
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
      hu: 'A kisvendéglő a napi menüt gyakran papírlapról fotózza Facebookra. A vendég nem találja, a tulaj nehezen frissíti.',
      en: 'A small eatery often posts the daily menu as a photo of a printout on Facebook: hard to find, hard to update.',
    },
    solution: {
      hu: 'Nyilvános mai menü, heti áttekintés, jelszavas szerkesztő. A demó localStorage-ben ment; élesben Supabase auth + tábla.',
      en: 'Public today board, week overview, password editor. The demo saves to localStorage; production would use Supabase auth + a table.',
    },
    gallery: [
      {
        src: napiMenu01,
        alt: {
          hu: 'Nyitóoldal: a mai menü a betűtáblán, alatta az allergénszűrő',
          en: 'Landing: today\'s menu on the letterboard, the allergen filter below it',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu02,
        alt: {
          hu: 'A hét letéphető naptárlapokon, alatta a nyitva tábla a tűzhely fotóján',
          en: 'The week on tear-off calendar pages, the open sign hanging on a photo of the stove below',
        },
        width: 1280,
        height: 800,
      },
      {
        src: napiMenu03,
        alt: {
          hu: 'Pecsétkártya: tíz kör, a tizedik ebéd ingyen, alatta a hét ételei fotón',
          en: 'Stamp card: ten circles, the tenth lunch free, with photos of the week\'s dishes below',
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
      hu: 'Kovács Villanyszerelés: villanyszerelő oldal',
      en: 'Kovacs Electrical: electrician site',
    },
    text: {
      hu: 'Bemutató oldal villanyszerelőnek: az árak egy mérőműszer tárcsáján, előtte-utána csúszka, a munkamenet érszínekkel, az ajánlatkérőben pedig kismegszakítókat kapcsolsz fel. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo site for an electrician: prices on a multimeter dial, a before and after slider, the process in wire colours, and a quote form where you flip circuit breakers. My own initiative, not client work.',
    },
    tech: ['Vite', 'HTML', 'CSS'],
    features: [
      { hu: 'Ajánlatkérő kismegszakítókkal', en: 'Quote form with circuit breakers' },
      { hu: 'Árak egy mérőműszer tárcsáján', en: 'Prices on a multimeter dial' },
      { hu: 'Előtte-utána csúszka', en: 'Before and after slider' },
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
          hu: 'A mérőműszer: a gomb a táblacserére fordítva, a kijelzőn az alsó ár és az idő',
          en: 'The multimeter: the knob turned to a panel swap, the display shows the starting price and the time',
        },
        width: 1280,
        height: 800,
      },
      {
        src: bemutatkozo03,
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
      hu: 'Kormos Autószerviz: időpont és árajánlat',
      en: 'Kormos Garage: booking and quotes',
    },
    text: {
      hu: 'Bemutató autószerviz-oldal: a műhely fehértáblája a mai emelőkkel és a következő szabad leadással, műhelyidő foglalása rendszámmal, árajánlatkérés, vizsga előtti ellenőrzőlista. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo garage site: the workshop whiteboard with the lifts of the day and the next free drop-off, booking a slot by number plate, quote requests and a pre-inspection checklist. My own initiative, not client work.',
    },
    tech: ['React', 'Vite'],
    features: [
      { hu: 'Csak az a sáv látszik, amibe a munka belefér', en: 'Only slots the whole job fits into' },
      { hu: 'Rendszám-ellenőrzés (régi és új formátum)', en: 'Hungarian plate check (old and new format)' },
      { hu: 'Fehértábla a mai emelőkkel', en: 'Whiteboard with the lifts of the day' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: autoszervizCard,
    imageAlt: {
      hu: 'Kormos Autószerviz bemutató: nagy cím a három emelőről, mellette a műhely esti fotója',
      en: 'Kormos Garage demo: a big headline about three lifts, next to an evening photo of the workshop',
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
          hu: 'Nyitóoldal: cím, foglalás és ajánlatkérés gomb, a műhely fotója',
          en: 'Landing: headline, booking and quote buttons, a photo of the workshop',
        },
        width: 1280,
        height: 800,
      },
      {
        src: autoszerviz02,
        alt: {
          hu: 'A fehértábla: három emelő rendszám-mágnesekkel állapot szerint, alul a következő szabad leadás',
          en: 'The whiteboard: three lifts with number plate magnets by status, the next free drop-off below',
        },
        width: 1280,
        height: 800,
      },
      {
        src: autoszerviz03,
        alt: {
          hu: 'Munkalap: elvégzendő munkák árral és időtartammal, mellette egy szerelő fotója',
          en: 'Work order: jobs with price and duration, next to a photo of a mechanic',
        },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/autoszerviz` : '#',
    live: 'https://demo-szerviz.vercel.app',
  },
  {
    title: { hu: "Pipacs Virágkötészet: csokorkötő", en: "Pipacs Florist: bouquet builder" },
    text: {
      hu: "Bemutató virágbolt: kész csokrok zsinegen, amelyek egy koppintással a csokorkötőbe kerülnek, ott szálanként rakod össze a mai készletből. Szezonnaptár és ápolási kártya. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo florist: ready bouquets on twine that load into the builder with one tap, where you put the bouquet together stem by stem from today's stock. A season calendar and a care card. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Élő SVG-csokor szálanként", en: "Live SVG bouquet, stem by stem" },
      { hu: "Kész csokrok, betölthetők a kötőbe", en: "Ready bouquets that load into the builder" },
      { hu: "Szezonnaptár hónapokra", en: "Season calendar by month" },
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
        alt: { hu: "Kész csokrok kraft árcédulán, zsinegre akasztva, árral és összetétellel", en: "Ready bouquets on kraft price tags hung from twine, with price and mix" },
        width: 1280,
        height: 800,
      },
      {
        src: viragbolt03,
        alt: { hu: "A csokorkötő egy betöltött csokorral: vödrök, a kraftpapíros csokor a kártyával és az összeg", en: "The builder with a loaded bouquet: buckets, the kraft-paper bouquet with its card and the total" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/viragbolt` : '#',
    live: 'https://demo-viragbolt.vercel.app',
  },
  {
    title: { hu: "Oldó Masszázsstúdió: „Mennyi időd van?”", en: "Oldo Massage Studio: how much time do you have?" },
    text: {
      hu: "Bemutató masszázsstúdió: megadod, mennyi időd van és hol fáj, az oldal percre beosztja a masszázst, kiírja az árat és a beleférő szabad időpontokat. Ajándékutalvány percre, élő előnézettel. Saját kezdeményezés, nem ügyfélmunka.",
      en: "Demo massage studio: say how much time you have and where it hurts, and the site splits the session minute by minute, with the price and the free slots it fits into. A gift voucher in minutes with a live preview. My own initiative, not client work.",
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: "Óra-összerakó percre beosztva", en: "Session builder split by the minute" },
      { hu: "Szabad időpontok a kezelés hosszához", en: "Free slots that fit the treatment length" },
      { hu: "Ajándékutalvány percre", en: "Gift voucher in minutes" },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: masszazsCard,
    imageAlt: {
      hu: "Oldó Masszázsstúdió bemutató: világos lenszínű oldal, agyagszínű cím és egy napfényes kezelőszoba boltíves keretben",
      en: "Oldo Massage demo: a light linen page, a clay-coloured headline and a sunlit treatment room in an arched frame",
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: "Aki masszázsra jelentkezik, ritkán tudja, hogy svéd vagy sport kell neki. Azt tudja, hol fáj, és mennyi ideje van. A legtöbb szalon oldala mégis a kezelések nevével kezd.",
      en: "People booking a massage rarely know whether they need Swedish or sports massage. They know where it hurts and how much time they have. Most salon sites still start with treatment names.",
    },
    solution: {
      hu: "A választott időt 5 perces lépésekben osztja el a területek között, minden területnek jut egy minimum, és ha nem fér bele, megmondja, hány perc kell. Utána a hosszhoz illő szabad időpontokat mutatja, zárás előtt befejezve. Mindkettő tesztelt modul.",
      en: "It splits the chosen time between the areas in 5-minute steps, gives every area a minimum, and says how long is needed when they do not fit. Then it shows free slots that fit the length and end before closing. Both are tested modules.",
    },
    gallery: [
      {
        src: masszazs01,
        alt: { hu: "Nyitóoldal: a „Mennyi időd van?” cím, két gomb és a kezelőszoba fotója boltív alakú keretben", en: "Landing: the how-much-time headline, two buttons and the treatment room in an arched frame" },
        width: 1280,
        height: 800,
      },
      {
        src: masszazs02,
        alt: { hu: "Az óra-összerakó: 60 perc nyakra, hátra és talpra, színes blokkokban percre beosztva, mellette az ár", en: "The session builder: 60 minutes for neck, back and feet, split into coloured blocks by the minute, with the price" },
        width: 1280,
        height: 800,
      },
      {
        src: masszazs03,
        alt: { hu: "Ajándékutalvány 90 percre: a beírt név és üzenet azonnal megjelenik a kártyán, egyéves érvényességgel", en: "A 90-minute gift voucher: the name and note appear on the card as you type, valid for one year" },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/masszazs` : '#',
    live: 'https://demo-masszazs.vercel.app',
  },
  {
    title: { hu: 'Diófa Vendégház: kulcstábla és közvetlen foglalás', en: 'Diofa Guesthouse: a key rack and direct booking' },
    text: {
      hu: 'Bemutató vendégház: a recepciós kulcstáblán csak a kiválasztott napokra szabad szobák kulcsa lóg, az ár IFA-val együtt számolódik, és egymás mellett látszik, mennyivel olcsóbb közvetlenül foglalni, mint portálon. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo guesthouse: only the keys of rooms free on the chosen dates hang on the reception key rack, the price includes the tourist tax, and the direct price sits next to the portal price. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Kulcstábla a szabad szobákkal', en: 'Key rack of the free rooms' },
      { hu: 'Portálár és közvetlen ár egymás mellett', en: 'Portal price next to the direct price' },
      { hu: 'Foglalási kérés SZÉP-kártyás előleggel', en: 'Booking request with a SZEP card deposit' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: szallasCard,
    imageAlt: {
      hu: 'Diófa Vendégház bemutató: fedett tornác hosszú fa asztallal, mellette a nagy zöld cím és a dióbarna recepciós pult a dátummal és a létszámmal',
      en: 'Diofa Guesthouse demo: a covered porch with a long wooden table, the large green name and the walnut reception desk with dates and guests',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'Egy kis vendégház a vendégei nagy részét portálokon kapja, és minden foglalás után kb. 15% jutalékot fizet. A saját oldala többnyire csak fotógaléria telefonszámmal: nem látszik, van-e szabad szoba, mennyibe kerül, és miért érné meg közvetlenül foglalni.',
      en: 'A small guesthouse gets most guests through booking portals and pays about 15% commission on each. Its own site is usually a photo gallery with a phone number: no availability, no price, no reason to book direct.',
    },
    solution: {
      hu: 'A dátum, a létszám és a kutya alapján csak a jó szobák kulcsa lóg a táblán, a foglaltaknál krétával ott van, mikortól szabadok. A szállásjegy soronként számol, az IFA-t csak a felnőttekre. Ha semmi sem jó, egy gomb az első szabad napra ugrik. A kérés végén látszik, mit kap a vendég, és mit lát a gazda: jutalék 0 Ft. A számolás tesztelt modul.',
      en: 'Given the dates, guests and a dog, only the keys of suitable rooms hang; booked hooks say in chalk when they free up. The ticket prices line by line, with tourist tax for adults only. If nothing fits, one button jumps to the first free date. The request ends by showing what the guest gets and what the owner sees: zero commission. The pricing is a tested module.',
    },
    gallery: [
      {
        src: szallas01,
        alt: { hu: 'Nyitóoldal: a tornác fotója, a Diófa Vendégház cím és a recepciós pult érkezéssel, éjszakákkal és létszámmal', en: 'Landing: the porch photo, the Diofa Guesthouse name and the reception desk with arrival, nights and guests' },
        width: 1280,
        height: 800,
      },
      {
        src: szallas02,
        alt: { hu: 'A kulcstábla: két szabad kulcs sárgaréz címkével, két üres kampó krétával, hogy mikortól szabad, mellette a padlásszoba', en: 'The key rack: two free keys with brass tags, two empty hooks with chalk notes on when they free up, and the attic room beside it' },
        width: 1280,
        height: 800,
      },
      {
        src: szallas03,
        alt: { hu: 'Elküldött kérés: a vendég visszaigazoló e-mailje és a gazda telefonos nézete, jutalék 0 Ft', en: 'Request sent: the guest confirmation e-mail and the owner phone view, zero commission' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/szallas` : '#',
    live: 'https://demo-szallas.vercel.app',
  },
  {
    title: { hu: 'Szemközt kávézó és borbár: nappal kávé, este bor', en: 'Szemkozt cafe and wine bar: coffee by day, wine at night' },
    text: {
      hu: 'Bemutató kávézó, ami este borbár: a nap ívén húzott idő átváltja az oldalt nappaliból estébe, és vele a kínálatot is. Az esti programokra szabad hellyel lehet asztalt kérni. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo cafe that turns into a wine bar at night: dragging the sun along its arc switches the whole page from day to evening, menu included. Tables for the evening events can be requested with live seat counts. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Napszak-tárcsa, ami az egész oldalt átszínezi', en: 'A daypart dial that recolours the whole page' },
      { hu: 'Kínálat a választott napszakra', en: 'The menu for the chosen time of day' },
      { hu: 'Esti programok szabad hellyel, asztalkérés', en: 'Evening events with seats left, table requests' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary' },
    image: kavezoCard,
    imageAlt: {
      hu: 'Szemközt bemutató: a kávézó világos fotója, a nagy cím és a napszak-tárcsa, a nap az ív elején',
      en: 'Szemkozt demo: the bright cafe photo, the large headline and the daypart dial with the sun early on its arc',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'Egy kávézó, ami este borbár, valójában két hely: reggel a kávét keresik, este a bort és a programot. Egy átlagos oldal mindkettőt egyszerre mutatja, így egyik sem jön át, és az esti asztalokat telefonon foglalják, ha egyáltalán.',
      en: 'A cafe that becomes a wine bar at night is really two places: people look for coffee in the morning and for wine and events in the evening. A typical site shows both at once, so neither lands, and evening tables get booked by phone, if at all.',
    },
    solution: {
      hu: 'A nyitóoldal teljes képernyős fotója a választott időponthoz úszik át nappaliból estébe; a tárcsa egy ív, amin a nap (este a hold) halad. A kínálat csak napszakváltáskor rajzolódik újra. A programoknál látszik, hány hely maradt, és a kérés a pult nézetével zárul. A nyitvatartás és a programok tesztelt modulból jönnek.',
      en: 'The full-screen landing photo fades from day to evening with the chosen time; the dial is an arc the sun (the moon at night) travels along. The menu redraws only when the daypart changes. Events show the seats left, and a request ends on the bar view. Opening hours and events come from a tested module.',
    },
    gallery: [
      {
        src: kavezo01,
        alt: { hu: 'Nyitóoldal reggel tízkor: a kávézó fotója, a nap az íven', en: 'Landing at 10 am: the cafe photo, the sun on the arc' },
        width: 1280,
        height: 800,
      },
      {
        src: kavezo02,
        alt: { hu: 'Ugyanez este fél tízkor: a borbár fotója, a hold az íven', en: 'The same at 9:30 pm: the wine bar photo, the moon on the arc' },
        width: 1280,
        height: 800,
      },
      {
        src: kavezo03,
        alt: { hu: 'Esti programok szabad hellyel és az asztalkérő űrlap', en: 'Evening events with seats left and the table request form' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/kavezo` : '#',
    live: 'https://demo-kavezo.vercel.app',
  },
  {
    title: { hu: 'Masni Ajándékbolt: ajándék, amit nem kell kitalálni', en: 'Masni gift shop: gifts you do not have to guess' },
    text: {
      hu: 'Bemutató ajándékbolt: a nyitóoldal ajándéka betöltéskor becsomagolja magát, kattintásra kibomlik, és kiugrik belőle három ajánlat a polcról. Az ajándékkereső a készletből ajánl, a csomagolás és a kártya élőben látszik, a bolt félreteszi. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo gift shop: the landing present wraps itself on load and pops open on a click with three picks from the shelf. The gift finder suggests from stock, the wrap and card show live, and the shop holds the gift. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Kibomló ajándék három ajánlattal', en: 'A present that opens with three picks' },
      { hu: 'Ajándékkereső: kinek, mire, mennyiért', en: 'Gift finder: who for, what for, how much' },
      { hu: 'Csomagolás, kártya, félretétel kóddal', en: 'Wrapping, card and a hold code' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: ajandekboltCard,
    imageAlt: {
      hu: 'Masni bemutató: kraftpapír asztal, a nagy cím és a becsomagolt ajándék két polaroid fotó között',
      en: 'Masni demo: a kraft paper table, the big headline and the wrapped present between two polaroids',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'Aki ajándékot keres, nem terméket keres, hanem ötletet. Egy kis bolt oldala többnyire csak fotókat és nyitvatartást mutat, így a vásárló nem tudja meg, van-e jó ötletük a keretéhez, és inkább webáruházban rendel.',
      en: 'Someone buying a gift wants an idea, not a product. A small shop site usually shows photos and opening hours, so the shopper never learns whether there is something for their budget, and orders online instead.',
    },
    solution: {
      hu: 'Három kérdésből (kinek, mire, mennyiért) a valós készletből ajánl, az elfogyottat jelzi. A választott ajándék egy CSS-ből rajzolt csomagon élőben változik a papírral és a kártya szövegével, a végén egy rövid kóddal a következő zárásig félreteszik. Az ajánlás és a félretétel tesztelt modul.',
      en: 'Three questions (who for, what for, how much) suggest from real stock and flag what sold out. The chosen gift is drawn as a CSS present that changes live with the paper and the card text, and a short code holds it until the next closing. Suggestions and holds are a tested module.',
    },
    gallery: [
      {
        src: ajandekbolt01,
        alt: { hu: 'Nyitóoldal: a becsomagolt ajándék a két polaroid között', en: 'Landing: the wrapped present between the two polaroids' },
        width: 1280,
        height: 800,
      },
      {
        src: ajandekbolt02,
        alt: { hu: 'A kibontott ajándék: leugrott a fedél, kiugrott három ajánlat', en: 'The opened present: the lid flies off and three picks pop out' },
        width: 1280,
        height: 800,
      },
      {
        src: ajandekbolt03,
        alt: { hu: 'Becsomagoljuk: a rajzolt csomag a kártyával, a csomagolások és az összeg', en: 'Wrapping: the drawn present with its card, the wrap options and the total' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/ajandekbolt` : '#',
    live: 'https://demo-ajandekbolt.vercel.app',
  },
  {
    title: { hu: 'Csavar Szerviz: mutassa meg, hol fáj neki', en: 'Csavar repair shop: show where it hurts' },
    text: {
      hu: 'Bemutató telefon- és számítógép-szerviz: a nyitóoldalon egy szétszedett telefon rétegei a hibák. A rossz részre bökve ott látszik az ár és hogy mikorra kész, a javítás munkalapszámmal követhető, és van nyomtatási kalkulátor. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo phone and computer repair shop: the landing shows a phone taken apart, and every layer is a fault. Tapping the broken part shows the price and the ready date right there; repairs can be tracked by job number, and there is a print calculator. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Szétszerelt telefon, minden réteg egy hiba', en: 'A phone taken apart, each layer a fault' },
      { hu: 'Árbecslés hőpapír-nyugtán', en: 'An estimate on a thermal receipt' },
      { hu: 'Munkalap-követés pecsétekkel', en: 'Job tracking with stamps' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: javitoCard,
    imageAlt: {
      hu: 'Csavar bemutató: sötét műhelyasztal, a cím és a szétszerelt telefon rétegei',
      en: 'Csavar demo: a dark workbench, the headline and the phone layers pulled apart',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'A szervizbe telefonálók első két kérdése mindig ugyanaz: mennyi és mikorra. A legtöbb szerviz oldala erre nem felel, ezért a telefon egész nap cseng, és aki nem éri el őket, a következő szervizt hívja.',
      en: 'The first two questions anyone calls a repair shop with are always the same: how much and by when. Most shop sites do not answer them, so the phone rings all day, and whoever cannot get through calls the next shop.',
    },
    solution: {
      hu: 'CSS-3D-ben szétnyíló telefon: a kijelző, a keret a töltővel, az alaplap, az akkumulátor és a hátlap egy-egy hiba. A választott réteg fiókként kicsúszik, mellette az ársáv és az elkészülés napja. A teljes becslés eszközre és márkára is számol, hőpapír-nyugta formában. A becslés, a munkalap és a nyomtatás tesztelt modul.',
      en: 'A CSS 3D phone pulls apart: the screen, the frame with the charging port, the board, the battery and the back are one fault each. The chosen layer slides out like a drawer, with the price range and ready date beside it. The full estimate also covers device and brand, printed as a thermal receipt. Estimates, job tracking and printing are a tested module.',
    },
    gallery: [
      {
        src: javito01,
        alt: { hu: 'Nyitóoldal: a kijelző kiválasztva, mellette ár és határidő', en: 'Landing: the screen selected, with price and ready date' },
        width: 1280,
        height: 800,
      },
      {
        src: javito02,
        alt: { hu: 'Az akkumulátor fiókként kicsúszott a kötegből, alatta az ára', en: 'The battery slid out of the stack like a drawer, its price below' },
        width: 1280,
        height: 800,
      },
      {
        src: javito03,
        alt: { hu: 'Árbecslés: eszköz, márka és hiba, jobbra a nyugta', en: 'Estimate: device, brand and fault, the receipt on the right' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/javito` : '#',
    live: 'https://demo-javito.vercel.app',
  },
  {
    title: { hu: 'Küllő Kerékpárszerviz: bökjön rá, mi nem jó rajta', en: 'Kullo bike service: point at what is wrong' },
    text: {
      hu: 'Bemutató kerékpárszerviz: a bicikli rajzán kell rábökni a rossz részre, abból áll össze a munkalap árral és idővel. A rajz görgetésre forog, a kiválasztott alkatrészre nagyít, a leadásnál csak az a nap választható, ahová a munka belefér. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo bike service: tap the broken part on the bike drawing and the work order builds itself with price and time. The drawing spins with the scroll and zooms to the chosen part, and drop-off only offers days the job fits into. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Kattintható bicikli-rajz alkatrészenként', en: 'A clickable bike drawing, part by part' },
      { hu: 'Munkalap, ahol a csomag elnyeli a beállításokat', en: 'A work order where packages absorb the adjustments' },
      { hu: 'Leadás a szabad szerelőidő szerint', en: 'Drop-off by free mechanic time' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: bicikliCard,
    imageAlt: {
      hu: 'Küllő bemutató: sötétkék oldal, a nagy cím és a bicikli rajza számozott pontokkal',
      en: 'Kullo demo: a navy page, the big headline and the bike drawing with numbered points',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'Aki elviszi a biciklijét, többnyire nem tudja, hogy hívják a rossz alkatrészt, és mennyi idő lesz. A szerviz telefonon próbálja kitalálni, a műhelyben pedig egymásra torlódnak a munkák.',
      en: 'Most people bringing a bike in do not know what the broken part is called or how long it takes. The shop guesses over the phone, and jobs pile up in the workshop.',
    },
    solution: {
      hu: 'Öt pont a rajzon (kerék, fék, lánc, váltó, kormány), mindegyik a saját munkáit kínálja; a kiválasztottakból munkalap lesz árral és szerelőidővel, egy csomag elnyeli a benne lévő beállításokat. A leadási napoknál látszik a szabad szerelőidő, és csak az a nap választható, ahová belefér. A számolás tesztelt modul.',
      en: 'Five points on the drawing (wheel, brake, chain, gears, bars), each offering its own jobs; the chosen ones make a work order with price and mechanic time, and a package absorbs the adjustments it includes. Drop-off days show free mechanic time and only the ones the job fits into can be picked. The pricing is a tested module.',
    },
    gallery: [
      {
        src: bicikli01,
        alt: { hu: 'Nyitóoldal: a kerék kiválasztva, mellette a munkái', en: 'Landing: the wheel selected, its jobs beside it' },
        width: 1280,
        height: 800,
      },
      {
        src: bicikli02,
        alt: { hu: 'A kormány kiválasztva: a rajz rá nagyít, mellette a munkák és árak', en: 'The bars selected: the drawing zooms in, jobs and prices beside it' },
        width: 1280,
        height: 800,
      },
      {
        src: bicikli03,
        alt: { hu: 'Munkalap és a leadási napok szabad szerelőidővel', en: 'The work order and drop-off days with free mechanic time' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/bicikli` : '#',
    live: 'https://demo-bicikli.vercel.app',
  },
  {
    title: { hu: 'Lencse Optika: ha a legalsó sort is el tudta olvasni', en: 'Lencse opticians: if you could read the bottom line' },
    text: {
      hu: 'Bemutató optika: a nyitóoldal egy homályos szemtábla, amit egy húzható lencse alatt élesen látni. A recept számait emberi nyelven magyarázza, lencsét ajánl hozzá árral, és arcformához mutat keretet. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo opticians: the landing is a blurred eye chart that turns sharp under a draggable loupe. It explains the prescription numbers in plain language, recommends a lens with a price, and suggests frames for a face shape. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Húzható lencse a homályos táblán', en: 'A draggable loupe on the blurred chart' },
      { hu: 'Recept emberi nyelven, lencseajánlással', en: 'The prescription in plain words, with a lens pick' },
      { hu: 'Keretpróba arcformához, 20 perces vizsgálat', en: 'Frames for a face shape, a 20-minute eye exam' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary' },
    image: optikaCard,
    imageAlt: {
      hu: 'Lencse bemutató: homályos szemtábla nagyítóval, bal oldalt a cím',
      en: 'Lencse demo: a blurred eye chart with a loupe, the headline on the left',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'A szemüvegrecept a legtöbb embernek érthetetlen számsor, és fogalma sincs, mennyibe kerül majd a lencse. Az optikák oldala ritkán segít ebben, így az árat csak a pultnál tudja meg.',
      en: 'To most people a prescription is a meaningless row of numbers, with no idea what the lenses will cost. Optician sites rarely help, so the price is first heard at the counter.',
    },
    solution: {
      hu: 'A tábla két rétegben van: egy elmosott és egy éles másolat, amit a lencse körbe vág; a lencse egérrel, ujjal és nyilakkal is mozgatható. A recept-űrlap negyedes lépésben kér, és soronként elmondja, mit jelent; a dioptria alapján lencseindexet és párárat ajánl. A magyarázat és az ajánlás tesztelt modul.',
      en: 'The chart has two layers: a blurred one and a sharp copy the loupe cuts a circle out of; it moves by mouse, finger or arrow keys. The prescription form takes quarter steps and explains each line; from the power it recommends a lens index and a pair price. The explanation and the recommendation are a tested module.',
    },
    gallery: [
      {
        src: optika01,
        alt: { hu: 'Nyitóoldal: a homályos tábla, a lencse alatt élesen', en: 'Landing: the blurred chart, sharp under the loupe' },
        width: 1280,
        height: 800,
      },
      {
        src: optika02,
        alt: { hu: 'Recept emberi nyelven: OD és OS értékek, magyarázat és lencseajánlás', en: 'The prescription in plain words: OD and OS values, explanation and lens pick' },
        width: 1280,
        height: 800,
      },
      {
        src: optika03,
        alt: { hu: 'Keretpróba: arcforma, keretek és a rajzolt arc szemüveggel', en: 'Frame try-on: face shape, frames and the drawn face wearing them' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/optika` : '#',
    live: 'https://demo-optika.vercel.app',
  },
  {
    title: { hu: 'Mancs Állatorvosi Rendelő: mikor kell a következő oltás?', en: 'Mancs vet clinic: when is the next shot due?' },
    text: {
      hu: 'Bemutató állatorvosi rendelő: a nyitóoldalon egy növekedési vonalzó, amin a kölyök az életkorral halad és nő, az oltások pedig mancsként telnek be. A teljes oltási naptár a születési dátumból számol, és SMS-emlékeztetőt lehet kérni. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo vet clinic: the landing has a growth ruler where the puppy moves and grows with age and the vaccinations fill in as paws. The full schedule is built from the birth date, and an SMS reminder can be requested. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Növekedési vonalzó az oltásokkal', en: 'A growth ruler with the vaccinations' },
      { hu: 'Oltási naptár a születési dátumból', en: 'A vaccination schedule from the birth date' },
      { hu: 'SMS-emlékeztető és ügyeleti állapot', en: 'SMS reminders and on-call status' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
    image: allatorvosCard,
    imageAlt: {
      hu: 'Mancs bemutató: mentazöld oldal, a cím és a növekedési vonalzó a kölyökkel',
      en: 'Mancs demo: a mint page, the headline and the growth ruler with the puppy',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'A gazdák nagy része nem tudja fejből, mikor esedékes a következő oltás, és a kötelező veszettség elleni oltás könnyen elcsúszik. A rendelő telefonon emlékeztet, ha egyáltalán.',
      en: 'Most owners do not know offhand when the next shot is due, and the mandatory rabies shot easily slips. The clinic reminds them by phone, if at all.',
    },
    solution: {
      hu: 'A vonalzó négyzetgyökös léptékű, hogy a sűrű első hónapok is olvashatók legyenek; a kép, a csúszka és a mancsok ugyanazon a skálán vannak. Kutya és macska külön tervet kap. A naptár a múltbeli oltásokat elmaradtnak jelzi, amíg nincs bepipálva, az évente ismétlődőknél a következőt mutatja. A terv és az emlékeztető napja tesztelt modul.',
      en: 'The ruler uses a square-root scale so the busy first months stay readable; the photo, the slider and the paws share that scale. Dogs and cats get their own plans. The schedule marks past shots as missed until ticked and shows the next one for yearly repeats. The plan and the reminder date are a tested module.',
    },
    gallery: [
      {
        src: allatorvos01,
        alt: { hu: '8 hetes kölyök a vonalzón: következik a második kombinált oltás', en: 'An 8-week-old puppy on the ruler: the second combined shot is next' },
        width: 1280,
        height: 800,
      },
      {
        src: allatorvos02,
        alt: { hu: '8 hónapos kölyök: nagyobb kép, öt oltás bepecsételve', en: 'An 8-month-old puppy: a bigger photo, five shots stamped' },
        width: 1280,
        height: 800,
      },
      {
        src: allatorvos03,
        alt: { hu: 'Oltási naptár: elmaradt, hamarosan esedékes és későbbi oltások', en: 'The schedule: missed, due soon and later shots' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/allatorvos` : '#',
    live: 'https://demo-allatorvos.vercel.app',
  },
  {
    title: { hu: 'Dr. Halmi Ügyvédi Iroda: előre megmondjuk, mennyi és meddig', en: 'Dr. Halmi law office: cost and time, up front' },
    text: {
      hu: 'Bemutató ügyvédi iroda: a nyitóoldalon egy dosszié, ügytípusonként egy füllel. A fül előre hozza az aktát a várható díjjal és időtartammal, alatta kinyomtatható „hozza magával” lista és konzultációfoglalás. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo law office: the landing is a case file with a tab per case type. A tab brings that file forward with the expected fee and duration, followed by a printable bring-along checklist and consultation booking. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Dosszié ügytípusonként fülekkel', en: 'A case file with a tab per case type' },
      { hu: 'Díj és időtartam előre', en: 'Fee and duration up front' },
      { hu: '„Hozza magával” lista és konzultáció', en: 'A bring-along checklist and a consultation' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary' },
    image: ugyvedCard,
    imageAlt: {
      hu: 'Dr. Halmi bemutató: borvörös asztal, a cím és a dosszié hat füllel',
      en: 'Dr. Halmi demo: an oxblood desk, the headline and the case file with six tabs',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'Ügyvédhez a legtöbben úgy mennek, hogy nem tudják, mennyibe kerül és meddig tart, és az első találkozóra a fele irat hiányzik. Az irodák oldala többnyire csak szakterületeket sorol.',
      en: 'Most people go to a lawyer without knowing the cost or how long it takes, and half the papers are missing at the first meeting. Most office sites only list practice areas.',
    },
    solution: {
      hu: 'Hat ügytípus, mindegyiknek saját aktája: mit csinálunk, meddig tart, mennyi a díj (ingatlannál a vételár 0,8%-a, legalább 80 000 Ft). A fülek nyilakkal is válthatók, a választás átkerül a részletekhez és az iratlistához, ami pipálható és nyomtatható. A díjszámítás tesztelt modul.',
      en: 'Six case types, each with its own file: what we do, how long it takes, what it costs (property: 0.8% of the price, at least 80,000 HUF). Tabs also switch with arrow keys, and the choice carries into the details and the checklist, which can be ticked and printed. The fee logic is a tested module.',
    },
    gallery: [
      {
        src: ugyved01,
        alt: { hu: 'Ingatlan adásvétel akta: időtartam, díj és a becslés pecsétje', en: 'Property sale file: duration, fee and the estimate stamp' },
        width: 1280,
        height: 800,
      },
      {
        src: ugyved02,
        alt: { hu: 'A Válás fül előrehozva, saját díjjal és időtartammal', en: 'The divorce tab brought forward, with its own fee and duration' },
        width: 1280,
        height: 800,
      },
      {
        src: ugyved03,
        alt: { hu: 'Hozza magával: a kinyomtatható iratlista', en: 'Bring along: the printable document checklist' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/ugyved` : '#',
    live: 'https://demo-ugyved.vercel.app',
  },
  {
    title: { hu: 'Fekete Tinta: előre megmondjuk, mennyi és mennyire fáj', en: 'Fekete Tinta tattoo studio: cost and pain, up front' },
    text: {
      hu: 'Bemutató tetoválószalon: a flash lap mintái stencilként rajzolódnak ki, mindegyiket csak egyszer varrják, a foglalt át van húzva. A becslő a hely, a méret és a stílus alapján ár- és időkeretet, alkalmak számát és fájdalomszintet ad. Saját kezdeményezés, nem ügyfélmunka.',
      en: 'Demo tattoo studio: the flash designs draw themselves as stencils, each is tattooed only once, and taken ones are struck through. The estimator gives a price and time range, the number of sessions and a pain level from placement, size and style. My own initiative, not client work.',
    },
    tech: ['Vite', 'JavaScript'],
    features: [
      { hu: 'Kirajzolódó flash minták egyszeri foglalással', en: 'Flash designs that draw themselves, claimed once' },
      { hu: 'Ár-, alkalom- és fájdalombecslő', en: 'Price, session and pain estimator' },
      { hu: 'Konzultáció referenciaképpel', en: 'Consultation with a reference image' },
    ],
    featured: false,
    label: { hu: 'Bemutató projekt', en: 'Demo project' },
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-primary' },
    image: tetovaloCard,
    imageAlt: {
      hu: 'Fekete Tinta bemutató: fekete-fehér tetoválásfotó, a nagy cím és egy fecske stencil',
      en: 'Fekete Tinta demo: a black and white tattoo photo, the big name and a swallow stencil',
    },
    year: neutral('2026'),
    role: { hu: 'Tervezés, fejlesztés, deploy', en: 'Design, build, deploy' },
    problem: {
      hu: 'Aki tetoválást szeretne, üzenetben teszi fel a stúdiónak ugyanazokat a kérdéseket: mennyi, hány alkalom, mennyire fáj. A válasz napokig tart, és addig máshol is kérdez.',
      en: 'Anyone wanting a tattoo messages the studio the same questions: how much, how many sessions, how painful. Answers take days, and meanwhile the client asks elsewhere.',
    },
    solution: {
      hu: 'A minták SVG-vonalrajzok, amik a lap képernyőre érésekor stencilként rajzolódnak ki, hoverre piros tintával újra; egy minta egyszer foglalható, 18 éven aluliaknak nem. A becslő a testrész, a méret és a stílus alapján számol, legfeljebb 4 órás alkalmakra bontva. A becslés tesztelt modul.',
      en: 'The designs are SVG line art that draws itself as a stencil when the sheet comes into view and redraws in red ink on hover; each can be claimed once, never under 18. The estimator works from body part, size and style, split into sessions of at most 4 hours. The estimate is a tested module.',
    },
    gallery: [
      {
        src: tetovalo01,
        alt: { hu: 'Nyitóoldal: fekete-fehér fotó, a cím és a kirajzolódott fecske', en: 'Landing: the black and white photo, the name and the drawn swallow' },
        width: 1280,
        height: 800,
      },
      {
        src: tetovalo02,
        alt: { hu: 'A flash lap: kirajzolt minták, a foglaltak áthúzva', en: 'The flash sheet: drawn designs, taken ones struck through' },
        width: 1280,
        height: 800,
      },
      {
        src: tetovalo03,
        alt: { hu: 'Becslő: hely, méret, stílus, és a kapott ár, alkalom, fájdalom', en: 'Estimator: placement, size, style, and the resulting price, sessions and pain' },
        width: 1280,
        height: 800,
      },
    ],
    github: DEMOS_REPO_READY ? `${DEMOS_REPO}/tree/main/tetovalo` : '#',
    live: 'https://demo-tetovalo.vercel.app',
  },
]

export const PROJECT_COUNT = PROJECTS_FULL.length
export const LIVE_COUNT = PROJECTS_FULL.filter((p) => p.live).length
export const REPO_COUNT = PROJECTS_FULL.filter((p) => p.github && p.github !== '#').length
