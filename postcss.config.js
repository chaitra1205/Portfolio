// Tailwind's preflight hard-codes a grey placeholder colour; remap it to the
// palette so the shipped CSS contains Ivory, Emerald and Vermilion only.
const paletteOnly = () => ({
  postcssPlugin: 'palette-only',
  Declaration(decl) {
    if (decl.value.includes('#9ca3af')) decl.value = decl.value.replace('#9ca3af', 'rgb(8 118 90 / 0.6)')
  },
})
paletteOnly.postcss = true

export default {
  plugins: [(await import('tailwindcss')).default, paletteOnly],
}
