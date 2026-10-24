import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  if (!show) return null
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className="fixed z-30 grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-white shadow-popsm transition-transform hover:-translate-y-1 dark:border-night-line dark:bg-night-card"
      style={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', left: 'max(16px, env(safe-area-inset-left, 0px))' }}
    >
      <ArrowUp size={20} />
    </a>
  )
}
