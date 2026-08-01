/* The objections an SME actually raises before hiring.
   Moved out of Faq.jsx so the knowledge generator can read the same answers
   the page shows — one source, so the bot and the page cannot disagree. */
export const FAQ_QUESTIONS = [
  {
    q: 'Mennyibe kerül egy weboldal?',
    a: 'Egy bemutatkozó oldal 180 000 Ft-tól, egy foglalási vagy rendelési rendszer 450 000 Ft-tól, egy belső rendszer 1 200 000 Ft-tól indul. Ezek indulóárak: a pontosat egy rövid egyeztetés után, írásban és tételesen kapod meg, és utólag nem jön hozzá semmi.',
  },
  {
    q: 'Mi kerül még pénzbe a fejlesztésen túl?',
    a: 'A domain és a tárhely éves díja — ezek nem nálam futnak, hanem a te nevedre regisztráljuk, így pontosan látod, mit fizetsz és kinek. Ezen felül csak akkor van további költség, ha kérsz karbantartást vagy új funkciót. Az ajánlatban ezt előre tételesen leírom, hogy ne utólag derüljön ki.',
  },
  {
    q: 'WordPress vagy egyedi fejlesztés legyen?',
    a: 'Attól függ, mit csinál az oldal. Ha bemutatkozásról és néhány aloldalról van szó, egy kész rendszer olcsóbb és gyorsabb — ilyenkor nincs értelme egyedit építeni. Ha viszont foglalni, rendelni vagy belső folyamatot kezelni kell, ott a kész bővítmények általában vagy nem azt tudják, ami kell, vagy havidíjasak. Az első egyeztetésen megmondom, melyik éri meg neked — akkor is, ha az a kevesebb munka nekem.',
  },
  {
    q: 'Mennyi idő alatt készül el?',
    a: 'Egy egyoldalas bemutatkozó jellemzően 1–2 hét, egy egyedi funkciókkal bíró webalkalmazás 3–6 hét. A pontos ütemezést az első egyeztetésen rögzítjük, és tartom is.',
  },
  {
    q: 'Mi történik, ha nem tetszik, amit csinálsz?',
    a: 'Nem a végén látod először. Menet közben folyamatosan megmutatom, hol tart, így a korrekció olcsó marad ahelyett, hogy a leadáskor derülne ki. Az egyeztetési körök számát és a félbeszakadás feltételeit az ajánlatban rögzítjük, hogy egyikünket se érje meglepetés.',
  },
  {
    q: 'Ki tartja karban az oldalt utána?',
    a: 'Ahogy megbeszéljük. Az oldalt úgy építem, hogy a tartalmat magad is tudd kezelni, és az átadáskor megmutatom, hogyan. Ha inkább rám bíznád, az üzemeltetés 25 000 Ft/hó: frissítések, biztonsági mentés, havi egy óra apró módosítás, és ha leáll, én veszem észre, nem te. Nincs hűségidő, hónapra felmondható. Ha nem kéred, akkor sem tűnök el — kérdésre és hibára egy munkanapon belül válaszolok, ez nem havidíjas.',
  },
  {
    q: 'Mobilon is jól fog működni?',
    a: 'Igen, és ezt nem utólag ragasztom rá. A látogatók nagyobb része telefonon érkezik, ezért a mobil nézet ugyanolyan súllyal készül, mint az asztali. Ide tartozik az is, hogy billentyűzettel és képernyőolvasóval is használható legyen — webshopoknál és bizonyos szolgáltatásoknál ez ma már uniós előírás, máshol pedig egyszerűen több elérhető ügyfelet jelent.',
  },
  {
    q: 'Kié lesz a kód és a domain?',
    a: 'A tiéd. A forráskódot átadom, a domaint és a tárhelyet a te nevedre regisztráljuk — nem kerülsz függő helyzetbe, és bármikor tovább tudsz lépni máshoz.',
  },
]
