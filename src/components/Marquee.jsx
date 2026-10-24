import { useLang } from '../i18n'

// Example company tags only. Naming a company here does not claim a partnership.
const CO = ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Zoho', 'Amazon', 'Accenture', 'Capgemini', 'HCL', 'Tech Mahindra', 'Flipkart', 'Microsoft']
const TONES = [
  'bg-pink-tint dark:bg-pink/15',
  'bg-sun-tint dark:bg-sun/15',
  'bg-teal-tint dark:bg-teal/15',
  'bg-royal-tint dark:bg-royal/20',
  'bg-tang-tint dark:bg-tang/15',
]

export default function Marquee() {
  const { t } = useLang()
  const row = [...CO, ...CO]
  return (
    <section className="py-8" aria-label="Example company tags">
      <div className="wrap">
        <p className="eyebrow text-center">{t('Company tags you can practise by (examples)')}</p>
        <div
          className="marquee mt-4 overflow-hidden rounded-2xl border-2 border-ink bg-white py-4 dark:border-night-line dark:bg-night-card"
          style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
        >
          <div className="marquee-track flex w-max gap-3 px-3">
            {row.map((c, i) => (
              <span
                key={i}
                aria-hidden={i >= CO.length}
                className={`whitespace-nowrap rounded-full border-2 border-ink px-5 py-2 font-display text-lg font-semibold dark:border-night-line ${TONES[i % TONES.length]}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
