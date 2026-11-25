import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]=+*#%'

/** texto que chega como sinal: os caracteres se decodificam da esquerda para a direita quando entram na tela */
export function DecodeText({ text, duration = 1100, className = '' }: { text: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let done = false
    const scramble = (progress: number) =>
      text
        .split('')
        .map((char, i) => {
          if (char === ' ' || i / text.length < progress) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')

    setShown(scramble(0))
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return
        done = true
        io.disconnect()
        const start = performance.now()
        let lastSwap = 0
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          // troca de glifo a cada ~45 ms para não virar ruído
          if (now - lastSwap > 45 || p === 1) {
            lastSwap = now
            setShown(p === 1 ? text : scramble(p))
          }
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
