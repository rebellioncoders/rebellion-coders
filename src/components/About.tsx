import { useState } from 'react';
import { Users, Lightbulb, FlaskConical, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Modal from '@/components/Modal';

const PILLARS = [
  {
    icon: Users,
    title: 'Learning Through Collaboration',
    description:
      'Members learn from each other by working together, sharing what they know and exploring side by side.',
    detail:
      'Rebellion Coders exists so no student has to learn alone. Members swap notes, pair up on problems, review each other\u2019s work and grow through open, honest collaboration across the community.',
  },
  {
    icon: Lightbulb,
    title: 'Exploring Modern Technologies',
    description:
      'From AI to the cloud, members follow curiosity into the technologies shaping the future.',
    detail:
      'The community is a space to explore modern technology domains — to ask questions, experiment with new tools and stay curious about where technology is heading next.',
  },
  {
    icon: FlaskConical,
    title: 'Practical Experimentation',
    description:
      'Ideas are meant to be built. Members test concepts hands-on and learn by doing.',
    detail:
      'Rather than stopping at theory, Rebellion Coders encourages members to try things out: build small experiments, break them, fix them and come away with real, practical understanding.',
  },
  {
    icon: ArrowUpRight,
    title: 'Building Skills Together',
    description:
      'A community where students connect, create opportunities and grow into confident builders.',
    detail:
      'By learning and building together, members create opportunities for one another — connections, confidence and skills that carry into their studies, projects and careers.',
  },
] as const;

function PillarModal({
  index,
  onClose,
}: {
  index: number | null;
  onClose: () => void;
}) {
  const pillar = index === null ? null : PILLARS[index];
  return (
    <Modal
      open={pillar !== null}
      onClose={onClose}
      title={pillar ? pillar.title : ''}
      subtitle="About Rebellion Coders"
    >
      {pillar && <p>{pillar.detail}</p>}
    </Modal>
  );
}

export default function About() {
  const [openPillar, setOpenPillar] = useState<number | null>(null);

  return (
    <section id="about" className="bg-ice-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="About Us"
          title="About Rebellion Coders"
          description="An independent, student-led technology community built on curiosity, collaboration and the courage to try new things."
          dark={false}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-royal-600/20 bg-white p-8 text-slate-900 shadow-card">
              <div>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-cyan-brand">
                  Who We Are
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-[120%]">
                  A community of curious minds across India
                </h3>
                <p className="mt-4 text-[15px] leading-[150%] text-slate-600">
                  Rebellion Coders brings together students, developers and technology enthusiasts
                  who want more than classroom learning. We exist to give curious minds a place to
                  explore technology, experiment with ideas and build real skills — together.
                </p>
                <p className="mt-4 text-[15px] leading-[150%] text-slate-600">
                  No gatekeeping, no pretence. Just students helping students learn, build and grow.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-brand">
                Think. Code. Innovate. Rebel.
              </span>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col gap-4 rounded-2xl border border-royal-600/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-brand/50 hover:shadow-glow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ice-100 text-royal-600 transition-colors duration-300 group-hover:bg-royal-600 group-hover:text-slate-900">
                    <pillar.icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold uppercase leading-[120%] text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-[150%] text-slate-600">{pillar.description}</p>
                  <button
                    onClick={() => setOpenPillar(i)}
                    className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-royal-700 transition-colors hover:text-cyan-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600"
                  >
                    Learn More
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <PillarModal index={openPillar} onClose={() => setOpenPillar(null)} />
    </section>
  );
}
