import { useEffect, useState } from 'react'
import { Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { NAV } from '../data'
import { useLang } from '../i18n'

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { lang, setLang, t } = useLang()

  // Highlight the link of the section that is in the middle of the screen.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header
      className="sticky z-30 border-b-2 border-[#DDE0F5] bg-[#F6F7FF] dark:border-night-line dark:bg-night"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="wrap flex items-center gap-2 py-3 sm:gap-3 min-[1400px]:!max-w-[1360px]">
        <a href="#top" className="mr-auto flex items-center gap-2 font-display text-xl font-extrabold">
          <span
            className="inline-block h-7 w-7 rounded-lg"
            style={{ background: 'conic-gradient(#FF4F8B,#FFC93C,#0FBFA5,#3D6BFF,#FF4F8B)' }}
          />
          PlaceMate Hub
        </a>
        <nav className="hidden items-center gap-0.5 min-[1400px]:flex" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? 'true' : undefined}
              className={`rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${active === n.id ? 'bg-ink text-white dark:bg-[#F1F3FF] dark:text-ink' : 'hover:bg-royal-tint dark:hover:bg-royal/20'}`}
            >
              {t(n.label)}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          aria-label="Switch language between English and Hindi"
          className="flex h-10 items-center gap-1.5 rounded-full border-2 border-[#DDE0F5] bg-white px-3 text-sm font-bold dark:border-night-line dark:bg-night-card"
        >
          <Languages size={16} /> {lang === 'en' ? 'हिंदी' : 'English'}
        </button>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Switch light or dark theme"
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#DDE0F5] bg-white dark:border-night-line dark:bg-night-card"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href="#contact" className="btn hidden !px-4 !py-2 text-sm md:inline-flex">{t('Book a demo')}</a>
        <button onClick={() => setOpen(!open)} aria-label="Open menu" aria-expanded={open} className="grid h-10 w-10 place-items-center min-[1400px]:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="wrap flex flex-wrap gap-2 pb-4 min-[1400px]:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="chip">{t(n.label)}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="chip !bg-sun !text-ink">{t('Book a demo')}</a>
        </nav>
      )}
    </header>
  )
}
