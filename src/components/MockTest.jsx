import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ListChecks, Play, RotateCcw, XCircle } from 'lucide-react'
import { MOCK } from '../data'
import { SectionHead } from './ui'
import { useLang } from '../i18n'
import Confetti from './Confetti'
import { useProgress } from '../progress'

const TOTAL = 180
const SECTIONS = ['Aptitude', 'Verbal', 'Technical']
const SEC_COLOR = { Aptitude: 'bg-sun', Verbal: 'bg-pink', Technical: 'bg-teal' }
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function MockTest() {
  const { t } = useLang()
  const [phase, setPhase] = useState('start') // start | run | done
  const [i, setI] = useState(0)
  const [ans, setAns] = useState({})
  const [left, setLeft] = useState(TOTAL)

  useEffect(() => {
    if (phase !== 'run') return
    const id = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase === 'run' && left <= 0) setPhase('done')
  }, [left, phase])

  const start = () => { setAns({}); setI(0); setLeft(TOTAL); setPhase('run') }
  const q = MOCK[i]
  const score = MOCK.reduce((n, m, k) => n + (ans[k] === m.a ? 1 : 0), 0)
  const used = Math.min(TOTAL, TOTAL - Math.max(left, 0))
  const low = left <= 30
  const { award } = useProgress()

  useEffect(() => {
    if (phase !== 'done') return
    award('mock-done', 10 + score * 10, 'timekeeper')
    if (score >= 5) award('mock-pro', 25, 'mock-pro')
  }, [phase, score, award])

  return (
    <section id="mock" className="py-20">
      <div className="wrap">
        <SectionHead
          eyebrow={t('Timed practice')}
          title={t('Sit a mock test')}
          lead={t('Six questions, three minutes, three sections. Submit early or let the timer finish, then review every answer.')}
        />

        <div className="card mt-9 !p-6 shadow-poplg sm:!p-8" style={{ '--shadow': '#FF7A3D' }}>
          {phase === 'start' && (
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="text-2xl font-extrabold">{t('Sample mock test')}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[['6 questions', ListChecks], ['3 minutes', Clock]].map(([l, I]) => (
                    <span key={l} className="badge flex items-center gap-1.5"><I size={14} /> {t(l)}</span>
                  ))}
                  <span className="badge">{t('3 sections')}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SECTIONS.map((s) => (
                    <span key={s} className={`badge text-ink ${SEC_COLOR[s]}`}>{t(s)}</span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-[#555B86] dark:text-[#9AA3C7]">{t('Sample questions for this preview.')}</p>
              </div>
              <button onClick={start} className="btn justify-center"><Play size={18} /> {t('Start test')}</button>
            </div>
          )}

          {phase === 'run' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`badge text-ink ${SEC_COLOR[q.sec]}`}>{t(q.sec)}</span>
                  <span className={`flex items-center gap-2 font-mono text-lg font-bold tabular-nums ${low ? 'text-pink' : ''}`} role="timer" aria-live="off">
                    <Clock size={18} /> {fmt(Math.max(left, 0))}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
                  <div className={`h-full transition-all duration-1000 ease-linear ${low ? 'bg-pink' : 'bg-teal'}`} style={{ width: `${(Math.max(left, 0) / TOTAL) * 100}%` }} />
                </div>
                <p className="mt-6 text-lg font-semibold">
                  <span className="mr-2 font-mono text-sm text-[#555B86] dark:text-[#9AA3C7]">{t('Question')} {i + 1}</span>
                  {q.q}
                </p>
                <div className="mt-4 grid gap-2.5">
                  {q.o.map((o, n) => (
                    <button
                      key={o}
                      onClick={() => setAns({ ...ans, [i]: n })}
                      aria-pressed={ans[i] === n}
                      className={`rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors ${ans[i] === n ? 'border-royal bg-royal-tint dark:bg-royal/25' : 'border-ink hover:bg-royal-tint dark:border-night-line dark:hover:bg-royal/15'}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="btn btn-alt !px-4 !py-2 text-sm disabled:opacity-40">{t('Previous')}</button>
                  {i < MOCK.length - 1 ? (
                    <button onClick={() => setI(i + 1)} className="btn !px-4 !py-2 text-sm">{t('Next')}</button>
                  ) : null}
                  <button onClick={() => setPhase('done')} className="btn !bg-teal !px-4 !py-2 text-sm sm:ml-auto">{t('Submit test')}</button>
                </div>
              </div>

              <aside className="min-w-0">
                <div className="mb-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#555B86] dark:text-[#9AA3C7]">{t('Questions')}</div>
                <div className="grid grid-cols-6 gap-2 lg:grid-cols-3">
                  {MOCK.map((_, k) => (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      aria-label={`${t('Question')} ${k + 1}`}
                      aria-current={k === i}
                      className={`grid h-10 place-items-center rounded-lg border-2 font-mono text-sm font-bold ${k === i ? 'border-royal bg-royal text-white' : ans[k] !== undefined ? 'border-teal bg-teal-tint text-ink dark:bg-teal/20 dark:text-white' : 'border-ink dark:border-night-line'}`}
                    >
                      {k + 1}
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {phase === 'done' && (
            <motion.div initial={{ y: 16 }} animate={{ y: 0 }}>
              {score >= 5 && <Confetti />}
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="rounded-2xl border-2 border-ink bg-sun p-6 text-center text-ink dark:border-night-line">
                  <div className="font-mono text-xs font-semibold uppercase tracking-widest">{t('Your score')}</div>
                  <div className="font-display text-6xl font-extrabold tabular-nums">{score}/{MOCK.length}</div>
                  <div className="mt-1 font-mono text-sm">{t('Time used')}: {fmt(used)}</div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{t('By section')}</h3>
                  <div className="mt-3 grid gap-3">
                    {SECTIONS.map((s) => {
                      const qs = MOCK.map((m, k) => [m, k]).filter(([m]) => m.sec === s)
                      const ok = qs.filter(([m, k]) => ans[k] === m.a).length
                      return (
                        <div key={s}>
                          <div className="mb-1 flex justify-between text-sm"><span>{t(s)}</span><span className="font-mono tabular-nums">{ok}/{qs.length}</span></div>
                          <div className="h-3 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
                            <div className={`h-full rounded-full ${SEC_COLOR[s]}`} style={{ width: `${(ok / qs.length) * 100}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <h3 className="mt-8 text-lg font-semibold">{t('Review answers')}</h3>
              <ol className="mt-3 grid gap-3">
                {MOCK.map((m, k) => {
                  const right = ans[k] === m.a
                  return (
                    <li key={k} className="rounded-2xl border-2 border-[#DDE0F5] p-4 dark:border-night-line">
                      <div className="flex items-start gap-3">
                        {right ? <CheckCircle2 className="mt-0.5 flex-none text-teal" size={20} /> : <XCircle className="mt-0.5 flex-none text-pink" size={20} />}
                        <div className="min-w-0">
                          <p className="font-semibold">{m.q}</p>
                          <p className="mt-1 text-sm text-[#555B86] dark:text-[#9AA3C7]">
                            {t('Your answer')}: {ans[k] === undefined ? t('Not answered') : m.o[ans[k]]}
                            {!right && <> · {t('Correct answer')}: <b className="text-ink dark:text-white">{m.o[m.a]}</b></>}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
              <button onClick={start} className="btn mt-6"><RotateCcw size={18} /> {t('Take it again')}</button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
