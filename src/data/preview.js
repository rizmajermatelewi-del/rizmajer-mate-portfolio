/* Design-preview only. Never treat as the client's real facts.
   Launch build still reads empty BUSINESS / SERVICES and refuses until
   DarkMatthew supplies the real salon data. */
export const PREVIEW_BUSINESS = {
  name: 'AB Masszázs',
  legalName: 'AB Masszázs (minta)',
  tagline: 'Nyugodt kezelés — egy asztal, figyelmes tempó.',
  street: 'Minta utca 12.',
  city: 'Minta város',
  postalCode: '0000',
  phone: '+36 30 000 0000',
  email: 'minta@ab-masszazs.example',
  facebook: '',
  instagram: '',
  mapsUrl: '',
  hours: [
    { day: 'Hétfő', opens: '09:00', closes: '17:00' },
    { day: 'Kedd', opens: '09:00', closes: '17:00' },
    { day: 'Szerda', opens: '09:00', closes: '17:00' },
    { day: 'Csütörtök', opens: '09:00', closes: '17:00' },
    { day: 'Péntek', opens: '09:00', closes: '15:00' },
  ],
}

export const PREVIEW_SERVICES = [
  {
    id: 'minta-sved-60',
    name: 'Svédmasszázs',
    minutes: 60,
    price: 9000,
    desc: 'Minta leírás: teljes test, lazító tempó.',
  },
  {
    id: 'minta-frissito-30',
    name: 'Frissítő masszázs',
    minutes: 30,
    price: 5500,
    desc: 'Minta leírás: váll, nyak, hát — gyors felfrissülés.',
  },
  {
    id: 'minta-talp-45',
    name: 'Talpmasszázs',
    minutes: 45,
    price: 7000,
    desc: 'Minta leírás: reflexzónák, ülő kezelés.',
  },
]

export const PREVIEW_FAQ = [
  {
    q: 'Kell-e időpontot egyeztetni? (minta)',
    a: 'Igen — a végleges oldalon telefonon. Ez a válasz csak előnézet.',
  },
  {
    q: 'Mit hozzak magammal? (minta)',
    a: 'Kényelmes ruhát. Törölközőt a szalon biztosít — minta szöveg, nem ügyfélígéret.',
  },
  {
    q: 'Van-e parkoló? (minta)',
    a: 'A valódi cím ismeretében frissül. Most csak a kinézetet mutatja.',
  },
]

export const PREVIEW_ABOUT =
  'Ez egy minta „Rólam” bekezdés az előnézethez. A végleges szöveget a kezelő saját szavaival írja majd — itt csak azt mutatjuk, hogyan ül a tipográfia és a tér a prémium elrendezésben.'
