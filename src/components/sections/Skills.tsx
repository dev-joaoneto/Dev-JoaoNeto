import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { skills } from '../../data/portfolio'
import LogoLoop from '../reactbits/LogoLoop'
import { GlassDialog } from '../ui/GlassDialog'
import { SectionHeading } from '../ui/SectionHeading'

type Group = (typeof skills)[number]

const loopLogos = skills
  .flatMap((group) => group.items)
  .filter((item, i, all) => all.findIndex((other) => other.icon === item.icon) === i)
  .map((item) => ({ src: item.icon, alt: item.name, title: item.name }))

const featuredAi = ['Agentes de IA', 'RAG e embeddings', 'Fine-tuning', 'MCP', 'Skills de agente', 'Evals e guardrails']

const aiFlow = ['dados', 'embeddings', 'RAG', 'fine-tuning', 'MCP', 'skills', 'evals', 'produção']

// tablet: IA em cima e as três áreas lado a lado; desktop: IA à esquerda e as três empilhadas à direita
const layout: Record<string, string> = {
  ia: 'md:col-span-6 lg:col-span-2 lg:row-span-3',
  front: 'md:col-span-2 lg:col-span-1',
  back: 'md:col-span-2 lg:col-span-1',
  tools: 'md:col-span-2 lg:col-span-1',
}

const labels: Record<string, string> = { ia: 'IA', front: 'front-end', back: 'back-end', tools: 'tools' }

// borda que acende seguindo o cursor (máscara deixa só o contorno)
const borderMask: CSSProperties = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
}

const tiltTransform =
  'perspective(900px) rotateX(calc(var(--py, 0) * -1 * var(--tilt))) rotateY(calc(var(--px, 0) * var(--tilt))) scale(var(--lift, 1))'
// conteúdo anda um pouco na direção do cursor, como se estivesse à frente do fundo
// deslocamento proporcional ao tamanho do card: no tile grande, 4px sumiriam
const parallax = 'translate3d(calc(var(--px, 0) * var(--depth, 4px)), calc(var(--py, 0) * var(--depth, 4px)), 0)'

const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// luz da borda segue o cursor; inclinação e paralaxe só com mouse e movimento liberado
function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  if (event.pointerType !== 'mouse' || calm()) return
  el.style.setProperty('--lift', '1.015')
  el.style.setProperty('--px', ((x / rect.width) * 2 - 1).toFixed(3))
  el.style.setProperty('--py', ((y / rect.height) * 2 - 1).toFixed(3))
}

function resetPointer(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--lift', '1')
  event.currentTarget.style.setProperty('--px', '0')
  event.currentTarget.style.setProperty('--py', '0')
}

