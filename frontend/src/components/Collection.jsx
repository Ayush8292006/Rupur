export default function Collection() {
  const perfumes = [
    { name: 'Romantic Dance', desc: 'Candle-lit, rose-warm evenings.', size: '30ML · EDP' },
    { name: 'Sea Faze', desc: 'The first breeze at the beach.', size: '30ML · EDP' },
    { name: 'Giraft', desc: 'Bold, dark, and unapologetic.', size: '50ML · EDP' },
    { name: 'Ira', desc: 'Soft and floral without being sweet.', size: '30ML · EDP' },
    { name: 'Dhaval', desc: 'Clean, woody, daily office wear.', size: '30ML · EDP' },
  ];

  return (
    <section id="collection" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#B08D57] tracking-[0.3em] text-xs uppercase mb-4 block">The Collection</span>
          <h2 className="text-4xl md:text-5xl text-white font-serif">Five Signatures</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumes.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Image Placeholder */}
              <div className="aspect-[3/4] bg-[#111] overflow-hidden relative mb-6 border border-[#FFFFFF05] flex items-center justify-center">
                <span className="text-gray-600 text-sm tracking-widest">[ PERFUME IMAGE ]</span>
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white border border-white/50 px-6 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                    View Details
                  </span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex justify-between items-start border-t border-[#FFFFFF10] pt-4">
                <div>
                  <h3 className="text-lg text-white font-serif mb-1 group-hover:text-[#B08D57] transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
                <span className="text-[10px] text-[#B08D57] tracking-widest mt-1">{p.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}