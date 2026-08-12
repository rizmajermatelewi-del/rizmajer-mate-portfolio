import { Component } from 'react'
import { localeFromPath } from '../i18n/locales'
import { t } from '../i18n/t'

/* The one place that reads the locale from window.location rather than from
   useLocale(). Two reasons, both structural: this is a class component, so it
   cannot call a hook, and main.jsx mounts it OUTSIDE BrowserRouter on purpose
   — a boundary inside the router would not catch a router-level failure. So
   there is no router context here to read a location from.

   Reading window.location directly is safe here in a way it would not be
   elsewhere: this renders only after a client-side crash, so there is no
   server pass to disagree with and no hydration to mismatch. */
const COPY = {
  eyebrow: { hu: 'Hiba történt', en: 'Something went wrong' },
  heading: { hu: 'Az oldal betöltése félbeszakadt.', en: 'The page stopped loading partway.' },
  body: {
    hu: 'Ez az én hibám, nem a tiéd. Amíg javítom, írj közvetlenül — ugyanúgy válaszolok egy munkanapon belül.',
    en: 'This is my fault, not yours. While I fix it, write to me directly — I answer within one working day either way.',
  },
}

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

    const locale = localeFromPath(window.location.pathname)

    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-background">
        <div className="max-w-md text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark">
            {t(COPY.eyebrow, locale)}
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-4 leading-tight tracking-tight">
            {t(COPY.heading, locale)}
          </h1>
          <p className="text-muted mt-5 leading-relaxed">{t(COPY.body, locale)}</p>
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
