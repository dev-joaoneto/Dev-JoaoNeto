import profileImage from '/assets/foto-perfil.png'

export function About() {
  return (
    <section
      id="about"
      className="scroll-reveal flex min-h-screen items-center border-t border-white/10 bg-black px-5 py-16 lg:py-20"
    >
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto flex min-h-[min(780px,calc(100vh-8rem))] w-full max-w-5xl items-center">
        <div className="grid h-full w-full gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-emerald-400/20 bg-zinc-950 lg:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(52,211,153,0.22),transparent_34%),linear-gradient(180deg,rgba(24,24,27,0),rgba(0,0,0,0.72))]" />
            <img
              src={profileImage}
              alt="Foto de perfil do desenvolvedor"
              className="h-full w-full object-cover opacity-95"
            />
            <div className="absolute bottom-0 left-0 right-0 border-t border-emerald-400/20 bg-black/70 p-5 backdrop-blur-md">
              <p className="text-md text-center font-bold uppercase tracking-[0.24em] text-emerald-600">
                João Neto
              </p>
            </div>
          </div>

          <article className="flex min-h-full flex-col justify-center rounded-lg border border-emerald-400/20 bg-zinc-950/80 p-5 shadow-[0_24px_100px_rgba(0,0,0,0.36)] sm:p-7 lg:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
              Sobre mim
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
              Desenvolvedor Full Stack
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-400 sm:text-base">
              <p>
                Olá! Meu nome é João Neto, tenho 27 anos. Desenvolvedor Full Stack, apaixonado por tecnologia e pelo poder que o desenvolvimento tem de transformar ideias em soluções reais. Meu objetivo é evoluir constantemente como profissional, aprimorando tanto a parte técnica quanto a capacidade de entender as necessidades dos usuários e das empresas. Busco sempre escrever códigos limpos, organizados e eficientes, além de valorizar o trabalho em equipe e a troca de conhecimento.
              </p>
              <p>
                Sou uma pessoa comprometida, curiosa e motivada por desafios. Gosto de aprender novas ferramentas, participar de projetos práticos e ver o resultado do meu trabalho ganhando vida na tela. Atualmente, foco em desenvolver projetos próprios e contribuir com soluções que unam tecnologia, design e funcionalidade, construindo uma base sólida para crescer na área e gerar impacto positivo no mercado.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
