import { leadership } from '../data/content'
import { Container, Reveal, SectionHeader } from './ui'

function CropMarks() {
  const base = 'absolute h-4 w-4 border-vermilion'
  return (
    <span aria-hidden="true">
      <span className={`${base} -left-px -top-px border-l-2 border-t-2`} />
      <span className={`${base} -right-px -top-px border-r-2 border-t-2`} />
      <span className={`${base} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${base} -bottom-px -right-px border-b-2 border-r-2`} />
    </span>
  )
}

export default function Leadership() {
  return (
    <section id="leadership" className="border-t border-emerald/10 py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader index="06" label="Leadership" title="Beyond the code" />
          </div>

          <Reveal className="relative border border-emerald/20 p-6 sm:p-8 lg:col-span-8">
            <CropMarks />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{leadership.role}</h3>
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-emerald/75">{leadership.org}</p>
            </div>
            <ul className="mt-5 space-y-3">
              {leadership.points.map((p) => (
                <li key={p} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-emerald/85">
                  <span aria-hidden="true" className="mt-[0.72em] w-3 shrink-0 border-t-2 border-vermilion" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
