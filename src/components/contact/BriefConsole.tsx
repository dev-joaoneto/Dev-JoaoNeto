import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile, projects } from '../../data/portfolio'

type Kind = 'ia' | 'site' | 'sistema' | 'vaga' | 'conversa'

type Brief = {
  kind: Kind
  label: string
  summary: string
  skills: string[]
  related: string[]
}

const examples = [
  'Quero um agente de IA que atenda meus clientes no WhatsApp',
  'Tenho uma vaga de full stack com foco em IA',
  'Preciso de um site profissional para minha empresa',
  'Quero um sistema com login, painel e pagamentos',
]

const profiles: Record<Kind, Omit<Brief, 'kind'>> = {
  ia: {
    label: 'projeto de IA',
    summary: 'Dá para resolver com um agente: base de conhecimento com RAG, ações por tool calling e MCP, e evals antes de ir para produção.',
    skills: ['Agentes', 'RAG', 'MCP', 'Evals', 'LLMs'],
    related: ['Digytron Lecion'],
  },
  site: {
    label: 'site',
    summary: 'Site rápido e responsivo, pensado para converter, com animação na medida e pronto para o Google.',
    skills: ['React', 'TypeScript', 'Tailwind', 'SEO', 'Framer Motion'],
    related: ['Digytron', 'Wagner Simões Advogados'],
  },
  sistema: {
    label: 'sistema full stack',
    summary: 'Produto de ponta a ponta: interface em React, API em Node.js, banco SQL, autenticação e pagamentos.',
    skills: ['React', 'Node.js', 'SQL', 'Supabase', 'Stripe'],
    related: ['SpendNote', 'Dev&Grill'],
  },
  vaga: {
    label: 'oportunidade de vaga',
    summary: 'Full stack com engenharia de IA: do componente ao deploy, com RAG, fine-tuning e agentes em produção. O currículo está aqui do lado.',
    skills: ['Full stack', 'Engenharia de IA', 'React', 'Node.js', 'LLMs'],
    related: ['Digytron Lecion', 'SpendNote'],
  },
  conversa: {
    label: 'conversa aberta',
    summary: 'Não encaixei em uma categoria, e tudo bem: mande a ideia do jeito que está que a gente conversa.',
    skills: ['Full stack', 'IA'],
    related: [],
  },
}

function classify(text: string): Brief {
  const t = text.toLowerCase()
  let kind: Kind = 'conversa'
  if (/vaga|contrat|clt|\bpj\b|recrut|processo seletivo|entrevista/.test(t)) kind = 'vaga'
  else if (/\bia\b|intelig|agente|chat ?bot|\bbot|rag|gpt|llm|automa|atend|mcp|fine|modelo/.test(t)) kind = 'ia'
  else if (/sistema|\bapp|aplicativo|painel|dashboard|login|pagamento|\bapi\b|saas|plataforma|gest/.test(t)) kind = 'sistema'
  else if (/site|landing|p[áa]gina|institucional|portf[óo]lio|loja/.test(t)) kind = 'site'
  return { kind, ...profiles[kind] }
}

const steps = ['lendo o pedido', 'classificando', 'cruzando com skills e projetos', 'rascunho pronto']
const whatsappNumber = profile.whatsappUrl.replace(/\D/g, '')

