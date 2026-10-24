import { useEffect, useState } from 'react'
import { ArrowRight, Check, Heart, RotateCcw } from 'lucide-react'
import { SIM } from '../data'
import { useLang } from '../i18n'
import { useProgress } from '../progress'
import Confetti from './Confetti'

const LIVES = 3
const MAXPTS = SIM.length * 2
const TONE = ['border-pink bg-pink-tint dark:bg-pink/20', 'border-sun bg-sun-tint dark:bg-sun/20', 'border-teal bg-teal-tint dark:bg-teal/20']
const VERDICT = ['That costs you a life.', 'Okay, but there is a better move.', 'Great call.']

export default function Simulator() {
  const { t } = useLang()
  const { award } = useProgress()
  const [r, setR] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hearts, setHearts] = useState(LIVES)
  const [pts, setPts] = useState(0)
  const [over, setOver] = useState(false)

  const won = over && hearts > 0 && pts >= 6
  useEffect(() => {
    if (!over) return
    award('sim-done', 30)
    if (won) award('sim-win', 60, 'offer-letter')
  }, [over, won, award])

  const round = SIM[r]
  const choose = (n) => {
    if (picked !== null) return
    const o = round.opts[n]
    setPicked(n)
    setPts((p) => p + o.pts)
    if (o.pts === 0) setHearts((h) => h - 1)
  }
  const next = () => {
    if (hearts === 0 || r === SIM.length - 1) setOver(true)
    else { setR(r + 1); setPicked(null) }
  }
  const restart = () => { setR(0); setPicked(null); setHearts(LIVES); setPts(0); setOver(false) }

  const end = won
    ? ['Offer letter!', 'You kept your head in every round and the company wants you.']
    : hearts > 0
      ? ['Waitlisted', 'You got through, but a few answers cost you points. Try again.']
      : ['Not selected this time', 'Every drive is practice for the next one. Try again.']

  return (
    <div className="card min-w-0 !p-6 shadow-poplg sm:!p-7" style={{ '--shadow': '#3D6BFF' }}>
      {won && <Confetti />}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t('Campus drive simulator')}</div>
          <h3 className="mt-1 text-2xl font-extrabold">{t('Survive four rounds')}</h3>
        </div>
        <div className="flex flex-none items-center gap-1" role="img" aria-label={`${t('Lives')}: ${hearts}`}>
          {Array.from({ length: LIVES }, (_, k) => (
            <Heart key={k} size={22} className={k < hearts ? 'fill-pink text-pink' : 'text-[#9AA3C7]'} />
          ))}
        </div>
      </div>

      <ol className="mt-4 flex flex-wrap gap-2" aria-label="Rounds">
        {SIM.map((s, k) => (
          <li
            key={s.stage}
            aria-current={!over && k === r ? 'step' : undefined}
            className={`rounded-full border-2 px-3 py-1 text-xs font-bold ${over || k < r ? 'border-teal bg-teal text-ink' : k === r ? 'border-royal bg-royal text-white' : 'border-ink dark:border-night-line'}`}
          >
            {t(s.stage)}
          </li>
        ))}
      </ol>

      {!over ? (
        <div className="mt-5">
          <p className="text-lg font-semibold">{round.scene}</p>
          <div className="mt-4 grid gap-2.5">
            {round.opts.map((o, n) => {
              const state = picked === null ? '' : n === picked ? TONE[o.pts] : o.pts === 2 ? 'border-teal' : 'border-[#DDE0F5] opacity-60 dark:border-night-line'
              return (
                <button
                  key={o.t}
                  onClick={() => choose(n)}
                  disabled={picked !== null}
                  className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition-colors ${picked === null ? 'border-ink hover:bg-royal-tint dark:border-night-line dark:hover:bg-royal/15' : state}`}
                >
                  <span>{o.t}</span>
                  {picked !== null && o.pts === 2 && <Check size={20} className="flex-none text-teal" />}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <div className="mt-4 rounded-xl bg-sun-tint p-4 text-sm dark:bg-sun/15">
              <b>{t(VERDICT[round.opts[picked].pts])}</b> {round.opts[picked].why}
              <div className="mt-3">
                <button onClick={next} className="btn !px-4 !py-2 text-sm">
                  {hearts === 0 || r === SIM.length - 1 ? t('See result') : t('Next round')} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 text-center">
          <div className={`mx-auto inline-block rounded-2xl border-2 border-ink px-5 py-3 font-display text-3xl font-extrabold text-ink dark:border-night-line ${won ? 'bg-teal' : hearts > 0 ? 'bg-sun' : 'bg-pink'}`}>
            {t(end[0])}
          </div>
          <p className="mt-3 text-[#555B86] dark:text-[#9AA3C7]">{t(end[1])}</p>
          <p className="mt-1 font-mono text-sm">{t('Score')}: {pts}/{MAXPTS}</p>
          <button onClick={restart} className="btn mt-4"><RotateCcw size={18} /> {t('Play again')}</button>
        </div>
      )}
    </div>
  )
}
