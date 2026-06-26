import { useEffect, useState } from 'react'
import { navLinks } from '../../data/portfolio'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 24)

      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      const currentLink = navLinks
        .map((link) => {
          const section = document.querySelector(link.href)

          return section instanceof HTMLElement
            ? { href: link.href, top: section.offsetTop }
            : null
        })
        .filter(Boolean)
        .reverse()
        .find((section) => section && scrollPosition >= section.top)

      if (currentLink) {
        setActiveLink(currentLink.href)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        hasScrolled || isOpen
          ? 'liquid-glass border-b border-white/10 shadow-[0_16px_70px_rgba(0,0,0,0.28)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          className="text-sm font-bold uppercase tracking-[0.22em] text-white"
          href="#home"
        >
          Dev<span className="text-emerald-300">.Fullstack</span>
        </a>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Navegacao principal"
        >
          {navLinks.map((link) => (
            <a
              className={`group relative pb-1 text-sm transition duration-300 ${
                activeLink === link.href
                  ? 'text-emerald-300!'
                  : 'text-zinc-300 hover:text-emerald-300'
              }`}
              href={link.href}
              key={link.href}
              onClick={() => setActiveLink(link.href)}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-px w-full origin-left bg-emerald-300 transition-transform duration-300 ease-out ${
                  activeLink === link.href
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </nav>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white transition hover:border-emerald-400/60 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <span className="text-xl">{isOpen ? 'x' : '='}</span>
        </button>
      </div>

      {isOpen && (
        <nav
          className="border-t border-white/10 px-5 py-4 md:hidden"
          aria-label="Menu mobile"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {navLinks.map((link) => (
              <a
                className={`rounded-md px-2 py-2 text-sm transition ${
                  activeLink === link.href
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-emerald-300'
                }`}
                href={link.href}
                key={link.href}
                onClick={() => {
                  setActiveLink(link.href)
                  setIsOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
