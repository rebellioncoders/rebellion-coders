import { useState } from 'react';
import {
  BrainCircuit,
  Globe,
  Smartphone,
  ShieldCheck,
  Blocks,
  Cpu,
  BarChart3,
  CloudCog,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Modal from '@/components/Modal';

type Domain = {
  icon: typeof BrainCircuit;
  title: string;
  short: string;
  detail: string[];
};

const DOMAINS: Domain[] = [
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence & Machine Learning',
    short: 'Explore how machines learn from data — models, neural networks and intelligent systems.',
    detail: [
      'AI and ML are transforming every industry. This domain is for members curious about how intelligent systems are built: how models learn from data, how neural networks recognise patterns and how language models understand text.',
      'Members can start with the fundamentals of machine learning, experiment with small models, and gradually work toward practical projects. No prior experience needed — just curiosity and a willingness to learn the maths behind the magic.',
    ],
  },
  {
    icon: Globe,
    title: 'Web Development',
    short: 'Build websites and web applications, from clean frontends to powerful backends.',
    detail: [
      'Web development is the most accessible way to start building. This domain covers everything behind the pages you use every day: modern frontends, backends, APIs and deployment.',
      'Members can learn HTML, CSS and JavaScript, move on to modern frameworks and tooling, and understand how full applications come together. Expect hands-on building from day one.',
    ],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    short: 'Create mobile and cross-platform apps that put software in every pocket.',
    detail: [
      'Mobile apps are how most people experience technology. This domain explores designing, building and shipping applications for phones and cross-platform devices.',
      'Members can learn app UI principles, state and data handling, and what it takes to take an app from an idea to something people can install and use.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    short: 'Understand how systems are attacked and how to defend them, ethically and responsibly.',
    detail: [
      'Security is a mindset before it is a skill set. This domain introduces how systems are attacked in practice and, more importantly, how they are defended.',
      'Members can explore security fundamentals, common vulnerability classes, secure coding habits and responsible, ethical approaches to security research and defence.',
    ],
  },
  {
    icon: Blocks,
    title: 'Blockchain & Web3',
    short: 'Go beyond the hype: distributed ledgers, smart contracts and decentralised apps.',
    detail: [
      'Blockchain is a fascinating mix of cryptography, distributed systems and economics. This domain looks past the hype at how the technology actually works.',
      'Members can learn how blockchains achieve trust, write their first smart contracts and understand the real strengths and limits of decentralised applications.',
    ],
  },
  {
    icon: Cpu,
    title: 'Robotics & IoT',
    short: 'Connect code to the physical world through sensors, devices and automation.',
    detail: [
      'Robotics and IoT are where software meets hardware. This domain is about making code move motors, read sensors and control connected devices.',
      'Members can explore microcontrollers, sensor data, automation projects and the engineering of systems that sense and act in the real world.',
    ],
  },
  {
    icon: BarChart3,
    title: 'Data Science',
    short: 'Turn raw data into insight with analysis, visualisation and statistics.',
    detail: [
      'Data is everywhere; insight is rare. This domain covers how data is collected, cleaned, analysed and turned into stories that drive decisions.',
      'Members can practise with real datasets, learn analytical thinking and visualisation, and understand how data-driven conclusions are made honestly and rigorously.',
    ],
  },
  {
    icon: CloudCog,
    title: 'Cloud Computing & DevOps',
    short: 'Learn how modern software is deployed, scaled and kept running reliably.',
    detail: [
      'Almost every modern application runs in the cloud. This domain explores how code goes from a laptop to a reliable, scalable service — and how teams keep it that way.',
      'Members can learn cloud fundamentals, containers, CI/CD pipelines and the automation-first culture of DevOps that powers real engineering teams.',
    ],
  },
];

export default function Domains() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const domain = openIndex === null ? null : DOMAINS[openIndex];

  return (
    <section id="domains" className="bg-ice-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="Technology Domains"
          title="Explore The Technology Frontier"
          description="Eight learning and exploration areas for members to dive into — each one a starting point for curiosity, not a formal department."
          dark={false}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 4) * 0.07}>
              <article className="group flex h-full flex-col gap-4 rounded-2xl border border-royal-600/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-brand/50 hover:shadow-glow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-brand/25 bg-cyan-brand/10 text-cyan-brand">
                  <d.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display text-[15px] font-bold uppercase leading-[125%] text-slate-900">
                  {d.title}
                </h3>
                <p className="text-sm leading-[150%] text-slate-600">{d.short}</p>
                <button
                  onClick={() => setOpenIndex(i)}
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-royal-700 transition-colors hover:text-cyan-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand"
                >
                  Explore More
                  <ArrowUpRight size={13} aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal
        open={domain !== null}
        onClose={() => setOpenIndex(null)}
        title={domain ? domain.title : ''}
        subtitle="Technology Domain"
      >
        {domain && (
          <div className="flex flex-col gap-4">
            {domain.detail.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        )}
      </Modal>
    </section>
  );
}
