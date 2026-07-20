# Themeable Palette System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the portfolio's color system from hardcoded hex to CSS custom properties driving 4 live-switchable palettes (Original, Cool Tech, Forest, Monochrome), with a dev-only floating switcher for comparison.

**Architecture:** RGB-channel CSS variables (`--color-primary: 139 90 43`) defined per theme under `:root[data-theme="..."]` blocks in `src/index.css`. `tailwind.config.js` maps its existing color tokens through `rgb(var(--color-x) / <alpha-value>)` so every `bg-primary/10`-style Tailwind opacity utility keeps working unchanged. Non-Tailwind hardcoded colors in `src/App.jsx` and `src/index.css` switch to direct `rgb(var(--color-x))` references. A dev-only `<ThemeSwitcher>` sets `data-theme` on `<html>` and persists the choice to `localStorage`.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 3 (existing stack, no new dependencies).

## Global Constraints

- No layout, copy, font, or animation-timing changes — color system only, per the approved spec.
- The `.chrome-text` metallic gradient (`src/index.css`) stays hardcoded/unthemed — it simulates a physical material, not a brand color.
- **No test framework exists in this repo** (`package.json` has only `dev`/`build`/`lint`/`preview` scripts, no `test`). Do not add one — that would be scope creep for a color-only change. Every task's "test cycle" instead uses: (a) `grep` to confirm no stray hardcoded hex slipped through, and (b) the Chrome DevTools MCP tools (`navigate_page`, `evaluate_script`, `take_screenshot`) against the running `npm run dev` server to verify computed styles and visuals. These are concrete, runnable checks — treat them with the same rigor as a unit test: run them, read the actual output, don't just eyeball code.
- Reference spec: `docs/superpowers/specs/2026-07-21-themeable-palette-system-design.md`.

---

## Full Palette Reference (all 4 themes, RGB triplets)

Used throughout the tasks below. `card-1..4` are the project-card gradient "from" stops (used with `to: deep`). `terminal-1..3` are the hero code-mockup background gradient stops (darker than `deep`).

| Token | Original | Cool Tech | Forest | Monochrome |
|---|---|---|---|---|
| `primary` | `139 90 43` | `61 90 128` | `74 107 62` | `255 75 31` |
| `primary-dark` | `107 69 32` | `44 68 96` | `53 80 44` | `217 58 18` |
| `primary-light` | `169 117 74` | `107 140 174` | `110 143 94` | `255 122 80` |
| `accent` | `192 133 82` | `0 209 255` | `122 155 78` | `255 106 61` |
| `accent-dark` | `166 107 61` | `0 168 204` | `95 125 58` | `232 84 42` |
| `background` | `245 237 228` | `238 242 247` | `243 240 230` | `245 245 244` |
| `surface` | `255 248 240` | `248 250 252` | `251 250 244` | `255 255 255` |
| `ink` | `43 27 18` | `22 32 46` | `30 42 23` | `18 18 18` |
| `muted` | `138 117 102` | `107 122 143` | `119 131 106` | `112 112 112` |
| `divider` | `228 214 199` | `220 227 236` | `220 226 206` | `224 224 224` |
| `deep` | `43 27 18` | `11 18 32` | `30 42 23` | `18 18 18` |
| `card-1` | `58 42 30` | `26 34 50` | `45 58 36` | `33 33 33` |
| `card-2` | `55 41 33` | `23 31 46` | `42 55 33` | `30 30 30` |
| `card-3` | `51 39 32` | `19 27 41` | `38 51 30` | `26 26 26` |
| `card-4` | `46 36 29` | `15 23 37` | `34 47 26` | `22 22 22` |
| `terminal-1` | `36 31 25` | `15 20 30` | `26 34 20` | `22 22 22` |
| `terminal-2` | `27 23 15` | `10 14 22` | `19 26 15` | `15 15 15` |
| `terminal-3` | `20 17 16` | `6 9 15` | `13 18 11` | `9 9 9` |

---

### Task 1: CSS variable theme foundation

