/* The three steps a client walks through, moved out of Protocol.jsx so the
   knowledge generator can read them. The photographs stay in the component:
   they are Vite asset imports and are decorative (every imageAlt is ''). */
export const PROTOCOL_STEPS = [
  {
    num: '01',
    title: 'Egyeztetés',
    tagline: 'Először meghallgatlak.',
    text: 'Végigvesszük, mi az, ami ma kézzel megy, és mennyi időt visz el. Ebből írásos terjedelem és fix ár lesz: mielőtt bármit elkezdenék, tudod, mit kapsz és mennyiért.',
  },
  {
    num: '02',
    title: 'Tervezés és fejlesztés',
    tagline: 'Menet közben látod, hol tart.',
    text: 'Kapsz egy linket, amin az épülő oldal végig megnézhető. Nem a végén szembesülsz az eredménnyel: amíg alakul, olcsó változtatni rajta.',
  },
  {
    num: '03',
    title: 'Átadás és támogatás',
    tagline: 'A leadás után sem tűnök el.',
    text: 'Élesítés előtt telefonon, tableten és több böngészőben is végigmegyek rajta. Átadom a hozzáféréseket, és megmutatom, hogyan kezeld. A domain és a kód a tiéd marad.',
  },
]
