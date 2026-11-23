type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = 'mb-10 md:mb-14',
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-zinc-400">{description}</p>
    </div>
  )
}
