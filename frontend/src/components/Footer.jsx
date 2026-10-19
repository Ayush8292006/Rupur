import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Main Entrance Animation
      gsap.from(".footer-reveal", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      });

      // 2. Text Mask Reveal Effect (Bade text ke liye)
      gsap.from(".text-reveal", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
        yPercent: 120,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
      });

      // 3. Background Marquee Infinite Scroll
      gsap.to(".footer-marquee", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-[#050505] text-white pt-24 overflow-hidden border-t border-[#FFFFFF10]"
    >
      {/* Background Infinite Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <div className="footer-marquee flex whitespace-nowrap">
          <h1 className="text-[20vw] font-serif leading-none tracking-widest text-white">
            RUPUR • FRAGRANCE • RUPUR • FRAGRANCE •
          </h1>
        </div>
      </div>

      {/* Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#B08D57]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Top CTA Section */}
        <div className="mb-24 pb-24 border-b border-[#FFFFFF10] flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div>
            <p className="footer-reveal text-[#B08D57] tracking-[0.4em] text-xs uppercase mb-6">The Experience</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05]">
              <span className="block overflow-hidden pb-2">
                <span className="text-reveal block">Ready to find</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="text-reveal block italic text-[#B08D57]">your signature?</span>
              </span>
            </h2>
          </div>
          <a 
            href="#shop" 
            className="footer-reveal group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black overflow-hidden rounded-full font-medium tracking-widest uppercase text-sm"
          >
            <span className="absolute inset-0 bg-[#B08D57] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
              Explore Collection
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Area */}
          <div className="md:col-span-5 footer-reveal">
            <a href="#home" className="inline-flex flex-col items-start mb-8 group">
              <span 
                className="text-4xl text-white tracking-[0.2em] transition-transform duration-500 group-hover:-translate-y-1" 
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                RUPUR
              </span>
              <span className="text-[10px] text-[#B08D57] tracking-[0.4em] uppercase mt-2 transition-all duration-500 group-hover:tracking-[0.5em]">
                Fragrance You Feel
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-10">
              Slow-steeped with botanicals, traditional attars, and aged sandalwood. Experience the essence of India in every bottle.
            </p>
            
            {/* Social Icons with Hover Fill */}
            <div className="flex gap-3">
              {[
                { name: 'Instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                { name: 'Facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
                { name: 'Twitter', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg> }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#111] border border-white/5 text-gray-400 transition-all duration-500 hover:-translate-y-1 hover:text-black"
                >
                  <span className="absolute inset-0 bg-[#B08D57] scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-100"></span>
                  <span className="relative z-10">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Links */}
          <div className="md:col-span-2 footer-reveal">
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Shop Collection', 'Our Story', 'Reviews'].map((item) => (
                <li key={item}>
                  <a href={`#${item === 'Our Story' ? 'story' : item === 'Shop Collection' ? 'shop' : item.toLowerCase()}`} className="group relative text-gray-400 text-sm hover:text-white transition-colors inline-block">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B08D57] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 footer-reveal">
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Contact</h4>
            <ul className="space-y-5 text-sm text-gray-400">
              <li>
                <span className="block text-[#B08D57] text-[9px] uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:rupurperfumes@gmail.com" className="hover:text-white transition-colors text-base font-serif">rupurperfumes@gmail.com</a>
              </li>
              <li>
                <span className="block text-[#B08D57] text-[9px] uppercase tracking-widest mb-1">Call Us</span>
                <a href="tel:+917987266411" className="hover:text-white transition-colors text-base font-serif">+91 79872 66411</a>
              </li>
              <li>
                <span className="block text-[#B08D57] text-[9px] uppercase tracking-widest mb-1">Visit</span>
                <span className="leading-relaxed text-xs">In front of Tehsil, Kalapipal Mandi<br/>Dist. Shajapur, M.P.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFFFFF10] flex flex-col md:flex-row justify-between items-center gap-6 footer-reveal">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span>© {new Date().getFullYear()} RUPUR Fragrances.</span>
            <span className="hidden md:inline">|</span>
            <span>Made in India 🇮🇳</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-[#B08D57] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-[#B08D57] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}