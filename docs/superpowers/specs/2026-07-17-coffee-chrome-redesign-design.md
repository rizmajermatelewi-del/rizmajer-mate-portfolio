# Coffee/Chrome Redesign — Design Spec

**Date:** 2026-07-17
**Status:** Approved
**Scope:** `C:\Users\madew\Desktop\Final_Port` (rizmajer-mate-portfolio) — palette, typography, real content, animation consistency, copy voice. No new pages, no layout/section restructuring beyond what's specified below.

## 1. Palette + Fonts + Chrome Effect

**Fonts:** Space Grotesk (display/headlines) + General Sans (body). Replaces the current serif set (Libre Caslon Display, Cormorant Garamond, Lora). `JetBrains Mono` stays for code/technical label accents.

**Chrome effect:** Applied selectively to individual key words within headlines (not full paragraphs, not every headline) via a `background-clip: text` metallic gradient:
```css
background: linear-gradient(135deg,#E8E8E8 0%,#FFFFFF 20%,#9A9A9A 50%,#FFFFFF 70%,#C0C0C0 100%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```
Effect requires a bold weight (700) to read well — thin strokes don't show the gradient clearly.

**Palette (Tailwind `theme.extend.colors` in `tailwind.config.js`):**

| Token | Old | New | Use |
|---|---|---|---|
| `deep` | `#17140F` | `#2B1B12` | hero bg, footer bg |
| `primary` | `#FF6A00` | `#8B5A2B` | buttons, links |
| `accent` | `#F2B705` | `#C08552` | secondary highlights, eyebrows |
| `background` | `#FAF8F5` | `#F5EDE4` | body section bg |
| `surface` | `#FFFFFF` | `#FFF8F0` | cards |
| `ink` | `#211E1B` | `#2B1B12` | body text |
| `muted` | `#6E655D` | `#8A7566` | secondary text |
| `divider` | `#E7E1D9` | `#E4D6C7` | borders |

Structure stays **mixed**: dark espresso (`deep`) hero and footer, light latte (`background`) body sections — matching the current dark-hero/light-body layout.

Derived tokens (also updated in `tailwind.config.js`):

| Token | Old | New |
|---|---|---|
| `primary-dark` | `#D65600` | `#6B4520` |
| `primary-light` | `#FF9142` | `#A9754A` |
| `accent-dark` | `#C99400` | `#A66B3D` |

## 2. Photo (`pic.jpg`)

Sunset/silhouette shot, wide landscape composition — not a face-forward headshot. Does **not** go into the current small circular/square avatar slot (face reads as a tiny dark blob at that size).

**Change:** Restructure the About section (`Néhány szó rólam`) from centered-bio-with-small-avatar to a two-column layout: photo large on one side (tall/cropped treatment of the sunset shot), bio copy on the other. Stays within the existing About section — no new section added.

## 3. Projects Section (`Amin dolgozom`)

Replace the 3 placeholder "Hamarosan" cards with 4 real projects, **single row, smaller cards** (not a 2×2 grid).

| Project | Repo | Description (draft, Hungarian, human voice) | Label |
|---|---|---|---|
| Rétes-rendelő | `retes-rendelo` | Online rendelés egy dabasi rétesháznak — élő menü, fiókkezelés, admin felület a háttérben. | Client-style project |
| AB Masszázs időpontfoglaló | `vizsga` | Időpontfoglaló rendszer egy masszázsszalonnak — naptár, utalványok, külön admin és ügyfél nézet. | Client-style project |
| Business Value Builder | `business-value-builder` | Saját árazási/szolgáltatás oldal, benne egy valós esettanulmánnyal: végigmentem az inárcsi vállalkozásokon, kiszűrtem, kiknek nincs weboldaluk, és személyesen kerestem meg őket. | Saját projekt (self-directed) |
| WebWise Studio | `BOLT` | Egy ügynökségi koncepció-oldal egyedi React/AI alapú webalkalmazásokra — saját kezdeményezésű prototípus. | Saját projekt (self-directed) |

Business Value Builder and WebWise Studio are labeled honestly as self-directed/concept projects, not client work — no homepage URL, no description set on either repo, both built with rapid-prototyping tools (Lovable / Bolt.new), consistent with practice/exploration rather than deployed client engagements. **If either was actually paid client work, correct before implementation** — this is a factual claim about provenance, not a style choice.

Repos are private; only descriptions/screenshots go on the portfolio (no public repo links unless made public later).

## 4. Animation Consistency Pass

Current state: some sections have GSAP scroll-trigger entrance animations, others pop in with no transition (inconsistent — confirmed via full-page screenshot showing several sections render blank until scrolled into view, then a follow-up scripted scroll-through showed all content is real, just gated behind scroll triggers that aren't applied uniformly).

**Change:** Audit every section in `src/App.jsx` for its current animation treatment and standardize so every section gets the same entrance behavior (consistent fade/slide-in trigger point, duration, easing). No new animation concepts — just consistency, not a redesign of the motion language.

## 5. Copy/Voice Pass

**Goal (user's words):** "actually engage with people... don't wanna be generic generated."

**Change:** Rewrite section copy (hero, about, services, project descriptions, CTAs) for a more direct, human voice — avoid generic AI-marketing phrasing. Draft project descriptions above are a starting point for that tone; full copy pass covers all sections, not just the projects.

**No testimonials section.** No real client testimonials exist yet — explicitly decided not to fabricate placeholder ones. Skip this section entirely rather than adding a "Hamarosan" placeholder for it.

## Out of Scope

- No new pages or sections beyond the About-section photo restructure
- No pricing/service tier changes
- No backend/Formspree/deployment changes
- No public exposure of the 4 project repos (they stay private; site shows description/screenshots only)
