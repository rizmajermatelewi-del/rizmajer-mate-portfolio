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
    tagline: { hu: 'Először meghallgatlak.', en: 'First I listen.' },
    text: {
      hu: 'Végigvesszük, mi az, ami ma kézzel megy, és mennyi időt visz el. Ebből írásos terjedelem és fix ár lesz: mielőtt bármit elkezdenék, tudod, mit kapsz és mennyiért.',
      en: 'We go through what you do by hand today and how much time it takes. That becomes a written scope and a fixed price: before I start anything, you know what you are getting and what it costs.',
    },
  },
  {
    title: { hu: 'Tervezés és fejlesztés', en: 'Design and build' },
    tagline: { hu: 'Menet közben látod, hol tart.', en: 'You watch it take shape.' },
    text: {
      hu: 'Kapsz egy linket, amin az épülő oldal végig megnézhető. Nem a végén szembesülsz az eredménnyel: amíg alakul, olcsó változtatni rajta.',
      en: 'You get a link where you can see the site as it is being built. You are not handed the finished thing at the end and asked to approve it: while it is still moving, changing it is cheap.',
    },
  },
  {
    title: { hu: 'Átadás és támogatás', en: 'Handover and support' },
    tagline: { hu: 'A leadás után sem tűnök el.', en: 'I do not disappear at delivery.' },
    text: {
      hu: 'Élesítés előtt telefonon, tableten és több böngészőben is végigmegyek rajta. Átadom a hozzáféréseket, és megmutatom, hogyan kezeld. A domain és a kód a tiéd marad.',
      en: 'Before launch I go through it on a phone, on a tablet and in several browsers. I hand over the accounts and show you how to run it. The domain and the code stay yours.',
    },
  },
]
