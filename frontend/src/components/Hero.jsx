import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] flex flex-col justify-between"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
      >
        <source src="/rupur-video.mp4" type="video/mp4" />
        <img src="/hero-bg.jpg" alt="Perfume" className="w-full h-full object-cover" />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-0" />

      {/* Spacer for Top Navbar */}
      <div className="h-24 z-10" />

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        <div ref={textRef} className="flex flex-col items-center">
          <p className="text-[#B08D57] tracking-[0.4em] text-xs md:text-sm mb-6 uppercase font-medium">
            The Essence of India
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white mb-8 font-serif leading-none tracking-wider">
            RUPUR
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed mb-10">
            Five signature perfumes. Slow-steeped with botanicals, traditional attars, and aged sandalwood.
          </p>
          <a 
            href="#shop"
            className="group relative px-10 py-4 overflow-hidden border border-white/30 text-white text-sm tracking-widest uppercase transition-all duration-500"
          >
            <span className="absolute inset-0 bg-[#B08D57] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Explore Collection
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Section: Stats & Marquee (Compact Height) */}
      <div className="relative z-10 w-full backdrop-blur-md bg-white/5 border-t border-white/10">
        
        {/* Stats (Padding aur text chota kiya) */}
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-20 py-3 md:py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 md:divide-x divide-white/10">
            <div className="text-center px-2">
              <h3 className="text-xl md:text-2xl font-serif text-[#B08D57] mb-0.5">150+</h3>
              <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase font-medium">5-Star Reviews</p>
            </div>
            <div className="text-center px-2">
              <h3 className="text-xl md:text-2xl font-serif text-[#B08D57] mb-0.5">1,000+</h3>
              <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase font-medium">Customers Tested</p>
            </div>
            <div className="text-center px-2">
              <h3 className="text-xl md:text-2xl font-serif text-[#B08D57] mb-0.5">5</h3>
              <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase font-medium">Signature Scents</p>
            </div>
            <div className="text-center px-2">
              <h3 className="text-xl md:text-2xl font-serif text-[#B08D57] mb-0.5">M.P.</h3>
              <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase font-medium">Made in Kalapipal</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10"></div>

        {/* Scrolling Marquee (Padding aur size chota kiya) */}
        <div className="w-full overflow-hidden py-2 flex whitespace-nowrap bg-black/20">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-hero {
              animation: marquee 25s linear infinite;
            }
          `}</style>
          
          <div className="animate-marquee-hero flex items-center gap-6 text-[10px] md:text-xs tracking-[0.3em] text-gray-300 uppercase">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                <span>Traditional Attars</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
                <span>Aged Sandalwood</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
                <span>Romantic Dance</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
                <span>Dhaval</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
                <span>Giraft</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
                <span>Ira</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
                <span>Sea Faze</span>
                <span className="text-[#B08D57] text-[8px]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}