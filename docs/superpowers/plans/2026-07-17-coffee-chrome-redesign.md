# Coffee/Chrome Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the rizmajer-mate-portfolio site (single-file React app at `src/App.jsx`) with a coffee color palette, Space Grotesk + General Sans typography with a selective chrome-gradient headline effect, real project/photo content replacing placeholders, consistent scroll-entrance animation across all sections, and a more direct/human copy voice — per `docs/superpowers/specs/2026-07-17-coffee-chrome-redesign-design.md`.

**Architecture:** No new pages, no new components beyond what's needed to render the About-section photo and the 4 real project cards. All changes land in `tailwind.config.js`, `index.html`, `src/index.css`, and `src/App.jsx` (existing files). One new asset file: `src/assets/portrait-sunset.jpg`.

**Tech Stack:** React 19, Vite, Tailwind CSS 3, GSAP (ScrollTrigger), no test framework present in this repo (confirmed via `package.json` — do not add one; verification is build + lint + manual browser check).

## Global Constraints

- Palette tokens (exact hex, from spec §1): `deep #2B1B12`, `primary #8B5A2B`, `primary-dark #6B4520`, `primary-light #A9754A`, `accent #C08552`, `accent-dark #A66B3D`, `background #F5EDE4`, `surface #FFF8F0`, `ink #2B1B12`, `muted #8A7566`, `divider #E4D6C7`.
- Fonts: display/body = Space Grotesk (Google Fonts) + General Sans (Fontshare); `mono` stays JetBrains Mono. The existing `serif` token (Cormorant Garamond) and every `font-serif italic` accent usage in `App.jsx` (14 call sites) is retired — see Task 2.
- Chrome gradient effect (from spec §1) is applied to exactly 3 headline words, each on a dark (`bg-deep`) section only, per Task 2 — not applied elsewhere.
- No test framework exists — every task's verification step is `npm run build` (must exit 0), `npm run lint` (oxlint, must exit 0), and a manual `npm run dev` visual check with an explicit expected observation.
- No new pages/sections, no pricing changes, no backend/Formspree changes, no public exposure of the 4 private project repos (descriptions/screenshots only, no repo links).
- Repo has no `src/assets/` directory yet — Task 3 creates it.

---

### Task 1: Coffee Palette Tokens

