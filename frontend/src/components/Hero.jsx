import { useEffect, useRef, useState } from 'react';

/* =========================================================
   RUPUR Home (mobile-first)
   Mobile: photo upar, text + buttons photo ke NEECHE (overlap nahi)
   Desktop: text photo ke upar (pehle jaisa)
   ========================================================= */

const IMG_BASE = 'https://idyllic-tarsier-20717f.netlify.app';
const CTA = '#E8562A';
const SLIDE_TIME = 5000;

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

/* ---------- Scroll reveal ---------- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ---------- Icons ---------- */
function GenderIcon({ type }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'men')
    return (<svg viewBox="0 0 24 24" className="h-6 w-6 md:h-8 md:w-8"><circle cx="9.5" cy="14.5" r="6.5" fill="currentColor" /><path d="M14 10l6.5-6.5M15 3.5h5.5V9" {...stroke} /></svg>);
  if (type === 'women')
    return (<svg viewBox="0 0 24 24" className="h-6 w-6 md:h-8 md:w-8"><circle cx="12" cy="9" r="6.5" fill="currentColor" /><path d="M12 15.5V22M8.5 19h7" {...stroke} /></svg>);
  if (type === 'unisex')
    return (<svg viewBox="0 0 24 24" className="h-6 w-6 md:h-8 md:w-8"><circle cx="11" cy="11" r="5.5" fill="currentColor" /><path d="M15 7l5-5M16 2h4v4M11 16.5V22M8 19.5h6" {...stroke} /></svg>);
  return (<svg viewBox="0 0 24 24" className="h-6 w-6 md:h-8 md:w-8"><path d="M10 2.5h4v3.5h-4z" fill="currentColor" /><path d="M8.5 7h7l2 4v8.5A2.5 2.5 0 0115 22H9a2.5 2.5 0 01-2.5-2.5V11z" fill="currentColor" /></svg>);
}

function SafeImg({ src, alt, className = '', eager = false }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`${className} bg-[#3a2c26]`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setOk(false)} className={className} />;
}

