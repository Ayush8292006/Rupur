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
import Footer from './components/Footer'; // <-- Footer Import kiya

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -70;

export default function App() {
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  // ... (Aapke Lenis aur ScrollTrigger wale saare useEffects yahan rahenge) ...

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

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
    <div ref={mainRef} className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <Hero />
        <Story />
        <Shop />
        <Reviews />
      </main>
      
      <Contact />
      <Footer /> {/* <-- Footer Yahan Add kiya */}
    </div>
  );
}