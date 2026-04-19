import { ReactNode, useRef, MouseEvent } from 'react';
import { gsap } from '../lib/gsap';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.4,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  const content = (
    <span className="inline-block transition-colors">{children}</span>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        data-hover
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      data-hover
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
    >
      {content}
    </button>
  );
}
