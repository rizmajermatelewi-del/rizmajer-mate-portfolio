/* No figures here on purpose. Published prices anchor the conversation
   before the scope is known, and every project gets quoted after a call
   anyway. Each tier states what it is and what it includes; the number
   comes from the conversation. */
/* Named after what the client is buying, not after what gets built. The tiers
   used to read "Landing Oldal / Webalkalmazás / Egyedi Rendszer" — artifact
   names. An SME owner does not shop for a webalkalmazás; they shop for a way
   to take bookings without the phone ringing all day. Tier 02 is the one both
   paying clients in projects.js actually bought (a rendelő and an
   időpontfoglaló), so it is the one marked as most common. */
export const PRICING_TIERS = [
  {
    eyebrow: '01 / Kezdéshez',
    name: 'Bemutatkozó oldal',
    desc: 'Hogy aki rád keres, találjon is valamit — és azt lássa, amit mutatni akarsz.',
    priceNote: 'Ajánlat egyeztetés után',
    scope: 'Jellemzően 1–2 hét',
    features: ['Mobilon is jól működik', 'Megtalálhatóság a Google-ben', 'Kapcsolati űrlap', 'Élesítés és átadás'],
    highlight: false,
  },
  {
    eyebrow: '02 / Leggyakoribb',
    name: 'Foglalás és rendelés',
    desc: 'Időpontfoglaló vagy rendelési felület a hozzá tartozó kezelőfelülettel — hogy ne telefonon és üzenetben menjen.',
    priceNote: 'Ajánlat egyeztetés után',
    scope: 'Jellemzően 3–6 hét',
    features: ['Foglalás vagy rendelés online', 'Kezelőfelület, amit te is használsz', 'Értesítések e-mailben', 'Meglévő rendszereidhez illesztve'],
    highlight: true,
  },
  {
    eyebrow: '03 / Egyedi',
    name: 'Belső rendszer',
    desc: 'Amikor a munkát ma táblázatban vagy papíron tartod nyilván, és ez már több időt visz el, mint amennyit megér.',
    priceNote: 'Ajánlat egyeztetés után',
    scope: 'Ütemezés a terjedelemtől függ',
    features: ['A ti folyamatotokra szabva', 'Több modul, több jogosultsági szint', 'Adatok kiajánlása, integrációk', 'Együtt nő a céggel'],
    highlight: false,
  },
]