**Files:**
- Modify: `index.html:2` (add `data-theme="original"` to the `<html>` tag)
- Modify: `src/index.css` (add 4 theme variable blocks; convert existing hardcoded hex/rgba to var references)

**Interfaces:**
- Produces: 18 CSS custom properties per theme (`--color-primary`, `--color-primary-dark`, `--color-primary-light`, `--color-accent`, `--color-accent-dark`, `--color-background`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-divider`, `--color-deep`, `--color-card-1..4`, `--color-terminal-1..3`), selected via `:root[data-theme="original|cool-tech|forest|monochrome"]`. Task 2 (Tailwind config) and Task 3 (`App.jsx`) both consume these variable names directly — they must match exactly.

- [ ] **Step 1: Set the default theme attribute in `index.html`**

Change:
```html
<html lang="hu">
```
To:
```html
<html lang="hu" data-theme="original">
```

This guarantees the production build (which never runs the dev-only switcher) always resolves to the Original palette. Without this, `<html>` would have no `data-theme` attribute in production and none of the `:root[data-theme="..."]` blocks below would match, leaving every color token undefined.

- [ ] **Step 2: Replace `src/index.css` with the full themed version**

Write the complete file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root[data-theme="original"] {
  --color-primary: 139 90 43;
  --color-primary-dark: 107 69 32;
  --color-primary-light: 169 117 74;
  --color-accent: 192 133 82;
  --color-accent-dark: 166 107 61;
  --color-background: 245 237 228;
  --color-surface: 255 248 240;
  --color-ink: 43 27 18;
  --color-muted: 138 117 102;
  --color-divider: 228 214 199;
  --color-deep: 43 27 18;
  --color-card-1: 58 42 30;
  --color-card-2: 55 41 33;
  --color-card-3: 51 39 32;
  --color-card-4: 46 36 29;
  --color-terminal-1: 36 31 25;
  --color-terminal-2: 27 23 15;
  --color-terminal-3: 20 17 16;
}

:root[data-theme="cool-tech"] {
  --color-primary: 61 90 128;
  --color-primary-dark: 44 68 96;
  --color-primary-light: 107 140 174;
  --color-accent: 0 209 255;
  --color-accent-dark: 0 168 204;
  --color-background: 238 242 247;
  --color-surface: 248 250 252;
  --color-ink: 22 32 46;
  --color-muted: 107 122 143;
  --color-divider: 220 227 236;
  --color-deep: 11 18 32;
  --color-card-1: 26 34 50;
  --color-card-2: 23 31 46;
  --color-card-3: 19 27 41;
  --color-card-4: 15 23 37;
  --color-terminal-1: 15 20 30;
  --color-terminal-2: 10 14 22;
  --color-terminal-3: 6 9 15;
}

:root[data-theme="forest"] {
  --color-primary: 74 107 62;
  --color-primary-dark: 53 80 44;
  --color-primary-light: 110 143 94;
  --color-accent: 122 155 78;
  --color-accent-dark: 95 125 58;
  --color-background: 243 240 230;
  --color-surface: 251 250 244;
  --color-ink: 30 42 23;
  --color-muted: 119 131 106;
  --color-divider: 220 226 206;
  --color-deep: 30 42 23;
  --color-card-1: 45 58 36;
  --color-card-2: 42 55 33;
  --color-card-3: 38 51 30;
  --color-card-4: 34 47 26;
  --color-terminal-1: 26 34 20;
  --color-terminal-2: 19 26 15;
  --color-terminal-3: 13 18 11;
}

:root[data-theme="monochrome"] {
  --color-primary: 255 75 31;
  --color-primary-dark: 217 58 18;
  --color-primary-light: 255 122 80;
  --color-accent: 255 106 61;
  --color-accent-dark: 232 84 42;
  --color-background: 245 245 244;
  --color-surface: 255 255 255;
  --color-ink: 18 18 18;
  --color-muted: 112 112 112;
  --color-divider: 224 224 224;
  --color-deep: 18 18 18;
  --color-card-1: 33 33 33;
  --color-card-2: 30 30 30;
  --color-card-3: 26 26 26;
  --color-card-4: 22 22 22;
  --color-terminal-1: 22 22 22;
  --color-terminal-2: 15 15 15;
  --color-terminal-3: 9 9 9;
}

@layer base {
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body { @apply bg-background text-ink font-body; overflow-x: hidden; }
  ::selection { background-color: rgb(var(--color-primary)); color: rgb(var(--color-background)); }
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: rgb(var(--color-background)); }
  ::-webkit-scrollbar-thumb { background: rgb(var(--color-primary-light)); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgb(var(--color-primary)); }
}

@layer components {
  .noise-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 1; opacity: 0.05; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .magnetic-btn { position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
  .magnetic-btn:hover { transform: scale(1.03) translateY(-1px); }
  .magnetic-btn:active { transform: scale(0.98); }
  .magnetic-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0));
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .magnetic-btn:hover::before { transform: translateY(0); }
  .lift-on-hover { transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94); }
  .lift-on-hover:hover { transform: translateY(-1px); }
  .gradient-text {
    background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-dark)) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .chrome-text {
    background: linear-gradient(135deg,#E8E8E8 0%,#FFFFFF 20%,#9A9A9A 50%,#FFFFFF 70%,#C0C0C0 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .glass {
    background: rgb(var(--color-background) / 0.65);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgb(var(--color-primary) / 0.18);
  }
  .glass-dark {
    background: rgb(var(--color-deep) / 0.75);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  }
  .ring-pulse { box-shadow: 0 0 0 0 rgb(var(--color-primary) / 0.6); animation: ring-pulse 2s infinite; }
  @keyframes ring-pulse {
    0%   { box-shadow: 0 0 0 0 rgb(var(--color-primary) / 0.6); }
    70%  { box-shadow: 0 0 0 14px rgb(var(--color-primary) / 0); }
    100% { box-shadow: 0 0 0 0 rgb(var(--color-primary) / 0); }
  }
  .grid-bg {
    background-image:
      linear-gradient(rgb(var(--color-primary) / 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgb(var(--color-primary) / 0.07) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .text-balance { text-wrap: balance; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
}

@layer utilities {
  .perspective { perspective: 1200px; }
  .preserve-3d { transform-style: preserve-3d; }
  .clip-wave { clip-path: polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%); }
}
```

Note `.chrome-text` is untouched — it stays literal per the spec's exemption.

- [ ] **Step 3: Verify no stray hardcoded hex remains (except the exempted chrome gradient)**

Run: `grep -n "#[0-9A-Fa-f]\{6\}" src/index.css`

Expected: exactly one match — the `.chrome-text` line containing `#E8E8E8`, `#FFFFFF`, `#9A9A9A`, `#FFFFFF`, `#C0C0C0`. If any other line matches, it wasn't converted — fix it before continuing.

- [ ] **Step 4: Verify the variables resolve correctly in the browser**

Start the dev server: `npm run dev -- --port 5183 --strictPort` (background it; wait for "ready in").

Using the Chrome DevTools MCP tools: navigate to `http://localhost:5183/`, then run `evaluate_script`:

```js
() => {
  const root = document.documentElement
  const before = getComputedStyle(root).getPropertyValue('--color-primary').trim()
  root.dataset.theme = 'cool-tech'
  const after = getComputedStyle(root).getPropertyValue('--color-primary').trim()
  root.dataset.theme = 'original'
  return { before, after }
}
```

Expected: `{ "before": "139 90 43", "after": "61 90 128" }`. This confirms the theme blocks are wired correctly before Tailwind or `App.jsx` depend on them.

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: add CSS variable theme system with 4 palettes"
```

---

### Task 2: Wire Tailwind config to the CSS variables

**Files:**
- Modify: `tailwind.config.js`

**Interfaces:**
- Consumes: the 11 core `--color-*` variables from Task 1 (`--color-primary`, `--color-primary-dark`, `--color-primary-light`, `--color-accent`, `--color-accent-dark`, `--color-background`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-divider`, `--color-deep`).
- Produces: Tailwind color utilities (`bg-primary`, `text-ink/70`, `shadow-primary/30`, etc.) that resolve through the active theme. No change to class names used elsewhere in the codebase.

