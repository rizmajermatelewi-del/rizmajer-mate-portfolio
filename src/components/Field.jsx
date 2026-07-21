const AUTOCOMPLETE_MAP = { name: 'name', email: 'email', company: 'organization', projectType: 'off' }

export default function Field({ label, name, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={AUTOCOMPLETE_MAP[name] || 'on'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-cursor="text"
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}
