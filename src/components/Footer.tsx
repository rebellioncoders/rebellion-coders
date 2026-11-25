import { Github, Linkedin, MessageCircle } from 'lucide-react';
import LogoRc from '@/components/LogoRc';
import { GITHUB_URL, ORGANIZATION_LINKEDIN_URL, WHATSAPP_URL } from '@/lib/brand';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Community', href: '#community' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#events' },
  { label: 'Founder', href: '#founder' },
  { label: 'Join Us', href: '#join' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'LinkedIn', href: ORGANIZATION_LINKEDIN_URL, icon: Linkedin },
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: MessageCircle },
  { label: 'GitHub', href: GITHUB_URL, icon: Github },
];

export default function Footer() {
  return (
    <footer className="border-t border-royal-600/20 bg-ice-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-start gap-5">
            <a
              href="#home"
              className="flex items-center gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand"
              aria-label="Rebellion Coders — back to top"
            >
              <span className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm sm:h-32 sm:w-32">
                <LogoRc className="h-full w-full" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold uppercase tracking-wide text-slate-900">
                  Rebellion Coders
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-brand">
                  Official Community
                </span>
              </span>
            </a>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-cyan-soft">
              Think. Code. Innovate. Rebel.
            </p>
            <p className="max-w-xs text-sm leading-[150%] text-slate-600">
              An independent student-led technology community bringing together curious minds across
              India to learn, collaborate, experiment and innovate.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:justify-self-center">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5 md:justify-self-end">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
              Official Channels
            </h3>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-royal-600/20 bg-white text-royal-700 transition hover:border-cyan-brand/50">
                      <social.icon size={16} aria-hidden="true" />
                    </span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-royal-600/20 pt-8 text-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Rebellion Coders. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-600">
            Independent Student-Led Technology Community
          </p>
        </div>
      </div>
    </footer>
  );
}
