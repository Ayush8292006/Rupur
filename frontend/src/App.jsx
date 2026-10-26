import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Shop from './components/Shop';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -90;

export default function App() {
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // #shop, #story jaise links pe click karne par smooth scroll
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      e.preventDefault();
      if (hash === '#home') {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.5 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(null, '', hash);
        return;
      }
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(target, { offset: NAV_OFFSET, duration: 1.5 });
          } else {
            const top = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
        window.history.replaceState(null, '', hash);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-white pb-24 md:pb-0">
      <Navbar />

      <main>
        <Hero />
        <Shop />
        <Story />
        <Reviews />
      </main>

      <Contact />
      <Footer />
    </div>
  );
}