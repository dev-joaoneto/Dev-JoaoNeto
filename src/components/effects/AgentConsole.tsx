import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { profile, projects } from '../../data/portfolio'

type Intent = 'about' | 'ai' | 'projects' | 'stack' | 'why' | 'contact' | 'fallback'

type Message = {
  id: number
  role: 'user' | 'agent'
  text: string
  intent?: Intent
  done: boolean
}

const answers: Record<Intent, string> = {
  about: `Sou o agente do João. Ele é Desenvolvedor Full Stack e AI Engineer: constrói produtos web de ponta a ponta, da interface em React à API em Node.js, e coloca IA dentro do produto: RAG, fine-tuning, agentes com MCP e skills, tudo medido com evals. Hoje são ${projects.length} projetos publicados.`,
  ai: 'Ele trabalha o ciclo inteiro. Começa pelo dado: limpeza, chunking, embeddings e banco vetorial para um RAG que cita a fonte. Escolhe o modelo e decide entre prompt, RAG ou fine-tuning (LoRA, dataset curado) pelo custo e pela precisão. Dá ação ao agente com tool calling, servidores MCP e skills reutilizáveis. E fecha com evals, guardrails e observabilidade de custo, latência e alucinação, para o agente ser confiável em produção.',
  projects: 'Estes são alguns produtos que ele colocou no ar. Todos estão online para você abrir agora:',
  stack:
    'No front: React, TypeScript e Next.js. No back: Node.js, SQL, Supabase e Stripe. Na camada de IA: Claude e Gemini, RAG com embeddings e banco vetorial, fine-tuning, agentes com MCP e skills, evals e automações com n8n.',
  why: 'Três motivos: ele entrega do primeiro componente ao deploy; domina a engenharia de IA de ponta a ponta, do RAG e do fine-tuning ao agente com MCP medido por evals; e tem produtos reais no ar para você conferir.',
  contact: 'O caminho mais rápido é o WhatsApp. Também dá para baixar o currículo ou mandar um e-mail:',
  fallback:
    'Ainda sou um agente roteirizado, então por enquanto respondo às perguntas abaixo. Para qualquer outra coisa, fale direto com o João:',
}

const chips: { intent: Exclude<Intent, 'fallback'>; label: string; question: string }[] = [
  { intent: 'about', label: 'sobre', question: 'Quem é o João?' },
  { intent: 'ai', label: 'ia', question: 'Como ele constrói com IA?' },
  { intent: 'projects', label: 'projetos', question: 'Mostre projetos' },
  { intent: 'stack', label: 'stack', question: 'Qual a stack?' },
  { intent: 'why', label: 'por que ele', question: 'Por que contratar?' },
  { intent: 'contact', label: 'contato', question: 'Como falar com ele?' },
]

const stackPills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Supabase', 'Stripe', 'LLMs', 'RAG', 'Fine-tuning', 'Agentes', 'MCP', 'Skills', 'Evals', 'n8n']

const aiSteps = ['dados', 'embeddings', 'RAG', 'fine-tuning', 'MCP', 'skills', 'evals', 'produção']

function route(text: string): Intent {
  const t = text.toLowerCase()
  if (/\bia\b|intelig|rag|fine|tun|llm|agent|mcp|skill|embedd|vetor|eval|modelo|prompt/.test(t)) return 'ai'
  if (/projet|portf|trabalh|case|site/.test(t)) return 'projects'
  if (/stack|tecnolog|skill|linguag|react|node|ferrament/.test(t)) return 'stack'
  if (/contrat|por ?que|diferencial|vaga/.test(t)) return 'why'
  if (/contato|whats|e-?mail|falar|curr[ií]culo|cv/.test(t)) return 'contact'
  if (/quem|sobre|jo[aã]o|voc[eê]/.test(t)) return 'about'
  return 'fallback'
}

