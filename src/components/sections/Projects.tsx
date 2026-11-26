import { useCallback, useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../../data/portfolio'
import { GlassDialog } from '../ui/GlassDialog'
import { AiFlow, KindBadge, ProjectCard, ProjectMobileCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { useMedia } from '../../hooks/useMedia'

const slug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const STICK = 96 // px do topo onde cada card gruda (abaixo do header)
const STEP = 14 // cada card seguinte gruda um pouco mais abaixo, deixando a borda do anterior à vista

/** desktop: pilha que comprime; o card de trás encolhe e escurece quando o próximo chega */
function DesktopStack({ onDetails }: { onDetails: (p: Project) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const wrappers = useRef<(HTMLDivElement | null)[]>([])
  const inners = useRef<(HTMLDivElement | null)[]>([])
  const shades = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let inView = false
    const update = () => {
      raf = 0
      // primeiro todas as leituras de layout, depois todas as escritas: um único cálculo de layout por quadro
      const tops = wrappers.current.map((wrapper) => (wrapper ? wrapper.getBoundingClientRect().top : null))
      const heights = inners.current.map((inner) => (inner ? inner.offsetHeight : 0))
      const half = window.innerHeight * 0.5
      let current = 0
      tops.forEach((top, i) => {
        if (top !== null && top < half) current = i
      })
      inners.current.forEach((inner, i) => {
        if (!inner) return
        const nextTop = tops[i + 1]
        const height = heights[i]
        const progress =
          nextTop == null || !height ? 0 : Math.min(1, Math.max(0, (STICK + i * STEP + height - nextTop) / height))
        const transform = calm || !progress ? '' : `scale(${(1 - progress * 0.06).toFixed(4)})`
        if (inner.style.transform !== transform) inner.style.transform = transform
        // escurecer com uma película preta (só opacidade, resolvida na GPU) em vez de filter: brightness
        const shade = shades.current[i]
        const opacity = progress ? (progress * 0.55).toFixed(3) : '0'
        if (shade && shade.style.opacity !== opacity) shade.style.opacity = opacity
      })
      setActive(current)
    }
    const onScroll = () => {
      if (inView && !raf) raf = requestAnimationFrame(update)
    }
    // fora da tela, a pilha não faz conta nenhuma
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) onScroll()
    })
    if (root.current) io.observe(root.current)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (i: number) => {
    const wrapper = wrappers.current[i]
    if (!wrapper) return
    // posição do card no fluxo (o sticky distorce o rect), compensada pelo ponto onde ele gruda
    let top = 0
    let el: HTMLElement | null = wrapper
    while (el) {
      top += el.offsetTop
      el = el.offsetParent as HTMLElement | null
    }
    window.scrollTo({ top: top - STICK - i * STEP, behavior: 'smooth' })
  }

  return (
    <div ref={root} className="mx-auto hidden max-w-6xl gap-10 lg:grid lg:grid-cols-[190px_1fr]">
      <nav aria-label="Projetos" className="sticky top-28 self-start">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">projetos</p>
        <ol className="relative space-y-1 border-l border-white/10">
          {projects.map((p, i) => (
            <li key={p.title}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? 'true' : undefined}
                className={`-ml-px block w-full border-l py-1.5 pl-4 text-left text-sm transition ${
                  i === active ? 'border-emerald-400 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {p.title}
                {p.kind === 'IA' ? <span className="ml-2 font-mono text-[10px] text-emerald-400">IA</span> : null}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div>
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              wrappers.current[i] = el
            }}
            className="sticky mb-14 last:mb-0"
            style={{ top: STICK + i * STEP }}
          >
            <div
              ref={(el) => {
                inners.current[i] = el
              }}
              className="relative origin-top"
            >
              <ProjectCard project={project} onDetails={onDetails} />
              <div
                ref={(el) => {
                  shades.current[i] = el
                }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-black opacity-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArrowButton({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? 'Próximo projeto' : 'Projeto anterior'}
      className="group/arrow relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#141416,#0a0a0b)] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_-10px_rgba(0,0,0,0.9)] transition duration-300 hover:border-emerald-400/60 hover:text-emerald-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_18px_rgba(52,211,153,0.25)] active:scale-95 disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-300 ${dir === 1 ? 'group-hover/arrow:translate-x-0.5' : 'rotate-180 group-hover/arrow:-translate-x-0.5'}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  )
}

/** celular e tablet: carrossel com contador, pontos e setas */
function MobileCarousel({ onDetails }: { onDetails: (p: Project) => void }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      const step = first.offsetWidth + 16
      setActive(Math.min(projects.length - 1, Math.max(0, Math.round(el.scrollLeft / step))))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i: number) => {
    const el = scroller.current
    const card = el?.children[i] as HTMLElement | undefined
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="lg:hidden">
      {/* um card por vez, sem barra de rolagem; os pontos mostram a posição */}
      <div
        ref={scroller}
        className="mx-auto flex max-w-xl snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div key={project.title} className="w-full shrink-0 snap-center snap-always">
            <ProjectMobileCard project={project} onDetails={onDetails} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <ArrowButton dir={-1} disabled={active === 0} onClick={() => goTo(active - 1)} />
        <div className="flex items-center gap-2" role="tablist" aria-label="Escolher projeto">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => goTo(i)}
              aria-label={`Ir para ${p.title}`}
              className="flex h-6 items-center justify-center px-0.5"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/25'}`} />
            </button>
          ))}
        </div>
        <ArrowButton dir={1} disabled={active === projects.length - 1} onClick={() => goTo(active + 1)} />
      </div>
    </div>
  )
}

