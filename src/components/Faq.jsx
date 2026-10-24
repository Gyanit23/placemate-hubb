import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { FAQ } from '../data'
import { useLang } from '../i18n'

export default function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-20">
      <div className="wrap max-w-[820px]">
        <div className="eyebrow">{t('Questions')}</div>
        <h2 className="h2 mb-7">{t('Quick answers')}</h2>
        <div className="grid gap-3">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="rounded-2xl border-2 border-ink bg-white px-5 py-4 dark:border-night-line dark:bg-night-card">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-3 text-left text-[1.05rem] font-bold"
              >
                {t(q)}
                {open === i ? <Minus className="flex-none text-pink" /> : <Plus className="flex-none text-pink" />}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden text-[#555B86] dark:text-[#9AA3C7]"
                  >
                    <span className="block pt-3">{t(a)}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
