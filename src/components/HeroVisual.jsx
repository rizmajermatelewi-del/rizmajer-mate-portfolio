/* The hero's right half: a browser frame with a wireframe inside it, and a
   code panel overlapping its corner. Drawn, not photographed or screenshotted.

   Three constraints shaped it. It must not read as a screenshot of real work —
   there are no client projects yet and the brief forbids implying otherwise —
   so the frame carries a wireframe and abstract token colours rather than a
   named site. It must not be stock: the file this replaced was a night
   photograph of somebody else's barber shop, and the one before that a holiday
   snapshot with another studio's watermark. And it has to survive being
   cropped, since the hero is full-bleed at every width.

   Hidden below lg. On a phone the copy takes the whole screen and these panels
   would sit behind the headline rather than beside it. */

const EDGE = 'rgb(var(--color-primary-light) / 0.28)'
const PANEL = 'rgb(var(--color-deep) / 0.72)'
const BAR = 'rgb(var(--color-primary-light) / 0.16)'
const DIM = 'rgb(var(--color-primary-light) / 0.22)'
const SOLID = 'rgb(var(--color-primary))'
const LIGHT = 'rgb(var(--color-primary-light))'

/* Rows of an abstract code block. Widths and indents are fixed rather than
   random so the drawing is identical on every render — a randomised one would
   differ between the prerender pass and the browser. */
const CODE = [
  [0, 96, SOLID],
  [0, 54, LIGHT],
  [1, 132, DIM],
  [1, 88, LIGHT],
  [2, 150, DIM],
  [1, 72, SOLID],
  [0, 110, DIM],
  [0, 62, LIGHT],
]

export default function HeroVisual() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
      <svg viewBox="0 0 900 700" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        <defs>
          <linearGradient id="hv-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--color-primary-light))" stopOpacity="0.10" />
            <stop offset="55%" stopColor="rgb(var(--color-primary-light))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Browser frame, tipped a couple of degrees so the composition has a
            direction instead of sitting square on the grid. */}
        <g transform="rotate(-2.5 470 300)">
          <rect x="150" y="70" width="700" height="440" rx="20" fill={PANEL} stroke={EDGE} strokeWidth="1.5" />
          <rect x="150" y="70" width="700" height="440" rx="20" fill="url(#hv-sheen)" />
          <path d="M150 118 H850" stroke={EDGE} strokeWidth="1.5" />
          <circle cx="176" cy="94" r="5" fill={DIM} />
          <circle cx="194" cy="94" r="5" fill={DIM} />
          <circle cx="212" cy="94" r="5" fill={DIM} />
          <rect x="240" y="86" width="220" height="16" rx="8" fill={BAR} />

          {/* Wireframe: a headline block, a pair of buttons, then a three-card
              row — the shape of the page this site actually builds, at a scale
              where no text is legible and nothing is being claimed. */}
          <rect x="186" y="150" width="300" height="18" rx="9" fill={LIGHT} opacity="0.7" />
          <rect x="186" y="180" width="210" height="12" rx="6" fill={BAR} />
          <rect x="186" y="214" width="120" height="34" rx="17" fill={SOLID} />
          <rect x="322" y="214" width="120" height="34" rx="17" fill="none" stroke={EDGE} strokeWidth="1.5" />

          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={186 + i * 214} y="298" width="186" height="160" rx="14" fill={BAR} stroke={EDGE} strokeWidth="1" />
              <rect x={210 + i * 214} y="326" width="86" height="10" rx="5" fill={DIM} />
              <rect x={210 + i * 214} y="350" width="138" height="8" rx="4" fill={BAR} />
              <rect x={210 + i * 214} y="368" width="112" height="8" rx="4" fill={BAR} />
            </g>
          ))}
        </g>

        {/* Code panel, overlapping the frame's bottom-left corner so the two
            read as one object with depth rather than two stickers. */}
        <g transform="rotate(2 300 540)">
          <rect x="40" y="380" width="420" height="270" rx="18" fill="rgb(var(--color-deep) / 0.92)" stroke={EDGE} strokeWidth="1.5" />
          <path d="M40 424 H460" stroke={EDGE} strokeWidth="1.5" />
          <rect x="66" y="398" width="70" height="10" rx="5" fill={BAR} />
          {CODE.map(([indent, w, fill], i) => (
            <rect key={i} x={66 + indent * 22} y={452 + i * 24} width={w} height="9" rx="4.5" fill={fill} opacity={fill === DIM ? 1 : 0.75} />
          ))}
          {/* The caret. Static: a blinking one would be motion nobody asked
              for, running forever, on a page that already animates on scroll. */}
          <rect x="66" y="644" width="10" height="3" rx="1.5" fill={LIGHT} opacity="0.8" />
        </g>
      </svg>
    </div>
  )
}
