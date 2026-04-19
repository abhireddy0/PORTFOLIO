import { useLayoutEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
import { gsap, ScrollTrigger } from '../lib/gsap';

type Project = {
  title: string;
  description: string;
  stack: string[];
  image?: string;
  live?: string;
  repo?: string;
  accent: string;
};

// TODO: replace with real projects from your resume
const PROJECTS: Project[] = [
  {
    title: 'Project One',
    description:
      'TODO: Replace with your first resume project — short punchy description of what it does and the problem it solves.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/projects/project-1.jpg',
    live: '#',
    repo: 'https://github.com/abhireddy0',
    accent: '#00E5FF',
  },
  {
    title: 'Project Two',
    description:
      'TODO: Replace with your second resume project — one or two sentences. Highlight outcome / scale / what you owned.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'React Native'],
    image: '/projects/project-2.jpg',
    live: '#',
    repo: 'https://github.com/abhireddy0',
    accent: '#FF2EC4',
  },
  {
    title: 'Neon Portfolio (this site)',
    description:
      'An immersive 3D portfolio built with React + Vite, GSAP ScrollTrigger, and react-three-fiber. Custom shader-based distorted sphere in the hero, bloom + chromatic aberration post-processing, pinned horizontal scroll for projects, and Lenis-powered smooth scroll.',
    stack: ['React', 'Vite', 'Three.js', 'GSAP', 'Tailwind'],
    repo: 'https://github.com/abhireddy0',
    accent: '#00E5FF',
  },
];

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const section = rootRef.current!;
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth + 80),
          invalidateOnRefresh: true,
        },
      });
      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      };
    }, rootRef);

    // Refresh after a tick so sizes settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="relative h-[100svh] overflow-hidden"
    >
      <div className="absolute top-10 md:top-16 left-6 md:left-10 z-10 pointer-events-none">
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
          Things I've shipped.
        </h2>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 z-10 pointer-events-none font-mono text-xs text-fg/40 uppercase tracking-widest">
        ← scroll →
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-8 h-full pl-[8vw] pr-[8vw] pt-40 pb-16"
        style={{ width: 'max-content' }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-hover
      className="group relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[46vw] h-[75vh] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden p-8 md:p-10 flex flex-col justify-between transition-colors hover:border-white/30"
      style={{ boxShadow: `0 0 60px -20px ${project.accent}40` }}
    >
      {project.image && (
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <img
            src={project.image}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        </div>
      )}

      <div className="relative flex justify-between items-start">
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: project.accent }}
        >
          0{index + 1} / 0{3}
        </span>
        <div className="flex gap-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-white/40 transition-colors"
              aria-label="Repo"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-white/40 transition-colors"
              aria-label="Live site"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="relative">
        <h3 className="font-display font-bold text-3xl md:text-5xl leading-[1.05] mb-5">
          {project.title}
        </h3>
        <p className="font-body text-fg/70 text-base md:text-lg max-w-xl mb-6 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 rounded-full border border-white/15 text-fg/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
