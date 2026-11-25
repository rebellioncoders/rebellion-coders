import { CalendarClock, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { WHATSAPP_URL } from '@/lib/brand';

export default function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="Events"
          title="Connect. Learn. Collaborate."
          description="Sessions, meetups and hands-on gatherings for the community. Announcements go out through our official WhatsApp group first."
          dark={false}
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-royal-600/15 bg-ice-100 p-10 text-center shadow-sm sm:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-brand/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-royal-600/10 blur-[100px]"
            />
            <div className="relative flex flex-col items-center gap-5">
              <span className="animate-pulse-ring flex h-16 w-16 items-center justify-center rounded-full border border-cyan-brand/30 bg-cyan-brand/10 text-cyan-brand">
                <CalendarClock size={26} aria-hidden="true" />
              </span>
              <h3 className="max-w-xl font-display text-xl font-bold uppercase leading-[125%] text-navy-900 sm:text-2xl">
                Something exciting is being planned. Stay connected with Rebellion Coders.
              </h3>
              <p className="max-w-lg text-[15px] leading-[150%] text-slate-600">
                We haven't confirmed any event dates yet. Joining the community is the best way to
                hear about sessions and meetups as soon as they're announced.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Join Community
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
