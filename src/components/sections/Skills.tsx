import { skills } from '../../data/portfolio'
import LogoLoop from '../reactbits/LogoLoop'
import SpotlightCard from '../reactbits/SpotlightCard'
import { SectionHeading } from '../ui/SectionHeading'

const loopLogos = skills
  .flatMap((group) => group.items)
  .filter((item, i, all) => all.findIndex((other) => other.icon === item.icon) === i)
  .map((item) => ({ src: item.icon, alt: item.name, title: item.name }))

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-reveal relative border-t border-white/10 bg-zinc-950 px-5 py-20"
    >
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="Stack para construir produtos modernos e inteligentes."
          description="Do front-end à integração com modelos de IA: as tecnologias que uso no dia a dia para criar interfaces responsivas, APIs organizadas, agentes e automações que continuam fáceis de manter depois de entregues."
        />

        <div className="mb-10 overflow-hidden rounded-lg border border-white/10 bg-black/40 py-6">
          <LogoLoop
            logos={loopLogos}
            speed={60}
            logoHeight={34}
            gap={56}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#09090b"
            labels="hover"
            ariaLabel="Tecnologias que uso"
          />
        </div>

        <div className="grid gap-5">
          {skills.map((skill) => (
            <SpotlightCard
              className="rounded-lg! border border-white/10 p-6! transition duration-300 hover:border-emerald-400/40"
              spotlightColor="rgba(52, 211, 153, 0.22)"
              theme="dark"
              key={skill.group}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{skill.group}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{skill.caption}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {skill.items.length}{' '}
                  {skill.items.length === 1 ? 'tecnologia' : 'tecnologias'}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {skill.items.map((item) => (
                  <div
                    className="group flex min-h-20 items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/10"
                    key={item.name}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/50">
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        width="24"
                        height="24"
                        className="h-6 w-6 object-contain transition duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="text-sm font-medium text-zinc-300 transition group-hover:text-white">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
