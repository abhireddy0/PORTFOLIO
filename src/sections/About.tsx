import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-neon/20 via-magenta-neon/10 to-bg ${className}`}>
      <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[5rem] text-fg/10 select-none pointer-events-none">
        AR
      </span>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">

        {/* photo stack */}
        <div data-reveal className="relative pb-24 md:pb-32">
          {/* glow layers */}
          <div className="absolute -top-6 -left-6 w-36 h-36 rounded-full bg-cyan-neon/25 blur-3xl pointer-events-none" />
          <div className="absolute bottom-8 -right-4 w-36 h-36 rounded-full bg-magenta-neon/25 blur-3xl pointer-events-none" />

          {/* main portrait */}
          <Photo
            src="/Abhishek Reddy.jpeg"
            alt="Abhishek Reddy"
            className="relative aspect-[3/4] w-full -rotate-[3deg] shadow-[0_8px_40px_rgba(0,229,255,0.15)] border-white/15"
          />

          {/* second portrait — overlapping bottom-right */}
          <div className="absolute bottom-0 right-0 w-[55%] rotate-[5deg] shadow-[0_8px_32px_rgba(255,46,196,0.25)] border border-magenta-neon/40 rounded-2xl overflow-hidden">
            <Photo
              src="/TechFest -bangalore.jpeg"
              alt="Abhishek Reddy"
              className="aspect-[3/4] w-full border-0"
            />
          </div>

          {/* name tag */}
          <div className="absolute bottom-2 left-4 font-mono text-xs text-fg/50">
            Abhishek Reddy <span className="text-cyan-neon">·</span> 2026
          </div>
        </div>

        {/* copy */}
        <div>
          <h2
            data-reveal
            className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8"
          >
            I build the{' '}
            <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">
              web and the wires
            </span>{' '}
            behind it.
          </h2>

          <div className="space-y-5 text-fg/70 text-lg leading-relaxed max-w-xl font-body">
            <p data-reveal>
              I'm Abhishek — a full-stack developer based in Bangalore. I spent the first chapter
              of my career deep in the MERN stack, building review and operations tooling at{' '}
              <span className="text-fg">Gravita Oasis Review Solutions</span>.
            </p>
            <p data-reveal>
              These days I'm at{' '}
              <span className="text-fg">SR Integrated Circuits</span>, writing typed, tested
              services with <span className="text-cyan-neon">NestJS</span> +{' '}
              <span className="text-cyan-neon">Prisma</span> on{' '}
              <span className="text-cyan-neon">PostgreSQL</span>, and shipping mobile with{' '}
              <span className="text-cyan-neon">React Native</span>.
            </p>
            <p data-reveal>
              I care about clean schemas, fast feedback loops, and interfaces that feel alive.
              Outside the terminal I'm probably breaking something, fixing it, and calling it a
              feature.
            </p>
          </div>

          <div data-reveal className="mt-10 grid grid-cols-3 gap-4 font-mono text-sm">
            <Stat label="Experience" value="5+" suffix="months" />
            <Stat label="Companies" value="2" suffix="Bangalore" />
            <Stat label="Stacks" value="2" suffix="MERN · NestJS" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="border-l-2 border-cyan-neon/60 pl-3">
      <div className="text-2xl md:text-3xl text-fg font-display font-semibold">{value}</div>
      <div className="text-[0.7rem] text-fg/50 uppercase tracking-widest">{label}</div>
      <div className="text-[0.7rem] text-fg/40">{suffix}</div>
    </div>
  );
}
