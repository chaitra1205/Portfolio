import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-[80rem] px-4 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  )
}

/** Subtle fade + rise when scrolled into view. */
export function Reveal({ as = 'div', delay = 0, y = 18, amount = 0.2, className = '', children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Compact section opener: "01 —— About", a proportionate heading and an optional intro. */
export function SectionHeader({ index, label, title, description, onDark = false, className = '' }) {
  return (
    <div className={className}>
      <Reveal y={10} className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.22em]">
        {onDark ? (
          <span className="flex items-center gap-2 text-ivory">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-vermilion" />
            {index}
          </span>
        ) : (
          <span className="text-vermilion">{index}</span>
        )}
        <span aria-hidden="true" className={`h-px w-10 ${onDark ? 'bg-ivory/35' : 'bg-emerald/30'}`} />
        <span className={onDark ? 'text-ivory/80' : 'text-emerald/80'}>{label}</span>
      </Reveal>
      <Reveal as="h2" delay={0.05} className="mt-4 text-[1.85rem] font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
        <span className={onDark ? 'text-ivory/50' : 'text-vermilion'}>.</span>
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={0.1}
          className={`mt-4 max-w-md text-[0.95rem] leading-relaxed ${onDark ? 'text-ivory/80' : 'text-emerald/80'}`}
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}

const variants = {
  primary: { base: 'bg-emerald text-ivory', fill: 'bg-vermilion', hover: 'hover:text-ivory' },
  outline: { base: 'border border-emerald/35 text-emerald', fill: 'bg-emerald', hover: 'hover:text-ivory hover:border-emerald' },
  ivory: { base: 'bg-ivory text-emerald', fill: 'bg-vermilion', hover: 'hover:text-ivory' },
  outlineLight: { base: 'border border-ivory/40 text-ivory', fill: 'bg-ivory', hover: 'hover:text-emerald hover:border-ivory' },
}

/** Pill button / link with a colour sweep on hover. */
export function Button({ href, variant = 'primary', icon: Icon, iconMotion = 'diag', className = '', children, ...rest }) {
  const v = variants[variant]
  const iconCls =
    iconMotion === 'down'
      ? 'group-hover:translate-y-0.5'
      : iconMotion === 'right'
        ? 'group-hover:translate-x-1'
        : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
  return (
    <a
      href={href}
      className={`group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-[0.8rem] font-bold tracking-[0.04em] transition-[color,border-color,transform] duration-500 ease-out-expo active:scale-[0.97] ${v.base} ${v.hover} ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 translate-y-[101%] rounded-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 ${v.fill}`}
      />
      <span>{children}</span>
      {Icon && <Icon aria-hidden="true" size={16} strokeWidth={2} className={`transition-transform duration-500 ease-out-expo ${iconCls}`} />}
    </a>
  )
}

/** Small rounded label for technologies. */
export function Tag({ children, onDark = false, className = '' }) {
  return (
    <li
      className={`rounded-full border px-3 py-1 text-[0.78rem] font-semibold ${
        onDark ? 'border-ivory/25 text-ivory/85' : 'border-emerald/20 text-emerald/90'
      } ${className}`}
    >
      {children}
    </li>
  )
}
