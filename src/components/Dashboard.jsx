import { Flame, Target, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { BOARD, TOPICS, WEEK } from '../data'
import { BG, SectionHead } from './ui'
import { useLang } from '../i18n'

const BAR = { teal: 'bg-teal', sun: 'bg-sun', royal: 'bg-royal', pink: 'bg-pink', tang: 'bg-tang' }

export default function Dashboard() {
  const { t } = useLang()
  const max = Math.max(...WEEK.map((w) => w.v))
  return (
    <section id="dashboard" className="py-20">
      <div className="wrap">
        <SectionHead
          eyebrow={t('Student dashboard')}
          title={t('See progress at a glance')}
          lead={t('Students track streaks and weak topics. Placement cells follow the whole batch. Every figure below is sample data.')}
        />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {[
            { i: Target, v: '148', l: 'questions solved', c: 'teal' },
            { i: Flame, v: '12 days', l: 'current streak', c: 'tang' },
            { i: Trophy, v: '#3', l: 'rank in batch', c: 'sun' },
          ].map((k) => (
            <div key={k.l} className="card flex items-center gap-4">
              <div className={`grid h-14 w-14 flex-none place-items-center rounded-2xl border-2 border-ink dark:border-night-line ${BG[k.c]}`}><k.i size={26} /></div>
              <div>
                <div className="font-display text-3xl font-extrabold tabular-nums">{t(k.v)}</div>
                <div className="text-sm text-[#555B86] dark:text-[#9AA3C7]">{t(k.l)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="card min-w-0">
            <h3 className="text-lg font-semibold">{t('Questions solved this week')}</h3>
            <div className="mt-5 flex h-44 items-end gap-2" role="img" aria-label="Bar chart of questions solved each day">
              {WEEK.map((w, i) => (
                <div key={w.d} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="font-mono text-xs tabular-nums">{w.v}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(w.v / max) * 100}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`w-full rounded-t-lg border-2 border-ink dark:border-night-line ${w.v === max ? 'bg-pink' : 'bg-royal'}`}
                    style={{ minHeight: 4 }}
                  />
                  <span className="font-mono text-xs text-[#555B86] dark:text-[#9AA3C7]">{w.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card min-w-0">
            <h3 className="text-lg font-semibold">{t('Topic strength')}</h3>
            <div className="mt-5 grid gap-4">
              {TOPICS.map((tp) => (
                <div key={tp.t}>
                  <div className="mb-1 flex justify-between text-sm"><span>{t(tp.t)}</span><span className="font-mono tabular-nums">{tp.v}%</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
                    <div className={`h-full rounded-full ${BAR[tp.c]}`} style={{ width: `${tp.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card min-w-0">
            <h3 className="text-lg font-semibold">{t('Batch leaderboard')}</h3>
            <ol className="mt-4 grid gap-2.5">
              {BOARD.map((b, i) => (
                <li key={b.n} className="flex items-center gap-3 rounded-xl border-2 border-[#DDE0F5] px-3 py-2.5 dark:border-night-line">
                  <span className={`grid h-8 w-8 flex-none place-items-center rounded-full font-display font-extrabold ${i === 0 ? 'bg-sun text-ink' : i === 1 ? 'bg-[#DDE0F5] text-ink' : i === 2 ? 'bg-tang text-ink' : 'bg-transparent'}`}>{i + 1}</span>
                  <span className="flex-1 font-medium">{b.n}</span>
                  <span className="font-mono text-sm tabular-nums">{b.s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
