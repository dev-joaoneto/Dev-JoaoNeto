import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../../data/portfolio'
import { useMotionOk } from '../../hooks/useMotionOk'
import { AgentConsole } from '../effects/AgentConsole'
import Magnet from '../reactbits/Magnet'
import { Button } from '../ui/Button'
import fotoPerfil from '/assets/foto-perfil.webp'

// three.js só é baixado em desktop com movimento liberado
const Lanyard = lazy(() => import('../reactbits/Lanyard'))

/** true só depois que a página carregou e o navegador ficou ocioso: montar o 3D não trava a abertura */
function useIdleReady(enabled: boolean) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!enabled || ready) return
    let idle = 0
    let timer = 0
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      else timer = window.setTimeout(() => setReady(true), 800)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      if (idle) window.cancelIdleCallback(idle)
      window.clearTimeout(timer)
    }
  }, [enabled, ready])
  return ready
}

export function Hero() {
  const showBadge = useMotionOk(1024)
  const badgeReady = useIdleReady(showBadge)
  const motionOk = useMotionOk()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-24 sm:pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_30%,rgba(52,211,153,0.10),transparent_32%),radial-gradient(circle_at_78%_40%,rgba(52,211,153,0.07),transparent_36%),linear-gradient(180deg,#050505_0%,#09090b_52%,#050505_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* crachá 3D pendurado do topo da hero; arraste para balançar */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block" aria-hidden="true">
        {showBadge ? (
          badgeReady ? (
          <Suspense fallback={null}>
            <Lanyard
              frontImage="/assets/badge-front.webp"
              backImage="/assets/badge-back.webp"
              strapImage="/assets/badge-strap.webp"
              strapSingle
              cardColor="#070708"
              strapColor="#0a0a0b"
              finish="glossy"
              metal="graphite"
              size={0.5}
              strapLength={0.42}
              cornerRadius={0.25}
              damping={0.85}
              breeze={0.2}
            />
          </Suspense>
          ) : null
        ) : (
          <img
            src="/assets/badge-front.webp"
            alt=""
            className="absolute right-[12%] top-1/2 w-[300px] -translate-y-1/2 rotate-3 rounded-2xl border border-white/10 shadow-2xl"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-[620px] lg:max-w-[52%] xl:max-w-[620px]">
          <h1>
            <span className="flex items-center gap-4">
              <img
                src={fotoPerfil}
                alt=""
                className="h-14 w-14 shrink-0 rounded-full border border-emerald-400/40 object-cover object-top sm:h-16 sm:w-16 lg:hidden"
              />
              <span className="block text-[2.6rem] font-black uppercase leading-[0.9] tracking-tight text-white min-[400px]:text-5xl sm:text-7xl xl:text-[5.5rem]">
                {profile.name}
              </span>
            </span>
            <span className="mt-4 block text-2xl font-semibold leading-tight text-zinc-300 sm:text-3xl">
              Full Stack <span className="text-emerald-400">&amp;</span> Engenheiro de IA
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
            Produtos web de ponta a ponta e sistemas de IA completos: RAG,
            fine-tuning, agentes com MCP e skills, medidos por evals. Não precisa
            acreditar em mim: pergunte ao meu agente.
          </p>

          <div className="mt-6">
            <AgentConsole instant={!motionOk} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Magnet padding={40} magnetStrength={4} wrapperClassName="block sm:inline-block" innerClassName="flex">
              <Button href="#projects" className="w-full">
                Ver projetos
              </Button>
            </Magnet>
            <Magnet padding={40} magnetStrength={4} wrapperClassName="block sm:inline-block" innerClassName="flex">
              <Button
                href={profile.resumeUrl}
                download
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Baixar currículo
              </Button>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  )
}
