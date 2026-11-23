import { lazy, Suspense } from 'react'
import { profile, projects } from '../../data/portfolio'
import { useMotionOk } from '../../hooks/useMotionOk'
import { RotatingWords } from '../effects/RotatingWords'
import TechText from '../reactbits/TechText'
import Magnet from '../reactbits/Magnet'
import { Button } from '../ui/Button'
import WhatsAppIcon from '../ui/WhatsAppIcon'

// three.js só é baixado em desktop com movimento liberado
const NeuralBrain = lazy(() => import('../effects/NeuralBrain'))

const highlights = [
  { value: `${projects.length}`, label: 'projetos publicados' },
  { value: 'Full Stack', label: 'React · Node.js · TypeScript' },
  { value: 'IA', label: 'LLMs, agentes e automação' },
]

const rotating = [
  'produtos com IA integrada',
  'agentes que resolvem tarefas',
  'APIs rápidas e organizadas',
  'interfaces de alto nível',
]

export function Hero() {
  const showBrain = useMotionOk(1024)
  const showTechText = useMotionOk(640)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-24 sm:pt-28 lg:pt-22"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_20%,rgba(52,211,153,0.10),transparent_30%),radial-gradient(circle_at_78%_50%,rgba(52,211,153,0.08),transparent_34%),linear-gradient(180deg,#050505_0%,#09090b_52%,#050505_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponível para novas oportunidades
          </span>

          {showTechText ? (
            <div className="mt-6 h-[88px] w-full max-w-[620px] text-white sm:h-[104px] lg:h-[116px]">
              <TechText
                text="JOÃO NETO"
                fontFamily="Inter, 'Segoe UI', ui-sans-serif, system-ui, sans-serif"
                fontWeight={800}
                color="#ffffff"
                accentColor="#34d399"
                align="left"
                intro="assemble"
                introDuration={1.4}
                specks={0}
                labels={false}
                guides={false}
              />
            </div>
          ) : (
            <p className="mt-6 text-5xl font-extrabold tracking-tight text-white" aria-hidden="true">
              JOÃO NETO
            </p>
          )}

          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Desenvolvedor <span className="text-emerald-400">Full Stack</span> e{' '}
            <span className="text-emerald-400">Engenheiro de IA</span>.
          </h1>

          <p className="mt-5 text-lg font-medium text-zinc-300 sm:text-xl">
            Construo <br className="sm:hidden" />
            <RotatingWords words={rotating} className="text-emerald-300" />
          </p>

          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
            Olá, eu sou o {profile.name}. Interfaces responsivas, APIs bem estruturadas
            e modelos de linguagem, agentes e automações integrados ao produto — com
            código organizado e foco em performance, do primeiro componente até o deploy.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnet padding={40} magnetStrength={4} wrapperClassName="block sm:inline-block" innerClassName="flex">
              <Button href="#projects" className="w-full">
                Ver projetos
              </Button>
            </Magnet>
            <Magnet padding={40} magnetStrength={4} wrapperClassName="block sm:inline-block" innerClassName="flex">
              <Button
                href={profile.whatsappUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <span className="flex items-center gap-2">
                  Entrar em contato <WhatsAppIcon />
                </span>
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
                Currículo
              </Button>
            </Magnet>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {highlights.map((item) => (
              <div key={item.value}>
                <dt className="text-xl font-semibold text-white sm:text-2xl">{item.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden h-[620px] lg:block" aria-hidden="true">
          <div className="absolute inset-[-10%]">
            {showBrain ? (
              <Suspense fallback={null}>
                <NeuralBrain />
              </Suspense>
            ) : null}
          </div>
          <span className="pointer-events-none absolute bottom-10 right-6 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-300/50">
            neural.net · online
          </span>
        </div>
      </div>
    </section>
  )
}
