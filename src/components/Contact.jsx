import { useState } from 'react'
import { Send } from 'lucide-react'
import { FaGlobe } from 'react-icons/fa'
import { useLang } from '../i18n'

export default function Contact() {
  const { t } = useLang()
  const [msg, setMsg] = useState({ ok: true, text: '' })
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (!f.get('name').trim() || !f.get('college').trim()) {
      setMsg({ ok: false, text: 'Please fill in your name and college.' })
      return
    }
    setMsg({ ok: true, text: 'This is a design preview, so nothing was sent. Contact the teams through their websites.' })
  }
  const input = 'w-full rounded-[10px] border-2 border-[#DDE0F5] bg-[#F6F7FF] px-3 py-2.5 font-medium text-ink dark:border-night-line dark:bg-night dark:text-white'

  return (
    <section id="contact" className="py-20">
      <div className="wrap">
        <div className="rounded-[30px] border-2 border-ink p-[clamp(24px,5vw,56px)] text-ink dark:border-night-line" style={{ background: 'linear-gradient(120deg,#FF4F8B,#FF7A3D 45%,#FFC93C)' }}>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="h2">{t('Bring placement prep to your college')}</h2>
              <p className="mt-4 font-medium">{t('Tell us a little about your college and we will get back to you.')}</p>
              <div className="mt-5 flex flex-wrap gap-3 font-medium">
                <a href="https://dkoder.co.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border-2 border-ink bg-white/70 px-4 py-2"><FaGlobe /> dkoder.co.in</a>
                <a href="https://tech-hike.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border-2 border-ink bg-white/70 px-4 py-2"><FaGlobe /> tech-hike.in</a>
              </div>
            </div>
            <form onSubmit={submit} noValidate className="grid min-w-0 gap-3 rounded-[20px] border-2 border-ink bg-white p-5 text-ink dark:border-night-line dark:bg-night-card dark:text-white">
              <div><label htmlFor="cn" className="mb-1 block text-sm font-bold">{t('Your name')}</label><input id="cn" name="name" autoComplete="name" className={input} /></div>
              <div><label htmlFor="cc" className="mb-1 block text-sm font-bold">{t('College')}</label><input id="cc" name="college" className={input} /></div>
              <div>
                <label htmlFor="cs" className="mb-1 block text-sm font-bold">{t('Students per batch')}</label>
                <select id="cs" name="size" className={input}>
                  {['Up to 100', '100 to 300', '300 to 600', '600 or more'].map((o) => <option key={o} value={o}>{t(o)}</option>)}
                </select>
              </div>
              <button type="submit" className="btn justify-center"><Send size={18} /> {t('Request a demo')}</button>
              <div role="status" className={`min-h-[1.4em] text-sm font-bold ${msg.ok ? 'text-teal' : 'text-pink'}`}>{t(msg.text)}</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
