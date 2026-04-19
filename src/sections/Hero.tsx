import { Suspense, lazy, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { ChevronDown } from 'lucide-react';

const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-title] span', { y: 120, opacity: 0, duration: 1.1, stagger: 0.08, delay: 0.3 })
        .from('[data-hero-tag]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('[data-hero-cue]', { opacity: 0, duration: 0.8 }, '-=0.2');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const name = ['ABHISHEK', 'REDDY'];
  const tagline =
    'Full-Stack Developer. Previously MERN — now shipping with NestJS, Prisma, PostgreSQL, and React Native.';

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-bg" />}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none flex flex-col justify-between px-6 md:px-10 pt-28 pb-10">
        <div />

        <div>
          <h1
            data-hero-title
            className="font-display font-bold leading-[0.9] text-[clamp(3.5rem,12vw,11rem)] tracking-tight text-fg"
          >
            {name.map((word) => (
              <span key={word} className="block overflow-hidden">
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </h1>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-6xl">
            <p data-hero-tag className="font-body text-fg/70 text-lg md:text-xl max-w-md">
              {tagline}
            </p>
            <p data-hero-tag className="font-mono text-xs text-fg/50 uppercase tracking-widest">
              [ scroll ↓ to explore ]
            </p>
          </div>
        </div>

        <div data-hero-cue className="flex items-center gap-2 text-fg/40 font-mono text-xs">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span>keep going</span>
        </div>
      </div>
    </section>
  );
}
