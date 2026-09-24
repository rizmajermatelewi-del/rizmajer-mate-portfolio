/* The three steps a client walks through, moved out of Protocol.jsx so the
   knowledge generator can read them. The photographs stay in the component:
   they are Vite asset imports and are decorative (every imageAlt is '').

   The `num` field ('01', '02', '03') is gone. It fed the large watermark
   numeral, which was removed for contrast reasons; nothing has rendered it
   since, and Protocol.jsx keys on the index. Translating a dead field would
   have been the only work it ever caused. */
export const PROTOCOL_STEPS = [
  {
    title: { hu: 'Egyeztetés', en: 'We talk it through' },
    tagline: { hu: 'Előbb beszéljünk, kötelezettség nélkül.', en: 'We talk first, with no commitment.' },
    promise: { hu: 'Fix ár írásban, ingyenes látványterv', en: 'A fixed written price, a free mock-up' },
    text: {
      hu: 'Végigvesszük, mi az, ami ma kézzel megy, és mennyi időt visz el. Ebből írásos terjedelem és fix ár lesz: mielőtt bármit elkezdenék, tudod, mit kapsz és mennyiért. Ha kiderül, hogy nem éri meg neked, azt is megmondom. Weboldalnál, ha kéred, a főoldalról ingyenes látványtervet is kapsz, mielőtt döntesz.',
      en: 'We go through what you do by hand today and how much time it takes. That becomes a written scope and a fixed price: before I start anything, you know what you are getting and what it costs. If it turns out not to be worth it for you, I will tell you that too. For a site, if you ask, you also get a free mock-up of the home page before you decide.',
    },
  },
  {
    title: { hu: 'Tervezés és fejlesztés', en: 'Design and build' },
    tagline: { hu: 'Menet közben látod, hol tart.', en: 'You watch it take shape.' },
    promise: { hu: 'Élő előnézeti link végig', en: 'A live preview link throughout' },
    text: {
      hu: 'Kapsz egy linket, amin az épülő oldal végig megnézhető. Nem a végén szembesülsz az eredménnyel: amíg alakul, olcsó változtatni rajta. Nem egy megvásárolt sablonra épül, ezért később bővíteni lehet, nem elölről kezdeni.',
      en: 'You get a link where you can see the site as it is being built. You are not handed the finished thing at the end and asked to approve it: while it is still moving, changing it is cheap. It is not built on a bought template, so later it can be extended rather than started over.',
    },
  },
  {
    title: { hu: 'Tesztelés és átadás', en: 'Testing and handover' },
    tagline: { hu: 'Tesztelve adom ki.', en: 'It ships tested.' },
    promise: { hu: 'A domain és a kód a tiéd', en: 'The domain and the code are yours' },
    text: {
      hu: 'Minden változtatás után automatikusan lefutnak az ellenőrzések, élesítés előtt pedig telefonon, tableten és több böngészőben is végigmegyek rajta. Ha valami elromlik, az nálam derül ki, nem akkor, amikor egy vevőd épp fizetne. Átadom a hozzáféréseket, és megmutatom, hogyan kezeld. A domain és a kód a tiéd marad.',
      en: 'Automated checks run after every change, and before launch I go through it on a phone, on a tablet and in several browsers. If something breaks, I find out rather than a customer of yours halfway through paying. I hand over the accounts and show you how to run it. The domain and the code stay yours.',
    },
  },
  {
    title: { hu: 'Utána', en: 'Afterwards' },
    tagline: { hu: 'A leadás után sem tűnök el.', en: 'I do not disappear at delivery.' },
    promise: { hu: 'Válasz egy munkanapon belül', en: 'A reply within one working day' },
    text: {
      hu: 'Kérdésre, hibára vagy bővítésre egy munkanapon belül reagálok — akkor is, ha nincs karbantartási szerződésed. Ha szeretnéd, az üzemeltetést is átveszem havidíjért: frissítések, mentés, apró módosítások, és ha leáll, én veszem észre.',
      en: 'I answer a question, a fault or a request for more within one working day — maintenance contract or not. If you want, I take over running it for a monthly fee: updates, backups, small changes, and if it goes down I notice first.',
    },
  },
]
