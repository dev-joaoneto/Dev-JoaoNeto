import { Button } from '../ui/Button'
import WhatsAppIcon from '../ui/WhatsAppIcon'

export function Hero() {
  return (
    <section
      id="home"
      className="scroll-reveal relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-24 sm:pt-28 lg:pt-22"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_20%,rgba(52,211,153,0.10),transparent_30%),radial-gradient(circle_at_82%_60%,rgba(52,211,153,0.06),transparent_28%),linear-gradient(180deg,#050505_0%,#09090b_52%,#050505_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>

          <h1 className="mt-2 max-w-4xl text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            Desenvolvedor <span className='text-emerald-400'>Fullstack</span> construindo aplicações web com foco em qualidade, performance e experiência do usuário
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            Construo experiências digitais modernas, responsivas e bem estruturadas, unindo atenção ao design, organização de código e foco em performance para criar produtos claros, funcionais e escaláveis.          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#projects">Ver projetos</Button>
            <Button href="https://contate.me/5561986366632" variant="secondary" target="_blank" rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                Entrar em contato <WhatsAppIcon />
              </div>
            </Button>
            <Button href="/docs/JoaoNeto-cv.pdf" download
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Currículo
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end hidden md:block">
          <div className="relative flex h-full w-full max-w-[600px] items-center justify-center overflow-hidden ">

            <svg
              className="relative z-10 h-[58%] w-[88%] drop-shadow-[0_0_15px_rgba(52,211,153,0.18)]"
              viewBox="0 0 420 220"
              fill="none"
              role="img"
              aria-label="Simbolo de codigo"
            >
              <path
                d="M142 42L48 110L142 178"
                stroke="url(#codeStroke)"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M278 42L372 110L278 178"
                stroke="url(#codeStroke)"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M236 28L184 192"
                stroke="url(#slashStroke)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="codeStroke"
                  x1="48"
                  x2="372"
                  y1="42"
                  y2="178"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#34d399" />
                  <stop offset="1" stopColor="#a7f3d0" />
                </linearGradient>
                <linearGradient
                  id="slashStroke"
                  x1="184"
                  x2="236"
                  y1="192"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#d4d4d8" />
                  <stop offset="1" stopColor="#6ee7b7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
