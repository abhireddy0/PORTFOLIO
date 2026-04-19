import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';

type Entry = {
  role: string;
  org: string;
  location: string;
  period: string;
  current?: boolean;
  blurbs: string[];
  stack: string[];
};

const ENTRIES: Entry[] = [
  {
    role: 'Full Stack Developer',
    org: 'SR Integrated Circuits Pvt Ltd',
    location: 'Bangalore',
    period: 'Mar 2026 — Present',
    current: true,
    blurbs: [
      'Building typed, tested backend services with NestJS and Prisma on PostgreSQL.',
      'Shipping cross-platform mobile features with React Native, wired to the same API surface.',
      'Owning schema design, migrations, and integration glue across the stack.',
    ],
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'React Native', 'TypeScript'],
  },
  {
    role: 'Full Stack Developer (MERN)',
    org: 'Gravita Oasis Review Solutions',
    location: 'Bangalore',
    period: 'Sep 2025 — Dec 2025',
    blurbs: [
      'Shipped full-stack features across a MERN codebase — REST APIs in Express, React front-ends, MongoDB schemas.',
      'Collaborated with the team on review workflows, authentication, and admin tooling.',
      'Learned to move fast without breaking production.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-32 md:py-48 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <h2
        data-reveal
        className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-16 max-w-3xl"
      >
        The path so far.
      </h2>

      <div className="relative">
        {/* vertical line */}
        <div
          aria-hidden
          className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-neon via-magenta-neon to-transparent"
        />

        <ol className="space-y-16">
          {ENTRIES.map((e, i) => (
            <li key={i} data-reveal className="relative pl-10 md:pl-14">
              {/* dot */}
              <span
                className={`absolute left-0 top-2 w-6 h-6 rounded-full border-2 ${
                  e.current
                    ? 'border-cyan-neon bg-cyan-neon/20 shadow-[0_0_20px_#00E5FF]'
                    : 'border-magenta-neon bg-magenta-neon/20'
                }`}
              >
                {e.current && (
                  <span className="absolute inset-0 rounded-full bg-cyan-neon/60 animate-ping" />
                )}
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                <h3 className="font-display font-bold text-2xl md:text-3xl">
                  {e.role}{' '}
                  <span className="text-fg/40 font-body font-normal text-lg">@ {e.org}</span>
                </h3>
                <span className="font-mono text-xs text-fg/50 uppercase tracking-widest">
                  {e.period} · {e.location}
                </span>
              </div>

              <ul className="space-y-2 mb-4 max-w-2xl">
                {e.blurbs.map((b, j) => (
                  <li key={j} className="text-fg/70 font-body flex gap-3">
                    <span className="text-cyan-neon mt-2">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {e.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-2.5 py-1 rounded-full border border-white/10 text-fg/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
