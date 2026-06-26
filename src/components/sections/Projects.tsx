import { projects } from '../../data/portfolio'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  return (
    <section id="projects" className="scroll-reveal border-t border-white/10 bg-black px-5 py-20">
      <div className="mx-auto max-w-6xl ">
        <SectionHeading
          eyebrow="Projetos"
          title="Projetos desenvolvidos com foco em experiência, performance e código bem estruturado."
          description="Uma seleção de aplicações que mostram minha evolução técnica, atenção aos detalhes e capacidade de transformar ideias em soluções funcionais."
        />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      </div>

      <div className="hidden md:block">
        {projects.map((project, index) => (
          <div
            className="sticky top-0 flex h-screen items-start justify-center px-5 py-20"
            key={project.title}
            style={{ zIndex: index + 1 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,0.09),transparent_30%)]" />

            <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center">
              <div className="absolute left-0 hidden w-24 text-right lg:block">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="ml-auto mt-4 block h-28 w-px bg-gradient-to-b from-emerald-400/70 to-white/10" />
              </div>

              <div className="w-[76%] transition duration-700 ease-out">
                <ProjectCard {...project} index={index} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="project-carousel mx-auto flex max-w-6xl snap-x gap-4 overflow-x-auto pb-4 md:hidden">
        {projects.map((project, index) => (
          <div className="min-w-[93%] snap-center" key={project.title}>
            <ProjectCard {...project} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
