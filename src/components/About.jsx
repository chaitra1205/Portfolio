import { about } from '../data/content'
import { Container, Reveal, SectionHeader } from './ui'

export default function About() {
  return (
    <section id="about" className="border-t border-emerald/10 py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              index="01"
              label="About"
              title="A developer who takes ownership"
              description="From development to testing — every feature carried through to the finish."
            />
            <Reveal delay={0.15} as="dl" className="mt-8 grid grid-cols-3 divide-x divide-emerald/15 border-y border-emerald/15">
              {about.facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse px-3 py-4 first:pl-0">
                  <dt className="mt-1 text-[0.62rem] font-bold uppercase leading-snug tracking-[0.14em] text-emerald/70">{f.label}</dt>
                  <dd className="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">{f.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal as="p" className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              {about.lead.map(([text, hl], i) =>
                hl ? (
                  <span key={i} className="underline decoration-vermilion decoration-2 underline-offset-[6px]">
                    {text}
                  </span>
                ) : (
                  <span key={i}>{text}</span>
                ),
              )}
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-5 max-w-3xl text-base leading-relaxed text-emerald/80">
              {about.body}
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {about.focus.map((f, i) => (
                <Reveal as="li" key={f.title} delay={(i % 3) * 0.06} className="group border-t border-emerald/15 py-5">
                  <span className="text-[0.68rem] font-bold tracking-[0.14em] text-vermilion">0{i + 1}</span>
                  <h3 className="mt-2 text-base font-bold transition-transform duration-300 group-hover:translate-x-1">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-emerald/75">{f.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
