/* projectType is gone from here with the field itself — it asked for what the
   message says. */
const AUTOCOMPLETE_MAP = { name: 'name', email: 'email', company: 'organization' }

/* Two contrast fixes, both against the inverted card the form sits on. The
   label was 10px; at that size the uppercase mono tracking costs more
   legibility than the styling buys, so it moves to 11px in the normal text
   colour. The border was border-divider, which inside .card-invert resolves
   to rgb(46 58 78) on rgb(20 30 46) — about 1.4:1, well under the 3:1 that
   WCAG 2.2 SC 1.4.11 asks of a control boundary. The fields read as voids.
   .input-edge is declared in index.css and clears 3:1 in both contexts. */
/* `className` lands on the wrapper rather than the input, because what callers
   need to control is how the field sits in the grid around it, not how the
   control itself is drawn — the input's styling is this component's job and
   should stay that way. Defaulted to '' so every existing call is unchanged. */
export default function Field({ label, name, type = 'text', required, value, onChange, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80 mb-2 block">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={AUTOCOMPLETE_MAP[name] || 'on'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-edge w-full bg-background rounded-2xl px-4 py-3.5 text-ink focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}
