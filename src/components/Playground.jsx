import { Code2, Compass, Lock, Mail, Medal, RotateCcw, Timer, Trophy } from 'lucide-react'
import { BADGES, LEVELS } from '../data'
import { BG, SectionHead, TINT } from './ui'
import { useLang } from '../i18n'
import { useProgress } from '../progress'
import Readiness from './Readiness'
import Simulator from './Simulator'

const ICON = { 'first-run': Code2, 'quiz-ace': Trophy, timekeeper: Timer, 'mock-pro': Medal, 'self-aware': Compass, 'offer-letter': Mail }

export default function Playground() {
  const { t } = useLang()
  const { xp, level, into, badges, reset } = useProgress()
  return (
    <section id="play" className="py-20">
      <div className="wrap">
        <SectionHead
          eyebrow={t('Level up')}
          title={t('Play, score and collect badges')}
          lead={t('Take the readiness check, survive a campus drive and earn XP along the way. These are games and self-checks, not official scores. Progress is saved only in this browser.')}
        />

        <div className="mt-9 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="card min-w-0">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t('Your level')}</div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-display text-6xl font-extrabold tabular-nums">{level}</span>
              <span className="font-display text-xl font-semibold">{t(LEVELS[Math.min(level - 1, LEVELS.length - 1)])}</span>
            </div>
            <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={into}>
              <div className="h-full rounded-full bg-gradient-to-r from-pink via-sun to-teal transition-all duration-500" style={{ width: `${into}%` }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-xs tabular-nums text-[#555B86] dark:text-[#9AA3C7]">
              <span>{into}/100 {t('XP to next level')}</span>
              <span>{t('Total XP')}: {xp}</span>
            </div>
            <button onClick={reset} className="btn btn-alt mt-5 !px-4 !py-2 text-sm dark:!bg-night-card"><RotateCcw size={16} /> {t('Reset progress')}</button>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3">
            {BADGES.map((b) => {
              const on = badges.includes(b.id)
              const I = on ? ICON[b.id] : Lock
              return (
                <div
                  key={b.id}
                  className={`flex min-w-0 flex-col gap-2 rounded-2xl border-2 p-4 ${on ? `border-ink dark:border-night-line ${TINT[b.c]}` : 'border-dashed border-[#B8BEE0] opacity-80 dark:border-night-line'}`}
                >
                  <div className={`grid h-10 w-10 place-items-center rounded-xl border-2 ${on ? `border-ink dark:border-night-line ${BG[b.c]}` : 'border-[#B8BEE0] text-[#9AA3C7] dark:border-night-line'}`}><I size={20} /></div>
                  <div className="font-display font-semibold leading-tight">{t(b.t)}</div>
                  <div className="text-xs text-[#555B86] dark:text-[#9AA3C7]">{on ? t(b.d) : t('Locked')}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <Readiness />
          <Simulator />
        </div>
      </div>
    </section>
  )
}
