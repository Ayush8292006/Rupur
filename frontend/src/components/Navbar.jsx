import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

// Height: mobile 56px (h-14), desktop 80px (md:h-20)
// Hero me pt-14 md:pt-20 isi wajah se hai
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
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
          ${scrolled || open ? 'bg-[#120B08]/95 backdrop-blur-xl' : 'bg-[#120B08]'}`}
      >
        <div className="mx-auto grid h-14 max-w-[1500px] grid-cols-[48px_1fr_48px] items-center px-2 md:h-20 md:px-8 lg:grid-cols-[auto_1fr_auto]">
          {/* Mobile: menu button (left) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative h-12 w-12 lg:hidden"
          >
            <span className={`absolute left-3 h-[2px] w-6 rounded bg-white transition-all duration-300 ${open ? 'top-[23px] rotate-45' : 'top-[17px]'}`} />
            <span className={`absolute left-3 top-[23px] h-[2px] w-6 rounded bg-white transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-3 h-[2px] w-6 rounded bg-white transition-all duration-300 ${open ? 'top-[23px] -rotate-45' : 'top-[29px]'}`} />
          </button>

          {/* Logo: mobile me bilkul beech me, tagline sirf desktop pe */}
          <a href="#home" onClick={() => setOpen(false)} className="justify-self-center text-center leading-none lg:justify-self-start">
            <span className="block font-serif text-[22px] tracking-[0.2em] text-white md:text-[30px]">RUPUR</span>
            <span className="mt-1 hidden text-[10px] tracking-[0.35em] text-[#D9A35B] md:block">FRAGRANCE YOU FEEL</span>
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

          {/* Right: cart (mobile), Shop Now + cart (desktop) */}
          <div className="flex items-center justify-self-end gap-2">
            <a
              href="#shop"
              className="btn-shine relative hidden overflow-hidden rounded-full bg-[#E8562A] px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.03] md:inline-block"
            >
              Shop Now
            </a>
            <a href="#shop" aria-label="Cart" className="grid h-12 w-12 place-items-center rounded-full text-white transition active:bg-white/10 lg:hover:bg-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                <path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 8z" strokeLinejoin="round" />
                <path d="M9 8V6.5a3 3 0 016 0V8" />
              </svg>
            </a>
          </div>
        </div>

        <ScrollProgress />
      </header>

      {/* Mobile menu: header ke neeche se shuru, upar se overlap nahi */}
      <div
        className={`fixed inset-x-0 bottom-0 top-14 z-[190] bg-[#120B08] transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-4">
          <ul className="flex-1">
            {LINKS.map((l, i) => (
              <li key={l.href} className="border-b border-white/10">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-5 font-serif text-[28px] text-white transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
                >
                  {l.label}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#D9A35B]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#shop"
            onClick={() => setOpen(false)}
            className="grid h-14 place-items-center rounded-2xl bg-[#E8562A] text-lg font-semibold text-white active:scale-[.98]"
          >
            Shop Now
          </a>
          <p className="mt-5 text-center text-sm leading-relaxed text-[#D9A35B]">
            +91 79872 66411<br />rupurperfumes@gmail.com
          </p>
        </div>
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

        @media (prefers-reduced-motion: reduce) {
          .nav-in, .btn-shine::after { animation: none; }
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