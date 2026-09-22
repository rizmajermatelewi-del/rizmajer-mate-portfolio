export default function PhotoSlot({ src, alt, label, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full items-center justify-center bg-surface ${className}`}
    >
      <span className="absolute inset-4 rounded-xl border border-dashed border-divider" />
      <span className="font-mono text-[10px] uppercase tracking-label text-muted">{label}</span>
    </div>
  )
}
