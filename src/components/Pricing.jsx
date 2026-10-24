import { useState } from 'react'
import { Check } from 'lucide-react'
import { CONFIRMED } from '../data'
import { SectionHead } from './ui'
import { useLang } from '../i18n'

export default function Pricing() {
  const { t } = useLang()
  const [n, setN] = useState(120)
  const total = n * CONFIRMED.price
  return (
    <section id="pricing" className="py-20">
      <div className="wrap">
        <SectionHead eyebrow={t('Pricing')} title={t('One small fee covers the whole degree')} />
        <div className="mt-9 grid items-stretch gap-7 lg:grid-cols-2">
          <div className="min-w-0 rounded-[26px] border-2 border-ink bg-ink p-9 text-[#F1F3FF] shadow-poplg dark:border-night-line dark:bg-night-card" style={{ '--shadow': '#FFC93C' }}>
            <div className="font-mono text-xs uppercase tracking-widest opacity-70">{t('TechHike student plan')}</div>
            <div className="mt-2 font-display text-[clamp(3.4rem,10vw,5.4rem)] font-extrabold leading-none text-sun">
              ₹1,000 <small className="font-body text-lg font-medium text-[#F1F3FF]">{t('per student, 4 years')}</small>
            </div>
            <ul className="my-6 grid gap-2.5">
              {['12,500+ real placement questions', '500+ companies', 'Live coding lab', 'Salary filters', 'TCS NQT and InfyTQ prep'].map((p) => (
                <li key={p} className="flex items-center gap-2"><Check className="text-teal" size={18} strokeWidth={3} /> {t(p)}</li>
              ))}
            </ul>
            <a href="#contact" className="btn !border-ink !shadow-none">{t('Ask for a college quote')}</a>
          </div>

          <div className="card min-w-0 !p-8">
            <h3 className="text-xl font-semibold">{t('Estimate for your college')}</h3>
            <label htmlFor="students" className="mt-4 block font-bold">{t('Students in a batch')}: <b className="tabular-nums">{n}</b></label>
            <input id="students" type="range" min="30" max="1000" step="10" value={n} onChange={(e) => setN(+e.target.value)} className="mt-3 w-full accent-pink" />
            <output htmlFor="students" className="mt-3 block font-display text-4xl font-extrabold tabular-nums">
              ₹{total.toLocaleString('en-IN')} <span className="text-base font-medium text-[#555B86] dark:text-[#9AA3C7]">{t('for 4 years')}</span>
            </output>
            <div className="mt-4 flex justify-between border-b border-[#DDE0F5] py-3 dark:border-night-line"><span>{t('Per student, per year')}</span><b>₹250</b></div>
            <div className="flex justify-between py-3"><span>{t('Per student, per month')}</span><b>{t('about ₹21')}</b></div>
            <p className="mt-2 text-sm text-[#555B86] dark:text-[#9AA3C7]">{t('Based on the ₹1,000 for 4 years rate published on TechHike. Confirm final terms with the team.')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
