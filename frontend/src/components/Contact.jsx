import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact({ onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1
      });
      
      gsap.from(".form-anim", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      id="contact" // ID Yahan Add Kiya Hai
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-20 overflow-hidden flex items-center"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#B08D57]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#B08D57]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Back Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-28 left-6 lg:left-20 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-[#B08D57] transition-colors z-50 group contact-anim"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-[#B08D57] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </span>
          Back to Home
        </button>
      )}

      <div className="max-w-[1400px] mx-auto w-full relative z-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center lg:sticky lg:top-32">
            <div className="contact-anim flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#B08D57]"></span>
              <span className="text-[#B08D57] tracking-[0.4em] text-[10px] uppercase font-semibold">Get in Touch</span>
            </div>
            
            <h2 className="contact-anim text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
              Let's find <br />
              <span className="text-[#B08D57] italic pr-2">your scent.</span>
            </h2>
            
            <p className="contact-anim text-gray-400 text-sm leading-relaxed mb-12 max-w-md">
              Whether you are looking for a signature fragrance, a thoughtful gift, or a wholesale partnership, our team is here to assist you. Experience the essence of India.
            </p>

            <div className="space-y-10 contact-anim">
              <div className="group">
                <p className="text-[10px] text-[#B08D57] tracking-[0.2em] uppercase mb-3">Email Us</p>
                <a href="mailto:rupurperfumes@gmail.com" className="text-xl md:text-2xl font-serif text-white group-hover:text-[#B08D57] transition-colors relative inline-block">
                  rupurperfumes@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B08D57] transition-all duration-500 group-hover:w-full"></span>
                </a>
              </div>
              
              <div className="group">
                <p className="text-[10px] text-[#B08D57] tracking-[0.2em] uppercase mb-3">Call Us</p>
                <p className="text-lg md:text-xl font-serif text-gray-300 hover:text-white transition-colors cursor-pointer">+91 79872 66411</p>
                <p className="text-lg md:text-xl font-serif text-gray-300 hover:text-white transition-colors cursor-pointer mt-1">+91 97136 20850</p>
              </div>

              <div className="group">
                <p className="text-[10px] text-[#B08D57] tracking-[0.2em] uppercase mb-3">Visit Our Atelier</p>
                <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  In front of Tehsil, Kalapipal Mandi<br />
                  Dist. Shajapur, Madhya Pradesh
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Glassmorphism Form */}
          <div className="form-anim relative">
            {/* Form Background Glass Effect */}
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl rounded-3xl border border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.5)] -z-10"></div>
            
            {/* Gold Corner Accents */}
            <div className="absolute -top-[1px] -left-[1px] w-20 h-20 border-t border-l border-[#B08D57]/50 rounded-tl-3xl pointer-events-none"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-20 h-20 border-b border-r border-[#B08D57]/50 rounded-br-3xl pointer-events-none"></div>

            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-serif mb-10 text-white tracking-wide">Send an Inquiry</h3>
              
              <form className="flex flex-col gap-8">
                
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#B08D57] transition-colors" 
                    placeholder="Full Name"
                  />
                  <label className="absolute left-0 -top-3.5 text-[10px] tracking-[0.2em] text-[#B08D57] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#B08D57] cursor-text">
                    Full Name
                  </label>
                </div>
                
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#B08D57] transition-colors" 
                    placeholder="Email Address"
                  />
                  <label className="absolute left-0 -top-3.5 text-[10px] tracking-[0.2em] text-[#B08D57] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#B08D57] cursor-text">
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#B08D57] transition-colors" 
                    placeholder="Phone Number"
                  />
                  <label className="absolute left-0 -top-3.5 text-[10px] tracking-[0.2em] text-[#B08D57] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#B08D57] cursor-text">
                    Phone Number
                  </label>
                </div>

                <div className="relative group">
                  <select className="peer w-full bg-transparent border-b border-white/20 py-3 text-gray-300 focus:outline-none focus:border-[#B08D57] transition-colors appearance-none cursor-pointer">
                    <option value="" disabled selected hidden>Select an option...</option>
                    <option value="order" className="bg-[#111]">Placing an Order</option>
                    <option value="gifting" className="bg-[#111]">Gifting / Bulk Order</option>
                    <option value="wholesale" className="bg-[#111]">Wholesale Partnership</option>
                    <option value="other" className="bg-[#111]">Other Inquiry</option>
                  </select>
                  <label className="absolute left-0 -top-3.5 text-[10px] tracking-[0.2em] text-[#B08D57] uppercase pointer-events-none">
                    Interest
                  </label>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#B08D57]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                <div className="relative group mt-2">
                  <textarea 
                    rows="3" 
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#B08D57] transition-colors resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label className="absolute left-0 -top-3.5 text-[10px] tracking-[0.2em] text-[#B08D57] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#B08D57] cursor-text">
                    Your Message
                  </label>
                </div>
                
                <button 
                  type="button" 
                  className="mt-6 group relative w-full py-4 overflow-hidden rounded-full border border-[#B08D57] text-[#B08D57] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-[#B08D57] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500 flex items-center justify-center gap-2">
                    Submit Message
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}