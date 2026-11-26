import { useState } from 'react'
import { profile } from '../../data/portfolio'
import { useMotionOk } from '../../hooks/useMotionOk'
import { DotPortrait } from '../effects/DotPortrait'
import profileImage from '/assets/foto-perfil.webp'

export function About() {
  const showDots = useMotionOk(768)
  const [reveal, setReveal] = useState(false)

  return (
    <section
      id="about"
      className="scroll-reveal relative flex min-h-screen items-center border-t border-white/10 bg-black px-5 py-16 lg:py-20"
    >
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto flex min-h-[min(780px,calc(100vh-8rem))] w-full max-w-5xl items-center">
        <div className="grid h-full w-full gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div
            onPointerEnter={(e) => e.pointerType === 'mouse' && setReveal(true)}
            onPointerLeave={() => setReveal(false)}
            className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-lg border border-emerald-400/20 bg-zinc-950 lg:mx-0 lg:aspect-auto lg:min-h-full lg:max-w-none">
            <img
              src={profileImage}
              alt={`Foto de ${profile.name}, ${profile.role.toLowerCase()}`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-top ${
                showDots
                  ? // entrada: pontos se dispersam e a foto surge; saída: a foto se dissolve enquanto o retrato se remonta
                    `transition-opacity ease-in-out ${reveal ? 'opacity-95 duration-[600ms]' : 'opacity-0 duration-[900ms]'}`
                  : 'opacity-95'
              }`}
            />
            {showDots ? (
              <div
                className={`absolute inset-0 transition-opacity ease-in-out ${
                  reveal ? 'opacity-0 duration-[550ms]' : 'opacity-100 duration-[700ms]'
                }`}
              >
                <DotPortrait src={profileImage} alt="" gap={7} scattered={reveal} />
              </div>
            ) : null}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_35%_20%,rgba(52,211,153,0.18),transparent_34%),linear-gradient(180deg,rgba(24,24,27,0),rgba(0,0,0,0.72))]" />
            {showDots ? (
              <span className={`pointer-events-none absolute left-4 top-4 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/70 transition-opacity ${reveal ? 'opacity-0 duration-200' : 'opacity-100 delay-700 duration-500'}`}>
                passe o mouse para ver a foto
              </span>
            ) : null}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-emerald-400/20 bg-black/70 p-5 backdrop-blur-md">
              <p className="text-center text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">
                {profile.name}
              </p>
            </div>
          </div>

          <article className="flex min-h-full flex-col justify-center rounded-lg border border-emerald-400/20 bg-zinc-950/80 p-5 shadow-[0_24px_100px_rgba(0,0,0,0.36)] sm:p-7 lg:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
              Sobre mim
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
              {profile.role}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-400 sm:text-base">
              <p>
                Sou o {profile.name}, tenho 27 anos e trabalho com desenvolvimento
                porque gosto do momento em que uma ideia vira algo que as pessoas
                realmente usam. Atuo nas duas pontas: construo a interface que o
                usuário vê e a API que sustenta ela, sempre buscando código limpo,
                organizado e fácil de evoluir.
              </p>
              <p>
                Como Engenheiro de IA, trabalho o ciclo inteiro de um sistema
                inteligente. Preparo os dados e monto RAG com embeddings e banco
                vetorial para o modelo responder com base em fonte real. Escolho
                entre prompt, RAG ou fine-tuning pelo custo e pela precisão de cada
                caso. Dou ação aos agentes com tool calling, servidores MCP e skills
                reutilizáveis, e fecho com evals, guardrails e observabilidade de
                custo, latência e qualidade. O resultado é IA confiável em produção,
                resolvendo problema real, não enfeite.
              </p>
              <p>
                Já entreguei do site institucional ao sistema com pagamento,
                autenticação e painel administrativo — passando por e-commerce,
                plataforma educacional com IA e aplicação de finanças pessoais. Em
                todos eles, o mesmo cuidado: responsividade de verdade, performance
                e uma experiência que não deixa o usuário na dúvida.
              </p>
              <p>
                Sou curioso, movido por desafio e valorizo trabalho em equipe e troca
                de conhecimento. Estou sempre aprendendo ferramenta nova e procurando
                time onde eu possa contribuir e crescer junto.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
