import Reveal from '@/components/Reveal';

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
};

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls}`}>
      <span className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-cyan-brand">
        {label}
      </span>
      <h2
        className={`max-w-3xl font-display text-3xl font-bold uppercase leading-[120%] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-[15px] leading-[150%] sm:text-base ${
            dark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
      <span
        aria-hidden="true"
        className="mt-1 h-[3px] w-16 rounded-full bg-gradient-to-r from-royal-600 to-cyan-brand"
      />
    </Reveal>
  );
}
