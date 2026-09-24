# Szolgáltatás-katalógus és a főoldal átrendezése — design

Dátum: 2026-09-24 · Állapot: jóváhagyva (Máté, chatben, szakaszonként)

## Cél

A kínálat eddig három helyen volt szétszórva (ServicesGrid képesség-csempék,
AiServices, Pricing), és csak öt csomagot mutatott. Máté többet akar kínálni.
Egy helyen, igényesen kidolgozott katalógus kell, árakkal, és a körülötte lévő
szekciók (Számok, Három dolog, Három lépés, Egy ember csinálja, Amit a gép
elvégez) ehhez igazodva átgondolva.

Mobilapp **nem** kerül a kínálatba (Máté döntése).

## Főoldal sorrend — előtte / utána

Előtte: Hero → Testimonial → About → Features → Pillars → Projects → Protocol →
ServicesGrid → AiServices → Faq → Pricing → ContactForm

Utána: Hero → Testimonial → About → Projects → **Services** → **Process** →
Faq → ContactForm

- **Törlődik:** Pillars (A számok mögöttem), Features (Három dolog),
  ServicesGrid (Egy ember csinálja), AiServices (Amit a gép elvégez), Pricing.
- **Új:** Services (katalógus). **Átírva:** Protocol → „Így dolgozom”, 4 lépés.

## 1. Katalógus (`src/data/services.js` + `src/sections/Services.jsx`)

### Adat — az egyetlen forrás

`pricing.js` és `ai.js` beolvad. Minden más fogyasztó (FAQ, strukturált adat
a `generate-static.mjs`-ben, `scripts/knowledge.mjs` chatbot-tudás) innen
olvas. Az ár forintban egyszer szerepel; hu/en a meglévő `fromPrice`/`forint`
/`priceEn` segédekkel képződik (fx.js), ahogy eddig.

```
SERVICE_GROUPS = [{ id, title{hu,en}, intro{hu,en}, items: [SERVICE] }]
SERVICE = {
  id,                       // stabil slug, pl. 'webshop'
  name{hu,en},
  problem{hu,en},           // egy mondat: mit old meg
  forWho{hu,en},
  includes: [{hu,en}] x3-4,
  priceHuf, priceUnit?,     // priceUnit: 'month' az üzemeltetésnél; 'flat' az átvilágításnál
  timeline{hu,en}?,         // jellemző átadási idő
  demo?: 'https://demo-…',  // csak ha PROJECTS_FULL-ban is van ilyen live URL
  isNew?: true,             // még nem szállított típus
  proof?{hu,en},            // mért tény, pl. Lighthouse, dupla foglalás
}
```

### Csoportok, tételek, árak

| Csoport | Tétel | Ár | Jelölés |
|---|---|---|---|
| Weboldalak | Bemutatkozó oldal | 240 000 Ft-tól | Élő demó (bemutatkozo), proof: Lighthouse mobil 99/100/100/100 |
| | Landing / kampányoldal | 150 000 Ft-tól | Új |
| | Többoldalas céges oldal, saját szerkesztéssel | 420 000 Ft-tól | Új |
| | Meglévő oldal átépítése | 290 000 Ft-tól | Új |
| Foglalás, rendelés, eladás | Időpontfoglaló | 690 000 Ft-tól | Élő demó (idopontfoglalo), proof: dupla foglalás mentéskor ellenőrizve, lista PIN mögött |
| | Rendelésfelvétel / napi menü | 690 000 Ft-tól | Élő demó (napi-menu) |
| | Webshop (Barion/SimplePay, Számlázz.hu/Billingo) | 890 000 Ft-tól | Új |
| | Utalvány, bérlet, jegy eladása | 320 000 Ft-tól | Új |
| Rendszerek és automatizálás | Egyedi üzleti rendszer / mini-CRM | 1 200 000 Ft-tól | — |
| | Árajánlat-készítő | 390 000 Ft-tól | Új |
| | Egy folyamat automatizálása | 90 000 Ft-tól | Új (már most is így jelölt) |
| | AI chatbot a weboldalon | 150 000 Ft-tól | Új |
| | Hangalapú asszisztens | 400 000 Ft-tól | Új |
| Folyamatos munka | Üzemeltetés és karbantartás | 25 000 Ft/hó | — |
| | Weboldal- és folyamatátvilágítás | 45 000 Ft (fix) | — |
| | Google Cégprofil + helyi SEO | 60 000 Ft-tól | Új |

