import { socialLinks } from '../../data/portfolio'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import WhatsAppIcon from '../ui/WhatsAppIcon'

export function Contact() {
  return (
    <section id="contact" className="scroll-reveal md:min-h-[620px] border-t border-white/10 bg-zinc-950 px-5 py-38">
      <div className="mx-auto max-w-4xl text-center flex flex-col gap-6 items-center justify-center">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar sobre uma oportunidade?"
          description="Estou aberto a vagas, desafios reais e times onde eu possa contribuir para constante evolução."
        />

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="https://contate.me/5561986366632"
          target="_blank"
          rel="noreferrer"
          >
          <div className="flex items-center gap-2 text-green-500">
            WhatsApp 
            <WhatsAppIcon />
          </div>
          </Button>
          {socialLinks.map((link) => (
            <Button href={link.href} key={link.label} 
            target="_blank" 
            rel="noreferrer" 
            variant="secondary" 
            className={`${link.className}`}>
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
