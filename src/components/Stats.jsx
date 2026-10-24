import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { CONFIRMED } from '../data'
import { useLang } from '../i18n'

function Count({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  // Start at the final value so the first frame is complete, then replay the count on view.
  const [v, setV] = useState(to)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>
}

export default function Stats() {
  const { t } = useLang()
  const items = [
    { c: 'bg-sun text-ink', n: <Count to={CONFIRMED.questions} suffix="+" />, l: 'real placement questions' },
    { c: 'bg-pink text-ink', n: <Count to={CONFIRMED.companies} suffix="+" />, l: 'companies covered' },
    { c: 'bg-teal text-ink', n: '₹1,000', l: 'for 4 years, per student' },
    { c: 'bg-royal text-white', n: '2', l: 'exam tracks: TCS NQT and InfyTQ' },
  ]
  return (
    <section className="py-6">
      <div className="wrap grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.l} className={`min-w-0 rounded-[20px] border-2 border-ink p-5 dark:border-night-line ${s.c}`}>
            <b className="block font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none tabular-nums">{s.n}</b>
            <span className="mt-1 block text-[0.95rem] font-medium">{t(s.l)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