A meglévő tételek szövegét (kinek, mit kapsz, átadási idő) a `pricing.js`/
`ai.js` jelenlegi, már átgondolt szövegéből viszem át, nem írom újra. Az új
tételek szövege a PRODUCT.md hangnemében: közvetlen, tényszerű, a probléma
felől, stack-villogtatás nélkül. Az „Új” tételeknél a mostani AI-szekció
őszinteségi mondata marad érvényben, csoport-szinten egyszer kiírva.

### Felület

- Fejléc: eyebrow „Szolgáltatások”, cím „Mit építhetek neked.”, rövid intro.
- 4 fül (`role=tablist`, nyílbillentyűkkel léptethető). Mobilon vízszintesen
  görgethető chip-sor.
- Aktív csoport kártyarácsa: 1 / 2 / 3 oszlop (mobil / sm / lg).
- Kártya: név, jelölések (Új · Élő demó →), probléma-mondat, 3–4 pipa, proof
  sor (ha van), ár + átadási idő, „Ajánlatot kérek erre” gomb.
- A gomb `#kapcsolat`-ra görget és a ContactForm üzenet mezőjébe előre beírja:
  „Érdekel: <név>”. Új űrlapmező nincs.
- Alul: „Nem tudod, melyik kell? Írd le a gondot, én megmondom.” → Kapcsolat.
- A prerenderelt HTML-ben minden csoport minden tétele benne van (nem aktív
  panel `hidden`), hogy kereső és chatbot is lássa.
- A meglévő design-rendszert használja (DESIGN.md tokenek, TiltCard nem kell).

### Navigáció, lábléc

- Nav: „Árak” → „Szolgáltatások” (#szolgaltatasok), „AI” kikerül,
  „Folyamat” → az Így dolgozom szekcióra mutat.
- Lábléc: „Készségek” oszlop helyett „Szolgáltatások”: a 4 csoport neve,
  linkkel a fülre.

## 2. Így dolgozom (`src/data/protocol.js`, `Protocol.jsx`)

A sticky stacking kártya-animáció marad; 3 helyett 4 lépés. Cím: „Így
dolgozom.” A Features három ígérete és a Pillars válaszidője beolvad:

1. Egyeztetés — „Előbb beszéljünk, kötelezettség nélkül.” Írásos terjedelem és
   fix ár előre; ha nem éri meg, megmondom.
2. Tervezés és fejlesztés — „Menet közben látod, hol tart.” Élő előnézeti link;
   nem sablonra épül, később bővíthető.
3. Tesztelés és átadás — „Tesztelve adom ki.” Automatikus ellenőrzések, próba
   telefonon/tableten/böngészőkben; domain és kód a tiéd.
4. Utána — „Nem tűnök el.” Egy munkanapon belül válaszolok; opcionális
   üzemeltetés 25 000 Ft/hó (az árat a services.js-ből olvassa).

## 3. Rólam

Egy mondat kerül az About-ba: „Nincs alvállalkozó, nincs projektmenedzser:
akitől kérdezel, az építi meg, és ugyanő veszi fel a telefont fél év múlva is.”

## 4. Képesség-csempék → /fejleszto

`SKILLS_FULL` (6 csempe, a friss Időpontfoglaló- és Lighthouse-hivatkozással)
új szekcióként a Fejleszto oldalra kerül, a meglévő szekciók stílusában.
`knowledge.mjs` továbbra is olvassa. A főoldalról eltűnik.

## Tesztek

- services.test.js: minden tételnek van id, hu/en név/probléma, ár > 0,
  3–4 includes; id-k egyediek; `demo` csak a `PROJECTS_FULL` live URL-jei
  közül; `isNew` és `demo` nem lehet egyszerre.
- A törölt szekciók/adatfájlok tesztjei törlődnek vagy átköltöznek; a FAQ és
  strukturált adat árai a services.js-ből jönnek (meglévő tesztek ezt
  ellenőrzik, átírva).
- Services.jsx: fülváltás billentyűzettel; „Ajánlatot kérek” kitölti az
  üzenetet.
- A /fejleszto „N teszt, M fájlban” sora a végén a valós számra frissül.
- `npm run build` zöld, majd vizuális ellenőrzés desktopon és 390 px-en.

## Nem része

Mobilapp; új demók a webshophoz vagy más „Új” tételhez; új űrlapmező;
árak módosítása a fentieken túl.
