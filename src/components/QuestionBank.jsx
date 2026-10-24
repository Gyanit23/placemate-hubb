import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CheckCircle2, RotateCcw, X, XCircle } from 'lucide-react'
import { MCQ, QUESTIONS, SALARY } from '../data'
import { SectionHead } from './ui'
import { useLang } from '../i18n'
import Confetti from './Confetti'
import { useProgress } from '../progress'

const TYPES = [
  ['all', 'All'],
  ['coding', 'Coding problems'],
  ['mcq', 'MCQs'],
  ['real', 'Real-life experiences'],
]
const COMPANIES = ['All', ...Array.from(new Set(QUESTIONS.map((q) => q.co)))]
const DIFF = { Easy: 'bg-teal', Medium: 'bg-sun', Hard: 'bg-pink' }

function Group({ label, value, setValue, options }) {
  const { t } = useLang()
  return (
    <div className="min-w-0">
      <div className="mb-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#555B86] dark:text-[#9AA3C7]">{t(label)}</div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => {
          const [v, l] = Array.isArray(o) ? o : [o, o]
          return <button key={v} className="chip" aria-pressed={value === v} onClick={() => setValue(v)}>{t(l)}</button>
        })}
      </div>
    </div>
  )
}

function Explorer() {
  const { t } = useLang()
  const [type, setType] = useState('all')
  const [co, setCo] = useState('All')
  const [sal, setSal] = useState('All')
  const [d, setD] = useState('All')
  const list = useMemo(
    () => QUESTIONS.filter((q) => (type === 'all' || q.type === type) && (co === 'All' || q.co === co) && (sal === 'All' || q.sal === sal) && (d === 'All' || q.d === d)),
    [type, co, sal, d]
  )
  const kind = { coding: 'Coding', mcq: 'MCQ', real: 'Real-life' }
  return (
    <div className="card !p-6 shadow-poplg sm:!p-7" style={{ '--shadow': '#0FBFA5' }}>
      <div className="flex flex-wrap gap-x-8 gap-y-5">
        <Group label="Type" value={type} setValue={setType} options={TYPES} />
        <Group label="Company" value={co} setValue={setCo} options={COMPANIES} />
        <Group label="Salary band" value={sal} setValue={setSal} options={['All', ...SALARY]} />
        <Group label="Difficulty" value={d} setValue={setD} options={['All', 'Easy', 'Medium', 'Hard']} />
      </div>
      <div className="mt-6 grid gap-3" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {list.map((q) => (
            <motion.div
              key={q.t}
              layout
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="grid items-center gap-3 rounded-2xl border-2 border-[#DDE0F5] px-4 py-3.5 dark:border-night-line sm:grid-cols-[1fr_auto]"
            >
              <div className="min-w-0">
                <h4 className="font-semibold">{q.t}</h4>
                <small className="text-[#555B86] dark:text-[#9AA3C7]">{t(kind[q.type])} · {q.topic}</small>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                <span className="badge bg-royal-tint dark:bg-royal/25">{q.co}</span>
                <span className="badge">{t(q.sal)}</span>
                <span className={`badge text-ink ${DIFF[q.d]}`}>{t(q.d)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!list.length && <div className="p-5 text-center text-[#555B86] dark:text-[#9AA3C7]">{t('No example questions match. Try a different mix of filters.')}</div>}
      </div>
      <p className="mt-4 text-sm text-[#555B86] dark:text-[#9AA3C7]">
        {t('These entries are examples for this preview. The real question bank lives on the Dkoder and TechHike platforms.')}
      </p>
    </div>
  )
}

function Quiz() {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const [pick, setPick] = useState(null)
  const [score, setScore] = useState(0)
  const { award } = useProgress()
  const done = i >= MCQ.length
  const q = MCQ[i]

  useEffect(() => {
    if (!done) return
    award('quiz-done', 10 + score * 8)
    if (score === MCQ.length) award('quiz-ace', 20, 'quiz-ace')
  }, [done, score, award])

  const choose = (n) => {
    if (pick !== null) return
    setPick(n)
    if (n === q.a) setScore((s) => s + 1)
  }
  const next = () => { setPick(null); setI((x) => x + 1) }
  const reset = () => { setI(0); setPick(null); setScore(0) }

  return (
    <div className="card !p-6 shadow-poplg sm:!p-7" style={{ '--shadow': '#FFC93C' }}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-2xl font-extrabold">{t('Try an MCQ')}</h3>
        <span className="badge">{done ? t('Finished') : `${t('Question')} ${i + 1} ${t('of')} ${MCQ.length}`}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
        <div className="h-full bg-gradient-to-r from-pink via-sun to-teal transition-all" style={{ width: `${(Math.min(i, MCQ.length) / MCQ.length) * 100}%` }} />
      </div>

      {done ? (
        <div className="py-8 text-center">
          {score === MCQ.length && <Confetti />}
          <div className="font-display text-6xl font-extrabold">{score}/{MCQ.length}</div>
          <p className="mt-2 text-lg text-[#555B86] dark:text-[#9AA3C7]">
            {score === MCQ.length ? t('Perfect score.') : score >= 3 ? t('Good work. Try again for a clean sweep.') : t('Keep practising. Every attempt helps.')}
          </p>
          <button onClick={reset} className="btn mt-5"><RotateCcw size={18} /> {t('Restart quiz')}</button>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-lg font-semibold">{q.q}</p>
          <div className="mt-4 grid gap-2.5">
            {q.o.map((o, n) => {
              const state = pick === null ? '' : n === q.a ? 'ok' : n === pick ? 'bad' : 'dim'
              return (
                <button
                  key={o}
                  onClick={() => choose(n)}
                  disabled={pick !== null}
                  className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors
                    ${state === 'ok' ? 'border-teal bg-teal-tint text-ink dark:bg-teal/20 dark:text-white' : ''}
                    ${state === 'bad' ? 'border-pink bg-pink-tint text-ink dark:bg-pink/20 dark:text-white' : ''}
                    ${state === 'dim' ? 'border-[#DDE0F5] opacity-60 dark:border-night-line' : ''}
                    ${state === '' ? 'border-ink hover:bg-royal-tint dark:border-night-line dark:hover:bg-royal/20' : ''}`}
                >
                  <span>{o}</span>
                  {state === 'ok' && <CheckCircle2 className="text-teal" size={22} />}
                  {state === 'bad' && <XCircle className="text-pink" size={22} />}
                </button>
              )
            })}
          </div>
          {pick !== null && (
            <motion.div initial={{ y: 10 }} animate={{ y: 0 }} className="mt-4 rounded-xl bg-sun-tint p-4 text-sm dark:bg-sun/15">
              <b className="mr-1 inline-flex items-center gap-1">{pick === q.a ? <><Check size={16} /> {t('Correct.')}</> : <><X size={16} /> {t('Not quite.')}</>}</b>
              {q.why}
              <div className="mt-3"><button onClick={next} className="btn !px-4 !py-2 text-sm">{i === MCQ.length - 1 ? t('See score') : t('Next question')}</button></div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default function QuestionBank() {
  const { t } = useLang()
  return (
    <section id="bank" className="py-20">
      <div className="wrap">
        <SectionHead
          eyebrow={t('Try it')}
          title={t('Coding problems, MCQs and real-life experiences')}
          lead={t('Filter by type, company, salary band and difficulty. Then answer a few MCQs to see how practice feels.')}
        />
        <div className="mt-9 grid gap-8">
          <Explorer />
          <Quiz />
        </div>
      </div>
    </section>
  )
}
