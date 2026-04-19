import { useEffect, RefObject } from 'react';
import { gsap, ScrollTrigger } from './gsap';

export function useReveal(ref: RefObject<HTMLElement>, selector = '[data-reveal]') {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      items.forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, selector]);
}

export { ScrollTrigger };
