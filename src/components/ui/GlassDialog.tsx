import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type GlassDialogProps = {
  /** rótulo estilo endereço no topo, ex.: skills://ia */
  scheme: string
  path: string
  labelledBy: string
  onClose: () => void
  /** faixa opcional logo abaixo do topo (abas, por exemplo) */
  toolbar?: ReactNode
  children: ReactNode
}

// painel de vidro: portal no body (seções com transform prenderiam o fixed),
// Esc e clique fora fecham, foco vai para o botão de fechar, rolagem da página travada
export function GlassDialog({ scheme, path, labelledBy, onClose, toolbar, children }: GlassDialogProps) {
  const [shown, setShown] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true))
    closeRef.current?.focus()
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      root.style.overflow = previous
    }
  }, [])

  const close = useCallback(() => {
    setShown(false)
    window.setTimeout(onClose, 220)
  }, [onClose])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return createPortal(
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/55 transition-opacity duration-200 motion-reduce:transition-none sm:items-center sm:p-6 ${shown ? 'opacity-100' : 'opacity-0'}`}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-white/12 bg-[#0a0a0b]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_80px_rgba(52,211,153,0.10)] backdrop-blur-2xl backdrop-saturate-150 transition duration-300 ease-out motion-reduce:transition-none sm:rounded-2xl ${
          shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="truncate text-zinc-500">
            {scheme}://<span className="text-white">{path}</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-zinc-400 transition hover:border-emerald-400/60 hover:text-emerald-200"
          >
            esc · fechar
          </button>
        </div>
        {toolbar}
        <div className="overflow-y-auto px-5 pb-6 pt-5 sm:px-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
