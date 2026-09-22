# AB Masszázs

A one-page site for a one-therapist massage salon, plus an adatvédelmi
tájékoztató. Phase 1 of the design spec: no booking yet.

**Client property.** This app is self-contained (`ab-masszazs/package.json`) and
must never be imported by the portfolio. It lives here only until a dedicated
GitHub repository (`rizmajermatelewi-del/ab-masszazs` or similar) exists — then
move this folder out as that repo’s root and delete it from the portfolio.
Cloud-agent tokens could not create that repo from this environment.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:5173 — with empty data modules the page shows the brand
fallback name, nav, and footer. Sections without facts omit themselves.

## Testing and lint

```bash
npm test
npm run lint
```

## Building it

```bash
SITE_ORIGIN=https://<host> npm run build
```

The build refuses to run while any fact only the owner can supply is still
missing — see `scripts/check-content.mjs`. That is deliberate: nothing about
the business is invented, so an unfinished site fails loudly instead of going
live with blank sections.

## Hosting

Use **Cloudflare Pages** or **Netlify** (commercial-friendly free tiers). Do
**not** use Vercel Hobby for this commercial salon site.

- Build command: `SITE_ORIGIN=https://<assigned-host> npm run build`
- Output directory: `dist`
- Node: 22+

The first deploy is expected to fail until business facts and the service list
are filled. That is the content guard working.

## Before launch

- [ ] Service list — name, duration, price for each — into `src/data/services.js`
- [ ] Address, opening hours, telephone, legal/display name — into `src/data/business.js`
- [ ] The "Rólam" paragraph, in her own words — `ABOUT_TEXT` in `src/sections/About.jsx`
- [ ] Optional FAQ entries — `FAQ` in `src/data/faq.js`
- [ ] Facebook and Instagram URLs — `src/data/business.js`
- [ ] Salon photos (hers only — **no stock massage imagery**) via `PhotoSlot`
- [ ] Google cégprofil claimed and filled
- [ ] Written permission to list as a client on the portfolio
- [ ] Deploy host / domain

## Portfolio

Do **not** wire this into the portfolio as client proof until there is a real
public URL **and** permission. See the portfolio plan and `projects.test.js`.

## Phase 2

Online booking against her Google Calendar. Not started.
