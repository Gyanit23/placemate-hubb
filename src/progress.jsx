import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { BADGES } from './data'
import { useLang } from './i18n'

const KEY = 'placemate-hub-progress-v1'
const EMPTY = { xp: 0, done: [], badges: [] }

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY))
    if (s && typeof s.xp === 'number' && Array.isArray(s.done) && Array.isArray(s.badges)) return s
  } catch {
    /* storage can be blocked or empty, start fresh */
  }
  return EMPTY
}

const Ctx = createContext({ xp: 0, level: 1, into: 0, badges: [], award: () => {}, reset: () => {} })

export function ProgressProvider({ children }) {
  const { t } = useLang()
  const [st, setSt] = useState(load)
  const [toast, setToast] = useState(null)
  const ref = useRef(st)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(st)) } catch { /* ignore */ }
  }, [st])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3400)
    return () => clearTimeout(id)
  }, [toast])

  // Each key pays out once, so repeating a game cannot farm XP.
  const award = useCallback((key, xp, badge) => {
    const cur = ref.current
    if (cur.done.includes(key)) return
    const next = {
      xp: cur.xp + xp,
      done: [...cur.done, key],
      badges: badge && !cur.badges.includes(badge) ? [...cur.badges, badge] : cur.badges,
    }
    ref.current = next
    setSt(next)
    setToast({ id: key, xp, badge })
  }, [])

  const reset = useCallback(() => {
    ref.current = EMPTY
    setSt(EMPTY)
    setToast(null)
  }, [])

  const level = Math.floor(st.xp / 100) + 1
  const b = toast && toast.badge ? BADGES.find((x) => x.id === toast.badge) : null

  return (
    <Ctx.Provider value={{ xp: st.xp, level, into: st.xp % 100, badges: st.badges, award, reset }}>
      {children}
      {toast && (
        <motion.div
          key={toast.id}
          role="status"
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          className="fixed left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-4 py-2.5 text-sm font-bold text-ink shadow-pop"
          style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}
        >
          <Sparkles size={18} className="flex-none" />
          <span>+{toast.xp} XP{b ? ` · ${t('Badge unlocked')}: ${t(b.t)}` : ''}</span>
        </motion.div>
      )}
    </Ctx.Provider>
  )
}

export const useProgress = () => useContext(Ctx)
