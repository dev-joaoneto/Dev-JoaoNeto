import type {
  AnchorHTMLAttributes,
  PointerEvent,
  ReactNode,
} from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-emerald-400/90 bg-emerald-400/20 text-black shadow-[0_0_12px_rgba(52,211,153,0.18)] hover:-translate-y-0.5 hover:bg-emerald-300/10',
  secondary:
    'border-white/10 bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-200',
}

export function Button({
  children,
  className = '',
  onPointerMove,
  variant = 'primary',
  ...props
}: ButtonProps) {
  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect()

    event.currentTarget.style.setProperty(
      '--glow-x',
      `${event.clientX - rect.left}px`,
    )
    event.currentTarget.style.setProperty(
      '--glow-y',
      `${event.clientY - rect.top}px`,
    )
    onPointerMove?.(event)
  }

  return (
    <a
      className={`glow-button inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`}
      onPointerMove={handlePointerMove}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}