- [ ] **Step 1: Replace the `colors` block**

Change:
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
To:
```js
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-dark': 'rgb(var(--color-accent-dark) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        divider: 'rgb(var(--color-divider) / <alpha-value>)',
        deep: 'rgb(var(--color-deep) / <alpha-value>)',
      },
```

- [ ] **Step 2: Verify Tailwind utility classes respond to theme changes**

With the dev server still running (Task 1 Step 4), navigate to `http://localhost:5183/` and run `evaluate_script`:

```js
() => {
  const el = document.querySelector('[class*="bg-primary"]')
  const before = getComputedStyle(el).backgroundColor
  document.documentElement.dataset.theme = 'cool-tech'
  const after = getComputedStyle(el).backgroundColor
  document.documentElement.dataset.theme = 'original'
  return { before, after }
}
```

Expected: `before` is `"rgb(139, 90, 43)"` and `after` is `"rgb(61, 90, 128)"` (exact element found depends on page markup, but any element using a `bg-primary`-family class must change color between the two calls — if `before === after`, Tailwind isn't picking up the variable and the config edit needs review).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: wire Tailwind color tokens to theme CSS variables"
```

---

### Task 3: Convert hardcoded colors in `App.jsx`

**Files:**
- Modify: `src/App.jsx:104,111,118,125` (project tone definitions)
- Modify: `src/App.jsx:805,813,815,818` (project card rendering — consumes `tone`)
- Modify: `src/App.jsx:446` (skill bar fill)
- Modify: `src/App.jsx:508,534-541,557,564-566,570,578-579` (hero code-mockup SVG)
- Modify: `src/App.jsx:695` (booking-card cursor icon)

**Interfaces:**
- Consumes: `--color-card-1..4`, `--color-terminal-1..3`, `--color-accent`, `--color-primary`, `--color-primary-light`, `--color-primary-dark`, `--color-deep` (all from Task 1).
- No new exports — this task only replaces literal hex with `rgb(var(--color-x))` (or, for `tone.accent`, a var-name string combined with an alpha fraction — see Step 1).

- [ ] **Step 1: Convert the `PROJECTS_FULL` tone definitions**

`tone.accent` is currently a hex string later concatenated with a 2-digit hex alpha suffix (e.g. `` `${tone.accent}55` ``, producing `#C0855255`). A CSS var reference can't be concatenated that way — `` `rgb(var(--color-accent))55` `` is invalid CSS. So `tone.accent` becomes the **variable name only** (e.g. `'--color-accent'`), and each render site wraps it in `rgb(var(${tone.accent}) / <fraction>)` with the fraction computed from the original hex suffix (`0x55/255 = 0.3333`, `0x18/255 = 0.0941`, `0x30/255 = 0.1882`).

Change (lines 104, 111, 118, 125):
```js
    tone: { from: '#3A2A1E', to: '#2B1B12', accent: '#C08552' },
```
```js
    tone: { from: '#372921', to: '#2B1B12', accent: '#A9754A' },
```
```js
    tone: { from: '#332720', to: '#2B1B12', accent: '#8B5A2B' },
```
```js
    tone: { from: '#2E241D', to: '#2B1B12', accent: '#6B4520' },
```
To (in order — each project keeps its position in the accent cycle `[accent, primary-light, primary, primary-dark]`):
```js
    tone: { from: '--color-card-1', to: '--color-deep', accent: '--color-accent' },
```
```js
    tone: { from: '--color-card-2', to: '--color-deep', accent: '--color-primary-light' },
```
```js
    tone: { from: '--color-card-3', to: '--color-deep', accent: '--color-primary' },
```
```js
    tone: { from: '--color-card-4', to: '--color-deep', accent: '--color-primary-dark' },
```

- [ ] **Step 2: Update the project-card render sites that consume `tone`**

Change (around line 805):
```jsx
      style={{ background: `linear-gradient(160deg, ${tone.from} 0%, ${tone.to} 100%)` }}
```
To:
```jsx
      style={{ background: `linear-gradient(160deg, rgb(var(${tone.from})) 0%, rgb(var(${tone.to})) 100%)` }}
```

Change (around line 813):
```jsx
        <div className="h-3 w-2/3 rounded-full" style={{ background: `${tone.accent}55` }} />
```
To:
```jsx
        <div className="h-3 w-2/3 rounded-full" style={{ background: `rgb(var(${tone.accent}) / 0.3333)` }} />
```

Change (around line 815):
```jsx
        <div className="h-16 w-full rounded-xl mt-4 border border-white/10" style={{ background: `${tone.accent}18` }} />
```
To:
```jsx
        <div className="h-16 w-full rounded-xl mt-4 border border-white/10" style={{ background: `rgb(var(${tone.accent}) / 0.0941)` }} />
```

Change (around line 818):
```jsx
          <div className="h-6 w-14 rounded-lg" style={{ background: `${tone.accent}30` }} />
```
To:
```jsx
          <div className="h-6 w-14 rounded-lg" style={{ background: `rgb(var(${tone.accent}) / 0.1882)` }} />
```

- [ ] **Step 3: Convert the skill bar fill (line 446)**

Change:
```jsx
                  style={{ background: idx < 24 - offset * 6 ? '#8B5A2B' : '#E4D6C7' }}
```
To:
```jsx
                  style={{ background: idx < 24 - offset * 6 ? 'rgb(var(--color-primary))' : 'rgb(var(--color-divider))' }}
```

- [ ] **Step 4: Convert the hero code-mockup background gradient (line 508)**

Change:
```jsx
      style={{ background: 'linear-gradient(180deg, #241F19 0%, #1B170F 55%, #141110 100%)' }}
```
To:
```jsx
      style={{ background: 'linear-gradient(180deg, rgb(var(--color-terminal-1)) 0%, rgb(var(--color-terminal-2)) 55%, rgb(var(--color-terminal-3)) 100%)' }}
```

- [ ] **Step 5: Convert the terminal-bar commit markers (lines 534-541)**

Change:
```jsx
        <rect x="0" y="6" width="400" height="8" rx="4" fill="#8B5A2B" fillOpacity="0.22" />
        <rect x="0" y="7" width="400" height="2" fill="#6B4520" fillOpacity="0.4" />
        <rect x="0" y="4" width="6" height="12" rx="1.5" fill="#6B4520" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="12" rx="1.5" fill="#6B4520" fillOpacity="0.5" />
        {[60, 152, 248, 340].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="2" width="6" height="6" rx="1" fill="#6B4520" />
            <rect x={x - 4} y="13" width="8" height="3" rx="1" fill="#6B4520" fillOpacity="0.7" />
          </g>
        ))}
```
To:
```jsx
        <rect x="0" y="6" width="400" height="8" rx="4" fill="rgb(var(--color-primary))" fillOpacity="0.22" />
        <rect x="0" y="7" width="400" height="2" fill="rgb(var(--color-primary-dark))" fillOpacity="0.4" />
        <rect x="0" y="4" width="6" height="12" rx="1.5" fill="rgb(var(--color-primary-dark))" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="12" rx="1.5" fill="rgb(var(--color-primary-dark))" fillOpacity="0.5" />
        {[60, 152, 248, 340].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="2" width="6" height="6" rx="1" fill="rgb(var(--color-primary-dark))" />
            <rect x={x - 4} y="13" width="8" height="3" rx="1" fill="rgb(var(--color-primary-dark))" fillOpacity="0.7" />
          </g>
        ))}
```

- [ ] **Step 6: Convert the falling code-glyph chip gradient and drop-shadow (lines 557, 564-566, 570)**

Change:
```jsx
              filter: 'drop-shadow(0 1px 3px rgba(139,90,43,0.35))',
```
To:
```jsx
              filter: 'drop-shadow(0 1px 3px rgb(var(--color-primary) / 0.35))',
```

Change:
```jsx
                <stop offset="0%" stopColor="#A9754A" />
                <stop offset="50%" stopColor="#8B5A2B" />
                <stop offset="100%" stopColor="#6B4520" />
```
To:
```jsx
                <stop offset="0%" stopColor="rgb(var(--color-primary-light))" />
                <stop offset="50%" stopColor="rgb(var(--color-primary))" />
                <stop offset="100%" stopColor="rgb(var(--color-primary-dark))" />
```

Change:
```jsx
            <text x="12" y="15.5" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="700" fill="#2B1B12">
```
To:
```jsx
            <text x="12" y="15.5" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="700" fill="rgb(var(--color-deep))">
```

- [ ] **Step 7: Convert the wave-path strokes (lines 578-579)**

Change:
```jsx
        <path d="M 0,6 Q 12.5,2 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6" fill="none" stroke="#A9754A" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M 0,8 Q 12.5,5 25,8 T 50,8 T 75,8 T 100,8 T 125,8 T 150,8 T 175,8 T 200,8" fill="none" stroke="#8B5A2B" strokeOpacity="0.22" strokeWidth="0.8" />
```
To:
```jsx
        <path d="M 0,6 Q 12.5,2 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6" fill="none" stroke="rgb(var(--color-primary-light))" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M 0,8 Q 12.5,5 25,8 T 50,8 T 75,8 T 100,8 T 125,8 T 150,8 T 175,8 T 200,8" fill="none" stroke="rgb(var(--color-primary))" strokeOpacity="0.22" strokeWidth="0.8" />
```

- [ ] **Step 8: Convert the booking-card cursor icon (line 695)**

Change:
```jsx
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#2B1B12" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
```
To:
```jsx
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="rgb(var(--color-deep))" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
```

- [ ] **Step 9: Verify no stray hardcoded brand-color hex remains in `App.jsx`**

Run: `grep -n "#[0-9A-Fa-f]\{6\}" src/App.jsx`

Expected: no output (zero matches). If anything remains, it's a spot this task missed — convert it using the same `rgb(var(--color-x))` pattern before continuing.

- [ ] **Step 10: Visually verify the converted sections across two themes**

With the dev server running, navigate to `http://localhost:5183/`, scroll to the projects section and the hero code-mockup (use the same scroll-then-screenshot approach as before: `evaluate_script` to step `window.scrollTo` through the page, then `take_screenshot` with `fullPage: true`). Take one screenshot with `document.documentElement.dataset.theme` left at `'original'`, then run `evaluate_script` to set it to `'cool-tech'` and take a second screenshot. Compare: project cards, the hero code-mockup gradient, and skill bars must visibly change color between the two screenshots; layout must be identical.

- [ ] **Step 11: Commit**

```bash
git add src/App.jsx
git commit -m "feat: convert App.jsx hardcoded colors to theme CSS variables"
```

---

### Task 4: Dev-only theme switcher

**Files:**
- Create: `src/ThemeSwitcher.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: default-exported `ThemeSwitcher` React component (no props). Reads/writes `localStorage['theme-preview']` and `document.documentElement.dataset.theme`.
- Consumes: the four theme id strings from Task 1 (`'original'`, `'cool-tech'`, `'forest'`, `'monochrome'`).

- [ ] **Step 1: Create `src/ThemeSwitcher.jsx`**

```jsx
import { useEffect, useState } from 'react'

const THEMES = [
  { id: 'original', label: 'Original', swatch: '#8B5A2B' },
  { id: 'cool-tech', label: 'Cool Tech', swatch: '#3D5A80' },
  { id: 'forest', label: 'Forest', swatch: '#4A6B3E' },
  { id: 'monochrome', label: 'Monochrome', swatch: '#FF4B1F' },
]

const STORAGE_KEY = 'theme-preview'

export default function ThemeSwitcher() {
  const [active, setActive] = useState('original')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) || 'original'
    document.documentElement.dataset.theme = stored
    setActive(stored)
  }, [])

  function selectTheme(id) {
    document.documentElement.dataset.theme = id
    localStorage.setItem(STORAGE_KEY, id)
    setActive(id)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        gap: '8px',
        padding: '8px',
        borderRadius: '999px',
        background: 'rgba(20,20,20,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => selectTheme(theme.id)}
          title={theme.label}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: theme.swatch,
            border: active === theme.id ? '2px solid white' : '2px solid transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Mount it dev-only in `src/main.jsx`**

Change:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adatvedelem" element={<PrivacyPolicy />} />
        <Route path="/aszf" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```
To:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {import.meta.env.DEV && <ThemeSwitcher />}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adatvedelem" element={<PrivacyPolicy />} />
        <Route path="/aszf" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 3: Verify the switcher appears and works in dev**

With the dev server running, navigate to `http://localhost:5183/` and run `evaluate_script`:

```js
() => {
  const buttons = document.querySelectorAll('button[title]')
  const titles = Array.from(buttons).map(b => b.title)
  return titles
}
```

Expected: array includes `"Original"`, `"Cool Tech"`, `"Forest"`, `"Monochrome"`. Then take a screenshot to visually confirm the floating pill renders bottom-right.

- [ ] **Step 4: Verify the switcher is excluded from the production build**

Run:
```bash
npm run build
grep -r "theme-preview" dist/assets/*.js
```

Expected: `npm run build` succeeds, and the `grep` finds **no matches** — confirming Vite's dead-code elimination stripped the `import.meta.env.DEV`-gated branch (and therefore `ThemeSwitcher` itself, since it's only referenced there) out of the production bundle.

