import { useEffect, useRef, useState } from 'react';

/* =========================================================
   RUPUR Home (dark luxe, mobile-first)
   Mobile: photo neeche dark me fade hoti hai, text us dark jagah pe
   Desktop: text photo ke upar
   ========================================================= */

const IMG_BASE = 'https://idyllic-tarsier-20717f.netlify.app';
const CTA = '#E8562A';
const GOLD = '#D9A35B';
const SLIDE_TIME = 5000;

const OFFERS = [
  'Free Shipping above ₹999',
  '5% OFF on Prepaid Orders',
  'COD Available across India',
  'Made in Kalapipal, M.P.',
];

const TRUST = [
  { t: 'Free Shipping', s: 'above ₹999', d: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' },
  { t: '5% OFF', s: 'on prepaid', d: 'M19 5L5 19M7 9a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z' },
  { t: 'COD', s: 'all India', d: 'M3 7h18v10H3zM12 14a2 2 0 100-4 2 2 0 000 4zM6 10v.01M18 14v.01' },
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

function GenderIcon({ type }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const c = 'h-5 w-5 md:h-7 md:w-7';
  if (type === 'men')
    return (<svg viewBox="0 0 24 24" className={c}><circle cx="9.5" cy="14.5" r="6.5" fill="currentColor" /><path d="M14 10l6.5-6.5M15 3.5h5.5V9" {...stroke} /></svg>);
  if (type === 'women')
    return (<svg viewBox="0 0 24 24" className={c}><circle cx="12" cy="9" r="6.5" fill="currentColor" /><path d="M12 15.5V22M8.5 19h7" {...stroke} /></svg>);
  if (type === 'unisex')
    return (<svg viewBox="0 0 24 24" className={c}><circle cx="11" cy="11" r="5.5" fill="currentColor" /><path d="M15 7l5-5M16 2h4v4M11 16.5V22M8 19.5h6" {...stroke} /></svg>);
  return (<svg viewBox="0 0 24 24" className={c}><path d="M10 2.5h4v3.5h-4z" fill="currentColor" /><path d="M8.5 7h7l2 4v8.5A2.5 2.5 0 0115 22H9a2.5 2.5 0 01-2.5-2.5V11z" fill="currentColor" /></svg>);
}

function SafeImg({ src, alt, className = '', eager = false }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`${className} bg-[#3a2c26]`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setOk(false)} className={className} />;
}

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
    <section id="home" className="bg-[#120B08] pt-14 text-white md:pt-20" style={{ fontFamily: "'Jost', 'Inter', system-ui, sans-serif" }}>
      {/* Offer strip (mobile) */}
      <div className="overflow-hidden border-y border-[#D9A35B]/20 bg-[#1b110c] py-2.5 text-[13px] text-[#F3D59B] md:hidden">
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
          className="banner-in relative aspect-[4/5] max-h-[560px] w-full overflow-hidden bg-[#3a2c26] md:aspect-[16/7] md:max-h-none md:rounded-[32px]"
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
                <div className="absolute inset-0 hidden bg-gradient-to-b from-black/35 via-transparent to-black/50 md:block" />

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

          {/* Mobile: photo ka neeche wala hissa dark brown me ghul jata hai */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-28 bg-gradient-to-t from-[#120B08] via-[#120B08]/70 to-transparent md:hidden" />

          {/* Desktop offer box */}
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

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`relative h-2 overflow-hidden rounded-full bg-white/40 transition-all duration-500 ${i === active ? 'w-10' : 'w-2'}`}
              >
                {i === active && (
                  <span
                    key={active}
                    className="fill absolute inset-y-0 left-0 rounded-full bg-[#D9A35B]"
                    style={{ animationDuration: `${SLIDE_TIME}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ============ MOBILE: text dark jagah pe ============ */}
        <div key={active} className="fade-up px-6 pb-2 pt-5 text-center md:hidden">
          <h1 className="font-serif text-[27px] leading-[1.2] text-white">
            {cur.lines.join(' ')}{' '}
            <span className="italic" style={{ color: GOLD }}>{cur.italic}</span>
          </h1>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={cur.primary.href}
              className="btn-shine relative grid h-[54px] place-items-center overflow-hidden rounded-full text-[15px] font-semibold tracking-wide text-white shadow-[0_10px_30px_-10px_#E8562A] active:scale-[.97]"
              style={{ backgroundColor: CTA }}
            >
              {cur.primary.label}
            </a>
            <a
              href={cur.secondary.href}
              className="grid h-[54px] place-items-center rounded-full border border-[#D9A35B]/60 px-2 text-[15px] font-medium text-[#F3D59B] transition active:scale-[.97] active:bg-[#D9A35B]/10"
            >
              {cur.secondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* Trust row (mobile) */}
      <div className="mx-5 mt-7 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-4 md:hidden">
        {TRUST.map((x) => (
          <div key={x.t} className="flex flex-col items-center gap-1.5 px-1 text-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={x.d} /></svg>
            <span className="text-[13px] font-medium leading-none text-white">{x.t}</span>
            <span className="text-[11px] leading-none text-white/50">{x.s}</span>
          </div>
        ))}
      </div>

      {/* ============ SECOND SECTION: scroll pe khulta hai ============ */}
      <div className="relative overflow-hidden pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[130%] -translate-x-1/2 rounded-full bg-[#D9A35B]/10 blur-[100px]" />

        <div ref={chipsRef} className="relative mx-auto max-w-[1500px]">
          {/* Sunehri line beech se dono taraf khulti hai */}
          <div className="mx-8 mb-8 flex items-center gap-3 md:mx-auto md:mb-10 md:max-w-xl">
            <span className={`h-px flex-1 origin-right bg-gradient-to-l from-[#D9A35B] to-transparent transition-transform duration-[1200ms] ease-[cubic-bezier(.7,0,.2,1)] ${chipsIn ? 'scale-x-100' : 'scale-x-0'}`} />
            <span className={`text-[#D9A35B] transition-all delay-500 duration-700 ${chipsIn ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>✦</span>
            <span className={`h-px flex-1 origin-left bg-gradient-to-r from-[#D9A35B] to-transparent transition-transform duration-[1200ms] ease-[cubic-bezier(.7,0,.2,1)] ${chipsIn ? 'scale-x-100' : 'scale-x-0'}`} />
          </div>

          {/* Heading: ek-ek line mask se upar uthti hai */}
          <h2 className="mb-8 px-5 text-center font-serif text-[34px] leading-[1.15] md:mb-12 md:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span className={`block transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.8,.2,1)] ${chipsIn ? 'translate-y-0' : 'translate-y-[125%]'}`} style={{ transitionDelay: '250ms' }}>Find your</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className={`block italic text-[#D9A35B] transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.8,.2,1)] ${chipsIn ? 'translate-y-0' : 'translate-y-[125%]'}`} style={{ transitionDelay: '400ms' }}>signature scent</span>
            </span>
          </h2>

          {/* Categories: ek-ek karke pop hote hain */}
          <div className="flex gap-3 overflow-x-auto px-5 pb-1 md:justify-center md:gap-4 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                className={`group flex h-12 shrink-0 items-center gap-2.5 rounded-full border border-[#D9A35B]/40 bg-white/[0.04] px-6 text-white transition-all duration-700 ease-[cubic-bezier(.3,1.3,.5,1)] active:scale-95 active:bg-[#D9A35B] active:text-black md:h-[68px] md:px-8 md:hover:-translate-y-1 md:hover:border-[#D9A35B] md:hover:bg-[#D9A35B] md:hover:text-black ${
                  chipsIn ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-90 opacity-0'
                }`}
                style={{ transitionDelay: chipsIn ? `${600 + i * 90}ms` : '0ms' }}
              >
                <span className="text-[#D9A35B] transition-colors group-hover:text-black group-active:text-black"><GenderIcon type={c.icon} /></span>
                <span className="text-base font-medium md:text-2xl">{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Collections: card beech se parde ki tarah khulta hai */}
        <div className="relative mx-auto mt-12 max-w-[1500px] md:mt-16">
          <div className="mb-4 flex items-end justify-between px-5 md:hidden">
            <h3 className="font-serif text-2xl">Our <span className="italic text-[#D9A35B]">collections</span></h3>
            <a href="#shop" className="pb-1 text-sm text-[#D9A35B]">View all</a>
          </div>
          <div
            ref={cardsRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {COLLECTIONS.map((c, i) => (
              <a
                key={c.title}
                href={c.href}
                className="card group relative block aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-[24px] bg-[#3a2c26] transition-[clip-path] duration-[1300ms] ease-[cubic-bezier(.7,0,.2,1)] md:aspect-[4/3.3] md:w-auto"
                style={{
                  clipPath: cardsIn ? 'inset(0% 0% 0% 0% round 24px)' : 'inset(50% 0% 50% 0% round 24px)',
                  transitionDelay: cardsIn ? `${i * 180}ms` : '0ms',
                }}
              >
                <SafeImg
                  src={c.img}
                  alt={c.title}
                  className={`h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110 ${cardsIn ? 'scale-100' : 'scale-[1.4]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div
                  className={`absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 transition-all duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] ${cardsIn ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                  style={{ transitionDelay: cardsIn ? `${700 + i * 180}ms` : '0ms' }}
                >
                  <div>
                    <h3 className="font-serif text-[26px] leading-none text-white md:text-3xl">{c.title}</h3>
                    <p className="mt-2 text-sm text-[#F3D59B]">{c.sub}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#D9A35B] text-black transition-transform duration-500 group-hover:translate-x-1">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
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