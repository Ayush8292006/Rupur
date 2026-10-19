import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll hone par Navbar ka background change hoga
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out
      ${scrolled 
        ? 'bg-[#0A0A0A]/90 backdrop-blur-xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#FFFFFF10]' 
        : 'bg-gradient-to-b from-[#0A0A0A]/80 to-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="flex flex-col items-start justify-center group overflow-hidden z-50">
          <span 
            className="text-2xl md:text-3xl text-white tracking-[0.2em] transition-transform duration-500 group-hover:-translate-y-1" 
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            RUPUR
          </span>
          <span className="text-[9px] text-[#B08D57] tracking-[0.3em] uppercase mt-1 transition-all duration-500 group-hover:tracking-[0.4em]">
            Fragrance You Feel
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10">
          {['Home', 'Shop', 'Our Story', 'Reviews', 'Contact'].map((item) => {
            // Link ka ID banayein (e.g., 'Our Story' -> '#story')
            const href = item === 'Our Story' ? '#story' : `#${item.toLowerCase()}`;
            
            return (
              <li key={item}>
                <a 
                  href={href} 
                  className="relative text-[11px] tracking-[0.25em] uppercase text-[#A0A0A0] hover:text-[#B08D57] transition-colors duration-300 font-medium group py-2 block"
                >
                  {item}
                  {/* Gold Underline Animation */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#B08D57] transition-all duration-500 ease-out group-hover:w-full"></span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Shop Now Button */}
        <div className="hidden lg:flex items-center">
          <a 
            href="#shop" 
            className="relative overflow-hidden group px-8 py-3 bg-transparent border border-[#B08D57]/50 text-[11px] font-medium tracking-[0.2em] text-[#B08D57] uppercase transition-colors duration-500 rounded-sm"
          >
            <span className="absolute inset-0 bg-[#B08D57] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Shop Now
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white text-2xl p-2 z-50 relative" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-3xl border-b border-[#FFFFFF10] transition-all duration-500 ease-in-out overflow-hidden
        ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col items-start px-8 py-8 gap-6">
          {['Home', 'Shop', 'Our Story', 'Reviews', 'Contact'].map((item) => {
            const href = item === 'Our Story' ? '#story' : `#${item.toLowerCase()}`;
            return (
              <li key={item} className="w-full border-b border-white/5 pb-4">
                <a 
                  href={href} 
                  onClick={() => setIsOpen(false)} 
                  className="block text-sm tracking-[0.2em] uppercase text-[#A0A0A0] hover:text-[#B08D57] transition-colors"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}