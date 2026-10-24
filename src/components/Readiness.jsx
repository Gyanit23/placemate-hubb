import { useEffect, useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { AREAS, PLAN, READY_Q } from '../data'
import { useLang } from '../i18n'
import { useProgress } from '../progress'

const MAX = 3
const BAND = (p) =>
  p < 35 ? ['Getting started', 'bg-pink text-ink']
  : p < 60 ? ['Building momentum', 'bg-sun text-ink']
  : p < 80 ? ['Almost there', 'bg-teal text-ink']
  : ['Drive ready', 'bg-royal text-white']
const BAR = { Coding: 'bg-teal', Aptitude: 'bg-sun', 'CS core': 'bg-royal', Interview: 'bg-pink' }

export default function Readiness() {
  const { t } = useLang()
  const { award } = useProgress()
  const [i, setI] = useState(0)
  const [ans, setAns] = useState([])
  const done = i >= READY_Q.length

  useEffect(() => {
    if (done) award('readiness', 50, 'self-aware')
  }, [done, award])

  const pick = (n) => {
    const a = [...ans]
    a[i] = n
    setAns(a)
    setI(i + 1)
  }
  const restart = () => { setI(0); setAns([]) }

  let result = null
  if (done) {
    const total = ans.reduce((n, v) => n + v, 0)
    const pct = Math.round((total / (READY_Q.length * MAX)) * 100)
    const areas = AREAS.map((a) => {
      const ks = READY_Q.map((q, k) => [q, k]).filter(([q]) => q.a === a)
      const sc = ks.reduce((n, [, k]) => n + ans[k], 0)
      return { a, pct: Math.round((sc / (ks.length * MAX)) * 100) }
    })
    const order = [...areas].sort((x, y) => x.pct - y.pct)
    result = { pct, areas, order, band: BAND(pct) }
  }

  return (
    <div className="card min-w-0 !p-6 shadow-poplg sm:!p-7" style={{ '--shadow': '#FF7A3D' }}>
      <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t('Readiness check')}</div>
      <h3 className="mt-1 text-2xl font-extrabold">{t('How ready are you for campus drives?')}</h3>

      {!done ? (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="badge">{t('Question')} {i + 1} {t('of')} {READY_Q.length}</span>
            <span className="font-mono text-xs text-[#555B86] dark:text-[#9AA3C7]">{t(READY_Q[i].a)}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
            <div className="h-full bg-gradient-to-r from-tang via-sun to-teal transition-all" style={{ width: `${(i / READY_Q.length) * 100}%` }} />
          </div>
          <p className="mt-5 text-lg font-semibold">{READY_Q[i].q}</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {READY_Q[i].o.map((o, n) => (
              <button
                key={o}
                onClick={() => pick(n)}
                aria-pressed={ans[i] === n}
                className={`rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors ${ans[i] === n ? 'border-royal bg-royal-tint dark:bg-royal/25' : 'border-ink hover:bg-royal-tint dark:border-night-line dark:hover:bg-royal/15'}`}
              >
                {o}
              </button>
            ))}
          </div>
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="btn btn-alt mt-5 !px-4 !py-2 text-sm disabled:opacity-40 dark:!bg-night-card">
            <ArrowLeft size={16} /> {t('Back')}
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-5">
            <div className="grid h-32 w-32 flex-none place-items-center rounded-full" style={{ background: `conic-gradient(#FF4F8B ${result.pct * 3.6}deg, var(--ring-track) 0)` }}>
              <div className="grid h-24 w-24 place-items-center rounded-full bg-white font-display text-3xl font-extrabold tabular-nums dark:bg-night-card">{result.pct}%</div>
            </div>
            <div className="min-w-0">
              <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t('Your readiness')}</div>
              <span className={`mt-1 inline-block rounded-full border-2 border-ink px-3 py-1 font-display text-lg font-extrabold dark:border-night-line ${result.band[1]}`}>{t(result.band[0])}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {result.areas.map((a) => (
              <div key={a.a}>
                <div className="mb-1 flex justify-between text-sm"><span>{t(a.a)}</span><span className="font-mono tabular-nums">{a.pct}%</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
                  <div className={`h-full rounded-full ${BAR[a.a]}`} style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <h4 className="mt-6 text-lg font-semibold">{t('Your 4-week plan')}</h4>
          <ol className="mt-3 grid gap-2.5">
            {result.order.slice(0, 3).map((o, k) => (
              <li key={o.a} className="rounded-xl border-2 border-[#DDE0F5] p-3 dark:border-night-line">
                <b className="font-mono text-xs uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t('Week')} {k + 1} · {t(o.a)}</b>
                <p className="mt-1 text-sm">{t(PLAN[o.a])}</p>
              </li>
            ))}
            <li className="rounded-xl border-2 border-[#DDE0F5] p-3 dark:border-night-line">
              <b className="font-mono text-xs uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t('Week')} 4 · {t('Mock Test')}</b>
              <p className="mt-1 text-sm">{t('Take two timed mock tests, review every mistake and revisit your weakest area.')}</p>
            </li>
          </ol>
          <p className="mt-4 text-sm text-[#555B86] dark:text-[#9AA3C7]">{t('This is a self-assessment, not an official score.')}</p>
          <button onClick={restart} className="btn mt-4"><RotateCcw size={18} /> {t('Retake the check')}</button>
        </div>
      )}
    </div>
  )
}