function Extra({ intent }: { intent: Intent }) {
  if (intent === 'projects') {
    return (
      <div className="mt-3 grid gap-2">
        {projects.slice(0, 3).map((p) => (
          <a
            key={p.title}
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-2 transition hover:border-emerald-400/50"
          >
            {p.imageUrl ? (
              <img src={p.imageUrl} alt="" className="h-10 w-16 shrink-0 rounded object-cover object-top" loading="lazy" />
            ) : null}
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white group-hover:text-emerald-300">{p.title}</span>
              <span className="block truncate text-xs text-zinc-500">{p.tagline}</span>
            </span>
            <span className="ml-auto pr-1 text-zinc-500 group-hover:text-emerald-300" aria-hidden="true">↗</span>
          </a>
        ))}
        <a href="#projects" className="text-xs font-semibold text-emerald-300 hover:text-emerald-200">
          Ver todos os {projects.length} projetos ↓
        </a>
      </div>
    )
  }
  if (intent === 'ai') {
    return (
      <ol className="mt-3 grid grid-cols-3 gap-1 font-mono text-[11px] sm:flex sm:flex-nowrap sm:items-center sm:gap-0.5">
        {aiSteps.map((step, i) => (
          <li key={step} className="flex items-center gap-0.5">
            <span className="w-full whitespace-nowrap rounded border border-emerald-400/25 bg-emerald-400/10 px-1.5 py-0.5 text-center text-emerald-200 sm:w-auto">{step}</span>
            {i < aiSteps.length - 1 ? <span className="hidden text-zinc-600 sm:inline" aria-hidden="true">→</span> : null}
          </li>
        ))}
      </ol>
    )
  }
  if (intent === 'stack') {
    return (
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {stackPills.map((s) => (
          <li key={s} className="rounded border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-200">
            {s}
          </li>
        ))}
      </ul>
    )
  }
  if (intent === 'contact' || intent === 'fallback') {
    const links = [
      { label: 'WhatsApp', href: profile.whatsappUrl, primary: true },
      { label: 'Currículo', href: profile.resumeUrl },
      { label: 'E-mail', href: `mailto:${profile.email}` },
    ]
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={
              l.primary
                ? 'rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-300'
                : 'rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:border-emerald-400/60 hover:text-emerald-200'
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    )
  }
  return null
}

export function AgentConsole({ instant = false }: { instant?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [busy, setBusy] = useState(false)
  const [draft, setDraft] = useState('')
  const logRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const nextId = useRef(0)

  const ask = useCallback(
    (intent: Intent, question: string) => {
      if (busy) return
      const full = answers[intent]
      const userId = nextId.current++
      const agentId = nextId.current++
      setMessages((m) => [
        ...m.slice(-6),
        { id: userId, role: 'user', text: question, done: true },
        { id: agentId, role: 'agent', text: instant ? full : '', intent, done: instant },
      ])
      if (instant) return
      setBusy(true)
      let i = 0
      window.clearInterval(timer.current)
      timer.current = window.setInterval(() => {
        i = Math.min(full.length, i + 3)
        const done = i >= full.length
        setMessages((m) => m.map((msg) => (msg.id === agentId ? { ...msg, text: full.slice(0, i), done } : msg)))
        if (done) {
          window.clearInterval(timer.current)
          setBusy(false)
        }
      }, 22)
    },
    [busy, instant],
  )

  // primeira pergunta roda sozinha para o recrutador ver o agente em ação
  useEffect(() => {
    const t = window.setTimeout(() => ask('about', 'Quem é o João?'), instant ? 0 : 900)
    return () => {
      window.clearTimeout(t)
      window.clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const q = draft.trim()
    if (!q || busy) return
    setDraft('')
    ask(route(q), q)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]/90 shadow-[0_0_60px_rgba(52,211,153,0.08)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className="text-zinc-400">
          agent://<span className="text-white">joao-neto</span>
        </span>
        <span className="flex items-center gap-2 text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          online
        </span>
      </div>

      <div ref={logRef} className="h-[220px] space-y-4 overflow-y-auto px-4 py-4 sm:h-[240px]" aria-live="polite">
        {messages.map((m) =>
          m.role === 'user' ? (
            <p key={m.id} className="font-mono text-sm text-zinc-400">
              <span className="text-emerald-400">❯</span> {m.text}
            </p>
          ) : (
            <div key={m.id} className="text-[15px] leading-7 text-zinc-200">
              {m.text}
              {!m.done ? <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-emerald-400" /> : null}
              {m.done && m.intent ? <Extra intent={m.intent} /> : null}
            </div>
          ),
        )}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Perguntas sugeridas">
          <span className="mr-1 font-mono text-[11px] text-zinc-600">/ask</span>
          {chips.map((c) => (
            <button
              key={c.intent}
              type="button"
              disabled={busy}
              onClick={() => ask(c.intent, c.question)}
              title={c.question}
              className="whitespace-nowrap rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition hover:border-emerald-400/60 hover:bg-emerald-400/[0.06] hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="text-emerald-400/70">#</span>
              {c.label}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="agent-input" className="sr-only">
            Pergunte algo ao agente
          </label>
          <span className="font-mono text-emerald-400" aria-hidden="true">❯</span>
          <input
            id="agent-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Pergunte algo ao agente…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            className="rounded-md bg-emerald-400 px-3 py-1 text-xs font-semibold text-black transition hover:bg-emerald-300 disabled:opacity-30"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
