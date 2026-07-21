export default function ProjectMock({ tone }) {
  return (
    <div
      className="relative h-48 w-full overflow-hidden"
      style={{ background: `linear-gradient(160deg, rgb(var(${tone.from})) 0%, rgb(var(${tone.to})) 100%)` }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </div>
      <div className="p-5">
        <div
          className="h-3 w-1/4 rounded-full transition-[width] duration-500 ease-out group-hover:w-2/3"
          style={{ background: `rgb(var(${tone.accent}) / 0.3333)` }}
        />
        <div className="h-3 w-1/6 rounded-full mt-2.5 bg-white/15 transition-[width] delay-75 duration-500 ease-out group-hover:w-1/3" />
        <div
          className="h-16 w-full rounded-xl mt-4 border border-white/10 opacity-60 transition-opacity delay-150 duration-500 ease-out group-hover:opacity-100"
          style={{ background: `rgb(var(${tone.accent}) / 0.0941)` }}
        />
        <div className="flex gap-2 mt-3">
          <div className="h-6 w-14 rounded-lg bg-white/10" />
          <div className="h-6 w-14 rounded-lg" style={{ background: `rgb(var(${tone.accent}) / 0.1882)` }} />
        </div>
      </div>
    </div>
  )
}
