import { useState } from 'react'
import { CheckCircle2, Loader2, Play } from 'lucide-react'
import { FaJava, FaPython } from 'react-icons/fa'
import { SiCplusplus } from 'react-icons/si'
import { CODE, TESTS } from '../data'
import { SectionHead } from './ui'
import { useLang } from '../i18n'
import { useProgress } from '../progress'

const ICON = { Python: FaPython, Java: FaJava, 'C++': SiCplusplus }

export default function CodeLab() {
  const { t } = useLang()
  const { award } = useProgress()
  const [lang, setLang] = useState('Python')
  const [state, setState] = useState('idle') // idle | running | done

  const run = () => {
    award('lab-run', 20, 'first-run')
    setState('running')
    setTimeout(() => setState('done'), 900)
  }

  return (
    <section id="lab" className="py-20">
      <div className="wrap">
        <SectionHead
          eyebrow={t('Live coding lab')}
          title={t('Write, run and test in the browser')}
          lead={t('Pick a language, run the code and see the test results. This preview is simulated, so nothing is executed.')}
        />
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="min-w-0 overflow-hidden rounded-[20px] border-2 border-ink bg-[#14173A] text-[#E8EBFF] shadow-poplg dark:border-night-line dark:bg-[#070B15]" style={{ '--shadow': '#3D6BFF' }}>
            <div className="flex flex-wrap items-center gap-2 border-b border-[#2a3158] p-3">
              {Object.keys(CODE).map((l) => {
                const I = ICON[l]
                return (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setState('idle') }}
                    aria-pressed={lang === l}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold ${lang === l ? 'border-sun bg-sun text-ink' : 'border-[#2a3158] text-[#9AA3C7]'}`}
                  >
                    <I /> {l}
                  </button>
                )
              })}
              <button onClick={run} className="ml-auto flex items-center gap-2 rounded-lg bg-teal px-4 py-1.5 font-mono text-xs font-bold text-ink">
                {state === 'running' ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} {t('Run')}
              </button>
            </div>
            <pre className="min-h-[230px] overflow-x-auto p-5 font-mono text-[0.85rem] leading-7">{CODE[lang]}</pre>
          </div>

          <div className="card min-w-0">
            <h3 className="text-xl font-semibold">{t('Test cases')}</h3>
            <p className="mt-1 text-sm text-[#555B86] dark:text-[#9AA3C7]">{t('Problem: Two Sum (sample)')}</p>
            <ul className="mt-4 grid gap-3">
              {TESTS.map((tc, i) => (
                <li key={i} className="rounded-xl border-2 border-[#DDE0F5] p-3 dark:border-night-line">
                  <div className="font-mono text-xs text-[#555B86] dark:text-[#9AA3C7]">{tc.in}</div>
                  <div className="mt-1 flex items-center justify-between gap-2 font-mono text-sm">
                    <span>{t('Expected')} {tc.out}</span>
                    {state === 'done' ? (
                      <span className="flex items-center gap-1 font-semibold text-teal"><CheckCircle2 size={16} /> {t('Passed')}</span>
                    ) : (
                      <span className="text-[#555B86] dark:text-[#9AA3C7]">{state === 'running' ? t('Running') : t('Not run')}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
