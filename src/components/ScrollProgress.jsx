import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 z-40 h-1 origin-left bg-gradient-to-r from-pink via-sun to-royal"
      style={{ scaleX, top: 'env(safe-area-inset-top, 0px)' }}
    />
  )
}
