import { BarChart3, Building2, Code2, FileText, HelpCircle, ListChecks, TrendingUp, Users, Wallet } from 'lucide-react'
import { FEATURES } from '../data'
import { BG, Reveal, SectionHead, TINT } from './ui'
import { useLang } from '../i18n'

const ICONS = {
  help: HelpCircle, building: Building2, code: Code2, wallet: Wallet, file: FileText,
  trend: TrendingUp, list: ListChecks, users: Users, chart: BarChart3,
}

export default function Features() {
  const { t } = useLang()
  return (
    <section id="features" className="py-20">
      <div className="wrap">
        <SectionHead eyebrow={t('Everything in one place')} title={t('One platform, nine ways to get placed')} />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon]
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <article className={`flex h-full min-w-0 flex-col gap-3 rounded-[22px] border-2 border-ink p-6 transition-transform hover:-translate-y-1 dark:border-night-line ${TINT[f.c]}`}>
                  <div className={`grid h-12 w-12 place-items-center rounded-[14px] border-2 border-ink dark:border-night-line ${BG[f.c]}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{t(f.title)}</h3>
                  <p className="text-[#555B86] dark:text-[#9AA3C7]">{t(f.text)}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
