# Themeable Palette System — Design Spec

**Date:** 2026-07-21
**Status:** Approved
**Scope:** `C:\Users\madew\Desktop\Final_Port` (rizmajer-mate-portfolio) — color system only. No layout, copy, animation, or component-structure changes. Goal is to compare 4 color directions live in the running site and eventually pick a winner to serve as the color base for future site builds (this one and others).

## 1. Problem

Colors are mostly centralized in `tailwind.config.js` (`theme.extend.colors`), but roughly a dozen hex values are hardcoded directly in `src/App.jsx` and `src/index.css`: the 4 project-card gradient tones, the hero/footer dark-gradient stops, the skill-bar fill/track colors, `::selection`, and the scrollbar. A straight recolor would require hunting all of these down per palette. Instead, this spec converts the whole system to CSS custom properties so N palettes can coexist and be flipped between live, without rebuilding or restarting the dev server.

One exception: the brushed-metal "chrome" text-gradient (`#E8E8E8`/`#FFFFFF`/`#9A9A9A`/`#C0C0C0`) simulates a physical metal material, not a brand color — it stays hardcoded and unthemed across all 4 palettes.

## 2. Mechanism

**CSS variables, RGB-channel form**, so Tailwind's opacity modifiers (`bg-primary/10`, `text-white/90`, `shadow-primary/30` — used extensively in `App.jsx`) keep working:

```css
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
  /* card-tone "from" shades, 4 slight variants near --color-deep */
  --color-card-1: 58 42 30;
  --color-card-2: 55 41 33;
  --color-card-3: 51 39 32;
  --color-card-4: 46 36 29;
}
```

`tailwind.config.js` maps each token through the standard alpha-aware pattern:

```js
primary: 'rgb(var(--color-primary) / <alpha-value>)',
```

...for all 11 existing tokens (`primary`, `primary-dark`, `primary-light`, `accent`, `accent-dark`, `background`, `surface`, `ink`, `muted`, `divider`, `deep`) plus the 4 new `card-1..4` tokens (used only for the project-card gradient `from` stop; the gradient `to` stop is always `deep`, and each card's accent cycles through `[accent, primary-light, primary, primary-dark]` — reused directly, no new tokens needed).

Non-Tailwind hardcoded spots (`::selection`, scrollbar, skill-bar fill/track, hero terminal-gradient 3 stops) switch from literal hex to `rgb(var(--color-x))` references in `index.css` / inline styles in `App.jsx`.

**Theme switching:** `data-theme` attribute on `<html>`, one sibling `:root[data-theme="..."]` block per palette in `index.css`. A `<ThemeSwitcher>` component (new file, `src/ThemeSwitcher.jsx`):
- Renders only when `import.meta.env.DEV` is true — absent from production builds entirely (Vite tree-shakes the dead branch).
- Floating pill, fixed bottom-right, 4 swatch buttons (original/cool-tech/forest/monochrome).
- On click: sets `document.documentElement.dataset.theme` and writes to `localStorage('theme-preview')`.
- On mount: reads `localStorage('theme-preview')` (default `'original'`) and applies it immediately.

No SSR/FOUC concern — this is a pure CSR Vite app, so a `useEffect`-driven initial read is acceptable (brief flash on hard refresh only, not on the SPA navigation that matters for comparison).

## 3. The Four Palettes

Each preserves the original's structural trick: `deep` doubles as both the dark hero/footer background *and* the text color rendered on top of `primary` buttons — which only stays readable because `primary` itself is never near-black. Monochrome therefore uses the bold accent hue as `primary` rather than literal black.

| Token | Original | Cool Tech | Forest | Monochrome |
|---|---|---|---|---|
| `primary` | `#8B5A2B` | `#3D5A80` | `#4A6B3E` | `#FF4B1F` |
| `primary-dark` | `#6B4520` | `#2C4460` | `#35502C` | `#D93A12` |
| `primary-light` | `#A9754A` | `#6B8CAE` | `#6E8F5E` | `#FF7A50` |
| `accent` | `#C08552` | `#00D1FF` | `#7A9B4E` | `#FF6A3D` |
| `accent-dark` | `#A66B3D` | `#00A8CC` | `#5F7D3A` | `#E8542A` |
| `background` | `#F5EDE4` | `#EEF2F7` | `#F3F0E6` | `#F5F5F4` |
| `surface` | `#FFF8F0` | `#F8FAFC` | `#FBFAF4` | `#FFFFFF` |
| `ink` | `#2B1B12` | `#16202E` | `#1E2A17` | `#121212` |
| `muted` | `#8A7566` | `#6B7A8F` | `#77836A` | `#707070` |
| `divider` | `#E4D6C7` | `#DCE3EC` | `#DCE2CE` | `#E0E0E0` |
| `deep` | `#2B1B12` | `#0B1220` | `#1E2A17` | `#121212` |

Card-tone "from" shades (4 near-`deep` variants, lightest→closest-to-deep) are hand-tuned per theme to sit visibly but subtly above `deep`, following the same spacing pattern as the original's existing 4 values.

## 4. Out of Scope

- No changes to layout, copy, fonts, or animation timing.
- No changes to the metallic chrome-text gradient.
- No visual mockup/comparison tool outside the running site itself — the live switcher **is** the comparison mechanism.
- Picking a winning palette and removing the switcher (or promoting one theme to the sole default for production) is a follow-up task, not part of this spec.
