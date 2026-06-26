import { skills } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="scroll-reveal border-t border-white/10 bg-zinc-950 px-5 py-20">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="Stack voltada para criar aplicações modernas e bem estruturadas."
          description="Tecnologias que aplico na construção de interfaces responsivas, APIs organizadas e soluções digitais com foco em performance, manutenção e evolução."
        />

        <div className="grid gap-5">
          {skills.map((skill) => (
            <article
              className="rounded-lg border border-white/10 bg-black/60 p-6 transition duration-300 hover:border-emerald-400/40"
              key={skill.group}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">
                  {skill.group}
                </h3>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {skill.items.length} skills
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-6">
                {skill.items.map((item) => (
                  <div
                    className="group flex min-h-20 items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/10"
                    key={item.name}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/50">
                      <img
                        src={item.icon}
                        alt=""
                        className="h-6 w-6 object-contain transition duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </span>
                    <span className="text-sm font-medium text-zinc-300 transition group-hover:text-white">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
