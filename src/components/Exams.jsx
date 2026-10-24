import { EXAMS, ROADMAP } from '../data'
import { BG, Reveal, SectionHead, TINT } from './ui'
import { useLang } from '../i18n'

export default function Exams() {
  const { t } = useLang()
  return (
    <>
      <section id="exams" className="py-20">
        <div className="wrap">
          <SectionHead
            eyebrow={t('Entrance exam prep')}
            title={t('Ready for the first filter round')}
            lead={t('Many students are screened by an entrance test before any interview. Both platforms include preparation for the two big ones.')}
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {EXAMS.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <article className={`h-full rounded-[22px] border-2 border-ink p-7 dark:border-night-line ${BG[e.c]}`}>
                  <h3 className="text-4xl font-extrabold">{e.name}</h3>
                  <p className="mt-3 font-medium">{t(e.text)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="wrap">
          <SectionHead eyebrow={t('Roadmap')} title={t('From first year to offer letter')} />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((r) => (
              <article key={r.y} className={`min-w-0 rounded-[18px] border-2 border-t-[8px] border-ink p-5 dark:border-night-line ${TINT.ink}`} style={{ borderTopColor: { teal: '#0FBFA5', sun: '#FFC93C', pink: '#FF4F8B', royal: '#3D6BFF' }[r.c] }}>
                <b className="font-mono text-xs uppercase tracking-widest text-[#555B86] dark:text-[#9AA3C7]">{t(r.y)}</b>
                <h3 className="mt-2 text-xl font-semibold">{t(r.t)}</h3>
                <p className="mt-2 text-[#555B86] dark:text-[#9AA3C7]">{t(r.p)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
