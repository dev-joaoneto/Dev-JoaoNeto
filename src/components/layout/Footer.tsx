import { profile, socialLinks } from '../../data/portfolio'
import { useMotionOk } from '../../hooks/useMotionOk'
import TextPressure from '../reactbits/TextPressure'

export function Footer() {
  const motionOk = useMotionOk()

  return (
    <footer className="liquid-glass border-t border-white/10 px-5 pt-14 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-[90px] select-none sm:h-[140px] lg:h-[190px]" aria-hidden="true">
          {motionOk ? (
            <TextPressure
              text="VAMOS CONSTRUIR"
              textColor="#ffffff"
              pressureColor="#34d399"
              minFontSize={32}
              idle="none"
            />
          ) : (
            <p className="text-center text-5xl font-black tracking-tight text-white sm:text-7xl">
              VAMOS CONSTRUIR
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. {profile.role}.
          </p>

          <nav aria-label="Redes sociais">
            <ul className="flex items-center gap-5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="transition hover:text-emerald-300"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
