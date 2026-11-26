import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/portfolio'
import { useMotionOk } from '../../hooks/useMotionOk'
import Magnet from '../reactbits/Magnet'
import TextPressure from '../reactbits/TextPressure'

/** linha fina com um pulso que corre de ponta a ponta, continuando a rede do Contato */
function SignalLine() {
  return (
    <div className="relative my-12 h-px overflow-hidden bg-white/10" aria-hidden="true">
      <span className="absolute inset-y-0 left-[-30%] w-[30%] bg-[linear-gradient(90deg,transparent,#34d399,transparent)] motion-safe:animate-[signal-run_5s_cubic-bezier(.6,0,.4,1)_infinite] motion-reduce:left-[35%]" />
    </div>
  )
}

export function Footer() {
  const motionOk = useMotionOk()
  const year = new Date().getFullYear()
  const stage = useRef<HTMLDivElement>(null)
  // o efeito (e a fonte Roboto Flex de ~190 KB que ele baixa) só entra quando o rodapé está chegando
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = stage.current
    if (!el || near) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  return (
    <footer className="liquid-glass border-t border-white/10 px-5 pt-14 pb-8">
      <div className="mx-auto max-w-6xl">
        <div ref={stage} className="h-[90px] select-none sm:h-[140px] lg:h-[190px]" aria-hidden="true">
          {motionOk && near ? (
            <TextPressure text="VAMOS CONSTRUIR" textColor="#ffffff" pressureColor="#34d399" minFontSize={32} idle="none" />
          ) : (
            <p className="text-center text-5xl font-black tracking-tight text-white sm:text-7xl">VAMOS CONSTRUIR</p>
          )}
        </div>

        <SignalLine />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <p>
            © {year} <span className="text-zinc-300">{profile.name}</span>
          </p>
          <p className="text-center">{profile.role}</p>
          <Magnet padding={30} magnetStrength={3} wrapperClassName="inline-block" innerClassName="flex">
            <a
              href="#home"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <span aria-hidden="true">↑</span> topo
            </a>
          </Magnet>
        </div>
      </div>
    </footer>
  )
}
