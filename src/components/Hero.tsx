import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle, Rocket } from 'lucide-react';
import LogoRc from '@/components/LogoRc';
import { WHATSAPP_URL } from '@/lib/brand';

type Particle = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function Particles() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: `${(i * 41 + 7) % 100}%`,
        top: `${(i * 29 + 13) % 100}%`,
        size: 2 + ((i * 7) % 3),
        duration: 4 + ((i * 13) % 5),
        delay: (i % 8) * 0.7,
        opacity: 0.25 + ((i * 17) % 40) / 100,
      })),
    []
  );

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-cyan-brand"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [-16, 16, -16], opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function EmblemVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(0,200,245,0.14)" strokeWidth="1" />
        <circle
          cx="200"
          cy="200"
          r="158"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.6"
          opacity="0.6"
          strokeDasharray="14 10"
          className="animate-dash-flow"
        />
        <circle cx="200" cy="200" r="122" fill="rgba(56,189,248,0.07)" stroke="rgba(56,189,248,0.28)" strokeWidth="1" />
        <circle
          cx="200"
          cy="200"
          r="88"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="2"
          opacity="0.8"
          strokeDasharray="4 8"
          className="animate-dash-flow"
          style={{ animationDuration: '3.4s' }}
        />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 200 + 188 * Math.cos(rad);
          const y = 200 + 188 * Math.sin(rad);
          return <circle key={deg} cx={x} cy={y} r="3.5" fill="#00C8F5" opacity="0.7" />;
        })}
      </svg>

      <div
        aria-hidden="true"
        className="animate-spin-slow absolute h-[70%] w-[70%] rounded-full border border-dashed border-cyan-brand/30"
      />
      <div
        aria-hidden="true"
        className="animate-spin-slower absolute h-[52%] w-[52%] rounded-full border border-royal-600/40"
      />

      <div className="animate-float-y relative flex h-[54%] w-[54%] items-center justify-center rounded-[28%] border border-cyan-brand/30 bg-white p-3 shadow-glow sm:p-4">
        <LogoRc className="h-full w-full rounded-[22%]" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-hero-radial pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-circuit bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]"
      />
      <Particles />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-brand/30 bg-cyan-brand/5 px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-royal-700 sm:text-[11px]"
          >
            <Rocket size={13} aria-hidden="true" />
            Independent Student-Led Technology Community
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold uppercase leading-[112%] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Don't Just Follow Technology.{' '}
            <span className="bg-gradient-to-r from-royal-600 via-cyan-brand to-cyan-soft bg-clip-text text-transparent">
              Build What's Next.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-[15px] leading-[150%] text-slate-600 sm:text-base"
          >
            Rebellion Coders is an independent student-led technology community bringing together
            curious minds across India to learn, collaborate, experiment and innovate.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="font-mono text-sm font-medium uppercase tracking-[0.3em] text-royal-700"
          >
            Think. Code. Innovate. Rebel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a href="#domains" className="btn-primary">
              Explore Domains
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Join Community
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="hidden sm:block"
        >
          <EmblemVisual />
        </motion.div>
      </div>
    </section>
  );
}
