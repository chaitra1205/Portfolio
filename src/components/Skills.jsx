import { skills } from '../data/content'
import { Container, Reveal, SectionHeader, Tag } from './ui'

export default function Skills() {
  return (
    <section id="skills" className="border-t border-emerald/10 py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              index="05"
              label="Technical Skills"
              title="The toolkit"
              description="Languages, frameworks and practices used across internships and projects."
            />
          </div>

          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {skills.map((g, i) => (
              <Reveal
                key={g.category}
                delay={(i % 2) * 0.05}
                className={`border-t border-emerald/20 py-5 ${i === skills.length - 1 && skills.length % 2 ? 'sm:col-span-2' : ''}`}
              >
                <h3 className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald/75">
                  {g.category}
                  {g.learning && <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-vermilion" />}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={g.category}>
                  {g.items.map((s) => (
                    <Tag key={s} className={`transition-colors duration-300 hover:border-emerald hover:bg-emerald hover:text-ivory ${g.learning ? 'border-vermilion/60' : ''}`}>
                      {s}
                    </Tag>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