function Icon({ src, size = 'h-9 w-9' }: { src: string; size?: string }) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/60`}>
      <img src={src} alt="" aria-hidden="true" width="20" height="20" className="h-5 w-5 object-contain" loading="lazy" decoding="async" />
    </span>
  )
}

function Tile({ group, onOpen }: { group: Group; onOpen: (key: string, el: HTMLElement) => void }) {
  const big = group.key === 'ia'
  const icons = group.items.filter((item, i, all) => all.findIndex((o) => o.icon === item.icon) === i)
  const preview = big ? icons : icons.slice(0, 4)
  const featured = big ? group.items.filter((item) => featuredAi.includes(item.name)) : []
  const rest = icons.length - preview.length

  return (
    <button
      type="button"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onClick={(e) => onOpen(group.key, e.currentTarget)}
      aria-haspopup="dialog"
      style={{ '--tilt': '7deg', '--depth': big ? '10px' : '4px', transform: tiltTransform } as CSSProperties}
      className={`group/tile relative isolate flex min-h-[180px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(180deg,#101012_0%,#0a0a0b_45%,#070708_100%)] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-28px_48px_rgba(0,0,0,0.4),0_20px_40px_-26px_rgba(0,0,0,0.95)] transition-[transform,translate,box-shadow,border-color] duration-500 ease-out will-change-transform hover:-translate-y-0.5 hover:border-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-28px_48px_rgba(0,0,0,0.4),0_30px_60px_-30px_rgba(16,185,129,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none sm:p-6 ${layout[group.key] ?? ''}`}
    >
      {/* luz que segue o cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(52,211,153,0.10), transparent 60%)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl p-px opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        style={{ ...borderMask, background: 'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(52,211,153,0.9), transparent 70%)' }}
      />
      {/* fio de luz no topo: dá volume mesmo parado */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <span className="relative flex flex-1 flex-col transition-transform duration-300 ease-out" style={{ transform: parallax }}>

      <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
        <span className="text-emerald-300">{labels[group.key] ?? group.key}</span>
        <span className="text-zinc-500">{group.items.length} skills</span>
      </span>

      <span className={`mt-4 block font-semibold text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.7)] ${big ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{group.group}</span>
      <span className={`mt-1.5 block text-sm leading-6 text-zinc-500 ${big ? 'max-w-md' : ''}`}>{group.caption}</span>

      {big ? (
        <span className="mt-5 hidden flex-wrap items-center gap-1 font-mono text-[11px] sm:flex" aria-hidden="true">
          {aiFlow.map((step, i) => (
            <span key={step} className="flex items-center gap-1">
              <span className="rounded border border-emerald-400/20 bg-emerald-400/[0.06] px-1.5 py-0.5 text-emerald-200/90">{step}</span>
              {i < aiFlow.length - 1 ? <span className="text-zinc-700">→</span> : null}
            </span>
          ))}
        </span>
      ) : null}

      {big ? (
        <span className="mt-5 hidden gap-2 sm:grid sm:grid-cols-2">
          {featured.map((item) => (
            <span key={item.name} className="flex gap-3 rounded-lg border border-white/10 bg-black/40 p-3 transition group-hover/tile:border-white/15">
              <Icon src={item.icon} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{item.name}</span>
                <span className="mt-0.5 block text-xs leading-5 text-zinc-500">{item.note}</span>
              </span>
            </span>
          ))}
        </span>
      ) : null}

      <span className="mt-auto flex items-end justify-between gap-3 pt-6">
        <span className="flex flex-wrap gap-1.5">
          {preview.map((item) => (
            <Icon key={item.name} src={item.icon} />
          ))}
          {rest > 0 ? (
            <span className="flex h-9 min-w-9 items-center justify-center rounded-md border border-white/10 bg-black/60 px-2 font-mono text-xs text-zinc-400">
              +{rest}
            </span>
          ) : null}
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 transition group-hover/tile:text-emerald-300">
          <span className={big ? '' : 'sr-only'}>abrir</span>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition duration-300 group-hover/tile:border-emerald-400/60 group-hover/tile:bg-emerald-400/10"
          >
            <span className="transition-transform duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5">↗</span>
          </span>
        </span>
      </span>
      </span>
    </button>
  )
}

function Panel({ openKey, onSwitch, onClose }: { openKey: string; onSwitch: (key: string) => void; onClose: () => void }) {
  const group = skills.find((g) => g.key === openKey) ?? skills[0]

  return (
    <GlassDialog
      scheme="skills"
      path={group.key}
      labelledBy="skills-panel-title"
      onClose={onClose}
      toolbar={
        <div className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-white/10 px-5 py-3 [scrollbar-width:none]" role="tablist" aria-label="Grupos de skills">
          {skills.map((g) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={g.key === group.key}
              onClick={() => onSwitch(g.key)}
              className={`inline-flex shrink-0 items-center justify-center rounded-md border px-2.5 py-1 font-mono text-[11px] leading-4 transition ${
                g.key === group.key
                  ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                  : 'border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
              }`}
            >
              #{g.key}
            </button>
          ))}
        </div>
      }
    >
      <h3 id="skills-panel-title" className="text-2xl font-semibold text-white">
        {group.group}
      </h3>
      <p className="mt-1 text-sm text-zinc-500">{group.caption}</p>

      <ul key={group.key} className="mt-5 grid gap-2 sm:grid-cols-2">
        {group.items.map((item, i) => (
          <li
            key={item.name}
            className="flex animate-[skill-in_380ms_ease-out_both] gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 motion-reduce:animate-none"
            style={{ animationDelay: `${i * 35}ms` }}
          >
            <Icon src={item.icon} size="h-10 w-10" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">{item.name}</span>
              <span className="mt-0.5 block text-xs leading-5 text-zinc-400">{item.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </GlassDialog>
  )
}

export function Skills() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const open = useCallback((key: string, el: HTMLElement) => {
    trigger.current = el
    setOpenKey(key)
  }, [])

  const close = useCallback(() => {
    setOpenKey(null)
    trigger.current?.focus()
  }, [])

  return (
    <section id="skills" className="scroll-reveal relative border-t border-white/10 bg-zinc-950 px-5 py-20">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="Stack para construir produtos modernos e inteligentes."
          description="Do front-end à engenharia de IA. Abra cada área para ver as tecnologias e o que eu faço com cada uma."
        />

        <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-black/40 py-6">
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

        <div className="grid gap-4 md:grid-cols-6 lg:auto-rows-[minmax(180px,auto)] lg:grid-cols-3">
          {skills.map((group) => (
            <Tile key={group.key} group={group} onOpen={open} />
          ))}
        </div>
      </div>

      {openKey ? <Panel openKey={openKey} onSwitch={setOpenKey} onClose={close} /> : null}
    </section>
  )
}
