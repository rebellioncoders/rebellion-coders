type LogoRcProps = {
  className?: string;
};

export default function LogoRc({ className = '' }: LogoRcProps) {
  return (
    <img
      src="/logo.jpeg"
      alt="Rebellion Coders — Official Community"
      className={`object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
