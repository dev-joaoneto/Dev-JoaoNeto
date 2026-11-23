import { useEffect, useRef } from 'react'

type DotPortraitProps = {
  src: string
  alt: string
  gap?: number
  className?: string
}

type Dot = { x: number; y: number; r: number; lum: number; sx: number; sy: number; ox: number; oy: number }

// DGX:ANCHOR: dot-portrait
export function DotPortrait({ src, alt, gap = 6, className = '' }: DotPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const image = new Image()
    image.src = src

    let dots: Dot[] = []
    let raf = 0
    let start = 0
    let started = false
    let alive = true
    const pointer = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio, 2)

    function build() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (!width || !height || !image.naturalWidth) return
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // cobre a área como object-cover, ancorado no topo
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const dw = image.naturalWidth * scale
      const dh = image.naturalHeight * scale
      const off = document.createElement('canvas')
      const cols = Math.ceil(width / gap)
      const rows = Math.ceil(height / gap)
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d', { willReadFrequently: true })!
      octx.drawImage(image, (width - dw) / 2 / gap, 0, dw / gap, dh / gap)
      const data = octx.getImageData(0, 0, cols, rows).data

      dots = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
          if (lum < 0.07) continue
          const px = x * gap + gap / 2
          const py = y * gap + gap / 2
          dots.push({
            x: px,
            y: py,
            r: Math.max(0.5, lum * gap * 0.55),
            lum,
            sx: px + (Math.random() - 0.5) * width * 0.9,
            sy: py + (Math.random() - 0.5) * height * 0.9,
            ox: 0,
            oy: 0,
          })
        }
      }
    }

    function draw(now: number) {
      if (!alive) return
      if (!start) start = now
      const t = reduced ? 1 : Math.min(1, (now - start) / 1600)
      const ease = 1 - Math.pow(1 - t, 3)
      ctx!.clearRect(0, 0, width, height)
      let moving = t < 1

      for (const d of dots) {
        const bx = d.sx + (d.x - d.sx) * ease
        const by = d.sy + (d.y - d.sy) * ease
        if (!reduced) {
          const dx = bx - pointer.x
          const dy = by - pointer.y
          const dist = Math.hypot(dx, dy)
          const push = dist < 70 ? (1 - dist / 70) * 14 : 0
          const tx = dist ? (dx / dist) * push : 0
          const ty = dist ? (dy / dist) * push : 0
          d.ox += (tx - d.ox) * 0.15
          d.oy += (ty - d.oy) * 0.15
          if (Math.abs(d.ox) + Math.abs(d.oy) > 0.05) moving = true
        }
        const bright = d.lum > 0.55
        ctx!.fillStyle = bright
          ? `rgba(167, 243, 208, ${0.55 + d.lum * 0.45})`
          : `rgba(52, 211, 153, ${0.25 + d.lum * 0.7})`
        ctx!.beginPath()
        ctx!.arc(bx + d.ox, by + d.oy, d.r, 0, Math.PI * 2)
        ctx!.fill()
      }

      raf = moving ? requestAnimationFrame(draw) : 0
    }

    function wake() {
      if (!raf && started) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started && dots.length) {
        started = true
        wake()
      }
    }, { threshold: 0.2 })

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      wake()
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
      wake()
    }

    const ro = new ResizeObserver(() => {
      build()
      if (started) {
        start = performance.now() - 1600
        wake()
      }
    })

    image.onload = () => {
      build()
      io.observe(canvas)
      ro.observe(canvas)
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [src, gap])

  return <canvas ref={canvasRef} role="img" aria-label={alt} className={`block h-full w-full ${className}`} />
}
