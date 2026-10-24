import { useEffect, useMemo, useState } from 'react'

const COLORS = ['#FF4F8B', '#FFC93C', '#0FBFA5', '#3D6BFF', '#FF7A3D']

// Short celebration shown after a high score. Hidden for people who prefer reduced motion (see index.css).
export default function Confetti() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setOn(false), 4200)
    return () => clearTimeout(id)
  }, [])
  const bits = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        left: Math.random() * 100,
        dx: `${Math.random() * 160 - 80}px`,
        d: 2.2 + Math.random() * 1.6,
        delay: Math.random() * 0.6,
        c: COLORS[i % COLORS.length],
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
      })),
    []
  )
  if (!on) return null
  return (
    <div aria-hidden="true" className="confetti pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute top-0 block rounded-[2px]"
          style={{
            left: `${b.left}%`,
            width: b.w,
            height: b.h,
            background: b.c,
            '--dx': b.dx,
            animation: `fall ${b.d}s ${b.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  )
}
