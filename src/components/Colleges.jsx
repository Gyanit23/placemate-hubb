import { BarChart3, BellRing, GitCompare } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEPTS } from '../data'
import { BG, Reveal, SectionHead, TINT } from './ui'
import { useLang } from '../i18n'

const total = DEPTS.reduce((n, d) => n + d.s, 0)
const avg = Math.round(DEPTS.reduce((n, d) => n + d.r * d.s, 0) / total)
const attention = DEPTS.filter((d) => d.r < 50).reduce((n, d) => n + d.s, 0)

const status = (r) =>
  r >= 70 ? { l: 'On track', bar: 'bg-teal', pill: 'bg-teal' }
  : r >= 50 ? { l: 'Improving', bar: 'bg-sun', pill: 'bg-sun' }
  : { l: 'Needs attention', bar: 'bg-pink', pill: 'bg-pink' }

const POINTS = [
  { i: BarChart3, t: 'Batch reports', p: 'See practice hours and solved questions for the whole batch.', c: 'royal' },
  { i: BellRing, t: 'Weak-student alerts', p: 'Spot students who have stopped practising before drives begin.', c: 'pink' },
  { i: GitCompare, t: 'Department comparison', p: 'Compare readiness across departments and plan extra sessions.', c: 'teal' },
]

export default function Colleges() {
  const { t } = useLang()
  return (
    <section id="colleges" className="py-20">
      <div className="wrap">
        <SectionHead
          eyebrow={t('For placement cells')}
          title={t('Know where every department stands')}
          lead={t('A sample view for training and placement officers. All numbers are demo data.')}
        />

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <div className="card min-w-0 !p-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                [total.toLocaleString('en-IN'), 'active students', 'bg-sun'],
                [`${avg}%`, 'average readiness', 'bg-teal'],
                [attention.toLocaleString('en-IN'), 'need attention', 'bg-pink'],
              ].map(([v, l, c]) => (
                <div key={l} className={`min-w-0 rounded-2xl border-2 border-ink p-3 text-ink dark:border-night-line sm:p-4 ${c}`}>
                  <b className="block font-display text-2xl font-extrabold tabular-nums sm:text-3xl">{v}</b>
                  <span className="text-xs font-medium sm:text-sm">{t(l)}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-lg font-semibold">{t('Department readiness')}</h3>
            <div className="mt-4 grid gap-4">
              {DEPTS.map((d, i) => {
                const s = status(d.r)
                return (
                  <div key={d.n}>
                    <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="font-semibold">{t(d.n)} <span className="font-normal text-[#555B86] dark:text-[#9AA3C7]">· {d.s} {t('students')}</span></span>
                      <span className="flex items-center gap-2">
                        <span className={`badge text-ink ${s.pill}`}>{t(s.l)}</span>
                        <span className="w-10 text-right font-mono font-bold tabular-nums">{d.r}%</span>
                      </span>
                    </div>
                    <div className="h-3.5 overflow-hidden rounded-full bg-[#DDE0F5] dark:bg-night-line">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${d.r}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.06 }}
                        className={`h-full rounded-full ${s.bar}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid content-start gap-4">
            {POINTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.07}>
                <article className={`flex gap-4 rounded-[20px] border-2 border-ink p-5 dark:border-night-line ${TINT[p.c]}`}>
                  <div className={`grid h-12 w-12 flex-none place-items-center rounded-xl border-2 border-ink dark:border-night-line ${BG[p.c]}`}><p.i size={22} /></div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{t(p.t)}</h3>
                    <p className="mt-1 text-[#555B86] dark:text-[#9AA3C7]">{t(p.p)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
