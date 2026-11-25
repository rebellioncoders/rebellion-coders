import { Github, FolderGit2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { GITHUB_URL } from '@/lib/brand';

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-ice-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="Projects"
          title="Ideas Into Innovation"
          description="Our members are turning curiosity into projects. This is where the community's work will be showcased."
          dark={false}
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-royal-600/15 bg-white p-10 text-center shadow-sm sm:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-brand/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-brand/15 blur-[100px]"
            />
            <div className="relative flex flex-col items-center gap-5">
              <span className="animate-pulse-ring flex h-16 w-16 items-center justify-center rounded-full border border-cyan-brand/30 bg-cyan-brand/10 text-cyan-brand">
                <FolderGit2 size={26} aria-hidden="true" />
              </span>
              <h3 className="max-w-xl font-display text-xl font-bold uppercase leading-[125%] text-navy-900 sm:text-2xl">
                Projects are taking shape. Be part of what we build next.
              </h3>
              <p className="max-w-lg text-[15px] leading-[150%] text-slate-600">
                We haven't published completed project details yet. The first builds are in motion —
                follow the organisation on GitHub to see them the moment they land.
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
              >
                <Github size={16} aria-hidden="true" />
                Explore Our GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
