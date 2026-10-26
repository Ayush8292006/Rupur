import { useEffect, useRef, useState } from 'react';

/* =========================================================
   RUPUR Home (EM5 style, animated)
   Kuch badalna ho toh sirf neeche ki settings badlo
   ========================================================= */

// Photos abhi purani Netlify site se aa rahi hain.
// Client ki banner photos milne par public/banners/ me rakho
// aur img me '/banners/diwali.jpg' jaisa likho.
const IMG_BASE = 'https://idyllic-tarsier-20717f.netlify.app';

// Main button ka rang (EM5 jaisa orange). Brand gold chahiye toh '#B08D57'
const CTA = '#E8562A';
const SLIDE_TIME = 5000; // har banner kitni der (ms)

const OFFERS = [
  'Free Shipping above ₹999',
  '5% OFF on Prepaid Orders',
  'COD Available across India',
  'Made in Kalapipal, M.P.',
];

const SLIDES = [
  {
    img: IMG_BASE + '/img/romantic-poster.webp',
    lines: ['A fragrance that tells stories,', 'creates memories &'],
    italic: 'lingers beyond the season.',
    primary: { label: 'Shop All', href: '#shop' },
    secondary: { label: 'Shop Gift Sets', href: '#shop' },
  },
  {
    img: IMG_BASE + '/img/dhaval.webp',
    lines: ['DHAVAL', 'Fresh, clean & woody.'],
    italic: 'Made for every day.',
    primary: { label: 'Shop All', href: '#shop' },
    secondary: { label: 'Shop Dhaval', href: '#shop' },
  },
  {
    img: IMG_BASE + '/img/seafaze.webp',
    lines: ['SEA FAZE', 'Sea breeze & citrus.'],
    italic: 'Cool on the hottest days.',
    primary: { label: 'Shop All', href: '#shop' },
    secondary: { label: 'Shop Sea Faze', href: '#shop' },
  },
];

const CATEGORIES = [
  { label: 'Men', href: '#shop', icon: 'men' },
  { label: 'Women', href: '#shop', icon: 'women' },
  { label: 'Unisex', href: '#shop', icon: 'unisex' },
  { label: 'Attar', href: '#shop', icon: 'attar' },
];

const COLLECTIONS = [
  { title: 'Perfume Spray', sub: 'Every spray, a mood', img: IMG_BASE + '/img/ira.webp', href: '#shop' },
  { title: 'Roll-On Attar', sub: 'Pure oils, no alcohol', img: IMG_BASE + '/img/giraft.webp', href: '#shop' },
  { title: 'Gift Sets', sub: 'Boxed & ready to gift', img: IMG_BASE + '/img/romantic.webp', href: '#shop' },
];

const MENU_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

/* ---------- Scroll pe dikhne wala animation ---------- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ---------- Icons ---------- */
function GenderIcon({ type }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'men')
    return (<svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="9.5" cy="14.5" r="6.5" fill="currentColor" /><path d="M14 10l6.5-6.5M15 3.5h5.5V9" {...stroke} /></svg>);
  if (type === 'women')
    return (<svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="12" cy="9" r="6.5" fill="currentColor" /><path d="M12 15.5V22M8.5 19h7" {...stroke} /></svg>);
  if (type === 'unisex')
    return (<svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="11" cy="11" r="5.5" fill="currentColor" /><path d="M15 7l5-5M16 2h4v4M11 16.5V22M8 19.5h6" {...stroke} /></svg>);
  return (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M10 2.5h4v3.5h-4z" fill="currentColor" /><path d="M8.5 7h7l2 4v8.5A2.5 2.5 0 0115 22H9a2.5 2.5 0 01-2.5-2.5V11z" fill="currentColor" /></svg>);
}

function SafeImg({ src, alt, className = '', eager = false }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`${className} bg-[#3a2c26]`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setOk(false)} className={className} />;
}

