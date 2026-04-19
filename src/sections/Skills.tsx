import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';

const GROUPS = [
  {
    title: 'Frontend',
    items: ['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'],
  },
  {
    title: 'Backend',
    items: ['NestJS', 'Node.js', 'Express', 'Java', 'Spring Boot', 'Prisma', 'REST', 'JWT / OAuth'],
  },
  {
    title: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Mongoose'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'Postman', 'Vercel', 'Linux', 'VS Code'],
  },
];

const MARQUEE = [
  'NestJS', 'Prisma', 'PostgreSQL', 'React Native', 'React', 'Node.js',
  'TypeScript', 'Java', 'Spring Boot', 'MongoDB', 'Express', 'Tailwind', 'Docker', 'Redis',
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* marquee band */}
      <div className="relative border-y border-white/10 bg-gradient-to-r from-cyan-neon/5 via-transparent to-magenta-neon/5 py-6 mb-20">
        <div className="flex gap-12 whitespace-nowrap animate-marquee font-display font-bold text-4xl md:text-6xl tracking-tight">
          {[...MARQUEE, ...MARQUEE].map((x, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className={i % 2 === 0 ? 'text-fg' : 'text-fg/20'}>{x}</span>
              <span className="text-cyan-neon">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <h2
          data-reveal
          className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-14 max-w-3xl"
        >
          The tools I reach for first.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GROUPS.map((g) => (
            <div
              key={g.title}
              data-reveal
              className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-neon/40 hover:bg-cyan-neon/[0.03] transition-colors"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-neon mb-4">
                {g.title}
              </h3>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="font-body text-fg/80 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-magenta-neon rounded-full" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