- [ ] **Step 5: Commit**

```bash
git add src/ThemeSwitcher.jsx src/main.jsx
git commit -m "feat: add dev-only theme switcher for palette comparison"
```

---

### Task 5: End-to-end verification across all 4 themes

**Files:** none (verification only)

**Interfaces:** none — this task consumes everything from Tasks 1-4 and produces no new code.

- [ ] **Step 1: Screenshot the full page in each theme**

With the dev server running, navigate to `http://localhost:5183/`. For each theme id in `['original', 'cool-tech', 'forest', 'monochrome']`:

1. `evaluate_script`:
```js
(themeId) => {
  document.documentElement.dataset.theme = themeId
  localStorage.setItem('theme-preview', themeId)
}
```
(pass the theme id as the function argument)

2. Scroll through the page to trigger GSAP ScrollTrigger animations (same approach used earlier in this session):
```js
async () => {
  const step = 400
  const total = document.body.scrollHeight
  for (let y = 0; y < total; y += step) {
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 150))
  }
  window.scrollTo(0, 0)
  await new Promise(r => setTimeout(r, 300))
}
```

3. `take_screenshot` with `fullPage: true`.

- [ ] **Step 2: Visually confirm each screenshot**

Read each of the 4 saved screenshots. For every one, confirm:
- No leftover brown/tan (Original palette) bleeding through in the other 3 themes — this would indicate a missed hardcoded value.
- Text stays legible against its background (dark hero/footer text, button text-on-primary) in all 4 themes.
- Layout, spacing, and content are pixel-identical to the Original screenshot — only color changed.

If any theme shows wrong colors in a specific section, trace it back to the relevant Task 1/3 conversion and fix it there (not with a one-off patch here).

- [ ] **Step 3: Confirm production build renders the Original theme correctly**

```bash
npm run build
npm run preview -- --port 5184 --strictPort
```

Navigate to `http://localhost:5184/`, take a screenshot, and confirm it matches the Original-theme dev screenshot from Step 1 (since `index.html` hardcodes `data-theme="original"` and the switcher is stripped from this build). Stop the preview server when done.

- [ ] **Step 4: Reset local theme selection to Original**

`evaluate_script` against the dev server:
```js
() => {
  document.documentElement.dataset.theme = 'original'
  localStorage.setItem('theme-preview', 'original')
}
```

Leaves the dev environment in a clean default state for whoever opens it next.
