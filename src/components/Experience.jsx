import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { experience } from '../data/content'
import { Container, SectionHeader, Tag, ease } from './ui'

const total = experience.length
const pad = (n) => String(n).padStart(2, '0')

function Entry({ item, index, active }) {
  return (
    <motion.li
      data-entry
      className={`relative pb-10 pl-8 transition-opacity duration-500 last:pb-4 sm:pl-10 ${active ? '' : 'lg:opacity-70'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Timeline segment + node */}
      {index < total - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-5 w-px bg-ivory/20" />}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-emerald transition-colors duration-500 ${
          active ? 'border-vermilion' : 'border-ivory/50'
        }`}
      >
        <span className={`h-[7px] w-[7px] rounded-full bg-vermilion transition-transform duration-500 ${active ? 'scale-100' : 'scale-0 max-lg:scale-100'}`} />
      </span>

      <div className="border-b border-ivory/15 pb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] font-bold uppercase tracking-[0.16em]">
          <span className="text-ivory/60">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-ivory/30" />
          <span className="text-ivory/85">{item.period}</span>
          {item.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-vermilion/70 px-2 py-0.5 text-[0.6rem] text-ivory">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-vermilion" />
              Current
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{item.role}</h3>
        <p className="mt-1 text-[0.95rem] font-semibold text-ivory/80">{item.company}</p>

        <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/60">Responsibilities</p>
        <ul className="mt-3 space-y-2">
          {item.points.map((p) => (
            <li key={p} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ivory/90">
              <span aria-hidden="true" className="mt-[0.72em] w-3 shrink-0 border-t-2 border-vermilion" />
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/60">Technologies</p>
        <ul className="mt-2.5 flex flex-wrap gap-2" aria-label={`Technologies at ${item.company}`}>
          {item.tags.map((t) => (
            <Tag key={t} onDark>
              {t}
            </Tag>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

export default function Experience() {
  const panelRef = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [edges, setEdges] = useState({ top: true, end: false, scrollable: false })
  const { scrollYProgress } = useScroll({ container: panelRef })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })

  // Track which internship is in focus inside the independently scrolling panel.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const update = () => {
      const scrollable = panel.scrollHeight > panel.clientHeight + 2
      const atTop = panel.scrollTop <= 2
      const atEnd = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 4
      setEdges({ top: atTop, end: atEnd, scrollable })
      if (!scrollable) return
      const items = panel.querySelectorAll('[data-entry]')
      const line = panel.scrollTop + panel.clientHeight * 0.35
      let idx = 0
      items.forEach((el, i) => {
        if (el.offsetTop <= line) idx = i
      })
      setActive(atEnd ? items.length - 1 : idx)
    }
    update()
    panel.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      panel.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const goTo = (i) => {
    const panel = panelRef.current
    const el = panel?.querySelectorAll('[data-entry]')[i]
    if (el) panel.scrollTo({ top: el.offsetTop, behavior: reduce ? 'auto' : 'smooth' })
  }

  const solid = '#08765A' // mask colours only control alpha
  const mask = `linear-gradient(to bottom, ${edges.top ? solid : 'transparent'}, ${solid} 2.5rem, ${solid} calc(100% - 3.5rem), ${
    edges.end ? solid : 'transparent'
  })`

  return (
    <section
      id="experience"
      className="relative scroll-mt-0 bg-emerald text-ivory lg:h-[100svh] lg:max-h-[60rem] lg:min-h-[38rem]"
    >
      <Container className="h-full py-20 sm:py-24 lg:pb-12 lg:pt-28">
        <div className="grid h-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — stationary panel */}
          <div className="lg:col-span-4 lg:flex lg:min-h-0 lg:flex-col">
            <SectionHeader
              onDark
              index="03"
              label="Experience"
              title="Where I've worked"
              description="Three internships across backend, frontend and full-stack development — from REST APIs and access control to Flutter interfaces and React.js features."
            />

            <nav aria-label="Internships" className="mt-10 hidden lg:block">
              <ol className="border-l border-ivory/20">
                {experience.map((x, i) => (
                  <li key={x.company}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active === i ? 'step' : undefined}
                      className={`group -ml-px block w-full border-l-2 py-2.5 pl-5 text-left transition-colors duration-300 ${
                        active === i ? 'border-vermilion' : 'border-transparent hover:border-ivory/50'
                      }`}
                    >
                      <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ivory/60">
                        {pad(i + 1)} · {x.period}
                      </span>
                      <span
                        className={`mt-0.5 block text-sm font-bold transition-colors duration-300 ${
                          active === i ? 'text-ivory' : 'text-ivory/65 group-hover:text-ivory'
                        }`}
                      >
                        {x.company}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <div
              className={`mt-auto hidden items-center gap-4 pt-8 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-opacity duration-500 lg:flex ${
                edges.scrollable ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              <ArrowDown size={14} />
              <span>Scroll the panel</span>
              <span className="h-px w-20 overflow-hidden bg-ivory/20">
                <motion.span style={{ scaleX: progress }} className="block h-full origin-left bg-vermilion" />
              </span>
            </div>
          </div>

          {/* RIGHT — independently scrollable panel on desktop, normal timeline on mobile */}
          <div className="lg:col-span-8 lg:col-start-5 lg:min-h-0">
            <ol
              ref={panelRef}
              tabIndex={0}
              aria-label="Internship details"
              style={{ '--exp-mask': mask }}
              className="exp-panel relative rounded-sm focus-visible:outline-offset-2 lg:h-full lg:overflow-y-auto lg:pr-5 lg:[-webkit-mask-image:var(--exp-mask)] lg:[mask-image:var(--exp-mask)]"
            >
              {experience.map((item, i) => (
                <Entry key={item.company} item={item} index={i} active={active === i} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
