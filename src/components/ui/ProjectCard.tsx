import { useEffect, useRef } from 'react'
import type { Project } from '../../data/portfolio'
import { Button } from './Button'

type CardProps = {
  project: Project
  onDetails: (project: Project) => void
}

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, '')

const kindStyle: Record<Project['kind'], string> = {
  IA: 'border-emerald-400/50 bg-emerald-400/15 text-emerald-200',
  'Full stack': 'border-white/15 bg-white/[0.04] text-zinc-200',
  Site: 'border-white/10 bg-white/[0.02] text-zinc-400',
}

export function KindBadge({ kind }: { kind: Project['kind'] }) {
  return (
    <span className={`inline-flex self-start items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] ${kindStyle[kind]}`}>
      {kind === 'IA' ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> : null}
      {kind}
    </span>
  )
}

/** vídeo real da página: parado no primeiro quadro, rola quando o mouse entra no card */
function ShotVideo({ project }: { project: Project }) {
  const ref = useRef<HTMLVideoElement>(null)
  const video = project.video!

  useEffect(() => {
    const el = ref.current
    const card = el?.closest('article')
    if (!el || !card) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const enter = (event: PointerEvent) => {
      if (calm || event.pointerType !== 'mouse') return
      el.play().catch(() => {})
    }
    const leave = () => {
      el.pause()
      el.currentTime = 0
    }
    card.addEventListener('pointerenter', enter)
    card.addEventListener('pointerleave', leave)
    return () => {
      card.removeEventListener('pointerenter', enter)
      card.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <video
      ref={ref}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Gravação do site ${project.title} rolando`}
      className="absolute inset-0 h-full w-full object-cover object-top"
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  )
}

/** moldura de navegador; com print de página inteira, a página desce sozinha no hover do card */
export function Shot({ project, className = '', scroll = true }: { project: Project; className?: string; scroll?: boolean }) {
  const video = scroll && project.video
  const full = scroll && !video ? project.fullImageUrl : undefined
  const src = full ?? project.imageUrl
  const hint = video || full

  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900/80 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-black/60 px-2.5 py-0.5 text-center font-mono text-[11px] text-zinc-500">
          {hostOf(project.liveUrl)}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-black [container-type:size]">
        {video ? (
          <ShotVideo project={project} />
        ) : src ? (
          <img
            src={src}
            alt={`Captura de tela do projeto ${project.title}`}
            loading="lazy"
            decoding="async"
            className={
              full
                ? 'absolute inset-x-0 top-0 h-auto w-full transition-transform duration-1000 ease-in-out group-hover/card:duration-[7000ms] group-hover/card:[transform:translateY(calc(-100%+100cqh))] motion-reduce:transition-none'
                : 'h-full w-full object-cover object-left-top transition-transform duration-1000 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none'
            }
          />
        ) : null}
        {hint ? (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md border border-white/10 bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 opacity-100 backdrop-blur transition-opacity duration-300 group-hover/card:opacity-0">
            passe o mouse para rolar
          </span>
        ) : null}
      </div>
    </div>
  )
}

export function AiFlow({ flow }: { flow: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-1 font-mono text-[11px]" aria-label="Como a IA trabalha">
      {flow.map((step, i) => (
        <li key={step} className="flex items-center gap-1">
          <span className="rounded border border-emerald-400/25 bg-emerald-400/[0.08] px-1.5 py-0.5 text-emerald-200">{step}</span>
          {i < flow.length - 1 ? <span className="text-zinc-600" aria-hidden="true">→</span> : null}
        </li>
      ))}
    </ol>
  )
}

function Actions({ project, onDetails }: CardProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Button href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Abrir o projeto ${project.title} em uma nova aba`}>
        Ver projeto
      </Button>
      <button
        type="button"
        onClick={() => onDetails(project)}
        aria-haspopup="dialog"
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-200"
      >
        Detalhes
      </button>
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver o código do projeto ${project.title} no GitHub`}
          className="inline-flex min-h-11 items-center px-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 transition hover:text-emerald-300"
        >
          código ↗
        </a>
      ) : null}
    </div>
  )
}

const surface =
  'border border-white/10 bg-[linear-gradient(180deg,#111113_0%,#0a0a0b_45%,#070708_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_80px_-30px_rgba(0,0,0,0.95)]'

/** desktop: print à esquerda, informação sempre visível à direita */
export function ProjectCard({ project, onDetails }: CardProps) {
  return (
    <article className={`group/card relative grid h-[min(540px,calc(100vh-9rem))] grid-cols-[1.3fr_1fr] gap-7 overflow-hidden rounded-2xl p-4 ${surface}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <Shot project={project} className="h-full" />

      <div className="flex min-h-0 flex-col py-3 pr-3">
        <div className="flex items-center justify-between gap-3">
          <KindBadge kind={project.kind} />
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            no ar
          </span>
        </div>

        <h3 className="mt-5 text-3xl font-semibold leading-tight text-white">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-emerald-300/90">{project.tagline}</p>
        <p className="mt-4 text-[15px] leading-7 text-zinc-300">{project.challenge}</p>

        {project.ai ? (
          <div className="mt-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">como a IA trabalha</p>
            <AiFlow flow={project.ai.flow} />
          </div>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-zinc-300">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Actions project={project} onDetails={onDetails} />
        </div>
      </div>
    </article>
  )
}

/** celular e tablet: print em cima, informação embaixo, sem sobrepor */
export function ProjectMobileCard({ project, onDetails }: CardProps) {
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-2xl p-3 ${surface}`}>
      <Shot project={project} scroll={false} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <KindBadge kind={project.kind} />
        <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-emerald-300/90">{project.tagline}</p>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{project.challenge}</p>
        {project.ai ? (
          <div className="mt-4">
            <AiFlow flow={project.ai.flow} />
          </div>
        ) : null}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-zinc-300">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <Actions project={project} onDetails={onDetails} />
        </div>
      </div>
    </article>
  )
}
