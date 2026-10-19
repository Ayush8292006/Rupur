import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMG_BASE = 'https://idyllic-tarsier-20717f.netlify.app';

const PERFUMES = [
  { name: 'Romantic Dance', desc: 'Candle-lit, rose-warm evenings', size: '30 ML', img: '/img/romantic.webp', accent: '#7A1F2B' },
  { name: 'Dhaval', desc: 'Clean, woody, daily office wear', size: '30 ML', img: '/img/dhaval.webp', accent: '#3A4250' },
  { name: 'Giraft', desc: 'Dark, bold and unchained', size: '50 ML', img: '/img/giraft.webp', accent: '#2A2622' },
  { name: 'Ira', desc: 'A garden of soft florals', size: '30 ML', img: '/img/ira.webp', accent: '#B4586C' },
  { name: 'Sea Faze', desc: 'Salt air and a cool breeze', size: '30 ML', img: '/img/seafaze.webp', accent: '#1F5FA8' },
];

const WHATSAPP = '917987266411';
const GOLD = '#B08D57';
const INK = '#1A1A1A';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ======================= Card Component ======================= */
function Card({ p, index, onOpen, isLarge }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!window.matchMedia('(pointer: fine)').matches || reduceMotion()) return;

    gsap.set(card, { transformPerspective: 1000 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const ix = gsap.quickTo(imgRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const iy = gsap.quickTo(imgRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

    const move = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ry(x * 10);
      rx(-y * 8);
      ix(-x * 15); 
      iy(-y * 15);
      card.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    };
    const leave = () => { rx(0); ry(0); ix(0); iy(0); };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    return () => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(index, cardRef.current)}
      className={`shop-card group relative flex flex-col w-full rounded-3xl border border-[#1A1A1A]/5 bg-white p-4 text-left shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[0_35px_70px_-20px_rgba(176,141,87,0.35)] ${isLarge ? 'h-full' : ''}`}
    >
      <div className={`relative mb-6 overflow-hidden rounded-2xl ${isLarge ? 'aspect-[4/3] flex-grow' : 'aspect-[4/3]'}`} style={{ backgroundColor: `${p.accent}14` }}>
        <img
          ref={imgRef}
          src={IMG_BASE + p.img}
          alt={p.name}
          loading="lazy"
          className="h-full w-full scale-[1.12] object-cover transition-[filter] duration-700 group-hover:brightness-105"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.75), transparent 55%)' }}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/85 px-4 py-1.5 text-[10px] font-medium tracking-[0.15em] text-[#1A1A1A]/70 backdrop-blur-md">
          {p.size.replace(' ', '')} · EDP
        </span>
        <span className="absolute right-4 top-4 font-serif text-sm text-white/90 drop-shadow">0{index + 1}</span>
        <span className="absolute inset-x-4 bottom-4 flex translate-y-[140%] items-center justify-between rounded-full bg-[#1A1A1A]/85 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0">
          Discover
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
        </span>
      </div>

      <div className="px-2 pb-2 [transform:translateZ(30px)]">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: p.accent }} />
            <h3 className={`font-serif text-[#1A1A1A] ${isLarge ? 'text-2xl' : 'text-xl'}`}>{p.name}</h3>
          </div>
          <span className="rounded-full border border-[#1A1A1A]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[#1A1A1A]/50">{p.size}</span>
        </div>
        <p className="ml-5 text-sm text-[#1A1A1A]/55">{p.desc}</p>
      </div>
    </button>
  );
}

