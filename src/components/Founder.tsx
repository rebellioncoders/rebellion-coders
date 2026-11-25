import { Linkedin, UserRound } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { LINKEDIN_URL } from '@/lib/brand';

export default function Founder() {
  return (
    <section id="founder" className="bg-ice-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="Founder"
          title="The Mind Behind The Rebellion"
          description="Every community starts with someone willing to take the first step."
          dark={false}
        />

        <Reveal className="mt-14">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-3xl border border-royal-600/20 bg-white p-8 text-center shadow-card sm:p-12 md:flex-row md:items-stretch md:text-left">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-brand/60 to-transparent"
            />

            <div className="flex w-full max-w-[240px] shrink-0 flex-col items-center gap-4 md:w-auto">
              <div className="relative flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden rounded-2xl border border-cyan-brand/25 bg-gradient-to-br from-ice-100 via-white to-cyan-brand/15">
                <UserRound
                  className="text-royal-400"
                  size={72}
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <span className="absolute bottom-3 rounded-full border border-cyan-brand/30 bg-white/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-royal-700">
                  Photo coming soon
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5 md:items-start">
              <div>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-cyan-brand">
                  Founder — Rebellion Coders
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-[120%] text-slate-900 sm:text-3xl">
                  Devansh Bhardwaj
                </h3>
              </div>
              <p className="max-w-xl text-[15px] leading-[150%] text-slate-600">
                Devansh Bhardwaj founded Rebellion Coders to bring curious student minds together
                under one banner — a community where learning happens through collaboration,
                experimentation and the shared ambition to build what's next.
              </p>
              <p className="max-w-xl text-[15px] leading-[150%] text-slate-600">
                His vision is simple: give students across India a place to explore technology
                fearlessly, support each other genuinely, and grow into builders.
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-2"
              >
                <Linkedin size={16} aria-hidden="true" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
