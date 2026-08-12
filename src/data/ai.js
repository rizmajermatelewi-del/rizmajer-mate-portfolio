import { forint, priceEn } from './fx.js'

/* These are the newest part of the offer and the page says so out loud.
   Every other section on this site is backed by delivered work; this one is
   not yet, and pretending otherwise would be the exact "corporate enterprise
   SaaS" move the brand is positioned against. The honest framing is also the
   better sales position for an SME owner: a developer who tells you what he
   has and has not done before is a developer who will tell you when a
   feature is a bad idea.

   Price floors follow the 2026 Hungarian market. Chatbot rollouts run
   50-150e as a one-off at agencies, or 25-50e/hó as a hosted subscription;
   a custom build on the business's own content sits at the top of that
   band. Per-workflow automation is priced like a small feature module
   (50-300e at agencies). Voice is the one with no settled Hungarian price:
   it needs telephony, a Hungarian-language voice model and a lot of
   testing, so it carries a higher floor and a scope conversation. */
/* Same two-liner as pricing.js, and deliberately not shared with it: the two
   modules happen to phrase a floor price the same way today, and a helper
   imported across them would make that coincidence load-bearing. One forint
   amount per price is the part that matters, and that is in fx.js. */
/* Leading "from", matching pricing.js — the note there says why the trailing
   "and up" had to go. No price in this section wrapped, and it is changed
   anyway: the two blocks sit on the same page, so a reader scrolling from the
   AI list to the price list would meet the same kind of figure phrased two
   ways. Kept as its own line rather than imported, per the note above. */
const fromPrice = (huf) => ({ hu: `${forint(huf)}-tól`, en: `from ${priceEn(huf)}` })

export const AI_SERVICES = [
  {
    title: { hu: 'Chatbot a weboldaladon', en: 'A chatbot on your site' },
    text: {
      hu: 'A saját anyagaidból válaszol: árak, nyitvatartás, szolgáltatások, gyakori kérdések. Amit nem tud, azt átadja neked ahelyett, hogy kitalálná.',
      en: 'It answers from your own material: prices, opening hours, services, common questions. What it does not know, it hands to you rather than inventing.',
    },
    detail: {
      hu: 'A te tartalmaidra épül, nem egy általános modell találgat. Beállítom, mit válaszolhat meg magától és mikor kell embert hívnia, a beszélgetéseket pedig visszanézheted, így látod, mit kérdeznek tőled valójában.',
      en: 'It is built on your content, rather than a general model guessing. I set what it may answer on its own and when it has to fetch a person, and you can read the conversations back — so you find out what people actually ask you.',
    },
    priceNote: fromPrice(150000),
    scope: {
      hu: `Bevezetés 1-2 hét · üzemeltetés ${forint(35000)}/hó + modellköltség`,
      en: `Set up in 1-2 weeks · running it ${priceEn(35000)} a month, plus model usage`,
    },
  },
  {
    title: { hu: 'Hangalapú asszisztens', en: 'A voice assistant' },
    text: {
      hu: 'Felveszi a telefont, amikor te nem tudod. Foglalást rögzít, kérdésre válaszol, és minden hívásról kapsz egy leiratot.',
      en: 'It picks up the phone when you cannot. It takes a booking, answers a question, and you get a transcript of every call.',
    },
    detail: {
      hu: 'Ez a legösszetettebb a három közül: kell hozzá telefonszolgáltatás, magyar nyelvű hangmodell és sok tesztelés, mielőtt élesben ügyfelekkel beszélne. Ezért is mindig egy szűk, jól körülhatárolt esettel kezdjük, nem a teljes ügyfélszolgálattal.',
      en: 'This is the most involved of the three: it needs telephony, a Hungarian-language voice model and a great deal of testing before it speaks to a real customer. Which is why we always start with one narrow, well-bounded case rather than the whole phone line.',
    },
    priceNote: fromPrice(400000),
    scope: {
      hu: 'Terjedelemtől függ · a hívásdíj külön költség',
      en: 'Depends on the scope · call charges are separate',
    },
  },
  {
    title: { hu: 'Automatizálás és összekötés', en: 'Automation and joining things up' },
    text: {
      hu: 'A meglévő eszközeid beszéljenek egymással. A rendelés magától a táblázatba kerül, az értesítő magától kimegy, a számla magától elkészül.',
      en: 'Getting the tools you already use to talk to each other. The order writes itself into the spreadsheet, the notification sends itself, the invoice makes itself.',
    },
    detail: {
      hu: 'Általában ez hozza vissza leggyorsabban az árát, mert egy konkrét, naponta ismétlődő kézi lépést szüntet meg. Folyamatonként árazom, így nem kell egyben megrendelned mindent: kezdjük azzal, ami a legtöbb idődet viszi.',
      en: 'This is usually the quickest to pay for itself, because it removes one specific manual step you repeat every day. I price it per process, so you do not have to order all of it at once: we start with whatever takes the most of your time.',
    },
    priceNote: fromPrice(90000),
    scope: {
      hu: 'Folyamatonként · jellemzően néhány nap',
      en: 'Per process · usually a few days',
    },
  },
]
