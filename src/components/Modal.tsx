import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, subtitle, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-cyan-brand/30 bg-white p-6 shadow-glow backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.21, 0.65, 0.35, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-brand to-transparent"
            />
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-full border border-royal-600/20 bg-ice-100 p-2 text-slate-700 transition hover:border-cyan-brand/50 hover:text-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-brand"
            >
              <X size={18} strokeWidth={2} />
            </button>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-cyan-brand">
              {subtitle ?? 'Rebellion Coders'}
            </span>
            <h3 className="mt-2 pr-10 font-display text-xl font-bold uppercase leading-[120%] text-slate-900 sm:text-2xl">
              {title}
            </h3>
            <div className="mt-4 text-[15px] leading-[150%] text-slate-700">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
