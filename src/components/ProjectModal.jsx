import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X, ArrowUpRight } from 'lucide-react'
import { duration, ease } from '../motion/tokens'
import { useReducedMotion } from '../motion/useReducedMotion'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'

/* Detail panel for a project. Animates from the clicked card's measured
   geometry so the card visually becomes the modal. Optional fields render
   only when non-empty, so a half-filled project degrades to a short clean
   panel rather than a page of empty headings. */
export default function ProjectModal({ project, originRect, onClose }) {
  const panelRef = useRef(null)
  const reduced = useReducedMotion()

  // Open animation from the origin card's geometry.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !project) return

    if (reduced || !originRect) {
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: duration.fast })
      return
    }

    const target = panel.getBoundingClientRect()
    gsap.fromTo(
      panel,
      {
        x: originRect.left - target.left,
        y: originRect.top - target.top,
        scaleX: originRect.width / target.width,
        scaleY: originRect.height / target.height,
        opacity: 0.6,
        transformOrigin: 'top left',
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: duration.slow, ease: ease.out }
    )
  }, [project, originRect, reduced])

  // Escape to close, scroll lock, focus trap, focus restore.
  useEffect(() => {
    if (!project) return

    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label="Bezárás"
        onClick={onClose}
        className="absolute inset-0 bg-deep/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-4xl border border-divider bg-surface p-6 sm:p-10 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Bezárás"
          data-cursor="link"
          className="absolute right-5 top-5 rounded-full p-2 text-muted transition-colors duration-200 hover:text-ink"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">
          {project.label}
          {project.year && ` · ${project.year}`}
        </span>

        <h2
          id="project-modal-title"
          className="font-display font-extrabold text-2xl sm:text-3xl text-ink mt-3 leading-tight"
        >
          {project.title}
        </h2>

        {project.role && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted mt-2">{project.role}</p>
        )}

        <p className="text-muted leading-relaxed mt-5">{project.text}</p>

        {project.problem && (
          <section className="mt-8">
            <h3 className="font-display font-bold text-ink text-lg">A feladat</h3>
            <p className="text-muted leading-relaxed mt-2">{project.problem}</p>
          </section>
        )}

        {project.solution && (
          <section className="mt-6">
            <h3 className="font-display font-bold text-ink text-lg">A megoldás</h3>
            <p className="text-muted leading-relaxed mt-2">{project.solution}</p>
          </section>
        )}

        {project.gallery.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.gallery.map((src, i) => (
              <img key={i} src={src} alt="" className="rounded-2xl border border-divider w-full" />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-8">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.live || project.github !== '#') && (
          <div className="flex flex-wrap gap-3 mt-8">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary-dark hover:text-ink transition-colors duration-200"
              >
                Élő oldal <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary-dark hover:text-ink transition-colors duration-200"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
