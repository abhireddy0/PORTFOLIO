import { useEffect } from 'react';
import { useLenis } from './lib/useLenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Noise from './components/Noise';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

function useScrollSpy() {
  useEffect(() => {
    // On load, scroll to hash if present
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            history.replaceState(null, '', id === 'hero' ? '/' : `#${id}`);
            break;
          }
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useLenis();
  useScrollSpy();

  return (
    <>
      <Noise />
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