**Files:**
- Modify: `tailwind.config.js:6-17`
- Modify: `src/index.css:8,11,12,26,34-36,40`
- Modify: `src/App.jsx:435,523-568,684` (hardcoded old-palette hex literals in `StackShuffler`, `CodeScan`, `BookingScheduler` — these three components render inside the kept `Features` section, so their inline/SVG colors must move to the new palette; `PROJECTS_FULL`'s `tone` hexes at lines 102/108/114 are intentionally left untouched here because Task 4 replaces the entire array)

**Interfaces:**
- Produces: new hex values for Tailwind tokens `deep`, `primary`, `primary-dark`, `primary-light`, `accent`, `accent-dark`, `background`, `surface`, `ink`, `muted`, `divider` — every later task's Tailwind class usage (`bg-deep`, `text-primary`, etc.) resolves through these.

- [ ] **Step 1: Update Tailwind color tokens**

In `tailwind.config.js`, replace the `colors` block:

```js
      colors: {
        primary: '#8B5A2B',
        'primary-dark': '#6B4520',
        'primary-light': '#A9754A',
        accent: '#C08552',
        'accent-dark': '#A66B3D',
        background: '#F5EDE4',
        surface: '#FFF8F0',
        ink: '#2B1B12',
        muted: '#8A7566',
        divider: '#E4D6C7',
        deep: '#2B1B12',
      },
```

- [ ] **Step 2: Update hardcoded colors in `src/index.css`**

Replace each of the following exact strings:

- Line 8: `::selection { background-color: #FF6A00; color: #FAF8F5; }` → `::selection { background-color: #8B5A2B; color: #F5EDE4; }`
- Line 11: `::-webkit-scrollbar-thumb { background: #FF9142; border-radius: 10px; }` → `::-webkit-scrollbar-thumb { background: #A9754A; border-radius: 10px; }`
- Line 12: `::-webkit-scrollbar-thumb:hover { background: #FF6A00; }` → `::-webkit-scrollbar-thumb:hover { background: #8B5A2B; }`
- Line 26 (inside `.magnetic-btn::before`): no change needed — it's a white-alpha gradient, palette-agnostic.
- Lines 34-36 (`.gradient-text`):
  ```css
  .gradient-text {
    background: linear-gradient(135deg, #8B5A2B 0%, #6B4520 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  ```
- Line 40 (`.glass`): `border: 1px solid rgba(255,106,0,0.18);` → `border: 1px solid rgba(139,90,43,0.18);`
- `.ring-pulse` and its `@keyframes ring-pulse` (lines 46-51): replace every `rgba(255,106,0,` with `rgba(139,90,43,`
- `.grid-bg` (lines 52-57): replace both `rgba(255,106,0,0.07)` with `rgba(139,90,43,0.07)`

- [ ] **Step 3: Update hardcoded colors in `src/App.jsx`**

Line 435 (`StackShuffler`):
```jsx
                  style={{ background: idx < 24 - offset * 6 ? '#8B5A2B' : '#E4D6C7' }}
```

Lines 523-568 (`CodeScan` SVG — replace each literal exactly as it appears):
- `fill="#FF6A00" fillOpacity="0.22"` → `fill="#8B5A2B" fillOpacity="0.22"`
- `fill="#D65600" fillOpacity="0.4"` → `fill="#6B4520" fillOpacity="0.4"`
- `fill="#D65600" fillOpacity="0.5"` (both occurrences, lines 525-526) → `fill="#6B4520" fillOpacity="0.5"`
- `fill="#D65600"` (line 529) → `fill="#6B4520"`
- `fill="#D65600" fillOpacity="0.7"` (line 530) → `fill="#6B4520" fillOpacity="0.7"`
- `filter: 'drop-shadow(0 1px 3px rgba(255,106,0,0.35))'` (line 546) → `filter: 'drop-shadow(0 1px 3px rgba(139,90,43,0.35))'`
- `stopColor="#FF9142"` (line 553) → `stopColor="#A9754A"`
- `stopColor="#FF6A00"` (line 554) → `stopColor="#8B5A2B"`
- `stopColor="#D65600"` (line 555) → `stopColor="#6B4520"`
- `fill="#17140F"` (line 559) → `fill="#2B1B12"`
- `stroke="#FF9142" strokeOpacity="0.4"` (line 567) → `stroke="#A9754A" strokeOpacity="0.4"`
- `stroke="#FF6A00" strokeOpacity="0.22"` (line 568) → `stroke="#8B5A2B" strokeOpacity="0.22"`

Line 684 (`BookingScheduler` cursor SVG): `fill="#211E1B"` → `fill="#2B1B12"`

- [ ] **Step 4: Verify build and lint**

Run: `npm run build`
Expected: exits 0, no errors.

Run: `npm run lint`
Expected: exits 0, no errors.

- [ ] **Step 5: Manual visual check**

Run: `npm run dev`, open the printed local URL.
Expected: hero background gradient, buttons, scrollbar thumb, and text selection highlight are all warm coffee-brown tones — no orange (`#FF6A00`/`#FF9142`/`#F2B705`) visible anywhere on the page except inside the (still-unreplaced) `PROJECTS_FULL` mock cards, which Task 4 fixes.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js src/index.css src/App.jsx
git commit -m "feat: swap orange palette for coffee palette"
```

---

### Task 2: Fonts, Serif-Accent Retirement, and Chrome Effect

**Files:**
- Modify: `index.html:27-32`
- Modify: `tailwind.config.js:19-24`
- Modify: `src/index.css` (add `.chrome-text` to the `@layer components` block, after `.gradient-text`)
- Modify: `src/App.jsx` (14 `font-serif italic` call sites site-wide; 3 headline spans get the chrome effect)

**Interfaces:**
- Produces: `.chrome-text` CSS class (any `<span>` with this class renders the metallic gradient-clipped text from spec §1).
- Consumes: nothing from Task 1 directly, but must run after it (no ordering conflict — different files/lines).

- [ ] **Step 1: Swap font links in `index.html`**

Replace lines 27-32:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://api.fontshare.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 2: Update `fontFamily` in `tailwind.config.js`**

Replace lines 19-24:

```js
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"General Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
```

(The `serif` key is removed — no remaining class in the codebase will reference `font-serif` after Step 4 below.)

- [ ] **Step 3: Add the chrome-text utility to `src/index.css`**

In the `@layer components` block, immediately after `.gradient-text` (after line 36), add:

```css
  .chrome-text {
    background: linear-gradient(135deg,#E8E8E8 0%,#FFFFFF 20%,#9A9A9A 50%,#FFFFFF 70%,#C0C0C0 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
```

- [ ] **Step 4: Retire the serif-italic accent pattern site-wide**

Run this exact substitution across `src/App.jsx` (order matters — the longer pattern first):

```bash
sed -i \
  -e 's/font-serif italic font-medium/font-display font-semibold/g' \
  -e 's/font-serif italic/font-display font-medium/g' \
  src/App.jsx
```

Verify no occurrences remain:

Run: `grep -n "font-serif" src/App.jsx`
Expected: no output (empty).

- [ ] **Step 5: Apply the chrome effect to 3 headline words**

**Hero** (`src/App.jsx`, inside the `hero-line-1` span, originally at line 339-341): split the text so "rendszerek" is its own span:

```jsx
            <span className="hero-line-1 block text-4xl sm:text-5xl md:text-6xl">
              Weboldalak és <span className="chrome-text font-bold">rendszerek</span>,
            </span>
```

**ServicesGrid** (`src/App.jsx`, inside the section headline, originally around line 1312-1315): split "A teljes eszköztár," so "eszköztár" is its own span:

```jsx
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              A teljes <span className="chrome-text font-bold">eszköztár</span>,
              <span className="block font-display font-semibold text-primary">egy kézben.</span>
            </h2>
```

**Footer** (`src/App.jsx`, originally around line 1784-1787): split "alkalmazásokat" out of the second line:

```jsx
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Weboldalakat és
            <span className="font-display font-semibold text-primary block"><span className="chrome-text font-bold">alkalmazásokat</span> építek.</span>
          </h2>
```

- [ ] **Step 6: Verify build and lint**

Run: `npm run build`
Expected: exits 0.

Run: `npm run lint`
Expected: exits 0.

- [ ] **Step 7: Manual visual check**

Run: `npm run dev`.
Expected: Hero headline shows "rendszerek" with a shiny metallic gradient fill (not solid orange/brown); ServicesGrid's "eszköztár" and the Footer's "alkalmazásokat" show the same effect; every other former `font-serif italic` accent word (e.g. "Egy cél.", "rólam.", "mögöttem.") now renders in bold/medium Space Grotesk, not an italic serif font. Body copy throughout renders in General Sans (visibly different from the previous Lora serif).

- [ ] **Step 8: Commit**

```bash
git add index.html tailwind.config.js src/index.css src/App.jsx
git commit -m "feat: switch to Space Grotesk + General Sans with chrome headline effect"
```

---

### Task 3: Real Photo + About Section Restructure

**Files:**
- Create: `src/assets/portrait-sunset.jpg` (resized/compressed from `C:\Users\madew\Desktop\pic.jpg`)
- Modify: `src/App.jsx:892-993` (`About()` function)

**Interfaces:**
- Produces: `src/assets/portrait-sunset.jpg`, imported only within `About()`.

- [ ] **Step 1: Create the assets directory and resize the source photo**

```bash
mkdir -p src/assets
npm install --no-save sharp
node -e "require('sharp')('C:/Users/madew/Desktop/pic.jpg').resize({ width: 2400 }).jpeg({ quality: 82 }).toFile('src/assets/portrait-sunset.jpg')"
```

Run: `ls -la src/assets/portrait-sunset.jpg`
Expected: file exists, size well under the 4.16MB original (roughly 300-700KB for a 2400px-wide JPEG at quality 82).

- [ ] **Step 2: Import the photo in `About()`**

At the top of `src/App.jsx`, after the existing `import` block (after line 26), add:

```js
import portraitSunset from './assets/portrait-sunset.jpg'
```

- [ ] **Step 3: Replace the RM-monogram placeholder with the real photo**

Replace the placeholder block (originally lines 928-936):

```jsx
            <div className="relative aspect-[3/4] rounded-6xl overflow-hidden border border-divider">
              <img
                src={portraitSunset}
                alt="Rizmajer Máté Levente naplementében, egy sziklán ülve"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent" />
            </div>
```

(This keeps the same `lg:col-span-5` wrapper and the same `visible`-driven fade/slide transition classes around it — only the inner placeholder content changes. The `aspect-[4/5]` becomes `aspect-[3/4]` to give the wide sunset composition more horizontal room before cropping.)

- [ ] **Step 4: Verify build and lint**

Run: `npm run build`
Expected: exits 0 — confirms the JPEG import resolves and Vite bundles it.

Run: `npm run lint`
Expected: exits 0.

- [ ] **Step 5: Manual visual check**

Run: `npm run dev`, scroll to the "Néhány szó rólam" section.
Expected: the left column shows the real sunset/silhouette photo (not the "RM" monogram), cropped to a tall 3:4 frame, with a subtle dark gradient at the bottom for legibility; bio text and fact cards on the right are unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/assets/portrait-sunset.jpg src/App.jsx
git commit -m "feat: replace About placeholder avatar with real photo"
```

---

### Task 4: Real Projects (4 cards, single row) + Section Copy

**Files:**
- Modify: `src/App.jsx:97-116` (`PROJECTS_FULL` data)
- Modify: `src/App.jsx:834-887` (`Projects()` — headline, subtext, grid layout, badge label)

**Interfaces:**
- Produces: new `PROJECTS_FULL` item shape `{ title, text, tech: string[], label, tone: { from, to, accent } }` (added `label` field vs. the old shape) — consumed only within `Projects()`/`ProjectMock()` in this same task.

- [ ] **Step 1: Replace `PROJECTS_FULL` with the 4 real projects**

Replace lines 97-116:

```jsx
const PROJECTS_FULL = [
  {
    title: 'Rétes-rendelő',
    text: 'Online rendelés egy dabasi rétesháznak — élő menü, fiókkezelés, admin felület a háttérben.',
    tech: ['React', 'TanStack Start', 'Supabase'],
    label: 'Ügyfélprojekt',
    tone: { from: '#3A2A1E', to: '#2B1B12', accent: '#C08552' },
  },
  {
    title: 'AB Masszázs időpontfoglaló',
    text: 'Időpontfoglaló rendszer egy masszázsszalonnak — naptár, utalványok, külön admin és ügyfél nézet.',
    tech: ['PHP', 'MySQL', 'Docker'],
    label: 'Ügyfélprojekt',
    tone: { from: '#372921', to: '#2B1B12', accent: '#A9754A' },
  },
  {
    title: 'Business Value Builder',
    text: 'Saját árazási oldal egy valós esettanulmánnyal: végigmentem az inárcsi vállalkozásokon, kiszűrtem, kiknek nincs weboldaluk, és személyesen kerestem meg őket.',
    tech: ['React', 'TanStack Start'],
    label: 'Saját projekt',
    tone: { from: '#332720', to: '#2B1B12', accent: '#8B5A2B' },
  },
  {
    title: 'WebWise Studio',
    text: 'Ügynökségi koncepció-oldal egyedi React/AI alapú webalkalmazásokra — saját kezdeményezésű prototípus.',
    tech: ['React', 'Supabase', 'Framer Motion'],
    label: 'Saját projekt',
    tone: { from: '#2E241D', to: '#2B1B12', accent: '#6B4520' },
  },
]
```

- [ ] **Step 2: Update the section headline and subtext**

Replace the headline/subtext block (originally lines 838-846):

```jsx
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Projektek</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Amin dolgozom.
            <span className="block font-display font-semibold text-primary-dark mt-1">Valós munka, nem mockup.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-xl">
            Négy projekt, amit ténylegesen megépítettem — kettő élő ügyfélmunka, kettő saját
            kezdeményezés, amivel a saját gondolkodásomat és árazási stratégiámat teszteltem.
          </p>
```

- [ ] **Step 3: Switch the grid to a single row of 4 and replace the "Hamarosan" badge**

Replace the grid opening (originally line 849) and the badge (originally lines 860-863):

```jsx
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS_FULL.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`proj-card group bg-surface border border-divider rounded-4xl overflow-hidden hover:border-primary/40 transition-all duration-700 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <ProjectMock tone={p.tone} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink leading-tight">{p.title}</h3>
                <p className="text-muted text-[13px] mt-2.5 leading-relaxed">{p.text}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
```

(`ProjectMock`'s own JSX at lines 790-812 is unchanged — it already takes `tone` as a prop and needs no structural edit, only the `h-48` mock height may read slightly tall against the new smaller card; leave as-is for this task, it still looks correct at 4-wide since `ProjectMock` is full-width within its card.)

- [ ] **Step 4: Verify build and lint**

Run: `npm run build`
Expected: exits 0.

Run: `npm run lint`
Expected: exits 0.

- [ ] **Step 5: Manual visual check**

Run: `npm run dev`, scroll to "Amin dolgozom."
Expected: 4 cards in a single row on desktop width (2 columns on tablet, 1 on mobile per the `sm:grid-cols-2 lg:grid-cols-4` classes), each showing one of the real project titles/descriptions/tech tags and either an "Ügyfélprojekt" or "Saját projekt" badge — no "Hamarosan" text anywhere in this section. Mock card headers use coffee-toned gradients, not the old orange-tinted ones.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx
git commit -m "feat: replace placeholder projects with 4 real projects in a 4-up row"
```

---

### Task 5: Animation Consistency (ContactForm + Footer)

**Files:**
- Modify: `src/App.jsx:1560-1770` (`ContactForm()`)
- Modify: `src/App.jsx:1776-1886` (`Footer()`)

**Interfaces:**
- Consumes: the existing IntersectionObserver entrance pattern already used identically in `Features`, `Projects`, `About`, `Pillars`, `ServicesGrid`, `Pricing`, and `TrustSignals` (each: a `useRef` on the section, a `useState(false)` "visible" flag, an `IntersectionObserver` that sets it true once and disconnects, and `transition-all duration-700/1000 ease-out` + `opacity-0 translate-y-8/10` → `opacity-100 translate-y-0` on the content wrapper). This task extends that exact pattern to the two sections that currently lack it.

- [ ] **Step 1: Add the entrance-animation hook and ref to `ContactForm()`**

At the top of `ContactForm()` (originally line 1560-1565), add a ref and visibility state alongside the existing ones, and an effect matching the established pattern:

```jsx
function ContactForm() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', projectType: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)
  const honeypotRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
```

- [ ] **Step 2: Wire the ref and transition classes onto the section**

Replace the section opening (originally line 1598) and the two direct children divs (originally lines 1601 and 1652):

```jsx
    <section id="kapcsolat" ref={sectionRef} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
```

and:

```jsx
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
```

- [ ] **Step 3: Add the same pattern to `Footer()`**

Replace the function opening (originally lines 1776-1779):

```jsx
function Footer() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div
        className={`relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
```

(The closing tags for this wrapper `div` and `footer` are unchanged — only the opening tags above are replacing the originals.)

- [ ] **Step 4: Verify build and lint**

Run: `npm run build`
Expected: exits 0.

Run: `npm run lint`
Expected: exits 0.

- [ ] **Step 5: Manual visual check**

Run: `npm run dev`. Scroll down slowly past the contact section and into the footer.
Expected: both the contact section's two columns and the footer's content block fade/slide up into view as they cross into the viewport, matching the same feel as every earlier section (e.g. Pricing or TrustSignals) — neither pops in abruptly anymore.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add scroll-entrance animation to contact form and footer for consistency"
```

---

### Task 6: Copy Voice Pass

**Files:**
- Modify: `src/App.jsx` (Hero subhead, ContactForm intro paragraph — 2 exact locations; see rationale below for sections left unchanged)

**Note on scope:** Of the sections named in the spec (hero, about, services, CTAs), most were already reviewed and found to already meet the "direct, human, not generic" bar on inspection — the About bio (lines 951-962) is written in first person with specific, concrete detail ("már az egyetem alatt is éles projekteken dolgoztam"), the ServicesGrid subtext and CTA button labels ("Kérj ajánlatot", "Ajánlatkérés") are short and concrete rather than AI-marketing-generic, and the Projects section copy was already rewritten for voice in Task 4. Rewriting text that already meets the bar would just be churn. The two spots below are the ones that read stiff/corporate on inspection.

**Interfaces:** None — plain string content changes, no shape/signature changes.

- [ ] **Step 1: Rewrite the Hero subhead**

Replace the paragraph (originally lines 350-354):

```jsx
          <p className="hero-meta mx-auto max-w-xl text-white/75 text-base sm:text-lg mt-8 leading-relaxed">
            Rizmajer Máté vagyok, full-stack fejlesztő Magyarországról. Nem sablonokat
            másolok — megnézem, mire van tényleg szükséged, aztán megépítem
            <span className="text-white"> — ötlettől az élesítésig.</span>
          </p>
```

(Old version led with the generic "Full-stack fejlesztő vagyok Magyarországról... digitális termékeket" phrasing; new version opens with the name — first person, direct — and drops "digitális termékeket", a phrase that reads as filler.)

- [ ] **Step 2: Rewrite the ContactForm intro line**

Replace the paragraph (originally line 1607-1609):

```jsx
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Írj pár sort arról, mit szeretnél megépíteni — elolvasom, és 24 órán belül
              válaszolok, akkor is, ha csak kérdésed van.
            </p>
```

(Old version — "Írj pár mondatot arról, mire van szükséged, és hamarosan jelentkezem" — is vague about timing and reads templated; new version gives a concrete promise (24 hours, already stated elsewhere on the page as the response-time fact) and explicitly invites questions, not just committed projects.)

- [ ] **Step 3: Verify build and lint**

Run: `npm run build`
Expected: exits 0.

Run: `npm run lint`
Expected: exits 0.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`.
Expected: hero subhead and contact-section intro read as direct, first-person sentences; no other visible copy changed from Task 4's project descriptions.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite hero and contact copy for a more direct voice"
```

---

## Self-Review

**Spec coverage:**
- §1 Palette + Fonts + Chrome Effect → Tasks 1, 2. ✓
- §2 Photo → Task 3. ✓
- §3 Projects (4 real projects, single row, honest client/self-directed labels) → Task 4. ✓
- §4 Animation consistency → Task 5 (confirmed via grep that `ContactForm` and `Footer` were the only sections with no `IntersectionObserver`/`gsap` entrance treatment; `Hero` and `Protocol` already use GSAP for a different, intentional purpose and are correctly left alone). ✓
- §5 Copy pass, no testimonials → Task 6 (no testimonials section existed before and none is added — nothing to do there, correctly out of scope for a task). ✓

**Placeholder scan:** No TBD/TODO. Every step has literal code or an exact shell command. The one place that could look like hand-waving — Task 6's "sections left unchanged" — is backed by a stated reason per section, not a deferral.

**Type/name consistency:** `PROJECTS_FULL` shape (`title`, `text`, `tech`, `label`, `tone`) is defined once in Task 4 Step 1 and consumed only in Task 4 Step 3, same task — no cross-task drift. `.chrome-text` is defined in Task 2 Step 3 and consumed in Task 2 Step 5, same task. `portraitSunset` import name is defined and consumed both in Task 3, same task. No function/prop name is used in a later task with a different spelling than where it was defined.
