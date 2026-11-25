import { MessageCircle, Users, Compass, Handshake, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { WHATSAPP_URL } from '@/lib/brand';

const VALUES = [
  {
    icon: Users,
    title: '50+ Members',
    description: 'A growing group of students and developers learning side by side.',
  },
  {
    icon: Compass,
    title: 'Student-Led & Independent',
    description: 'Run by students, for students — no corporate strings attached.',
  },
  {
    icon: Handshake,
    title: 'Collaboration First',
    description: 'Knowledge sharing and learning together over competition.',
  },
  {
    icon: Lightbulb,
    title: 'Exploration Always',
    description: 'Connecting curious minds across India to explore technology.',
  },
];

export default function Community() {
  return (
    <section id="community" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-circuit bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-royal-600/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="Community"
          title="More Than A Community. A Place To Build."
          description="Rebellion Coders is a home for curious minds — a place to learn together, share knowledge and explore technology with people who love it as much as you do."
          dark={false}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-royal-600/20 bg-ice-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-brand/50">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-brand/25 bg-cyan-brand/10 text-cyan-brand">
                  <value.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-sm font-bold uppercase leading-[125%] text-slate-900">
                  {value.title}
                </h3>
                <p className="text-sm leading-[150%] text-slate-600">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-cyan-brand/25 bg-gradient-to-r from-ice-100 via-white to-cyan-brand/10 p-8 text-center sm:p-12">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-royal-700">
              Your Seat Is Waiting
            </span>
            <p className="max-w-2xl font-display text-xl font-bold uppercase leading-[125%] text-slate-900 sm:text-2xl">
              Ready to build with us?
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Join Our WhatsApp Community
            </a>
            <p className="max-w-xl text-sm leading-[150%] text-slate-600">
              Our official community lives on WhatsApp — that is where members connect, share and
              build together.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
