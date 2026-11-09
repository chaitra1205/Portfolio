import { useEffect } from 'react'
import { motion } from 'framer-motion'

const curtain = [0.76, 0, 0.24, 1]
const letters = 'Bonagiri Chaitra'.split('')

export default function Loader({ onReveal, onDone }) {
  useEffect(() => {
    const t = setTimeout(onReveal, 1000)
    return () => clearTimeout(t)
  }, [onReveal])

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-emerald text-ivory"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ delay: 0.95, duration: 0.8, ease: curtain }}
      onAnimationComplete={onDone}
    >
      <div className="overflow-hidden px-2 pb-2">
        <p aria-hidden="true" className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.02, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </p>
      </div>
      <div className="mt-6 h-px w-48 overflow-hidden bg-ivory/20 sm:w-64">
        <motion.span
          className="block h-full origin-left bg-vermilion"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
      <motion.p
        className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-ivory/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        Portfolio
      </motion.p>
    </motion.div>
  )
}