/* ======================= Full View (Modal) ======================= */
function FullView({ index, originEl, onClose, onChange }) {
  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const p = PERFUMES[index];
  const closing = useRef(false);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    const r = originEl.getBoundingClientRect();
    const ctx = gsap.context(() => {
      if (reduceMotion()) return;
      gsap.set('.fv-in', { opacity: 0, y: 40 });
      gsap.set('.fv-img', { scale: 1.25 });
      gsap.timeline({ defaults: { ease: 'expo.inOut' } })
        .fromTo('.fv-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
        .fromTo(panelRef.current, { top: r.top, left: r.left, width: r.width, height: r.height, borderRadius: 24 }, { top: 0, left: 0, width: '100%', height: '100%', borderRadius: 0, duration: 1 }, 0)
        .to('.fv-img', { scale: 1, duration: 1.4, ease: 'expo.out' }, 0.3)
        .to('.fv-in', { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' }, 0.6);
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (reduceMotion()) return;
    gsap.fromTo(wrapRef.current.querySelectorAll('.fv-swap'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'expo.out' });
  }, [index]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (reduceMotion()) return onClose();
    const target = document.querySelectorAll('.shop-card')[index] || originEl;
    const r = target.getBoundingClientRect();
    gsap.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: onClose })
      .to(wrapRef.current.querySelectorAll('.fv-in, .fv-swap'), { opacity: 0, y: 20, duration: 0.35, ease: 'power2.in' }, 0)
      .to(panelRef.current, { top: r.top, left: r.left, width: r.width, height: r.height, borderRadius: 24, duration: 0.9 }, 0.15)
      .to(wrapRef.current.querySelector('.fv-backdrop'), { opacity: 0, duration: 0.5 }, 0.5);
  }, [onClose, originEl, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') onChange(1);
      if (e.key === 'ArrowLeft') onChange(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [close, onChange]);

  const waText = encodeURIComponent(`Hi Rupur, I'd like to order ${p.name} (${p.size}).`);

  return createPortal(
    <div ref={wrapRef} className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" data-lenis-prevent>
      <div className="fv-backdrop absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm" onClick={close} />
      <div ref={panelRef} className="absolute inset-0 overflow-y-auto transition-[background-color] duration-700" style={{ backgroundColor: CREAM_FOR(p.accent) }}>
        <div className="grid min-h-full lg:grid-cols-2">
          <div className="relative min-h-[50vh] overflow-hidden lg:min-h-full" style={{ backgroundColor: `${p.accent}22` }}>
            <img key={p.img} src={IMG_BASE + p.img} alt={p.name} className="fv-img fv-swap absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className="fv-in absolute bottom-6 left-6 font-serif text-[18vw] leading-none text-white/15 lg:text-[10vw]">0{index + 1}</span>
          </div>
          <div className="flex flex-col justify-between px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
            <div className="flex items-center justify-between">
              <span className="fv-in flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
                The Collection · {index + 1}/{PERFUMES.length}
              </span>
              <button onClick={close} className="fv-in group flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <div className="my-14">
              <div className="fv-swap flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.accent }} /><span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/50">Eau de Parfum · {p.size}</span></div>
              <h2 className="fv-swap mt-5 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-[#1A1A1A]">{p.name}</h2>
              <p className="fv-swap mt-6 max-w-md font-serif text-2xl italic" style={{ color: p.accent }}>{p.desc}.</p>
              <p className="fv-swap mt-6 max-w-md text-[15px] leading-relaxed text-[#1A1A1A]/65">Slow-steeped with botanicals, traditional attars and aged sandalwood oil — built to evolve on pulse points.</p>
              <div className="fv-swap mt-10 flex flex-wrap gap-4">
                <a href={`https://wa.me/${WHATSAPP}?text=${waText}`} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 rounded-full bg-[#1A1A1A] py-1.5 pl-7 pr-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#B08D57] transition-colors duration-500">
                  Order on WhatsApp
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1A1A1A]"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function CREAM_FOR(hex) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(c * 0.08 + 248 * 0.92);
  return `rgb(${mix((n >> 16) & 255)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`;
}

/* ======================= Main Shop Section ======================= */
export default function Shop() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(null);

  useLayoutEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set('.shop-eyebrow, .shop-sub', { opacity: 0, y: 24 });
      gsap.set('.shop-word', { yPercent: 110 });
      gsap.set('.shop-card-wrap', { opacity: 0, y: 90, rotationX: 25, transformPerspective: 1200, transformOrigin: '50% 100%' });

      gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
        .to('.shop-eyebrow', { opacity: 1, y: 0, duration: 1 })
        .to('.shop-word', { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.1)
        .to('.shop-sub', { opacity: 1, y: 0, duration: 1 }, 0.4)
        .to('.shop-card-wrap', { opacity: 1, y: 0, rotationX: 0, duration: 1.4, stagger: 0.12, clearProps: 'transform' }, 0.35);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openCard = (index, el) => setOpen({ index, el });
  const change = useCallback((d) => setOpen((o) => o && { ...o, index: (o.index + d + PERFUMES.length) % PERFUMES.length }), []);

  return (
    <section id="shop" ref={sectionRef} className="relative z-20 min-h-screen overflow-hidden bg-[#F8F5EE] py-24 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.5)] lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full blur-[120px]" style={{ backgroundColor: GOLD, opacity: 0.1 }} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-20">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="shop-eyebrow mb-4 flex items-center gap-4">
              <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>The Collection</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl" style={{ color: INK }}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="shop-word inline-block">Five</span>
              </span>{' '}
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="shop-word inline-block italic" style={{ color: GOLD }}>Signatures</span>
              </span>
            </h2>
          </div>
          <p className="shop-sub max-w-sm text-sm leading-relaxed text-[#1A1A1A]/55 lg:text-right">
            Every scent has its own world. Move your cursor over a bottle to turn it in the light — tap one to step inside.
          </p>
        </div>

        {/* Grid: 2 Top, 3 Bottom */}
        <div className="grid grid-cols-6 gap-6 lg:gap-8">
          
          {/* Top Row: 2 Items (col-span-3 each) */}
          {PERFUMES.slice(0, 2).map((p, i) => (
            <div key={p.name} className="shop-card-wrap col-span-6 md:col-span-3">
              <Card p={p} index={i} onOpen={openCard} isLarge={true} />
            </div>
          ))}

          {/* Bottom Row: 3 Items (col-span-2 each) */}
          {PERFUMES.slice(2, 5).map((p, i) => (
            <div key={p.name} className="shop-card-wrap col-span-6 md:col-span-2">
              <Card p={p} index={i + 2} onOpen={openCard} isLarge={false} />
            </div>
          ))}

        </div>

      </div>

      {open && (
        <FullView index={open.index} originEl={open.el} onClose={() => setOpen(null)} onChange={change} />
      )}
    </section>
  );
}