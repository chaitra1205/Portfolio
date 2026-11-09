import { ArrowUp, ArrowUpRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/content'
import { Button, Container, Reveal, SectionHeader } from './ui'

const rows = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="relative bg-emerald text-ivory">
      <Container className="pb-10 pt-20 sm:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              onDark
              index="07"
              label="Contact"
              title="Let's build something thoughtful together"
              description="Have an opportunity, a project or a question? I'd be glad to hear from you."
            />
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`} variant="ivory" icon={Mail} iconMotion="right">
                Send an Email
              </Button>
              <Button href={profile.resume} download={profile.resumeFile} variant="outlineLight" icon={Download} iconMotion="down">
                Download Resume
              </Button>
            </Reveal>
          </div>

          <ul className="border-t border-ivory/25 lg:col-span-7 lg:self-end">
            {rows.map((r, i) => (
              <Reveal as="li" key={r.label} delay={i * 0.05} className="border-b border-ivory/25">
                <a
                  href={r.href}
                  {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-4 sm:py-5"
                >
                  <span className="w-20 shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/70 sm:w-24">{r.label}</span>
                  <span className="min-w-0 flex-1 break-words text-base font-semibold transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5 sm:text-lg">
                    {r.value}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-[background-color,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-vermilion group-hover:bg-vermilion">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <footer className="mt-20 flex flex-col gap-5 border-t border-ivory/20 pt-7 text-[0.72rem] font-semibold text-ivory/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bonagiri Chaitra</p>
          <p>Clean code, problem-solving, continuous learning.</p>
          <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-ivory">
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/30 transition-[background-color,border-color] duration-300 group-hover:border-vermilion group-hover:bg-vermilion">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
          </a>
        </footer>
      </Container>
    </section>
  )
}
