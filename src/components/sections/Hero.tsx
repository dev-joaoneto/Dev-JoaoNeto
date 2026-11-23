import { lazy, Suspense } from 'react'
import { profile } from '../../data/portfolio'
import { useMotionOk } from '../../hooks/useMotionOk'
import { AgentConsole } from '../effects/AgentConsole'
import Magnet from '../reactbits/Magnet'
import { Button } from '../ui/Button'
import fotoPerfil from '/assets/foto-perfil.webp'

// three.js só é baixado em desktop com movimento liberado
const Lanyard = lazy(() => import('../reactbits/Lanyard'))

export function Hero() {
  const showBadge = useMotionOk(1024)
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
          <Suspense fallback={null}>
            <Lanyard
              frontImage="/assets/badge-front.webp"
              backImage="/assets/badge-back.webp"
              strapImage="/assets/badge-strap.webp"
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
        ) : (
          <img
            src="/assets/badge-front.webp"
            alt=""
            className="absolute right-[12%] top-1/2 w-[300px] -translate-y-1/2 rotate-3 rounded-2xl border border-white/10 shadow-2xl"
          />
        )}
        <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-600">
          {showBadge ? 'arraste o crachá' : ''}
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-[620px]">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponível para novas oportunidades
          </span>

          <h1 className="mt-6">
            <span className="flex items-center gap-4">
              <img
                src={fotoPerfil}
                alt=""
                className="h-14 w-14 shrink-0 rounded-full border border-emerald-400/40 object-cover object-top sm:h-16 sm:w-16 lg:hidden"
              />
              <span className="block text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
                {profile.name}
              </span>
            </span>
            <span className="mt-4 block text-2xl font-semibold leading-tight text-zinc-300 sm:text-3xl">
              Full Stack <span className="text-emerald-400">&amp;</span> Engenheiro de IA
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
            Produtos web de ponta a ponta, com IA integrada de verdade. Não precisa
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
