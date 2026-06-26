import { Button } from './Button'

type ProjectCardProps = {
  title: string
  description: string
  stack: string[]
  repoUrl: string
  liveUrl: string
  imageUrl?: string
  index?: number
}

export function ProjectCard({
  title,
  description,
  stack,
  liveUrl,
  imageUrl,
  index = 0,
}: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0')

  return (
    <article className="group relative h-[500px] overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-[0_26px_100px_rgba(0,0,0,0.45)] transition duration-700 ease-out hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_34px_110px_rgba(0,0,0,0.52)] md:h-[560px]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Imagem do projeto ${title}`}
          className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(39,39,42,0.96),rgba(0,0,0,0.96)),radial-gradient(circle_at_70%_25%,rgba(52,211,153,0.25),transparent_30%)] p-6 transition duration-1000 ease-out group-hover:scale-[1.03]">
          <div className="h-[72%] w-[84%] rounded-lg border border-white/10 bg-black/45 p-5 shadow-2xl">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-10 grid gap-4">
              <span className="h-4 w-2/3 rounded bg-white/20" />
              <span className="h-4 w-5/6 rounded bg-emerald-300/40" />
              <span className="h-4 w-1/2 rounded bg-white/10" />
              <div className="mt-6 grid grid-cols-3 gap-3">
                <span className="h-24 rounded border border-white/10 bg-white/[0.03]" />
                <span className="h-24 rounded border border-emerald-400/20 bg-emerald-400/10" />
                <span className="h-24 rounded border border-white/10 bg-white/[0.03]" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100 transition duration-700 ease-out md:opacity-0 md:group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-0 p-5 transition duration-400 ease-out md:translate-y-6 md:p-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
            Projeto {projectNumber}
          </span>
          <span className="h-px flex-1 bg-emerald-400/30" />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.008] px-6 py-6 shadow-[0_18px_80px_rgba(0,0,0,0.22)] md:backdrop-blur-xs md:px-8 md:py-7">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.025] to-transparent" />
          <h3 className="max-w-3xl text-2xl font-semibold text-white md:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-200 md:text-base md:leading-7">
            {description}
          </p>


          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                className="rounded border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-100"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>

          <Button className="mt-6" href={liveUrl} target="_blank" rel="noreferrer">
            Ver projeto
          </Button>
        </div>
      </div>
    </article>
  )
}
