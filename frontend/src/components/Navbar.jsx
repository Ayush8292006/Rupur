import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

// Height: mobile 64px, computer 80px (Hero me pt-16 md:pt-20 isi wajah se hai)
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('#home');

  // Scroll: neeche jao toh navbar chhup jaye, upar aao toh wapas aaye
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;

      // Kaunsa section screen pe hai, uska link highlight
      for (const l of [...LINKS].reverse()) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top < 140) { setActive(l.href); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu khula ho toh page scroll band
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`nav-in fixed inset-x-0 top-0 z-[200] transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
          ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}
          ${scrolled ? 'bg-[#120B08]/85 shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)] backdrop-blur-xl' : 'bg-[#120B08]'}`}
      >
        <div className="mx-auto grid h-16 max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-8 lg:grid-cols-[auto_1fr_auto]">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative h-10 w-10 lg:hidden"
          >
            <span className={`absolute left-2 h-[2px] w-6 rounded bg-white transition-all duration-300 ${open ? 'top-[19px] rotate-45' : 'top-[13px]'}`} />
            <span className={`absolute left-2 top-[19px] h-[2px] rounded bg-white transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4 opacity-100'}`} />
            <span className={`absolute left-2 h-[2px] w-6 rounded bg-white transition-all duration-300 ${open ? 'top-[19px] -rotate-45' : 'top-[25px]'}`} />
          </button>

          {/* Logo */}
          <a href="#home" onClick={() => setOpen(false)} className="group justify-self-center text-center leading-none lg:justify-self-start lg:text-left">
            <span className="logo-shine block font-serif text-[26px] tracking-[0.22em] text-white transition-[letter-spacing] duration-500 group-hover:tracking-[0.3em] md:text-[30px]">
              RUPUR
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.35em] text-[#D9A35B] md:text-[10px]">FRAGRANCE YOU FEEL</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center justify-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav-link relative py-2 text-[15px] transition-colors duration-300 ${active === l.href ? 'text-white' : 'text-white/65 hover:text-white'}`}
                  data-active={active === l.href}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center justify-self-end gap-2">
            <a
              href="#shop"
              className="btn-shine relative hidden overflow-hidden rounded-full bg-[#E8562A] px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.03] md:inline-block"
            >
              Shop Now
            </a>
            <a href="#shop" aria-label="Cart" className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                <path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 8z" strokeLinejoin="round" />
                <path d="M9 8V6.5a3 3 0 016 0V8" />
              </svg>
            </a>
          </div>
        </div>

        {/* Neeche ek patli sunehri line jo scroll ke saath bharti hai */}
        <ScrollProgress />
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[190] bg-[#120B08] transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${
          open ? '[clip-path:circle(150%_at_28px_32px)]' : 'pointer-events-none [clip-path:circle(0%_at_28px_32px)]'
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-8">
          {LINKS.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-2 font-serif text-5xl text-white transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionDelay: open ? `${200 + i * 70}ms` : '0ms' }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li
            className={`mt-8 text-sm text-[#D9A35B] transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: open ? '650ms' : '0ms' }}
          >
            +91 79872 66411 · rupurperfumes@gmail.com
          </li>
        </ul>
      </div>

      <style>{`
        .nav-in { animation: navIn .8s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes navIn { from { transform: translateY(-100%); opacity: 0; } to { transform: none; opacity: 1; } }

        .nav-link::after {
          content: ''; position: absolute; left: 50%; bottom: 0; height: 2px; width: 0;
          background: #D9A35B; border-radius: 2px; transform: translateX(-50%);
          transition: width .35s cubic-bezier(.2,.8,.2,1);
        }
        .nav-link:hover::after, .nav-link[data-active="true"]::after { width: 100%; }

        .btn-shine::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.45), transparent);
          transform: skewX(-20deg); animation: shine 3.2s ease-in-out infinite;
        }
        @keyframes shine { 0%, 60% { left: -60%; } 100% { left: 130%; } }

        .logo-shine {
          background: linear-gradient(110deg, #fff 40%, #F3D59B 50%, #fff 60%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: logoShine 5s linear infinite;
        }
        @keyframes logoShine { from { background-position: 100% 0; } to { background-position: -150% 0; } }

        @media (prefers-reduced-motion: reduce) {
          .nav-in, .btn-shine::after, .logo-shine { animation: none; }
          .logo-shine { color: #fff; background: none; }
        }
      `}</style>
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
      <div className="h-full origin-left bg-gradient-to-r from-[#B08D57] via-[#F3D59B] to-[#E8562A]" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}