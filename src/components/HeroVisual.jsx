/* The hero's drawing: a measured plan sheet with a wireframe on it, and a code
   panel overlapping its corner. Drawn, not photographed or screenshotted.

   It used to be a browser window -- three traffic lights, a URL pill, a frame
   around a rendered-looking page. DESIGN.md line 299 forbids exactly that:
   "Don't build fake product chrome out of styled divs... use a real screenshot
   or show less." The defence written here before was that nothing in it is
   legible and it names no client, which is true and is not the point. The
   object being depicted was a shipped product, and there is no shipped product
   yet. Line 166 lands on the same spot from the other side, listing "invented
   dashboards" among the corporate-SaaS traits this system rejects.

   So the chrome came off and nothing replaced it. What is left is what was
   always the honest half: a plan, drawn on a measured sheet. That is also the
   system's stated north star -- paper below, screen above -- rather than a
   compromise around it. A plan is a thing this developer really does make.

   The rest of the constraints are unchanged. Not stock: the file this replaced
   was a night photograph of somebody else's barber shop, and the one before
   that a holiday snapshot with another studio's watermark. And it has to
   survive being cropped, since the hero is full-bleed at every width.

   Two drawings, not one. The desktop sheet sits beside the copy; below lg it
   would sit behind the headline instead, so a fragment of the same drawing
   goes under the buttons where the column is empty anyway. */

const EDGE = 'rgb(var(--color-primary-light) / 0.28)'
const PANEL = 'rgb(var(--color-deep) / 0.72)'
const BAR = 'rgb(var(--color-primary-light) / 0.16)'
const DIM = 'rgb(var(--color-primary-light) / 0.22)'
/* The dimension lines get their own value, brighter than everything else drawn
   in DIM. They are the only mark that says this is a plan rather than a
   screenshot, and at 0.22 behind the scrim they were close enough to invisible
   that the drawing went back to reading as a panel of a website. */
const RULE = 'rgb(var(--color-primary-light) / 0.4)'
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

/* A dimension line with a serif at each end — the mark a drawing carries and a
   window does not. This is what took the place of the browser's title bar, in
   the same position and at the same visual weight, so the composition kept its
   mass while losing the claim. */
function Measure({ x1, y1, x2, y2 }) {
  const vertical = x1 === x2
  const serif = 5
  return (
    <g stroke={RULE} strokeWidth="1.25" strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - serif} y1={y1} x2={x1 + serif} y2={y1} />
          <line x1={x2 - serif} y1={y2} x2={x2 + serif} y2={y2} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - serif} x2={x1} y2={y1 + serif} />
          <line x1={x2} y1={y2 - serif} x2={x2} y2={y2 + serif} />
        </>
      )}
    </g>
  )
}

/* The three-card row, shared by both drawings so the mobile fragment is a crop
   of the same plan rather than a second illustration that has to be kept in
   step by hand. */
function CardRow({ x, y, gap, w, h }) {
  return [0, 1, 2].map((i) => (
    <g key={i}>
      <rect x={x + i * gap} y={y} width={w} height={h} rx="14" fill={BAR} stroke={EDGE} strokeWidth="1" />
      <rect x={x + 24 + i * gap} y={y + 28} width={86} height="10" rx="5" fill={DIM} />
      <rect x={x + 24 + i * gap} y={y + 52} width={138} height="8" rx="4" fill={BAR} />
      <rect x={x + 24 + i * gap} y={y + 70} width={112} height="8" rx="4" fill={BAR} />
    </g>
  ))
}

export default function HeroVisual() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <svg viewBox="0 0 900 700" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
          <defs>
            <linearGradient id="hv-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(var(--color-primary-light))" stopOpacity="0.10" />
              <stop offset="55%" stopColor="rgb(var(--color-primary-light))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* The sheet, tipped a couple of degrees so the composition has a
              direction instead of sitting square on the grid. */}
          <g transform="rotate(-2.5 470 300)">
            <Measure x1={150} y1={44} x2={850} y2={44} />
            <Measure x1={124} y1={70} x2={124} y2={510} />

            <rect x="150" y="70" width="700" height="440" rx="20" fill={PANEL} stroke={EDGE} strokeWidth="1.5" />
            <rect x="150" y="70" width="700" height="440" rx="20" fill="url(#hv-sheen)" />

            {/* Wireframe: a headline block, a pair of buttons, then a
                three-card row — the shape of the page this site actually
                builds, at a scale where no text is legible and nothing is
                being claimed. */}
            <rect x="186" y="132" width="300" height="18" rx="9" fill={LIGHT} opacity="0.7" />
            <rect x="186" y="162" width="210" height="12" rx="6" fill={BAR} />
            <rect x="186" y="196" width="120" height="34" rx="17" fill={SOLID} />
            <rect x="322" y="196" width="120" height="34" rx="17" fill="none" stroke={EDGE} strokeWidth="1.5" />

            <CardRow x={186} y={286} gap={214} w={186} h={160} />
          </g>

          {/* Code panel, overlapping the sheet's bottom-left corner so the two
              read as one object with depth rather than two stickers. Its own
              title bar went with the browser chrome: a bar with a tab on it is
              the same borrowed signifier one size down. */}
          <g transform="rotate(2 300 540)">
            <rect x="40" y="380" width="420" height="270" rx="18" fill="rgb(var(--color-deep) / 0.92)" stroke={EDGE} strokeWidth="1.5" />
            {CODE.map(([indent, w, fill], i) => (
              <rect key={i} x={66 + indent * 22} y={424 + i * 24} width={w} height="9" rx="4.5" fill={fill} opacity={fill === DIM ? 1 : 0.75} />
            ))}
            {/* The caret. Static: a blinking one would be motion nobody asked
                for, running forever, on a page that already animates on
                scroll. */}
            <rect x="66" y="616" width="10" height="3" rx="1.5" fill={LIGHT} opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Below lg. Placed under the buttons rather than behind the copy: the
          column there was empty at every phone size measured, and nothing
          passes behind text, so no contrast ratio on this page changes.

          Right-aligned because the scrim over this layer is weighted left,
          where the headline sits — put on the left it would be wiped out.
          The offsets are not round numbers because the parent is pre-scaled
          1.12 for the parallax, so its own edges sit 6% outside the viewport
          on every side. right-[6%] is exactly that overhang, which puts the
          drawing's right edge back on the viewport's. The vertical figures
          come from measuring the band rather than guessing it: on a 390x844
          screen the buttons end at 614 and the fade into the page starts at
          716, and at bottom-[17%] the box was starting 50px above the buttons,
          so the top of the drawing was tucked behind one. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[19%] right-[6%] h-[9%] w-[92%] lg:hidden"
      >
        <svg viewBox="0 0 640 200" preserveAspectRatio="xMaxYMax meet" className="h-full w-full">
          <g transform="rotate(-2.5 320 100)" opacity="0.85">
            <Measure x1={30} y1={22} x2={620} y2={22} />
            <CardRow x={30} y={52} gap={200} w={172} h={132} />
          </g>
        </svg>
      </div>
    </>
  )
}
