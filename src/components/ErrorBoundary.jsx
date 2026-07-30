import { Component } from 'react'

/* Client-side safety net.

   This site prerenders every route to real HTML, but main.jsx mounts with
   createRoot rather than hydrateRoot — React throws the prerendered markup away
   and renders fresh. That is a deliberate trade (no hydration-mismatch surface)
   with one consequence: if a render throws in the browser, the visitor is left
   looking at a blank page, because the server's markup has already been
   discarded. A crawler still sees the full document; a customer sees nothing.

   So the fallback's only job is to keep the one thing that matters reachable:
   the email address. It deliberately offers no reload button — whatever threw
   will throw again on mount, and a button that changes nothing is worse than no
   button at all.

   Mounted on the client only (see main.jsx). Error boundaries do not run during
   renderToString, and they should not: if a component throws at build time,
   `npm run build` must fail loudly rather than ship a page containing this. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    // No analytics endpoint on this site, so the console is the only sink.
    console.error('Unhandled render error:', error, info?.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-background">
        <div className="max-w-md text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark">
            Hiba történt
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-4 leading-tight tracking-tight">
            Az oldal betöltése félbeszakadt.
          </h1>
          <p className="text-muted mt-5 leading-relaxed">
            Ez az én hibám, nem a tiéd. Amíg javítom, írj közvetlenül — ugyanúgy válaszolok
            egy munkanapon belül.
          </p>
          <a
            href="mailto:rizmajermatelewi@gmail.com"
            className="mt-8 inline-flex items-center justify-center bg-primary text-white font-semibold px-7 py-4 rounded-full shadow-lg shadow-primary/30"
          >
            rizmajermatelewi@gmail.com
          </a>
        </div>
      </main>
    )
  }
}
