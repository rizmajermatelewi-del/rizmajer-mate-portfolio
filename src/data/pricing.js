/* No figures here on purpose. Published prices anchor the conversation
   before the scope is known, and every project gets quoted after a call
   anyway. Each tier states what it is and what it includes; the number
   comes from the conversation. */
export const PRICING_TIERS = [
  {
    eyebrow: '01 / Kezdéshez',
    name: 'Landing Oldal',
    desc: 'Egyoldalas, letisztult weboldal bemutatkozáshoz vagy egy kampányhoz.',
    priceNote: 'Ajánlat egyeztetés után',
    scope: 'Jellemzően 1–2 hét',
    features: ['Reszponzív dizájn', 'Alapvető SEO beállítás', 'Kapcsolati űrlap', 'Élesítés és átadás'],
    highlight: false,
  },
  {
    eyebrow: '02 / Leggyakoribb',
    name: 'Webalkalmazás',
    desc: 'Egyedi funkciókkal rendelkező weboldal vagy admin felület.',
    priceNote: 'Ajánlat egyeztetés után',
    scope: 'Jellemzően 3–6 hét',
    features: ['Egyedi backend & adatbázis', 'Admin / kezelőfelület', 'API integrációk', 'Teljesítmény-optimalizálás'],
    highlight: true,
  },
  {
    eyebrow: '03 / Egyedi',
    name: 'Egyedi Rendszer',
    desc: 'Komplex, skálázható rendszer specifikus üzleti igényekre.',
    priceNote: 'Ajánlat egyeztetés után',
    scope: 'Ütemezés a terjedelemtől függ',
    features: ['Teljes körű architektúra tervezés', 'Több modul és integráció', 'Folyamatos támogatás', 'Skálázható infrastruktúra'],
    highlight: false,
  },
]
