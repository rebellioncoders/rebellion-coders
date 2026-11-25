import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LogoRc from '@/components/LogoRc';
import { WHATSAPP_URL } from '@/lib/brand';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Community', href: '#community' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#events' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const offset = 130;
      let current = 'home';
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top <= offset) {
          current = link.href.slice(1);
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const selectLink = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 transition-all duration-300 sm:top-4 ${
        scrolled ? 'px-3 sm:px-6' : 'px-4 sm:px-8'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-cyan-brand/25 bg-white/95 shadow-card backdrop-blur-xl'
            : 'border-cyan-brand/20 bg-white/85 backdrop-blur-md'
        }`}
      >
        <a
          href="#home"
          onClick={selectLink}
          className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand"
          aria-label="Rebellion Coders — back to top"
        >
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 shadow-sm sm:h-12 sm:w-12">
            <LogoRc className="h-full w-full" />
          </span>
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-slate-900">
              Rebellion Coders
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-brand">
              Official Community
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand xl:px-4 ${
                    isActive ? 'text-royal-700' : 'text-slate-700 hover:text-royal-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-royal-600 to-cyan-brand xl:inset-x-4"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-royal-600 to-cyan-brand px-5 py-2.5 text-[13px] font-semibold text-slate-900 shadow-glow-sm transition hover:shadow-glow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex"
          >
            Join Community
          </a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="rounded-xl border border-cyan-brand/25 bg-cyan-brand/5 p-2.5 text-slate-700 transition hover:border-cyan-brand/50 hover:text-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-cyan-brand/25 bg-white/95 p-4 shadow-card backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={selectLink}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand ${
                      active === link.href.slice(1)
                        ? 'bg-cyan-brand/10 text-royal-700'
                        : 'text-slate-700 hover:bg-cyan-brand/5 hover:text-royal-700'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={selectLink}
              className="mt-3 flex items-center justify-center rounded-full bg-gradient-to-r from-royal-600 to-cyan-brand px-5 py-3 text-sm font-semibold text-slate-900 shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Join Community
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
