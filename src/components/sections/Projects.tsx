import { projects } from '../../data/portfolio'
import SpotlightCard from '../reactbits/SpotlightCard'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  return (
    <section id="projects" className="border-t border-white/10 bg-black px-5 py-20">
      <div className="scroll-reveal mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projetos"
          title="Produtos no ar, do primeiro componente ao deploy."
          description="Uma seleção de aplicações que mostram minha evolução técnica, atenção aos detalhes e capacidade de transformar ideias em soluções funcionais."
          className="mb-10 md:mb-2"
        />
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
              <SpotlightCard
                className="w-[76%] rounded-lg! bg-transparent! p-0! shadow-none!"
                spotlightColor="rgba(52, 211, 153, 0.35)"
                theme="dark"
              >
                <ProjectCard {...project} index={index} />
              </SpotlightCard>
            </div>
          </div>
        ))}
      </div>

      <div className="project-carousel scroll-reveal mx-auto flex max-w-6xl snap-x gap-4 overflow-x-auto pb-4 md:hidden">
        {projects.map((project, index) => (
          <div className="min-w-[93%] snap-center" key={project.title}>
            <ProjectCard {...project} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
