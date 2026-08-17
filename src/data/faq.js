import { forint, priceEn } from './fx.js'
import { TIER_FLOORS } from './pricing.js'

/* The objections an SME actually raises before hiring.
   Moved out of Faq.jsx so the knowledge generator can read the same answers
   the page shows — one source, so the bot and the page cannot disagree. */
export const FAQ_QUESTIONS = [
  {
    q: { hu: 'Mennyibe kerül egy weboldal?', en: 'What does a website cost?' },
    /* "belső rendszer" was retired from pricing.js because no internal system
       has been built for anyone, so quoting one is a seven-figure price for a
       category never delivered. The FAQ went on saying it — the claim survived
       in the one file that feeds both the page and the chatbot.

       The figures are built from forint amounts rather than typed into the
       sentence, for the same reason. faq.test.js still reads the numbers back
       out of pricing.js and fails if the two disagree, so a price moved there
       and forgotten here is caught rather than published. */
    a: {
      /* Figures come from TIER_FLOORS rather than being typed here. This
         sentence has now gone stale twice against the tiers it quotes — and it
         is the worst place on the site for that, because prerender.mjs feeds
         these answers into the FAQPage structured data, which is the copy
         Google reproduces in a search result. A visitor could be quoted one
         price by the listing and another by the page. */
      hu: `Egy bemutatkozó weboldal ${forint(TIER_FLOORS.intro)}-tól, egy foglalási vagy rendelési rendszer ${forint(TIER_FLOORS.booking)}-tól, egy egyedi üzleti rendszer ${forint(TIER_FLOORS.system)}-tól indul. Ezek indulóárak: a végleges árat a funkciók és a projekt összetettsége alapján, a munka megkezdése előtt rögzítjük — írásban, tételesen.`,
      en: `An introductory website starts at ${priceEn(TIER_FLOORS.intro)}, a booking or ordering system at ${priceEn(TIER_FLOORS.booking)}, and a business system of your own at ${priceEn(TIER_FLOORS.system)}. Those are starting prices: the final one is set from the features and the complexity of the project, in writing and itemised, before any work begins.`,
    },
  },
  {
    q: { hu: 'Mi kerül még pénzbe a fejlesztésen túl?', en: 'What costs money besides the build itself?' },
    a: {
      hu: 'A domain és a tárhely éves díja — ezek nem nálam futnak, hanem a te nevedre regisztráljuk, így pontosan látod, mit fizetsz és kinek. Ezen felül csak akkor van további költség, ha kérsz karbantartást vagy új funkciót. Az ajánlatban ezt előre tételesen leírom, hogy ne utólag derüljön ki.',
      en: 'The yearly domain and hosting fees — those do not run through me, they are registered in your name, so you can see exactly what you pay and to whom. Beyond that there is no further cost unless you ask for maintenance or a new feature. I itemise all of it in the quote up front, rather than letting it surface afterwards.',
    },
  },
  {
    q: { hu: 'WordPress vagy egyedi fejlesztés legyen?', en: 'WordPress or a custom build?' },
    a: {
      hu: 'Attól függ, mit csinál az oldal. Ha bemutatkozásról és néhány aloldalról van szó, egy kész rendszer olcsóbb és gyorsabb — ilyenkor nincs értelme egyedit építeni. Ha viszont foglalni, rendelni vagy belső folyamatot kezelni kell, ott a kész bővítmények általában vagy nem azt tudják, ami kell, vagy havidíjasak. Az első egyeztetésen megmondom, melyik éri meg neked — akkor is, ha az a kevesebb munka nekem.',
      en: 'It depends what the site has to do. If it is an introduction and a few subpages, an off-the-shelf system is cheaper and quicker — there is no sense building custom for that. If it has to take bookings or orders, or run a process inside the business, ready-made plugins usually either do not do quite what you need or charge monthly for it. I will tell you which is worth it at the first call, including when that is the smaller job for me.',
    },
  },
  {
    q: { hu: 'Mennyi idő alatt készül el?', en: 'How long does it take?' },
    a: {
      hu: 'Egy egyoldalas bemutatkozó jellemzően 1–2 hét, egy egyedi funkciókkal bíró webalkalmazás 3–6 hét. A pontos ütemezést az első egyeztetésen rögzítjük, és tartom is.',
      en: 'A one-page introductory site is typically 1-2 weeks; a web application with custom features, 3-6 weeks. We fix the exact schedule at the first call, and I keep to it.',
    },
  },
  {
    q: { hu: 'Mi történik, ha nem tetszik, amit csinálsz?', en: 'What if I do not like what you build?' },
    a: {
      hu: 'Nem a végén látod először. Menet közben folyamatosan megmutatom, hol tart, így a korrekció olcsó marad ahelyett, hogy a leadáskor derülne ki. Az egyeztetési körök számát és a félbeszakadás feltételeit az ajánlatban rögzítjük, hogy egyikünket se érje meglepetés.',
      en: 'You are not seeing it for the first time at the end. I show you where it stands as it goes, so correcting something stays cheap instead of surfacing on delivery day. The number of review rounds and the terms for stopping are both written into the quote, so neither of us gets a surprise.',
    },
  },
  {
    q: { hu: 'Ki tartja karban az oldalt utána?', en: 'Who looks after the site afterwards?' },
    a: {
      hu: `Ahogy megbeszéljük. Az oldalt úgy építem, hogy a tartalmat magad is tudd kezelni, és az átadáskor megmutatom, hogyan. Ha inkább rám bíznád, a karbantartás ${forint(25000)}/hó-tól: frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható.`,
      en: `Whatever we agree. I build it so you can handle the content yourself, and I show you how at handover. If you would rather leave it to me, upkeep starts at ${priceEn(25000)} a month: updates, backups, an hour of small changes, and if it goes down I notice rather than you. No minimum term, cancellable monthly.`,
    },
  },
  {
    q: { hu: 'Mobilon is jól fog működni?', en: 'Will it work properly on a phone?' },
    a: {
      hu: 'Igen, és ezt nem utólag ragasztom rá. A látogatók nagyobb része telefonon érkezik, ezért a mobil nézet ugyanolyan súllyal készül, mint az asztali. Ide tartozik az is, hogy billentyűzettel és képernyőolvasóval is használható legyen — webshopoknál és bizonyos szolgáltatásoknál ez ma már uniós előírás, máshol pedig egyszerűen több elérhető ügyfelet jelent.',
      en: 'Yes, and it is not bolted on afterwards. Most visitors arrive on a phone, so the mobile view gets the same weight as the desktop one. That includes being usable with a keyboard and a screen reader — for online shops and certain services that is now an EU requirement, and everywhere else it simply means more customers who can reach you.',
    },
  },
  {
    q: { hu: 'Kié lesz a kód és a domain?', en: 'Who owns the code and the domain?' },
    a: {
      hu: 'A tiéd. A forráskódot átadom, a domaint és a tárhelyet a te nevedre regisztráljuk — nem kerülsz függő helyzetbe, és bármikor tovább tudsz lépni máshoz.',
      en: 'Yours. I hand over the source code, and the domain and hosting are registered in your name — you are not left dependent on me, and you can move to somebody else whenever you want.',
    },
  },
]
