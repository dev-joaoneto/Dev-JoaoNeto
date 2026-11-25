import { useEffect, useRef, useState } from 'react'

/**
 * título sempre legível: o texto real aparece desde o primeiro quadro e, quando entra na tela,
 * um brilho verde passa uma vez pelas letras, como um sinal sendo recebido.
 */
export function DecodeText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [sweep, setSweep] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setSweep(true)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`${className} ${
        sweep
          ? 'bg-[linear-gradient(100deg,#fff_0%,#fff_40%,#6ee7b7_50%,#fff_60%,#fff_100%)] bg-[length:300%_100%] bg-clip-text text-transparent animate-[signal-sweep_1.4s_ease-out_forwards]'
          : ''
      }`}
    >
      {text}
    </span>
  )
}
