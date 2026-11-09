import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Leadership from './components/Leadership'
import Contact from './components/Contact'

export default function App() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(!!reduce)
  const [loading, setLoading] = useState(!reduce)

  const onReveal = useCallback(() => setReady(true), [])
  const onDone = useCallback(() => setLoading(false), [])

  // Lock scroll while the intro curtain is up.
  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory"
      >
        Skip to content
      </a>

      <AnimatePresence>{loading && <Loader onReveal={onReveal} onDone={onDone} />}</AnimatePresence>

      <Navbar ready={ready} />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Contact />
      </main>
    </MotionConfig>
  )
}
