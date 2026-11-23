import { useEffect, useState } from 'react'
import { useMotionOk } from '../../hooks/useMotionOk'

type RotatingWordsProps = {
  words: string[]
  interval?: number
  className?: string
}

export function RotatingWords({ words, interval = 2600, className = '' }: RotatingWordsProps) {
  const motionOk = useMotionOk()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!motionOk) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [motionOk, interval, words.length])

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className={`relative inline-grid align-bottom ${className}`}>
      <span className="sr-only">{words.join(', ')}</span>
      {/* reserva a largura da palavra mais longa para o layout não pular */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === index
              ? 'translate-y-0 opacity-100 blur-0'
              : i === (index - 1 + words.length) % words.length
                ? '-translate-y-3 opacity-0 blur-sm'
                : 'translate-y-3 opacity-0 blur-sm'
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
