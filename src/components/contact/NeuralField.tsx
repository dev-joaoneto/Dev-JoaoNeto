import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; glow: number }
type Pulse = { from: number; to: number; t: number; hops: number }

/**
 * rede neural discreta de fundo: nós derivam devagar e, a cada sinal (tecla digitada),
 * um pulso percorre as conexões acendendo os nós por onde passa.
 */
export function NeuralField({ signal, className = '' }: { signal: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireRef = useRef<(n: number) => void>(() => {})

  useEffect(() => {
    fireRef.current(signal)
  }, [signal])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio, 2)
    let width = 0
    let height = 0
    let nodes: Node[] = []
    let edges: number[][] = []
    const pulses: Pulse[] = []
    let raf = 0
    let visible = false
    let last = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, Math.max(28, (width * height) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        glow: 0,
      }))
      // a rede mudou de tamanho: pulsos antigos apontariam para nós que não existem mais
      pulses.length = 0
      link()
    }

    // cada nó liga aos 3 vizinhos mais próximos
    const link = () => {
      edges = nodes.map((a, i) =>
        nodes
          .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
          .filter((o) => o.j !== i)
          .sort((p, q) => p.d - q.d)
          .slice(0, 3)
          .map((o) => o.j),
      )
    }

    const draw = (now: number) => {
      raf = 0
      const dt = Math.min(0.05, (now - (last || now)) / 1000)
      last = now
      ctx.clearRect(0, 0, width, height)

      if (!calm) {
        for (const n of nodes) {
          n.x += n.vx * dt
          n.y += n.vy * dt
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
          n.glow = Math.max(0, n.glow - dt * 1.4)
        }
      }

      ctx.lineWidth = 1
      edges.forEach((list, i) => {
        const a = nodes[i]
        for (const j of list) {
          if (j < i && edges[j].includes(i)) continue
          const b = nodes[j]
          const heat = Math.max(a.glow, b.glow)
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.11 + heat * 0.4})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      })

      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]
        p.t += dt * 2.6
        const a = nodes[p.from]
        const b = nodes[p.to]
        if (!a || !b) {
          pulses.splice(k, 1)
          continue
        }
        if (p.t >= 1) {
          b.glow = 1
          pulses.splice(k, 1)
          if (p.hops > 0) {
            const next = edges[p.to][Math.floor(Math.random() * edges[p.to].length)]
            pulses.push({ from: p.to, to: next, t: 0, hops: p.hops - 1 })
          }
          continue
        }
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10)
        g.addColorStop(0, 'rgba(167, 243, 208, 0.95)')
        g.addColorStop(1, 'rgba(52, 211, 153, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(110, 231, 183, ${0.35 + n.glow * 0.6})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.4 + n.glow * 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!calm && visible) raf = requestAnimationFrame(draw)
    }

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const linkTimer = window.setInterval(() => {
      if (visible && !calm) link()
    }, 4000)

    fireRef.current = (n: number) => {
      if (!n || calm || !nodes.length) return
      if (pulses.length > 24) return
      const from = Math.floor(Math.random() * nodes.length)
      nodes[from].glow = 1
      pulses.push({ from, to: edges[from][0], t: 0, hops: 4 })
      wake()
    }

    const ro = new ResizeObserver(() => {
      build()
      wake()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.clearInterval(linkTimer)
      ro.disconnect()
      io.disconnect()
      fireRef.current = () => {}
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />
}
