import type { ReactNode } from 'react'
import { aiCourses, availability, education, experience, type Experience } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

const card =
  'rounded-xl border border-white/10 bg-[linear-gradient(180deg,#111113_0%,#0a0a0b_60%,#070708_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
const label = 'font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500'
const pill =
  'rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-emerald-200'

function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((point) => (
        <li key={point} className="relative pl-4 text-[15px] leading-6 text-zinc-400">
          <span className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-emerald-400/70" aria-hidden="true" />
          {point}
        </li>
      ))}
    </ul>
  )
}

function Metric({ value, text }: { value: string; text: string }) {
  return (
    <p className="mt-4 inline-flex items-baseline gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-2">
      <strong className="text-[17px] font-semibold tabular-nums text-white">{value}</strong>
      <span className="text-[13px] text-zinc-400">{text}</span>
    </p>
  )
}

function Role({ item }: { item: Experience }) {
  return (
    <li className="relative">
      {/* ponto na trilha: cheio e pulsando quando é o momento atual */}
      <span
        className={`absolute -left-[27px] top-6 h-[9px] w-[9px] rounded-full border border-emerald-400 ${item.current ? 'bg-emerald-400' : 'bg-black'}`}
        aria-hidden="true"
      >
        {item.current ? <span className="absolute inset-[-1px] rounded-full bg-emerald-400 motion-safe:animate-ping" /> : null}
      </span>

      <article className={`${card} transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/45 motion-reduce:hover:translate-y-0`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] tracking-[0.08em] text-zinc-500 tabular-nums">{item.period}</span>
          {item.current ? <span className={pill}>atual</span> : null}
          {item.badge ? <span className={pill}>{item.badge}</span> : null}
        </div>
        <h3 className="mt-2.5 text-lg font-semibold leading-snug text-white">{item.title}</h3>
        <p className="mt-0.5 text-sm text-emerald-300">{item.org}</p>

        {item.groups?.map((group) => (
          <div key={group.label} className="mt-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200">{group.label}</p>
            <Points items={group.points} />
          </div>
        ))}

        {item.points ? (
          <div className="mt-4">
            <Points items={item.points} />
          </div>
        ) : null}

        {item.steps ? (
          <ol className="ml-[3px] mt-4 border-l border-dashed border-emerald-400/25">
            {item.steps.map((step, i) => (
              <li key={step.role} className="relative grid gap-x-3 gap-y-0.5 py-1.5 pl-4 sm:grid-cols-[8.5rem_1fr]">
                <span
                  className={`absolute -left-1 top-3 h-[7px] w-[7px] rounded-full border border-emerald-400/70 ${i === item.steps!.length - 1 ? 'bg-emerald-400' : 'bg-black'}`}
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] leading-5 text-zinc-500 tabular-nums">{step.period}</span>
                <span className="text-[15px] leading-6 text-zinc-300">
                  {step.role} <span className="text-sm text-zinc-500">· {step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        ) : null}

        {item.metric ? <Metric value={item.metric.value} text={item.metric.label} /> : null}

        {item.tags ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-zinc-300">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </li>
  )
}

function SideCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={card}>
      <p className={`${label} mb-4`}>{title}</p>
      {children}
    </div>
  )
}

export function Journey() {
  return (
    <section id="journey" className="relative border-t border-white/10 bg-zinc-950 px-5 py-20 md:py-24">
      <div className="scroll-reveal mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Trajetória"
          title="Da fibra óptica ao código"
          description="Antes de programar, eu liderava a operação técnica de provedores de internet. Trouxe de lá gestão de equipe, cliente real do outro lado e responsabilidade por resultado. Hoje aplico isso construindo produtos web e sistemas com IA."
        />

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          <div className="min-w-0">
            <p className={`${label} mb-4`}>Experiência</p>
            <div className="relative pl-7">
              {/* trilha com o mesmo pulso verde do rodapé */}
              <span className="absolute bottom-2 left-[5px] top-2 w-px overflow-hidden bg-white/10" aria-hidden="true">
                <span className="absolute left-0 top-[-30%] h-[30%] w-px bg-[linear-gradient(180deg,transparent,#34d399,transparent)] motion-safe:animate-[signal-drop_5s_cubic-bezier(.6,0,.4,1)_infinite] motion-reduce:top-[35%]" />
              </span>
              <ol className="space-y-5">
                {experience.map((item) => (
                  <Role key={item.title} item={item} />
                ))}
              </ol>
            </div>
          </div>

          <aside className="grid min-w-0 content-start gap-5 lg:pt-[26px]">
            <SideCard title="Formação">
              <ul className="divide-y divide-white/10">
                {education.map((item) => (
                  <li key={item.course} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <span>
                      <span className="block text-[15px] font-medium leading-snug text-white">{item.course}</span>
                      <span className="text-[13px] text-zinc-500">{item.school}</span>
                    </span>
                    <span className="font-mono text-[11px] text-emerald-300 tabular-nums">{item.year}</span>
                  </li>
                ))}
              </ul>
            </SideCard>

            <SideCard title="Cursos de IA · 2025">
              <ul className="flex flex-wrap gap-1.5">
                {aiCourses.map((course) => (
                  <li key={course.name} className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-zinc-300">
                    <span className="text-emerald-300">{course.school}</span> · {course.name}
                  </li>
                ))}
              </ul>
            </SideCard>

            <SideCard title="Idiomas e disponibilidade">
              <dl className="space-y-3">
                {availability.map((item) => (
                  <div key={item.label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-3">
                    <dt className={`${label} leading-6`}>{item.label}</dt>
                    <dd className="text-[15px] leading-6 text-zinc-300">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </SideCard>
          </aside>
        </div>
      </div>
    </section>
  )
}
