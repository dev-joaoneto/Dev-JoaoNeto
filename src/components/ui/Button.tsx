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
    'border-emerald-500/60 bg-emerald-700 text-white! shadow-[0_0_18px_rgba(4,120,87,0.35)] hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-800',
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
