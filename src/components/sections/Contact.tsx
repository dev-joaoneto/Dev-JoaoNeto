import { useCallback, useRef, useState, type ReactNode } from 'react'
import { profile, socialLinks } from '../../data/portfolio'
import SpotlightCard from '../reactbits/SpotlightCard'
import { BriefConsole } from '../contact/BriefConsole'
import { DecodeText } from '../contact/DecodeText'
import { NeuralField } from '../contact/NeuralField'
import WhatsAppIcon from '../ui/WhatsAppIcon'

const linkOf = (label: string) => socialLinks.find((l) => l.label === label)?.href ?? '#'

type Channel = {
  scheme: string
  title: string
  detail: string
  href: string
  download?: boolean
  icon?: ReactNode
}

const channels: Channel[] = [
  { scheme: 'whatsapp://', title: 'WhatsApp', detail: 'o caminho mais rápido', href: profile.whatsappUrl, icon: <WhatsAppIcon /> },
  { scheme: 'in://', title: 'LinkedIn', detail: 'joao-neto-dev', href: linkOf('LinkedIn') },
  { scheme: 'gh://', title: 'GitHub', detail: 'Dev-JoaoNeto', href: linkOf('GitHub') },
  { scheme: 'cv.pdf', title: 'Currículo', detail: 'baixar em PDF', href: profile.resumeUrl, download: true },
]

const cardClass = 'rounded-xl! p-0! transition duration-300 hover:-translate-y-0.5'

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <SpotlightCard className={cardClass} spotlightColor="#34d399" intensity={0.12} borderGlow={0.8} spotlightSize={180}>
      <a
        href={channel.href}
        target="_blank"
        rel="noopener noreferrer"
        download={channel.download || undefined}
        className="group flex items-center gap-3 p-4 focus:outline-none"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">{channel.scheme}</span>
          <span className="mt-0.5 flex items-center gap-2 text-[15px] font-semibold text-white">
            {channel.title}
            {channel.icon}
          </span>
          <span className="block truncate text-xs text-zinc-500">{channel.detail}</span>
        </span>
        <span className="text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" aria-hidden="true">
          {channel.download ? '↓' : '↗'}
        </span>
      </a>
    </SpotlightCard>
  )
}

function EmailCard() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <SpotlightCard className={cardClass} spotlightColor="#34d399" intensity={0.12} borderGlow={0.8} spotlightSize={180}>
      <button type="button" onClick={copy} className="group flex w-full items-center gap-3 p-4 text-left focus:outline-none">
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">mailto:</span>
          <span className="mt-0.5 block text-[15px] font-semibold text-white">E-mail</span>
          <span className="block truncate text-xs text-zinc-500">{profile.email}</span>
        </span>
        <span
          className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
            copied ? 'border-emerald-400/60 text-emerald-300' : 'border-white/10 text-zinc-500 group-hover:text-emerald-300'
          }`}
          aria-live="polite"
        >
          {copied ? 'copiado ✓' : 'copiar'}
        </span>
      </button>
    </SpotlightCard>
  )
}

export function Contact() {
  const [signal, setSignal] = useState(0)
  const last = useRef(0)
  // no máximo um pulso a cada 90 ms, para a rede não virar ruído
  const pulse = useCallback(() => {
    const now = performance.now()
    if (now - last.current < 90) return
    last.current = now
    setSignal((n) => n + 1)
  }, [])

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-zinc-950 px-5 py-24 md:py-32">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" aria-hidden="true">
        <NeuralField signal={signal} />
      </div>

      <div className="scroll-reveal relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Contato</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
            <DecodeText text="Vamos conversar sobre uma oportunidade?" />
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            Vagas, freelas ou um produto com IA para tirar do papel. Descreva o que precisa para o agente organizar o pedido, ou fale direto por um dos canais.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
          <BriefConsole onType={pulse} />
          <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ChannelCard channel={channels[0]} />
            <EmailCard />
            {channels.slice(1).map((channel) => (
              <ChannelCard key={channel.title} channel={channel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
