import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/content'
import { Button, Container, ease } from './ui'

function Portrait({ ready }) {
  return (
    <motion.figure
      className="relative mx-auto w-full max-w-[290px] sm:max-w-[340px] lg:mr-0 lg:max-w-[400px]"
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, delay: 0.1, ease }}
    >
      {/* Offset arch outline */}
      <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-emerald/30 sm:translate-x-4 sm:translate-y-4" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-emerald/10">
        <img
          src={profile.photo}
          alt="Portrait of Bonagiri Chaitra"
          width="960"
          height="1280"
          fetchpriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_30%]"
        />
      </div>
    </motion.figure>
  )
}

export default function Hero({ ready }) {
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.8, delay, ease },
  })

  return (
    <section id="top" className="relative pb-16 pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-16 lg:pt-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-2 lg:col-span-5">
            <Portrait ready={ready} />
          </div>

          <div className="lg:order-1 lg:col-span-7">
            <motion.p
              {...fadeUp(0.15)}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald/20 px-3.5 py-1.5 text-[0.72rem] font-semibold text-emerald/85"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-vermilion" />
              Full Stack Development Intern · Sanshi Pvt. Ltd.
            </motion.p>

            <motion.h1 {...fadeUp(0.22)} className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Bonagiri Chaitra<span className="text-vermilion">.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="mt-4 text-[0.95rem] font-bold text-emerald/90 sm:text-lg">
              <span className="block sm:inline">{profile.role[0]}</span>
              <span aria-hidden="true" className="mx-2.5 hidden text-vermilion sm:inline">|</span>
              <span className="sr-only">, </span>
              <span className="block sm:inline">{profile.role[1]}</span>
            </motion.p>

            <motion.p {...fadeUp(0.38)} className="mt-5 max-w-xl text-base leading-relaxed text-emerald/80 sm:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div {...fadeUp(0.46)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#work" icon={ArrowDown} iconMotion="down">
                View My Work
              </Button>
              <Button href={profile.resume} download={profile.resumeFile} variant="outline" icon={Download} iconMotion="down">
                Download Resume
              </Button>
              <Button href="#contact" variant="outline" icon={ArrowUpRight}>
                Contact Me
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.54)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-emerald/15 pt-6 text-sm font-bold">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-colors hover:text-vermilion">
                <Linkedin size={17} aria-hidden="true" /> LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-colors hover:text-vermilion">
                <Github size={17} aria-hidden="true" /> GitHub
                <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
