import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Check,
  GraduationCap,
  Code2,
  Code,
  Terminal,
  Database,
  Cloud,
  GitBranch,
  Cpu,
  Hexagon,
  Menu,
  X,
  Upload,
  AlertCircle,
} from 'lucide-react'
import portraitSunset from './assets/portrait-sunset.jpg'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Brand marks — lucide-react dropped logo icons, so these are
   small inline SVGs instead.
---------------------------------------------------------------- */
function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  )
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

/* ----------------------------------------------------------------
   Constants / Content
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Kezdőlap', href: '#kezdolap' },
  { label: 'Projektek', href: '#projektek' },
  { label: 'Rólam', href: '#rolam' },
  { label: 'Készségek', href: '#keszsegek' },
  { label: 'Árak', href: '#arak' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

const SOCIAL_LINKS = [
  { Icon: GithubIcon, href: 'https://github.com/rizmajermatelewi-del', label: 'GitHub' },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rizmajer-mate/', label: 'LinkedIn' },
]

const PRICING_TIERS = [
  {
    eyebrow: '01 / Kezdéshez',
    name: 'Landing Oldal',
    desc: 'Egyoldalas, letisztult weboldal bemutatkozáshoz vagy egy kampányhoz.',
    price: '150 000 Ft',
    priceSuffix: '-tól',
    features: ['Reszponzív dizájn', 'Alapvető SEO beállítás', 'Kapcsolati űrlap', '1–2 hetes átfutás'],
    highlight: false,
  },
  {
    eyebrow: '02 / Leggyakoribb',
    name: 'Webalkalmazás',
    desc: 'Egyedi funkciókkal rendelkező weboldal vagy admin felület.',
    price: '350 000 Ft',
    priceSuffix: '-tól',
    features: ['Egyedi backend & adatbázis', 'Admin / kezelőfelület', 'API integrációk', 'Teljesítmény-optimalizálás'],
    highlight: true,
  },
  {
    eyebrow: '03 / Egyedi',
    name: 'Egyedi Rendszer',
    desc: 'Komplex, skálázható rendszer specifikus üzleti igényekre.',
    price: 'Egyedi árazás',
    priceSuffix: '',
    features: ['Teljes körű architektúra tervezés', 'Több modul és integráció', 'Folyamatos támogatás', 'Skálázható infrastruktúra'],
    highlight: false,
  },
]

const PROJECTS_FULL = [
  {
    title: 'Rétes-rendelő',
    text: 'Online rendelés egy dabasi rétesháznak — élő menü, fiókkezelés, admin felület a háttérben.',
    tech: ['React', 'TanStack Start', 'Supabase'],
    label: 'Ügyfélprojekt',
    tone: { from: '#3A2A1E', to: '#2B1B12', accent: '#C08552' },
  },
  {
    title: 'AB Masszázs időpontfoglaló',
    text: 'Időpontfoglaló rendszer egy masszázsszalonnak — naptár, utalványok, külön admin és ügyfél nézet.',
    tech: ['PHP', 'MySQL', 'Docker'],
    label: 'Ügyfélprojekt',
    tone: { from: '#372921', to: '#2B1B12', accent: '#A9754A' },
  },
  {
    title: 'Business Value Builder',
    text: 'Saját árazási oldal egy valós esettanulmánnyal: végigmentem az inárcsi vállalkozásokon, kiszűrtem, kiknek nincs weboldaluk, és személyesen kerestem meg őket.',
    tech: ['React', 'TanStack Start'],
    label: 'Saját projekt',
    tone: { from: '#332720', to: '#2B1B12', accent: '#8B5A2B' },
  },
  {
    title: 'WebWise Studio',
    text: 'Ügynökségi koncepció-oldal egyedi React/AI alapú webalkalmazásokra — saját kezdeményezésű prototípus.',
    tech: ['React', 'Supabase', 'Framer Motion'],
    label: 'Saját projekt',
    tone: { from: '#2E241D', to: '#2B1B12', accent: '#6B4520' },
  },
]

const SKILLS_FULL = [
  {
    icon: Code,
    title: 'Frontend Fejlesztés',
    text: 'React és modern CSS-eszközök segítségével gyors, reszponzív és vizuálisan igényes felhasználói felületeket építek.',
  },
  {
    icon: Terminal,
    title: 'Backend Fejlesztés',
    text: 'Node.js és Express alapú API-k, üzleti logika és biztonságos autentikáció — a felület mögötti motor.',
  },
  {
    icon: Database,
    title: 'Adatbázis Tervezés',
    text: 'SQL és NoSQL adatbázisok tervezése és optimalizálása, hogy az alkalmazásod jól skálázódjon.',
  },
  {
    icon: Cloud,
    title: 'Felhő & Deployment',
    text: 'CI/CD folyamatok és felhő alapú hosting a zökkenőmentes, megbízható élesítésért.',
  },
  {
    icon: GitBranch,
    title: 'Verziókezelés & Csapatmunka',
    text: 'Git-alapú workflow, code review és dokumentáció, hogy a kód átlátható és karbantartható maradjon.',
  },
  {
    icon: Cpu,
    title: 'Teljesítmény Optimalizálás',
    text: 'Gyors betöltési idő, hatékony renderelés és jól optimalizált build — minden projektnél alapkövetelmény.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#kezdolap" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Hexagon className="h-5 w-5 text-deep" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span
              className={`font-display font-bold tracking-tight text-lg ${
                scrolled ? 'text-ink' : 'text-white'
              } transition-colors`}
            >
              Rizmajer Máté
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-tight pb-0.5 transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    scrolled ? 'text-ink/60 hover:text-primary' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
            <a
              href="#kapcsolat"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
            >
              Kérj ajánlatot
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Menü megnyitása"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Rizmajer Máté</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#kapcsolat"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold w-full"
          >
            Kérj ajánlatot
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="mt-6 flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full bg-divider/40 text-ink/60 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="kezdolap" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2400&q=80"
          alt="Kód egy monitoron"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-deep/90 via-deep/60 to-primary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1.5 w-1.5 rounded-full bg-white/40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] right-[26%] h-1 w-1 rounded-full bg-primary-light/70 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-4xl">
          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-5xl md:text-6xl">
              Weboldalak és <span className="chrome-text font-bold">rendszerek</span>,
            </span>
            <span
              className="hero-line-2 block font-display font-semibold text-primary text-6xl sm:text-7xl md:text-8xl lg:text-9xl mt-2"
              style={{ lineHeight: '0.92' }}
            >
              amik teljesítenek.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/75 text-base sm:text-lg mt-8 leading-relaxed">
            Full-stack fejlesztő vagyok Magyarországról. React, Node.js és modern
            web-technológiák segítségével építek gyors, megbízható digitális termékeket
            <span className="text-white"> — ötlettől az élesítésig.</span>
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kapcsolat"
              className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-deep font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/40"
            >
              Kérj ajánlatot
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:rizmajermatelewi@gmail.com"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full"
            >
              <Mail className="h-4 w-4" />
              rizmajermatelewi@gmail.com
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Görgess</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Stack Shuffler
---------------------------------------------------------------- */
function StackShuffler() {
  const items = [
    { tag: 'Frontend', label: 'React & Tailwind alapú modern felületek', metric: '98/100' },
    { tag: 'Backend', label: 'Node.js & Express API fejlesztés', metric: '<100ms' },
    { tag: 'DevOps', label: 'CI/CD és felhő alapú deployment', metric: '99.9%' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <span className="font-mono text-xs text-muted">{item.metric}</span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? '#8B5A2B' : '#E4D6C7' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Signature animation: Code Scan (re-skinned rain)
---------------------------------------------------------------- */
function CodeScan() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(12)

  const statuses = [
    { text: 'Minden zöld · figyelek', label: 'Stabil', tone: 'emerald' },
    { text: 'Hiba észlelve · #482. sor', label: 'Debug', tone: 'accent' },
    { text: 'Javítás fut · 12 mp', label: 'Fordítás', tone: 'primary' },
    { text: 'Build sikeres · élesben', label: 'Kész', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Kész') setCount((c) => c + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const glyphs = ['{ }', '< >', '01', '/>', '#', ';', '==']
  const drops = [
    { left: '15%', delay: '0.0s', dur: '2.6s', size: 22, glyph: glyphs[0] },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 19, glyph: glyphs[1] },
    { left: '38%', delay: '0.6s', dur: '2.8s', size: 24, glyph: glyphs[2] },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 20, glyph: glyphs[3] },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 23, glyph: glyphs[4] },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 19, glyph: glyphs[5] },
    { left: '85%', delay: '0.4s', dur: '2.9s', size: 22, glyph: glyphs[6] },
  ]

  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-400' : status.tone === 'accent' ? 'text-accent' : 'text-primary-light'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/25"
      style={{ background: 'linear-gradient(180deg, #241F19 0%, #1B170F 55%, #141110 100%)' }}
    >
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-primary/10 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-light">
            Élő build
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-white tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">ma</span>
        </div>
      </div>

      {/* Terminal bar with commit markers */}
      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="6" width="400" height="8" rx="4" fill="#8B5A2B" fillOpacity="0.22" />
        <rect x="0" y="7" width="400" height="2" fill="#6B4520" fillOpacity="0.4" />
        <rect x="0" y="4" width="6" height="12" rx="1.5" fill="#6B4520" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="12" rx="1.5" fill="#6B4520" fillOpacity="0.5" />
        {[60, 152, 248, 340].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="2" width="6" height="6" rx="1" fill="#6B4520" />
            <rect x={x - 4} y="13" width="8" height="3" rx="1" fill="#6B4520" fillOpacity="0.7" />
          </g>
        ))}
      </svg>

      {/* Falling code glyphs */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {drops.map((d, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: d.left,
              width: `${d.size}px`,
              height: `${d.size}px`,
              animation: `code-fall ${d.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${d.delay} infinite`,
              filter: 'drop-shadow(0 1px 3px rgba(139,90,43,0.35))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`chip-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A9754A" />
                <stop offset="50%" stopColor="#8B5A2B" />
                <stop offset="100%" stopColor="#6B4520" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="22" height="22" rx="6" fill={`url(#chip-${i})`} />
            <text x="12" y="15.5" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="700" fill="#2B1B12">
              {d.glyph}
            </text>
          </svg>
        ))}
      </div>

      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path d="M 0,6 Q 12.5,2 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6" fill="none" stroke="#A9754A" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M 0,8 Q 12.5,5 25,8 T 50,8 T 75,8 T 100,8 T 125,8 T 150,8 T 175,8 T 200,8" fill="none" stroke="#8B5A2B" strokeOpacity="0.22" strokeWidth="0.8" />
      </svg>

      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-light/50"
            style={{ left: r.left, width: '4px', height: '4px', animation: `code-ping 2.4s ease-out ${r.delay} infinite` }}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />}
          </span>
          <span key={status.text} className={`font-mono text-[10px] truncate ${toneText}`} style={{ animation: 'code-fadein 0.35s ease-out' }}>
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes code-fall {
          0%   { transform: translate(-50%, -10px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px) rotate(8deg); opacity: 0; }
        }
        @keyframes code-ping {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes code-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Cursor + Booking Scheduler
---------------------------------------------------------------- */
function BookingScheduler() {
  const days = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0:
        return { x: 8, y: 110, opacity: 0 }
      case 1:
        return { x: 60, y: 60, opacity: 1 }
      case 2:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4:
        return { x: 130, y: 130, opacity: 1 }
      default:
        return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">14. hét · Július</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          Foglalás
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-deep scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 7}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4 ? 'bg-accent text-deep scale-[1.02] shadow-md shadow-accent/30' : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Időpont lefoglalva' : 'Válassz egy napot'}
      </button>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, opacity: cursorPos.opacity, transform: step === 3 ? 'scale(0.85)' : 'scale(1)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#2B1B12" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Szakterület',
      heading: 'Modern Tech Stack',
      sub: 'Frontendtől backendig',
      text: 'React, Node.js és felhő-natív eszközök. Olyan rendszereket építek, amik gyorsak, skálázhatók és könnyen karbantarthatók.',
      Component: StackShuffler,
    },
    {
      eyebrow: '02 / Megbízhatóság',
      heading: 'Tiszta, Tesztelt Kód',
      sub: 'Build-ről build-re',
      text: 'Verziókezelés, automatizált tesztek és folyamatos integráció. A hibákat még élesítés előtt elkapom, nem utána.',
      Component: CodeScan,
    },
    {
      eyebrow: '03 / Együttműködés',
      heading: 'Egyeztetés & Indítás',
      sub: 'Az ötlettől a kódig',
      text: 'Foglalj egy rövid egyeztetést, ahol átbeszéljük az elképzelésed. Átlátható folyamat, egyértelmű mérföldkövek.',
      Component: BookingScheduler,
    },
  ]

  return (
    <section id="keszsegek" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div
          className={`feature-heading max-w-3xl mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Amiben segíthetek
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Három pillér.
            <span className="block font-display font-semibold text-primary-dark mt-1">Egy cél.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              style={{ transitionDelay: visible ? `${idx * 150}ms` : '0ms' }}
              className={`feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  strokeWidth={1.8}
                />
              </div>

              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-display font-medium text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Projects — placeholder cards, replaced with real work over time
---------------------------------------------------------------- */
function ProjectMock({ tone }) {
  return (
    <div
      className="relative h-48 w-full overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${tone.from} 0%, ${tone.to} 100%)` }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </div>
      <div className="p-5">
        <div className="h-3 w-2/3 rounded-full" style={{ background: `${tone.accent}55` }} />
        <div className="h-3 w-1/3 rounded-full mt-2.5 bg-white/15" />
        <div className="h-16 w-full rounded-xl mt-4 border border-white/10" style={{ background: `${tone.accent}18` }} />
        <div className="flex gap-2 mt-3">
          <div className="h-6 w-14 rounded-lg bg-white/10" />
          <div className="h-6 w-14 rounded-lg" style={{ background: `${tone.accent}30` }} />
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projektek" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Projektek</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Amin dolgozom.
            <span className="block font-display font-semibold text-primary-dark mt-1">Valós munka, nem mockup.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-xl">
            Négy projekt, amit ténylegesen megépítettem — kettő élő ügyfélmunka, kettő saját
            kezdeményezés, amivel a saját gondolkodásomat és árazási stratégiámat teszteltem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS_FULL.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`proj-card group bg-surface border border-divider rounded-4xl overflow-hidden hover:border-primary/40 transition-all duration-700 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <ProjectMock tone={p.tone} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink leading-tight">{p.title}</h3>
                <p className="text-muted text-[13px] mt-2.5 leading-relaxed">{p.text}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className="font-mono text-[9px] uppercase tracking-wide text-muted bg-background border border-divider px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   About — placeholder bio, replaced with the real story over time
---------------------------------------------------------------- */
function About() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const facts = [
    { label: 'Székhely', value: 'Magyarország' },
    { label: 'Fókusz', value: 'Full-stack fejlesztés' },
    { label: 'Elérhetőség', value: 'Nyitott új projektekre' },
  ]

  return (
    <section id="rolam" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative aspect-[3/4] rounded-6xl overflow-hidden border border-divider">
              <img
                src={portraitSunset}
                alt="Rizmajer Máté Levente naplementében, egy sziklán ülve"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent" />
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Rólam</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Néhány szó
              <span className="block font-display font-semibold text-primary-dark">rólam.</span>
            </h2>

            <div className="mt-6 space-y-4 text-muted text-base sm:text-lg leading-relaxed max-w-xl">
              <p>
                Rizmajer Máté Levente vagyok, nemrég végzett full-stack fejlesztő
                Magyarországról. Már az egyetem alatt is éles projekteken dolgoztam, mert a
                gyakorlatból tanulok a legjobban — a kód akkor válik igazán érthetővé, amikor egy
                valódi probléma megoldásához használom.
              </p>
              <p>
                Szeretem, ha egy weboldal vagy alkalmazás nemcsak jól néz ki, hanem tényleg
                működik: gyors, stabil és a felhasználó számára egyértelmű. Szívesen dolgozom
                együtt kis- és középvállalkozásokkal, akik szeretnék digitalizálni vagy megújítani
                az online jelenlétüket.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {facts.map((f, i) => (
                <div key={i} className="rounded-2xl border border-divider bg-surface p-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-primary-dark">{f.label}</p>
                  <p className="font-display font-semibold text-ink text-sm mt-1">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift-on-hover inline-flex items-center gap-2 bg-surface border border-divider text-ink px-5 py-3 rounded-full font-medium text-sm hover:border-primary/40 hover:text-primary-dark transition-colors duration-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01',
      title: 'Tapasztalat',
      target: 3,
      suffix: '+',
      label: 'év projekt-tapasztalat',
      desc: 'Három év, amit valós projekteken, iskola mellett szereztem. Elmélet helyett gyakorlat.',
    },
    {
      n: '02',
      title: 'Lefedettség',
      target: 100,
      suffix: '%',
      label: 'full-stack lefedettség',
      desc: 'Frontendtől az adatbázisig egyedül is végig tudom vinni egy termék fejlesztését.',
    },
    {
      n: '03',
      title: 'Projektek',
      target: 15,
      suffix: '+',
      label: 'lezárt projekt',
      desc: 'Kísérleti ötletektől a működő alkalmazásokig — mindegyikből tanultam valamit.',
    },
  ]

  return (
    <section id="filozofia" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ Számokban
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              A számok
              <span className="block font-display font-semibold text-primary-dark">mögöttem.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Nem marketingszöveg — csak amit ténylegesen leteszek az asztalra minden projektnél.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pillar-card relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>

              <span className="absolute top-9 right-9 sm:top-12 sm:right-12 font-mono text-[9px] uppercase tracking-widest text-primary/30">
                {p.n}.dev
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Egyeztetés',
      tagline: 'Először meghallgatlak.',
      text: 'Megbeszéljük az elképzelésed és a céljaidat. Nincsenek rejtett költségek — csak világos elvárások, mielőtt bármi elkezdődne.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      alt: 'Fejlesztő laptop előtt kódot néz',
      meta: 'Lépés 1 / Listen',
    },
    {
      num: '02',
      title: 'Tervezés & Fejlesztés',
      tagline: 'Megtalálom a legjobb utat.',
      text: 'Kiválasztom a feladathoz illő technológiákat, és iteratívan építem fel a terméket — folyamatos visszajelzés mellett.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      alt: 'Kód íródik egy szerkesztőben',
      meta: 'Lépés 2 / Build',
    },
    {
      num: '03',
      title: 'Átadás & Támogatás',
      tagline: 'A leadás után sem tűnök el.',
      text: 'Élesítés, tesztelés, dokumentáció — és elérhető maradok, ha kérdés vagy bővítés merül fel.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rendezett fejlesztői munkaállomás',
      meta: 'Lépés 3 / Support',
    },
  ]

  return (
    <section id="folyamat" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Így dolgozom</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Három lépés.
          <span className="block font-display font-semibold text-primary-dark">Semmi meglepetés.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    RM Protokoll
                  </span>
                </div>

                <div className="my-12">
                  <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-display font-medium text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img src={step.image} alt={step.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Lépés {step.num}</span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / Rizmajer Máté
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   ServicesGrid
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Amit tudok</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              A teljes <span className="chrome-text font-bold">eszköztár</span>,
              <span className="block font-display font-semibold text-primary">egy kézben.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            Önállóan viszem végig a projekteket az ötlettől az élesítésig — kis- és
            középvállalkozásoknak Magyarországon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SKILLS_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
                className={`svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-all duration-700 ease-out relative ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Pricing
---------------------------------------------------------------- */
function Pricing() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="arak" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 sm:mb-20 text-center mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Árazás</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Egyszerű csomagok.
            <span className="block font-display font-semibold text-primary-dark mt-1">Rugalmas megoldások.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed">
            Az árak tájékoztató jellegűek és a projekt egyedi igényeitől függenek. Kérj
            személyre szabott ajánlatot — nincsenek rejtett költségek.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pricing-card relative bg-surface border rounded-5xl p-8 sm:p-10 transition-all duration-700 ease-out ${
                visible ? 'opacity-100' : 'opacity-0 translate-y-10'
              } ${
                tier.highlight
                  ? `border-primary shadow-xl shadow-primary/15 ${visible ? 'lg:-translate-y-3' : ''}`
                  : 'border-divider hover:border-primary/30 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest bg-primary text-deep px-3 py-1 rounded-full shadow-md">
                  Legnépszerűbb
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">{tier.eyebrow}</span>
              <h3 className="font-display font-bold text-2xl text-ink mt-3">{tier.name}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">{tier.desc}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
                  {tier.price}
                </span>
                {tier.priceSuffix && (
                  <span className="font-display font-medium text-primary-dark text-lg">{tier.priceSuffix}</span>
                )}
              </div>

              <ul className="mt-7 space-y-3">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#kapcsolat"
                className={`magnetic-btn mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-colors duration-300 ${
                  tier.highlight
                    ? 'bg-primary text-deep shadow-lg shadow-primary/30'
                    : 'bg-background border border-divider text-ink hover:border-primary/40 hover:text-primary-dark'
                }`}
              >
                Ajánlatkérés
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: GraduationCap,
      title: 'Frissen végzett, gyakorlott fejlesztő',
      text: 'Programozói végzettséggel és három év valós projekt-tapasztalattal a háttérben — elmélet és gyakorlat együtt.',
    },
    {
      Icon: Code2,
      title: 'Valódi, működő projektek',
      text: 'Nem csak tanulói feladatok — olyan alkalmazásokat mutatok, amik éles környezetben is megállják a helyüket.',
    },
    {
      Icon: Clock,
      title: 'Gyors, rugalmas kommunikáció',
      text: 'Rövid határidőn belül válaszolok, és rugalmasan alkalmazkodom a projekted ütemezéséhez.',
    },
  ]

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Miért engem válassz</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Több, mint egy portfólió.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#kapcsolat"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Kérj ajánlatot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
const AUTOCOMPLETE_MAP = { name: 'name', email: 'email', company: 'organization', projectType: 'off' }

function Field({ label, name, type = 'text', required, value, onChange }) {
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
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqgvjbv'

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB per file

function ContactForm() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', projectType: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)
  const honeypotRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    if (honeypotRef.current?.value) return // bot trap — silently drop
    setStatus('sending')
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('company', form.company)
      data.append('projectType', form.projectType)
      data.append('message', form.message)
      files.forEach((f) => data.append('attachments', f))

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const handleFiles = (newFiles) => {
    const accepted = Array.from(newFiles).filter((f) => f.size <= MAX_FILE_SIZE)
    setFiles((prev) => [...prev, ...accepted].slice(0, 5))
  }

  return (
    <section id="kapcsolat" ref={sectionRef} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Kapcsolat</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Hogyan segíthetek
              <span className="block font-display font-semibold text-primary-dark">a vállalkozásodnak?</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Írj pár mondatot arról, mire van szükséged, és hamarosan jelentkezem.
            </p>

            <div className="mt-10 space-y-4">
              <a href="mailto:rizmajermatelewi@gmail.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-deep" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Írj emailt</span>
                  <span className="font-display font-semibold text-ink text-lg">rizmajermatelewi@gmail.com</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Székhely</span>
                  <span className="font-display font-semibold text-ink text-lg">Magyarország</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Válaszidő</span>
                  <span className="font-display font-semibold text-ink text-lg">24 órán belül</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">Adatkezelés</p>
              <p className="text-sm text-muted leading-relaxed">
                Az adataid biztonságban vannak. Kizárólag a megkeresésed kapcsán veszem fel veled a
                kapcsolatot, harmadik féllel nem osztom meg őket.
              </p>
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              <input
                ref={honeypotRef}
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              {status === 'error' && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-accent-dark/30 bg-accent/10 p-4">
                  <AlertCircle className="h-5 w-5 text-accent-dark shrink-0 mt-0.5" />
                  <p className="text-sm text-accent-dark leading-relaxed">
                    Hiba történt a küldés során. Próbáld újra, vagy írj emailt közvetlenül a{' '}
                    <a href="mailto:rizmajermatelewi@gmail.com" className="underline font-medium">
                      rizmajermatelewi@gmail.com
                    </a>{' '}
                    címre.
                  </p>
                </div>
              )}
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field name="name" label="Neved" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field name="email" label="E-mail címed" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field name="company" label="Cégnév" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field name="projectType" label="Projekt típusa" value={form.projectType} onChange={(v) => setForm({ ...form, projectType: v })} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">Üzeneted *</label>
                    <textarea
                      id="message"
                      name="message"
                      autoComplete="off"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Meséld el röviden a projekted vagy az ötleted..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>

                  <div
                    ref={dropRef}
                    onDragOver={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.add('!border-primary', '!bg-primary/5')
                    }}
                    onDragLeave={() => {
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                      handleFiles(e.dataTransfer.files)
                    }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input
                      type="file"
                      multiple
                      id="file-up"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">
                        Csatolj egy briefet vagy referenciát (opcionális)
                      </p>
                      <p className="text-xs text-muted mt-1">Kattints vagy húzd ide a fájlokat (max 5 fájl)</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">Hamarosan válaszolok. A *-gal jelölt mezők kötelezőek.</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Küldés...' : 'Üzenet küldése'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">Köszönöm a megkeresésed</h3>
                  <p className="text-muted max-w-md mx-auto">
                    Hamarosan jelentkezem, hogy megbeszéljük a részleteket.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div
        className={`relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Weboldalakat és
            <span className="font-display font-semibold text-primary block"><span className="chrome-text font-bold">alkalmazásokat</span> építek.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Rizmajer Máté — full-stack fejlesztő Magyarországról, elérhető távoli és helyi
              projektekre egyaránt.
            </p>
            <a href="#kapcsolat" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Kérj ajánlatot
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <Hexagon className="h-5 w-5 text-deep" strokeWidth={2.4} />
              </span>
              <span className="font-display font-bold text-lg">Rizmajer Máté</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Full-stack fejlesztő React, Node.js és modern web-technológiák szakértelmével.
              Ötlettől a működő termékig.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Készségek</p>
            <ul className="space-y-2.5">
              {SKILLS_FULL.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a href="#keszsegek" className="text-white/65 hover:text-primary transition text-sm">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Rólam</p>
            <ul className="space-y-2.5">
              <li><a href="#projektek" className="text-white/65 hover:text-primary transition text-sm">Projektek</a></li>
              <li><a href="#rolam" className="text-white/65 hover:text-primary transition text-sm">Rólam</a></li>
              <li><a href="#folyamat" className="text-white/65 hover:text-primary transition text-sm">Folyamat</a></li>
              <li><a href="#arak" className="text-white/65 hover:text-primary transition text-sm">Árak</a></li>
              <li><a href="#kapcsolat" className="text-white/65 hover:text-primary transition text-sm">Kapcsolat</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Kapcsolat</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:rizmajermatelewi@gmail.com" className="text-white/65 hover:text-primary transition text-sm">
                  rizmajermatelewi@gmail.com
                </a>
              </li>
              <li className="text-white/65 text-sm">Magyarország</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              Elérhető új projektekre
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full text-white/50 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/adatvedelem" className="hover:text-primary transition">Adatvédelem</Link>
            <Link to="/aszf" className="hover:text-primary transition">ÁSZF</Link>
            <span>© 2026 Rizmajer Máté</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 200)
    const t2 = setTimeout(refresh, 1000)
    document.fonts?.ready?.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <Pricing />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