function Details({ project, onClose }: { project: Project; onClose: () => void }) {
  const src = project.fullImageUrl ?? project.imageUrl
  return (
    <GlassDialog scheme="projects" path={slug(project.title)} labelledBy="project-dialog-title" onClose={onClose}>
      <KindBadge kind={project.kind} />
      <h3 id="project-dialog-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        {project.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-emerald-300/90">{project.tagline}</p>

      {project.video ? (
        <div className="mt-5 aspect-[1440/1390] max-h-[60vh] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
          <video
            poster={project.video.poster}
            muted
            loop
            playsInline
            autoPlay
            controls
            aria-label={`Gravação do site ${project.title} rolando`}
            className="h-full w-full object-cover object-top"
          >
            <source src={project.video.webm} type="video/webm" />
            <source src={project.video.mp4} type="video/mp4" />
          </video>
        </div>
      ) : src ? (
        <div className="mt-5 h-56 overflow-y-auto rounded-xl border border-white/10 bg-black sm:h-72" tabIndex={0} aria-label="Captura de tela, role para ver a página">
          <img src={src} alt={`Captura de tela do projeto ${project.title}`} className="w-full" loading="lazy" decoding="async" />
        </div>
      ) : null}

      <div className="mt-6 grid gap-6">
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">o desafio</h4>
          <p className="mt-2 text-[15px] leading-7 text-zinc-200">{project.challenge}</p>
        </div>
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">o que foi construído</h4>
          <p className="mt-2 text-[15px] leading-7 text-zinc-300">{project.description}</p>
        </div>
        {project.ai ? (
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300">como a IA funciona</h4>
            <div className="mt-3">
              <AiFlow flow={project.ai.flow} />
            </div>
            <ul className="mt-4 space-y-2">
              {project.ai.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-6 text-zinc-300">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">stack</h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-zinc-300">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <Button href={project.liveUrl} target="_blank" rel="noreferrer">
          Ver projeto
        </Button>
        {project.repoUrl ? (
          <Button href={project.repoUrl} variant="secondary" target="_blank" rel="noreferrer">
            Código
          </Button>
        ) : null}
      </div>
    </GlassDialog>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const isDesktop = useMedia('(min-width: 1024px)')

  const openDetails = useCallback((project: Project) => {
    trigger.current = document.activeElement as HTMLElement | null
    setOpen(project)
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    trigger.current?.focus()
  }, [])

  return (
    <section id="projects" className="border-t border-white/10 bg-black px-5 py-20">
      <div className="scroll-reveal mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projetos"
          title="Produtos no ar, do primeiro componente ao deploy."
          description="Sistemas com IA, aplicações full stack e sites, todos publicados. Passe o mouse no print para rolar a página e abra os detalhes para ver como cada um foi construído."
        />
      </div>

      {/* só um dos dois existe na página: o celular não baixa os prints de página inteira do desktop */}
      {isDesktop ? <DesktopStack onDetails={openDetails} /> : <MobileCarousel onDetails={openDetails} />}

      {open ? <Details project={open} onClose={close} /> : null}
    </section>
  )
}