/* ---------- Home ---------- */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const total = SLIDES.length;
  const [chipsRef, chipsIn] = useReveal();
  const [cardsRef, cardsIn] = useReveal();
  const cur = SLIDES[active];

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
    // pt-14 md:pt-20 = Navbar ki height
    <section id="home" className="bg-white pt-14 md:pt-20" style={{ fontFamily: "'Jost', 'Inter', system-ui, sans-serif" }}>
      {/* ============ OFFER STRIP (navbar ke neeche, photo ke upar nahi) ============ */}
      <div className="overflow-hidden bg-[#1A1A1A] py-2.5 text-[13px] text-white md:hidden">
        <div className="marquee flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {OFFERS.map((o) => (
                <span key={o} className="flex items-center whitespace-nowrap px-4">
                  {o}<span className="ml-8 text-[#D9A35B]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ BANNER ============ */}
      <div className="md:mx-auto md:max-w-[1500px] md:px-8 md:pt-4">
        <div
          className="banner-in relative w-full overflow-hidden bg-[#3a2c26] aspect-[4/5] max-h-[560px] md:aspect-[16/7] md:max-h-none md:rounded-[32px]"
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
                  className={`h-full w-full object-cover transition-transform ease-out ${on ? 'scale-[1.08] duration-[7000ms]' : 'scale-100 duration-0'}`}
                />
                {/* Gradient sirf desktop pe (text padhne ke liye). Mobile pe photo saaf dikhe */}
                <div className="absolute inset-0 hidden bg-gradient-to-b from-black/35 via-transparent to-black/50 md:block" />

                {/* DESKTOP text overlay */}
                {on && (
                  <div className="absolute right-14 top-[32%] hidden max-w-[460px] text-right text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.55)] md:block">
                    {s.lines.map((t, n) => (
                      <span key={n} className="block overflow-hidden">
                        <span className="rise block text-[34px] font-medium leading-snug" style={{ animationDelay: `${150 + n * 120}ms` }}>{t}</span>
                      </span>
                    ))}
                    <span className="block overflow-hidden">
                      <span className="rise block text-[34px] italic leading-snug text-[#FFE2B8]" style={{ animationDelay: `${150 + s.lines.length * 120}ms` }}>{s.italic}</span>
                    </span>
                  </div>
                )}

                {/* DESKTOP buttons */}
                {on && (
                  <div className="absolute bottom-14 left-14 hidden w-[540px] grid-cols-2 gap-3 md:grid">
                    <a href={s.primary.href} className="pop btn-shine relative grid min-h-[64px] place-items-center overflow-hidden rounded-2xl border-[3px] border-white px-3 text-center text-2xl font-medium text-white shadow-lg transition hover:-translate-y-0.5" style={{ backgroundColor: CTA, animationDelay: '420ms' }}>
                      {s.primary.label}
                    </a>
                    <a href={s.secondary.href} className="pop grid min-h-[64px] place-items-center rounded-2xl border-[3px] border-white bg-[#1A1A1A] px-3 text-center text-2xl font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black" style={{ animationDelay: '520ms' }}>
                      {s.secondary.label}
                    </a>
                  </div>
                )}
              </div>
            );
          })}

          {/* DESKTOP offer box */}
          <div className="drop-in absolute inset-x-6 top-5 z-20 hidden overflow-hidden rounded-2xl bg-[#1A1A1A]/95 py-3 text-base text-white md:block">
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
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`relative h-2 overflow-hidden rounded-full bg-white/50 shadow transition-all duration-500 ${i === active ? 'w-10' : 'w-2'}`}
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

        {/* ============ MOBILE: text + buttons photo ke neeche ============ */}
        <div key={active} className="fade-up px-5 pb-2 pt-6 text-center md:hidden">
          <h1 className="text-[22px] font-medium leading-snug text-[#1A1A1A]">
            {cur.lines.join(' ')}{' '}
            <span className="italic" style={{ color: CTA }}>{cur.italic}</span>
          </h1>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={cur.primary.href}
              className="btn-shine relative grid h-[52px] place-items-center overflow-hidden rounded-xl text-base font-medium text-white active:scale-[.97]"
              style={{ backgroundColor: CTA }}
            >
              {cur.primary.label}
            </a>
            <a
              href={cur.secondary.href}
              className="grid h-[52px] place-items-center rounded-xl bg-[#1A1A1A] px-2 text-base font-medium text-white active:scale-[.97]"
            >
              {cur.secondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* ============ CONTENT ============ */}
      <div className="bg-white pb-14 pt-8 md:pb-20 md:pt-12">
        {/* Men / Women / Unisex / Attar: mobile pe 2x2 grid */}
        <div ref={chipsRef} className="mx-auto max-w-[1500px] px-5 md:px-8">
          <div className="grid grid-cols-2 gap-3 md:flex md:justify-center md:gap-4">
            {CATEGORIES.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className={`group flex h-14 items-center justify-center gap-2.5 rounded-xl bg-[#1A1A1A] text-white transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] active:scale-[.97] md:h-[74px] md:justify-start md:rounded-2xl md:pl-6 md:pr-8 md:hover:-translate-y-1 md:hover:bg-black ${
                  chipsIn ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: chipsIn ? `${i * 80}ms` : '0ms' }}
              >
                <span className="transition-transform duration-500 group-hover:rotate-[18deg]"><GenderIcon type={c.icon} /></span>
                <span className="text-lg font-medium md:text-[26px]">{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Photo cards */}
        <div ref={cardsRef} className="mx-auto mt-6 grid max-w-[1500px] gap-4 px-5 md:mt-10 md:grid-cols-3 md:gap-6 md:px-8">
          {COLLECTIONS.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="card group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-[#3a2c26] transition-[clip-path,transform] duration-[1100ms] ease-[cubic-bezier(.7,0,.2,1)] md:aspect-[4/3.3] md:rounded-[24px] md:hover:-translate-y-1"
              style={{
                clipPath: cardsIn ? 'inset(0% 0% 0% 0% round 20px)' : 'inset(100% 0% 0% 0% round 20px)',
                transitionDelay: cardsIn ? `${i * 150}ms` : '0ms',
              }}
            >
              <SafeImg src={c.img} alt={c.title} className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110 ${cardsIn ? 'scale-100' : 'scale-125'}`} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/5 to-transparent" />
              <div className="absolute left-5 top-5 text-white md:left-6 md:top-6">
                <h3 className="text-[22px] font-semibold uppercase leading-none tracking-wide md:text-3xl">{c.title}</h3>
                <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-white/85 md:mt-2 md:text-sm">{c.sub}</p>
              </div>
              <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-[#111] md:bottom-5 md:right-5 md:h-12 md:w-12 md:translate-y-3 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .banner-in { animation: bannerIn 1s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes bannerIn { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: none; } }

        .drop-in { animation: dropIn .8s .3s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }

        .rise { animation: rise .9s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes rise { from { transform: translateY(110%); } to { transform: none; } }

        .pop { animation: pop .7s cubic-bezier(.3,1.4,.5,1) both; }
        @keyframes pop { from { opacity: 0; transform: translateY(24px) scale(.94); } to { opacity: 1; transform: none; } }

        .fade-up { animation: fadeUp .7s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }

        .marquee { animation: marquee 22s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .fill { animation-name: fill; animation-timing-function: linear; animation-fill-mode: both; }
        @keyframes fill { from { width: 0%; } to { width: 100%; } }

        .btn-shine::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent);
          transform: skewX(-20deg); animation: shine 3.2s 1s ease-in-out infinite;
        }
        @keyframes shine { 0%, 60% { left: -60%; } 100% { left: 130%; } }

        @media (prefers-reduced-motion: reduce) {
          .banner-in, .drop-in, .rise, .pop, .fade-up, .marquee, .btn-shine::after { animation: none !important; }
          .card { clip-path: none !important; }
        }
      `}</style>
    </section>
  );
}