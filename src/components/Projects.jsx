import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import { profile, projects } from '../data/content'
import { Button, Container, Reveal, SectionHeader, Tag, ease } from './ui'

/** Panel that tilts gently toward the pointer, with a soft ivory glare. */
function TiltPanel({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 140, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [3.5, -3.5]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-4.5, 4.5]), spring)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx} ${gy}, rgb(242 235 221 / 0.1), transparent 60%)`

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={`[perspective:1600px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/panel relative h-full w-full"
      >
        {children}
        <motion.div aria-hidden="true" style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100" />
      </motion.div>
    </div>
  )
}

/** Architecture diagram — built only from facts in the resume. */
function Diagram({ project, index }) {
  const { diagram } = project
  return (
    <div className="relative flex h-full min-h-[19rem] flex-col overflow-hidden bg-emerald p-5 text-ivory sm:min-h-[21rem] sm:p-7">
      <div className="flex items-start justify-between gap-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ivory/75">
        <span>Fig. 0{index + 1}</span>
        <span className="text-right">{diagram.caption}</span>
      </div>

      <div className="relative mt-7 flex flex-1 flex-col" style={{ transform: 'translateZ(30px)' }}>
        <div className="grid grid-cols-3 items-stretch gap-2 sm:gap-3">
          {diagram.nodes.map((n, i) => (
            <motion.div
              key={n.k}
              className="relative border border-ivory/35 bg-emerald p-2.5 sm:p-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
            >
              <p className="text-[0.58rem] font-bold tracking-[0.16em] text-vermilion">0{i + 1}</p>
              <p className="mt-1.5 text-sm font-bold leading-tight sm:text-lg">{n.k}</p>
              <p className="mt-1 text-[0.62rem] leading-snug text-ivory/75 sm:text-xs">{n.v}</p>
              {diagram.flow && i < diagram.nodes.length - 1 && (
                <span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-vermilion text-ivory sm:-right-3 sm:h-5 sm:w-5">
                  <ArrowRight size={10} strokeWidth={3} />
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div aria-hidden="true" className="grid min-h-6 flex-1 grid-cols-3 gap-2 sm:gap-3">
          {diagram.nodes.map((n) => (
            <span key={n.k} className="mx-auto block h-full w-px text-ivory/50 [background-image:linear-gradient(180deg,currentColor_50%,transparent_50%)] [background-size:1px_8px]" />
          ))}
        </div>
      </div>

      <div className="space-y-2" style={{ transform: 'translateZ(20px)' }}>
        {diagram.layers.map((l, i) => (
          <div key={l} className="flex items-center justify-between border-t border-ivory/25 pt-2 text-[0.66rem] font-bold uppercase tracking-[0.14em] sm:text-[0.72rem]">
            <span>{l}</span>
            <span className="text-ivory/60">L{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Project({ project, index }) {
  const flip = index % 2 === 1
  return (
    <Reveal as="article" y={28} amount={0.15} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <TiltPanel className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <Diagram project={project} index={index} />
      </TiltPanel>

      <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-vermilion">Project 0{index + 1}</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]"
          >
            {project.title}
          </a>
        </h3>
        <p className="mt-3 text-base leading-relaxed text-emerald/85">{project.summary}</p>

        <ul className="mt-5 space-y-2">
          {project.points.map((p) => (
            <li key={p} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-emerald/85">
              <span aria-hidden="true" className="mt-[0.72em] w-3 shrink-0 border-t-2 border-vermilion" />
              {p}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </ul>

        <div className="mt-7">
          <Button href={project.github} target="_blank" rel="noopener noreferrer" icon={Github} iconMotion="right" aria-label={`View ${project.title} on GitHub`}>
            View on GitHub
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="work" className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader index="04" label="Featured Projects" title="Selected work" />
          <Reveal as="p" className="max-w-xs text-[0.95rem] leading-relaxed text-emerald/80 md:pb-1 md:text-right">
            Two full-stack builds in healthcare — from search and matching to role-based portals.
          </Reveal>
        </div>

        <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-20">
          {projects.map((p, i) => (
            <Project key={p.title} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-emerald/20 pt-7 sm:flex-row sm:items-center">
          <p className="text-lg font-bold">More on GitHub</p>
          <Button href={profile.github} target="_blank" rel="noopener noreferrer" variant="outline" icon={ArrowUpRight}>
            github.com/{profile.githubLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
