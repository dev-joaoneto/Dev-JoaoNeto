import { profile, socialLinks } from '../../data/portfolio'
import Magnet from '../reactbits/Magnet'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import WhatsAppIcon from '../ui/WhatsAppIcon'

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-reveal relative border-t border-white/10 bg-zinc-950 px-5 py-28 md:min-h-[620px] md:py-36"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 text-center">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar sobre uma oportunidade?"
          description="Estou aberto a vagas, freelas e desafios reais em desenvolvimento full stack e IA — e a times onde eu possa contribuir e seguir evoluindo. Respondo mais rápido pelo WhatsApp."
          className="mb-0"
        />

        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Magnet padding={50} magnetStrength={3} wrapperClassName="block sm:inline-block" innerClassName="flex">
            <Button
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar com João Neto pelo WhatsApp"
              className="w-full"
            >
              <span className="flex items-center gap-2">
                WhatsApp
                <WhatsAppIcon />
              </span>
            </Button>
          </Magnet>

          {socialLinks.map((link) => (
            <Magnet key={link.label} padding={40} magnetStrength={4} wrapperClassName="block sm:inline-block" innerClassName="flex">
              <Button
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className={`w-full ${link.className}`}
              >
                {link.label}
              </Button>
            </Magnet>
          ))}

          <Button
            href={profile.resumeUrl}
            download
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Currículo
          </Button>
        </div>
      </div>
    </section>
  )
}
