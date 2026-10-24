import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Marquee from './components/Marquee'
import Features from './components/Features'
import QuestionBank from './components/QuestionBank'
import CodeLab from './components/CodeLab'
import MockTest from './components/MockTest'
import Playground from './components/Playground'
import Dashboard from './components/Dashboard'
import Colleges from './components/Colleges'
import Exams from './components/Exams'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Contact from './components/Contact'
import { useLang } from './i18n'

export default function App() {
  const { t } = useLang()
  const [dark, setDark] = useState(() => {
    try { return window.matchMedia('(prefers-color-scheme: dark)').matches } catch { return false }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div id="top">
      <ScrollProgress />
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <Features />
        <QuestionBank />
        <CodeLab />
        <MockTest />
        <Playground />
        <Dashboard />
        <Colleges />
        <Exams />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <footer className="border-t-2 border-[#DDE0F5] py-10 text-sm text-[#555B86] dark:border-night-line dark:text-[#9AA3C7]">
        <div className="wrap flex flex-wrap justify-between gap-4">
          <span>{t('PlaceMate Hub. A combined view of Dkoder and TechHike.')}</span>
          <span>
            <a className="underline" href="https://dkoder.co.in/" target="_blank" rel="noopener noreferrer">dkoder.co.in</a>
            {' · '}
            <a className="underline" href="https://tech-hike.in/" target="_blank" rel="noopener noreferrer">tech-hike.in</a>
          </span>
        </div>
      </footer>

      <BackToTop />
      <a
        href="#contact"
        className="btn fixed z-30 !px-4 !py-2.5 text-sm md:hidden"
        style={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', right: 'max(16px, env(safe-area-inset-right, 0px))' }}
      >
        {t('Book a demo')}
      </a>
    </div>
  )
}
