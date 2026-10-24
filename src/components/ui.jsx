import { motion } from 'framer-motion'

export const BG = {
  pink: 'bg-pink text-ink',
  teal: 'bg-teal text-ink',
  sun: 'bg-sun text-ink',
  royal: 'bg-royal text-white',
  tang: 'bg-tang text-ink',
  ink: 'bg-ink text-white dark:bg-[#F1F3FF] dark:text-ink',
}

export const TINT = {
  pink: 'bg-pink-tint dark:bg-pink/15',
  teal: 'bg-teal-tint dark:bg-teal/15',
  sun: 'bg-sun-tint dark:bg-sun/15',
  royal: 'bg-royal-tint dark:bg-royal/20',
  tang: 'bg-tang-tint dark:bg-tang/15',
  ink: 'bg-white dark:bg-night-card',
}

// Slides content up as it enters the viewport. Opacity is never lowered, so the page is readable at rest.
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ eyebrow, title, lead }) {
  return (
    <div>
      <div className="eyebrow flex items-center gap-3"><span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-gradient-to-r from-pink via-sun to-teal" />{eyebrow}</div>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}
