/* The three process cards used to carry stock photographs: a notebook, a
   pencil and a pair of glasses on a white desk for step 01, and a phone home
   screen for step 03. Both were the generic flat-lay that every freelance
   template ships with, and the phone one was covered in other companies'
   trademarks — Facebook, WhatsApp, Instagram, Gmail, Uber — on a site that
   self-hosts its own fonts specifically to avoid third parties. Step 02 had no
   photograph at all and showed a "Kép hamarosan" frame instead, so the section
   advertised its own gap.

   These replace all three. They are drawn from the same palette as everything
   else, so the section stops looking like it borrowed its imagery, and they
   cost no bytes: 78 kB of WebP left the bundle and nothing came back.

   Decorative by construction. Each card's heading and paragraph already say
   what the step is; the drawing repeats it in another register for someone
   skimming. aria-hidden keeps it out of the accessibility tree rather than
   making a screen reader listen to a description of a rectangle. */

const STROKE = 'rgb(var(--color-primary-light) / 0.55)'
const FAINT = 'rgb(var(--color-primary-light) / 0.18)'
const SOLID = 'rgb(var(--color-primary))'
const GLOW = 'rgb(var(--color-primary-light) / 0.9)'

/* 01 — Egyeztetés. A month grid with one day committed: the first call ends
   with a date, which is the only concrete thing that comes out of it. */
function Planning() {
  const cells = []
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const i = row * 7 + col
      const chosen = i === 16
      cells.push(
        <rect
          key={i}
          x={40 + col * 34}
          y={70 + row * 30}
          width="22"
          height="20"
          rx="5"
          fill={chosen ? SOLID : FAINT}
          stroke={chosen ? GLOW : 'none'}
          strokeWidth="1.5"
        />,
      )
    }
  }
  return (
    <>
      <rect x="40" y="34" width="242" height="18" rx="9" fill={FAINT} />
      <rect x="40" y="34" width="96" height="18" rx="9" fill={STROKE} opacity="0.5" />
      {cells}
    </>
  )
}

/* 02 — Fejlesztés. Two items done, one still open, and a bar that is not
   full: the step's own copy says you see it while it is still moving. */
function Build() {
  const rows = [
    { y: 46, done: true, w: 150 },
    { y: 86, done: true, w: 186 },
    { y: 126, done: false, w: 118 },
  ]
  return (
    <>
      {rows.map(({ y, done, w }) => (
        <g key={y}>
          <rect
            x="40"
            y={y}
            width="20"
            height="20"
            rx="6"
            fill={done ? SOLID : 'none'}
            stroke={done ? 'none' : STROKE}
            strokeWidth="1.5"
          />
          {done && (
            <path
              d={`M45 ${y + 10} l4 4 l7 -8`}
              fill="none"
              stroke="rgb(var(--color-background))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <rect x="72" y={y + 6} width={w} height="8" rx="4" fill={FAINT} />
        </g>
      ))}
      <rect x="40" y="176" width="242" height="6" rx="3" fill={FAINT} />
      <rect x="40" y="176" width="158" height="6" rx="3" fill={SOLID} />
    </>
  )
}

/* 03 — Átadás. The finished thing, and an arrow leaving the frame: the code,
   the domain and the hosting go into the client's name, which is what this
   step promises and what the FAQ repeats. */
function Handover() {
  return (
    <>
      <rect x="34" y="44" width="164" height="128" rx="12" fill={FAINT} stroke={STROKE} strokeWidth="1.5" />
      <path d="M34 72 H198" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="48" cy="58" r="3.5" fill={STROKE} />
      <circle cx="60" cy="58" r="3.5" fill={STROKE} />
      <circle cx="72" cy="58" r="3.5" fill={STROKE} />
      <rect x="50" y="92" width="86" height="8" rx="4" fill={STROKE} opacity="0.6" />
      <rect x="50" y="112" width="128" height="8" rx="4" fill={FAINT} />
      <rect x="50" y="132" width="104" height="8" rx="4" fill={FAINT} />
      <path d="M214 108 H262" stroke={GLOW} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M252 96 l14 12 l-14 12"
        fill="none"
        stroke={GLOW}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="288" cy="108" r="15" fill={SOLID} />
      <path
        d="M281 108 l5 5 l9 -10"
        fill="none"
        stroke="rgb(var(--color-background))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

const VARIANTS = { planning: Planning, build: Build, handover: Handover }

export default function StepVisual({ variant }) {
  const Shape = VARIANTS[variant]
  /* An unknown variant renders the frame and no shape rather than throwing.
     This is decoration on a page that sells reliability — a typo here should
     cost a drawing, not the section. */
  /* Two layers, because one cannot do both jobs. The grid has to reach every
     edge of a panel whose aspect ratio swings from wide-and-short on a phone
     to tall-and-narrow beside the desktop card, so it is a CSS background that
     tiles. The drawing must not be cropped, so it is an SVG with `meet` and an
     inset — `slice` was tried first and clipped the leftmost checkbox in half
     against the panel edge, which is exactly the kind of thing the source
     cannot tell you. */
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--color-primary-light) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-primary-light) / 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 220"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-4 sm:inset-6"
      >
        {Shape ? <Shape /> : null}
      </svg>
    </>
  )
}
