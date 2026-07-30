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
export const AI_SERVICES = [
  {
    title: 'Chatbot a weboldaladon',
    text: 'A saját anyagaidból válaszol: árak, nyitvatartás, szolgáltatások, gyakori kérdések. Amit nem tud, azt átadja neked ahelyett, hogy kitalálná.',
    detail:
      'A te tartalmaidra épül, nem egy általános modell találgat. Beállítom, mit válaszolhat meg magától és mikor kell embert hívnia, a beszélgetéseket pedig visszanézheted, így látod, mit kérdeznek tőled valójában.',
    priceNote: '150 000 Ft-tól',
    scope: 'Bevezetés 1-2 hét · üzemeltetés 35 000 Ft/hó + modellköltség',
  },
  {
    title: 'Hangalapú asszisztens',
    text: 'Felveszi a telefont, amikor te nem tudod. Foglalást rögzít, kérdésre válaszol, és minden hívásról kapsz egy leiratot.',
    detail:
      'Ez a legösszetettebb a három közül: kell hozzá telefonszolgáltatás, magyar nyelvű hangmodell és sok tesztelés, mielőtt élesben ügyfelekkel beszélne. Ezért is mindig egy szűk, jól körülhatárolt esettel kezdjük, nem a teljes ügyfélszolgálattal.',
    priceNote: '400 000 Ft-tól',
    scope: 'Terjedelemtől függ · a hívásdíj külön költség',
  },
  {
    title: 'Automatizálás és összekötés',
    text: 'A meglévő eszközeid beszéljenek egymással. A rendelés magától a táblázatba kerül, az értesítő magától kimegy, a számla magától elkészül.',
    detail:
      'Általában ez hozza vissza leggyorsabban az árát, mert egy konkrét, naponta ismétlődő kézi lépést szüntet meg. Folyamatonként árazom, így nem kell egyben megrendelned mindent: kezdjük azzal, ami a legtöbb idődet viszi.',
    priceNote: '90 000 Ft-tól',
    scope: 'Folyamatonként · jellemzően néhány nap',
  },
]
