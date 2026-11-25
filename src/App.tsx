import { useEffect } from 'react'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import ClickSpark from './components/reactbits/ClickSpark'

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <ClickSpark sparkColor={['#34d399', '#a7f3d0']} sparkCount={9} sparkRadius={22} duration={450}>
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-emerald-400 focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-emerald-300"
        href="#main"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
    </ClickSpark>
  )
}

export default App