/* ---------- Mobile: neeche wali patti (Menu / Search / Cart) ---------- */
function BottomBar() {
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState('');
  const search = (e) => {
    e.preventDefault();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={`fixed inset-0 z-[150] md:hidden ${menu ? '' : 'pointer-events-none'}`}>
        <div onClick={() => setMenu(false)} className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${menu ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white px-6 pb-28 pt-6 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${menu ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/15" />
          {MENU_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenu(false)}
              className={`block border-b border-black/5 py-4 text-xl text-[#111] transition-all duration-500 ${menu ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}
              style={{ transitionDelay: menu ? `${120 + i * 60}ms` : '0ms' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="bar-in fixed inset-x-0 bottom-0 z-[160] flex items-center gap-3 bg-[#1A1A1A] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 md:hidden">
        <button onClick={() => setMenu((m) => !m)} aria-label="Menu" className="grid h-14 w-16 shrink-0 place-items-center rounded-2xl bg-white transition active:scale-95">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round">
            {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />}
          </svg>
        </button>
        <form onSubmit={search} className="flex h-14 min-w-0 flex-1 items-center rounded-2xl bg-[#2A2A2A] pl-4 pr-1.5 ring-[#E8562A]/60 transition focus-within:ring-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search perfumes" className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/50" />
          <button aria-label="Search" className="grid h-11 w-12 place-items-center rounded-xl transition active:scale-95" style={{ backgroundColor: CTA }}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          </button>
        </form>
        <a href="#shop" aria-label="Cart" className="grid h-14 w-16 shrink-0 place-items-center rounded-2xl bg-white transition active:scale-95">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#111" strokeWidth="1.8"><path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 8z" strokeLinejoin="round" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>
        </a>
      </div>
    </>
  );
}

/* ---------- Home ---------- */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const total = SLIDES.length;
  const [chipsRef, chipsIn] = useReveal();
  const [cardsRef, cardsIn] = useReveal();

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % total), SLIDE_TIME);
    return () => clearTimeout(t);
  }, [active, paused, total]);

  const go = (i) => setActive((i + total) % total);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setPaused(true); };
  const onTouchEnd = (e) => {
    if (touchX.current !== null) {
      const diff = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(diff) > 40) go(active + (diff < 0 ? 1 : -1));
    }
    touchX.current = null;
    setPaused(false);
  };

  return (
    // pt-16 md:pt-20 = Navbar ki height
    <section id="home" className="bg-white pt-16 md:pt-20" style={{ fontFamily: "'Jost', 'Inter', system-ui, sans-serif" }}>
      {/* ================= BANNER ================= */}
      <div className="md:mx-auto md:max-w-[1500px] md:px-8 md:pt-4">
        <div
          className="banner-in relative h-[86vh] max-h-[780px] min-h-[560px] w-full overflow-hidden bg-[#3a2c26] md:aspect-[16/7] md:h-auto md:min-h-0 md:rounded-[32px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
        >
          {SLIDES.map((s, i) => {
            const on = i === active;
            return (
              <div key={i} aria-hidden={!on} className={`absolute inset-0 transition-opacity duration-1000 ${on ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
                <SafeImg
                  src={s.img}
                  alt={s.lines[0]}
                  eager={i === 0}
                  className={`h-full w-full object-cover transition-transform ease-out ${on ? 'scale-[1.12] duration-[7000ms]' : 'scale-100 duration-0'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50" />

                {/* Text: ek-ek line upar uthti hai */}
                {on && (
                  <div className="absolute right-4 top-[150px] max-w-[64%] text-right text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.55)] md:right-14 md:top-[32%] md:max-w-[460px]">
                    {s.lines.map((t, n) => (
                      <span key={n} className="block overflow-hidden">
                        <span className="rise block text-lg font-medium leading-snug md:text-[34px]" style={{ animationDelay: `${150 + n * 120}ms` }}>{t}</span>
                      </span>
                    ))}
                    <span className="block overflow-hidden">
                      <span className="rise block text-lg italic leading-snug text-[#FFE2B8] md:text-[34px]" style={{ animationDelay: `${150 + s.lines.length * 120}ms` }}>{s.italic}</span>
                    </span>
                  </div>
                )}

                {/* Buttons */}
                {on && (
                  <div className="absolute inset-x-4 bottom-[76px] grid grid-cols-2 gap-3 md:inset-x-auto md:bottom-14 md:left-14 md:w-[540px]">
                    <a
                      href={s.primary.href}
                      className="pop btn-shine relative grid min-h-[64px] place-items-center overflow-hidden rounded-2xl border-[3px] border-white px-3 text-center text-[19px] font-medium leading-tight text-white shadow-lg transition hover:-translate-y-0.5 active:scale-[.97] md:text-2xl"
                      style={{ backgroundColor: CTA, animationDelay: '420ms' }}
                    >
                      {s.primary.label}
                    </a>
                    <a
                      href={s.secondary.href}
                      className="pop grid min-h-[64px] place-items-center rounded-2xl border-[3px] border-white bg-[#1A1A1A] px-3 text-center text-[19px] font-medium leading-tight text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black active:scale-[.97] md:text-2xl"
                      style={{ animationDelay: '520ms' }}
                    >
                      {s.secondary.label}
                    </a>
                  </div>
                )}
              </div>
            );
          })}

          {/* Offer box: text chalta rehta hai */}
          <div className="drop-in absolute inset-x-3 top-3 z-20 overflow-hidden rounded-2xl bg-[#1A1A1A]/95 py-3 text-[15px] text-white md:inset-x-6 md:top-5 md:text-base">
            <div className="marquee flex w-max">
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                  {OFFERS.map((o) => (
                    <span key={o} className="flex items-center whitespace-nowrap px-5">
                      {o}<span className="ml-10 text-[#D9A35B]">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-[50px] left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`relative h-2 overflow-hidden rounded-full bg-white/45 transition-all duration-500 ${i === active ? 'w-10' : 'w-2'}`}
              >
                {i === active && (
                  <span
                    key={active}
                    className="fill absolute inset-y-0 left-0 rounded-full bg-white"
                    style={{ animationDuration: `${SLIDE_TIME}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= WHITE SHEET ================= */}
      <div className="relative z-20 -mt-8 rounded-t-[36px] bg-white pb-28 pt-7 md:mt-0 md:rounded-none md:pb-20 md:pt-12">
        {/* Men / Women / Unisex / Attar */}
        <div ref={chipsRef} className="mx-auto max-w-[1500px]">
          <div className="flex gap-4 overflow-x-auto px-5 pb-2 md:justify-center md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className={`chip group flex h-[74px] shrink-0 items-center gap-3 rounded-2xl bg-[#1A1A1A] pl-6 pr-8 text-white transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:bg-black hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,.6)] ${
                  chipsIn ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: chipsIn ? `${i * 90}ms` : '0ms' }}
              >
                <span className="transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110"><GenderIcon type={c.icon} /></span>
                <span className="text-[26px] font-medium">{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bade photo cards */}
        <div ref={cardsRef} className="mx-auto mt-6 grid max-w-[1500px] gap-5 px-5 md:mt-10 md:grid-cols-3 md:gap-6 md:px-8">
          {COLLECTIONS.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="card group relative block aspect-[4/3.3] overflow-hidden rounded-[24px] bg-[#3a2c26] transition-[clip-path,transform] duration-[1100ms] ease-[cubic-bezier(.7,0,.2,1)] hover:-translate-y-1"
              style={{
                clipPath: cardsIn ? 'inset(0% 0% 0% 0% round 24px)' : 'inset(100% 0% 0% 0% round 24px)',
                transitionDelay: cardsIn ? `${i * 150}ms` : '0ms',
              }}
            >
              <SafeImg src={c.img} alt={c.title} className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110 ${cardsIn ? 'scale-100' : 'scale-125'}`} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute left-6 top-6 text-white transition-transform duration-500 group-hover:translate-x-1">
                <h3 className="text-[28px] font-semibold uppercase leading-none tracking-wide md:text-3xl" style={{ fontFamily: 'inherit' }}>{c.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/85">{c.sub}</p>
              </div>
              <span className="absolute bottom-5 right-5 grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-white text-[#111] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <BottomBar />

      <style>{`
        .banner-in { animation: bannerIn 1s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes bannerIn { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }

        .drop-in { animation: dropIn .8s .3s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }

        .rise { animation: rise .9s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes rise { from { transform: translateY(110%); } to { transform: none; } }

        .pop { animation: pop .7s cubic-bezier(.3,1.4,.5,1) both; }
        @keyframes pop { from { opacity: 0; transform: translateY(24px) scale(.94); } to { opacity: 1; transform: none; } }

        .marquee { animation: marquee 22s linear infinite; }
        .marquee:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .fill { animation-name: fill; animation-timing-function: linear; animation-fill-mode: both; }
        @keyframes fill { from { width: 0%; } to { width: 100%; } }

        .btn-shine::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent);
          transform: skewX(-20deg); animation: shine 3.2s 1s ease-in-out infinite;
        }
        @keyframes shine { 0%, 60% { left: -60%; } 100% { left: 130%; } }

        .bar-in { animation: barIn .7s .5s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes barIn { from { transform: translateY(100%); } to { transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .banner-in, .drop-in, .rise, .pop, .marquee, .btn-shine::after, .bar-in { animation: none !important; }
          .card { clip-path: none !important; }
        }
      `}</style>
    </section>
  );
}