/** agente de triagem: entende o pedido, mostra o que se aplica e deixa a mensagem pronta */
export function BriefConsole({ onType }: { onType: () => void }) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'done'>('idle')
  const [step, setStep] = useState(0)
  const [brief, setBrief] = useState<Brief | null>(null)
  const [asked, setAsked] = useState('')
  const timers = useRef<number[]>([])
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const run = (value: string) => {
    const clean = value.trim()
    if (!clean || phase === 'thinking') return
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setAsked(clean)
    setBrief(classify(clean))
    setPhase('thinking')
    setStep(0)
    const gap = calm ? 0 : 420
    steps.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStep(i + 1)
          onType()
          if (i === steps.length - 1) {
            setPhase('done')
            requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: true }))
          }
        }, gap * (i + 1)),
      )
    })
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    run(text)
  }

  // a mensagem é do visitante: o pedido dele, com começo e fim de conversa, sem rótulo de sistema
  const request = asked ? asked.charAt(0).toUpperCase() + asked.slice(1) + (/[.!?]$/.test(asked) ? '' : '.') : ''
  const draft = brief ? `Oi, João, tudo bem? Vi seu portfólio e queria falar com você sobre uma ideia.\n\n${request}\n\nPodemos conversar?` : ''
  const related = brief ? projects.filter((p) => brief.related.includes(p.title)) : []

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#111113_0%,#0a0a0b_45%,#070708_100%)] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_80px_-30px_rgba(0,0,0,0.95)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className="text-zinc-500">
          agent://<span className="text-white">briefing</span>
        </span>
        <span className="flex items-center gap-1.5 text-zinc-500">
          <span className={`h-1.5 w-1.5 rounded-full ${phase === 'thinking' ? 'animate-pulse bg-amber-300' : 'bg-emerald-400'}`} />
          {phase === 'thinking' ? 'processando' : 'pronto'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <p className="text-sm leading-6 text-zinc-400">
          Conte em uma frase o que você precisa. O agente entende o pedido, mostra o que do meu trabalho se aplica e deixa a mensagem pronta.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="brief-input" className="sr-only">
            O que você precisa?
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3 transition focus-within:border-emerald-400/60">
            <span className="font-mono text-sm text-emerald-400" aria-hidden="true">
              ›
            </span>
            <input
              id="brief-input"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                onType()
              }}
              placeholder="ex.: quero um agente que responda meus clientes"
              autoComplete="off"
              maxLength={280}
              className="min-h-11 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!text.trim() || phase === 'thinking'}
            className="min-h-11 rounded-lg border border-emerald-500/60 bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-40"
          >
            Analisar
          </button>
        </form>

        {phase === 'idle' ? (
          <div className="flex flex-wrap gap-1.5">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setText(example)
                  run(example)
                }}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-left text-xs text-zinc-400 transition hover:border-emerald-400/50 hover:text-emerald-200"
              >
                {example}
              </button>
            ))}
          </div>
        ) : (
          <ol className="space-y-1 font-mono text-[12px]" aria-live="polite">
            {steps.map((label, i) => {
              const state = step > i ? 'done' : step === i && phase === 'thinking' ? 'run' : 'wait'
              return (
                <li key={label} className={`flex items-center gap-2 ${state === 'wait' ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  <span className={state === 'done' ? 'text-emerald-400' : state === 'run' ? 'animate-pulse text-amber-300' : ''} aria-hidden="true">
                    {state === 'done' ? '✓' : '•'}
                  </span>
                  {label}
                  {i === 1 && step > 1 && brief ? <span className="text-emerald-300">→ {brief.label}</span> : null}
                </li>
              )
            })}
          </ol>
        )}

        {phase === 'done' && brief ? (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="animate-[skill-in_.45s_ease-out] space-y-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4 focus:outline-none"
          >
            <p className="text-sm leading-6 text-zinc-200">{brief.summary}</p>
            <ul className="flex flex-wrap gap-1.5">
              {brief.skills.map((s) => (
                <li key={s} className="rounded border border-emerald-400/25 bg-emerald-400/[0.08] px-1.5 py-0.5 font-mono text-[11px] text-emerald-200">
                  {s}
                </li>
              ))}
            </ul>
            {related.length ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                parecido com:
                {related.map((p) => (
                  <a key={p.title} href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-300 hover:text-emerald-300">
                    {p.title} ↗
                  </a>
                ))}
              </div>
            ) : null}
            <div>
              <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">mensagem pronta</p>
              <p className="whitespace-pre-line rounded-lg border border-white/10 bg-black/50 p-3 text-[13px] leading-6 text-zinc-300">{draft}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(draft)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-md border border-emerald-500/60 bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Enviar pelo WhatsApp
              </a>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent('Contato pelo portfólio')}&body=${encodeURIComponent(draft)}`}
                className="inline-flex min-h-11 items-center rounded-md border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-200"
              >
                Enviar por e-mail
              </a>
              <button
                type="button"
                onClick={() => {
                  setPhase('idle')
                  setText('')
                  setStep(0)
                }}
                className="inline-flex min-h-11 items-center px-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 transition hover:text-emerald-300"
              >
                recomeçar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
