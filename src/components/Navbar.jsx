import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import { ease } from './ui'

function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

const ids = navLinks.map((l) => l.id)

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const toggleRef = useRef(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 240 && !open)
  })

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-vermilion"
        style={{ scaleX: progress }}
      />
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open ? 'border-b border-emerald/10 bg-ivory/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: !ready || hidden ? -100 : 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between px-4 sm:px-8 lg:px-12">
          <a
            href="#top"
            className={`relative z-[70] text-lg font-extrabold tracking-tight transition-colors duration-500 ${open ? 'text-ivory' : 'text-emerald'}`}
            onClick={() => setOpen(false)}
          >
            Bonagiri Chaitra<span className="text-vermilion">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className="group relative block px-3 py-2 text-[0.8rem] font-semibold"
                >
                  <span className={`transition-colors duration-300 ${active === l.id ? 'text-vermilion' : 'text-emerald/80 group-hover:text-emerald'}`}>
                    {l.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1 h-px origin-left bg-vermilion transition-transform duration-500 ease-out-expo ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              download={profile.resumeFile}
              className="group hidden items-center gap-2 rounded-full border border-emerald/30 px-4 py-2 text-[0.75rem] font-bold transition-colors duration-500 hover:border-emerald hover:bg-emerald hover:text-ivory sm:inline-flex"
            >
              Resume
              <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
              className={`relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden ${
                open ? 'border-ivory/40 text-ivory' : 'border-emerald/30 text-emerald'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 flex flex-col bg-emerald px-4 pb-8 pt-24 text-ivory sm:px-8 lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.25rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.6rem) 2.25rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.25rem)' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.05, ease }}
                  >
                    <span className="font-sans text-xs font-semibold tracking-[0.2em] text-vermilion">0{i + 1}</span>
                    <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                      {l.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory/20 pt-6 text-sm text-ivory/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55 }}
            >
              <a href={`mailto:${profile.email}`} className="break-all hover:text-ivory">{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">GitHub</a>
              <a href={profile.resume} download={profile.resumeFile} className="hover:text-ivory">Resume</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
