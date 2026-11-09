import { education } from '../data/content'
import { Container, Reveal, SectionHeader } from './ui'

export default function Education() {
  return (
    <section id="education" className="border-t border-emerald/10 py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              index="02"
              label="Education"
              title="Academic foundation"
              description="Computer Science and Engineering, built on a strong record in mathematics and science."
            />
          </div>

          <ol className="border-t border-emerald/20 lg:col-span-8 lg:self-center">
            {education.map((e, i) => (
              <Reveal
                as="li"
                key={e.school}
                delay={i * 0.06}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 border-b border-emerald/20 py-5 sm:grid-cols-[9rem_1fr_auto] sm:py-6"
              >
                <p className="col-span-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-emerald/70 sm:col-span-1">{e.period}</p>
                <div>
                  <h3 className="text-base font-bold leading-snug sm:text-lg">{e.school}</h3>
                  <p className="mt-0.5 text-sm text-emerald/75">{e.degree}</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-emerald/65">{e.scoreLabel}</p>
                  <p className="text-xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-vermilion sm:text-2xl">{e.score}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
